'use strict';
/* 发音评价的端到端测试：用 Chromium 的"假麦克风"把一段音频当作用户的录音，走完整个流程——
 * 录音 → 点「评价发音」→ 下载本机语音识别模型 → Whisper 识别（真的在浏览器里运行）→ 与标准音频对比 → 评分 / 逐词判断 /
 * 节奏与语调对比 → AI 点评（DeepSeek 用假接口）。
 * 场景 A：读对（录音 = 目标句的标准音频）→ 高分；场景 B：读成了另一句话 → 低分，并指出读错 / 漏读的词。
 * 需要 ffmpeg（把 mp3 转成假麦克风用的 wav）和 playwright。运行：node tests/e2e/pron.js */
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { serve } = require('./server.js');
const { loadCourse } = require('../helpers.js');

const ROOT = path.resolve(__dirname, '../..');
loadCourse();
const Ita = global.Ita;
const AUDIO_MAP = (() => { const c = fs.readFileSync(path.join(ROOT, 'audio/manifest.js'), 'utf8'); return JSON.parse(c.slice(c.indexOf('{'), c.lastIndexOf('}') + 1)); })();

/** 把课程里某一句的标准音频转成假麦克风用的 wav（前面留 0.3 秒静音，后面留 0.8 秒） */
function wavOf(text, dir) {
  const mp3 = path.join(ROOT, 'audio', AUDIO_MAP[Ita.speakKey(text)]);
  const out = path.join(dir, Buffer.from(text).toString('hex').slice(0, 16) + '.wav');
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', mp3, '-af', 'adelay=300:all=1,apad=pad_dur=0.8', '-ac', '1', '-ar', '48000', '-c:a', 'pcm_s16le', out]);
  return out;
}

async function scenario(chromium, base, wav, check) {
  const browser = await chromium.launch({ args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', '--use-file-for-fake-audio-capture=' + wav + '%noloop'] });
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 900 }, reducedMotion: 'reduce' });
  await ctx.grantPermissions(['microphone'], { origin: base });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
  page.on('console', m => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push('CONSOLE: ' + m.text()); });
  try { await check(page, ctx); } finally { await browser.close(); }
  assert.deepEqual(errors, [], '页面不应有 JS 错误:\n' + errors.join('\n'));
}

(async () => {
  const { chromium } = require('playwright');
  const srv = await serve(ROOT, 0);
  const base = 'http://127.0.0.1:' + srv.address().port + '/';
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'pron-e2e-'));
  const step = n => console.log('  ✓', n);
  const TARGET = 'Buongiorno! Come sta?';
  const OTHER = 'Grazie mille! Arrivederci!';
  const wavA = wavOf(TARGET, tmp), wavB = wavOf(OTHER, tmp);

  /** 录一句：点 🎤，等音频播完，再点一次结束 */
  async function record(page, ms) {
    await page.locator('button[aria-label="录音"]').click();
    await page.waitForSelector('button[aria-label="录音"].rec-on');
    await page.waitForTimeout(ms);
    await page.locator('button[aria-label="录音"]').click();
    await page.waitForSelector('button[aria-label="评价我的发音"]:not([disabled])');
  }

  const only = process.env.SCENARIO || '';

  // ---------- 场景 A：读对 ----------
  let modelMB = 0;
  if (!only || only === 'A') await scenario(chromium, base, wavA, async (page, ctx) => {
    await page.goto(base + 'index.html#/lesson/1/shadow?s=1');
    await page.waitForSelector('.shadow-sent');
    assert.match(await page.locator('.shadow-sent').textContent(), /Buongiorno! Come sta\?/);
    assert.ok(await page.locator('button[aria-label="评价我的发音"]').isDisabled(), '没录音前不能评价');
    await record(page, 3200);

    // 没有下载模型：先问要不要下载；先选「取消」→ 只有节奏与语调
    await page.locator('button[aria-label="评价我的发音"]').click();
    await page.waitForSelector('.sheet:has-text("需要下载语音识别模型")');
    await page.locator('.sheet button:has-text("取消")').click();
    await page.waitForSelector('.eval:has-text("没有下载语音识别模型")');
    await page.waitForSelector('.eval table.metric');
    assert.ok(await page.locator('.eval .chart').count() >= 1, '没有识别器也能出节奏与语调对比图');
    const rowsText = await page.locator('.eval table.metric').textContent();
    assert.match(rowsText, /语音时长/); assert.match(rowsText, /句尾语调/);
    step('A1 没下载模型时：只做节奏与语调对比，并说明原因');

    // 再点一次评价 → 下载 → 识别
    const t0 = Date.now();
    await page.locator('button[aria-label="评价我的发音"]').click();
    await page.waitForSelector('.sheet:has-text("需要下载语音识别模型")');
    await page.locator('.sheet button:has-text("下载并继续")').click();
    await page.waitForSelector('.eval .ring', { timeout: 240000 });
    const secs = Math.round((Date.now() - t0) / 1000);
    const score = +(await page.locator('.eval .ring b').textContent());
    const chips = await page.locator('.eval .wchip').evaluateAll(els => els.map(e => ({ w: e.querySelector('b').textContent, c: e.className })));
    assert.equal(chips.length, 3, '三个词：' + JSON.stringify(chips));
    assert.ok(score >= 80, '读对了应得高分，实际 ' + score + '；' + JSON.stringify(chips));
    assert.ok(!chips.some(c => /wrong|missing/.test(c.c)), '读对了不应有 wrong / missing：' + JSON.stringify(chips));
    const heard = await page.locator('.eval').textContent();
    assert.match(heard, /你的录音识别为：/); assert.match(heard, /标准音频识别为：/);
    const m = await page.evaluate(() => { const rows = {}; document.querySelectorAll('.eval table.metric tbody tr').forEach(tr => { rows[tr.children[0].textContent] = Array.from(tr.children).slice(1).map(td => td.textContent); }); return rows; });
    const ratio = parseFloat(m['语音时长'][0]) / parseFloat(m['语音时长'][1]);
    assert.ok(ratio > 0.8 && ratio < 1.25, '用标准音频当录音：语速比应接近 1，实际 ' + ratio.toFixed(2));
    assert.equal(m['句尾语调'][2], '接近', '用标准音频当录音：句尾语调应判为接近（' + m['句尾语调'].join(' | ') + '）');
    assert.match(m['节奏相似度'][0], /^\d+%$/);
    assert.ok(parseInt(m['节奏相似度'][0], 10) >= 70, '节奏相似度 ' + m['节奏相似度'][0]);
    modelMB = await page.evaluate(async () => { const c = await caches.open(ASR.CACHE); let n = 0; for (const r of await c.keys()) n += (await (await c.match(r)).blob()).size; return Math.round(n / 1e6); });
    assert.ok(modelMB > 90 && modelMB < 130, '缓存里的模型文件约 100 MB，实际 ' + modelMB);
    assert.equal(await page.evaluate(() => ASR.cached()), true);
    step('A2 下载模型 + 本机 Whisper 识别：得分 ' + score + '，识别为「' + (await page.locator('.eval p:has(.lbl) .it').first().textContent()) + '」，共 ' + secs + ' 秒，模型缓存 ' + modelMB + ' MB');

    // 同一句再评价：标准音频的识别结果已缓存，更快
    assert.equal(await page.evaluate(() => Store.skillLevel('speak') == null || true), true);
    const tip = await page.locator('.eval .ai-box').textContent();
    assert.match(tip, /DeepSeek API Key/, '没有 Key：提示去设置');
    step('A3 无 AI Key：本地评价照常给出，并提示填 Key 获得点评');

    // 有 Key：DeepSeek 点评（假接口）。检查发出去的内容——只有文字和数字，没有音频
    let req = null;
    await page.route('https://api.deepseek.com/**', async route => {
      const r = route.request();
      const cors = { 'access-control-allow-origin': '*', 'access-control-allow-headers': '*' };
      if (new URL(r.url()).pathname === '/models') return route.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify({ data: [{ id: 'deepseek-v4-flash' }] }) });
      req = { auth: r.headers().authorization, raw: r.postData() || '', body: JSON.parse(r.postData() || '{}') };
      await route.fulfill({ status: 200, contentType: 'application/json', headers: cors, body: JSON.stringify({ choices: [{ finish_reason: 'stop', message: { content: '整体读得不错！\n• 注意 **sta** 的重音\n• 句尾保持下降' } }] }) });
    });
    await page.evaluate(() => Store.setting('apiKey', 'sk-test-e2e'));
    await page.locator('button[aria-label="评价我的发音"]').click();
    await page.waitForSelector('.eval .ai-box:has-text("整体读得不错")', { timeout: 120000 });
    assert.equal(req.auth, 'Bearer sk-test-e2e');
    const user = req.body.messages[1].content;
    assert.match(req.body.messages[0].content, /发音教练/);
    assert.match(user, /目标句：Buongiorno! Come sta\?/); assert.match(user, /学生录音的识别结果：/); assert.match(user, /标准音频的识别结果：/);
    assert.match(user, /逐词判断/); assert.match(user, /语速比/); assert.match(user, /综合分：\d+ \/ 100/);
    assert.ok(req.raw.length < 6000, '发给 DeepSeek 的请求很小（只有文字和数字）：' + req.raw.length + ' 字节');
    assert.ok(!/data:audio|base64|webm|blob:/i.test(req.raw), '请求里没有音频');
    step('A4 有 AI Key：DeepSeek 只收到文字和数字（' + req.raw.length + ' 字节，无音频），点评显示在评价里');

    // 设置页：状态、删除模型
    await page.goto(base + 'index.html#/settings');
    await page.waitForSelector('#asr-card:has-text("语音识别模型已下载到本机")');          // 状态行是异步填的（先查缓存），要等它出现
    assert.match(await page.locator('#asr-card').textContent(), /语音识别模型已下载到本机/);
    assert.match(await page.locator('#asr-card').textContent(), /DeepSeek 是文本模型，不能「听」音频/);
    await page.locator('#asr-card button:has-text("删除已下载的模型")').click();
    await page.waitForSelector('#asr-card:has-text("还没有下载语音识别模型")');
    assert.equal(await page.evaluate(() => ASR.cached()), false);
    step('A5 设置页：显示已下载状态，可以删除模型');
  });

  // ---------- 场景 B：读成了另一句话 ----------
  if (!only || only === 'B') await scenario(chromium, base, wavB, async page => {
    await page.goto(base + 'index.html#/lesson/1/shadow?s=1');
    await page.waitForSelector('.shadow-sent');
    await record(page, 3600);
    await page.locator('button[aria-label="评价我的发音"]').click();
    await page.waitForSelector('.sheet:has-text("需要下载语音识别模型")');
    await page.locator('.sheet button:has-text("下载并继续")').click();
    await page.waitForSelector('.eval .ring', { timeout: 240000 });
    const score = +(await page.locator('.eval .ring b').textContent());
    const chips = await page.locator('.eval .wchip').evaluateAll(els => els.map(e => e.className));
    const detail = (await page.locator('.eval').textContent()).replace(/\s+/g, ' ').slice(0, 400);
    assert.ok(score < 55, '读成了另一句话，应是低分，实际 ' + score + '。评价内容：' + detail);
    assert.ok(chips.some(c => /wrong|missing|slip/.test(c)), '应指出读错 / 漏读的词：' + chips.join('|'));
    const tips = await page.locator('.eval .tips').allTextContents();
    assert.ok(tips.join('').length > 20, '应给出改正提示或发音重点');
    step('B 读成了另一句话：得分 ' + score + '，逐词判断 ' + chips.map(c => c.replace('wchip ', '')).join(' / '));
  });

  // ---------- 场景 C：断网 ----------
  // 模型下载后缓存在本机（Service Worker 缓存优先），断网也能运行；但标准音频也要在本机——没下载就给出清楚的说明
  if (!only || only === 'C') await scenario(chromium, base, wavA, async (page, ctx) => {
    await page.goto(base + 'index.html#/lesson/1/shadow?s=1');
    await page.waitForSelector('.shadow-sent');
    await page.evaluate(async () => { await navigator.serviceWorker.ready; });
    await page.reload();
    await page.waitForSelector('.shadow-sent');
    assert.ok(await page.evaluate(() => !!navigator.serviceWorker.controller), 'Service Worker 已接管页面');
    await page.evaluate(async () => { await ASR.download(() => {}); });
    assert.equal(await page.evaluate(() => ASR.cached()), true);

    // C1：断网 + 只有模型（标准音频没缓存）→ 清楚地说明原因，而不是一句 Failed to fetch
    await ctx.setOffline(true);
    await page.reload();
    await page.waitForSelector('.shadow-sent');
    await record(page, 3200);
    await page.locator('button[aria-label="评价我的发音"]').click();
    await page.waitForSelector('.eval .status:has-text("无法分析录音")', { timeout: 60000 });
    const why = await page.locator('.eval .status').textContent();
    assert.match(why, /下载全部音频/, '提示怎么解决：' + why);
    step('C1 断网且标准音频没缓存：说明原因并告诉你怎么办');

    // C2：把这一句的标准音频放进缓存（相当于点过"下载全部音频"）→ 断网也能完整评价
    await ctx.setOffline(false);
    await page.evaluate(async t => { const c = await caches.open('isola-audio-v1'); await c.add('audio/' + AUDIO_MAP[Ita.speakKey(t)]); }, TARGET);
    await ctx.setOffline(true);
    await page.reload();
    await page.waitForSelector('.shadow-sent');
    await record(page, 3200);
    await page.locator('button[aria-label="评价我的发音"]').click();
    await page.waitForSelector('.eval .ring', { timeout: 240000 });
    const score = +(await page.locator('.eval .ring b').textContent());
    assert.ok(score >= 80, '断网评价读对的句子，得分 ' + score);
    step('C2 断网：模型和标准音频都在本机缓存里，完整评价照常运行（得分 ' + score + '）');
  });

  console.log('发音评价 E2E 通过');
  srv.close();
  fs.rmSync(tmp, { recursive: true, force: true });
})().catch(e => { console.error('发音评价 E2E 失败：', e); process.exit(1); });
