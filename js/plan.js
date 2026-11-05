/* 学习计划引擎（纯函数，UMD，可在 Node 里测试）。
 *
 * 思路来自「新概念英语能力岛」：
 *   - 计划天数可调（默认 90，也可 30 / 60 / 120 / 自定义）；
 *   - 每 5 天为一轮：前 4 天学新课，第 5 天复习通关；
 *   - 按"课的分量"（weight）把课程分配到各个学习日：一课很重就独占一天，几课都很轻就合并成一天；
 *   - 学习日比课多（计划很长）时，多出来的日子变成"自由日"。
 *
 * 和原版不同的两点：
 *   1. 权重在每个阶段内部各自归一化。这样默认的 90 天计划里，前 30 天正好是第 1–30 课，
 *      不会因为某一课内容多而把阶段边界挤歪；
 *   2. 天数不是 5 的倍数时，最后一天固定是总复习，避免最后几课学完没有回顾。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Plan = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const ROUND = 5;            // 每轮天数
  const MIN_DAYS = 5, MAX_DAYS = 365;
  const PRESETS = [
    { days: 30, label: '30 天冲刺', note: '强度很大：每天约 3–4 课' },
    { days: 60, label: '60 天', note: '每天约 1.5–2 课' },
    { days: 90, label: '90 天（推荐）', note: '默认：每天约 1–1.5 课，前 30 天学完发音与生活口语' },
    { days: 120, label: '120 天', note: '每天约 1 课，更从容，留有大量复习日' },
  ];

  const clampDays = d => Math.max(MIN_DAYS, Math.min(MAX_DAYS, Math.round(+d || 90)));

  /** lessons: [{id, w, min, group}]，按学习顺序排列；group 用来给权重分组归一化（比如阶段）。
   *  返回 [{day, type: 'learn'|'review'|'free', lessons: [id…]}] */
  function build(lessons, opts) {
    const days = clampDays(opts && opts.days);
    const plan = [];
    for (let d = 1; d <= days; d++) plan.push({ day: d, type: d % ROUND === 0 ? 'review' : 'learn', lessons: [] });
    // 天数不是 5 的倍数：最后一天固定为总复习
    if (days % ROUND !== 0 && days > ROUND) plan[days - 1].type = 'review';

    const learn = plan.filter(p => p.type === 'learn');
    const units = (lessons || []).slice();
    if (!units.length) { plan.forEach(p => { p.type = 'free'; }); return plan; }

    // 权重：同组内归一化到"每课平均 1"，保证每组占用的学习日与课数成正比
    const groups = new Map();
    units.forEach(u => { const g = u.group == null ? 0 : u.group; if (!groups.has(g)) groups.set(g, []); groups.get(g).push(u); });
    const weight = new Map();
    groups.forEach(list => {
      const sum = list.reduce((s, u) => s + (u.w > 0 ? u.w : 1), 0);
      list.forEach(u => weight.set(u.id, (u.w > 0 ? u.w : 1) * list.length / sum));
    });

    const total = units.reduce((s, u) => s + weight.get(u.id), 0);
    let cum = 0;
    units.forEach(u => {
      const w = weight.get(u.id);
      const k = Math.min(learn.length - 1, Math.floor(((cum + w / 2) / total) * learn.length));
      learn[k].lessons.push(u.id);
      cum += w;
    });

    // 复习日 = 上一个复习日之后学过的全部课；没有课的日子变成自由日
    let since = [];
    plan.forEach(p => {
      if (p.type === 'learn') { since = since.concat(p.lessons); if (!p.lessons.length) p.type = 'free'; }
      else { p.lessons = since; since = []; if (!p.lessons.length) p.type = 'free'; }
    });
    return plan;
  }

  /** 一天预计学多久（分钟）。byId: id → {min}。复习日 45 分钟，自由日 20 分钟 */
  function dayMinutes(p, byId) {
    if (p.type === 'learn') return p.lessons.reduce((s, id) => s + ((byId[id] && byId[id].min) || 45), 0);
    return p.type === 'review' ? 45 : 20;
  }
  function avgMinutes(plan, byId) {
    const ls = plan.filter(p => p.type === 'learn');
    return ls.length ? Math.round(ls.reduce((s, p) => s + dayMinutes(p, byId), 0) / ls.length) : 0;
  }

  const pad = n => (n < 10 ? '0' : '') + n;
  const fmtDate = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  const parseDate = s => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, m - 1, d); };

  /** 按日历算"今天是计划第几天"（1…length） */
  function currentDay(startDate, todayStr, length) {
    const diff = Math.round((parseDate(todayStr) - parseDate(startDate)) / 86400000);
    return Math.max(1, Math.min(length, diff + 1));
  }
  /** 计划第 d 天对应的日期 */
  function dateOfDay(startDate, d) { const x = parseDate(startDate); x.setDate(x.getDate() + d - 1); return fmtDate(x); }

  /** 把课号合并成区间："1–3、5、8–10"。nums 已按升序 */
  function rangeLabel(nums) {
    const out = [];
    let a = null, b = null;
    nums.forEach(n => {
      if (a === null) { a = b = n; return; }
      if (n === b + 1) { b = n; return; }
      out.push(a === b ? '' + a : a + '–' + b); a = b = n;
    });
    if (a !== null) out.push(a === b ? '' + a : a + '–' + b);
    return out.join('、');
  }

  /** 落后多少课：计划里今天之前（不含今天）应该学完、但还没学完的课 */
  function behind(plan, today, isDone) {
    const ids = [];
    plan.forEach(p => { if (p.day < today && p.type === 'learn') p.lessons.forEach(id => { if (!isDone(id)) ids.push(id); }); });
    return ids;
  }

  return { ROUND, PRESETS, clampDays, build, dayMinutes, avgMinutes, currentDay, dateOfDay, rangeLabel, behind, fmtDate, parseDate };
});
