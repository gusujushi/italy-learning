/* 首页：岛屿地图 */
(function (root) {
  'use strict';
  const h = UI.h;
  root.Views = root.Views || {};

  const STEP_ZH = { listen: '听', read: '读', learn: '学', speak: '说', write: '写', test: '测' };

  function chip(icon, text) { return h('span', { class: 'chip static' }, icon + ' ' + text); }

  function dayState(n) {
    if (Store.day(n).stars > 0) return 'done';
    return Store.isUnlocked(n) ? 'open' : 'lock';
  }

  function openDay(n, cur) {
    const d = Course.day(n);
    const isl = Course.islandOf(n);
    if (!Store.isUnlocked(n)) { UI.toast('先完成第 ' + (n - 1) + ' 天，就能解锁这一天'); return; }
    if (!d) {
      UI.sheet('第 ' + n + ' 天', h('p', { text: '这一天的内容还在建设中，敬请期待。' }));
      return;
    }
    const s = Store.day(n);
    const steps = h('div', { class: 'steps-row' }, Store.STEPS.map(st =>
      h('span', { class: 'step-dot' + (Store.stepDone(n, st) ? ' on' : ''), text: STEP_ZH[st] })));
    const body = h('div', { class: 'day-sheet' },
      h('p', { class: 'it', lang: 'it', text: d.it }),
      h('p', { class: 'goal', text: d.goal }),
      steps,
      s.stars > 0 ? h('p', { class: 'muted', text: '最好成绩 ' + s.best + '% · ' + UI.stars(s.stars) }) : null,
      h('div', { class: 'row end gap' },
        h('button', { class: 'btn primary', onclick: () => { sh.close(); location.hash = '#/day/' + n; }, text: s.stars > 0 ? '再学一遍' : (Store.STEPS.some(st => Store.stepDone(n, st)) ? '继续学习' : '开始学习') })));
    const sh = UI.sheet('第 ' + n + ' 天 · ' + d.zh + (d.test ? ' 🏆' : ''), body);
    void isl; void cur;
  }

  function node(n, cur) {
    const d = Course.day(n), st = dayState(n), s = Store.day(n);
    const boss = d && (d.test || d.exam);
    const b = h('button', {
      class: 'node ' + st + (boss ? ' boss' : '') + (n === cur ? ' cur' : ''),
      'aria-label': '第 ' + n + ' 天 ' + (d ? d.zh : '') + (st === 'lock' ? '（未解锁）' : ''),
      onclick: () => openDay(n, cur),
    },
      h('span', { class: 'num', text: st === 'lock' ? '🔒' : boss ? '🏆' : String(n) }),
      h('span', { class: 'stars', text: st === 'done' ? UI.stars(s.stars) : (boss ? 'D' + n : '') }));
    return h('div', { class: 'node-wrap' }, b, h('span', { class: 'node-label', text: d ? d.zh : '' }));
  }

  function snake(days, cur) {
    const r1 = days.slice(0, 5), r2 = days.slice(5).reverse();
    return h('div', { class: 'snake' },
      h('div', { class: 'srow' }, r1.map(n => node(n, cur))),
      h('div', { class: 'turn' }),
      h('div', { class: 'srow rev' }, r2.map(n => node(n, cur))));
  }

  function islandCard(isl, cur) {
    const days = Course.islandDays(isl.id);
    const done = days.filter(n => Store.day(n).stars > 0).length;
    return h('section', { class: 'island' + (done === days.length ? ' complete' : ''), style: { '--h': isl.hue }, id: 'isl' + isl.id },
      h('div', { class: 'isl-head' },
        h('div', { class: 'isl-emoji', 'aria-hidden': 'true', text: isl.emoji }),
        h('div', { class: 'isl-title' },
          h('b', { text: '第 ' + isl.id + ' 岛 · ' + isl.zh }),
          h('span', { class: 'it', lang: 'it', text: isl.it })),
        h('div', { class: 'isl-prog', text: done === days.length ? '🏅 ' + done + '/' + days.length : done + '/' + days.length })),
      h('p', { class: 'blurb', text: isl.blurb }),
      snake(days, cur));
  }

  root.Views.map = function (el) {
    UI.clear(el);
    const total = Course.total();
    const cur = Store.currentDay(total);
    const cd = Course.day(cur);
    const due = Store.dueCount();
    const lvl = Store.level();
    const done = Store.completedCount();

    const cta = h('button', { class: 'cta', onclick: () => { location.hash = '#/day/' + cur; } },
      h('span', { class: 'cta-k', text: done === 0 ? '开始你的意大利之旅' : (done >= total ? '回顾学习' : '继续学习') }),
      h('span', { class: 'cta-t' }, '第 ' + cur + ' 天 · ', h('span', { lang: 'it', text: cd ? cd.it : '内容建设中' })),
      h('span', { class: 'cta-go', 'aria-hidden': 'true', text: '▶' }));

    el.append(
      h('header', { class: 'hero' },
        h('div', { class: 'hero-top' },
          h('div', null, h('h1', { text: '意大利语能力岛' }), h('p', { class: 'sub', text: 'Isola · 90 天听说读写' })),
          h('div', { class: 'chips' }, chip('🔥', Store.streakNow() + ' 天'), chip('⭐', Store.starTotal()), chip('Lv.' + lvl.lv, ''))),
        h('div', { class: 'prog', 'aria-label': '总进度' }, h('i', { style: { width: Math.round(100 * done / total) + '%' } })),
        h('p', { class: 'muted small', text: '已完成 ' + done + ' / ' + total + ' 天' }),
        cta,
        h('a', { class: 'due-card' + (due ? ' has' : ''), href: '#/review' },
          h('span', { text: due ? '🔁 有 ' + due + ' 张卡片等你复习' : '✅ 今天没有到期的复习卡' }),
          h('span', { class: 'arrow', text: '›' }))));

    Course.meta().phases.forEach(ph => {
      el.append(h('h2', { class: 'phase-h' },
        h('span', { text: '阶段 ' + ph.id + ' · ' + ph.zh }),
        h('small', { text: ' ' + ph.it + ' · ' + ph.level })),
        h('p', { class: 'phase-goal', text: ph.goal }));
      Course.meta().islands.filter(i => i.days[0] >= ph.days[0] && i.days[1] <= ph.days[1]).forEach(i => el.append(islandCard(i, cur)));
    });

    el.append(h('p', { class: 'foot-note', text: '提示：想跳过已经会的内容？到「我的 → 设置」打开「解锁全部天数」。' }));

    // 滚动到当前岛
    const curIsl = Course.islandOf(cur);
    if (curIsl && done > 0) setTimeout(() => { const t = document.getElementById('isl' + curIsl.id); if (t) t.scrollIntoView({ block: 'start', behavior: 'auto' }); }, 30);
  };
})(window);
