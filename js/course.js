/* 课程数据：注册、解析、查询。浏览器与 Node 通用（UMD）。
 *
 * 数据文件只需要写"紧凑格式"（见 docs/DATA_FORMAT.md）。本模块把它解析成程序可用的对象，
 * 并提供：按天查询、岛屿/阶段信息、词汇索引、复习卡片、全部需要朗读的文本清单。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./italian.js'));
  else root.Course = factory(root.Ita);
})(typeof self !== 'undefined' ? self : this, function (Ita) {
  'use strict';

  const state = { meta: null, raw: {}, cache: {}, seen: null };

  // ---------- 紧凑格式解析 ----------

  function lines(s) {
    // 既接受多行字符串，也接受字符串数组（语法例句 eg 写成数组）
    const raw = Array.isArray(s) ? s.map(String) : String(s || '').split('\n');
    return raw.map(x => x.trim()).filter(x => x && !x.startsWith('#'));
  }

  /** "意大利语 | 中文 | 备注" → {it, zh, x} */
  function pair(line) {
    const p = line.split(/\s+\|\s+/);
    return { it: (p[0] || '').trim(), zh: (p[1] || '').trim(), x: (p[2] || '').trim() };
  }

  /** "标签: 意大利语 | 中文" → {who, it, zh} */
  function parseDlg(str) {
    return lines(str).map((ln, i) => {
      const m = ln.match(/^([^:|]{1,24}):\s+(.*)$/);
      const who = m ? m[1].trim() : '';
      const p = pair(m ? m[2] : ln);
      return { i, who, it: p.it, zh: p.zh };
    });
  }

  function parseVocab(str) {
    return lines(str).map((ln, i) => {
      const p = pair(ln);
      return { i, it: p.it, zh: p.zh, ph: p.x };
    });
  }

  function parsePairs(str) {
    return lines(str).map((ln, i) => { const p = pair(ln); return { i, it: p.it, zh: p.zh, x: p.x }; });
  }

  /** 阅读短文：段落以空行分隔，每行 "意大利语 | 中文" */
  function parseText(str) {
    return String(str || '').split(/\n\s*\n/).map(par => parsePairs(par)).filter(p => p.length);
  }

  /** 题目 [题干, [选项], 正确序号, 解析, 朗读文本?] */
  function parseQuiz(arr, tag) {
    return (arr || []).map((q, i) => ({
      id: tag + i, q: q[0], opts: q[1], ans: q[2], why: q[3] || '', audio: q[4] || '',
    }));
  }

  function parseGram(arr) {
    return (arr || []).map(g => ({
      h: g.h, p: g.p || [], t: g.t || null, eg: g.eg ? parsePairs(g.eg) : [], note: g.note || '',
    }));
  }

  function parseDay(r) {
    const d = {
      n: r.n, it: r.it, zh: r.zh, goal: r.goal || '', scene: r.scene || '',
      dlg: parseDlg(r.dlg), vocab: parseVocab(r.vocab),
      q: parseQuiz(r.q, 'q'),
      pron: r.pron ? {
        t: r.pron.t || '', tips: r.pron.tips || [], drill: parsePairs(r.pron.drill),
        twister: r.pron.twister ? pair(r.pron.twister) : null,
      } : null,
      gram: parseGram(r.gram),
      culture: r.culture || '',
      quiz: parseQuiz(r.quiz, 'k'),
      speak: parsePairs(r.speak),
      wr: r.wr ? { task: r.wr[0], it: r.wr[1], zh: r.wr[2] || '' } : null,
      text: r.text ? { title: r.text.title || '', paras: parseText(r.text.body) } : null,
      rq: parseQuiz(r.rq, 'r'),
      key: r.key || null,
      test: !!r.test, exam: !!r.exam,
    };
    // 关键句：作者指定，否则自动挑 2 句 3–8 个词的对话行
    if (!d.key) {
      const cand = d.dlg.filter(l => { const n = l.it.split(/\s+/).length; return n >= 3 && n <= 8; });
      d.key = cand.slice(0, 2).map(l => l.i);
    }
    return d;
  }

  // ---------- 注册与查询 ----------

  function setMeta(m) { state.meta = m; state.cache = {}; state.seen = null; }

  function add(list) {
    (Array.isArray(list) ? list : [list]).forEach(r => { state.raw[r.n] = r; delete state.cache[r.n]; });
    state.seen = null;
  }

  function has(n) { return !!state.raw[n]; }

  function day(n) {
    if (!state.raw[n]) return null;
    if (!state.cache[n]) state.cache[n] = parseDay(state.raw[n]);
    return state.cache[n];
  }

  function total() { return state.meta ? state.meta.total : 90; }
  function meta() { return state.meta; }

  function islandOf(n) {
    return state.meta.islands.find(i => n >= i.days[0] && n <= i.days[1]) || null;
  }
  function phaseOf(n) {
    return state.meta.phases.find(p => n >= p.days[0] && n <= p.days[1]) || null;
  }
  function islandDays(id) {
    const i = state.meta.islands.find(x => x.id === id);
    const out = [];
    for (let n = i.days[0]; n <= i.days[1]; n++) out.push(n);
    return out;
  }

  // 词汇首次出现的天（意大利语 + 释义都相同才算同一个词；sei=六 与 sei=你是 是两张卡）
  const vkey = v => Ita.norm(v.it, true) + '|' + v.zh;
  function firstSeen() {
    if (!state.seen) {
      state.seen = new Map();
      for (let n = 1; n <= total(); n++) {
        const d = day(n);
        if (d) d.vocab.forEach(v => { const k = vkey(v); if (!state.seen.has(k)) state.seen.set(k, n); });
      }
    }
    return state.seen;
  }

  /** 这个词条第一次出现在第几天（复习卡只在那一天生成） */
  function firstDayOf(v) { return firstSeen().get(vkey(v)); }

  /** 词汇 / 关键句索引 → 复习卡片（重复出现的词只在首次出现的那天生成卡片） */
  function cardsOf(n) {
    const d = day(n);
    if (!d) return [];
    const seen = firstSeen();
    const cards = d.vocab.filter(v => seen.get(vkey(v)) === n).map(v => ({ id: 'v:' + n + ':' + v.i, kind: 'v', day: n, it: v.it, zh: v.zh, ph: v.ph }));
    d.key.forEach(i => {
      const l = d.dlg[i];
      if (l) cards.push({ id: 's:' + n + ':' + i, kind: 's', day: n, it: l.it, zh: l.zh, ph: '' });
    });
    return cards;
  }

  function cardById(id) {
    const [kind, ds, is] = id.split(':');
    if (kind !== 'v' && kind !== 's') return null;
    const d = day(+ds);
    if (!d) return null;
    if (kind === 'v') { const v = d.vocab[+is]; return v ? { id, kind, day: +ds, it: v.it, zh: v.zh, ph: v.ph } : null; }
    const l = d.dlg[+is];
    return l ? { id, kind, day: +ds, it: l.it, zh: l.zh, ph: '' } : null;
  }

  /** 词汇释义表：规范化词(组) → {it, zh}；累计到第 upTo 天，先出现者优先 */
  function gloss(upTo) {
    const map = new Map();
    for (let n = 1; n <= upTo; n++) {
      const d = day(n);
      if (!d) continue;
      d.vocab.forEach(v => {
        const k = Ita.norm(v.it, true); // 保留重音：è ≠ e，sì ≠ si
        if (k && !map.has(k)) map.set(k, v);
      });
    }
    return map;
  }

  /** 全部需要朗读的意大利语文本（去重），用于批量生成音频 */
  function speakables(pron) {
    const set = new Map(); // key → source
    const put = (t, src) => {
      const k = Ita.speakKey(t);
      if (k && !set.has(k)) set.set(k, src);
    };
    for (let n = 1; n <= total(); n++) {
      const d = day(n);
      if (!d) continue;
      const s = 'd' + n;
      d.dlg.forEach(l => put(l.it, s));
      d.vocab.forEach(v => put(v.it, s));
      if (d.text) d.text.paras.forEach(p => p.forEach(l => put(l.it, s)));
      d.gram.forEach(g => g.eg.forEach(e => put(e.it, s)));
      if (d.pron) { d.pron.drill.forEach(w => put(w.it, s)); if (d.pron.twister) put(d.pron.twister.it, s); }
      d.speak.forEach(x => put(x.it, s));
      if (d.wr) String(d.wr.it).split('\n').forEach(x => put(x, s));
      d.q.concat(d.quiz, d.rq).forEach(q => { if (q.audio) put(q.audio, s); });
    }
    if (pron) pron.forEach(x => put(x.say || x.it, 'lab'));
    return Array.from(set, ([text, src]) => ({ text, src }));
  }

  return {
    setMeta, add, has, day, total, meta, islandOf, phaseOf, islandDays,
    cardsOf, cardById, firstDayOf, gloss, speakables,
    _parse: { lines, pair, parseDlg, parseVocab, parseText, parseQuiz, parseDay },
  };
});
