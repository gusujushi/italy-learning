'use strict';
/* 端到端冒烟测试：在无头 Chromium 里走完第 1 天的 6 个步骤 + 复习 + 发音室 + 我的。
 * 运行：node tests/e2e/flow.js            （需要已安装 playwright）
 * 保存截图：SHOTS=/some/dir node tests/e2e/flow.js */
const assert = require('node:assert/strict');
const path = require('path');
const { serve } = require('./server.js');

const ROOT = path.resolve(__dirname, '../..');
const SHOTS = process.env.SHOTS || '';
const DAY = +(process.env.DAY || 1);

const exact = t => new RegExp('^\\s*' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$');

async function solveCurrent(page, correct) {
  const ex = await page.evaluate(() => JSON.parse(JSON.stringify(ExerciseUI.current)));
  switch (ex.type) {
    case 'mcq':
    case 'cloze': {
      const i = correct ? ex.ans : (ex.ans + 1) % ex.opts.length;
      await page.locator('.ex-body .opt').nth(i).click();
      break;
    }
    case 'dict':
    case 'translate':
      await page.locator('.ex-body textarea').fill(correct ? ex.target : 'xyz xyz');
      await page.locator('.ex-body .btn.primary').first().click();
      break;
    case 'clozeType':
      await page.locator('.ex-body input.inp').fill(correct ? ex.answer : 'zzz');
      await page.locator('.ex-body .btn.primary').first().click();
      break;
    case 'order': {
      const toks = correct ? ex.target.split(/\s+/) : ex.target.split(/\s+/).reverse();
      for (const t of toks) {
        await page.locator('.chips.pool .chip').filter({ hasText: exact(t) }).first().click();
      }
      await page.locator('.ex-body .btn.primary').first().click();
      break;
    }
    case 'match':
      for (const [a, b] of ex.pairs) {
        await page.locator('.match .col').nth(0).locator('.opt').filter({ hasText: exact(a) }).first().click();
        await page.locator('.match .col').nth(1).locator('.opt').filter({ hasText: exact(b) }).first().click();
      }
      break;
    default: throw new Error('unknown exercise type ' + ex.type);
  }
  return ex;
}

/** 等到步骤条的高亮项变为目标步骤（避免读到上一步残留的 DOM） */
const onStep = (page, label) => page.waitForSelector('.stepper .st.on span:text-is("' + label + '")');

/** 跑完一个练习集；返回 {total, ok} */
async function runSet(page, correctFn) {
  let n = 0;
  for (let guard = 0; guard < 60; guard++) {
    if (await page.locator('.summary').count()) break;
    await solveCurrent(page, correctFn(n++));
    await page.locator('.ex .next').click();
  }
  assert.ok(await page.locator('.summary').count(), '应出现汇总');
  return n;
}

(async () => {
  const { chromium } = require('playwright');
  const srv = await serve(ROOT, 0);
  const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await ctx.grantPermissions([]);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push('CONSOLE: ' + m.text()); });
  const shot = async name => { if (SHOTS) await page.screenshot({ path: path.join(SHOTS, name + '.png'), fullPage: false }); };
  const step = n => console.log('  ✓', n);

  // 1. 地图
  await page.goto(base);
  await page.waitForSelector('.hero');
  assert.equal(await page.locator('.island').count(), 9);
  assert.equal(await page.locator('.node').count(), 90);
  assert.ok((await page.locator('.node.cur').count()) === 1, '有且仅有一个当前节点');
  await shot('01-map'); step('地图渲染');

  // 2. 点第 1 天 → 弹层 → 开始
  await page.locator('.node.cur').click();
  await page.waitForSelector('.sheet');
  await page.locator('.sheet .btn.primary').click();
  await page.waitForSelector('.stepper');
  assert.match(page.url(), new RegExp('#/day/' + DAY));
  step('弹层 → 课程页');

  // 3. 听
  await page.goto(base + '#/day/' + DAY + '/listen');
  await page.waitForSelector('.step-body .card');
  await page.locator('text=盲听整段对话').click();
  await page.locator('text=显示文本').click();
  assert.ok(await page.locator('.tr-box .line').count() >= 5);
  await shot('02-listen');
  await runSet(page, () => true);
  await shot('03-listen-done');
  await page.locator('.summary .btn.primary').click();
  await page.waitForURL(new RegExp('#/day/' + DAY + '/read'));
  await onStep(page, '读');
  assert.ok(await page.locator('.stepper .st').nth(0).evaluate(e => e.classList.contains('done')), '听 步骤打勾');
  step('听：盲听/文本/理解题');

  // 4. 读
  await onStep(page, '读');
  await page.waitForSelector('.reader');
  const lines = await page.locator('.reader .line').count();
  assert.ok(lines >= 5);
  if (await page.locator('.reader .w').count()) {
    await page.locator('.reader .w').first().click();
    await page.waitForSelector('.pop');
  }
  await page.locator('.reader .rctrl button', { hasText: '遮中文' }).click();
  await page.locator('.vlist .vrow').first().click();
  assert.ok((await page.locator('.vlist .vrow').count()) >= 10);
  await shot('04-read');
  await page.locator('.card:has-text("小练习") .ex').scrollIntoViewIfNeeded();
  await runSet(page, () => true);
  await page.locator('.summary .btn.primary').click();
  await page.waitForURL(new RegExp('#/day/' + DAY + '/learn'));
  step('读：阅读器/点词/词汇/练习');

  // 5. 学
  await onStep(page, '学');
  assert.ok((await page.locator('.dchip').count()) >= 1, '发音词表');
  await page.locator('.dchip').first().click();
  await shot('05-learn');
  await runSet(page, () => true);
  await page.locator('.summary .btn.primary').click();
  await page.waitForURL(new RegExp('#/day/' + DAY + '/speak'));
  step('学：发音/语法/文化/小测');

  // 6. 说
  await onStep(page, '说');
  await page.waitForSelector('.srow2');
  const fin = page.locator('.btn.primary', { hasText: '完成口语练习' });
  assert.ok(await fin.isDisabled(), '互动前不可完成');
  await page.locator('.srow2 .rate3 button').nth(2).click();
  await page.locator('.srow2 .rate3 button').nth(5).click();
  await page.locator('.rp .btn.primary').first().click(); // 选角色
  for (let i = 0; i < 12 && !(await page.locator('.rp .big', { hasText: '对话完成' }).count()); i++) {
    const btn = page.locator('.rp-prompt .btn.primary');
    if (await btn.count()) await btn.click(); else await page.waitForTimeout(700);
  }
  await shot('06-speak');
  assert.ok(await fin.isEnabled(), '互动后可完成');
  await fin.click();
  await page.waitForURL(new RegExp('#/day/' + DAY + '/write'));
  step('说：跟读自评/角色扮演');

  // 7. 写
  await onStep(page, '写');
  await page.waitForSelector('.ex');
  await runSet(page, k => k % 3 !== 0); // 故意错一部分
  await shot('07-write');
  await page.locator('.summary .btn.primary').click();
  const ta = page.locator('#comp textarea');
  if (await ta.count()) {
    await ta.fill('Buongiorno! Ciao!');
    await page.locator('#comp .btn', { hasText: '看示范答案' }).click();
    assert.ok(await page.locator('#comp .model').isVisible());
  }
  await page.locator('.step-nav a.btn', { hasText: '测' }).click();
  step('写：练习 + 微写作');

  // 8. 测（全部答对 → 3 星）
  await page.waitForSelector('text=开始');
  await page.locator('.btn.lg', { hasText: '开始' }).click();
  await runSet(page, () => true);
  await shot('08-test-summary');
  await page.locator('.summary .btn.primary').click();
  await page.waitForSelector('.big-stars');
  assert.equal((await page.locator('.big-stars').textContent()).trim(), '★★★');
  await shot('09-result');
  const st = await page.evaluate(() => ({ d: Store.day(1), cards: Store.cardCount(), skills: Store.SKILLS.map(s => Store.skillLevel(s)) }));
  assert.equal(st.d.stars, 3);
  assert.ok(st.cards >= 12, '词句已加入复习卡片');
  step('测：3 星通关，卡片入库 ' + st.cards + ' 张');

  // 9. 回地图：第 2 天解锁（若已有内容则可点）
  await page.goto(base + '#/');
  await page.waitForSelector('.hero');
  assert.ok(await page.locator('.node.done').count() >= 1);
  await shot('10-map-after');
  step('地图：节点状态更新');

  // 10. 复习：把卡片到期日改成今天
  await page.evaluate(() => {
    const raw = JSON.parse(Store.exportJSON());
    const t = SRS.dateStr();
    Object.keys(raw.srs).forEach(id => { raw.srs[id].due = t; });
    Store.importJSON(JSON.stringify(raw));
  });
  await page.goto(base + '#/review');
  await page.waitForSelector('.rcard');
  await shot('11-review');
  for (let i = 0; i < 80 && !(await page.locator('.summary').count()); i++) {
    await page.locator('.rcard + .btn, .btn.lg', { hasText: '显示答案' }).first().click();
    await page.locator('.rate4 .btn').nth(i % 3 === 0 ? 3 : 2).click();
  }
  assert.ok(await page.locator('.summary').count(), '复习完成');
  assert.equal(await page.evaluate(() => Store.dueCount()), 0);
  step('复习：翻卡评分，到期清零');

  // 11. 发音室
  await page.goto(base + '#/lab');
  await page.waitForSelector('.lab-card');
  assert.ok((await page.locator('.lab-card').count()) >= 20);
  await page.locator('.xchip').first().click();
  await shot('12-lab-letters');
  await page.goto(base + '#/lab/pairs');
  await page.waitForSelector('.game');
  await page.locator('.game .opt').first().click();
  await page.waitForSelector('.game .feedback.show');
  await shot('13-lab-pairs');
  await page.goto(base + '#/lab/stress');
  assert.ok((await page.locator('.stressrow').count()) >= 10);
  await page.goto(base + '#/lab/twisters');
  assert.ok((await page.locator('.lab-card').count()) >= 5);
  step('发音室：字母/听辨/重音/绕口令');

  // 12. 我的
  await page.goto(base + '#/me');
  await page.waitForSelector('.radar');
  assert.ok(await page.locator('.badge').count() >= 10);
  await page.locator('select.sel').first().selectOption('dark');
  assert.equal(await page.evaluate(() => document.documentElement.getAttribute('data-theme')), 'dark');
  await shot('14-me-dark');
  step('我的：雷达/徽章/主题切换');

  // 13. 音频：清单要覆盖全部课程文本，并且真的能用 <audio> 播放 mp3（而不是悄悄退回浏览器语音）
  await page.goto(base + '#/');
  await page.waitForSelector('.hero');
  await page.mouse.click(5, 5); // 给页面一次"用户激活"，否则自动播放策略可能拦截
  const cover = await page.evaluate(() => {
    const miss = Course.speakables().filter(x => !Sound.hasFile(x.text)).map(x => x.text);
    return { files: Sound.status().files, nMiss: miss.length, miss: miss.slice(0, 8) };
  });
  assert.ok(cover.files > 3000, '音频清单应有 3000+ 条，实际 ' + cover.files);
  assert.equal(cover.nMiss, 0, cover.nMiss + ' 条课程文本没有预生成音频，例如：' + cover.miss.join(' / '));
  const played = await page.evaluate(async () => {
    const srcs = [];
    const orig = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () { srcs.push(this.src); return orig.apply(this, arguments); };
    const t0 = performance.now();
    const ok = await Sound.play('Buongiorno!');
    HTMLMediaElement.prototype.play = orig;
    return { ok, ms: Math.round(performance.now() - t0), srcs };
  });
  assert.ok(played.ok, 'Sound.play 应该播放成功');
  assert.ok(played.srcs.length === 1 && /audio\/[0-9a-f]{2}\/[0-9a-f]{10}\.mp3$/.test(played.srcs[0]), '应当播放 audio/ 下的 mp3：' + played.srcs.join(','));
  assert.ok(played.ms > 300 && played.ms < 5000, '"Buongiorno!" 的播放时长应在 0.3–5 秒之间，实际 ' + played.ms + ' ms');
  step('音频：清单覆盖 ' + cover.files + ' 条，mp3 实际播放 ' + played.ms + ' ms');

  assert.deepEqual(errors, [], '页面不应有 JS 错误:\n' + errors.join('\n'));
  console.log('E2E 通过');
  await browser.close(); srv.close();
})().catch(e => { console.error('E2E 失败：', e); process.exit(1); });
