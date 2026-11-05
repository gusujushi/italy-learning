'use strict';
/* 音频完整性：课文改了但忘了重新生成音频，这里会直接报出来。
 * 修复办法见 README「声音从哪来」：node tools/export_course.js build/course.json && python3 tools/gen_audio.py --model …  */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { ROOT, loadCourse, loadPron, labTexts } = require('./helpers.js');

const Course = loadCourse();
const AUDIO = path.join(ROOT, 'audio');

function loadMap() {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(AUDIO, 'manifest.js'), 'utf8'), ctx);
  return ctx.window.AUDIO_MAP;
}

test('音频：清单覆盖全部课程文本和发音室文本', () => {
  const map = loadMap();
  const missing = Course.speakables(labTexts(loadPron())).filter(t => !map[t.text]).map(t => t.text);
  assert.equal(missing.length, 0, missing.length + ' 条文本没有音频，例如：' + missing.slice(0, 5).join(' / '));
});

test('音频：清单里的每个文件都存在且不是空文件', () => {
  const bad = Object.values(loadMap()).filter(rel => {
    const p = path.join(AUDIO, rel);
    return !fs.existsSync(p) || fs.statSync(p).size < 500;
  });
  assert.deepEqual(bad.slice(0, 5), [], bad.length + ' 个音频文件缺失或为空');
});

test('音频：目录里没有清单之外的多余 mp3', () => {
  const used = new Set(Object.values(loadMap()));
  const stray = [];
  fs.readdirSync(AUDIO, { withFileTypes: true }).filter(d => d.isDirectory()).forEach(d => {
    fs.readdirSync(path.join(AUDIO, d.name)).filter(f => f.endsWith('.mp3')).forEach(f => {
      if (!used.has(d.name + '/' + f)) stray.push(d.name + '/' + f);
    });
  });
  assert.deepEqual(stray.slice(0, 5), [], stray.length + ' 个 mp3 不在清单里（多半是课文改动后留下的旧文件，可以删除）');
});
