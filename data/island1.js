/* 第 1 岛 · 发音岛 Isola dei Suoni（第 1–10 天）
 * 格式说明见 docs/DATA_FORMAT.md。对话行：「角色: 意大利语 | 中文」；词汇行：「意大利语 | 中文 | 重音提示」。 */
Course.add([
  {
    n: 1, it: 'Ciao, Italia!', zh: '你好，意大利！',
    goal: '认识意大利语的 5 个纯元音；会说并听懂 14 个最常用的问候与礼貌表达；知道「怎么写就怎么读」。',
    scene: '你刚到罗马，在旅馆前台办完入住。前台小姐 Giulia 和你互相问好，把钥匙交给你。第一天不用纠结拼写，先用耳朵熟悉声音。',
    dlg: `
      Giulia: Buongiorno! | 早上好！
      Li Ming: Buongiorno! Come sta? | 早上好！您好吗？
      Giulia: Bene, grazie. E Lei? | 很好，谢谢。您呢？
      Li Ming: Bene, grazie! | 我也很好，谢谢！
      Giulia: Prego, ecco la chiave. | 不客气，这是您的钥匙。
      Li Ming: Grazie mille! Arrivederci! | 非常感谢！再见！
    `,
    key: [1, 2],
    q: [
      ['两个人见面时互相说的是哪个时段的问候？', ['早上／白天', '晚上', '睡觉前'], 0, 'Buongiorno 用于早晨到午后，也是最通用的「你好」。'],
      ['李明离开时说了哪一句？', ['Arrivederci!', 'Buonanotte!', 'Prego!'], 0, 'Arrivederci = 再见（较正式）。'],
      ['Giulia 说 Prego 时，大致是什么意思？', ['（递东西时）请拿好／不客气', '对不起', '谢谢'], 0, 'Prego 既是「不客气」，也可以是递东西时的「请」。'],
    ],
    vocab: `
      ciao | 你好；再见（熟人之间） | CIAO
      buongiorno | 早上好；你好（白天） | buon-GIOR-no
      buonasera | 晚上好 | buo-na-SE-ra
      buonanotte | 晚安 | buo-na-NOT-te
      arrivederci | 再见（较正式） | ar-ri-ve-DER-ci
      grazie | 谢谢 | GRA-zie
      grazie mille | 非常感谢 | GRA-zie MIL-le
      prego | 不客气；请 | PRE-go
      per favore | 请（求人时） | per fa-VO-re
      scusi | 对不起；劳驾（对「您」） | SCU-si
      sì | 是；对 | SÌ
      no | 不；没有 | NO
      come sta? | 您好吗？（正式） | CO-me STA
      come stai? | 你好吗？（熟人） | CO-me STAI
      bene | 好；很好 | BE-ne
    `,
    pron: {
      t: '五个纯元音：a e i o u',
      tips: [
        '意大利语只有 a e i o u 五个元音字母，每个都读得清晰、纯净、短促：嘴形定好就不要滑动（不像英语 go 会滑成 [ɡoʊ]）。',
        'a ≈ 汉语「啊」；i ≈「衣」；u ≈「乌」（嘴唇拢圆）。e 是短促的「诶」；o 是圆唇的「哦」，比汉语的「喔」更短。',
        '不弱化、不吞音：casa 的两个 a 一样响；词尾元音也要读足，buongiorno 末尾的 o 不能丢。',
        '重音（大写部分）要读得稍重稍长，其余音节保持清楚：buon-GIOR-no，而不是平均用力。',
      ],
      drill: `
        casa | 房子
        bene | 好
        vino | 葡萄酒
        sole | 太阳
        luna | 月亮
        pasta | 意面
        pizza | 披萨
        gelato | 冰淇淋
      `,
    },
    gram: [
      {
        h: '意大利语是「所见即所读」的语言',
        p: [
          '看到拼写，你几乎总能读对——这是意大利语对初学者最友好的地方。',
          '标准字母表只有 21 个字母（j k w x y 只出现在外来词中）。接下来 10 天里，我们会把所有读音规则逐一打通。',
        ],
        t: [['字母', '读音（近似）', '例词'], ['a', '啊', 'casa'], ['e', '诶（短）', 'bene'], ['i', '衣', 'vino'], ['o', '哦（圆唇、短）', 'sole'], ['u', '乌', 'luna']],
      },
      {
        h: '该用哪一句问候？',
        p: ['意大利语分「熟人」（tu）和「正式」（Lei）两种说法，选错会显得过分随便或过分生分。'],
        t: [
          ['说法', '什么时候用', '对谁说'],
          ['Ciao', '见面和告别都能用', '朋友、家人、同龄人'],
          ['Buongiorno', '早晨到午后', '任何人，最安全'],
          ['Buonasera', '午后到晚上', '任何人'],
          ['Buonanotte', '睡前道晚安（不是见面问候）', '亲近的人'],
          ['Come stai?', '你好吗？', '朋友（tu）'],
          ['Come sta?', '您好吗？', '陌生人、长辈、店员（Lei）'],
        ],
        eg: [
          'Ciao! Come stai? | 嗨！你好吗？',
          'Buongiorno! Come sta? | 早上好！您好吗？',
        ],
      },
      {
        h: '三个最有用的礼貌词',
        p: [
          'grazie 是谢谢，回答它用 prego（不客气）。',
          'per favore（请）放在请求的末尾：Un caffè, per favore. scusi 用来引起注意（劳驾）或道歉。',
        ],
        eg: ['Grazie mille! | 非常感谢！', 'Prego! | 不客气！', 'Scusi! | 劳驾！／对不起！'],
      },
    ],
    culture: '走进任何一家店、咖啡吧、诊所候诊室，**先说 Buongiorno**；离开时说 Grazie, arrivederci。不打招呼会被认为失礼。熟人见面常见的是两颊轻吻，初次见面一般握手即可。',
    speak: `
      Buongiorno! Come sta? | 对前台说：早上好！您好吗？
      Bene, grazie. E Lei? | 回答：很好，谢谢。您呢？
      Ciao! Come stai? | 对朋友说：嗨！你好吗？
      Grazie mille! Arrivederci! | 向对方道谢并告别
    `,
    wr: [
      '用意大利语写出下面三个场景的话：①早上走进咖啡店，向店员问好 ②遇到朋友，问他好吗 ③离开酒店前台，道谢并告别。',
      'Buongiorno!\nCiao! Come stai?\nGrazie mille! Arrivederci!',
      '①早上好！②嗨！你好吗？③非常感谢！再见！',
    ],
    quiz: [
      ['向陌生的前台人员打招呼，最合适的是哪个？', ['ciao', 'buongiorno', 'buonanotte'], 1, '对陌生人、店员用 buongiorno / buonasera；ciao 留给熟人；buonanotte 是睡前说的晚安。'],
      ['casa 里的两个 a 应该怎么读？', ['都是清晰的 [a]', '第二个 a 读得含糊', '读成英语的 [ei]'], 0, '意大利语元音不弱化、不双元音化，每个 a 都是清晰的 [a]。'],
      ['对朋友说「你好吗？」，应该说：', ['Come sta?', 'Come stai?', 'Come stare?'], 1, '朋友（tu）用 Come stai?；陌生人、长辈（Lei）用 Come sta?'],
      ['别人对你说 Grazie mille!，你可以回答：', ['Prego!', 'Scusi!', 'Buonanotte!'], 0, 'Prego = 不客气。'],
    ],
  },

  // ───────────────────────── 第 2 天 ─────────────────────────
  {
    n: 2, it: 'Come ti chiami?', zh: '你叫什么名字？',
    goal: '会用 mi chiamo 报姓名、用 Come ti chiami? 问名字；会念字母名称并拼读名字；分清不送气的 p t 与浊音 b d。',
    scene: '旅馆里，你遇到同住的意大利背包客 Marco。你们互相问名字，他还请你把名字拼出来。',
    dlg: `
      Marco: Ciao! Come ti chiami? | 嗨！你叫什么名字？
      Li Ming: Mi chiamo Li Ming. E tu? | 我叫李明。你呢？
      Marco: Io mi chiamo Marco. Piacere! | 我叫马可。幸会！
      Li Ming: Piacere! | 幸会！
      Marco: Come si scrive Li Ming? | 李明怎么拼写？
      Li Ming: Elle, i, emme, i, enne, gi. | L、I、M、I、N、G。
      Marco: Perfetto! Grazie. | 太好了！谢谢。
    `,
    key: [0, 1],
    q: [
      ['Marco 一开始问了李明什么？', ['他叫什么名字', '他从哪里来', '他几岁'], 0, 'Come ti chiami? = 你叫什么名字？'],
      ['李明是怎么"拼写"自己名字的？', ['一个字母一个字母地念字母名称', '直接说了一遍', '写在纸上给对方看'], 0, '拼写时按字母名称念：elle, i, emme…'],
      ['Piacere 在这里是什么意思？', ['幸会（初次见面）', '请', '谢谢'], 0, 'Piacere = 很高兴认识你。'],
    ],
    vocab: `
      come ti chiami? | 你叫什么名字？（熟人） | CO-me ti CHIA-mi
      come si chiama? | 您叫什么名字？（正式） | CO-me si CHIA-ma
      mi chiamo | 我叫（+名字） | mi CHIA-mo
      io | 我 | IO
      tu | 你 | TU
      e | 和；那么 | E
      piacere | 幸会；很高兴认识你 | pia-CE-re
      come si scrive? | 怎么拼写？ | CO-me si SCRI-ve
      si scrive | 拼作（+单词） | si SCRI-ve
      perfetto | 太好了；完美 | per-FET-to
      alfabeto | 字母表 | al-fa-BE-to
      lettera | 字母 | LET-te-ra
      nome | 名字 | NO-me
      cognome | 姓 | co-GNO-me
    `,
    pron: {
      t: '辅音（一）：p t b d f v l m n',
      tips: [
        '意大利语的 p、t（以及 c/k）**不送气**：发音时手放在嘴前，不应感到明显的气流。汉语拼音的 b、d 恰好是不送气清音，所以 **p ≈ 拼音 b（爸）**，**t ≈ 拼音 d（大）**。',
        'b、d、g 是**浊音**：发音时喉咙要振动（用手摸喉咙能感到"嗡嗡"）。普通话里没有这类音，要刻意练习：想象在 b 之前先"嗡"一声。',
        'f 不振动，v 要振动，上齿都轻咬下唇。l 要清晰（舌尖抵上齿龈）；m、n 同汉语。',
        '对比练习：pasta / basta、tono / dono、vino / fino——每对词只差一个音，认真听区别。',
      ],
      drill: `
        pane | 面包
        pasta | 意面
        basta | 够了
        tono | 语调
        dono | 礼物
        vino | 葡萄酒
        fino | 直到；细的
        luna | 月亮
        mamma | 妈妈
        nonna | 奶奶
      `,
      twister: 'Tre tigri contro tre tigri. | 三只老虎对三只老虎。',
    },
    gram: [
      {
        h: 'mi chiamo / ti chiami / si chiama —— 叫什么名字',
        p: ['chiamarsi 字面意思是"称呼自己"。现在先把三个说法当作整体记住：'],
        t: [['人称', '说法', '意思'], ['io', 'mi chiamo', '我叫'], ['tu', 'ti chiami', '你叫'], ['lui / lei / Lei（您）', 'si chiama', '他 / 她 / 您叫']],
        eg: ['Mi chiamo Li Ming. | 我叫李明。', 'Come ti chiami? | 你叫什么名字？', 'Come si chiama? | 您叫什么名字？'],
      },
      {
        h: '字母名称与拼写',
        p: [
          '字母名称：A a · B bi · C ci · D di · E e · F effe · G gi · H acca · I i · L elle · M emme · N enne · O o · P pi · Q cu · R erre · S esse · T ti · U u · V vu · Z zeta。',
          '外来字母：J（i lunga）、K（cappa）、W（doppia vu）、X（ics）、Y（ipsilon）。两个相同字母要说 doppia + 字母：doppia t = tt。',
        ],
        eg: ['Come si scrive? | 怎么拼写？', 'Emme, a, erre, ci, o. | M、A、R、C、O（Marco）。'],
      },
      {
        h: '初次见面：Piacere!',
        p: ['初次见面说 Piacere!（幸会），对方也回 Piacere!，或者更热情的 Molto piacere!。通常同时握手并看着对方的眼睛。'],
        eg: ['Piacere! | 幸会！', 'Molto piacere! | 非常荣幸！'],
      },
    ],
    culture: '电话里或前台拼名字时，意大利人喜欢用**城市名**帮助拼写：**A come Ancona, B come Bologna, C come Como, M come Milano, R come Roma**。这是意大利特有的拼写字母表，听多了就会觉得很亲切。',
    speak: `
      Ciao! Come ti chiami? | 问对方叫什么名字（熟人）
      Mi chiamo Li Ming. Piacere! | 自我介绍并说幸会（换成你的名字）
      Come si scrive? | 请对方拼写名字
      M come Milano, R come Roma. | 用城市名来拼写：M 如米兰，R 如罗马
    `,
    wr: [
      '写出你的自我介绍：问好、说出名字、说幸会；再用字母名称把你的名字拼出来（拼写部分可以写成 elle, i, emme…）。',
      'Ciao! Mi chiamo Li Ming. Piacere!\nElle, i, emme, i, enne, gi.',
      '嗨！我叫李明。幸会！\nL、I、M、I、N、G。',
    ],
    quiz: [
      ['Come ti chiami? 的正确回答是：', ['Mi chiamo Anna.', 'Come stai?', 'Piacere, grazie.'], 0, 'chiamarsi 的第一人称：mi chiamo。'],
      ['向陌生人（用"您"）问名字，应该说：', ['Come ti chiami?', 'Come si chiama?', 'Come si scrive?'], 1, '熟人（tu）用 ti chiami；正式（Lei）用 si chiama。'],
      ['意大利语的 p、t 和汉语拼音哪组声母最接近？', ['拼音 p、t（送气）', '拼音 b、d（不送气）', '拼音 f、s'], 1, '意大利语 p、t 不送气，≈ 拼音 b、d。'],
      ['把 emme, a, erre, ci, o 拼成单词：', ['Marco', 'Mario', 'Mauro'], 0, 'm-a-r-c-o = Marco。'],
    ],
  },

  // ───────────────────────── 第 3 天 ─────────────────────────
  {
    n: 3, it: 'C e G: dolce o dura?', zh: 'C 和 G：软还是硬？',
    goal: '掌握 c / g 的软硬规则（ce ci / ca co cu / che chi）与不发音的 h；会读 sc；会说 Ho fame、Che cosa prendi?，并能读出一批常见词。',
    scene: '你和 Marco 在罗马街头散步，他饿了，想找东西吃。路上的词——ciao、cena、gelato、spaghetti——正好是练习 c 和 g 的好材料。',
    dlg: `
      Marco: Ciao, Li Ming! Hai fame? | 嗨，李明！你饿吗？
      Li Ming: Sì, ho fame! | 是的，我饿了！
      Marco: Che cosa prendi? Pesce o spaghetti? | 你吃什么？鱼还是意面？
      Li Ming: Prendo gli spaghetti. E poi un gelato! | 我要意面。然后再来一个冰淇淋！
      Marco: Buon appetito! | 祝你好胃口！
      Li Ming: Grazie! Anche a te! | 谢谢！你也是！
    `,
    key: [0, 2],
    q: [
      ['Marco 一开始问了李明什么？', ['饿不饿', '叫什么名字', '几点了'], 0, 'Hai fame? = 你饿吗？'],
      ['李明点了什么主食？', ['意面', '鱼', '披萨'], 0, 'Prendo gli spaghetti. 我要意面。'],
      ['李明最后还想要什么？', ['冰淇淋', '咖啡', '面包'], 0, 'un gelato = 一个冰淇淋。'],
    ],
    vocab: `
      ho fame | 我饿了 | o FA-me
      hai fame? | 你饿吗？ | ai FA-me
      che cosa | 什么 | ke CO-sa
      prendo | 我要（吃／喝）；我拿 | PREN-do
      prendi | 你要（吃／喝）；你拿 | PREN-di
      pesce | 鱼 | PE-sce
      spaghetti | 意面 | spa-GHET-ti
      gelato | 冰淇淋 | ge-LA-to
      cena | 晚餐 | CE-na
      cinema | 电影院 | CI-ne-ma
      giorno | 白天；一天 | GIOR-no
      gatto | 猫 | GAT-to
      buon appetito | 祝你好胃口 | buon ap-pe-TI-to
      anche a te | 你也是 | AN-che a TE
    `,
    pron: {
      t: 'c 和 g 的软与硬 · 不发音的 h · sc',
      tips: [
        '看后面的元音：**a o u 前是硬音**（c = /k/，g = /g/）；**e i 前是软音**（c = /tʃ/，g = /dʒ/）。口诀：软在 e、i，硬在 a、o、u。',
        '想在 e i 前保持**硬音**，中间加一个不发音的 **h**：che chi /ke ki/，ghe ghi /ge gi/（spaghetti、perché）。',
        '想在 a o u 前读**软音**，中间加一个不发音的 **i**：cia cio ciu、gia gio giu——这个 i 只起"软化"作用：ciao /tʃao/，giorno /ˈdʒorno/。',
        'sc 同理：sce sci 读 /ʃ/（≈ she 的 sh），sca sco scu 读 /sk/，加 h 的 sche schi 读 /ske ski/。',
        '**h 永远不发音**：ho = /ɔ/，hai = /ai/。它只用来区分词（ho "我有" ≠ o "或"）。',
      ],
      drill: `
        casa | 房子
        cena | 晚餐
        cinema | 电影院
        che | 什么
        chi | 谁
        ciao | 你好
        gatto | 猫
        gelato | 冰淇淋
        spaghetti | 意面
        giorno | 白天
        pesce | 鱼
        scusi | 劳驾
      `,
      twister: 'Ciao, che cosa cerchi? Cerco un cinema. | 嗨，你在找什么？我在找电影院。（练习句）',
    },
    gram: [
      {
        h: 'c 与 g 的"软硬"规则',
        p: ['口诀：**e、i 前软，a、o、u 前硬；想硬加 h，想软加 i。**'],
        t: [
          ['拼写', '读音', '例词'],
          ['ca co cu', '/ka ko ku/（硬）', 'casa, come, cuore'],
          ['ce ci', '/tʃe tʃi/（软）', 'cena, cinema'],
          ['che chi', '/ke ki/（硬）', 'che, chi'],
          ['cia cio ciu', '/tʃa tʃo tʃu/（软，i 不发音）', 'ciao, cioccolato'],
          ['ga go gu', '/ga go gu/（硬）', 'gatto, gusto'],
          ['ge gi', '/dʒe dʒi/（软）', 'gelato, gentile'],
          ['ghe ghi', '/ge gi/（硬）', 'spaghetti, ghiaccio'],
          ['gia gio giu', '/dʒa dʒo dʒu/（软，i 不发音）', 'giorno, giugno'],
        ],
      },
      {
        h: 'avere（有）：ho, hai, ha',
        p: [
          'avere 的前三个人称：io **ho**、tu **hai**、lui/lei **ha**。词首的 h 不发音。',
          '意大利语表达"饿、渴"用"有"：**ho fame**（字面：我有饥饿）、**ho sete**（我渴了）。',
        ],
        t: [['人称', 'avere', '例句'], ['io', 'ho', 'Ho fame.'], ['tu', 'hai', 'Hai sete?'], ['lui / lei', 'ha', 'Marco ha fame.']],
      },
      {
        h: '吃饭前后的客套话',
        p: ['开动前说 **Buon appetito!**，对方回 Grazie, altrettanto!（谢谢，你也一样）或 Anche a te!。'],
        eg: ['Buon appetito! | 祝你好胃口！', 'Grazie, altrettanto! | 谢谢，你也一样！'],
      },
    ],
    culture: '意大利人非常重视吃饭。一顿正式的餐通常按顺序上：**antipasto（前菜）→ primo（第一道：意面、米饭或汤）→ secondo（第二道：肉或鱼）→ contorno（配菜）→ dolce（甜点）→ caffè（咖啡）**。不一定每道都点，但这个节奏是意大利餐的灵魂。',
    speak: `
      Hai fame? | 问朋友：你饿吗？
      Sì, ho fame! | 回答：是的，我饿了！
      Che cosa prendi? | 问：你吃什么？
      Prendo un gelato, grazie. | 回答：我要一个冰淇淋，谢谢。
    `,
    wr: [
      '写一句话告诉对方你饿了，并说你想吃的东西（意面、鱼或冰淇淋，任选）。',
      'Ho fame! Prendo gli spaghetti e un gelato.',
      '我饿了！我要意面和一个冰淇淋。',
    ],
    quiz: [
      ['cena 里的 c 怎么读？', ['/k/（硬）', '/tʃ/（软，≈ ch）', '/s/'], 1, 'c 在 e 前读软音 /tʃ/。'],
      ['che 里的 h 怎么读？', ['读 /h/', '不发音，只是让 c 保持硬音', '读成汉语的 h'], 1, 'h 永远不发音；che = /ke/。'],
      ['gelato 里的 g 怎么读？', ['/g/', '/dʒ/（≈ j）', '不发音'], 1, 'g 在 e 前读软音 /dʒ/。'],
      ['ciao 里的 i 要不要单独发音？', ['不发音，只起软化 c 的作用', '要，读成独立的 /i/', '读成 /j/'], 0, 'cia = /tʃa/。'],
      ['Ho fame 里的 Ho 怎么读？', ['/ɔ/（h 不发音）', '/hɔ/', '/xɔ/'], 0, 'ho = /ɔ/。'],
    ],
  },

  // ───────────────────────── 第 4 天 ─────────────────────────
  {
    n: 4, it: 'Gnocchi e famiglia', zh: '特色音与双辅音',
    goal: '读准 gn、gli、z、qu 和双辅音；初步掌握大舌音 r；会在餐馆说 Prendo… / …, per favore 点餐。',
    scene: '傍晚，你和 Marco 走进一家比萨店。菜单上全是最让中文母语者头疼的词：gnocchi、lasagna、pizza、acqua……',
    dlg: `
      Cameriere: Buonasera! Che cosa prende? | 晚上好！您要点什么？
      Li Ming: Una pizza margherita, per favore. | 请给我一份玛格丽特披萨。
      Cameriere: E da bere? | 喝点什么？
      Li Ming: Acqua naturale, per favore. | 不带气的水，请。
      Marco: Io prendo gli gnocchi e una birra. | 我要团子和一杯啤酒。
      Cameriere: Subito! | 马上来！
    `,
    key: [0, 1],
    q: [
      ['李明点了什么吃的？', ['玛格丽特披萨', '团子', '千层面'], 0, 'Una pizza margherita.'],
      ['李明点了什么喝的？', ['不带气的水', '啤酒', '葡萄酒'], 0, 'Acqua naturale = 不带气的水。'],
      ['Marco 点的是：', ['团子和啤酒', '披萨和水', '意面和葡萄酒'], 0, 'gli gnocchi e una birra。'],
    ],
    vocab: `
      pizza | 披萨 | PIZ-za
      gnocchi | 团子（土豆面疙瘩） | GNOC-chi
      lasagna | 千层面 | la-SA-gna
      famiglia | 家庭 | fa-MI-glia
      figlio | 儿子 | FI-glio
      aglio | 大蒜 | A-glio
      acqua | 水 | AC-qua
      naturale | 不带气的 | na-tu-RA-le
      frizzante | 带气的 | frid-ZAN-te
      birra | 啤酒 | BIR-ra
      margherita | 玛格丽特（披萨） | mar-ghe-RI-ta
      cameriere | 服务员 | ca-me-RIE-re
      subito | 马上 | SU-bi-to
      da bere | 喝的 | da BE-re
    `,
    pron: {
      t: 'gn · gli · z · qu · 双辅音 · 大舌音 r',
      tips: [
        '**gn /ɲ/**：舌面贴住硬腭发鼻音，≈ 汉语"你"里的 n（再带一点 y）：gnocchi ≈ "尼奥-基"。它是**一个**音，不是 g + n。',
        '**gli /ʎ/**：舌面贴硬腭发 l，听起来像 "lyi"：famiglia ≈ fa-MI-lya。gli 后面再跟元音时，i 不发音。',
        '**z** 有 /ts/（≈ 汉语 z"资"）和 /dz/（它的浊音）两种读法，没有简单规律：pizza /ts/，zero /dz/。初学者先都读 /ts/ 也能被听懂。',
        '**qu /kw/** ≈ "夸"；acqua（cqu）里的 c 要读得更长。',
        '**双辅音**要"憋住"约两倍时长再放开，前面的元音反而变短：pala ≠ palla，caro ≠ carro。汉语里没有这种对立，先录音听听自己是不是读成了单辅音。',
        '**r 大舌音**：舌尖轻抵上齿龈后方，气流带动舌尖颤动。入门窍门：先读 "tre, dre"，或把英语 butter 的 tt 弹音找出来，再延长成颤音。',
      ],
      drill: `
        gnocchi | 团子
        lasagna | 千层面
        bagno | 浴室
        famiglia | 家庭
        figlio | 儿子
        pizza | 披萨
        zero | 零
        acqua | 水
        pala | 铲子
        palla | 球
        caro | 亲爱的；贵的
        carro | 货车
        Roma | 罗马
        birra | 啤酒
      `,
      twister: 'Gli gnocchi della nonna sono buonissimi. | 奶奶做的团子好吃极了。（练习句）',
    },
    gram: [
      {
        h: '特色读音一览',
        p: ['这些是中文母语者最容易读错的地方，请反复听、反复跟读。'],
        t: [
          ['拼写', '读音', '例词'],
          ['gn', '/ɲ/', 'gnocchi, lasagna'],
          ['gli', '/ʎ/', 'famiglia, figlio'],
          ['qu', '/kw/', 'acqua, quattro'],
          ['z / zz', '/ts/ 或 /dz/', 'pizza, zero'],
          ['双辅音（tt、rr、pp…）', '长辅音', 'birra, palla, sette'],
        ],
      },
      {
        h: '点餐的基本说法',
        p: ['想要什么，用 **Prendo + 食物**（我要……），或者直接说 **食物 + per favore**。服务员会问 Che cosa prende?（您要点什么？）。'],
        eg: [
          'Che cosa prende? | 您要点什么？',
          'Prendo una pizza. | 我要一份披萨。',
          'Una birra, per favore. | 请给我一杯啤酒。',
          'Naturale o frizzante? | 不带气的还是带气的？',
        ],
      },
      {
        h: 'un / una：一个',
        p: ['点东西时你会听到 **un**（阳性）和 **una**（阴性）：un gelato, una pizza。冠词的完整规则在第 8 天。'],
      },
    ],
    culture: '在意大利餐馆，**水不是免费的**：服务员会问 Naturale o frizzante?（静水还是气泡水），按瓶收费。账单上常有 **coperto**（餐位费，每人一两欧元）——这不是小费，是正常收费。',
    speak: `
      Che cosa prende? | 服务员问你要什么
      Una pizza margherita, per favore. | 点一份玛格丽特披萨
      Acqua naturale, per favore. | 点不带气的水
      Io prendo gli gnocchi e una birra. | 点团子和啤酒
    `,
    wr: [
      '你和朋友在比萨店点餐，写出你们的订单：一份披萨、一份团子、一瓶水、一杯啤酒。',
      'Una pizza margherita e gli gnocchi.\nAcqua naturale e una birra, per favore.',
      '一份玛格丽特披萨和团子。请再给一瓶不带气的水和一杯啤酒。',
    ],
    quiz: [
      ['gnocchi 里的 gn 应该怎么读？', ['分别读 /g/ 和 /n/', '舌面抵硬腭的鼻音 /ɲ/，≈ "你"', '只读 /n/'], 1, 'gn 是一个音：/ɲ/。'],
      ['famiglia 里的 gli 应该怎么读？', ['/gli/', '/ʎ/（舌面贴硬腭的 l）', '/li/'], 1, 'gli = /ʎ/。'],
      ['下面哪一对词只靠辅音长短区分？', ['pala / palla', 'pizza / pasta', 'casa / cena'], 0, 'pala（铲子）/ palla（球）：ll 是长辅音。'],
      ['acqua 的 qu 读作：', ['/kw/（≈ 夸）', '/k/', '/ku/ 两个独立音节'], 0, 'qu = /kw/。'],
      ['服务员问 Naturale o frizzante?，是在问：', ['要不要加糖', '水要不带气的还是带气的', '要不要加冰'], 1, 'naturale = 无气；frizzante = 有气。'],
    ],
  },

  // ───────────────────────── 第 5 天 ─────────────────────────
  {
    n: 5, it: 'Accento e intonazione', zh: '重音与语调',
    goal: '掌握"重音在倒数第二个音节"的默认规则与重音符号；分清陈述、疑问的语调；会问 Parli italiano? 并回答 Un po\'；听不懂时会说 Non capisco。',
    scene: '在机场到达厅，你向一位工作人员求助，对方想先确认你会不会说意大利语。',
    dlg: `
      Li Ming: Buongiorno! Scusi, parla inglese? | 早上好！劳驾，您会说英语吗？
      Impiegato: Un po'. E Lei, parla italiano? | 会一点。您会说意大利语吗？
      Li Ming: Un po'. Parlo cinese e inglese. | 一点点。我会说中文和英语。
      Impiegato: Molto bene! | 很好！
      Li Ming: Più lentamente, per favore. | 请说慢一点。
      Impiegato: Certo! | 当然！
    `,
    key: [0, 2],
    q: [
      ['李明先问对方会不会说什么语言？', ['英语', '意大利语', '法语'], 0, 'Parla inglese? = 您会说英语吗？'],
      ['李明说自己会说哪些语言？', ['中文和英语', '意大利语和法语', '只会中文'], 0, 'Parlo cinese e inglese.'],
      ['李明最后请对方怎么说话？', ['说慢一点', '说大声一点', '再说一遍'], 0, 'Più lentamente = 更慢地。'],
    ],
    vocab: `
      parlare | 说（语言）；说话 | par-LA-re
      parlo | 我说 | PAR-lo
      parli | 你说 | PAR-li
      parla | 您说；他／她说 | PAR-la
      italiano | 意大利语；意大利人 | i-ta-LIA-no
      inglese | 英语 | in-GLE-se
      cinese | 中文；中国人 | ci-NE-se
      un po' | 一点点 | un PÒ
      molto | 很；非常 | MOL-to
      lingua | 语言 | LIN-gua
      più lentamente | 更慢地 | piu len-ta-MEN-te
      certo | 当然 | CER-to
      non capisco | 我不明白 | non ca-PI-sco
      capisco | 我明白 | ca-PI-sco
    `,
    pron: {
      t: '重音与语调',
      tips: [
        '**默认规则：重音落在倒数第二个音节**：CA-sa、i-ta-LIA-no、buon-GIOR-no。',
        '最后一个音节带**重音符号**（à è ì ò ù）时，重音在末尾：cit-TÀ、caf-FÈ、per-CHÉ。这是唯一"必须写出来"的重音。',
        '少数词重音在**倒数第三个音节**（te-LE-fo-no、NU-me-ro、MU-si-ca）。本课程的词汇表会用大写标出，请跟着听、跟着记。',
        '三种语调：陈述句句末**下降**（Parlo cinese.↘）；是非疑问句句末**上扬**（Parli italiano?↗）；特殊疑问句（Come ti chiami?）整体下降。',
        '重音错了，对方可能听不懂；语调错了，陈述句会被当成问句——语调和发音同样重要。',
      ],
      drill: `
        città | 城市
        caffè | 咖啡
        università | 大学
        perché | 为什么；因为
        lunedì | 星期一
        papà | 爸爸
        telefono | 电话
        numero | 数字；号码
        musica | 音乐
      `,
    },
    gram: [
      {
        h: '重音的三种位置',
        t: [
          ['位置', '怎么识别', '例词'],
          ['最后一个音节', '带重音符号 à è ì ò ù', 'città, caffè, perché'],
          ['倒数第二（最常见）', '默认，不标记', 'casa, italiano, buongiorno'],
          ['倒数第三（少数）', '靠记忆（词典与本课词表标出）', 'telefono, numero, musica'],
        ],
      },
      {
        h: '动词变位：parlare（说）',
        p: ['意大利语动词随人称变形，所以主语 io、tu 常常**省略**：说 Parlo cinese 而不是 Io parlo cinese。需要强调对比时才加（Io parlo cinese, tu parli inglese）。parlare 是规则的 -are 动词：词干 parl- + 词尾。'],
        t: [
          ['人称', '变位', '例句'],
          ['io', 'parlo', 'Parlo cinese.'],
          ['tu', 'parli', 'Parli italiano?'],
          ['lui / lei / Lei', 'parla', 'Parla inglese?'],
          ['noi', 'parliamo', 'Parliamo italiano.'],
          ['voi', 'parlate', 'Parlate cinese?'],
          ['loro', 'parlano', 'Parlano inglese.'],
        ],
      },
      {
        h: 'non —— 否定',
        p: ['否定句在动词前加 **non**：Parlo italiano → Non parlo italiano。Non capisco = 我不明白。'],
        eg: ['Non parlo italiano. | 我不会说意大利语。', 'Non capisco. | 我不明白。', "Parlo un po' di italiano. | 我会说一点意大利语。"],
      },
    ],
    culture: '意大利人说话时语调起伏大，常常伴随手势。如果你说话太平，可能显得冷淡；多模仿——语调和手势都是意大利语的一部分。听不懂时放心说 **Non capisco** 或 **Più lentamente, per favore**——意大利人通常很愿意放慢速度、帮你一把。',
    speak: `
      Parla inglese? | 问对方会不会说英语（正式）
      Parli italiano? | 用上扬语调问朋友会不会说意大利语
      Parlo cinese e un po' di italiano. | 说：我会说中文和一点意大利语
      Non capisco. Più lentamente, per favore. | 说：我听不懂，请说慢一点
    `,
    wr: [
      '写出你自己的语言能力：你会说哪些语言？你的意大利语怎么样？并请对方说慢一点。',
      "Parlo cinese e inglese. Parlo un po' di italiano.\nPiù lentamente, per favore.",
      '我会说中文和英语，也会说一点意大利语。请说慢一点。',
    ],
    quiz: [
      ['telefono 的重音在哪一个音节？', ['te-LE-fo-no（倒数第三）', 'te-le-FO-no', 'te-le-fo-NO'], 0, 'telefono 是少数"倒数第三音节重音"的词。'],
      ['città 为什么要写 à？', ['表示重音在最后一个音节', '表示 a 要读长一点', '没有特别含义'], 0, '重音符号表示末音节重读。'],
      ['Parli italiano? 句末语调应该：', ['上扬', '下降', '不变'], 0, '是非疑问句句末上扬。'],
      ['对朋友（tu）说"你说中文吗？"，用：', ['Parli cinese?', 'Parla cinese?', 'Parlo cinese?'], 0, 'tu → -i；Lei → -a；io → -o。'],
      ['Non capisco 的意思是：', ['我不明白', '我不饿', '我不叫……'], 0, 'capire = 明白；non + 动词 = 否定。'],
    ],
  },

  // ───────────────────────── 第 6 天 ─────────────────────────
  {
    n: 6, it: 'Uno, due, tre…', zh: '数字 0–20',
    goal: '会数 0–20 并能听懂；会问答年龄和电话号码；掌握 11–19 的构词规律。',
    scene: '在旅馆前台登记时，Giulia 问你的年龄和电话号码，你们互相交换联系方式。',
    dlg: `
      Giulia: Quanti anni hai? | 你几岁了？
      Li Ming: Ho venti anni. E tu? | 我二十岁。你呢？
      Giulia: Io ho diciotto anni. Qual è il tuo numero di telefono? | 我十八岁。你的电话号码是多少？
      Li Ming: Il mio numero è tre, tre, sette, uno, due, quattro, cinque, sei. | 我的号码是 3、3、7、1、2、4、5、6。
      Giulia: Tre, tre, sette, uno, due, quattro, cinque, sei. Giusto? | 3、3、7、1、2、4、5、6。对吗？
      Li Ming: Sì, giusto! | 对，没错！
    `,
    key: [0, 1],
    q: [
      ['Giulia 多大？', ['18 岁', '20 岁', '19 岁'], 0, 'diciotto = 18。'],
      ['李明几岁？', ['20 岁', '18 岁', '15 岁'], 0, 'venti = 20。'],
      ['李明的电话号码以什么数字开头？', ['3、3、7', '3、7、7', '7、3、3'], 0, 'tre, tre, sette。'],
    ],
    vocab: `
      zero | 零 | DZE-ro
      uno | 一 | U-no
      due | 二 | DU-e
      tre | 三 | TRE
      quattro | 四 | QUAT-tro
      cinque | 五 | CIN-que
      sei | 六 | SEI
      sette | 七 | SET-te
      otto | 八 | OT-to
      nove | 九 | NO-ve
      dieci | 十 | DIE-ci
      undici | 十一 | UN-di-ci
      dodici | 十二 | DO-di-ci
      tredici | 十三 | TRE-di-ci
      quattordici | 十四 | quat-TOR-di-ci
      quindici | 十五 | QUIN-di-ci
      sedici | 十六 | SE-di-ci
      diciassette | 十七 | di-cias-SET-te
      diciotto | 十八 | di-CIOT-to
      diciannove | 十九 | di-cian-NO-ve
      venti | 二十 | VEN-ti
      quanti anni hai? | 你几岁？ | QUAN-ti AN-ni AI
      ho venti anni | 我二十岁 | o VEN-ti AN-ni
      numero di telefono | 电话号码 | NU-me-ro di te-LE-fo-no
      giusto | 对的；正确的 | GIU-sto
    `,
    pron: {
      t: '数字里的发音难点',
      tips: [
        '**sette、otto** 有双辅音 tt：憋住再放。**due** 是两个音节（DU-e）；**sei** 读 /sɛi/，别读成英语 say。',
        '**tre** 的 r 是颤音；**-dici**（undici、dodici…）里的 c 在 i 前是软音 /tʃ/：UN-di-tʃi。',
        '**cinque** /ˈtʃiŋkwe/：c 在 i 前是软音，qu = /kw/。',
        '**11–16** 的规律是"数字 + dici（十）"：un-dici、do-dici、tre-dici、quattor-dici、quin-dici、se-dici；**17–19** 反过来是"dici + 数字"：dicias-sette、dici-otto、dician-nove。',
        '重音：quattordici 在 TOR；diciassette 在 SET；diciotto 在 CIOT；diciannove 在 NO；其余 11–16 都在第一个音节。',
      ],
      drill: `
        uno, due, tre | 一、二、三
        quattro, cinque, sei | 四、五、六
        sette, otto, nove, dieci | 七、八、九、十
        undici, dodici, tredici | 十一、十二、十三
        quattordici, quindici, sedici | 十四、十五、十六
        diciassette, diciotto, diciannove, venti | 十七、十八、十九、二十
      `,
    },
    gram: [
      {
        h: '数字 0–20',
        t: [
          ['数字', '意大利语', '数字', '意大利语'],
          ['0', 'zero', '11', 'undici'],
          ['1', 'uno', '12', 'dodici'],
          ['2', 'due', '13', 'tredici'],
          ['3', 'tre', '14', 'quattordici'],
          ['4', 'quattro', '15', 'quindici'],
          ['5', 'cinque', '16', 'sedici'],
          ['6', 'sei', '17', 'diciassette'],
          ['7', 'sette', '18', 'diciotto'],
          ['8', 'otto', '19', 'diciannove'],
          ['9', 'nove', '20', 'venti'],
          ['10', 'dieci', '', ''],
        ],
      },
      {
        h: '问年龄：用"有"',
        p: ['意大利语说"我有 X 岁"（用 avere），而不是"我是 X 岁"。'],
        eg: ['Quanti anni hai? | 你几岁？', 'Ho venti anni. | 我二十岁。', 'Quanti anni ha? | 您／他／她几岁？'],
      },
      {
        h: '读电话号码',
        p: [
          '意大利手机号常见格式是 3xx xxx xxxx，读的时候一个数字一个数字地读，或两位两位地读。座机以 0 开头（如 06 是罗马）。',
          '紧急电话：**112**（统一紧急号码）、**118**（救护车）、**113**（警察）。',
        ],
      },
    ],
    culture: '意大利使用欧元（euro）。注意数字写法：意大利用**逗号**当小数点（1,50 € = 一点五零欧元），用**点号**做千位分隔（1.000 = 一千），这和中文、英语的习惯相反，看价格时要留心。',
    speak: `
      Quanti anni hai? | 问朋友几岁
      Ho venti anni. | 说出你的年龄（换成你自己的）
      Il mio numero è tre, tre, sette, uno, due, quattro, cinque, sei. | 报出一串电话号码
      Giusto? | 向对方确认：对吗？
    `,
    wr: [
      '写出你的年龄；再把紧急电话 112、118、113 用意大利语的数字拼写出来。',
      'Ho venti anni.\nUno, uno, due. Uno, uno, otto. Uno, uno, tre.',
      '我二十岁。112、118、113。',
    ],
    quiz: [
      ['diciassette 是多少？', ['17', '70', '7'], 0, 'dicias-sette = 十 + 七 = 17。'],
      ['Ho quindici anni 的意思是：', ['我十五岁', '我有十五本书', '我五岁'], 0, 'quindici = 15。'],
      ['意大利语说年龄用哪个动词？', ['avere（有）', 'essere（是）', 'fare（做）'], 0, 'Ho venti anni = 我有二十岁。'],
      ['看到价格 1,50 € 应该读作：', ['一欧元五十分', '一千五百欧元', '十五欧元'], 0, '意大利用逗号作小数点。'],
      ['sette 里的 tt 要：', ['憋住再放，读得更长', '读成单个 t', '不发音'], 0, '双辅音要读成长辅音。'],
    ],
  },

  // ───────────────────────── 第 7 天 ─────────────────────────
  {
    n: 7, it: 'Sono cinese', zh: '我是中国人',
    goal: '会用 essere 的现在时介绍自己（国籍、城市、职业）；会问答 Di dove sei? 和 Che lavoro fai?；了解国籍词的阴阳性变化。',
    scene: '旅馆的公共休息室里，来自世界各地的旅客互相自我介绍。你和 Marco 聊了起来。',
    dlg: `
      Marco: Ciao! Di dove sei? | 嗨！你是哪里人？
      Li Ming: Sono cinese, di Shanghai. E tu? | 我是中国人，上海人。你呢？
      Marco: Io sono italiano, di Milano. | 我是意大利人，米兰人。
      Li Ming: Che lavoro fai? | 你做什么工作？
      Marco: Sono studente. E tu? | 我是学生。你呢？
      Li Ming: Io sono ingegnere. | 我是工程师。
      Marco: Che bello! Benvenuto in Italia! | 太好了！欢迎来到意大利！
    `,
    key: [0, 1],
    q: [
      ['李明来自哪里？', ['上海', '北京', '米兰'], 0, 'Sono cinese, di Shanghai.'],
      ['Marco 的职业是？', ['学生', '工程师', '医生'], 0, 'Sono studente.'],
      ['李明的职业是？', ['工程师', '学生', '老师'], 0, 'Io sono ingegnere.'],
    ],
    vocab: `
      essere | 是；在 | ES-se-re
      sono | 我是；他们是 | SO-no
      sei | 你是 | SEI
      è | 他／她／您是 | È
      di dove sei? | 你是哪里人？ | di DO-ve SEI
      italiana | 意大利人（女） | i-ta-LIA-na
      americano | 美国人（男） | a-me-ri-CA-no
      francese | 法国人；法语 | fran-CE-se
      studente | 学生 | stu-DEN-te
      ingegnere | 工程师 | in-ge-GNE-re
      che lavoro fai? | 你做什么工作？ | ke la-VO-ro FAI
      lavoro | 工作 | la-VO-ro
      benvenuto | 欢迎（对男性说） | ben-ve-NU-to
      che bello! | 太好了！太棒了！ | ke BEL-lo
      Cina | 中国 | CI-na
      Italia | 意大利 | i-TA-lia
    `,
    pron: {
      t: '国名与城市名',
      tips: [
        '城市名几乎都符合前几天的规则：Firenze 的 ce 是软音 /tʃe/；Bologna 的 gn 是 /ɲ/；Genova 的 ge 是 /dʒe/；Venezia 的 zi 是 /tsi/。',
        '重音：Milano → mi-LA-no，Napoli → NA-po-li（倒数第三），Torino → to-RI-no，Roma → RO-ma。',
        '国名与国籍：Italia / italiano；Cina / cinese；注意 **Italia 的重音在 TA**。',
      ],
      drill: `
        Roma | 罗马
        Milano | 米兰
        Napoli | 那不勒斯
        Firenze | 佛罗伦萨
        Venezia | 威尼斯
        Torino | 都灵
        Bologna | 博洛尼亚
        Genova | 热那亚
        Cina | 中国
        Italia | 意大利
      `,
    },
    gram: [
      {
        h: 'essere（是）的现在时',
        p: ['essere 是最重要的不规则动词。sono 既是"我是"也是"他们是"，靠主语和上下文区分。'],
        t: [
          ['人称', 'essere', '例句'],
          ['io', 'sono', 'Sono cinese.'],
          ['tu', 'sei', 'Sei italiano?'],
          ['lui / lei / Lei', 'è', 'È studente.'],
          ['noi', 'siamo', 'Siamo amici.'],
          ['voi', 'siete', 'Siete cinesi?'],
          ['loro', 'sono', 'Sono italiani.'],
        ],
      },
      {
        h: '国籍与职业：阴阳性',
        p: ['以 -o 结尾的词，女性改成 -a。以 -e 结尾的词男女同形（cinese），有的另有女性形式（studente → studentessa）。**职业前通常不加冠词**：Sono studente.'],
        t: [
          ['男', '女', '意思'],
          ['italiano', 'italiana', '意大利人'],
          ['cinese', 'cinese', '中国人'],
          ['studente', 'studentessa', '学生'],
          ['ingegnere', 'ingegnere', '工程师'],
          ['americano', 'americana', '美国人'],
        ],
      },
      {
        h: 'Di dove sei? —— 你是哪里人',
        p: ['回答城市用 **di + 城市**：Sono di Shanghai。回答国籍用 **essere + 国籍形容词**：Sono cinese。'],
        eg: ['Di dove sei? | 你是哪里人？', 'Sono di Shanghai. | 我是上海人。', 'Sono cinese. | 我是中国人。'],
      },
    ],
    culture: '在意大利语里，**国籍、语言、星期、月份都不大写**（italiano、cinese、lunedì、marzo）。另外 italiano 既指"意大利人"，也指"意大利语"，靠上下文区分。',
    speak: `
      Di dove sei? | 问朋友来自哪里
      Sono cinese, di Shanghai. | 回答：我是中国人，上海人（换成你的城市）
      Che lavoro fai? | 问对方做什么工作
      Sono studente. | 回答你的职业（换成你自己的）
    `,
    wr: [
      '用 3–4 句话介绍自己：名字、国籍、城市、职业。（换成你自己的信息）',
      'Ciao! Mi chiamo Li Ming. Sono cinese, di Shanghai.\nSono ingegnere. Piacere!',
      '嗨！我叫李明。我是中国人，上海人。我是工程师。幸会！',
    ],
    quiz: [
      ['"我是学生"应该说：', ['Sono studente.', 'Ho studente.', 'Sei studente.'], 0, 'essere 第一人称 = sono；职业前不加冠词。'],
      ['Sei italiano? 是在问：', ['你是意大利人吗？', '我是意大利人吗？', '他是意大利人吗？'], 0, 'sei = tu 的 essere。'],
      ['女性意大利人是：', ['italiana', 'italiano', 'italiane'], 0, '-o → -a。'],
      ['Di dove sei? 的回答可以是：', ['Sono di Milano.', 'Ho venti anni.', 'Mi chiamo Marco.'], 0, 'di + 城市。'],
      ['italiano 在意大利语里：', ['既指"意大利人"也指"意大利语"，且不大写', '只指意大利人，要大写', '只指语言'], 0, '国籍、语言都小写。'],
    ],
  },

  // ───────────────────────── 第 8 天 ─────────────────────────
  {
    n: 8, it: 'Il, la, un, una', zh: '冠词与名词',
    goal: '会用定冠词 il / lo / la / l\' / i / gli / le 和不定冠词 un / uno / una / un\'；掌握名词的阴阳性与单复数规律；会用 Che cos\'è? 和 È un / una… 指认物品。',
    scene: '你在罗马的小市场里，指着摊位上的东西问摊主 Che cos\'è?，学着说出它们的名字。',
    dlg: `
      Li Ming: Scusi, che cos'è? | 劳驾，这是什么？
      Venditore: È un formaggio. Si chiama pecorino. | 这是一种奶酪，叫佩科里诺。
      Li Ming: E questi? | 那这些呢？
      Venditore: Sono i pomodori. | 是番茄。
      Li Ming: E queste? | 那这些呢？
      Venditore: Sono le mele. | 是苹果。
      Li Ming: Prendo il formaggio e le mele, grazie. | 我要这块奶酪和苹果，谢谢。
    `,
    key: [0, 6],
    q: [
      ['第一样东西是什么？', ['一种奶酪', '番茄', '苹果'], 0, 'È un formaggio.'],
      ['"i pomodori"是什么？', ['番茄', '苹果', '面包'], 0, 'pomodori = 番茄。'],
      ['李明最后买了什么？', ['奶酪和苹果', '番茄和面包', '只买了奶酪'], 0, 'il formaggio e le mele。'],
    ],
    vocab: `
      il pane | 面包 | il PA-ne
      il libro | 书 | il LI-bro
      il tavolo | 桌子 | il TA-vo-lo
      il formaggio | 奶酪 | il for-MAG-gio
      il pomodoro | 番茄 | il po-mo-DO-ro
      la mela | 苹果 | la ME-la
      la casa | 房子；家 | la CA-sa
      l'amico | 朋友（男） | l'a-MI-co
      l'amica | 朋友（女） | l'a-MI-ca
      lo studente | 学生（男） | lo stu-DEN-te
      gli spaghetti | 意面 | gli spa-GHET-ti
      che cos'è? | 这是什么？ | ke co-SÈ
      ecco | 喏；这就是 | EC-co
      questo | 这个 | QUE-sto
    `,
    pron: {
      t: '冠词与连读 · l\' 省音',
      tips: [
        '冠词和后面的名词要**连着读成一个整体**：il libro 读作 illibro，la mela 读作 lamela，不要在冠词后停顿。',
        '**撇号表示省音**：l\'amico 读作 la-MI-co 的连读 lamico；un\'amica 读作 unamica。',
        '**lo / gli** 出现在 s+辅音、z、gn、ps 开头的词前：lo studente、lo zaino、gli gnocchi、gli spaghetti。gli 读 /ʎi/（舌面贴硬腭）。',
      ],
      drill: `
        il libro | 书
        la casa | 房子
        l'amico | 朋友（男）
        l'amica | 朋友（女）
        lo studente | 学生
        gli gnocchi | 团子
        gli spaghetti | 意面
        le mele | 苹果（复数）
        i pomodori | 番茄（复数）
      `,
    },
    gram: [
      {
        h: '名词的性别',
        p: [
          '意大利语的名词只有**阳性**（m）和**阴性**（f）。多数以 **-o** 结尾的是阳性，以 **-a** 结尾的是阴性，以 **-e** 结尾的两种都有，要跟着冠词记：il pane（m）、la notte（f）。',
          '指人时按自然性别：il ragazzo（男孩）/ la ragazza（女孩）。**学新词时请连冠词一起记：il pane，而不是 pane。**',
        ],
      },
      {
        h: '定冠词（特指，相当于 the）',
        t: [
          ['', '单数', '复数'],
          ['阳性（普通）', 'il libro', 'i libri'],
          ['阳性（s+辅音、z、gn、ps）', 'lo studente / lo zaino', 'gli studenti / gli zaini'],
          ['阳性（元音开头）', "l'amico", 'gli amici'],
          ['阴性（辅音开头）', 'la casa', 'le case'],
          ['阴性（元音开头）', "l'amica", 'le amiche'],
        ],
      },
      {
        h: '不定冠词（泛指，相当于 a / an）',
        t: [
          ['', '阳性', '阴性'],
          ['普通', 'un libro', 'una casa'],
          ['s+辅音、z 等', 'uno studente / uno zaino', '—'],
          ['元音开头', 'un amico', "un'amica"],
        ],
      },
      {
        h: '复数规则',
        p: ['**-o → -i**（libro → libri）；**-a → -e**（casa → case）；**-e → -i**（pane → pani，notte → notti）。-ca / -ga 结尾的阴性名词，复数要加 h 保持硬音：amica → amiche，riga → righe。'],
        eg: ["Che cos'è? | 这是什么？", 'È un libro. | 这是一本书。', 'È una mela. | 这是一个苹果。', 'Ecco il pane! | 面包在这儿！'],
      },
    ],
    culture: '意大利人逛露天市场（mercato）很有讲究：不少摊位更希望**由摊主帮你挑**水果蔬菜；超市里取蔬果通常要先戴一次性手套。后面第 37 天会专门学买菜。',
    speak: `
      Scusi, che cos'è? | 指着东西问：这是什么？
      È un formaggio. | 回答：这是一块奶酪
      Prendo il pane e le mele, grazie. | 说：我要面包和苹果，谢谢
      Ecco il libro! | 递东西给对方：书在这儿！
    `,
    wr: [
      '写出 5 个你身边的物品，并加上正确的冠词（il / la / un / una…）。',
      'Il libro, la casa, il tavolo,\nla mela, il pane.',
      '书，房子，桌子，苹果，面包。',
    ],
    quiz: [
      ['"房子"是阴性，"这所房子"（特指）是：', ['la casa', 'il casa', 'lo casa'], 0, 'casa 是阴性，用 la。'],
      ['阳性复数、以 gn 开头的 gnocchi，定冠词是：', ['gli', 'i', 'le'], 0, 'gn / s+辅音 / z 开头的阳性复数用 gli。'],
      ["l'amica 的复数是：", ['le amiche', 'le amice', 'gli amici'], 0, '-ca → -che，保持硬音 /k/。'],
      ['"一个苹果"应该说：', ['una mela', 'un mela', 'uno mela'], 0, 'mela 是阴性，用 una。'],
      ['libro 的复数是：', ['libri', 'libre', 'libros'], 0, '-o → -i。'],
    ],
  },

  // ───────────────────────── 第 9 天 ─────────────────────────
  {
    n: 9, it: 'Al bar', zh: '在咖啡吧',
    goal: '会在意大利的咖啡吧点咖啡和早餐；会说 Vorrei… / Prendo… / Quant\'è?；了解站着喝咖啡的规矩和常见咖啡种类。',
    scene: '早上八点，你走进罗马街角的咖啡吧（bar）。吧台后的咖啡师招呼你，这是你在意大利的第一顿早餐。',
    dlg: `
      Barista: Buongiorno! Dica! | 早上好！请说！
      Li Ming: Buongiorno! Vorrei un cappuccino e un cornetto, per favore. | 早上好！我想要一杯卡布奇诺和一个牛角包。
      Barista: Alla crema o alla marmellata? | 奶油馅的还是果酱馅的？
      Li Ming: Alla marmellata, grazie. | 果酱的，谢谢。
      Barista: Ecco a Lei! Altro? | 给您！还要别的吗？
      Li Ming: No, grazie. Quant'è? | 不用了，谢谢。多少钱？
      Barista: Tre euro e cinquanta. | 三欧元五十分。
      Li Ming: Ecco. Grazie e buona giornata! | 给您。谢谢，祝您今天愉快！
      Barista: Altrettanto! Arrivederci! | 您也一样！再见！
    `,
    key: [1, 5],
    q: [
      ['李明点了什么？', ['卡布奇诺和牛角包', '浓缩咖啡和面包', '茶和蛋糕'], 0, 'un cappuccino e un cornetto。'],
      ['牛角包是什么馅的？', ['果酱', '奶油', '巧克力'], 0, 'Alla marmellata。'],
      ['一共多少钱？', ['3.50 欧元', '2.50 欧元', '5 欧元'], 0, 'tre euro e cinquanta = 3,50 €。'],
    ],
    vocab: `
      vorrei | 我想要（礼貌） | vor-REI
      dica! | 请说！（店员招呼） | DI-ca
      un caffè | 一杯浓缩咖啡 | un caf-FÈ
      un cappuccino | 一杯卡布奇诺 | un cap-puc-CI-no
      un cornetto | 一个牛角包 | un cor-NET-to
      alla crema | 奶油馅的 | AL-la CRE-ma
      alla marmellata | 果酱馅的 | AL-la mar-mel-LA-ta
      altro? | 还要别的吗？ | AL-tro
      quant'è? | 一共多少钱？ | quan-TÈ
      euro | 欧元 | EU-ro
      ecco a Lei | 给您（递东西时） | EC-co a LEI
      buona giornata | 祝您今天愉快 | buo-na gior-NA-ta
      altrettanto | 您也一样 | al-tret-TAN-to
      lo scontrino | 小票；收据 | lo scon-TRI-no
    `,
    pron: {
      t: '咖啡吧词汇里的难点',
      tips: [
        '**caffè**：-è 带重音，重音在最后；ff 是双辅音：caf-FÈ。',
        '**cappuccino** 有两个双辅音（pp、cc）：cap-puc-CI-no；cci 要把软音 /tʃ/ 拉长。',
        '**marmellata** 里的 ll 要读长；**crema** 的 cr 要把 r 清楚地颤一下。',
        '**cinquanta** /tʃinˈkwanta/：c 在 i 前是软音，qu = /kw/。',
      ],
      drill: `
        caffè | 咖啡
        cappuccino | 卡布奇诺
        cornetto | 牛角包
        marmellata | 果酱
        latte | 牛奶
        tè | 茶
        spremuta | 鲜榨果汁
        acqua | 水
        zucchero | 糖
      `,
    },
    gram: [
      {
        h: 'Vorrei —— 礼貌地说"我想要"',
        p: ['**Vorrei**（我想要……）比 Voglio（我要……）礼貌得多。点单、提请求都用 **Vorrei + 名词 / 动词原形**；直接说 Voglio 听起来像命令。'],
        eg: [
          'Vorrei un caffè, per favore. | 我想要一杯咖啡。',
          'Vorrei un cappuccino e un cornetto. | 我想要一杯卡布奇诺和一个牛角包。',
          "Vorrei un'acqua. | 我想要一杯水。",
        ],
      },
      {
        h: '点单的三种句型',
        t: [
          ['句型', '例句', '语气'],
          ['Vorrei + 名词', 'Vorrei un caffè.', '礼貌（最推荐）'],
          ['Prendo + 名词', 'Prendo un cappuccino.', '中性，常用'],
          ['名词 + per favore', 'Un caffè, per favore.', '最简单'],
        ],
      },
      {
        h: '说价格：Quant\'è?',
        p: ['价格怎么说：**tre euro e cinquanta**（3.50 欧元）。"e" 连接欧元和欧分。'],
        eg: ["Quant'è? | 一共多少钱？", 'Due euro e dieci. | 两欧元十分。', 'Un euro e venti. | 一欧元二十分。'],
      },
    ],
    culture: '**在意大利的 bar 里，站着喝咖啡（al banco）又便宜又地道**：一杯 caffè（浓缩）通常一欧元出头；坐下来（al tavolo）要加服务费，价格更高。早上常喝 cappuccino 配 cornetto；**中午以后、尤其是饭后，意大利人一般不点 cappuccino**——这被认为是"奇怪的搭配"。很多 bar 要先去收银台付款、领 scontrino（小票），再把小票递给吧台点单。',
    speak: `
      Buongiorno! Vorrei un caffè, per favore. | 向咖啡师问好并点一杯咖啡
      Un cappuccino e un cornetto, per favore. | 点卡布奇诺和牛角包
      Quant'è? | 问：多少钱？
      Grazie e buona giornata! | 道谢并祝对方愉快
    `,
    wr: [
      '写出你在咖啡吧的完整点单：问好、点两样东西、问价格、道谢。',
      "Buongiorno! Vorrei un caffè e un cornetto, per favore.\nQuant'è?\nGrazie e buona giornata!",
      '早上好！我想要一杯咖啡和一个牛角包。多少钱？谢谢，祝您今天愉快！',
    ],
    quiz: [
      ['下面哪句点咖啡最礼貌？', ['Voglio un caffè.', 'Vorrei un caffè, per favore.', 'Dammi un caffè.'], 1, 'Vorrei + per favore 最礼貌。'],
      ["Quant'è? 是在问：", ['一共多少钱', '有多远', '几点了'], 0, "Quant'è = 一共多少。"],
      ['在意大利，通常什么时候不点 cappuccino？', ['饭后、中午以后', '早上', '周末'], 0, 'cappuccino 被视为早餐饮品。'],
      ['alla marmellata 是什么馅？', ['果酱', '奶油', '巧克力'], 0, 'marmellata = 果酱。'],
      ['站在吧台（al banco）喝咖啡，价格通常：', ['比坐下来便宜', '比坐下来贵', '一样'], 0, '坐下要加服务费。'],
    ],
  },

  // ───────────────────────── 第 10 天（岛屿关卡）─────────────────────────
  {
    n: 10, test: true, it: "Prova dell'isola 1", zh: '第一岛关卡：综合复习',
    goal: '把前 9 天的发音、问候、自我介绍、数字和点单整合起来；学会"沟通补救"的几句话；通过 20 题关卡，拿到发音岛徽章。',
    scene: '这是第一岛的毕业日。你在罗马的小旅馆度过了第一个早晨：和前台聊天、认识新朋友，最后拿到一个牛角包。',
    dlg: `
      Li Ming: Buongiorno! Mi chiamo Li Ming. | 早上好！我叫李明。
      Giulia: Buongiorno! Piacere! Di dove sei? | 早上好！幸会！你是哪里人？
      Li Ming: Sono cinese, di Shanghai. Parlo un po' di italiano. | 我是中国人，上海人。我会说一点意大利语。
      Giulia: Molto bene! Quanti anni hai? | 很好！你几岁？
      Li Ming: Ho venti anni. E tu? | 我二十岁。你呢？
      Giulia: Ho diciotto anni. Hai fame? Ecco un cornetto! | 我十八岁。你饿吗？给你一个牛角包！
      Li Ming: Sì, ho fame! Grazie mille! | 是的，我饿了！非常感谢！
      Giulia: Prego! Buon appetito! | 不客气！祝你好胃口！
      Li Ming: Grazie! Arrivederci! | 谢谢！再见！
    `,
    key: [2, 5],
    q: [
      ['Giulia 给了李明什么？', ['牛角包', '咖啡', '钥匙'], 0, 'Ecco un cornetto!'],
      ['李明说他的意大利语怎么样？', ['会一点', '很流利', '完全不会'], 0, "Parlo un po' di italiano."],
      ['他们互相问了什么信息？', ['来自哪里、年龄', '职业、住址', '电话号码'], 0, 'Di dove sei? Quanti anni hai?'],
    ],
    vocab: `
      come? | 什么？（没听清） | CO-me
      può ripetere? | 您能重复一下吗？ | può ri-PE-te-re
      come si dice? | …怎么说？ | CO-me si DI-ce
      che cosa significa? | 这是什么意思？ | ke CO-sa si-GNI-fi-ca
      non lo so | 我不知道 | non lo SO
      va bene | 好的；可以 | va BE-ne
      d'accordo | 同意；好 | dac-COR-do
      mi dispiace | 很抱歉 | mi dis-PIA-ce
      non importa | 没关系 | non im-POR-ta
      aiuto! | 救命！帮帮我！ | a-IU-to
      dov'è il bagno? | 洗手间在哪里？ | do-VÈ il BA-gno
      ancora una volta | 再一次 | an-CO-ra U-na VOL-ta
      mi scusi | 劳驾；对不起（对您） | mi SCU-si
      ho capito | 我听懂了 | o ca-PI-to
    `,
    pron: {
      t: '第一岛发音自查 · 绕口令',
      tips: [
        '自查清单：① 五个元音清晰不拖尾 ② p t 不送气，b d g 带声 ③ c / g 的软硬 ④ gn、gli ⑤ 双辅音够不够长 ⑥ r 有没有颤动 ⑦ 重音位置 ⑧ 疑问句语调上扬。',
        '用手机录下自己读下面的绕口令，和原音对比，找出最明显的一两个问题——下一岛每天继续针对性练习。',
        '绕口令先慢后快：**慢速读准比快速读糊更重要**。',
      ],
      drill: `
        Tre tigri contro tre tigri. | 三只老虎对三只老虎。
        Gli gnocchi della nonna sono buonissimi. | 奶奶做的团子好吃极了。
        Ciao, che cosa cerchi? Cerco un cinema. | 嗨，你在找什么？我在找电影院。
        Apelle, figlio di Apollo, fece una palla di pelle di pollo. | 阿佩莱，阿波罗之子，用鸡皮做了个球。
      `,
      twister: 'Trentatré trentini entrarono a Trento, tutti e trentatré trotterellando. | 三十三个特伦托人走进特伦托，三十三个人全都小跑着。',
    },
    gram: [
      {
        h: '第一岛句型速查',
        t: [
          ['场景', '句型'],
          ['问候', 'Buongiorno! / Ciao! / Come stai? / Come sta?'],
          ['姓名', 'Come ti chiami? — Mi chiamo …'],
          ['来自', 'Di dove sei? — Sono di …'],
          ['语言', "Parli italiano? — Un po'."],
          ['年龄', 'Quanti anni hai? — Ho … anni.'],
          ['点单', 'Vorrei …, per favore. / Prendo …'],
          ['价格', "Quant'è?"],
        ],
      },
      {
        h: '沟通补救：听不懂时不要沉默',
        p: ['**Come?**（什么？）、**Non capisco.**、**Può ripetere, per favore?**、**Più lentamente, per favore.**——这四句话能救你无数次。意大利人通常很乐意重复和放慢。'],
        eg: ['Come? | 什么？', 'Può ripetere, per favore? | 您能重复一下吗？', 'Ho capito, grazie! | 我听懂了，谢谢！'],
      },
    ],
    culture: '意大利人爱聊天，也很愿意帮外国人纠正发音。**别怕说错**——他们更在意你愿意开口。如果对方说得太快，直接说 Più lentamente, per favore，一点也不失礼。',
    speak: `
      Buongiorno! Mi chiamo Li Ming. Piacere! | 完整自我介绍第一句（换成你的名字）
      Sono cinese. Parlo un po' di italiano. | 说明国籍与语言
      Come? Può ripetere, per favore? | 没听清时请对方重复
      Non capisco. Più lentamente, per favore. | 请对方说慢一点
    `,
    wr: [
      '写一段 5–6 句的自我介绍：问好、名字、国籍和城市、年龄、会说的语言。',
      "Buongiorno! Mi chiamo Li Ming. Sono cinese, di Shanghai.\nHo venti anni. Parlo cinese, inglese e un po' di italiano.\nPiacere!",
      '早上好！我叫李明。我是中国人，上海人。我二十岁。我会说中文、英语和一点意大利语。幸会！',
    ],
    quiz: [
      ['下面哪句可以在没听清时使用？', ['Come? Può ripetere?', 'Buonanotte!', "Quant'è?"], 0, 'Come? / Può ripetere? 都是请对方再说一遍。'],
      ['"洗手间在哪里？"是：', ["Dov'è il bagno?", "Che cos'è il bagno?", 'Come si chiama il bagno?'], 0, "dov'è = 在哪里。"],
      ['Non importa 的意思是：', ['没关系', '不重要的钱', '我不进去'], 0, 'non importa = never mind。'],
      ['Mi dispiace 用于：', ['表达歉意或遗憾', '表示感谢', '问路'], 0, 'mi dispiace = 我很抱歉。'],
      ["Come si dice 'thank you' in italiano? 的意思是：", ["'thank you' 用意大利语怎么说？", '你说意大利语吗？', '你叫什么名字？'], 0, 'come si dice … = …怎么说？'],
    ],
  },
]);
