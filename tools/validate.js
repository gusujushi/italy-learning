#!/usr/bin/env node
'use strict';
/* 课程数据结构校验。用法：node tools/validate.js [--strict]
 * 检查：天数连续、岛屿/关卡标记、必填字段、对话与词汇格式、题目答案序号、表格列数、中意文字是否放反。
 * 有 error 时退出码为 1；--strict 时 warning 也视为失败。 */
const path = require('path');
const { loadCourse } = require(path.resolve(__dirname, '../tests/helpers.js'));
const Course = loadCourse();
const Ita = global.Ita;

const strict = process.argv.includes('--strict');
const errors = [], warns = [];
const E = (d, m) => errors.push('Day ' + d + ': ' + m);
const W = (d, m) => warns.push('Day ' + d + ': ' + m);
const CJK = /[㐀-鿿]/;
const total = Course.total();
const meta = Course.meta();

let present = 0, stats = { lines: 0, vocab: 0, quiz: 0, q: 0, words: 0 };
const seenVocab = new Map();

for (let n = 1; n <= total; n++) {
  if (!Course.has(n)) { E(n, '缺少这一天的数据'); continue; }
  present++;
  let d;
  try { d = Course.day(n); } catch (e) { E(n, '解析失败：' + e.message); continue; }

  // 标记
  const isl = Course.islandOf(n);
  const lastOfIsland = isl && n === isl.days[1];
  if (lastOfIsland !== d.test) E(n, lastOfIsland ? '每座岛的第 10 天应设 test: true' : '非岛屿末日不应设 test');
  const isExam = meta.phases.some(p => p.days[1] === n);
  if (isExam !== d.exam) E(n, isExam ? '阶段末日应设 exam: true' : '非阶段末日不应设 exam');

  // 必填
  ['it', 'zh', 'goal', 'scene'].forEach(k => { if (!d[k] || !String(d[k]).trim()) E(n, '缺少 ' + k); });
  if (d.it && CJK.test(d.it)) E(n, '标题 it 含汉字');
  if (d.zh && !CJK.test(d.zh)) W(n, '标题 zh 不含汉字');
  if (!d.culture) W(n, '缺少 culture');
  if (!d.wr) E(n, '缺少 wr（写作任务）');
  else { if (!d.wr.task || !d.wr.it) E(n, 'wr 需要 [任务, 示范意文, 示范中文]'); if (d.wr.it && CJK.test(d.wr.it)) E(n, 'wr 示范意文含汉字'); if (!d.wr.zh) W(n, 'wr 缺少中文翻译'); }

  // 对话
  if (d.dlg.length < 5) E(n, '对话少于 5 句（' + d.dlg.length + '）');
  if (d.dlg.length > 14) W(n, '对话超过 14 句（' + d.dlg.length + '），建议拆分');
  d.dlg.forEach(l => {
    if (!l.who) E(n, '对话第 ' + (l.i + 1) + ' 句缺少角色');
    if (!l.it) E(n, '对话第 ' + (l.i + 1) + ' 句缺少意大利语');
    if (!l.zh) E(n, '对话第 ' + (l.i + 1) + ' 句缺少中文');
    if (CJK.test(l.it)) E(n, '对话第 ' + (l.i + 1) + ' 句的意大利语里有汉字（是否把中意放反了？）：' + l.it);
    if (l.zh && !CJK.test(l.zh)) W(n, '对话第 ' + (l.i + 1) + ' 句中文里没有汉字：' + l.zh);
    stats.lines++; stats.words += l.it.split(/\s+/).length;
  });
  const roles = new Set(d.dlg.map(l => l.who));
  if (roles.size < 2) W(n, '对话角色少于 2 个');
  d.key.forEach(i => { if (!d.dlg[i]) E(n, 'key 索引越界：' + i); });

  // 词汇
  if (d.vocab.length < 8) E(n, '词汇少于 8 个（' + d.vocab.length + '）');
  if (d.vocab.length > 30) W(n, '词汇超过 30 个（' + d.vocab.length + '）');
  const vset = new Set();
  d.vocab.forEach(v => {
    if (!v.it || !v.zh) E(n, '词汇缺少 it 或 zh：' + JSON.stringify(v));
    if (CJK.test(v.it)) E(n, '词汇意大利语含汉字：' + v.it);
    if (v.zh && !CJK.test(v.zh)) W(n, '词汇中文不含汉字：' + v.it + ' | ' + v.zh);
    if (v.ph && !/[A-ZÀÈÉÌÒÙ]/.test(v.ph)) W(n, '重音提示没有大写音节：' + v.it + ' | ' + v.ph);
    const k = Ita.norm(v.it, true);
    if (vset.has(k)) E(n, '当天词汇重复：' + v.it);
    vset.add(k);
    if (seenVocab.has(k) && seenVocab.get(k) !== n) W(n, '词汇「' + v.it + '」与第 ' + seenVocab.get(k) + ' 天重复');
    else seenVocab.set(k, n);
    stats.vocab++;
  });

  // 题目
  const checkQ = (arr, tag, min) => {
    if (arr.length < min) E(n, tag + ' 题目少于 ' + min + ' 道（' + arr.length + '）');
    arr.forEach((q, i) => {
      const where = tag + '#' + (i + 1);
      if (!q.q) E(n, where + ' 缺少题干');
      if (!Array.isArray(q.opts) || q.opts.length < 2 || q.opts.length > 4) E(n, where + ' 选项数应为 2–4');
      else {
        if (!(q.ans >= 0 && q.ans < q.opts.length)) E(n, where + ' 答案序号越界：' + q.ans);
        if (new Set(q.opts).size !== q.opts.length) E(n, where + ' 选项重复');
      }
      if (!q.why) W(n, where + ' 缺少解析');
    });
  };
  checkQ(d.q, 'q', 2); checkQ(d.quiz, 'quiz', 3); checkQ(d.rq, 'rq', 0);
  stats.quiz += d.quiz.length; stats.q += d.q.length;

  // 口语
  if (d.speak.length < 3) E(n, '口语任务少于 3 条');
  d.speak.forEach(s => { if (!s.it || !s.zh) E(n, '口语任务需要「意大利语 | 提示」'); if (CJK.test(s.it)) E(n, '口语任务意大利语含汉字：' + s.it); });

  // 知识
  if (!d.gram.length) E(n, '缺少 gram（语法/知识点）');
  d.gram.forEach(g => {
    if (!g.h) E(n, 'gram 缺少标题');
    if (g.t) {
      const cols = g.t[0].length;
      g.t.forEach((r, i) => { if (r.length !== cols) E(n, '表格「' + g.h + '」第 ' + (i + 1) + ' 行列数 ' + r.length + ' ≠ 表头 ' + cols); });
    }
    g.eg.forEach(e => { if (!e.it || !e.zh) E(n, 'gram 例句需要「意大利语 | 中文」'); });
  });

  // 发音
  if (n <= 30 && !d.pron) E(n, '阶段一每天都应有 pron（发音小练习）');
  if (d.pron) {
    if (!d.pron.tips.length) W(n, 'pron 没有 tips');
    d.pron.drill.forEach(w => { if (CJK.test(w.it)) E(n, 'pron.drill 意大利语含汉字：' + w.it); });
  }

  // 阅读短文
  if (d.text) {
    d.text.paras.forEach(p => p.forEach(l => { if (!l.it || !l.zh) E(n, 'text 每行需要「意大利语 | 中文」'); if (CJK.test(l.it)) E(n, 'text 意大利语含汉字：' + l.it); }));
    if (d.rq.length < 2) W(n, '有短文但阅读理解题少于 2 道');
  }
}

const sp = Course.speakables();
console.log('课程数据：' + present + '/' + total + ' 天；对话 ' + stats.lines + ' 句（约 ' + stats.words + ' 词）；词汇 ' + stats.vocab + ' 条；听力题 ' + stats.q + '；知识题 ' + stats.quiz + '；待朗读文本 ' + sp.length + ' 条');
warns.slice(0, 60).forEach(w => console.log('  ⚠ ' + w));
if (warns.length > 60) console.log('  … 另有 ' + (warns.length - 60) + ' 条警告');
errors.forEach(e => console.log('  ✗ ' + e));
console.log(errors.length ? '\n校验失败：' + errors.length + ' 个错误，' + warns.length + ' 个警告' : '\n校验通过（' + warns.length + ' 个警告）');
process.exit(errors.length || (strict && warns.length) ? 1 : 0);
