/* DOM 小工具：h() 建元素、toast、弹层。不使用 innerHTML 拼接用户数据。 */
(function (root) {
  'use strict';

  function h(tag, attrs) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(k => {
        const v = attrs[k];
        if (v == null || v === false) return;
        if (k === 'class') el.className = v;
        else if (k === 'html') el.innerHTML = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
        else if (k === 'dataset') Object.assign(el.dataset, v);
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
        else el.setAttribute(k, v === true ? '' : v);
      });
    }
    for (let i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }

  function append(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(x => append(el, x)); return; }
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  }

  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /** 极简标记：**粗体**、换行。先转义再替换，安全。 */
  function md(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>');
  }

  let toastTimer = null;
  function toast(msg, ms) {
    let t = document.getElementById('toast');
    if (!t) { t = h('div', { id: 'toast', role: 'status', 'aria-live': 'polite' }); document.body.append(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), ms || 2200);
  }

  /** 底部弹层（手机）/ 居中弹窗（桌面）。返回 {close, el} */
  function sheet(title, content, opts) {
    opts = opts || {};
    const back = h('div', { class: 'sheet-back' });
    const box = h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': title || '' });
    const close = () => {
      back.classList.remove('in');
      setTimeout(() => back.remove(), 180);
      document.removeEventListener('keydown', onKey);
      if (opts.onClose) opts.onClose();
    };
    const onKey = e => { if (e.key === 'Escape') close(); };
    box.append(
      h('div', { class: 'sheet-head' },
        h('b', { text: title || '' }),
        h('button', { class: 'icon-btn', 'aria-label': '关闭', onclick: close, text: '✕' })),
      h('div', { class: 'sheet-body' }, content)
    );
    back.append(box);
    back.addEventListener('click', e => { if (e.target === back) close(); });
    document.addEventListener('keydown', onKey);
    document.body.append(back);
    requestAnimationFrame(() => back.classList.add('in'));
    return { close, el: box };
  }

  function confirmBox(title, msg, okText) {
    return new Promise(resolve => {
      let done = false;
      const fin = v => { if (!done) { done = true; s.close(); resolve(v); } };
      const body = h('div', null,
        h('p', { text: msg }),
        h('div', { class: 'row end gap' },
          h('button', { class: 'btn ghost', onclick: () => fin(false), text: '取消' }),
          h('button', { class: 'btn danger', onclick: () => fin(true), text: okText || '确定' })));
      const s = sheet(title, body, { onClose: () => { if (!done) { done = true; resolve(false); } } });
    });
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  /** 星星字符串 */
  function stars(n, max) {
    max = max || 3;
    return '★'.repeat(n) + '☆'.repeat(Math.max(0, max - n));
  }

  root.UI = { h, clear, esc, md, toast, sheet, confirmBox, sleep, stars };
})(window);
