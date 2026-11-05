/* 课程页：每课 6 步学习法
 *   🎧 导读盲听 → 🔤 意语词汇 → 🔍 逐句精读 → 🧩 语法透视 → 🗣️ 影子跟读 → 🏆 闯关测验
 * 第 3、5 步分别在 lesson-read.js、lesson-shadow.js。 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;
  const STEPS = Store.STEPS;
  root.Views = root.Views || {};
  const { card, cardT, playBtn } = W;

  // ---------- ① 导读盲听 ----------

  function stepIntro(ctx, body) {
    const d = ctx.d, n = ctx.n, g = Lesson.guide(n);
    const due = Store.dueCount();
    if (due) body.append(h('a', { class: 'banner', href: '#/words/review?mode=due' }, '🔁 热身：先复习 ' + due + ' 张到期生词卡 ›'));
    body.append(cardT('导读', 'Introduzione',
      h('p', null, h('b', { text: '场景　' }), d.scene),
      h('p', { style: { marginBottom: '4px' } }, h('b', { text: '这一课你会学到' })), W.goalList(d.goal),
      g.q ? h('div', { class: 'note', style: { marginTop: '12px' } }, h('b', { text: '🎧 带着问题听　' }), g.q) : null,
      g.bg ? h('details', { class: 'chk' }, h('summary', { text: '这一阶段怎么学？' }), h('p', { class: 'small', text: g.bg })) : null));

    const status = h('div', { class: 'status', 'aria-live': 'polite' });
    let plays = 0;
    async function go(rate) {
      plays++;
      const ok = await Sound.playSeq(d.dlg.map(l => l.it), { gap: 700, rate, onStart: i => { status.textContent = '正在播放第 ' + (i + 1) + ' / ' + d.dlg.length + ' 句…'; } });
      if (ok) status.textContent = '✓ 已听 ' + plays + ' 遍。建议至少听 2–3 遍，再看文本。';
    }
    const trBox = h('div');
    let shown = false;
    const trBtn = h('button', { class: 'btn ghost', type: 'button', text: '👁 显示文本', onclick: () => {
      shown = !shown; trBtn.textContent = shown ? '🙈 隐藏文本' : '👁 显示文本';
      clear(trBox);
      if (shown) trBox.append(h('div', { class: 'egs' }, d.dlg.map(l => h('div', { class: 'eg', onclick: () => Sound.play(l.it) }, playBtn(l.it),
        h('div', null, l.who ? h('span', { class: 'lbl', text: l.who + '　' }) : null, h('span', { class: 'it', lang: 'it', text: l.it }), h('div', { class: 'zh', text: l.zh }))))));
    } });
    body.append(cardT('盲听', 'Ascolta senza testo',
      h('p', { class: 'muted', text: '先不看文本，只用耳朵抓大意——哪怕只听懂几个词也没关系。可以多听几遍，也可以放慢。' }),
      h('div', { class: 'row gap' },
        h('button', { class: 'btn primary lg', type: 'button', onclick: () => go(1), text: '▶ 盲听整段对话' }),
        h('button', { class: 'btn lg', type: 'button', onclick: () => go(0.75), text: '🐢 慢速' }),
        h('button', { class: 'btn ghost lg', type: 'button', onclick: () => { Sound.stop(); status.textContent = ''; }, 'aria-label': '停止', text: '■' })),
      status, h('div', { class: 'row' }, trBtn), trBox));

    if (d.q.length) {
      const qBox = h('div');
      body.append(cardT('理解题', 'Comprensione', qBox));
      ExerciseUI.run(qBox, ExGen.listenQs(n), {
        title: '听力', onDone: s => { if (s.total) ctx.done(); }, doneLabel: '下一步：词汇 →', onContinue: () => ctx.next(),
      });
    }
    body.append(ctx.cta('完成导读，学词汇 →'));
  }

  // ---------- ② 意语词汇 ----------

  function exampleNode(v, sentence) {
    const toks = Grammar.colorize(sentence, [v]);
    return h('div', { class: 'example it', lang: 'it', onclick: () => Sound.play(sentence), title: '点一下听例句' },
      toks.map(k => (k.vocab ? h('mark', { text: k.t }) : document.createTextNode(k.t))));
  }

  function stepWords(ctx, body) {
    const d = ctx.d, n = ctx.n;
    const grid = h('div', { class: 'grid g3 words-grid' });
    const cover = h('button', { class: 'btn ghost sm', type: 'button', text: '遮住中文，自测', onclick: e => {
      const on = grid.classList.toggle('cover-zh');
      e.currentTarget.textContent = on ? '显示中文' : '遮住中文，自测';
      Array.prototype.forEach.call(grid.querySelectorAll('.zhline'), z => z.classList.remove('rev'));
    } });
    d.vocab.forEach(v => {
      const cid = Lesson.cardIdOfVocab(n, v.i);
      const starBtn = cid ? h('button', { class: 'star', type: 'button', 'aria-label': '加入 / 移出生词本', 'aria-pressed': String(Store.isStar(cid)), title: '加入生词本', text: Store.isStar(cid) ? '★' : '☆',
        onclick: e => { e.stopPropagation(); const on = Store.toggleStar(cid); e.currentTarget.textContent = on ? '★' : '☆'; e.currentTarget.setAttribute('aria-pressed', String(on)); UI.toast(on ? '已加入生词本，会按间隔复习' : '已取消星标', 1400); } }) : null;
      const ex = Lesson.exampleFor(n, v);
      const zh = h('div', { class: 'zhline', text: v.zh });
      grid.append(h('div', { class: 'word-card', onclick: () => { zh.classList.add('rev'); Sound.play(v.it); } },
        h('div', { class: 'row between' },
          h('div', null, h('div', { class: 'w it', lang: 'it', text: v.it }), v.ph ? h('div', { class: 'ph', text: v.ph }) : null),
          h('div', { class: 'row gap' }, playBtn(v.it, 'icon-btn'), starBtn)),
        zh, ex ? exampleNode(v, ex) : null));
    });
    body.append(cardT('本课词汇', 'Vocabolario',
      h('div', { class: 'row between' },
        h('span', { class: 'muted small', text: d.vocab.length + ' 个词句 · 点卡片听发音 · 大写音节是重音 · ☆ 加入生词本' }),
        h('div', { class: 'row gap' }, h('button', { class: 'btn ghost sm', type: 'button', text: '▶ 全部播放', onclick: () => Sound.playSeq(d.vocab.map(v => v.it), { gap: 450 }) }), cover)),
      h('div', { style: { height: '10px' } }), grid));

    const ps = ExGen.wordSet(n);
    if (ps.length) {
      const box = h('div');
      body.append(cardT('词汇小练习', 'Esercizi', box));
      ExerciseUI.run(box, ps, { title: '词汇', onDone: s => { if (s.total) ctx.done(); }, doneLabel: '下一步：精读 →', onContinue: () => ctx.next() });
    }
    body.append(ctx.cta('词汇学完了，去精读 →'));
  }

  // ---------- ④ 语法透视 ----------

  function pronBlock(d, body) {
    const p = d.pron;
    if (!p) return;
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

  /** 本课出现的动词一览：按原形归类，列出课文里出现过的形式 */
  function verbTable(ctx) {
    const byLemma = new Map();
    Lesson.lines(ctx.n).forEach(l => {
      const toks = Grammar.colorize(l.it, ctx.d.vocab);
      Grammar.verbsOf(toks).forEach(v => {
        if (!byLemma.has(v.lemma)) byLemma.set(v.lemma, new Map());
        const forms = byLemma.get(v.lemma), key = v.text.toLowerCase() + '|' + v.desc;
        if (!forms.has(key)) forms.set(key, { text: v.text.replace(/^[A-ZÀ-Ý]/, c => c.toLowerCase()), desc: v.desc });
      });
    });
    const rows = Array.from(byLemma, ([lemma, forms]) => ({ lemma, forms: Array.from(forms.values()) })).sort((a, b) => b.forms.length - a.forms.length || (a.lemma < b.lemma ? -1 : 1));
    if (!rows.length) return null;
    return h('div', { class: 'tbl-wrap' }, h('table', { class: 'tbl' },
      h('thead', null, h('tr', null, ['原形', '课文里出现的形式（人称 · 时态）'].map(c => h('th', { text: c })))),
      h('tbody', null, rows.slice(0, 40).map(r => h('tr', null,
        h('td', null, h('button', { class: 'chip', type: 'button', style: { cursor: 'pointer' }, onclick: () => Sound.play(r.lemma), text: r.lemma })),
        h('td', null, r.forms.map((f, i) => h('span', null, i ? '； ' : '', h('b', { class: 'it', lang: 'it', text: f.text }), ' ', h('span', { class: 'muted small', text: f.desc.replace(/^[^·]*·\s*/, '') })))))))));
  }

  function stepGrammar(ctx, body) {
    const d = ctx.d, n = ctx.n;
    pronBlock(d, body);
    d.gram.forEach(g => body.append(cardT(g.h, '', g.p.map(t => h('p', { html: UI.md(t) })), W.table(g.t), W.egList(g.eg))));

    // 把这一课的句子过一遍：哪些语法点出现在哪几句里
    const found = Grammar.scan(Lesson.lines(n), n);
    if (found.length) {
      const list = h('div', { class: 'stack' }, found.map((f, k) => {
        const g = f.g;
        return h('details', { class: 'gtag', style: { '--k': g.color }, open: k < 3 },
          h('summary', null, h('b', { text: g.name }), h('span', { class: 'muted small', text: '  课文里出现 ' + f.hits.length + ' 次' })),
          h('p', { style: { margin: '6px 0' }, text: g.desc }),
          g.how ? h('p', { class: 'small muted', style: { margin: '0 0 6px' }, text: '怎么用：' + g.how }) : null,
          g.ex ? h('p', { class: 'small', style: { margin: '0 0 6px' }, text: '例：' + g.ex }) : null,
          h('div', { class: 'egs' }, f.hits.slice(0, 3).map(l => h('div', { class: 'eg', onclick: () => Sound.play(l.it) }, playBtn(l.it),
            h('div', null, h('div', { class: 'it', lang: 'it', text: l.it }), h('div', { class: 'zh', text: l.zh }), h('a', { class: 'small', href: '#/lesson/' + n + '/read?s=' + l.i, onclick: e => e.stopPropagation(), text: '在精读里看颜色分析 ›' }))))));
      }));
      body.append(cardT('语法透视', '这一课的句子里有哪些语法现象', list));
    }
    const vt = verbTable(ctx);
    if (vt) body.append(cardT('动词一览', 'Verbi', h('p', { class: 'muted small', text: '意大利语动词词尾会告诉你「谁」在做、「什么时候」做。把这张表和精读里的红色谓语对照着看。' }), vt));

    if (d.culture) body.append(cardT('文化小贴士', 'Cultura', h('p', { html: UI.md(d.culture) })));
    if (d.quiz.length) {
      const box = h('div');
      body.append(cardT('知识小测', 'Quiz', box));
      ExerciseUI.run(box, ExGen.learnQuiz(n), { title: '知识', onDone: s => { if (s.total) ctx.done(); }, doneLabel: '下一步：影子跟读 →', onContinue: () => ctx.next() });
    }
    body.append(ctx.cta('语法看完了，去跟读 →'));
  }

  // ---------- ⑥ 闯关测验 ----------

  function quizPlan(ctx) {
    const d = ctx.d, n = ctx.n, isl = Course.islandOf(n), ph = Course.phaseOf(n);
    const rnd = Ita.mulberry32((Date.now() / 1000 | 0) + n);
    if (d.exam) return { list: ExGen.rangeTest(ph.days[0], n, rnd, 30), label: '阶段毕业考 · 30 题', kind: 'exam' };
    if (d.test) return { list: ExGen.rangeTest(isl.days[0], n, rnd, 20), label: '岛屿关卡 · 20 题', kind: 'island' };
    return { list: ExGen.dayTest(n, rnd, 10), label: '闯关测验 · 10 题', kind: 'day' };
  }

  /** 计划里这一课之后的下一课（不在计划里就取 n+1） */
  function nextLesson(n) {
    const us = App.planCtx().units;
    const i = us.findIndex(u => u.id === n);
    if (i >= 0) return us[i + 1] ? us[i + 1].id : 0;
    return Course.has(n + 1) ? n + 1 : 0;
  }

  function stepQuiz(ctx, body) {
    const n = ctx.n, d = ctx.d;
    const undone = STEPS.slice(0, 5).filter(s => !Store.stepDone(n, s));
    const plan = quizPlan(ctx);
    const area = h('div', { class: 'card' });
    function start() {
      const p = quizPlan(ctx);
      ExerciseUI.run(area, p.list, { title: p.kind === 'day' ? '测验' : '关卡', doneLabel: '查看成绩', retry: start, onContinue: sum => result(sum) });
    }
    function result(sum) {
      const fin = Store.finishQuiz(n, sum.pct);
      ctx.refreshTabs();
      clear(area);
      const nx = nextLesson(n);
      const kids = [
        h('div', { class: 'big-stars', 'aria-label': Store.starsFor(sum.pct) + ' 星', text: UI.stars(Store.starsFor(sum.pct)) }),
        h('p', { class: 'big', text: fin.passed ? (fin.first ? '🎉 过关！' : '成绩已更新') : '还差一点——再试一次吧' }),
        h('p', { class: 'muted', text: '正确率 ' + sum.pct + '%（' + sum.correct + '/' + sum.total + '）· 本课最好成绩 ' + fin.best + ' 分' + (fin.passed ? '' : ' · ≥ 60 分才算过关') }),
      ];
      if (fin.lessonDone) kids.push(h('p', { class: 'chip done', text: '✓ 本课 6 步全部完成' + (Store.setting('autoCards') ? '，词汇和关键句已加入生词本' : '') }));
      else if (fin.passed && undone.length) kids.push(h('p', { class: 'muted small', text: '还有没做完的步骤：' + undone.map(s => Store.STEP_ZH[s]).join('、') + '。' }));
      if (fin.passed && d.exam) {
        const ph = Course.phaseOf(n);
        kids.push(h('div', { class: 'cert' }, h('b', { text: '🎓 ' + ph.island + ' · ' + ph.zh + ' 毕业' }), h('p', { text: ph.goal }), h('p', { class: 'muted small', text: ph.level })));
      } else if (fin.passed && d.test) {
        const isl = Course.islandOf(n);
        kids.push(h('div', { class: 'cert' }, h('b', { text: isl.emoji + ' ' + isl.zh + ' 通关' }), h('p', { class: 'muted small', text: isl.blurb })));
      }
      kids.push(h('div', { class: 'row gap center' },
        h('button', { class: 'btn ghost', type: 'button', onclick: start, text: '再测一次' }),
        fin.passed && nx ? h('a', { class: 'btn primary', href: '#/lesson/' + nx, text: '下一课（第 ' + nx + ' 课）→' }) : null,
        h('a', { class: 'btn', href: '#/', text: '回到今日学习' })));
      area.append(h('div', { class: 'result' }, kids));
    }
    body.append(cardT(plan.label, 'Prova',
      h('p', { text: '正确率 ≥ 60% 过关；≥ 80% ★★；≥ 95% ★★★。题目由本课内容自动生成，每次不同。' }),
      undone.length ? h('p', { class: 'banner warn', text: '前面还有步骤没做完：' + undone.map(s => Store.STEP_ZH[s]).join('、') + '。建议学完再测——不过你也可以直接开始。' }) : null,
      h('button', { class: 'btn primary lg', type: 'button', text: '开始测验', onclick: e => { e.currentTarget.remove(); start(); } })));
    body.append(area);
  }

  // ---------- 入口 ----------

  root.Views.lesson = function (el, n, step, q) {
    const d = Course.day(n);
    if (!d) {
      el.append(h('div', { class: 'card' }, h('p', { class: 'big', text: '没有第 ' + n + ' 课' }), h('a', { class: 'btn primary', href: '#/lessons', text: '回到全部课程' })));
      return;
    }
    if (STEPS.indexOf(step) < 0) {
      step = STEPS.find(s => !Store.stepDone(n, s)) || 'intro';
      history.replaceState(null, '', '#/lesson/' + n + '/' + step);
    }
    const isl = Course.islandOf(n), ph = Course.phaseOf(n);
    el.style.setProperty('--h', isl.hue);
    const si = STEPS.indexOf(step);
    const info = App.todayInfo();
    const planDay = App.dayOfLesson(n);

    const tabs = h('nav', { class: 'pill-tabs steps', 'aria-label': '学习步骤' });
    function drawTabs() {
      clear(tabs);
      STEPS.forEach((s, i) => tabs.append(h('a', { class: s === step ? 'on' : '', href: '#/lesson/' + n + '/' + s, 'aria-current': s === step ? 'step' : null, dataset: { step: s } },
        Store.STEP_ICON[s] + ' ' + (i + 1) + '. ' + Store.STEP_ZH[s], Store.stepDone(n, s) ? h('span', { class: 'ok', text: ' ✓' }) : null)));
    }
    drawTabs();

    const ctx = {
      n, d, step, q,
      refreshTabs: drawTabs,
      done() {
        const r = Store.markStep(n, step);
        drawTabs();
        if (r.lessonDone) UI.toast('🎉 第 ' + n + ' 课 6 步全部完成！' + (Store.setting('autoCards') ? '词汇已加入生词本' : ''), 3000);
        return r;
      },
      next() { const nx = STEPS[si + 1]; if (nx) location.hash = '#/lesson/' + n + '/' + nx; },
      cta(text) {
        return h('div', { class: 'step-nav' },
          si > 0 ? h('a', { class: 'btn ghost', href: '#/lesson/' + n + '/' + STEPS[si - 1], text: '← ' + Store.STEP_ZH[STEPS[si - 1]] }) : h('span'),
          si < STEPS.length - 1 ? h('button', { class: 'btn primary lg', type: 'button', text, onclick: () => { ctx.done(); ctx.next(); } }) : h('span'));
      },
    };

    const head = h('header', { class: 'lesson-head' },
      h('div', { class: 'row between' },
        h('span', { class: 'small', text: '第 ' + n + ' 课 · ' + isl.emoji + ' ' + isl.zh + ' · ' + ph.emoji + ' ' + ph.island }),
        planDay ? h('span', { class: 'chip', style: { background: 'rgba(255,255,255,.25)', color: '#fff' }, text: '计划第 ' + planDay + ' 天' + (info.day === planDay ? ' · 今天' : '') }) : null),
      h('h1', { class: 'it', lang: 'it', text: d.it }),
      h('div', { text: d.zh }),
      h('p', { class: 'small', style: { margin: '6px 0 0', opacity: .92 }, text: d.scene }));
    const body = h('div', { class: 'step-body stack' });
    el.append(App.backbar('第 ' + n + ' 课'), head, tabs, body);
    const fn = { intro: stepIntro, words: stepWords, read: (c, b) => root.LessonRead.render(c, b), grammar: stepGrammar, shadow: (c, b) => root.LessonShadow.render(c, b), quiz: stepQuiz }[step];
    fn(ctx, body);
    if (step === 'read') body.append(ctx.cta('精读完成，去看语法 →'));
    if (step === 'shadow') { /* LessonShadow 自己放完成按钮 */ }
    if (step === 'quiz') body.append(h('div', { class: 'step-nav' }, h('a', { class: 'btn ghost', href: '#/lesson/' + n + '/shadow', text: '← ' + Store.STEP_ZH.shadow }), h('span')));
  };
})(window);
