'use strict';
/* 端到端冒烟测试：在无头 Chromium 里走完第 1 课的 6 个步骤，再检查复习日、生词本、学习计划调整、发音室、
 * 我的、AI 老师（用假接口）、音频播放、PWA 离线，最后用手机尺寸检查底栏和精读底部面板。
 * 运行：node tests/e2e/flow.js            （需要已安装 playwright）
 * 保存截图：SHOTS=/some/dir node tests/e2e/flow.js */
const assert = require('node:assert/strict');
const path = require('path');
const { serve } = require('./server.js');

const ROOT = path.resolve(__dirname, '../..');
const SHOTS = process.env.SHOTS || '';
const LESSON = +(process.env.LESSON || 1);

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

/** 跑完一个练习集：correctFn(i) 决定第 i 题答对还是答错 */
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
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push('CONSOLE: ' + m.text()); });
  const shot = async name => { if (SHOTS) await page.screenshot({ path: path.join(SHOTS, name + '.png'), fullPage: false }); };
  const step = n => console.log('  ✓', n);
  // 地址完全相同时 goto 不会触发 hashchange，所以改用 reload（Store 会在 pagehide 时写入 localStorage）
  const go = async hash => {
    const target = base + 'index.html' + hash;
    if (page.url() === target) await page.reload(); else await page.goto(target);
    await page.waitForSelector('#view > *');
  };
  const stepTab = s => page.locator('nav.steps a[data-step="' + s + '"]');
  const L = LESSON;

  // 1. 今日学习
  await go('#/');
  await page.waitForSelector('.hero');
  assert.match(await page.locator('.hero').textContent(), /第 1 天/);
  assert.equal(await page.locator('#side .nav a').count(), 8, '侧栏 8 个入口');
  assert.equal(await page.locator('.task').count(), 1, '第 1 天只有第 1 课');
  await shot('01-today'); step('今日学习：第 1 天 · 1 个任务');

  // 2. 开始学习 → 课程页（默认进入第一个没学完的步骤：导读盲听）
  await page.locator('.hero a.btn').click();
  await page.waitForSelector('nav.steps');
  assert.match(page.url(), new RegExp('#/lesson/' + L + '/intro'));
  assert.equal(await page.locator('nav.steps a').count(), 6, '6 个步骤');
  step('开始学习 → 课程页 6 步');

  // 3. ① 导读盲听
  await page.waitForSelector('text=盲听整段对话');
  await page.locator('text=盲听整段对话').click();
  await page.waitForSelector('.status:has-text("正在播放第")');
  await page.locator('button[aria-label="停止"]').click();
  await page.locator('text=显示文本').click();
  assert.ok(await page.locator('.egs .eg').count() >= 5, '显示文本后出现对话');
  await shot('02-intro');
  await runSet(page, () => true);
  await page.locator('.summary .btn.primary').click();
  await page.waitForURL(new RegExp('#/lesson/' + L + '/words'));
  assert.ok(await stepTab('intro').locator('.ok').count(), '导读盲听打勾');
  step('① 导读盲听：盲听/文本/理解题');

  // 4. ② 意语词汇
  await page.waitForSelector('.word-card');
  const nv = await page.evaluate(n => Course.day(n).vocab.length, L);
  assert.equal(await page.locator('.word-card').count(), nv, '词汇卡数 = 课程词汇数');
  assert.ok(await page.locator('.word-card .example').count() >= 3, '词汇卡带课文例句');
  assert.ok(await page.locator('.word-card mark').count() >= 3, '例句里高亮词汇');
  await page.locator('button:has-text("遮住中文")').click();
  assert.ok(await page.locator('.words-grid.cover-zh').count());
  await page.locator('.word-card').first().click();
  assert.ok(await page.locator('.word-card .zhline.rev').count() === 1, '点卡片显示中文');
  await page.locator('.word-card .star').first().click();
  assert.equal(await page.evaluate(() => Store.starIds().length), 1, '☆ 把词加入生词本');
  await shot('03-words');
  await runSet(page, () => true);
  await page.locator('.summary .btn.primary').click();
  await page.waitForURL(new RegExp('#/lesson/' + L + '/read'));
  step('② 意语词汇：词卡/例句/自测/☆/练习');

  // 5. ③ 逐句精读（彩色句子分析）
  await page.waitForSelector('.sent');
  const nl = await page.evaluate(n => Lesson.lines(n).length, L);
  assert.equal(await page.locator('.sent').count(), nl, '句子数 = 课文行数');
  await page.locator('.sent').nth(1).click();
  await page.waitForSelector('#read-panel .colored .tk');
  assert.ok(await page.locator('#read-panel .tk').count() >= 2, '彩色句子里有可点的词');
  assert.ok(await page.locator('#read-panel .legend span').count() >= 6, '颜色图例');
  assert.ok(await page.locator('#read-panel .tk.vocab').count() >= 1, '本课词汇高亮');
  await page.locator('#read-panel .tk').first().click();
  await page.waitForSelector('.pop');
  await page.mouse.click(5, 5);
  // 挑一句有谓语的句子，确认红色谓语 + 动词说明
  let foundVerb = false;
  for (let i = 0; i < nl && !foundVerb; i++) {
    await page.locator('.sent').nth(i).click();
    foundVerb = (await page.locator('#read-panel .tk.verb').count()) > 0;
  }
  assert.ok(foundVerb, '至少有一句标出红色谓语');
  assert.ok(await page.locator('#read-panel .vrow2').count() >= 1, '动词说明');
  await page.locator('#read-panel button:has-text("收藏句子")').click();
  assert.equal(await page.evaluate(() => Store.starIds().filter(i => i[0] === 's').length), 1, '句子收藏进生词本');
  await page.locator('.reader .tg', { hasText: '中' }).click();
  await page.locator('.reader .tg', { hasText: '中' }).click();
  await page.locator('.sent .tools button').first().click();
  await shot('04-read');
  await page.locator('.step-nav .btn.primary').click();
  await page.waitForURL(new RegExp('#/lesson/' + L + '/grammar'));
  assert.ok(await stepTab('read').locator('.ok').count(), '精读打勾');
  step('③ 逐句精读：着色/图例/单词弹窗/动词/收藏');

  // 6. ④ 语法透视
  await page.waitForSelector('.card');
  assert.ok((await page.locator('.dchip').count()) >= 1, '发音词表（第 1 课）');
  await page.locator('.dchip').first().click();
  assert.ok(await page.locator('details.gtag').count() >= 1, '语法点（从课文句子里扫描）');
  assert.ok(await page.locator('.tbl').count() >= 1, '表格');
  await shot('05-grammar');
  await runSet(page, () => true);
  await page.locator('.summary .btn.primary').click();
  await page.waitForURL(new RegExp('#/lesson/' + L + '/shadow'));
  step('④ 语法透视：发音/语法点/动词表/小测');

  // 7. ⑤ 影子跟读
  await page.waitForSelector('.shadow-sent');
  const fin = page.locator('.btn.primary', { hasText: '完成影子跟读' });
  assert.ok(await fin.isDisabled(), '互动前不可完成');
  await page.locator('.rate3 button').nth(2).click();                       // 第 1 句自评
  await page.locator('button:has-text("下一句")').first().click();
  await page.locator('.rate3 button').nth(1).click();                       // 第 2 句自评
  await page.locator('button:has-text("意群跟读")').click();
  await page.waitForSelector('.chunks span');
  const chips = await page.locator('.chunks span').count();
  for (let i = 0; i < chips; i++) await page.locator('.chunks span').nth(i).click();
  await page.locator('button:has-text("这句完成，下一句")').click();       // 意群完成
  await page.locator('button:has-text("自动连读")').click();
  await page.locator('button:has-text("从这句开始")').click();
  await page.waitForSelector('.status:has-text("听：第")');
  await page.locator('button:has-text("停止")').click();
  await shot('06-shadow');
  assert.ok(await fin.isEnabled(), '互动后可完成');
  await fin.click();
  await page.waitForURL(new RegExp('#/lesson/' + L + '/quiz'));
  assert.ok(await stepTab('shadow').locator('.ok').count(), '影子跟读打勾');
  step('⑤ 影子跟读：自评 / 意群 / 自动连读');

  // 8. ⑥ 闯关测验（全部答对 → 3 星，6 步全部完成）
  await page.locator('button:has-text("开始测验")').click();
  await runSet(page, () => true);
  await shot('07-quiz-summary');
  await page.locator('.summary .btn.primary').click();
  await page.waitForSelector('.big-stars');
  assert.equal((await page.locator('.big-stars').textContent()).trim(), '★★★');
  await shot('08-result');
  const st = await page.evaluate(n => ({ done: Store.lessonDone(n), best: Store.bestScore(n), cards: Store.cardCount(), steps: Store.stepCount(n) }), L);
  assert.equal(st.done, true, '6 步全部完成');
  assert.equal(st.steps, 6);
  assert.equal(st.best, 100);
  assert.ok(st.cards >= 12, '词句已加入生词本：' + st.cards);
  step('⑥ 闯关测验：满分，6 步完成，生词入库 ' + st.cards + ' 张');

  // 9. 今日学习 / 地图 / 全部课程 反映进度
  await go('#/');
  assert.match(await page.locator('.task').first().textContent(), /已完成/);
  await go('#/map');
  assert.ok(await page.locator('.day.done').count() >= 1, '地图上第 1 天打勾');
  assert.equal(await page.locator('.day').count(), 90);
  await go('#/lessons');
  assert.equal(await page.locator('.lesson-card').count() >= 10, true);
  await go('#/lessons?phase=3');
  assert.match(await page.locator('.lesson-card').first().textContent(), /第 61 课/);
  await shot('09-lessons'); step('今日学习 / 地图 / 全部课程 状态更新');

  // 10. 生词本：把卡片调成到期，翻卡评分
  await page.evaluate(() => {
    const raw = JSON.parse(Store.exportJSON());
    const t = SRS.dateStr();
    Object.keys(raw.srs).forEach(id => { raw.srs[id].due = t; });
    Store.importJSON(JSON.stringify(raw));
  });
  await go('#/words');
  await page.waitForSelector('.wlist .wrow');
  assert.ok(await page.locator('.wlist .wrow').count() >= 12);
  await page.locator('input[aria-label="搜索"]').fill('buongiorno');
  assert.ok(await page.locator('.wlist .wrow').count() >= 1);
  await page.locator('input[aria-label="搜索"]').fill('');
  await page.locator('.pill-tabs button', { hasText: '★ 收藏' }).click();
  assert.equal(await page.locator('.wlist .wrow').count(), 2, '收藏过 1 个词 + 1 个句子');
  await shot('10-words');
  await go('#/words/review?mode=due');
  await page.waitForSelector('.flash');
  for (let i = 0; i < 90 && !(await page.locator('.summary').count()); i++) {
    await page.locator('button:has-text("显示答案")').click();
    await page.locator('.rate4 .btn').nth(i % 3 === 0 ? 3 : 2).click();
  }
  assert.ok(await page.locator('.summary').count(), '复习完成');
  assert.equal(await page.evaluate(() => Store.dueCount()), 0);
  step('生词本：搜索/筛选/收藏/翻卡评分，到期清零');

  // 11. 复习日：第 5 天
  await go('#/review/5');
  await page.waitForSelector('button:has-text("开始测验")');
  await page.locator('button:has-text("开始测验")').click();
  await runSet(page, () => true);
  await page.locator('.summary .btn.primary').click();
  await page.waitForSelector('.big-stars');
  assert.equal(await page.evaluate(() => Store.reviewInfo(5) && Store.reviewInfo(5).best), 100);
  await go('#/map');
  assert.ok(await page.locator('a.day.review.done').count() >= 1, '地图上复习日打勾');
  step('复习日：综合测验通关');

  // 12. 设置与计划：天数 / 起始日期 / 大岛
  await go('#/settings');
  await page.waitForSelector('#plan-card');
  await page.locator('#plan-card button', { hasText: '60 天' }).click();
  assert.equal(await page.evaluate(() => Store.plan().days), 60);
  assert.match(await page.locator('#plan-card .note').textContent(), /学习日 48 天/);
  await page.locator('#plan-card button', { hasText: '30 天冲刺' }).click();
  assert.match(await page.locator('#plan-card .note').textContent(), /强度偏大/);
  await page.locator('#plan-card input[type="number"]').fill('120');
  await page.locator('#plan-card button', { hasText: '应用' }).click();
  assert.equal(await page.evaluate(() => Store.plan().days), 120);
  assert.match(await page.locator('#plan-card .note').textContent(), /自由日/);
  await page.locator('#plan-card label.chip:has-text("成长岛") input').uncheck();
  assert.deepEqual(await page.evaluate(() => Store.plan().phases), [1, 3]);
  await page.locator('#plan-card label.chip:has-text("成长岛") input').check();
  await page.locator('#plan-card button', { hasText: '90 天（推荐）' }).click();
  await shot('11-settings');
  await go('#/map');
  assert.equal(await page.locator('.island[id^="round"]').count(), 18, '90 天 = 18 轮');
  await page.evaluate(() => Store.setPlan({ days: 30 }));
  await go('#/map');
  assert.equal(await page.locator('.island[id^="round"]').count(), 6, '30 天 = 6 轮');
  await page.evaluate(() => Store.setPlan({ days: 90 }));
  step('设置与计划：30 / 60 / 90 / 120 / 自定义 / 选岛 → 地图随之变化');

  // 12b. 今日学习随计划日历变化：复习日 / 自由日 / 计划未开始 / 计划已结束 / 落后提示
  const setStart = (days, back) => page.evaluate(([d, b]) => Store.setPlan({ days: d, start: SRS.addDays(SRS.dateStr(), -b) }), [days, back]);
  await setStart(90, 4);                                   // 第 5 天 = 复习日
  await go('#/');
  assert.match(await page.locator('.hero').textContent(), /第 5 天[\s\S]*复习日/);
  assert.match(await page.locator('.task').first().getAttribute('href'), /#\/review\/5$/);
  await setStart(90, 10);                                  // 第 11 天：第 1 课已学完，之前计划里的其余课落后了
  await go('#/');
  assert.match(await page.locator('.banner').allTextContents().then(a => a.join('|')), /落后 \d+ 课/);
  await setStart(90, -3);                                  // 起始日期在未来
  await go('#/');
  assert.match(await page.locator('.hero').textContent(), /计划将于/);
  await setStart(90, 95);                                  // 计划已经结束
  await go('#/');
  assert.match(await page.locator('.hero').textContent(), /已经结束/);
  const freeDay = await page.evaluate(() => { Store.setPlan({ days: 120 }); const f = App.planCtx().list.find(e => e.type === 'free'); return f ? f.day : 0; });
  assert.ok(freeDay > 0, '120 天计划里应有自由日');
  await setStart(120, freeDay - 1);
  await go('#/');
  assert.match(await page.locator('.hero').textContent(), /自由日/);
  assert.ok(await page.locator('.card:has-text("这一天没有安排新课")').count() === 1);
  await page.evaluate(() => Store.setPlan({ days: 90, start: SRS.dateStr() }));
  step('今日学习随计划变化：复习日 / 落后提示 / 未开始 / 已结束 / 自由日');

  // 13. 学习方法 / 发音室 / 我的
  await go('#/method');
  assert.ok(await page.locator('.note').count() >= 6, '6 步法说明');
  assert.ok(await page.locator('.colored .tk').count() >= 5, '颜色说明里有示例句');
  await go('#/lab');
  await page.waitForSelector('.lab-card');
  assert.ok((await page.locator('.lab-card').count()) >= 20);
  await page.locator('.xchip').first().click();
  await go('#/lab/pairs');
  await page.waitForSelector('.game');
  await page.locator('.game .opt').first().click();
  await page.waitForSelector('.game .feedback.show');
  await go('#/lab/stress');
  assert.ok((await page.locator('.stressrow').count()) >= 10);
  await go('#/lab/twisters');
  assert.ok((await page.locator('.lab-card').count()) >= 5);
  await go('#/me');
  await page.waitForSelector('.radar');
  assert.ok(await page.locator('.badge').count() >= 10);
  assert.equal(await page.locator('.score-grid .sc').count(), 90);
  assert.equal(await page.locator('.score-grid .sc.done').count(), 1);
  await go('#/settings');
  await page.locator('select.sel').first().selectOption('dark');
  assert.equal(await page.evaluate(() => document.documentElement.getAttribute('data-theme')), 'dark');
  await shot('12-settings-dark');
  await page.locator('select.sel').first().selectOption('auto');
  step('学习方法 / 发音室 / 我的 / 深色主题');

  // 14. AI 老师（用假接口，不联网）
  let aiReq = null;
  await page.route('https://api.deepseek.com/**', async route => {
    aiReq = { auth: route.request().headers().authorization, body: JSON.parse(route.request().postData() || '{}') };
    await route.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify({ choices: [{ message: { content: '• **主语**：省略（动词 sta 告诉你是 Lei）\n• 这是测试回复' } }] }) });
  });
  await go('#/lesson/' + L + '/read');
  await page.locator('.sent').nth(1).click();
  assert.match(await page.locator('.ai-box').textContent(), /填入 DeepSeek API Key/, '没有 Key 时提示去设置');
  await page.evaluate(() => Store.setting('apiKey', 'sk-test-123'));
  await go('#/lesson/' + L + '/read');
  await page.locator('.sent').nth(1).click();
  await page.locator('.ai-box button', { hasText: '讲解这一句' }).click();
  await page.waitForSelector('.ai-box:has-text("这是测试回复")');
  assert.equal(aiReq.auth, 'Bearer sk-test-123');
  assert.ok(/Buongiorno! Come sta\?/.test(aiReq.body.messages[1].content), '请求里带着课文句子');
  assert.equal(aiReq.body.model, 'deepseek-chat');
  assert.equal(JSON.parse(await page.evaluate(() => Store.exportJSON())).settings.apiKey, '', '导出的进度不含 Key');
  assert.equal(await page.evaluate(() => Store.aiCount()), 1, '讲解结果被缓存');
  await page.evaluate(() => Store.setting('apiKey', ''));
  step('AI 老师：无 Key 提示 / 带 Key 请求 / 缓存 / 导出不含 Key');

  // 15. 音频：清单要覆盖全部课程文本，并且真的能用 <audio> 播放 mp3（而不是悄悄退回浏览器语音）
  await go('#/');
  await page.mouse.click(5, 5);
  const cover = await page.evaluate(() => {
    const miss = Course.speakables().filter(x => !Sound.hasFile(x.text)).map(x => x.text);
    return { files: Sound.status().files, nMiss: miss.length, miss: miss.slice(0, 8) };
  });
  assert.ok(cover.files > 3300, '音频清单应有 3300+ 条，实际 ' + cover.files);
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
  // 意群高亮要用到的播放进度回调
  const prog = await page.evaluate(async () => { const f = []; await Sound.play('Buongiorno!', { onProgress: x => f.push(x) }); return f; });
  assert.ok(prog.length >= 2 && prog[prog.length - 1] === 1 && prog.every((x, i) => i === 0 || x >= prog[i - 1]), '播放进度回调应单调递增并以 1 结束：' + prog.slice(-3));
  step('音频：清单覆盖 ' + cover.files + ' 条，mp3 实际播放 ' + played.ms + ' ms，进度回调 ' + prog.length + ' 次');

  // 16. PWA：manifest、图标、Service Worker 缓存、断网后仍可打开
  const man = await (await page.request.get(base + 'manifest.webmanifest')).json();
  assert.equal(man.display, 'standalone');
  for (const ic of man.icons) assert.equal((await page.request.get(base + ic.src)).status(), 200, ic.src);
  await go('#/');
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  const cached = await page.evaluate(async () => {
    const c = await caches.open((await caches.keys()).find(k => k.startsWith('isola-shell-')));
    return (await c.keys()).map(r => new URL(r.url).pathname);
  });
  assert.ok(cached.includes('/index.html') && cached.includes('/js/app.js') && cached.includes('/data/island9.js'), 'SW 预缓存了程序外壳');
  await ctx.setOffline(true);
  await page.goto(base + 'index.html#/lessons');
  await page.waitForSelector('.lesson-card');
  assert.ok(await page.locator('.lesson-card').count() >= 10, '断网后仍能打开并显示课程');
  await ctx.setOffline(false);
  step('PWA：manifest / 图标 / SW 预缓存 ' + cached.length + ' 个文件 / 断网可用');

  assert.deepEqual(errors, [], '页面不应有 JS 错误:\n' + errors.join('\n'));
  await ctx.close();

  // 17. 手机尺寸：底栏、返回栏、精读底部面板
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, reducedMotion: 'reduce' });
  const m = await mctx.newPage();
  const merrors = [];
  m.on('pageerror', e => merrors.push('PAGEERROR: ' + e.message));
  m.on('console', x => { if (x.type() === 'error' && !/Failed to load resource/.test(x.text())) merrors.push('CONSOLE: ' + x.text()); });
  await m.goto(base + 'index.html#/');
  await m.waitForSelector('.hero');
  assert.ok(await m.locator('#bottombar').isVisible(), '手机显示底栏');
  assert.ok(!(await m.locator('#side').isVisible()), '手机隐藏侧栏');
  assert.equal(await m.locator('#bottombar a').count(), 5);
  await m.locator('#bottombar a[data-nav="more"]').tap();
  await m.waitForSelector('.island-card');
  assert.equal(await m.locator('.island-card').count(), 4, '更多：发音室 / 我的进度 / 学习方法 / 设置与计划');
  await m.goto(base + 'index.html#/lesson/1/read');
  await m.waitForSelector('.sent');
  assert.ok(!(await m.locator('#read-panel.open').count()), '面板默认收起');
  await m.locator('.sent').nth(1).tap();
  await m.waitForSelector('#read-panel.open');
  assert.ok(await m.locator('.backdrop').count() === 1, '底部面板有遮罩');
  assert.ok(await m.locator('#read-panel .colored .tk').count() >= 2);
  if (SHOTS) await m.screenshot({ path: path.join(SHOTS, '13-mobile-read-sheet.png') });
  await m.locator('.msheet-close').tap();
  assert.ok(!(await m.locator('#read-panel.open').count()), '关闭面板');
  assert.ok(await m.locator('.backbar .back-btn').isVisible(), '子页面有返回栏');
  const noHScroll = await m.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  assert.ok(noHScroll, '手机上没有横向滚动');
  assert.deepEqual(merrors, [], '手机页面不应有 JS 错误:\n' + merrors.join('\n'));
  step('手机：底栏 / 更多 / 返回栏 / 精读底部面板 / 无横向滚动');

  console.log('E2E 通过');
  await browser.close(); srv.close();
})().catch(e => { console.error('E2E 失败：', e); process.exit(1); });
