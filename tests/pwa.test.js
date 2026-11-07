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

// 不经过 <script> 标签、由 new Worker() 加载的脚本
const WORKERS = ['asr-worker.js'];

test('js/ 下每个脚本都被 index.html 加载（没有遗留的孤儿模块；Worker 脚本除外，但必须在 SW 清单里）', () => {
  fs.readdirSync(path.join(ROOT, 'js')).filter(f => f.endsWith('.js') && !WORKERS.includes(f)).forEach(f => assert.ok(refs.includes('js/' + f), f + ' 没有被 index.html 加载'));
  WORKERS.forEach(f => { assert.ok(fs.existsSync(path.join(ROOT, 'js', f))); assert.ok(swFiles.includes('js/' + f), f + ' 应在 sw.js 的 FILES 里'); });
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

test('语音识别的运行库和模型：文件齐全、大小与 js/asr.js 的清单相符、校验值与 README 一致、不在外壳预缓存里', () => {
  const asr = read('js/asr.js');
  const block = asr.match(/const ASSETS = \[([\s\S]*?)\n  \];/)[1];
  const assets = Array.from(block.matchAll(/\['([^']+)',\s*([\d.]+)\]/g)).map(m => [m[1], parseFloat(m[2])]);
  assert.ok(assets.length >= 8);
  const crypto = require('crypto');
  const docs = read('vendor/README.md') + read('models/README.md');
  let total = 0;
  assets.forEach(([rel, mb]) => {
    const f = path.join(ROOT, rel);
    assert.ok(fs.existsSync(f), '缺少文件：' + rel);
    const size = fs.statSync(f).size / 1e6;
    total += size;
    assert.ok(Math.abs(size - mb) <= Math.max(0.15 * mb, 0.05), rel + ' 大小 ' + size.toFixed(2) + ' MB，清单写的是 ' + mb);
    assert.ok(!swFiles.includes(rel), rel + ' 不应预缓存（太大，走 isola-asr-v1）');
    if (/\.(onnx|wasm|mjs)$|transformers\.min\.js$/.test(rel)) {
      const sha = crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
      assert.ok(docs.includes(sha), rel + ' 的 sha256 没有记录在 vendor/README.md 或 models/README.md');
    }
  });
  assert.ok(total > 90 && total < 110, '合计约 100 MB，实际 ' + total.toFixed(1));
  assert.match(asr, /const CACHE = 'isola-asr-v1'/);
  assert.match(sw, /const ASR = 'isola-asr-v1'/);
  ['LICENSE-transformers.js.txt', 'LICENSE-onnxruntime-web.txt'].forEach(f => assert.ok(fs.existsSync(path.join(ROOT, 'vendor', f)), '缺少许可证文件 ' + f));
});

test('语音识别 Worker：只从本站加载运行库和模型，不访问外部网址', () => {
  const w = read('js/asr-worker.js');
  assert.match(w, /allowRemoteModels = false/);
  assert.match(w, /wasmPaths = new URL\('vendor\/'/);
  assert.ok(!/https?:\/\//.test(w.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '')), 'Worker 代码里不应出现外部网址');
});
