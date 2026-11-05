#!/usr/bin/env python3
"""发音实验室"听辨"练习的对比词：逐条验证，并择优重录。

背景：Piper 的每次合成都带随机性。对 pala / palla 这类"单辅音 vs 双辅音"的词对，统计抽查发现：
多数词对里双辅音确实是单辅音的约 2 倍长（同时重读元音变短，所以整词总长几乎相同——真实意大利语也是如此），
但个别词对（如 sete/sette、fato/fatto）单次采样时对比可能偏弱。听辨游戏每个词只播一次，
所以这里对每个词对各合成 K 次，用"逐音素时长"挑出：单辅音偏短、双辅音够长的那一次，覆盖 audio/ 里对应的 mp3。

用法（先完成 gen_audio.py）：
  node tools/export_course.js build/course.json
  python3 tools/gen_audio.py --model /path/to/it_IT-paola-medium.onnx
  python3 tools/refine_pairs.py --model /path/to/it_IT-paola-medium.onnx [--takes 60] [--min-ratio 1.8]
之后若用 --force 重跑 gen_audio.py，需要重新运行本脚本。
依赖：pip install piper-tts onnx onnxruntime numpy；系统需有 ffmpeg。
"""
import argparse
import json
import os
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from gen_audio import encode_mp3, file_id, level_wav  # noqa: E402
from piper_dur import TimedVoice  # noqa: E402
from tts_text import to_speech  # noqa: E402

ROOT = os.path.abspath(os.path.join(HERE, '..'))
VOW = set('aeiouɛɔ')
SKIP = set('ˈˌː')


def token_info(sy):
    """把音素序列分成"双辅音组"和"单辅音"。每项 = (起始下标, 长度, 符号, 它之前的元音数)。
    双辅音组：同一符号连写（ll）、符号+长音符（tː），或 r+ɾ（espeak 对 rr 的写法）。"""
    groups, singles, nv, i = [], [], 0, 0
    while i < len(sy):
        c = sy[i]
        if c in VOW:
            nv += 1; i += 1; continue
        if c in SKIP or not c.isalpha():
            i += 1; continue
        nxt = sy[i + 1] if i + 1 < len(sy) else ''
        if nxt == c or nxt == 'ː' or (c == 'r' and nxt == 'ɾ'):
            groups.append((i, 2, c, nv)); i += 2
        else:
            singles.append((i, 1, c, nv)); i += 1
    return groups, singles


def sample(voice, word, k):
    chars = list(voice.phonemes(to_speech(word))[0])
    takes = []
    for _ in range(k):
        audio, segs = voice.synth(chars)
        takes.append((audio, segs))
    return takes


def span_ms(segs, start, n):
    return sum(m for _, m in segs[start:start + n])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--model', required=True)
    ap.add_argument('--json', default=os.path.join(ROOT, 'build', 'course.json'))
    ap.add_argument('--audio', default=os.path.join(ROOT, 'audio'))
    ap.add_argument('--takes', type=int, default=60, help='每个词合成多少次')
    ap.add_argument('--min-ratio', type=float, default=1.8, help='双辅音组时长 / 单辅音时长 的最低要求')
    ap.add_argument('--bitrate', default='48k', help='须与 gen_audio.py 一致')
    ap.add_argument('--dry-run', action='store_true', help='只统计，不覆盖文件')
    args = ap.parse_args()

    pairs = json.load(open(args.json, encoding='utf-8')).get('pairs', [])
    if not pairs:
        sys.exit('course.json 里没有 pairs，请先运行 node tools/export_course.js')
    voice = TimedVoice(args.model)
    report, weak = [], 0
    print('%-18s %-22s %-22s %s' % ('词对', '随机采样均值(单 → 双)', '择优后(单 → 双)', '比值 前 → 后'))
    for p in pairs:
        a, b = p['a'], p['b']
        ta, tb = sample(voice, a, args.takes), sample(voice, b, args.takes)
        sya = [s for s, _ in ta[0][1]]
        syb = [s for s, _ in tb[0][1]]
        ga, sa = token_info(sya)
        gb, sb = token_info(syb)
        seen = {(c, nv) for _, _, c, nv in ga}
        tgt = next((g for g in gb if (g[2], g[3]) not in seen), None)
        ctr = next((s for s in sa if tgt and (s[2], s[3]) == (tgt[2], tgt[3])), None)
        if not tgt or not ctr:
            print('%-18s （不是"单/双辅音"对比，跳过）' % (a + ' / ' + b))
            continue
        da = np.array([span_ms(segs, ctr[0], 1) for _, segs in ta])
        db = np.array([span_ms(segs, tgt[0], tgt[1]) for _, segs in tb])
        tota = np.array([sum(m for _, m in segs) for _, segs in ta])
        totb = np.array([sum(m for _, m in segs) for _, segs in tb])
        # 保持自然：单辅音取"接近均值、略偏短"的一次，整词总长接近中位数；
        # 双辅音在"不超过单辅音均值 3 倍、整词不过长"的范围内取最长的一次（对比最明显，又不夸张）。
        ia = min(range(len(da)), key=lambda j: abs(da[j] - 0.9 * da.mean()) + 0.3 * abs(tota[j] - np.median(tota)))
        cap = 3.0 * da.mean()
        ok = [j for j in range(len(db)) if db[j] <= cap and totb[j] <= 1.3 * tota[ia]]
        jb = max(ok, key=lambda j: db[j]) if ok else min(range(len(db)), key=lambda j: abs(db[j] - cap))
        before, after = db.mean() / da.mean(), db[jb] / da[ia]
        flag = ''
        if after < args.min_ratio:
            weak += 1
            flag = '  ⚠ 低于 %.1f' % args.min_ratio
        print('%-18s %4.0f → %4.0f ms          %4.0f → %4.0f ms          ×%.2f → ×%.2f%s' % (
            a + ' / ' + b, da.mean(), db.mean(), da[ia], db[jb], before, after, flag))
        report.append({'a': a, 'b': b, 'ratio_before': round(before, 2), 'ratio_after': round(after, 2),
                       'single_ms': round(float(da[ia])), 'geminate_ms': round(float(db[jb]))})
        if not args.dry_run:
            for w, audio in ((a, ta[ia][0]), (b, tb[jb][0])):
                fid = file_id(w)
                path = os.path.join(args.audio, fid[:2], fid + '.mp3')
                os.makedirs(os.path.dirname(path), exist_ok=True)
                with open(path, 'wb') as f:
                    f.write(encode_mp3(level_wav(voice.wav_bytes(audio)), args.bitrate))

    os.makedirs(os.path.join(ROOT, 'build'), exist_ok=True)
    json.dump(report, open(os.path.join(ROOT, 'build', 'pairs_report.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('\n完成：%d 组对比词%s；比值低于 %.1f 的有 %d 组。' % (len(report), '（试运行，未写文件）' if args.dry_run else '已择优覆盖', args.min_ratio, weak))


if __name__ == '__main__':
    main()
