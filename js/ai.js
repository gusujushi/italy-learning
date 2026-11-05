/* AI 老师（可选）：调用 DeepSeek 的聊天接口讲解句子。
 * 密钥只存在你自己浏览器的 localStorage 里，请求由浏览器直接发给 api.deepseek.com，不经过任何其他服务器；
 * 导出进度文件时不会带上密钥。没有填密钥时，课程的所有功能照常使用。
 *
 * 模型名：DeepSeek 的模型名更换得比较快（旧的 deepseek-chat / deepseek-reasoner 已被新名字取代），所以这里不写死——
 * 设置里"模型"留空时，第一次使用会向 /models 查询账户可用的模型，优先选名字里带 flash 的（快、便宜）；也可以自己填写。 */
(function (root) {
  'use strict';

  const BASE = 'https://api.deepseek.com';
  const FALLBACK_MODEL = 'deepseek-v4-flash';
  const SYSTEM = '你是一位耐心、严谨的意大利语老师，学生是母语为中文的零基础学习者。' +
    '请用简体中文讲解，意大利语只在需要举例时出现并附中文翻译。不要使用 Markdown 标题和表格；用短段落，需要列点时用「• 」开头；' +
    '重点词用 **双星号** 包起来。不确定的地方直接说明不确定，不要编造语法规则。';

  let autoModel = '';
  const ready = () => !!String(Store.setting('apiKey') || '').trim();

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
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), timeout || 60000);
    let res;
    try {
      res = await fetch(BASE + path, Object.assign({ signal: ctrl.signal }, init, { headers: Object.assign({ 'Content-Type': 'application/json', Authorization: 'Bearer ' + key }, (init && init.headers) || {}) }));
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

  /** 这次要用的模型：设置里填了就用它，没填就自动选一个 */
  async function model() {
    const m = String(Store.setting('model') || '').trim();
    if (m) return m;
    if (autoModel) return autoModel;
    try { autoModel = pick(await models()); } catch (e) { /* 查询失败就用保底名字，真正的错误留给聊天请求报告 */ }
    return autoModel || FALLBACK_MODEL;
  }

  async function chat(messages, opts) {
    opts = opts || {};
    const body = m => JSON.stringify({
      model: m, messages: [{ role: 'system', content: SYSTEM }].concat(messages), temperature: 0.3, stream: false,
      // 有些模型的"思考过程"也计入 max_tokens，所以多留余量，并把思考强度调低（讲解句子用不着长篇推理）
      max_tokens: opts.maxTokens || 3000, reasoning_effort: 'low',
    });
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

  /** 设置页的"测试连接"：只查询模型列表，不消耗额度。返回 {models, using} */
  async function test() {
    const ids = await models();
    const want = String(Store.setting('model') || '').trim();
    if (ids.length && want && ids.indexOf(want) < 0) throw new Error('Key 有效，但账户里没有模型「' + want + '」。可用的模型有：' + ids.join('、'));
    return { models: ids, using: want || pick(ids) };
  }

  root.AI = { ready, cached, explain, ask, test, models };
})(window);
