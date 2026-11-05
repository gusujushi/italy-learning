/* 意大利语文本工具：答案比对、分词、差异标注。浏览器与 Node 通用（UMD）。 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Ita = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // 各种撇号 / 引号统一
  const APOS_RE = /[‘’ʼ`´]/g;
  const QUOTE_RE = /[“”«»]/g;

  /** 统一空白、撇号、引号。保留大小写与标点（用于音频查找键）。 */
  function clean(s) {
    return String(s == null ? '' : s)
      .replace(APOS_RE, "'")
      .replace(QUOTE_RE, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function stripAccents(s) {
    return s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
  }

  /**
   * 切成"可比较词"：小写、去标点；撇号当作分隔符（l'amico → l amico）。
   * keepAccents=false 时忽略重音符号（中文输入法打 è 很麻烦，默认宽容）。
   */
  function words(s, keepAccents) {
    let t = clean(s).toLowerCase();
    if (!keepAccents) t = stripAccents(t);
    return t.replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').filter(Boolean);
  }

  function norm(s, keepAccents) {
    return words(s, keepAccents).join(' ');
  }

  /** 编辑距离 */
  function lev(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = new Array(n + 1), cur = new Array(n + 1);
    for (let j = 0; j <= n; j++) prev[j] = j;
    for (let i = 1; i <= m; i++) {
      cur[0] = i;
      for (let j = 1; j <= n; j++) {
        const c = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + c);
      }
      const t = prev; prev = cur; cur = t;
    }
    return prev[n];
  }

  function similarity(a, b) {
    const m = Math.max(a.length, b.length);
    return m ? 1 - lev(a, b) / m : 1;
  }

  /** 词级 LCS 差异：返回 [{t, s}]，s ∈ ok | miss（漏写）| extra（多写） */
  function diffTokens(user, target) {
    const u = words(user), t = words(target);
    const m = u.length, n = t.length;
    const dp = [];
    for (let i = 0; i <= m; i++) dp.push(new Array(n + 1).fill(0));
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = u[i - 1] === t[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    const out = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
      if (u[i - 1] === t[j - 1]) { out.push({ t: t[j - 1], s: 'ok' }); i--; j--; }
      else if (dp[i - 1][j] >= dp[i][j - 1]) { out.push({ t: u[i - 1], s: 'extra' }); i--; }
      else { out.push({ t: t[j - 1], s: 'miss' }); j--; }
    }
    while (i > 0) { i--; out.push({ t: u[i], s: 'extra' }); }
    while (j > 0) { j--; out.push({ t: t[j], s: 'miss' }); }
    return out.reverse();
  }

  // 翻译题宽容比较时可省略的主语人称代词
  const SUBJ = new Set(['io', 'tu', 'lui', 'lei', 'noi', 'voi', 'loro']);

  /**
   * 检查答案。
   * - ok：词序与拼写一致（忽略大小写、标点、重音符号）
   * - lenient：翻译题用，允许省略主语代词、容忍 ≤12% 的拼写差异
   * - accentOk：ok 为真时，重音符号是否也完全一致（用于温和提示）
   */
  function check(user, target, opts) {
    opts = opts || {};
    const nu = norm(user), nt = norm(target);
    const exact = nu !== '' && nu === nt;
    let ok = exact, close = false;
    if (!exact && opts.lenient && nu) {
      const du = nu.split(' ').filter(w => !SUBJ.has(w)).join(' ');
      const dt = nt.split(' ').filter(w => !SUBJ.has(w)).join(' ');
      const s2 = similarity(du, dt);
      if (du === dt || s2 >= 0.88) ok = true;
      else if (s2 >= 0.7) close = true;
    } else if (!exact && nu && similarity(nu, nt) >= 0.9 && nt.length >= 8) {
      close = true; // 听写差一两个字母：给"接近"
    }
    return {
      ok, close, exact,
      // 仅在"精确匹配"时检查重音；宽容通过时不提示重音
      accentOk: exact ? norm(user, true) === norm(target, true) : true,
      sim: similarity(nu, nt),
      diff: diffTokens(user, target),
    };
  }

  /** 音频查找键：只统一空白/撇号/引号，保留标点（标点影响语调） */
  function speakKey(s) {
    return clean(s);
  }

  /** 空白切分，保留标点：用于排序题/可点词展示 */
  function displayTokens(s) {
    return clean(s).split(' ').filter(Boolean);
  }

  /** 把一个展示词拆成 [前导标点, 核心词, 尾随标点] */
  function wordParts(tok) {
    const m = tok.match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}][\p{L}\p{N}'’]*|)(.*)$/su);
    if (!m) return ['', tok, ''];
    // 核心词若以撇号结尾（如 po'），把撇号放到尾部
    let core = m[2], tail = m[3];
    if (/['’]$/.test(core)) { tail = core.slice(-1) + tail; core = core.slice(0, -1); }
    return [m[1], core, tail];
  }

  function shuffle(arr, rnd) {
    const a = arr.slice();
    const r = rnd || Math.random;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /** 可复现随机数（测试与"每日固定出题"） */
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  return {
    clean, stripAccents, words, norm, lev, similarity, diffTokens, check,
    speakKey, displayTokens, wordParts, shuffle, mulberry32, SUBJ,
  };
});
