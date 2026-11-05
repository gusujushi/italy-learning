'use strict';
/* PWA 与页面外壳：index.html 引用的文件都存在、都在 Service Worker 的预缓存清单里；manifest 与图标有效。 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { ROOT } = require('./helpers.js');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const html = read('index.html');
const sw = read('sw.js');

const refs = Array.from(html.matchAll(/(?:src|href)="([^"#?]+)"/g)).map(m => m[1]).filter(r => !/^(https?:|data:)/.test(r));
const swFiles = (() => {
  const m = sw.match(/const FILES = (\[[\s\S]*?\]);/);
  assert.ok(m, 'sw.js 里应有 FILES 清单');
  return eval(m[1]); // eslint-disable-line no-eval
})();

test('index.html 引用的本地文件都存在', () => {
  assert.ok(refs.length >= 30);
  refs.forEach(r => assert.ok(fs.existsSync(path.join(ROOT, r)), '缺少文件：' + r));
});

test('Service Worker 预缓存清单覆盖 index.html 引用的全部文件，且清单里的文件都存在', () => {
  refs.forEach(r => assert.ok(swFiles.includes(r), 'sw.js 的 FILES 里缺少：' + r));
  swFiles.filter(f => f !== './').forEach(f => assert.ok(fs.existsSync(path.join(ROOT, f)), 'FILES 里有不存在的文件：' + f));
  assert.equal(new Set(swFiles).size, swFiles.length, 'FILES 里有重复项');
});

test('js/ 下每个脚本都被 index.html 加载（没有遗留的孤儿模块）', () => {
  fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js')).forEach(f => assert.ok(refs.includes('js/' + f), f + ' 没有被 index.html 加载'));
  fs.readdirSync(path.join(ROOT, 'data')).filter(f => f.endsWith('.js')).forEach(f => assert.ok(refs.includes('data/' + f), f + ' 没有被 index.html 加载'));
});

test('脚本加载顺序：被依赖的模块在前面', () => {
  const order = refs.filter(r => r.endsWith('.js'));
  const before = (a, b) => assert.ok(order.indexOf(a) < order.indexOf(b), a + ' 应在 ' + b + ' 之前');
  before('js/italian.js', 'js/course.js'); before('js/course.js', 'data/meta.js'); before('js/morph.js', 'js/grammar.js');
  before('js/grammar.js', 'js/lesson.js'); before('js/plan.js', 'js/app.js'); before('js/ui.js', 'js/store.js');
  before('js/store.js', 'js/sound.js'); before('js/widgets.js', 'js/view-home.js'); before('js/lesson-read.js', 'js/view-lesson.js');
  assert.equal(order[order.length - 1], 'js/app.js', 'app.js 最后加载');
});

test('manifest：必填字段齐全，图标文件存在且尺寸与声明一致', () => {
  const man = JSON.parse(read('manifest.webmanifest'));
  assert.equal(man.display, 'standalone');
  assert.ok(man.name && man.short_name && man.start_url && man.theme_color && man.background_color);
  assert.ok(man.icons.some(i => i.sizes === '192x192') && man.icons.some(i => i.sizes === '512x512'));
  assert.ok(man.icons.some(i => /maskable/.test(i.purpose)), '需要 maskable 图标');
  man.icons.filter(i => i.type === 'image/png').forEach(i => {
    const buf = fs.readFileSync(path.join(ROOT, i.src));
    assert.equal(buf.slice(1, 4).toString(), 'PNG');
    const w = buf.readUInt32BE(16), h = buf.readUInt32BE(20);
    assert.equal(w + 'x' + h, i.sizes, i.src + ' 尺寸与 manifest 不符');
  });
});

test('Service Worker：音频走单独缓存且不预缓存（约 32 MB）；外壳版本号存在', () => {
  assert.ok(!swFiles.some(f => /\.mp3$/.test(f)));
  assert.match(sw, /const AUDIO = 'isola-audio-v1'/);
  assert.match(sw, /const VERSION = 'v\d+'/);
  assert.match(read('js/view-settings.js'), /AUDIO_CACHE = 'isola-audio-v1'/, '设置页下载音频用的缓存名要和 sw.js 一致');
});
