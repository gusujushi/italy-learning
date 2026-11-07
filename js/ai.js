/* AI 老师（可选）：调用 DeepSeek 的聊天接口讲解句子。
 * 密钥只存在你自己浏览器的 localStorage 里，请求由浏览器直接发给 api.deepseek.com，不经过任何其他服务器；
 * 导出进度文件时不会带上密钥。没有填密钥时，课程的所有功能照常使用。
 *
 * 模型名：DeepSeek 的模型名更换得比较快（旧的 deepseek-chat / deepseek-reasoner 已被新名字取代），所以这里不写死——
 * 设置里"模型"留空时，第一次使用会向 /models 查询账户可用的模型，优先选名字里带 flash 的（快、便宜）；也可以自己填写。
 * 接口地址：默认是 DeepSeek 官方；也可以在设置里改成其他"兼容 OpenAI 格式"的平台（只允许 https，防止密钥明文传输）。 */
(function (root) {
  'use strict';

  const DEFAULT_BASE = 'https://api.deepseek.com';
  const FALLBACK_MODEL = 'deepseek-v4-flash';
  const SYSTEM = '你是一位耐心、严谨的意大利语老师，学生是母语为中文的零基础学习者。' +
    '请用简体中文讲解，意大利语只在需要举例时出现并附中文翻译。不要使用 Markdown 标题和表格；用短段落，需要列点时用「• 」开头；' +
    '重点词用 **双星号** 包起来。不确定的地方直接说明不确定，不要编造语法规则。';

  let autoModel = '', autoModelBase = '';
  const ready = () => !!String(Store.setting('apiKey') || '').trim();

  /** 接口地址是否可用：必须是 https（本机调试地址除外），否则密钥会明文传输 */
  const validBase = u => /^https:\/\/[^\s/]+(\/\S*)?$/i.test(u) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/\S*)?$/i.test(u);
  /** 当前接口地址（去掉末尾斜杠）；没填就是 DeepSeek 官方 */
  const base = () => String(Store.setting('aiBase') || '').trim().replace(/\/+$/, '') || DEFAULT_BASE;
  const isDefaultBase = () => base() === DEFAULT_BASE;

  function describe(status, data) {
    const m = (data && data.error && data.error.message) || '';
    if (status === 401) return 'API Key 不正确，请到「设置与计划」重新填写';
    if (status === 402) return 'DeepSeek 账户余额不足，请到 platform.deepseek.com 充值';
    if (status === 429) return '请求太频繁，请稍等几秒再试';
    if (status >= 500) return 'DeepSeek 服务暂时繁忙，请稍后再试';
    return m || 'HTTP ' + status;
  }

  async function call(path, init, timeout) {
    const key = String(Store.setting('apiKey') || '').trim();
    if (!key) throw new Error('还没有填写 API Key（在「设置与计划」里填写）');
    if (!validBase(base())) throw new Error('接口地址必须以 https:// 开头（在「设置与计划」里修改）');
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), timeout || 60000);
    let res;
    try {
      res = await fetch(base() + path, Object.assign({ signal: ctrl.signal }, init, { headers: Object.assign({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + key }, (init && init.headers) || {}) }));
    } catch (e) {
      throw new Error(e && e.name === 'AbortError' ? '请求超时，请检查网络后重试' : '连不上 DeepSeek，请检查网络（如果在国内，可能需要网络代理）');
    } finally { clearTimeout(to); }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { const err = new Error(describe(res.status, data)); err.status = res.status; err.api = data; throw err; }
    return data;
  }

  /** 账户里可用的模型名（不消耗额度） */
  async function models() {
    const d = await call('/models', { method: 'GET' }, 20000);
    return (d.data || []).map(m => m.id).filter(Boolean);
  }
  const pick = ids => ids.find(i => /flash/i.test(i)) || ids.find(i => /^deepseek-/i.test(i)) || ids[0] || '';

  /** 这次要用的模型：设置里填了就用它，没填就自动选一个（换了接口地址就重新选） */
  async function model() {
    const m = String(Store.setting('model') || '').trim();
    if (m) return m;
    if (autoModel && autoModelBase === base()) return autoModel;
    autoModel = ''; autoModelBase = base();
    try { autoModel = pick(await models()); } catch (e) { /* 查询失败：DeepSeek 官方用保底名字，真正的错误留给聊天请求报告 */ }
    if (!autoModel && !isDefaultBase()) throw new Error('这个平台没有返回模型列表，请在「设置与计划」里手动填写模型名（按平台文档）');
    return autoModel || FALLBACK_MODEL;
  }

  async function chat(messages, opts) {
    opts = opts || {};
    const body = m => JSON.stringify(Object.assign({
      model: m, messages: [{ role: 'system', content: opts.system || SYSTEM }].concat(messages), temperature: 0.3, stream: false,
      // 有些模型的"思考过程"也计入 max_tokens，所以多留余量，并把思考强度调低（讲解句子用不着长篇推理）
      max_tokens: opts.maxTokens || 3000,
    }, isDefaultBase() ? { reasoning_effort: 'low' } : {}));   // reasoning_effort 是 DeepSeek 的参数，其他平台可能不认，就不发
    let m = await model(), d;
    try {
      d = await call('/chat/completions', { method: 'POST', body: body(m) }, opts.timeout || 90000);
    } catch (e) {
      // 模型名不对（改名了 / 账户没有这个模型）：告诉用户有哪些可用，而不是只报一个 400
      if ((e.status === 400 || e.status === 404) && /model/i.test(String(e.message))) {
        let ids = [];
        try { ids = await models(); } catch (e2) { /* ignore */ }
        if (ids.length && ids.indexOf(m) < 0) {
          const alt = pick(ids);
          if (!String(Store.setting('model') || '').trim() && alt && alt !== m) { autoModel = alt; m = alt; d = await call('/chat/completions', { method: 'POST', body: body(m) }, opts.timeout || 90000); }
          else throw new Error('账户里没有模型「' + m + '」。可用的模型有：' + ids.join('、') + '。请在「设置与计划」里改一下。');
        } else throw e;
      } else throw e;
    }
    const c = (d.choices || [])[0] || {};
    const text = String((c.message && c.message.content) || '').trim();
    if (!text) throw new Error(c.finish_reason === 'length' ? '讲解太长被截断了，请再试一次' : '没有收到讲解内容');
    return c.finish_reason === 'length' ? text + '\n\n（讲解较长，后面部分被截断）' : text;
  }

  const cacheKey = (line, ctx) => 'x:' + ctx.n + ':' + line.i;
  /** 这一句以前讲解过吗（有缓存就直接显示，不重复花钱） */
  const cached = (line, ctx) => Store.aiGet(cacheKey(line, ctx));

  /** 讲解一个句子。force = 忽略缓存重新讲 */
  async function explain(line, ctx, force) {
    const key = cacheKey(line, ctx);
    const old = force ? '' : Store.aiGet(key);
    if (old) return { text: old, cached: true };
    const prompt = '这是第 ' + ctx.n + ' 课（' + ctx.title + '）里的一句：\n' + line.it + '\n中文参考译文：' + line.zh + '\n\n' +
      '请依次说明：\n• 句子结构：谁做什么（主语、谓语、宾语或补语）；\n• 每个动词的原形、时态和人称，为什么这样变位；\n• 值得注意的语法点、冠词 / 介词用法或固定搭配；\n• 再给一个结构相同的替换例句（意大利语 + 中文）。\n控制在 300 字以内。';
    const text = await chat([{ role: 'user', content: prompt }]);
    Store.aiSet(key, text);
    return { text, cached: false };
  }

  /** 针对某个句子的自由提问 */
  async function ask(line, ctx, question) {
    const prompt = '课文句子（第 ' + ctx.n + ' 课）：' + line.it + '（' + line.zh + '）\n我的问题：' + question + '\n请简明回答，300 字以内。';
    return chat([{ role: 'user', content: prompt }]);
  }

  const COACH = '你是一位耐心、严谨的意大利语发音教练，学生是母语为中文的初学者。' +
    '你拿到的是程序自动分析的结果（语音识别可能出错，这不是人耳听感），只能依据这些数据下判断。' +
    '逐词判断本身有误差：母语者把句子读对，也约有 4% 的词会被标成「有点出入」，所以只有一两个轻微标记时请用「可能」「建议再听一遍确认」这样的措辞，不要下定论。' +
    '请用简体中文，语气温和但具体；不要使用 Markdown 标题和表格；需要列点时用「• 」开头；重点词用 **双星号** 包起来。' +
    '数据不足以判断的地方要直说，不要编造数据里没有的问题。';

  /** 发音点评。p 是 PronEval.aiPayload() 的结果（只有文字和数字，不含音频）。
   *  这里 DeepSeek 做的是"根据识别文字和对比数据写评语、给改正意见"——它本身不能听音频。 */
  async function pronFeedback(p, ctx) {
    const ST = { ok: '读对了', slip: '有点出入', wrong: '可能读错', missing: '可能漏读', unclear: '不够清晰', unreliable: '无法判断（词太短，或标准音频也没被识别准）' };
    const lines = p.words.map(w => '• ' + w.word + '：' + (ST[w.status] || w.status) + (w.heard && w.status !== 'ok' && w.status !== 'unreliable' ? '，识别成「' + w.heard + '」' : '')).join('\n');
    const pr = p.prosody;
    const dir = d => (d === 'rise' ? '上扬' : d === 'fall' ? '下降' : d === 'flat' ? '平' : '无法判断');
    const pros = pr
      ? '语速比 ' + pr.speedRatio + '（大于 1 表示学生更慢）；音节数差 ' + pr.syllableDiff + '（只是估计，±1 以内属正常误差；≤ -2 才可能是漏读）；停顿数差 ' + pr.pauseDiff + '；句尾走向：学生 ' + dir(pr.finalUser) + ' / 标准 ' + dir(pr.finalRef) + '；节奏相似度 ' + pr.rhythmSimilarity + '（0–1）'
      : '（没有可用的节奏与语调数据）';
    const prompt = '课文：第 ' + ctx.n + ' 课「' + ctx.title + '」\n目标句：' + p.target + (p.zh ? '（中文：' + p.zh + '）' : '') + '\n' +
      '标准音频的识别结果：' + (p.heardRef || '（无）') + '\n学生录音的识别结果：' + (p.heardUser || '（没有识别出内容）') + '\n' +
      '逐词判断：\n' + lines + '\n节奏与语调（学生 vs 标准音频）：' + pros + '\n综合分：' + (p.score == null ? '无法判断' : p.score + ' / 100') + '\n\n' +
      '请写点评，包含：\n① 总体评价（1–2 句，先肯定做得好的地方）；\n② 针对有问题的词：说明中文母语者常见的原因（双辅音、词尾元音、r 颤音、c/g 软硬、gli / gn、重音位置等）和具体的改正方法（口型、舌位、节奏；可以用近似的汉语读音，但要说明只是近似）；\n' +
      '③ 节奏 / 语调建议（只依据上面的数据）；\n④ 一个马上能做的练习（比如 0.7× 慢速跟读 3 遍，再正常速度重录一次对比）。\n' +
      '要求：识别结果可能不准，不确定的地方要说明；如果全部读对，就给 1–2 条进阶建议；控制在 300 字以内。';
    return chat([{ role: 'user', content: prompt }], { system: COACH, maxTokens: 3000 });
  }

  /** 设置页的"测试连接"：只查询模型列表，不消耗额度。返回 {models, using}。
   *  有些平台没有 /models，这时（只在自定义接口地址下）改发一条很短的聊天请求来验证 */
  async function test() {
    const want = String(Store.setting('model') || '').trim();
    let ids;
    try { ids = await models(); } catch (e) {
      if (isDefaultBase() || (e.status !== 404 && e.status !== 405)) throw e;
      if (!want) throw new Error('这个平台没有模型列表接口，请先在上面填写模型名，再测试连接');
      await call('/chat/completions', { method: 'POST', body: JSON.stringify({ model: want, messages: [{ role: 'user', content: '请只回复：成功' }], max_tokens: 16, stream: false }) }, 30000);
      return { models: [], using: want };
    }
    if (ids.length && want && ids.indexOf(want) < 0) throw new Error('Key 有效，但账户里没有模型「' + want + '」。可用的模型有：' + ids.join('、'));
    return { models: ids, using: want || pick(ids) };
  }

  root.AI = { ready, cached, explain, ask, pronFeedback, test, models, validBase, DEFAULT_BASE };
})(window);
