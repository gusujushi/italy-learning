/* 第 8 岛 · 观点岛 Isola delle Opinioni（第 71–80 天） */
Course.add([
  // ───────────────────────── 第 71 天 ─────────────────────────
  {
    n: 71, it: 'Vorrei, potrebbe', zh: '礼貌请求',
    goal: '掌握条件式现在时（condizionale presente）的构成，会用 vorrei / potrebbe / sarebbe possibile / mi piacerebbe 提出礼貌的请求、表达愿望、给出软化的建议。',
    scene: '你住的旅馆房间很吵。你到前台，礼貌地请求换房，并顺便要一条毯子。',
    dlg: `
      Li Ming: Buongiorno! Vorrei cambiare camera, se è possibile. | 早上好！如果可以，我想换一间房。
      Receptionist: Certo. Qual è il problema? | 当然。有什么问题吗？
      Li Ming: La mia camera è molto rumorosa. Potrebbe darmi una camera più tranquilla? | 我的房间很吵。您能给我一间安静些的吗？
      Receptionist: Avrei una camera sul retro, al terzo piano. Le piacerebbe vederla? | 我有一间朝后面的房间，在四楼。您想看看吗？
      Li Ming: Sì, mi piacerebbe. Sarebbe possibile avere anche un'altra coperta? | 好的，我很想看。能不能再给我一条毯子？
      Receptionist: Con piacere. Le porto tutto subito. | 很乐意。我马上给您送来。
      Li Ming: Grazie mille, è molto gentile. | 非常感谢，您太客气了。
    `,
    q: [
      ['李明为什么要换房？', ['房间太吵', '房间太小', '没有热水'], 0, 'La mia camera è molto rumorosa。'],
      ['新房间在哪里？', ['后面，四楼（terzo piano）', '朝海，一楼', '顶楼'], 0, 'sul retro, al terzo piano。'],
      ['他还要什么？', ['一条毯子', '一把钥匙', '一杯水'], 0, "un'altra coperta。"],
    ],
    vocab: `
      rumoroso | 吵闹的 | ru-mo-RO-so
      il retro | 后面 | il RE-tro
      la coperta | 毯子 | la co-PER-ta
      il cuscino | 枕头 | il cu-SCI-no
      cambiare | 更换 | cam-BIA-re
      potrebbe | 您能……吗？ | po-TREB-be
      sarebbe possibile | 是否可能……？ | sa-REB-be pos-SI-bi-le
      mi piacerebbe | 我很想 | mi pia-ce-REB-be
      avrei | 我有（条件式） | a-VRE-i
      dovrei | 我应该 | do-VRE-i
      con piacere | 很乐意 | con pia-CE-re
      se è possibile | 如果可以的话 | se È pos-SI-bi-le
      il problema | 问题 | il pro-BLE-ma
      gentile | 客气的；友善的 | gen-TI-le
    `,
    gram: [
      {
        h: '条件式现在时：构成',
        p: ['词干与**简单将来时相同**（parler-、prender-、partir-；不规则的也一样：avr-、sar-、andr-），再加词尾 **-ei, -esti, -ebbe, -emmo, -este, -ebbero**。'],
        t: [
          ['人称', 'parlare', 'prendere', 'partire', 'essere', 'avere'],
          ['io', 'parlerei', 'prenderei', 'partirei', 'sarei', 'avrei'],
          ['tu', 'parleresti', 'prenderesti', 'partiresti', 'saresti', 'avresti'],
          ['lui / lei / Lei', 'parlerebbe', 'prenderebbe', 'partirebbe', 'sarebbe', 'avrebbe'],
          ['noi', 'parleremmo', 'prenderemmo', 'partiremmo', 'saremmo', 'avremmo'],
          ['voi', 'parlereste', 'prendereste', 'partireste', 'sareste', 'avreste'],
          ['loro', 'parlerebbero', 'prenderebbero', 'partirebbero', 'sarebbero', 'avrebbero'],
        ],
      },
      {
        h: '最重要的礼貌句型',
        t: [
          ['功能', '句型', '例句'],
          ['想要', 'Vorrei + 名词 / 动词原形', 'Vorrei un caffè. / Vorrei cambiare camera.'],
          ['请求', 'Potrebbe + 动词原形？（对 Lei）/ Potresti…?（对 tu）', 'Potrebbe aiutarmi?'],
          ['询问可能性', 'Sarebbe possibile + 动词原形？', 'Sarebbe possibile avere un\'altra coperta?'],
          ['愿望', 'Mi piacerebbe + 动词原形', 'Mi piacerebbe vivere in Italia.'],
          ['应该', 'Dovrei + 动词原形', 'Dovrei studiare di più.'],
        ],
        eg: ['Potrebbe ripetere, per favore? | 您能重复一下吗？', 'Le dispiacerebbe aprire la finestra? | 您介意开一下窗吗？', 'Mi piacerebbe molto venire. | 我很想去。'],
      },
      {
        h: '用条件式软化语气',
        p: ['**Voglio** un caffè（我要咖啡）显得生硬，**Vorrei** un caffè 礼貌得多。同理：**Devo**→**Dovrei**，**Posso**→**Potrei**。在服务场所、办公室、对陌生人，永远优先用条件式。'],
      },
    ],
    text: {
      title: 'Una richiesta gentile',
      body: `
        Buongiorno, vorrei prenotare un tavolo per stasera. | 早上好，我想订今晚的一张桌子。
        Saremmo in quattro e preferiremmo un tavolo all'aperto. | 我们一共四个人，更想要室外的桌子。

        Sarebbe possibile arrivare alle otto e mezza? | 我们八点半到可以吗？
        Mi piacerebbe sapere anche se avete piatti vegetariani. | 我还想知道你们有没有素食菜。
        La ringrazio molto per la disponibilità. | 非常感谢您的帮助。
      `,
    },
    rq: [
      ['他们订几个人的位子？', ['四个人', '两个人', '六个人'], 0, 'Saremmo in quattro。'],
      ['他们想坐哪里？', ['室外', '窗边', '吧台'], 0, "all'aperto。"],
    ],
    culture: '在意大利，**条件式是"礼貌"的标志**。对服务员、店员、陌生人，**Vorrei… / Potrebbe…?** 几乎是默认用法；而对朋友，可以用 **Mi dai…? / Puoi…?**。礼貌的语气也体现在笑容和 **per favore / grazie** 里。',
    speak: `
      Vorrei cambiare camera, se è possibile. | 礼貌地请求换房
      Potrebbe darmi una camera più tranquilla? | 请对方给一间安静的房间
      Sarebbe possibile avere un'altra coperta? | 问能否再给一条毯子
      Mi piacerebbe vedere la camera. | 说你想看看房间
    `,
    wr: [
      '写 4–5 句礼貌的请求：给酒店 / 餐厅 / 学校打电话或写便条，请求某个服务（用 vorrei, potrebbe, sarebbe possibile, mi piacerebbe）。',
      "Buongiorno, vorrei prenotare una camera per due notti.\nSarebbe possibile avere una camera tranquilla?\nPotrebbe dirmi il prezzo?\nMi piacerebbe sapere se la colazione è inclusa.\nLa ringrazio molto.",
      '早上好，我想订一间住两晚的房。能不能给一间安静的房间？您能告诉我价格吗？我想知道是否含早餐。非常感谢。',
    ],
    quiz: [
      ['最礼貌的点单：', ['Vorrei un caffè.', 'Voglio un caffè.', 'Dammi un caffè.'], 0, 'vorrei = 条件式。'],
      ['"您能帮我吗？"（对 Lei）：', ['Potrebbe aiutarmi?', 'Puoi aiutarmi?', 'Aiutami!'], 0, 'potrebbe = Lei 的礼貌请求。'],
      ['essere 的条件式 io 形式：', ['sarei', 'sarò', 'ero'], 0, 'sarei。'],
      ['条件式的词干与哪个时态相同？', ['简单将来时', '近过去时', '未完成过去时'], 0, 'parlerò → parlerei。'],
    ],
  },

  // ───────────────────────── 第 72 天 ─────────────────────────
  {
    n: 72, it: 'Secondo me', zh: '在我看来',
    goal: '会表达观点与态度（Secondo me…, Penso che…, Credo che…, Mi sembra che…）；初步掌握虚拟式现在时（penso che sia / abbia / vada…）；会表示同意与不同意。',
    scene: '在咖啡座，你和 Marco 争论"住在城市好还是乡下好"。你们各抒己见，又互相让步。',
    dlg: `
      Marco: Secondo te, è meglio vivere in città o in campagna? | 你觉得住在城市好还是乡下好？
      Li Ming: Penso che la città sia più comoda, perché ci sono più servizi. | 我认为城市更方便，因为服务更多。
      Marco: Non sono d'accordo. Credo che in campagna la vita sia più tranquilla. | 我不同意。我认为乡下的生活更安静。
      Li Ming: Può darsi, ma penso che sia difficile trovare lavoro in campagna. | 也许吧，但我认为在乡下很难找到工作。
      Marco: Hai ragione, però mi sembra che l'aria sia più pulita. | 你说得对，不过我觉得那里的空气更干净。
      Li Ming: Su questo sono d'accordo con te! | 这一点我同意你！
    `,
    q: [
      ['李明认为什么更方便？', ['城市', '乡下', '海边'], 0, 'la città sia più comoda。'],
      ['Marco 认为乡下怎么样？', ['生活更安静', '更方便', '更便宜'], 0, 'la vita sia più tranquilla。'],
      ['他们在哪一点上一致？', ['乡下空气更干净', '城市更便宜', '工作更容易找'], 0, "l'aria sia più pulita… sono d'accordo。"],
    ],
    vocab: `
      secondo me | 依我看 | se-CON-do ME
      penso che | 我认为 | PEN-so ke
      credo che | 我相信 | CRE-do ke
      mi sembra che | 我觉得 | mi SEM-bra ke
      sono d'accordo | 我同意 | SO-no d'ac-COR-do
      non sono d'accordo | 我不同意 | non SO-no d'ac-COR-do
      può darsi | 也许 | puo DAR-si
      comodo | 方便的 | CO-mo-do
      il servizio | 服务 | il ser-VI-zio
      pulito | 干净的 | pu-LI-to
      inquinato | 污染的 | in-qui-NA-to
      difficile | 困难的 | dif-FI-ci-le
      facile | 容易的 | FA-ci-le
      importante | 重要的 | im-por-TAN-te
    `,
    pron: {
      t: '表达观点时的语气',
      tips: [
        '表达**不同意**时语气要缓和：Non sono del tutto d\'accordo…（我不太同意……）比 No! 友好得多；说话时配合微笑和手势。',
        '**penso che sia** 读成一气：pen-so-ke-SI-a；**sia** 是 SI-a（两个音节）。',
      ],
      drill: `
        secondo me | 依我看
        penso che sia | 我认为是
        credo che abbia | 我相信他有
        mi sembra che | 我觉得
        sono d'accordo | 我同意
        può darsi | 也许
      `,
    },
    gram: [
      {
        h: '虚拟式现在时（congiuntivo presente）：入门',
        p: [
          '在 **penso che / credo che / mi sembra che / spero che / è importante che…** 之后，从句动词用**虚拟式**，表示"这是想法 / 愿望，不一定是事实"。',
          '好消息：**第一、二、三人称单数形式相同**，所以主语常常要写出来（che **tu** abbia / che **lui** abbia）。**这些形式你已经见过——就是对 Lei 的命令式（vada, prenda, dica）。**',
        ],
        t: [
          ['人称', 'parlare', 'prendere', 'dormire', 'finire'],
          ['io / tu / lui', 'parli', 'prenda', 'dorma', 'finisca'],
          ['noi', 'parliamo', 'prendiamo', 'dormiamo', 'finiamo'],
          ['voi', 'parliate', 'prendiate', 'dormiate', 'finiate'],
          ['loro', 'parlino', 'prendano', 'dormano', 'finiscano'],
        ],
      },
      {
        h: '最常用的不规则虚拟式',
        t: [
          ['动词', 'io / tu / lui', 'noi', 'loro'],
          ['essere', 'sia', 'siamo', 'siano'],
          ['avere', 'abbia', 'abbiamo', 'abbiano'],
          ['andare', 'vada', 'andiamo', 'vadano'],
          ['fare', 'faccia', 'facciamo', 'facciano'],
          ['potere / volere / dovere', 'possa / voglia / debba', 'possiamo / vogliamo / dobbiamo', 'possano / vogliano / debbano'],
          ['venire / dire / stare', 'venga / dica / stia', 'veniamo / diciamo / stiamo', 'vengano / dicano / stiano'],
        ],
        p: ['如果**主语相同**，不用 che，直接用 **di + 不定式**：**Penso di avere ragione**（我认为我是对的）；**Credo di sì / di no**（我想是 / 不是）。'],
      },
      {
        h: '同意与不同意',
        t: [
          ['功能', '说法'],
          ['同意', "Sono d'accordo. / Hai ragione. / Esatto! / Proprio così!"],
          ['部分同意', "Può darsi, ma… / In parte sì, ma… / Hai ragione, però…"],
          ['不同意', "Non sono d'accordo. / Non la penso così. / Non credo."],
          ['委婉不同意', "Non sono del tutto d'accordo. / Capisco, ma secondo me…"],
        ],
      },
    ],
    text: {
      title: 'Città o campagna?',
      body: `
        Secondo me, vivere in città ha molti vantaggi. | 依我看，住在城市有很多好处。
        Penso che ci siano più lavoro, più servizi e più occasioni. | 我认为那里有更多工作、更多服务和更多机会。

        Però credo che la vita in campagna sia più sana e più tranquilla. | 不过我相信乡下的生活更健康，也更安静。
        Mi sembra che molti giovani preferiscano la città, ma che i bambini stiano meglio in campagna. | 我觉得许多年轻人更喜欢城市，但孩子们在乡下过得更好。
        Insomma, dipende da ciò che si cerca! | 总之，要看你在寻找什么！
      `,
    },
    rq: [
      ['作者认为城市有什么好处？', ['更多工作、服务和机会', '空气更好', '更便宜'], 0, 'più lavoro, più servizi e più occasioni。'],
      ['作者对乡下的看法？', ['更健康、更安静', '无聊', '很贵'], 0, 'più sana e più tranquilla。'],
    ],
    culture: '意大利人**爱争论**，把它当作一种社交游戏：政治、足球、美食、谁家的意面最好……争论得面红耳赤，转头仍是好朋友。**表达不同意见时不必拘谨**，但保持幽默、别人身攻击就好。',
    speak: `
      Secondo te, è meglio la città o la campagna? | 问对方的看法
      Penso che la città sia più comoda. | 用虚拟式说你的观点
      Non sono d'accordo. Credo che… | 礼貌地表示不同意
      Hai ragione, però mi sembra che… | 部分同意再补充
    `,
    wr: [
      '写 5–6 句话，就一个话题（比如"在大城市好还是小城市好""网上购物好不好"）表达你的观点，要用 penso che / credo che / mi sembra che 各一次。',
      "Secondo me, è meglio vivere in una piccola città.\nPenso che la vita sia più tranquilla.\nCredo che i prezzi siano più bassi.\nMi sembra che le persone siano più gentili.\nTuttavia, ammetto che ci siano meno opportunità.",
      '依我看，住在小城市更好。我认为生活更安静。我相信价格更低。我觉得人们更友善。不过，我承认那里的机会较少。',
    ],
    quiz: [
      ['"我认为他有道理"（che + 虚拟式）：', ['Penso che abbia ragione.', 'Penso che ha ragione.', 'Penso che avere ragione.'], 0, 'penso che + 虚拟式 abbia。'],
      ['essere 的虚拟式 io / tu / lui：', ['sia', 'sono', 'sarò'], 0, 'sia。'],
      ['主语相同时，不用 che：', ['Penso di avere ragione.', 'Penso che io ho ragione.', 'Penso io avere ragione.'], 0, 'penso di + 不定式。'],
      ['"我不同意"：', ["Non sono d'accordo.", "Sono non d'accordo.", "Non d'accordo sono."], 0, "non sono d'accordo。"],
    ],
  },

  // ───────────────────────── 第 73 天 ─────────────────────────
  {
    n: 73, it: 'Si dice così', zh: '人们这样说',
    goal: '掌握 si 的非人称与被动用法（Si mangia tardi / Si vendono libri / Si può…）；会用它描述习俗、规则和一般情况；能做中意文化对比。',
    scene: '你和 Marco 聊起两国的习俗差异：怎么打招呼、几点吃饭、吃饭时间有多长。',
    dlg: `
      Marco: In Cina come si saluta la gente? | 在中国人们怎么打招呼？
      Li Ming: Di solito si stringe la mano e si dice "ni hao". Ma non si baciano le guance. | 通常握手，说"你好"。但不亲吻脸颊。
      Marco: In Italia invece ci si bacia sulle guance tra amici. | 而在意大利，朋友之间会亲吻脸颊。
      Li Ming: E a che ora si pranza di solito? | 那通常几点吃午饭？
      Marco: Si pranza verso l'una e si cena dopo le otto. | 一点左右吃午饭，八点以后吃晚饭。
      Li Ming: In Cina si mangia prima: si cena alle sei! | 在中国吃得更早：六点就吃晚饭！
      Marco: Che differenza! Qui si mangia più tardi e si sta a tavola a lungo. | 差别真大！这里吃得更晚，而且在饭桌上待很久。
    `,
    q: [
      ['意大利朋友见面怎么打招呼？', ['亲吻脸颊', '鞠躬', '握手'], 0, 'ci si bacia sulle guance。'],
      ['意大利人几点吃午饭？', ['一点左右', '十一点', '三点'], 0, "verso l'una。"],
      ['中国人几点吃晚饭（李明说）？', ['六点', '八点', '十点'], 0, 'si cena alle sei。'],
    ],
    vocab: `
      salutare | 打招呼；问候 | sa-lu-TA-re
      stringere la mano | 握手 | STRIN-ge-re la MA-no
      la guancia | 脸颊 | la GUAN-cia
      baciare | 亲吻 | ba-CIA-re
      la differenza | 差别 | la dif-fe-REN-za
      a lungo | 长时间地 | a LUN-go
      l'usanza | 习俗 | l'u-SAN-za
      tra amici | 朋友之间 | tra a-MI-ci
      pranzare | 吃午饭 | pran-ZA-re
      cenare | 吃晚饭 | ce-NA-re
      come si dice…? | …怎么说？ | CO-me si DI-ce
      non si fa così | 不能这样做 | non si FA co-SÌ
      abituarsi | 习惯于 | a-bi-tu-AR-si
      tipico | 典型的 | TI-pi-co
    `,
    gram: [
      {
        h: 'si 非人称：人们一般……',
        p: ['**si + 动词第三人称单数**，表示"（一般）人们……"，不指具体的人：**In Italia si mangia tardi.**（在意大利人们吃得晚。）后面接形容词时，形容词用**复数**：**Quando si è giovani, si è felici.**'],
        eg: ['Si mangia tardi. | 人们吃得很晚。', 'Come si dice "grazie" in cinese? | "谢谢"用中文怎么说？', 'Non si fa così! | 不能这样做！'],
      },
      {
        h: 'si 被动（passivante）：动词要和名词一致',
        p: ['**si + 动词**，表示"……被……"，动词的数**和后面的名词一致**：**Si vende la casa**（房子出售），**Si vendono libri**（出售书籍）。**Qui si parla italiano**（这里说意大利语）。'],
        t: [
          ['单数', '复数'],
          ['Si affitta un appartamento.（出租公寓）', 'Si affittano appartamenti.（出租公寓若干）'],
          ['Qui si parla italiano.（这里说意大利语）', 'Qui si parlano tre lingue.（这里说三种语言）'],
          ['Si accetta la carta.（接受刷卡）', 'Si accettano le carte.（接受信用卡）'],
        ],
      },
      {
        h: 'ci si：反身动词 + 非人称',
        p: ['反身动词做非人称时，**si 变成 ci si**：**In Italia ci si bacia** sulle guance.（在意大利人们互相亲吻脸颊。）**Ci si abitua** a tutto.（人们对什么都会习惯。）'],
      },
    ],
    text: {
      title: 'Usanze italiane',
      body: `
        In Italia si dà il buongiorno a tutti, anche entrando in un negozio. | 在意大利，人们对所有人说早上好，进店也如此。
        Tra amici ci si saluta con due baci sulle guance. | 朋友之间用两个脸颊吻打招呼。

        A tavola si sta a lungo e si chiacchiera molto. | 饭桌上人们待很久，聊很多。
        Il cappuccino si beve la mattina, non dopo i pasti. | 卡布奇诺在早上喝，不在饭后喝。
        Non si mette il formaggio sugli spaghetti ai frutti di mare! | 海鲜意面上不放奶酪！
      `,
    },
    rq: [
      ['进店时应该做什么？', ['问好', '直接挑东西', '什么都不说'], 0, 'si dà il buongiorno a tutti。'],
      ['卡布奇诺什么时候喝？', ['早上', '饭后', '晚上'], 0, 'si beve la mattina。'],
    ],
    culture: '意大利有一系列**不成文的饮食规矩**：不在饭后点卡布奇诺；海鲜意面不放奶酪；不把意面折断；披萨用手拿或刀叉都可以；**面包放在桌上而不是盘子里**。这类"规矩"没有写在法律里，却被大家默默遵守——也是**"fare bella figura"（给人留下好印象）**的一部分。',
    speak: `
      Come si dice "grazie" in cinese? | 问某词怎么说
      In Italia si mangia tardi. | 说意大利人吃得晚
      Qui si parla italiano. | 说这里说意大利语
      Non si fa così! | 说：不能这样做
    `,
    wr: [
      '写 5 句话，用 si 描述你的国家的一项习俗：怎么打招呼、怎么吃饭、怎么送礼等。',
      "In Cina si dà il biglietto da visita con due mani.\nA tavola si offre sempre il cibo agli ospiti.\nSi mangia il riso con le bacchette.\nA Capodanno si mangiano i ravioli.\nSi regalano buste rosse ai bambini.",
      '在中国人们用双手递名片。饭桌上总是给客人夹菜。人们用筷子吃米饭。过年人们吃饺子。人们给孩子红包。',
    ],
    quiz: [
      ['"这里说意大利语"：', ['Qui si parla italiano.', 'Qui si parlano italiano.', 'Qui parla si italiano.'], 0, 'italiano 是单数 → si parla。'],
      ['"出租公寓（复数）"：', ['Si affittano appartamenti.', 'Si affitta appartamenti.', 'Si affittare appartamenti.'], 0, '动词与名词一致。'],
      ['反身动词的非人称 "人们亲吻"：', ['ci si bacia', 'si si bacia', 'si bacia si'], 0, 'ci si。'],
      ['"不能这样做！"：', ['Non si fa così!', 'Non fa si così!', 'Si non fa così!'], 0, 'non si fa così。'],
    ],
  },

  // ───────────────────────── 第 74 天 ─────────────────────────
  {
    n: 74, it: 'Me lo dai?', zh: '组合代词',
    goal: '掌握组合代词（间接 + 直接：me lo, te lo, glielo, ce lo…）及其位置；会用它们替换"给谁什么"；理解分词一致与命令式接代词（dammelo, daglielo）。',
    scene: '朋友之间互相借还东西：书、照片、钥匙。一句话里同时出现"给谁"和"什么"，用组合代词最简洁。',
    dlg: `
      Giulia: Hai il mio libro? Me lo puoi dare? | 你有我的书吗？能给我吗？
      Li Ming: Sì, te lo porto domani. Scusa, l'ho dimenticato a casa. | 有，我明天带给你。抱歉，我忘在家里了。
      Giulia: Va bene. Hai già mandato la foto a Marco? | 好的。你已经把照片发给马可了吗？
      Li Ming: Sì, gliel'ho mandata ieri. | 发了，我昨天把它发给他了。
      Giulia: E le chiavi? Le hai date a Chiara? | 那钥匙呢？你交给基娅拉了吗？
      Li Ming: Gliele darò stasera. | 我今晚交给她。
      Giulia: Perfetto. Dammelo appena puoi! | 太好了。你一有空就把它给我！
    `,
    q: [
      ['李明把书带来了吗？', ['没有，明天带', '带来了', '丢了'], 0, 'te lo porto domani。'],
      ['照片发给谁了？', ['马可', '基娅拉', '朱莉娅'], 0, "gliel'ho mandata（a Marco）。"],
      ['钥匙什么时候给基娅拉？', ['今晚', '明天', '昨天'], 0, 'Gliele darò stasera。'],
    ],
    vocab: `
      me lo | 把它给我 | me LO
      te lo | 把它给你 | te LO
      glielo | 把它给他／她／您 | GLIE-lo
      ce lo | 把它给我们 | ce LO
      ve lo | 把它给你们 | ve LO
      dare | 给 | DA-re
      mandare | 发送；寄 | man-DA-re
      prestare | 借出 | pre-STA-re
      restituire | 归还 | re-sti-tu-I-re
      dimenticare | 忘记 | di-men-ti-CA-re
      appena puoi | 你一有空就 | ap-PE-na PUOI
      dammelo | 把它给我（命令） | DAM-me-lo
      daglielo | 把它给他（命令） | DA-glie-lo
      il prestito | 借；贷款 | il pre-STI-to
    `,
    pron: {
      t: 'gli + lo = glielo',
      tips: [
        '**glielo、gliela、glieli、gliele、gliene** 要念成一个词：**GLIE-lo**，gli 读 /ʎ/，e 是连接元音，不要读成 gli-e-lo 三个音节。',
        '**dammelo、daglielo** 接代词后重音位置不变（DAM-me-lo、DA-glie-lo），把代词当作词的一部分。',
      ],
      drill: `
        me lo dai | 你把它给我
        te lo porto | 我把它带给你
        glielo dico | 我告诉他（这个）
        gliel'ho mandata | 我把它寄给他了
        gliele darò | 我会把它们给他
        dammelo | 把它给我
      `,
    },
    gram: [
      {
        h: '组合代词：间接代词 + 直接代词',
        p: ['当一句话同时有"给谁"（间接）和"什么"（直接）时，两个代词合并，**间接代词在前**，并有变形：**mi → me, ti → te, ci → ce, vi → ve, gli / le → glie-**（并与直接代词连写）。'],
        t: [
          ['', '+ lo', '+ la', '+ li', '+ le', '+ ne'],
          ['mi', 'me lo', 'me la', 'me li', 'me le', 'me ne'],
          ['ti', 'te lo', 'te la', 'te li', 'te le', 'te ne'],
          ['gli / le / Le', 'glielo', 'gliela', 'glieli', 'gliele', 'gliene'],
          ['ci', 'ce lo', 'ce la', 'ce li', 'ce le', 'ce ne'],
          ['vi', 've lo', 've la', 've li', 've le', 've ne'],
        ],
      },
      {
        h: '位置与分词一致',
        t: [
          ['情况', '规则', '例句'],
          ['变位动词', '放在动词前', 'Te lo porto domani.'],
          ['情态动词 + 不定式', '放前或接在不定式后', 'Me lo puoi dare? / Puoi darmelo?'],
          ['命令式（tu / noi / voi）', '接在动词后连写', 'Dammelo! / Portamelo! / Daglielo!'],
          ['近过去时', '组合代词在助动词前，分词与直接代词一致', "Gliel'ho mandata.（la foto）/ Gliele ho date.（le chiavi）"],
        ],
        p: ['**gli** 对"他、他们"，**le** 对"她"，**Le** 对"您"，加上 lo / la / li / le / ne 后**全部合并为 glie-**：**glielo**（把它给他 / 她 / 您）。'],
      },
      {
        h: '例句',
        eg: ['Mi dai il sale? → Me lo dai? | 你把盐给我？→ 把它给我？', 'Ho detto la verità a Marco. → Gliel\'ho detta. | 我把实话告诉了马可。→ 我告诉他了。', 'Mandami la foto! → Mandamela! | 把照片发给我！→ 发给我！'],
      },
    ],
    culture: '日常口语里，意大利人**大量使用组合代词**，用它省下重复的名词：**Me lo dici domani?**（你明天告诉我？）**Glielo spiego io.**（我来向他解释。）听上去很复杂，其实掌握"mi→me，gli→glie"的变形规律后，就变得非常自然。',
    speak: `
      Me lo puoi dare? | 请对方把东西给你
      Te lo porto domani. | 说：我明天带给你
      Gliel'ho mandata ieri. | 说：我昨天发给他了
      Dammelo appena puoi! | 请对方一有空就给你
    `,
    wr: [
      '写 4 句问答，用组合代词回答：①你把书借给小李了吗？②你把照片发给我了吗？③你明天把钥匙给他吗？④你把礼物给她们了吗？',
      "Sì, gliel'ho prestato.\nSì, te l'ho mandata ieri.\nSì, gliele do domani.\nSì, gliel'ho dato.",
      '是的，我借给他了。是的，我昨天发给你了。是的，我明天给他。是的，我给她们了。',
    ],
    quiz: [
      ['mi + lo =', ['me lo', 'mi lo', 'lo mi'], 0, 'mi → me。'],
      ['gli + la =', ['gliela', 'glila', 'lagli'], 0, 'gli + la → gliela。'],
      ['"把它给我！"（命令，tu，dare）：', ['Dammelo!', 'Me lo dare!', 'Dalo mi!'], 0, 'dà + mi + lo → dammelo。'],
      ['"我把那张照片寄给了他"（la foto）：', ["Gliel'ho mandata.", "Gliel'ho mandato.", "Lo gli ho mandata."], 0, '分词与 la foto 一致 → mandata。'],
    ],
  },

  // ───────────────────────── 第 75 天 ─────────────────────────
  {
    n: 75, it: 'Se piove…', zh: '如果下雨……',
    goal: '掌握条件句：第一类（Se + 现在时 / 将来时 → 现在时 / 将来时 / 命令式）与第二类入门（Se + 虚拟式未完成过去时 → 条件式：Se avessi tempo, viaggerei）；会谈计划、愿望与假设。',
    scene: '周五，你和 Marco 商量周末的计划，完全取决于天气；然后聊起"如果有很多钱、很多时间，你会做什么"。',
    dlg: `
      Marco: Se domani fa bel tempo, andiamo al mare? | 如果明天天气好，我们去海边吗？
      Li Ming: Volentieri! Ma se piove, che cosa facciamo? | 乐意！但要是下雨，我们做什么？
      Marco: Se piove, restiamo a casa e guardiamo un film. | 要是下雨，我们待在家里看电影。
      Li Ming: Se avessi più tempo, viaggerei di più. | 如果我有更多时间，我会多去旅行。
      Marco: Anch'io! Se fossi ricco, farei il giro del mondo. | 我也是！如果我有钱，我会环游世界。
      Li Ming: Se vinci alla lotteria, ricordati di me! | 如果你中了彩票，别忘了我！
      Marco: Certo! Se vinco, ti invito a cena! | 当然！如果我中奖，我请你吃饭！
    `,
    q: [
      ['如果明天天气好，他们做什么？', ['去海边', '看电影', '去爬山'], 0, 'andiamo al mare。'],
      ['如果下雨呢？', ['待在家看电影', '去博物馆', '去购物'], 0, 'restiamo a casa e guardiamo un film。'],
      ['如果 Marco 很有钱，他会做什么？', ['环游世界', '买房', '开餐厅'], 0, 'farei il giro del mondo。'],
    ],
    vocab: `
      se | 如果 | SE
      il bel tempo | 好天气 | il BEL TEM-po
      il brutto tempo | 坏天气 | il BRUT-to TEM-po
      la lotteria | 彩票 | la lot-te-RI-a
      vincere | 赢；中奖 | VIN-ce-re
      ricco | 富有的 | RIC-co
      povero | 贫穷的 | PO-ve-ro
      il giro del mondo | 环游世界 | il GI-ro del MON-do
      viaggiare | 旅行 | viag-GIA-re
      ricordarsi di | 记得 | ri-cor-DAR-si di
      invitare | 邀请 | in-vi-TA-re
      fossi | 我是（虚拟式） | FOS-si
      avessi | 我有（虚拟式） | a-VES-si
      se fossi in te | 如果我是你 | se FOS-si in TE
    `,
    gram: [
      {
        h: '第一类条件句：很可能发生的事',
        p: ['**Se + 现在时**（或将来时），主句用**现在时 / 将来时 / 命令式**。表示"如果……，就……"。'],
        t: [
          ['条件从句', '主句', '例句'],
          ['Se + 现在时', '现在时', 'Se piove, resto a casa.'],
          ['Se + 现在时', '将来时', 'Se piove, resterò a casa.'],
          ['Se + 现在时', '命令式', 'Se hai tempo, vieni!'],
          ['Se + 将来时', '将来时', 'Se studierai, passerai l\'esame.'],
        ],
      },
      {
        h: '第二类条件句：不太可能 / 与现实相反（入门）',
        p: ['**Se + 虚拟式未完成过去时**，主句用**条件式**：**Se avessi più tempo, viaggerei di più.**（如果我有更多时间，我会多去旅行——但其实没有。）现在先**整体记住几个最常用的**：'],
        t: [
          ['动词', '虚拟式未完成过去时（io / tu）', '例句'],
          ['essere', 'fossi', 'Se fossi ricco, comprerei una casa.'],
          ['avere', 'avessi', 'Se avessi tempo, verrei.'],
          ['potere', 'potessi', 'Se potessi, partirei subito.'],
          ['volere', 'volessi', 'Se volessi, potresti farlo.'],
          ['fare', 'facessi', 'Se facessi sport, staresti meglio.'],
        ],
        p: ['词尾规律：-are → **-assi**（parlassi），-ere → **-essi**（prendessi），-ire → **-issi**（dormissi）；人称词尾 -ssi, -ssi, -sse, -ssimo, -ste, -ssero。**Se fossi in te…**（如果我是你……）是最常用的给建议的开头。'],
        eg: ['Se fossi in te, studierei di più. | 如果我是你，我会多学习。', 'Se avessi più tempo, viaggerei. | 如果我有更多时间，我会旅行。', 'Se potessi, resterei qui. | 要是我能的话，我会留在这里。'],
      },
    ],
    text: {
      title: 'Se vincessi alla lotteria…',
      body: `
        Se vincessi alla lotteria, farei un lungo viaggio in tutta Italia. | 如果我中了彩票，我会在整个意大利做一次长途旅行。
        Visiterei Roma, Firenze e Venezia, e mangerei in tutti i ristoranti famosi. | 我会参观罗马、佛罗伦萨和威尼斯，在所有有名的餐厅吃饭。

        Se avessi molto tempo, imparerei anche a cucinare bene. | 如果我有很多时间，我还会学会好好做饭。
        Ma per ora, se fa bel tempo, vado al mare con gli amici! | 不过眼下，如果天气好，我就和朋友们去海边！
      `,
    },
    rq: [
      ['如果中彩票，作者会做什么？', ['在意大利长途旅行', '买车', '搬家'], 0, 'un lungo viaggio in tutta Italia。'],
      ['眼下天气好的话会做什么？', ['和朋友去海边', '回家做饭', '学习'], 0, 'se fa bel tempo, vado al mare。'],
    ],
    culture: '意大利彩票叫 **Lotto** 和 **SuperEnalotto**，在 **tabaccheria**（烟草店）购买。**"Se fossi in te…"**是意大利人给建议时最常用的开头，既亲切又不强势。',
    speak: `
      Se domani fa bel tempo, andiamo al mare. | 说：如果明天天气好，我们去海边
      Se piove, restiamo a casa. | 说：如果下雨，我们待在家
      Se avessi più tempo, viaggerei di più. | 说：如果我有更多时间，我会多旅行
      Se fossi in te, studierei di più. | 说：如果我是你，我会多学习
    `,
    wr: [
      '写 4–5 句条件句：①如果明天天气好……②如果下雨……③如果你有很多钱……④如果你有很多时间……',
      "Se domani fa bel tempo, vado al parco.\nSe piove, resto a casa a leggere.\nSe avessi molti soldi, viaggerei in tutto il mondo.\nSe avessi più tempo, imparerei a suonare il piano.",
      '如果明天天气好，我去公园。如果下雨，我待在家看书。如果我有很多钱，我会环游世界。如果我有更多时间，我会学弹钢琴。',
    ],
    quiz: [
      ['"如果下雨，我就待在家里"：', ['Se piove, resto a casa.', 'Se pioverebbe, resto a casa.', 'Se piove, resterei a casa.'], 0, '第一类：Se + 现在时，主句现在时。'],
      ['"如果我有更多时间，我会旅行"：', ['Se avessi più tempo, viaggerei.', 'Se ho più tempo, viaggerei.', 'Se avrei più tempo, viaggio.'], 0, '第二类：Se + 虚拟式未完成过去时，条件式。'],
      ['essere 的虚拟式未完成过去时 io 形式：', ['fossi', 'ero', 'sia'], 0, 'fossi。'],
      ['"如果我是你"：', ['Se fossi in te', 'Se sono in te', 'Se sarei te'], 0, 'se fossi in te。'],
    ],
  },

  // ───────────────────────── 第 76 天 ─────────────────────────
  {
    n: 76, it: 'Consigli', zh: '建议',
    goal: '会给出和接受建议：dovresti / potresti + 不定式、ti consiglio di…、ti conviene…、è meglio che…、Se fossi in te…；会读一篇关于健康生活的建议性短文。',
    scene: '最近 Chiara 压力很大，睡不好。午休时她向你倾诉，你给她一些真诚的建议。',
    dlg: `
      Chiara: Sono molto stressata ultimamente. Che cosa mi consigli? | 我最近压力很大。你有什么建议？
      Li Ming: Dovresti dormire di più e fare una passeggiata ogni giorno. | 你应该多睡觉，每天散步。
      Chiara: Hai ragione. Ma lavoro fino a tardi. | 你说得对。但我工作到很晚。
      Li Ming: Ti conviene parlare con il tuo capo. Forse puoi lavorare meno ore. | 你最好和老板谈谈。也许你可以少工作几个小时。
      Chiara: E per la dieta? | 那饮食呢？
      Li Ming: Ti consiglio di mangiare più verdura e di bere meno caffè. | 我建议你多吃蔬菜，少喝咖啡。
      Chiara: Grazie! Proverò a seguire i tuoi consigli. | 谢谢！我会试着听你的建议。
    `,
    q: [
      ['Chiara 最近怎么了？', ['压力很大', '生病了', '失业了'], 0, 'Sono molto stressata。'],
      ['李明建议她做什么运动？', ['每天散步', '跑马拉松', '游泳'], 0, 'fare una passeggiata ogni giorno。'],
      ['关于饮食他建议什么？', ['多吃蔬菜、少喝咖啡', '多吃肉', '不吃晚饭'], 0, 'più verdura… meno caffè。'],
    ],
    vocab: `
      stressato | 压力大的 | stres-SA-to
      ultimamente | 最近 | ul-ti-ma-MEN-te
      la dieta | 饮食；节食 | la DIE-ta
      il capo | 老板；头 | il CA-po
      seguire | 听从；跟随 | se-GUI-re
      la salute | 健康 | la sa-LU-te
      sano | 健康的 | SA-no
      rilassarsi | 放松 | ri-las-SAR-si
      la pausa | 休息；暂停 | la PAU-sa
      fare movimento | 活动身体 | FA-re mo-vi-MEN-to
      la tisana | 花草茶 | la ti-SA-na
      ti conviene | 对你最好 | ti con-VIE-ne
      ti consiglio di | 我建议你 | ti con-SI-glio di
      è meglio che | 最好是 | È ME-glio ke
    `,
    gram: [
      {
        h: '给建议的几种方式',
        t: [
          ['结构', '例句', '语气'],
          ['Dovresti + 原形', 'Dovresti dormire di più.', '你应该……（温和）'],
          ['Potresti + 原形', 'Potresti fare una pausa.', '你可以……（建议）'],
          ['Ti consiglio di + 原形', 'Ti consiglio di mangiare più verdura.', '我建议你……'],
          ['Ti conviene + 原形', 'Ti conviene parlare con il capo.', '对你最好……'],
          ['Se fossi in te, + 条件式', 'Se fossi in te, riposerei.', '如果我是你，我会……'],
          ['È meglio che + 虚拟式', 'È meglio che tu dorma di più.', '最好是……'],
          ['命令式', 'Riposati! / Non lavorare troppo!', '直接（亲近的人）'],
        ],
      },
      {
        h: '接受或婉拒建议',
        t: [
          ['功能', '说法'],
          ['接受', 'Hai ragione. / Buona idea! / Proverò. / Grazie per il consiglio!'],
          ['部分接受', 'Ci penserò. / Forse hai ragione.'],
          ['婉拒', 'Capisco, ma non posso. / Grazie, ma preferisco… '],
        ],
      },
    ],
    text: {
      title: 'Cinque consigli per stare meglio',
      body: `
        1. Dormi almeno sette ore ogni notte. | 1. 每晚至少睡七个小时。
        2. Fai una passeggiata di venti minuti al giorno. | 2. 每天散步二十分钟。

        3. Mangia più frutta e verdura e bevi molta acqua. | 3. 多吃水果蔬菜，多喝水。
        4. Non guardare il telefono prima di dormire. | 4. 睡前别看手机。
        5. Fai una pausa: respira e rilassati! | 5. 休息一下：深呼吸，放松！
      `,
    },
    rq: [
      ['每晚建议睡多久？', ['至少七小时', '五小时', '十小时'], 0, 'almeno sette ore。'],
      ['睡前不要做什么？', ['看手机', '喝水', '散步'], 0, 'Non guardare il telefono。'],
    ],
    culture: '意大利人很爱**互相给建议**，尤其在健康和饮食上——**"La nonna dice che…"**（奶奶说……）是常见的开头。传统生活智慧里，**"饭后散步（la passeggiata）"**、**喝一小杯 digestivo（助消化酒）**、**吃地中海饮食**都被视为长寿秘诀。',
    speak: `
      Che cosa mi consigli? | 请对方给你建议
      Dovresti dormire di più. | 说：你应该多睡觉
      Ti consiglio di mangiare più verdura. | 说：我建议你多吃蔬菜
      Se fossi in te, parlerei con il capo. | 说：如果我是你，我会和老板谈谈
    `,
    wr: [
      '朋友说他最近老失眠、压力大。写 5 句话给出建议（用 dovresti, ti consiglio di, ti conviene, Se fossi in te 各一次）。',
      "Dovresti dormire almeno sette ore.\nTi consiglio di fare una passeggiata ogni sera.\nTi conviene parlare con il tuo capo.\nSe fossi in te, berrei meno caffè.\nVedrai che starai meglio!",
      '你应该至少睡七个小时。我建议你每晚散步。你最好和老板谈谈。如果我是你，我会少喝咖啡。你会看到你感觉好些的！',
    ],
    quiz: [
      ['"你应该多睡觉"：', ['Dovresti dormire di più.', 'Devi dormire di più io.', 'Dormire dovresti più.'], 0, 'dovresti + 原形。'],
      ['"我建议你多吃蔬菜"：', ['Ti consiglio di mangiare più verdura.', 'Ti consiglio mangiare verdura.', 'Consiglio ti di mangiare.'], 0, 'consigliare di + 原形。'],
      ['"最好和老板谈谈"：', ['Ti conviene parlare con il capo.', 'Ti convince parlare con il capo.', 'Convieni parlare con il capo.'], 0, 'ti conviene。'],
      ['"如果我是你，我会休息"：', ['Se fossi in te, mi riposerei.', 'Se sono in te, mi riposo.', 'Se sarei te, mi riposerò.'], 0, 'Se fossi in te + 条件式。'],
    ],
  },

  // ───────────────────────── 第 77 天 ─────────────────────────
  {
    n: 77, it: 'Il lavoro', zh: '求职',
    goal: '会进行简单的求职面试：自我介绍、说明学历和经验（Mi sono laureato in…, Ho lavorato come…）、谈优势与动机；认识简历（CV）与求职信的基本用语。',
    scene: '你应聘一家意大利公司的程序员职位。面试官请你自我介绍，并问了你的动机、优势和不足。',
    dlg: `
      Selezionatore: Buongiorno, signor Li. Mi parli un po' di Lei. | 早上好，李先生。请您介绍一下自己。
      Li Ming: Mi sono laureato in ingegneria e lavoro come programmatore da cinque anni. | 我是工程专业毕业，做程序员已经五年了。
      Selezionatore: Perché vuole lavorare in Italia? | 您为什么想在意大利工作？
      Li Ming: Mi piace la cultura italiana e parlo già un po' di italiano. Sono pronto a migliorare ancora. | 我喜欢意大利文化，已经会说一点意大利语。我准备继续提高。
      Selezionatore: Quali sono i Suoi punti di forza? | 您的优势是什么？
      Li Ming: Sono molto preciso e lavoro bene in squadra. | 我非常细致，也擅长团队合作。
      Selezionatore: E i punti deboli? | 那弱点呢？
      Li Ming: A volte sono troppo perfezionista. | 有时我太追求完美。
      Selezionatore: Grazie. Le faremo sapere presto. | 谢谢。我们会尽快通知您。
    `,
    q: [
      ['李明的专业是什么？', ['工程', '法律', '医学'], 0, 'Mi sono laureato in ingegneria。'],
      ['他工作多久了？', ['五年', '两年', '十年'], 0, 'da cinque anni。'],
      ['他认为自己的弱点是什么？', ['太追求完美', '不会说意大利语', '不会合作'], 0, 'troppo perfezionista。'],
    ],
    vocab: `
      il colloquio | 面试；谈话 | il col-LO-quio
      il curriculum | 简历 | il cur-RI-cu-lum
      laurearsi | 获得学位；毕业 | lau-re-AR-si
      la laurea | 学位 | la lau-RE-a
      l'esperienza | 经验 | l'e-spe-RIEN-za
      il programmatore | 程序员 | il pro-gram-ma-TO-re
      i punti di forza | 优势 | i PUN-ti di FOR-za
      i punti deboli | 弱点 | i PUN-ti DE-bo-li
      in squadra | 团队合作 | in SQUA-dra
      preciso | 细致的；准确的 | pre-CI-so
      perfezionista | 完美主义者 | per-fe-zio-NI-sta
      lo stage | 实习 | lo STAGE
      il contratto | 合同 | il con-TRAT-to
      candidarsi | 申请（职位） | can-di-DAR-si
    `,
    gram: [
      {
        h: '面试里的常见问题与回答句型',
        t: [
          ['问题', '回答句型'],
          ['Mi parli di Lei.', 'Mi sono laureato in… e lavoro come… da… anni.'],
          ['Che esperienza ha?', 'Ho lavorato come… per… anni presso…'],
          ['Perché vuole questo lavoro?', 'Mi interessa… / Mi piacerebbe… / Sono pronto a…'],
          ['Quali sono i Suoi punti di forza?', 'Sono preciso / puntuale / molto motivato. Lavoro bene in squadra.'],
          ['Quali lingue parla?', 'Parlo cinese, inglese e un po\' di italiano.'],
          ['Quando può cominciare?', 'Sono disponibile da subito / dal primo marzo.'],
        ],
      },
      {
        h: '谈学历与经历',
        eg: [
          'Mi sono laureato in ingegneria. | 我是工程专业毕业的。',
          'Ho lavorato come programmatore per cinque anni. | 我做了五年程序员。',
          'Sono disponibile a viaggiare. | 我愿意出差。',
          'Mi candido per la posizione di sviluppatore. | 我申请开发工程师的职位。',
        ],
        p: ['整个面试用 **Lei**。回答时语气要**自信但不夸张**；不知道的事坦率说 **Non ho ancora esperienza in questo, ma sono pronto a imparare.**'],
      },
    ],
    text: {
      title: 'Profilo professionale',
      body: `
        Mi chiamo Li Ming e sono ingegnere informatico. | 我叫李明，是软件工程师。
        Mi sono laureato a Shanghai nel 2018 e lavoro da cinque anni in un'azienda tecnologica. | 我 2018 年在上海毕业，在一家科技公司工作了五年。

        Parlo cinese e inglese e sto studiando italiano. | 我会说中文和英语，正在学意大利语。
        Sono preciso, motivato e lavoro bene in squadra. | 我细致、积极，擅长团队合作。
        Sono disponibile a trasferirmi in Italia. | 我愿意搬到意大利。
      `,
    },
    rq: [
      ['他在哪里毕业？', ['上海', '米兰', '北京'], 0, 'Mi sono laureato a Shanghai。'],
      ['他还在学什么？', ['意大利语', '法语', '西班牙语'], 0, 'sto studiando italiano。'],
    ],
    culture: '意大利简历常用欧洲格式 **Europass**，通常附一张**照片**（不强制）和一封 **lettera di presentazione**（求职信）。**面试时守时、着装得体（elegante ma non eccessivo）、先说 Buongiorno 再握手**。工作合同类型有 **tempo determinato**（定期）和 **tempo indeterminato**（无固定期限）。',
    speak: `
      Mi sono laureato in ingegneria. | 说你的专业
      Lavoro come programmatore da cinque anni. | 说你的职业和年限
      Sono preciso e lavoro bene in squadra. | 说你的优势
      Sono disponibile da subito. | 说你可以马上开始
    `,
    wr: [
      '写一段 6–7 句的"自我介绍"（用于求职）：姓名、专业、工作经历、语言、优势、愿望。',
      "Mi chiamo Li Ming e sono ingegnere informatico.\nMi sono laureato a Shanghai e lavoro da cinque anni in un'azienda.\nParlo cinese, inglese e un po' di italiano.\nSono preciso e lavoro bene in squadra.\nMi piacerebbe lavorare in Italia.\nSono disponibile da subito.",
      '我叫李明，是软件工程师。我在上海毕业，在一家公司工作五年。我会说中文、英语和一点意大利语。我细致，擅长团队合作。我很想在意大利工作。我可以马上开始。',
    ],
    quiz: [
      ['"我毕业于工程专业"：', ['Mi sono laureato in ingegneria.', 'Ho laureato in ingegneria.', 'Sono laureare ingegneria.'], 0, 'laurearsi 用 essere。'],
      ['"我做了五年程序员"：', ['Lavoro come programmatore da cinque anni.', 'Lavoro programmatore per cinque.', 'Ho lavoro programmatore cinque anni.'], 0, 'lavorare come + 职业。'],
      ['"我愿意搬到意大利"：', ["Sono disponibile a trasferirmi in Italia.", "Sono disponibile trasferire Italia.", "Disponibile io Italia."], 0, 'disponibile a + 原形。'],
      ['面试中对面试官用：', ['Lei', 'tu', '随便'], 0, '正式场合用 Lei。'],
    ],
  },

  // ───────────────────────── 第 78 天 ─────────────────────────
  {
    n: 78, it: 'Burocrazia', zh: '办事',
    goal: '会在政府机构 / 邮局 / 银行办事：问需要哪些文件、领表填表、约时间；认识表格字段和常见证件名称；会听懂办事员的指令。',
    scene: '你要办理居留许可的手续。在办事处，工作人员问你预约了没有，需要哪些文件，并告诉你下一步怎么做。',
    dlg: `
      Li Ming: Buongiorno! Vorrei informazioni per il permesso di soggiorno. | 早上好！我想咨询居留许可的事。
      Impiegata: Ha già preso un appuntamento? | 您已经预约了吗？
      Li Ming: Sì, ho un appuntamento alle dieci. Ecco la conferma. | 是的，我十点有预约。这是确认单。
      Impiegata: Bene. Ha tutti i documenti? Servono il passaporto, due fototessere e la marca da bollo. | 好的。您带齐了所有文件吗？需要护照、两张证件照和印花税票。
      Li Ming: Ho il passaporto e le foto, ma non ho la marca da bollo. Dove la posso comprare? | 我有护照和照片，但没有印花税票。在哪里可以买到？
      Impiegata: In tabaccheria. Poi torni con la ricevuta e compili questo modulo. | 在烟草店。然后带着收据回来，填写这份表格。
      Li Ming: Grazie. Quanto tempo ci vuole per avere una risposta? | 谢谢。要多久才能有答复？
      Impiegata: Dipende, di solito qualche settimana. Le arriverà un SMS. | 看情况，通常几个星期。您会收到一条短信。
    `,
    q: [
      ['李明来办什么手续？', ['居留许可', '驾照', '结婚'], 0, 'il permesso di soggiorno。'],
      ['他缺什么？', ['印花税票', '护照', '照片'], 0, 'non ho la marca da bollo。'],
      ['在哪里买印花税票？', ['烟草店', '邮局', '银行'], 0, 'In tabaccheria。'],
    ],
    vocab: `
      il permesso di soggiorno | 居留许可 | il per-MES-so di sog-GIOR-no
      la questura | 警察局（办居留） | la que-STU-ra
      il comune | 市政厅 | il co-MU-ne
      il documento | 文件；证件 | il do-cu-MEN-to
      la fototessera | 证件照 | la fo-to-tes-SE-ra
      la marca da bollo | 印花税票 | la MAR-ca da BOL-lo
      il modulo | 表格 | il MO-du-lo
      compilare | 填写 | com-pi-LA-re
      firmare | 签名 | fir-MA-re
      la firma | 签名 | la FIR-ma
      la fotocopia | 复印件 | la fo-to-CO-pia
      lo sportello | 窗口 | lo spor-TEL-lo
      il codice fiscale | 税号 | il CO-di-ce fi-SCA-le
      servire | 需要 | ser-VI-re
    `,
    gram: [
      {
        h: '"需要"：servire',
        p: ['**servire** 用"物"作主语：**Serve + 单数名词**，**Servono + 复数名词**；"需要做某事"用 **Serve + 不定式**。'],
        eg: ['Serve il passaporto. | 需要护照。', 'Servono due fototessere. | 需要两张证件照。', 'Che cosa serve? | 需要什么？', 'Quali documenti servono? | 需要哪些文件？'],
      },
      {
        h: '办事时的常用问句',
        t: [
          ['想问', '说法'],
          ['要哪些文件', 'Quali documenti servono?'],
          ['在哪里领表', 'Dove posso prendere il modulo?'],
          ['怎么填', 'Come devo compilare questo campo?'],
          ['在哪里签名', 'Dove devo firmare?'],
          ['要等多久', 'Quanto tempo ci vuole?'],
          ['下一步', 'Che cosa devo fare adesso?'],
        ],
      },
      {
        h: '表格字段与常见证件',
        t: [
          ['字段', '意思', '证件', '意思'],
          ['Cognome / Nome', '姓 / 名', 'passaporto', '护照'],
          ['Data di nascita', '出生日期', "carta d'identità", '身份证'],
          ['Luogo di nascita', '出生地', 'patente', '驾照'],
          ['Residenza / Domicilio', '常住地 / 居住地', 'codice fiscale', '税号'],
          ['Cittadinanza', '国籍', 'tessera sanitaria', '医保卡'],
          ['Firma', '签名', 'permesso di soggiorno', '居留许可'],
        ],
      },
    ],
    text: {
      title: 'Prima di andare allo sportello',
      body: `
        Prima di andare in questura o in comune, controlla sempre il sito ufficiale. | 去警察局或市政厅前，一定要查看官方网站。
        Spesso serve un appuntamento e bisogna portare tutti i documenti in originale e in fotocopia. | 通常需要预约，还要带齐原件和复印件。

        Compila il modulo con calma e controlla i tuoi dati: cognome, nome e data di nascita. | 慢慢填表，核对你的信息：姓、名和出生日期。
        Se non capisci qualcosa, chiedi: "Può spiegarmi come si compila?" | 如果有不明白的，就问："您能告诉我怎么填吗？"
      `,
    },
    rq: [
      ['去办事前要做什么？', ['查官方网站', '直接去', '打电话问朋友'], 0, 'controlla sempre il sito ufficiale。'],
      ['文件要带什么？', ['原件和复印件', '只带原件', '只带复印件'], 0, 'in originale e in fotocopia。'],
    ],
    culture: '意大利的**办事流程常比较慢**，规定也会变化，**务必以官方网站最新信息为准**。办理居留许可的常见步骤是：通过邮局（Poste Italiane）递交申请材料，再在警察局（questura）预约录指纹——具体请查最新规定。**Codice fiscale（税号）**几乎是在意大利生活的"第一把钥匙"：开银行账户、租房、签合同都需要它。',
    speak: `
      Quali documenti servono? | 问需要哪些文件
      Dove posso comprare la marca da bollo? | 问在哪里买印花税票
      Come devo compilare questo modulo? | 问怎么填表
      Quanto tempo ci vuole per avere una risposta? | 问要等多久
    `,
    wr: [
      '写 5 句话：你想办一件事（比如开银行账户、办签证），问需要哪些文件、在哪里领表、要等多久。',
      "Buongiorno, vorrei aprire un conto in banca.\nQuali documenti servono?\nDove posso prendere il modulo?\nDevo prendere un appuntamento?\nQuanto tempo ci vuole?",
      '早上好，我想开一个银行账户。需要哪些文件？在哪里领表格？我需要预约吗？要多长时间？',
    ],
    quiz: [
      ['"需要两张照片"：', ['Servono due foto.', 'Serve due foto.', 'Servire due foto.'], 0, '复数名词 → servono。'],
      ['"需要护照"：', ['Serve il passaporto.', 'Servono il passaporto.', 'Servi il passaporto.'], 0, '单数 → serve。'],
      ['codice fiscale 指：', ['税号', '护照号', '电话号码'], 0, 'codice fiscale = 税号。'],
      ['"请问需要哪些文件？"：', ['Quali documenti servono?', 'Che documenti servire?', 'Quali documento serve?'], 0, 'quali + 复数。'],
    ],
  },

  // ───────────────────────── 第 79 天 ─────────────────────────
  {
    n: 79, it: 'Cultura italiana', zh: '意大利文化',
    goal: '了解意大利的地区划分、各地代表性饮食、方言与口音、艺术与流行文化；会读一篇关于意大利地区的介绍并回答问题；会用"si dice che…"转述常识。',
    scene: '在大学咖啡厅，你向意大利同学 Chiara 请教：意大利到底有多少个大区？各地有什么不同？',
    dlg: `
      Li Ming: Quante regioni ci sono in Italia? | 意大利有多少个大区？
      Chiara: Ce ne sono venti. Ogni regione ha le sue tradizioni e anche il suo dialetto. | 有二十个。每个大区都有自己的传统，也有自己的方言。
      Li Ming: Davvero? E la cucina è diversa? | 真的吗？菜肴也不同吗？
      Chiara: Molto! Al Nord si mangiano il risotto e la polenta, al Sud la pasta e la pizza. | 非常不同！北方吃烩饭和玉米糊，南方吃意面和披萨。
      Li Ming: E dove si parla l'italiano più "puro"? | 那在哪里说的意大利语最"纯正"？
      Chiara: Si dice che sia in Toscana, ma ogni regione ha il suo accento. | 据说是在托斯卡纳，但每个地区都有自己的口音。
    `,
    q: [
      ['意大利有多少个大区？', ['二十个', '十五个', '三十个'], 0, 'Ce ne sono venti。'],
      ['北方常吃什么？', ['烩饭和玉米糊', '披萨', '寿司'], 0, 'il risotto e la polenta。'],
      ['据说哪里的意大利语最"纯正"？', ['托斯卡纳', '西西里', '米兰'], 0, 'in Toscana。'],
    ],
    vocab: `
      la regione | 大区 | la re-GIO-ne
      il Nord | 北部 | il NORD
      il Centro | 中部 | il CEN-tro
      il Sud | 南部 | il SUD
      le isole | 岛屿 | le I-so-le
      il dialetto | 方言 | il dia-LET-to
      l'accento | 口音；重音 | l'ac-CEN-to
      la polenta | 玉米糊 | la po-LEN-ta
      il risotto | 烩饭 | il ri-SOT-to
      la specialità | 特色菜；特产 | la spe-cia-li-TÀ
      tipico | 典型的 | TI-pi-co
      si dice che | 据说 | si DI-ce ke
      l'arte | 艺术 | l'AR-te
      la cucina | 烹饪；菜系 | la cu-CI-na
    `,
    gram: [
      {
        h: '意大利的 20 个大区',
        t: [
          ['地区', '大区'],
          ['北部（8）', "Valle d'Aosta, Piemonte, Lombardia, Trentino-Alto Adige, Veneto, Friuli-Venezia Giulia, Liguria, Emilia-Romagna"],
          ['中部（4）', 'Toscana, Umbria, Marche, Lazio'],
          ['南部（6）', 'Abruzzo, Molise, Campania, Puglia, Basilicata, Calabria'],
          ['岛屿（2）', 'Sicilia, Sardegna'],
        ],
      },
      {
        h: '各地代表（城市 · 特色）',
        t: [
          ['大区', '城市', '特色'],
          ['Lombardia', 'Milano', 'risotto alla milanese，时装与设计'],
          ['Veneto', 'Venezia', '运河、prosecco、tiramisù'],
          ['Emilia-Romagna', 'Bologna', 'tortellini、Parmigiano、prosciutto di Parma'],
          ['Toscana', 'Firenze', 'bistecca fiorentina、文艺复兴艺术'],
          ['Lazio', 'Roma', 'carbonara、cacio e pepe、古罗马遗迹'],
          ['Campania', 'Napoli', 'pizza、庞贝、阿马尔菲海岸'],
          ['Sicilia', 'Palermo', 'cannoli、arancini、古希腊神庙'],
        ],
      },
      {
        h: '"据说"与转述',
        p: ['**Si dice che + 虚拟式 / 直陈式**：据说……（常用虚拟式）；**Dicono che…**：他们说……；**Pare che…**：似乎……；**Secondo + 来源**：据……。'],
        eg: ['Si dice che sia la città più bella. | 据说这是最美的城市。', 'Dicono che a Napoli la pizza sia la migliore. | 据说那不勒斯的披萨最好。'],
      },
    ],
    text: {
      title: "Un'Italia, tante Italie",
      body: `
        L'Italia è un Paese unito solo dal 1861, e ogni regione ha una forte identità. | 意大利直到 1861 年才统一，每个大区都有强烈的认同。
        Al Nord si mangiano risotto e polenta e si beve molto vino bianco. | 北方吃烩饭和玉米糊，白葡萄酒喝得多。

        Al Centro ci sono Firenze, Roma e le colline della Toscana. | 中部有佛罗伦萨、罗马和托斯卡纳的丘陵。
        Al Sud si trovano il sole, il mare e una cucina ricca di pomodoro e di pesce. | 南部有阳光、大海，以及富有番茄和鱼的菜肴。

        Esistono molti dialetti, ma la lingua ufficiale è l'italiano. | 有许多方言，但官方语言是意大利语。
        Si dice che gli italiani siano molto legati al loro campanile: è il "campanilismo"! | 据说意大利人非常依恋自己家乡的钟楼：这就是"campanilismo"（乡土主义）！
      `,
    },
    rq: [
      ['意大利是什么时候统一的？', ['1861 年', '1945 年', '1500 年'], 0, 'dal 1861。'],
      ['南部菜肴的特点？', ['番茄和鱼', '奶油和肉', '米饭和豆'], 0, 'pomodoro e di pesce。'],
      ['campanilismo 是什么？', ['对家乡的强烈依恋', '一种面食', '一个节日'], 0, 'legati al loro campanile。'],
    ],
    culture: '意大利人**自我介绍时常先说自己是哪里人**（"Sono napoletano / milanese / siciliano"），然后才是"意大利人"。**campanilismo** 是对家乡（campanile，教堂钟楼）的自豪与偏爱，常常成为谈话和玩笑的话题。**去不同地区旅行，就像去不同国家：吃的、说的、过的节日都不一样。**',
    speak: `
      Quante regioni ci sono in Italia? | 问意大利有多少个大区
      Ce ne sono venti. | 回答：有二十个
      Al Nord si mangia il risotto. | 说北方吃烩饭
      Si dice che sia la città più bella. | 用"据说"转述
    `,
    wr: [
      '写 5–6 句话介绍你的家乡（或你去过的一个意大利城市）：位置、特色菜、方言或口音、一个你推荐的理由。',
      "Vengo da Shanghai, una grande città sul mare.\nQui si mangiano molti piatti di pesce e di riso.\nSi parla il cinese e anche il dialetto di Shanghai.\nSi dice che sia una città molto moderna.\nTi consiglio di visitarla in primavera!",
      '我来自上海，一座海边的大城市。这里人们吃许多鱼和米饭。这里说普通话，也说上海话。据说这是一座非常现代的城市。我建议你春天来参观！',
    ],
    quiz: [
      ['意大利共有多少个大区？', ['20', '15', '25'], 0, '北 8 + 中 4 + 南 6 + 岛 2。'],
      ['"据说它是最美的"：', ['Si dice che sia la più bella.', 'Si dice che è la più bella.', 'Dire che sia la più bella.'], 0, 'si dice che + 虚拟式。'],
      ['campanilismo 指：', ['对家乡的强烈依恋', '喜欢听钟声', '一种宗教节日'], 0, 'campanile = 钟楼。'],
      ['意大利的官方语言：', ['意大利语', '拉丁语', '各地方言'], 0, '官方语言 = italiano。'],
    ],
  },

  // ───────────────────────── 第 80 天（岛屿关卡）─────────────────────────
  {
    n: 80, test: true, it: "Prova dell'isola 8", zh: '第八岛关卡：综合复习',
    goal: '把第 71–79 天的条件式、虚拟式入门、si 非人称、组合代词、条件句、建议、求职、办事与文化整合起来；掌握让讨论更有逻辑的议论连接语；通过 20 题关卡，拿到观点岛徽章。',
    scene: '在朋友的聚会上，大家讨论一个现实的问题：如果有一份意大利的工作机会，你会去吗？Marco、Chiara 和你各抒己见。',
    dlg: `
      Marco: Se ti offrissero un lavoro in Italia, lo accetteresti? | 如果有人给你一份意大利的工作，你会接受吗？
      Li Ming: Penso di sì, ma dovrei prima parlare con la mia famiglia. | 我想会的，不过我得先和家人商量。
      Chiara: Secondo me sarebbe un'ottima occasione. Qui si vive bene e si mangia benissimo! | 依我看这会是个极好的机会。这里生活舒适，吃得又好！
      Li Ming: È vero, però mi mancherebbero i miei genitori. | 是的，不过我会想念我的父母。
      Marco: Capisco. Però potresti chiamarli ogni giorno! | 我明白。不过你可以每天给他们打电话！
      Li Ming: Hai ragione. Ci penserò seriamente. | 你说得对。我会认真考虑。
      Chiara: D'altra parte, se non provi, non saprai mai com'è. | 另一方面，如果你不试，就永远不知道会怎样。
      Li Ming: Sono d'accordo. Grazie per i consigli! | 我同意。谢谢你们的建议！
    `,
    q: [
      ['Marco 问了李明什么？', ['是否接受一份意大利的工作', '是否想回国', '是否想结婚'], 0, 'lo accetteresti?'],
      ['李明担心什么？', ['想念父母', '没有钱', '语言不好'], 0, 'mi mancherebbero i miei genitori。'],
      ['Marco 建议他怎么缓解思念？', ['每天打电话', '每周写信', '每月回国'], 0, 'chiamarli ogni giorno。'],
    ],
    vocab: `
      a mio parere | 依我之见 | a MI-o pa-RE-re
      dal mio punto di vista | 从我的角度看 | dal MI-o PUN-to di VI-sta
      per quanto riguarda | 至于 | per QUAN-to ri-GUAR-da
      in effetti | 确实 | in ef-FET-ti
      d'altra parte | 另一方面 | d'AL-tra PAR-te
      tuttavia | 然而 | tut-ta-VI-a
      infatti | 事实上；的确 | in-FAT-ti
      ad esempio | 例如 | ad e-SEM-pio
      in conclusione | 总之 | in con-clu-SIO-ne
      mancare | 想念；缺少 | man-CA-re
      l'occasione | 机会 | l'oc-ca-SIO-ne
      accettare | 接受 | ac-cet-TA-re
      offrire | 提供；给 | of-FRI-re
      seriamente | 认真地 | se-ria-MEN-te
    `,
    gram: [
      {
        h: '议论连接语：让讨论有逻辑',
        t: [
          ['功能', '连接语', '例句'],
          ['表明观点', 'a mio parere, dal mio punto di vista, secondo me', 'A mio parere è un\'ottima idea.'],
          ['补充', 'inoltre, poi, in più', 'Inoltre, la vita è più tranquilla.'],
          ['举例', 'ad esempio, per esempio', 'Ad esempio, si mangia benissimo.'],
          ['转折 / 对比', 'tuttavia, però, d\'altra parte, invece', "D'altra parte, mi mancherebbero i miei genitori."],
          ['证实', 'infatti, in effetti, davvero', 'In effetti, hai ragione.'],
          ['总结', 'in conclusione, insomma, alla fine', 'In conclusione, accetterei.'],
        ],
      },
      {
        h: '第八岛复盘：句型速查',
        t: [
          ['场景', '句型'],
          ['礼貌请求', 'Vorrei… / Potrebbe…? / Sarebbe possibile…? / Mi piacerebbe…'],
          ['观点', 'Secondo me… / Penso che sia… / Credo che abbia… / Non sono d\'accordo.'],
          ['习俗', 'Si mangia tardi. / Qui si parla italiano. / Ci si bacia.'],
          ['组合代词', 'Me lo dai? / Te lo porto. / Gliel\'ho mandata. / Dammelo!'],
          ['条件句', 'Se piove, resto a casa. / Se avessi tempo, viaggerei.'],
          ['建议', 'Dovresti… / Ti consiglio di… / Se fossi in te…'],
          ['办事', 'Quali documenti servono? / Dove devo firmare?'],
        ],
      },
    ],
    text: {
      title: 'Una scelta difficile',
      body: `
        Quando ho ricevuto l'offerta di lavoro in Italia, sono rimasto senza parole. | 收到意大利的工作邀请时，我一时说不出话来。
        Da una parte era un'occasione unica; dall'altra dovevo lasciare la mia famiglia. | 一方面这是个难得的机会；另一方面我得离开家人。

        Ne ho parlato con i miei genitori e mi hanno detto: "Se fossi in te, accetterei!" | 我和父母谈了，他们说："如果我是你，我会接受！"
        Penso che sia una buona decisione, anche se non sarà facile. | 我认为这是个好决定，尽管不会容易。
        In conclusione, ho deciso: partirò a settembre! | 总之，我决定了：九月出发！
      `,
    },
    rq: [
      ['他收到了什么？', ['一份意大利的工作邀请', '一张机票', '一封信'], 0, "l'offerta di lavoro in Italia。"],
      ['父母怎么说？', ['建议接受', '反对', '没意见'], 0, 'Se fossi in te, accetterei!'],
      ['他最终决定？', ['九月出发', '留在中国', '再考虑'], 0, 'partirò a settembre!'],
    ],
    culture: '在意大利的讨论中，**"D\'altra parte…"（另一方面）、"Tuttavia…"（然而）、"In effetti…"（确实）**这类连接语让你显得**有条理而不武断**。第八岛通关，你已经可以**表达观点、提出礼貌请求、给出建议、办理手续、谈论文化**——这是 **A2 向 B1 迈进**的关键一步。',
    speak: `
      Se ti offrissero un lavoro in Italia, lo accetteresti? | 提出一个假设性问题
      A mio parere sarebbe un'ottima occasione. | 用 A mio parere 表达观点
      D'altra parte, mi mancherebbero i miei genitori. | 用 D'altra parte 引出另一面
      In conclusione, ci penserò seriamente. | 用 In conclusione 做总结
    `,
    wr: [
      '写一段 8–9 句（100 词左右）的小议论文：就"要不要去意大利工作 / 学习"表达看法，要有观点、理由、例子、另一面、结论（至少用 4 个议论连接语）。',
      "A mio parere, studiare in Italia è un'ottima occasione.\nInnanzitutto, si impara la lingua parlando con le persone.\nAd esempio, io ho imparato molto frequentando i bar.\nInoltre, si conosce una cultura diversa.\nD'altra parte, la vita lontano da casa non è sempre facile.\nTuttavia, penso che i vantaggi siano più dei problemi.\nIn conclusione, se potessi, partirei subito!",
      '依我看，在意大利学习是个极好的机会。首先，和人交谈能学语言。例如，我在咖啡吧里学到了很多。此外，还能了解一种不同的文化。另一方面，远离家的生活并不总是容易。不过，我认为好处比问题多。总之，如果可以，我会马上出发！',
    ],
    quiz: [
      ['"另一方面"：', ["d'altra parte", 'in effetti', 'ad esempio'], 0, "d'altra parte = 另一方面。"],
      ['"如果你不试，就永远不知道"：', ['Se non provi, non saprai mai.', 'Se non provassi, non sai mai.', 'Se non provi, non sapere mai.'], 0, '第一类条件句：Se + 现在时，主句将来时。'],
      ['"我会想念我的父母"（条件式 + 复数主语）：', ['Mi mancherebbero i miei genitori.', 'Mi mancherebbe i miei genitori.', 'Mi mancano i miei genitori ieri.'], 0, 'mancare 与"被想念的人"一致。'],
      ['"总之"：', ['in conclusione', 'tuttavia', 'inoltre'], 0, 'in conclusione。'],
    ],
  },
]);
