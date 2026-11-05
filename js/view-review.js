/* 复习：间隔重复卡片 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;
  root.Views = root.Views || {};

  root.Views.review = function (el, q) {
    clear(el);
    const mode = (q && q.get && q.get('mode')) || 'due';
    const titles = { due: '到期复习', wrong: '错题重练', random: '随机巩固' };
    el.append(h('header', { class: 'lbar' },
      h('a', { class: 'icon-btn', href: '#/', 'aria-label': '返回', text: '←' }),
      h('div', { class: 'ttl' }, h('small', { text: 'Ripasso' }), h('b', { text: '复习 · ' + (titles[mode] || titles.due) }))));
    const box = h('div', { class: 'pad' });
    el.append(box);

    let ids;
    if (mode === 'wrong') ids = Store.wrongCardIds(20);
    else if (mode === 'random') ids = Ita.shuffle(Store.allCardIds()).slice(0, 15);
    else ids = Store.dueIds(30);

    if (!ids.length) {
      const total = Store.cardCount();
      box.append(h('div', { class: 'empty' },
        h('div', { class: 'big', text: total ? '🎉 今天没有要复习的卡片' : '📭 还没有复习卡片' }),
        h('p', { class: 'muted', text: total ? '间隔复习会在合适的时间把卡片再带回来。想多练一点？' : '通过一天的小测（≥60%）后，当天的词汇和关键句会自动变成复习卡片。' }),
        h('div', { class: 'row gap wrap center' },
          total ? h('a', { class: 'btn primary', href: '#/review?mode=random', text: '随机巩固 15 张' }) : null,
          Store.wrongCardIds(1).length ? h('a', { class: 'btn', href: '#/review?mode=wrong', text: '练习错题' }) : null,
          h('a', { class: 'btn ghost', href: '#/', text: '回到地图' }))));
      return;
    }

    const queue = ids.map(id => Course.cardById(id)).filter(Boolean);
    const total = queue.length;
    let done = 0, good = 0;
    const grades = [0, 0, 0, 0];

    function show() {
      clear(box);
      if (!queue.length) return summary();
      const c = queue[0];
      if (!c.dir) c.dir = c.kind === 'v' && Math.random() < 0.5 ? 'it2zh' : 'zh2it';
      const itFront = c.dir === 'it2zh';
      const frontEl = itFront
        ? h('div', null, h('div', { class: 'it big', lang: 'it', text: c.it }), c.ph ? h('div', { class: 'ph', text: c.ph }) : null,
          h('button', { class: 'btn round', type: 'button', 'aria-label': '播放', onclick: () => Sound.play(c.it), text: '🔊' }))
        : h('div', { class: 'zh big', text: c.zh });
      const back = h('div', { class: 'rback', hidden: true },
        itFront ? h('div', { class: 'zh big', text: c.zh })
          : h('div', null, h('div', { class: 'it big', lang: 'it', text: c.it }), c.ph ? h('div', { class: 'ph', text: c.ph }) : null,
            h('button', { class: 'btn round', type: 'button', 'aria-label': '播放', onclick: () => Sound.play(c.it), text: '🔊' })));
      const rate = h('div', { class: 'rate4', hidden: true },
        [['不会', 0, 'r0'], ['模糊', 1, 'r1'], ['记得', 2, 'r2'], ['很熟', 3, 'r3']].map(([t, v, cls]) =>
          h('button', { type: 'button', class: 'btn ' + cls, text: t, onclick: () => grade(c, v) })));
      const reveal = h('button', { class: 'btn primary lg', type: 'button', text: '显示答案', onclick: () => {
        reveal.hidden = true; back.hidden = false; rate.hidden = false;
        if (!itFront) Sound.play(c.it);
      } });
      box.append(
        h('div', { class: 'ex-top' }, h('div', { class: 'bar' }, h('i', { style: { width: Math.round(100 * done / total) + '%' } })), h('span', { class: 'cnt', text: done + ' / ' + total })),
        h('div', { class: 'rcard' },
          h('div', { class: 'rmeta', text: (c.kind === 'v' ? '词汇' : '句子') + ' · 第 ' + c.day + ' 天' + (itFront ? ' · 看意大利语想意思' : ' · 看中文想意大利语') }),
          frontEl, back),
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
      box.append(h('div', { class: 'summary' },
        h('div', { class: 'ring', style: { '--p': Math.round(100 * good / total) } }, h('b', { text: Math.round(100 * good / total) + '%' }), h('small', { text: good + '/' + total })),
        h('p', { class: 'big', text: '本轮完成！' }),
        h('p', { class: 'muted', text: '不会 ' + grades[0] + ' · 模糊 ' + grades[1] + ' · 记得 ' + grades[2] + ' · 很熟 ' + grades[3] }),
        h('div', { class: 'row gap wrap center' },
          Store.dueCount() ? h('a', { class: 'btn primary', href: '#/review', text: '继续复习（还有 ' + Store.dueCount() + ' 张）' }) : null,
          grades[0] ? h('a', { class: 'btn', href: '#/review?mode=wrong', text: '练习错题' }) : null,
          h('a', { class: 'btn ghost', href: '#/', text: '回到地图' }))));
    }
    show();
  };
})(window);
