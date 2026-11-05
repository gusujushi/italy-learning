/* 入口：路由、导航、返回栏、学习计划上下文、主题、学习计时、PWA 注册 */
(function (root) {
  'use strict';
  const h = UI.h;
  const view = document.getElementById('view');

  // 导航：侧栏（桌面）和底栏（手机）共用一份
  const NAV = [
    { id: 'today', hash: '#/', ico: '🏠', zh: '今日学习', short: '今日' },
    { id: 'map', hash: '#/map', ico: '🗺️', zh: '学习地图', short: '地图' },
    { id: 'lessons', hash: '#/lessons', ico: '📚', zh: '全部课程', short: '课程' },
    { id: 'words', hash: '#/words', ico: '🔖', zh: '生词本', short: '生词本' },
    { id: 'lab', hash: '#/lab', ico: '🔊', zh: '发音室' },
    { id: 'me', hash: '#/me', ico: '📊', zh: '我的进度' },
    { id: 'method', hash: '#/method', ico: '🧭', zh: '学习方法' },
    { id: 'settings', hash: '#/settings', ico: '⚙️', zh: '设置与计划' },
  ];
  const BOTTOM = ['today', 'map', 'lessons', 'words', 'more'];
  // 路由 → 高亮哪一项
  const HILITE = { '': 'today', today: 'today', map: 'map', lessons: 'lessons', lesson: 'lessons', review: 'today', words: 'words', lab: 'lab', me: 'me', method: 'method', settings: 'settings', more: 'more' };
  const TOP = new Set(['', 'today', 'map', 'lessons', 'words', 'lab', 'me', 'method', 'settings', 'more']);
  const TITLES = { '': '今日学习', today: '今日学习', map: '学习地图', lessons: '全部课程', words: '生词本', lab: '发音室', me: '我的进度', method: '学习方法', settings: '设置与计划', more: '更多', lesson: '课程', review: '复习日' };

  function applyTheme() {
    const t = Store.setting('theme');
    if (t === 'light' || t === 'dark') document.documentElement.setAttribute('data-theme', t);
    else document.documentElement.removeAttribute('data-theme');
  }

  function buildNav() {
    const side = document.getElementById('side'), bot = document.getElementById('bottombar');
    UI.clear(side); UI.clear(bot);
    side.append(
      h('div', { class: 'logo' }, h('div', { class: 'logo-badge', 'aria-hidden': 'true', text: '🏝️' }), h('div', null, h('b', { text: '意大利语能力岛' }), h('span', { text: 'Isola dell’Italiano' }))),
      h('nav', { class: 'nav' }, NAV.map(n => h('a', { href: n.hash, dataset: { nav: n.id } }, h('span', { class: 'ico', 'aria-hidden': 'true', text: n.ico }), h('span', { text: n.zh })))),
      h('div', { class: 'side-foot', id: 'sidefoot' }));
    BOTTOM.forEach(id => {
      const n = NAV.find(x => x.id === id) || { id: 'more', hash: '#/more', ico: '⋯', short: '更多' };
      bot.append(h('a', { href: n.hash, dataset: { nav: id } }, h('span', { class: 'ico', 'aria-hidden': 'true', text: n.ico }), h('span', { text: n.short })));
    });
  }

  function parse() {
    const raw = location.hash.replace(/^#\/?/, '');
    const qi = raw.indexOf('?');
    const path = qi >= 0 ? raw.slice(0, qi) : raw;
    return { parts: path.split('/').filter(Boolean), q: new URLSearchParams(qi >= 0 ? raw.slice(qi + 1) : ''), hash: location.hash || '#/' };
  }

  // ---------- 学习计划上下文 ----------
  let planCache = null;
  /** 当前学习计划：{key, units, byId, list}。设置里改了天数 / 阶段就会重新生成 */
  function planCtx() {
    const p = Store.plan();
    const key = p.days + '|' + p.phases.join(',');
    if (!planCache || planCache.key !== key) {
      const units = Lesson.planUnits(p.phases);
      const byId = {};
      units.forEach(u => { byId[u.id] = u; });
      planCache = { key, units, byId, list: Plan.build(units, { days: p.days }) };
    }
    return planCache;
  }
  /** 今天在计划里的位置 */
  function todayInfo() {
    const p = Store.plan(), ctx = planCtx();
    const offset = SRS.diffDays(p.start, Store.today());
    const day = Plan.currentDay(p.start, Store.today(), p.days);
    return { p, ctx, offset, day, entry: ctx.list[day - 1], status: offset < 0 ? 'before' : offset >= p.days ? 'after' : 'running' };
  }
  /** 计划里某一课所在的那一天（找不到返回 0） */
  function dayOfLesson(n) {
    const e = planCtx().list.find(x => x.type === 'learn' && x.lessons.indexOf(n) >= 0);
    return e ? e.day : 0;
  }

  // ---------- 返回栏 ----------
  let lastTop = '#/';
  /** 子页面顶部的返回栏。点返回回到上一个主页面（今日学习 / 全部课程 / 地图…） */
  function backbar(title) {
    const top = lastTop || '#/';
    const first = top.replace(/^#\/?/, '').split(/[/?]/)[0];
    const label = TITLES[first] || '首页';
    return h('div', { class: 'backbar' },
      h('a', { class: 'btn back-btn', href: top, 'aria-label': '返回' + label, text: '← ' + label }),
      title ? h('span', { class: 'muted', text: title }) : null);
  }

  function highlight(a) {
    const id = HILITE[a] || 'today';
    document.querySelectorAll('#side [data-nav]').forEach(t => t.classList.toggle('on', t.dataset.nav === id));
    const botId = BOTTOM.indexOf(id) >= 0 ? id : 'more';
    document.querySelectorAll('#bottombar [data-nav]').forEach(t => t.classList.toggle('on', t.dataset.nav === botId));
  }

  function sideFoot() {
    const f = document.getElementById('sidefoot');
    if (!f) return;
    const info = todayInfo();
    f.textContent = '计划第 ' + info.day + ' / ' + info.p.days + ' 天 · 已学 ' + Store.completedCount() + ' 课';
  }

  function route() {
    Sound.stop();
    document.querySelectorAll('.pop, .backdrop').forEach(p => p.remove());
    const r = parse(), a = r.parts[0] || '';
    if (TOP.has(a)) lastTop = r.hash === '#' ? '#/' : r.hash;
    document.body.dataset.route = a || 'today';
    highlight(a);
    document.title = (TITLES[a] || '意大利语能力岛') + ' · 意大利语能力岛';
    view.style.removeProperty('--h');
    UI.clear(view);
    try {
      const V = root.Views;
      if (a === 'lesson') V.lesson(view, parseInt(r.parts[1], 10), r.parts[2], r.q);
      else if (a === 'review') V.review(view, parseInt(r.parts[1], 10));
      else if (a === 'words') V.words(view, r.parts[1], r.q);
      else if (a === 'lab') V.lab(view, r.parts[1]);
      else if (a === 'me') V.me(view);
      else if (a === 'method') V.method(view);
      else if (a === 'settings') V.settings(view);
      else if (a === 'map') V.map(view);
      else if (a === 'lessons') V.lessons(view, r.q);
      else if (a === 'more') V.more(view);
      else V.today(view);
    } catch (e) {
      console.error(e);
      UI.clear(view).append(h('div', { class: 'card' }, h('p', { class: 'big', text: '出错了 😵' }), h('pre', { class: 'err', text: String((e && e.stack) || e) }),
        h('a', { class: 'btn primary', href: '#/', text: '回到今日学习' })));
    }
    sideFoot();
    window.scrollTo(0, 0);
  }

  // 学习计时：页面可见且 60 秒内有操作时，每 15 秒累计一次
  let lastAct = Date.now();
  ['pointerdown', 'keydown', 'scroll', 'touchstart'].forEach(ev => window.addEventListener(ev, () => { lastAct = Date.now(); }, { passive: true }));
  setInterval(() => {
    if (document.visibilityState === 'visible' && Date.now() - lastAct < 60000 && /^(lesson|review|words|lab)$/.test(document.body.dataset.route || '')) Store.tick(15);
  }, 15000);

  // 安装为应用（PWA）
  let installEvt = null;
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; });
  function canInstall() { return !!installEvt; }
  async function install() { if (!installEvt) return false; installEvt.prompt(); try { await installEvt.userChoice; } catch (e) { /* ignore */ } installEvt = null; return true; }

  function registerSW() {
    if (!('serviceWorker' in navigator) || !/^https?:$/.test(location.protocol)) return;
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { /* 离线缓存不可用：忽略 */ }); });
  }

  applyTheme();
  buildNav();
  window.addEventListener('hashchange', route);
  root.App = { route, applyTheme, planCtx, todayInfo, dayOfLesson, backbar, canInstall, install, NAV };
  registerSW();
  route();
})(window);
