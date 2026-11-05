/* 发音实验室：字母、拼读规则、听辨训练、重音、绕口令 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;
  root.Views = root.Views || {};

  const TABS = [['letters', '字母'], ['rules', '拼读规则'], ['pairs', '听辨'], ['stress', '重音'], ['twisters', '绕口令']];

  function chips(ex) {
    return h('div', { class: 'xchips' }, ex.map(e => h('button', { class: 'xchip', type: 'button', onclick: () => Sound.play(e[0]) },
      h('b', { lang: 'it', text: e[0] }), h('small', { text: e[1] }))));
  }

  function entry(e, withName) {
    return h('div', { class: 'lab-card' },
      h('div', { class: 'lab-k' },
        h('b', { class: 'k', text: e.k }),
        e.ipa ? h('span', { class: 'ipa', text: e.ipa }) : null,
        e.say ? h('button', { class: 'btn round sm', type: 'button', 'aria-label': '听', onclick: () => Sound.play(e.say), text: '🔊' }) : null),
      withName && e.name ? h('div', { class: 'muted small', text: '字母名称：' + e.name }) : null,
      e.zh ? h('p', { text: e.zh }) : null,
      chips(e.ex));
  }

  function tabLetters(box) {
    box.append(h('p', { class: 'muted', text: '点 🔊 听字母名称；点下面的例词听发音。字母名称只在拼写、报名字时用，读单词时看读音规则。' }));
    PRON.letters.forEach(l => box.append(entry(l, true)));
    box.append(h('h3', { text: '外来字母（只出现在外来词中）' }));
    PRON.foreign.forEach(l => box.append(entry(l, true)));
  }

  function tabRules(box) {
    box.append(h('p', { class: 'muted', text: '意大利语"所见即所读"：记住这些组合，几乎任何词都能读对。' }));
    PRON.rules.forEach(r => box.append(entry(r, false)));
  }

  function tabPairs(box) {
    const game = h('div', { class: 'lab-card game' });
    let score = 0, total = 0;
    function round() {
      clear(game);
      const p = PRON.pairs[Math.floor(Math.random() * PRON.pairs.length)];
      const side = Math.random() < 0.5 ? 'a' : 'b';
      const word = p[side];
      game.append(h('div', { class: 'row between' }, h('b', { text: '听辨练习' }), h('span', { class: 'muted', text: '得分 ' + score + ' / ' + total })),
        h('p', { class: 'muted', text: '听一个词，选出你听到的是哪个。' }),
        h('div', { class: 'row gap' }, h('button', { class: 'btn primary lg', type: 'button', onclick: () => Sound.play(word), text: '🔊 播放' }), h('button', { class: 'btn lg', type: 'button', onclick: () => Sound.play(word, { rate: 0.7 }), text: '🐢 慢速' })));
      const out = h('div', { class: 'opts two' });
      const resEl = h('div', { class: 'feedback' });
      ['a', 'b'].forEach(k => out.append(h('button', { class: 'opt', type: 'button', lang: 'it', onclick: e => {
        Array.prototype.forEach.call(out.children, c => { c.disabled = true; });
        const ok = k === side; total++; if (ok) score++;
        Store.record('listen', ok);
        e.currentTarget.classList.add(ok ? 'correct' : 'wrong');
        if (!ok) Array.prototype.forEach.call(out.children, c => { if (c.dataset.k === side) c.classList.add('correct'); });
        resEl.className = 'feedback show ' + (ok ? 'good' : 'bad');
        resEl.append(h('b', { class: 'verdict', text: ok ? '✓ 正确' : '✗ 再听听' }), h('div', { class: 'why', text: p.a + '（' + p.za + '） vs ' + p.b + '（' + p.zb + '）：' + p.note }),
          h('button', { class: 'btn', type: 'button', onclick: round, text: '下一题' }));
      }, dataset: { k } }, h('span', { text: p[k] }), h('small', { class: 'muted', text: '  ' + p['z' + k] }))));
      game.append(out, resEl);
    }
    round();
    box.append(game, h('h3', { text: '全部对比词（先听 A，再听 B，感受差别）' }));
    PRON.pairs.forEach(p => box.append(h('div', { class: 'lab-card pair' },
      h('div', { class: 'row gap wrap' },
        h('button', { class: 'xchip', type: 'button', onclick: () => Sound.play(p.a) }, h('b', { lang: 'it', text: p.a }), h('small', { text: p.za })),
        h('span', { class: 'vs', text: 'vs' }),
        h('button', { class: 'xchip', type: 'button', onclick: () => Sound.play(p.b) }, h('b', { lang: 'it', text: p.b }), h('small', { text: p.zb }))),
      h('div', { class: 'muted small', text: p.note }))));
  }

  function tabStress(box) {
    box.append(h('p', { class: 'muted', text: '大写的音节是重音所在。默认重音在倒数第二个音节；最后一个音节带重音符号（à è ì ò ù）时重音在末尾；少数词在倒数第三个音节，需要记忆——课程词汇表里都会用大写标出来。' }));
    const groups = {};
    PRON.stress.forEach(s => { (groups[s.cls] = groups[s.cls] || []).push(s); });
    ['末音节重音', '倒数第二音节', '倒数第三音节'].forEach(cls => {
      box.append(h('h3', { text: cls }));
      (groups[cls] || []).forEach(s => box.append(h('div', { class: 'lab-card stressrow', onclick: () => Sound.play(s.w) },
        h('button', { class: 'btn round sm', type: 'button', 'aria-label': '听', onclick: e => { e.stopPropagation(); Sound.play(s.w); }, text: '🔊' }),
        h('div', null, h('div', null, h('b', { class: 'it', lang: 'it', text: s.w }), h('span', { class: 'ph', text: s.syl }), h('span', { class: 'muted', text: '  ' + s.zh })),
          s.note ? h('div', { class: 'muted small', text: s.note }) : null))));
    });
  }

  function tabTwisters(box) {
    box.append(h('p', { class: 'muted', text: '先慢速跟读，保证每个音节清楚；再逐渐加快。重点是双辅音和颤音 r。' }));
    PRON.twisters.forEach(t => box.append(h('div', { class: 'lab-card' },
      h('div', { class: 'row between' }, h('span', { class: 'muted small', text: '难度 ' + '★'.repeat(t.lv) + '☆'.repeat(3 - t.lv) + ' · ' + t.focus })),
      h('p', { class: 'it big', lang: 'it', text: t.it }), h('p', { class: 'zh', text: t.zh }),
      h('div', { class: 'row gap' },
        h('button', { class: 'btn sm', type: 'button', onclick: () => Sound.play(t.it), text: '🔊 正常' }),
        h('button', { class: 'btn sm', type: 'button', onclick: () => Sound.play(t.it, { rate: 0.7 }), text: '🐢 慢速' })))));
  }

  const FN = { letters: tabLetters, rules: tabRules, pairs: tabPairs, stress: tabStress, twisters: tabTwisters };

  root.Views.lab = function (el, tab) {
    clear(el);
    if (!FN[tab]) tab = 'letters';
    el.append(h('header', { class: 'lbar' },
      h('div', { class: 'ttl' }, h('small', { text: 'Laboratorio di pronuncia' }), h('b', { text: '发音实验室' }))));
    el.append(h('nav', { class: 'subtabs', 'aria-label': '发音分类' }, TABS.map(t => h('a', { class: t[0] === tab ? 'on' : '', href: '#/lab/' + t[0], text: t[1] }))));
    const box = h('div', { class: 'pad' });
    el.append(box);
    FN[tab](box);
  };
})(window);
