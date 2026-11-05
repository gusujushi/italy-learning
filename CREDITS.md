# 致谢与许可说明

## 课程内容

**课文、对话、词汇释义、语法与文化讲解、练习题、写作示范**全部为本项目原创。参考的 GitHub 项目只借鉴了产品设计思路，**没有复制它们的内容或代码**（详见 [docs/REFERENCES.md](docs/REFERENCES.md)）。

> 仓库所有者尚未为本项目选择许可证。在添加 `LICENSE` 文件之前，默认保留所有权利。

## 语音

`audio/` 目录下的 MP3 由 [Piper](https://github.com/OHF-Voice/piper1-gpl) 用 **`it_IT-paola-medium`** 语音合成：

- 语音模型：<https://huggingface.co/rhasspy/piper-voices/tree/main/it/it_IT/paola/medium>
- 训练数据：[paolapersico1/Voice-Dataset-Italian](https://huggingface.co/datasets/paolapersico1/Voice-Dataset-Italian)，许可证 **CC0 1.0**。
- 合成工具 Piper 使用 GPL-3.0，仅用于生成音频；本仓库不包含 Piper 的代码或模型。

这是**合成语音**，不等于真人录音。重音和语调仍请多听真人材料校正。浏览器里也可以改用系统自带的意大利语语音（设置里关闭"使用自带音频"）。

## 公有领域文本

- 第 85 天节选自卡洛·科洛迪（Carlo Collodi，1826–1890）《木偶奇遇记》（*Le avventure di Pinocchio*）第一章开头。作者逝世已久，作品属于公有领域。

## 仅用于开发期质检、不随仓库分发的资源

| 资源 | 许可 |
| --- | --- |
| LibreOffice 意大利语词典（`it_IT`，Hunspell） | GPL-3.0 |
| hermitdave/FrequencyWords `it_50k`（来自 OpenSubtitles） | CC-BY-SA-4.0 |
| 开发工具：`spylls`（MPL-2.0）、`piper-tts`（GPL-3.0）、`ffmpeg`、`onnx` / `onnxruntime`、`numpy` | 各自许可 |
| 音频质检：`faster-whisper` 与 OpenAI Whisper 模型（MIT），只用来把合成语音"听写"回文字做抽查，不参与音频生成 | MIT |

## 字体与图标

页面使用系统字体和 Emoji，未引入第三方字体或图标库。
