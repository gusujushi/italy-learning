'use strict';
/* 生成 README 用的截图：node tests/e2e/screenshots.js
 * 先写入一些学习进度（学完前 14 天计划里的课，今天是第 16 天），让页面更好看。输出到 docs/screenshots/。 */
const path = require('path');
const fs = require('fs');
const { serve } = require('./server.js');
const ROOT = path.resolve(__dirname, '../..');
const OUT = path.join(ROOT, 'docs/screenshots');

(async () => {
  const { chromium } = require('playwright');
  const srv = await serve(ROOT, 0);
  const base = 'http://127.0.0.1:' + srv.address().port + '/index.html';
  const browser = await chromium.launch();
  fs.mkdirSync(OUT, { recursive: true });
  fs.readdirSync(OUT).filter(f => f.endsWith('.png')).forEach(f => fs.unlinkSync(path.join(OUT, f)));

  const seed = async page => {
    await page.goto(base + '#/');
    await page.evaluate(() => {
      const t = SRS.dateStr();
      Store.setting('installHidden', true);   // 截图里不要出现"添加到桌面"提示卡
      Store.setPlan({ start: SRS.addDays(t, -15), days: 90, phases: [1, 2, 3] });
      const ctx = App.planCtx();
      const scores = [100, 92, 85, 78, 96, 88, 70, 100];
      let k = 0;
      ctx.list.filter(e => e.day < 16).forEach(e => {
        if (e.type === 'learn') e.lessons.forEach(n => { Store.STEPS.slice(0, 5).forEach(s => Store.markStep(n, s)); Store.finishQuiz(n, scores[k++ % scores.length]); });
        else if (e.type === 'review') Store.finishReview(e.day, scores[k++ % scores.length]);
      });
      const today = ctx.list[15];
      if (today.lessons[0]) Store.STEPS.slice(0, 3).forEach(s => Store.markStep(today.lessons[0], s));
      // 让到期卡片多一些，首页和生词本更有内容
      const raw = JSON.parse(Store.exportJSON());
      Object.keys(raw.srs).slice(0, 23).forEach(id => { raw.srs[id].due = t; });
      Object.keys(raw.srs).slice(23, 60).forEach((id, i) => { raw.srs[id].box = 2 + (i % 4); raw.srs[id].due = SRS.addDays(t, 1 + (i % 9)); });
      Store.importJSON(JSON.stringify(raw));
      Store.record('listen', true); for (let i = 0; i < 12; i++) { Store.record('listen', i % 4 !== 0); Store.record('speak', i % 3 !== 0); Store.record('read', i % 6 !== 0); Store.record('write', i % 2 === 0); Store.record('know', i % 5 !== 0); }
    });
  };
  const hideToast = ctx => ctx.addInitScript(() => document.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = '#toast{display:none!important}'; document.head.append(s); }));

  // ---- 桌面 ----
  const dctx = await browser.newContext({ viewport: { width: 1280, height: 820 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await hideToast(dctx);
  const d = await dctx.newPage();
  await seed(d);
  const shot = async (page, hash, name, prep, clip) => {
    // 地址和当前完全相同时 goto 不会重新渲染，所以改用 reload（让刚写入的进度生效）
    if (page.url() === base + hash) await page.reload(); else await page.goto(base + hash);
    await page.waitForSelector('#view > *');
    if (prep) await prep(page);
    await page.waitForTimeout(250);
    await page.screenshot({ path: path.join(OUT, name + '.png'), ...(clip ? { clip } : {}) });
  };
  await shot(d, '#/', 'today');
  await shot(d, '#/map', 'map', async p => { await p.evaluate(() => { const t = document.getElementById('round3'); if (t) t.scrollIntoView({ block: 'start' }); window.scrollBy(0, -20); }); });
  await shot(d, '#/lesson/41/read', 'read', async p => { await p.locator('.sent').nth(2).click(); await p.waitForSelector('#read-panel .tk'); await p.evaluate(() => window.scrollTo(0, 150)); });
  await shot(d, '#/lesson/12/words', 'words', async p => { await p.evaluate(() => window.scrollTo(0, 200)); });
  await shot(d, '#/lesson/20/shadow', 'shadow', async p => { await p.locator('button:has-text("意群跟读")').click(); await p.locator('button:has-text("下一句")').first().click(); await p.locator('button:has-text("下一句")').first().click(); await p.locator('.chunks span').first().click(); });
  await shot(d, '#/settings', 'settings');
  await shot(d, '#/words', 'wordbook');
  await shot(d, '#/me', 'me');
  await dctx.close();

  // ---- 手机 ----
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  await hideToast(mctx);
  const m = await mctx.newPage();
  await seed(m);
  await shot(m, '#/', 'today-mobile');
  await shot(m, '#/lesson/41/read', 'read-mobile', async p => { await p.locator('.sent').nth(2).tap(); await p.waitForSelector('#read-panel.open .tk'); });
  await shot(m, '#/lesson/12/quiz', 'quiz-mobile', async p => { await p.locator('button:has-text("开始测验")').click(); await p.waitForSelector('.ex-body'); });
  await shot(m, '#/lab/pairs', 'lab-mobile');
  await mctx.close();

  console.log('截图已写入 docs/screenshots/：' + fs.readdirSync(OUT).join('、'));
  await browser.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
