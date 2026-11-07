/* 语音识别（主线程这一侧）：管理 Whisper 工作线程（js/asr-worker.js）、下载 / 缓存 / 删除模型。
 *
 * 为什么不用 DeepSeek 来"听"：DeepSeek 的模型只处理文字，不接收音频，也没有语音识别接口。
 * 所以"听"由本机的 Whisper 完成（音频不出设备），DeepSeek 负责拿到识别出来的文字和对比结果之后写评语。
 *
 * 模型和运行库都放在本站（vendor/、models/），总共约 100 MB，不随页面预载：用户在「设置与计划」里点下载，
 * 或第一次评价发音时确认下载。下载好的文件放在 Cache Storage 的 isola-asr-v1 里（见 sw.js），断网也能用。 */
(function (root) {
  'use strict';

  const CACHE = 'isola-asr-v1';
  // 需要的文件（相对站点根目录）和大小（MB，用来显示进度）
  const ASSETS = [
    ['vendor/transformers.min.js', 0.9], ['vendor/ort-wasm-simd-threaded.jsep.mjs', 0.05], ['vendor/ort-wasm-simd-threaded.jsep.wasm', 21.6],
    ['models/whisper-base/config.json', 0.01], ['models/whisper-base/generation_config.json', 0.01], ['models/whisper-base/preprocessor_config.json', 0.01],
    ['models/whisper-base/tokenizer.json', 2.5], ['models/whisper-base/tokenizer_config.json', 0.3],
    ['models/whisper-base/onnx/encoder_model_quantized.onnx', 23.2], ['models/whisper-base/onnx/decoder_model_merged_quantized.onnx', 53.7],
  ];
  const TOTAL_MB = Math.round(ASSETS.reduce((s, a) => s + a[1], 0));
  const IDLE_MS = 3 * 60 * 1000;

  let worker = null, seq = 0, loaded = false, loading = null, idleTimer = null;
  const pending = new Map();
  let progressCb = null;
  const fileProg = new Map();

  const siteRoot = () => new URL('./', document.baseURI).href;
  const url = rel => new URL(rel, siteRoot()).href;

  /** 这台设备 / 这种打开方式能不能运行本机语音识别 */
  function supported() {
    if (!/^https?:$/.test(root.location.protocol)) return { ok: false, reason: 'file', text: '本机语音识别需要通过网址（https 或 localhost）打开本程序；直接双击打开的本地文件用不了。' };
    if (typeof root.Worker === 'undefined' || typeof root.WebAssembly === 'undefined') return { ok: false, reason: 'browser', text: '这个浏览器不支持运行语音识别（需要 WebAssembly 和 Web Worker），请换用较新的 Chrome / Edge / Safari。' };
    return { ok: true };
  }

  function fail(err) {
    pending.forEach(p => p.reject(err));
    pending.clear();
  }

  function start() {
    if (worker) return worker;
    worker = new root.Worker(new URL('js/asr-worker.js', siteRoot()), { type: 'module' });
    worker.onmessage = e => {
      const m = e.data;
      if (m.type === 'progress') { onProgress(m.p); return; }
      const p = pending.get(m.id);
      if (!p) return;
      pending.delete(m.id);
      if (m.type === 'error') p.reject(new Error(m.message)); else p.resolve(m);
    };
    worker.onerror = e => {
      const err = new Error('语音识别线程出错：' + (e && e.message ? e.message : '无法启动（浏览器可能不支持模块线程）'));
      worker = null; loaded = false; loading = null;
      fail(err);
    };
    return worker;
  }

  function call(msg, transfer) {
    return new Promise((resolve, reject) => {
      const id = ++seq;
      pending.set(id, { resolve, reject });
      try { start().postMessage(Object.assign({ id }, msg), transfer || []); } catch (e) { pending.delete(id); reject(e); }
    });
  }

  function onProgress(p) {
    if (!p || !p.file) return;
    if (p.status === 'progress' && p.total) fileProg.set(p.file, { loaded: p.loaded, total: p.total });
    else if (p.status === 'done') { const f = fileProg.get(p.file); if (f) f.loaded = f.total; }
    if (progressCb) {
      let l = 0, t = 0; fileProg.forEach(v => { l += v.loaded; t += v.total; });
      progressCb(t ? l / t : 0, '正在加载语音识别模型…');
    }
  }

  const touch = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(release, IDLE_MS);
  };

  /** 空闲一段时间后释放线程和内存（模型文件仍在缓存里，下次加载很快） */
  function release() {
    clearTimeout(idleTimer);
    if (worker) { try { worker.terminate(); } catch (e) { /* ignore */ } }
    worker = null; loaded = false; loading = null; fail(new Error('语音识别线程已释放'));
  }

  /** 模型文件是否已经下载到本机缓存 */
  async function cached() {
    if (!root.caches) return false;
    try {
      const c = await root.caches.open(CACHE);
      for (const [rel] of ASSETS) if (!(await c.match(url(rel)))) return false;
      return true;
    } catch (e) { return false; }
  }

  /** 下载模型文件到本机缓存（带进度）。已有的会跳过。onProgress(0..1, 说明) */
  async function download(onProg) {
    const sup = supported();
    if (!sup.ok) throw new Error(sup.text);
    const total = ASSETS.reduce((s, a) => s + a[1], 0);
    let done = 0;
    const cache = root.caches ? await root.caches.open(CACHE) : null;
    for (const [rel, mb] of ASSETS) {
      const u = url(rel);
      if (cache && await cache.match(u)) { done += mb; if (onProg) onProg(done / total, rel); continue; }
      const res = await root.fetch(u);
      if (!res.ok) throw new Error('下载失败（' + res.status + '）：' + rel);
      const type = res.headers.get('Content-Type') || 'application/octet-stream';
      const reader = res.body.getReader();
      const chunks = []; let got = 0;
      for (;;) {
        const { done: end, value } = await reader.read();
        if (end) break;
        chunks.push(value); got += value.length;
        if (onProg) onProg(Math.min(1, (done + Math.min(mb, got / 1e6)) / total), rel);
      }
      if (cache) await cache.put(u, new Response(new Blob(chunks, { type }), { status: 200, headers: { 'Content-Type': type } }));
      done += mb;
      if (onProg) onProg(Math.min(1, done / total), rel);
    }
    if (onProg) onProg(1, '');
  }

  /** 加载模型到内存（第一次大约几秒到十几秒，视设备而定） */
  async function load(onProg) {
    const sup = supported();
    if (!sup.ok) throw new Error(sup.text);
    if (loaded) { touch(); return; }
    if (!loading) {
      progressCb = onProg || null; fileProg.clear();
      loading = call({ type: 'load', root: siteRoot() }).then(() => { loaded = true; }).finally(() => { loading = null; });
    } else if (onProg) progressCb = onProg;
    await loading;
    touch();
  }

  /** 识别一段 16 kHz 单声道录音 → 文字 */
  async function transcribe(pcm16k) {
    await load();
    touch();
    const copy = new Float32Array(pcm16k);
    const r = await call({ type: 'transcribe', pcm: copy }, [copy.buffer]);
    touch();
    return r.text;
  }

  /** 强制解码：目标句里每个词在这段录音里的对数概率 → {words:[{text, lp, n}], eot} */
  async function score(pcm16k, text) {
    await load();
    touch();
    const copy = new Float32Array(pcm16k);
    const r = await call({ type: 'score', pcm: copy, text }, [copy.buffer]);
    touch();
    return r.score;
  }

  /** 删除已下载的模型 */
  async function clear() {
    release();
    if (root.caches) await root.caches.delete(CACHE);
  }

  async function status() {
    const sup = supported();
    return { supported: sup.ok, reason: sup.ok ? '' : sup.text, cached: sup.ok ? await cached() : false, loaded, sizeMB: TOTAL_MB };
  }

  root.ASR = { supported, status, cached, download, load, transcribe, score, clear, release, ASSETS, TOTAL_MB, CACHE };
})(window);
