/* 学习进度存储（localStorage，失败时退化为内存）。
 * 保存：设置、每天的星级/步骤、复习卡片、五项能力成绩、连续天数、学习日志、写作笔记。 */
(function (root) {
  'use strict';

  const KEY = 'isola.v1';
  const STEPS = ['listen', 'read', 'learn', 'speak', 'write', 'test'];
  const SKILLS = ['listen', 'speak', 'read', 'write', 'know'];

  function defaults() {
    return {
      v: 1, created: Date.now(),
      settings: { theme: 'auto', speed: 1, showIt: true, showZh: true, useRecorded: true, unlockAll: false, voiceURI: '' },
      days: {}, srs: {}, skills: {}, notes: {}, fav: {}, log: {}, xp: 0,
      streak: { last: '', count: 0, best: 0 },
    };
  }

  let state = defaults();
  let timer = null;
  let persistOk = true;

  function load() {
    try {
      const raw = root.localStorage.getItem(KEY);
      if (raw) {
        const o = JSON.parse(raw);
        const d = defaults();
        state = Object.assign(d, o, { settings: Object.assign(d.settings, o.settings || {}) });
      }
    } catch (e) { persistOk = false; }
  }

  function flush() {
    clearTimeout(timer); timer = null;
    try { root.localStorage.setItem(KEY, JSON.stringify(state)); persistOk = true; } catch (e) { persistOk = false; }
  }
  function save() { clearTimeout(timer); timer = setTimeout(flush, 250); }

  const today = () => SRS.dateStr();

  // ---------- 设置 ----------
  function setting(k, v) {
    if (v !== undefined) { state.settings[k] = v; save(); }
    return state.settings[k];
  }

  // ---------- 天 ----------
  function day(n) { return state.days[n] || { stars: 0, best: 0, steps: {}, attempts: 0 }; }
  function dayRef(n) {
    if (!state.days[n]) state.days[n] = { stars: 0, best: 0, steps: {}, attempts: 0 };
    return state.days[n];
  }
  function stepDone(n, step) { return !!day(n).steps[step]; }
  function markStep(n, step) {
    const d = dayRef(n);
    if (!d.steps[step]) { d.steps[step] = 1; addXp(10); }
    touchStreak(); save();
  }
  function isUnlocked(n) {
    if (n <= 1 || state.settings.unlockAll) return true;
    return day(n - 1).stars > 0;
  }
  function currentDay(total) {
    for (let n = 1; n <= total; n++) if (day(n).stars === 0) return n;
    return total;
  }
  function completedCount() { return Object.keys(state.days).filter(n => state.days[n].stars > 0).length; }
  function starTotal() { return Object.keys(state.days).reduce((s, n) => s + (state.days[n].stars || 0), 0); }

  function starsFor(pct) { return pct >= 95 ? 3 : pct >= 80 ? 2 : pct >= 60 ? 1 : 0; }

  /** 小测结束：记录成绩，首次通关时把本天词句加入复习 */
  function finishDay(n, pct) {
    const d = dayRef(n);
    const stars = starsFor(pct);
    const first = d.stars === 0 && stars > 0;
    d.attempts = (d.attempts || 0) + 1;
    d.best = Math.max(d.best || 0, Math.round(pct));
    d.stars = Math.max(d.stars, stars);
    if (stars > 0) {
      d.steps.test = 1;
      d.done = d.done || Date.now();
      Course.cardsOf(n).forEach(c => { if (!state.srs[c.id]) state.srs[c.id] = SRS.newCard(today()); });
      addXp(20 + 10 * stars);
    }
    touchStreak(); save();
    return { stars, first };
  }

  // ---------- 复习卡 ----------
  function dueIds(limit) { return SRS.dueList(state.srs, today(), limit); }
  function dueCount() { return SRS.dueList(state.srs, today()).length; }
  function gradeCard(id, rating) {
    if (!state.srs[id]) return;
    state.srs[id] = SRS.grade(state.srs[id], rating, today());
    if (rating > 0) addXp(1);
    touchStreak(); save();
  }
  function cardCount() { return Object.keys(state.srs).length; }
  function matureCount() { return Object.keys(state.srs).filter(id => state.srs[id].box >= 4).length; }
  function addCards(n) { Course.cardsOf(n).forEach(c => { if (!state.srs[c.id]) state.srs[c.id] = SRS.newCard(today()); }); save(); }
  function allCardIds() { return Object.keys(state.srs); }
  function wrongCardIds(limit) {
    return Object.keys(state.srs).filter(id => state.srs[id].wrong > 0)
      .sort((a, b) => state.srs[b].wrong - state.srs[a].wrong).slice(0, limit || 20);
  }

  // ---------- 能力 ----------
  function record(skill, ok) {
    if (SKILLS.indexOf(skill) < 0) return;
    const s = state.skills[skill] || (state.skills[skill] = { n: 0, c: 0, recent: [] });
    s.n++; if (ok) s.c++;
    s.recent.push(ok ? 1 : 0);
    if (s.recent.length > 40) s.recent.shift();
    if (ok) addXp(2);
    touchStreak(); save();
  }
  /** 0–100；样本少于 3 个时返回 null */
  function skillLevel(skill) {
    const s = state.skills[skill];
    if (!s || s.recent.length < 3) return null;
    return Math.round(100 * s.recent.reduce((a, b) => a + b, 0) / s.recent.length);
  }

  // ---------- 连续天数 / 日志 / 经验 ----------
  function touchStreak() {
    const t = today(), st = state.streak;
    if (st.last === t) return;
    st.count = st.last && SRS.diffDays(st.last, t) === 1 ? st.count + 1 : 1;
    st.last = t;
    st.best = Math.max(st.best, st.count);
  }
  function streakNow() {
    const st = state.streak, t = today();
    if (!st.last) return 0;
    return SRS.diffDays(st.last, t) <= 1 ? st.count : 0;
  }
  function addXp(k) { state.xp += k; }
  function level() {
    const lv = Math.floor(Math.sqrt(state.xp / 40)) + 1;
    const names = ['', '游客 Turista', '旅人 Viaggiatore', '学徒 Apprendista', '常客 Habitué', '居民 Residente', '行家 Esperto', '达人 Maestro'];
    return { lv, name: names[Math.min(lv, names.length - 1)] };
  }
  function tick(sec) {
    const t = today();
    const l = state.log[t] || (state.log[t] = { sec: 0 });
    l.sec += sec; save();
  }
  function minutesToday() { const l = state.log[today()]; return l ? Math.round(l.sec / 60) : 0; }
  function logDays(k) {
    const out = [];
    for (let i = k - 1; i >= 0; i--) { const d = SRS.addDays(today(), -i); out.push({ d, sec: (state.log[d] || { sec: 0 }).sec }); }
    return out;
  }

  // ---------- 笔记 / 收藏 ----------
  function note(key, text) {
    if (text !== undefined) { state.notes[key] = text; save(); }
    return state.notes[key] || '';
  }
  function toggleFav(id) { if (state.fav[id]) delete state.fav[id]; else state.fav[id] = 1; save(); return !!state.fav[id]; }
  function isFav(id) { return !!state.fav[id]; }

  // ---------- 徽章 ----------
  function badges() {
    const m = Course.meta(), out = [];
    m.islands.forEach(i => {
      let ok = true;
      for (let n = i.days[0]; n <= i.days[1]; n++) if (day(n).stars === 0) ok = false;
      out.push({ id: 'island' + i.id, icon: i.emoji, name: i.zh, desc: '通关「' + i.zh + '」全部 10 天', got: ok });
    });
    const st = state.streak.best;
    [3, 7, 14, 30].forEach(k => out.push({ id: 'streak' + k, icon: '🔥', name: k + ' 天连续', desc: '连续学习 ' + k + ' 天', got: st >= k }));
    const perfect = Object.keys(state.days).filter(n => state.days[n].stars === 3).length;
    out.push({ id: 'perfect10', icon: '🌟', name: '十次满星', desc: '10 天拿到三星', got: perfect >= 10 });
    out.push({ id: 'cards100', icon: '🧠', name: '百词在心', desc: '100 张卡片进入第 4 盒以上', got: matureCount() >= 100 });
    return out;
  }

  // ---------- 导入导出 ----------
  function exportJSON() { return JSON.stringify(state); }
  function importJSON(text) {
    const o = JSON.parse(text);
    if (!o || o.v !== 1 || typeof o.days !== 'object') throw new Error('不是有效的进度文件');
    const d = defaults();
    state = Object.assign(d, o, { settings: Object.assign(d.settings, o.settings || {}) });
    flush();
  }
  function reset() { state = defaults(); flush(); }
  function canPersist() { return persistOk; }

  load();
  root.addEventListener('pagehide', flush);
  root.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });

  root.Store = {
    STEPS, SKILLS, setting, day, stepDone, markStep, isUnlocked, currentDay, completedCount, starTotal, starsFor, finishDay,
    dueIds, dueCount, gradeCard, cardCount, matureCount, addCards, allCardIds, wrongCardIds,
    record, skillLevel, touchStreak, streakNow, level, tick, minutesToday, logDays,
    note, toggleFav, isFav, badges, exportJSON, importJSON, reset, canPersist,
    get xp() { return state.xp; }, get streak() { return state.streak; }, get settings() { return state.settings; },
    flush, today,
  };
})(window);
