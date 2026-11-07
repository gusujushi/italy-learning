/* 发音评价的"判断"部分（纯函数，UMD，Node 与浏览器通用）：
 *   - 把"识别出来的文字"和目标句逐字符对齐（对词与词的切分不敏感：buon giorno = Buongiorno），得到每个目标词读得有多像；
 *   - 用"标准音频的识别结果"做校准：连标准音频都识别不对的词，不扣分（识别器本身的弱点，不是学习者的错）；
 *   - 可选：结合"强制解码"给出的每个词的对数概率（见 js/asr-worker.js），比较你和标准音频的差；
 *   - 给出每个词的判断、总分、针对常见错误的本地改正提示，以及发给 AI 老师的精简数据。
 * 语音识别本身不在这里（见 js/asr.js），节奏与语调的对比见 js/prosody.js。 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.PronEval = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const VOWELS = 'aeiou';
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));

  /** 去重音符号、转小写，只留字母（识别器常常不带重音，也不会写撇号） */
  function fold(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');
  }

  /** 目标句 → 词表（只保留含字母的词）。l'acqua 记作一个词 */
  function tokenize(sentence) {
    return String(sentence).split(/\s+/).map(raw => ({ raw: raw.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, ''), norm: fold(raw) })).filter(w => w.norm);
  }

  /** 逐字符对齐（编辑距离）。返回每个目标字符是否匹配、它对应的识别字符，以及多出来的识别字符个数 */
  function alignChars(target, heard) {
    const a = target, b = heard, n = a.length, m = b.length;
    const D = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
    for (let i = 0; i <= n; i++) D[i][0] = i;
    for (let j = 0; j <= m; j++) D[0][j] = j;
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++) {
      D[i][j] = Math.min(D[i - 1][j] + 1, D[i][j - 1] + 1, D[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    const hit = new Array(n).fill(false), mapTo = new Array(n).fill(''), ins = new Array(n).fill(0);   // mapTo[i]：目标第 i 个字符对应的识别片段；ins[i]：紧跟在它后面多出来的识别字符个数
    let extra = 0, i = n, j = m;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && D[i][j] === D[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)) {
        hit[i - 1] = a[i - 1] === b[j - 1]; mapTo[i - 1] = b[j - 1] + mapTo[i - 1]; i--; j--;
      } else if (i > 0 && D[i][j] === D[i - 1][j] + 1) { i--; }                    // 目标字符没被读出来
      else { if (i > 0) { mapTo[i - 1] = b[j - 1] + mapTo[i - 1]; ins[i - 1]++; } else extra++; j--; }   // 多出来的识别字符：并到前一个目标字符上
    }
    return { hit, mapTo, ins, extra, dist: D[n][m] };
  }

  /** 每个目标词的匹配比例（0–1）和识别到的对应片段 */
  function wordRatios(words, heardText) {
    const heard = fold(heardText);
    const target = words.map(w => w.norm).join('');
    const al = alignChars(target, heard);
    let pos = 0, between = 0;
    const out = words.map(w => {
      const L = w.norm.length;
      let ok = 0, inner = 0, frag = '';
      for (let k = 0; k < L; k++) {
        if (al.hit[pos + k]) ok++;
        frag += al.mapTo[pos + k];
        if (k < L - 1) inner += al.ins[pos + k]; else between += al.ins[pos + k];   // 词中间多出来的字符算这个词的错（cassa），词与词之间多出来的算"多余内容"
      }
      pos += L;
      return { ratio: clamp((ok - 0.5 * inner) / L, 0, 1), heard: frag };
    });
    return { words: out, extra: al.extra + between, heardLen: heard.length, empty: heard.length === 0 };
  }

  // 标签故意用"可能"：识别器会出错（见 docs/PRONUNCIATION_EVAL.md），这些是它的判断，不是定论
  const STATUS_ZH = { ok: '读对了', slip: '有点出入', wrong: '可能读错', missing: '可能漏读', unclear: '不够清晰', unreliable: '无法判断' };

  // 强制解码的判断阈值（对数概率之差，你 − 标准音频，越负越"不像"）。
  // 用 60 句"故意读错一个词"的合成语音做过测试选定：文字对不上、且声学证据也差（Δ < -1）才判错，
  // 误报从每词 12.8% 降到 5.8%，发现率从 61% 降到 49%——宁可漏一些，也别把读对的词判错。
  // 之后又用 22 段 FLEURS 母语者朗读（读对）核对：误报 4.8% / 词，与合成语音一致。
  const SUPPORT = -1.0, UNCLEAR = -2.5, GLOBAL_CAP = 1.5;
  // 1–2 个字母的小词（a / il / è / la / di……）识别器常常漏听或写成别的：22 段母语者朗读里，误标成"漏读"的词全是这种小词。
  // 所以小词只有"被识别器听出来了"才算读对；没听出来就不判断、不扣分。
  const SHORT_WORD = 2;
  const median = a => { const x = a.slice().sort((p, q) => p - q); return x.length ? x[x.length >> 1] : 0; };

  /** 综合判断。
   *  user / ref：wordRatios() 的结果（ref 可为 null）；
   *  fu / fr：强制解码的每词对数概率数组（来自你 / 标准音频，可为 null）。 */
  function judge(words, user, ref, fu, fr) {
    // 每个词的 Δ（你 − 标准）。整句整体偏低（嗓音、麦克风不同）时，按这句的中位数校正，只看"哪个词比别的词更差"
    let deltas = null;
    if (fu && fr && fu.length === words.length && fr.length === words.length) {
      const raw = words.map((w, i) => (fu[i] != null && fr[i] != null ? fu[i] - fr[i] : null));
      const valid = raw.filter(x => x != null);
      // 最多校正 1.5：整体偏低一点是嗓音 / 麦克风的差别；偏低很多（比如读成了另一句话）是真的对不上，不能被"校正"掉
      const m = valid.length >= 3 ? Math.max(-GLOBAL_CAP, Math.min(0, median(valid))) : 0;
      deltas = raw.map(x => (x == null ? null : x - m));
    }
    const allShort = words.every(w => w.norm.length <= SHORT_WORD);                          // 整句都是小词（"Sì, no."）就照常判断
    return words.map((w, i) => {
      const u = user.words[i], r = ref ? ref.words[i] : null;
      const refRatio = r ? r.ratio : 1;
      const row = { raw: w.raw, norm: w.norm, ratio: u.ratio, refRatio, heard: u.heard, status: 'ok', delta: deltas ? deltas[i] : null };
      if (user.empty) { row.status = 'missing'; return row; }
      if (r && refRatio < 0.7) { row.status = 'unreliable'; row.why = 'ref'; return row; }                  // 标准音频也没被识别好：这是识别器的弱点，不是你的问题
      const eff = clamp(u.ratio / Math.max(refRatio, 0.75), 0, 1);
      if (eff >= 0.92) row.status = 'ok';
      else if (eff >= 0.62) row.status = 'slip';
      else if (u.heard.length === 0 || eff < 0.2) row.status = 'missing';
      else row.status = 'wrong';
      if (row.delta != null) {
        if (row.status !== 'ok' && row.delta >= SUPPORT) row.status = 'ok';                // 文字对不上，但声学证据支持这个词：多半是识别器听岔了
        else if (row.status === 'ok' && row.delta < UNCLEAR) row.status = 'unclear';      // 文字对得上，但这个词的声学证据明显比标准音频差
      }
      // 小词（a / il / è……）：识别器听出来了才算读对；没听出来可能是它漏了，不判断、不扣分
      if (!allShort && w.norm.length <= SHORT_WORD && row.status !== 'ok') { row.status = 'unreliable'; row.why = 'short'; }
      return row;
    });
  }

  /** 总分 0–100：按字符数加权；"无法判断"的词不计入；比标准音频多出来的识别内容略扣分 */
  function score(rows, user, ref) {
    const W = { ok: 1, unclear: 0.7, slip: 0.55, wrong: 0.15, missing: 0 };
    let num = 0, den = 0;
    rows.forEach(r => { if (r.status === 'unreliable') return; const L = r.norm.length; den += L; num += L * (r.status === 'ok' ? 1 : W[r.status]); });
    if (den === 0) return { score: null, judged: 0 };
    let s = num / den;
    const extraRate = user.heardLen ? Math.max(0, user.extra - (ref ? ref.extra : 0)) / user.heardLen : 0;   // 标准音频也被"多听出"的内容不算你的
    s -= clamp(extraRate, 0, 0.5) * 0.15;
    return { score: Math.round(clamp(s, 0, 1) * 100), judged: rows.filter(r => r.status !== 'unreliable').length };
  }

  // 注意：这个分数衡量的是"识别器听懂了多少"，不是"发音有多标准"。识别器很宽容（会把读错的词自动纠正成对的），
  // 所以高分只说明大意和主要音节没问题，细微的问题（双辅音长短、词尾元音是否读满……）它听不出来。
  const level = s => (s == null ? '无法判断' : s >= 90 ? '识别器完全听懂了' : s >= 75 ? '大部分听懂了' : s >= 55 ? '有几处没听清' : '很多地方没听懂');

  // ---------- 本地改正提示：针对中文母语者常见的意大利语发音问题 ----------

  const hasVowelEnd = s => s && VOWELS.includes(s[s.length - 1]);

  /** 目标词 vs 识别到的对应片段 → 提示（一个词最多一条） */
  function wordTip(w, heard) {
    const t = w.norm, h = fold(heard);
    const dbl = t.match(/([bcdfglmnprstvz])\1/);
    if (dbl && h && !h.includes(dbl[0]) && h.includes(dbl[1])) {
      return `「${w.raw}」里有双辅音 ${dbl[0]}：要把这个辅音读得更长、更用力（先把口形做好，停一拍再爆发 / 拉长），不要读成单辅音。`;
    }
    if (!dbl && h) {
      const hd = h.match(/([bcdfglmnprstvz])\1/);
      if (hd && t.includes(hd[1])) return `「${w.raw}」是单辅音，听起来被读成了双辅音（${hd[0]}）——这里不用拉长。`;
    }
    if (hasVowelEnd(t) && h && !hasVowelEnd(h)) return `「${w.raw}」的词尾元音 -${t[t.length - 1]} 被吞掉了：意大利语词尾元音要读满、读清楚，不能像英语 / 汉语那样轻轻带过。`;
    if (/ch[ei]|gh[ei]/.test(t) && h && !/ch[ei]|gh[ei]/.test(h) && /[cg][ei]/.test(h)) return `「${w.raw}」里的 ch/gh 读硬音 [k]/[g]（chi 读「基」的硬 k，不是「契」）。`;
    if (/(^|[^s])c[ei]|g[ei]/.test(t) && !/ch|gh/.test(t) && h && /[kg]/.test(h) && !/c[ei]|g[ei]/.test(h)) return `「${w.raw}」里的 ce/ci、ge/gi 读软音（ci ≈「器」、gi ≈「接」），不是硬 k / g。`;
    if (/gli/.test(t) && h && !/gl/.test(h)) return `「${w.raw}」里的 gli 要读成舌面的 [ʎ]（像「李」前面带一点 y 的鼻腔感），不是 l + i。`;
    if (/gn/.test(t) && h && !/gn|nn/.test(h)) return `「${w.raw}」里的 gn 读成 [ɲ]（像「你」的发音位置，舌面贴硬腭），不是 n + i。`;
    if (/sc[ei]/.test(t) && h && !/sc|sh|ss/.test(h)) return `「${w.raw}」里的 sce/sci 读 [ʃ]（像「sh」，嘴唇略圆），后面的元音要跟上。`;
    if (t.includes('r') && h && !h.includes('r')) return `「${w.raw}」里的 r 没有听出来：意大利语 r 是舌尖轻弹（单次）或颤动，不是英语的卷舌音，也不是汉语的「儿」。`;
    if (/^h/.test(t) && h && /^h/.test(h)) return `「${w.raw}」开头的 h 不发音（ho = o、hai = ai）。`;
    for (let i = 0; i < Math.min(t.length, h.length); i++) {
      if (t[i] !== h[i] && VOWELS.includes(t[i]) && VOWELS.includes(h[i])) return `「${w.raw}」的元音可能读偏了（目标是 ${t[i]}，听起来像 ${h[i]}）：意大利语元音只有 a e i o u，要读得纯、短、不滑动。`;
    }
    return null;
  }

  /** 这一句的发音重点：只看目标句本身，不依赖识别结果（识别器分辨不出的东西，比如双辅音的长短，也能提醒到）。最多 5 条 */
  function focus(sentence) {
    const out = [], ws = tokenize(sentence);
    const names = list => list.slice(0, 3).map(w => w.raw).join('、');
    const pick = re => ws.filter(w => re.test(w.norm));
    const gem = pick(/([bcdfglmnprstvz])\1/);
    if (gem.length) out.push(`双辅音：${names(gem)} —— 双写的辅音要读长（先把口形做好、停一拍再爆发或拉长），长短会改变意思（pala 铲子 / palla 球）。`);
    const acc = ws.filter(w => /[àèéìíòóùú]$/i.test(w.raw));
    if (acc.length) out.push(`重音在最后一个音节：${names(acc)} —— 带重音符号的词尾音节要重读、读响。`);
    const gl = pick(/gli/), gn = pick(/gn/), sc = pick(/sc[ei]/);
    if (gl.length) out.push(`gli：${names(gl)} —— 读成舌面的 [ʎ]，不是 l + i。`);
    if (gn.length) out.push(`gn：${names(gn)} —— 读成 [ɲ]（像「你」的发音位置），不是 n + i。`);
    if (sc.length) out.push(`sce / sci：${names(sc)} —— 读 [ʃ]（像「sh」，嘴唇略圆）。`);
    const hard = ws.filter(w => /ch[ei]|gh[ei]/.test(w.norm)), soft = ws.filter(w => /(^|[^s])c[ei]|g[ei]/.test(w.norm) && !/ch|gh/.test(w.norm));
    if (hard.length) out.push(`ch / gh（硬音）：${names(hard)} —— chi、che 读 [ki]、[ke]；ghi、ghe 读 [gi]、[ge]。`);
    if (soft.length) out.push(`ce / ci、ge / gi（软音）：${names(soft)} —— ci ≈「器」、ce ≈「切」、gi ≈「接」。`);
    const rr = pick(/r/);
    if (rr.length) out.push(`r：${names(rr)} —— 舌尖轻弹（单次）；rr 要连弹几下，不要读成英语的卷舌 r 或汉语的「儿」。`);
    const hh = ws.filter(w => /^h/.test(w.norm));
    if (hh.length) out.push(`开头的 h 不发音：${names(hh)}。`);
    if (out.length < 5 && ws.length) out.push('每个词的词尾元音（-o -a -e -i）都要读满、读清楚，不要吞掉。');
    return out.slice(0, 5);
  }

  /** 节奏与语调的本地提示（输入 Prosody.compare 的结果） */
  function prosodyTips(c) {
    const tips = [];
    if (!c || c.tooQuiet) return ['录音里几乎没有声音：请靠近麦克风、在安静的地方再录一次。'];
    if (c.ratio > 1.4) tips.push(`整体比标准音频慢 ${Math.round((c.ratio - 1) * 100)}%：刚开始慢一点没关系，但要练到词与词连起来读（词尾元音可以和下一个词连读）。`);
    else if (c.ratio < 0.8) tips.push(`整体比标准音频快 ${Math.round((1 - c.ratio) * 100)}%：太快容易吞掉词尾元音和双辅音，先用 0.7× 速度跟读。`);
    if (c.syllableDiff <= -2) tips.push(`你的录音比标准少了约 ${-c.syllableDiff} 个音节：很可能漏读了某个词或词尾元音，对照上面的逐词判断检查。`);
    else if (c.syllableDiff >= 2) tips.push(`你的录音比标准多了约 ${c.syllableDiff} 个音节：可能在词与词之间加了多余的「呃」或把一个音拖成了两个。`);
    if (c.pauseDiff >= 1) tips.push('停顿比标准多：试着把一个意群（见精读页的意群切分）一口气读完，停顿放在意群之间。');
    if (c.finalMatch === false) {
      const rf = c.ref.pitch.final.dir, uf = c.user.pitch.final.dir;
      const zh = d => (d === 'rise' ? '上扬' : d === 'fall' ? '下降' : '平');
      tips.push(`句尾语调：标准是${zh(rf)}，你的是${zh(uf)}。${rf === 'rise' ? '是非问句的句尾要上扬 ↗。' : rf === 'fall' ? '陈述句的句尾要自然下降 ↘。' : ''}`);
    }
    if (c.pitchCorr != null && c.pitchCorr < 0.2 && c.voicedOk) tips.push('整句的音高起伏和标准音频差别较大：跟读时注意重读音节要更高、更响，其余音节放松。');
    return tips;
  }

  /** 发给 AI 老师的精简数据（只有文字和数字，不含音频） */
  function aiPayload(o) {
    const c = o.metrics;
    return {
      target: o.target, zh: o.zh || '', heardUser: o.heardUser || '', heardRef: o.heardRef || '',
      words: o.rows.map(r => ({ word: r.raw, status: r.status, heard: r.heard || '', delta: r.delta == null ? undefined : Math.round(r.delta * 10) / 10 })),
      score: o.score,
      prosody: c && !c.tooQuiet ? {
        speedRatio: Math.round(c.ratio * 100) / 100, syllableDiff: c.syllableDiff, pauseDiff: c.pauseDiff,
        finalUser: c.user.pitch.final.dir, finalRef: c.ref.pitch.final.dir, rhythmSimilarity: Math.round(c.rhythm * 100) / 100,
      } : null,
    };
  }

  /** 整套本地评价：输入识别结果、标准音频识别结果、节奏对比，输出可直接展示的对象 */
  function evaluate(o) {
    const words = tokenize(o.target);
    const user = wordRatios(words, o.heardUser || '');
    const ref = o.heardRef != null ? wordRatios(words, o.heardRef) : null;
    const rows = judge(words, user, ref, o.scoreUser, o.scoreRef);
    const sc = score(rows, user, ref);
    const tips = [];
    rows.forEach(r => { if (r.status === 'slip' || r.status === 'wrong' || r.status === 'missing' || r.status === 'unclear') { const t = wordTip(r, r.heard); if (t) tips.push(t); } });
    const ptips = prosodyTips(o.metrics);
    return { words, rows, score: sc.score, judged: sc.judged, level: level(sc.score), tips, prosodyTips: ptips, user, ref };
  }

  return { fold, tokenize, alignChars, wordRatios, judge, score, level, wordTip, focus, prosodyTips, aiPayload, evaluate, STATUS_ZH };
});
