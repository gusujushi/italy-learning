/* ⑤ 影子跟读：听一句、马上跟着说一句。三种方式：
 *   🎤 逐句录音：听原音 → 录自己 → 对比 → 自评
 *   🧩 意群跟读：整句按意群切开，逐块高亮、逐块跟读，再连起来读
 *   ▶ 自动连读：程序放一句、留出和这句一样长的空档让你跟读，自动往下走
 *   🎭 角色扮演：程序读对方的台词，轮到你时看中文提示开口说
 * 另有"看中文，开口说"：每课 3–5 个场景任务，先自己说，再看参考。 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;
  const MODES = [['rec', '🎤 逐句录音'], ['chunk', '🧩 意群跟读'], ['auto', '▶ 自动连读'], ['role', '🎭 角色扮演']];

  function ratingBar(onRate) {
    let rated = null;
    const box = h('div', { class: 'rate3', role: 'group', 'aria-label': '自评' });
    [['😕', 0, '还不太像'], ['🙂', 1, '基本像'], ['😀', 2, '很像']].forEach(([e, v, t]) => {
      box.append(h('button', { type: 'button', title: t, 'aria-label': t, text: e, onclick: ev => {
        Array.prototype.forEach.call(box.children, c => c.classList.remove('on')); ev.currentTarget.classList.add('on');
        onRate(v, rated === null); rated = v;
      } }));
    });
    return box;
  }

  /** 看中文，开口说：每课的场景任务。先自己说，再看参考，最后自评 */
  function speakCard(ctx, act) {
    const tasks = ctx.d.speak;
    if (!tasks.length) return null;
    return h('section', { class: 'card' }, h('h3', null, '看中文，开口说', h('small', { text: '  Parla tu' })),
      h('p', { class: 'muted small', text: '看中文提示，先自己说出来（出声说，别只在心里想），再点按钮看参考答案并自评。' }),
      tasks.map((t, i) => {
        const ans = h('div', { class: 'rp-ans', hidden: true }, h('div', { class: 'it', lang: 'it', text: t.it }), W.playBtn(t.it, 'btn round sm'));
        return h('div', { class: 'ptask' }, h('div', { class: 'cue', text: (i + 1) + '. ' + t.zh }),
          h('button', { class: 'btn sm', type: 'button', text: '先自己说，再看参考', onclick: e => { ans.hidden = false; Sound.play(t.it); act(); e.currentTarget.remove(); } }), ans,
          ratingBar((v, first) => { if (first) { Store.record('speak', v >= 1); act(); } }));
      }));
  }

  function render(ctx, body) {
    const n = ctx.n;
    const lines = Lesson.lines(n).filter(l => Grammar.wordsOf(l.it).length <= 24);
    if (!lines.length) { body.append(h('div', { class: 'card' }, h('p', { text: '这一课没有适合跟读的句子。' }), ctx.cta('去闯关 →'))); return; }
    const S = { idx: 0, mode: 'rec', rate: Store.setting('speed') || 1, hide: false, sess: 0, gap: 1.2, acts: 0, loop: false };
    const start = ctx.q && ctx.q.get && parseInt(ctx.q.get('s'), 10);
    if (start >= 0) { const k = lines.findIndex(l => l.i === start); if (k >= 0) S.idx = k; }
    const recs = new Map();            // 句子序号 → 录音 blob 地址
    const rated = new Set();

    const finish = h('button', { class: 'btn primary lg', type: 'button', disabled: true, text: '完成影子跟读，去闯关 →', onclick: () => { ctx.done(); location.hash = '#/lesson/' + n + '/quiz'; } });
    const hint = h('p', { class: 'muted small', text: '互动 3 次后可完成本步骤（录音、自评、意群跟读、自动连读都算）。' });
    function act(k) {
      S.acts += (k || 1);
      if (S.acts >= 3) { finish.disabled = false; hint.textContent = '可以进入下一步了——当然，多练几句更好。'; }
    }

    if (!Sound.canRecord()) body.append(h('div', { class: 'banner warn', text: '提示：当前环境不能录音（浏览器不支持，或未授权）。可以用「意群跟读」「自动连读」，大声跟读并自评——开口比录音更重要。' }));

    const stage = h('div');
    const modeBar = h('div', { class: 'pill-tabs', role: 'tablist', style: { '--c': 'hsl(var(--h) 62% 40%)', margin: '0 0 12px' } });
    const navLabel = h('b', { 'aria-live': 'polite' });
    function drawModes() {
      clear(modeBar);
      MODES.forEach(([m, t]) => modeBar.append(h('button', { type: 'button', role: 'tab', class: S.mode === m ? 'on' : '', 'aria-selected': String(S.mode === m), text: t, onclick: () => setMode(m) })));
    }
    function drawNav() { navLabel.textContent = '第 ' + (S.idx + 1) + ' / ' + lines.length + ' 句'; nav.hidden = S.mode === 'role'; }
    function setMode(m) { S.sess++; Sound.stop(); S.mode = m; drawModes(); drawNav(); drawStage(); }
    function setIdx(i) { S.sess++; Sound.stop(); S.idx = Math.max(0, Math.min(lines.length - 1, i)); drawNav(); drawStage(); }

    const nav = h('div', { class: 'row between', style: { margin: '4px 0' }, id: 'shadow-nav' },
      h('button', { class: 'btn sm', type: 'button', 'aria-label': '上一句', text: '‹ 上一句', onclick: () => setIdx(S.idx - 1) }),
      navLabel,
      h('button', { class: 'btn sm', type: 'button', 'aria-label': '下一句', text: '下一句 ›', onclick: () => setIdx(S.idx + 1) }));

    function sentenceBox(l) {
      const it = h('div', { class: 'it', lang: 'it', text: l.it });
      const zh = h('div', { class: 'zh', style: { fontSize: '15px', fontFamily: 'var(--font)', marginTop: '6px' }, text: Store.setting('showZh') ? l.zh : '' });
      const el = h('div', { class: 'shadow-sent' + (S.hide ? ' blur' : ''), title: '点一下显示 / 隐藏文本', onclick: () => { S.hide = !S.hide; el.classList.toggle('blur', S.hide); } }, it, zh);
      return { el, it, zh, set(x) { it.textContent = x.it; zh.textContent = Store.setting('showZh') ? x.zh : ''; } };
    }

    const speedSeg = () => {
      const box = h('div', { class: 'seg', role: 'group', 'aria-label': '语速' });
      [['0.7×', 0.7], ['0.85×', 0.85], ['1×', 1]].forEach(([t, v]) => box.append(h('button', { type: 'button', class: S.rate === v ? 'on' : '', text: t, onclick: () => { S.rate = v; Store.setting('speed', v); Array.prototype.forEach.call(box.children, c => c.classList.toggle('on', c.textContent === t)); } })));
      return box;
    };

    // ---------- 🎤 逐句录音 ----------
    function drawRec() {
      const l = lines[S.idx], idx = S.idx;
      const box = sentenceBox(l);
      const tip = h('div', { class: 'muted small', 'aria-live': 'polite', style: { minHeight: '1.4em', textAlign: 'center' }, text: '① 听原音 ② 点 🎤 开始录，跟着说，再点结束 ③ 点 ⇄ 对比 ④ 自评' });
      let session = null, audio = null;
      const mic = h('button', { class: 'btn round lg', type: 'button', 'aria-label': '录音', title: '录音', text: '🎤' });
      const back = h('button', { class: 'btn round lg', type: 'button', 'aria-label': '回放我的录音', title: '回放', text: '▷', disabled: !recs.has(idx) });
      const cmp = h('button', { class: 'btn round lg', type: 'button', 'aria-label': '对比原音和我的录音', title: '对比：原音 → 我的', text: '⇄', disabled: !recs.has(idx) });
      const sr = Sound.canRecognize() ? h('button', { class: 'btn round lg', type: 'button', 'aria-label': '语音识别', title: '语音识别（需联网）', text: '🧠' }) : null;
      function playMine() {
        if (!recs.has(idx)) return Promise.resolve();
        return new Promise(res => { Sound.stop(); audio = new Audio(recs.get(idx)); audio.onended = res; audio.onerror = res; audio.play().catch(res); });
      }
      mic.onclick = async () => {
        if (!Sound.canRecord()) { tip.textContent = '当前浏览器不支持录音。请直接大声跟读，然后自评。'; return; }
        try {
          if (!session) {
            session = await Sound.startRecording();
            mic.classList.add('rec-on'); mic.textContent = '⏹'; tip.textContent = '录音中…说完再点一次结束';
          } else {
            const r = await session.stop(); session = null;
            mic.classList.remove('rec-on'); mic.textContent = '🎤';
            if (r) { recs.set(idx, r.url); back.disabled = false; cmp.disabled = false; tip.textContent = '录好了：点 ⇄ 对比原音，点 ▷ 回放。'; act(); }
          }
        } catch (e) {
          session = null; mic.classList.remove('rec-on'); mic.textContent = '🎤';
          tip.textContent = '无法使用麦克风：请允许权限，并用 https 或 localhost（或直接打开本地文件）访问。';
        }
      };
      back.onclick = playMine;
      cmp.onclick = async () => { await Sound.play(l.it, { rate: S.rate }); await UI.sleep(300); await playMine(); };
      if (sr) {
        sr.onclick = async () => {
          tip.textContent = '请开口说…';
          try {
            const r = Sound.recognize();
            const alts = await r.promise;
            if (!alts.length) { tip.textContent = '没听清，再试一次。'; return; }
            tip.textContent = '识别为：「' + alts[0] + '」 · 匹配度 ' + Math.round(100 * Sound.matchScore(alts, l.it)) + '%';
            act();
          } catch (e) { tip.textContent = '语音识别不可用（需联网的 Chrome / Edge / Safari）。请用录音对比 + 自评。'; }
        };
      }
      const rate = ratingBar((v, first) => { if (first && !rated.has(idx)) { rated.add(idx); Store.record('speak', v >= 1); act(); } });
      stage.append(box.el,
        h('div', { class: 'big-btns' },
          h('button', { class: 'btn lg primary', type: 'button', text: '▶ 原音', onclick: () => Sound.play(l.it, { rate: S.rate }) }),
          h('button', { class: 'btn lg', type: 'button', text: '🐢 慢速', onclick: () => Sound.play(l.it, { rate: 0.7 }) })),
        h('div', { class: 'big-btns', style: { marginTop: '12px' } }, mic, cmp, back, sr),
        h('div', { style: { height: '8px' } }), tip,
        h('div', { class: 'row center', style: { marginTop: '10px' } }, h('span', { class: 'lbl', text: '这句像不像？' }), rate));
    }

    // ---------- 🧩 意群跟读 ----------
    function drawChunk() {
      const l = lines[S.idx], idx = S.idx;
      const chunks = Grammar.chunks(l.it);
      const total = chunks.reduce((s, c) => s + c.length, 0) || 1;
      const cum = []; chunks.reduce((s, c, k) => { cum[k] = (s + c.length) / total; return s + c.length; }, 0);
      const done = new Set();
      const zh = h('div', { class: 'zh center', style: { textAlign: 'center', margin: '4px 0 12px' }, text: Store.setting('showZh') ? l.zh : '' });
      const status = h('div', { class: 'muted small', style: { textAlign: 'center', minHeight: '1.4em' }, 'aria-live': 'polite',
        text: chunks.length > 1 ? '① 听整句，看高亮的意群 ② 一块一块跟读，读完点一下那一块 ③ 全部点亮后，连起来读一遍' : '这句很短，直接整句跟读：先听，再说。' });
      const nextBtn = h('button', { class: 'btn primary', type: 'button', text: '这句完成，下一句 ›', hidden: true, onclick: () => { act(); if (S.idx < lines.length - 1) setIdx(S.idx + 1); } });
      const chips = chunks.map((c, k) => h('span', { role: 'button', tabindex: '0', 'aria-pressed': 'false', style: { '--cc': ['#e5484d', '#f59f00', '#2f9e44', '#2f7cf6', '#9b5de5', '#0a9a7b'][k % 6], fontSize: '20px' }, text: c,
        onclick: e => { const el = e.currentTarget; const on = !done.has(k); if (on) done.add(k); else done.delete(k); el.classList.toggle('done', on); el.setAttribute('aria-pressed', String(on)); nextBtn.hidden = done.size < chunks.length; if (!nextBtn.hidden) status.textContent = '✓ 都读过了！现在把整句连起来读一遍，然后进入下一句。'; },
        onkeydown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.currentTarget.click(); } } }));
      function highlight(f) {
        let k = cum.findIndex(c => f <= c + 0.0001);
        if (k < 0) k = chunks.length - 1;
        chips.forEach((c, j) => c.classList.toggle('active', f < 1 && j === k));
      }
      stage.append(h('div', { class: 'shadow-sent' + (S.hide ? ' blur' : ''), style: { padding: '12px 4px' } }, h('div', { class: 'chunks', style: { justifyContent: 'center' } }, chips)), zh,
        h('div', { class: 'big-btns' },
          h('button', { class: 'btn lg primary', type: 'button', text: '▶ 听整句（逐块高亮）', onclick: async () => { const my = ++S.sess; await Sound.play(l.it, { rate: S.rate, onProgress: f => { if (my === S.sess) highlight(f); } }); if (my === S.sess) highlight(1); } }),
          h('button', { class: 'btn lg', type: 'button', text: '🐢 慢速', onclick: async () => { const my = ++S.sess; await Sound.play(l.it, { rate: 0.7, onProgress: f => { if (my === S.sess) highlight(f); } }); if (my === S.sess) highlight(1); } })),
        h('div', { style: { height: '10px' } }), status, h('div', { class: 'row center', style: { marginTop: '8px' } }, nextBtn));
      void idx;
    }

    // ---------- ▶ 自动连读 ----------
    let running = false;
    function drawAuto() {
      const box = sentenceBox(lines[S.idx]);
      const status = h('div', { class: 'status', style: { textAlign: 'center' }, 'aria-live': 'polite', text: '点「开始」：程序读一句，然后留出和这句一样长的时间让你跟读，自动往下走。' });
      const barI = h('i', { style: { width: '0%' } });
      const startBtn = h('button', { class: 'btn lg primary', type: 'button', text: '▶ 从这句开始', onclick: runAuto });
      const stopBtn = h('button', { class: 'btn lg', type: 'button', text: '■ 停止', onclick: () => { S.sess++; Sound.stop(); running = false; status.textContent = '已停止。'; barI.style.width = '0%'; startBtn.disabled = false; } });
      const gapSeg = h('div', { class: 'seg', role: 'group', 'aria-label': '留给你的时间' });
      [['短', 0.8], ['适中', 1.2], ['长', 2]].forEach(([t, v]) => gapSeg.append(h('button', { type: 'button', class: S.gap === v ? 'on' : '', text: t, onclick: () => { S.gap = v; Array.prototype.forEach.call(gapSeg.children, c => c.classList.toggle('on', c.textContent === t)); } })));
      async function runAuto() {
        const my = ++S.sess;
        running = true; startBtn.disabled = true;
        for (let k = S.idx; k < lines.length && my === S.sess; k++) {
          S.idx = k; drawNav(); box.set(lines[k]);
          status.textContent = '🔊 听：第 ' + (k + 1) + ' / ' + lines.length + ' 句';
          barI.style.width = '0%';
          const t0 = Date.now();
          await Sound.play(lines[k].it, { rate: S.rate });
          if (my !== S.sess) return;
          const dur = Math.max(900, Date.now() - t0);
          const wait = Math.round(dur * S.gap + 600);
          status.textContent = '🗣️ 轮到你：跟着说一遍';
          const t1 = Date.now();
          while (Date.now() - t1 < wait && my === S.sess) { barI.style.width = Math.min(100, Math.round(100 * (Date.now() - t1) / wait)) + '%'; await UI.sleep(80); }
          if (my !== S.sess) return;
          if (k === lines.length - 1 && S.loop) k = -1;
        }
        if (my === S.sess) { running = false; startBtn.disabled = false; status.textContent = '✓ 这一轮跟读完成！'; barI.style.width = '100%'; act(2); }
      }
      stage.append(box.el, h('div', { class: 'bar', style: { margin: '8px 0 12px' } }, barI), status,
        h('div', { class: 'big-btns', style: { marginTop: '10px' } }, startBtn, stopBtn),
        h('div', { class: 'row gap center', style: { marginTop: '14px' } }, h('span', { class: 'lbl', text: '语速' }), speedSeg(), h('span', { class: 'lbl', text: '留给我的时间' }), gapSeg,
          h('button', { class: 'tg' + (S.loop ? ' on' : ''), type: 'button', text: '循环', 'aria-pressed': String(S.loop), onclick: e => { S.loop = !S.loop; e.currentTarget.classList.toggle('on', S.loop); e.currentTarget.setAttribute('aria-pressed', String(S.loop)); } })));
    }

    // ---------- 🎭 角色扮演 ----------
    function drawRole() {
      const dlg = ctx.d.dlg;
      const roles = [];
      dlg.forEach(l => { if (l.who && roles.indexOf(l.who) < 0) roles.push(l.who); });
      const box = h('div', { class: 'rp' });
      const bubble = (l, mine) => h('div', { class: 'rp-b ' + (mine ? 'me' : 'other') }, h('span', { class: 'who', text: l.who }), h('div', { class: 'it', lang: 'it', text: l.it }), h('div', { class: 'zh', text: l.zh }));
      function intro() {
        S.sess++; Sound.stop(); clear(box);
        box.append(h('p', { class: 'muted', text: '选一个角色。程序读对方的台词，轮到你时看中文提示开口说——先别看参考答案，说完再核对。' }),
          h('div', { class: 'row gap wrap' }, roles.slice(0, 3).map(r => h('button', { class: 'btn primary', type: 'button', onclick: () => begin(r), text: '我演 ' + r }))));
      }
      function begin(role) {
        const my = ++S.sess; clear(box);
        const log = h('div', { class: 'rp-log' }), prompt = h('div', { class: 'rp-prompt' });
        box.append(h('div', { class: 'row between' }, h('b', { text: '你扮演：' + role }), h('button', { class: 'btn ghost sm', type: 'button', onclick: intro, text: '换角色 / 重来' })), log, prompt);
        let i = 0;
        async function next() {
          if (my !== S.sess) return;
          clear(prompt);
          if (i >= dlg.length) return end();
          const l = dlg[i];
          if (l.who !== role) {
            log.append(bubble(l, false)); log.lastChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            await Sound.play(l.it, { rate: S.rate });
            if (my !== S.sess) return;
            i++; await UI.sleep(250); return next();
          }
          let peeked = false;
          const ans = h('div', { class: 'rp-ans', hidden: true }, h('div', { class: 'it', lang: 'it', text: l.it }));
          prompt.append(h('div', { class: 'rp-turn' }, h('b', { text: '轮到你了：' }), h('span', { text: l.zh })), ans,
            h('div', { class: 'row gap wrap' },
              h('button', { class: 'btn sm', type: 'button', text: '显示参考', onclick: () => { peeked = true; ans.hidden = false; Sound.play(l.it, { rate: S.rate }); } }),
              h('button', { class: 'btn primary sm', type: 'button', text: '我说完了 →', onclick: () => { log.append(bubble(l, true)); Store.record('speak', !peeked); act(); i++; next(); } })));
          prompt.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
        function end() {
          prompt.append(h('p', { class: 'big', text: '🎉 对话完成！' }), h('p', { class: 'muted', text: '想挑战自己：换另一个角色，或者再来一遍，并且不点「显示参考」。' }),
            h('button', { class: 'btn', type: 'button', onclick: intro, text: '再来一次' }));
          act(2);
        }
        next();
      }
      intro();
      stage.append(box);
    }

    function drawStage() {
      clear(stage);
      if (S.mode === 'rec') drawRec(); else if (S.mode === 'chunk') drawChunk(); else if (S.mode === 'role') drawRole(); else drawAuto();
    }

    drawModes(); drawNav(); drawStage();
    body.append(
      h('section', { class: 'card' }, modeBar, nav, stage,
        S.mode === 'auto' ? null : h('div', { class: 'row gap center', style: { marginTop: '14px' } }, h('span', { class: 'lbl', text: '语速' }), speedSeg(), h('span', { class: 'muted small', text: '点句子可隐藏 / 显示文本，试着不看文字跟读' }))),
      ...[speakCard(ctx, act)].filter(Boolean),
      h('section', { class: 'card' },
        h('h3', null, '影子跟读怎么练', h('small', { text: '  Shadowing' })),
        h('ul', { class: 'tips' },
          h('li', { text: '先听清再开口：第一遍只听，注意重音（每个词有一个音节读得更重）和语调。' }),
          h('li', { text: '意大利语是「所见即所读」：双辅音（pizza、caffè、nonno）要读长一点，r 轻轻弹舌。' }),
          h('li', { text: '先慢速（0.7×）把每个音节说清楚，再回到正常速度；最后试着不看文本跟读。' }),
          h('li', { text: '语音是程序合成的，适合建立节奏和语调感；真人的口音和细节请多听意大利语的真实录音来校准。' }))),
      h('div', { class: 'center-col' }, hint, finish),
      h('div', { class: 'step-nav' }, h('a', { class: 'btn ghost', href: '#/lesson/' + n + '/grammar', text: '← ' + Store.STEP_ZH.grammar }), h('span')));
  }

  root.LessonShadow = { render };
})(window);
