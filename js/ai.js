/* AI 老师（可选）：调用 DeepSeek 的聊天接口讲解句子。
 * 密钥只存在你自己浏览器的 localStorage 里，请求由浏览器直接发给 api.deepseek.com，不经过任何其他服务器；
 * 导出进度文件时不会带上密钥。没有填密钥时，课程的所有功能照常使用。 */
(function (root) {
  'use strict';

  const ENDPOINT = 'https://api.deepseek.com/chat/completions';
  const SYSTEM = '你是一位耐心、严谨的意大利语老师，学生是母语为中文的零基础学习者。' +
    '请用简体中文讲解，意大利语只在需要举例时出现并附中文翻译。不要使用 Markdown 标题和表格；用短段落，需要列点时用「• 」开头；' +
    '重点词用 **双星号** 包起来。不确定的地方直接说明不确定，不要编造语法规则。';

  const ready = () => !!String(Store.setting('apiKey') || '').trim();

  async function chat(messages, opts) {
    opts = opts || {};
    const key = String(Store.setting('apiKey') || '').trim();
    if (!key) throw new Error('还没有填写 API Key（在「设置与计划」里填写）');
    const ctrl = new AbortController();
    const to = setTimeout(() => ctrl.abort(), opts.timeout || 45000);
    let res;
    try {
      res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + key },
        body: JSON.stringify({ model: Store.setting('model') || 'deepseek-chat', messages: [{ role: 'system', content: SYSTEM }].concat(messages), temperature: 0.3, max_tokens: opts.maxTokens || 700, stream: false }),
        signal: ctrl.signal,
      });
    } catch (e) {
      throw new Error(e && e.name === 'AbortError' ? '请求超时，请检查网络后重试' : '网络请求失败：' + (e && e.message ? e.message : e) + '（如果在国内，可能需要网络代理）');
    } finally { clearTimeout(to); }
    if (!res.ok) {
      let detail = '';
      try { const j = await res.json(); detail = (j.error && j.error.message) || ''; } catch (e) { /* ignore */ }
      throw new Error('接口返回 ' + res.status + (detail ? '：' + detail : '') + (res.status === 401 ? '（API Key 无效？）' : ''));
    }
    const j = await res.json();
    const text = j && j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content;
    if (!text) throw new Error('接口没有返回内容');
    return String(text).trim();
  }

  const cacheKey = (line, ctx) => 'x:' + ctx.n + ':' + line.i + ':' + (Store.setting('model') || '');
  /** 这一句以前讲解过吗（有缓存就直接显示，不重复花钱） */
  const cached = (line, ctx) => Store.aiGet(cacheKey(line, ctx));

  /** 讲解一个句子 */
  async function explain(line, ctx) {
    const key = cacheKey(line, ctx);
    const cached = Store.aiGet(key);
    if (cached) return { text: cached, cached: true };
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

  /** 设置页的"测试连接" */
  async function test() {
    const t = await chat([{ role: 'user', content: '请只回复两个字：成功' }], { maxTokens: 20, timeout: 20000 });
    return t;
  }

  root.AI = { ready, cached, explain, ask, test };
})(window);
