'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const Morph = require('../js/morph.js');

/** word 是否有一条分析满足 lemma / 时态 / 人称 */
function has(word, lemma, tense, person) {
  return Morph.analyze(word).some(a => a.l === lemma && a.t === tense && (person === undefined || a.p === person));
}
function check(lemma, tense, forms) {
  forms.forEach((f, p) => { if (f) assert.ok(has(f, lemma, tense, p), `${f} 应是 ${lemma} 的 ${tense} 第 ${p} 格`); });
}

test('规则变位：-are（parlare）', () => {
  check('parlare', 'pres', ['parlo', 'parli', 'parla', 'parliamo', 'parlate', 'parlano']);
  check('parlare', 'imperf', ['parlavo', 'parlavi', 'parlava', 'parlavamo', 'parlavate', 'parlavano']);
  check('parlare', 'fut', ['parlerò', 'parlerai', 'parlerà', 'parleremo', 'parlerete', 'parleranno']);
  check('parlare', 'cond', ['parlerei', 'parleresti', 'parlerebbe', 'parleremmo', 'parlereste', 'parlerebbero']);
  check('parlare', 'sub_imperf', ['parlassi', 'parlassi', 'parlasse', 'parlassimo', 'parlaste', 'parlassero']);
  assert.ok(has('parlando', 'parlare', 'ger'));
  ['parlato', 'parlata', 'parlati', 'parlate'].forEach(f => assert.ok(has(f, 'parlare', 'pp'), f));
});

test('规则变位：拼写变化（-care/-gare 加 h；-ciare/-giare 去 i；-iare 保留 i）', () => {
  check('cercare', 'pres', ['cerco', 'cerchi', 'cerca', 'cerchiamo', 'cercate', 'cercano']);
  assert.ok(has('cercherò', 'cercare', 'fut', 0) && has('cercherei', 'cercare', 'cond', 0));
  check('pagare', 'pres', ['pago', 'paghi', 'paga', 'paghiamo', 'pagate', 'pagano']);
  assert.ok(has('pagherò', 'pagare', 'fut', 0));
  check('mangiare', 'pres', ['mangio', 'mangi', 'mangia', 'mangiamo', 'mangiate', 'mangiano']);
  assert.ok(has('mangerò', 'mangiare', 'fut', 0) && has('mangeremo', 'mangiare', 'fut', 3) && has('mangerei', 'mangiare', 'cond', 0));
  check('cominciare', 'pres', ['comincio', 'cominci', 'comincia', 'cominciamo']);
  assert.ok(has('comincerà', 'cominciare', 'fut', 2));
  check('studiare', 'pres', ['studio', 'studi', 'studia', 'studiamo', 'studiate', 'studiano']);
  assert.ok(has('studierò', 'studiare', 'fut', 0) && has('studierei', 'studiare', 'cond', 0));
  check('sbagliare', 'pres', ['sbaglio', 'sbagli', 'sbaglia', 'sbagliamo']);
  assert.ok(has('sbaglierò', 'sbagliare', 'fut', 0));
  assert.ok(has('lasceremo', 'lasciare', 'fut', 3));
  assert.ok(has('mangiando', 'mangiare', 'ger') && has('mangiato', 'mangiare', 'pp'));
});

test('规则变位：-ere / -ire / -isc-', () => {
  check('vedere', 'pres', ['vedo', 'vedi', 'vede', 'vediamo', 'vedete', 'vedono']);
  assert.ok(has('vedrò', 'vedere', 'fut', 0) && has('visto', 'vedere', 'pp') && has('vide', 'vedere', 'pass_rem', 2));
  check('prendere', 'pass_rem', ['presi', 'prendesti', 'prese', 'prendemmo', 'prendeste', 'presero']);
  assert.ok(has('preso', 'prendere', 'pp') && has('prenderò', 'prendere', 'fut', 0));
  assert.ok(has('letto', 'leggere', 'pp') && has('scritto', 'scrivere', 'pp') && has('chiuso', 'chiudere', 'pp') && has('messo', 'mettere', 'pp'));
  check('dormire', 'pres', ['dormo', 'dormi', 'dorme', 'dormiamo', 'dormite', 'dormono']);
  check('capire', 'pres', ['capisco', 'capisci', 'capisce', 'capiamo', 'capite', 'capiscono']);
  assert.ok(has('capisca', 'capire', 'sub_pres', 2) && has('preferiscano', 'preferire', 'sub_pres', 5) && has('capirò', 'capire', 'fut', 0));
  check('conoscere', 'pres', ['conosco', 'conosci', 'conosce', 'conosciamo', 'conoscete', 'conoscono']);
  assert.ok(has('conosciuto', 'conoscere', 'pp'));
  assert.ok(has('aperto', 'aprire', 'pp') && has('offerto', 'offrire', 'pp') && has('offrissero', 'offrire', 'sub_imperf', 5));
  assert.ok(has('partiremo', 'partire', 'fut', 3) && has('partirei', 'partire', 'cond', 0));
});

test('不规则动词：essere / avere / andare / fare / dare / stare / dire', () => {
  check('essere', 'pres', ['sono', 'sei', 'è', 'siamo', 'siete', 'sono']);
  check('essere', 'imperf', ['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano']);
  assert.ok(has('sarò', 'essere', 'fut', 0) && has('sarebbe', 'essere', 'cond', 2) && has('sia', 'essere', 'sub_pres') && has('fossi', 'essere', 'sub_imperf', 0));
  ['stato', 'stata', 'stati', 'state'].forEach(f => assert.ok(has(f, 'essere', 'pp'), f));
  check('avere', 'pres', ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno']);
  assert.ok(has('avevo', 'avere', 'imperf', 0) && has('avrei', 'avere', 'cond', 0) && has('avuto', 'avere', 'pp') && has('avessi', 'avere', 'sub_imperf', 0));
  check('andare', 'pres', ['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno']);
  assert.ok(has('andrò', 'andare', 'fut', 0) && has('andato', 'andare', 'pp') && has('vada', 'andare', 'sub_pres'));
  check('fare', 'pres', ['faccio', 'fai', 'fa', 'facciamo', 'fate', 'fanno']);
  assert.ok(has('farò', 'fare', 'fut', 0) && has('farei', 'fare', 'cond', 0) && has('fatto', 'fare', 'pp') && has('facevo', 'fare', 'imperf', 0));
  check('dare', 'pres', ['do', 'dai', 'dà', 'diamo', 'date', 'danno']);
  assert.ok(has('darò', 'dare', 'fut', 0) && has('dato', 'dare', 'pp'));
  check('stare', 'pres', ['sto', 'stai', 'sta', 'stiamo', 'state', 'stanno']);
  assert.ok(has('starò', 'stare', 'fut', 0));
  check('dire', 'pres', ['dico', 'dici', 'dice', 'diciamo', 'dite', 'dicono']);
  assert.ok(has('diranno', 'dire', 'fut', 5) && has('detto', 'dire', 'pp') && has('dica', 'dire', 'imp', 2) && has('dissi', 'dire', 'pass_rem', 0));
});

test('不规则动词：venire / uscire / potere / volere / dovere / sapere / bere / rimanere / scegliere', () => {
  check('venire', 'pres', ['vengo', 'vieni', 'viene', 'veniamo', 'venite', 'vengono']);
  assert.ok(has('verrò', 'venire', 'fut', 0) && has('venuto', 'venire', 'pp'));
  check('uscire', 'pres', ['esco', 'esci', 'esce', 'usciamo', 'uscite', 'escono']);
  assert.ok(has('uscirò', 'uscire', 'fut', 0) && has('uscito', 'uscire', 'pp'));
  check('potere', 'pres', ['posso', 'puoi', 'può', 'possiamo', 'potete', 'possono']);
  assert.ok(has('potrei', 'potere', 'cond', 0) && has('potrebbe', 'potere', 'cond', 2) && has('potuto', 'potere', 'pp'));
  check('volere', 'pres', ['voglio', 'vuoi', 'vuole', 'vogliamo', 'volete', 'vogliono']);
  assert.ok(has('vorrei', 'volere', 'cond', 0) && has('vuol', 'volere', 'pres', 2) && has('voluto', 'volere', 'pp'));
  check('dovere', 'pres', ['devo', 'devi', 'deve', 'dobbiamo', 'dovete', 'devono']);
  assert.ok(has('dovrei', 'dovere', 'cond', 0) && has('dovresti', 'dovere', 'cond', 1));
  check('sapere', 'pres', ['so', 'sai', 'sa', 'sappiamo', 'sapete', 'sanno']);
  assert.ok(has('saprò', 'sapere', 'fut', 0) && has('saputo', 'sapere', 'pp'));
  check('bere', 'pres', ['bevo', 'bevi', 'beve', 'beviamo', 'bevete', 'bevono']);
  assert.ok(has('berrò', 'bere', 'fut', 0) && has('berrei', 'bere', 'cond', 0) && has('bevuto', 'bere', 'pp'));
  assert.ok(has('rimango', 'rimanere', 'pres', 0) && has('rimasto', 'rimanere', 'pp') && has('rimarrò', 'rimanere', 'fut', 0));
  assert.ok(has('scelgo', 'scegliere', 'pres', 0) && has('scelto', 'scegliere', 'pp') && has('sceglierò', 'scegliere', 'fut', 0));
  assert.ok(has('piace', 'piacere', 'pres', 2) && has('piacciono', 'piacere', 'pres', 5) && has('piaciuta', 'piacere', 'pp') && has('piacerebbe', 'piacere', 'cond', 2));
});

test('派生动词：前缀 + 基础动词', () => {
  assert.ok(has('rifaccio', 'rifare', 'pres', 0) && has('rifatto', 'rifare', 'pp'));
  assert.ok(has('riesco', 'riuscire', 'pres', 0) && has('riuscito', 'riuscire', 'pp'));
  assert.ok(has('compongo', 'comporre', 'pres', 0) && has('composto', 'comporre', 'pp'));
  assert.ok(has('ottengo', 'ottenere', 'pres', 0) && has('ottenne', 'ottenere', 'pass_rem', 2) && has('otterrò', 'ottenere', 'fut', 0));
  assert.ok(has('traduco', 'tradurre', 'pres', 0) && has('tradotto', 'tradurre', 'pp') && has('tradurrò', 'tradurre', 'fut', 0));
  assert.ok(has('produce', 'produrre', 'pres', 2) && has('condotto', 'condurre', 'pp'));
  assert.ok(has('raccolgo', 'raccogliere', 'pres', 0) && has('accolto', 'accogliere', 'pp'));
  assert.ok(has('possiedo', 'possedere', 'pres', 0) && has('dispiace', 'dispiacere', 'pres', 2));
  assert.ok(!Morph.lemmas.has('durre'), 'durre 只是词根，不是真动词');
});

test('动词 + 代词：命令式 / 不定式 / 副动词后接代词', () => {
  const enc = (w, lemma, tense, clitic) => Morph.analyze(w).some(a => a.l === lemma && a.t === tense && a.enc && a.enc[0] === clitic);
  assert.ok(enc('dimmi', 'dire', 'imp', 'mi') && enc('dillo', 'dire', 'imp', 'lo') && enc('dammelo', 'dare', 'imp', 'melo'));
  assert.ok(enc('fammi', 'fare', 'imp', 'mi') && enc('fallo', 'fare', 'imp', 'lo') && enc('dacci', 'dare', 'imp', 'ci') && enc('vattene', 'andare', 'imp', 'tene'));
  assert.ok(enc('mangiarlo', 'mangiare', 'inf', 'lo') && enc('chiamarli', 'chiamare', 'inf', 'li') && enc('vederti', 'vedere', 'inf', 'ti'));
  assert.ok(enc('dirmi', 'dire', 'inf', 'mi') && enc('farlo', 'fare', 'inf', 'lo') && enc('porlo', 'porre', 'inf', 'lo') && enc('alzarsi', 'alzare', 'inf', 'si'));
  assert.ok(enc('confermarmi', 'confermare', 'inf', 'mi') && enc('offrirle', 'offrire', 'inf', 'le') && enc('trasferirmi', 'trasferire', 'inf', 'mi'));
  assert.ok(enc('mandami', 'mandare', 'imp', 'mi') && enc('raccontaci', 'raccontare', 'imp', 'ci') && enc('mettile', 'mettere', 'imp', 'le'));
  assert.ok(enc('leggetelo', 'leggere', 'imp', 'lo'), '应拆成 leggete + lo，而不是 legge + telo');
  assert.ok(enc('ricordati', 'ricordare', 'imp', 'ti') && enc('divertiti', 'divertire', 'imp', 'ti') && enc('accomodati', 'accomodare', 'imp', 'ti'));
  assert.ok(enc('vedendolo', 'vedere', 'ger', 'lo'));
  // 同一个分析不重复
  const a = Morph.analyze('mangiarlo');
  assert.equal(a.length, 1);
});

test('不是动词的词不会被识别（名词、形容词、虚词）', () => {
  ['casa', 'amici', 'sole', 'pesce', 'tavolo', 'bello', 'ragazzi', 'domani', 'molto', 'sempre', 'quando', 'perché', 'dolce', 'lamina'].forEach(w =>
    assert.deepEqual(Morph.analyze(w), [], w));
});

test('名词 / 动词同形的词都能给出动词读法（由着色时结合上下文取舍）', () => {
  ['porta', 'parte', 'cena', 'lavoro', 'studio', 'viaggio', 'conto', 'gioco', 'costa'].forEach(w => assert.ok(Morph.analyze(w).length > 0, w));
});

test('describe：中文说明', () => {
  const a = Morph.analyze('mangio')[0];
  assert.equal(Morph.describe(a), '现在时 · 我 (io)');
  assert.match(Morph.describe(Morph.analyze('mangiato')[0]), /^过去分词（阳单）/);
  assert.match(Morph.describe(Morph.analyze('dimmi')[0]), /命令式 · 你 \(tu\) \+ 代词 mi/);
  assert.match(Morph.describe(Morph.analyze('mangiare')[0]), /^不定式/);
});

test('词库规模', () => {
  assert.ok(Morph.lemmas.size >= 450, '动词数 ' + Morph.lemmas.size);
  assert.ok(Morph.size > 15000, '词形数 ' + Morph.size);
  assert.ok(Morph.isLemma('mangiare') && Morph.isLemma('essere') && !Morph.isLemma('tavolo'));
});
