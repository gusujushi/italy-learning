/* 设置与计划、学习方法 */
(function (root) {
  'use strict';
  const h = UI.h, clear = UI.clear;
  root.Views = root.Views || {};
  const AUDIO_CACHE = 'isola-audio-v1';

  function toggle(label, desc, get, set) {
    const inp = h('input', { type: 'checkbox', onchange: e => set(e.target.checked) });
    inp.checked = !!get();
    return h('label', { class: 'setrow' }, h('span', null, h('b', { text: label }), desc ? h('small', { text: desc }) : null), inp);
  }
  function download(name, text) {
    const a = h('a', { href: URL.createObjectURL(new Blob([text], { type: 'application/json' })), download: name });
    document.body.append(a); a.click(); a.remove();
  }

  // ---------- 学习计划 ----------

  function planCard() {
    const box = h('section', { class: 'card stack', id: 'plan-card' });
    function draw() {
      clear(box);
      const p = Store.plan();
      const units = Lesson.planUnits(p.phases);
      const byId = {}; units.forEach(u => { byId[u.id] = u; });
      const list = Plan.build(units, { days: p.days });
      const cnt = t => list.filter(x => x.type === t).length;
      const avg = Plan.avgMinutes(list, byId);
      const perDay = units.length ? (units.length / Math.max(1, cnt('learn'))).toFixed(1) : '0';
      const set = patch => { Store.setPlan(patch); draw(); };

      const custom = h('input', { type: 'number', min: Plan.MIN_DAYS || 5, max: 365, value: String(p.days), 'aria-label': '自定义天数', style: { width: '90px' } });
      const isPreset = Plan.PRESETS.some(x => x.days === p.days);
      box.append(
        h('h3', null, '学习计划', h('small', { text: '  每 5 天一轮：4 天学新课 + 1 天复习通关' })),
        h('p', { class: 'muted small', style: { margin: 0 }, text: '想学得快就缩短天数，想轻松就拉长。已经学过的课和成绩不会丢。' }),
        h('div', { class: 'pill-tabs', style: { '--c': 'var(--ink)', margin: 0 }, role: 'group', 'aria-label': '计划天数' },
          Plan.PRESETS.map(pr => h('button', { type: 'button', class: p.days === pr.days ? 'on' : '', title: pr.note, text: pr.label, onclick: () => set({ days: pr.days }) }))),
        h('div', { class: 'row gap' }, h('span', { class: 'lbl', text: '自定义天数（5–365）' }), custom,
          h('button', { class: 'btn sm', type: 'button', text: '应用', onclick: () => { const d = Plan.clampDays(custom.value); set({ days: d }); UI.toast('已改为 ' + d + ' 天', 1400); } }),
          isPreset ? null : h('span', { class: 'chip', text: '当前：自定义 ' + p.days + ' 天' })),
        h('div', { class: 'row gap' }, h('span', { class: 'lbl', text: '起始日期' }),
          h('input', { type: 'date', value: p.start, 'aria-label': '起始日期', style: { width: 'auto' }, onchange: e => { if (e.target.value) set({ start: e.target.value }); } }),
          h('button', { class: 'btn sm', type: 'button', text: '从今天开始', onclick: () => { set({ start: Store.today() }); UI.toast('第 1 天 = 今天', 1400); } })),
        h('div', null, h('div', { class: 'lbl', text: '学哪些大岛' }),
          h('div', { class: 'row gap wrap' }, Course.meta().phases.map(ph => {
            const inp = h('input', { type: 'checkbox', 'aria-label': ph.island, onchange: e => {
              const on = e.target.checked;
              const cur = Store.plan().phases.slice();
              const next = on ? cur.concat(ph.id) : cur.filter(x => x !== ph.id);
              if (!next.length) { e.target.checked = true; UI.toast('至少要选一座岛', 1500); return; }
              set({ phases: next.sort() });
            } });
            inp.checked = p.phases.indexOf(ph.id) >= 0;
            return h('label', { class: 'chip', style: { padding: '6px 12px', fontSize: '.9rem', cursor: 'pointer' } }, inp, ' ' + ph.emoji + ' ' + ph.island + '（第 ' + ph.days[0] + '–' + ph.days[1] + ' 课）');
          }))),
        h('div', { class: 'note' },
          h('b', { text: '这份计划：' }), ' 共 ' + units.length + ' 课，' + p.days + ' 天——学习日 ' + cnt('learn') + ' 天（平均每天 ' + perDay + ' 课，约 ' + avg + ' 分钟）、复习日 ' + cnt('review') + ' 天' + (cnt('free') ? '、自由日 ' + cnt('free') + ' 天' : '') + '。',
          avg > 120 ? h('div', { class: 'small', style: { color: 'var(--warn)', marginTop: '4px' }, text: '⚠ 每个学习日平均要 ' + avg + ' 分钟，强度偏大；时间不够就把天数拉长。' }) : null,
          cnt('free') ? h('div', { class: 'small muted', style: { marginTop: '4px' }, text: '自由日没有新课，用来补课和复习。' }) : null),
        h('a', { class: 'btn ghost sm', href: '#/map', text: '看学习地图 ›' }));
    }
    draw();
    return box;
  }

  // ---------- 离线缓存 ----------

  function offlineCard() {
    const box = h('section', { class: 'card stack' }, h('h3', { text: '安装与离线' }));
    const swOk = 'serviceWorker' in navigator && /^https?:$/.test(location.protocol);
    box.append(h('p', { class: 'muted small', style: { margin: 0 }, text: swOk
      ? '本程序是 PWA：可以「安装」到桌面 / 主屏幕，课程和已播放过的音频会缓存，断网也能学。'
      : '当前是通过本地文件（file://）打开的——直接可用；如果要安装或离线缓存，请通过 https 地址（比如 GitHub Pages）或 localhost 访问。' }));
    const row = h('div', { class: 'row gap wrap' });
    if (App.canInstall()) row.append(h('button', { class: 'btn primary', type: 'button', text: '安装到桌面 / 主屏幕', onclick: async () => { await App.install(); UI.toast('已提示安装'); } }));
    if (swOk && root.caches) {
      const files = Array.from(new Set(Object.values(root.AUDIO_MAP || {})));
      const st = h('span', { class: 'muted small' });
      const btn = h('button', { class: 'btn', type: 'button', text: '下载全部音频到本机（约 ' + Math.round(files.length * 0.0098) + ' MB）', onclick: async () => {
        btn.disabled = true;
        try {
          const cache = await caches.open(AUDIO_CACHE);
          let n = 0, fail = 0;
          const queue = files.slice();
          async function worker() {
            while (queue.length) {
              const f = queue.shift();
              try { if (!(await cache.match('audio/' + f))) { const r = await fetch('audio/' + f); if (r.ok) await cache.put('audio/' + f, r); else fail++; } } catch (e) { fail++; }
              n++; if (n % 20 === 0 || n === files.length) st.textContent = '已处理 ' + n + ' / ' + files.length;
            }
          }
          await Promise.all([worker(), worker(), worker(), worker()]);
          st.textContent = fail ? '完成，但有 ' + fail + ' 个文件失败（可重试）' : '✓ 全部音频已缓存，可以离线使用';
        } catch (e) { st.textContent = '缓存失败：' + e.message; }
        btn.disabled = false;
      } });
      row.append(btn, st);
    }
    box.append(row);
    return box;
  }

  // ---------- 设置与计划 ----------

  root.Views.settings = function (el) {
    const set = Store.setting;
    const stack = h('div', { class: 'stack' });
    el.append(stack);
    stack.append(h('div', null, h('h1', { text: '设置与计划' }), h('p', { class: 'muted', text: '调整学习天数、起始日期，以及声音、显示和 AI 老师。' })));
    stack.append(planCard());

    const themeSel = h('select', { class: 'sel', onchange: e => { set('theme', e.target.value); App.applyTheme(); } },
      [['auto', '跟随系统'], ['light', '浅色'], ['dark', '深色']].map(([v, t]) => h('option', { value: v, text: t })));
    themeSel.value = set('theme');
    const speedSel = h('select', { class: 'sel', onchange: e => set('speed', +e.target.value) },
      [[0.7, '0.7×（慢）'], [0.85, '0.85×'], [1, '1×（正常）']].map(([v, t]) => h('option', { value: v, text: t })));
    speedSel.value = String(set('speed'));
    const prefs = [
      h('label', { class: 'setrow' }, h('span', null, h('b', { text: '主题' })), themeSel),
      h('label', { class: 'setrow' }, h('span', null, h('b', { text: '默认语速' })), speedSel),
      toggle('使用自带音频', '关闭后一律使用浏览器语音合成', () => set('useRecorded'), v => set('useRecorded', v)),
      toggle('课文默认显示意大利语', '', () => set('showIt'), v => set('showIt', v)),
      toggle('课文默认显示中文', '', () => set('showZh'), v => set('showZh', v)),
      toggle('学完一课自动加入生词本', '关闭后只有你手动 ☆ 的词才会进入间隔复习', () => set('autoCards'), v => set('autoCards', v)),
    ];
    const vs = Sound.voices();
    if (vs.length > 1) {
      const vsel = h('select', { class: 'sel', onchange: e => set('voiceURI', e.target.value) }, vs.map(v => h('option', { value: v.voiceURI, text: v.name + ' (' + v.lang + ')' })));
      vsel.value = set('voiceURI') || vs[0].voiceURI;
      prefs.push(h('label', { class: 'setrow' }, h('span', null, h('b', { text: '浏览器意大利语语音' }), h('small', { text: '只在没有自带音频的内容上使用' })), vsel));
    }
    stack.append(h('section', { class: 'card' }, h('h3', { text: '学习偏好' }), prefs));

    // AI 老师
    const key = h('input', { type: 'password', placeholder: 'sk-…（可选）', autocomplete: 'off', 'aria-label': 'DeepSeek API Key', value: set('apiKey') || '', onchange: e => { set('apiKey', e.target.value.trim()); UI.toast(e.target.value.trim() ? '已保存密钥（只存在本机）' : '已清除密钥', 1600); } });
    const model = h('select', { class: 'sel', onchange: e => set('model', e.target.value) },
      [['deepseek-chat', 'deepseek-chat（推荐，快）'], ['deepseek-reasoner', 'deepseek-reasoner（推理，较慢）']].map(([v, t]) => h('option', { value: v, text: t })));
    model.value = set('model') || 'deepseek-chat';
    const testOut = h('div', { class: 'small', 'aria-live': 'polite' });
    stack.append(h('section', { class: 'card stack' },
      h('h3', null, '🤖 AI 老师', h('small', { text: '  可选' })),
      h('p', { class: 'muted small', style: { margin: 0 }, text: '填入你自己的 DeepSeek API Key 后，「逐句精读」里每一句都可以让 AI 老师讲解、提问。密钥只保存在你自己的浏览器里，请求由浏览器直接发到 api.deepseek.com；导出进度时不会带上密钥；不填也不影响任何其他功能。AI 讲解可能出错，重要的语法点请对照课文和词典。' }),
      h('label', { class: 'lbl', text: 'API Key' }), key,
      h('label', { class: 'setrow', style: { padding: 0 } }, h('span', { class: 'lbl', text: '模型' }), model),
      h('div', { class: 'row gap wrap' },
        h('button', { class: 'btn sm', type: 'button', text: '测试连接', onclick: async e => {
          e.currentTarget.disabled = true; testOut.textContent = '连接中…';
          try { testOut.textContent = '✓ 连接成功：' + await AI.test(); } catch (err) { testOut.textContent = '✗ ' + err.message; }
          e.currentTarget.disabled = false;
        } }),
        h('button', { class: 'btn sm ghost', type: 'button', text: '清除已缓存的讲解（' + Store.aiCount() + ' 条）', onclick: () => { Store.aiClear(); UI.toast('已清除'); } })),
      testOut));

    stack.append(offlineCard());

    // 数据
    const file = h('input', { type: 'file', accept: '.json,application/json', hidden: true, onchange: e => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => { try { Store.importJSON(String(r.result)); UI.toast('导入成功'); setTimeout(() => location.reload(), 600); } catch (err) { UI.toast('导入失败：' + err.message, 3500); } };
      r.readAsText(f);
    } });
    stack.append(h('section', { class: 'card stack' }, h('h3', { text: '数据' }),
      h('p', { class: 'muted small', style: { margin: 0 }, text: Store.canPersist() ? '进度保存在本浏览器里（localStorage）。换设备或清理浏览器前，请先导出。' : '⚠ 当前环境无法保存进度（可能是隐私模式）。请及时导出。' }),
      h('div', { class: 'row gap wrap' },
        h('button', { class: 'btn', type: 'button', onclick: () => download('isola-progress-' + Store.today() + '.json', Store.exportJSON()), text: '导出进度' }),
        h('button', { class: 'btn', type: 'button', onclick: () => file.click(), text: '导入进度' }), file,
        h('button', { class: 'btn danger', type: 'button', text: '清空进度', onclick: async () => {
          if (await UI.confirmBox('清空全部进度？', '所有课程进度、成绩、生词本和笔记都会删除，无法恢复。建议先导出备份。', '清空')) { Store.reset(); location.hash = '#/'; location.reload(); }
        } }))));

    const st = Sound.status();
    const yn = v => (v ? '✓ 支持' : '✗ 不支持');
    stack.append(h('section', { class: 'card' }, h('h3', { text: '环境检查' }),
      h('ul', { class: 'envlist' },
        h('li', { text: '自带意大利语音频：' + (st.files ? '✓ ' + st.files + ' 条' : '✗ 未找到（将使用浏览器语音合成）') }),
        h('li', { text: '浏览器语音合成：' + yn(st.tts) + (st.tts ? '；意大利语语音：' + (st.itVoice ? '✓ 有' : '✗ 无') : '') }),
        h('li', { text: '录音：' + yn(st.rec) }),
        h('li', { text: '语音识别（需联网）：' + yn(st.sr) })),
      h('p', { class: 'muted small', html: '课程内容为原创，来源与致谢见 <a href="https://github.com/gusujushi/italy-learning/blob/main/CREDITS.md" target="_blank" rel="noopener">CREDITS.md</a>。' })));
  };

  // ---------- 学习方法 ----------

  const STEP_HELP = [
    ['intro', '约 8 分钟', '先听，再看', '读“场景和目标”，带着“听前问题”盲听整段对话 2–3 遍（不看文字），再做理解题。目的：训练抓大意，不被不认识的词吓到。意大利语拼写和读音几乎一一对应，所以第一遍先让耳朵熟悉节奏和重音。'],
    ['words', '约 8 分钟', '词汇 + 例句', '每个词看 4 样东西：拼写、重音（大写音节）、中文、课文里的例句。点卡片听发音；不熟的点 ☆ 加入生词本。遮住中文自测一遍，再做小练习。'],
    ['read', '约 15 分钟', '彩色句子分析', '点一句听发音，再看右边的颜色：红色是谓语（动词变位告诉你“谁在做”）、紫色是连词（把句子连起来）、蓝色是介词、青色是代词、绿色是非谓语形式，黄底是本课词汇。长句看“意群”和“主干”。点任意一个词看变位说明。'],
    ['grammar', '约 10 分钟', '语法透视', '读本课语法讲解，再看“这一课的句子里有哪些语法现象”——每个语法点后面都有课文里的真实例句。“动词一览”把本课所有动词按原形归类，对照红色谓语看。'],
    ['shadow', '约 12 分钟', '影子跟读', '听一句、立刻跟着说一句。先慢速，再正常；先看文本，再遮住文本。可以录音和原音对比，也可以用“自动连读”让程序带着你一句一句过。'],
    ['quiz', '约 8 分钟', '闯关测验', '10 道由本课内容自动生成的题（听、读、写、知识各类）。≥ 60 分过关，≥ 80 ★★，≥ 95 ★★★。没过就回去重看对应步骤，再测一次——题目每次都不同。'],
  ];

  root.Views.method = function (el) {
    const stack = h('div', { class: 'stack' });
    el.append(stack);
    stack.append(h('div', null, h('h1', { text: '学习方法' }), h('p', { class: 'muted', text: '每天打开「今日学习」，按 6 步学完当天的课；每 5 天做一次复习通关。' })));

    stack.append(h('section', { class: 'card' }, h('h3', null, '每课 6 步学习法', h('small', { text: '  约 60 分钟 / 课' })),
      h('div', { class: 'stack' }, STEP_HELP.map(([id, time, title, text], i) => h('div', { class: 'note' },
        h('div', { class: 'row between' }, h('b', { text: Store.STEP_ICON[id] + ' ' + (i + 1) + '. ' + Store.STEP_ZH[id] + ' · ' + title }), h('span', { class: 'chip static', text: time })),
        h('p', { style: { margin: '6px 0 0' }, text: text }))))));

    // 颜色说明（用真实句子实时着色）
    const sample = 'Se non hai fretta, possiamo prendere un caffè con lui al bar.';
    const toks = Grammar.colorize(sample, [{ it: 'caffè', zh: '咖啡' }]);
    stack.append(h('section', { class: 'card stack' }, h('h3', null, '彩色句子分析：颜色是什么意思', h('small', { text: '  Analisi a colori' })),
      h('div', { class: 'colored it', lang: 'it' }, toks.map(k => (k.w ? h('span', { class: 'tk ' + (k.cls || '') + (k.vocab ? ' vocab' : ''), title: k.tip || '', text: k.t }) : document.createTextNode(k.t)))),
      h('div', { class: 'legend' }, [['连词 / 疑问词', 'var(--a-conj)'], ['谓语动词', 'var(--a-verb)'], ['非谓语', 'var(--a-nonf)'], ['介词', 'var(--a-prep)'], ['代词', 'var(--a-pron)'], ['本课词汇', 'var(--a-vocab)']].map(([t, c]) => h('span', { style: { '--k': c }, text: t }))),
      h('ul', { class: 'tips' },
        h('li', null, h('b', { text: '先找红色：' }), '意大利语每个动词变位都带着“人称”，一句话的骨架就是谓语（常常省略主语）。'),
        h('li', null, h('b', { text: '再看紫色：' }), 'se、e、ma、perché、che 这些连词告诉你句子怎么连接。'),
        h('li', null, h('b', { text: '意群：' }), '长句按标点、连词、介词切成小块，一块一块读，再合起来。'),
        h('li', null, h('b', { text: '主干提示：' }), '把从句和插入语去掉，剩下的就是句子的“骨架”。'),
        h('li', { class: 'muted', text: '颜色分析是程序按规则自动标注的（带词形库和上下文规则），个别词可能判断错，拿不准时以课文讲解和词典为准。' }))));

    stack.append(h('section', { class: 'card' }, h('h3', { text: '学习计划怎么运作' }),
      h('ul', { class: 'tips' },
        h('li', null, h('b', { text: '5 天一轮：' }), '前 4 天学新课，第 5 天是“复习日”——回顾这几课并做综合测验（≥ 60 分通关）。'),
        h('li', null, h('b', { text: '一天学几课：' }), '90 天计划里大约每天 1–1.5 课；课太轻的会合并到同一天，太重的独占一天。前 30 天（第 1–30 课）正好学完发音和日常 / 差旅口语。'),
        h('li', null, h('b', { text: '自由日：' }), '计划比课多（比如 120 天）时，多出来的日子是自由日，用来补课和复习。'),
        h('li', null, h('b', { text: '可以改：' }), '在「设置与计划」里随时改天数（30 / 60 / 90 / 120 / 自定义）、起始日期和要学的大岛。'),
        h('li', null, h('b', { text: '落后了怎么办：' }), '没有锁，也不会丢进度。首页会提示落后的课；也可以把计划拉长。'))));

    stack.append(h('section', { class: 'card' }, h('h3', { text: '生词本与间隔复习' }),
      h('ul', { class: 'tips' },
        h('li', { text: '完成一课的 6 步后，本课词汇和关键句自动加入生词本；在词汇页、精读页点 ☆ 可以随时加入。' }),
        h('li', { text: '卡片分 6 个盒子，间隔 1 / 2 / 4 / 8 / 16 / 32 天：不会 → 回第 1 盒，今天再来；模糊 → 原盒、间隔减半；记得 → 升一盒；很熟 → 升两盒。' }),
        h('li', { text: '每天先花 5 分钟清掉到期卡，再学新课。' }))));

    stack.append(h('section', { class: 'card' }, h('h3', { text: '诚实说明' }),
      h('ul', { class: 'tips' },
        h('li', null, h('b', { text: '内容：' }), '课程文本由 AI 辅助原创，未经意大利语母语者或专业教师审校。遇到不确定的用法，请对照词典和权威教材。'),
        h('li', null, h('b', { text: '语音：' }), '音频由开源语音模型合成（不是真人录音）。适合建立节奏、重音和双辅音的概念；口音细节请多听真实的意大利语来校准。'),
        h('li', null, h('b', { text: '没有发音打分：' }), '录音只用于“和原音对比 + 自评”，程序不会替你判断发音对不对。'),
        h('li', null, h('b', { text: '隐私：' }), '进度、录音、笔记都只在你的浏览器里，不上传。录音不会被保存到磁盘，刷新页面就没了。'))));
  };
})(window);
