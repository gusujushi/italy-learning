# vendor/ —— 本机语音识别用的第三方运行库（原样放入，未修改）

| 文件 | 来源 | 版本 | 许可证 |
| --- | --- | --- | --- |
| `transformers.min.js` | npm 包 [`@huggingface/transformers`](https://www.npmjs.com/package/@huggingface/transformers) 的 `dist/transformers.min.js` | 3.7.6 | Apache-2.0（`LICENSE-transformers.js.txt`） |
| `ort-wasm-simd-threaded.jsep.mjs`、`ort-wasm-simd-threaded.jsep.wasm` | 同一个 npm 包 `dist/` 里自带的 ONNX Runtime Web 运行时（`onnxruntime-web` 1.22.0-dev.20250409） | 同上 | MIT（`LICENSE-onnxruntime-web.txt`） |

用途：`js/asr-worker.js`（模块 Worker）在浏览器里用它们运行 Whisper 模型（见 `models/`）。

校验值（sha256）：

```
13746ae88695b62e431fc5ebe3beb10a080d2081406047670639ce8c10a9ba25  transformers.min.js
08fb86ec433c78bfb032c5d84a68b8e8e5a8d81268fa39e24314179a5767a5b9  ort-wasm-simd-threaded.jsep.mjs
c46655e8a94afc45338d4cb2b840475f88e5012d524509916e505079c00bfa39  ort-wasm-simd-threaded.jsep.wasm
```

更新方法：`npm pack @huggingface/transformers@<版本>`，把 `dist/` 里同名的三个文件换进来，并同步更新 `js/asr.js` 里的文件清单与这里的校验值。
