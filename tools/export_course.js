#!/usr/bin/env node
'use strict';
/* 把课程数据导出成 JSON，供 Python 工具（拼写质检、音频生成）使用。
 * 用法：node tools/export_course.js [输出文件，默认 build/course.json]
 * 输出：{ texts: [{text, src}], strings: [{where, text}], pairs: [{a, b}] }
 *   texts   —— 需要朗读的全部意大利语文本（去重），用于生成音频
 *   strings —— 所有意大利语文本及其位置，用于拼写检查
 *   pairs   —— 发音实验室的最小对立词，用于挑选对比明显的录音（tools/refine_pairs.py） */
const fs = require('fs');
const path = require('path');
const { loadCourse, loadPron, labTexts, ROOT } = require(path.resolve(__dirname, '../tests/helpers.js'));
const Course = loadCourse();

const out = process.argv[2] || path.join(ROOT, 'build/course.json');
const pron = loadPron();
const texts = Course.speakables(labTexts(pron));

const strings = [];
const put = (where, t) => { if (t && String(t).trim()) strings.push({ where, text: String(t) }); };
for (let n = 1; n <= Course.total(); n++) {
  const d = Course.day(n);
  if (!d) continue;
  put('d' + n + ':title', d.it);
  d.dlg.forEach(l => put('d' + n + ':dlg' + (l.i + 1), l.it));
  d.vocab.forEach(v => put('d' + n + ':vocab' + (v.i + 1), v.it));
  if (d.text) d.text.paras.forEach((p, pi) => p.forEach(l => put('d' + n + ':text' + pi + '.' + l.i, l.it)));
  d.gram.forEach(g => { g.eg.forEach(e => put('d' + n + ':gram-eg', e.it)); if (g.t) g.t.forEach(r => r.forEach(c => { if (/[A-Za-zÀ-ÿ]/.test(c) && !/[㐀-鿿]/.test(c) && !/^[/\\]/.test(c)) put('d' + n + ':gram-table', c); })); });
  if (d.pron) { d.pron.drill.forEach(w => put('d' + n + ':drill', w.it)); if (d.pron.twister) put('d' + n + ':twister', d.pron.twister.it); }
  d.speak.forEach(s => put('d' + n + ':speak', s.it));
  if (d.wr) String(d.wr.it).split('\n').forEach(x => put('d' + n + ':wr', x));
  d.q.concat(d.quiz, d.rq).forEach(q => { if (q.audio) put('d' + n + ':q-audio', q.audio); q.opts.forEach(o => { if (!/[㐀-鿿]/.test(o)) put('d' + n + ':q-opt', o); }); if (!/[㐀-鿿]/.test(q.q)) put('d' + n + ':q', q.q); });
}

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify({ texts, strings, pairs: pron.pairs.map(p => ({ a: p.a, b: p.b })) }, null, 0));
console.log('已导出：' + texts.length + ' 条朗读文本，' + strings.length + ' 条意大利语文本 → ' + path.relative(ROOT, out));
