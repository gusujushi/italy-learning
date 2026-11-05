#!/usr/bin/env python3
"""意大利语拼写质检：用 Hunspell 词典逐词检查课程里的全部意大利语文本。

依赖（仅质检时需要，不属于运行时）：
  pip install spylls
  词典：LibreOffice/dictionaries 仓库的 it_IT（GPL-3.0，仅用于检查，不随项目分发）
  词频表（可选）：hermitdave/FrequencyWords 的 it_50k.txt（CC-BY-SA-4.0，仅用于检查，不随项目分发）

用法：
  node tools/export_course.js build/course.json
  python3 tools/qa_italian.py --dict /path/to/it_IT/it_IT --freq /path/to/it_50k.txt [--json build/course.json]

输出两部分：
  A. 课文/词汇/例句等"内容"里的未登录词（必须为 0，或加入 tools/spell_allow.txt 并说明原因）
  B. 测验选项/题干里的未登录词（其中有些是故意写错的干扰项，仅供人工复核）
同时给出词汇难度提示：课程前 30 天出现的词频排名 > 5000 的词。"""
import argparse
import json
import os
import re
import sys
from collections import defaultdict

from spylls.hunspell import Dictionary

HERE = os.path.dirname(os.path.abspath(__file__))
TOKEN = re.compile(r"[A-Za-zÀ-ÖØ-öø-ÿ]+(?:['’][A-Za-zÀ-ÖØ-öø-ÿ]+)*")
# 省音前缀（l'amico → l + amico）
ELIDED = {"l", "un", "dov", "c", "quell", "quest", "nell", "dell", "all", "sull", "dall", "d", "s", "m", "t", "v",
          "n", "anch", "com", "cos", "sant", "nessun", "buon", "bell", "grand", "quant", "tutt", "dall", "l"}
CONTENT_KINDS = {"title", "dlg", "vocab", "text", "gram-eg", "gram-table", "drill", "twister", "speak", "wr", "q-audio"}


def load_allow(path):
    allow = set()
    if os.path.exists(path):
        for ln in open(path, encoding="utf-8"):
            ln = ln.split("#")[0].strip().lower()
            if ln:
                allow.add(ln)
    return allow


def kind_of(where):
    k = where.split(":", 1)[1]
    k = re.sub(r"[\d.]+$", "", k)
    return k


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dict", required=True, help="Hunspell 词典前缀路径（不含 .dic/.aff），如 .../it_IT/it_IT")
    ap.add_argument("--freq", help="词频表 it_50k.txt")
    ap.add_argument("--json", default=os.path.join(HERE, "..", "build", "course.json"))
    ap.add_argument("--allow", default=os.path.join(HERE, "spell_allow.txt"))
    ap.add_argument("--max-day-rank", type=int, default=30, help="只对不超过该天数的文本做词频难度提示")
    args = ap.parse_args()

    d = Dictionary.from_files(args.dict)
    allow = load_allow(args.allow)
    data = json.load(open(args.json, encoding="utf-8"))

    rank = {}
    if args.freq and os.path.exists(args.freq):
        for i, ln in enumerate(open(args.freq, encoding="utf-8")):
            w = ln.split(" ")[0].strip().lower()
            rank.setdefault(w, i + 1)

    cache = {}

    def ok_word(w):
        if w in cache:
            return cache[w]
        r = bool(d.lookup(w) or d.lookup(w.lower()) or d.lookup(w.capitalize()) or w.lower() in allow)
        cache[w] = r
        return r

    def ok_token(tok):
        tok = tok.replace("’", "'")
        if ok_word(tok):
            return True
        if "'" in tok:
            parts = tok.split("'")
            head, tail = parts[0].lower(), parts[-1]
            if ok_word(tok.lower()):
                return True
            if head in ELIDED and ok_word(tail):
                return True
            return all(ok_word(p) for p in parts if p)
        return False

    bad_content = defaultdict(list)
    bad_quiz = defaultdict(list)
    tough = defaultdict(list)
    seen_tokens = 0
    for s in data["strings"]:
        where, text = s["where"], s["text"]
        if re.search(r"[㐀-鿿]", text):
            continue
        kind = kind_of(where)
        day = int(re.match(r"d(\d+)", where).group(1))
        for m in TOKEN.finditer(text):
            tok = m.group(0)
            seen_tokens += 1
            if not ok_token(tok):
                (bad_content if kind in CONTENT_KINDS else bad_quiz)[tok.lower()].append(where + "「" + text[:50] + "」")
            elif rank and kind in CONTENT_KINDS and day <= args.max_day_rank:
                base = tok.replace("’", "'").split("'")[-1].lower()
                r = rank.get(base)
                if (r is None or r > 5000) and base not in allow and len(base) > 2:
                    tough[base].append(where)

    print("检查了 %d 个词形（%d 条文本）" % (seen_tokens, len(data["strings"])))
    print("\nA. 内容文本中的未登录词：%d" % len(bad_content))
    for w, locs in sorted(bad_content.items()):
        print("  ✗ %-22s %s%s" % (w, locs[0], "  (+%d)" % (len(locs) - 1) if len(locs) > 1 else ""))
        sug = list(d.suggest(w))[:3]
        if sug:
            print("      建议：" + ", ".join(sug))
    print("\nB. 测验题干/选项中的未登录词：%d（有些是故意写错的干扰项，请人工确认）" % len(bad_quiz))
    for w, locs in sorted(bad_quiz.items()):
        print("  ? %-22s %s" % (w, locs[0]))
    if rank:
        print("\nC. 前 %d 天里词频排名 > 5000 或不在词频表的词：%d" % (args.max_day_rank, len(tough)))
        for w, locs in sorted(tough.items(), key=lambda x: -rank.get(x[0], 99999))[:40]:
            print("  · %-18s 排名 %-6s %s" % (w, rank.get(w, "—"), locs[0]))
    sys.exit(1 if bad_content else 0)


if __name__ == "__main__":
    main()
