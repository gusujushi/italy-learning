/* 第 4 岛 · 日常岛 Isola della Giornata（第 31–40 天） */
Course.add([
  // ───────────────────────── 第 31 天 ─────────────────────────
  {
    n: 31, it: 'La mia giornata', zh: '我的一天',
    goal: '会用反身动词说一天的作息（svegliarsi, alzarsi, lavarsi, vestirsi, addormentarsi）；会说时间段和 presto / tardi；会问别人几点起床睡觉。',
    scene: '你和 Giulia 在咖啡吧闲聊，互相问对方平时怎么过一天。',
    dlg: `
      Giulia: A che ora ti svegli di solito? | 你通常几点起床？
      Li Ming: Mi sveglio alle sette e mezza. Poi mi lavo e faccio colazione. | 我七点半醒。然后洗漱，吃早餐。
      Giulia: Io mi alzo presto, alle sei, e faccio ginnastica. | 我起得早，六点起床，做健身操。
      Li Ming: Che brava! E la sera? | 真棒！晚上呢？
      Giulia: La sera mi riposo, guardo la TV e mi addormento verso le undici. | 晚上我休息，看电视，十一点左右睡着。
      Li Ming: Io mi addormento tardi, dopo mezzanotte. | 我睡得晚，午夜以后。
      Giulia: Devi dormire di più! | 你得多睡一点！
    `,
    q: [
      ['李明几点醒？', ['7:30', '6:00', '8:30'], 0, 'alle sette e mezza。'],
      ['Giulia 早上做什么？', ['做健身操', '跑步', '看电视'], 0, 'faccio ginnastica。'],
      ['李明通常什么时候睡着？', ['午夜以后', '十一点左右', '十点'], 0, 'dopo mezzanotte。'],
    ],
    vocab: `
      svegliarsi | 醒来；起床 | sve-GLIAR-si
      alzarsi | 起身；起床 | al-ZAR-si
      lavarsi | 洗漱；洗 | la-VAR-si
      vestirsi | 穿衣服 | ve-STIR-si
      addormentarsi | 睡着 | ad-dor-men-TAR-si
      riposarsi | 休息 | ri-po-SAR-si
      sentirsi | 感觉 | sen-TIR-si
      divertirsi | 玩得开心 | di-ver-TIR-si
      presto | 早；快 | PRE-sto
      tardi | 晚；迟 | TAR-di
      verso le undici | 十一点左右 | VER-so le UN-di-ci
      la ginnastica | 体操；健身 | la gin-NA-sti-ca
      guardare la TV | 看电视 | guar-DA-re la ti-VÙ
      di più | 更多 | di PIÙ
    `,
    pron: {
      t: 'svegliarsi 里的 gli 与 -arsi 动词',
      tips: [
        '**svegliarsi** /zveʎˈʎarsi/：gli 是 /ʎ/；动词原形末尾的 **-si** 表示反身，重音在倒数第二音节：sve-GLIAR-si。',
        '**addormentarsi**：dd 是长辅音，重音在 TAR：ad-dor-men-TAR-si。',
      ],
      drill: `
        svegliarsi | 醒来
        alzarsi | 起床
        lavarsi | 洗漱
        vestirsi | 穿衣服
        addormentarsi | 睡着
        ginnastica | 健身
      `,
    },
    gram: [
      {
        h: '反身动词：主语和宾语是同一个人',
        p: ['反身动词在动词前加**反身代词**：mi, ti, si, ci, vi, si。不定式写作 -arsi / -ersi / -irsi（svegliarsi）。变位时去掉 -si，加人称词尾，再配反身代词。'],
        t: [
          ['人称', 'svegliarsi', 'lavarsi', 'vestirsi'],
          ['io', 'mi sveglio', 'mi lavo', 'mi vesto'],
          ['tu', 'ti svegli', 'ti lavi', 'ti vesti'],
          ['lui / lei / Lei', 'si sveglia', 'si lava', 'si veste'],
          ['noi', 'ci svegliamo', 'ci laviamo', 'ci vestiamo'],
          ['voi', 'vi svegliate', 'vi lavate', 'vi vestite'],
          ['loro', 'si svegliano', 'si lavano', 'si vestono'],
        ],
      },
      {
        h: '和情态动词连用：代词可前可后',
        p: ['情态动词 + 反身动词原形时，反身代词既可放在情态动词前，也可接在原形后面：**Mi devo alzare** = **Devo alzarmi**（我得起床了）。'],
        eg: ['Mi devo alzare presto. | 我得早起。', 'Devo alzarmi alle sei. | 我得六点起床。', 'A che ora ti svegli? | 你几点醒？'],
      },
    ],
    text: {
      title: 'Una giornata di Marco',
      body: `
        Mi chiamo Marco e sono studente. | 我叫马可，是学生。
        La mattina mi sveglio alle sette, mi lavo e mi vesto. | 早上我七点醒，洗漱，穿衣服。
        Faccio colazione al bar e prendo l'autobus per l'università. | 我在咖啡吧吃早餐，坐公交去大学。

        Il pomeriggio studio in biblioteca con gli amici. | 下午我和朋友们在图书馆学习。
        La sera cucino, guardo un film e mi riposo. | 晚上我做饭，看电影，休息。
        Mi addormento verso mezzanotte. | 我大约午夜睡着。
      `,
    },
    rq: [
      ['Marco 几点起床？', ['七点', '六点', '八点'], 0, 'mi sveglio alle sette。'],
      ['他怎么去大学？', ['坐公交', '步行', '骑车'], 0, "prendo l'autobus。"],
      ['下午他在哪里学习？', ['图书馆', '咖啡吧', '家里'], 0, 'in biblioteca。'],
    ],
    culture: '意大利人的作息偏晚：午餐常在 13:00 之后，晚餐 20:00 以后，**深夜还在街上聊天很常见**。商店午休（13:00–16:00）后再开，所以别指望下午两点买东西。',
    speak: `
      A che ora ti svegli di solito? | 问朋友几点醒
      Mi sveglio alle sette e mezza. | 说你几点醒（换成你的）
      Mi addormento verso mezzanotte. | 说你几点睡着
      La sera mi riposo e guardo la TV. | 说晚上的安排
    `,
    wr: [
      '写 4–5 句话描述你平时的一天：几点起床、吃什么、做什么、几点睡。',
      'Mi sveglio alle sette. Mi lavo e faccio colazione.\nLa mattina lavoro e il pomeriggio studio italiano.\nLa sera mi riposo e mi addormento verso le undici.',
      '我七点醒。洗漱，吃早餐。上午工作，下午学意大利语。晚上休息，十一点左右睡着。',
    ],
    quiz: [
      ['"我起床"应该说：', ['Mi alzo.', 'Io alzo.', 'Alzo mi.'], 0, '反身代词 mi 放在动词前。'],
      ['"我们洗漱"是：', ['Ci laviamo.', 'Si lavano.', 'Mi lavo.'], 0, 'noi → ci … -iamo。'],
      ['Devo alzarmi 的意思是：', ['我得起床', '我想起床', '我能起床'], 0, 'dovere + alzarsi。'],
      ['presto 与 tardi 的意思是：', ['早 / 晚', '晚 / 早', '快 / 慢'], 0, 'presto = 早；tardi = 晚。'],
    ],
  },

  // ───────────────────────── 第 32 天 ─────────────────────────
  {
    n: 32, it: 'Vado, vengo, esco', zh: '去、来、出',
    goal: '掌握 andare / venire / uscire / stare / dare 的现在时；会用 in / a / da 说去哪里（国家、城市、家、店铺、某人那里）和用什么交通工具。',
    scene: '周五，Marco 和你商量周末去哪里。你打算去佛罗伦萨，他则邀请你周日去他家吃饭。',
    dlg: `
      Marco: Dove vai questo fine settimana? | 这个周末你去哪里？
      Li Ming: Vado a Firenze in treno. E tu? | 我坐火车去佛罗伦萨。你呢？
      Marco: Io resto a Roma. Sabato esco con gli amici. | 我留在罗马。周六我和朋友们出去。
      Li Ming: Dove andate? | 你们去哪儿？
      Marco: Andiamo in pizzeria e poi al cinema. Vieni con noi? | 我们去比萨店，然后去看电影。你一起来吗？
      Li Ming: Sabato non posso, parto la mattina. Ma domenica sono libero! | 周六我不行，我早上出发。但周日我有空！
      Marco: Allora vieni a cena da me domenica! | 那周日来我家吃晚饭吧！
      Li Ming: Volentieri! | 乐意！
    `,
    q: [
      ['李明周末去哪里？', ['佛罗伦萨', '罗马', '米兰'], 0, 'Vado a Firenze。'],
      ['李明怎么去？', ['坐火车', '坐飞机', '开车'], 0, 'in treno。'],
      ['周日李明去哪里？', ['马可家吃晚饭', '电影院', '比萨店'], 0, 'vieni a cena da me domenica。'],
    ],
    vocab: `
      andare | 去 | an-DA-re
      venire | 来 | ve-NI-re
      uscire | 出去；出门 | u-SCI-re
      stare | 待；处于；（身体）怎样 | STA-re
      dare | 给 | DA-re
      restare | 留下；待 | re-STA-re
      il fine settimana | 周末 | il FI-ne set-ti-MA-na
      in treno | 坐火车 | in TRE-no
      in aereo | 坐飞机 | in a-E-re-o
      in macchina | 开车 | in MAC-chi-na
      a piedi | 步行 | a PIE-di
      a casa | 在家；回家 | a CA-sa
      al cinema | 去电影院 | al CI-ne-ma
      da me | 在我家；到我这儿 | da ME
      la pizzeria | 比萨店 | la piz-ze-RI-a
    `,
    pron: {
      t: 'esco / escono 与 sc',
      tips: [
        '**uscire** /uʃˈʃire/：sc 在 i 前读 /ʃ/ 且是长音；**esco** /ˈesko/：sc 在 o 前读 /sk/——同一个动词里 sc 的读音变了，因为后面的元音变了。',
        '**macchina** MAC-chi-na：cch 是长硬音 /kk/；重音在倒数第三音节。',
      ],
      drill: `
        uscire | 出去
        esco | 我出去
        escono | 他们出去
        esci | 你出去
        macchina | 汽车
        pizzeria | 比萨店
      `,
    },
    gram: [
      {
        h: '五个最常用的不规则动词',
        t: [
          ['人称', 'andare', 'venire', 'uscire', 'stare', 'dare'],
          ['io', 'vado', 'vengo', 'esco', 'sto', 'do'],
          ['tu', 'vai', 'vieni', 'esci', 'stai', 'dai'],
          ['lui / lei / Lei', 'va', 'viene', 'esce', 'sta', 'dà'],
          ['noi', 'andiamo', 'veniamo', 'usciamo', 'stiamo', 'diamo'],
          ['voi', 'andate', 'venite', 'uscite', 'state', 'date'],
          ['loro', 'vanno', 'vengono', 'escono', 'stanno', 'danno'],
        ],
      },
      {
        h: '去哪里：in / a / da',
        t: [
          ['介词', '用于', '例句'],
          ['in', '国家、街道、一般场所；交通工具', 'Vado in Italia. / in banca / in treno'],
          ['a', '城市、小地方、a casa / a scuola', 'Vado a Roma. / a casa'],
          ['al / alla…', 'a + 定冠词：电影院、咖啡吧', 'Vado al cinema. / al bar'],
          ['da', '某人那里（家、诊所、店）', 'Vado da Marco. / dal medico'],
        ],
        p: ['**a piedi**（步行）是固定搭配；其他交通工具用 in：in treno、in macchina、in aereo、in autobus。'],
      },
    ],
    text: {
      title: 'Il weekend di Giulia',
      body: `
        Questo fine settimana Giulia non resta a casa. | 这个周末朱莉娅不待在家。
        Sabato va al mare con gli amici in macchina. | 周六她和朋友们开车去海边。
        La sera escono e mangiano in pizzeria. | 晚上他们出门，在比萨店吃饭。

        Domenica vengo anch'io a cena da lei. | 周日我也去她家吃晚饭。
        Stiamo insieme fino a mezzanotte! | 我们一起待到午夜！
      `,
    },
    rq: [
      ['周六朱莉娅怎么去海边？', ['开车', '坐火车', '步行'], 0, 'in macchina。'],
      ['周六晚上他们在哪里吃饭？', ['比萨店', '家里', '海边'], 0, 'mangiano in pizzeria。'],
    ],
    culture: '意大利人很爱周末出行：**去海边（andare al mare）**是夏天的头等大事。**Ferragosto**（8 月 15 日）前后，海边会挤满人。南北城市间的高速火车让"周末一日游"非常方便。',
    speak: `
      Dove vai questo fine settimana? | 问朋友周末去哪里
      Vado a Firenze in treno. | 说你坐火车去佛罗伦萨
      Sabato esco con gli amici. | 说周六和朋友出去
      Vieni a cena da me? | 邀请朋友来你家吃晚饭
    `,
    wr: [
      '写 4–5 句话说说你这个周末的安排：去哪里、怎么去、和谁、做什么。',
      'Questo fine settimana vado al mare in treno.\nSabato esco con gli amici.\nDomenica sto a casa e studio italiano.',
      '这个周末我坐火车去海边。周六我和朋友出去。周日我待在家学意大利语。',
    ],
    quiz: [
      ['"我去罗马"应该说：', ['Vado a Roma.', 'Vado in Roma.', 'Vado da Roma.'], 0, '城市前用 a。'],
      ['"我去医生那里"：', ['Vado dal medico.', 'Vado al medico.', 'Vado in medico.'], 0, '去某人那里用 da。'],
      ['uscire 的 io 形式是：', ['esco', 'uscio', 'usco'], 0, 'uscire 不规则：esco, esci, esce…'],
      ['"坐火车"是：', ['in treno', 'a treno', 'con treno'], 0, '交通工具用 in。'],
    ],
  },

  // ───────────────────────── 第 33 天 ─────────────────────────
  {
    n: 33, it: 'So o conosco?', zh: '知道与认识',
    goal: '分清 sapere（知道、会）与 conoscere（认识）；会用 sapere + 动词原形说"我会……"；巩固情态动词的肯定、否定与疑问。',
    scene: '周六晚上，朋友聚会上，Marco 向你介绍他的同事们，聊起各自会什么。',
    dlg: `
      Marco: Conosci Chiara? Lavora con me. | 你认识基娅拉吗？她和我一起工作。
      Li Ming: Sì, conosco Chiara. È molto simpatica. | 认识，我认识基娅拉。她很讨人喜欢。
      Marco: Sai che suona la chitarra? | 你知道她会弹吉他吗？
      Li Ming: No, non lo so. E tu, sai suonare? | 不，我不知道。你呢，你会弹吗？
      Marco: Un po', ma non so cantare! | 会一点，但我不会唱歌！
      Li Ming: Io non so suonare, ma so cucinare gli spaghetti. | 我不会弹奏，不过我会做意面。
      Marco: Allora organizziamo una cena! Chi può venire? | 那我们组织一次晚饭吧！谁能来？
    `,
    q: [
      ['Marco 和 Chiara 是什么关系？', ['同事', '同学', '邻居'], 0, 'Lavora con me。'],
      ['Chiara 会什么乐器？', ['吉他', '钢琴', '小提琴'], 0, 'suona la chitarra。'],
      ['李明会做什么？', ['做意面', '唱歌', '弹吉他'], 0, 'so cucinare gli spaghetti。'],
    ],
    vocab: `
      conoscere | 认识；熟悉 | co-NO-scere
      sapere | 知道；会 | sa-PE-re
      simpatico | 讨人喜欢的 | sim-PA-ti-co
      il collega | 同事（男） | il col-LE-ga
      la collega | 同事（女） | la col-LE-ga
      suonare | 演奏；弹 | suo-NA-re
      la chitarra | 吉他 | la chi-TAR-ra
      cantare | 唱歌 | can-TA-re
      ballare | 跳舞 | bal-LA-re
      nuotare | 游泳 | nuo-TA-re
      organizzare | 组织；安排 | or-ga-nis-ZA-re
      non lo so | 我不知道 | non lo SO
      lo so | 我知道 | lo SO
      insieme | 一起 | in-SIE-me
    `,
    pron: {
      t: 'conoscere 里的 sc',
      tips: [
        '**conoscere** /koˈnoʃʃere/：sc 在 e 前读长的 /ʃ/；变位时 **conosco** /koˈnosko/ 里的 sc 在 o 前读 /sk/，**conosci** /koˈnoʃʃi/ 又变回 /ʃ/。',
        '**simpatico** sim-PA-ti-co 倒数第三音节重音；**chitarra** chi-TAR-ra：chi = /ki/，rr 长颤音。',
      ],
      drill: `
        conoscere | 认识
        conosco | 我认识
        conosci | 你认识
        sapere | 知道
        simpatico | 讨人喜欢
        chitarra | 吉他
      `,
    },
    gram: [
      {
        h: 'sapere 与 conoscere',
        p: [
          '**sapere**：知道信息、掌握技能。后面接**动词原形**（会做某事）、**che** 从句或疑问词：So nuotare. Non so dov\'è.',
          '**conoscere**：认识人、熟悉地方。后面直接接**人或地点**：Conosco Chiara. Conosco Roma.',
        ],
        t: [
          ['人称', 'sapere', 'conoscere'],
          ['io', 'so', 'conosco'],
          ['tu', 'sai', 'conosci'],
          ['lui / lei / Lei', 'sa', 'conosce'],
          ['noi', 'sappiamo', 'conosciamo'],
          ['voi', 'sapete', 'conoscete'],
          ['loro', 'sanno', 'conoscono'],
        ],
        eg: ['So cucinare. | 我会做饭。', 'Conosco Marco. | 我认识马可。', "Non so dov'è la stazione. | 我不知道车站在哪里。"],
      },
      {
        h: '"会做某事"的三种说法',
        t: [
          ['说法', '含义', '例句'],
          ['sapere + 原形', '掌握了某种技能', 'So suonare la chitarra.'],
          ['potere + 原形', '有条件、被允许', 'Posso venire domani.'],
          ['volere + 原形', '想要', 'Voglio imparare l\'italiano.'],
        ],
      },
    ],
    text: {
      title: 'Che cosa sai fare?',
      body: `
        Marco sa suonare la chitarra e sa cantare un po'. | 马可会弹吉他，也会唱一点。
        Chiara sa ballare molto bene. | 基娅拉舞跳得很好。
        Io so cucinare gli spaghetti e il riso. | 我会做意面和米饭。

        Non so nuotare, ma voglio imparare. | 我不会游泳，不过我想学。
        Conosco molte persone simpatiche in Italia. | 我在意大利认识许多讨人喜欢的人。
      `,
    },
    rq: [
      ['谁舞跳得很好？', ['基娅拉', '马可', '李明'], 0, 'Chiara sa ballare molto bene。'],
      ['"我"想学什么？', ['游泳', '吉他', '唱歌'], 0, 'voglio imparare（nuotare）。'],
    ],
    culture: '意大利人喜欢在**家里请客吃饭**（una cena a casa），这被视为很亲近的表示。被邀请时，通常带一瓶酒、一盒甜点或一束花作为礼物（不要带菊花，那是丧葬用花）。',
    speak: `
      Conosci Chiara? | 问朋友认不认识基娅拉
      So suonare la chitarra. | 说你会弹吉他（换成你会的）
      Non so cantare! | 说你不会唱歌
      Sai cucinare? | 问对方会不会做饭
    `,
    wr: [
      '写 3–4 句话说说你会什么、不会什么，以及你认识的一位朋友。',
      'So cucinare gli spaghetti, ma non so cantare.\nConosco una ragazza simpatica, Chiara.\nVoglio imparare a nuotare.',
      '我会做意面，但不会唱歌。我认识一个讨人喜欢的姑娘，基娅拉。我想学游泳。',
    ],
    quiz: [
      ['"我认识马可"：', ['Conosco Marco.', 'So Marco.', 'Sono Marco.'], 0, '认识人用 conoscere。'],
      ['"我会游泳"：', ['So nuotare.', 'Conosco nuotare.', 'Posso nuotare io.'], 0, '会（技能）用 sapere + 原形。'],
      ['sapere 的 noi 形式是：', ['sappiamo', 'sapiamo', 'sanno'], 0, 'noi sappiamo（pp 双写）。'],
      ["Non so dov'è la stazione 的意思是：", ['我不知道车站在哪', '我不认识车站', '我不去车站'], 0, 'sapere + 疑问词。'],
    ],
  },

  // ───────────────────────── 第 34 天 ─────────────────────────
  {
    n: 34, it: 'Nel, sul, dalla', zh: '缩合介词',
    goal: '掌握介词与定冠词的合并（di / a / da / in / su + il / lo / la / i / gli / le）；会说东西在哪里、从哪里来、属于谁。',
    scene: '你到处找手机，Giulia 帮你一起找。这样的对话里，"在桌子上""在包里"全靠缩合介词。',
    dlg: `
      Li Ming: Dov'è il mio telefono? Non è sul tavolo. | 我的手机在哪儿？不在桌子上。
      Giulia: È nella borsa? | 在包里吗？
      Li Ming: No, nella borsa ci sono solo le chiavi. | 不在，包里只有钥匙。
      Giulia: Forse è sulla sedia, vicino alla finestra. | 也许在椅子上，窗户旁边。
      Li Ming: Ah, eccolo! È sotto il giornale. Grazie! | 啊，在这儿！在报纸下面。谢谢！
      Giulia: Di niente! Ora andiamo dal fruttivendolo? | 不客气！现在我们去水果店吧？
    `,
    q: [
      ['李明在找什么？', ['手机', '钥匙', '钱包'], 0, 'il mio telefono。'],
      ['手机最后在哪里找到的？', ['报纸下面', '包里', '椅子上'], 0, 'sotto il giornale。'],
      ['他们接下来要去哪里？', ['水果店', '咖啡吧', '药店'], 0, 'dal fruttivendolo。'],
    ],
    vocab: `
      sul tavolo | 在桌子上 | sul TA-vo-lo
      nella borsa | 在包里 | NEL-la BOR-sa
      la sedia | 椅子 | la SE-dia
      la finestra | 窗户 | la fi-NE-stra
      il giornale | 报纸 | il gior-NA-le
      il telefono | 电话；手机 | il te-LE-fo-no
      le chiavi | 钥匙（复数） | le CHIA-vi
      sotto | 在……下面 | SOT-to
      sopra | 在……上面 | SO-pra
      dentro | 在……里面 | DEN-tro
      fuori | 在……外面 | FUO-ri
      eccolo | 它在这儿 | EC-co-lo
      di niente | 不客气 | di NIEN-te
      il fruttivendolo | 水果蔬菜商 | il frut-ti-VEN-do-lo
    `,
    pron: {
      t: '合并后的读音',
      tips: [
        '**nel、sul、dal、del、al** 读得很轻很短，重音在后面的名词上：nel TAvolo。**nella、sulla、dalla** 里的 ll 是长辅音，要读足。',
        '**degli、agli、negli** 里的 gli /ʎi/：舌面贴硬腭，别读成 /gli/。',
      ],
      drill: `
        sul tavolo | 在桌子上
        nella borsa | 在包里
        sulla sedia | 在椅子上
        dalla finestra | 从窗户
        degli amici | 朋友们的
        negli Stati Uniti | 在美国
      `,
    },
    gram: [
      {
        h: '介词 + 定冠词 = 缩合介词',
        p: ['介词 **di、a、da、in、su** 遇到定冠词时要合并成一个词。**con、per、tra、fra** 通常不合并（con il = con il）。'],
        t: [
          ['', 'il', 'lo', "l'", 'la', 'i', 'gli', 'le'],
          ['di', 'del', 'dello', "dell'", 'della', 'dei', 'degli', 'delle'],
          ['a', 'al', 'allo', "all'", 'alla', 'ai', 'agli', 'alle'],
          ['da', 'dal', 'dallo', "dall'", 'dalla', 'dai', 'dagli', 'dalle'],
          ['in', 'nel', 'nello', "nell'", 'nella', 'nei', 'negli', 'nelle'],
          ['su', 'sul', 'sullo', "sull'", 'sulla', 'sui', 'sugli', 'sulle'],
        ],
      },
      {
        h: '怎么用',
        t: [
          ['介词', '主要用法', '例句'],
          ['di', '……的；来自；部分', 'la borsa di Giulia / il libro del professore'],
          ['a', '到；在（时间、地点）', 'Vado al cinema. / alle nove'],
          ['da', '从；到某人那里', 'Vengo dalla stazione. / dal medico'],
          ['in', '在……里面', 'Sono nella cucina. / nel parco'],
          ['su', '在……上面', 'Il libro è sul tavolo.'],
        ],
        eg: ["Il telefono è sul tavolo. | 手机在桌子上。", 'Le chiavi sono nella borsa. | 钥匙在包里。', 'Vado dal fruttivendolo. | 我去水果店。'],
      },
    ],
    text: {
      title: 'La mia stanza',
      body: `
        Nella mia stanza c'è un letto grande. | 我的房间里有一张大床。
        Il computer è sulla scrivania, vicino alla finestra. | 电脑在书桌上，靠近窗户。

        I libri sono negli scaffali e le chiavi sono nella borsa. | 书在书架上，钥匙在包里。
        Sotto il letto ci sono le scarpe. | 床下面是鞋子。
      `,
    },
    rq: [
      ['电脑在哪里？', ['书桌上', '床上', '包里'], 0, 'sulla scrivania。'],
      ['钥匙在哪里？', ['包里', '书架上', '床下'], 0, 'nella borsa。'],
    ],
    culture: '在意大利语里，**di + 人** 表示所有关系：la borsa **di** Giulia（朱莉娅的包）。这比"物主形容词"更常用于第三人。另外，**"Di niente"** 和 **"Prego"** 都是回答"谢谢"的好说法；比较随意时还可以说 **Figurati!**（别客气！）。',
    speak: `
      Dov'è il mio telefono? | 问手机在哪
      È sul tavolo, vicino alla finestra. | 说它在桌子上，靠近窗户
      Le chiavi sono nella borsa. | 说钥匙在包里
      Vado dal medico. | 说你去看医生
    `,
    wr: [
      '写 4 句话描述你房间里 4 样东西各在哪里，要用缩合介词（sul / nella / sulla…）。',
      'Il libro è sul tavolo.\nLe chiavi sono nella borsa.\nIl telefono è sulla sedia.\nLe scarpe sono sotto il letto.',
      '书在桌子上。钥匙在包里。手机在椅子上。鞋子在床下。',
    ],
    quiz: [
      ['a + il =', ['al', 'alo', 'a il'], 0, 'a + il → al。'],
      ['in + la =', ['nella', 'inla', 'in la'], 0, 'in + la → nella。'],
      ['"在桌子上"应该说：', ['sul tavolo', 'su il tavolo', 'in tavolo'], 0, 'su + il → sul。'],
      ['di + gli =', ['degli', 'dei', 'di gli'], 0, 'di + gli → degli。'],
    ],
  },

  // ───────────────────────── 第 35 天 ─────────────────────────
  {
    n: 35, it: 'Il mio, il tuo', zh: '我的、你的',
    goal: '会用物主形容词与物主代词（il mio / la tua…）表示"谁的"；会用 questo / quello 指示；掌握 bello 随名词变化。',
    scene: '朋友们在朱莉娅家聚会后，大家的东西混在了一起，要分清哪件是谁的。',
    dlg: `
      Giulia: Di chi è questa giacca? | 这件外套是谁的？
      Li Ming: È mia. E quella borsa è tua? | 是我的。那个包是你的吗？
      Giulia: No, non è mia. È di Chiara. La mia è quella rossa. | 不是我的。是基娅拉的。我的是那个红色的。
      Li Ming: Che bella! E questi occhiali? | 真漂亮！那这副眼镜呢？
      Giulia: Sono di Marco. Sono i suoi occhiali nuovi. | 是马可的。是他的新眼镜。
      Li Ming: Questo è il suo telefono, quello invece è il mio. | 这是他的手机，而那个是我的。
    `,
    q: [
      ['这件外套是谁的？', ['李明的', '基娅拉的', '马可的'], 0, 'È mia.'],
      ['红色的包是谁的？', ['朱莉娅的', '基娅拉的', '李明的'], 0, 'La mia è quella rossa。'],
      ['新眼镜是谁的？', ['马可的', '朱莉娅的', '基娅拉的'], 0, 'Sono di Marco。'],
    ],
    vocab: `
      di chi è? | 是谁的？ | di CHI È
      la giacca | 外套；夹克 | la GIAC-ca
      gli occhiali | 眼镜 | gli oc-CHIA-li
      nuovo | 新的 | NUO-vo
      vecchio | 旧的；老的 | VEC-chio
      bello | 漂亮的；好看的 | BEL-lo
      brutto | 难看的；糟糕的 | BRUT-to
      invece | 而；相反 | in-VE-ce
      il cellulare | 手机 | il cel-lu-LA-re
      il regalo | 礼物 | il re-GA-lo
      uguale | 一样的 | u-GUA-le
      diverso | 不同的 | di-VER-so
      quello | 那个 | QUEL-lo
      mio / tuo / suo | 我的 / 你的 / 他的 | MI-o / TU-o / SU-o
    `,
    pron: {
      t: 'chi / che 与 occhiali',
      tips: [
        '**occhiali** oc-CHIA-li：cch 是长硬音 /kk/；**vecchio** VEC-chio：cchi 读 /kkj/。chi 里的 h 不发音，只保持硬音。',
        '**quello / bello** 的 ll 是长辅音；**giacca** GIAC-ca：gi 软音，cc 长硬音。',
      ],
      drill: `
        occhiali | 眼镜
        vecchio | 旧的
        giacca | 外套
        bello | 漂亮的
        quello | 那个
        regalo | 礼物
      `,
    },
    gram: [
      {
        h: '物主代词：il mio = 我的（那个）',
        p: ['物主形容词（mio, tuo…）单独使用时变成**物主代词**，要加定冠词：Questa borsa è **mia**（我的，作表语时可不加冠词）；**La mia** è rossa（我的那个是红的）。'],
        eg: ['La mia è quella rossa. | 我的是那个红色的。', 'Il tuo telefono è nuovo. | 你的手机是新的。', 'Questo è il suo cellulare. | 这是他的手机。'],
      },
      {
        h: 'questo 与 quello：这个与那个',
        t: [
          ['', '阳单', '阴单', '阳复', '阴复'],
          ['这个', 'questo', 'questa', 'questi', 'queste'],
          ['那个（单用）', 'quello', 'quella', 'quelli', 'quelle'],
        ],
        p: ["**quello** 放在名词前时，变化像冠词：**quel** libro、**quello** studente、**quell'**amico、**quella** casa、**quei** libri、**quegli** studenti、**quelle** case。"],
      },
      {
        h: 'bello 放在名词前的变化',
        t: [
          ['单数', '例子', '复数', '例子'],
          ['bel', 'un bel libro', 'bei', 'dei bei libri'],
          ['bello', 'un bello studente', 'begli', 'dei begli studenti'],
          ["bell'", "un bell'amico", 'begli', 'dei begli amici'],
          ['bella', 'una bella casa', 'belle', 'delle belle case'],
        ],
      },
    ],
    text: {
      title: 'Un regalo per Marco',
      body: `
        Domani è il compleanno di Marco. | 明天是马可的生日。
        Voglio comprare un bel regalo. | 我想买一份漂亮的礼物。
        Quel libro è bello, ma è molto caro. | 那本书很好看，但是很贵。

        Quegli occhiali sono belli e non costano molto. | 那副眼镜很好看，也不太贵。
        Compro gli occhiali: sono il regalo giusto! | 我买眼镜：这是合适的礼物！
      `,
    },
    rq: [
      ['明天是什么日子？', ['马可的生日', '朱莉娅的生日', '节日'], 0, 'il compleanno di Marco。'],
      ['"我"最后买了什么？', ['眼镜', '书', '外套'], 0, 'Compro gli occhiali。'],
    ],
    culture: '意大利人**送礼很讲究包装**：商店通常会免费或低价帮你精美包装（pacco regalo）。去朋友家做客时带上**酒、甜点或鲜花**是常见的好选择。生日（compleanno）时，寿星通常会请客，而不是被请。',
    speak: `
      Di chi è questa giacca? | 问这件外套是谁的
      È mia. La tua è quella nera. | 说这件是我的，你的是那件黑色的
      Quella borsa è bella! | 夸那个包好看
      Questo è il mio cellulare. | 说这是我的手机
    `,
    wr: [
      '写 4 句话比较你和朋友的东西：谁的什么，新旧、好看难看。',
      'Il mio telefono è vecchio, il tuo è nuovo.\nLa mia borsa è nera, la tua è rossa.\nQuella giacca è bella!',
      '我的手机是旧的，你的是新的。我的包是黑色的，你的是红色的。那件外套真好看！',
    ],
    quiz: [
      ['"我的父母"（复数亲属）加冠词：', ['i miei genitori', 'miei genitori', 'mio genitori'], 0, '复数亲属名词前要加冠词。'],
      ['"那个学生"（阳性，s+辅音）：', ['quello studente', 'quel studente', 'quelli studente'], 0, 'quello 用于 s+辅音 / z / gn 开头的阳性单数。'],
      ['"一座漂亮的房子"：', ['una bella casa', 'un bello casa', 'una bel casa'], 0, 'bello 变为 bella。'],
      ['Di chi è questa borsa? 的意思：', ['这个包是谁的？', '这个包多少钱？', '这个包在哪里？'], 0, 'di chi = 谁的。'],
    ],
  },

  // ───────────────────────── 第 36 天 ─────────────────────────
  {
    n: 36, it: 'La mia casa', zh: '我的家',
    goal: '会说房间和家具；会看租房广告并问房租、杂费、家具；会用 sopra / sotto / dentro / fuori 等描述位置。',
    scene: '你想在罗马租一套公寓。中介带你看房，你问了房租、阳台、空调等问题。',
    dlg: `
      Agente: Ecco l'appartamento: soggiorno, cucina, camera e bagno. | 这就是这套公寓：客厅、厨房、卧室和卫生间。
      Li Ming: È luminoso. C'è il balcone? | 很明亮。有阳台吗？
      Agente: Sì, il balcone è grande. Il condominio ha anche l'ascensore. | 有，阳台很大。小区也有电梯。
      Li Ming: Quanto costa l'affitto al mese? | 月租多少钱？
      Agente: Ottocento euro, spese escluse. | 八百欧元，不含杂费。
      Li Ming: Sono molti. C'è l'aria condizionata? | 好贵。有空调吗？
      Agente: Sì, e la cucina è già arredata. | 有，而且厨房已经配好家具了。
    `,
    q: [
      ['月租是多少？', ['800 欧元', '700 欧元', '600 欧元'], 0, 'Ottocento euro。'],
      ['杂费包含在内吗？', ['不包含', '包含', '不清楚'], 0, 'spese escluse。'],
      ['公寓有阳台吗？', ['有，很大', '没有', '很小'], 0, 'il balcone è grande。'],
    ],
    vocab: `
      l'appartamento | 公寓 | l'ap-par-ta-MEN-to
      il soggiorno | 客厅 | il sog-GIOR-no
      la cucina | 厨房 | la cu-CI-na
      la camera da letto | 卧室 | la CA-me-ra da LET-to
      il bagno | 卫生间；浴室 | il BA-gno
      il balcone | 阳台 | il bal-CO-ne
      luminoso | 明亮的 | lu-mi-NO-so
      l'affitto | 房租 | l'af-FIT-to
      al mese | 每月 | al ME-se
      le spese | 杂费；开销 | le SPE-se
      arredato | 带家具的 | ar-re-DA-to
      il condominio | 公寓楼；小区 | il con-do-MI-nio
      il letto | 床 | il LET-to
      il divano | 沙发 | il di-VA-no
      l'armadio | 衣柜 | l'ar-MA-dio
      la lavatrice | 洗衣机 | la la-va-TRI-ce
    `,
    pron: {
      t: 'soggiorno / affitto',
      tips: [
        '**soggiorno** sog-GIOR-no：gg 在 i 前是长的软音 /ddʒ/；**affitto** af-FIT-to：ff、tt 都是长辅音。',
        '**appartamento** ap-par-ta-MEN-to：pp 长；**lavatrice** la-va-TRI-ce：ce 软音。',
      ],
      drill: `
        appartamento | 公寓
        soggiorno | 客厅
        affitto | 房租
        balcone | 阳台
        armadio | 衣柜
        lavatrice | 洗衣机
      `,
    },
    gram: [
      {
        h: '房间与家具的位置',
        t: [
          ['意大利语', '意思', '例句'],
          ['sopra', '在……上面', 'Sopra il letto c\'è una lampada.'],
          ['sotto', '在……下面', 'Sotto il tavolo c\'è un gatto.'],
          ['dentro', '在……里面', 'Dentro l\'armadio ci sono le giacche.'],
          ['fuori', '在……外面', 'Fuori c\'è il balcone.'],
          ['tra / fra', '在……之间', 'Il divano è tra la finestra e la porta.'],
          ['a destra di / a sinistra di', '在……右边 / 左边', 'Il bagno è a destra della cucina.'],
        ],
      },
      {
        h: '看房时的常用问句',
        eg: [
          'Quanto costa l\'affitto al mese? | 月租多少？',
          'Le spese sono incluse? | 杂费包含在内吗？',
          'La casa è arredata? | 带家具吗？',
          'C\'è l\'aria condizionata? | 有空调吗？',
        ],
      },
    ],
    text: {
      title: 'Affittasi bilocale',
      body: `
        AFFITTASI BILOCALE IN CENTRO | 出租市中心两居室
        Secondo piano con ascensore, arredato. | 三楼，带电梯，带家具。
        Soggiorno con angolo cottura, camera da letto, bagno e balcone. | 客厅带小厨房，卧室，卫生间和阳台。

        Affitto: 750 euro al mese, spese escluse. | 租金：每月 750 欧元，不含杂费。
        Telefonare dalle 9 alle 18. | 请在 9 点至 18 点来电。
      `,
    },
    rq: [
      ['这套房在几楼？', ['三楼（secondo piano）', '二楼', '一楼'], 0, 'secondo piano = 意大利的二层 = 中国说的三楼。'],
      ['房租是多少？', ['750 欧元每月，不含杂费', '750 欧元，含杂费', '700 欧元'], 0, '750 euro al mese, spese escluse。'],
      ['什么时候可以打电话？', ['9 点到 18 点', '全天', '晚上'], 0, 'Telefonare dalle 9 alle 18.'],
    ],
    culture: '租房广告里的 **bilocale**（两居室，指客厅+卧室）、**trilocale**（三居室）是常见户型。住宅租约常见 **"4+4"**（4 年，可再续 4 年）。除房租外还有 **spese condominiali**（物业杂费）；**caparra / deposito**（押金）通常是 2–3 个月房租。',
    speak: `
      Quanto costa l'affitto al mese? | 问月租多少
      Le spese sono incluse? | 问杂费是否包含
      C'è l'aria condizionata? | 问有没有空调
      La casa è arredata? | 问带不带家具
    `,
    wr: [
      '写一则 4 句话的小租房广告，或写你理想的家（几个房间、有什么、在哪里）。',
      "Affittasi appartamento in centro.\nCi sono un soggiorno, una camera e un bagno.\nC'è il balcone e l'ascensore.\nAffitto: 700 euro al mese.",
      '出租市中心公寓。有一间客厅、一间卧室和一个卫生间。有阳台和电梯。租金每月 700 欧元。',
    ],
    quiz: [
      ['bilocale 指：', ['两居室（客厅 + 卧室）', '两个洗手间', '两层楼'], 0, 'bi = 二，locale = 房间。'],
      ['Spese escluse 的意思：', ['不含杂费', '含杂费', '免费'], 0, 'escluse = 不包括。'],
      ['arredato 的意思：', ['带家具的', '空的', '新建的'], 0, 'arredare = 布置家具。'],
      ['"沙发在窗户和门之间"：', ['Il divano è tra la finestra e la porta.', 'Il divano è sul la finestra e la porta.', 'Il divano è da la finestra.'], 0, 'tra / fra = 之间。'],
    ],
  },

  // ───────────────────────── 第 37 天 ─────────────────────────
  {
    n: 37, it: 'Fare la spesa', zh: '买菜',
    goal: '会在菜市场和超市买东西；掌握部分冠词（del / dello / della / dei / degli / delle）与数量表达（un chilo di, un etto di, un po\' di）。',
    scene: '周六上午，你在露天菜市场买做晚饭用的食材。',
    dlg: `
      Fruttivendolo: Buongiorno! Cosa desidera? | 早上好！您要点什么？
      Li Ming: Vorrei un chilo di pomodori e dei limoni. | 我想要一公斤番茄和一些柠檬。
      Fruttivendolo: Quanti limoni? | 要几个柠檬？
      Li Ming: Quattro, per favore. E mezzo chilo di uva. | 四个。再要半公斤葡萄。
      Fruttivendolo: Altro? | 还要别的吗？
      Li Ming: Sì, un po' di basilico e dell'insalata. | 要，一点罗勒和一些生菜。
      Fruttivendolo: Ecco. Sono sei euro e quaranta. | 给您。一共六欧元四十分。
    `,
    q: [
      ['李明要了多少番茄？', ['一公斤', '半公斤', '两公斤'], 0, 'un chilo di pomodori。'],
      ['他要了几个柠檬？', ['四个', '两个', '六个'], 0, 'Quattro。'],
      ['一共多少钱？', ['6.40 欧元', '4.60 欧元', '8 欧元'], 0, 'sei euro e quaranta。'],
    ],
    vocab: `
      cosa desidera? | 您要点什么？ | CO-sa de-SI-de-ra
      il chilo | 公斤 | il CHI-lo
      l'etto | 一百克 | l'ET-to
      mezzo chilo | 半公斤 | MEZ-zo CHI-lo
      il pomodoro | 番茄 | il po-mo-DO-ro
      il limone | 柠檬 | il li-MO-ne
      l'uva | 葡萄 | l'U-va
      il basilico | 罗勒 | il ba-SI-li-co
      l'insalata | 生菜；沙拉 | l'in-sa-LA-ta
      la frutta | 水果 | la FRUT-ta
      la verdura | 蔬菜 | la ver-DU-ra
      il latte | 牛奶 | il LAT-te
      le uova | 鸡蛋 | le UO-va
      il prosciutto | 火腿 | il pro-SCIUT-to
      un po' di | 一点 | un PO di
    `,
    pron: {
      t: 'prosciutto 与 uova',
      tips: [
        '**prosciutto** pro-SCIUT-to：sci 读 /ʃ/，i 不发音（"sciu" = /ʃu/）；tt 长。**uova** UO-va：uo 是二合元音。',
        '**limone** li-MO-ne 与 **pomodoro** po-mo-DO-ro：重音位置不同，注意区分。',
      ],
      drill: `
        prosciutto | 火腿
        uova | 鸡蛋
        limone | 柠檬
        pomodoro | 番茄
        basilico | 罗勒
        verdura | 蔬菜
      `,
    },
    gram: [
      {
        h: '部分冠词：表示"一些"',
        p: ['**部分冠词 = di + 定冠词**，表示"一些、若干"，用于**不可数名词**或**复数名词**：del pane（一些面包）、dei limoni（一些柠檬）、dell\'insalata（一些生菜）。形式与第 34 天的 di 缩合介词完全相同。'],
        t: [
          ['', '阳性', '阴性'],
          ['单数（普通）', 'del pane', 'della pasta'],
          ['单数（s+辅音 / z）', 'dello zucchero', '—'],
          ['单数（元音开头）', "dell'olio", "dell'acqua"],
          ['复数（普通）', 'dei limoni', 'delle mele'],
          ['复数（s+辅音 / z / 元音）', 'degli spaghetti / degli amici', 'delle amiche'],
        ],
      },
      {
        h: '数量表达',
        t: [
          ['说法', '例句'],
          ['un chilo di + 名词', 'un chilo di pomodori'],
          ['un etto di + 名词', 'due etti di prosciutto'],
          ['mezzo chilo di + 名词', 'mezzo chilo di uva'],
          ['un po\' di + 名词', "un po' di basilico"],
          ['una bottiglia / un pacco / una confezione di', 'una bottiglia di latte'],
        ],
        p: ['**di 后面不加冠词**（un chilo **di** pomodori）。**un etto = 100 克**，买火腿、奶酪时按 etto 说最地道。'],
      },
    ],
    text: {
      title: 'La spesa per la cena',
      body: `
        Questa sera cucino per gli amici. | 今晚我给朋友们做饭。
        Compro un chilo di pomodori, due etti di prosciutto e dell'insalata. | 我买一公斤番茄、二百克火腿和一些生菜。

        Prendo anche un po' di basilico e delle uova. | 我还拿一点罗勒和一些鸡蛋。
        Al mercato tutto è fresco e buono! | 市场里的东西都新鲜又好吃！
      `,
    },
    rq: [
      ['今晚"我"做什么？', ['给朋友们做饭', '去餐馆', '去超市'], 0, 'cucino per gli amici。'],
      ['买了多少火腿？', ['二百克', '一公斤', '一百克'], 0, 'due etti = 200 克。'],
    ],
    culture: '在意大利买熟食、奶酪、火腿，常按 **etto（100 克）**计：**"Due etti di prosciutto, per favore."** 蔬果摊可以说"**Me ne dia un chilo**"（给我一公斤）。**超市里取蔬果要先戴一次性手套、称重贴价签再结账**。',
    speak: `
      Vorrei un chilo di pomodori. | 说要一公斤番茄
      Due etti di prosciutto, per favore. | 说要二百克火腿
      Un po' di basilico e dell'insalata. | 说要一点罗勒和生菜
      Quant'è in tutto? | 问一共多少钱
    `,
    wr: [
      '写一份给朋友做饭的购物清单（5 样东西，带数量），再写一句向摊主要东西的话。',
      "Un chilo di pomodori, due etti di prosciutto,\nmezzo chilo di uva, un po' di basilico, delle uova.\nBuongiorno! Vorrei un chilo di pomodori, per favore.",
      '一公斤番茄，二百克火腿，半公斤葡萄，一点罗勒，一些鸡蛋。早上好！我想要一公斤番茄。',
    ],
    quiz: [
      ['"一些柠檬"（复数阳性）：', ['dei limoni', 'del limoni', 'di limoni il'], 0, '部分冠词复数阳性 = dei。'],
      ['"一公斤番茄"：', ['un chilo di pomodori', 'un chilo dei pomodori', 'un chilo pomodori'], 0, '数量词后用 di，不加冠词。'],
      ['un etto 是多少？', ['100 克', '10 克', '1 公斤'], 0, 'etto = 100 克。'],
      ["'些许罗勒'的说法：", ["un po' di basilico", "un po' il basilico", 'un po basilico'], 0, "un po' di + 名词。"],
    ],
  },

  // ───────────────────────── 第 38 天 ─────────────────────────
  {
    n: 38, it: 'Lavoro e studio', zh: '工作与学习',
    goal: '会谈职业、单位和工作时间；会区分 tu 与 Lei 的正式程度；认识常见职业词及阴阳性变化。',
    scene: '一次商务酒会上，你在和一位意大利医生交谈，全程用正式的 Lei。',
    dlg: `
      Dottoressa Bianchi: Buongiorno, signor Li. Che lavoro fa? | 早上好，李先生。您做什么工作？
      Li Ming: Sono ingegnere informatico. Lavoro in un'azienda a Shanghai. | 我是软件工程师。我在上海的一家公司工作。
      Dottoressa Bianchi: Interessante! E quante ore lavora al giorno? | 有意思！您每天工作几个小时？
      Li Ming: Lavoro otto ore, dalle nove alle sei. E Lei? | 我工作八小时，从九点到六点。您呢？
      Dottoressa Bianchi: Io sono medico e lavoro in ospedale. Faccio spesso i turni di notte. | 我是医生，在医院工作。我经常上夜班。
      Li Ming: Che lavoro faticoso! | 工作真辛苦！
    `,
    q: [
      ['李明做什么工作？', ['软件工程师', '医生', '老师'], 0, 'ingegnere informatico。'],
      ['李明每天工作几个小时？', ['八小时', '六小时', '十小时'], 0, 'otto ore。'],
      ['Bianchi 医生经常上什么班？', ['夜班', '早班', '周末班'], 0, 'i turni di notte。'],
    ],
    vocab: `
      lavorare | 工作 | la-vo-RA-re
      l'ufficio | 办公室 | l'uf-FI-cio
      l'azienda | 公司；企业 | l'a-ZIEN-da
      l'ospedale | 医院 | l'o-spe-DA-le
      il medico | 医生 | il ME-di-co
      la dottoressa | 女医生；博士女士 | la dot-tor-ES-sa
      l'avvocato | 律师 | l'av-vo-CA-to
      l'insegnante | 教师 | l'in-se-GNAN-te
      l'infermiere | 护士（男） | l'in-fer-MIE-re
      l'impiegato | 职员 | l'im-pie-GA-to
      lo stipendio | 工资 | lo sti-PEN-dio
      il turno | 轮班 | il TUR-no
      interessante | 有趣的 | in-te-res-SAN-te
      faticoso | 辛苦的；累人的 | fa-ti-CO-so
    `,
    pron: {
      t: 'avv- / tt- 与 gn',
      tips: [
        '**avvocato** av-vo-CA-to：vv 是长辅音 /vv/；**insegnante** in-se-GNAN-te：gn 读 /ɲ/，一个音。',
        '**dottoressa** dot-to-RES-sa：tt、ss 都是长辅音；**interessante** in-te-res-SAN-te。',
      ],
      drill: `
        avvocato | 律师
        insegnante | 教师
        dottoressa | 女医生
        ospedale | 医院
        azienda | 公司
        stipendio | 工资
      `,
    },
    gram: [
      {
        h: '职业名称的阴阳性',
        t: [
          ['男', '女', '规则'],
          ['il medico', 'la dottoressa / la medica', '部分有专用阴性'],
          ['l\'avvocato', 'l\'avvocata / l\'avvocato', '-o → -a'],
          ['l\'infermiere', 'l\'infermiera', '-e → -a'],
          ['l\'insegnante', 'l\'insegnante', '-e：男女同形'],
          ['lo studente', 'la studentessa', '-e → -essa'],
          ['il pittore', 'la pittrice', '-tore → -trice'],
        ],
        p: ['说职业时**不加冠词**：Sono medico. 有修饰语时才加：Sono **un** buon medico。'],
      },
      {
        h: 'tu 与 Lei：什么时候用哪个',
        t: [
          ['场合', '用 tu', '用 Lei'],
          ['对象', '朋友、家人、同龄人、孩子', '陌生人、长辈、上级、客户、店员'],
          ['动词', 'Come ti chiami? / Parli italiano?', 'Come si chiama? / Parla italiano?'],
          ['提议改称呼', 'Possiamo darci del tu?（我们可以用 tu 称呼吗？）', '由年长者或上位者先提议'],
        ],
        p: ['**Lei 是第三人称单数形式**，所以动词变位与 lui / lei 相同；书面上常大写（Lei）以示区分。'],
      },
    ],
    text: {
      title: 'Un lavoro, due vite',
      body: `
        Marta è infermiera e lavora in ospedale. | 玛尔塔是护士，在医院工作。
        Spesso fa i turni di notte e dorme di giorno. | 她经常上夜班，白天睡觉。

        Suo marito è insegnante e lavora in una scuola. | 她丈夫是老师，在学校工作。
        La sera cenano insieme e parlano molto. | 晚上他们一起吃晚饭，聊很多。
      `,
    },
    rq: [
      ['Marta 的职业是？', ['护士', '老师', '医生'], 0, 'infermiera。'],
      ['她丈夫在哪里工作？', ['学校', '医院', '公司'], 0, 'in una scuola。'],
    ],
    culture: '意大利人**重视身份与称呼**：对有学位的人常称 **dottore / dottoressa**（甚至本科毕业生也被称"dottore"）。初次见面一律用 Lei，直到对方说 **"Dammi del tu"**（跟我用 tu 吧）。年轻人之间、同事之间则很快改用 tu。',
    speak: `
      Che lavoro fa? | 用 Lei 问对方的职业
      Sono ingegnere e lavoro in un'azienda. | 说你的职业和单位
      Lavoro dalle nove alle sei. | 说你的工作时间
      Possiamo darci del tu? | 提议改用 tu 称呼
    `,
    wr: [
      '写 4 句话介绍你（或家人）的工作：职业、单位、时间、感受。',
      "Sono ingegnere informatico.\nLavoro in un'azienda a Shanghai.\nLavoro dalle nove alle sei.\nÈ un lavoro interessante ma faticoso.",
      '我是软件工程师。我在上海的一家公司工作。我从九点工作到六点。这份工作有意思但很累。',
    ],
    quiz: [
      ['对陌生的长辈，问职业应该说：', ['Che lavoro fa?', 'Che lavoro fai?', 'Che lavoro faccio?'], 0, 'Lei → fa。'],
      ['"女护士"是：', ['infermiera', 'infermiere', 'infermiero'], 0, '-e → -a。'],
      ['说职业"我是医生"：', ['Sono medico.', 'Sono un il medico.', 'Ho medico.'], 0, '职业前通常不加冠词。'],
      ['Possiamo darci del tu? 的意思：', ['我们可以用"你"互相称呼吗？', '我们可以见面吗？', '我们可以给你吗？'], 0, 'dare del tu = 用 tu 称呼。'],
    ],
  },

  // ───────────────────────── 第 39 天 ─────────────────────────
  {
    n: 39, it: 'Pronto?', zh: '电话与预约',
    goal: '会接打电话（Pronto? / Sono… / Chi parla?）；会预约、改期；会说日期和序数词（il primo, il due…）。',
    scene: '你牙疼，给一家牙科诊所打电话预约。',
    dlg: `
      Segretaria: Studio dentistico Rossi, buongiorno! | 罗西牙科诊所，早上好！
      Li Ming: Buongiorno! Vorrei prendere un appuntamento, per favore. | 早上好！我想预约。
      Segretaria: Certo. Per quando? | 当然。想约什么时候？
      Li Ming: Possibilmente questa settimana. Giovedì mattina è libero? | 最好是这周。周四上午有空吗？
      Segretaria: Giovedì alle dieci e mezza va bene? | 周四十点半可以吗？
      Li Ming: Sì, perfetto. Mi chiamo Li Ming. | 可以，太好了。我叫李明。
      Segretaria: Come si scrive? E mi lascia un numero di telefono? | 怎么拼写？还有请留一个电话号码好吗？
      Li Ming: Elle, i, emme, i, enne, gi. Il numero è tre, tre, sette, uno, due, quattro. | L、I、M、I、N、G。号码是 3、3、7、1、2、4。
    `,
    q: [
      ['李明为什么打电话？', ['预约牙医', '订餐厅', '订酒店'], 0, 'prendere un appuntamento。'],
      ['约在什么时间？', ['周四十点半', '周四九点', '周五十点半'], 0, 'Giovedì alle dieci e mezza。'],
      ['秘书还要李明留什么？', ['电话号码', '地址', '护照'], 0, 'un numero di telefono。'],
    ],
    vocab: `
      pronto? | 喂？（接电话） | PRON-to
      chi parla? | 请问哪位？ | chi PAR-la
      un attimo | 稍等一下 | un AT-ti-mo
      l'appuntamento | 预约；约会 | l'ap-pun-ta-MEN-to
      prendere un appuntamento | 预约 | PREN-de-re un ap-pun-ta-MEN-to
      libero | 有空的；自由的 | LI-be-ro
      occupato | 占线的；忙的 | oc-cu-PA-to
      il messaggio | 留言；信息 | il mes-SAG-gio
      richiamare | 回电话 | ri-chia-MA-re
      più tardi | 稍后 | piu TAR-di
      la segretaria | 秘书 | la se-gre-TA-ria
      lo studio | 诊所；工作室；学习 | lo STU-dio
      possibilmente | 尽可能 | pos-si-bil-MEN-te
      spostare | 改期；挪动 | spo-STA-re
      disdire | 取消（预约） | di-SDI-re
    `,
    pron: {
      t: '电话里的清晰度',
      tips: [
        '电话里要**放慢、清晰**，尤其是数字和名字。拼写名字时用字母名称，也可以用城市名辅助：M come Milano。',
        '**appuntamento** ap-pun-ta-MEN-to：pp 长；**possibilmente** pos-si-bil-MEN-te：ss 长，重音在 MEN；**attimo** AT-ti-mo。',
      ],
      drill: `
        pronto | 喂
        appuntamento | 预约
        attimo | 一会儿
        messaggio | 留言
        richiamare | 回电话
        possibilmente | 尽可能
      `,
    },
    gram: [
      {
        h: '电话用语',
        t: [
          ['情景', '说法'],
          ['接电话', 'Pronto? / Studio Rossi, buongiorno!'],
          ['问对方是谁', 'Chi parla? / Con chi parlo?'],
          ['找人', "C'è Marco, per favore? / Vorrei parlare con la dottoressa Bianchi."],
          ['请等一下', 'Un attimo, per favore. / Resti in linea.'],
          ['留言', 'Posso lasciare un messaggio?'],
          ['稍后再打', 'Richiamo più tardi. / Può richiamare?'],
        ],
      },
      {
        h: '序数词与日期',
        p: ['序数词：**primo, secondo, terzo, quarto, quinto, sesto, settimo, ottavo, nono, decimo**。说日期时，**每月 1 日用序数 il primo**，其他日子用基数：**il due** maggio、**il dieci** giugno。'],
        eg: ["Il primo maggio. | 五月一日。", 'Il dodici marzo. | 三月十二日。', 'Giovedì quindici novembre. | 十一月十五日，星期四。'],
      },
    ],
    text: {
      title: 'Un messaggio vocale',
      body: `
        Ciao Marco, sono Li Ming. | 嗨马可，我是李明。
        Ti chiamo per domani: non posso venire alle nove. | 我为明天的事打给你：我九点来不了。
        Possiamo spostare l'appuntamento alle dieci? | 我们能把约定改到十点吗？

        Richiamami quando puoi. | 方便的时候给我回电话。
        Grazie e a presto! | 谢谢，回头见！
      `,
    },
    rq: [
      ['李明为什么打电话？', ['想改约定时间', '想取消约定', '想邀请吃饭'], 0, 'spostare l\'appuntamento。'],
      ['他想改到几点？', ['十点', '九点', '十一点'], 0, 'alle dieci。'],
    ],
    culture: '意大利人**很爱用 WhatsApp 的语音留言**，而不是打电话。接电话说 **Pronto?**（字面"准备好了吗？"），不是 Ciao 也不是 Buongiorno。预约牙医、理发店等服务，常常要提前几天打电话，**取消也请提前告知（disdire）**，否则可能被收费。',
    speak: `
      Pronto? Sono Li Ming. | 接起或拨通电话时的开场
      Vorrei prendere un appuntamento. | 说你想预约
      Giovedì mattina è libero? | 问周四上午有没有空
      Posso lasciare un messaggio? | 问能不能留言
    `,
    wr: [
      '写一段 4–5 句的电话留言：你是谁、想约什么、什么时间、请对方回电。',
      "Buongiorno, sono Li Ming.\nVorrei prendere un appuntamento giovedì mattina.\nIl mio numero è tre, tre, sette, uno, due, quattro.\nGrazie e arrivederci!",
      '早上好，我是李明。我想约周四上午。我的号码是 3、3、7、1、2、4。谢谢，再见！',
    ],
    quiz: [
      ['接电话时说：', ['Pronto?', 'Buonanotte?', 'Prego?'], 0, 'Pronto = 喂。'],
      ['五月一日的说法：', ['il primo maggio', 'il uno maggio', 'il prima maggio'], 0, '每月 1 日用序数 primo。'],
      ['"请稍等一下"：', ['Un attimo, per favore.', 'Una volta, per favore.', 'Un minuto, grazie.'], 0, 'un attimo = 一会儿。'],
      ['想问能不能留言：', ['Posso lasciare un messaggio?', 'Posso lasciare un biglietto?', 'Posso lasciare il telefono?'], 0, 'lasciare un messaggio = 留言。'],
    ],
  },

  // ───────────────────────── 第 40 天（岛屿关卡）─────────────────────────
  {
    n: 40, test: true, it: "Prova dell'isola 4", zh: '第四岛关卡：综合复习',
    goal: '把第 31–39 天的反身动词、不规则动词、缩合介词、物主词、租房、买菜、工作与电话整合起来；掌握常用副词；通过 20 题关卡，拿到日常岛徽章。',
    scene: '周日，你在都灵朋友家度过一天：起床、买菜、做饭，傍晚还要给房东回电话。',
    dlg: `
      Giulia: Buongiorno! Ti svegli sempre così presto? | 早上好！你总是醒得这么早吗？
      Li Ming: Mi sveglio sempre alle sette. Oggi vado al mercato. | 我总是七点醒。今天我去市场。
      Giulia: Puoi comprare anche un po' di basilico, per favore? | 你能也买一点罗勒吗？
      Li Ming: Certo. Vengo con la borsa grande, così porto tutto. | 当然。我带大包去，这样什么都能拿。
      Giulia: Più tardi chiami il padrone di casa? | 稍后你给房东打电话吗？
      Li Ming: Sì, devo ancora pagare l'affitto. Poi esco subito. | 是的，我还得交房租。然后马上出门。
      Giulia: Allora cuciniamo insieme alle otto! | 那我们八点一起做饭！
      Li Ming: Perfetto! Mi piace cucinare con te. | 太好了！我喜欢和你一起做饭。
    `,
    q: [
      ['李明今天要去哪里？', ['市场', '办公室', '医院'], 0, 'vado al mercato。'],
      ['他要给谁打电话？', ['房东', '医生', '老板'], 0, 'il padrone di casa。'],
      ['他们几点一起做饭？', ['八点', '七点', '九点'], 0, 'alle otto。'],
    ],
    vocab: `
      già | 已经 | GIÀ
      ancora | 还；仍然 | an-CO-ra
      subito | 马上 | SU-bi-to
      sempre | 总是 | SEM-pre
      spesso | 经常 | SPES-so
      troppo | 太；过多 | TROP-po
      abbastanza | 足够；相当 | ab-ba-STAN-za
      poco | 很少；一点点 | PO-co
      molto | 很；非常 | MOL-to
      insieme | 一起 | in-SIE-me
      soltanto | 只；仅仅 | sol-TAN-to
      il padrone di casa | 房东 | il pa-DRO-ne di CA-sa
      così | 这样；所以 | co-SÌ
      pagare l'affitto | 交房租 | pa-GA-re l'af-FIT-to
    `,
    pron: {
      t: '副词与重音符号',
      tips: [
        '**già、così、però、perché** 的末尾重音符号告诉你重音在最后一个音节。',
        '**abbastanza** ab-ba-STAN-za：bb 长；**soltanto** sol-TAN-to；**subito** SU-bi-to 倒数第三音节重音。',
      ],
      drill: `
        già | 已经
        così | 这样
        ancora | 还
        subito | 马上
        abbastanza | 足够
        soltanto | 仅仅
      `,
    },
    gram: [
      {
        h: '常用副词：时间、频率、程度',
        t: [
          ['类别', '副词', '例句'],
          ['时间', 'già, ancora, subito, presto, tardi', 'Ho già mangiato. / Non è ancora qui.'],
          ['频率', 'sempre, spesso, a volte, mai', 'Faccio sempre colazione.'],
          ['程度', 'molto, poco, troppo, abbastanza', 'È troppo caro. / Parlo poco.'],
          ['方式', 'insieme, soltanto, così', 'Cuciniamo insieme.'],
        ],
        p: ['副词不随性数变化。**molto / poco / troppo** 作形容词用时要与名词一致（molta fame, pochi soldi, troppe cose）。'],
      },
      {
        h: '第四岛句型速查',
        t: [
          ['场景', '句型'],
          ['作息', 'Mi sveglio alle sette. / Mi addormento tardi.'],
          ['去哪里', 'Vado a Roma / in banca / dal medico / in treno.'],
          ['会与认识', 'So cucinare. / Conosco Marco.'],
          ['位置', 'sul tavolo, nella borsa, dalla stazione'],
          ['租房', "Quanto costa l'affitto? / Spese escluse?"],
          ['买菜', 'Un chilo di… / Un etto di… / Un po\' di…'],
          ['电话', 'Pronto? / Vorrei prendere un appuntamento.'],
        ],
      },
    ],
    text: {
      title: 'Una domenica a Torino',
      body: `
        Domenica mi sveglio tardi, verso le nove. | 周日我醒得晚，九点左右。
        Faccio colazione con Giulia e poi vado al mercato di Porta Palazzo. | 我和朱莉娅吃早餐，然后去波尔塔·帕拉佐市场。

        Compro frutta e verdura per la cena: tutto costa poco! | 我为晚饭买水果和蔬菜：什么都很便宜！
        Nel pomeriggio telefono al padrone di casa e pago l'affitto. | 下午我给房东打电话，并交房租。
        La sera cuciniamo insieme e mangiamo molto bene. | 晚上我们一起做饭，吃得很好。
      `,
    },
    rq: [
      ['"我"周日几点醒？', ['九点左右', '七点', '十一点'], 0, 'verso le nove。'],
      ['为什么买东西很开心？', ['什么都很便宜', '什么都很贵', '人很少'], 0, 'tutto costa poco。'],
      ['下午"我"做了什么？', ['给房东打电话、交房租', '去看电影', '睡觉'], 0, 'telefono al padrone di casa e pago l\'affitto。'],
    ],
    culture: '**都灵（Torino）**是皮埃蒙特的首府，以巧克力、咖啡和汽车工业闻名。**波尔塔·帕拉佐（Porta Palazzo）**是欧洲最大的露天市场之一。第四岛学完，你已经能谈日常的作息、位置、买菜和工作了——这就是"在意大利过日子"的基础。',
    speak: `
      Mi sveglio sempre alle sette. | 说你总是几点醒
      Vado al mercato con la borsa grande. | 说你带大包去市场
      Devo ancora pagare l'affitto. | 说你还得交房租
      Mi piace cucinare con te. | 说你喜欢和对方一起做饭
    `,
    wr: [
      '写 5–6 句话，描述你明天的安排：起床、去哪里、买什么、做什么、几点睡。',
      "Domani mi sveglio alle sette e vado al mercato.\nCompro un chilo di pomodori e un po' di basilico.\nA mezzogiorno mangio con Giulia.\nLa sera telefono ai miei genitori.\nMi addormento verso le undici.",
      '明天我七点醒，去市场。我买一公斤番茄和一点罗勒。中午我和朱莉娅吃饭。晚上我给父母打电话。我十一点左右睡着。',
    ],
    quiz: [
      ['"已经"是：', ['già', 'ancora', 'mai'], 0, 'già = 已经；ancora = 还。'],
      ['"太贵了"：', ['È troppo caro.', 'È molto cara troppo.', 'È troppi caro.'], 0, 'troppo 修饰形容词时不变化。'],
      ['"我们一起做饭"：', ['Cuciniamo insieme.', 'Cucino insieme noi.', 'Cuciniamo soltanto.'], 0, 'insieme = 一起。'],
      ['Mi sveglio sempre alle sette 的意思：', ['我总是七点醒', '我总是七点睡', '我七点才醒'], 0, 'sempre = 总是。'],
    ],
  },
]);
