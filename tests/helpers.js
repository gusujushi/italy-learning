'use strict';
// 测试与工具脚本共用：在 Node 里加载课程数据（数据文件使用全局 Course）
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');

function loadCourse() {
  global.Ita = require(path.join(ROOT, 'js/italian.js'));
  const Course = require(path.join(ROOT, 'js/course.js'));
  global.Course = Course;
  const files = ['data/meta.js'].concat(
    fs.readdirSync(path.join(ROOT, 'data')).filter(f => /^island\d+\.js$/.test(f)).sort().map(f => 'data/' + f)
  );
  files.forEach(f => vm.runInThisContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), { filename: f }));
  return Course;
}

/** 发音实验室数据（data/pron.js 把它挂在 window.PRON 上） */
function loadPron() {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(ROOT, 'data/pron.js'), 'utf8'), ctx);
  return ctx.window.PRON;
}

/** 发音实验室里需要朗读的文本（字母、规则示例、对比词、重音词、绕口令）；格式同 Course.speakables 的参数 */
function labTexts(pron) {
  const out = [];
  pron.letters.concat(pron.foreign).forEach(l => { out.push({ say: l.say }); l.ex.forEach(e => out.push({ say: e[0] })); });
  pron.rules.forEach(r => r.ex.forEach(e => out.push({ say: e[0] })));
  pron.pairs.forEach(p => { out.push({ say: p.a }); out.push({ say: p.b }); });
  pron.stress.forEach(s => out.push({ say: s.w }));
  pron.twisters.forEach(t => out.push({ say: t.it }));
  return out;
}

module.exports = { ROOT, loadCourse, loadPron, labTexts };
