'use strict';
/* 全课渲染冒烟：90 课 × 6 步，逐页检查没有 JS 错误、没有 [object]/undefined/NaN，关键元素数量与数据一致；
 * 精读页还会把每一句都点一遍，确认彩色分析面板都能渲染。
 * 运行：node tests/e2e/all-days.js            （默认全部 90 课）
 *       LESSONS=1-30 node tests/e2e/all-days.js   （限定范围） */
const assert = require('node:assert/strict');
const path = require('path');
const { serve } = require('./server.js');
const ROOT = path.resolve(__dirname, '../..');
const STEPS = ['intro', 'words', 'read', 'grammar', 'shadow', 'quiz'];
const [from, to] = (process.env.LESSONS || process.env.DAYS || '1-90').split('-').map(Number);

(async () => {
  const { chromium } = require('playwright');
  const srv = await serve(ROOT, 0);
  const base = 'http://127.0.0.1:' + srv.address().port + '/index.html';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  const where = () => { try { return page.url().split('#')[1] || ''; } catch (e) { return ''; } };
  page.on('pageerror', e => errors.push(where() + ' PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(where() + ' CONSOLE: ' + m.text()); });

  await page.goto(base + '#/');
  // 只改页面内的发声函数（不播放音频）；之后只改 hash，不会重新加载页面，所以一直有效
  await page.evaluate(() => { Sound.play = async () => true; Sound.playSeq = async () => true; Sound.stop = () => {}; });
  const lessons = (await page.evaluate(() => { const o = []; for (let n = 1; n <= Course.total(); n++) if (Course.has(n)) o.push(n); return o; })).filter(n => n >= from && n <= to);

  let pages = 0, sentences = 0, noVerb = 0, withTags = 0, quizSizes = {};
  for (const n of lessons) {
    const info = await page.evaluate(k => { const d = Course.day(k); return { vocab: d.vocab.length, lines: Lesson.lines(k).length, exam: d.exam, test: d.test, rq: d.rq.length, speak: d.speak.length, wr: !!d.wr, roles: new Set(d.dlg.map(l => l.who)).size }; }, n);
    for (const s of STEPS) {
      await page.goto(base + '#/lesson/' + n + '/' + s);
      await page.waitForSelector('nav.steps a.on[data-step="' + s + '"]', { timeout: 5000 });
      const body = await page.locator('.step-body').innerText();
      assert.ok(body.length > 40, '第 ' + n + ' 课 ' + s + ' 步内容为空');
      assert.ok(!/\[object /.test(body) && !/undefined|NaN/.test(body), '第 ' + n + ' 课 ' + s + ' 步出现 [object]/undefined/NaN：' + body.slice(0, 80));
      pages++;

      if (s === 'words') {
        assert.equal(await page.locator('.word-card').count(), info.vocab, '第 ' + n + ' 课词汇卡数');
      } else if (s === 'read') {
        assert.equal(await page.locator('.sent').count(), info.lines, '第 ' + n + ' 课句子数');
        const r = await page.evaluate(() => {
          const rows = Array.from(document.querySelectorAll('.sent'));
          const out = { n: rows.length, noTok: [], bad: [], noVerb: 0, tags: 0 };
          rows.forEach((row, i) => {
            row.click();
            const panel = document.getElementById('read-panel');
            if (!panel.querySelector('.colored .tk')) out.noTok.push(i + 1);
            if (/\[object|undefined|NaN/.test(panel.innerText)) out.bad.push(i + 1);
            if (!panel.querySelector('.tk.verb')) out.noVerb++;
            if (panel.querySelector('button.chip[style*="border-left"]')) out.tags++;
          });
          return out;
        });
        assert.deepEqual(r.noTok, [], '第 ' + n + ' 课这些句子的分析面板没有可点的词：' + r.noTok);
        assert.deepEqual(r.bad, [], '第 ' + n + ' 课这些句子的分析面板有 [object]/undefined：' + r.bad);
        sentences += r.n; noVerb += r.noVerb; withTags += r.tags;
        assert.equal(await page.locator('.card:has-text("阅读理解") .ex').count(), info.rq ? 1 : 0, '第 ' + n + ' 课阅读理解题');
      } else if (s === 'grammar') {
        assert.equal(await page.locator('textarea[aria-label="微写作"]').count(), info.wr ? 1 : 0, '第 ' + n + ' 课微写作');
      } else if (s === 'shadow') {
        assert.ok(await page.locator('.shadow-sent').count() >= 1);
        assert.equal(await page.locator('.ptask').count(), info.speak, '第 ' + n + ' 课「看中文，开口说」任务数');
        await page.locator('button:has-text("角色扮演")').click();
        assert.ok(await page.locator('.rp button:has-text("我演")').count() >= Math.min(2, info.roles), '第 ' + n + ' 课角色扮演选项');
        await page.locator('button:has-text("意群跟读")').click();
        assert.ok(await page.locator('.chunks span').count() >= 1, '第 ' + n + ' 课意群跟读没有意群');
        await page.locator('button:has-text("自动连读")').click();
        assert.ok(await page.locator('button:has-text("从这句开始")').count() === 1);
      } else if (s === 'quiz') {
        await page.locator('button:has-text("开始测验")').click();
        await page.waitForSelector('.ex .ex-top .cnt');
        const cnt = (await page.locator('.ex .ex-top .cnt').textContent()).trim();
        const total = +cnt.split('/')[1];
        quizSizes[total] = (quizSizes[total] || 0) + 1;
        assert.ok(total >= (info.exam ? 25 : info.test ? 16 : 8), '第 ' + n + ' 课测验题数偏少：' + cnt);
      }
    }
  }
  assert.deepEqual(errors, [], '出现 JS 错误：\n' + errors.slice(0, 10).join('\n'));
  console.log('全课渲染通过：' + lessons.length + ' 课 × 6 步 = ' + pages + ' 个页面，无 JS 错误');
  console.log('精读：共点开 ' + sentences + ' 个句子的彩色分析（其中 ' + (sentences - noVerb) + ' 句标出谓语，' + withTags + ' 句带语法点）；测验题数分布 ' + JSON.stringify(quizSizes));
  await browser.close(); srv.close();
})().catch(e => { console.error('失败：', e.message); process.exit(1); });
