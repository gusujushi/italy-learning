/* 课程播放器：听 → 读 → 学 → 说 → 写 → 测 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;
  const STEPS = Store.STEPS;
  const META = {
    listen: ['听', 'Ascolto'], read: ['读', 'Lettura'], learn: ['学', 'Conoscenza'],
    speak: ['说', 'Parlato'], write: ['写', 'Scrittura'], test: ['测', 'Prova'],
  };
  root.Views = root.Views || {};

  const card = function () { return h('section', { class: 'card' }, Array.prototype.slice.call(arguments)); };
  function cardT(title, sub) {
    const kids = Array.prototype.slice.call(arguments, 2);
    return h('section', { class: 'card' }, h('h3', null, title, sub ? h('small', { text: '  ' + sub }) : null), kids);
  }
  function goalList(goal) {
    return h('ul', { class: 'goals' }, String(goal).split('；').filter(Boolean).map(g => h('li', { text: g.replace(/[。]$/, '') })));
  }
  function playBtn(text, cls) {
    return h('button', { class: cls || 'play', type: 'button', 'aria-label': '播放', onclick: e => { e.stopPropagation(); Sound.play(text); } }, '▶');
  }

  // ---------- 阅读器（对话/短文）：点读、变速、循环、中意显示切换、点词释义 ----------

  function buildReader(lines, ctx) {
    const gloss = Course.gloss(ctx.n);
    const S = { loop: 'off', sess: 0, rate: Store.setting('speed') || 1 };
    const wrap = h('div', { class: 'reader' + (Store.setting('showIt') ? '' : ' hide-it') + (Store.setting('showZh') ? '' : ' hide-zh') });
    const els = [];
    const speakers = [];
    let pop = null;

    function closePop() { if (pop) { pop.remove(); pop = null; } }
    function showPop(target, key) {
      closePop();
      const v = gloss.get(key);
      pop = h('div', { class: 'pop', role: 'tooltip' },
        h('b', { lang: 'it', text: v.it }), v.ph ? h('small', { text: '  ' + v.ph }) : null,
        h('div', { text: v.zh }));
      document.body.append(pop);
      const r = target.getBoundingClientRect();
      const w = pop.offsetWidth;
      pop.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + window.scrollX)) + 'px';
      pop.style.top = (r.bottom + window.scrollY + 6) + 'px';
      Sound.play(v.it);
      setTimeout(() => document.addEventListener('click', closePop, { once: true }), 0);
    }

    function wordSpans(text) {
      const toks = Ita.displayTokens(text), out = [];
      let i = 0;
      while (i < toks.length) {
        let hit = null;
        for (let len = Math.min(3, toks.length - i); len >= 1 && !hit; len--) {
          const key = Ita.norm(toks.slice(i, i + len).join(' '), true);
          if (key && gloss.has(key)) hit = { len, key };
        }
        if (hit) {
          const hk = hit;
          out.push(h('span', { class: 'w', role: 'button', tabindex: '0', text: toks.slice(i, i + hk.len).join(' '),
            onclick: ev => { ev.stopPropagation(); showPop(ev.currentTarget, hk.key); },
            onkeydown: ev => { if (ev.key === 'Enter') { ev.stopPropagation(); showPop(ev.currentTarget, hk.key); } } }));
          i += hk.len;
        } else { out.push(document.createTextNode(toks[i])); i++; }
        if (i < toks.length) out.push(' ');
      }
      return out;
    }

    function mark(i) {
      els.forEach((e, j) => e.classList.toggle('active', j === i));
      if (i >= 0 && els[i]) els[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    async function playLine(i) {
      const my = ++S.sess;
      mark(i);
      const ok = await Sound.play(lines[i].it, { rate: S.rate });
      if (my !== S.sess) return;
      if (ok && S.loop === 'line') { await UI.sleep(350); if (my === S.sess) return playLine(i); }
      mark(-1);
    }
    async function playAll() {
      const my = ++S.sess;
      let ok;
      do {
        ok = await Sound.playSeq(lines.map(l => l.it), { gap: 450, rate: S.rate, onStart: k => { if (my === S.sess) mark(k); } });
        if (my !== S.sess) return;
        if (S.loop === 'all' && ok) await UI.sleep(800);
      } while (S.loop === 'all' && ok && my === S.sess);
      mark(-1);
    }
    function stopAll() { S.sess++; Sound.stop(); mark(-1); }

    lines.forEach((l, i) => {
      if (l.who && speakers.indexOf(l.who) < 0) speakers.push(l.who);
      const side = l.who ? (speakers.indexOf(l.who) % 2 ? 'r' : 'l') : 'n';
      const key = ctx.n + ':' + (l.para != null ? 't' : 'd') + i;
      const fav = h('button', { class: 'fav', type: 'button', 'aria-label': '收藏', 'aria-pressed': String(Store.isFav(key)), text: Store.isFav(key) ? '★' : '☆',
        onclick: e => { e.stopPropagation(); const on = Store.toggleFav(key); e.currentTarget.textContent = on ? '★' : '☆'; e.currentTarget.setAttribute('aria-pressed', String(on)); } });
      const el = h('div', { class: 'line ' + side + (l.pstart ? ' pstart' : ''), onclick: () => playLine(i) },
        l.who ? h('span', { class: 'who', text: l.who }) : null,
        h('div', { class: 'bubble' },
          h('button', { class: 'play', type: 'button', 'aria-label': '播放这一句', onclick: e => { e.stopPropagation(); playLine(i); } }, '▶'),
          h('div', { class: 'txt' }, h('div', { class: 'it', lang: 'it' }, wordSpans(l.it)), h('div', { class: 'zh', text: l.zh })),
          fav));
      els.push(el);
    });

    // 控制条
    const seg = (items, get, set) => {
      const box = h('div', { class: 'seg', role: 'group' });
      items.forEach(([label, val]) => box.append(h('button', { type: 'button', class: get() === val ? 'on' : '', text: label,
        onclick: () => { set(val); Array.prototype.forEach.call(box.children, c => c.classList.remove('on')); box.querySelector('[data-v="' + val + '"]').classList.add('on'); }, dataset: { v: String(val) } })));
      return box;
    };
    const tog = (label, cls, get, set) => h('button', { type: 'button', class: 'tg' + (get() ? ' on' : ''), text: label,
      onclick: e => { const v = !get(); set(v); e.currentTarget.classList.toggle('on', v); } });

    const ctrl = h('div', { class: 'rctrl' },
      h('div', { class: 'row gap wrap' },
        h('button', { class: 'btn primary sm', type: 'button', onclick: playAll, text: '▶ 播放全部' }),
        h('button', { class: 'btn ghost sm', type: 'button', onclick: stopAll, text: '■ 停止' }),
        tog('意', '', () => Store.setting('showIt'), v => { Store.setting('showIt', v); wrap.classList.toggle('hide-it', !v); }),
        tog('中', '', () => Store.setting('showZh'), v => { Store.setting('showZh', v); wrap.classList.toggle('hide-zh', !v); }),
        tog('遮中文', '', () => false, v => wrap.classList.toggle('blur-zh', v))),
      h('div', { class: 'row gap wrap' },
        h('span', { class: 'lbl', text: '语速' }),
        seg([['0.7×', 0.7], ['0.85×', 0.85], ['1×', 1]], () => S.rate, v => { S.rate = v; Store.setting('speed', v); }),
        h('span', { class: 'lbl', text: '循环' }),
        seg([['关', 'off'], ['单句', 'line'], ['整段', 'all']], () => S.loop, v => { S.loop = v; })));

    wrap.append(ctrl, h('div', { class: 'lines' }, els));
    return wrap;
  }

  function flattenText(paras) {
    const out = [];
    paras.forEach((p, pi) => p.forEach((l, li) => out.push({ it: l.it, zh: l.zh, who: '', para: pi, pstart: li === 0 && pi > 0 })));
    return out;
  }

  function vocabList(d) {
    const wrap = h('div', { class: 'vocab' });
    const cover = h('button', { class: 'btn ghost sm', type: 'button', text: '遮住中文，自测',
      onclick: e => { const on = wrap.classList.toggle('cover-zh'); e.currentTarget.textContent = on ? '显示中文' : '遮住中文，自测'; Array.prototype.forEach.call(wrap.querySelectorAll('.vrow'), r => r.classList.remove('rev')); } });
    const list = h('div', { class: 'vlist' });
    d.vocab.forEach(v => list.append(h('div', { class: 'vrow', onclick: e => { e.currentTarget.classList.add('rev'); Sound.play(v.it); } },
      playBtn(v.it),
      h('div', { class: 'vt' }, h('b', { class: 'it', lang: 'it', text: v.it }), v.ph ? h('span', { class: 'ph', text: v.ph }) : null),
      h('div', { class: 'vz', text: v.zh }))));
    wrap.append(h('div', { class: 'row between' }, h('span', { class: 'muted small', text: d.vocab.length + ' 个词句 · 点一下听发音' }), cover), list);
    return wrap;
  }

  function table(rows) {
    if (!rows || !rows.length) return null;
    return h('div', { class: 'tbl-wrap' }, h('table', { class: 'tbl' },
      h('thead', null, h('tr', null, rows[0].map(c => h('th', { text: c })))),
      h('tbody', null, rows.slice(1).map(r => h('tr', null, r.map(c => h('td', { text: c })))))));
  }

  function egList(eg) {
    if (!eg || !eg.length) return null;
    return h('div', { class: 'egs' }, eg.map(e => h('div', { class: 'eg', onclick: () => Sound.play(e.it) },
      playBtn(e.it), h('div', null, h('div', { class: 'it', lang: 'it', text: e.it }), h('div', { class: 'zh', text: e.zh })))));
  }

  // ---------- 各步骤 ----------

  function stepListen(ctx, body) {
    const d = ctx.d, n = ctx.n;
    const due = Store.dueCount();
    if (due) body.append(h('a', { class: 'banner', href: '#/review' }, '🔁 热身：先复习 ' + due + ' 张到期卡片 ›'));
    body.append(
      card(h('p', null, h('b', { text: '场景　' }), d.scene)),
      cardT('今日目标', 'Obiettivi', goalList(d.goal)));

    const status = h('div', { class: 'status', 'aria-live': 'polite' });
    let plays = 0;
    async function go(rate) {
      plays++;
      const ok = await Sound.playSeq(d.dlg.map(l => l.it), { gap: 700, rate, onStart: i => { status.textContent = '正在播放第 ' + (i + 1) + ' / ' + d.dlg.length + ' 句'; } });
      if (ok) status.textContent = '✓ 已听 ' + plays + ' 遍。再听一遍，或直接做下面的题。';
    }
    const trBox = h('div', { class: 'tr-box' });
    let shown = false;
    const trBtn = h('button', { class: 'btn ghost', type: 'button', text: '👁 显示文本', onclick: () => {
      shown = !shown; trBtn.textContent = shown ? '🙈 隐藏文本' : '👁 显示文本';
      clear(trBox); if (shown) trBox.append(buildReader(d.dlg, ctx));
    } });
    body.append(cardT('盲听', 'Ascolta senza testo',
      h('p', { class: 'muted', text: '先不看文本，抓住大意——新概念英语的"先听后看"。可以多听几遍。' }),
      h('div', { class: 'row gap wrap' },
        h('button', { class: 'btn primary lg', type: 'button', onclick: () => go(1), text: '▶ 盲听整段对话' }),
        h('button', { class: 'btn lg', type: 'button', onclick: () => go(0.75), text: '🐢 慢速' }),
        h('button', { class: 'btn ghost lg', type: 'button', onclick: () => { Sound.stop(); status.textContent = ''; }, text: '■' })),
      status, h('div', { class: 'row' }, trBtn), trBox));

    const qBox = h('div');
    body.append(cardT('理解题', 'Comprensione', qBox));
    ExerciseUI.run(qBox, ExGen.listenQs(n), {
      title: '听力', onDone: () => ctx.done(), doneLabel: '下一步：精读 →',
      onContinue: () => { location.hash = '#/day/' + n + '/read'; },
    });
  }

  function stepRead(ctx, body) {
    const d = ctx.d, n = ctx.n;
    body.append(cardT('对话', 'Dialogo', h('p', { class: 'muted small', text: '点任意一句听发音；点带下划线的词看释义；可切换中/意显示、变速、循环。' }), buildReader(d.dlg, ctx)));
    if (d.text) body.append(cardT(d.text.title || '短文', 'Lettura', buildReader(flattenText(d.text.paras), ctx)));
    body.append(cardT('词汇', 'Vocabolario', vocabList(d)));
    const box = h('div');
    body.append(cardT('小练习', 'Esercizi', box));
    ExerciseUI.run(box, ExGen.readSet(n), {
      title: '读', onDone: () => ctx.done(), doneLabel: '下一步：知识 →',
      onContinue: () => { location.hash = '#/day/' + n + '/learn'; },
    });
  }

  function stepLearn(ctx, body) {
    const d = ctx.d, n = ctx.n;
    if (d.pron) {
      const p = d.pron;
      const kids = [h('ul', { class: 'tips' }, p.tips.map(t => h('li', { html: UI.md(t) })))];
      if (p.drill.length) {
        kids.push(h('div', { class: 'row between' }, h('b', { text: '跟读词表' }),
          h('button', { class: 'btn ghost sm', type: 'button', text: '▶ 全部播放', onclick: () => Sound.playSeq(p.drill.map(x => x.it), { gap: 500 }) })));
        kids.push(h('div', { class: 'drill' }, p.drill.map(w => h('button', { class: 'dchip', type: 'button', onclick: () => Sound.play(w.it) },
          h('b', { lang: 'it', text: w.it }), w.zh ? h('small', { text: w.zh }) : null))));
      }
      if (p.twister) {
        kids.push(h('div', { class: 'twister' },
          h('b', { text: '绕口令 Scioglilingua' }),
          h('p', { class: 'it big', lang: 'it', text: p.twister.it }), h('p', { class: 'zh', text: p.twister.zh }),
          h('div', { class: 'row gap' },
            h('button', { class: 'btn sm', type: 'button', onclick: () => Sound.play(p.twister.it), text: '🔊 正常' }),
            h('button', { class: 'btn sm', type: 'button', onclick: () => Sound.play(p.twister.it, { rate: 0.7 }), text: '🐢 慢速' }))));
      }
      body.append(cardT('发音小练习', p.t, kids));
    }
    d.gram.forEach(g => {
      body.append(cardT(g.h, '', g.p.map(t => h('p', { html: UI.md(t) })), table(g.t), egList(g.eg)));
    });
    if (d.culture) body.append(cardT('文化小贴士', 'Cultura', h('p', { html: UI.md(d.culture) })));
    const box = h('div');
    body.append(cardT('知识小测', 'Quiz', box));
    ExerciseUI.run(box, ExGen.learnQuiz(n), {
      title: '知识', onDone: () => ctx.done(), doneLabel: '下一步：开口说 →',
      onContinue: () => { location.hash = '#/day/' + n + '/speak'; },
    });
  }

  // —— 说 ——

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

  function shadowRow(l, ctx) {
    let recSession = null, recUrl = null, recAudio = null;
    const tip = h('div', { class: 'muted small' });
    const mic = h('button', { class: 'btn round', type: 'button', 'aria-label': '录音', title: '录音', text: '🎤' });
    const back = h('button', { class: 'btn round', type: 'button', 'aria-label': '回放我的录音', title: '回放', text: '▷', disabled: true });
    const cmp = h('button', { class: 'btn round', type: 'button', 'aria-label': '对比原音和我的录音', title: '对比：原音 → 我的', text: '⇄', disabled: true });
    const sr = Sound.canRecognize() ? h('button', { class: 'btn round', type: 'button', 'aria-label': '语音识别', title: '语音识别（需联网）', text: '🧠' }) : null;

    function playMine() { if (!recUrl) return Promise.resolve(); return new Promise(res => { Sound.stop(); recAudio = new Audio(recUrl); recAudio.onended = res; recAudio.onerror = res; recAudio.play().catch(res); }); }
    mic.onclick = async () => {
      if (!Sound.canRecord()) { tip.textContent = '当前浏览器不支持录音。请直接大声跟读，然后自评。'; return; }
      try {
        if (!recSession) {
          recSession = await Sound.startRecording();
          mic.classList.add('rec'); mic.textContent = '⏹'; tip.textContent = '录音中…再点一次结束';
        } else {
          const r = await recSession.stop(); recSession = null;
          mic.classList.remove('rec'); mic.textContent = '🎤';
          if (r) { recUrl = r.url; back.disabled = false; cmp.disabled = false; tip.textContent = '录好了：点 ⇄ 对比原音，点 ▷ 回放。'; ctx.act(); }
        }
      } catch (e) {
        recSession = null; mic.classList.remove('rec'); mic.textContent = '🎤';
        tip.textContent = '无法使用麦克风：请允许权限，并用 https 或 localhost（或直接打开本地文件）访问。';
      }
    };
    back.onclick = playMine;
    cmp.onclick = async () => { await Sound.play(l.it); await UI.sleep(300); await playMine(); };
    if (sr) {
      sr.onclick = async () => {
        tip.textContent = '请开口说…';
        try {
          const r = Sound.recognize();
          const alts = await r.promise;
          if (!alts.length) { tip.textContent = '没听清，再试一次。'; return; }
          const sc = Math.round(100 * Sound.matchScore(alts, l.it));
          tip.textContent = '识别为：「' + alts[0] + '」 · 匹配度 ' + sc + '%';
          ctx.act();
        } catch (e) { tip.textContent = '语音识别不可用（需联网的 Chrome / Edge / Safari）。请用录音对比 + 自评。'; }
      };
    }
    const rate = ratingBar((v, first) => { if (first) { Store.record('speak', v >= 1); ctx.act(); } });
    return h('div', { class: 'srow2' },
      h('div', { class: 'stxt', onclick: () => Sound.play(l.it) },
        l.who ? h('span', { class: 'who', text: l.who }) : null,
        h('div', null, h('div', { class: 'it', lang: 'it', text: l.it }), h('div', { class: 'zh', text: l.zh }))),
      h('div', { class: 'row gap wrap ctr' }, playBtn(l.it, 'btn round'), mic, cmp, back, sr, rate), tip);
  }

  function rolePlay(ctx) {
    const d = ctx.d;
    const roles = [];
    d.dlg.forEach(l => { if (l.who && roles.indexOf(l.who) < 0) roles.push(l.who); });
    const box = h('div', { class: 'rp' });
    let sess = 0;
    function intro() {
      sess++; Sound.stop(); clear(box);
      box.append(h('p', { class: 'muted', text: '选一个角色。程序读对方的台词，轮到你时开口说（先看中文提示，试着不看答案说出来）。' }),
        h('div', { class: 'row gap wrap' }, roles.slice(0, 3).map(r => h('button', { class: 'btn primary', type: 'button', onclick: () => start(r), text: '我演 ' + r }))));
    }
    function bubble(l, mine) {
      return h('div', { class: 'rp-b ' + (mine ? 'me' : 'other') }, h('span', { class: 'who', text: l.who }), h('div', { class: 'it', lang: 'it', text: l.it }), h('div', { class: 'zh', text: l.zh }));
    }
    function start(role) {
      const my = ++sess; clear(box);
      const log = h('div', { class: 'rp-log' }), prompt = h('div', { class: 'rp-prompt' });
      box.append(h('div', { class: 'row between' }, h('b', { text: '你扮演：' + role }), h('button', { class: 'btn ghost sm', type: 'button', onclick: intro, text: '换角色/重来' })), log, prompt);
      let i = 0;
      async function next() {
        if (my !== sess) return;
        clear(prompt);
        if (i >= d.dlg.length) return end();
        const l = d.dlg[i];
        if (l.who !== role) {
          log.append(bubble(l, false)); log.lastChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          await Sound.play(l.it);
          if (my !== sess) return;
          i++; await UI.sleep(250); return next();
        }
        const ans = h('div', { class: 'rp-ans', hidden: true }, h('div', { class: 'it', lang: 'it', text: l.it }));
        prompt.append(h('div', { class: 'rp-turn' }, h('b', { text: '轮到你了：' }), h('span', { text: l.zh })), ans,
          h('div', { class: 'row gap wrap' },
            h('button', { class: 'btn sm', type: 'button', text: '显示参考', onclick: () => { ans.hidden = false; Sound.play(l.it); } }),
            h('button', { class: 'btn primary sm', type: 'button', text: '我说完了 →', onclick: () => { log.append(bubble(l, true)); ctx.act(); Store.record('speak', !ans.hidden ? false : true); i++; next(); } })));
        prompt.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      function end() {
        prompt.append(h('p', { class: 'big', text: '🎉 对话完成！' }), h('p', { class: 'muted', text: '想挑战自己：换另一个角色，或者再来一遍并且不点「显示参考」。' }),
          h('button', { class: 'btn', type: 'button', onclick: intro, text: '再来一次' }));
        ctx.act(2);
      }
      next();
    }
    intro();
    return box;
  }

  function stepSpeak(ctx, body) {
    const d = ctx.d, n = ctx.n;
    let acts = 0;
    const finish = h('button', { class: 'btn primary', type: 'button', disabled: true, text: '完成口语练习，进入写作 →', onclick: () => { ctx.done(); location.hash = '#/day/' + n + '/write'; } });
    const hint = h('p', { class: 'muted small', text: '互动 3 次后可完成本步骤（听、录、自评、角色扮演都算）。' });
    ctx.act = k => { acts += (k || 1); if (acts >= 3) { finish.disabled = false; hint.textContent = '可以进入下一步了。'; } };
    if (!Sound.canRecord()) body.append(h('div', { class: 'banner warn', text: '提示：当前环境不能录音（浏览器不支持，或未授权）。请大声跟读并自评——开口比录音更重要。' }));

    const shadowLines = d.dlg.filter(l => l.it.split(/\s+/).length <= 14);
    body.append(cardT('逐句跟读', 'Shadowing',
      h('p', { class: 'muted small', text: '步骤：① 听原音 ▶ ② 点 🎤 开始录，跟着说，再点结束 ③ 点 ⇄ 对比原音和你的录音 ④ 自评。' }),
      shadowLines.map(l => shadowRow(l, ctx))));
    body.append(cardT('角色扮演', 'Gioco di ruolo', rolePlay(ctx)));

    const prompts = d.speak.map((s, i) => {
      const ans = h('div', { class: 'rp-ans', hidden: true }, h('div', { class: 'it', lang: 'it', text: s.it }), playBtn(s.it, 'btn round sm'));
      return h('div', { class: 'ptask' }, h('div', { class: 'cue', text: (i + 1) + '. ' + s.zh }),
        h('button', { class: 'btn sm', type: 'button', text: '先自己说，再看参考', onclick: e => { ans.hidden = false; Sound.play(s.it); ctx.act(); e.currentTarget.remove(); } }), ans,
        ratingBar((v, first) => { if (first) { Store.record('speak', v >= 1); ctx.act(); } }));
    });
    body.append(cardT('看中文，开口说', 'Parla tu', prompts));
    body.append(h('div', { class: 'center-col' }, hint, finish));
  }

  // —— 写 ——

  function stepWrite(ctx, body) {
    const d = ctx.d, n = ctx.n;
    const box = h('div');
    body.append(cardT('练一练', '听写 · 排序 · 填空 · 翻译', box));
    const comp = h('section', { class: 'card', id: 'comp' });
    ExerciseUI.run(box, ExGen.writeSet(n), {
      title: '写', onDone: () => ctx.done(), doneLabel: '继续：微写作 ↓',
      onContinue: () => { comp.scrollIntoView({ behavior: 'smooth', block: 'start' }); },
    });
    if (d.wr) {
      const ta = h('textarea', { class: 'inp', rows: 5, placeholder: '在这里写…（会自动保存在本机）', lang: 'it', spellcheck: 'false', autocapitalize: 'off' });
      ta.value = Store.note('d' + n);
      ta.addEventListener('input', () => Store.note('d' + n, ta.value));
      const model = h('div', { class: 'model', hidden: true },
        h('b', { text: '示范答案' }),
        String(d.wr.it).split('\n').map(t => h('div', { class: 'eg', onclick: () => Sound.play(t) }, playBtn(t), h('div', { class: 'it', lang: 'it', text: t }))),
        d.wr.zh ? h('div', { class: 'zh', text: d.wr.zh }) : null);
      const checks = ['大小写与标点', '重音符号 è à ì ò ù', '名词前的冠词（il / la / un / una）', '动词变位与人称是否一致', '拼写与词序'];
      comp.append(h('h3', null, '微写作', h('small', { text: '  Scrittura' })), h('p', { text: d.wr.task }), ta,
        h('div', { class: 'row gap wrap' },
          h('button', { class: 'btn', type: 'button', text: '看示范答案', onclick: e => { model.hidden = false; e.currentTarget.disabled = true; Store.record('write', true); } }),
          Sound.canRecord() ? null : null),
        model,
        h('details', { class: 'chk' }, h('summary', { text: '自查清单' }), h('ul', null, checks.map(c => h('li', null, h('label', null, h('input', { type: 'checkbox' }), ' ' + c))))));
      body.append(comp);
    }
  }

  // —— 测 ——

  function testPlan(ctx) {
    const d = ctx.d, n = ctx.n, isl = Course.islandOf(n), ph = Course.phaseOf(n);
    const seed = (Date.now() / 1000 | 0) + n;
    const rnd = Ita.mulberry32(seed);
    if (d.exam) return { list: ExGen.rangeTest(ph.days[0], n, rnd, 30), label: '阶段毕业考 · 30 题', kind: 'exam' };
    if (d.test) return { list: ExGen.rangeTest(isl.days[0], n, rnd, 20), label: '岛屿关卡 · 20 题', kind: 'island' };
    return { list: ExGen.dayTest(n, rnd, 10), label: '今日小测 · 10 题', kind: 'day' };
  }

  function stepTest(ctx, body) {
    const n = ctx.n, d = ctx.d;
    const undone = STEPS.slice(0, 5).filter(s => !Store.stepDone(n, s));
    const plan = testPlan(ctx);
    const area = h('div', { class: 'card' });
    function start() {
      const p = testPlan(ctx);
      ExerciseUI.run(area, p.list, {
        title: p.kind === 'day' ? '小测' : '关卡', doneLabel: '查看成绩',
        retry: start,
        onContinue: sum => result(sum, p),
      });
    }
    function result(sum, p) {
      const fin = Store.finishDay(n, sum.pct);
      clear(area);
      const next = n + 1, hasNext = next <= Course.total();
      const kids = [
        h('div', { class: 'big-stars', 'aria-label': fin.stars + ' 星', text: UI.stars(fin.stars) }),
        h('p', { class: 'big', text: fin.stars > 0 ? (fin.first ? '🎉 通关！第 ' + n + ' 天完成' : '成绩已更新') : '还差一点——再试一次吧' }),
        h('p', { class: 'muted', text: '正确率 ' + sum.pct + '%（' + sum.correct + '/' + sum.total + '）' + (fin.stars > 0 ? '。本天的词汇和关键句已加入复习卡片。' : '。≥60% 得 ★ 解锁下一天。') }),
      ];
      if (fin.stars > 0 && d.exam) {
        const ph = Course.phaseOf(n);
        kids.push(h('div', { class: 'cert' }, h('b', { text: '🎓 阶段 ' + ph.id + ' · ' + ph.zh + ' 毕业' }), h('p', { text: ph.goal }), h('p', { class: 'muted small', text: ph.level })));
      } else if (fin.stars > 0 && d.test) {
        const isl = Course.islandOf(n);
        kids.push(h('div', { class: 'cert' }, h('b', { text: isl.emoji + ' 第 ' + isl.id + ' 岛 · ' + isl.zh + ' 通关' }), h('p', { class: 'muted small', text: isl.blurb })));
      }
      kids.push(h('div', { class: 'row gap wrap center' },
        h('button', { class: 'btn ghost', type: 'button', onclick: start, text: '再测一次' }),
        fin.stars > 0 && hasNext ? h('a', { class: 'btn primary', href: '#/day/' + next, text: '下一天 →' }) : null,
        h('a', { class: 'btn', href: '#/', text: '回到地图' })));
      area.append(h('div', { class: 'result' }, kids));
      void p;
    }
    body.append(cardT(plan.label, 'Prova',
      h('p', { text: '正确率 ≥ 60% 得 ★ 并解锁下一天；≥ 80% ★★；≥ 95% ★★★。题目由今天的内容自动生成，每次不同。' }),
      undone.length ? h('p', { class: 'banner warn', text: '还有未完成的步骤：' + undone.map(s => META[s][0]).join('、') + '。建议先学完再测——不过你也可以直接开始。' }) : null,
      h('button', { class: 'btn primary lg', type: 'button', text: '开始', onclick: e => { e.currentTarget.remove(); start(); } })));
    body.append(area);
  }

  const STEP_FN = { listen: stepListen, read: stepRead, learn: stepLearn, speak: stepSpeak, write: stepWrite, test: stepTest };

  // ---------- 入口 ----------

  root.Views.lesson = function (el, n, step) {
    clear(el);
    const d = Course.day(n);
    if (!d) {
      el.append(h('div', { class: 'pad' }, h('p', { class: 'big', text: '第 ' + n + ' 天的内容还在建设中。' }), h('a', { class: 'btn primary', href: '#/', text: '回到地图' })));
      return;
    }
    if (!Store.isUnlocked(n)) {
      el.append(h('div', { class: 'pad' }, h('p', { class: 'big', text: '🔒 这一天还没解锁' }), h('p', { class: 'muted', text: '完成第 ' + (n - 1) + ' 天的小测（≥60%）即可解锁。' }),
        h('a', { class: 'btn primary', href: '#/day/' + (n - 1), text: '去第 ' + (n - 1) + ' 天' })));
      return;
    }
    if (STEPS.indexOf(step) < 0) {
      // 默认进入第一个未完成的步骤
      step = STEPS.find(s => !Store.stepDone(n, s)) || 'listen';
      history.replaceState(null, '', '#/day/' + n + '/' + step);
    }
    const isl = Course.islandOf(n);
    el.style.setProperty('--h', isl.hue);
    const footSlot = h('div');
    const ctx = {
      n, d, step, act() {},
      done() { Store.markStep(n, step); renderFooter(); const st = document.querySelector('.stepper .st.on'); if (st) st.classList.add('done'); },
    };
    function renderFooter() {
      clear(footSlot);
      const i = STEPS.indexOf(step), prev = STEPS[i - 1], next = STEPS[i + 1];
      footSlot.append(h('div', { class: 'step-nav' },
        prev ? h('a', { class: 'btn ghost', href: '#/day/' + n + '/' + prev, text: '← ' + META[prev][0] }) : h('span'),
        next ? h('a', { class: 'btn ' + (Store.stepDone(n, step) ? 'primary' : ''), href: '#/day/' + n + '/' + next, text: META[next][0] + ' →' }) : h('span')));
    }
    const bar = h('header', { class: 'lbar' },
      h('a', { class: 'icon-btn', href: '#/', 'aria-label': '返回地图', text: '←' }),
      h('div', { class: 'ttl' }, h('small', { text: '第 ' + n + ' 天 · ' + isl.emoji + ' ' + isl.zh }), h('b', null, d.zh, h('span', { class: 'it', lang: 'it', text: '  ' + d.it }))));
    const stepper = h('nav', { class: 'stepper', 'aria-label': '学习步骤' }, STEPS.map((s, i) =>
      h('a', { class: 'st' + (s === step ? ' on' : '') + (Store.stepDone(n, s) ? ' done' : ''), href: '#/day/' + n + '/' + s },
        h('i', { text: Store.stepDone(n, s) ? '✓' : String(i + 1) }), h('span', { text: META[s][0] }))));
    const body = h('div', { class: 'step-body' });
    el.append(bar, stepper, body, footSlot);
    STEP_FN[step](ctx, body);
    renderFooter();
  };
})(window);
