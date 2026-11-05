'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const Plan = require('../js/plan.js');

/** 90 节课，分 3 组（阶段）每组 30 节；wFn(n) 给出第 n 课的分量 */
function lessons(wFn) {
  return Array.from({ length: 90 }, (_, i) => ({ id: i + 1, group: Math.floor(i / 30) + 1, w: wFn ? wFn(i + 1) : 1, min: 50 }));
}
const flat = plan => plan.filter(p => p.type === 'learn').flatMap(p => p.lessons);
const dayOf = (plan, id) => plan.find(p => p.type === 'learn' && p.lessons.includes(id)).day;

test('plan：90 天——72 个学习日、18 个复习日，每课恰好出现一次且保持顺序', () => {
  const plan = Plan.build(lessons(), { days: 90 });
  assert.equal(plan.length, 90);
  assert.equal(plan.filter(p => p.type === 'review').length, 18);
  assert.equal(plan.filter(p => p.type === 'learn').length, 72);
  assert.deepEqual(flat(plan), Array.from({ length: 90 }, (_, i) => i + 1));
  plan.forEach(p => { if (p.day % 5 === 0) assert.equal(p.type, 'review'); });
});

test('plan：默认 90 天计划里，前 30 天正好是第 1–30 课（发音 + 生活口语 + 差旅）', () => {
  const plan = Plan.build(lessons(), { days: 90 });
  assert.ok(dayOf(plan, 30) <= 30, '第 30 课应在第 30 天之内');
  assert.ok(dayOf(plan, 31) >= 31, '第 31 课不应挤进前 30 天');
  assert.ok(dayOf(plan, 60) <= 60 && dayOf(plan, 61) >= 61);
});

test('plan：即使各课分量差别很大，阶段边界也不会被挤歪（权重在组内归一化）', () => {
  // 第一阶段的课都很轻、第三阶段的课都很重
  const plan = Plan.build(lessons(n => (n <= 30 ? 0.3 : n <= 60 ? 1 : 3)), { days: 90 });
  assert.ok(dayOf(plan, 30) <= 30 && dayOf(plan, 31) >= 31);
  assert.ok(dayOf(plan, 60) <= 60 && dayOf(plan, 61) >= 61);
});

test('plan：分量大的课独占一天，分量小的课可以合并', () => {
  const ls = Array.from({ length: 12 }, (_, i) => ({ id: i + 1, group: 1, w: i === 5 ? 6 : 1 }));
  const plan = Plan.build(ls, { days: 10 }); // 8 个学习日放 12 课
  const heavy = plan.find(p => p.lessons.includes(6));
  assert.deepEqual(heavy.lessons, [6], '最重的一课单独占一天');
  assert.ok(plan.some(p => p.type === 'learn' && p.lessons.length >= 2), '轻的课会被合并');
});

test('plan：30 天冲刺——所有课都排得下，复习日 = 本轮学过的课', () => {
  const plan = Plan.build(lessons(), { days: 30 });
  assert.deepEqual(flat(plan), Array.from({ length: 90 }, (_, i) => i + 1));
  let since = [];
  plan.forEach(p => {
    if (p.type === 'learn') since = since.concat(p.lessons);
    else { assert.deepEqual(p.lessons, since, '第 ' + p.day + ' 天复习的应是上一个复习日之后学的全部课'); since = []; }
  });
  const avg = 90 / plan.filter(p => p.type === 'learn').length;
  assert.ok(avg > 3 && avg < 4, '冲刺计划平均每个学习日 3–4 课，实际 ' + avg);
});

test('plan：120 天——多出来的日子变成自由日，课仍然各出现一次', () => {
  const plan = Plan.build(lessons(), { days: 120 });
  assert.equal(plan.length, 120);
  assert.deepEqual(flat(plan), Array.from({ length: 90 }, (_, i) => i + 1));
  assert.ok(plan.filter(p => p.type === 'learn').every(p => p.lessons.length <= 1));
  assert.ok(plan.filter(p => p.type === 'free').length > 0, '应有自由日');
});

test('plan：天数不是 5 的倍数时，最后一天固定为总复习', () => {
  const plan = Plan.build(lessons(), { days: 92 });
  const last = plan[91];
  assert.equal(last.type, 'review');
  assert.ok(last.lessons.length > 0, '总复习要包含最后一轮学过的课');
  assert.deepEqual(flat(plan), Array.from({ length: 90 }, (_, i) => i + 1));
});

test('plan：只学部分阶段 / 天数被限制在 5–365', () => {
  const only3 = lessons().filter(l => l.group === 3);
  const plan = Plan.build(only3, { days: 30 });
  assert.deepEqual(flat(plan), only3.map(l => l.id));
  assert.equal(Plan.build(lessons(), { days: 1 }).length, 5);
  assert.equal(Plan.build(lessons(), { days: 9999 }).length, 365);
  assert.equal(Plan.build(lessons(), { days: 'abc' }).length, 90);
  assert.equal(Plan.build([], { days: 10 }).every(p => p.type === 'free'), true);
});

test('plan：用时估算', () => {
  const byId = {}; lessons().forEach(l => { byId[l.id] = l; });
  const p90 = Plan.build(lessons(), { days: 90 }), p30 = Plan.build(lessons(), { days: 30 });
  const a90 = Plan.avgMinutes(p90, byId), a30 = Plan.avgMinutes(p30, byId);
  assert.ok(a90 >= 55 && a90 <= 70, '90 天计划平均每个学习日约 1 小时，实际 ' + a90);
  assert.ok(a30 > 150, '30 天冲刺平均每天超过 2.5 小时，实际 ' + a30);
  assert.equal(Plan.dayMinutes({ type: 'review', lessons: [1] }, byId), 45);
  assert.equal(Plan.dayMinutes({ type: 'free', lessons: [] }, byId), 20);
});

test('plan：按日历换算今天是第几天', () => {
  assert.equal(Plan.currentDay('2026-11-05', '2026-11-05', 90), 1);
  assert.equal(Plan.currentDay('2026-11-05', '2026-11-12', 90), 8);
  assert.equal(Plan.currentDay('2026-11-05', '2026-11-01', 90), 1, '开始日期还没到：第 1 天');
  assert.equal(Plan.currentDay('2026-11-05', '2027-06-01', 90), 90, '超过计划长度：最后一天');
  assert.equal(Plan.currentDay('2026-02-27', '2026-03-02', 90), 4, '跨月');
  assert.equal(Plan.dateOfDay('2026-11-05', 1), '2026-11-05');
  assert.equal(Plan.dateOfDay('2026-11-28', 5), '2026-12-02');
});

test('plan：课号合并成区间；落后的课', () => {
  assert.equal(Plan.rangeLabel([1, 2, 3, 5, 8, 9, 10]), '1–3、5、8–10');
  assert.equal(Plan.rangeLabel([4]), '4');
  assert.equal(Plan.rangeLabel([]), '');
  const plan = Plan.build(lessons(), { days: 90 });
  const done = new Set([1, 2, 3]);
  const behind = Plan.behind(plan, 10, id => done.has(id));
  assert.ok(behind.length > 0 && !behind.includes(1));
  assert.ok(behind.every(id => dayOf(plan, id) < 10));
  assert.deepEqual(Plan.behind(plan, 1, () => false), []);
});
