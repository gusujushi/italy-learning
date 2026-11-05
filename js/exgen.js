/* 练习自动生成：由当天的对话、词汇、手写题目生成各类题型。UMD。
 *
 * 题型（type）：mcq 选择 | dict 听写 | order 排序 | cloze 选择填空 | clozeType 键入填空 | translate 中译意 | match 配对
 * 能力（skill）：listen | speak | read | write | know
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./italian.js'), require('./course.js'));
  else root.ExGen = factory(root.Ita, root.Course);
})(typeof self !== 'undefined' ? self : this, function (Ita, Course) {
  'use strict';

  const STOP = new Set(('il lo la i gli le un uno una di a da in con su per tra fra e ed o ma che non mi ti si ci vi ne ' +
    'è sono sei ho hai ha al del dal nel sul alla della dalla allo dello nella sulla ai dei dai nei sui alle delle dalle ' +
    'nelle sulle mio tuo suo questo quello come dove quando anche molto più').split(' '));

  function rnd0() { return Math.random(); }

  function pick(arr, k, rnd, exclude) {
    const a = Ita.shuffle(arr.filter(x => !exclude || !exclude(x)), rnd);
    return a.slice(0, k);
  }

  /** 词汇池：给定若干天的所有词汇 */
  function vocabPool(days) {
    const out = [];
    days.forEach(d => d.vocab.forEach(v => out.push(Object.assign({ day: d.n }, v))));
    return out;
  }

  /** 邻近天作为干扰项来源（当天词不足时补充） */
  function neighbours(d, span) {
    const ds = [d];
    for (let k = 1; k <= span; k++) {
      [d.n - k, d.n + k].forEach(n => { const x = Course.day(n); if (x) ds.push(x); });
    }
    return ds;
  }

  function mkOptions(correct, pool, key, rnd, k) {
    const seen = new Set([correct[key]]);
    const wrong = [];
    Ita.shuffle(pool, rnd).forEach(v => {
      if (wrong.length >= k - 1) return;
      const val = v[key];
      if (!val || seen.has(val)) return;
      seen.add(val); wrong.push(val);
    });
    const opts = Ita.shuffle([correct[key]].concat(wrong), rnd);
    return { opts, ans: opts.indexOf(correct[key]) };
  }

  // ---------- 单题生成器 ----------

  function listenChoose(v, pool, rnd, tag) {
    const o = mkOptions(v, pool, 'zh', rnd, 4);
    return { id: 'lc:' + tag, type: 'mcq', skill: 'listen', prompt: '听音频，选出正确的意思', audio: v.it, hidden: true,
      opts: o.opts, ans: o.ans, why: v.it + ' = ' + v.zh };
  }

  function vocabChoose(v, pool, rnd, tag) {
    const o = mkOptions(v, pool, 'it', rnd, 4);
    return { id: 'vc:' + tag, type: 'mcq', skill: 'read', prompt: '「' + v.zh + '」用意大利语怎么说？', audio: '',
      opts: o.opts, ans: o.ans, why: v.it + ' = ' + v.zh, speakOnResult: v.it };
  }

  function match(vs, tag) {
    return { id: 'mt:' + tag, type: 'match', skill: 'read', prompt: '把意大利语和中文配成对',
      pairs: vs.map(v => [v.it, v.zh]) };
  }

  function dictation(l, tag) {
    return { id: 'dc:' + tag, type: 'dict', skill: 'listen', prompt: '听音频，写下你听到的句子', audio: l.it, target: l.it, zh: l.zh };
  }

  function order(l, rnd, tag) {
    const toks = Ita.displayTokens(l.it);
    let sh = Ita.shuffle(toks, rnd), tries = 0;
    while (sh.join(' ') === toks.join(' ') && tries++ < 8) sh = Ita.shuffle(toks, rnd);
    return { id: 'od:' + tag, type: 'order', skill: 'write', prompt: '把单词按正确顺序排好', zh: l.zh,
      target: l.it, tokens: sh, audio: l.it };
  }

  function translate(l, tag) {
    return { id: 'tr:' + tag, type: 'translate', skill: 'write', prompt: '把这句话翻译成意大利语', zh: l.zh, target: l.it, audio: l.it };
  }

  /** 选出要挖空的词 */
  function blankIndex(toks, rnd) {
    const info = toks.map((t, i) => { const c = Ita.wordParts(t)[1]; return { i, core: c, n: Ita.norm(c) }; });
    let cand = info.filter(x => x.core.length >= 4 && !STOP.has(x.n));
    if (!cand.length) cand = info.filter(x => x.core.length >= 3 && !STOP.has(x.n));
    if (!cand.length) return -1;
    const max = Math.max.apply(null, cand.map(x => x.core.length));
    const top = cand.filter(x => x.core.length >= max - 2);
    return top[Math.floor(rnd() * top.length)].i;
  }

  function cloze(l, wordPool, rnd, tag, typed) {
    const toks = Ita.displayTokens(l.it);
    const bi = blankIndex(toks, rnd);
    if (bi < 0 || toks.length < 3) return null;
    const parts = Ita.wordParts(toks[bi]);
    const answer = parts[1];
    const shown = toks.map((t, i) => (i === bi ? parts[0] + '＿＿＿＿' + parts[2] : t)).join(' ');
    if (typed) {
      return { id: 'ct:' + tag, type: 'clozeType', skill: 'write', prompt: '补全句子中缺少的单词', sentence: shown,
        zh: l.zh, answer, target: l.it, audio: l.it };
    }
    const lenOk = w => Math.abs(w.length - answer.length) <= 3 && Ita.norm(w) !== Ita.norm(answer);
    const cands = Array.from(new Set(wordPool.filter(lenOk)));
    const wrong = pick(cands, 3, rnd);
    if (wrong.length < 3) return null;
    const opts = Ita.shuffle([answer].concat(wrong), rnd);
    return { id: 'cz:' + tag, type: 'cloze', skill: 'read', prompt: '选出合适的单词填入空格', sentence: shown, zh: l.zh,
      opts, ans: opts.indexOf(answer), why: l.it, audio: l.it };
  }

  function fromQuiz(q, skill) {
    const o = { id: q.id, type: 'mcq', skill, prompt: q.q, opts: q.opts, ans: q.ans, why: q.why };
    if (q.audio) { o.audio = q.audio; o.hidden = true; }
    return o;
  }

  // ---------- 组合 ----------

  function eligible(lines, minW, maxW) {
    return lines.filter(l => { const n = l.it.split(/\s+/).length; return n >= minW && n <= maxW; });
  }

  function wordsOf(days) {
    const w = [];
    days.forEach(d => {
      d.dlg.forEach(l => Ita.displayTokens(l.it).forEach(t => { const c = Ita.wordParts(t)[1]; if (c.length >= 3) w.push(c); }));
      d.vocab.forEach(v => { if (!/\s/.test(v.it)) w.push(v.it); });
    });
    return w;
  }

  /** 为一组天生成所有候选题，按类型分桶 */
  function buckets(days, rnd, mainDay) {
    const pool = vocabPool(days.length < 3 && mainDay ? neighbours(mainDay, 2) : days);
    const words = wordsOf(days);
    const lines = [];
    days.forEach(d => d.dlg.forEach(l => lines.push(Object.assign({ day: d.n }, l))));
    const B = { lc: [], vc: [], mt: [], dc: [], od: [], tr: [], cz: [], ct: [], qz: [], lq: [], rq: [] };
    const vs = Ita.shuffle(vocabPool(days), rnd);
    vs.forEach(v => {
      B.lc.push(listenChoose(v, pool, rnd, v.day + '.' + v.i));
      B.vc.push(vocabChoose(v, pool, rnd, v.day + '.' + v.i));
    });
    for (let k = 0; k + 5 <= vs.length; k += 5) B.mt.push(match(vs.slice(k, k + 5), vs[k].day + '.' + k));
    Ita.shuffle(eligible(lines, 2, 12), rnd).forEach(l => B.dc.push(dictation(l, l.day + '.' + l.i)));
    Ita.shuffle(eligible(lines, 3, 9), rnd).forEach(l => B.od.push(order(l, rnd, l.day + '.' + l.i)));
    Ita.shuffle(eligible(lines, 3, 14), rnd).forEach(l => B.tr.push(translate(l, l.day + '.' + l.i)));
    Ita.shuffle(eligible(lines, 3, 12), rnd).forEach(l => {
      const c = cloze(l, words, rnd, l.day + '.' + l.i, false); if (c) B.cz.push(c);
      const t = cloze(l, words, rnd, l.day + '.' + l.i, true); if (t) B.ct.push(t);
    });
    days.forEach(d => {
      d.quiz.forEach(q => B.qz.push(fromQuiz(q, 'know')));
      d.q.forEach(q => B.lq.push(fromQuiz(q, 'listen')));
      d.rq.forEach(q => B.rq.push(fromQuiz(q, 'read')));
    });
    return B;
  }

  function take(b, key, n, used) {
    const out = [];
    for (const e of b[key]) {
      if (out.length >= n) break;
      if (used.has(e.id)) continue;
      used.add(e.id); out.push(e);
    }
    return out;
  }

  /** 按配方取题；不足的用 filler 类型补足 */
  function compose(b, recipe, filler, size) {
    const used = new Set();
    let out = [];
    Object.keys(recipe).forEach(k => { out = out.concat(take(b, k, recipe[k], used)); });
    for (const k of filler) {
      if (out.length >= size) break;
      out = out.concat(take(b, k, size - out.length, used));
    }
    return out.slice(0, size);
  }

  const FILL = ['vc', 'lc', 'cz', 'dc', 'od', 'tr', 'qz', 'ct', 'mt'];

  // ---------- 对外接口 ----------

  /** 每日小测（10 题） */
  function dayTest(n, rnd, size) {
    const d = Course.day(n);
    rnd = rnd || rnd0; size = size || 10;
    const b = buckets([d], rnd, d);
    return compose(b, { lc: 2, vc: 2, cz: 2, dc: 1, od: 1, tr: 1, qz: 1 }, FILL, size);
  }

  /** 一组课（课号列表）的综合测验：复习日、岛屿关卡、阶段毕业考都用它。size 默认 20 题 */
  function listTest(nums, rnd, size) {
    rnd = rnd || rnd0; size = size || 20;
    const days = nums.map(n => Course.day(n)).filter(Boolean);
    const b = buckets(days, rnd);
    const k = size / 20;
    return compose(b, { lc: Math.round(3 * k), vc: Math.round(3 * k), cz: Math.round(3 * k), dc: Math.round(3 * k),
      od: Math.round(2 * k), tr: Math.round(2 * k), qz: Math.round(3 * k), mt: 1 }, FILL, size);
  }

  /** 岛屿关卡（20 题）/ 阶段毕业考（30 题）：覆盖该范围的所有天 */
  function rangeTest(from, to, rnd, size) {
    const nums = [];
    for (let n = from; n <= to; n++) nums.push(n);
    return listTest(nums, rnd, size);
  }

  /** 词汇小练习：配对 ×1、看中文选意语 ×3、听音选义 ×2 */
  function wordSet(n, rnd) {
    const d = Course.day(n); rnd = rnd || rnd0;
    const b = buckets([d], rnd, d);
    return b.mt.slice(0, 1).concat(b.vc.slice(0, 3), b.lc.slice(0, 2));
  }

  /** 听 · 理解题（手写） */
  function listenQs(n) { return Course.day(n).q.map(q => fromQuiz(q, 'listen')); }

  /** 阅读理解题（手写，只有带短文的课才有） */
  function readQs(n) { return Course.day(n).rq.map(q => fromQuiz(q, 'read')); }

  /** 读 · 配对 + 阅读理解题 */
  function readSet(n, rnd) {
    const d = Course.day(n); rnd = rnd || rnd0;
    const b = buckets([d], rnd, d);
    return b.mt.slice(0, 1).concat(d.rq.map(q => fromQuiz(q, 'read')), b.vc.slice(0, 3));
  }

  /** 学 · 知识小测（手写） */
  function learnQuiz(n) { return Course.day(n).quiz.map(q => fromQuiz(q, 'know')); }

  /** 写 · 听写×3 + 排序×2 + 键入填空×2 + 翻译×3 */
  function writeSet(n, rnd) {
    const d = Course.day(n); rnd = rnd || rnd0;
    const b = buckets([d], rnd, d);
    return compose(b, { dc: 3, od: 2, ct: 2, tr: 3 }, ['tr', 'dc', 'od', 'ct'], 10);
  }

  return {
    dayTest, rangeTest, listTest, wordSet, listenQs, readQs, readSet, learnQuiz, writeSet,
    _x: { listenChoose, vocabChoose, dictation, order, translate, cloze, blankIndex, buckets, compose, fromQuiz, mkOptions },
  };
});
