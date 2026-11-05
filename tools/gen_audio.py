#!/usr/bin/env python3
"""批量生成意大利语音频（Piper 本地神经语音合成 → MP3），并写出 audio/manifest.js。

依赖：
  pip install piper-tts
  语音模型（it_IT-paola-medium，训练数据为 CC0）：
    https://huggingface.co/rhasspy/piper-voices/tree/main/it/it_IT/paola/medium
    需要 it_IT-paola-medium.onnx 和 it_IT-paola-medium.onnx.json
  系统需有 ffmpeg。

用法：
  node tools/export_course.js build/course.json
  python3 tools/gen_audio.py --model /path/to/it_IT-paola-medium.onnx [--limit 20] [--force]

可断点续跑：已存在的 MP3 会跳过（课程文本改动后，只会为新文本生成新文件）。
音频查找键 = 显示文本（与 js/italian.js 的 speakKey 一致）；实际朗读的是规范化后的文本（见 tools/tts_text.py）。
"""
import argparse
import hashlib
import io
import json
import os
import subprocess
import sys
import time
import wave

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from tts_text import patch_voice, to_speech  # noqa: E402

ROOT = os.path.abspath(os.path.join(HERE, '..'))


def file_id(text):
    return hashlib.sha1(text.encode('utf-8')).hexdigest()[:10]


TARGET_DB = -17.5   # 有声段 RMS 目标（dBFS）：整套音频响度一致
CEILING_DB = -1.5   # 峰值上限（dBFS）：给 MP3 编解码留出余量，避免解码时削波


def level_wav(wav_bytes, target_db=TARGET_DB, ceiling_db=CEILING_DB):
    """响度归一。Piper 默认按"峰值"归一化，短词（一个峰很高）会比整句响、峰值还贴着 0 dBFS。
    这里改成按"有声段 RMS"把每条调到同一响度；峰值超过上限时以上限为准（宁可轻一点，也不削波）。"""
    import numpy as np
    with wave.open(io.BytesIO(wav_bytes), 'rb') as wf:
        sr, ch = wf.getframerate(), wf.getnchannels()
        x = np.frombuffer(wf.readframes(wf.getnframes()), dtype=np.int16).astype(np.float32) / 32768
    peak = float(np.max(np.abs(x))) if len(x) else 0.0
    hop = max(1, int(sr * 0.005))
    n = len(x) // hop
    if peak < 1e-4 or n < 2:
        return wav_bytes
    fr = x[:n * hop].reshape(n, hop)
    active = np.sqrt((fr ** 2).mean(1) + 1e-12) > peak * 10 ** (-35 / 20)   # 比峰值低 35 dB 以内才算"有声"
    level = float(np.sqrt((fr[active] ** 2).mean()))
    gain = min(10 ** (target_db / 20) / level, 10 ** (ceiling_db / 20) / peak)
    y = (np.clip(x * gain, -1, 1) * 32767).astype(np.int16)
    buf = io.BytesIO()
    with wave.open(buf, 'wb') as wf:
        wf.setnchannels(ch)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(y.tobytes())
    return buf.getvalue()


def encode_mp3(wav_bytes, bitrate):
    p = subprocess.run(
        ['ffmpeg', '-loglevel', 'error', '-y', '-f', 'wav', '-i', 'pipe:0', '-ac', '1', '-ar', '22050',
         '-codec:a', 'libmp3lame', '-b:a', bitrate, '-f', 'mp3', 'pipe:1'],
        input=wav_bytes, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
    return p.stdout


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--model', required=True, help='it_IT-paola-medium.onnx 的路径')
    ap.add_argument('--json', default=os.path.join(ROOT, 'build', 'course.json'))
    ap.add_argument('--out', default=os.path.join(ROOT, 'audio'))
    ap.add_argument('--bitrate', default='48k', help='MP3 码率；32k 的擦音（s / sc / z）略糊，48k 更清晰（总共约 30 MB）')
    ap.add_argument('--length-scale', type=float, default=1.08, help='>1 更慢；默认比模型默认语速稍慢，方便学习者听清')
    ap.add_argument('--limit', type=int, default=0, help='只处理前 N 条（试跑）')
    ap.add_argument('--force', action='store_true', help='忽略已有文件，全部重新生成')
    args = ap.parse_args()

    from piper import PiperVoice, SynthesisConfig
    voice = patch_voice(PiperVoice.load(args.model))   # 修正 espeak 把 "è" 读成闭口 e 的问题（见 tts_text.py）
    cfg = SynthesisConfig(length_scale=args.length_scale)

    texts = [t['text'] for t in json.load(open(args.json, encoding='utf-8'))['texts']]
    if args.limit:
        texts = texts[:args.limit]
    os.makedirs(args.out, exist_ok=True)

    mapping, report = {}, []
    t0, made, skipped, total_bytes = time.time(), 0, 0, 0
    for i, text in enumerate(texts):
        fid = file_id(text)
        rel = fid[:2] + '/' + fid + '.mp3'
        path = os.path.join(args.out, rel)
        mapping[text] = rel
        dur = None
        if os.path.exists(path) and os.path.getsize(path) > 0 and not args.force:
            skipped += 1
            total_bytes += os.path.getsize(path)
            continue
        spoken = to_speech(text)
        buf = io.BytesIO()
        with wave.open(buf, 'wb') as wf:
            voice.synthesize_wav(spoken, wf, syn_config=cfg)
        wav = level_wav(buf.getvalue())
        with wave.open(io.BytesIO(wav), 'rb') as wf:
            dur = wf.getnframes() / wf.getframerate()
        mp3 = encode_mp3(wav, args.bitrate)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'wb') as f:
            f.write(mp3)
        made += 1
        total_bytes += len(mp3)
        report.append({'text': text, 'spoken': spoken, 'sec': round(dur, 2), 'bytes': len(mp3)})
        if made % 200 == 0:
            print('  … %d / %d（%.0f 秒）' % (i + 1, len(texts), time.time() - t0), flush=True)

    manifest = os.path.join(args.out, 'manifest.js')
    with open(manifest, 'w', encoding='utf-8') as f:
        f.write('/* 自动生成：显示文本 → 音频文件。由 tools/gen_audio.py 写出，请勿手改。 */\n')
        f.write('window.AUDIO_MAP = ' + json.dumps(mapping, ensure_ascii=False, separators=(',', ':'), sort_keys=True) + ';\n')
    os.makedirs(os.path.join(ROOT, 'build'), exist_ok=True)
    json.dump(report, open(os.path.join(ROOT, 'build', 'audio_report.json'), 'w', encoding='utf-8'), ensure_ascii=False)
    print('完成：新生成 %d，跳过 %d，共 %d 条；音频总大小 %.1f MB；耗时 %.0f 秒' % (
        made, skipped, len(mapping), total_bytes / 1e6, time.time() - t0))
    if made:
        print('提示：发音室的"单/双辅音"对比词请再运行 tools/refine_pairs.py（逐条验证并择优重录）。')


if __name__ == '__main__':
    main()
