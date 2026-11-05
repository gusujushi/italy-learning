'use strict';
/* 生成 README 用的截图（手机视口，2x）：node tests/e2e/screenshots.js
 * 先给第 1–13 天写入一些进度，让地图更好看。输出到 docs/screenshots/。 */
const path = require('path');
const { serve } = require('./server.js');
const ROOT = path.resolve(__dirname, '../..');
const OUT = path.join(ROOT, 'docs/screenshots');

(async () => {
  const { chromium } = require('playwright');
  const srv = await serve(ROOT, 0);
  const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  // 截图里不要出现"设备没有意大利语语音"之类的提示条（无头浏览器本来就没有系统语音）
  await ctx.addInitScript(() => {
    document.addEventListener('DOMContentLoaded', () => {
      const s = document.createElement('style');
      s.textContent = '#toast{display:none!important}';
      document.head.append(s);
    });
  });
  const page = await ctx.newPage();
  await page.goto(base);
  await page.evaluate(() => { for (let n = 1; n <= 13; n++) Store.finishDay(n, [100, 85, 70][n % 3]); });

  await page.goto(base + '#/');
  await page.waitForSelector('.hero');
  await page.evaluate(() => document.getElementById('isl2').scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(OUT, 'map.png') });

  await page.goto(base + '#/day/11/read');
  await page.waitForSelector('.reader .line');
  // 滚到阅读器顶部，但要避开顶部固定的标题栏 + 步骤条（约 130px）
  await page.evaluate(() => window.scrollTo(0, document.querySelector('.reader').getBoundingClientRect().top + window.scrollY - 135));
  await page.locator('.reader .line').nth(1).click().catch(() => {});
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(OUT, 'read.png') });

  await page.goto(base + '#/day/12/write');
  await page.waitForSelector('.ex .ex-body');
  await page.waitForTimeout(200);
  await page.screenshot({ path: path.join(OUT, 'exercise.png') });

  await page.goto(base + '#/lab/pairs');
  await page.waitForSelector('.game');
  await page.screenshot({ path: path.join(OUT, 'lab.png') });

  console.log('截图已写入 docs/screenshots/');
  await browser.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
