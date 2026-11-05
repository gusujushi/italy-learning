'use strict';
/* 全天渲染冒烟：遍历每一天的 6 个步骤，确认没有 JS 错误、关键元素存在。
 * 运行：node tests/e2e/all-days.js            （默认检查数据里已有的全部天）
 *       DAYS=1-30 node tests/e2e/all-days.js   （限定范围） */
const assert = require('node:assert/strict');
const path = require('path');
const { serve } = require('./server.js');
const ROOT = path.resolve(__dirname, '../..');
const STEPS = ['listen', 'read', 'learn', 'speak', 'write', 'test'];
const [from, to] = (process.env.DAYS || '1-90').split('-').map(Number);

(async () => {
  const { chromium } = require('playwright');
  const srv = await serve(ROOT, 0);
  const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(location_(page) + ' PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(location_(page) + ' CONSOLE: ' + m.text()); });
  function location_(p) { try { return p.url().split('#')[1] || ''; } catch (e) { return ''; } }

  await page.goto(base);
  await page.evaluate(() => { Store.setting('unlockAll', true); });
  const present = await page.evaluate(() => { const o = []; for (let n = 1; n <= Course.total(); n++) if (Course.has(n)) o.push(n); return o; });
  const days = present.filter(n => n >= from && n <= to);
  let pages = 0;
  for (const n of days) {
    for (const s of STEPS) {
      await page.goto(base + '#/day/' + n + '/' + s);
      await page.waitForSelector('.stepper .st.on span:text-is("' + { listen: '听', read: '读', learn: '学', speak: '说', write: '写', test: '测' }[s] + '")', { timeout: 5000 });
      const body = await page.locator('.step-body').innerText();
      assert.ok(body.length > 40, '第 ' + n + ' 天 ' + s + ' 步内容为空');
      assert.ok(!/\[object /.test(body) && !/undefined|NaN/.test(body), '第 ' + n + ' 天 ' + s + ' 步出现 [object]/undefined/NaN：' + body.slice(0, 80));
      pages++;
    }
  }
  assert.deepEqual(errors, [], '出现 JS 错误：\n' + errors.slice(0, 10).join('\n'));
  console.log('全天渲染通过：' + days.length + ' 天 × 6 步 = ' + pages + ' 个页面，无 JS 错误');
  await browser.close(); srv.close();
})().catch(e => { console.error('失败：', e.message); process.exit(1); });
