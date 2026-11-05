"""Piper (VITS) 的"带时长信息"推理封装——只用于开发期的音频质检/挑选，不属于运行时。

做两件事：
  1. 把 ONNX 图的第二个输出（每个音素的时长，单位：帧）暴露出来；
  2. 增加一个 dur_mult 输入（每个音素的时长倍率，默认全 1 = 与原模型完全一致）。

依赖：pip install piper-tts onnx onnxruntime numpy
"""
import os
import sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))


def _patch(model_path):
    try:
        import onnx
        from onnx import TensorProto, helper
    except ImportError:  # pragma: no cover
        raise SystemExit('需要 onnx：pip install onnx')
    m = onnx.load(model_path)
    g = m.graph
    ceil = [n for n in g.node if n.op_type == 'Ceil']
    if len(ceil) != 1:
        raise SystemExit('这个模型的计算图和预期不同（应只有 1 个 Ceil 节点）')
    ceil = ceil[0]
    g.input.append(helper.make_tensor_value_info('dur_mult', TensorProto.FLOAT, ['batch_size', 1, 'phonemes']))
    g.node.insert(list(g.node).index(ceil), helper.make_node('Mul', [ceil.input[0], 'dur_mult'], ['w_scaled'], name='/DurMult'))
    ceil.input[0] = 'w_scaled'
    g.output.append(helper.make_tensor_value_info(ceil.output[0], TensorProto.FLOAT, None))
    return m.SerializeToString()


class TimedVoice:
    def __init__(self, model_path, length_scale=1.08):
        import onnxruntime as ort
        from piper import PiperVoice
        from tts_text import patch_voice
        self.voice = patch_voice(PiperVoice.load(model_path))
        self.cfg = self.voice.config
        self.sess = ort.InferenceSession(_patch(model_path), providers=['CPUExecutionProvider'])
        self.length_scale = length_scale
        self.id2sym = {i: s for s, ids in self.cfg.phoneme_id_map.items() for i in ids}
        self.sr = self.cfg.sample_rate
        self.hop = self.cfg.hop_length

    def phonemes(self, text):
        """espeak 音素串（每句一个字符串）"""
        return [''.join(s) for s in self.voice.phonemize(text)]

    def synth(self, phon_chars, mult=None):
        """合成一句。返回 (归一化后的 float32 音频, [(音素, 毫秒)])。
        每个音素的毫秒数已合并了它后面的 pad；mult = {音素序号: 倍率}。"""
        ids = self.voice.phonemes_to_ids(list(phon_chars))
        n = len(ids)
        dm = np.ones(n, dtype=np.float32)
        for k, f in (mult or {}).items():
            dm[2 + 2 * k] = f      # ids = BOS 0 p0 0 p1 0 … EOS；第 k 个音素在 2+2k
        scales = np.array([self.cfg.noise_scale, self.length_scale, self.cfg.noise_w_scale], dtype=np.float32)
        out = self.sess.run(None, {'input': np.array(ids, dtype=np.int64)[None], 'input_lengths': np.array([n], dtype=np.int64),
                                   'scales': scales, 'dur_mult': dm.reshape(1, 1, n)})
        audio = out[0].squeeze()
        peak = float(np.max(np.abs(audio)))
        audio = (audio / peak if peak > 1e-8 else np.zeros_like(audio)).astype(np.float32)
        ms = out[1].squeeze() * self.hop / self.sr * 1000
        segs = []
        for i, t in enumerate(ids):
            if t in (0, 1, 2):
                if segs:
                    segs[-1][1] += float(ms[i])
            else:
                segs.append([self.id2sym.get(t, '?'), float(ms[i])])
        return audio, [(s, m) for s, m in segs]

    def wav_bytes(self, audio):
        import io
        import wave
        buf = io.BytesIO()
        with wave.open(buf, 'wb') as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(self.sr)
            wf.writeframes((np.clip(audio, -1, 1) * 32767).astype(np.int16).tobytes())
        return buf.getvalue()
