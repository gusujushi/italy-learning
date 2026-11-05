/* 生词本：所有进入间隔复习的词汇和句子。★ 收藏的词会立刻进入复习；完成一课后，本课词汇自动加入。
 * 复习用「莱特纳盒子」：不会 → 回到第 1 盒、今天再来；模糊 → 原盒、间隔减半；记得 → 升一盒；很熟 → 升两盒。 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;
  root.Views = root.Views || {};

  const MODES = {
    due: { zh: '到期复习', ids: () => Store.dueIds(30) },
    wrong: { zh: '错题重练', ids: () => Store.wrongCardIds(20) },
    star: { zh: '收藏复习', ids: () => Ita.shuffle(Store.starIds()).slice(0, 20) },
    random: { zh: '随机巩固', ids: () => Ita.shuffle(Store.allCardIds()).slice(0, 15) },
  };

  // ---------- 复习会话 ----------

  function session(el, mode) {
    const cfg = MODES[mode] || MODES.due;
    const ids = cfg.ids();
    el.append(App.backbar('生词本 · ' + cfg.zh));
    const box = h('div', { class: 'stack' });
    el.append(box);
    const queue = ids.map(id => Lesson.cardById(id)).filter(Boolean);
    if (!queue.length) {
      const total = Store.cardCount();
      box.append(h('div', { class: 'card empty' },
        h('div', { class: 'big', text: total ? '🎉 这里没有要复习的卡片' : '📭 还没有生词卡片' }),
        h('p', { class: 'muted', text: total ? '间隔复习会在合适的时间把卡片再带回来。想多练一点？' : '学完一课（6 步全部完成）后，本课词汇会自动加入；也可以在词汇页点 ☆ 手动加入。' }),
        h('div', { class: 'row gap wrap center' },
          total ? h('a', { class: 'btn primary', href: '#/words/review?mode=random', text: '随机巩固 15 张' }) : null,
          h('a', { class: 'btn ghost', href: '#/words', text: '回到生词本' }))));
      return;
    }
    const total = queue.length;
    let done = 0, good = 0;
    const grades = [0, 0, 0, 0];

    function show() {
      clear(box);
      if (!queue.length) return summary();
      const c = queue[0];
      if (!c.dir) c.dir = c.kind === 'v' && Math.random() < 0.5 ? 'it2zh' : 'zh2it';
      const itFront = c.dir === 'it2zh';
      const sound = h('button', { class: 'btn round', type: 'button', 'aria-label': '播放', onclick: e => { e.stopPropagation(); Sound.play(c.it); }, text: '🔊' });
      const frontEl = itFront
        ? h('div', null, h('div', { class: c.kind === 's' ? 'it big' : 'w it', lang: 'it', text: c.it }), c.ph ? h('div', { class: 'ph', text: c.ph }) : null, sound)
        : h('div', { class: 'zh big', text: c.zh });
      const back = h('div', { hidden: true, style: { marginTop: '14px' } },
        itFront ? h('div', { class: 'zh big', text: c.zh })
          : h('div', null, h('div', { class: c.kind === 's' ? 'it big' : 'w it', lang: 'it', text: c.it }), c.ph ? h('div', { class: 'ph', text: c.ph }) : null, sound));
      const rate = h('div', { class: 'rate4', hidden: true },
        [['不会', 0, 'r0'], ['模糊', 1, 'r1'], ['记得', 2, 'r2'], ['很熟', 3, 'r3']].map(([t, v, cls]) => h('button', { type: 'button', class: 'btn ' + cls, text: t, onclick: () => grade(c, v) })));
      const reveal = h('button', { class: 'btn primary lg next', type: 'button', text: '显示答案', onclick: () => { reveal.hidden = true; back.hidden = false; rate.hidden = false; if (!itFront) Sound.play(c.it); } });
      box.append(
        h('div', { class: 'ex-top' }, h('div', { class: 'bar' }, h('i', { style: { width: Math.round(100 * done / total) + '%' } })), h('span', { class: 'cnt', text: done + ' / ' + total })),
        h('div', { class: 'flash', onclick: () => { if (!reveal.hidden) reveal.click(); } },
          h('div', null, h('div', { class: 'rmeta', text: (c.kind === 'v' ? '词汇' : '句子') + ' · 第 ' + c.day + ' 课' + (itFront ? ' · 看意大利语想意思' : ' · 看中文想意大利语') }), h('div', { style: { height: '8px' } }), frontEl, back)),
        reveal, rate);
      if (itFront) setTimeout(() => Sound.play(c.it), 200);
    }
    function grade(c, v) {
      Sound.stop();
      Store.gradeCard(c.id, v);
      grades[v]++;
      queue.shift();
      if (v === 0) { c.retries = (c.retries || 0) + 1; if (c.retries <= 2) { c.dir = null; queue.push(c); } else done++; }
      else { done++; if (v >= 2) good++; }
      show();
    }
    function summary() {
      box.append(h('div', { class: 'card summary' },
        h('div', { class: 'ring', style: { '--p': Math.round(100 * good / total) } }, h('b', { text: Math.round(100 * good / total) + '%' }), h('small', { text: good + '/' + total })),
        h('p', { class: 'big', text: '本轮完成！' }),
        h('p', { class: 'muted', text: '不会 ' + grades[0] + ' · 模糊 ' + grades[1] + ' · 记得 ' + grades[2] + ' · 很熟 ' + grades[3] }),
        h('div', { class: 'row gap wrap center' },
          Store.dueCount() ? h('a', { class: 'btn primary', href: '#/words/review?mode=due', text: '继续复习（还有 ' + Store.dueCount() + ' 张）' }) : null,
          grades[0] ? h('a', { class: 'btn', href: '#/words/review?mode=wrong', text: '练习错题' }) : null,
          h('a', { class: 'btn ghost', href: '#/words', text: '回到生词本' }))));
    }
    show();
  }

  // ---------- 总览与列表 ----------

  const FILTERS = [['all', '全部'], ['v', '词汇'], ['s', '句子'], ['star', '★ 收藏'], ['wrong', '错题'], ['due', '到期'], ['mature', '已掌握']];
  const PAGE = 50;

  function parseId(id) { const p = id.split(':'); return [p[0], +p[1], +p[2]]; }

  function overview(el, q) {
    const stack = h('div', { class: 'stack' });
    el.append(stack);
    const total = Store.cardCount(), due = Store.dueCount(), stars = Store.starIds().length, wrong = Store.wrongCardIds(999).length;
    stack.append(h('div', null, h('h1', { text: '生词本' }),
      h('p', { class: 'muted', text: '用间隔复习（莱特纳盒子 1–6 盒）记住词汇和句子。学完一课，本课词汇自动加入；在词汇页点 ☆ 可以手动加入。' })));
    stack.append(h('div', { class: 'grid g4' },
      h('div', { class: 'card stat' }, h('b', { text: String(total) }), h('span', { class: 'muted small', text: '卡片总数' })),
      h('div', { class: 'card stat' }, h('b', { text: String(Store.matureCount()) }), h('span', { class: 'muted small', text: '已掌握（第 4 盒以上）' })),
      h('div', { class: 'card stat' }, h('b', { text: String(due) }), h('span', { class: 'muted small', text: '今天到期' })),
      h('div', { class: 'card stat' }, h('b', { text: String(stars) }), h('span', { class: 'muted small', text: '★ 收藏' }))));
    const start = (mode, n, extra) => h('a', { class: 'card', href: '#/words/review?mode=' + mode, style: { textDecoration: 'none', color: 'inherit', opacity: n ? 1 : .55 } },
      h('b', { text: MODES[mode].zh }), h('div', { class: 'muted small', text: extra }), h('div', { style: { marginTop: '8px' } }, h('span', { class: 'chip ' + (n ? '' : 'static'), text: n ? '开始（' + n + ' 张）›' : '暂无' })));
    stack.append(h('div', { class: 'grid g4' },
      start('due', due, '最划算：按遗忘曲线安排'), start('wrong', wrong, '答错过的卡片'), start('star', stars, '你手动 ☆ 的词'), start('random', Math.min(15, total), '随机抽 15 张')));

    if (!total) {
      stack.append(h('div', { class: 'card empty' }, h('div', { class: 'big', text: '📭 还没有生词卡片' }), h('p', { class: 'muted', text: '去学一课：完成 6 步后词汇自动加入。' }), h('a', { class: 'btn primary', href: '#/', text: '去今日学习' })));
      return;
    }

    // 列表
    const st = { f: (q && q.get('f')) || 'all', text: '', shown: PAGE };
    const listBox = h('div', { class: 'card' });
    const filterBar = h('div', { class: 'pill-tabs', style: { margin: '0 0 10px', '--c': 'var(--ink)' } });
    const search = h('input', { type: 'text', placeholder: '搜索意大利语或中文…', 'aria-label': '搜索', oninput: e => { st.text = e.target.value.trim(); st.shown = PAGE; draw(); } });
    function collect() {
      const t = Ita.norm(st.text);
      return Store.allCardIds().map(id => ({ id, c: Lesson.cardById(id), s: Store.card(id) })).filter(x => x.c && x.s).filter(x => {
        if (st.f === 'v' && x.c.kind !== 'v') return false;
        if (st.f === 's' && x.c.kind !== 's') return false;
        if (st.f === 'star' && !x.s.star) return false;
        if (st.f === 'wrong' && !(x.s.wrong > 0)) return false;
        if (st.f === 'due' && !(x.s.due <= Store.today())) return false;
        if (st.f === 'mature' && !(x.s.box >= 4)) return false;
        if (t && Ita.norm(x.c.it).indexOf(t) < 0 && x.c.zh.indexOf(st.text) < 0) return false;
        return true;
      }).sort((a, b) => { const A = parseId(a.id), B = parseId(b.id); return A[1] - B[1] || (A[0] < B[0] ? -1 : A[0] > B[0] ? 1 : 0) || A[2] - B[2]; });
    }
    function draw() {
      clear(filterBar);
      FILTERS.forEach(([f, t]) => filterBar.append(h('button', { type: 'button', class: st.f === f ? 'on' : '', text: t, onclick: () => { st.f = f; st.shown = PAGE; draw(); } })));
      const all = collect();
      clear(listBox);
      listBox.append(h('div', { class: 'row between', style: { marginBottom: '8px' } }, h('b', { text: '全部卡片' }), h('span', { class: 'muted small', text: '共 ' + all.length + ' 张' })), filterBar, search);
      if (!all.length) { listBox.append(h('p', { class: 'muted', style: { marginTop: '12px' }, text: '没有符合条件的卡片。' })); return; }
      const wl = h('div', { class: 'wlist' });
      all.slice(0, st.shown).forEach(x => {
        const star = h('button', { class: 'star', type: 'button', 'aria-label': '收藏', 'aria-pressed': String(!!x.s.star), text: x.s.star ? '★' : '☆',
          onclick: e => { const on = Store.toggleStar(x.id); e.currentTarget.textContent = on ? '★' : '☆'; } });
        const del = h('button', { class: 'icon-btn', type: 'button', 'aria-label': '移出生词本', title: '移出生词本', text: '🗑', onclick: async () => {
          if (await UI.confirmBox('移出生词本？', '「' + x.c.it + '」的复习进度会被清除。', '移出')) { Store.removeCard(x.id); draw(); }
        } });
        wl.append(h('div', { class: 'wrow' },
          h('button', { class: 'icon-btn', type: 'button', 'aria-label': '播放', text: '▶', onclick: () => Sound.play(x.c.it) }),
          h('div', { style: { flex: 1, minWidth: 0 } },
            h('div', null, h('b', { class: 'it', lang: 'it', text: x.c.it }), x.c.ph ? h('span', { class: 'ph', text: '  ' + x.c.ph }) : null),
            h('div', { class: 'zh small', text: x.c.zh }),
            h('div', { class: 'rmeta', text: '第 ' + x.c.day + ' 课 · 第 ' + x.s.box + ' 盒 · ' + (x.s.due <= Store.today() ? '今天到期' : x.s.due + ' 到期') + (x.s.wrong ? ' · 错 ' + x.s.wrong + ' 次' : '') })),
          star, del));
      });
      listBox.append(wl);
      if (all.length > st.shown) listBox.append(h('div', { class: 'row center', style: { marginTop: '10px' } }, h('button', { class: 'btn ghost', type: 'button', text: '显示更多（还有 ' + (all.length - st.shown) + ' 张）', onclick: () => { st.shown += PAGE; draw(); } })));
    }
    draw();
    stack.append(listBox);
  }

  root.Views.words = function (el, sub, q) {
    if (sub === 'review') session(el, (q && q.get('mode')) || 'due');
    else overview(el, q);
  };
})(window);
