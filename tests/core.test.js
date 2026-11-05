'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadCourse } = require('./helpers.js');
const Course = loadCourse();
const Ita = global.Ita;
const SRS = require('../js/srs.js');
const ExGen = require('../js/exgen.js');

// ---------- Ita ----------
test('norm：忽略大小写、标点、重音、撇号类型', () => {
  assert.equal(Ita.norm('L’albergo è qui!'), 'l albergo e qui');
  assert.equal(Ita.norm("Dov'è la stazione?"), 'dov e la stazione');
  assert.equal(Ita.norm("Dov'è la stazione?", true), 'dov è la stazione');
  assert.equal(Ita.norm('  Un   po’  '), 'un po');
});

test('check：精确 / 重音提示 / 宽容 / 接近', () => {
  let r = Ita.check('buongiorno come sta', 'Buongiorno! Come sta?');
  assert.ok(r.ok && r.exact);
  r = Ita.check('un caffe per favore', 'Un caffè, per favore.');
  assert.ok(r.ok && r.exact && !r.accentOk, '缺重音：算对，但提示重音');
  r = Ita.check('Un caffè per favore', 'Un caffè, per favore.');
  assert.ok(r.ok && r.accentOk);
  r = Ita.check('Mi chiamo Li Ming', 'Io mi chiamo Li Ming.', { lenient: true });
  assert.ok(r.ok, '翻译题可省略主语代词');
  r = Ita.check('Vorrei un cafe', 'Vorrei un caffè, per favore.', { lenient: true });
  assert.ok(!r.ok);
  r = Ita.check('', 'Ciao');
  assert.ok(!r.ok && !r.close);
  r = Ita.check('Buongiorno, come sra?', 'Buongiorno, come sta?');
  assert.ok(!r.ok && r.close, '差一个字母：接近');
});

test('diffTokens：标出漏写与多写', () => {
  const d = Ita.diffTokens('vorrei caffè per', 'Vorrei un caffè per favore');
  assert.deepEqual(d.map(x => x.s), ['ok', 'miss', 'ok', 'ok', 'miss']);
  const e = Ita.diffTokens('ciao ciao bella', 'ciao bella');
  assert.equal(e.filter(x => x.s === 'extra').length, 1);
  assert.equal(e.filter(x => x.s === 'ok').length, 2);
  assert.equal(e.filter(x => x.s === 'miss').length, 0);
});

test('wordParts / displayTokens', () => {
  assert.deepEqual(Ita.wordParts("dov'è?"), ['', "dov'è", '?']);
  assert.deepEqual(Ita.wordParts('Ciao,'), ['', 'Ciao', ',']);
  assert.deepEqual(Ita.wordParts("po',"), ['', 'po', "',"]);
  assert.deepEqual(Ita.wordParts('«Sì»'), ['«', 'Sì', '»']);
  assert.deepEqual(Ita.displayTokens('  Come   sta? '), ['Come', 'sta?']);
});

test('speakKey 统一撇号与空白', () => {
  assert.equal(Ita.speakKey('Dov’è   la stazione?'), "Dov'è la stazione?");
});

test('mulberry32 可复现', () => {
  const a = Ita.mulberry32(42), b = Ita.mulberry32(42);
  assert.deepEqual([a(), a(), a()], [b(), b(), b()]);
});

// ---------- SRS ----------
test('SRS：日期运算跨月跨年', () => {
  assert.equal(SRS.addDays('2026-01-31', 1), '2026-02-01');
  assert.equal(SRS.addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(SRS.addDays('2026-03-01', -1), '2026-02-28');
  assert.equal(SRS.diffDays('2026-02-27', '2026-03-02'), 3);
});

test('SRS：评分流转', () => {
  const t = '2026-11-04';
  let c = SRS.newCard(t);
  assert.deepEqual([c.box, c.due], [1, '2026-11-05']);
  c = SRS.grade(c, 2, '2026-11-05');
  assert.deepEqual([c.box, c.due], [2, '2026-11-07']);
  c = SRS.grade(c, 3, '2026-11-07'); // 很熟：升两盒
  assert.deepEqual([c.box, c.due], [4, '2026-11-15']);
  c = SRS.grade(c, 1, '2026-11-15'); // 模糊：盒子不变，间隔减半
  assert.deepEqual([c.box, c.due], [4, '2026-11-19']);
  c = SRS.grade(c, 0, '2026-11-19'); // 不会：回盒子 1，今天再来
  assert.deepEqual([c.box, c.due, c.wrong], [1, '2026-11-19', 1]);
  let top = { box: 6, due: t, seen: 0, wrong: 0 };
  assert.equal(SRS.grade(top, 3, t).box, 6, '不超过最高盒');
});

test('SRS：到期列表按到期日、盒子排序', () => {
  const cards = { a: { box: 3, due: '2026-11-03' }, b: { box: 1, due: '2026-11-02' }, c: { box: 2, due: '2026-11-03' }, d: { box: 1, due: '2026-11-09' } };
  assert.deepEqual(SRS.dueList(cards, '2026-11-04'), ['b', 'c', 'a']);
  assert.deepEqual(SRS.dueList(cards, '2026-11-04', 2), ['b', 'c']);
});

// ---------- Course ----------
test('Course：对话行解析', () => {
  const l = Course._parse.parseDlg('Giulia: Buongiorno! | 早上好！\nLi Ming: Ore 10:30, ok? | 十点半，好吗？');
  assert.equal(l.length, 2);
  assert.deepEqual([l[0].who, l[0].it, l[0].zh], ['Giulia', 'Buongiorno!', '早上好！']);
  assert.equal(l[1].who, 'Li Ming');
  assert.equal(l[1].it, 'Ore 10:30, ok?');
});

test('Course：词汇、短文、注释行', () => {
  const v = Course._parse.parseVocab('# 注释\nciao | 你好 | CIAO\n\nsì | 是');
  assert.deepEqual(v.map(x => [x.it, x.zh, x.ph]), [['ciao', '你好', 'CIAO'], ['sì', '是', '']]);
  const t = Course._parse.parseText('Una. | 一。\nDue. | 二。\n\nTre. | 三。');
  assert.equal(t.length, 2);
  assert.equal(t[0].length, 2);
});

test('Course：第 1 天可加载，岛屿与阶段查询正确', () => {
  const d = Course.day(1);
  assert.equal(d.n, 1);
  assert.ok(d.dlg.length >= 6 && d.vocab.length >= 10);
  assert.equal(Course.islandOf(1).id, 1);
  assert.equal(Course.islandOf(10).id, 1);
  assert.equal(Course.islandOf(11).id, 2);
  assert.equal(Course.islandOf(90).id, 9);
  assert.equal(Course.phaseOf(30).id, 1);
  assert.equal(Course.phaseOf(31).id, 2);
  assert.equal(Course.islandDays(3).length, 10);
});

test('Course：复习卡片 id 往返', () => {
  const cards = Course.cardsOf(1);
  assert.ok(cards.length >= 12);
  cards.forEach(c => {
    const back = Course.cardById(c.id);
    assert.equal(back.it, c.it);
    assert.equal(back.zh, c.zh);
  });
  assert.equal(Course.cardById('v:999:0'), null);
});

test('Course：重复词汇只在首次出现的那天生成复习卡', () => {
  const ids = n => Course.cardsOf(n).filter(c => c.kind === 'v').map(c => c.it);
  assert.ok(ids(18).includes('venire'));
  assert.ok(!ids(32).includes('venire'), '第 32 天的 venire 与第 18 天重复，不再生成卡片');
  assert.ok(ids(32).includes('uscire'));
  assert.ok(ids(6).includes('sei') && ids(7).includes('sei'), 'sei（六）与 sei（你是）释义不同，各有一张卡');
});

test('Course：词汇释义索引 & 朗读清单去重', () => {
  const g = Course.gloss(1);
  assert.equal(g.get('grazie').zh, '谢谢');
  assert.equal(g.get('come sta').it, 'come sta?');
  const g7 = Course.gloss(7);
  assert.equal(g7.get('e').zh, '和；那么');
  assert.match(g7.get('è').zh, /是/);
  assert.notEqual(g7.get('e'), g7.get('è'), 'è 与 e 不应撞键');
  const sp = Course.speakables();
  const texts = sp.map(x => x.text);
  assert.equal(new Set(texts).size, texts.length, '无重复');
  assert.ok(texts.includes('Buongiorno!'));
  assert.ok(texts.includes('casa'));
});

// ---------- ExGen ----------
function validate(ex) {
  assert.ok(ex.id && ex.type && ex.skill, 'id/type/skill: ' + JSON.stringify(ex).slice(0, 80));
  if (ex.type === 'mcq' || ex.type === 'cloze') {
    assert.ok(Array.isArray(ex.opts) && ex.opts.length >= 2);
    assert.equal(new Set(ex.opts).size, ex.opts.length, '选项不重复: ' + ex.opts);
    assert.ok(ex.ans >= 0 && ex.ans < ex.opts.length);
  }
  if (ex.type === 'order') {
    assert.deepEqual(ex.tokens.slice().sort(), Ita.displayTokens(ex.target).sort(), '排序题 token 是目标句的排列');
  }
  if (ex.type === 'cloze' || ex.type === 'clozeType') {
    assert.ok(ex.sentence.includes('＿＿＿＿'));
  }
  if (ex.type === 'cloze') assert.ok(ex.sentence.length && ex.opts.includes(ex.why && Ita.wordParts(ex.opts[ex.ans])[1]));
}

test('ExGen：第 1 天各类题生成合法', () => {
  const rnd = Ita.mulberry32(7);
  const t = ExGen.dayTest(1, rnd);
  assert.equal(t.length, 10);
  t.forEach(validate);
  assert.equal(new Set(t.map(x => x.id)).size, t.length, 'id 唯一');
  ExGen.writeSet(1, rnd).forEach(validate);
  ExGen.readSet(1, rnd).forEach(validate);
  ExGen.listenQs(1).forEach(validate);
  ExGen.learnQuiz(1).forEach(validate);
});

test('ExGen：固定种子出题可复现', () => {
  const a = ExGen.dayTest(1, Ita.mulberry32(99)).map(x => x.id);
  const b = ExGen.dayTest(1, Ita.mulberry32(99)).map(x => x.id);
  assert.deepEqual(a, b);
});

test('ExGen：挖空词不是虚词，且是句中的词', () => {
  const toks = Ita.displayTokens('Un caffè, per favore.');
  const i = ExGen._x.blankIndex(toks, () => 0);
  assert.ok(['caffè,', 'favore.'].includes(toks[i]));
  assert.equal(ExGen._x.blankIndex(['Sì,', 'è', 'un', "po'."], () => 0), -1, '全是虚词/短词：不挖空');
});

test('ExGen：rangeTest 题量与去重', () => {
  const t = ExGen.rangeTest(1, 1, Ita.mulberry32(3), 20);
  assert.ok(t.length > 0 && t.length <= 20);
  assert.equal(new Set(t.map(x => x.id)).size, t.length);
});
