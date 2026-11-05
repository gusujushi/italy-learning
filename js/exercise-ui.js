/* 练习引擎：一次呈现一道题，作答后给反馈，最后给出汇总。
 * 题目对象由 ExGen 生成（见 js/exgen.js）。 */
(function (root) {
  'use strict';

  const h = UI.h, clear = UI.clear;
  const ACCENTS = ['à', 'è', 'é', 'ì', 'ò', 'ù'];
  const SKILL_ZH = { listen: '听', speak: '说', read: '读', write: '写', know: '知识' };

  function audioRow(text, autoplay) {
    const row = h('div', { class: 'audio-row' },
      h('button', { class: 'btn round', type: 'button', 'aria-label': '播放', onclick: () => Sound.play(text) }, '🔊'),
      h('button', { class: 'btn round', type: 'button', 'aria-label': '慢速播放', onclick: () => Sound.play(text, { rate: 0.7 }) }, '🐢'));
    if (autoplay) setTimeout(() => Sound.play(text), 250);
    return row;
  }

  function insertAt(input, ch) {
    const s = input.selectionStart == null ? input.value.length : input.selectionStart;
    const e = input.selectionEnd == null ? s : input.selectionEnd;
    input.value = input.value.slice(0, s) + ch + input.value.slice(e);
    input.focus();
    input.setSelectionRange(s + ch.length, s + ch.length);
  }

  function keypad(input) {
    return h('div', { class: 'keypad', 'aria-label': '重音字母' },
      ACCENTS.map(ch => h('button', { type: 'button', class: 'key', onclick: () => insertAt(input, ch), text: ch })));
  }

  function textInput(rows) {
    const el = rows > 1
      ? h('textarea', { rows, class: 'inp', placeholder: '在这里输入意大利语…', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false', lang: 'it' })
      : h('input', { type: 'text', class: 'inp', placeholder: '输入缺少的单词', autocapitalize: 'off', autocomplete: 'off', autocorrect: 'off', spellcheck: 'false', lang: 'it' });
    return el;
  }

  function diffLine(user, target) {
    const d = Ita.diffTokens(user, target);
    return h('div', { class: 'diff' },
      h('span', { class: 'lbl', text: '对照：' }),
      d.map(x => [h('span', { class: 'tok ' + x.s, title: x.s === 'miss' ? '漏写' : x.s === 'extra' ? '多写' : '', text: x.t }), ' ']));
  }

  function answerBox(label, text) {
    return h('div', { class: 'answer-box' },
      h('span', { class: 'lbl', text: label }),
      h('b', { class: 'it', lang: 'it', text }),
      h('button', { class: 'btn round sm', type: 'button', 'aria-label': '播放', onclick: () => Sound.play(text) }, '🔊'));
  }

  // ---------- 各题型 ----------

  const R = {};

  R.mcq = function (ex, body, api) {
    if (ex.audio) {
      body.append(h('p', { class: 'prompt', text: ex.prompt }), audioRow(ex.audio, true));
      if (!ex.hidden) body.append(h('p', { class: 'it big', lang: 'it', text: ex.audio }));
    } else {
      body.append(h('p', { class: 'prompt', text: ex.prompt }));
    }
    const list = h('div', { class: 'opts', role: 'group' });
    const btns = ex.opts.map((o, i) => h('button', { class: 'opt', type: 'button', onclick: () => pick(i) },
      h('span', { class: 'k', text: String.fromCharCode(65 + i) }), h('span', { text: o })));
    btns.forEach(b => list.append(b));
    body.append(list);
    function pick(i) {
      if (api.answered) return;
      const ok = i === ex.ans;
      btns.forEach((b, j) => { b.disabled = true; if (j === ex.ans) b.classList.add('correct'); else if (j === i) b.classList.add('wrong'); else b.classList.add('dim'); });
      const extra = [];
      if (ex.why) extra.push(h('div', { class: 'why', text: ex.why }));
      if (ex.audio && ex.hidden) extra.push(answerBox('原句', ex.audio));
      api.finish(ok, extra);
      if (ex.speakOnResult) Sound.play(ex.speakOnResult);
    }
  };

  R.cloze = function (ex, body, api) {
    body.append(h('p', { class: 'prompt', text: ex.prompt }));
    const sent = h('p', { class: 'it big cloze', lang: 'it', text: ex.sentence });
    body.append(sent, h('p', { class: 'zh', text: ex.zh }));
    const list = h('div', { class: 'opts two', role: 'group' });
    const btns = ex.opts.map((o, i) => h('button', { class: 'opt', type: 'button', onclick: () => pick(i), lang: 'it' }, h('span', { text: o })));
    btns.forEach(b => list.append(b));
    body.append(list);
    function pick(i) {
      if (api.answered) return;
      const ok = i === ex.ans;
      btns.forEach((b, j) => { b.disabled = true; if (j === ex.ans) b.classList.add('correct'); else if (j === i) b.classList.add('wrong'); else b.classList.add('dim'); });
      sent.textContent = ex.why;
      api.finish(ok, [answerBox('完整句子', ex.why)]);
      Sound.play(ex.why);
    }
  };

  R.clozeType = function (ex, body, api) {
    body.append(h('p', { class: 'prompt', text: ex.prompt }), h('p', { class: 'it big cloze', lang: 'it', text: ex.sentence }), h('p', { class: 'zh', text: ex.zh }));
    const inp = textInput(1);
    const go = h('button', { class: 'btn primary', type: 'button', onclick: check, text: '检查' });
    body.append(inp, keypad(inp), h('div', { class: 'row gap' }, go, h('button', { class: 'btn ghost', type: 'button', onclick: giveUp, text: '不会，看答案' })));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); check(); } });
    setTimeout(() => inp.focus({ preventScroll: true }), 50);
    function finish(ok) {
      inp.disabled = true; go.disabled = true;
      const acc = Ita.norm(inp.value, true) === Ita.norm(ex.answer, true);
      const extra = [answerBox('完整句子', ex.target)];
      if (ok && !acc) extra.unshift(h('div', { class: 'why', text: '拼对了！注意重音符号：' + ex.answer }));
      api.finish(ok, extra); Sound.play(ex.target);
    }
    function check() {
      if (api.answered || !inp.value.trim()) return;
      finish(Ita.norm(inp.value) === Ita.norm(ex.answer));
    }
    function giveUp() { if (!api.answered) finish(false); }
  };

  R.dict = function (ex, body, api) {
    body.append(h('p', { class: 'prompt', text: ex.prompt }), audioRow(ex.audio, true));
    const inp = textInput(2);
    let tries = 0;
    const go = h('button', { class: 'btn primary', type: 'button', onclick: check, text: '检查' });
    body.append(inp, keypad(inp), h('div', { class: 'row gap' }, go, h('button', { class: 'btn ghost', type: 'button', onclick: giveUp, text: '不会，看答案' })));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); check(); } });
    function finish(ok, res) {
      inp.disabled = true; go.disabled = true;
      const extra = [answerBox('正确答案', ex.target), h('div', { class: 'zh', text: ex.zh })];
      if (res && !ok) extra.unshift(diffLine(inp.value, ex.target));
      if (res && ok && res.exact && !res.accentOk) extra.unshift(h('div', { class: 'why', text: '拼写正确！提醒：注意重音符号 → ' + ex.target }));
      api.finish(ok, extra);
    }
    function check() {
      if (api.answered || !inp.value.trim()) return;
      const res = Ita.check(inp.value, ex.target);
      tries++;
      if (res.ok) return finish(true, res);
      if (res.close && tries === 1) { UI.toast('差一点！检查一下拼写再试一次', 1800); return; }
      finish(false, res);
    }
    function giveUp() { if (!api.answered) finish(false, null); }
  };

  R.translate = function (ex, body, api) {
    body.append(h('p', { class: 'prompt', text: ex.prompt }), h('p', { class: 'zh big', text: ex.zh }));
    const inp = textInput(2);
    const go = h('button', { class: 'btn primary', type: 'button', onclick: check, text: '检查' });
    body.append(inp, keypad(inp), h('div', { class: 'row gap' }, go, h('button', { class: 'btn ghost', type: 'button', onclick: giveUp, text: '不会，看答案' })));
    inp.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); check(); } });
    function finish(ok, res) {
      inp.disabled = true; go.disabled = true;
      const extra = [answerBox('参考答案', ex.target)];
      if (res && !ok) {
        extra.unshift(diffLine(inp.value, ex.target));
        extra.push(h('div', { class: 'why', text: res.close ? '很接近了。翻译常有多种正确说法——如果你的答案意思和语法都对，可以点下面的按钮。' : '翻译可能有多种说法；如果你的答案意思和语法都对，可以点下面的按钮。' }));
        extra.push(h('button', { class: 'btn ghost', type: 'button', onclick: e => { e.target.disabled = true; api.override(true); }, text: '我的答案也对' }));
      }
      api.finish(ok, extra);
      Sound.play(ex.target);
    }
    function check() {
      if (api.answered || !inp.value.trim()) return;
      const res = Ita.check(inp.value, ex.target, { lenient: true });
      finish(res.ok, res);
    }
    function giveUp() { if (!api.answered) finish(false, null); }
  };

  R.order = function (ex, body, api) {
    body.append(h('p', { class: 'prompt', text: ex.prompt }), h('p', { class: 'zh big', text: ex.zh }));
    const placed = h('div', { class: 'chips placed', 'aria-label': '你的答案' });
    const pool = h('div', { class: 'chips pool', 'aria-label': '备选单词' });
    const go = h('button', { class: 'btn primary', type: 'button', onclick: check, text: '检查', disabled: true });
    let items = ex.tokens.map((t, i) => ({ t, i, in: false }));
    const els = items.map(it => h('button', { class: 'chip', type: 'button', lang: 'it', text: it.t, onclick: () => toggle(it) }));
    function draw() {
      clear(placed); clear(pool);
      const seq = items.filter(x => x.in).sort((a, b) => a.pos - b.pos);
      seq.forEach(it => placed.append(els[it.i]));
      items.filter(x => !x.in).forEach(it => pool.append(els[it.i]));
      go.disabled = items.some(x => !x.in);
      placed.classList.toggle('empty', !seq.length);
    }
    let counter = 0;
    function toggle(it) {
      if (api.answered) return;
      it.in = !it.in; it.pos = it.in ? counter++ : 0; draw();
    }
    body.append(placed, pool, h('div', { class: 'row gap' }, go,
      h('button', { class: 'btn ghost', type: 'button', onclick: () => { if (!api.answered) { items.forEach(x => { x.in = false; }); draw(); } }, text: '重置' })));
    draw();
    function check() {
      if (api.answered) return;
      const mine = items.filter(x => x.in).sort((a, b) => a.pos - b.pos).map(x => x.t).join(' ');
      const ok = Ita.norm(mine) === Ita.norm(ex.target);
      els.forEach(e => { e.disabled = true; });
      go.disabled = true;
      placed.classList.add(ok ? 'good' : 'bad');
      api.finish(ok, ok ? [] : [answerBox('正确顺序', ex.target)]);
      Sound.play(ex.target);
    }
  };

  R.match = function (ex, body, api) {
    body.append(h('p', { class: 'prompt', text: ex.prompt }));
    const left = ex.pairs.map((p, i) => ({ t: p[0], i }));
    const right = Ita.shuffle(ex.pairs.map((p, i) => ({ t: p[1], i })));
    let selL = null, mistakes = 0, matched = 0;
    const colL = h('div', { class: 'col' }), colR = h('div', { class: 'col' });
    const bl = left.map(x => h('button', { class: 'opt', type: 'button', lang: 'it', text: x.t, onclick: () => { if (api.answered) return; selL = x.i; bl.forEach((b, j) => b.classList.toggle('sel', j === x.i)); Sound.play(x.t); } }));
    const br = right.map(x => h('button', { class: 'opt', type: 'button', text: x.t, onclick: () => tryPair(x, br_el(x)) }));
    const br_el = x => br[right.indexOf(x)];
    function tryPair(x, el) {
      if (api.answered || selL == null || el.classList.contains('done')) return;
      if (selL === x.i) {
        bl[selL].classList.remove('sel'); bl[selL].classList.add('done'); bl[selL].disabled = true;
        el.classList.add('done'); el.disabled = true; matched++; selL = null;
        if (matched === left.length) api.finish(mistakes <= 1, mistakes ? [h('div', { class: 'why', text: '配错 ' + mistakes + ' 次' })] : []);
      } else {
        mistakes++; el.classList.add('wrong'); setTimeout(() => el.classList.remove('wrong'), 450);
      }
    }
    bl.forEach(b => colL.append(b)); br.forEach(b => colR.append(b));
    body.append(h('div', { class: 'match' }, colL, colR));
  };

  // ---------- 引擎 ----------

  function run(container, list, opts) {
    opts = opts || {};
    let idx = 0, correct = 0;
    const results = [];
    const wrap = h('div', { class: 'ex' });
    clear(container).append(wrap);
    list = list.filter(Boolean);
    if (!list.length) { wrap.append(h('p', { class: 'muted', text: '这一部分暂时没有题目。' })); if (opts.onDone) opts.onDone({ correct: 0, total: 0, pct: 100, results }); return { destroy() {} }; }

    function render() {
      clear(wrap);
      if (idx >= list.length) return summary();
      const ex = list[idx];
      root.ExerciseUI.current = ex; // 调试/测试钩子：当前题目
      const top = h('div', { class: 'ex-top' },
        h('div', { class: 'bar' }, h('i', { style: { width: Math.round(idx / list.length * 100) + '%' } })),
        h('span', { class: 'cnt', text: (opts.title ? opts.title + ' · ' : '') + (idx + 1) + '/' + list.length }),
        h('span', { class: 'tag skill-' + ex.skill, text: SKILL_ZH[ex.skill] || '' }));
      const body = h('div', { class: 'ex-body' });
      const fb = h('div', { class: 'feedback', 'aria-live': 'polite' });
      const next = h('button', { class: 'btn primary next', type: 'button', text: idx + 1 >= list.length ? '查看结果' : '继续', onclick: () => { Sound.stop(); idx++; render(); } });
      next.hidden = true;
      wrap.append(top, body, fb, next);
      const api = {
        answered: false,
        finish(ok, extra) {
          if (api.answered) return;
          api.answered = true;
          results.push({ id: ex.id, ok, skill: ex.skill });
          if (ok) correct++;
          Store.record(ex.skill, ok);
          if (opts.onAnswer) opts.onAnswer(ex, ok);
          fb.className = 'feedback show ' + (ok ? 'good' : 'bad');
          clear(fb).append(h('b', { class: 'verdict', text: ok ? '✓ 正确' : '✗ 再接再厉' }), extra || []);
          next.hidden = false;
          next.focus({ preventScroll: false });
          next.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        },
        override(ok) {
          // 翻译题自评：把刚才的"错"改成"对"
          const last = results[results.length - 1];
          if (last && !last.ok && ok) { last.ok = true; correct++; Store.record(ex.skill, true); fb.className = 'feedback show good'; const v = fb.querySelector('.verdict'); if (v) v.textContent = '✓ 已按「我的答案也对」计入'; }
        },
      };
      (R[ex.type] || R.mcq)(ex, body, api);
    }

    function summary() {
      const total = list.length, pct = Math.round(100 * correct / total);
      const sum = { correct, total, pct, results };
      const bySkill = {};
      results.forEach(r => { const s = bySkill[r.skill] || (bySkill[r.skill] = [0, 0]); s[1]++; if (r.ok) s[0]++; });
      const msg = pct >= 95 ? '太棒了！Perfetto!' : pct >= 80 ? '很好！Molto bene!' : pct >= 60 ? '不错，继续加油！Bene!' : '再练一遍会更稳 💪';
      wrap.append(
        h('div', { class: 'summary' },
          h('div', { class: 'ring', style: { '--p': pct } }, h('b', { text: pct + '%' }), h('small', { text: correct + '/' + total })),
          h('p', { class: 'big', text: msg }),
          h('div', { class: 'chips' }, Object.keys(bySkill).map(k => h('span', { class: 'chip static skill-' + k, text: SKILL_ZH[k] + ' ' + bySkill[k][0] + '/' + bySkill[k][1] }))),
          h('div', { class: 'row gap center' },
            opts.retry ? h('button', { class: 'btn ghost', type: 'button', onclick: opts.retry, text: '再做一遍' }) : null,
            h('button', { class: 'btn primary', type: 'button', onclick: () => opts.onContinue && opts.onContinue(sum), text: opts.doneLabel || '继续' }))));
      if (opts.onDone) opts.onDone(sum);
    }

    render();
    return { destroy() { Sound.stop(); } };
  }

  root.ExerciseUI = { run, audioRow, keypad, answerBox };
})(window);
