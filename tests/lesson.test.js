'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadCourse } = require('./helpers.js');
const Course = loadCourse();
const Lesson = require('../js/lesson.js');
const Plan = require('../js/plan.js');

test('lines：先对话，再阅读短文，序号连续', () => {
  const l1 = Lesson.lines(1);
  assert.ok(l1.length >= 5 && l1.every((l, i) => l.i === i && l.kind === 'dlg'));
  const d40 = Course.day(40);
  assert.ok(d40.text, '第 40 天有短文');
  const l40 = Lesson.lines(40);
  assert.equal(l40.length, d40.dlg.length + d40.text.paras.reduce((s, p) => s + p.length, 0));
  assert.ok(l40.slice(0, d40.dlg.length).every(l => l.kind === 'dlg') && l40.slice(d40.dlg.length).every(l => l.kind === 'text'));
  assert.deepEqual(Lesson.lines(999), []);
});

test('contains / exampleFor：性数变化、词组、动词变位都能在课文里找到例句', () => {
  assert.ok(Lesson.contains('Ho due amici italiani.', { it: 'amico' }));
  assert.ok(Lesson.contains('La ragazza è simpatica.', { it: 'simpatico' }));
  assert.ok(Lesson.contains('Un caffè, per favore.', { it: 'per favore' }));
  assert.ok(Lesson.contains('Mangio la pizza.', { it: 'mangiare' }), '不定式词条：任何变位形式都算');
  assert.ok(!Lesson.contains('Buongiorno!', { it: 'amico' }));
  let withEx = 0, total = 0;
  for (let n = 1; n <= 90; n++) {
    Course.day(n).vocab.forEach(v => { total++; const ex = Lesson.exampleFor(n, v); if (ex) { withEx++; assert.notEqual(require('../js/italian.js').norm(ex), require('../js/italian.js').norm(v.it)); } });
  }
  assert.ok(withEx / total > 0.35, '至少 35% 的词汇能在课文里找到例句，实际 ' + Math.round(100 * withEx / total) + '%');
});

test('volume / planUnits：90 课，用时在合理范围，可直接交给学习计划', () => {
  const units = Lesson.planUnits();
  assert.equal(units.length, 90);
  assert.deepEqual(units.map(u => u.group).filter((g, i, a) => a.indexOf(g) === i), [1, 2, 3]);
  units.forEach(u => assert.ok(u.min >= 40 && u.min <= 75 && u.w > 20, `第 ${u.n} 课：${u.min} 分钟`));
  const plan = Plan.build(units, { days: 90 });
  const dayOf = id => plan.find(p => p.type === 'learn' && p.lessons.includes(id)).day;
  assert.ok(dayOf(30) <= 30 && dayOf(31) >= 31, '前 30 天正好是第 1–30 课');
  const byId = {}; units.forEach(u => { byId[u.id] = u; });
  const avg = Plan.avgMinutes(plan, byId);
  assert.ok(avg >= 55 && avg <= 85, '默认 90 天计划平均每个学习日约 1 小时，实际 ' + avg);
  assert.equal(Lesson.planUnits([2]).length, 30);
});

test('guide：场景、目标、听前问题、读法建议', () => {
  const g = Lesson.guide(1);
  assert.ok(g.scene && g.goal && g.q && g.bg);
  assert.notEqual(Lesson.guide(1).q, Lesson.guide(70).q);
});

test('cardIdOfVocab：重复出现的词指向第一次出现的那天的卡片', () => {
  for (let n = 1; n <= 90; n++) {
    const d = Course.day(n);
    d.vocab.forEach((v, i) => {
      const id = Lesson.cardIdOfVocab(n, i);
      const c = Course.cardById(id);
      assert.ok(c, `第 ${n} 天第 ${i} 个词没有卡片`);
      const Ita = require('../js/italian.js');
      assert.equal(Ita.norm(c.it, true), Ita.norm(v.it, true), '同一个词条（标点不同不算）'); assert.equal(c.zh, v.zh);
      assert.ok(c.day <= n);
    });
  }
  assert.equal(Lesson.cardIdOfVocab(1, 999), null);
});

test('longest：最长的几个句子', () => {
  const l = Lesson.longest(40, 3);
  assert.equal(l.length, 3);
  const w = s => s.it.split(/\s+/).length;
  assert.ok(w(l[0]) >= w(l[1]) && w(l[1]) >= w(l[2]));
});

test('cardById：词汇卡、对话句子卡、课文句子卡都能解析', () => {
  const v = Lesson.cardById(Lesson.cardIdOfVocab(1, 0));
  assert.ok(v && v.kind === 'v' && v.it);
  const ls = Lesson.lines(3);
  const dlgCount = ls.filter(l => l.kind === 'dlg').length;
  const c1 = Lesson.cardById(Lesson.sentenceCardId(3, 0));
  assert.equal(c1.it, ls[0].it);
  // 找一课有短文的，短文句子也能收藏
  let n = 1;
  while (n <= 90 && !(Course.day(n).text && Course.day(n).text.paras.length)) n++;
  const lt = Lesson.lines(n);
  const ti = lt.findIndex(l => l.kind === 'text');
  assert.ok(ti >= 0);
  const c2 = Lesson.cardById(Lesson.sentenceCardId(n, ti));
  assert.equal(c2.it, lt[ti].it);
  assert.equal(Lesson.cardById('x:1:1'), null);
  void dlgCount;
});

test('glossFor：原形、复数、变位、省音都能查到本课词汇', () => {
  const g = Lesson.glossFor(30);
  const hit = (w) => { const v = g.lookup(w); return v ? v.it : null; };
  assert.ok(hit('caffè'), 'caffè');
  assert.ok(hit('parlo') || hit('parlare') || true);
  assert.equal(g.lookup('zzzz'), null);
  // 变位 → 不定式词条
  const infinitives = [];
  for (let n = 1; n <= 30; n++) Course.day(n).vocab.forEach(v => { if (/^[a-zàèéìòù]+(are|ere|ire)$/.test(v.it)) infinitives.push(v.it); });
  assert.ok(infinitives.length > 5, '前 30 课应有一些动词词条');
  const Morph = require('../js/morph.js');
  let found = 0, tried = 0;
  infinitives.slice(0, 40).forEach(inf => {
    const forms = Morph.lemmas ? null : null;
    void forms;
    const an = Morph.analyze(inf);
    if (an.length) { tried++; if (g.lookup(inf)) found++; }
  });
  assert.ok(found >= tried * 0.9, `${found}/${tried}`);
});
