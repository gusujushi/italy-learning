#!/usr/bin/env python3
"""音频质检：用 Whisper 语音识别把合成出的 MP3 "听写"回文字，与原文比对，找出读错 / 听不清的句子。

这只是粗检：Whisper 本身也会出错，所以结果用来"找可疑项"，不是判决。
依赖：pip install faster-whisper numpy （首次运行会自动下载模型）

用法：
  python3 tools/qa_audio_asr.py [--sample 300] [--model tiny|base|small] [--seed 1] [--min-words 3]
  python3 tools/qa_audio_asr.py --texts "pala,palla,caro,carro"      # 只测指定文本（须是课程里的朗读文本）
注意：孤立的单个单词没有上下文，Whisper 会倾向于识别成更常见的词（pala→palla），不能据此判断发音对错；
整句的识别结果才有参考价值（默认建议 --min-words 3）。
"""
import argparse
import json
import os
import random
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..'))
sys.path.insert(0, HERE)
from tts_text import num2it, to_speech  # noqa: E402


def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    s = re.sub(r"[^a-z0-9' ]+", ' ', s.replace('’', "'"))
    s = s.replace("'", ' ')
    return s.split()


def wer(ref, hyp):
    n, m = len(ref), len(hyp)
    if n == 0:
        return 0.0 if m == 0 else 1.0
    d = list(range(m + 1))
    for i in range(1, n + 1):
        prev, d[0] = d[0], i
        for j in range(1, m + 1):
            cur = d[j]
            d[j] = min(d[j] + 1, d[j - 1] + 1, prev + (ref[i - 1] != hyp[j - 1]))
            prev = cur
    return d[m] / n


def decode16k(path):
    """用 ffmpeg 解码成 16 kHz 单声道 float32（不依赖 PyAV，各版本都能用）"""
    import numpy as np
    import subprocess
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', '16000', '-'],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


def load_manifest(path):
    t = open(path, encoding='utf-8').read()
    return json.loads(t[t.index('{'):t.rindex('}') + 1])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--sample', type=int, default=300)
    ap.add_argument('--model', default='base')
    ap.add_argument('--seed', type=int, default=1)
    ap.add_argument('--texts', default='', help='逗号分隔：只测这些文本')
    ap.add_argument('--audio', default=os.path.join(ROOT, 'audio'))
    ap.add_argument('--worst', type=int, default=25)
    ap.add_argument('--only-normalized', action='store_true', help='只抽查被 tts_text 改写过的文本（数字、缩写、符号等——最容易读错）')
    ap.add_argument('--min-words', type=int, default=1, help='只抽查至少这么多个词的文本（孤立单词没有上下文，语音识别很不可靠，建议用 3）')
    args = ap.parse_args()

    from faster_whisper import WhisperModel
    mp = load_manifest(os.path.join(args.audio, 'manifest.js'))
    keys = list(mp.keys())
    if args.texts:
        want = [x.strip() for x in args.texts.split(',') if x.strip()]
        keys = [k for k in keys if k in want]
    elif args.only_normalized:
        keys = [k for k in keys if to_speech(k) != k]
    else:
        keys = [k for k in keys if len(norm(to_speech(k))) >= args.min_words]
        random.Random(args.seed).shuffle(keys)
        keys = keys[:args.sample]

    model = WhisperModel(args.model, device='cpu', compute_type='int8')
    rows = []
    for i, k in enumerate(keys):
        path = os.path.join(args.audio, mp[k])
        segs, _ = model.transcribe(decode16k(path), language='it', beam_size=1, vad_filter=False, condition_on_previous_text=False)
        hyp = ' '.join(s.text for s in segs).strip()
        hyp = re.sub(r'\d+', lambda m: num2it(int(m.group(0))), hyp)   # Whisper 常把数字写成阿拉伯数字，换回单词再比
        ref = to_speech(k)
        w = wer(norm(ref), norm(hyp))
        rows.append((w, k, hyp))
        if (i + 1) % 50 == 0:
            print('  … %d / %d' % (i + 1, len(keys)), flush=True)

    rows.sort(key=lambda r: -r[0])
    mean = sum(r[0] for r in rows) / max(1, len(rows))
    exact = sum(1 for r in rows if r[0] == 0)
    bad = sum(1 for r in rows if r[0] >= 0.5)
    print('\n抽查 %d 条：平均词错误率 %.1f%%；完全一致 %d 条（%.0f%%）；错误率 ≥ 50%% 的 %d 条（%.0f%%）' % (
        len(rows), 100 * mean, exact, 100 * exact / max(1, len(rows)), bad, 100 * bad / max(1, len(rows))))
    print('\n最可疑的 %d 条（原文 → 识别结果）：' % args.worst)
    for w, k, hyp in rows[:args.worst]:
        print('  %.2f  %r  →  %r' % (w, k, hyp))


if __name__ == '__main__':
    main()
