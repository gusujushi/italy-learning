/* 声音：优先播放预生成的意大利语 MP3（audio/manifest.js），没有则回退到浏览器语音合成；
 * 另含录音（MediaRecorder）与语音识别（SpeechRecognition，需联网，国内通常不可用）。 */
(function (root) {
  'use strict';

  const AUDIO_DIR = 'audio/';
  let token = 0;          // 每次 stop()/play() 自增，用来让过期的异步流程自行终止
  let curAudio = null;
  let pending = null;     // 当前等待中的 Promise resolver，stop() 时释放它
  let warnedNoVoice = false;

  function map() { return root.AUDIO_MAP || {}; }
  const hasTTS = () => 'speechSynthesis' in root && typeof root.SpeechSynthesisUtterance === 'function';

  function stop() {
    token++;
    if (pending) { const r = pending; pending = null; r(false); }
    if (curAudio) { try { curAudio.pause(); } catch (e) { /* ignore */ } curAudio = null; }
    if (hasTTS()) { try { root.speechSynthesis.cancel(); } catch (e) { /* ignore */ } }
  }

  function playFile(file, rate) {
    return new Promise(resolve => {
      const a = new Audio(AUDIO_DIR + file);
      a.preload = 'auto';
      a.playbackRate = rate;
      if ('preservesPitch' in a) a.preservesPitch = true;
      else if ('webkitPreservesPitch' in a) a.webkitPreservesPitch = true;
      curAudio = a;
      const fin = v => { if (pending === fin) pending = null; resolve(v); };
      pending = fin;
      a.onended = () => fin(true);
      a.onerror = () => fin(false);
      const p = a.play();
      if (p && p.catch) p.catch(() => fin(false));
    });
  }

  function voices() {
    if (!hasTTS()) return [];
    return root.speechSynthesis.getVoices().filter(v => /^it([-_]|$)/i.test(v.lang));
  }
  function pickVoice() {
    const list = voices();
    if (!list.length) return null;
    const uri = Store.setting('voiceURI');
    return list.find(v => v.voiceURI === uri) || list.find(v => /it[-_]IT/i.test(v.lang)) || list[0];
  }

  function speakTTS(text, rate) {
    return new Promise(resolve => {
      if (!hasTTS()) return resolve(false);
      const v = pickVoice();
      if (!v && !warnedNoVoice) {
        warnedNoVoice = true;
        UI.toast('这台设备没有意大利语语音。建议使用 Chrome / Edge / Safari，或使用自带音频版。', 4000);
      }
      const u = new root.SpeechSynthesisUtterance(text);
      u.lang = 'it-IT'; if (v) u.voice = v;
      u.rate = Math.max(0.5, Math.min(1.4, rate * 0.95));
      let done = false;
      const fin = ok => { if (done) return; done = true; clearTimeout(dog); if (pending === fin) pending = null; resolve(ok); };
      const dog = setTimeout(() => fin(false), 2500 + text.length * 140); // 某些浏览器不触发 onend
      pending = fin;
      u.onend = () => fin(true);
      u.onerror = () => fin(false);
      try { root.speechSynthesis.speak(u); } catch (e) { fin(false); }
    });
  }

  /** 朗读一段意大利语。返回 true=正常播完。可被 stop() 打断。 */
  async function play(text, opts) {
    opts = opts || {};
    stop();
    const my = token;
    const key = Ita.speakKey(text);
    const file = map()[key];
    const rate = opts.rate || Store.setting('speed') || 1;
    let ok = false;
    if (file && Store.setting('useRecorded')) ok = await playFile(file, rate);
    if (my !== token) return false;
    if (!ok) ok = await speakTTS(text, rate);
    return my === token && ok;
  }

  /** 可被 stop() 打断的等待：正常等完返回 true，被打断返回 false */
  const wait = ms => new Promise(r => {
    let fin;
    const t = setTimeout(() => { if (pending === fin) pending = null; r(true); }, ms);
    fin = () => { clearTimeout(t); r(false); };
    pending = fin;
  });

  /** 依次朗读多句。opts: gap, rate, onStart(i), onEnd(i) */
  async function playSeq(texts, opts) {
    opts = opts || {};
    stop();
    const my = token;
    for (let i = 0; i < texts.length; i++) {
      if (my !== token) return false;
      if (opts.onStart) opts.onStart(i);
      const key = Ita.speakKey(texts[i]);
      const file = map()[key];
      const rate = opts.rate || Store.setting('speed') || 1;
      let ok = false;
      if (file && Store.setting('useRecorded')) ok = await playFile(file, rate);
      if (my !== token) return false;
      if (!ok) ok = await speakTTS(texts[i], rate);
      if (my !== token) return false;
      if (opts.onEnd) opts.onEnd(i);
      if (i < texts.length - 1 && (opts.gap || 0) > 0) { const w = await wait(opts.gap); if (!w || my !== token) return false; }
    }
    return true;
  }

  /** 这条文本有没有预生成音频？ */
  function hasFile(text) { return !!map()[Ita.speakKey(text)]; }

  // ---------- 录音 ----------
  function canRecord() {
    return !!(root.navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && root.MediaRecorder);
  }
  async function startRecording() {
    stop();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
    const mime = types.find(t => root.MediaRecorder.isTypeSupported && root.MediaRecorder.isTypeSupported(t)) || '';
    const rec = new root.MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    const chunks = [];
    rec.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
    rec.start();
    return {
      stop: () => new Promise(res => {
        rec.onstop = () => {
          stream.getTracks().forEach(t => t.stop());
          const blob = new Blob(chunks, { type: rec.mimeType || mime || 'audio/webm' });
          res({ blob, url: URL.createObjectURL(blob) });
        };
        try { rec.stop(); } catch (e) { res(null); }
      }),
    };
  }

  // ---------- 语音识别 ----------
  function canRecognize() { return !!(root.SpeechRecognition || root.webkitSpeechRecognition); }
  /** 返回 {promise, abort}；promise 解析为候选文本数组 */
  function recognize() {
    const SR = root.SpeechRecognition || root.webkitSpeechRecognition;
    const r = new SR();
    r.lang = 'it-IT'; r.interimResults = false; r.maxAlternatives = 3; r.continuous = false;
    const promise = new Promise((resolve, reject) => {
      let got = false;
      r.onresult = e => {
        got = true;
        const alts = [];
        for (let i = 0; i < e.results.length; i++) for (let j = 0; j < e.results[i].length; j++) alts.push(e.results[i][j].transcript);
        resolve(alts);
      };
      r.onerror = e => reject(new Error(e.error || 'error'));
      r.onend = () => { if (!got) resolve([]); };
      try { r.start(); } catch (e) { reject(e); }
    });
    return { promise, abort: () => { try { r.abort(); } catch (e) { /* ignore */ } } };
  }
  /** 识别结果与目标句的最高相似度（0–1） */
  function matchScore(alts, target) {
    const t = Ita.norm(target);
    return alts.reduce((m, a) => Math.max(m, Ita.similarity(Ita.norm(a), t)), 0);
  }

  function status() {
    return { files: Object.keys(map()).length, tts: hasTTS(), itVoice: voices().length > 0, rec: canRecord(), sr: canRecognize() };
  }

  if (hasTTS()) { try { root.speechSynthesis.getVoices(); root.speechSynthesis.onvoiceschanged = () => {}; } catch (e) { /* ignore */ } }

  root.Sound = { play, playSeq, stop, hasFile, voices, canRecord, startRecording, canRecognize, recognize, matchScore, status };
})(window);
