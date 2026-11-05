# 参考项目调研

本程序的设计参考了 GitHub 上的新概念英语（NCE）学习程序，以及几个面向中文学习者的意大利语学习站。这里记录：**看了什么、学到什么、没有复制什么**。

> **"能力岛"指的是 [gusujushi/nce-english-island](https://github.com/gusujushi/nce-english-island)**（新概念英语能力岛 1–4 册）：把新概念英语的原声和课文变成闯关式学习——全程英式发音、彩色句子分析、每课 6 步学习法、学习计划可调。本项目的程序流程对齐它，逐项对应、没有移植的部分和原因见 [REFERENCE_ALIGNMENT.md](REFERENCE_ALIGNMENT.md)。只借鉴了产品流程与设计取舍，**没有复制它的代码或文字**（该仓库没有 LICENSE 文件）。

## 一、新概念英语（NCE）程序

| 项目 | 许可证 | 是什么 | 对本项目的启发 |
| --- | --- | --- | --- |
| [iChochy/nce](https://github.com/iChochy/nce) | MIT | 《新概念英语》全四册在线点读系统，纯静态（HTML/CSS/JS 模块），课件与音频放在外部站点 | **数据格式**：每课一个音频 + 一份 LRC 字幕，每行 `[mm:ss.xx]英文 \| 中文`；**交互**：单句点读、5 种循环（关 / 点击 / 单句 / 列表 / 全册）、6 档倍速（0.5–2.0）、4 种翻译显示（全显 / 仅英 / 仅中 / 模糊）、记忆播放位置、预加载与 LRU 缓存 |
| [magang0425/NCE](https://github.com/magang0425/NCE) | 无 | NCE 学习平台，含四册音频与 LRC | 学习时长与连续天数统计、收藏、键盘快捷键。**仓库含 NCE 原版音频与字幕（有版权），未使用其任何数据或代码** |
| [wish1776/NCE](https://github.com/wish1776/NCE) | MIT（标注） | 仅包含若干"应时新概念英语"PDF | 与本项目无关，未使用 |

### 本项目借鉴的设计

| NCE 程序的做法 | 本项目的实现 |
| --- | --- |
| 点读 + 中英对照，可隐藏任一语言 | 阅读器：点句播放；中 / 意独立开关，"遮中文"模糊自测；点词看释义 |
| 单句循环、整篇循环、变速 | 单句 / 整段循环，0.7× / 0.85× / 1× 三档（音频用 `playbackRate`，保持音高） |
| LRC 一行一句的双语文本 | 课程数据一行一句：`角色: 意大利语 \| 中文`（见 [DATA_FORMAT.md](DATA_FORMAT.md)） |
| 学习进度、连续天数 | 每课 6 步进度、闯关成绩、连续天数、学习分钟、五项能力雷达、徽章 |
| 新概念原书的"课文 → 单词 → 语法 → 练习"；能力岛的 6 步法 | 每课 6 步：导读盲听 → 词汇 → 逐句精读 → 语法透视 → 影子跟读 → 闯关测验 |

不同之处：NCE 程序的内容（课文与音频）已经存在；意大利语没有可直接复用、许可证允许的"新概念式"教材，所以**课文、词汇、讲解、题目全部原创**，并用脚本自动生成练习。

## 二、意大利语学习项目（只借鉴思路，未复制内容）

这些项目**都没有开源许可证**（默认保留所有权利），课文往往来自受版权保护的教材 PDF，因此只参考了产品设计与课程编排：

| 项目 | 内容 | 参考点 |
| --- | --- | --- |
| [zhumang1121/pronto-italian-a1-a2](https://github.com/zhumang1121/pronto-italian-a1-a2) | 面向中文初学者的 A1/A2 学习站：17 个单元、词汇与语法微课、自测、逐句听力、自动复习，用 Piper `it_IT-paola-medium` 合成音频 | 学习闭环"选单元 → 理解 → 记忆 → 输出 → 到期复习"；"先听后看、中意文本分别显隐"；与本项目采用了同一个开放语音模型 |
| [realrentao/italian-50-lessons](https://github.com/realrentao/italian-50-lessons) | 50 篇中意对照短文，5 册 × 10 课，由现在时一路到近过去时、将来时 | 课程编排：先现在时，再过去时，再将来时；每课"短文 + 生词 + 语法 + 练习" |
| [realrentao/italian-vocabulary-list](https://github.com/realrentao/italian-vocabulary-list) | A1–C2 的 6000 词学习站：翻卡、拼写测试、错题本、间隔复习 | 错题本、"认识 / 不会"二选一评分、间隔加倍的复习规则 |
| [realrentao/italian-scenarios](https://github.com/realrentao/italian-scenarios) | 意大利语实用情景学习站 | 以"情景"组织内容的思路 |

## 三、真正在本项目中使用的开放资源

| 资源 | 许可 | 用途 | 是否随仓库分发 |
| --- | --- | --- | --- |
| Piper 语音 `it_IT-paola-medium`（训练数据 [paolapersico1/Voice-Dataset-Italian](https://huggingface.co/datasets/paolapersico1/Voice-Dataset-Italian)，**CC0**） | CC0（数据集） | 离线合成 `audio/` 下的全部意大利语音频 | 只分发合成出的 MP3，不分发模型 |
| [Piper](https://github.com/OHF-Voice/piper1-gpl)（GPL-3.0） | GPL-3.0 | 合成工具，仅在开发机上运行 | 否 |
| LibreOffice 意大利语 Hunspell 词典（[LibreOffice/dictionaries](https://github.com/LibreOffice/dictionaries) 的 `it_IT`） | GPL-3.0 | 课程全部意大利语文本的拼写质检 | 否 |
| [hermitdave/FrequencyWords](https://github.com/hermitdave/FrequencyWords) 的 `it_50k`（OpenSubtitles） | CC-BY-SA-4.0（内容） | 检查前 30 天是否出现过于生僻的词 | 否 |
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper) + OpenAI Whisper `small` 模型 | MIT | 把合成音频"听写"回文字，抽查读错或听不清的句子 | 否 |
| 卡洛·科洛迪《木偶奇遇记》第一章开头 | 公有领域（作者卒于 1890 年） | 第 85 天经典阅读 | 是（短节选） |

详细的归属说明见根目录 [CREDITS.md](../CREDITS.md)。
