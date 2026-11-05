/* 入口：路由、主题、学习计时 */
(function (root) {
  'use strict';

  const view = document.getElementById('view');
  const TABMAP = { '': 'map', map: 'map', day: 'map', review: 'review', lab: 'lab', me: 'me' };

  function applyTheme() {
    const t = Store.setting('theme');
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
  }

  function parse() {
    const raw = location.hash.replace(/^#\/?/, '');
    const qi = raw.indexOf('?');
    const path = qi >= 0 ? raw.slice(0, qi) : raw;
    return { parts: path.split('/').filter(Boolean), q: new URLSearchParams(qi >= 0 ? raw.slice(qi + 1) : '') };
  }

  function route() {
    Sound.stop();
    document.querySelectorAll('.pop').forEach(p => p.remove());
    const r = parse(), a = r.parts[0] || '';
    document.body.dataset.route = a || 'map';
    document.querySelectorAll('#tabs a').forEach(t => t.classList.toggle('on', t.dataset.tab === (TABMAP[a] || 'map')));
    view.style.removeProperty('--h');
    try {
      if (a === 'day') root.Views.lesson(view, parseInt(r.parts[1], 10), r.parts[2]);
      else if (a === 'review') root.Views.review(view, r.q);
      else if (a === 'lab') root.Views.lab(view, r.parts[1]);
      else if (a === 'me') root.Views.me(view);
      else root.Views.map(view);
    } catch (e) {
      console.error(e);
      view.textContent = '';
      view.append(UI.h('div', { class: 'pad' }, UI.h('p', { class: 'big', text: '出错了 😵' }), UI.h('pre', { class: 'err', text: String(e && e.stack || e) }),
        UI.h('a', { class: 'btn primary', href: '#/', text: '回到地图' })));
    }
    window.scrollTo(0, 0);
  }

  // 学习计时：页面可见且 60 秒内有操作时，每 15 秒累计一次
  let lastAct = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev => window.addEventListener(ev, () => { lastAct = Date.now(); }, { passive: true }));
  setInterval(() => {
    if (document.visibilityState === 'visible' && Date.now() - lastAct < 60000 && /^(day|review|lab)$/.test(document.body.dataset.route || '')) Store.tick(15);
  }, 15000);

  applyTheme();
  window.addEventListener('hashchange', route);
  root.App = { route, applyTheme };
  route();
})(window);
