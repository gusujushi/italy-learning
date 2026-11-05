/* 我的进度：等级、五项能力雷达、闯关成绩、学习热力图、徽章 */
(function (root) {
  'use strict';
  const h = UI.h;
  root.Views = root.Views || {};
  const SKILL_ZH = { listen: '听', speak: '说', read: '读', write: '写', know: '知识' };
  const SVG = 'http://www.w3.org/2000/svg';

  function s(tag, attrs, text) {
    const e = document.createElementNS(SVG, tag);
    Object.keys(attrs || {}).forEach(k => e.setAttribute(k, attrs[k]));
    if (text != null) e.textContent = text;
    return e;
  }

  function radar() {
    const keys = Store.SKILLS, C = 120, R = 82;
    const svg = s('svg', { viewBox: '0 0 240 240', class: 'radar', role: 'img', 'aria-label': '五项能力雷达图' });
    const pt = (i, f) => { const a = -Math.PI / 2 + i * 2 * Math.PI / keys.length; return [C + R * f * Math.cos(a), C + R * f * Math.sin(a)]; };
    [0.25, 0.5, 0.75, 1].forEach(f => svg.append(s('polygon', { class: 'ring', points: keys.map((k, i) => pt(i, f).join(',')).join(' ') })));
    keys.forEach((k, i) => { const p = pt(i, 1); svg.append(s('line', { class: 'axis', x1: C, y1: C, x2: p[0], y2: p[1] })); });
    const vals = keys.map(k => Store.skillLevel(k));
    svg.append(s('polygon', { class: 'area', points: keys.map((k, i) => pt(i, (vals[i] == null ? 0 : vals[i]) / 100).join(',')).join(' ') }));
    keys.forEach((k, i) => {
      const lp = pt(i, 1.2);
      svg.append(s('text', { class: 'lab', x: lp[0], y: lp[1], 'text-anchor': 'middle', 'dominant-baseline': 'middle' }, SKILL_ZH[k] + (vals[i] == null ? '' : ' ' + vals[i])));
      if (vals[i] != null) { const p = pt(i, vals[i] / 100); svg.append(s('circle', { class: 'dot', cx: p[0], cy: p[1], r: 3.5 })); }
    });
    return svg;
  }

  const stat = (v, l) => h('div', { class: 'statbox' }, h('b', { text: String(v) }), h('span', { text: l }));

  root.Views.me = function (el) {
    const lvl = Store.level();
    const next = 40 * lvl.lv * lvl.lv, prev = 40 * (lvl.lv - 1) * (lvl.lv - 1);
    const pct = Math.min(100, Math.round(100 * (Store.xp - prev) / (next - prev)));
    const info = App.todayInfo();
    const stack = h('div', { class: 'stack' });
    el.append(stack);
    stack.append(h('div', null, h('h1', { text: '我的进度' }), h('p', { class: 'muted', text: '看看你学了多少、哪一项能力需要加强。' })));

    stack.append(h('section', { class: 'card' },
      h('div', { class: 'row between' }, h('b', { class: 'big', text: 'Lv.' + lvl.lv + ' ' + lvl.name }), h('span', { class: 'muted', text: Store.xp + ' XP' })),
      h('div', { class: 'prog' }, h('i', { style: { width: pct + '%' } })),
      h('p', { class: 'muted small', text: '距离下一级还需 ' + (next - Store.xp) + ' XP。完成步骤、答对题、通关、复习卡片都会获得经验。' }),
      h('div', { class: 'stats' },
        stat(Store.completedCount() + '/' + Course.total(), '已学课数'), stat(Store.streakNow(), '连续天数'),
        stat(Store.streak.best, '最长连续'), stat(Store.totalMinutes(), '累计分钟'),
        stat(Store.cardCount(), '生词卡'), stat(Store.matureCount(), '已掌握卡'),
        stat(Store.minutesToday(), '今日分钟'), stat(Store.dueCount(), '待复习'))));

    // 三座大岛
    stack.append(h('section', { class: 'card stack' }, h('h3', { text: '三座大岛' }),
      Course.meta().phases.map(ph => {
        const ids = []; for (let n = ph.days[0]; n <= ph.days[1]; n++) if (Course.has(n)) ids.push(n);
        const d = ids.filter(n => Store.lessonDone(n)).length;
        return h('div', { style: { '--c': ph.hex } }, h('div', { class: 'row between' }, h('b', { text: ph.emoji + ' ' + ph.island + ' · ' + ph.zh }), h('span', { class: 'muted small', text: d + ' / ' + ids.length + ' 课' })),
          h('div', { class: 'bar' }, h('i', { style: { width: Math.round(100 * d / ids.length) + '%' } })));
      })));

    // 闯关成绩
    stack.append(h('section', { class: 'card' }, h('h3', null, '闯关成绩', h('small', { text: '  每格一课，颜色越深分数越高' })),
      h('div', { class: 'score-grid' }, Array.from({ length: Course.total() }, (_, i) => i + 1).filter(n => Course.has(n)).map(n => {
        const b = Store.bestScore(n);
        return h('a', { href: '#/lesson/' + n, class: 'sc' + (Store.lessonDone(n) ? ' done' : ''), style: { '--a': (b / 100).toFixed(2) }, title: '第 ' + n + ' 课 · ' + Course.day(n).zh + (b ? ' · 最好 ' + b + ' 分' : ' · 未闯关') + (Store.lessonDone(n) ? ' · 已学完' : ''), text: String(n) });
      }))));

    stack.append(h('section', { class: 'card' }, h('h3', null, '五项能力', h('small', { text: '  近 40 题正确率' })), radar(),
      h('p', { class: 'muted small', text: '每道练习都会计入对应能力。某项落后，就多练那一项：听 → 导读盲听 / 听写；说 → 影子跟读自评；读 → 阅读 / 配对；写 → 排序 / 翻译 / 填空；知识 → 语法小测。' })));

    const days = Store.logDays(28);
    const mx = Math.max(60, ...days.map(d => d.sec));
    stack.append(h('section', { class: 'card' }, h('h3', null, '近 4 周学习', h('small', { text: '  每格一天' })),
      h('div', { class: 'heat', role: 'img', 'aria-label': '近 28 天学习时长' }, days.map(d => h('i', { title: d.d + ' · ' + Math.round(d.sec / 60) + ' 分钟', style: { '--a': (d.sec / mx).toFixed(2) } })))));

    stack.append(h('section', { class: 'card' }, h('h3', { text: '徽章' }),
      h('div', { class: 'badges' }, Store.badges().map(b => h('div', { class: 'badge' + (b.got ? ' got' : ''), title: b.desc }, h('span', { class: 'bi', text: b.got ? b.icon : '🔒' }), h('small', { text: b.name }))))));
    void info;
  };
})(window);
