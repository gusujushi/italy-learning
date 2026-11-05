'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { loadCourse } = require('./helpers.js');
const Course = loadCourse();
const Grammar = require('../js/grammar.js');

const ABBR = { verb: 'v', nonf: 'n', prep: 'p', conj: 'c', pron: 'r' };
/** 把着色结果写成人能读的形式：词{类别}，v 谓语 / n 非谓语 / p 介词 / c 连接词 / r 代词；* = 本课重点词 */
function fmt(sentence, vocab) {
  return Grammar.colorize(sentence, vocab).map(k => (k.w ? k.t + (k.cls ? '{' + ABBR[k.cls] + '}' : '') + (k.vocab ? '*' : '') : k.t)).join('');
}
const tagIds = (s, lesson) => Grammar.tags(s, lesson || 999).map(g => g.id);

test('分词：省音的撇号并入前一个词', () => {
  const t = s => Grammar.tokenize(s).filter(k => k.w).map(k => k.t);
  assert.deepEqual(t("L'albergo è qui."), ["L'", 'albergo', 'è', 'qui']);
  assert.deepEqual(t("Dov'è la stazione?"), ["Dov'", 'è', 'la', 'stazione']);
  assert.deepEqual(t("C’è un bar."), ['C’', 'è', 'un', 'bar']);
  assert.deepEqual(t('Sono le 9:30, 12,50 euro.'), ['Sono', 'le', 'euro']);
  assert.deepEqual(t("un po' di pane"), ['un', "po'", 'di', 'pane']);
  assert.equal(Grammar.tokenize("Dov'è").map(k => k.t).join(''), "Dov'è", '分词不丢字符');
});

test('着色：基本句型（谓语红、介词蓝、连接词紫、代词橙）', () => {
  const cases = [
    ['Buongiorno! Come sta?', 'Buongiorno! Come{c} sta{v}?'],
    ['Prendo gli spaghetti.', 'Prendo{v} gli spaghetti.'],
    ['Mi alzo alle sette e faccio colazione.', 'Mi{r} alzo{v} alle{p} sette e{c} faccio{v} colazione.'],
    ['Il treno parte alle dieci e arriva a Roma alle dodici.', 'Il treno parte{v} alle{p} dieci e{c} arriva{v} a{p} Roma alle{p} dodici.'],
    ['Se piove, restiamo a casa.', 'Se{c} piove{v}, restiamo{v} a{p} casa.'],
    ["Dov'è la stazione? C'è un bar qui vicino.", "Dov'{c}è{v} la stazione? C'{r}è{v} un bar qui vicino."],
    ['Penso che sia una buona idea.', 'Penso{v} che{c} sia{v} una buona idea.'],
    ['Cosa consiglia?', 'Cosa{c} consiglia{v}?'],
    ['Io invece vado al cinema e cucino per gli amici.', 'Io{r} invece vado{v} al{p} cinema e{c} cucino{v} per{p} gli amici.'],
  ];
  cases.forEach(([s, want]) => assert.equal(fmt(s), want, s));
});

test('着色：复合时态、情态动词、stare + 副动词（谓语链）', () => {
  assert.equal(fmt('Ieri sono andato al cinema e poi sono tornato a casa.'), 'Ieri sono{v} andato{v} al{p} cinema e{c} poi sono{v} tornato{v} a{p} casa.');
  assert.equal(fmt('Non l’ho mai visto.'), 'Non l’{r}ho{v} mai visto{v}.');
  assert.equal(fmt('Il libro che ho letto è interessante.'), 'Il libro che{c} ho{v} letto{v} è{v} interessante.');
  assert.equal(fmt('Voglio mangiare una pizza, ma non posso andare al ristorante.'), 'Voglio{v} mangiare{v} una pizza, ma{c} non posso{v} andare{v} al{p} ristorante.');
  assert.equal(fmt('Sto studiando italiano.'), 'Sto{v} studiando{v} italiano.');
  assert.equal(fmt('Ho già comprato i pomodori.'), 'Ho{v} già comprato{v} i pomodori.');
  assert.equal(fmt('Continua a studiare, a leggere e a parlare ogni giorno.'), 'Continua{v} a{p} studiare{n}, a{p} leggere{n} e a{p} parlare{n} ogni giorno.');
  assert.equal(fmt('Entrando, saluta tutti.'), 'Entrando{n}, saluta{v} tutti.');
});

test('着色：lo / la / li / le / gli / l’ —— 冠词还是代词', () => {
  assert.equal(fmt('Lo porto a casa.'), 'Lo{r} porto{v} a{p} casa.');
  assert.equal(fmt('La chiamo domani.'), 'La{r} chiamo{v} domani.');
  assert.equal(fmt('Gli dico la verità.'), 'Gli{r} dico{v} la verità.');
  assert.equal(fmt('Prendo gli spaghetti.'), 'Prendo{v} gli spaghetti.');
  assert.equal(fmt('Lo prendo e lo mangio.'), 'Lo{r} prendo{v} e{c} lo{r} mangio{v}.');
  assert.equal(fmt("Quanto costa l'affitto al mese?"), "Quanto{c} costa{v} l'affitto al{p} mese?", '前面已经有谓语：l’affitto 是名词短语');
  assert.equal(fmt('Mi aiuta a trovare la taglia giusta?'), 'Mi{r} aiuta{v} a{p} trovare{n} la taglia giusta?');
  assert.equal(fmt('Saranno garantite solo le corse essenziali.'), 'Saranno{v} garantite{v} solo le corse essenziali.');
  assert.equal(fmt('La cena è pronta.'), 'La cena è{v} pronta.', '后面还有谓语：la cena 是名词短语');
  assert.equal(fmt('Me lo dai?'), 'Me{r} lo{r} dai{v}?');
});

test('着色：名词和动词同形的词（lavoro, porta, conto, cena…）看上下文', () => {
  assert.equal(fmt('Cordiali saluti,'), 'Cordiali saluti,', '书信结尾 saluti 是名词，不是动词');
  assert.equal(fmt('Il mio lavoro è bello, ma la porta del mio ufficio è sempre chiusa.'), 'Il mio lavoro è{v} bello, ma{c} la porta del{p} mio ufficio è{v} sempre chiusa{v}.');
  assert.equal(fmt('Vado al lavoro in autobus.'), 'Vado{v} al{p} lavoro in{p} autobus.');
  assert.equal(fmt('Lavoro in banca.'), 'Lavoro{v} in{p} banca.');
  assert.equal(fmt('Dopo cena guardo la TV.'), 'Dopo{p} cena guardo{v} la TV.');
  assert.equal(fmt('Vengono Giulia, Chiara e qualche collega.'), 'Vengono{v} Giulia, Chiara e qualche collega.');
  assert.equal(fmt('Il conto, per favore!'), 'Il conto, per{p} favore!');
  assert.equal(fmt('Che lavoro faticoso!'), 'Che{c} lavoro faticoso!', '感叹句里的名词');
  assert.equal(fmt('Prego, da questa parte.'), 'Prego, da{p} questa parte.', 'prego 是感叹词');
  assert.equal(fmt('Sono stanco: oggi ho lavorato molto.'), 'Sono{v} stanco: oggi ho{v} lavorato{v} molto.', 'è stanco：stanco 是形容词，不是第二个谓语');
});

test('着色：缩合介词、dai、数字 sei、fa', () => {
  assert.equal(fmt('Dai miei amici si mangia bene.'), 'Dai{p} miei amici si{r} mangia{v} bene.');
  assert.equal(fmt('Dai, andiamo!'), 'Dai{v}, andiamo{v}!');
  assert.equal(fmt('Sono sei euro.'), 'Sono{v} sei euro.');
  assert.equal(fmt('Sei italiano?'), 'Sei{v} italiano?');
  assert.equal(fmt('Sono qui da due anni.'), 'Sono{v} qui da{p} due anni.');
  assert.equal(fmt('Secondo me, vivere in città è bello.'), 'Secondo{p} me{r}, vivere{n} in{p} città è{v} bello.');
});

test('着色：连接词 e / o 只在连接两个分句时着色', () => {
  assert.equal(fmt('Pizza o pasta?'), 'Pizza o pasta?');
  assert.equal(fmt('Parlo cinese e inglese e sto studiando italiano.'), 'Parlo{v} cinese e inglese e{c} sto{v} studiando{v} italiano.');
  assert.equal(fmt('Mangio la pizza e bevo una birra.'), 'Mangio{v} la pizza e{c} bevo{v} una birra.');
});

test('着色：本课重点词叠加高亮（阴阳性单复数、动词变位、词组）', () => {
  const V = list => list.map((it, i) => ({ i, it, zh: '' }));
  assert.equal(fmt('Ho due amici italiani.', V(['amico'])), 'Ho{v} due amici* italiani.');
  assert.equal(fmt('La ragazza è simpatica.', V(['simpatico'])), 'La ragazza è{v} simpatica*.');
  assert.equal(fmt('Vorrei prenotare un tavolo, per favore.', V(['per favore', 'prenotare'])), 'Vorrei{v} prenotare{v}* un tavolo, per{p}* favore*.');
  assert.equal(fmt('Mangio la pizza.', V(['mangiare'])), 'Mangio{v}* la pizza.', '不定式词条：任何变位形式都高亮');
  assert.equal(fmt('Come sta?', V(['come sta?'])), 'Come{c}* sta{v}*?');
  assert.ok(Grammar.forms('amico').has('amiche') && Grammar.forms('amico').has('amici') && Grammar.forms('lungo').has('lunghi'));
});

test('动词一览：词形 → 动词、时态、人称；句子里没写主语时给出主语提示', () => {
  const vs = Grammar.verbsOf(Grammar.colorize('Mi alzo alle sette e faccio colazione.'));
  assert.deepEqual(vs.map(v => v.lemma), ['alzare', 'fare']);
  assert.deepEqual(vs.map(v => v.subject), ['io', 'io']);
  assert.match(vs[0].desc, /现在时/);
  const withSubject = Grammar.verbsOf(Grammar.colorize('Io mangio la pizza.'));
  assert.equal(withSubject[0].subject, undefined, '写了 Io，就不再提示主语');
  const compound = Grammar.verbsOf(Grammar.colorize('Ho mangiato la pizza.'));
  assert.deepEqual(compound.map(v => v.lemma), ['avere', 'mangiare']);
});

test('意群切分 / 难度 / 主干', () => {
  assert.deepEqual(Grammar.chunks('Se piove, restiamo a casa.'), ['Se piove,', 'restiamo a casa.']);
  assert.deepEqual(Grammar.chunks('Penso che sia una buona idea.').length, 2);
  const longer = Grammar.chunks('Quando sono arrivato alla stazione, il treno era già partito per Milano.');
  assert.ok(longer.length >= 2 && longer.every(c => c.trim().length));
  assert.equal(Grammar.difficulty('Ciao!').level, 1);
  assert.equal(Grammar.difficulty('Il libro che ho letto è interessante perché racconta una storia vera.').clauses, 2);
  assert.ok(Grammar.difficulty('Quando ho ricevuto l’offerta di lavoro in Italia, sono rimasto senza parole, perché non me l’aspettavo, anche se speravo che qualcuno mi chiamasse.').level >= 2);
  assert.equal(Grammar.trunk('Se piove, restiamo a casa.'), 'restiamo a casa.');
  assert.equal(Grammar.trunk('Ciao!'), '');
});

test('语法点：典型句子能被扫出来', () => {
  const cases = [
    ['Buongiorno! Come sta?', 'q_wh'], ['Ho fame. Hai sete?', 'avere'], ['Non capisco.', 'neg'], ['Parli italiano?', 'q_yn'],
    ['Sono cinese.', 'essere'], ['Vorrei un caffè, per favore.', 'vorrei'], ['Vado al mercato dalla nonna.', 'prep_art'],
    ["C'è un bar qui vicino?", 'c_e'], ['Posso entrare?', 'modal'], ['Mi sveglio alle sette e mi lavo.', 'reflexive'],
    ['Mi piace il caffè.', 'piacere'], ['Lo prendo.', 'clitic_dir'], ['Ti telefono stasera.', 'clitic_ind'], ['Ne voglio tre.', 'ci_ne'],
    ['Ieri ho mangiato la pizza.', 'pp'], ['Maria è arrivata.', 'pp_essere'], ['Domani partirò per Roma.', 'futuro'],
    ['Da piccolo abitavo in campagna.', 'imperfetto'], ['Sto studiando italiano.', 'gerundio'], ['Penso che sia una buona idea.', 'congiuntivo'],
    ['Il libro che ho letto è bello.', 'rel'], ['Se avessi tempo, viaggerei.', 'condizionale'], ['In Italia si mangia molta pasta.', 'si_imp'],
    ['Me lo dai?', 'comb'], ['Roma è più grande di Firenze.', 'compare'], ['Il treno parte alle otto.', 'time_expr'], ['È caro, ma è buono.', 'contr'],
    ['Il biglietto è venduto da un’agenzia.', 'pass'], ['Che bello!', 'exclam'], ['Ecco la chiave!', 'ecco'], ['Vorrei del pane e dell’acqua.', 'part'],
    ['Vada dritto e giri a destra.', 'imper'], ['E Lei? Come sta?', 'lei'], ['Mi chiamo Li Ming.', 'chiamarsi'], ['Sai dov’è la stazione?', 'sap_con'],
  ];
  cases.forEach(([s, id]) => assert.ok(tagIds(s).includes(id), `「${s}」应该扫出 ${id}，实际 ${tagIds(s).join(',')}`));
});

test('语法点：不该出现的误报', () => {
  assert.ok(!tagIds('Si chiama pecorino.').includes('imper'), 'Si chiama… 是陈述句');
  assert.ok(!tagIds('Vada dritto e giri a destra.').includes('congiuntivo'), 'Lei 命令式不是虚拟式');
  assert.ok(!tagIds('Che cosa ti piace dell’Italia?').includes('part'), 'piace dell’Italia：介词，不是部分冠词');
  assert.ok(!tagIds('Ma i prezzi sono più alti che a Roma?').includes('rel'), '比较级里的 che');
  assert.ok(!tagIds('Ho fame.').includes('pp'), 'ho 单独出现不是近过去时');
  assert.ok(!tagIds('Hai il mio libro?').includes('pp'));
});

test('语法点：课程里还没讲到的语法不显示（按课数过滤）', () => {
  assert.ok(!tagIds('Ieri ho mangiato la pizza.', 5).includes('pp'));
  assert.ok(tagIds('Ieri ho mangiato la pizza.', 51).includes('pp'));
  assert.ok(!tagIds('Penso che sia una buona idea.', 30).includes('congiuntivo'));
  assert.ok(tagIds('Penso che sia una buona idea.', 72).includes('congiuntivo'));
  Grammar.POINTS.forEach(g => assert.ok(g.id && g.name && g.desc && g.how && g.ex && g.color && g.from >= 1 && typeof g.test === 'function', g.id));
  assert.equal(new Set(Grammar.POINTS.map(g => g.id)).size, Grammar.POINTS.length, 'id 不重复');
  assert.ok(Grammar.POINTS.length >= 40);
});

test('语法扫描：一课里每个语法点 + 出现的句子', () => {
  const d1 = Course.day(1);
  const early = Grammar.scan(d1.dlg.map(l => l.it), 1);
  assert.ok(early.length >= 1 && early.every(x => x.g.from <= 1 && x.hits.length));
  const d52 = Course.day(52);
  const sc = Grammar.scan(d52.dlg.map(l => l.it), 52);
  assert.ok(sc.some(x => x.g.id === 'pp'), '第 52 课应扫出近过去时');
});

test('全部课文：分析不抛异常、速度够快、着色比例合理', () => {
  const t0 = Date.now();
  let sents = 0, withVerb = 0, tokens = 0, colored = 0;
  for (let n = 1; n <= Course.total(); n++) {
    const d = Course.day(n);
    const all = d.dlg.map(l => l.it);
    if (d.text) d.text.paras.forEach(p => p.forEach(l => all.push(l.it)));
    all.forEach(s => {
      const toks = Grammar.colorize(s, d.vocab);
      Grammar.chunks(s); Grammar.difficulty(s); Grammar.tags(s, n, toks); Grammar.verbsOf(toks);
      sents++;
      const words = toks.filter(k => k.w);
      tokens += words.length; colored += words.filter(k => k.cls).length;
      if (words.some(k => k.cls === 'verb')) withVerb++;
    });
  }
  assert.ok(sents > 800, '句子数 ' + sents);
  assert.ok(Date.now() - t0 < 4000, '分析全部课文用了 ' + (Date.now() - t0) + ' ms');
  assert.ok(withVerb / sents > 0.7, '至少 70% 的句子能找到谓语，实际 ' + Math.round(100 * withVerb / sents) + '%');
  const ratio = colored / tokens;
  assert.ok(ratio > 0.3 && ratio < 0.65, '着色词占比应在 30%–65% 之间，实际 ' + Math.round(100 * ratio) + '%');
});

test('语法点：特殊疑问句 vs 一般疑问句（疑问词不一定在第一个词；省略问句不算一般疑问句）', () => {
  const wh = ['Dove vai?', 'Scusa, che ore sono?', 'A che ora chiude il museo?', 'E dove si mangia meglio?', 'Di dove sei?', 'Con chi parli?', 'Allora, dove andiamo?', "Com'è andato il weekend?"];
  wh.forEach(s => { const t = tagIds(s); assert.ok(t.includes('q_wh') && !t.includes('q_yn'), s + ' → ' + t); });
  const yn = ['Parli italiano?', 'Hai fame?', 'Ha già preso un appuntamento?', 'Hai fame, come me?', 'E tu, sai suonare?'];
  yn.forEach(s => { const t = tagIds(s); assert.ok(t.includes('q_yn') && !t.includes('q_wh'), s + ' → ' + t); });
  ['E tu?', 'E Lei?', 'Per cartoline?'].forEach(s => { const t = tagIds(s); assert.ok(!t.includes('q_yn') && !t.includes('q_wh'), s + ' → ' + t); });
});
