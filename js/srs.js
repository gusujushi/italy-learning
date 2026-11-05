/* 间隔复习（莱特纳盒子）。纯函数，UMD。
 * 盒子 1..6，对应间隔（天）：1 / 2 / 4 / 8 / 16 / 32。
 * 评分：0 不会（回到盒子 1，今天再来）、1 模糊（留在原盒，明天再来）、2 记得（升一盒）、3 很熟（升两盒）。
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SRS = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const INTERVALS = [0, 1, 2, 4, 8, 16, 32];
  const MAX_BOX = 6;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /** 本地日期 YYYY-MM-DD */
  function dateStr(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function addDays(ds, k) {
    const [y, m, d] = ds.split('-').map(Number);
    const x = new Date(y, m - 1, d + k);
    return dateStr(x);
  }

  function diffDays(a, b) {
    const pa = a.split('-').map(Number), pb = b.split('-').map(Number);
    return Math.round((new Date(pb[0], pb[1] - 1, pb[2]) - new Date(pa[0], pa[1] - 1, pa[2])) / 86400000);
  }

  /** 新卡：盒子 1，明天首次复习 */
  function newCard(today) {
    return { box: 1, due: addDays(today, 1), seen: 0, wrong: 0, last: today };
  }

  function grade(card, rating, today) {
    const c = Object.assign({}, card);
    c.seen = (c.seen || 0) + 1;
    c.last = today;
    if (rating <= 0) {
      c.box = 1; c.due = today; c.wrong = (c.wrong || 0) + 1;
    } else if (rating === 1) {
      c.due = addDays(today, Math.max(1, Math.floor(INTERVALS[c.box] / 2)));
    } else {
      c.box = Math.min(MAX_BOX, c.box + (rating >= 3 ? 2 : 1));
      c.due = addDays(today, INTERVALS[c.box]);
    }
    return c;
  }

  /** 到期卡片 id 列表（最旧的先出，盒子低的先出） */
  function dueList(cards, today, limit) {
    const ids = Object.keys(cards).filter(id => cards[id].due <= today);
    ids.sort((a, b) => (cards[a].due < cards[b].due ? -1 : cards[a].due > cards[b].due ? 1 : cards[a].box - cards[b].box));
    return limit ? ids.slice(0, limit) : ids;
  }

  return { INTERVALS, MAX_BOX, dateStr, addDays, diffDays, newCard, grade, dueList };
});
