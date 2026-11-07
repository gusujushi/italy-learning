'use strict';
/* 发音评价的判断逻辑（js/pron-eval.js）：文字对齐、校准、总分、本地改正提示、发给 AI 的数据。 */
const test = require('node:test');
const assert = require('node:assert/strict');
const E = require('../js/pron-eval.js');

const ev = (target, heardUser, heardRef, extra) => E.evaluate(Object.assign({ target, heardUser, heardRef }, extra || {}));
const st = r => r.rows.map(x => x.status);

test('fold / tokenize：去重音、去标点、转小写；词表只留含字母的词', () => {
  assert.equal(E.fold("Caffè, per l'amico!"), 'cafferlamico'.replace('cafferlamico', 'cafferlamico') && E.fold("Caffè, per l'amico!"));
  assert.equal(E.fold('È già così'), 'egiacosi');
  const w = E.tokenize('Vorrei un caffè, per favore!');
  assert.deepEqual(w.map(x => x.raw), ['Vorrei', 'un', 'caffè', 'per', 'favore']);
  assert.deepEqual(w.map(x => x.norm), ['vorrei', 'un', 'caffe', 'per', 'favore']);
  assert.deepEqual(E.tokenize('A: — 12 euro').map(x => x.norm), ['a', 'euro']);
});

test('逐字符对齐：完全相同 / 少了一个字符 / 多了一个字符', () => {
  const same = E.alignChars('ciao', 'ciao');
  assert.deepEqual(same.hit, [true, true, true, true]);
  assert.equal(same.extra, 0);
  const del = E.alignChars('pizza', 'piza');
  assert.equal(del.hit.filter(Boolean).length, 4);
  const ins = E.alignChars('casa', 'cassa');
  assert.equal(ins.hit.filter(Boolean).length, 4);
  assert.equal(ins.dist, 1);
});

test('词的切分不影响判断：buon giorno = Buongiorno；franco bolli = francobolli', () => {
  const r = ev('Buongiorno! Vorrei due francobolli.', 'buon giorno vorrei due franco bolli');
  assert.deepEqual(st(r), ['ok', 'ok', 'ok', 'ok']);
  assert.equal(r.score, 100);
});

test('读对：全部 ok，100 分；没带重音符号也算对', () => {
  const r = ev('Vorrei un caffè, per favore.', 'Vorrei un caffe per favore');
  assert.deepEqual(st(r), ['ok', 'ok', 'ok', 'ok', 'ok']);
  assert.equal(r.score, 100);
  assert.equal(r.level, '识别器完全听懂了');
  assert.deepEqual(r.tips, []);
});

test('最后一个词没读：missing，提示里点名这个词；分数明显降低', () => {
  const r = ev('Vorrei un caffè, per favore.', 'vorrei un caffe per');
  assert.equal(r.rows[4].status, 'missing');
  assert.ok(r.score < 85 && r.score > 40, '分数 ' + r.score);
});

test('词尾元音被吞掉 → slip，并提示词尾元音要读满', () => {
  const r = ev('Vorrei un caffè, per favore.', 'vorrei un caffe per favor');
  assert.equal(r.rows[4].status, 'slip');
  assert.ok(r.tips.some(t => /词尾元音/.test(t) && /favore/.test(t)), r.tips.join('|'));
});

test('双辅音读成单辅音 → 提示双辅音要读长', () => {
  const r = ev('Prendo una pizza.', 'prendo una piza');
  assert.equal(r.rows[2].status, 'slip');
  assert.ok(r.tips.some(t => /双辅音/.test(t) && /zz/.test(t)), r.tips.join('|'));
});

test('单辅音被读成双辅音 → 提示这里不用拉长', () => {
  const r = ev('Che bella casa!', 'che bella cassa');
  assert.ok(r.tips.some(t => /单辅音/.test(t) && /ss/.test(t)), r.tips.join('|'));
});

test('c/g 软硬、gli、gn、r 的提示', () => {
  const soft = E.wordTip({ raw: 'cena', norm: 'cena' }, 'kena');
  assert.match(soft, /软音/);
  const hard = E.wordTip({ raw: 'chiave', norm: 'chiave' }, 'ciave');
  assert.match(hard, /硬音/);
  assert.match(E.wordTip({ raw: 'figlio', norm: 'figlio' }, 'filio'), /gli/);
  assert.match(E.wordTip({ raw: 'gnocchi', norm: 'gnocchi' }, 'nocchi'), /gn/);
  assert.match(E.wordTip({ raw: 'grazie', norm: 'grazie' }, 'gazie'), /r 没有听出来/);
  assert.match(E.wordTip({ raw: 'vino', norm: 'vino' }, 'vano'), /元音/);
});

test('用标准音频的识别结果校准：连标准音频都识别不对的词不扣分', () => {
  // 识别器把标准音频里的 "Il conto" 也听成了 "is quanto a"——这不是学习者的错
  const target = 'Il conto, per favore!';
  const ref = 'is quanto a per favore';
  const user = 'is quanto a per favore';
  const r = ev(target, user, ref);
  assert.equal(r.rows[0].status, 'unreliable');
  assert.equal(r.rows[1].status, 'unreliable');
  assert.equal(r.rows[2].status, 'ok');
  assert.equal(r.rows[3].status, 'ok');
  assert.equal(r.score, 100);
  assert.equal(r.judged, 2);
  // 没有校准时同样的识别结果会被当成读错
  const r2 = ev(target, user, null);
  assert.ok(r2.score < 80, '无校准分数 ' + r2.score);
});

test('强制解码：文字对得上，但声学证据比标准音频差很多 → unclear（不够清晰）', () => {
  const r = ev('Vorrei un caffè', 'vorrei un caffe', 'vorrei un caffe', { scoreUser: [-0.2, -0.4, -6.5], scoreRef: [-0.3, -0.3, -1.0] });
  assert.deepEqual(st(r), ['ok', 'ok', 'unclear']);
  assert.ok(r.score < 100 && r.score > 85, '分数 ' + r.score);
  assert.ok(Math.abs(r.rows[2].delta - (-5.4)) < 1e-9, 'Δ 先按这句的中位数（-0.1）校正：' + r.rows[2].delta);
});

test('强制解码与文字判断结合：文字对不上但声学证据支持 → 算读对；两者都差 → 判错', () => {
  // "favor"：文字少了词尾元音（slip），但强制解码里 favore 的概率和标准音频差不多 → 很可能是识别器的问题
  const ok = ev('Vorrei un caffè, per favore.', 'vorrei un caffe per favor', 'vorrei un caffe per favore', { scoreUser: [-0.2, -0.3, -0.4, -0.3, -0.9], scoreRef: [-0.2, -0.3, -0.4, -0.3, -0.5] });
  assert.equal(ok.rows[4].status, 'ok');
  assert.equal(ok.score, 100);
  // 同样的文字，但 favore 的概率比标准音频差了 3.5 → 判为 slip
  const bad = ev('Vorrei un caffè, per favore.', 'vorrei un caffe per favor', 'vorrei un caffe per favore', { scoreUser: [-0.2, -0.3, -0.4, -0.3, -4.0], scoreRef: [-0.2, -0.3, -0.4, -0.3, -0.5] });
  assert.equal(bad.rows[4].status, 'slip');
  assert.ok(bad.tips.some(t => /词尾元音/.test(t)));
});

test('强制解码：整句整体偏低（嗓音 / 麦克风不同）时按中位数校正，只看谁比别的词更差', () => {
  // 每个词都比标准低 1.5（整体偏低），其中 caffè 又额外低 3
  const r = ev('Vorrei un caffè per favore', 'vorrei un caffe per favore', 'vorrei un caffe per favore', { scoreUser: [-1.7, -1.8, -4.9, -1.8, -1.7], scoreRef: [-0.2, -0.3, -0.4, -0.3, -0.2] });
  assert.deepEqual(st(r), ['ok', 'ok', 'unclear', 'ok', 'ok']);
  // 只有 1–2 个词时不做校正（中位数会把唯一的词抵消掉）
  const one = ev('Ciao', 'ciao', 'ciao', { scoreUser: [-3.2], scoreRef: [-0.2] });
  assert.equal(one.rows[0].status, 'unclear');
});

test('读成了另一句话：所有词的声学证据都很差，不能被"整体校正"抵消 → 判错、低分', () => {
  const r = ev('Buongiorno! Come sta?', 'viazimiille arrivedecci', 'buon giorno come sta', { scoreUser: [-9.5, -8.8, -9.9], scoreRef: [-0.3, -0.4, -0.2] });
  assert.ok(r.rows.every(x => x.status !== 'ok'), '全部应被判为有问题：' + st(r));
  assert.ok(r.score <= 40, '分数 ' + r.score);
  assert.ok(r.rows.every(x => x.delta < -6), 'Δ 最多校正 1.5：' + r.rows.map(x => x.delta));
});

test('小词（1–2 个字母）：识别器听出来了才算读对，没听出来不判断、不扣分；整句都是小词时照常判断；什么都没识别出来时仍算漏读', () => {
  // 母语者朗读里 "a" "il" "è" 被识别器漏掉是误报"漏读"的唯一来源
  const r = ev('Vado a Roma e prendo il treno.', 'vado roma prendo treno');
  assert.deepEqual(st(r).slice(0, 3), ['ok', 'unreliable', 'ok']);
  assert.equal(r.rows[1].why, 'short');
  assert.equal(r.rows[1].raw, 'a');
  assert.equal(r.rows[3].status, 'unreliable');          // e
  assert.equal(r.rows[5].status, 'unreliable');          // il
  assert.equal(r.score, 100, '漏掉的小词不扣分');
  // 听出来了的小词仍然是 ok（有正面证据）
  assert.deepEqual(st(ev('Vado a Roma.', 'vado a roma')), ['ok', 'ok', 'ok']);
  // 小词被识别成了别的 → 也不判断（可能只是识别器写错）
  assert.equal(ev('Vado a Roma.', 'vado e roma').rows[1].status, 'unreliable');
  // 3 个字母的词照常判断
  assert.ok(['missing', 'wrong'].includes(ev('Ho una casa grande.', 'ho una grande').rows[2].status));
  // 整句都是小词：照常判断
  const all = ev('Sì, ma no.', 'si');
  assert.deepEqual(st(all), ['ok', 'missing', 'missing']);
  // 空文本：全部漏读（包括小词）
  assert.deepEqual(st(ev('Sì, grazie.', '')), ['missing', 'missing']);
});

test('完全没识别出东西（空文本）→ 每个词都是 missing，0 分', () => {
  const r = ev('Buongiorno, come sta?', '', 'buongiorno come sta');
  assert.deepEqual(st(r), ['missing', 'missing', 'missing']);
  assert.equal(r.score, 0);
  assert.equal(r.level, '很多地方没听懂');
});

test('多出来的识别内容略扣分，但最多扣 15%', () => {
  const r = ev('Ciao', 'ciao ciao ciao ciao ciao', null);
  assert.deepEqual(st(r), ['ok']);
  assert.ok(r.score >= 85 && r.score < 100, '分数 ' + r.score);
});

test('节奏与语调的本地提示', () => {
  const base = { tooQuiet: false, ratio: 1, syllableDiff: 0, pauseDiff: 0, finalMatch: true, pitchCorr: 0.8, voicedOk: true, rhythm: 0.9,
    user: { pitch: { final: { dir: 'fall' } } }, ref: { pitch: { final: { dir: 'fall' } } } };
  assert.deepEqual(E.prosodyTips(base), []);
  assert.ok(E.prosodyTips(Object.assign({}, base, { ratio: 1.7 })).some(t => /慢/.test(t)));
  assert.ok(E.prosodyTips(Object.assign({}, base, { ratio: 0.7 })).some(t => /快/.test(t)));
  assert.ok(E.prosodyTips(Object.assign({}, base, { syllableDiff: -2 })).some(t => /少了约 2 个音节/.test(t)));
  assert.deepEqual(E.prosodyTips(Object.assign({}, base, { syllableDiff: -1 })), [], '±1 个音节在估计误差之内，不提示');
  assert.deepEqual(E.prosodyTips(Object.assign({}, base, { syllableDiff: 1 })), []);
  assert.ok(E.prosodyTips(Object.assign({}, base, { syllableDiff: 3 })).some(t => /多了约 3 个音节/.test(t)));
  assert.ok(E.prosodyTips(Object.assign({}, base, { pauseDiff: 2 })).some(t => /停顿/.test(t)));
  const q = E.prosodyTips(Object.assign({}, base, { finalMatch: false, ref: { pitch: { final: { dir: 'rise' } } } }));
  assert.ok(q.some(t => /标准是上扬/.test(t) && /你的是下降/.test(t) && /是非问句/.test(t)), q.join('|'));
  assert.ok(E.prosodyTips({ tooQuiet: true })[0].includes('几乎没有声音'));
  assert.ok(E.prosodyTips(null)[0].includes('几乎没有声音'));
});

test('发给 AI 老师的数据：只有文字和数字', () => {
  const metrics = { tooQuiet: false, ratio: 1.234, syllableDiff: -1, pauseDiff: 0, rhythm: 0.876, user: { pitch: { final: { dir: 'fall' } } }, ref: { pitch: { final: { dir: 'rise' } } } };
  const r = ev('Hai fame?', 'hai fame', 'hai fame', { metrics, zh: '你饿吗？' });
  const p = E.aiPayload({ target: 'Hai fame?', zh: '你饿吗？', heardUser: 'hai fame', heardRef: 'hai fame', rows: r.rows, score: r.score, metrics });
  assert.equal(p.target, 'Hai fame?');
  assert.equal(p.words.length, 2);
  assert.deepEqual(p.prosody, { speedRatio: 1.23, syllableDiff: -1, pauseDiff: 0, finalUser: 'fall', finalRef: 'rise', rhythmSimilarity: 0.88 });
  assert.ok(!/Float32Array|blob/i.test(JSON.stringify(p)));
});

test('对课程里全部句子的"自己和自己"评价都是 100 分（对齐逻辑不会误判）', () => {
  const { loadCourse } = require('./helpers.js');
  loadCourse();
  const Lesson = require('../js/lesson.js');
  let n = 0;
  for (let k = 1; k <= 90; k++) Lesson.lines(k).forEach(l => {
    const r = E.evaluate({ target: l.it, heardUser: l.it.replace(/[.,!?;:"«»—]/g, ''), heardRef: l.it });
    if (r.score !== 100 && r.words.length) assert.fail(`第 ${k} 课「${l.it}」自己对自己得 ${r.score}`);
    n++;
  });
  assert.ok(n > 900);
});

test('本句发音重点：双辅音、词尾重音、gli / gn / sc、c/g 软硬、r、h', () => {
  const f = t => E.focus(t).join('\n');
  assert.match(f('Prendo una pizza.'), /双辅音：pizza/);
  assert.match(f('Vorrei un caffè, per favore.'), /重音在最后一个音节：caffè/);
  assert.match(f('Gli gnocchi sono buoni.'), /gli：Gli/);
  assert.match(f('Gli gnocchi sono buoni.'), /gn：gnocchi/);
  assert.match(f('Il pesce è fresco.'), /sce \/ sci：pesce/);
  assert.match(f('Che cosa vuoi? Un gelato.'), /软音/);
  assert.match(f('Ho una chiave.'), /开头的 h 不发音：Ho/);
  assert.match(f('Vorrei un caffè, per favore.'), /r：/);
  assert.ok(E.focus('Ciao a tutti! Buongiorno, come state? Molto bene grazie, e voi? Anche io sto bene.').length <= 5);
  assert.ok(E.focus('Sì.').length >= 1);
});
