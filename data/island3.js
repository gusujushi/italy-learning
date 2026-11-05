/* 第 3 岛 · 旅行岛 Isola del Viaggio（第 21–30 天） */
Course.add([
  // ───────────────────────── 第 21 天 ─────────────────────────
  {
    n: 21, it: "Scusi, dov'è…?", zh: '请问……在哪？',
    goal: '会问路（Dov\'è…? / Come arrivo a…?）；听懂"一直走、向左、向右、穿过"等指路表达；认识对"您"说的命令式（vada, giri, attraversi）。',
    scene: '你在万神殿附近迷了路，想去特莱维喷泉。你向一位路过的女士问路。',
    dlg: `
      Li Ming: Scusi, signora, dov'è la Fontana di Trevi? | 劳驾，女士，特莱维喷泉在哪里？
      Signora: Non è lontano. Vada sempre dritto per questa via. | 不远。沿着这条路一直走。
      Li Ming: Sempre dritto. E poi? | 一直走。然后呢？
      Signora: Alla seconda strada giri a sinistra. | 到第二条路向左转。
      Li Ming: A sinistra, alla seconda strada. | 向左，第二条路。
      Signora: Poi attraversi la piazza e la fontana è a destra. | 然后穿过广场，喷泉就在右手边。
      Li Ming: Quanto tempo ci vuole a piedi? | 步行要多久？
      Signora: Cinque minuti. | 五分钟。
      Li Ming: Grazie mille, signora! | 非常感谢，女士！
    `,
    key: [0, 6],
    q: [
      ['李明要去哪里？', ['特莱维喷泉', '斗兽场', '火车站'], 0, "dov'è la Fontana di Trevi?"],
      ['到第二条路要怎么走？', ['向左转', '向右转', '继续直走'], 0, 'Alla seconda strada giri a sinistra.'],
      ['步行要多久？', ['五分钟', '十五分钟', '半小时'], 0, 'Cinque minuti.'],
    ],
    vocab: `
      dov'è? | ……在哪里？ | do-VÈ
      come arrivo a | 我怎么去…… | CO-me ar-RI-vo a
      vada | 请走（对您） | VA-da
      giri | 请转（对您） | GI-ri
      attraversi | 请穿过（对您） | at-tra-VER-si
      sempre dritto | 一直往前 | SEM-pre DRIT-to
      a destra | 向右 | a DE-stra
      a sinistra | 向左 | a si-NI-stra
      la strada | 路；街道 | la STRA-da
      in fondo | 在尽头 | in FON-do
      l'angolo | 拐角 | l'AN-go-lo
      il semaforo | 红绿灯 | il se-MA-fo-ro
      a piedi | 步行 | a PIE-di
      quanto tempo ci vuole? | 需要多长时间？ | QUAN-to TEM-po ci VUO-le
      il minuto | 分钟 | il mi-NU-to
    `,
    pron: {
      t: 'str / dr 辅音丛与方位词',
      tips: [
        '**sinistra、destra、strada** 里有 str / st 辅音丛：s 紧贴后面的辅音一起读，中间不要加元音（不要读成 si-ni-si-tra）。',
        '**dritto** /ˈdritto/：tt 长；**semaforo** se-MA-fo-ro（倒数第三音节重音）；**attraversi**：tt 长 + r 颤音。',
      ],
      drill: `
        destra | 右
        sinistra | 左
        dritto | 直
        strada | 路
        semaforo | 红绿灯
        angolo | 拐角
        attraversi | 请穿过
        minuti | 分钟
      `,
    },
    gram: [
      {
        h: "问路：Dov'è…? / Come arrivo a…?",
        p: ["**Dov'è** 问单数事物在哪里，**Dove sono** 问复数。**Come arrivo a…?** 问怎么去。先说 **Scusi**（劳驾）再提问。"],
        eg: [
          "Scusi, dov'è la stazione? | 劳驾，车站在哪里？",
          'Come arrivo al Colosseo? | 我怎么去斗兽场？',
          "Dov'è il bagno? | 洗手间在哪里？",
          'Dove sono i taxi? | 出租车在哪里？',
        ],
      },
      {
        h: '对"您"说的命令式——指路时最常听到',
        p: ['对"您"（Lei）下指令时用**命令式**：-are 动词词尾变 **-i**（giri, attraversi, continui），-ere 动词变 **-a**（prenda）。**andare → vada** 是不规则的。（对"你"的命令式第 56 天再学。）'],
        t: [
          ['动词', '命令式（对您）', '意思'],
          ['andare', 'vada', '走；去'],
          ['girare', 'giri', '转'],
          ['attraversare', 'attraversi', '穿过'],
          ['continuare', 'continui', '继续'],
          ['prendere', 'prenda', '走（某条路）；乘'],
          ['seguire', 'segua', '沿着'],
        ],
        eg: ['Vada sempre dritto. | 请一直往前走。', 'Giri a destra. | 请向右转。', 'Attraversi la piazza. | 请穿过广场。'],
      },
      {
        h: '方位与距离',
        t: [
          ['短语', '意思'],
          ['a destra / a sinistra', '向右 / 向左'],
          ['sempre dritto', '一直往前'],
          ['in fondo alla strada', '在这条路的尽头'],
          ["all'angolo", '在拐角'],
          ['al semaforo', '在红绿灯处'],
          ['È vicino / È lontano', '近 / 远'],
          ['a cinque minuti a piedi', '步行五分钟'],
        ],
      },
    ],
    culture: '**问路时先说 Scusi**，对方多半很热心，甚至会陪你走一段。意大利老城区的路弯曲狭窄，常常没有路牌，**靠地标比靠路名更可靠**：可以问"到了某个教堂 / 广场之后怎么走"。手机导航在古城窄巷里有时不准，多问一句更稳妥。',
    speak: `
      Scusi, dov'è la stazione? | 向路人问车站在哪里
      Come arrivo al Colosseo? | 问怎么去斗兽场
      Sempre dritto, poi a sinistra. | 复述指路：一直走，然后向左
      Quanto tempo ci vuole a piedi? | 问步行需要多久
    `,
    wr: [
      '写出向路人问路并确认路线的小对话（4 句）：问地点、对方指路、你复述、道谢。',
      "Scusi, dov'è il Pantheon?\nVada sempre dritto, poi giri a destra.\nSempre dritto, poi a destra. Grazie mille!",
      '劳驾，万神殿在哪里？请一直往前走，然后向右转。一直往前，然后向右。非常感谢！',
    ],
    quiz: [
      ['a sinistra 的意思是：', ['向左', '向右', '一直走'], 0, 'sinistra = 左，destra = 右。'],
      ['Vada sempre dritto 是对谁说的？', ['对"您"（Lei）', '对朋友（tu）', '对一群人'], 0, 'vada 是对 Lei 的命令式。'],
      ['想问"洗手间在哪里？"：', ["Dov'è il bagno?", 'Come è il bagno?', 'Chi è il bagno?'], 0, "dov'è = 在哪里。"],
      ['Attraversi la piazza 的意思是：', ['请穿过广场', '请在广场吃饭', '请别去广场'], 0, 'attraversare = 穿过。'],
    ],
  },

  // ───────────────────────── 第 22 天 ─────────────────────────
  {
    n: 22, it: 'In treno e in metro', zh: '乘火车与地铁',
    goal: '会买火车票（单程 / 往返）、问站台和发车时间；知道不同列车的区别和"打票"规矩；会听时刻表上的数字。',
    scene: '你在罗马特米尼车站，准备去佛罗伦萨。你在售票窗口买票，并问清站台。',
    dlg: `
      Li Ming: Buongiorno! Un biglietto per Firenze, per favore. | 早上好！请给我一张去佛罗伦萨的票。
      Bigliettaio: Andata e ritorno? | 往返吗？
      Li Ming: No, solo andata. A che ora parte il prossimo treno? | 不，只要单程。下一班火车几点开？
      Bigliettaio: Alle dieci e quarantacinque, dal binario sette. | 十点四十五，从七号站台出发。
      Li Ming: Quanto costa il biglietto? | 票多少钱？
      Bigliettaio: Ventinove euro e novanta. | 二十九欧元九十分。
      Li Ming: Devo convalidare il biglietto? | 我需要打票吗？
      Bigliettaio: No, è un Frecciarossa. Buon viaggio! | 不用，这是 Frecciarossa 高速列车。一路顺风！
    `,
    key: [2, 6],
    q: [
      ['李明买的是什么票？', ['去佛罗伦萨的单程票', '往返票', '去罗马的票'], 0, 'solo andata = 只要单程。'],
      ['火车从几号站台出发？', ['7 号', '10 号', '45 号'], 0, 'dal binario sette。'],
      ['他需要打票吗？', ['不需要', '需要', '不知道'], 0, 'No, è un Frecciarossa.'],
    ],
    vocab: `
      andata e ritorno | 往返 | an-DA-ta e ri-TOR-no
      solo andata | 单程 | SO-lo an-DA-ta
      il treno | 火车 | il TRE-no
      il binario | 站台；轨道 | il bi-NA-rio
      a che ora parte? | 几点出发？ | a ke O-ra PAR-te
      il prossimo treno | 下一班火车 | il PROS-si-mo TRE-no
      convalidare | 打票；验票 | con-va-li-DA-re
      la metropolitana | 地铁 | la me-tro-po-li-TA-na
      l'autobus | 公共汽车 | l'AU-to-bus
      il taxi | 出租车 | il TA-xi
      la fermata | 站（车站） | la fer-MA-ta
      in ritardo | 晚点 | in ri-TAR-do
      la biglietteria | 售票处 | la bi-glie-t-te-RI-a
      la prima classe | 一等座 | la PRI-ma CLAS-se
      buon viaggio | 一路顺风 | buon VIAG-gio
    `,
    pron: {
      t: '时刻表里的长数字',
      tips: [
        '**ventinove**（29）、**quarantacinque**（45）：把十位和个位连成一个词读：ven-ti-NO-ve、qua-ran-ta-CIN-que，重音在倒数第二音节。',
        '**binario** bi-NA-rio；**partire** par-TI-re；**prossimo** PROS-si-mo（倒数第三音节重音）；**ritardo** 有颤音 r。',
      ],
      drill: `
        binario | 站台
        partire | 出发
        prossimo | 下一个
        convalidare | 打票
        ritardo | 晚点
        fermata | 站
        autobus | 公共汽车
        ventinove | 二十九
        quarantacinque | 四十五
      `,
    },
    gram: [
      {
        h: '买票的固定句式',
        eg: [
          'Un biglietto per Firenze, per favore. | 请给我一张去佛罗伦萨的票。',
          'Due biglietti di andata e ritorno per Napoli. | 两张去那不勒斯的往返票。',
          'Da che binario parte? | 从哪个站台出发？',
          'A che ora arriva a Firenze? | 几点到佛罗伦萨？',
        ],
        p: ['去某地用 **per + 地点**：un biglietto per Firenze；从某地来用 **da + 地点**。'],
      },
      {
        h: 'partire（出发）：-ire 动词（不加 -isc-）',
        t: [['人称', 'partire'], ['io', 'parto'], ['tu', 'parti'], ['lui / lei / Lei', 'parte'], ['noi', 'partiamo'], ['voi', 'partite'], ['loro', 'partono']],
        eg: ['Il treno parte alle dieci. | 火车十点出发。', 'Il treno arriva alle undici e trenta. | 火车十一点半到。'],
      },
      {
        h: '时刻表用 24 小时制',
        p: ['时刻表和广播多用 24 小时制：把小时直接读成数字，再加 e + 分钟。'],
        t: [['时刻表', '口语读法'], ['14:30', 'le quattordici e trenta'], ['18:45', 'le diciotto e quarantacinque'], ['21:05', 'le ventuno e cinque']],
      },
    ],
    culture: '**坐意大利火车要看清车种**：Frecciarossa / Italo 是高速列车，需订座，价格随购买时间浮动，越早买越便宜；Regionale 是区域慢车，票价固定。**区域车的纸质票上车前必须在站台的打票机上打票（convalidare）**，否则可能被罚款；手机电子票则不需要。罢工（sciopero）时有发生，出发前查一下时刻。',
    speak: `
      Un biglietto per Firenze, per favore. | 买一张去佛罗伦萨的票
      Solo andata, grazie. | 说只要单程
      A che ora parte il prossimo treno? | 问下一班火车几点开
      Da che binario parte? | 问从哪个站台出发
    `,
    wr: [
      '写出买火车票的 4 句话：要票、说单程或往返、问几点发车、问站台。',
      'Un biglietto per Napoli, per favore.\nAndata e ritorno.\nA che ora parte il prossimo treno?\nDa che binario?',
      '请给我一张去那不勒斯的票。往返。下一班火车几点开？从哪个站台出发？',
    ],
    quiz: [
      ['solo andata 的意思是：', ['单程', '往返', '头等舱'], 0, 'andata = 去程；ritorno = 返程。'],
      ['时刻表上的 18:45，口语可以读作：', ['le diciotto e quarantacinque', 'le otto e quindici', 'le diciotto e quindici'], 0, '24 小时制：直接读小时数 + e + 分钟。'],
      ['区域火车（Regionale）的纸质票上车前要：', ['在站台打票机上打票（convalidare）', '到车上再打票', '不需要任何操作'], 0, '没打票可能被罚款。'],
      ['Da che binario parte? 问的是：', ['从哪个站台出发', '几点出发', '多少钱'], 0, 'binario = 站台。'],
    ],
  },

  // ───────────────────────── 第 23 天 ─────────────────────────
  {
    n: 23, it: "In aeroporto", zh: '在机场',
    goal: '会办理值机（出示护照、托运行李、拿登机牌）；会问登机口、登机时间、航班是否准点；认识航班晚点、取消、行李丢失等常用词。',
    scene: '离开意大利那天，你在菲乌米奇诺机场的值机柜台办理手续。',
    dlg: `
      Li Ming: Buongiorno! Ho un volo per Pechino. | 早上好！我有一班飞北京的航班。
      Impiegata: Il passaporto, per favore. Ha bagagli da imbarcare? | 请出示护照。您有行李要托运吗？
      Li Ming: Sì, una valigia. | 有，一个行李箱。
      Impiegata: Va bene. Ecco la carta d'imbarco. L'uscita è la B12. | 好的。这是您的登机牌。登机口是 B12。
      Li Ming: A che ora si imbarca? | 几点登机？
      Impiegata: Alle tredici e trenta. | 十三点三十分。
      Li Ming: Il volo è in orario? | 航班准点吗？
      Impiegata: Sì, è in orario. Buon viaggio! | 是的，准点。一路顺风！
    `,
    key: [0, 6],
    q: [
      ['李明要飞往哪里？', ['北京', '罗马', '米兰'], 0, 'Pechino = 北京。'],
      ['李明托运了什么？', ['一个行李箱', '两个包', '没有行李'], 0, 'una valigia。'],
      ['登机口是哪个？', ['B12', 'A12', 'B21'], 0, "L'uscita è la B12."],
    ],
    vocab: `
      il volo | 航班；飞行 | il VO-lo
      l'aeroporto | 机场 | l'a-e-ro-POR-to
      il passaporto | 护照 | il pas-sa-POR-to
      il bagaglio | 行李 | il ba-GA-glio
      la valigia | 行李箱 | la va-LI-gia
      la carta d'imbarco | 登机牌 | la CAR-ta d'im-BAR-co
      l'uscita | 登机口；出口 | l'u-SCI-ta
      il check-in | 值机 | il check-IN
      in orario | 准点 | in o-RA-rio
      cancellato | 取消的 | can-cel-LA-to
      il controllo passaporti | 护照检查 | il con-TROL-lo pas-sa-POR-ti
      la dogana | 海关 | la do-GA-na
      il ritiro bagagli | 行李提取处 | il ri-TI-ro ba-GA-gli
      il bagaglio a mano | 随身行李 | il ba-GA-glio a MA-no
    `,
    pron: {
      t: 'aeroporto 里的元音连读 / gli',
      tips: [
        '**aeroporto** a-e-ro-POR-to：a 和 e 是两个音节，要分开读。**valigia** va-LI-gia：gia 里的 i 不发音。',
        '**bagaglio** ba-GA-glio、**bagagli**：gli /ʎ/；**passaporto** 的 ss、**controllo** 的 ll 都是长辅音。',
      ],
      drill: `
        aeroporto | 机场
        passaporto | 护照
        bagaglio | 行李
        valigia | 行李箱
        volo | 航班
        uscita | 登机口
        dogana | 海关
        controllo | 检查
      `,
    },
    gram: [
      {
        h: '值机柜台的常见问答',
        t: [
          ['工作人员常问', '你的回答'],
          ['Il passaporto, per favore.', 'Ecco il passaporto.'],
          ['Ha bagagli da imbarcare?', 'Sì, una valigia. / No, solo il bagaglio a mano.'],
          ['Preferisce il finestrino o il corridoio?', 'Il finestrino, per favore.'],
          ['Ecco la carta d\'imbarco.', 'Grazie! A che ora si imbarca?'],
        ],
      },
      {
        h: '航班状态：in orario / in ritardo / cancellato',
        p: ['晚点用 **in ritardo**，具体晚多久用 **di + 时间**：in ritardo di venti minuti。'],
        eg: ['Il volo è in orario. | 航班准点。', 'Il volo è in ritardo di venti minuti. | 航班晚点二十分钟。', 'Il volo è cancellato. | 航班取消了。'],
      },
      {
        h: '去哪里：per / 从哪里：da',
        eg: ['Un volo per Pechino. | 飞北京的航班。', 'Un volo da Roma. | 从罗马起飞的航班。', "Dov'è il ritiro bagagli? | 行李提取处在哪里？"],
      },
    ],
    culture: '**菲乌米奇诺机场（Fiumicino，正式名称莱昂纳多·达·芬奇机场）**是罗马的主要机场，有直达特米尼车站的 **Leonardo Express** 列车，约半小时。意大利机场偶有罢工（sciopero），航班可能延误或取消，**出发前查一下航空公司通知**。随身液体要按规定装袋，过安检前拿出电脑。',
    speak: `
      Ho un volo per Pechino. | 对柜台说：我有一班飞北京的航班
      Ecco il passaporto. | 递上护照
      A che ora si imbarca? | 问几点登机
      Il volo è in orario? | 问航班是否准点
    `,
    wr: [
      '写出值机时的 4 句话：说明航班、交行李、问登机口、问是否准点。',
      "Ho un volo per Pechino. Ecco il passaporto.\nHo una valigia da imbarcare.\nDov'è l'uscita?\nIl volo è in orario?",
      '我有一班飞北京的航班。这是护照。我有一个行李箱要托运。登机口在哪里？航班准点吗？',
    ],
    quiz: [
      ['il passaporto 是：', ['护照', '登机牌', '行李'], 0, 'passaporto = 护照。'],
      ['Il volo è in ritardo 的意思是：', ['航班晚点了', '航班取消了', '航班准点'], 0, 'in ritardo = 晚点。'],
      ["la carta d'imbarco 是：", ['登机牌', '信用卡', '签证'], 0, 'imbarco = 登机。'],
      ['想问"航班准点吗？"：', ['Il volo è in orario?', 'Il volo è cancellato?', 'Il volo è in uscita?'], 0, 'in orario = 准点。'],
    ],
  },

  // ───────────────────────── 第 24 天 ─────────────────────────
  {
    n: 24, it: 'In albergo', zh: '在酒店',
    goal: '会办理入住（报预订名、房型、天数）；会问早餐、Wi-Fi、退房时间；会说设施坏了；知道意大利的楼层说法。',
    scene: '傍晚，你拖着行李箱走进佛罗伦萨的小旅馆，在前台办理入住。',
    dlg: `
      Li Ming: Buonasera! Ho prenotato una camera a nome Li. | 晚上好！我用"李"的名字订了一间房。
      Reception: Un momento, controllo. Sì, una camera singola per tre notti. | 请稍等，我查一下。是的，一间单人房，住三晚。
      Li Ming: Esatto. La colazione è inclusa? | 没错。包含早餐吗？
      Reception: Sì, dalle sette alle dieci. Ecco la chiave: camera ventidue, al primo piano. | 包含，七点到十点。这是钥匙：22 号房，在二楼。
      Li Ming: C'è il Wi-Fi? | 有无线网吗？
      Reception: Sì, la password è sul biglietto. | 有，密码在卡片上。
      Li Ming: A che ora è il check-out? | 几点退房？
      Reception: Entro le undici. | 十一点以前。
    `,
    key: [0, 2],
    q: [
      ['李明订了什么房间？', ['单人房，三晚', '双人房，两晚', '家庭房，一晚'], 0, 'una camera singola per tre notti。'],
      ['早餐是什么时间？', ['7 点到 10 点', '6 点到 9 点', '8 点到 11 点'], 0, 'dalle sette alle dieci。'],
      ['几点之前要退房？', ['11 点', '10 点', '12 点'], 0, 'Entro le undici.'],
    ],
    vocab: `
      ho prenotato | 我订了 | o pre-no-TA-to
      la camera | 房间 | la CA-me-ra
      camera singola | 单人房 | CA-me-ra SIN-go-la
      camera doppia | 双人房 | CA-me-ra DOP-pia
      camera matrimoniale | 大床房 | CA-me-ra ma-tri-mo-NIA-le
      la notte | 夜；晚 | la NOT-te
      la colazione è inclusa | 含早餐 | la co-la-ZIO-ne È in-CLU-sa
      la chiave | 钥匙 | la CHIA-ve
      il piano | 楼层 | il PIA-no
      il piano terra | 底层（一楼） | il PIA-no TER-ra
      l'ascensore | 电梯 | l'a-scen-SO-re
      il Wi-Fi | 无线网 | il WI-fi
      la password | 密码 | la PAS-sword
      il check-out | 退房 | il check-OUT
      entro | 在……之前 | EN-tro
    `,
    pron: {
      t: 'chiave、ascensore 与 camera',
      tips: [
        '**chiave** /ˈkjave/：chi 读 /k/ + 二合元音 ia，**一个音节** CHIA-ve。**ascensore** a-scen-SO-re：sc 在 e 前读 /ʃ/。',
        '**camera** CA-me-ra 重音在倒数第三音节；**matrimoniale** ma-tri-mo-NIA-le；**notte** 的 tt 长。',
      ],
      drill: `
        camera | 房间
        chiave | 钥匙
        ascensore | 电梯
        colazione | 早餐
        notte | 夜晚
        piano | 楼层
        singola | 单人的
        doppia | 双人的
        matrimoniale | 大床的
      `,
    },
    gram: [
      {
        h: '房型与住宿说法',
        t: [
          ['说法', '意思', '提示'],
          ['camera singola', '单人房', '一人入住'],
          ['camera matrimoniale', '大床房', '一张双人大床'],
          ['camera doppia', '双人房', '可能是大床或两张小床，订前确认'],
          ['camera a due letti', '双床房', '两张单人床'],
          ['colazione inclusa', '含早餐', '预订时看清是否包含'],
        ],
        eg: ['Ho prenotato una camera singola. | 我订了一间单人房。', 'La colazione è inclusa? | 含早餐吗？'],
      },
      {
        h: '楼层说法与序数词',
        p: ['意大利把地面层叫 **piano terra**，楼上第一层叫 **primo piano**——所以意大利的 primo piano 相当于中国说的**二楼**。序数词：primo（第一）、secondo（第二）、terzo（第三）、quarto（第四）、quinto（第五）。'],
        eg: ['La camera è al primo piano. | 房间在二楼。', "L'ascensore è a sinistra. | 电梯在左边。"],
      },
      {
        h: '设施出问题时',
        eg: [
          "L'aria condizionata non funziona. | 空调坏了。",
          "Non c'è acqua calda. | 没有热水。",
          'Posso avere un\'altra camera? | 我能换一间房吗？',
        ],
      },
    ],
    culture: '**入住要出示护照**：意大利法律要求酒店登记每位住客的身份证件。**tassa di soggiorno（住宿税）**是按人按晚收取的，一般要在酒店现场另付（常为现金），金额因城市和酒店等级而异，通常不含在订房价格里——这是游客最容易忽略的一笔。',
    speak: `
      Ho prenotato una camera a nome Li. | 报预订名字
      La colazione è inclusa? | 问是否含早餐
      C'è il Wi-Fi? | 问有没有无线网
      A che ora è il check-out? | 问几点退房
    `,
    wr: [
      '写出入住时的 4 句话：报预订、问早餐、问 Wi-Fi、问退房时间。',
      "Ho prenotato una camera a nome Li.\nLa colazione è inclusa?\nC'è il Wi-Fi?\nA che ora è il check-out?",
      '我用"李"的名字订了一间房。含早餐吗？有无线网吗？几点退房？',
    ],
    quiz: [
      ['la camera matrimoniale 是：', ['一张大床的双人房', '两张单人床的房间', '单人房'], 0, 'matrimoniale = 大床（婚姻的）。'],
      ['意大利说的 primo piano 相当于：', ['二楼', '一楼', '三楼'], 0, 'piano terra 是一楼，primo piano 是二楼。'],
      ['想说"空调坏了"：', ["L'aria condizionata non funziona.", "L'aria condizionata è caldo.", 'Non ho aria.'], 0, 'non funziona = 不工作。'],
      ['La colazione è inclusa? 问的是：', ['含不含早餐', '几点开始早餐', '早餐多少钱'], 0, 'inclusa = 包含。'],
    ],
  },

  // ───────────────────────── 第 25 天 ─────────────────────────
  {
    n: 25, it: 'Soldi e pagamenti', zh: '钱与支付',
    goal: '会数到 1000 以上；会在邮局买邮票、寄明信片；会问"现金还是刷卡"、找取款机；了解换汇与退税。',
    scene: '你想给家人寄几张明信片，于是来到邮局；付款后又想找一台取款机。',
    dlg: `
      Li Ming: Buongiorno! Vorrei due francobolli per la Cina, per favore. | 早上好！请给我两张寄往中国的邮票。
      Impiegato: Per cartoline? Sono due euro e cinquanta l'uno. | 寄明信片吗？每张两欧元五十。
      Li Ming: Va bene. Quant'è in totale? | 好的。一共多少钱？
      Impiegato: Cinque euro. Contanti o carta? | 五欧元。现金还是刷卡？
      Li Ming: Posso pagare con la carta? | 我可以刷卡吗？
      Impiegato: Certo. Inserisca la carta e digiti il PIN. | 当然可以。请插入卡片并输入密码。
      Li Ming: Ecco fatto. Dov'è un bancomat? | 好了。哪里有取款机？
      Impiegato: Qui fuori, a destra. | 就在外面，右边。
    `,
    key: [0, 4],
    q: [
      ['李明要买什么？', ['两张寄往中国的邮票', '两张明信片', '两张车票'], 0, 'due francobolli per la Cina。'],
      ['一共多少钱？', ['5 欧元', '2.50 欧元', '7 欧元'], 0, 'Cinque euro.'],
      ['李明想怎么付款？', ['刷卡', '现金', '手机支付'], 0, 'Posso pagare con la carta?'],
    ],
    vocab: `
      il francobollo | 邮票 | il fran-co-BOL-lo
      la cartolina | 明信片 | la car-to-LI-na
      in totale | 一共 | in to-TA-le
      i contanti | 现金 | i con-TAN-ti
      la carta | 银行卡；信用卡 | la CAR-ta
      pagare | 付款 | pa-GA-re
      il bancomat | 自动取款机；借记卡 | il BAN-co-mat
      il prelievo | 取款 | il pre-LIE-vo
      il PIN | 密码 | il PIN
      la ricevuta | 收据 | la ri-ce-VU-ta
      il cambio | 换汇；汇率 | il CAM-bio
      duecento | 二百 | due-CEN-to
      cinquecento | 五百 | cin-que-CEN-to
      mille | 一千 | MIL-le
      ecco fatto | 好了；办妥了 | EC-co FAT-to
    `,
    pron: {
      t: '-cento 里的软音 c',
      tips: [
        '**duecento、trecento、cinquecento**：-cento 里的 c 在 e 前是软音 /tʃ/，重音在 -CEN-。',
        '**mille** /ˈmille/ 的 ll 要读长；**francobollo** fran-co-BOL-lo 的 ll 同样长。',
      ],
      drill: `
        cento | 一百
        duecento | 二百
        trecento | 三百
        cinquecento | 五百
        mille | 一千
        francobollo | 邮票
        cartolina | 明信片
        bancomat | 取款机
      `,
    },
    gram: [
      {
        h: '数字 100–1000 以上',
        t: [
          ['数字', '意大利语', '数字', '意大利语'],
          ['100', 'cento', '600', 'seicento'],
          ['200', 'duecento', '700', 'settecento'],
          ['300', 'trecento', '800', 'ottocento'],
          ['400', 'quattrocento', '900', 'novecento'],
          ['500', 'cinquecento', '1.000', 'mille'],
        ],
        p: ['组合数字连写：centoventi（120）、duecentocinquanta（250）、milleduecento（1.200）；2.000 = **duemila**，3.000 = **tremila**（mille 的复数是 mila）。'],
      },
      {
        h: '付款时的对话',
        eg: [
          'Contanti o carta? | 现金还是刷卡？',
          'Posso pagare con la carta? | 我可以刷卡吗？',
          'Vorrei la ricevuta, per favore. | 请给我收据。',
          "Dov'è un bancomat? | 哪里有取款机？",
        ],
      },
      {
        h: '对"您"的命令式（-ire 与 -are 动词）',
        p: ['工作人员常对你说：**Inserisca** la carta（请插入）、**digiti** il PIN（请输入密码）、**firmi** qui（请在这里签名）。听到 -i / -isca 结尾的动词，通常就是"请您……"。'],
      },
    ],
    culture: '**取款最划算的方式是用银行卡在银行的 bancomat（ATM）直接取欧元**，机场和街头的"换汇亭"汇率与手续费往往不划算。意大利银行通常周一到周五上午营业，下午只开很短时间。**tax free（退税）**：非欧盟游客在标有 Tax Free 的商店购物满一定金额，可以申请退还增值税，购物时向店员索要退税表格，离境时在海关盖章。',
    speak: `
      Vorrei due francobolli per la Cina. | 买两张寄往中国的邮票
      Quant'è in totale? | 问一共多少钱
      Posso pagare con la carta? | 问能不能刷卡
      Dov'è un bancomat? | 问哪里有取款机
    `,
    wr: [
      '写出在邮局买邮票并付款的 4 句话。',
      "Vorrei tre francobolli per la Cina.\nQuant'è in totale?\nPosso pagare con la carta?\nGrazie, arrivederci!",
      '请给我三张寄往中国的邮票。一共多少钱？我可以刷卡吗？谢谢，再见！',
    ],
    quiz: [
      ['1.200 在意大利语里读：', ['milleduecento', 'centoventi', 'dodicimila'], 0, 'mille + duecento。'],
      ['il bancomat 是：', ['自动取款机', '银行卡密码', '邮局'], 0, 'bancomat = 取款机 / 借记卡。'],
      ['Contanti o carta? 问的是：', ['现金还是刷卡', '要不要收据', '要不要袋子'], 0, 'contanti = 现金。'],
      ['想说"请给我收据"：', ['Vorrei la ricevuta, per favore.', 'Vorrei il resto, per favore.', 'Vorrei il conto, per favore.'], 0, 'ricevuta = 收据。'],
    ],
  },

  // ───────────────────────── 第 26 天 ─────────────────────────
  {
    n: 26, it: 'Aiuto!', zh: '求助与生病',
    goal: '会向药剂师描述症状（头疼、嗓子疼、发烧）；会说 mi fa male…；知道紧急电话号码和求助的说法。',
    scene: '旅途中你突然感冒了，走进路边的药店（farmacia）求助。',
    dlg: `
      Li Ming: Buongiorno! Non mi sento bene. | 早上好！我感觉不舒服。
      Farmacista: Che cosa ha? | 您哪里不舒服？
      Li Ming: Ho mal di testa e mal di gola. | 我头疼，嗓子疼。
      Farmacista: Ha la febbre? | 您发烧吗？
      Li Ming: Credo di sì. Ho un po' di febbre. | 我想是的。有点发烧。
      Farmacista: Prenda queste compresse due volte al giorno, dopo i pasti. | 这些药片每天吃两次，饭后服用。
      Li Ming: Grazie. Serve la ricetta? | 谢谢。需要处方吗？
      Farmacista: No, non serve. Si riposi e beva molta acqua. | 不需要。请多休息，多喝水。
    `,
    key: [0, 2],
    q: [
      ['李明哪里不舒服？', ['头疼、嗓子疼', '肚子疼', '牙疼'], 0, 'mal di testa e mal di gola。'],
      ['药要怎么吃？', ['每天两次，饭后', '每天三次，饭前', '只在睡前'], 0, 'due volte al giorno, dopo i pasti。'],
      ['需要处方吗？', ['不需要', '需要', '要先去医院'], 0, 'No, non serve.'],
    ],
    vocab: `
      chiamare | 呼叫；打电话叫 | chia-MA-re
      non mi sento bene | 我觉得不舒服 | non mi SEN-to BE-ne
      ho mal di testa | 我头疼 | o mal di TE-sta
      ho mal di gola | 我嗓子疼 | o mal di GO-la
      ho mal di pancia | 我肚子疼 | o mal di PAN-cia
      ho la febbre | 我发烧 | o la FEB-bre
      il medico | 医生 | il ME-di-co
      la compressa | 药片 | la com-PRES-sa
      la ricetta | 处方 | la ri-CET-ta
      due volte al giorno | 每天两次 | DUE VOL-te al GIOR-no
      dopo i pasti | 饭后 | DO-po i PA-sti
      l'ambulanza | 救护车 | l'am-bu-LAN-za
      il pronto soccorso | 急诊 | il PRON-to soc-COR-so
      riposarsi | 休息 | ri-po-SAR-si
    `,
    pron: {
      t: 'gola / pancia / febbre',
      tips: [
        '**gola** /ˈgola/：g 在 o 前是硬音；**pancia** /ˈpantʃa/：ci 是软音，i 不发音。',
        '**febbre** FEB-bre 的 bb 是长浊音；**compressa** com-PRES-sa 的 ss 长；**ambulanza** am-bu-LAN-za。',
      ],
      drill: `
        testa | 头
        gola | 嗓子
        pancia | 肚子
        febbre | 发烧
        medico | 医生
        ricetta | 处方
        compressa | 药片
        ambulanza | 救护车
      `,
    },
    gram: [
      {
        h: '说身体不舒服的两种方式',
        p: [
          '**avere mal di + 部位**：Ho mal di testa（我头疼）。',
          '**mi fa male + 单数 / mi fanno male + 复数**：Mi fa male la testa；Mi fanno male i piedi。',
        ],
        t: [
          ['部位', 'avere mal di…'],
          ['头', 'mal di testa'],
          ['嗓子', 'mal di gola'],
          ['肚子', 'mal di pancia'],
          ['牙', 'mal di denti'],
          ['背', 'mal di schiena'],
        ],
        eg: ['Mi fa male la testa. | 我头疼。', 'Mi fanno male i piedi. | 我脚疼。', 'Ho la febbre. | 我发烧。'],
      },
      {
        h: '紧急电话',
        t: [
          ['号码', '用途'],
          ['112', '统一紧急电话（欧盟通用，最稳妥）'],
          ['118', '医疗急救（救护车）'],
          ['113', '警察'],
          ['115', '消防'],
        ],
        p: ['遇到危险直接喊 **Aiuto!**（救命！）。打电话时先说：**Ho bisogno di aiuto**（我需要帮助），再说地点和情况。'],
      },
      {
        h: '药剂师常说的命令式（对"您"）',
        eg: ['Prenda queste compresse. | 请服用这些药片。', 'Si riposi. | 请休息。', 'Beva molta acqua. | 请多喝水。'],
      },
    ],
    culture: '意大利药店门口挂**绿色十字**。药店营业时间通常约 9:00–13:00、16:00–19:30，夜间和节假日有轮值的 **farmacia di turno**（门上会贴出）。轻微不适可以直接请药剂师推荐；**抗生素等需要处方**。非欧盟游客请**务必购买旅行医疗险**，急诊（pronto soccorso）费用可能很高。',
    speak: `
      Non mi sento bene. | 说：我感觉不舒服
      Ho mal di testa e mal di gola. | 说：我头疼、嗓子疼
      Ho la febbre. | 说：我发烧
      Aiuto! Ho bisogno di un medico. | 求助：我需要医生
    `,
    wr: [
      '写出你生病时对药剂师说的 3–4 句话：感觉怎么样、哪里疼、问药怎么吃。',
      'Non mi sento bene.\nHo mal di pancia e ho la febbre.\nCome devo prendere le compresse?',
      '我感觉不舒服。我肚子疼，还发烧。这些药片怎么吃？',
    ],
    quiz: [
      ['Ho mal di testa 的意思：', ['我头疼', '我牙疼', '我肚子疼'], 0, 'testa = 头。'],
      ['想说"我脚疼"（piedi 是复数）：', ['Mi fanno male i piedi.', 'Mi fa male i piedi.', 'Ho male i piedi.'], 0, '复数 → fanno male。'],
      ['向药剂师说"我发烧"：', ['Ho la febbre.', 'Ho il fuoco.', 'Sono febbre.'], 0, 'avere la febbre。'],
      ['在欧洲最通用的紧急电话是：', ['112', '110', '911'], 0, '112 是欧盟统一紧急号码。'],
    ],
  },

  // ───────────────────────── 第 27 天 ─────────────────────────
  {
    n: 27, it: 'Che tempo fa?', zh: '天气',
    goal: '会说和问天气（Che tempo fa? / Fa caldo / Piove…）；会说四季和气温；会因天气调整计划。',
    scene: '早晨，你和 Marco 看着窗外商量今天的行程——但明天天气可能变坏。',
    dlg: `
      Marco: Com'è il tempo oggi? | 今天天气怎么样？
      Li Ming: Fa bello, c'è il sole. Ma fa un po' freddo. | 天气很好，有太阳。不过有点冷。
      Marco: Sì, siamo in inverno. Domani piove. | 是的，现在是冬天。明天下雨。
      Li Ming: Davvero? Allora dobbiamo cambiare programma. | 真的吗？那我们得改计划。
      Marco: Possiamo andare al museo. Ci sono quasi dieci gradi. | 我们可以去博物馆。差不多十度。
      Li Ming: Perfetto. Mi piace l'autunno, ma preferisco la primavera. | 好。我喜欢秋天，不过我更喜欢春天。
    `,
    key: [0, 3],
    q: [
      ['今天天气怎么样？', ['晴天，有点冷', '下雨', '下雪'], 0, 'Fa bello, c\'è il sole. Ma fa un po\' freddo.'],
      ['明天天气会怎样？', ['下雨', '下雪', '晴天'], 0, 'Domani piove.'],
      ['李明更喜欢哪个季节？', ['春天', '秋天', '夏天'], 0, 'preferisco la primavera。'],
    ],
    vocab: `
      il tempo | 天气；时间 | il TEM-po
      che tempo fa? | 天气怎么样？ | ke TEM-po FA
      fa caldo | 天气热 | fa CAL-do
      fa freddo | 天气冷 | fa FRED-do
      fa bello | 天气好 | fa BEL-lo
      c'è il sole | 有太阳 | CÈ il SO-le
      piove | 下雨 | PIO-ve
      nevica | 下雪 | NE-vi-ca
      c'è vento | 有风 | CÈ VEN-to
      c'è nebbia | 有雾 | CÈ NEB-bia
      la pioggia | 雨 | la PIOG-gia
      i gradi | 度（温度） | i GRA-di
      l'ombrello | 雨伞 | l'om-BREL-lo
      la primavera | 春天 | la pri-ma-VE-ra
      l'estate | 夏天 | l'e-STA-te
      l'autunno | 秋天 | l'au-TUN-no
      l'inverno | 冬天 | l'in-VER-no
    `,
    pron: {
      t: 'pioggia / nebbia / autunno',
      tips: [
        '**pioggia** /ˈpjɔddʒa/：gg 在 i 前是长的软音 /ddʒ/，i 不单独发音；**nebbia** NEB-bia：bb 长。',
        '**autunno** au-TUN-no：au 是一个音节（二合元音），nn 长；**estate** e-STA-te：重音在 STA。',
      ],
      drill: `
        pioggia | 雨
        nebbia | 雾
        vento | 风
        neve | 雪
        primavera | 春天
        estate | 夏天
        autunno | 秋天
        inverno | 冬天
        ombrello | 雨伞
      `,
    },
    gram: [
      {
        h: '谈天气的三种句型',
        t: [
          ['结构', '例句', '意思'],
          ['fare + 形容词', 'Fa caldo. / Fa freddo. / Fa bello.', '天气热 / 冷 / 好'],
          ['esserci + 名词', "C'è il sole. / C'è vento. / C'è nebbia.", '有太阳 / 有风 / 有雾'],
          ['天气动词', 'Piove. / Nevica.', '下雨 / 下雪'],
        ],
        eg: ["Che tempo fa oggi? | 今天天气怎么样？", "Domani piove. | 明天下雨。", 'Ci sono venti gradi. | 有二十度。'],
      },
      {
        h: '四季与介词 in',
        p: ['说"在某季节"用 **in**：in primavera（春天）、in estate（夏天）、in autunno（秋天）、in inverno（冬天）。'],
        eg: ["In estate fa molto caldo. | 夏天很热。", "In inverno nevica in montagna. | 冬天山里下雪。"],
      },
    ],
    culture: '意大利北部（波河平原）冬冷夏热、秋冬多雾；中南部和岛屿是地中海气候，夏季干热。**游览的黄金季节是 4–6 月和 9–10 月**。**8 月 15 日 Ferragosto（圣母升天节）**前后，许多本地人休假，城市里不少小店和餐馆会关门。',
    speak: `
      Che tempo fa oggi? | 问今天天气怎么样
      Fa bello, ma fa un po' freddo. | 说天气好，但有点冷
      Domani piove. | 说明天下雨
      Preferisco la primavera. | 说你更喜欢春天
    `,
    wr: [
      '写 3–4 句话描述今天的天气，并说说你喜欢哪个季节。（换成你那里的实际情况）',
      "Oggi fa freddo e c'è vento.\nDomani piove.\nMi piace l'estate perché fa caldo.",
      '今天很冷，还有风。明天下雨。我喜欢夏天，因为天气热。',
    ],
    quiz: [
      ['Piove 的意思：', ['下雨', '下雪', '刮风'], 0, 'piovere = 下雨。'],
      ['Fa caldo 的意思：', ['天气热', '我很热情', '我有热水'], 0, 'fare + caldo = 天气热。'],
      ['想说"有太阳"：', ["C'è il sole.", 'Fa il sole.', 'Piove il sole.'], 0, "c'è + 名词。"],
      ["冬天在意大利语里是：", ["l'inverno", "l'estate", "l'autunno"], 0, 'inverno = 冬天。'],
    ],
  },

  // ───────────────────────── 第 28 天 ─────────────────────────
  {
    n: 28, it: 'Visitiamo la città', zh: '参观城市',
    goal: '会买博物馆门票（全票 / 优惠票）、问开放和关门时间、问能否拍照；认识常见标识（Vietato…、Aperto、Chiuso）。',
    scene: '你来到佛罗伦萨的一座博物馆，在售票处买票，并问清参观规定。',
    dlg: `
      Li Ming: Buongiorno! Un biglietto, per favore. | 早上好！请给一张票。
      Bigliettaia: Intero o ridotto? | 全票还是优惠票？
      Li Ming: Intero. Quanto costa? | 全票。多少钱？
      Bigliettaia: Dodici euro. | 十二欧元。
      Li Ming: A che ora chiude il museo? | 博物馆几点关门？
      Bigliettaia: Alle sei di sera. L'ultimo ingresso è alle cinque e mezza. | 晚上六点。最后入场是五点半。
      Li Ming: Si possono fare foto? | 可以拍照吗？
      Bigliettaia: Sì, ma senza flash. C'è anche un'audioguida in cinese. | 可以，但不能用闪光灯。还有中文语音导览。
      Li Ming: Ottimo! La prendo. | 太好了！我要一个。
    `,
    key: [2, 6],
    q: [
      ['李明买了什么票？', ['全票', '优惠票', '团体票'], 0, 'Intero.'],
      ['博物馆几点关门？', ['晚上六点', '五点半', '七点'], 0, 'Alle sei di sera.'],
      ['可以拍照吗？', ['可以，但不能用闪光灯', '完全不能', '只能在外面拍'], 0, 'Sì, ma senza flash.'],
    ],
    vocab: `
      il museo | 博物馆 | il mu-SE-o
      intero | 全票；整的 | in-TE-ro
      ridotto | 优惠票；减价的 | ri-DOT-to
      gratis | 免费 | GRA-tis
      aperto | 开着的 | a-PER-to
      chiuso | 关着的 | CHIU-so
      l'orario | 时间表；开放时间 | l'o-RA-rio
      l'ingresso | 入口；入场 | l'in-GRES-so
      la guida | 导游；指南 | la GUI-da
      l'audioguida | 语音导览 | l'au-dio-GUI-da
      la mostra | 展览 | la MO-stra
      fotografare | 拍照 | fo-to-gra-FA-re
      senza | 没有；不带 | SEN-za
      l'ultimo | 最后一个 | l'UL-ti-mo
      si possono fare foto? | 可以拍照吗？ | si POS-so-no FA-re FO-to
    `,
    pron: {
      t: 'museo / audioguida / ingresso',
      tips: [
        '**museo** mu-SE-o：e 和 o 分成两个音节；**audioguida** au-dio-GUI-da：gui 读 /gwi/，u 要读出来。',
        '**ingresso** in-GRES-so：ss 长；**ridotto** ri-DOT-to：tt 长；**ultimo** UL-ti-mo 倒数第三音节重音。',
      ],
      drill: `
        museo | 博物馆
        ingresso | 入口
        ridotto | 优惠票
        intero | 全票
        mostra | 展览
        guida | 导游
        audioguida | 语音导览
        aperto | 开着的
        chiuso | 关着的
      `,
    },
    gram: [
      {
        h: '"可以……吗？"：Si può… / Si possono…',
        p: ['**si può + 动词原形**（单数）/ **si possono + 复数名词**：表示"（一般而言）可以……"，是问规则最自然的说法。否定：**non si può**。'],
        eg: [
          'Si può fotografare? | 可以拍照吗？',
          'Si possono fare foto? | 可以拍照吗？',
          'Non si può fumare. | 不许吸烟。',
          'Si può entrare? | 可以进去吗？',
        ],
      },
      {
        h: '常见标识',
        t: [
          ['标识', '意思'],
          ['Aperto / Chiuso', '营业 / 关门'],
          ['Ingresso libero', '免费入场'],
          ['Vietato fotografare', '禁止拍照'],
          ['Vietato fumare', '禁止吸烟'],
          ['Uscita', '出口'],
          ['Spingere / Tirare', '推 / 拉'],
          ['Chiuso il lunedì', '周一休息'],
        ],
      },
      {
        h: '开放时间的说法',
        eg: ["Il museo è aperto dalle nove alle sei. | 博物馆九点到六点开放。", 'Chiude alle sei. | 六点关门。', "L'ultimo ingresso è alle cinque e mezza. | 最后入场是五点半。"],
      },
    ],
    culture: '意大利许多国家博物馆**每月第一个周日免费**（domenica gratuita），**18 岁以下通常免费**，优惠票（ridotto）多针对欧盟年轻人，非欧盟游客一般买全票。热门景点（梵蒂冈博物馆、乌菲齐美术馆、斗兽场）**提前在线订票**能省下大把排队时间。**参观教堂要衣着得体：遮住肩膀和膝盖**。',
    speak: `
      Un biglietto intero, per favore. | 买一张全票
      A che ora chiude il museo? | 问几点关门
      Si possono fare foto? | 问能不能拍照
      C'è un'audioguida in cinese? | 问有没有中文导览
    `,
    wr: [
      '写出买门票和询问规定的 4 句话。',
      "Un biglietto intero, per favore.\nQuanto costa?\nA che ora chiude il museo?\nSi possono fare foto?",
      '请给我一张全票。多少钱？博物馆几点关门？可以拍照吗？',
    ],
    quiz: [
      ['intero 与 ridotto 分别是：', ['全票 / 优惠票', '优惠票 / 全票', '免费 / 收费'], 0, 'intero = 整的 = 全价。'],
      ['Vietato fotografare 是：', ['禁止拍照', '可以拍照', '拍照收费'], 0, 'vietato = 禁止。'],
      ['想问"可以拍照吗？"：', ['Si possono fare foto?', 'Si fa le foto?', 'Posso foto?'], 0, 'si possono + 复数名词。'],
      ['参观教堂时应该：', ['穿着得体，遮住肩膀和膝盖', '穿泳衣', '不用特别注意'], 0, '很多教堂会检查着装。'],
    ],
  },

  // ───────────────────────── 第 29 天 ─────────────────────────
  {
    n: 29, it: 'Chiacchiere italiane', zh: '意式闲聊',
    goal: '会和意大利人做简单的闲聊：问来历、学习时长、工作、喜好；会夸人、回应夸奖；会碰杯说 Cin cin / Salute。',
    scene: '傍晚的 aperitivo 酒吧，朋友介绍你认识了意大利姑娘 Chiara，你们聊了起来。',
    dlg: `
      Chiara: Piacere, sono Chiara. Tu sei cinese, vero? | 幸会，我是基娅拉。你是中国人，对吧？
      Li Ming: Sì, sono di Shanghai. Studio italiano da due mesi. | 是的，我是上海人。我学意大利语两个月了。
      Chiara: Complimenti! Parli molto bene! | 真厉害！你说得很好！
      Li Ming: Grazie, sei gentile. Ti piace il tuo lavoro? | 谢谢，你真客气。你喜欢你的工作吗？
      Chiara: Sì, sono architetta. Che cosa ti piace dell'Italia? | 喜欢，我是建筑师。你喜欢意大利什么？
      Li Ming: Mi piace tutto: il cibo, l'arte e la gente! | 全都喜欢：美食、艺术，还有这里的人！
      Chiara: Allora, cin cin! | 那么，干杯！
      Li Ming: Salute! | 祝健康！
    `,
    key: [1, 4],
    q: [
      ['李明学意大利语多久了？', ['两个月', '两年', '两周'], 0, 'da due mesi。'],
      ['Chiara 的职业是什么？', ['建筑师', '老师', '医生'], 0, 'sono architetta。'],
      ['李明喜欢意大利的什么？', ['美食、艺术和人', '天气和海', '足球'], 0, 'il cibo, l\'arte e la gente。'],
    ],
    vocab: `
      complimenti! | 真棒！恭喜！ | com-pli-MEN-ti
      sei gentile | 你真客气（友善） | SEI gen-TI-le
      gentile | 亲切的；客气的 | gen-TI-le
      vero? | 对吧？是吗？ | VE-ro
      da due mesi | 已有两个月 | da DUE ME-si
      il cibo | 食物；美食 | il CI-bo
      l'arte | 艺术 | l'AR-te
      la gente | 人们 | la GEN-te
      tutto | 一切；全部 | TUT-to
      l'architetto | 建筑师（男） | l'ar-chi-TET-to
      l'architetta | 建筑师（女） | l'ar-chi-TET-ta
      cin cin! | 干杯！ | cin CIN
      salute! | 祝健康！干杯！ | sa-LU-te
      il lavoro | 工作 | il la-VO-ro
    `,
    pron: {
      t: 'cin cin / gentile / gente',
      tips: [
        '**cin cin** /tʃin tʃin/：两个都是软音 c；**gentile** gen-TI-le、**gente** GEN-te：ge 读软音 /dʒe/。',
        '**architetta** ar-chi-TET-ta：chi 读硬音 /ki/（h 保持硬音），tt 长。**complimenti**：重音在 MEN。',
      ],
      drill: `
        complimenti | 真棒
        gentile | 亲切的
        gente | 人们
        cibo | 食物
        arte | 艺术
        architetta | 建筑师
        salute | 祝健康
        cin cin | 干杯
      `,
    },
    gram: [
      {
        h: 'da + 时间段：从……起（持续到现在）',
        p: ['意大利语用**现在时 + da + 时间段**表示"已经……（多久）了"：Studio italiano **da due mesi**（我学意大利语已两个月）。不要用过去时。'],
        eg: ["Studio italiano da due mesi. | 我学意大利语两个月了。", 'Abito a Roma da un anno. | 我住在罗马一年了。', 'Lavoro qui da tre anni. | 我在这里工作三年了。'],
      },
      {
        h: '求确认与夸奖',
        t: [
          ['功能', '说法'],
          ['求确认（对吧？）', 'Sei cinese, vero? / Sei cinese, no?'],
          ['夸奖', 'Complimenti! / Bravo! / Brava! / Parli bene!'],
          ['回应夸奖', 'Grazie, sei gentile! / Grazie, troppo gentile!'],
          ['碰杯', 'Cin cin! / Salute! / Alla tua salute!'],
        ],
        p: ['**bravo**（男）/ **brava**（女）/ **bravi**（复数）用来夸人"棒、做得好"。'],
      },
    ],
    culture: '**碰杯时要看着对方的眼睛**，意大利人相信这样才有诚意。传说用**水**碰杯会带来厄运，所以碰杯最好用酒或其他饮料。熟人初次见面常见**贴面礼**（先右脸后左脸各一下），握手也完全合适。闲聊的万能话题：美食、足球、家人、旅行。',
    speak: `
      Piacere! Sono di Shanghai. | 初次见面自我介绍
      Studio italiano da due mesi. | 说你学意大利语两个月了
      Mi piace tutto: il cibo, l'arte e la gente! | 说你喜欢意大利的一切
      Cin cin! | 举杯：干杯
    `,
    wr: [
      '写 4–5 句话的小对话：互相问来历、学多久意大利语、喜欢意大利什么，最后碰杯。',
      "Di dove sei? Sono di Shanghai.\nStudi italiano? Sì, da due mesi.\nTi piace l'Italia? Mi piace molto il cibo!\nAllora, cin cin!",
      '你是哪里人？我是上海人。你学意大利语吗？是的，学了两个月。你喜欢意大利吗？我非常喜欢美食！那么，干杯！',
    ],
    quiz: [
      ['Complimenti! 用于：', ['夸奖、祝贺', '道歉', '告别'], 0, 'complimenti = 恭喜、真棒。'],
      ['Studio italiano da due mesi 的意思：', ['我学意大利语两个月了', '我两个月后学意大利语', '我两个月前学过意大利语'], 0, '现在时 + da + 时间段。'],
      ['碰杯时意大利人会说：', ['Cin cin! / Salute!', 'Buon appetito!', 'Arrivederci!'], 0, 'cin cin / salute = 干杯。'],
      ['Sei cinese, vero? 里的 vero 用来：', ['求确认（……对吧？）', '表示真实的名字', '表示价格'], 0, 'vero? = 对吗？'],
    ],
  },

  // ───────────────────────── 第 30 天（岛屿关卡 + 阶段毕业考）─────────────────────────
  {
    n: 30, test: true, exam: true, it: 'Viaggio a Roma', zh: '阶段一毕业：罗马之旅',
    goal: '检验第一阶段的全部成果：发音、问候、点餐购物、问路、乘车、住宿、求助、闲聊；通过 30 题毕业考，取得"生存期"证书。',
    scene: '明天你就要出发去罗马了。出发前，Marco 来给你"模拟考"，看你准备得怎么样。',
    dlg: `
      Marco: Allora, domani parti. Sei pronto? | 那么，你明天出发。准备好了吗？
      Li Ming: Sì! Ho il biglietto del treno e la prenotazione dell'albergo. | 是的！我有火车票，也订好了酒店。
      Marco: Ottimo. Sai chiedere indicazioni? | 很好。你会问路吗？
      Li Ming: Certo: "Scusi, dov'è la stazione?" E capisco a destra e a sinistra. | 当然：“劳驾，车站在哪里？”我也听得懂向右和向左。
      Marco: E al bar? Al ristorante? | 那在咖啡吧呢？在餐厅呢？
      Li Ming: "Vorrei un caffè, per favore." "Il conto, per favore!" | “请给我一杯咖啡。”“请结账！”
      Marco: Bravissimo! E se hai un problema? | 太棒了！那如果你遇到麻烦呢？
      Li Ming: Dico: "Non capisco. Più lentamente, per favore. Aiuto!" | 我就说：“我听不懂。请说慢一点。救命！”
      Marco: Perfetto. Buon viaggio! In bocca al lupo! | 太好了。一路顺风！祝你好运！
      Li Ming: Crepi! | 去他的狼！（固定回答）
    `,
    key: [0, 3],
    q: [
      ['李明什么时候出发？', ['明天', '今晚', '下周'], 0, 'domani parti。'],
      ['李明已经准备好了什么？', ['火车票和酒店预订', '机票和签证', '地图和手机'], 0, 'il biglietto del treno e la prenotazione dell\'albergo。'],
      ['Marco 最后对李明说了什么？', ['祝你好运', '再见', '欢迎'], 0, 'In bocca al lupo! = 祝你好运。'],
    ],
    vocab: `
      pronto | 准备好的 | PRON-to
      la prenotazione | 预订 | la pre-no-ta-ZIO-ne
      il problema | 问题；麻烦 | il pro-BLE-ma
      chiedere | 问；请求 | CHIE-de-re
      capire | 听懂；明白 | ca-PI-re
      sapere | 知道；会 | sa-PE-re
      dire | 说 | DI-re
      bravissimo | 太棒了 | bra-VIS-si-mo
      il viaggio | 旅行 | il VIAG-gio
      buona fortuna | 祝你好运 | buo-na for-TU-na
      in bocca al lupo! | 祝你好运！（字面：进狼嘴里） | in BOC-ca al LU-po
      crepi! | （对 in bocca al lupo 的固定回答） | CRE-pi
      a presto | 回头见 | a PRE-sto
      ti scrivo | 我给你写信 | ti SCRI-vo
    `,
    pron: {
      t: '第一阶段最难的 12 个词 · 绕口令',
      tips: [
        '把 30 天里最容易读错的词再读一遍：**gnocchi、famiglia、bicchiere、mezzanotte、sinistra、aeroporto、cappuccino、diciannove、quattordici、pioggia、audioguida、ascensore**。',
        '读的时候对照自查：元音是否纯净？双辅音够不够长？c / g 软硬对不对？重音在哪？',
        '最后用"三十三个特伦托人"绕口令收尾：**先慢后快，保持清晰**。',
      ],
      drill: `
        gnocchi | 团子
        famiglia | 家庭
        bicchiere | 玻璃杯
        mezzanotte | 午夜
        sinistra | 左边
        aeroporto | 机场
        cappuccino | 卡布奇诺
        diciannove | 十九
        quattordici | 十四
        pioggia | 雨
        audioguida | 语音导览
        ascensore | 电梯
      `,
      twister: 'Trentatré trentini entrarono a Trento, tutti e trentatré trotterellando. | 三十三个特伦托人走进特伦托，三十三个人全都小跑着。',
    },
    gram: [
      {
        h: '第一阶段毕业清单：你现在能做到什么',
        t: [
          ['能力', '你现在能…'],
          ['发音', '读出任何意大利语词：软硬 c/g、gn、gli、双辅音、重音'],
          ['听', '听懂慢速的日常对话：问候、点餐、价格、时间、路线、站台、登机口'],
          ['说', '自我介绍、点咖啡和餐、问价还价、问路、买票、办入住、说不舒服、简单闲聊'],
          ['读', '读懂菜单、站牌、时刻表、标识（Aperto / Chiuso / Vietato…）'],
          ['写', '写简单的句子：自我介绍、点餐、订房、明信片地址'],
        ],
        p: ['如果某一项还不稳，不要焦虑——回到对应的那一天，重做"说"和"写"。**第二阶段会把这些零散的句子，用语法串成真正的"语言能力"。**'],
      },
      {
        h: '第二阶段预告（第 31–60 天）',
        p: ['你将学到：反身动词和一天的作息、更多不规则动词、缩合介词（nel, sul, dalla…）、物主形容词、宾语代词、**过去时**和**将来时**、命令式、比较级——并能谈论过去与计划。'],
      },
    ],
    culture: '**In bocca al lupo!**（字面："进狼的嘴里"）是意大利人说"祝你好运"的方式，常用于考试、面试、演出前。**正确回答不是 Grazie，而是 Crepi!**（"让狼死掉！"）——如果回答 Grazie，据说会招来坏运气。恭喜你完成第一阶段，**In bocca al lupo per la seconda fase!**',
    speak: `
      Scusi, dov'è la stazione? | 问路
      Vorrei un caffè, per favore. | 在咖啡吧点咖啡
      Non capisco. Più lentamente, per favore. | 听不懂时求助
      In bocca al lupo! — Crepi! | 对朋友说祝福，并做出正确回答
    `,
    wr: [
      '写一张从罗马寄给朋友的明信片（5–6 句）：问好、你在哪里、天气、吃了什么、你的感受、告别。',
      "Ciao Marco! Sono a Roma.\nFa bello e mangio spesso gli spaghetti.\nMi piace molto l'Italia!\nA presto!",
      '嗨，马可！我在罗马。天气很好，我经常吃意面。我非常喜欢意大利！回头见！',
    ],
    quiz: [
      ['In bocca al lupo! 应该回答：', ['Crepi!', 'Grazie!', 'Prego!'], 0, '固定回答是 Crepi!。'],
      ['听不懂时的万能句是：', ['Non capisco. Più lentamente, per favore.', 'Buonanotte!', 'Ho fame.'], 0, '先说听不懂，再请对方放慢。'],
      ['想点一杯咖啡，最礼貌的说法：', ['Vorrei un caffè, per favore.', 'Voglio un caffè.', 'Dammi caffè.'], 0, 'Vorrei + per favore。'],
      ['想问火车站在哪里：', ["Scusi, dov'è la stazione?", "Scusi, che cos'è la stazione?", 'Scusi, chi è la stazione?'], 0, "dov'è = 在哪里。"],
    ],
  },
]);
