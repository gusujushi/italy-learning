'use strict';
/* 节奏与语调对比（js/prosody.js）：用人工合成的"类语音"信号检查——
 * 谐波音 + 音节形状的包络 + 可控的音高、停顿、速度，验证各项指标算得对、方向对。 */
const test = require('node:test');
const assert = require('node:assert/strict');
const P = require('../js/prosody.js');

const SR = 16000;

/** 合成一句"话"：lead 秒静音 + 若干音节（每个 syl 秒），音节间 gap 秒；音高由 f0(t) 给出（t 为 0..1 的相对时间） */
function speech({ syllables = 5, syl = 0.18, gap = 0.07, lead = 0.3, tail = 0.3, f0 = () => 180, gaps = null, amp = 0.5 } = {}) {
  const gapAt = i => (gaps && gaps[i] != null ? gaps[i] : gap);
  let total = lead + tail; for (let i = 0; i < syllables; i++) total += syl + (i < syllables - 1 ? gapAt(i) : 0);
  const x = new Float32Array(Math.round(total * SR));
  let t0 = lead, phase = 0;
  const speechSpan = total - lead - tail;
  for (let i = 0; i < syllables; i++) {
    const n = Math.round(syl * SR), o = Math.round(t0 * SR);
    for (let k = 0; k < n; k++) {
      const env = Math.pow(Math.sin(Math.PI * k / n), 2);              // 升余弦：每个音节一个能量峰
      const rel = (t0 - lead + k / SR) / speechSpan;
      phase += 2 * Math.PI * f0(rel) / SR;
      let s = 0; for (let h = 1; h <= 6; h++) s += Math.sin(h * phase) / h;
      x[o + k] += amp * env * s / 1.6;
    }
    t0 += syl + (i < syllables - 1 ? gapAt(i) : 0);
  }
  return x;
}

const stretch = (x, k) => P.resample(x, SR, SR * k);          // 时间拉长 k 倍（只用来测时长；音高的绝对值不重要，因为比较的是相对半音曲线）

test('resample：长度按采样率比例变化', () => {
  const x = new Float32Array(16000).fill(0.1);
  assert.equal(P.resample(x, 16000, 8000).length, 8000);
  assert.equal(P.resample(x, 16000, 16000).length, 16000);
  assert.equal(P.resample(x, 44100, 16000).length, Math.round(16000 * 16000 / 44100));
});

test('说话起止与时长：去掉首尾静音', () => {
  const a = P.analyze(speech({ syllables: 5 }), SR);
  const expected = 5 * 0.18 + 4 * 0.07;                          // 1.18 s
  assert.ok(Math.abs(a.speech - expected) < 0.12, '语音时长 ' + a.speech.toFixed(2) + ' ≈ ' + expected.toFixed(2));
  assert.ok(Math.abs(a.lead - 0.3) < 0.08, '前导静音 ' + a.lead.toFixed(2));
  assert.equal(a.pauses.length, 0, '音节间 70 ms 的缝隙不算停顿');
});

test('停顿：≥ 0.25 s 的内部静音才算', () => {
  const a = P.analyze(speech({ syllables: 5, gaps: [0.07, 0.45, 0.07, 0.07] }), SR);
  assert.equal(a.pauses.length, 1);
  assert.ok(a.pauses[0].dur > 0.35 && a.pauses[0].dur < 0.55, '停顿时长 ' + a.pauses[0].dur.toFixed(2));
});

test('音节数：能量峰个数与合成的音节数一致', () => {
  for (const n of [3, 5, 7]) {
    const a = P.analyze(speech({ syllables: n }), SR);
    assert.ok(Math.abs(a.syllables - n) <= 1, `${n} 个音节 → 检测到 ${a.syllables}`);
  }
});

test('音高：恒定 200 Hz 的中位数约 200 Hz；半音曲线是平的', () => {
  const x = P.prepare(speech({ f0: () => 200 }), SR);
  const env = P.envelope(x), b = P.bounds(env);
  const f0 = P.pitch(x, b, env);
  const v = Array.from(f0).filter(t => t > 0).sort((p, q) => p - q);
  assert.ok(v.length > 40, '有声帧 ' + v.length);
  assert.ok(Math.abs(v[v.length >> 1] - 200) < 6, '中位数 ' + v[v.length >> 1]);
  const c = P.contour(f0, b, 40);
  const pts = c.pts.filter(t => !Number.isNaN(t));
  assert.ok(Math.max.apply(null, pts) - Math.min.apply(null, pts) < 1.5, '恒定音高的曲线应当是平的');
});

test('句尾走向：上扬 / 下降 / 平', () => {
  const dir = f0 => P.analyze(speech({ syllables: 7, f0 }), SR).pitch.final.dir;
  assert.equal(dir(t => 150 + 90 * Math.max(0, t - 0.6) / 0.4), 'rise');     // 疑问句：末尾上扬
  assert.equal(dir(t => 210 - 80 * Math.max(0, t - 0.6) / 0.4), 'fall');     // 陈述句：末尾下降
  assert.equal(dir(() => 180), 'flat');
});

test('DTW：同一条序列代价为 0；拉伸后仍然很小；随机序列明显更大', () => {
  const a = Array.from({ length: 80 }, (_, i) => Math.sin(i / 6) + 0.4 * Math.sin(i / 2.3));
  assert.equal(P.dtw(a, a).cost, 0);
  const b = []; for (let i = 0; i < 110; i++) b.push(a[Math.min(79, Math.round(i * 80 / 110))]);
  const rnd = Array.from({ length: 80 }, (_, i) => Math.sin(i * 12.9898) * 1.5);
  assert.ok(P.dtw(a, b).cost < 0.15, '拉伸后 ' + P.dtw(a, b).cost.toFixed(3));
  assert.ok(P.dtw(a, rnd).cost > 0.4, '随机序列 ' + P.dtw(a, rnd).cost.toFixed(3));
});

test('对比：自己和自己 —— 语速比 1、节奏相似度高、音高曲线完全相关、无音节差', () => {
  const x = speech({ syllables: 6, f0: t => 170 + 40 * Math.sin(t * 6) });
  const c = P.compare(x, SR, x, SR);
  assert.ok(Math.abs(c.ratio - 1) < 0.02);
  assert.equal(c.syllableDiff, 0);
  assert.equal(c.pauseDiff, 0);
  assert.ok(c.rhythm > 0.95, '节奏 ' + c.rhythm);
  assert.ok(c.pitchCorr > 0.98, '音高相关 ' + c.pitchCorr);
  assert.equal(c.finalMatch, true);
});

test('对比：读得慢 1.4 倍 → 语速比约 1.4；节奏形状仍相似', () => {
  const ref = speech({ syllables: 6, f0: t => 170 + 40 * Math.sin(t * 6) });
  const user = stretch(ref, 1.4);
  const c = P.compare(user, SR, ref, SR);
  assert.ok(c.ratio > 1.25 && c.ratio < 1.55, '语速比 ' + c.ratio.toFixed(2));
  assert.equal(c.syllableDiff, 0);
  assert.ok(c.rhythm > 0.8, '节奏 ' + c.rhythm.toFixed(2));
});

test('对比：漏读一个音节 → 音节差为 -1；多出一个长停顿 → 停顿差为 +1', () => {
  const ref = speech({ syllables: 6 });
  const less = speech({ syllables: 5 });
  assert.equal(P.compare(less, SR, ref, SR).syllableDiff, -1);
  const pause = speech({ syllables: 6, gaps: [0.07, 0.07, 0.6, 0.07, 0.07] });
  const c = P.compare(pause, SR, ref, SR);
  assert.equal(c.pauseDiff, 1);
  assert.ok(c.ratio > 1.3, '多了 0.5 s 停顿，整体时长比 ' + c.ratio.toFixed(2));
});

test('对比：疑问句该上扬，用户读成下降 → finalMatch 为 false', () => {
  const up = speech({ syllables: 7, f0: t => 150 + 90 * Math.max(0, t - 0.6) / 0.4 });
  const down = speech({ syllables: 7, f0: t => 210 - 80 * Math.max(0, t - 0.6) / 0.4 });
  const c = P.compare(down, SR, up, SR);
  assert.equal(c.user.pitch.final.dir, 'fall');
  assert.equal(c.ref.pitch.final.dir, 'rise');
  assert.equal(c.finalMatch, false);
});

test('对比：几乎没声音 → tooQuiet；不会抛错', () => {
  const quiet = new Float32Array(SR).fill(0);
  const ref = speech({ syllables: 4 });
  const c = P.compare(quiet, SR, ref, SR);
  assert.equal(c.tooQuiet, true);
  assert.doesNotThrow(() => P.compare(new Float32Array(100), SR, ref, SR));
});

test('速度：4 秒音频的分析在 1 秒内完成（浏览器主线程里也不会卡）', () => {
  const x = speech({ syllables: 16, syl: 0.2, gap: 0.06 });
  const t0 = Date.now();
  P.compare(x, SR, x, SR);
  assert.ok(Date.now() - t0 < 1500, '耗时 ' + (Date.now() - t0) + ' ms');
});
