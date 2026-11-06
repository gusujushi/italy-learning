/* 学习进度存储（localStorage，失败时退化为内存）。v2：围绕「每课 6 步 + 可调学习计划」。
 * 保存：设置、学习计划、每课的步骤与最好成绩、复习日通关、生词本 / 复习卡片、五项能力成绩、连续天数、学习日志、写作笔记。 */
(function (root) {
  'use strict';

  const KEY = 'isola.v2';
  const AI_KEY = 'isola.ai.v1';
  const STEPS = ['intro', 'words', 'read', 'grammar', 'shadow', 'quiz'];
  const STEP_ZH = { intro: '导读盲听', words: '意语词汇', read: '逐句精读', grammar: '语法透视', shadow: '影子跟读', quiz: '闯关测验' };
  const STEP_ICON = { intro: '🎧', words: '🔤', read: '🔍', grammar: '🧩', shadow: '🗣️', quiz: '🏆' };
  const SKILLS = ['listen', 'speak', 'read', 'write', 'know'];
  const PASS = 60;

  const pad = n => (n < 10 ? '0' : '') + n;
  const todayStr = () => { const d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); };

  function defaults() {
    return {
      v: 2, created: Date.now(),
      settings: { theme: 'auto', speed: 1, showIt: true, showZh: true, useRecorded: true, autoCards: true, apiKey: '', model: '', aiBase: '', installHidden: false },
      plan: { days: 90, phases: [1, 2, 3], start: todayStr() },
      lessons: {}, reviewDone: {}, srs: {}, skills: {}, notes: {}, fav: {}, log: {}, xp: 0,
      streak: { last: '', count: 0, best: 0 },
    };
  }

  let state = defaults();
  let timer = null;
  let persistOk = true;

  function merge(o) {
    const d = defaults();
    return Object.assign(d, o, {
      settings: Object.assign(d.settings, o.settings || {}),
      plan: Object.assign(d.plan, o.plan || {}),
    });
  }
  function load() {
    try {
      const raw = root.localStorage.getItem(KEY);
      if (raw) state = merge(JSON.parse(raw));
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

  // ---------- 学习计划 ----------
  function plan() { return state.plan; }
  function setPlan(p) { Object.assign(state.plan, p); save(); }

  // ---------- 课 ----------
  function lesson(n) { return state.lessons[n] || { steps: {}, best: 0, done: 0, attempts: 0 }; }
  function lessonRef(n) {
    if (!state.lessons[n]) state.lessons[n] = { steps: {}, best: 0, done: 0, attempts: 0 };
    return state.lessons[n];
  }
  const stepDone = (n, step) => !!lesson(n).steps[step];
  const stepCount = n => STEPS.filter(s => stepDone(n, s)).length;
  const lessonDone = n => stepCount(n) === STEPS.length;
  function completedCount() { return Object.keys(state.lessons).filter(n => lessonDone(+n)).length; }

  /** 这一课的词汇和关键句加入复习卡片 */
  function addCards(n) {
    Course.cardsOf(n).forEach(c => { if (!state.srs[c.id]) state.srs[c.id] = SRS.newCard(today()); });
    save();
  }

  /** 完成一步。返回 {first, lessonDone}：first = 这一步是第一次完成 */
  function markStep(n, step) {
    const l = lessonRef(n);
    const first = !l.steps[step];
    if (first) { l.steps[step] = 1; addXp(10); }
    let finished = false;
    if (lessonDone(n) && !l.done) {
      l.done = Date.now(); finished = true; addXp(30);
      if (state.settings.autoCards) Course.cardsOf(n).forEach(c => { if (!state.srs[c.id]) state.srs[c.id] = SRS.newCard(today()); });
    }
    touchStreak(); save();
    return { first, lessonDone: finished };
  }

  /** 闯关测验结束：记录最好成绩；≥60 分算过关（这一步完成） */
  function finishQuiz(n, pct) {
    const l = lessonRef(n);
    l.attempts = (l.attempts || 0) + 1;
    l.best = Math.max(l.best || 0, Math.round(pct));
    save();
    const passed = pct >= PASS;
    const r = passed ? markStep(n, 'quiz') : { first: false, lessonDone: false };
    if (passed && r.first) addXp(10);
    return { passed, best: l.best, first: r.first, lessonDone: r.lessonDone };
  }
  const bestScore = n => lesson(n).best || 0;
  const starsFor = pct => (pct >= 95 ? 3 : pct >= 80 ? 2 : pct >= PASS ? 1 : 0);

  // ---------- 复习日 ----------
  const reviewDone = d => !!state.reviewDone[d];
  /** 复习日通关记录 {best, ts}；没通关返回 null */
  const reviewInfo = d => (state.reviewDone[d] ? Object.assign({}, state.reviewDone[d]) : null);
  function finishReview(d, pct) {
    const passed = pct >= PASS;
    const prev = state.reviewDone[d];
    if (passed) { state.reviewDone[d] = { best: Math.max(pct, prev ? prev.best : 0), ts: Date.now() }; addXp(prev ? 5 : 25); }
    touchStreak(); save();
    return { passed, first: passed && !prev };
  }

  // ---------- 生词本 / 复习卡 ----------
  function dueIds(limit) { return SRS.dueList(state.srs, today(), limit); }
  function dueCount() { return SRS.dueList(state.srs, today()).length; }
  function gradeCard(id, rating) {
    if (!state.srs[id]) return;
    state.srs[id] = Object.assign({}, SRS.grade(state.srs[id], rating, today()), state.srs[id].star ? { star: 1 } : {});
    if (rating > 0) addXp(1);
    touchStreak(); save();
  }
  const cardCount = () => Object.keys(state.srs).length;
  const matureCount = () => Object.keys(state.srs).filter(id => state.srs[id].box >= 4).length;
  const allCardIds = () => Object.keys(state.srs);
  function wrongCardIds(limit) {
    return Object.keys(state.srs).filter(id => state.srs[id].wrong > 0).sort((a, b) => state.srs[b].wrong - state.srs[a].wrong).slice(0, limit || 20);
  }
  /** 一张卡的当前状态（盒子、到期日、错误次数、星标）；没有这张卡返回 null */
  const card = id => (state.srs[id] ? Object.assign({}, state.srs[id]) : null);
  const isStar = id => !!(state.srs[id] && state.srs[id].star);
  const starIds = () => Object.keys(state.srs).filter(id => state.srs[id].star);
  /** 收藏 / 取消收藏。收藏会立刻让这个词进入间隔复习；取消收藏只去掉星标（卡片还在） */
  function toggleStar(id) {
    if (!state.srs[id]) state.srs[id] = SRS.newCard(today());
    if (state.srs[id].star) delete state.srs[id].star; else state.srs[id].star = 1;
    save();
    return !!state.srs[id].star;
  }
  function removeCard(id) { delete state.srs[id]; save(); }

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
  function totalMinutes() { return Math.round(Object.keys(state.log).reduce((s, d) => s + state.log[d].sec, 0) / 60); }

  // ---------- 笔记 / 收藏句子 ----------
  function note(key, text) {
    if (text !== undefined) { state.notes[key] = text; save(); }
    return state.notes[key] || '';
  }
  function toggleFav(id) { if (state.fav[id]) delete state.fav[id]; else state.fav[id] = 1; save(); return !!state.fav[id]; }
  const isFav = id => !!state.fav[id];

  // ---------- 徽章 ----------
  function badges() {
    const m = Course.meta(), out = [];
    m.islands.forEach(i => {
      let ok = true;
      for (let n = i.days[0]; n <= i.days[1]; n++) if (!lessonDone(n)) ok = false;
      out.push({ id: 'island' + i.id, icon: i.emoji, name: i.zh, desc: '学完「' + i.zh + '」全部 10 课', got: ok });
    });
    const st = state.streak.best;
    [3, 7, 14, 30].forEach(k => out.push({ id: 'streak' + k, icon: '🔥', name: k + ' 天连续', desc: '连续学习 ' + k + ' 天', got: st >= k }));
    const perfect = Object.keys(state.lessons).filter(n => (state.lessons[n].best || 0) >= 95).length;
    out.push({ id: 'perfect10', icon: '🌟', name: '十次高分', desc: '10 课闯关测验 ≥ 95 分', got: perfect >= 10 });
    out.push({ id: 'cards100', icon: '🧠', name: '百词在心', desc: '100 张卡片进入第 4 盒以上', got: matureCount() >= 100 });
    out.push({ id: 'stars50', icon: '⭐', name: '生词收藏家', desc: '收藏 50 个生词', got: starIds().length >= 50 });
    return out;
  }

  // ---------- AI 讲解缓存（单独存放，导出进度时不带上）----------
  function aiAll() { try { return JSON.parse(root.localStorage.getItem(AI_KEY) || '{}'); } catch (e) { return {}; } }
  const aiGet = k => aiAll()[k] || '';
  function aiSet(k, text) { const a = aiAll(); a[k] = text; try { root.localStorage.setItem(AI_KEY, JSON.stringify(a)); } catch (e) { /* 空间不足：忽略 */ } }
  const aiCount = () => Object.keys(aiAll()).length;
  function aiClear() { try { root.localStorage.removeItem(AI_KEY); } catch (e) { /* ignore */ } }

  // ---------- 导入导出 ----------
  /** 导出的进度不含 API Key */
  function exportJSON() {
    const o = JSON.parse(JSON.stringify(state));
    o.settings.apiKey = '';
    return JSON.stringify(o);
  }
  function importJSON(text) {
    const o = JSON.parse(text);
    if (!o || o.v !== 2 || typeof o.lessons !== 'object') throw new Error('不是有效的进度文件');
    const key = state.settings.apiKey;
    state = merge(o);
    state.settings.apiKey = key;
    flush();
  }
  function reset() { const keep = state.settings; state = defaults(); state.settings = Object.assign(state.settings, keep); flush(); }
  const canPersist = () => persistOk;

  load();
  root.addEventListener('pagehide', flush);
  root.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });

  root.Store = {
    STEPS, STEP_ZH, STEP_ICON, SKILLS, PASS, setting, plan, setPlan,
    lesson, stepDone, stepCount, lessonDone, completedCount, markStep, finishQuiz, bestScore, starsFor, addCards,
    reviewDone, reviewInfo, finishReview,
    dueIds, dueCount, gradeCard, cardCount, matureCount, allCardIds, wrongCardIds, card, isStar, starIds, toggleStar, removeCard,
    record, skillLevel, touchStreak, streakNow, level, tick, minutesToday, logDays, totalMinutes,
    note, toggleFav, isFav, badges, aiGet, aiSet, aiCount, aiClear, exportJSON, importJSON, reset, canPersist,
    get xp() { return state.xp; }, get streak() { return state.streak; }, get settings() { return state.settings; },
    flush, today,
  };
})(window);
