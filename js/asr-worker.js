/* 语音识别工作线程（模块 Worker）：在浏览器里用 Whisper（base，int8 量化）做两件事——
 *   transcribe：把一段 16 kHz 单声道录音识别成文字（language = 意大利语）；
 *   score：强制解码——给定"目标句"，算出每个词在这段录音里的对数概率（越接近 0 越"听得出来是这个词"）。
 * 运行库和模型都放在本站（vendor/、models/），音频不会离开你的设备。
 * 只能在 http(s) 页面里使用（模块 Worker 不能从 file:// 加载）。 */
import { AutoProcessor, AutoTokenizer, WhisperForConditionalGeneration, Tensor, env } from '../vendor/transformers.min.js';

const MODEL = 'whisper-base';
let processor = null, tokenizer = null, model = null, gen = null, loading = null;
let queue = Promise.resolve();

const post = m => self.postMessage(m);

async function load(root) {
  if (model) return;
  if (!loading) {
    loading = (async () => {
      const site = new URL(root);
      env.allowRemoteModels = false;
      env.allowLocalModels = true;
      env.localModelPath = new URL('models/', site).href;
      env.backends.onnx.wasm.wasmPaths = new URL('vendor/', site).href;
      env.backends.onnx.wasm.numThreads = 1;               // 没有跨源隔离（SharedArrayBuffer）时只能单线程
      const progress_callback = p => post({ type: 'progress', p });
      gen = await (await fetch(new URL('models/' + MODEL + '/generation_config.json', site))).json();
      const [pr, tk, md] = await Promise.all([
        AutoProcessor.from_pretrained(MODEL, { progress_callback }),
        AutoTokenizer.from_pretrained(MODEL, { progress_callback }),
        WhisperForConditionalGeneration.from_pretrained(MODEL, { dtype: { encoder_model: 'q8', decoder_model_merged: 'q8' }, device: 'wasm', progress_callback }),
      ]);
      processor = pr; tokenizer = tk; model = md;
    })();
  }
  try { await loading; } finally { loading = null; }
}

const MAX_SAMPLES = 16000 * 28;

/** 编码器是最耗时的一步（单线程约几秒）。同一段录音要做"识别"和"打分"两件事，共用一次编码：
 *  这里把编码结果缓存起来，下次用同一段音频时直接取。（Whisper 的 forward_params 里没有 encoder_outputs，运行时补上。） */
let encCache = { key: null, inputs: null, enc: null };
async function encode(pcm) {
  const x = pcm.length > MAX_SAMPLES ? pcm.subarray(0, MAX_SAMPLES) : pcm;
  const key = x.length + ':' + x[0] + ':' + x[x.length >> 1] + ':' + x[x.length - 1];
  if (encCache.key === key) return encCache;
  if (!model.forward_params.includes('encoder_outputs')) model.forward_params = model.forward_params.concat('encoder_outputs');
  const inputs = await processor(x);
  const out = await model.sessions.model.run({ input_features: inputs.input_features.ort_tensor || inputs.input_features });
  encCache = { key, inputs, enc: new Tensor(out.last_hidden_state) };
  return encCache;
}

async function transcribe(pcm) {
  const { inputs, enc } = await encode(pcm);
  const out = await model.generate({ input_features: inputs.input_features, encoder_outputs: enc, language: 'italian', task: 'transcribe', max_new_tokens: 96 });
  return tokenizer.batch_decode(out, { skip_special_tokens: true })[0].trim();
}

/** 强制解码：返回 [{text, lp, n}]（每个词的对数概率之和 / token 数）和句末符号的对数概率 */
async function score(pcm, text) {
  const { enc } = await encode(pcm);
  const prefix = [gen.decoder_start_token_id ?? 50258, gen.lang_to_id['<|it|>'], gen.task_to_id.transcribe, gen.no_timestamps_token_id];
  const ids = Array.from(tokenizer.encode(' ' + text, { add_special_tokens: false }));
  const dec = prefix.concat(ids, [gen.eos_token_id]);
  const decoder_input_ids = new Tensor('int64', BigInt64Array.from(dec.map(BigInt)), [1, dec.length]);
  const out = await model({ encoder_outputs: enc, decoder_input_ids });
  const V = out.logits.dims[2], data = out.logits.data;
  const lp = [];
  for (let t = prefix.length - 1; t < dec.length - 1; t++) {            // 位置 t 预测 dec[t + 1]
    let mx = -Infinity;
    for (let v = 0; v < V; v++) { const q = data[t * V + v]; if (q > mx) mx = q; }
    let sum = 0;
    for (let v = 0; v < V; v++) sum += Math.exp(data[t * V + v] - mx);
    lp.push(data[t * V + dec[t + 1]] - mx - Math.log(sum));
  }
  const words = [];
  ids.forEach((id, k) => {
    const piece = tokenizer.decode([id]);
    if (piece.startsWith(' ') || !words.length) words.push({ text: piece.trim(), lp: 0, n: 0 });
    else words[words.length - 1].text += piece;
    const w = words[words.length - 1];
    w.lp += lp[k]; w.n++;
  });
  return { words, eot: lp[lp.length - 1] };
}

self.onmessage = e => {
  const m = e.data;
  // 推理必须一个接一个：同一个模型会话不能并发运行
  queue = queue.then(async () => {
    try {
      if (m.type === 'load') { await load(m.root); post({ type: 'loaded', id: m.id }); }
      else if (!model) throw new Error('模型还没有加载');
      else if (m.type === 'transcribe') post({ type: 'result', id: m.id, text: await transcribe(m.pcm) });
      else if (m.type === 'score') post({ type: 'result', id: m.id, score: await score(m.pcm, m.text) });
    } catch (err) {
      post({ type: 'error', id: m.id, message: String((err && err.message) || err) });
    }
  });
};
