'use strict';
/* Store（进度存储）：步骤、闯关、复习日、生词本、能力、导出导入、AI 缓存。
 * Store 是浏览器脚本（挂在 window 上，用 localStorage），这里用一个最小的 window / localStorage 假环境加载。 */
const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { loadCourse, ROOT } = require('./helpers.js');

const Course = loadCourse();
global.SRS = require('../js/srs.js');
global.Lesson = require('../js/lesson.js');

function memStorage() {
  const m = new Map();
  return { getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => { m.set(k, String(v)); }, removeItem: k => { m.delete(k); }, clear: () => m.clear(), _m: m };
}

/** 每个测试一个全新的 Store（共用同一份 localStorage 时可以模拟"刷新页面"） */
function fresh(storage) {
  global.window = global;
  global.localStorage = storage || memStorage();
  global.addEventListener = () => {};
  const f = require.resolve(path.join(ROOT, 'js/store.js'));
  delete require.cache[f];
  require(f);
  return global.Store;
}

const doSteps = (Store, n) => Store.STEPS.forEach(s => Store.markStep(n, s));

test('默认值：90 天计划、三座大岛、起始日期是今天', () => {
  const S = fresh();
  assert.equal(S.plan().days, 90);
  assert.deepEqual(S.plan().phases, [1, 2, 3]);
  assert.equal(S.plan().start, SRS.dateStr());
  assert.equal(S.setting('autoCards'), true);
  assert.equal(S.setting('apiKey'), '');
});

test('markStep：第一次完成才算 first；6 步全部完成才算一课完成', () => {
  const S = fresh();
  const r1 = S.markStep(1, 'intro');
  assert.equal(r1.first, true);
  assert.equal(r1.lessonDone, false);
  assert.equal(S.markStep(1, 'intro').first, false);
  assert.equal(S.stepCount(1), 1);
  assert.equal(S.lessonDone(1), false);
  S.STEPS.slice(1, 5).forEach(s => S.markStep(1, s));
  assert.equal(S.lessonDone(1), false, '还差闯关测验');
  const last = S.markStep(1, 'quiz');
  assert.equal(last.lessonDone, true);
  assert.equal(S.lessonDone(1), true);
  assert.equal(S.completedCount(), 1);
  assert.equal(S.markStep(1, 'quiz').lessonDone, false, '重复完成不会再触发"本课完成"');
});

test('学完一课：词汇和关键句自动进入生词本（autoCards 关闭则不进）', () => {
  const S = fresh();
  doSteps(S, 3);
  assert.equal(S.cardCount(), Course.cardsOf(3).length);
  assert.ok(S.cardCount() >= 10);
  const S2 = fresh();
  S2.setting('autoCards', false);
  doSteps(S2, 3);
  assert.equal(S2.cardCount(), 0);
});

test('finishQuiz：≥60 分过关并完成"闯关测验"这一步；成绩取历史最好；星级边界', () => {
  const S = fresh();
  const a = S.finishQuiz(2, 59);
  assert.equal(a.passed, false);
  assert.equal(S.stepDone(2, 'quiz'), false);
  assert.equal(S.bestScore(2), 59);
  const b = S.finishQuiz(2, 60);
  assert.equal(b.passed, true);
  assert.equal(b.first, true);
  assert.equal(S.stepDone(2, 'quiz'), true);
  assert.equal(S.finishQuiz(2, 40).best, 60, '低分不会拉低最好成绩');
  assert.equal(S.lesson(2).attempts, 3);
  assert.deepEqual([0, 59, 60, 79, 80, 94, 95, 100].map(S.starsFor), [0, 0, 1, 1, 2, 2, 3, 3]);
});

test('finishReview：通关才记录，最好成绩只升不降', () => {
  const S = fresh();
  assert.equal(S.reviewDone(5), false);
  assert.equal(S.finishReview(5, 50).passed, false);
  assert.equal(S.reviewDone(5), false);
  const r = S.finishReview(5, 70);
  assert.deepEqual([r.passed, r.first], [true, true]);
  assert.equal(S.reviewInfo(5).best, 70);
  assert.equal(S.finishReview(5, 90).first, false);
  S.finishReview(5, 65);
  assert.equal(S.reviewInfo(5).best, 90);
  assert.equal(S.reviewInfo(6), null);
});

test('生词本：☆ 收藏立刻入库；评分后星标保留；移出；到期与错题', () => {
  const S = fresh();
  const id = Lesson.cardIdOfVocab(1, 0);
  assert.match(id, /^v:1:0$/);
  assert.equal(S.isStar(id), false);
  assert.equal(S.toggleStar(id), true);
  assert.equal(S.cardCount(), 1);
  assert.equal(S.card(id).box, 1);
  assert.equal(S.card(id).due, SRS.addDays(SRS.dateStr(), 1), '新卡明天首次复习');
  assert.equal(S.dueCount(), 0);
  S.gradeCard(id, 0);                       // 不会：回第 1 盒、今天再来、记一次错题
  assert.equal(S.dueCount(), 1);
  assert.equal(S.isStar(id), true, '评分不会丢掉星标');
  assert.deepEqual(S.wrongCardIds(), [id]);
  S.gradeCard(id, 3);                       // 很熟：升两盒
  assert.equal(S.card(id).box, 3);
  assert.equal(S.dueCount(), 0);
  assert.equal(S.toggleStar(id), false);
  assert.equal(S.cardCount(), 1, '取消星标不删除卡片');
  S.removeCard(id);
  assert.equal(S.cardCount(), 0);
});

test('五项能力：样本不足 3 个返回 null；只保留最近 40 个', () => {
  const S = fresh();
  assert.equal(S.skillLevel('listen'), null);
  S.record('listen', true); S.record('listen', false);
  assert.equal(S.skillLevel('listen'), null);
  S.record('listen', true);
  assert.equal(S.skillLevel('listen'), 67);
  for (let i = 0; i < 60; i++) S.record('speak', i >= 30);
  assert.equal(S.skillLevel('speak'), 75, '最近 40 个里 30 个对');
  S.record('nonsense', true);
  assert.equal(S.skillLevel('nonsense'), null);
});

test('连续学习天数与学习日志', () => {
  const S = fresh();
  assert.equal(S.streakNow(), 0);
  S.markStep(1, 'intro');
  assert.equal(S.streakNow(), 1);
  S.tick(90); S.tick(30);
  assert.equal(S.minutesToday(), 2);
  assert.equal(S.logDays(7).length, 7);
  assert.equal(S.logDays(7)[6].sec, 120);
  assert.equal(S.totalMinutes(), 2);
});

test('持久化：写入 localStorage，新实例能读回；导出 / 导入往返', () => {
  const st = memStorage();
  const S = fresh(st);
  S.setPlan({ days: 60, phases: [1, 2] });
  doSteps(S, 1);
  S.finishQuiz(1, 88);
  S.note('d1', '我的笔记');
  S.flush();
  assert.ok(st.getItem('isola.v2'));
  const S2 = fresh(st);
  assert.equal(S2.plan().days, 60);
  assert.deepEqual(S2.plan().phases, [1, 2]);
  assert.equal(S2.lessonDone(1), true);
  assert.equal(S2.bestScore(1), 88);
  assert.equal(S2.note('d1'), '我的笔记');
  const dump = S2.exportJSON();
  const S3 = fresh();
  S3.importJSON(dump);
  assert.equal(S3.lessonDone(1), true);
  assert.equal(S3.plan().days, 60);
  assert.throws(() => S3.importJSON('{"v":1}'), /进度文件/);
  assert.throws(() => S3.importJSON('not json'));
});

test('API Key：导出时去掉，导入时保留本机已有的；AI 缓存单独存放，不进导出文件', () => {
  const st = memStorage();
  const S = fresh(st);
  S.setting('apiKey', 'sk-secret');
  S.aiSet('x:1:0:deepseek-chat', '讲解文本');
  assert.equal(S.aiCount(), 1);
  const dump = S.exportJSON();
  assert.ok(!/sk-secret/.test(dump), '导出文件里不能有密钥');
  assert.ok(!/讲解文本/.test(dump), 'AI 缓存不进导出文件');
  S.importJSON(dump);
  assert.equal(S.setting('apiKey'), 'sk-secret', '导入不会清掉本机的密钥');
  assert.equal(S.aiGet('x:1:0:deepseek-chat'), '讲解文本');
  S.aiClear();
  assert.equal(S.aiCount(), 0);
});

test('reset：清空进度但保留设置', () => {
  const S = fresh();
  S.setting('theme', 'dark');
  doSteps(S, 1);
  S.reset();
  assert.equal(S.completedCount(), 0);
  assert.equal(S.cardCount(), 0);
  assert.equal(S.setting('theme'), 'dark');
});

test('徽章：学完一座岛、连续天数、收藏数', () => {
  const S = fresh();
  const b0 = S.badges();
  assert.ok(b0.length >= 13 && b0.every(b => b.id && b.name && typeof b.got === 'boolean'));
  assert.equal(b0.find(b => b.id === 'island1').got, false);
  for (let n = 1; n <= 10; n++) doSteps(S, n);
  assert.equal(S.badges().find(b => b.id === 'island1').got, true);
  assert.equal(S.badges().find(b => b.id === 'island2').got, false);
});

test('localStorage 不可用（隐私模式）时退化为内存，不抛错', () => {
  global.window = global;
  global.localStorage = { getItem() { throw new Error('denied'); }, setItem() { throw new Error('denied'); }, removeItem() { throw new Error('denied'); } };
  global.addEventListener = () => {};
  const f = require.resolve(path.join(ROOT, 'js/store.js'));
  delete require.cache[f];
  require(f);
  const S = global.Store;
  assert.doesNotThrow(() => { S.markStep(1, 'intro'); S.flush(); });
  assert.equal(S.canPersist(), false);
  assert.equal(S.stepDone(1, 'intro'), true);
});
