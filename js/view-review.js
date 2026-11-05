/* 复习日（每 5 天一次）：回顾前 4 天学过的课，做一套综合测验，≥ 60 分通关。 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;
  root.Views = root.Views || {};

  root.Views.review = function (el, day) {
    const info = App.todayInfo();
    const e = info.ctx.list[day - 1];
    el.append(App.backbar('第 ' + day + ' 天 · 复习日'));
    if (!e || e.type !== 'review') {
      el.append(h('div', { class: 'card empty' }, h('div', { class: 'big', text: '第 ' + day + ' 天不是复习日' }), h('a', { class: 'btn primary', href: '#/map', text: '看学习地图' })));
      return;
    }
    const lessons = e.lessons.filter(n => Course.has(n));
    const hex = W.hexOf(lessons[0] || 1);
    el.style.setProperty('--h', (Course.islandOf(lessons[0] || 1) || { hue: 200 }).hue);
    const prev = Store.reviewInfo(day);
    const due = Store.dueCount();
    const size = Math.min(30, 12 + 4 * lessons.length);

    const stack = h('div', { class: 'stack' });
    el.append(stack);
    stack.append(h('header', { class: 'lesson-head' },
      h('div', { class: 'small', text: W.fmtDate(Plan.dateOfDay(info.p.start, day)) + (info.day === day ? ' · 今天' : '') }),
      h('h1', { text: '第 ' + day + ' 天 · 复习日 🔁' }),
      h('div', { text: '回顾第 ' + Plan.rangeLabel(lessons) + ' 课，做一套 ' + size + ' 题的综合测验（≥ 60 分通关）。' }),
      prev ? h('p', { class: 'small', style: { margin: '6px 0 0' }, text: '✓ 已通关，最好成绩 ' + prev.best + ' 分。还可以再测一次刷新成绩。' }) : null));

    stack.append(h('section', { class: 'card' },
      h('h3', null, '先回顾', h('small', { text: '  Ripasso' })),
      h('p', { class: 'muted small', text: '测验前花 10–15 分钟：把这几课的对话再听一遍，重点是你觉得生疏的。' }),
      h('div', { class: 'stack' }, lessons.map(n => {
        const d = Course.day(n);
        return h('div', { class: 'task', style: { '--c': hex } },
          h('div', { class: 'num' }, h('span', null, h('small', { text: '第' }), h('br'), n + '课')),
          h('div', { style: { flex: 1, minWidth: 0 } },
            h('div', { class: 'row between' }, h('b', { class: 'it', lang: 'it', text: d.it }), Store.bestScore(n) ? h('span', { class: 'chip', text: '闯关 ' + Store.bestScore(n) + ' 分' }) : h('span', { class: 'chip', text: Store.lessonDone(n) ? '已学完' : '还没学完' })),
            h('div', { class: 'zh', text: d.zh }),
            h('div', { class: 'row gap wrap', style: { marginTop: '6px' } },
              h('a', { class: 'btn sm', href: '#/lesson/' + n + '/words', text: '🔤 词汇' }),
              h('a', { class: 'btn sm', href: '#/lesson/' + n + '/read', text: '🔍 精读' }),
              h('a', { class: 'btn sm', href: '#/lesson/' + n + '/shadow', text: '🗣️ 跟读' }))));
      })),
      due ? h('a', { class: 'banner', style: { marginTop: '12px' }, href: '#/words/review?mode=due', text: '🔁 另外有 ' + due + ' 张到期生词卡，建议先复习 ›' }) : null));

    const area = h('section', { class: 'card' });
    function start() {
      const rnd = Ita.mulberry32((Date.now() / 1000 | 0) + day);
      ExerciseUI.run(area, ExGen.listTest(lessons, rnd, size), { title: '复习', doneLabel: '查看成绩', retry: start, onContinue: sum => result(sum) });
    }
    function result(sum) {
      const fin = Store.finishReview(day, sum.pct);
      clear(area);
      area.append(h('div', { class: 'result' },
        h('div', { class: 'big-stars', text: UI.stars(Store.starsFor(sum.pct)) }),
        h('p', { class: 'big', text: fin.passed ? (fin.first ? '🎉 复习日通关！' : '成绩已更新') : '还差一点——回顾一下再试' }),
        h('p', { class: 'muted', text: '正确率 ' + sum.pct + '%（' + sum.correct + '/' + sum.total + '）' + (fin.passed ? '' : ' · ≥ 60 分通关') }),
        h('div', { class: 'row gap wrap center' },
          h('button', { class: 'btn ghost', type: 'button', onclick: start, text: '再测一次' }),
          h('a', { class: 'btn primary', href: '#/', text: '回到今日学习' }),
          h('a', { class: 'btn', href: '#/map', text: '看学习地图' }))));
    }
    stack.append(area);
    area.append(h('h3', null, '综合测验', h('small', { text: '  Prova' })), h('p', { text: '题目覆盖这几课的词汇、听力、填空、听写、排序和翻译，每次不同。' }),
      h('button', { class: 'btn primary lg', type: 'button', text: prev ? '再测一次' : '开始测验', onclick: () => { clear(area); start(); } }));
  };
})(window);
