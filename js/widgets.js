/* 各页面共用的小部件：课程卡片、步骤小点、表格、例句、日期显示。 */
(function (root) {
  'use strict';
  const h = UI.h;

  const WEEK = '日一二三四五六';
  /** "2026-11-05" → "11月5日 周四" */
  function fmtDate(ds) {
    const d = Plan.parseDate(ds);
    return (d.getMonth() + 1) + '月' + d.getDate() + '日 周' + WEEK[d.getDay()];
  }

  const phaseOf = n => Course.phaseOf(n);
  const islandOf = n => Course.islandOf(n);
  const hexOf = n => (phaseOf(n) || {}).hex || '#12a4b6';

  function card() { return h('section', { class: 'card' }, Array.prototype.slice.call(arguments)); }
  function cardT(title, sub) {
    const kids = Array.prototype.slice.call(arguments, 2);
    return h('section', { class: 'card' }, h('h3', null, title, sub ? h('small', { text: '  ' + sub }) : null), kids);
  }

  function goalList(goal) {
    return h('ul', { class: 'goals' }, String(goal).split('；').filter(Boolean).map(g => h('li', { text: g.replace(/[。]$/, '') })));
  }

  function playBtn(text, cls, opts) {
    return h('button', { class: cls || 'play', type: 'button', 'aria-label': '播放', onclick: e => { e.stopPropagation(); Sound.play(text, opts); } }, '▶');
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

  /** 6 个小点：这一课完成了几步 */
  function dots(n) {
    return h('div', { class: 'dots', 'aria-label': '已完成 ' + Store.stepCount(n) + ' / 6 步' },
      Store.STEPS.map(s => h('i', { class: Store.stepDone(n, s) ? 'on' : '', title: Store.STEP_ZH[s] })));
  }

  function lessonState(n) {
    if (Store.lessonDone(n)) return '已完成';
    const c = Store.stepCount(n);
    return c ? '已学 ' + c + '/6 步' : '未开始';
  }

  /** 今日学习里的一行：一课 */
  function lessonRow(n) {
    const d = Course.day(n);
    const done = Store.lessonDone(n);
    return h('a', { class: 'task' + (done ? ' done' : ''), href: '#/lesson/' + n, style: { '--c': hexOf(n) } },
      h('div', { class: 'num' }, h('span', null, h('small', { text: '第' }), h('br'), n + '课')),
      h('div', { style: { flex: 1, minWidth: 0 } },
        h('div', { class: 'row between' },
          h('b', { class: 'it', lang: 'it', text: d.it }),
          done ? h('span', { class: 'chip done', text: '✓ 已完成' + (Store.bestScore(n) ? ' · ' + Store.bestScore(n) + ' 分' : '') }) : h('span', { class: 'chip', text: lessonState(n) })),
        h('div', { class: 'zh', text: d.zh }),
        dots(n)));
  }

  /** 全部课程里的一张卡 */
  function lessonCard(n, extra) {
    const d = Course.day(n);
    const best = Store.bestScore(n);
    return h('a', { class: 'lesson-card', href: '#/lesson/' + n, style: { '--c': hexOf(n) }, 'aria-label': '第 ' + n + ' 课 ' + d.zh },
      h('div', { class: 'row between' },
        h('span', { class: 'n', text: '第 ' + n + ' 课' + (d.exam ? ' · 毕业考' : d.test ? ' · 关卡' : '') }),
        extra || (Store.lessonDone(n) ? h('span', { class: 'chip done', text: '✓ ' + (best || '') }) : null)),
      h('div', { class: 't it', lang: 'it', text: d.it }),
      h('div', { class: 'zh small', text: d.zh }),
      dots(n));
  }

  /** 计划里一天的标题：学习日 / 复习日 / 自由日 */
  const TYPE_ZH = { learn: '学习日', review: '复习日', free: '自由日' };
  const TYPE_ICON = { learn: '📘', review: '🔁', free: '☕' };

  // ---------- 添加到手机主屏幕 ----------
  const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const isWeb = () => /^https?:$/.test(location.protocol);

  /** 把本程序"安装"到手机桌面的步骤（iPhone / 安卓各一份，当前设备那一份放在最前面） */
  function installGuide() {
    const ios = h('div', { class: 'note' }, h('b', { text: '🍎 iPhone / iPad' }),
      h('ol', { class: 'tips', style: { margin: '6px 0 0' } },
        h('li', { text: '必须用 Safari 打开本页（Chrome、微信内置浏览器都不能添加）。' }),
        h('li', { text: '点底部的「分享」按钮 ⬆️。' }),
        h('li', { text: '向下滑，选「添加到主屏幕」，点「添加」。' }),
        h('li', { text: '之后从桌面图标打开：全屏、没有地址栏。' })));
    const android = h('div', { class: 'note' }, h('b', { text: '🤖 安卓' }),
      h('ol', { class: 'tips', style: { margin: '6px 0 0' } },
        h('li', { text: '用 Chrome（或 Edge）打开本页。' }),
        h('li', { text: '点页面里的「安装」按钮；没有的话，点右上角菜单 ⋮ →「安装应用」或「添加到主屏幕」。' }),
        h('li', { text: '之后从桌面图标打开。' })));
    return h('div', { class: 'stack' }, isIOS() ? [ios, android] : [android, ios],
      h('p', { class: 'muted small', style: { margin: 0 }, text: '提示：iPhone 上，主屏幕里的应用和 Safari 的学习进度是分开保存的——建议先添加到主屏幕，再开始学；已经在 Safari 里学了一部分的话，用「设置与计划 → 导出 / 导入进度」搬过去。' }));
  }

  root.W = { isIOS, isStandalone, isWeb, installGuide, fmtDate, phaseOf, islandOf, hexOf, card, cardT, goalList, playBtn, table, egList, dots, lessonState, lessonRow, lessonCard, TYPE_ZH, TYPE_ICON };
})(window);
