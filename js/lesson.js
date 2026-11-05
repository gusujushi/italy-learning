/* 一课（一天内容）的辅助函数：纯函数，UMD，可在 Node 里测试。
 * 课文行展开、词汇的课文例句、学习计划用的分量与用时、生词本的卡片编号。 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./italian.js'), require('./course.js'), require('./grammar.js'));
  else root.Lesson = factory(root.Ita, root.Course, root.Grammar);
})(typeof self !== 'undefined' ? self : this, function (Ita, Course, Grammar) {
  'use strict';

  /** 一课的所有"课文行"：先对话，再阅读短文。kind: 'dlg' | 'text'；i 是在整课里的序号 */
  function lines(n) {
    const d = Course.day(n);
    if (!d) return [];
    const out = [];
    d.dlg.forEach(l => out.push({ i: out.length, kind: 'dlg', who: l.who, it: l.it, zh: l.zh, src: l.i }));
    if (d.text) {
      d.text.paras.forEach((p, pi) => p.forEach((l, li) => out.push({ i: out.length, kind: 'text', who: '', it: l.it, zh: l.zh, para: pi, pstart: li === 0 && pi > 0, src: l.i })));
    }
    return out;
  }

  const words = s => (String(s).toLowerCase().replace(/’/g, "'").match(/[a-zàèéìíòóùú]+'?/g) || []);

  /** 句子 sentence 里有没有词条 v（单词按性数变化匹配，词组按连续词匹配，不定式按任意变位匹配） */
  function contains(sentence, v) {
    const parts = words(v.it);
    if (!parts.length) return false;
    const ws = words(sentence);
    if (parts.length === 1) {
      const fs = Grammar.forms(parts[0]);
      if (ws.some(w => fs.has(w) || fs.has(w.replace(/'$/, '')))) return true;
      if (/(are|ere|ire|rre)$/.test(parts[0])) {
        const Morph = Grammar.Morph;
        return ws.some(w => Morph.analyze(w).some(a => a.l === parts[0]));
      }
      return false;
    }
    for (let s = 0; s + parts.length <= ws.length; s++) if (parts.every((p, k) => ws[s + k].replace(/'$/, '') === p.replace(/'$/, ''))) return true;
    return false;
  }

  /** 词条 v 在这一课课文里的第一个例句（找不到返回 null）；词条本身就是整句时不算例句 */
  function exampleFor(n, v) {
    const own = Ita.norm(v.it);
    const hit = lines(n).find(l => Ita.norm(l.it) !== own && contains(l.it, v));
    return hit ? hit.it : null;
  }

  /** 一课的内容分量（越大越重）：词汇、对话字数、短文字数、语法讲解、发音、题目 */
  function volume(n) {
    const d = Course.day(n);
    if (!d) return 0;
    const dw = d.dlg.reduce((s, l) => s + l.it.split(/\s+/).length, 0);
    const tw = d.text ? d.text.paras.reduce((s, p) => s + p.reduce((a, l) => a + l.it.split(/\s+/).length, 0), 0) : 0;
    return d.vocab.length + dw / 6 + tw / 9 + d.gram.length * 2.5 + (d.pron ? 3 : 0) + d.q.length * 0.5 + d.quiz.length * 0.4;
  }

  /** 学习计划用的课程表：[{id, n, w, min, group}] */
  function planUnits(phases) {
    const out = [];
    for (let n = 1; n <= Course.total(); n++) {
      if (!Course.has(n)) continue;
      const ph = Course.phaseOf(n);
      if (phases && phases.indexOf(ph.id) < 0) continue;
      const v = volume(n);
      out.push({ id: n, n, w: v, min: Math.round(v * 1.4), group: ph.id });
    }
    return out;
  }

  /** 一课的"导读"：场景、目标、听前问题、读法建议 */
  function guide(n) {
    const d = Course.day(n), ph = Course.phaseOf(n);
    return { scene: d.scene, goal: d.goal, q: ph.q || '', bg: ph.bg || '' };
  }

  /** 生词本里这一条词汇对应的卡片编号：重复出现的词只在第一次出现的那天有卡片 */
  function cardIdOfEntry(v) {
    if (!v) return null;
    const first = Course.firstDayOf(v);
    const fd = Course.day(first);
    if (!fd) return null;
    const j = fd.vocab.findIndex(x => Ita.norm(x.it, true) === Ita.norm(v.it, true) && x.zh === v.zh);
    return j < 0 ? null : 'v:' + first + ':' + j;
  }
  function cardIdOfVocab(n, i) {
    const d = Course.day(n);
    return cardIdOfEntry(d && d.vocab[i]);
  }

  /** 生词本卡片：先按课程的词汇 / 关键句解析，找不到再按"整课第 i 行"解析（课文里的句子也可以收藏） */
  function cardById(id) {
    const c = Course.cardById(id);
    if (c) return c;
    const p = String(id).split(':');
    if (p[0] !== 's') return null;
    const l = lines(+p[1])[+p[2]];
    return l ? { id, kind: 's', day: +p[1], it: l.it, zh: l.zh, ph: '' } : null;
  }
  const sentenceCardId = (n, i) => 's:' + n + ':' + i;

  /** 词的释义查找：累计到第 n 课的词汇表，按原形、阴阳性单复数、动词变位逐级查 */
  const glossCache = new Map();
  function glossFor(n) {
    if (glossCache.has(n)) return glossCache.get(n);
    const idx = new Map();
    const put = (k, v) => {
      if (!idx.has(k)) idx.set(k, v);
      Grammar.forms(k).forEach(f => { if (!idx.has(f)) idx.set(f, v); });
    };
    const entries = Array.from(Course.gloss(n));
    // 先放单词条目，再放"冠词 + 名词"条目的名词（un caffè → caffè），这样单词本身的释义优先
    entries.forEach(([k, v]) => { if (!/\s/.test(k)) put(k, v); });
    entries.forEach(([k, v]) => {
      const m = k.match(/^(?:il|lo|la|i|gli|le|un|uno|una)\s+(\S+)$/) || k.match(/^(?:l|un)'(\S+)$/);
      if (m) put(m[1], v);
    });
    const Morph = Grammar.Morph;
    const g = {
      /** 词（已小写）→ 词条 {i,it,zh,ph} 或 null */
      lookup(w) {
        w = String(w).toLowerCase().replace(/’/g, "'");
        const bare = w.replace(/'$/, '');
        if (idx.has(w)) return idx.get(w);
        if (idx.has(bare)) return idx.get(bare);
        const an = Morph.analyze(bare);
        for (let i = 0; i < an.length; i++) if (idx.has(an[i].l)) return idx.get(an[i].l);
        return null;
      },
    };
    glossCache.set(n, g);
    return g;
  }

  /** 每课最长的几个句子（长难句攻坚） */
  function longest(n, k) {
    return lines(n).filter(l => l.kind !== 'text' || true).slice().sort((a, b) => Grammar.difficulty(b.it).words - Grammar.difficulty(a.it).words).slice(0, k || 3);
  }

  return { lines, contains, exampleFor, volume, planUnits, guide, cardIdOfEntry, cardIdOfVocab, cardById, sentenceCardId, glossFor, longest };
});
