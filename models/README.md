# models/ —— 本机语音识别用的 Whisper 模型（原样放入，未修改）

`whisper-base/` 来自 Hugging Face 仓库 [`onnx-community/whisper-base`](https://huggingface.co/onnx-community/whisper-base)
（OpenAI Whisper base 的 ONNX 导出，模型卡标注许可证 Apache-2.0；OpenAI Whisper 原模型为 MIT 许可）。
只放了运行所需的文件，使用 int8 量化版本（体积小，能在手机上跑）：

| 文件 | 大小 | sha256 |
| --- | --- | --- |
| `onnx/encoder_model_quantized.onnx` | 23.2 MB | `5862993336bf33acd23736071aae2b32261d3b1b2f37780194460d4ef974dd46` |
| `onnx/decoder_model_merged_quantized.onnx` | 53.7 MB | `fa3ef9902734ce5ae6f9ef2bdb2ba9a6c4b5785b09f4f420ce036573dc9d090b` |
| `config.json` / `generation_config.json` / `preprocessor_config.json` | 很小 | — |
| `tokenizer.json` / `tokenizer_config.json` | 2.5 MB / 0.3 MB | — |

用途：`js/asr-worker.js` 在浏览器里加载它们，识别录音、给目标句里的每个词打分。
这些文件不会随页面一起加载：用户在「设置与计划 → 发音评价」里点下载（或第一次评价发音时确认下载）才会取，之后缓存在本机。

这是体积最小的 Whisper 之一，对意大利语的识别并不完美，局限见 `docs/PRONUNCIATION_EVAL.md`。
