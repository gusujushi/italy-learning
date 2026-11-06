'use strict';
/* PWA 在"子路径"下的检查——GitHub Pages 的地址形如 https://用户名.github.io/italy-learning/，程序不在网站根目录。
 * 检查：Service Worker 能注册并预缓存外壳；「下载全部音频」把全部 mp3 写入缓存；断网后页面能打开，
 * 并且音频仍能从缓存播放（浏览器播放音频会发 Range 请求，由 Service Worker 从缓存里切片回答）。
 * 运行：node tests/e2e/pwa-subpath.js            （需要已安装 playwright） */
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { serve } = require('./server.js');

const ROOT = path.resolve(__dirname, '../..');

(async () => {
  const { chromium } = require('playwright');
  // 临时目录里放一个指向项目的符号链接：/italy-learning/ → 项目目录
  const parent = fs.mkdtempSync(path.join(os.tmpdir(), 'pwa-sub-'));
  fs.symlinkSync(ROOT, path.join(parent, 'italy-learning'));
  const realParent = fs.realpathSync(parent);
  const srv = await serve(realParent, 0);
  const base = 'http://127.0.0.1:' + srv.address().port + '/italy-learning/';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push('CONSOLE: ' + m.text()); });
  const step = n => console.log('  ✓', n);

  await page.goto(base + 'index.html');
  await page.waitForSelector('.hero');
  const sw = await page.evaluate(async () => { const r = await navigator.serviceWorker.ready; return { scope: new URL(r.scope).pathname, script: new URL(r.active.scriptURL).pathname }; });
  assert.equal(sw.scope, '/italy-learning/');
  assert.equal(sw.script, '/italy-learning/sw.js');
  const shell = await page.evaluate(async () => {
    const name = (await caches.keys()).find(k => k.startsWith('isola-shell-'));
    return (await (await caches.open(name)).keys()).map(r => new URL(r.url).pathname);
  });
  assert.ok(shell.includes('/italy-learning/index.html') && shell.includes('/italy-learning/js/app.js') && shell.includes('/italy-learning/audio/manifest.js'));
  const man = await (await page.request.get(base + 'manifest.webmanifest')).json();
  for (const ic of man.icons) assert.equal((await page.request.get(base + ic.src)).status(), 200, ic.src);
  step('子路径下 Service Worker 注册成功，预缓存 ' + shell.length + ' 个文件，manifest 与图标可访问');

  // 设置页：下载全部音频到本机
  await page.goto(base + 'index.html#/settings');
  await page.waitForSelector('button:has-text("下载全部音频到本机")');
  await page.locator('button:has-text("下载全部音频到本机")').click();
  await page.waitForSelector('text=全部音频已缓存', { timeout: 120000 });
  const stat = await page.evaluate(async () => {
    const c = await caches.open('isola-audio-v1');
    return { cached: (await c.keys()).length, files: new Set(Object.values(window.AUDIO_MAP)).size };
  });
  assert.equal(stat.cached, stat.files, '音频缓存条数应等于清单里的文件数');
  step('下载全部音频：缓存 ' + stat.cached + ' 个 mp3');

  // 断网：页面能打开，音频能从缓存播放
  await ctx.setOffline(true);
  await page.goto(base + 'index.html#/lesson/1/words');
  await page.waitForSelector('.word-card');
  await page.mouse.click(5, 5);
  const played = await page.evaluate(async () => {
    const srcs = [];
    const orig = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () { srcs.push(this.src); return orig.apply(this, arguments); };
    const t0 = performance.now();
    const ok = await Sound.play('Buongiorno!');
    HTMLMediaElement.prototype.play = orig;
    return { ok, ms: Math.round(performance.now() - t0), srcs };
  });
  assert.ok(played.ok, '断网后音频应能从缓存播放');
  assert.ok(played.srcs.length === 1 && /\/italy-learning\/audio\/[0-9a-f]{2}\/[0-9a-f]{10}\.mp3$/.test(played.srcs[0]), played.srcs.join(','));
  assert.ok(played.ms > 300 && played.ms < 5000, '播放时长异常：' + played.ms + ' ms');
  await page.goto(base + 'index.html#/lessons');
  await page.waitForSelector('.lesson-card');
  step('断网：页面可打开，"Buongiorno!" 从缓存播放 ' + played.ms + ' ms');
  await ctx.setOffline(false);

  assert.deepEqual(errors, [], '页面不应有 JS 错误:\n' + errors.join('\n'));
  console.log('PWA 子路径检查通过');
  await browser.close(); srv.close();
  fs.rmSync(parent, { recursive: true, force: true });
})().catch(e => { console.error('PWA 子路径检查失败：', e); process.exit(1); });
