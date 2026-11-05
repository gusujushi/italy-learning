/* 我的：进度、五项能力雷达、徽章、设置、数据导入导出 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;
  root.Views = root.Views || {};
  const SKILL_ZH = { listen: '听', speak: '说', read: '读', write: '写', know: '知识' };
  const SVG = 'http://www.w3.org/2000/svg';

  function s(tag, attrs, text) {
    const e = document.createElementNS(SVG, tag);
    Object.keys(attrs || {}).forEach(k => e.setAttribute(k, attrs[k]));
    if (text != null) e.textContent = text;
    return e;
  }

  function radar() {
    const keys = Store.SKILLS, C = 120, R = 82;
    const svg = s('svg', { viewBox: '0 0 240 240', class: 'radar', role: 'img', 'aria-label': '五项能力雷达图' });
    const pt = (i, f) => { const a = -Math.PI / 2 + i * 2 * Math.PI / keys.length; return [C + R * f * Math.cos(a), C + R * f * Math.sin(a)]; };
    [0.25, 0.5, 0.75, 1].forEach(f => svg.append(s('polygon', { class: 'ring', points: keys.map((k, i) => pt(i, f).join(',')).join(' ') })));
    keys.forEach((k, i) => { const p = pt(i, 1); svg.append(s('line', { class: 'axis', x1: C, y1: C, x2: p[0], y2: p[1] })); });
    const vals = keys.map(k => Store.skillLevel(k));
    svg.append(s('polygon', { class: 'area', points: keys.map((k, i) => pt(i, (vals[i] == null ? 0 : vals[i]) / 100).join(',')).join(' ') }));
    keys.forEach((k, i) => {
      const lp = pt(i, 1.2);
      svg.append(s('text', { class: 'lab', x: lp[0], y: lp[1], 'text-anchor': 'middle', 'dominant-baseline': 'middle' }, SKILL_ZH[k] + (vals[i] == null ? '' : ' ' + vals[i])));
      if (vals[i] != null) { const p = pt(i, vals[i] / 100); svg.append(s('circle', { class: 'dot', cx: p[0], cy: p[1], r: 3.5 })); }
    });
    return svg;
  }

  function stat(v, l) { return h('div', { class: 'stat' }, h('b', { text: String(v) }), h('span', { text: l })); }

  function toggle(label, desc, get, set) {
    const inp = h('input', { type: 'checkbox', onchange: e => set(e.target.checked) });
    inp.checked = !!get();
    return h('label', { class: 'setrow' }, h('span', null, h('b', { text: label }), desc ? h('small', { text: desc }) : null), inp);
  }

  function download(name, text) {
    const a = h('a', { href: URL.createObjectURL(new Blob([text], { type: 'application/json' })), download: name });
    document.body.append(a); a.click(); a.remove();
  }

  root.Views.me = function (el) {
    clear(el);
    const lvl = Store.level();
    const next = 40 * lvl.lv * lvl.lv, prev = 40 * (lvl.lv - 1) * (lvl.lv - 1);
    const pct = Math.min(100, Math.round(100 * (Store.xp - prev) / (next - prev)));
    el.append(h('header', { class: 'lbar' }, h('div', { class: 'ttl' }, h('small', { text: 'Il mio profilo' }), h('b', { text: '我的' }))));
    const box = h('div', { class: 'pad' });
    el.append(box);

    box.append(h('section', { class: 'card' },
      h('div', { class: 'row between' }, h('b', { class: 'big', text: 'Lv.' + lvl.lv + ' ' + lvl.name }), h('span', { class: 'muted', text: Store.xp + ' XP' })),
      h('div', { class: 'prog' }, h('i', { style: { width: pct + '%' } })),
      h('p', { class: 'muted small', text: '距离下一级还需 ' + (next - Store.xp) + ' XP。答对题、完成步骤、通关都会获得经验。' }),
      h('div', { class: 'stats' },
        stat(Store.completedCount() + '/' + Course.total(), '已学天数'), stat(Store.starTotal(), '星星'),
        stat(Store.streakNow(), '连续天数'), stat(Store.streak.best, '最长连续'),
        stat(Store.cardCount(), '复习卡'), stat(Store.matureCount(), '已掌握卡'),
        stat(Store.minutesToday(), '今日分钟'), stat(Store.dueCount(), '待复习'))));

    box.append(h('section', { class: 'card' }, h('h3', null, '五项能力', h('small', { text: '  近 40 题正确率' })), radar(),
      h('p', { class: 'muted small', text: '每道练习都会计入对应能力。某项落后，就多练那一项：听 → 听力题/听写；说 → 跟读自评；读 → 阅读/配对；写 → 排序/翻译/填空；知识 → 小测。' })));

    const days = Store.logDays(28);
    const mx = Math.max(60, ...days.map(d => d.sec));
    box.append(h('section', { class: 'card' }, h('h3', null, '近 4 周学习', h('small', { text: '  每格一天' })),
      h('div', { class: 'heat', role: 'img', 'aria-label': '近 28 天学习时长' }, days.map(d => h('i', { title: d.d + ' · ' + Math.round(d.sec / 60) + ' 分钟', style: { '--a': (d.sec / mx).toFixed(2) } })))));

    box.append(h('section', { class: 'card' }, h('h3', { text: '徽章' }),
      h('div', { class: 'badges' }, Store.badges().map(b => h('div', { class: 'badge' + (b.got ? ' got' : ''), title: b.desc }, h('span', { class: 'bi', text: b.got ? b.icon : '🔒' }), h('small', { text: b.name }))))));

    // 设置
    const set = Store.setting;
    const themeSel = h('select', { class: 'sel', onchange: e => { set('theme', e.target.value); root.App.applyTheme(); } },
      [['auto', '跟随系统'], ['light', '浅色'], ['dark', '深色']].map(([v, t]) => h('option', { value: v, text: t })));
    themeSel.value = set('theme');
    const speedSel = h('select', { class: 'sel', onchange: e => set('speed', +e.target.value) },
      [[0.7, '0.7×（慢）'], [0.85, '0.85×'], [1, '1×（正常）']].map(([v, t]) => h('option', { value: v, text: t })));
    speedSel.value = String(set('speed'));
    const sets = [
      h('label', { class: 'setrow' }, h('span', null, h('b', { text: '主题' })), themeSel),
      h('label', { class: 'setrow' }, h('span', null, h('b', { text: '默认语速' })), speedSel),
      toggle('使用自带音频', '关闭后一律使用浏览器语音合成', () => set('useRecorded'), v => set('useRecorded', v)),
      toggle('课文默认显示意大利语', '', () => set('showIt'), v => set('showIt', v)),
      toggle('课文默认显示中文', '', () => set('showZh'), v => set('showZh', v)),
      toggle('解锁全部天数', '跳关模式：想直接学后面的内容或复习时打开', () => set('unlockAll'), v => set('unlockAll', v)),
    ];
    const vs = Sound.voices();
    if (vs.length > 1) {
      const vsel = h('select', { class: 'sel', onchange: e => set('voiceURI', e.target.value) },
        vs.map(v => h('option', { value: v.voiceURI, text: v.name + ' (' + v.lang + ')' })));
      vsel.value = set('voiceURI') || vs[0].voiceURI;
      sets.push(h('label', { class: 'setrow' }, h('span', null, h('b', { text: '浏览器意大利语语音' })), vsel));
    }
    box.append(h('section', { class: 'card' }, h('h3', { text: '设置' }), sets));

    // 数据
    const file = h('input', { type: 'file', accept: '.json,application/json', hidden: true, onchange: e => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { try { Store.importJSON(String(r.result)); UI.toast('导入成功'); setTimeout(() => location.reload(), 600); } catch (err) { UI.toast('导入失败：' + err.message, 3500); } };
      r.readAsText(f);
    } });
    box.append(h('section', { class: 'card' }, h('h3', { text: '数据' }),
      h('p', { class: 'muted small', text: Store.canPersist() ? '进度保存在本浏览器里（localStorage）。换设备或清理浏览器前，请先导出。' : '⚠ 当前环境无法保存进度（可能是隐私模式）。请及时导出。' }),
      h('div', { class: 'row gap wrap' },
        h('button', { class: 'btn', type: 'button', onclick: () => download('isola-progress-' + Store.today() + '.json', Store.exportJSON()), text: '导出进度' }),
        h('button', { class: 'btn', type: 'button', onclick: () => file.click(), text: '导入进度' }), file,
        h('button', { class: 'btn danger', type: 'button', text: '清空进度', onclick: async () => {
          if (await UI.confirmBox('清空全部进度？', '所有星级、复习卡片和笔记都会删除，无法恢复。建议先导出备份。', '清空')) { Store.reset(); location.hash = '#/'; location.reload(); }
        } }))));

    // 环境
    const st = Sound.status();
    const yn = v => (v ? '✓ 支持' : '✗ 不支持');
    box.append(h('section', { class: 'card' }, h('h3', { text: '环境检查' }),
      h('ul', { class: 'envlist' },
        h('li', { text: '自带意大利语音频：' + (st.files ? '✓ ' + st.files + ' 条' : '✗ 未找到（将使用浏览器语音合成）') }),
        h('li', { text: '浏览器语音合成：' + yn(st.tts) + (st.tts ? '；意大利语语音：' + (st.itVoice ? '✓ 有' : '✗ 无') : '') }),
        h('li', { text: '录音：' + yn(st.rec) }),
        h('li', { text: '语音识别（需联网）：' + yn(st.sr) })),
      h('p', { class: 'muted small', html: '课程内容为原创，来源与致谢见 <a href="https://github.com/gusujushi/italy-learning/blob/main/CREDITS.md" target="_blank" rel="noopener">CREDITS.md</a>。' })));
  };
})(window);
