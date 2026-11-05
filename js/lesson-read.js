/* ③ 逐句精读：左边是课文句子（点读、变速、循环），右边是被选中那句的「彩色句子分析」——
 * 谓语 / 连词 / 介词 / 代词着色、意群切分、主干提示、动词变位说明、语法点标签、AI 老师（可选）。 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;
  const mobile = () => window.matchMedia('(max-width: 860px)').matches;

  const LEGEND = [
    ['连词 / 疑问词', 'var(--a-conj)'], ['谓语动词', 'var(--a-verb)'], ['非谓语（不定式 / 分词 / 副动词）', 'var(--a-nonf)'],
    ['介词', 'var(--a-prep)'], ['代词', 'var(--a-pron)'], ['本课词汇', 'var(--a-vocab)'],
  ];
  const SHORT = ['连词', '谓语', '非谓语', '介词', '代词', '本课词'];
  const legend = compact => h('div', { class: 'legend', 'aria-label': '颜色说明' }, LEGEND.map(([t, c], i) => h('span', { style: { '--k': c }, text: compact ? SHORT[i] : t })));
  const LEVEL = ['', '★☆☆ 简单', '★★☆ 中等', '★★★ 长难句'];
  const CHUNK_COLORS = ['#e5484d', '#f59f00', '#2f9e44', '#2f7cf6', '#9b5de5', '#0a9a7b'];

  function seg(items, get, set) {
    const box = h('div', { class: 'seg', role: 'group' });
    const draw = () => Array.prototype.forEach.call(box.children, b => b.classList.toggle('on', b.dataset.v === String(get())));
    items.forEach(([label, val]) => box.append(h('button', { type: 'button', text: label, dataset: { v: String(val) }, onclick: () => { set(val); draw(); } })));
    draw();
    return box;
  }
  function tog(label, get, set) {
    return h('button', { type: 'button', class: 'tg' + (get() ? ' on' : ''), 'aria-pressed': String(!!get()), text: label, onclick: e => { const v = !get(); set(v); e.currentTarget.classList.toggle('on', v); e.currentTarget.setAttribute('aria-pressed', String(v)); } });
  }

  function render(ctx, body) {
    const n = ctx.n, d = ctx.d;
    const lines = Lesson.lines(n);
    const gl = Lesson.glossFor(n);
    const ana = [];
    const anaOf = i => ana[i] || (ana[i] = Grammar.colorize(lines[i].it, d.vocab));
    const S = { sel: -1, loop: 'off', rate: Store.setting('speed') || 1, sess: 0 };
    const visited = new Set();
    const rows = [];
    let pop = null;

    // ---------- 单词弹窗 ----------
    function closePop() { if (pop) { pop.remove(); pop = null; } }
    function showPop(target, k) {
      closePop();
      const v = k.vocab || gl.lookup(k.w);
      const cid = v ? Lesson.cardIdOfEntry(v) : null;
      const audioText = v && Sound.hasFile(v.it) ? v.it : Sound.hasFile(k.t.replace(/'$/, '')) ? k.t.replace(/'$/, '') : '';
      const starBtn = cid ? h('button', { class: 'star', type: 'button', 'aria-label': '加入 / 移出生词本', text: Store.isStar(cid) ? '★' : '☆',
        onclick: e => { e.stopPropagation(); const on = Store.toggleStar(cid); e.currentTarget.textContent = on ? '★' : '☆'; UI.toast(on ? '已加入生词本' : '已取消星标', 1200); } }) : null;
      pop = h('div', { class: 'pop', role: 'dialog', 'aria-label': '单词释义', onclick: e => e.stopPropagation() },
        h('div', { class: 'row between' }, h('span', { class: 'w', lang: 'it', text: k.t }), h('div', { class: 'row gap' }, starBtn, h('button', { class: 'icon-btn', type: 'button', 'aria-label': '关闭', text: '✕', onclick: closePop }))),
        k.tip ? h('p', { class: 'small', style: { margin: '6px 0' }, text: k.tip }) : null,
        v ? h('div', { class: 'note' }, h('b', { class: 'it', lang: 'it', text: v.it }), v.ph ? h('span', { class: 'ph', text: '  ' + v.ph }) : null, h('div', { text: v.zh }))
          : h('p', { class: 'muted small', style: { margin: '6px 0 0' }, text: '词汇表里没有这个词的释义（它可能是后面课程才学的词）。' }),
        audioText ? h('div', { class: 'row', style: { marginTop: '8px' } }, h('button', { class: 'btn sm', type: 'button', text: '🔊 听发音', onclick: () => Sound.play(audioText) })) : null);
      document.body.append(pop);
      const r = target.getBoundingClientRect(), w = pop.offsetWidth, ph = pop.offsetHeight;
      pop.style.left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left)) + 'px';
      pop.style.top = (r.bottom + 8 + ph > window.innerHeight ? Math.max(8, r.top - ph - 8) : r.bottom + 8) + 'px';
      setTimeout(() => document.addEventListener('click', closePop, { once: true }), 0);
    }

    // ---------- 播放 ----------
    function mark(i) {
      rows.forEach((r, j) => r.classList.toggle('playing', j === i));
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
        ok = await Sound.playSeq(lines.map(l => l.it), { gap: 450, rate: S.rate, onStart: k => { if (my === S.sess) { mark(k); rows[k].scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } } });
        if (my !== S.sess) return;
        if (S.loop === 'all' && ok) await UI.sleep(800);
      } while (S.loop === 'all' && ok && my === S.sess);
      mark(-1);
    }
    function stopAll() { S.sess++; Sound.stop(); mark(-1); }

    // ---------- 右侧：彩色分析 ----------
    const panel = h('aside', { class: 'panel card msheet', id: 'read-panel', 'aria-label': '句子分析' });
    let backdrop = null;
    function openSheet() {
      if (!mobile()) return;
      panel.classList.add('open');
      if (!backdrop) { backdrop = h('div', { class: 'backdrop', onclick: closeSheet }); document.body.append(backdrop); }
    }
    function closeSheet() { panel.classList.remove('open'); if (backdrop) { backdrop.remove(); backdrop = null; } }

    function coloredSentence(toks) {
      const wrap = h('div', { class: 'colored it', lang: 'it' });
      toks.forEach(k => {
        if (!k.w) { wrap.append(document.createTextNode(k.t)); return; }
        wrap.append(h('span', { class: 'tk ' + (k.cls || '') + (k.vocab ? ' vocab' : ''), role: 'button', tabindex: '0', title: k.tip || '点一下看释义',
          onclick: e => { e.stopPropagation(); showPop(e.currentTarget, k); },
          onkeydown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); showPop(e.currentTarget, k); } } }, k.t));
      });
      return wrap;
    }

    function aiBox(i) {
      const l = lines[i];
      const box = h('div', { class: 'ai-box' }, h('h4', { text: '🤖 AI 老师' }));
      if (!AI.ready()) {
        box.append(h('p', { class: 'muted small', style: { margin: 0 } }, '想要逐句讲解和提问？在', h('a', { href: '#/settings', text: '「设置与计划」' }), '填入 DeepSeek API Key 即可（可选，不填不影响学习）。'));
        return box;
      }
      const out = h('div', { class: 'small', style: { marginTop: '6px' } });
      const show = t => { clear(out).append(h('div', { html: UI.md(t) })); };
      const c0 = AI.cached(l, { n });
      if (c0) show(c0);
      const btn = h('button', { class: 'btn sm', type: 'button', text: c0 ? '重新讲解' : '讲解这一句', onclick: async () => {
        btn.disabled = true; btn.textContent = '思考中…';
        try {
          const r = await AI.explain(l, { n, title: d.zh }, !!btn.dataset.asked || !!c0);
          show(r.text);
        } catch (e) { clear(out).append(h('div', { class: 'why', style: { color: 'var(--bad)' }, text: '出错了：' + e.message })); }
        btn.disabled = false; btn.textContent = '重新讲解'; btn.dataset.asked = '1';
      } });
      const q = h('input', { type: 'text', placeholder: '问点别的，比如：为什么这里用 il？', 'aria-label': '向 AI 老师提问', onkeydown: e => { if (e.key === 'Enter') askBtn.click(); } });
      const askBtn = h('button', { class: 'btn sm', type: 'button', text: '提问', onclick: async () => {
        const text = q.value.trim(); if (!text) return;
        askBtn.disabled = true; clear(out).append(h('p', { class: 'muted', text: '思考中…' }));
        try { show(await AI.ask(l, { n }, text)); } catch (e) { clear(out).append(h('div', { class: 'why', style: { color: 'var(--bad)' }, text: '出错了：' + e.message })); }
        askBtn.disabled = false;
      } });
      box.append(h('div', { class: 'row gap' }, btn), h('div', { class: 'row gap', style: { marginTop: '8px', flexWrap: 'nowrap' } }, q, askBtn), out);
      return box;
    }

    function renderPanel(i) {
      clear(panel);
      const l = lines[i], toks = anaOf(i);
      const df = Grammar.difficulty(l.it);
      const tags = Grammar.tags(l.it, n, toks);
      const chunks = Grammar.chunks(l.it);
      const trunk = Grammar.trunk(l.it);
      const verbs = Grammar.verbsOf(toks);
      const sid = Lesson.sentenceCardId(n, l.i);
      const starBtn = h('button', { class: 'btn sm', type: 'button', 'aria-pressed': String(Store.isStar(sid)), text: Store.isStar(sid) ? '★ 已收藏' : '☆ 收藏句子',
        onclick: e => { const on = Store.toggleStar(sid); e.currentTarget.textContent = on ? '★ 已收藏' : '☆ 收藏句子'; e.currentTarget.setAttribute('aria-pressed', String(on)); UI.toast(on ? '句子已加入生词本' : '已取消', 1200); } });
      panel.append(
        h('div', { class: 'msheet-grip' }),
        h('div', { class: 'row between' },
          h('b', { text: '第 ' + (i + 1) + ' 句' + (l.who ? ' · ' + l.who : '') }),
          h('div', { class: 'row gap' }, h('span', { class: 'chip static', text: LEVEL[df.level] + ' · ' + df.words + ' 词' }),
            h('button', { class: 'icon-btn msheet-close', type: 'button', 'aria-label': '关闭', text: '✕', onclick: closeSheet }))),
        h('div', { class: 'row gap', style: { margin: '10px 0' } },
          h('button', { class: 'btn sm primary', type: 'button', text: '▶ 听', onclick: () => playLine(i) }),
          h('button', { class: 'btn sm', type: 'button', text: '🐢 慢速', onclick: () => { stopAll(); Sound.play(l.it, { rate: 0.7 }); } }),
          starBtn),
        coloredSentence(toks),
        legend(true),
        Store.setting('showZh') ? h('p', { class: 'zh big', style: { margin: '10px 0 0' }, text: l.zh }) : null);

      if (chunks.length > 1) {
        panel.append(h('h4', { text: '意群（一口气读完的小块）' }),
          h('div', { class: 'chunks' }, chunks.map((c, k) => h('span', { style: { '--cc': CHUNK_COLORS[k % CHUNK_COLORS.length] }, role: 'button', tabindex: '0', text: c, onclick: () => playLine(i) }))));
      }
      if (trunk) panel.append(h('h4', { text: '主干提示（去掉从句和插入语）' }), h('p', { class: 'it', lang: 'it', style: { margin: 0 }, text: trunk }));
      if (verbs.length) {
        panel.append(h('h4', { text: '动词' }), h('div', null, verbs.map(v => h('div', { class: 'vrow2' },
          h('b', { class: 'it', lang: 'it', style: { color: v.cls === 'verb' ? 'var(--a-verb)' : 'var(--a-nonf)' }, text: v.text }),
          h('span', { class: 'it small', lang: 'it', text: '← ' + v.lemma }),
          h('span', { class: 'small muted', text: v.desc.replace(/^[^—]*—\s*/, '') + (v.subject ? ' · 主语：' + v.subject : '') })))));
      }
      if (tags.length) {
        panel.append(h('h4', { text: '语法点（点开看讲解）' }),
          h('div', { class: 'row gap wrap' }, tags.map(g => h('button', { class: 'chip', type: 'button', style: { cursor: 'pointer', borderLeft: '4px solid ' + g.color }, text: g.name, onclick: () => {
            UI.sheet(g.name, h('div', { class: 'stack' }, h('p', { text: g.desc }), g.how ? h('p', { class: 'muted', text: '怎么用：' + g.how }) : null, g.ex ? h('div', { class: 'note it', lang: 'it', text: g.ex }) : null));
          } }))));
      }
      panel.append(h('div', { style: { height: '12px' } }), aiBox(i),
        h('div', { class: 'row', style: { marginTop: '12px' } }, h('a', { class: 'btn sm ghost', href: '#/lesson/' + n + '/shadow?s=' + l.i, text: '🗣️ 这句去跟读 ›' })));
    }

    function select(i, play) {
      closePop();
      S.sel = i;
      rows.forEach((r, j) => { r.classList.toggle('on', j === i); r.setAttribute('aria-selected', String(j === i)); });
      visited.add(i);
      counter.textContent = '已细读 ' + visited.size + ' / ' + lines.length + ' 句';
      renderPanel(i);
      openSheet();
      if (play) playLine(i);
    }

    // ---------- 左侧：句子列表 ----------
    const wrap = h('div', { class: 'reader' + (Store.setting('showIt') ? '' : ' hide-it') + (Store.setting('showZh') ? '' : ' hide-zh') });
    const counter = h('span', { class: 'muted small', text: '已细读 0 / ' + lines.length + ' 句' });
    const ctrl = h('section', { class: 'card stack', style: { padding: '14px 16px' } },
      h('div', { class: 'row gap wrap' },
        h('button', { class: 'btn primary sm', type: 'button', onclick: playAll, text: '▶ 播放全部' }),
        h('button', { class: 'btn ghost sm', type: 'button', onclick: stopAll, text: '■ 停止' }),
        tog('意', () => Store.setting('showIt'), v => { Store.setting('showIt', v); wrap.classList.toggle('hide-it', !v); }),
        tog('中', () => Store.setting('showZh'), v => { Store.setting('showZh', v); wrap.classList.toggle('hide-zh', !v); }),
        counter),
      h('div', { class: 'row gap wrap' },
        h('span', { class: 'lbl', text: '语速' }), seg([['0.7×', 0.7], ['0.85×', 0.85], ['1×', 1]], () => S.rate, v => { S.rate = v; Store.setting('speed', v); }),
        h('span', { class: 'lbl', text: '循环' }), seg([['关', 'off'], ['单句', 'line'], ['整段', 'all']], () => S.loop, v => { S.loop = v; })),
      legend());

    const list = h('div', { class: 'card', role: 'listbox', 'aria-label': '课文句子' });
    let textHeaderDone = false;
    lines.forEach((l, i) => {
      if (l.kind === 'text' && !textHeaderDone) {
        textHeaderDone = true;
        list.append(h('h3', { style: { margin: '14px 0 6px' } }, d.text && d.text.title ? d.text.title : '短文', h('small', { text: '  Lettura' })));
      }
      const row = h('div', { class: 'sent' + (l.pstart ? ' pstart' : ''), role: 'option', tabindex: '0', 'aria-selected': 'false',
        onclick: () => select(i, true), onkeydown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i, true); } } },
        h('span', { class: 'idx', text: String(i + 1) }),
        h('div', { style: { flex: 1, minWidth: 0 } },
          l.who ? h('span', { class: 'who', text: l.who }) : null,
          h('div', { class: 'en', lang: 'it', text: l.it }),
          h('div', { class: 'cn', text: l.zh })),
        h('div', { class: 'tools' }, h('button', { class: 'icon-btn', type: 'button', 'aria-label': '播放这一句', text: '▶', onclick: e => { e.stopPropagation(); playLine(i); } })));
      rows.push(row);
      list.append(row);
    });
    wrap.append(ctrl, h('div', { style: { height: '14px' } }), list);
    body.append(h('div', { class: 'note' }, '点任意一句：听发音，右边（手机上是底部面板）显示它的彩色分析。点句中的词看释义和变位说明；本课词汇用黄底标出。'),
      h('div', { class: 'reader-grid' }, wrap, panel));

    // 带短文的课：读完之后做阅读理解题
    if (d.rq.length) {
      const rbox = h('div');
      body.append(h('section', { class: 'card' }, h('h3', null, '阅读理解', h('small', { text: '  Comprensione del testo' })),
        h('p', { class: 'muted small', text: '读完上面的短文，回答几个问题。' }), rbox));
      ExerciseUI.run(rbox, ExGen.readQs(n), { title: '阅读', onDone: s => { if (s.total) ctx.done(); }, doneLabel: '下一步：语法透视 →', onContinue: () => ctx.next() });
    }

    panel.append(h('p', { class: 'muted', text: '← 点左边任意一句，这里会显示它的颜色分析、意群切分、动词变位和语法点。' }));
    const start = ctx.q && ctx.q.get && parseInt(ctx.q.get('s'), 10);
    if (start >= 0 && start < lines.length) {
      select(start, false);
      if (backdrop) { backdrop.remove(); backdrop = null; panel.classList.remove('open'); }
      rows[start].scrollIntoView({ block: 'center' });
    }
  }

  root.LessonRead = { render };
})(window);
