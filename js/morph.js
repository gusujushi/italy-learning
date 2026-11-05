/* 意大利语动词形态库（纯函数，UMD，可在 Node 里测试）。
 *
 * 作用：给一个词形，查出它是哪个动词的哪个时态、哪个人称——彩色句子分析靠它认出"谓语"。
 *   Morph.analyze('mangio')    → [{l:'mangiare', t:'pres', p:0, m:'ind'}]
 *   Morph.analyze('dimmi')     → [{l:'dire', t:'imp', p:1, m:'imp', enc:['mi']}]       （动词 + 代词）
 *   Morph.analyze('mangiarlo') → [{l:'mangiare', t:'inf', enc:['lo']}]
 *
 * 做法：规则变位（-are / -ere / -ire / -isc-，含 -care/-gare 加 h、-ciare/-giare 去 i 等拼写规则）
 *      + 不规则动词表（含 rifare / comporre / ottenere 这类"前缀 + 基础动词"的派生动词）
 *      → 第一次使用时生成"词形 → 分析"索引。词库覆盖 A1–B1 常用动词；没收录的动词只是少一点着色，不会出错。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Morph = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 人称：0 io，1 tu，2 lui/lei/Lei，3 noi，4 voi，5 loro
  const PERSON_ZH = ['我 (io)', '你 (tu)', '他/她/您 (lui/lei/Lei)', '我们 (noi)', '你们 (voi)', '他们 (loro)'];
  const PERSON_SHORT = ['io', 'tu', 'lui/lei', 'noi', 'voi', 'loro'];
  const TENSE_ZH = {
    pres: '现在时', imperf: '未完成过去时', pass_rem: '远过去时', fut: '将来时', cond: '条件式',
    sub_pres: '虚拟式现在时', sub_imperf: '虚拟式未完成过去时', imp: '命令式',
    inf: '不定式', ger: '副动词（-ando/-endo）', pp: '过去分词',
  };
  const FINITE = new Set(['pres', 'imperf', 'pass_rem', 'fut', 'cond', 'sub_pres', 'sub_imperf', 'imp']);

  // ---------- 规则词尾 ----------
  const ENDINGS = {
    are: {
      pres: ['o', 'i', 'a', 'iamo', 'ate', 'ano'],
      imperf: ['avo', 'avi', 'ava', 'avamo', 'avate', 'avano'],
      pass_rem: ['ai', 'asti', 'ò', 'ammo', 'aste', 'arono'],
      sub_pres: ['i', 'i', 'i', 'iamo', 'iate', 'ino'],
      sub_imperf: ['assi', 'assi', 'asse', 'assimo', 'aste', 'assero'],
      imp: [null, 'a', 'i', 'iamo', 'ate', 'ino'],
      fut: 'er', ger: 'ando', pp: 'ato',
    },
    ere: {
      pres: ['o', 'i', 'e', 'iamo', 'ete', 'ono'],
      imperf: ['evo', 'evi', 'eva', 'evamo', 'evate', 'evano'],
      pass_rem: ['ei', 'esti', 'é', 'emmo', 'este', 'erono'],
      sub_pres: ['a', 'a', 'a', 'iamo', 'iate', 'ano'],
      sub_imperf: ['essi', 'essi', 'esse', 'essimo', 'este', 'essero'],
      imp: [null, 'i', 'a', 'iamo', 'ete', 'ano'],
      fut: 'er', ger: 'endo', pp: 'uto',
    },
    ire: {
      pres: ['o', 'i', 'e', 'iamo', 'ite', 'ono'],
      imperf: ['ivo', 'ivi', 'iva', 'ivamo', 'ivate', 'ivano'],
      pass_rem: ['ii', 'isti', 'ì', 'immo', 'iste', 'irono'],
      sub_pres: ['a', 'a', 'a', 'iamo', 'iate', 'ano'],
      sub_imperf: ['issi', 'issi', 'isse', 'issimo', 'iste', 'issero'],
      imp: [null, 'i', 'a', 'iamo', 'ite', 'ano'],
      fut: 'ir', ger: 'endo', pp: 'ito',
    },
  };
  const ISC = {   // -isc- 动词：只在 io tu lui loro 这几格插入 isc
    pres: ['isco', 'isci', 'isce', 'iamo', 'ite', 'iscono'],
    sub_pres: ['isca', 'isca', 'isca', 'iamo', 'iate', 'iscano'],
    imp: [null, 'isci', 'isca', 'iamo', 'ite', 'iscano'],
  };
  const FUT_END = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
  const COND_END = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];

  /** 词干 + 词尾，处理拼写变化 */
  function join(stem, end, cls) {
    if (!end) return stem;
    if (cls === 'are' && /[cg]$/.test(stem) && /^[ie]/.test(end)) return stem + 'h' + end;         // cerc + i → cerchi
    if (/i$/.test(stem)) {
      if (/^i/.test(end)) return stem.slice(0, -1) + end;                                          // studi + iamo → studiamo
      if (/^e/.test(end) && /(?:[cg]|sc)i$/.test(stem)) return stem.slice(0, -1) + end;            // mangi + erò → mangerò
    }
    return stem + end;
  }

  // ---------- 规则动词词库 ----------
  const W = s => s.split(/\s+/).filter(Boolean);

  const ARE = W(`
    abitare accettare accompagnare accorciare affittare aiutare allenare alzare amare ammirare analizzare annunciare appoggiare arredare arrivare
    ascoltare aspettare assaggiare attraversare aumentare avvisare baciare ballare bastare bisognare bloccare bruciare cambiare camminare cancellare
    cantare caricare cenare cercare chiamare cominciare comprare confermare consigliare contare continuare controllare convalidare copiare costare
    creare cucinare danzare desiderare dimenticare diventare domandare dubitare eliminare entrare esaminare evitare fermare festeggiare firmare
    fotografare frequentare funzionare giocare girare gridare guardare guidare imbarcare immaginare imparare incontrare indicare informare insegnare
    invitare lasciare lavare lavorare mancare mandare mangiare mescolare migliorare mostrare nuotare occupare organizzare ordinare pagare parcheggiare
    parlare passare passeggiare pensare portare pranzare pregare preparare presentare prestare provare raccomandare raccontare regalare respirare
    restare ricordare riposare riparare ripassare riscaldare ritardare rubare salutare salvare sbagliare scaldare scherzare sciare scusare segnalare
    sognare sbarcare spiegare sperare spostare studiare suonare svegliare svuotare tagliare telefonare tentare tirare toccare tornare trasportare
    trovare usare utilizzare viaggiare visitare volare votare abbracciare chiacchierare compilare confrontare donare emozionare esercitare gettare
    incollare lanciare noleggiare nominare notare pettinare pesare pescare posare prenotare protestare registrare rilassare rinnovare ringraziare
    risparmiare rovinare sacrificare scolare semplificare sistemare sorpassare sottolineare sparare stancare stirare tardare timbrare truccare vietare
    accomodare ambientare digitare figurare inviare legare richiamare sembrare significare superare motivare laureare condizionare crepare stressare
    addormentare allacciare allontanare apparecchiare approfittare avvicinare calcolare chiarire? collegare completare comunicare conservare
    consumare contattare cucire? decorare dedicare dichiarare dimostrare disegnare distinguere? durare ereditare esprimere? fumare gonfiare
    ignorare illustrare imitare importare incontrare insistere? interessare inventare lamentare limitare maneggiare mettere? mirare moltiplicare
    notificare offrire? operare ospitare pedalare pensionare picchiare pubblicare qualificare rappresentare reclamare recitare ricaricare
    riportare rispettare ritirare ritrovare salire? scambiare scaricare scattare scivolare scommettere? sequestrare sorridere? spazzare spendere?
    sposare spremere? stabilire? succedere? tamponare terminare tradurre? trasferire? trattare turbare vendicare versare viziare zoppicare
  `).filter(w => !w.endsWith('?'));

  const ERE = W(`
    battere conoscere credere dipendere dividere esistere godere ricevere ripetere temere vendere accendere appendere attendere comprendere
    contendere correre discutere emettere intendere ottenere? pretendere promuovere stendere tendere trascorrere sorprendere riprendere
    apprendere rendere scuotere decidere descrivere difendere leggere mettere muovere nascere perdere piangere prendere promettere rispondere
    ridere scendere spendere stringere succedere vedere vincere vivere correggere proteggere dirigere distinguere spingere uccidere mordere
    aggiungere chiedere chiudere concludere crescere dipingere esprimere nascondere risolvere rompere scrivere cadere offendere
    ammettere concedere iscrivere piovere rileggere rivedere sospendere escludere includere
  `).filter(w => !w.endsWith('?'));

  const IRE = W(`
    aprire avvertire bollire coprire cucire divertire dormire fuggire mentire offrire partire pentire scoprire sentire servire seguire soffrire
    vestire convertire sfuggire investire riaprire
  `);

  const ISC_IRE = W(`
    abolire agire arricchire capire chiarire colpire costruire definire demolire diminuire distribuire finire garantire gestire guarire
    inserire istruire obbedire preferire proibire pulire punire reagire restituire riferire sostituire spedire stabilire suggerire tradire unire
    contribuire attribuire costituire fornire ferire digerire applaudire stupire ubbidire ripulire esibire trasferire
  `);

  // 第二变位里"不规则的过去分词 / 远过去时词根 / 将来时词干"
  //   pp：过去分词；prs：远过去时 io/lui/loro 的词根（presi, prese, presero）；fut：将来时词干（vedrò）
  const V2 = {
    accendere: { pp: 'acceso', prs: 'acces' }, aggiungere: { pp: 'aggiunto', prs: 'aggiuns' }, chiedere: { pp: 'chiesto', prs: 'chies' },
    chiudere: { pp: 'chiuso', prs: 'chius' }, concludere: { pp: 'concluso', prs: 'conclus' }, conoscere: { pp: 'conosciuto', prs: 'conobb' },
    correre: { pp: 'corso', prs: 'cors' }, crescere: { pp: 'cresciuto', prs: 'crebb' }, decidere: { pp: 'deciso', prs: 'decis' },
    descrivere: { pp: 'descritto', prs: 'descriss' }, difendere: { pp: 'difeso', prs: 'difes' }, dipingere: { pp: 'dipinto', prs: 'dipins' },
    discutere: { pp: 'discusso', prs: 'discuss' }, dividere: { pp: 'diviso', prs: 'divis' }, esprimere: { pp: 'espresso', prs: 'espress' },
    leggere: { pp: 'letto', prs: 'less' }, mettere: { pp: 'messo', prs: 'mis' }, muovere: { pp: 'mosso', prs: 'moss' },
    nascere: { pp: 'nato', prs: 'nacqu' }, nascondere: { pp: 'nascosto', prs: 'nascos' }, perdere: { pp: 'perso', prs: 'pers' },
    piangere: { pp: 'pianto', prs: 'pians' }, prendere: { pp: 'preso', prs: 'pres' }, promettere: { pp: 'promesso', prs: 'promis' },
    rispondere: { pp: 'risposto', prs: 'rispos' }, ridere: { pp: 'riso', prs: 'ris' }, rompere: { pp: 'rotto', prs: 'rupp' },
    scendere: { pp: 'sceso', prs: 'scess' }, scrivere: { pp: 'scritto', prs: 'scriss' }, spendere: { pp: 'speso', prs: 'spes' },
    stringere: { pp: 'stretto', prs: 'strins' }, succedere: { pp: 'successo', prs: 'success' }, vedere: { pp: 'visto', prs: 'vid', fut: 'vedr' },
    vincere: { pp: 'vinto', prs: 'vins' }, vivere: { pp: 'vissuto', prs: 'viss', fut: 'vivr' }, correggere: { pp: 'corretto', prs: 'corress' },
    proteggere: { pp: 'protetto', prs: 'protess' }, dirigere: { pp: 'diretto', prs: 'diress' }, distinguere: { pp: 'distinto', prs: 'distins' },
    spingere: { pp: 'spinto', prs: 'spins' }, uccidere: { pp: 'ucciso', prs: 'uccis' }, mordere: { pp: 'morso', prs: 'mors' },
    cadere: { pr: ['caddi', 'cadesti', 'cadde', 'cademmo', 'cadeste', 'caddero'], fut: 'cadr' },
    sorprendere: { pp: 'sorpreso', prs: 'sorpres' }, comprendere: { pp: 'compreso', prs: 'compres' }, apprendere: { pp: 'appreso', prs: 'appres' },
    riprendere: { pp: 'ripreso', prs: 'ripres' }, rendere: { pp: 'reso', prs: 'res' }, intendere: { pp: 'inteso', prs: 'intes' },
    attendere: { pp: 'atteso', prs: 'attes' }, pretendere: { pp: 'preteso', prs: 'pretes' }, stendere: { pp: 'steso', prs: 'stes' },
    tendere: { pp: 'teso', prs: 'tes' }, appendere: { pp: 'appeso', prs: 'appes' }, offendere: { pp: 'offeso', prs: 'offes' },
    emettere: { pp: 'emesso', prs: 'emis' }, trascorrere: { pp: 'trascorso', prs: 'trascors' }, risolvere: { pp: 'risolto', prs: 'risols' },
    scuotere: { pp: 'scosso', prs: 'scoss' }, promuovere: { pp: 'promosso', prs: 'promoss' }, godere: { fut: 'godr' },
    ammettere: { pp: 'ammesso', prs: 'ammis' }, concedere: { pp: 'concesso', prs: 'concess' }, iscrivere: { pp: 'iscritto', prs: 'iscriss' },
    rileggere: { pp: 'riletto', prs: 'riless' }, rivedere: { pp: 'rivisto', prs: 'rivid', fut: 'rivedr' }, sospendere: { pp: 'sospeso', prs: 'sospes' },
    escludere: { pp: 'escluso', prs: 'esclus' }, includere: { pp: 'incluso', prs: 'inclus' }, piovere: { prs: 'piovv' },
  };
  // 第三变位里不规则的过去分词
  const V3_PP = { aprire: 'aperto', coprire: 'coperto', scoprire: 'scoperto', offrire: 'offerto', soffrire: 'sofferto', riaprire: 'riaperto' };

  // ---------- 不规则动词（逐格给出；没写的格按规则变位）----------
  // 数组按 [io, tu, lui, noi, voi, loro]；某一格可以是数组（几种写法）；fut 给词干（sar → sarò / sarei）；imp:false 表示没有命令式
  const IRR = {
    essere: { pres: ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'], imperf: ['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano'],
      pass_rem: ['fui', 'fosti', 'fu', 'fummo', 'foste', 'furono'], fut: 'sar',
      sub_pres: ['sia', 'sia', 'sia', 'siamo', 'siate', 'siano'], sub_imperf: ['fossi', 'fossi', 'fosse', 'fossimo', 'foste', 'fossero'],
      imp: [null, 'sii', 'sia', 'siamo', 'siate', 'siano'], ger: 'essendo', pp: 'stato' },
    avere: { pres: ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'], pass_rem: ['ebbi', 'avesti', 'ebbe', 'avemmo', 'aveste', 'ebbero'],
      fut: 'avr', sub_pres: ['abbia', 'abbia', 'abbia', 'abbiamo', 'abbiate', 'abbiano'],
      imp: [null, 'abbi', 'abbia', 'abbiamo', 'abbiate', 'abbiano'], ger: 'avendo', pp: 'avuto' },
    andare: { pres: ['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno'], fut: 'andr',
      sub_pres: ['vada', 'vada', 'vada', 'andiamo', 'andiate', 'vadano'], imp: [null, ['va', 'vai'], 'vada', 'andiamo', 'andate', 'vadano'] },
    fare: { pres: ['faccio', 'fai', 'fa', 'facciamo', 'fate', 'fanno'], imperf: ['facevo', 'facevi', 'faceva', 'facevamo', 'facevate', 'facevano'],
      pass_rem: ['feci', 'facesti', 'fece', 'facemmo', 'faceste', 'fecero'], fut: 'far',
      sub_pres: ['faccia', 'faccia', 'faccia', 'facciamo', 'facciate', 'facciano'], sub_imperf: ['facessi', 'facessi', 'facesse', 'facessimo', 'faceste', 'facessero'],
      imp: [null, ['fa', 'fai'], 'faccia', 'facciamo', 'fate', 'facciano'], ger: 'facendo', pp: 'fatto' },
    dare: { pres: ['do', 'dai', 'dà', 'diamo', 'date', 'danno'], pass_rem: ['diedi', 'desti', 'diede', 'demmo', 'deste', 'diedero'],
      fut: 'dar', sub_pres: ['dia', 'dia', 'dia', 'diamo', 'diate', 'diano'], sub_imperf: ['dessi', 'dessi', 'desse', 'dessimo', 'deste', 'dessero'],
      imp: [null, ['da', 'dai'], 'dia', 'diamo', 'date', 'diano'] },
    stare: { pres: ['sto', 'stai', 'sta', 'stiamo', 'state', 'stanno'], pass_rem: ['stetti', 'stesti', 'stette', 'stemmo', 'steste', 'stettero'],
      fut: 'star', sub_pres: ['stia', 'stia', 'stia', 'stiamo', 'stiate', 'stiano'], sub_imperf: ['stessi', 'stessi', 'stesse', 'stessimo', 'steste', 'stessero'],
      imp: [null, ['sta', 'stai'], 'stia', 'stiamo', 'state', 'stiano'] },
    dire: { pres: ['dico', 'dici', 'dice', 'diciamo', 'dite', 'dicono'], imperf: ['dicevo', 'dicevi', 'diceva', 'dicevamo', 'dicevate', 'dicevano'],
      pass_rem: ['dissi', 'dicesti', 'disse', 'dicemmo', 'diceste', 'dissero'], fut: 'dir',
      sub_pres: ['dica', 'dica', 'dica', 'diciamo', 'diciate', 'dicano'], sub_imperf: ['dicessi', 'dicessi', 'dicesse', 'dicessimo', 'diceste', 'dicessero'],
      imp: [null, 'di', 'dica', 'diciamo', 'dite', 'dicano'], ger: 'dicendo', pp: 'detto' },
    venire: { pres: ['vengo', 'vieni', 'viene', 'veniamo', 'venite', 'vengono'], pass_rem: ['venni', 'venisti', 'venne', 'venimmo', 'veniste', 'vennero'],
      fut: 'verr', sub_pres: ['venga', 'venga', 'venga', 'veniamo', 'veniate', 'vengano'],
      imp: [null, 'vieni', 'venga', 'veniamo', 'venite', 'vengano'], ger: 'venendo', pp: 'venuto' },
    uscire: { pres: ['esco', 'esci', 'esce', 'usciamo', 'uscite', 'escono'], sub_pres: ['esca', 'esca', 'esca', 'usciamo', 'usciate', 'escano'],
      imp: [null, 'esci', 'esca', 'usciamo', 'uscite', 'escano'] },
    potere: { pres: ['posso', 'puoi', 'può', 'possiamo', 'potete', 'possono'], pass_rem: ['potei', 'potesti', 'poté', 'potemmo', 'poteste', 'poterono'],
      fut: 'potr', sub_pres: ['possa', 'possa', 'possa', 'possiamo', 'possiate', 'possano'], imp: false },
    volere: { pres: ['voglio', 'vuoi', ['vuole', 'vuol'], 'vogliamo', 'volete', 'vogliono'], pass_rem: ['volli', 'volesti', 'volle', 'volemmo', 'voleste', 'vollero'],
      fut: 'vorr', sub_pres: ['voglia', 'voglia', 'voglia', 'vogliamo', 'vogliate', 'vogliano'], imp: false },
    dovere: { pres: [['devo', 'debbo'], 'devi', 'deve', 'dobbiamo', 'dovete', ['devono', 'debbono']], pass_rem: ['dovei', 'dovesti', 'dové', 'dovemmo', 'doveste', 'doverono'],
      fut: 'dovr', sub_pres: [['debba', 'deva'], ['debba', 'deva'], ['debba', 'deva'], 'dobbiamo', 'dobbiate', ['debbano', 'devano']], imp: false },
    sapere: { pres: ['so', 'sai', 'sa', 'sappiamo', 'sapete', 'sanno'], pass_rem: ['seppi', 'sapesti', 'seppe', 'sapemmo', 'sapeste', 'seppero'],
      fut: 'sapr', sub_pres: ['sappia', 'sappia', 'sappia', 'sappiamo', 'sappiate', 'sappiano'],
      imp: [null, 'sappi', 'sappia', 'sappiamo', 'sappiate', 'sappiano'] },
    bere: { pres: ['bevo', 'bevi', 'beve', 'beviamo', 'bevete', 'bevono'], imperf: ['bevevo', 'bevevi', 'beveva', 'bevevamo', 'bevevate', 'bevevano'],
      pass_rem: ['bevvi', 'bevesti', 'bevve', 'bevemmo', 'beveste', 'bevvero'], fut: 'berr',
      sub_pres: ['beva', 'beva', 'beva', 'beviamo', 'beviate', 'bevano'], sub_imperf: ['bevessi', 'bevessi', 'bevesse', 'bevessimo', 'beveste', 'bevessero'],
      imp: [null, 'bevi', 'beva', 'beviamo', 'bevete', 'bevano'], ger: 'bevendo', pp: 'bevuto' },
    rimanere: { pres: ['rimango', 'rimani', 'rimane', 'rimaniamo', 'rimanete', 'rimangono'], pass_rem: ['rimasi', 'rimanesti', 'rimase', 'rimanemmo', 'rimaneste', 'rimasero'],
      fut: 'rimarr', sub_pres: ['rimanga', 'rimanga', 'rimanga', 'rimaniamo', 'rimaniate', 'rimangano'],
      imp: [null, 'rimani', 'rimanga', 'rimaniamo', 'rimanete', 'rimangano'], pp: 'rimasto' },
    tenere: { pres: ['tengo', 'tieni', 'tiene', 'teniamo', 'tenete', 'tengono'], pass_rem: ['tenni', 'tenesti', 'tenne', 'tenemmo', 'teneste', 'tennero'],
      fut: 'terr', sub_pres: ['tenga', 'tenga', 'tenga', 'teniamo', 'teniate', 'tengano'],
      imp: [null, 'tieni', 'tenga', 'teniamo', 'tenete', 'tengano'] },
    salire: { pres: ['salgo', 'sali', 'sale', 'saliamo', 'salite', 'salgono'], sub_pres: ['salga', 'salga', 'salga', 'saliamo', 'saliate', 'salgano'],
      imp: [null, 'sali', 'salga', 'saliamo', 'salite', 'salgano'] },
    scegliere: { pres: ['scelgo', 'scegli', 'sceglie', 'scegliamo', 'scegliete', 'scelgono'], pass_rem: ['scelsi', 'scegliesti', 'scelse', 'scegliemmo', 'sceglieste', 'scelsero'],
      fut: 'sceglier', sub_pres: ['scelga', 'scelga', 'scelga', 'scegliamo', 'scegliate', 'scelgano'],
      imp: [null, 'scegli', 'scelga', 'scegliamo', 'scegliete', 'scelgano'], pp: 'scelto' },
    togliere: { pres: ['tolgo', 'togli', 'toglie', 'togliamo', 'togliete', 'tolgono'], pass_rem: ['tolsi', 'togliesti', 'tolse', 'togliemmo', 'toglieste', 'tolsero'],
      fut: 'toglier', sub_pres: ['tolga', 'tolga', 'tolga', 'togliamo', 'togliate', 'tolgano'],
      imp: [null, 'togli', 'tolga', 'togliamo', 'togliete', 'tolgano'], pp: 'tolto' },
    cogliere: { pres: ['colgo', 'cogli', 'coglie', 'cogliamo', 'cogliete', 'colgono'], pass_rem: ['colsi', 'cogliesti', 'colse', 'cogliemmo', 'coglieste', 'colsero'],
      fut: 'coglier', sub_pres: ['colga', 'colga', 'colga', 'cogliamo', 'cogliate', 'colgano'],
      imp: [null, 'cogli', 'colga', 'cogliamo', 'cogliete', 'colgano'], pp: 'colto' },
    porre: { pres: ['pongo', 'poni', 'pone', 'poniamo', 'ponete', 'pongono'], imperf: ['ponevo', 'ponevi', 'poneva', 'ponevamo', 'ponevate', 'ponevano'],
      pass_rem: ['posi', 'ponesti', 'pose', 'ponemmo', 'poneste', 'posero'], fut: 'porr',
      sub_pres: ['ponga', 'ponga', 'ponga', 'poniamo', 'poniate', 'pongano'], sub_imperf: ['ponessi', 'ponessi', 'ponesse', 'ponessimo', 'poneste', 'ponessero'],
      imp: [null, 'poni', 'ponga', 'poniamo', 'ponete', 'pongano'], ger: 'ponendo', pp: 'posto' },
    trarre: { pres: ['traggo', 'trai', 'trae', 'traiamo', 'traete', 'traggono'], imperf: ['traevo', 'traevi', 'traeva', 'traevamo', 'traevate', 'traevano'],
      pass_rem: ['trassi', 'traesti', 'trasse', 'traemmo', 'traeste', 'trassero'], fut: 'trarr',
      sub_pres: ['tragga', 'tragga', 'tragga', 'traiamo', 'traiate', 'traggano'], sub_imperf: ['traessi', 'traessi', 'traesse', 'traessimo', 'traeste', 'traessero'],
      imp: [null, 'trai', 'tragga', 'traiamo', 'traete', 'traggano'], ger: 'traendo', pp: 'tratto' },
    durre: { pres: ['duco', 'duci', 'duce', 'duciamo', 'ducete', 'ducono'], imperf: ['ducevo', 'ducevi', 'duceva', 'ducevamo', 'ducevate', 'ducevano'],
      pass_rem: ['dussi', 'ducesti', 'dusse', 'ducemmo', 'duceste', 'dussero'], fut: 'durr',
      sub_pres: ['duca', 'duca', 'duca', 'duciamo', 'duciate', 'ducano'], sub_imperf: ['ducessi', 'ducessi', 'ducesse', 'ducessimo', 'duceste', 'ducessero'],
      imp: [null, 'duci', 'duca', 'duciamo', 'ducete', 'ducano'], ger: 'ducendo', pp: 'dotto' },
    sedere: { pres: ['siedo', 'siedi', 'siede', 'sediamo', 'sedete', 'siedono'], sub_pres: ['sieda', 'sieda', 'sieda', 'sediamo', 'sediate', 'siedano'],
      imp: [null, 'siedi', 'sieda', 'sediamo', 'sedete', 'siedano'] },
    cuocere: { pres: ['cuocio', 'cuoci', 'cuoce', 'cuociamo', 'cuocete', 'cuociono'], pass_rem: ['cossi', 'cuocesti', 'cosse', 'cuocemmo', 'cuoceste', 'cossero'],
      sub_pres: ['cuocia', 'cuocia', 'cuocia', 'cuociamo', 'cuociate', 'cuociano'], imp: [null, 'cuoci', 'cuocia', 'cuociamo', 'cuocete', 'cuociano'], pp: 'cotto' },
    morire: { pres: ['muoio', 'muori', 'muore', 'moriamo', 'morite', 'muoiono'], fut: ['morir', 'morr'],
      sub_pres: ['muoia', 'muoia', 'muoia', 'moriamo', 'moriate', 'muoiano'], imp: [null, 'muori', 'muoia', 'moriamo', 'morite', 'muoiano'], pp: 'morto' },
    valere: { pres: ['valgo', 'vali', 'vale', 'valiamo', 'valete', 'valgono'], pass_rem: ['valsi', 'valesti', 'valse', 'valemmo', 'valeste', 'valsero'],
      fut: 'varr', sub_pres: ['valga', 'valga', 'valga', 'valiamo', 'valiate', 'valgano'], pp: 'valso', imp: false },
    parere: { pres: ['paio', 'pari', 'pare', 'paiamo', 'parete', 'paiono'], pass_rem: ['parvi', 'paresti', 'parve', 'paremmo', 'pareste', 'parvero'],
      fut: 'parr', sub_pres: ['paia', 'paia', 'paia', 'paiamo', 'paiate', 'paiano'], pp: 'parso', imp: false },
    piacere: { pres: ['piaccio', 'piaci', 'piace', 'piacciamo', 'piacete', 'piacciono'], pass_rem: ['piacqui', 'piacesti', 'piacque', 'piacemmo', 'piaceste', 'piacquero'],
      sub_pres: ['piaccia', 'piaccia', 'piaccia', 'piacciamo', 'piacciate', 'piacciano'], imp: [null, 'piaci', 'piaccia', 'piacciamo', 'piacete', 'piacciano'], pp: 'piaciuto' },
    spegnere: { pres: ['spengo', 'spegni', 'spegne', 'spegniamo', 'spegnete', 'spengono'], pass_rem: ['spensi', 'spegnesti', 'spense', 'spegnemmo', 'spegneste', 'spensero'],
      sub_pres: ['spenga', 'spenga', 'spenga', 'spegniamo', 'spegniate', 'spengano'], imp: [null, 'spegni', 'spenga', 'spegniamo', 'spegnete', 'spengano'], pp: 'spento' },
    riempire: { pres: ['riempio', 'riempi', 'riempie', 'riempiamo', 'riempite', 'riempiono'], sub_pres: ['riempia', 'riempia', 'riempia', 'riempiamo', 'riempiate', 'riempiano'],
      imp: [null, 'riempi', 'riempia', 'riempiamo', 'riempite', 'riempiano'], ger: 'riempiendo' },
    apparire: { pres: [['appaio', 'apparisco'], ['appari', 'apparisci'], ['appare', 'apparisce'], 'appariamo', 'apparite', ['appaiono', 'appariscono']], pp: 'apparso', imp: false },
    tacere: { pres: ['taccio', 'taci', 'tace', 'tacciamo', 'tacete', 'tacciono'], pass_rem: ['tacqui', 'tacesti', 'tacque', 'tacemmo', 'taceste', 'tacquero'],
      sub_pres: ['taccia', 'taccia', 'taccia', 'tacciamo', 'tacciate', 'tacciano'], imp: [null, 'taci', 'taccia', 'tacciamo', 'tacete', 'tacciano'], pp: 'taciuto' },
  };

  // 派生动词：前缀 + 基础动词（把基础动词的全部形式加上前缀）
  const DERIVED = {
    dire: ['ridire', 'disdire', 'predire', 'contraddire'], fare: ['rifare', 'disfare', 'soddisfare'],
    porre: ['comporre', 'esporre', 'proporre', 'supporre', 'imporre', 'opporre', 'riporre', 'disporre', 'deporre'],
    tenere: ['mantenere', 'ottenere', 'contenere', 'sostenere', 'trattenere', 'appartenere', 'ritenere', 'intrattenere'],
    venire: ['avvenire', 'convenire', 'divenire', 'intervenire', 'prevenire', 'provenire', 'svenire'],
    uscire: ['riuscire'], salire: ['assalire', 'risalire'], cogliere: ['accogliere', 'raccogliere'],
    trarre: ['attrarre', 'contrarre', 'distrarre', 'estrarre', 'sottrarre'],
    durre: ['condurre', 'produrre', 'tradurre', 'ridurre', 'introdurre', 'dedurre', 'riprodurre', 'sedurre', 'indurre'],
    sedere: ['possedere'], piacere: ['dispiacere', 'compiacere'], rimanere: [], togliere: [], bere: [],
  };

  // ---------- 生成索引 ----------
  const FORMS = new Map();     // 词形 → [分析]
  const LEMMAS = new Set();
  let built = false;

  const arr = v => (Array.isArray(v) ? v : [v]);

  function put(form, an) {
    if (!form) return;
    let list = FORMS.get(form);
    if (!list) FORMS.set(form, list = []);
    if (!list.some(x => x.l === an.l && x.t === an.t && x.p === an.p && x.g === an.g && x.n === an.n)) list.push(an);
  }

  /** 过去分词的性数变化：-o → -a / -i / -e */
  function putPP(lemma, pp) {
    if (!pp) return;
    if (pp.endsWith('o')) {
      const b = pp.slice(0, -1);
      put(pp, { l: lemma, t: 'pp', m: 'part', g: 'm', n: 's' });
      put(b + 'a', { l: lemma, t: 'pp', m: 'part', g: 'f', n: 's' });
      put(b + 'i', { l: lemma, t: 'pp', m: 'part', g: 'm', n: 'p' });
      put(b + 'e', { l: lemma, t: 'pp', m: 'part', g: 'f', n: 'p' });
    } else put(pp, { l: lemma, t: 'pp', m: 'part' });
  }

  const MOOD = { imp: 'imp', sub_pres: 'sub', sub_imperf: 'sub', cond: 'cond' };
  function putTense(lemma, tense, forms) {
    forms.forEach((f, p) => {
      if (f == null) return;
      arr(f).forEach(x => put(x, { l: lemma, t: tense, p, m: MOOD[tense] || 'ind' }));
    });
  }
  function putFut(lemma, stems) {
    arr(stems).forEach(s => {
      putTense(lemma, 'fut', FUT_END.map(e => s + e));
      putTense(lemma, 'cond', COND_END.map(e => s + e));
    });
  }
  function putInf(lemma) {
    LEMMAS.add(lemma);
    put(lemma, { l: lemma, t: 'inf', m: 'inf' });
    put(lemma.slice(0, -1), { l: lemma, t: 'inf', m: 'inf', apoc: true });                  // mangiar（mangiar bene）
    if (/rre$/.test(lemma)) put(lemma.slice(0, -2), { l: lemma, t: 'inf', m: 'inf', apoc: true });   // por（por-lo）
  }

  function addRegular(lemma, opts) {
    opts = opts || {};
    const cls = lemma.slice(-3);
    const E = ENDINGS[cls];
    if (!E) return;
    const stem = lemma.slice(0, -3);
    const f = e => (e ? join(stem, e, cls) : null);
    const spec = opts.spec || {};
    putInf(lemma);
    putTense(lemma, 'pres', (opts.isc ? ISC.pres : E.pres).map(f));
    putTense(lemma, 'imperf', E.imperf.map(f));
    if (spec.pr) putTense(lemma, 'pass_rem', spec.pr);
    else if (spec.prs) putTense(lemma, 'pass_rem', [spec.prs + 'i', f('esti'), spec.prs + 'e', f('emmo'), f('este'), spec.prs + 'ero']);
    else {
      putTense(lemma, 'pass_rem', E.pass_rem.map(f));
      if (cls === 'ere') putTense(lemma, 'pass_rem', [f('etti'), null, f('ette'), null, null, f('ettero')]);
    }
    putFut(lemma, [join(stem, E.fut, cls)].concat(spec.fut ? arr(spec.fut) : []));
    putTense(lemma, 'sub_pres', (opts.isc ? ISC.sub_pres : E.sub_pres).map(f));
    putTense(lemma, 'sub_imperf', E.sub_imperf.map(f));
    putTense(lemma, 'imp', (opts.isc ? ISC.imp : E.imp).map(f));
    put(f(E.ger), { l: lemma, t: 'ger', m: 'ger' });
    putPP(lemma, spec.pp || f(E.pp));
  }

  function addIrregular(base, spec, prefix) {
    prefix = prefix || '';
    const full = prefix + base;
    const P = x => (Array.isArray(x) ? x.map(P) : (x == null ? x : prefix + x));
    putInf(full);
    const regCls = /rre$/.test(full) ? null : full.slice(-3);
    const E = regCls ? ENDINGS[regCls] : null;
    const stem = E ? full.slice(0, -3) : null;
    ['pres', 'imperf', 'pass_rem', 'sub_pres', 'sub_imperf', 'imp'].forEach(t => {
      if (spec[t] === false) return;
      if (spec[t]) putTense(full, t, spec[t].map(P));
      else if (E) putTense(full, t, E[t].map(e => (e ? join(stem, e, regCls) : null)));
    });
    if (spec.fut) putFut(full, arr(spec.fut).map(s => prefix + s));
    else if (E) putFut(full, [join(stem, E.fut, regCls)]);
    const ger = spec.ger ? prefix + spec.ger : (E ? join(stem, E.ger, regCls) : null);
    if (ger) put(ger, { l: full, t: 'ger', m: 'ger' });
    putPP(full, spec.pp ? prefix + spec.pp : (E ? join(stem, E.pp, regCls) : null));
  }

  function build() {
    if (built) return;
    built = true;
    ARE.forEach(l => addRegular(l));
    ERE.forEach(l => addRegular(l, { spec: V2[l] || {} }));
    IRE.forEach(l => addRegular(l, { spec: V3_PP[l] ? { pp: V3_PP[l] } : {} }));
    ISC_IRE.forEach(l => addRegular(l, { isc: true }));
    Object.keys(IRR).forEach(base => {
      if (base !== 'durre') addIrregular(base, IRR[base], '');     // durre 只是 condurre / tradurre / produrre… 共用的词根，不是真动词
      (DERIVED[base] || []).forEach(d => addIrregular(base, IRR[base], d.slice(0, d.length - base.length)));
    });
    // 带撇号的单音节命令式：va' di' da' fa' sta'
    [['va', 'andare'], ['di', 'dire'], ['da', 'dare'], ['fa', 'fare'], ['sta', 'stare']].forEach(([w, l]) => put(w + "'", { l, t: 'imp', p: 1, m: 'imp' }));
    // 命令式单音节形式 di / da / fa / va / sta 已在各自的 imp 里
  }

  // ---------- 动词 + 代词（词尾粘连）----------
  const CLITIC_SUFFIX = ['gliela', 'gliele', 'glieli', 'glielo', 'gliene', 'mela', 'mele', 'meli', 'melo', 'mene', 'tela', 'tele', 'teli', 'telo', 'tene',
    'cela', 'cele', 'celi', 'celo', 'cene', 'vela', 'vele', 'veli', 'velo', 'vene', 'sela', 'sele', 'seli', 'selo', 'sene',
    'mi', 'ti', 'ci', 'vi', 'si', 'lo', 'la', 'li', 'le', 'gli', 'ne'];
  const MONO_IMP = { di: 'dire', da: 'dare', fa: 'fare', va: 'andare', sta: 'stare' };
  const ENCLITIC_IMP_PERSONS = [1, 3, 4];   // tu / noi / voi 的命令式可以后接代词（Lei 的命令式用前置代词：mi dica）

  function stripClitics(word) {
    const found = [];
    const seen = new Set();
    const add = (a, suf) => {
      const key = a.l + '|' + a.t + '|' + a.p + '|' + suf;
      if (seen.has(key)) return;
      seen.add(key);
      found.push({ l: a.l, t: a.t, p: a.p, m: a.m, enc: [suf] });
    };
    for (const suf of CLITIC_SUFFIX) {
      if (word.length <= suf.length + 1 || !word.endsWith(suf)) continue;
      const stem = word.slice(0, -suf.length);
      let hit = false;
      // 单音节命令式 + 代词时辅音双写：dimmi, dammi, fammi, dillo, vattene；以及 dacci, dagli
      if (stem.length >= 2 && stem.slice(-1) === suf[0] && MONO_IMP[stem.slice(0, -1)]) { add({ l: MONO_IMP[stem.slice(0, -1)], t: 'imp', p: 1, m: 'imp' }, suf); hit = true; }
      if (MONO_IMP[stem]) { add({ l: MONO_IMP[stem], t: 'imp', p: 1, m: 'imp' }, suf); hit = true; }
      // 命令式（tu / noi / voi）、副动词：词干本身就是一个词形
      (FORMS.get(stem) || []).forEach(a => {
        if (a.apoc) return;
        if (a.t === 'ger' || (a.t === 'imp' && ENCLITIC_IMP_PERSONS.includes(a.p))) { add(a, suf); hit = true; }
      });
      // 不定式：词尾 -e 脱落后接代词，所以词干以 r 结尾（mangiar + lo；por + re → porlo）
      if (/r$/.test(stem)) {
        [stem + 'e', stem + 're'].forEach(b => (FORMS.get(b) || []).forEach(a => { if (a.t === 'inf' && !a.apoc) { add(a, suf); hit = true; } }));
      }
      if (hit) return found;
    }
    return found;
  }

  /** 词形 → 分析列表（小写，保留重音符号）。不是已收录动词的形式返回 [] */
  function analyze(word) {
    build();
    const w = String(word || '').toLowerCase().replace(/’/g, "'");
    if (!w) return [];
    const hit = FORMS.get(w);
    if (hit && !(w.length > 4 && hit.every(a => a.t === 'pp'))) return hit;
    // 没有直接命中，或只有过去分词（ricordati：命令式 ricorda + ti）：再试"动词 + 代词"
    const enc = w.length > 4 ? stripClitics(w) : [];
    return hit ? hit.concat(enc) : enc;
  }

  /** 是否是已收录动词的不定式 */
  function isLemma(l) { build(); return LEMMAS.has(l); }

  /** 一条分析的中文说明：「现在时 · 我 (io)」 */
  function describe(a) {
    let s = TENSE_ZH[a.t] || a.t;
    if (a.t === 'pp' && a.g) s += '（' + (a.g === 'm' ? '阳' : '阴') + (a.n === 's' ? '单' : '复') + '）';
    if (a.p != null && a.p >= 0 && FINITE.has(a.t)) s += ' · ' + PERSON_ZH[a.p];
    if (a.enc) s += ' + 代词 ' + a.enc.join('+');
    return s;
  }

  return {
    analyze, isLemma, describe, FINITE, TENSE_ZH, PERSON_ZH, PERSON_SHORT,
    get size() { build(); return FORMS.size; },
    get lemmas() { build(); return LEMMAS; },
  };
});
