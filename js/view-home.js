/* 首页类页面：今日学习、学习地图、全部课程、更多 */
(function (root) {
  'use strict';
  const h = UI.h;
  root.Views = root.Views || {};

  const dayLessons = e => (e.lessons || []).filter(n => Course.has(n));
  const allDone = e => dayLessons(e).length > 0 && dayLessons(e).every(n => Store.lessonDone(n));
  const dayDone = e => (e.type === 'review' ? Store.reviewDone(e.day) : e.type === 'learn' ? allDone(e) : false);

  /** 计划里下一节还没学完的课（按计划顺序）。没有返回 0 */
  function nextUndone(ctx) {
    const u = ctx.units.find(x => !Store.lessonDone(x.id));
    return u ? u.id : 0;
  }
  const minutesOf = (e, ctx) => Plan.dayMinutes(e, ctx.byId);

  function stat(ico, v, l, href) {
    const inner = [h('span', { 'aria-hidden': 'true', text: ico }), h('b', { text: String(v) }), h('span', { class: 'muted small', text: l })];
    return href ? h('a', { class: 'card stat', href, style: { textDecoration: 'none', color: 'inherit' } }, inner) : h('div', { class: 'card stat' }, inner);
  }

  /** 手机浏览器里、还没安装成应用时，今日学习顶部的"添加到桌面"提示（可以点 ✕ 不再提示） */
  function installHint() {
    if (Store.setting('installHidden') || !W.isWeb() || W.isStandalone()) return null;
    if (!(window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 860)) return null;
    const box = h('div', { class: 'card install-card' },
      h('div', { class: 'row between' }, h('b', { text: '📲 添加到手机桌面，像 App 一样打开' }),
        h('button', { class: 'icon-btn', type: 'button', 'aria-label': '不再提示', text: '✕', onclick: () => { Store.setting('installHidden', true); box.remove(); } })),
      h('p', { class: 'muted small', style: { margin: '4px 0 8px' }, text: '全屏、有桌面图标，课程和音频还能离线用。' }),
      h('button', { class: 'btn sm primary', type: 'button', text: '怎么添加', onclick: async () => { if (!(await App.install())) UI.sheet('添加到手机主屏幕', W.installGuide()); } }));
    return box;
  }

  // ---------- 今日学习 ----------

  root.Views.today = function (el) {
    const info = App.todayInfo();
    const { p, ctx, day, entry, status } = info;
    const total = ctx.units.length;
    const doneN = ctx.units.filter(u => Store.lessonDone(u.id)).length;
    const due = Store.dueCount();
    const next = nextUndone(ctx);
    const lessons = dayLessons(entry);
    const focus = lessons.find(n => !Store.lessonDone(n)) || lessons[0] || next || 1;
    const ph = W.phaseOf(focus) || Course.meta().phases[0];

    // 主按钮
    let cta;
    let sub;
    if (entry.type === 'learn') {
      const undone = lessons.filter(n => !Store.lessonDone(n));
      if (undone.length) {
        const started = Store.stepCount(undone[0]) > 0;
        cta = h('a', { class: 'btn lg', style: { background: '#fff', color: '#222', borderColor: '#fff' }, href: '#/lesson/' + undone[0], text: (started ? '继续学习' : '开始学习') + ' →' });
      } else if (next) {
        cta = h('a', { class: 'btn lg', style: { background: '#fff', color: '#222', borderColor: '#fff' }, href: '#/lesson/' + next, text: '今天已完成 🎉 提前学下一课 →' });
      } else cta = h('a', { class: 'btn lg', style: { background: '#fff', color: '#222', borderColor: '#fff' }, href: '#/words', text: '全部学完 🎉 去复习生词 →' });
      sub = '今天学：' + (lessons.length ? '第 ' + Plan.rangeLabel(lessons) + ' 课' : '—') + ' · 预计 ' + minutesOf(entry, ctx) + ' 分钟';
    } else if (entry.type === 'review') {
      cta = h('a', { class: 'btn lg', style: { background: '#fff', color: '#222', borderColor: '#fff' }, href: '#/review/' + day, text: (Store.reviewDone(day) ? '再测一次' : '开始复习通关') + ' →' });
      sub = '复习第 ' + Plan.rangeLabel(lessons) + ' 课 · 预计 ' + minutesOf(entry, ctx) + ' 分钟';
    } else {
      cta = next
        ? h('a', { class: 'btn lg', style: { background: '#fff', color: '#222', borderColor: '#fff' }, href: due ? '#/words' : '#/lesson/' + next, text: due ? '去复习到期生词 →' : '提前学第 ' + next + ' 课 →' })
        : h('a', { class: 'btn lg', style: { background: '#fff', color: '#222', borderColor: '#fff' }, href: '#/words', text: '去生词本 →' });
      sub = '今天没有安排新课：补课、复习生词、练发音都行';
    }

    const startLine = status === 'before'
      ? '计划将于 ' + W.fmtDate(p.start) + ' 开始（也可以现在就学）'
      : status === 'after' ? '计划的 ' + p.days + ' 天已经结束，可以继续补课或复习' : W.fmtDate(Store.today()) + ' · 计划第 ' + day + ' / ' + p.days + ' 天';

    const hero = h('header', { class: 'hero', style: { '--hc': ph.hex } },
      h('div', { class: 'deco', 'aria-hidden': 'true', text: ph.emoji }),
      h('p', { class: 'small', style: { margin: 0, opacity: .9 }, text: startLine }),
      h('div', { class: 'row gap', style: { alignItems: 'baseline', margin: '6px 0 2px' } },
        h('span', { class: 'big', text: '第 ' + day + ' 天' }),
        h('span', { class: 'chip', style: { background: 'rgba(255,255,255,.25)', color: '#fff' }, text: W.TYPE_ICON[entry.type] + ' ' + W.TYPE_ZH[entry.type] })),
      h('p', { style: { margin: '0 0 12px' }, text: sub }),
      h('div', { class: 'bar', 'aria-label': '总进度' }, h('i', { style: { width: Math.round(100 * doneN / Math.max(1, total)) + '%' } })),
      h('p', { class: 'small', style: { margin: '6px 0 14px' }, text: '已学完 ' + doneN + ' / ' + total + ' 课 · ' + ph.island + '（' + ph.zh + '）' }),
      cta);

    const stack = h('div', { class: 'stack' }, hero);
    const ih = installHint();
    if (ih) stack.append(ih);

    stack.append(h('div', { class: 'grid g4' },
      stat('🔥', Store.streakNow(), '连续学习天数'),
      stat('📘', doneN + '/' + total, '已学完课数', '#/lessons'),
      stat('🔖', due, '到期生词', '#/words'),
      stat('⏱️', Store.minutesToday(), '今天已学分钟')));

    if (!Store.canPersist()) stack.append(h('div', { class: 'banner warn', text: '⚠ 当前环境无法保存进度（可能是隐私模式）。请到「设置与计划」导出进度备份。' }));
    if (due) stack.append(h('a', { class: 'banner', href: '#/words/review?mode=due', text: '🔁 有 ' + due + ' 张生词卡到期了——先花 5 分钟复习，再学新课效果更好 ›' }));
    const behind = status === 'running' ? Plan.behind(ctx.list, day, id => Store.lessonDone(id)) : [];
    if (behind.length) {
      stack.append(h('a', { class: 'banner', href: '#/lesson/' + behind[0], text: '⏳ 按计划已经落后 ' + behind.length + ' 课（第 ' + Plan.rangeLabel(behind) + ' 课）。先补上，或到「设置与计划」把计划放慢 ›' }));
    }

    // 今天的任务
    stack.append(h('h2', { text: '今天的任务' }));
    const tasks = h('div', { class: 'stack' });
    if (entry.type === 'learn') {
      lessons.forEach(n => tasks.append(W.lessonRow(n)));
      tasks.append(h('p', { class: 'muted small', text: '每课 6 步：🎧导读盲听 → 🔤词汇 → 🔍逐句精读 → 🧩语法透视 → 🗣️影子跟读 → 🏆闯关测验（≥60 分过关）。' }));
    } else if (entry.type === 'review') {
      const r = Store.reviewInfo(day);
      tasks.append(h('a', { class: 'task', href: '#/review/' + day, style: { '--c': ph.hex } },
        h('div', { class: 'num' }, h('span', { text: '🔁' })),
        h('div', { style: { flex: 1 } },
          h('div', { class: 'row between' }, h('b', { text: '复习日通关测验' }), r ? h('span', { class: 'chip done', text: '✓ 最好 ' + r.best + ' 分' }) : h('span', { class: 'chip', text: '未通关' })),
          h('div', { class: 'zh', text: '回顾第 ' + Plan.rangeLabel(lessons) + ' 课：综合小测，≥60 分通关' }))));
    } else {
      tasks.append(h('div', { class: 'card' },
        h('h3', { text: '☕ 自由日' }),
        h('p', { text: '这一天没有安排新课。建议做这几件事：' }),
        h('ul', { class: 'goals' },
          h('li', null, h('a', { href: '#/words', text: '复习生词本' }), '（间隔复习，最划算）'),
          h('li', null, h('a', { href: '#/lab', text: '去发音室' }), '练习双辅音、颤音 r、重音'),
          next ? h('li', null, h('a', { href: '#/lesson/' + next, text: '提前学第 ' + next + ' 课' })) : null,
          h('li', null, '把已学课文的对话再影子跟读一遍'))));
    }
    stack.append(tasks);

    // 接下来几天
    const up = ctx.list.filter(e => e.day > day).slice(0, 5);
    if (up.length) {
      stack.append(h('h2', { text: '接下来' }));
      stack.append(h('div', { class: 'card' }, up.map(e => h('div', { class: 'setrow' },
        h('span', null, h('b', { text: '第 ' + e.day + ' 天' }), h('small', { text: W.TYPE_ICON[e.type] + ' ' + W.TYPE_ZH[e.type] + (e.lessons.length ? ' · ' + (e.type === 'review' ? '复习' : '') + '第 ' + Plan.rangeLabel(e.lessons) + ' 课' : '') })),
        h('span', { class: 'muted small', text: W.fmtDate(Plan.dateOfDay(p.start, e.day)) }))),
        h('div', { class: 'row end' }, h('a', { class: 'btn sm ghost', href: '#/map', text: '查看完整地图 ›' }))));
    }

    // 三座大岛
    stack.append(h('h2', { text: '三座大岛' }));
    const islands = h('div', { class: 'grid g3' });
    Course.meta().phases.forEach(phs => {
      const ids = [];
      for (let n = phs.days[0]; n <= phs.days[1]; n++) if (Course.has(n)) ids.push(n);
      const d = ids.filter(n => Store.lessonDone(n)).length;
      const here = phs.id === ph.id;
      islands.append(h('a', { class: 'island', href: '#/lessons?phase=' + phs.id, style: { '--c': phs.hex, textDecoration: 'none', color: 'inherit', outline: here ? '3px solid ' + phs.hex : 'none' } },
        h('div', { class: 'island-head' }, h('div', { class: 'island-emoji', 'aria-hidden': 'true', text: phs.emoji }),
          h('div', null, h('b', { text: phs.island }), h('div', { class: 'muted small', text: phs.zh + ' · ' + phs.level }))),
        h('p', { class: 'small', text: phs.goal }),
        h('div', { class: 'bar' }, h('i', { style: { width: Math.round(100 * d / ids.length) + '%' } })),
        h('p', { class: 'small muted', style: { margin: '6px 0 0' }, text: '第 ' + phs.days[0] + '–' + phs.days[1] + ' 课 · 已学 ' + d + '/' + ids.length + (here ? ' · 你在这里' : '') })));
    });
    stack.append(islands);
    el.append(stack);
  };

  // ---------- 学习地图 ----------

  function sheetForDay(e, ctx, p) {
    const body = h('div', { class: 'stack' });
    if (e.type === 'learn') {
      dayLessons(e).forEach(n => body.append(W.lessonRow(n)));
      body.append(h('p', { class: 'muted small', text: '预计 ' + minutesOf(e, ctx) + ' 分钟。' }));
    } else if (e.type === 'free') {
      body.append(h('p', { text: '这一天没有安排新课——用来补课、复习生词、练发音。' }), h('a', { class: 'btn primary', href: '#/words', text: '去生词本' }));
    }
    const sh = UI.sheet('第 ' + e.day + ' 天 · ' + W.TYPE_ZH[e.type] + ' · ' + W.fmtDate(Plan.dateOfDay(p.start, e.day)), body);
    body.addEventListener('click', ev => { if (ev.target.closest('a')) sh.close(); });
  }

  root.Views.map = function (el) {
    const info = App.todayInfo();
    const { p, ctx, day } = info;
    const stack = h('div', { class: 'stack' });
    stack.append(h('div', null, h('h1', { text: '学习地图' }),
      h('p', { class: 'muted', text: '共 ' + p.days + ' 天 · 每 5 天一轮：前 4 天学新课，第 5 天复习通关。点任意一天进入。' })));
    stack.append(h('div', { class: 'row gap small muted' },
      h('span', { class: 'chip static', text: '📘 学习日' }), h('span', { class: 'chip static', text: '🔁 复习日' }), h('span', { class: 'chip static', text: '☕ 自由日' }),
      h('span', { class: 'chip done', text: '✓ 已完成' }), h('span', { class: 'chip static', text: '◎ 今天' })));

    const rounds = Math.ceil(p.days / Plan.ROUND);
    let lastPh = 0;
    for (let r = 0; r < rounds; r++) {
      const es = ctx.list.slice(r * Plan.ROUND, (r + 1) * Plan.ROUND);
      const first = es.map(e => dayLessons(e)[0]).find(Boolean);
      const phs = first ? W.phaseOf(first) : null;
      const hex = phs ? phs.hex : '#999';
      if (phs && phs.id !== lastPh) {
        lastPh = phs.id;
        stack.append(h('div', { class: 'isl-title-row' }, h('span', { class: 'e', 'aria-hidden': 'true', text: phs.emoji }),
          h('div', null, h('h2', { style: { margin: 0 }, text: phs.island + ' · ' + phs.zh }), h('div', { class: 'muted small', text: phs.goal }))));
      }
      const learnIds = [].concat.apply([], es.map(dayLessons));
      const doneN = learnIds.filter(n => Store.lessonDone(n)).length;
      const grid = h('div', { class: 'days' }, es.map(e => {
        const cls = 'day ' + e.type + (dayDone(e) ? ' done' : '') + (e.day === day && info.status !== 'after' ? ' today' : '');
        const ls = dayLessons(e);
        const label = e.type === 'learn' ? '第' + Plan.rangeLabel(ls) + '课' : e.type === 'review' ? '复习' : '自由';
        const kids = [h('b', { text: String(e.day) }), h('span', { text: (dayDone(e) ? '✓ ' : '') + label })];
        const common = { class: cls, 'aria-label': '第 ' + e.day + ' 天 ' + W.TYPE_ZH[e.type] + (ls.length ? ' ' + label : ''), style: { '--c': hex } };
        if (e.type === 'review') return h('a', Object.assign({ href: '#/review/' + e.day }, common), kids);
        if (e.type === 'learn' && ls.length === 1) return h('a', Object.assign({ href: '#/lesson/' + ls[0] }, common), kids);
        return h('button', Object.assign({ type: 'button', onclick: () => sheetForDay(e, ctx, p) }, common), kids);
      }));
      stack.append(h('section', { class: 'island', style: { '--c': hex }, id: 'round' + (r + 1) },
        h('div', { class: 'row between', style: { marginBottom: '10px' } },
          h('b', { text: '第 ' + (r + 1) + ' 轮 · 第 ' + (r * Plan.ROUND + 1) + '–' + Math.min(p.days, (r + 1) * Plan.ROUND) + ' 天' }),
          h('span', { class: 'muted small', text: learnIds.length ? '已学 ' + doneN + '/' + learnIds.length + ' 课' : '' })),
        grid));
    }
    el.append(stack);
    const cur = Math.floor((day - 1) / Plan.ROUND) + 1;
    setTimeout(() => { const t = document.getElementById('round' + cur); if (t && info.status !== 'before' && day > 1) t.scrollIntoView({ block: 'start' }); }, 30);
  };

  // ---------- 全部课程 ----------

  root.Views.lessons = function (el, q) {
    const info = App.todayInfo();
    const phases = Course.meta().phases;
    const focus = App.todayInfo().entry.lessons.find(Boolean) || 1;
    let pid = parseInt(q && q.get('phase'), 10);
    if (!phases.some(x => x.id === pid)) pid = (W.phaseOf(focus) || phases[0]).id;
    const ph = phases.find(x => x.id === pid);
    const stack = h('div', { class: 'stack' });
    stack.append(h('div', null, h('h1', { text: '全部课程' }), h('p', { class: 'muted', text: '90 课按三座大岛排列，随时可以进入任何一课（没有锁）。' })));
    stack.append(h('div', { class: 'pill-tabs', role: 'tablist', style: { '--c': ph.hex } }, phases.map(x => {
      const ids = []; for (let n = x.days[0]; n <= x.days[1]; n++) if (Course.has(n)) ids.push(n);
      const d = ids.filter(n => Store.lessonDone(n)).length;
      return h('a', { class: x.id === pid ? 'on' : '', href: '#/lessons?phase=' + x.id, role: 'tab', 'aria-selected': String(x.id === pid), style: { '--c': x.hex } }, x.emoji + ' ' + x.island, h('span', { class: 'ok', text: '  ' + d + '/' + ids.length }));
    })));
    stack.append(h('div', { class: 'card', style: { borderLeft: '6px solid ' + ph.hex } }, h('b', { text: ph.island + ' · ' + ph.zh + '（' + ph.it + '）· ' + ph.level }), h('p', { style: { margin: '4px 0 0' }, text: ph.goal })));
    const todayLessons = info.status === 'running' ? info.entry.lessons : [];
    Course.meta().islands.filter(i => i.days[0] >= ph.days[0] && i.days[1] <= ph.days[1]).forEach(isl => {
      const ids = Course.islandDays(isl.id).filter(n => Course.has(n));
      const d = ids.filter(n => Store.lessonDone(n)).length;
      stack.append(h('div', { class: 'isl-title-row', style: { '--h': isl.hue } },
        h('span', { class: 'e', 'aria-hidden': 'true', text: isl.emoji }),
        h('div', { style: { flex: 1 } }, h('b', { text: isl.zh }), h('span', { class: 'it muted', lang: 'it', text: '  ' + isl.it }), h('div', { class: 'muted small', text: isl.blurb })),
        h('span', { class: 'chip ' + (d === ids.length ? 'done' : ''), text: d + '/' + ids.length })));
      stack.append(h('div', { class: 'grid g3' }, ids.map(n => W.lessonCard(n, todayLessons.indexOf(n) >= 0 ? h('span', { class: 'chip', style: { background: ph.hex, color: '#fff' }, text: '今天' }) : null))));
    });
    el.append(stack);
  };

  // ---------- 更多（手机底栏的"更多"） ----------

  root.Views.more = function (el) {
    const items = App.NAV.filter(n => ['lab', 'me', 'method', 'settings'].indexOf(n.id) >= 0);
    const blurb = { lab: '字母、拼读规则、听辨、重音、绕口令', me: '等级、五项能力雷达、学习热力图、徽章', method: '6 步学习法怎么用、颜色含义、计划规则', settings: '调整学习天数、起始日期、AI 老师、数据导出' };
    el.append(h('div', { class: 'stack' }, h('h1', { text: '更多' }),
      items.map(n => h('a', { class: 'island-card', href: n.hash, style: { '--h': 200 } }, h('b', { text: n.ico + ' ' + n.zh }), h('div', { class: 'muted small', text: blurb[n.id] })))));
  };
})(window);
