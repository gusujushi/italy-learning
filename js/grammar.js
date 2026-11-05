/* 意大利语句子分析：彩色着色、意群切分、主干提示、语法点扫描、难度。纯函数，UMD，可在 Node 里测试。
 *
 * 配色（和「新概念英语能力岛」一致，再加一个意大利语特有的"代词"色）：
 *   conj 紫  连接词 / 从句引导词 / 疑问词          verb 红  谓语（含助动词、情态动词、复合时态的过去分词）
 *   nonf 绿波浪  非谓语：不定式、副动词、单独出现的过去分词   prep 蓝  介词（含缩合介词 del / nel / sul…）
 *   pron 青  代词：主语代词、宾语代词、反身代词（io, mi, lo, ci, ne, si…）     vocab 黄底  本课重点词
 * 这是基于规则的"提示"，会有判断不准的地方（尤其是名词和动词同形的词）；拿不准的长难句可以请 AI 老师精讲。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./morph.js'));
  else root.Grammar = factory(root.Morph);
})(typeof self !== 'undefined' ? self : this, function (Morph) {
  'use strict';

  const S = s => new Set(s.split(/\s+/).filter(Boolean));

  // ---------- 词表 ----------
  const ART = S("il lo la l' i gli le un uno una un'");
  const PREP_SIMPLE = S("a ad di da in con su per tra fra senza sopra sotto dentro fuori verso durante contro dietro davanti dopo prima oltre tranne lungo presso entro attraverso mediante nonostante malgrado vicino lontano accanto fino secondo d'");
  // 缩合介词 → 拆解
  const PREP_ART = {
    del: 'di + il', dello: 'di + lo', della: 'di + la', "dell'": "di + l'", dei: 'di + i', degli: 'di + gli', delle: 'di + le',
    al: 'a + il', allo: 'a + lo', alla: 'a + la', "all'": "a + l'", ai: 'a + i', agli: 'a + gli', alle: 'a + le',
    dal: 'da + il', dallo: 'da + lo', dalla: 'da + la', "dall'": "da + l'", dai: 'da + i', dagli: 'da + gli', dalle: 'da + le',
    nel: 'in + il', nello: 'in + lo', nella: 'in + la', "nell'": "in + l'", nei: 'in + i', negli: 'in + gli', nelle: 'in + le',
    sul: 'su + il', sullo: 'su + lo', sulla: 'su + la', "sull'": "su + l'", sui: 'su + i', sugli: 'su + gli', sulle: 'su + le',
    col: 'con + il', coi: 'con + i',
  };
  // 有时是介词、有时是副词：后面跟冠词 / 名词 / 代词时才当介词
  const PREP_OR_ADV = S("dopo prima fuori dentro sopra sotto dietro davanti vicino lontano accanto oltre entro verso secondo fino");
  const STRONG_CONJ = S("che perché siccome poiché benché sebbene affinché purché finché quando mentre se come dove cui quale quali chi quanto quanta quanti quante nonostante dov' com' quant'");
  const ALWAYS_CONJ = S("ma però anzi tuttavia quindi dunque perciò infatti cioè inoltre comunque eppure altrimenti oppure invece allora");
  const LINK_CONJ = S("e ed o");       // 只有连接两个分句时才着色
  const SUBJ_PRON = S("io tu lui lei noi voi loro egli ella esso essa essi esse");
  const CLITIC = S("mi ti ci vi si lo la li le gli ne me te ce ve se glielo gliela glieli gliele gliene m' t' c' v' s' l'");
  const ADV_SKIP = S("non già mai ancora appena sempre più anche solo proprio ormai quasi spesso bene male tutto poi subito ora adesso forse magari davvero molto poco troppo");
  const NOT_VERB = S("prego presto tardi"); // 形式上是动词变位，实际多半是感叹词 / 副词
  // 限定词：后面跟的几乎一定是名词（il lavoro, qualche collega）
  const DET = S(`il lo la l' i gli le un uno una un' mio mia miei mie tuo tua tuoi tue suo sua suoi sue nostro nostra nostri nostre vostro vostra vostri vostre
    questo questa questi queste quello quella quelli quelle quel quei quegli ogni qualche alcuni alcune molto molta poco poca tanto tanta troppo troppa
    altro altra altri altre stesso stessa nessun nessuna ciascun ciascuna certo certa`);
  // 放在名词前面的形容词：只有"前面还有限定词"（un buon lavoro）或它在句首（Buon viaggio!）时，才让后面的词变成名词
  const ADJ_PRE = S("bel bella bello buon buona buono grande nuovo nuova nuovi nuove piccolo piccola vecchio vecchia ottimo ottima prossimo prossima ultimo ultima primo prima terzo giusto giusta");
  const NOUNISH_PREV = new Set([...DET, ...ADJ_PRE]);
  // 常见的"名词 / 动词同形词"：lo / la 后面是这些词时，lo / la 一定是冠词
  const NOUN_HOMOGRAPH = S(`cena pranzo conto lavoro porta parte costa visita taglia data gioco viaggio studio ascolto aiuto bisogno affitto cambio regalo invito ritardo
    annuncio carico scarico telefono cammino riposo sbaglio giro volo arrivo nuoto abito ricordo consiglio controllo imbarco saluto rispetto spesa corso posta posto
    uscita andata offerta risposta attesa tratto contratto letto riso verso`);
  const TIME_NOUNS = S("anni mesi giorni settimane ore minuti secondi volte euro persone anno mese giorno settimana ora minuto");
  const CORE = S("essere avere stare andare fare dare dire venire uscire potere volere dovere sapere"); // 这些动词的变位形式几乎不会是名词
  const AUX_LEMMA = S("avere essere");
  const MODAL = S("potere volere dovere sapere solere");
  const REFL = S(`chiamare alzare svegliare lavare vestire divertire sentire sedere addormentare laureare trasferire ricordare fidare riposare rilassare accomodare
    preoccupare innamorare mettere fermare arrabbiare allenare preparare iscrivere sposare incontrare vedere`);
  const NUMBER_WORDS = S("zero uno una due tre quattro cinque sei sette otto nove dieci undici dodici tredici quattordici quindici sedici diciassette diciotto diciannove venti trenta quaranta cinquanta sessanta settanta ottanta novanta cento mille");

  const CLITIC_ZH = {
    mi: '我（宾语 / 反身）', ti: '你（宾语 / 反身）', ci: '我们；那里', vi: '你们；那里', si: '自己；人们（反身 / 非人称）',
    lo: '他 / 它（直接宾语）', la: '她 / 它 / 您（直接宾语）', li: '他们 / 它们（直接宾语）', le: '她们（直接宾语）；对她（间接宾语）', gli: '对他；对他们（间接宾语）',
    ne: '其中的；关于它；由此', me: '我（me lo / me la 里）', te: '你（te lo / te la 里）', ce: '我们 / 那里（ce lo / ce ne 里）',
    glielo: '把它给他 / 她（gli + lo）', gliela: '把它给他 / 她（gli + la）', glieli: '把它们给他 / 她', gliele: '把它们给他 / 她', gliene: '把其中的给他 / 她',
  };
  const SUBJ_ZH = { io: '我', tu: '你', lui: '他', lei: '她（Lei = 您）', noi: '我们', voi: '你们', loro: '他们', egli: '他', ella: '她', esso: '它', essa: '它', essi: '它们', esse: '它们' };

  // ---------- 分词 ----------
  const L = "A-Za-zÀ-ÖØ-öø-ÿ";
  const TOKEN_RE = new RegExp(`[${L}]+['’]|[${L}]+(?:-[${L}]+)*|\\d[\\d.,:]*|\\s+|[^\\s${L}\\d]`, 'g');
  const isWordTok = t => new RegExp(`^[${L}]`).test(t);
  const norm = t => t.toLowerCase().replace(/’/g, "'");
  // un po'：撇号表示省略，不是元音省略
  const WORD_APOS = S("po'");

  function tokenize(sentence) {
    const parts = String(sentence).match(TOKEN_RE) || [];
    const toks = [];
    parts.forEach(p => {
      if (p === "'" || p === '’') { if (toks.length) toks[toks.length - 1].t += p; return; }
      toks.push({ t: p, w: isWordTok(p) ? norm(p) : null, cls: '' });
    });
    // "po'" 这类：撇号已经在上一步并入；"e'" 不处理
    toks.forEach(k => { if (k.w && WORD_APOS.has(k.w)) k.w = k.w; });
    return toks;
  }

  const PUNCT_BREAK = /[,;:.!?—–()«»“”"]/;
  // 同一小句里的上一个 / 下一个词（遇到标点就停）
  function prevWordIdx(toks, i) {
    for (let j = i - 1; j >= 0; j--) { if (toks[j].w) return j; if (PUNCT_BREAK.test(toks[j].t)) return -1; }
    return -1;
  }
  function nextWordIdx(toks, i) {
    for (let j = i + 1; j < toks.length; j++) { if (toks[j].w) return j; if (PUNCT_BREAK.test(toks[j].t)) return -1; }
    return -1;
  }

  const hasFinite = an => an.some(a => Morph.FINITE.has(a.t));
  const lemmaOf = an => (an[0] ? an[0].l : '');

  /** 给一句话里每个词打上类别 */
  function colorize(sentence, vocab) {
    const toks = tokenize(sentence);
    const n = toks.length;
    toks.forEach(k => { if (k.w) k.an = Morph.analyze(k.w); });
    const word = i => (i >= 0 && toks[i] ? toks[i].w || '' : '');
    const set = (i, cls, tip) => { toks[i].cls = cls; toks[i].tip = tip; };
    const finiteIdx = new Set();        // 已判定为谓语的词的位置
    const isBoundary = j => (toks[j].w === null ? PUNCT_BREAK.test(toks[j].t) : (STRONG_CONJ.has(toks[j].w) || LINK_CONJ.has(toks[j].w) || ALWAYS_CONJ.has(toks[j].w)));
    const rawFinite = j => toks[j].w && !NOT_VERB.has(toks[j].w) && (toks[j].an || []).some(a => Morph.FINITE.has(a.t));
    // 只有"现在时 / 命令式 / 虚拟式现在时"这类容易和名词同形的形式，才可能因为前面有冠词而变成名词（qualche collega）；
    // abitavo、parlerò、vorrei 这类形式不可能是名词
    const nounHomograph = an => an.some(a => a.t === 'pres' || a.t === 'imp' || a.t === 'sub_pres' || a.t === 'pp');
    /** 位置 p 的词是不是"后面接名词"的词（限定词 / 前面还有限定词的形容词 / 介词） */
    const nounishPrev = (p, w) => {
      if (p < 0) return false;
      const pw = word(p);
      if (DET.has(pw)) {
        // lo / la / li / le / gli / l' 既可能是冠词也可能是代词：看它在这里到底是哪一个
        if (['lo', 'la', 'li', 'le', 'gli', "l'"].includes(pw)) return aoc(p) === 'article';
        return true;
      }
      if (ADJ_PRE.has(pw)) { const pp = prevWordIdx(toks, p); return pp < 0 || DET.has(word(pp)); }
      return toks[p].cls === 'prep';
    };
    const finiteCand = j => rawFinite(j) &&
      !(nounishPrev(prevWordIdx(toks, j), toks[j].w) && !(toks[j].an || []).some(a => CORE.has(a.l)) && nounHomograph(toks[j].an || []));
    const coreFinite = j => toks[j].w && (toks[j].an || []).some(a => CORE.has(a.l) && Morph.FINITE.has(a.t));
    /** 位置 j 之后、本小句结束之前，还有没有另一个可能的谓语 */
    const laterFinite = j => {
      for (let k = j + 1; k < n; k++) { if (isBoundary(k)) return false; if (finiteCand(k)) return true; }
      return false;
    };
    /** 位置 j 的词更像名词吗（它不是谓语候选，或者后面还有别的谓语） */
    const likelyNoun = j => j >= 0 && (!finiteCand(j) || (!coreFinite(j) && laterFinite(j)));

    /** 位置 i 之前、本小句里已经有谓语了吗 */
    const earlierFinite = i => {
      for (let k = i - 1; k >= 0; k--) { if (isBoundary(k)) return false; if (finiteIdx.has(k)) return true; }
      return false;
    };
    // lo / la / li / le / gli / l'：冠词还是代词？——后面紧跟谓语、且这个词不可能是名词，就是代词
    const aocCache = new Map();
    const aoc = i => { if (!aocCache.has(i)) aocCache.set(i, articleOrClitic(i)); return aocCache.get(i); };
    const articleOrClitic = i => {
      const j = nextWordIdx(toks, i);
      if (j < 0) return 'clitic';                                     // 句末：Lo so. Non la vedo.
      let k = j;
      while (k >= 0 && (CLITIC.has(word(k)) || ADV_SKIP.has(word(k))) && word(k) !== "l'") k = nextWordIdx(toks, k);
      if (k < 0) return 'clitic';
      const an = toks[k].an || [];
      if (an.some(a => CORE.has(a.l) && Morph.FINITE.has(a.t))) return 'clitic';        // lo vedo / la sa / gli ho detto
      if (an.some(a => a.t === 'inf')) return 'clitic';                                 // lo vuole fare
      // 同一小句里前面已经有谓语（Quanto costa l'affitto? / Mi aiuta a trovare la taglia?），或后面还有别的谓语（la porta … è）：是冠词 + 名词
      if (rawFinite(k)) {
        const pi = prevWordIdx(toks, i), pwi = word(pi);
        if (NOUN_HOMOGRAPH.has(toks[k].w) && !(pwi === 'non' || pwi === 'che' || SUBJ_PRON.has(pwi))) return 'article';
        return (laterFinite(k) || earlierFinite(i)) ? 'article' : 'clitic';
      }
      return 'article';
    };

    for (let i = 0; i < n; i++) {
      const tk = toks[i];
      if (!tk.w || tk.cls) continue;
      const w = tk.w;
      const bare = w.replace(/'$/, '');
      const p = prevWordIdx(toks, i), pw = word(p);
      const nx = nextWordIdx(toks, i), nw = word(nx);

      // —— 缩合介词（dai 要区分：介词 / 命令式 Dai!）
      if (PREP_ART[w]) {
        const asVerb = w === 'dai' && (nx < 0 || (p >= 0 && (CLITIC.has(pw) || SUBJ_PRON.has(pw) || pw === 'non')));
        if (!asVerb) { set(i, 'prep', `${w} = ${PREP_ART[w]}（缩合介词）`); continue; }
      }
      // —— 疑问词 / 从句引导词
      if (STRONG_CONJ.has(w)) {
        const interrog = /^(chi|dove|dov'|quando|come|com'|quanto|quanta|quanti|quante|quant'|perché|quale|quali)$/.test(w);
        const quantAdj = /^quant[oaie]$/.test(w) && NOUNISH_PREV.has(pw);
        if (!quantAdj) {
          set(i, 'conj', w === 'che' ? 'che：连词 / 关系代词 / 疑问词，引导从句' : interrog ? `${bare}：疑问词 / 从句引导词` : '连接词 / 从句引导词');
          continue;
        }
      }
      if (w === 'cosa' || w === "cos'") { if (!NOUNISH_PREV.has(pw)) { set(i, 'conj', '疑问词：什么'); continue; } }
      if (ALWAYS_CONJ.has(w)) {
        // 句中的 allora / invece 多半是副词（逗号前后除外）
        const lead = p < 0 || /,/.test(toks.slice(p + 1, i).map(x => x.t).join(''));
        if (!((w === 'allora' || w === 'invece') && !lead)) { set(i, 'conj', '连接词'); continue; }
      }
      if (w === 'anche' && nw === 'se') { set(i, 'conj', 'anche se：即使'); continue; }
      if (LINK_CONJ.has(w)) {
        // 只有两边都有谓语时才算"连接两个分句"（pane e burro 不算）
        let left = false, right = false;
        for (let j = i - 1; j >= 0 && !(toks[j].w === null && /[.!?;:]/.test(toks[j].t)); j--) if (finiteIdx.has(j)) { left = true; break; }
        for (let j = i + 1; j < n && !isBoundary(j); j++) if (finiteCand(j)) { right = true; break; }
        if (left && right) set(i, 'conj', '连接词（连接两个分句）');
        continue;
      }

      // —— 介词
      if (PREP_SIMPLE.has(w)) {
        if (PREP_OR_ADV.has(w)) {
          if (w === 'secondo' && !/^(me|te|lui|lei|noi|voi|loro)$/.test(nw)) continue;
          if (w === 'verso' && ART.has(pw)) continue;
          const ok = nx >= 0 && (ART.has(nw) || PREP_ART[nw] || SUBJ_PRON.has(nw) || /^(di|a|da|che)$/.test(nw) || NOUNISH_PREV.has(nw) ||
            /^[A-ZÀ-Ý]/.test(toks[nx].t) || likelyNoun(nx));
          if (!ok) continue;
        }
        if (w === "d'") { set(i, 'prep', "d' = di（省音）"); continue; }
        set(i, 'prep', '介词');
        continue;
      }

      // —— 代词
      if (SUBJ_PRON.has(w)) {
        set(i, 'pron', `${w}：${SUBJ_ZH[w] || '代词'}${/^(lui|lei|noi|voi|loro)$/.test(w) && PREP_SIMPLE.has(pw) ? '（重读代词，放在介词后）' : '（主语代词，常可省略）'}`);
        continue;
      }
      if (/^[mtcvs]'$/.test(w)) { set(i, 'pron', `${w}：${CLITIC_ZH[w.slice(0, 1) + 'i'] || '代词'}（省音）`); continue; }
      if (CLITIC.has(w) && w !== "l'") {
        if (['lo', 'la', 'li', 'le', 'gli'].includes(w) && aoc(i) === 'article') continue;       // 冠词
        if (w === 'ci' && (nw === 'sono' || nw === 'è' || nw === 'era' || nw === 'erano')) { set(i, 'pron', "ci：那里（c'è / ci sono = 有）"); continue; }
        set(i, 'pron', `${w}：${CLITIC_ZH[w] || '代词'}`);
        continue;
      }
      if (w === "l'") { if (aoc(i) === 'clitic') set(i, 'pron', "l' = lo / la：它、他、她（直接宾语，省音）"); continue; }
      if (ART.has(w) || w === 'ecco') continue;

      // —— 动词
      const an = tk.an || [];
      if (!an.length || NOT_VERB.has(w)) continue;
      if (/^[A-ZÀ-Ý]/.test(tk.t) && p >= 0) continue;                                // 句中大写：人名、地名
      const core = an.some(a => CORE.has(a.l));
      const finite = an.filter(a => Morph.FINITE.has(a.t));
      const pp = an.filter(a => a.t === 'pp');
      const inf = an.filter(a => a.t === 'inf');
      const ger = an.filter(a => a.t === 'ger');
      // 前面是冠词 / 物主词 / 介词，就当名词（il lavoro, la porta, per cena）；cena 在 "la cena è…" 里也是名词
      const nounish = !core && p >= 0 && nounHomograph(an) && nounishPrev(p, w) &&
        !(CLITIC.has(pw) && aoc(p) === 'clitic');

      if (pw === 'che' && prevWordIdx(toks, p) < 0 && !core && /!\s*$/.test(sentence) && !laterFinite(i)) continue;   // Che lavoro faticoso!：感叹句里的名词
      if (w === 'sei' && (TIME_NOUNS.has(nw) || /^(le|alle)$/.test(pw))) continue;     // sei anni：六
      if (w === 'fa' && TIME_NOUNS.has(pw)) continue;                                  // due anni fa：……以前

      // 往前找助动词 / 情态动词 / stare（越过副词和代词）
      const back = pred => {
        for (let j = p; j >= 0; j = prevWordIdx(toks, j)) {
          const wj = word(j);
          if (ADV_SKIP.has(wj) || CLITIC.has(wj)) continue;
          return pred(j) ? j : -1;
        }
        return -1;
      };
      const hasLemma = (j, re) => finiteIdx.has(j) && (toks[j].an || []).some(a => re.test(a.l) && Morph.FINITE.has(a.t));
      const auxAt = pp.length ? back(j => hasLemma(j, /^(avere|essere)$/)) : -1;

      if (pp.length && auxAt >= 0) {                                                   // ho mangiato / sono andato
        const a = pp[0];
        set(i, 'verb', `${w} — ${a.l} 的过去分词${a.g ? '（' + (a.g === 'm' ? '阳' : '阴') + (a.n === 's' ? '单' : '复') + '）' : ''}，和 ${toks[auxAt].t} 一起构成复合时态`);
        toks[i].an = [a]; toks[i].part = true; toks[i].auxAt = auxAt;
        continue;
      }
      if (finite.length) {
        if (nounish) continue;                                                          // il lavoro, la porta, per cena：名词
        const prevFinite = p >= 0 && finiteIdx.has(p) && !toks[p].part;
        if (prevFinite && !(toks[p].an || []).some(a => MODAL.has(a.l))) continue;      // è dura / è sveglio：第二个词是形容词
        set(i, 'verb', `${w} — ${finite[0].l} · ${Morph.describe(finite[0])}`);
        toks[i].an = finite; finiteIdx.add(i);
        continue;
      }
      if (pp.length) {
        if (nounish) continue;                                                          // il letto, la posta, un corso：名词
        set(i, 'nonf', `${w} — ${pp[0].l} 的过去分词（非谓语：作形容词或分词短语）`);
        toks[i].an = [pp[0]];
        continue;
      }
      if (inf.length) {
        const a = inf[0];
        const m = back(j => hasLemma(j, /^(potere|volere|dovere|sapere|solere)$/));
        if (m >= 0) { set(i, 'verb', `${w} — ${a.l} · 不定式（跟在 ${toks[m].t} 后面，和它一起构成谓语）`); toks[i].an = [a]; toks[i].part = true; continue; }
        set(i, 'nonf', `${w} — ${a.l} · 不定式${a.enc ? '（+ 代词 ' + a.enc.join('+') + '）' : ''}（非谓语）`);
        toks[i].an = [a];
        continue;
      }
      if (ger.length) {
        const a = ger[0];
        const st = back(j => hasLemma(j, /^(stare|andare|venire)$/));
        if (st >= 0) { set(i, 'verb', `${w} — ${a.l} · 副动词（和 ${toks[st].t} 一起表示正在进行）`); toks[i].an = [a]; toks[i].part = true; continue; }
        set(i, 'nonf', `${w} — ${a.l} · 副动词 -ando / -endo（非谓语：……着、……的时候）`);
        toks[i].an = [a];
        continue;
      }
    }

    // 本课重点词叠加高亮
    markVocab(toks, vocab);
    return toks;
  }

  // ---------- 本课重点词 ----------
  /** 词形变化：阴阳性、单复数（libro → libri，amica → amiche，bello → bella） */
  function forms(w) {
    w = w.toLowerCase();
    const f = new Set([w]);
    const m = w.match(/^(.*?)([oaei])$/);
    if (m && m[1].length >= 2) {
      const b = m[1];
      ['o', 'a', 'i', 'e'].forEach(v => f.add(b + v));
      if (/c$/.test(b)) { f.add(b + 'hi'); f.add(b + 'he'); }
      if (/g$/.test(b)) { f.add(b + 'hi'); f.add(b + 'he'); }
      if (/ci$/.test(b) || /gi$/.test(b)) f.add(b.slice(0, -1) + 'e');
    }
    return f;
  }
  const letters = s => (String(s).toLowerCase().replace(/’/g, "'").match(new RegExp(`[${L}]+'?`, 'g')) || []);

  function markVocab(toks, vocab) {
    if (!vocab || !vocab.length) return;
    const wordIdx = [];
    toks.forEach((k, i) => { if (k.w) wordIdx.push(i); });
    vocab.forEach(v => {
      const parts = letters(v.it);
      if (!parts.length) return;
      if (parts.length === 1) {
        const head = parts[0];
        const fs = forms(head);
        const lemmaOfHead = Morph.isLemma(head) ? head : null;
        wordIdx.forEach(i => {
          const k = toks[i];
          if (k.vocab) return;
          if (fs.has(k.w) || fs.has(k.w.replace(/'$/, ''))) { k.vocab = v; return; }
          if (lemmaOfHead && (k.an || []).some(a => a.l === lemmaOfHead)) k.vocab = v;
        });
      } else {
        for (let s = 0; s + parts.length <= wordIdx.length; s++) {
          if (parts.every((p, q) => toks[wordIdx[s + q]].w === p || toks[wordIdx[s + q]].w.replace(/'$/, '') === p.replace(/'$/, ''))) {
            for (let q = 0; q < parts.length; q++) toks[wordIdx[s + q]].vocab = toks[wordIdx[s + q]].vocab || v;
          }
        }
      }
    });
  }

  // ---------- 意群切分 ----------
  /** 按标点、连接词、介词把长句切成可一口气读完的小块 */
  function chunks(sentence) {
    const words = String(sentence).trim().split(/\s+/).filter(Boolean);
    const out = [];
    let cur = [];
    const flush = () => { if (cur.length) { out.push(cur.join(' ')); cur = []; } };
    words.forEach(raw => {
      const w = norm(raw).replace(new RegExp(`[^${L}']`, 'g'), '');
      if (w === 'che' && cur.length >= 1 && words.length >= 5) flush();
      else if (cur.length >= 3 && STRONG_CONJ.has(w)) flush();
      else if (cur.length >= 4 && (ALWAYS_CONJ.has(w) || LINK_CONJ.has(w))) flush();
      else if (cur.length >= 5 && (PREP_SIMPLE.has(w) && !PREP_OR_ADV.has(w))) flush();
      cur.push(raw);
      if (/[,;:)—–]$/.test(raw) || /^[—–]$/.test(raw)) flush();
    });
    flush();
    return out;
  }

  const wordsOf = s => (String(s).match(new RegExp(`[${L}]+(?:['’-][${L}]+)*['’]?`, 'g')) || []);

  // ---------- 难度 ----------
  function difficulty(sentence) {
    const n = wordsOf(sentence).length;
    const clauses = (norm(sentence).match(new RegExp(`(?<![${L}])(che|cui|quale|quali|perché|quando|mentre|se|siccome|poiché|benché|sebbene|affinché|finché|purché)(?![${L}])`, 'g')) || []).length;
    const score = n / 8 + clauses;
    return { words: n, clauses, level: score >= 5 ? 3 : score >= 3 ? 2 : 1 };
  }

  // ---------- 主干提示 / 谓语说明 ----------
  /** 去掉插入语和从句后的"骨架"。拿不准时返回空字符串 */
  function trunk(sentence) {
    const s = String(sentence).replace(/\([^)]*\)/g, ' ').replace(/\s[—–]\s[^—–]*\s[—–]\s/g, ' ');
    const segs = s.split(/[,;]/);
    const drop = /^\s*(che|chi|cui|quale|quali|dove|quando|mentre|se|come|perché|siccome|poiché|benché|sebbene|affinché|finché|purché|anche se|dopo che|prima che|ma|però|invece|inoltre|infatti|cioè|quindi|dunque|allora|per esempio|ad esempio|in realtà|insomma|di solito|secondo me|infine|poi|beh|dai|ecco)\b/i;
    const keep = [];
    segs.forEach((seg, i) => {
      if (i > 0 && drop.test(seg)) return;
      if (i === 0 && segs.length > 1 && drop.test(seg)) return;
      const t = seg.replace(/\b(che|cui|il quale|la quale|dove|quando|mentre|perché|se|come|siccome|poiché|benché|sebbene)\b.*$/i, '').trim();
      if (t.split(/\s+/).length >= 2) keep.push(t);
    });
    let res = keep.join(', ').replace(/\s+/g, ' ').trim().replace(/[,;:]\s*$/, '');
    if (!res) return '';
    if (!/[.!?]$/.test(res)) res += /\?\s*$/.test(sentence) ? '?' : '.';
    const a = wordsOf(res).length, b = wordsOf(sentence).length;
    return (a >= b - 1 || a < 3) ? '' : res;
  }

  /** 句子里的动词一览：[{text, lemma, desc, cls, subject}]，subject 是动词词尾暗示的主语（句子里没写出主语时才有） */
  function verbsOf(toks) {
    const out = [];
    toks.forEach((k, i) => {
      if (!k.w || (k.cls !== 'verb' && k.cls !== 'nonf') || !k.an || !k.an[0]) return;
      const a = k.an[0];
      const item = { text: k.t, lemma: a.l, desc: Morph.describe(a), cls: k.cls, i };
      if (k.cls === 'verb' && Morph.FINITE.has(a.t) && a.p != null && a.p >= 0) {
        // 前面（同一小句）有没有写出主语
        let explicit = false;
        for (let j = i - 1; j >= 0; j--) {
          if (toks[j].w === null && /[.!?;:,]/.test(toks[j].t)) break;
          if (toks[j].w && (SUBJ_PRON.has(toks[j].w) || (toks[j].cls === '' && !ART.has(toks[j].w) && !CLITIC.has(toks[j].w) && !ADV_SKIP.has(toks[j].w) && j < i - 0 && /^[A-ZÀ-Ý]/.test(toks[j].t)))) { explicit = true; break; }
        }
        if (!explicit) item.subject = Morph.PERSON_SHORT[a.p];
      }
      out.push(item);
    });
    return out;
  }

  // ---------- 语法点库 ----------
  // from：最早在第几课显示（课程里还没讲到的语法，不拿出来吓人）；test(ctx)：这句话里有没有这个现象
  const ESSERE_VERBS = S("andare venire arrivare partire uscire entrare tornare nascere morire rimanere restare stare essere diventare salire scendere cadere piacere succedere sembrare costare");
  const IRREG_COMMON = S("andare fare dare stare dire venire uscire potere volere dovere sapere bere rimanere scegliere tenere salire");
  const POSS = S("mio mia miei mie tuo tua tuoi tue suo sua suoi sue nostro nostra nostri nostre vostro vostra vostri vostre");
  const DEM = S("questo questa questi queste quello quella quelli quelle quel quei quegli");
  const INDIRECT_VERBS = S("dire dare piacere scrivere telefonare mandare chiedere rispondere consigliare spiegare raccontare offrire portare prestare regalare servire mancare sembrare dispiacere interessare bastare");
  const PART_VERBS = S("avere volere prendere mangiare bere comprare mettere aggiungere cercare portare offrire preparare cucinare usare fare");
  const WH = S("che cosa chi dove dov' come com' quando perché quanto quanta quanti quante quant' quale quali");

  /** 把一行文字里的几个句子分开：[{toks, end: '.'|'?'|'!'|''}] */
  function partsOf(toks) {
    const parts = [];
    let cur = [];
    toks.forEach(k => {
      cur.push(k);
      if (k.w === null && /^[.!?]$/.test(k.t)) { parts.push({ toks: cur, end: k.t }); cur = []; }
    });
    if (cur.some(k => k.w)) parts.push({ toks: cur, end: '' });
    parts.forEach(pt => { pt.first = pt.toks.find(k => k.w) || null; });
    return parts;
  }

  function ctxOf(sentence, toks) {
    const words = toks.filter(k => k.w).map(k => k.w);
    const verbToks = toks.filter(k => k.cls === 'verb' && k.an && k.an[0]);
    return {
      s: String(sentence), toks, words,
      has: w => words.includes(w),
      verbs: verbToks,
      tense: t => verbToks.some(k => !k.part && k.an.some(a => a.t === t) && k.an.every(a => a.t === t || Morph.FINITE.has(a.t))),
      lemma: (re, tenses) => verbToks.some(k => k.an.some(a => re.test(a.l) && (!tenses || tenses.includes(a.t)))),
      ppTokens: toks.filter(k => k.part && k.an && k.an[0] && k.an[0].t === 'pp'),
      parts: partsOf(toks),
    };
  }
  const idx = (toks, k) => toks.indexOf(k);

  const POINTS = [
    { id: 'lei', name: 'tu 和 Lei：熟人与正式的“你 / 您”', color: '#e8590c', from: 1,
      desc: '对熟人用 tu；对陌生人、长辈、客户用 Lei（大写 L），动词用第三人称单数：Come sta?（您好吗？）。',
      how: '和店员、医生、老师说话先用 Lei；对方说 “Dammi del tu” 就可以改用 tu。',
      ex: 'Come stai? （朋友）/ Come sta? （您）E Lei? —— 你好吗？/ 您好吗？您呢？',
      test: c => c.toks.some(k => k.t === 'Lei') },
    { id: 'ecco', name: 'ecco：这就是……', color: '#f59f00', from: 1,
      desc: 'ecco 用来递东西、指给别人看：Ecco il conto!（这是账单）、Eccolo!（它在这儿）。',
      how: 'ecco 后面没有动词；接代词时粘在后面：ecco + lo = eccolo。',
      ex: 'Ecco la chiave! Eccolo! —— 这是钥匙！它在这儿！',
      test: c => c.words.some(w => /^ecco(lo|la|li|le|mi|ci)?$/.test(w)) },
    { id: 'chiamarsi', name: 'mi chiamo：我叫……', color: '#d9480f', from: 2,
      desc: '介绍名字用反身动词 chiamarsi：mi chiamo（我叫）、ti chiami（你叫）、si chiama（他 / 她 / 您叫）。',
      how: '问名字：Come ti chiami?（熟人）/ Come si chiama?（正式）。',
      ex: 'Mi chiamo Li Ming. Come ti chiami? —— 我叫李明。你叫什么名字？',
      test: c => c.verbs.some(k => k.an.some(a => a.l === 'chiamare' && a.t === 'pres')) && c.toks.some(k => /^(mi|ti|si)$/.test(k.w || '') && k.cls === 'pron') },
    { id: 'q_wh', name: '特殊疑问句（疑问词）', color: '#c2255c', from: 2,
      desc: '用疑问词开头问具体信息：che / cosa（什么）、chi（谁）、dove（哪里）、quando（什么时候）、come（怎样）、perché（为什么）、quanto（多少）、quale（哪一个）。',
      how: '疑问词放句首，后面直接接动词；perché 既问“为什么”，也答“因为”。',
      ex: 'Dove vai? Quando torni? Quanto costa? —— 你去哪里？你什么时候回来？多少钱？',
      test: c => c.parts.some(pt => pt.end === '?' && pt.first && WH.has(pt.first.w)) },
    { id: 'avere', name: 'avere：有 / 年龄 / 感觉', color: '#2b8a3e', from: 3,
      desc: 'avere 表示“有”，还用来说年龄和身体感觉：ho fame（饿）、ho sete（渴）、ho venti anni（20 岁）。',
      how: 'ho / hai / ha / abbiamo / avete / hanno；h 不发音。说年龄用 avere，不用 essere。',
      ex: 'Ho venti anni e ho fame. —— 我 20 岁了，我饿了。',
      test: c => c.verbs.some(k => !k.part && k.an.some(a => a.l === 'avere' && Morph.FINITE.has(a.t)) && !c.ppTokens.some(p => p.auxAt === idx(c.toks, k))) },
    { id: 'neg', name: '否定：non + 动词', color: '#495057', from: 4,
      desc: '否定很简单：non 放在动词前面；要加强否定时，用 non … mai / niente / nessuno / più / ancora。',
      how: '意大利语允许双重否定：Non capisco niente.（我什么都不懂）。non 和 mai 一起出现不会“负负得正”。',
      ex: 'Non parlo cinese. Non vado mai al cinema. —— 我不说中文。我从不去电影院。',
      test: c => c.has('non') },
    { id: 'q_yn', name: '一般疑问句（语调上扬）', color: '#e64980', from: 5,
      desc: '是非问句不需要倒装，也不需要助动词：把陈述句的句号换成问号，句尾语调上扬 ↗ 即可。',
      how: 'Parli italiano?（你说意大利语吗？）回答 Sì, parlo un po’. / No, non parlo italiano.',
      ex: 'Hai fame? Sì, ho fame! —— 你饿吗？是的，我饿了！',
      test: c => c.parts.some(pt => pt.end === '?' && pt.first && !WH.has(pt.first.w)) },
    { id: 'essere', name: 'essere 句型（是 / 在）', color: '#e8590c', from: 7,
      desc: '主语 + essere + 名词、形容词或地点，说明“是什么、怎么样、在哪里”。',
      how: 'sono / sei / è / siamo / siete / sono；形容词要和主语的性、数一致（阳性 -o，阴性 -a）。',
      ex: 'Marco è italiano; Maria è italiana. —— 马可是意大利人；玛丽亚是意大利女人。',
      test: c => c.verbs.some(k => !k.part && k.an.some(a => a.l === 'essere' && Morph.FINITE.has(a.t)) && !c.ppTokens.some(p => p.auxAt === idx(c.toks, k))) },
    { id: 'art', name: '冠词（il / lo / la / l’ / un / una…）', color: '#1098ad', from: 8,
      desc: '名词前几乎总要有冠词：定冠词（特指）il、lo、la、l’、i、gli、le；不定冠词（泛指）un、uno、una。',
      how: '看名词的阴阳性和开头字母选冠词：il libro / lo studente / la casa / l’amico；复数 i libri / gli studenti / le case。',
      ex: 'Il caffè è caldo; un cornetto, per favore. —— 咖啡是热的；请来一个羊角面包。',
      test: c => c.toks.some(k => k.w && ART.has(k.w) && k.cls === '') },
    { id: 'dem', name: '指示词（questo / quello）', color: '#7048e8', from: 8,
      desc: 'questo（这个）指近处，quello（那个）指远处；形式随名词的性数变化。',
      how: 'questo libro / questa casa；quello 的变化像定冠词：quel libro, quello studente, quella casa, quei libri。',
      ex: 'Questo è buono, quello è caro. —— 这个好吃，那个贵。',
      test: c => c.words.some(w => DEM.has(w)) },
    { id: 'vorrei', name: 'vorrei：我想要（礼貌）', color: '#f08c00', from: 9,
      desc: 'vorrei 是 volere 的条件式，比 voglio 礼貌得多，点餐、买东西、提出请求时都用它。',
      how: 'vorrei + 名词（Vorrei un caffè）；vorrei + 动词原形（Vorrei prenotare）。',
      ex: 'Vorrei un caffè, per favore. —— 我想要一杯咖啡，谢谢。',
      test: c => c.has('vorrei') || c.has('vorresti') },
    { id: 'prep_art', name: '缩合介词（del, al, dal, nel, sul…）', color: '#2f7cf6', from: 9,
      desc: '介词 a / di / da / in / su 遇到定冠词时要合成一个词：a + il = al，di + la = della，in + le = nelle。',
      how: 'con 和 per 一般不合并；记住 a→al/alla，da→dal/dalla，in→nel/nella，su→sul/sulla，di→del/della。',
      ex: 'Vado al mercato dalla nonna. —— 我去市场，然后去奶奶家。',
      test: c => c.toks.some(k => k.w && PREP_ART[k.w] && k.cls === 'prep') },
    { id: 'pres_reg', name: '现在时（规则动词）', color: '#3b5bdb', from: 12,
      desc: '按词尾分三类：-are（parlare）、-ere（prendere）、-ire（dormire）；去掉 -are / -ere / -ire，加上对应人称词尾。',
      how: 'parlo, parli, parla, parliamo, parlate, parlano；人称由词尾表示，主语 io / tu… 常常省略。',
      ex: 'Parlo italiano e studio ogni giorno. —— 我说意大利语，每天学习。',
      test: c => c.verbs.some(k => !k.part && k.an.some(a => a.t === 'pres' && !CORE.has(a.l) && !IRREG_COMMON.has(a.l))) },
    { id: 'irreg_pres', name: '常用不规则动词（andare / fare / venire / uscire / dire…）', color: '#5f3dc4', from: 12,
      desc: '最常用的动词多半是不规则的，要整体记住：vado, faccio, vengo, esco, dico, sto, do, bevo……',
      how: '不规则变位常集中在 io 和 loro：vado / vanno，faccio / fanno；noi 和 voi 往往比较规则。',
      ex: 'Vado al lavoro e faccio colazione. —— 我去上班，吃早餐。',
      test: c => c.verbs.some(k => !k.part && k.an.some(a => a.t === 'pres' && IRREG_COMMON.has(a.l) && !/^(potere|volere|dovere|sapere)$/.test(a.l))) },
    { id: 'time_expr', name: '时间表达（alle otto, tra due ore, da tre giorni…）', color: '#0b7285', from: 14,
      desc: '几点：alle otto（八点）、a mezzogiorno；时间段：tra due settimane（两周后）、da tre giorni（已经三天）、due anni fa（两年前）。',
      how: '说几点用 alle + 数字（一点用 all’una）；tra / fra 表示“多久之后”，fa 放在时间段后表示“多久以前”。',
      ex: 'Il treno parte alle otto, tra due ore. Sono qui da tre giorni. —— 火车八点出发，两小时后。我来这里三天了。',
      test: c => c.words.some((w, i) => (w === 'alle' && NUMBER_WORDS.has(c.words[i + 1] || '')) || w === 'mezzogiorno' || w === 'mezzanotte' ||
        ((w === 'tra' || w === 'fra' || w === 'da') && (NUMBER_WORDS.has(c.words[i + 1] || '') || /^\d/.test(c.words[i + 1] || '')) && TIME_NOUNS.has(c.words[i + 2] || '')) ||
        (w === 'fa' && TIME_NOUNS.has(c.words[i - 1] || ''))) },
    { id: 'poss', name: '物主词（mio, tuo, suo…）', color: '#a61e4d', from: 15,
      desc: '物主词和名词的性数一致，通常要带冠词：il mio libro, la mia casa, i miei amici。',
      how: '单数亲属名词不带冠词：mia madre、mio padre；但 la mia famiglia、i miei genitori 要带冠词。suo 同时表示“他的 / 她的 / 您的（Suo）”。',
      ex: 'Questa è mia madre e questo è il mio amico. —— 这是我母亲，这是我的朋友。',
      test: c => c.words.some(w => POSS.has(w)) },
    { id: 'piacere', name: 'piacere：喜欢', color: '#d6336c', from: 16,
      desc: 'piacere 的主语是“被喜欢的东西”，喜欢的人用间接代词：mi piace（我喜欢）、ti piace、gli piace、ci piace。',
      how: '单数用 piace，复数用 piacciono：Mi piace la pizza. Mi piacciono gli spaghetti. 否定：non mi piace。',
      ex: 'Mi piace il caffè e mi piacciono i dolci. —— 我喜欢咖啡，也喜欢甜点。',
      test: c => c.lemma(/^piacere$/) },
    { id: 'exclam', name: '感叹句（Che…! Quanto…!）', color: '#e67700', from: 16,
      desc: 'Che + 名词 / 形容词！ 或 Quanto / Come + 句子！表示感叹：Che bello! Che caldo! Quanto è bello!',
      how: 'Che + 名词（Che peccato!）或 Che + 形容词（Che bello!）；语调下降、情感强。',
      ex: 'Che bello! Che caldo! Come sei gentile! —— 真好！真热！你真好心！',
      test: c => c.parts.some(pt => pt.end === '!' && pt.first && /^(che|quanto|come|quant')$/.test(pt.first.w)) },
    { id: 'inf_prep', name: '介词 + 不定式', color: '#099268', from: 16,
      desc: '介词后面的动词只能用不定式（动词原形）：per + 不定式（为了）、di + 不定式、a + 不定式、da + 不定式（该做的）、senza + 不定式（没有……就）。',
      how: '有些动词固定搭配介词：cominciare a, finire di, andare a, imparare a, avere voglia di。',
      ex: 'Vado a mangiare per festeggiare, senza pagare troppo. —— 我去吃饭庆祝，又不花太多钱。',
      test: c => c.toks.some((k, i) => k.cls === 'prep' && (() => { const j = nextWordIdx(c.toks, i); return j >= 0 && c.toks[j].cls === 'nonf' && c.toks[j].an && c.toks[j].an[0].t === 'inf'; })()) },
    { id: 'c_e', name: 'c’è / ci sono：有（存在句）', color: '#2b8a3e', from: 17,
      desc: '表示“某处有某物”：单数用 c’è，复数用 ci sono；过去用 c’era / c’erano。',
      how: '后面的名词决定 c’è 还是 ci sono：C’è un bar. / Ci sono due bar.；否定 non c’è。',
      ex: 'C’è un bar qui vicino? Ci sono due farmacie. —— 这附近有咖啡吧吗？有两家药店。',
      test: c => c.words.some((w, i) => (w === "c'" && /^(è|era|sarà|sarebbe)$/.test(c.words[i + 1] || '')) || (w === 'ci' && /^(sono|erano|saranno)$/.test(c.words[i + 1] || ''))) },
    { id: 'modal', name: '情态动词（potere / volere / dovere）+ 不定式', color: '#862e9c', from: 18,
      desc: 'potere（能、可以）、volere（想）、dovere（必须）后面直接接动词原形，只有情态动词变位。',
      how: 'Posso entrare? Devo studiare. 也可以用来委婉请求：Può ripetere?；sapere + 不定式 = 会做（Sa nuotare）。',
      ex: 'Posso entrare? Devo studiare. Non so ballare. —— 我可以进来吗？我得学习。我不会跳舞。',
      test: c => c.toks.some(k => k.part && k.an && k.an[0].t === 'inf') },
    { id: 'contr', name: '转折 / 让步（ma, però, anche se…）', color: '#ff922b', from: 18,
      desc: 'ma、però、invece、tuttavia 表示转折；anche se、nonostante、benché 表示让步，“尽管……”。',
      how: 'ma 之后往往是重点；anche se + 直陈式（现实的让步）：Anche se piove, esco。',
      ex: 'È caro, ma è buono. Anche se piove, usciamo. —— 贵，但是好吃。即使下雨，我们也出门。',
      test: c => c.words.some((w, i) => /^(ma|però|tuttavia|eppure|nonostante|benché|sebbene)$/.test(w) || (w === 'anche' && c.words[i + 1] === 'se')) },
    { id: 'cause', name: '因果（perché, siccome, quindi…）', color: '#74b816', from: 18,
      desc: 'perché（因为 / 为什么）、siccome（既然 / 由于，放句首）、poiché、quindi（所以）、perciò、dunque。',
      how: 'perché 引导原因，放在结果后面；siccome 引导的原因放句首；quindi / perciò 引导结果。',
      ex: 'Resto a casa perché sono stanco; quindi non vengo. —— 我待在家，因为累了；所以我不去了。',
      test: c => c.words.some((w, i) => (/^(siccome|poiché|quindi|perciò|dunque)$/.test(w)) || (w === 'perché' && i > 0)) },
    { id: 'imper', name: '命令式（请求、指路、建议）', color: '#c2255c', from: 21,
      desc: '用来请求、指示、劝告：tu 的形式（prendi, ascolta）；对“您 Lei”用另一套（prenda, vada, scusi）；noi（andiamo）、voi（prendete）。',
      how: '否定的 tu 命令式用 non + 不定式：Non fumare! 带代词时代词常粘在后面：dimmi, mettilo。',
      ex: 'Vada dritto e giri a destra. —— 请直走，然后右转。',
      test: c => c.parts.some(pt => {
        if (pt.end === '?') return false;
        const f = pt.toks.find(k => k.w && !(k.cls === 'pron' && CLITIC.has(k.w)));
        if (!f || f.cls !== 'verb' || !f.an || f.part) return false;
        const hasClitic = pt.toks.indexOf(f) > pt.toks.findIndex(k => k.w) ;
        if (hasClitic) return f.an.some(a => a.t === 'imp' && a.p === 2) && !f.an.some(a => a.t === 'pres' && a.p === 2);   // Si accomodi（命令）≠ Si chiama（陈述）
        return f.an.some(a => a.t === 'imp');
      }) },
    { id: 'sap_con', name: 'sapere 与 conoscere：知道 / 认识', color: '#1c7ed6', from: 33,
      desc: 'sapere = 知道（信息、事实）或会（技能）：So che… / Sa nuotare；conoscere = 认识（人、地方）、熟悉：Conosco Marco / Conosco Roma。',
      how: '后面跟从句、疑问词、动词原形用 sapere；后面跟人名、地名、书名用 conoscere。',
      ex: 'So dov’è la stazione, ma non conosco la città. —— 我知道车站在哪里，但我不熟悉这座城市。',
      test: c => c.lemma(/^(sapere|conoscere)$/) },
    { id: 'reflexive', name: '反身动词（mi alzo, ci divertiamo…）', color: '#3bc9db', from: 31,
      desc: '动作回到自己身上：mi alzo（我起床）、ti lavi、si chiama、ci divertiamo。反身代词 mi / ti / si / ci / vi / si 要和主语的人称一致，放在动词前。',
      how: '反身代词跟着主语变：io mi, tu ti, lui/lei si, noi ci, voi vi, loro si；复合时态都用 essere：mi sono alzato。',
      ex: 'Mi sveglio alle sette e mi lavo. —— 我七点醒来，然后洗漱。',
      test: c => c.toks.some((k, i) => k.cls === 'pron' && /^(mi|ti|si|ci|vi)$/.test(k.w) && (() => {
        const j = nextWordIdx(c.toks, i); if (j < 0) return false;
        let v = j; for (let q = 0; q < 3 && v >= 0 && c.toks[v].cls !== 'verb'; q++) v = nextWordIdx(c.toks, v);
        const t = v >= 0 && c.toks[v]; if (!t || !t.an) return false;
        const per = { mi: [0], ti: [1], si: [2, 5], ci: [3], vi: [4] }[k.w];
        return t.an.some(a => REFL.has(a.l) && (a.p == null || per.includes(a.p)));
      })()) },
    { id: 'part', name: '部分冠词（del, della, dei…）：一些', color: '#20c997', from: 37,
      desc: 'del / dello / della / dell’ / dei / degli / delle 放在名词前，表示“一些、一点”，常用于第一次提到、数量不确定的东西。',
      how: '单数不可数名词：del pane、dell’acqua；复数：dei libri。否定句里通常省略：Non ho pane。',
      ex: 'Vorrei del pane e dell’acqua. —— 我想要一点面包和水。',
      test: c => c.toks.some((k, i) => k.w && /^(del|dello|della|dell'|dei|degli|delle)$/.test(k.w) && (() => {
        const p = prevWordIdx(c.toks, i);
        return p >= 0 && c.toks[p].cls === 'verb' && !!c.toks[p].an && c.toks[p].an.some(a => PART_VERBS.has(a.l));
      })()) },
    { id: 'che_conj', name: 'che 引导宾语从句', color: '#9c36b5', from: 40,
      desc: 'dire / pensare / credere / sapere / sperare + che + 句子：把整个从句当作一个“大宾语”：Penso che sia tardi。',
      how: '主句和从句的主语不同时用 che；相同时常用 di + 不定式：Penso di andare（我想去）。',
      ex: 'So che sei stanco e credo che tu abbia ragione. —— 我知道你累了，我觉得你说得对。',
      test: c => c.toks.some((k, i) => k.w === 'che' && (() => { const p = prevWordIdx(c.toks, i); return p >= 0 && (c.toks[p].cls === 'verb' || c.toks[p].cls === 'pron') && c.toks[p].w !== 'non'; })()) },
    { id: 'clitic_dir', name: '直接宾语代词（lo, la, li, le）', color: '#12b886', from: 41,
      desc: '用 lo（他 / 它，阳）、la（她 / 它，阴）、li（他们 / 它们，阳）、le（她们 / 它们，阴）代替前面提过的宾语，放在变位动词前。',
      how: 'Compro il libro. → Lo compro. 在复合时态里要和过去分词性数一致：Ho comprato i libri → Li ho comprati。',
      ex: 'Il caffè? Lo prendo. Le mele? Le compro. —— 咖啡？我要。苹果？我买。',
      test: c => c.toks.some(k => k.cls === 'pron' && /^(lo|la|li|le|l')$/.test(k.w)) },
    { id: 'clitic_ind', name: '间接宾语代词（mi, ti, gli, le, ci, vi）', color: '#f76707', from: 42,
      desc: '回答“给谁、对谁”：mi（对我）、ti（对你）、gli（对他 / 对他们）、le（对她 / 对您）、ci（对我们）、vi（对你们）。',
      how: 'Ti scrivo domani. Gli telefono. 注意 le 既是“对她”（间接）也是“她们”（直接）。',
      ex: 'Ti telefono stasera e gli dico tutto. —— 今晚给你打电话，我会告诉他一切。',
      test: c => c.toks.some((k, i) => k.cls === 'pron' && (/^(gli)$/.test(k.w) || (/^(mi|ti|ci|vi|le)$/.test(k.w) && (() => {
        const j = nextWordIdx(c.toks, i); const t = j >= 0 && c.toks[j];
        return !!t && !!t.an && t.an.some(a => INDIRECT_VERBS.has(a.l));
      })()))) },
    { id: 'ci_ne', name: 'ci 与 ne', color: '#0ca678', from: 47,
      desc: 'ne 代替“其中的 / 关于它 / 从那里”（Ne voglio due：我要两个）；ci 代替“那里”或“关于这件事”（Ci vado：我去那里）。',
      how: 'ne 常和数量一起出现；ci 代替 a / in / su + 地点。二者放在变位动词前。',
      ex: 'Quante mele vuoi? Ne voglio tre. Vai a Roma? Sì, ci vado domani. —— 你要几个苹果？我要三个。你去罗马吗？是的，明天去。',
      test: c => c.toks.some((k, i) => k.cls === 'pron' && (k.w === 'ne' || (k.w === 'ci' && (() => { const j = nextWordIdx(c.toks, i); const t = j >= 0 && c.toks[j]; return !!t && !!t.an && t.an.some(a => !(a.l === 'essere') && a.p !== 3 && !REFL.has(a.l)); })()))) },
    { id: 'compare', name: '比较级与最高级', color: '#3bc9db', from: 43,
      desc: 'più / meno + 形容词 + di（比……）或 che（比较两个性质）；il più… 最……；-issimo = 非常……',
      how: '比较两个人或物用 di：Marco è più alto di Luca；比较两个性质或后面是介词短语、不定式时用 che。buono → migliore，cattivo → peggiore，bene → meglio。',
      ex: 'Roma è più grande di Firenze. Questo è il più bello. È bellissimo! —— 罗马比佛罗伦萨大。这个最漂亮。太美了！',
      test: c => c.words.some((w, i) => /(?:issim[oaie])$/.test(w) || ((w === 'più' || w === 'meno') && c.words.slice(i + 1, i + 5).some(x => x === 'di' || x === 'che' || PREP_ART[x] === 'di + il')) || (w === 'più' && /^(il|la|i|le)$/.test(c.words[i - 1] || ''))) },
    { id: 'futuro', name: '将来时（futuro semplice）', color: '#0b7285', from: 55,
      desc: '表示将来要发生的事，也可以表示推测：parlerò（我将说）、andrò（我将去）、sarà（将是 / 大概是）。',
      how: '规则变位：-are / -ere 动词词干 + -erò, -erai, -erà…；很多常用动词词干不规则：andrò, farò, sarò, avrò, verrò。',
      ex: 'Domani partirò per Roma e tornerò sabato. —— 明天我动身去罗马，周六回来。',
      test: c => c.tense('fut') },
    { id: 'pp', name: '近过去时（passato prossimo）', color: '#5f3dc4', from: 51,
      desc: 'avere 或 essere 的现在时 + 过去分词，表示已经完成的动作：ho mangiato（我吃了）、sono andato（我去了）。',
      how: '多数动词用 avere；表示位移或状态变化的动词（andare, venire, partire, arrivare, nascere…）和反身动词用 essere。',
      ex: 'Ieri ho mangiato la pizza e sono andato al cinema. —— 昨天我吃了披萨，还去了电影院。',
      test: c => c.ppTokens.length > 0 },
    { id: 'pp_essere', name: '用 essere 的复合时态：过去分词要一致', color: '#7048e8', from: 52,
      desc: '用 essere 构成复合时态时，过去分词的词尾要和主语的性、数一致：sono andato / andata，siamo andati / andate。',
      how: '用 avere 时分词不变（除非前面有 lo / la / li / le 直接宾语代词：Li ho visti）。',
      ex: 'Maria è arrivata e i ragazzi sono partiti. —— 玛丽亚到了，孩子们走了。',
      test: c => c.ppTokens.some(k => k.an[0].g && c.toks[k.auxAt] && (c.toks[k.auxAt].an || []).some(a => a.l === 'essere') && ESSERE_VERBS.has(k.an[0].l)) },
    { id: 'imperfetto', name: '未完成过去时（imperfetto）', color: '#845ef7', from: 61,
      desc: '描述过去的背景、习惯和同时进行的动作：abitavo（我曾住在）、mangiava（他当时在吃）、c’era（从前有）。',
      how: '和 passato prossimo 的分工：imperfetto 铺背景（天气、年龄、习惯），passato prossimo 讲发生的事。',
      ex: 'Da piccolo abitavo in campagna e giocavo ogni giorno. —— 小时候我住在乡下，每天玩耍。',
      test: c => c.tense('imperf') },
    { id: 'gerundio', name: '副动词（-ando / -endo）与 stare + 副动词', color: '#2f9e44', from: 61,
      desc: '副动词表示同时进行的动作或方式：studiando（边学……）；stare + 副动词 = 正在做：sto mangiando。',
      how: '构成：-are → -ando，-ere / -ire → -endo（parlando, prendendo, dormendo）；stare + 副动词强调“此刻正在”。',
      ex: 'Sto studiando italiano e ascolto musica camminando. —— 我正在学意大利语，边走边听音乐。',
      test: c => c.toks.some(k => (k.cls === 'verb' || k.cls === 'nonf') && k.an && k.an[0] && k.an[0].t === 'ger') },
    { id: 'rel', name: '关系代词（che / cui / il quale）', color: '#ae3ec9', from: 65,
      desc: 'che 连接名词和修饰它的句子：Il libro che leggo（我正在读的书）；介词 + cui：la città in cui vivo（我居住的城市）。',
      how: 'che 既可以是主语也可以是宾语，不变化；介词后面用 cui。先找出 che 前面的名词，再把后半句当作它的“定语”。',
      ex: 'Il libro che ho letto è bello; la città in cui vivo è piccola. —— 我读过的书很好看；我住的城市很小。',
      test: c => c.toks.some((k, i) => (k.w === 'cui') || (k.w === 'che' && (() => {
        const p = prevWordIdx(c.toks, i);
        if (p < 0 || c.toks[p].cls !== '' || ADV_SKIP.has(c.toks[p].w) || ALWAYS_CONJ.has(c.toks[p].w)) return false;
        return !c.toks.slice(0, i).some(x => x.w === 'più' || x.w === 'meno');     // 比较级里的 che：più alti che a Roma
      })())) },
    { id: 'condizionale', name: '条件式（condizionale）：礼貌请求、假设', color: '#1971c2', from: 71,
      desc: '表示礼貌的请求（vorrei, potrebbe）、愿望和假设的结果（se avessi tempo, viaggerei）。',
      how: '构成：将来时词干 + -ei, -esti, -ebbe, -emmo, -este, -ebbero；potrei, dovresti, vorrebbe。',
      ex: 'Potrebbe ripetere, per favore? Vorrei prenotare un tavolo. —— 您能重复一遍吗？我想订个位子。',
      test: c => c.tense('cond') },
    { id: 'congiuntivo', name: '虚拟式（congiuntivo）', color: '#ae3ec9', from: 72,
      desc: '表达观点、怀疑、愿望、不确定的内容，常出现在 penso che / credo che / spero che / è possibile che 之后：Penso che sia vero。',
      how: 'che 后面主语变了，就要考虑虚拟式；现在时：sia, abbia, vada, faccia；过去的虚拟式 -assi / -essi / -issi：se avessi, se fossi。',
      ex: 'Penso che sia una buona idea. Spero che tu stia bene. —— 我觉得这是个好主意。我希望你一切都好。',
      test: c => c.verbs.some(k => !k.part && k.an.some(a => a.m === 'sub') && (k.an.every(a => a.m === 'sub') || (() => {
        const p = prevWordIdx(c.toks, c.toks.indexOf(k)); return p >= 0 && /^(che|benché|sebbene|affinché|purché|se)$/.test(c.toks[p].w);
      })())) },
    { id: 'si_imp', name: 'si 非人称 / 被动：人们……、……被……', color: '#e64980', from: 73,
      desc: 'si + 第三人称动词，表示“人们（一般地）”或“……被……”：si dice（据说）、si mangia bene（吃得好）、si vendono libri（出售书籍）。',
      how: '后面是单数名词用单数动词（si vende un libro），是复数名词用复数动词（si vendono libri）。',
      ex: 'In Italia si mangia molta pasta. Come si dice “再见”? —— 在意大利人们吃很多意面。“再见”怎么说？',
      test: c => c.toks.some((k, i) => k.cls === 'pron' && k.w === 'si' && (() => {
        const j = nextWordIdx(c.toks, i); const t = j >= 0 && c.toks[j];
        return !!t && t.cls === 'verb' && !!t.an && t.an.some(a => (a.p === 2 || a.p === 5) && !REFL.has(a.l));
      })()) },
    { id: 'pass', name: '被动语态（essere / venire + 过去分词）', color: '#e5484d', from: 73,
      desc: 'essere 或 venire + 过去分词，主语是动作的承受者：La porta è chiusa（门被关上了），Il libro viene letto（这本书被读）。',
      how: '施事者用 da 引出：è scritto da Collodi。venire 强调动作过程，essere 强调状态或结果。',
      ex: 'Il biglietto è venduto da un’agenzia; l’offerta viene confermata. —— 票由一家旅行社出售；报价得到确认。',
      test: c => c.ppTokens.some(k => c.toks[k.auxAt] && (c.toks[k.auxAt].an || []).some(a => (a.l === 'essere' || a.l === 'venire')) && !ESSERE_VERBS.has(k.an[0].l)) },
    { id: 'comb', name: '组合代词（me lo, glielo, ce ne…）', color: '#ff6b6b', from: 74,
      desc: '间接代词 + 直接代词连用时，mi / ti / ci / vi 变成 me / te / ce / ve；gli / le 变成 glie- 并和后面连成一个词（glielo）。',
      how: 'Me lo dai?（你把它给我吗？）Glielo dico. 顺序固定：间接在前，直接在后。',
      ex: 'Il libro? Te lo porto domani. Glielo dico io. —— 书吗？我明天带给你。我来告诉他。',
      test: c => c.words.some((w, i) => /^glie(lo|la|li|le|ne)$/.test(w) || (/^(me|te|ce|ve|se)$/.test(w) && /^(lo|la|li|le|ne)$/.test(c.words[i + 1] || ''))) },
    { id: 'cond_if', name: '条件句（se …）', color: '#1c7ed6', from: 75,
      desc: 'se + 直陈式现在时，主句用现在时 / 将来时：Se piove, resto a casa。与现在事实相反：se + 虚拟式未完成过去时，主句用条件式：Se avessi tempo, viaggerei。',
      how: 'se 引导条件；两种句型：可能发生（现在时 + 将来时）；不太可能（虚拟式 imperfetto + 条件式）。',
      ex: 'Se piove, restiamo a casa; se avessi più tempo, viaggerei di più. —— 如果下雨我们就待在家里；如果我有更多时间，我会多去旅行。',
      test: c => c.toks.some((k, i) => k.w === 'se' && k.cls === 'conj' && !(prevWordIdx(c.toks, i) >= 0 && c.toks[prevWordIdx(c.toks, i)].w === 'come') && (i === 0 || !/^(non|mi|ti|ci)$/.test(c.words[0] || ''))) },
  ];

  const BY_ID = Object.fromEntries(POINTS.map(g => [g.id, g]));
  POINTS.sort((a, b) => a.from - b.from);

  /** 这句话里出现了哪些语法点。lesson：第几课（课程里还没讲到的语法点不显示）；toks：已经着色过的结果（可选） */
  function tags(sentence, lesson, toks) {
    toks = toks || colorize(sentence);
    const ctx = ctxOf(sentence, toks);
    const out = [];
    POINTS.forEach(g => {
      if (lesson && g.from > lesson) return;
      let hit = false;
      try { hit = !!g.test(ctx); } catch (e) { hit = false; }
      if (hit) out.push(g);
    });
    return out;
  }

  /** 一课的语法扫描：每个语法点 + 它出现的句子 */
  function scan(sentences, lesson) {
    const cache = sentences.map(s => { const toks = colorize(s.it || s); return { s, tags: tags(s.it || s, lesson, toks) }; });
    return POINTS.filter(g => !lesson || g.from <= lesson)
      .map(g => ({ g, hits: cache.filter(x => x.tags.includes(g)).map(x => x.s) }))
      .filter(x => x.hits.length);
  }

  return { tokenize, colorize, chunks, trunk, verbsOf, difficulty, tags, scan, forms, wordsOf, markVocab, POINTS, byId: BY_ID, Morph, ART, PREP_SIMPLE, PREP_ART, STRONG_CONJ, CLITIC_ZH };
});
