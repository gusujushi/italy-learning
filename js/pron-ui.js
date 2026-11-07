/* 发音评价界面：把"你的录音"和"标准音频"放在一起比较，给出评分、逐词判断、节奏与语调对比图、改正提示，
 * 并（有 AI Key 时）请 DeepSeek 根据识别出的文字和对比数据写点评。
 *
 * 数据流：
 *   录音 Blob ──解码→ 16 kHz 采样 ──┬→ 节奏 / 语调对比（Prosody，纯计算，立刻出结果）
 *   标准音频(mp3) ──解码→ 16 kHz ──┤
 *                                  └→ 本机 Whisper（ASR，音频不出设备）：识别你的录音 + 识别标准音频（用来校准）+ 强制解码打分
 *   识别文字 + 对比数据 ──→ PronEval（逐词判断 / 评分 / 本地提示）──→ DeepSeek（只收到文字和数字，写评语）
 * DeepSeek 是文本模型，不能听音频，所以"听"这一步一定是 Whisper 做的。 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;

  const refCache = new Map();           // 标准音频的解码结果（按文本）

  // 标准音频的识别 / 强制解码结果：同一句只算一次，并记在本机（几百字节一句），下次评价同一句不用再算。
  // 键里带着模型标识，换模型就自动作废。
  const REF_KEY = 'isola.refasr.v1:whisper-base-q8';
  const refMem = new Map();
  const RefStore = {
    all() { try { return JSON.parse(root.localStorage.getItem(REF_KEY) || '{}'); } catch (e) { return {}; } },
    get(k) { if (refMem.has(k)) return refMem.get(k); const v = this.all()[k]; if (v) refMem.set(k, v); return v || null; },
    set(k, v) {
      refMem.set(k, v);
      try {
        const a = this.all(); a[k] = v;
        const keys = Object.keys(a);
        if (keys.length > 600) keys.slice(0, keys.length - 600).forEach(x => delete a[x]);
        root.localStorage.setItem(REF_KEY, JSON.stringify(a));
      } catch (e) { /* 空间不足：只用内存缓存 */ }
    },
    clear() { refMem.clear(); try { root.localStorage.removeItem(REF_KEY); } catch (e) { /* ignore */ } },
  };

  // ---------- 解码 ----------

  function mono(ab) {
    const n = ab.numberOfChannels;
    if (n === 1) return ab.getChannelData(0);
    const out = new Float32Array(ab.length);
    for (let c = 0; c < n; c++) { const d = ab.getChannelData(c); for (let i = 0; i < out.length; i++) out[i] += d[i] / n; }
    return out;
  }

  /** 任意音频文件内容（录音 webm / mp4，或 mp3）→ { pcm, sr } */
  async function decode(arrayBuffer) {
    const Ctx = root.AudioContext || root.webkitAudioContext;
    if (!Ctx) throw new Error('这个浏览器不能解码音频');
    const ctx = new Ctx();
    try {
      const ab = await new Promise((res, rej) => { ctx.decodeAudioData(arrayBuffer.slice(0), res, rej); });
      return { pcm: mono(ab), sr: ab.sampleRate };
    } finally { if (ctx.close) ctx.close().catch(() => {}); }
  }

  async function decodeRef(text) {
    const key = Ita.speakKey(text);
    if (refCache.has(key)) return refCache.get(key);
    const file = (root.AUDIO_MAP || {})[key];
    if (!file) throw new Error('这一句没有标准音频，无法对比');
    let res;
    try { res = await fetch('audio/' + file); } catch (e) { throw new Error('标准音频没能加载（可能没有网络）。在「设置与计划」里点「下载全部音频」之后，断网也能评价。'); }
    if (!res.ok) throw new Error('标准音频加载失败（' + res.status + '）');
    const d = await decode(await res.arrayBuffer());
    refCache.set(key, d);
    return d;
  }

  // ---------- 小图表 ----------

  const SVGNS = 'http://www.w3.org/2000/svg';
  function svg(tag, attrs, text) {
    const e = document.createElementNS(SVGNS, tag);
    Object.keys(attrs || {}).forEach(k => e.setAttribute(k, attrs[k]));
    if (text != null) e.textContent = text;
    return e;
  }

  /** 两条曲线的叠加图。a、b：等长数组（NaN = 断开）。lo/hi：纵轴范围 */
  function chart(title, a, b, lo, hi, label) {
    const W = 320, H = 84, P = 6;
    const el = svg('svg', { viewBox: '0 0 ' + W + ' ' + H, class: 'chart', role: 'img', 'aria-label': label });
    el.append(svg('rect', { x: 0, y: 0, width: W, height: H, rx: 8, class: 'chart-bg' }));
    const y = v => P + (1 - (Math.max(lo, Math.min(hi, v)) - lo) / (hi - lo)) * (H - 2 * P);
    el.append(svg('line', { x1: P, x2: W - P, y1: y(0), y2: y(0), class: 'chart-zero' }));
    const draw = (arr, cls) => {
      let d = '', pen = false;
      arr.forEach((v, i) => {
        if (Number.isNaN(v)) { pen = false; return; }
        const x = P + i / Math.max(1, arr.length - 1) * (W - 2 * P);
        d += (pen ? 'L' : 'M') + x.toFixed(1) + ' ' + y(v).toFixed(1) + ' '; pen = true;
      });
      if (d) el.append(svg('path', { d, class: 'chart-line ' + cls }));
    };
    draw(a, 'ref'); draw(b, 'user');
    return h('figure', { class: 'chart-fig' }, el, h('figcaption', { class: 'small muted', text: title }));
  }

  // ---------- 结果展示 ----------

  const ST_ICON = { ok: '✓', slip: '≈', wrong: '✗', missing: '∅', unclear: '?', unreliable: '–' };

  const WHY = { short: '（词太短，识别器常漏听，不判断）', ref: '（标准音频也没被识别准，不判断）' };

  function wordChips(rows) {
    return h('div', { class: 'wchips', role: 'list' }, rows.map(r => h('span', { class: 'wchip ' + r.status, role: 'listitem',
      title: PronEval.STATUS_ZH[r.status] + (r.status === 'unreliable' ? WHY[r.why] || '' : '') + (r.heard && r.status !== 'ok' && r.status !== 'unreliable' ? ' · 识别成「' + r.heard + '」' : '') },
      h('b', { class: 'it', lang: 'it', text: r.raw }), h('small', { text: ST_ICON[r.status] + ' ' + PronEval.STATUS_ZH[r.status] }))));
  }

  const dirZh = d => (d === 'rise' ? '上扬 ↗' : d === 'fall' ? '下降 ↘' : d === 'flat' ? '平 →' : '—');

  function metricTable(c) {
    if (!c || c.tooQuiet) return null;
    const row = (k, user, ref, ok) => h('tr', null, h('th', { text: k }), h('td', { text: user }), h('td', { text: ref }), h('td', { class: ok == null ? '' : ok ? 'good' : 'warn', text: ok == null ? '' : ok ? '接近' : '有差异' }));
    return h('div', { class: 'tbl-wrap' }, h('table', { class: 'tbl metric' },
      h('thead', null, h('tr', null, ['', '你', '标准', ''].map(t => h('th', { text: t })))),
      h('tbody', null,
        row('语音时长', c.user.speech.toFixed(1) + ' 秒', c.ref.speech.toFixed(1) + ' 秒', c.ratio >= 0.8 && c.ratio <= 1.4),
        row('音节数（估计）', String(c.user.syllables), String(c.ref.syllables), Math.abs(c.syllableDiff) <= 1),
        row('明显停顿', c.user.pauses.length + ' 次', c.ref.pauses.length + ' 次', Math.abs(c.pauseDiff) <= 0),
        row('句尾语调', dirZh(c.user.pitch.final.dir), dirZh(c.ref.pitch.final.dir), c.finalMatch),
        row('节奏相似度', Math.round(c.rhythm * 100) + '%', '—', c.rhythm >= 0.6))));
  }

  function scoreRing(score) {
    const rc = score == null ? 'var(--muted)' : score >= 75 ? 'var(--ok)' : score >= 55 ? '#e0a100' : 'var(--bad)';
    return h('div', { class: 'ring', style: { '--p': score == null ? 0 : score, '--rc': rc } }, h('b', { text: score == null ? '—' : String(score) }), h('small', { text: '分' }));
  }

  // ---------- 主流程 ----------

  /**
   * opts: { line: {it, zh, i}, blob, n, title, host, onScore(score), engineNote }
   * 在 host 里画出评价界面，返回 { cancel }。
   */
  function run(opts) {
    const host = opts.host, line = opts.line;
    let dead = false;
    clear(host);
    const status = h('div', { class: 'status', 'aria-live': 'polite', text: '正在分析录音……' });
    const bar = h('div', { class: 'bar', hidden: true }, h('i', { style: { width: '0%' } }));
    host.append(h('div', { class: 'eval' }, h('h4', { text: '📊 发音评价' }), status, bar));
    const box = host.firstChild;
    const say = t => { if (!dead) status.textContent = t; };
    const prog = (p, t) => { if (dead) return; bar.hidden = false; bar.firstChild.style.width = Math.round(100 * p) + '%'; if (t) status.textContent = t; };

    (async () => {
      // 1) 解码 + 节奏 / 语调（不需要识别器，马上出）
      let user, ref, metrics = null;
      try {
        user = await decode(await opts.blob.arrayBuffer());
        ref = await decodeRef(line.it);
        metrics = Prosody.compare(user.pcm, user.sr, ref.pcm, ref.sr);
      } catch (e) { say('无法分析录音：' + e.message); return; }
      if (dead) return;

      // 2) 本机语音识别（可选）
      let heardUser = null, heardRef = null, scoreUser = null, scoreRef = null, asrNote = '';
      const sup = ASR.supported();
      if (!Store.setting('asrOn')) asrNote = '语音识别已在设置里关闭，下面只有节奏与语调的对比。';
      else if (!sup.ok) asrNote = sup.text + ' 下面只有节奏与语调的对比。';
      else {
        try {
          if (!(await ASR.cached())) {
            const go = await UI.confirmBox('需要下载语音识别模型', '要给你的发音逐词打分，需要先把语音识别模型下载到本机（约 ' + ASR.TOTAL_MB + ' MB，只下载一次，之后可离线使用；你的录音不会上传）。现在下载吗？', '下载并继续');
            if (dead) return;
            if (!go) throw new Error('skip');
            await ASR.download((p, f) => prog(p, '正在下载语音识别模型（' + Math.round(p * 100) + '%）…'));
          }
          prog(0.0, '正在加载语音识别（第一次要几秒到十几秒）…');
          await ASR.load((p, t) => prog(p, t));
          if (dead) return;
          bar.hidden = true;
          const u16 = Prosody.prepare(user.pcm, user.sr);
          const r16 = Prosody.prepare(ref.pcm, ref.sr);
          say('正在识别你的录音……');
          heardUser = await ASR.transcribe(u16);
          const stext = PronEval.tokenize(line.it).map(w => w.raw).join(' ');      // 清掉独立的标点 / 数字，保证词数和判断用的词表一致
          scoreUser = lps(await ASR.score(u16, stext), line.it);
          if (dead) return;
          const key = Ita.speakKey(line.it);
          let rc = RefStore.get(key);
          if (!rc) {
            say('正在识别标准音频（用来校准，同一句只算一次，结果会记在本机）……');
            const hr = await ASR.transcribe(r16);
            rc = { heard: hr, lp: lps(await ASR.score(r16, stext), line.it) };
            RefStore.set(key, rc);
          }
          heardRef = rc.heard; scoreRef = rc.lp;
        } catch (e) {
          if (dead) return;
          heardUser = heardRef = scoreUser = scoreRef = null;
          asrNote = e.message === 'skip' ? '没有下载语音识别模型，下面只有节奏与语调的对比。' : '语音识别没能运行：' + e.message + '。下面只有节奏与语调的对比。';
        }
      }
      if (dead) return;
      bar.hidden = true;

      // 3) 综合判断
      const have = heardUser != null;
      const ev = have
        ? PronEval.evaluate({ target: line.it, heardUser, heardRef, metrics, scoreUser, scoreRef })
        : { rows: PronEval.tokenize(line.it).map(w => ({ raw: w.raw, norm: w.norm, status: 'unreliable', heard: '' })), score: null, level: '', tips: [], prosodyTips: PronEval.prosodyTips(metrics) };
      if (have && opts.onScore) opts.onScore(ev.score);

      renderResult(box, { ev, have, heardUser, heardRef, metrics, asrNote, line, opts });
    })().catch(e => say('评价出错：' + e.message));

    return { cancel() { dead = true; } };
  }

  /** 强制解码返回的每个词的对数概率；词数和判断用的词表对不上（分词不同）就不使用（返回 null） */
  function lps(sc, target) {
    const t = PronEval.tokenize(target);
    if (!sc || !sc.words || sc.words.length !== t.length) return null;
    return sc.words.map(w => w.lp);
  }

  function renderResult(box, r) {
    const { ev, have, heardUser, heardRef, metrics, asrNote, line, opts } = r;
    clear(box);
    box.append(h('h4', { text: '📊 发音评价' }));
    if (have) {
      box.append(h('div', { class: 'row gap eval-head' }, scoreRing(ev.score),
        h('div', null, h('b', { class: 'big', text: ev.level }),
          h('div', { class: 'small muted', text: '听懂度（不是发音标准度）· ' + (ev.judged ? '依据 ' + ev.judged + ' 个可判断的词' + (ev.rows.some(x => x.status === 'unreliable') ? '；灰色的词（太短，或标准音频也没被识别准）不计分' : '') : '没有可判断的词') }))));
      box.append(wordChips(ev.rows));
      box.append(h('p', { class: 'small muted', style: { margin: '4px 0 0' }, text: '标色是识别器的判断，不是定论：母语者把句子读对，也约有 4% 的词会被标成「有点出入」之类。拿不准就点 ▶ 听标准音频，再用「⇄ 对比原音」自己比一比。' }));
      box.append(h('p', { class: 'small', style: { margin: '6px 0 0' } },
        h('span', { class: 'lbl', text: '你的录音识别为：' }), h('span', { class: 'it', lang: 'it', text: heardUser ? '「' + heardUser + '」' : '（没有识别出内容）' })),
      h('p', { class: 'small', style: { margin: '2px 0 8px' } }, h('span', { class: 'lbl', text: '标准音频识别为：' }), h('span', { class: 'it', lang: 'it', text: '「' + (heardRef || '') + '」' })));
    } else {
      box.append(h('div', { class: 'note', text: asrNote }));
    }

    const mt = metricTable(metrics);
    if (mt) {
      box.append(h('h4', { text: '节奏与语调（和标准音频对比）' }), mt);
      const pu = metrics.user.pitch.pts, pr = metrics.ref.pitch.pts;
      if (metrics.voicedOk) box.append(chart('音高曲线：蓝 = 标准，橙 = 你（相对半音，看起伏的形状，不看高低）', pr, pu, -8, 8, '音高曲线对比'));
      const sh = (a, n) => { const o = []; for (let i = 0; i < n; i++) o.push(a.length ? a[Math.min(a.length - 1, Math.floor(i / n * a.length))] : NaN); return o; };
      box.append(chart('能量（节奏）：蓝 = 标准，橙 = 你（拉伸到同样长度，看重读音节的位置）', sh(metrics.ref.shape, 60), sh(metrics.user.shape, 60), -2.5, 2.5, '能量包络对比'));
    }

    const focus = PronEval.focus ? PronEval.focus(line.it) : [];
    const tips = (ev.tips || []).concat(ev.prosodyTips || []);
    if (tips.length) box.append(h('h4', { text: '改正提示（程序规则生成）' }), h('ul', { class: 'tips' }, tips.map(t => h('li', { text: t }))));
    else if (have) box.append(h('p', { class: 'small', style: { margin: '8px 0' }, text: '✓ 没有发现明显的问题。' }));
    if (focus.length) box.append(h('h4', { text: '这一句的发音重点（不管识别结果怎样，都建议对照检查）' }), h('ul', { class: 'tips' }, focus.map(t => h('li', { text: t }))));

    box.append(h('p', { class: 'muted small', style: { margin: '8px 0' } }, '⚠ 分数只表示「识别器听懂了多少」。识别器很宽容——读错的词它常常会自动纠正成对的——所以细微的问题（双辅音的长短、词尾元音有没有读满、e / o 的开闭口）它听不出来，满分也不代表发音标准。请对照下面的「发音重点」，用「⇄ 对比原音」自己听差别，并多找真人反馈。', have ? '' : ' ' + asrNote));

    // AI 点评
    const aiBox = h('div', { class: 'ai-box' }, h('h4', { text: '🤖 AI 老师点评' }));
    box.append(aiBox);
    const payload = PronEval.aiPayload({ target: line.it, zh: line.zh, heardUser, heardRef, rows: ev.rows, score: ev.score, metrics });
    const ask = async () => {
      clear(aiBox); aiBox.append(h('h4', { text: '🤖 AI 老师点评' }), h('p', { class: 'muted small', text: '正在写点评……（只把识别出的文字和对比数字发给 DeepSeek，不发送音频）' }));
      try {
        const t = await AI.pronFeedback(payload, { n: opts.n, title: opts.title });
        clear(aiBox); aiBox.append(h('h4', { text: '🤖 AI 老师点评' }), h('div', { class: 'small', html: UI.md(t) }), h('p', { class: 'muted small', style: { margin: '6px 0 0' }, text: 'DeepSeek 看不到音频，点评只依据上面的文字和数据，可能出错。' }));
      } catch (e) {
        clear(aiBox); aiBox.append(h('h4', { text: '🤖 AI 老师点评' }), h('p', { class: 'why', style: { color: 'var(--bad)' }, text: '出错了：' + e.message }), h('button', { class: 'btn sm', type: 'button', onclick: ask, text: '重试' }));
      }
    };
    if (!AI.ready()) aiBox.append(h('p', { class: 'muted small', style: { margin: 0 } }, '想要针对你这次发音的详细点评和改正意见？在', h('a', { href: '#/settings', text: '「设置与计划」' }), '填入 DeepSeek API Key 即可（可选）。DeepSeek 只收到识别出的文字和对比数字，收不到音频。'));
    else if (Store.setting('pronAI') !== false) ask();
    else aiBox.append(h('button', { class: 'btn sm', type: 'button', onclick: ask, text: '让 AI 老师点评这次发音' }));
  }

  root.PronUI = { run, decode, decodeRef, RefStore };
})(window);
