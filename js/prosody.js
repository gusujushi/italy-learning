/* 节奏与语调的声学对比（纯函数，UMD，Node 与浏览器通用）。
 *
 * 把"你的录音"和"标准音频"都转成同样的特征再比较：语速、停顿、音节数、节奏（能量包络做 DTW 对齐）、音高曲线（语调）。
 * 这些是**客观、可解释**的数字，用来回答"读得快 / 慢、有没有吞掉音节、句尾该上扬还是下降"；
 * 它们不能判断某个音素发得对不对——那部分靠语音识别（见 js/asr.js）。
 *
 * 输入都是单声道 Float32Array 采样点。内部统一处理成 16 kHz。 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Prosody = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const SR = 16000;
  const HOP = 0.010;            // 帧移 10 ms
  const WIN = 0.025;            // 能量窗 25 ms
  const PAUSE_MIN = 0.25;       // 内部静音 ≥ 0.25 s 才算"停顿"（辅音的闭塞也会有 100 ms 左右的静音，不算）

  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const median = arr => { const a = arr.slice().sort((x, y) => x - y); return a.length ? a[a.length >> 1] : 0; };
  const mean = a => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);
  const std = a => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) * (x - m)))); };

  /** 线性插值重采样 */
  function resample(x, from, to) {
    if (from === to) return Float32Array.from(x);
    const n = Math.max(1, Math.round(x.length * to / from));
    const out = new Float32Array(n), r = from / to;
    for (let i = 0; i < n; i++) {
      const p = i * r, i0 = Math.floor(p), f = p - i0;
      out[i] = (x[i0] || 0) * (1 - f) + (x[Math.min(x.length - 1, i0 + 1)] || 0) * f;
    }
    return out;
  }

  /** 去直流、归一化到峰值 0.9，并统一成 16 kHz */
  function prepare(x, sr) {
    let y = resample(x, sr || SR, SR);
    const m = mean(Array.from(y.length > 200000 ? y.subarray(0, 200000) : y));
    let pk = 1e-9;
    for (let i = 0; i < y.length; i++) { y[i] -= m; const a = Math.abs(y[i]); if (a > pk) pk = a; }
    const g = 0.9 / pk;
    for (let i = 0; i < y.length; i++) y[i] *= g;
    return y;
  }

  /** 短时能量（dB），10 ms 一帧 */
  function envelope(x) {
    const w = Math.round(WIN * SR), h = Math.round(HOP * SR);
    const n = Math.max(0, Math.floor((x.length - w) / h) + 1);
    const env = new Float32Array(n);
    for (let f = 0; f < n; f++) {
      let s = 0; const o = f * h;
      for (let i = 0; i < w; i++) { const v = x[o + i]; s += v * v; }
      env[f] = 10 * Math.log10(s / w + 1e-12);
    }
    return env;
  }

  function smooth(a, k) {
    const out = new Float32Array(a.length), r = k >> 1;
    for (let i = 0; i < a.length; i++) {
      let s = 0, c = 0;
      for (let j = Math.max(0, i - r); j <= Math.min(a.length - 1, i + r); j++) { s += a[j]; c++; }
      out[i] = s / c;
    }
    return out;
  }

  /** 找出说话的起止和内部停顿。返回帧序号（10 ms 为单位） */
  function bounds(env) {
    const peak = Math.max.apply(null, Array.from(env));
    const sorted = Array.from(env).sort((a, b) => a - b);
    const floor = sorted[Math.floor(sorted.length * 0.1)] || -120;
    const thr = Math.max(floor + 8, peak - 32);
    const on = Array.from(env, v => v >= thr);
    // 填平 < 60 ms 的小缝隙（爆破音的闭塞等）
    const gapMax = Math.round(0.06 / HOP);
    for (let i = 0; i < on.length;) {
      if (on[i]) { i++; continue; }
      let j = i; while (j < on.length && !on[j]) j++;
      if (i > 0 && j < on.length && j - i < gapMax) for (let k = i; k < j; k++) on[k] = true;
      i = j;
    }
    const start = on.indexOf(true), end = on.lastIndexOf(true);
    if (start < 0) return { start: 0, end: 0, on, pauses: [], thr, empty: true };
    const pauses = [];
    for (let i = start; i <= end;) {
      if (on[i]) { i++; continue; }
      let j = i; while (j <= end && !on[j]) j++;
      if ((j - i) * HOP >= PAUSE_MIN) pauses.push({ at: (i - start) * HOP, dur: (j - i) * HOP });
      i = j;
    }
    return { start, end, on, pauses, thr, empty: false };
  }

  /** 音节核（能量峰）：平滑后取局部最大，峰与前后谷至少差 4 dB，峰间距 ≥ 120 ms */
  function syllablePeaks(env, b) {
    if (b.empty) return [];
    const s = smooth(env, 5), peaks = [];
    const near = Math.round(0.06 / HOP), far = Math.round(0.15 / HOP), minGap = Math.round(0.12 / HOP);
    for (let i = b.start + 1; i < b.end; i++) {
      if (!b.on[i]) continue;
      let isMax = true;
      for (let j = Math.max(0, i - near); j <= Math.min(s.length - 1, i + near); j++) if (s[j] > s[i]) { isMax = false; break; }
      if (!isMax) continue;
      let lo = Infinity;
      for (let j = Math.max(b.start, i - far); j <= Math.min(b.end, i + far); j++) lo = Math.min(lo, s[j]);
      if (s[i] - lo < 4) continue;
      if (peaks.length && i - peaks[peaks.length - 1] < minGap) { if (s[i] > s[peaks[peaks.length - 1]]) peaks[peaks.length - 1] = i; continue; }
      peaks.push(i);
    }
    return peaks;
  }

  /** 音高（基频）曲线：归一化自相关。返回每帧 Hz，0 表示清音 / 静音 */
  function pitch(x, b, env) {
    const w = Math.round(0.040 * SR), h = Math.round(HOP * SR);
    const lagMin = Math.floor(SR / 400), lagMax = Math.ceil(SR / 70);
    const n = Math.max(0, Math.floor((x.length - w - lagMax) / h) + 1);
    const f0 = new Float32Array(n);
    const nrg = new Float32Array(w + lagMax + 1);
    for (let f = 0; f < n; f++) {
      if (b && (f < b.start || f > b.end || (env && env[f] < b.thr + 3))) continue;
      const o = f * h;
      let e0 = 0;
      for (let i = 0; i < w; i++) e0 += x[o + i] * x[o + i];
      if (e0 < 1e-6) continue;
      let best = 0, bestLag = 0;
      const r = new Float32Array(lagMax + 2);
      for (let lag = lagMin; lag <= lagMax; lag++) {
        let c = 0, e1 = 0;
        for (let i = 0; i < w; i++) { const y = x[o + i + lag]; c += x[o + i] * y; e1 += y * y; }
        r[lag] = c / Math.sqrt(e0 * e1 + 1e-12);
        if (r[lag] > best) { best = r[lag]; bestLag = lag; }
      }
      if (best < 0.5) continue;
      // 倍频错误：优先选"足够高的最小滞后"
      for (let lag = lagMin; lag < bestLag; lag++) {
        if (r[lag] >= 0.92 * best && r[lag] >= r[lag - 1] && r[lag] >= r[lag + 1]) { bestLag = lag; break; }
      }
      // 抛物线插值
      const a = r[bestLag - 1], bb = r[bestLag], c2 = r[bestLag + 1];
      const den = a - 2 * bb + c2;
      const delta = Math.abs(den) > 1e-9 ? 0.5 * (a - c2) / den : 0;
      f0[f] = SR / (bestLag + clamp(delta, -1, 1));
    }
    void nrg;
    // 中值滤波去掉孤立的跳变
    const out = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      if (!f0[i]) continue;
      const win = [];
      for (let j = i - 2; j <= i + 2; j++) if (j >= 0 && j < n && f0[j]) win.push(f0[j]);
      out[i] = win.length >= 3 ? median(win) : 0;
    }
    return out;
  }

  /** 把音高曲线变成"相对半音"曲线并重采样到 N 个点（以说话的起止为时间轴）；没有音高的位置是 NaN */
  function contour(f0, b, N) {
    const voiced = [];
    for (let i = b.start; i <= b.end && i < f0.length; i++) if (f0[i] > 0) voiced.push(f0[i]);
    if (voiced.length < 8) return { pts: new Array(N).fill(NaN), voiced: voiced.length, med: 0 };
    const med = median(voiced);
    const pts = new Array(N).fill(NaN), cnt = new Array(N).fill(0), sum = new Array(N).fill(0);
    const span = Math.max(1, b.end - b.start + 1);
    for (let i = b.start; i <= b.end && i < f0.length; i++) {
      if (!(f0[i] > 0)) continue;
      const st = 12 * Math.log2(f0[i] / med);
      if (Math.abs(st) > 9.5) continue;                 // 偏离说话人中位数将近一个八度：基频跟踪的倍频 / 半频错误，丢掉
      const k = Math.min(N - 1, Math.floor((i - b.start) / span * N));
      sum[k] += st; cnt[k]++;
    }
    for (let k = 0; k < N; k++) if (cnt[k]) pts[k] = sum[k] / cnt[k];
    return { pts, voiced: voiced.length, med };
  }

  /** 句尾走向：最后 ~30% 有音高的点相对前面的变化。半音 */
  function finalDirection(pts) {
    const idx = []; pts.forEach((v, i) => { if (!Number.isNaN(v)) idx.push(i); });
    if (idx.length < 8) return { dir: 'unknown', delta: 0 };
    const k = Math.max(3, Math.round(idx.length * 0.25));
    const tail = idx.slice(-k).map(i => pts[i]);
    const before = idx.slice(-2 * k, -k).map(i => pts[i]);
    const delta = mean(tail) - mean(before.length ? before : tail);
    return { dir: delta > 1.5 ? 'rise' : delta < -1.5 ? 'fall' : 'flat', delta };
  }

  function pearson(a, b) {
    const xs = [], ys = [];
    for (let i = 0; i < a.length; i++) if (!Number.isNaN(a[i]) && !Number.isNaN(b[i])) { xs.push(a[i]); ys.push(b[i]); }
    if (xs.length < 6) return null;
    const mx = mean(xs), my = mean(ys);
    let sxy = 0, sxx = 0, syy = 0;
    for (let i = 0; i < xs.length; i++) { sxy += (xs[i] - mx) * (ys[i] - my); sxx += (xs[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
    return sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : null;
  }

  /** 带状 DTW，返回平均每步代价 */
  function dtw(a, b) {
    const n = a.length, m = b.length;
    if (!n || !m) return { cost: Infinity, steps: 0, offDiag: 0 };
    const band = Math.max(Math.abs(n - m) + 10, Math.round(0.35 * Math.max(n, m)));
    const INF = 1e18;
    const D = Array.from({ length: n + 1 }, () => new Float64Array(m + 1).fill(INF));
    const S = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
    D[0][0] = 0;
    for (let i = 1; i <= n; i++) {
      const jc = Math.round(i * m / n);
      for (let j = Math.max(1, jc - band); j <= Math.min(m, jc + band); j++) {
        const c = Math.abs(a[i - 1] - b[j - 1]);
        let best = D[i - 1][j - 1], st = S[i - 1][j - 1];
        if (D[i - 1][j] < best) { best = D[i - 1][j]; st = S[i - 1][j]; }
        if (D[i][j - 1] < best) { best = D[i][j - 1]; st = S[i][j - 1]; }
        D[i][j] = best + c; S[i][j] = st + 1;
      }
    }
    const steps = S[n][m] || 1;
    return { cost: D[n][m] / steps, steps, offDiag: Math.max(0, steps - Math.min(n, m)) / steps };
  }

  /** 说话部分的包络，z 分数、20 ms 一点 */
  function envShape(env, b) {
    if (b.empty) return [];
    const seg = Array.from(smooth(env.subarray(b.start, b.end + 1), 3));
    const ds = []; for (let i = 0; i < seg.length; i += 2) ds.push(seg[i]);
    const m = mean(ds), s = std(ds) || 1;
    return ds.map(v => clamp((v - m) / s, -3, 3));
  }

  /** 一段录音的特征 */
  function analyze(pcm, sr) {
    const x = prepare(pcm, sr);
    const env = envelope(x);
    const b = bounds(env);
    const peaks = syllablePeaks(env, b);
    const f0 = pitch(x, b, env);
    const c = contour(f0, b, 40);
    const shape = envShape(env, b);
    return {
      total: x.length / SR, speech: b.empty ? 0 : (b.end - b.start + 1) * HOP, lead: b.start * HOP,
      pauses: b.pauses, syllables: peaks.length, peakTimes: peaks.map(p => (p - b.start) * HOP),
      pitch: { pts: c.pts, voiced: c.voiced, median: c.med, final: finalDirection(c.pts),
        range: (() => { const v = c.pts.filter(t => !Number.isNaN(t)).sort((p, q) => p - q); return v.length >= 8 ? v[Math.floor(v.length * 0.9)] - v[Math.floor(v.length * 0.1)] : 0; })() },
      shape,
    };
  }

  /** 用户录音 vs 标准音频 */
  function compare(userPcm, userSr, refPcm, refSr) {
    const u = analyze(userPcm, userSr), r = analyze(refPcm, refSr);
    const warp = dtw(u.shape, r.shape);
    const corr = pearson(u.pitch.pts, r.pitch.pts);
    return {
      user: u, ref: r,
      ratio: r.speech > 0 ? u.speech / r.speech : 1,                 // > 1：你更慢
      syllableDiff: u.syllables - r.syllables,                       // < 0：可能漏读音节
      pauseDiff: u.pauses.length - r.pauses.length,
      rhythm: Number.isFinite(warp.cost) ? clamp(1 - warp.cost / 1.2, 0, 1) : 0,
      pitchCorr: corr,
      // 句尾走向只在两者的变化相差 ≥ 3 个半音时才算"不一致"（同一段音频经过录音压缩后，"平"和"下降"的边界会抖动，不能因此误报）
      finalMatch: u.pitch.final.dir === 'unknown' || r.pitch.final.dir === 'unknown' ? null : Math.abs(u.pitch.final.delta - r.pitch.final.delta) < 3,
      voicedOk: u.pitch.voiced >= 8 && r.pitch.voiced >= 8,
      tooQuiet: u.speech < 0.25,
    };
  }

  return { SR, HOP, resample, prepare, envelope, bounds, syllablePeaks, pitch, contour, finalDirection, pearson, dtw, envShape, analyze, compare };
});
