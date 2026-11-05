/* 第 2 岛 · 生活岛 Isola della Vita（第 11–20 天） */
Course.add([
  // ───────────────────────── 第 11 天 ─────────────────────────
  {
    n: 11, it: 'Al ristorante', zh: '在餐厅',
    goal: '会订位、看菜单、点第一道和第二道菜、点饮料、结账；掌握 avere 的完整变位和 ho fame / ho sete 等"有"表达法。',
    scene: '周六晚上，你和 Marco 来到特拉斯提弗列区的一家老餐馆。这是你在意大利的第一顿正式晚餐。',
    dlg: `
      Cameriere: Buonasera! Avete prenotato? | 晚上好！你们订位了吗？
      Marco: Sì, a nome Rossi, per due. | 订了，用罗西的名字，两位。
      Cameriere: Prego, da questa parte. Ecco il menù. | 请这边走。这是菜单。
      Li Ming: Cosa consiglia? | 您推荐什么？
      Cameriere: Gli spaghetti alla carbonara sono ottimi! | 卡邦尼意面特别棒！
      Li Ming: Prendo gli spaghetti. | 我要意面。
      Marco: Io ho molta fame: prendo il pollo con le patate. | 我很饿：我要鸡肉配土豆。
      Cameriere: E da bere? | 喝点什么？
      Marco: Una bottiglia d'acqua e un bicchiere di vino rosso. | 一瓶水和一杯红葡萄酒。
      Li Ming: Il conto, per favore! | 请结账！
    `,
    key: [0, 3],
    q: [
      ['Marco 和李明订位了吗？', ['订了，两位', '没订位', '订了四位'], 0, 'Sì, a nome Rossi, per due.'],
      ['服务员推荐了什么？', ['卡邦尼意面', '披萨', '烤鱼'], 0, 'Gli spaghetti alla carbonara sono ottimi!'],
      ['Marco 点的主菜是什么？', ['鸡肉配土豆', '牛排', '烤鱼'], 0, 'il pollo con le patate。'],
    ],
    vocab: `
      avete prenotato? | 你们订位了吗？ | a-VE-te pre-no-TA-to
      per due | 两位 | per DU-e
      il menù | 菜单 | il me-NÙ
      cosa consiglia? | 您推荐什么？ | CO-sa con-SI-glia
      ottimo | 极好的 | OT-ti-mo
      il primo | 第一道菜（意面、汤） | il PRI-mo
      il secondo | 第二道菜（肉、鱼） | il se-CON-do
      il dolce | 甜点 | il DOL-ce
      il pollo | 鸡肉 | il POL-lo
      le patate | 土豆 | le pa-TA-te
      la bottiglia | 瓶子 | la bot-TI-glia
      il bicchiere | 玻璃杯 | il bic-CHIE-re
      il vino rosso | 红葡萄酒 | il VI-no ROS-so
      il conto | 账单；结账 | il CON-to
      ho sete | 我渴了 | o SE-te
    `,
    pron: {
      t: '餐桌上的双辅音',
      tips: [
        '**bicchiere** /bikˈkjɛre/：cch 是长的硬音 /kk/；**bottiglia** 里同时有 tt 和 gli /ʎ/。',
        'pollo、patate、spaghetti、ottimo 里的 ll、tt 要"憋住再放"，别读成单辅音。',
      ],
      drill: `
        bicchiere | 玻璃杯
        bottiglia | 瓶子
        pollo | 鸡肉
        patate | 土豆
        ottimo | 极好的
        conto | 账单
        carbonara | 卡邦尼意面
        menù | 菜单
      `,
    },
    gram: [
      {
        h: 'avere（有）的完整变位',
        p: ['h 不发音：ho、hai、ha、hanno 开头都不读 h。avere 还用来表达身体状态：**ho fame**（饿）、**ho sete**（渴）、**ho caldo**（热）、**ho freddo**（冷）、**ho sonno**（困）。'],
        t: [
          ['人称', 'avere', '例句'],
          ['io', 'ho', 'Ho fame.'],
          ['tu', 'hai', 'Hai sete?'],
          ['lui / lei / Lei', 'ha', 'Ha un tavolo?'],
          ['noi', 'abbiamo', 'Abbiamo un tavolo.'],
          ['voi', 'avete', 'Avete un menù?'],
          ['loro', 'hanno', 'Hanno vino rosso.'],
        ],
      },
      {
        h: '一顿饭的顺序',
        p: ['点菜时常说 **per primo / per secondo / per dolce**（第一道 / 第二道 / 甜点）。'],
        eg: ['Per primo prendo gli spaghetti. | 第一道我要意面。', 'Per secondo vorrei il pollo. | 第二道我想要鸡肉。', 'Per dolce, un tiramisù! | 甜点来一份提拉米苏！'],
      },
      {
        h: '容器 + di + 名词',
        p: ['说"一瓶水、一杯酒"用 **un / una + 容器 + di + 名词**，di 后面一般不加冠词。'],
        eg: ["Una bottiglia d'acqua. | 一瓶水。", 'Un bicchiere di vino rosso. | 一杯红葡萄酒。'],
      },
    ],
    culture: '**结账要主动要**：意大利服务员不会在你吃完时马上递账单（那被认为是催你走），需要你说 **Il conto, per favore**。账单上常有 **coperto**（餐位费）；**小费不是必须的**，满意时把零头凑个整数就够了。',
    speak: `
      Buonasera! Un tavolo per due, per favore. | 向服务员要一张两人桌
      Cosa consiglia? | 请服务员推荐菜
      Per primo prendo gli spaghetti. | 点第一道菜
      Il conto, per favore! | 请求结账
    `,
    wr: [
      '你在餐厅点餐：写出订位、第一道和第二道菜、饮料、结账，共 4–5 句话。',
      "Buonasera! Un tavolo per due, per favore.\nPer primo prendo gli spaghetti e per secondo il pollo.\nUna bottiglia d'acqua, per favore.\nIl conto, per favore!",
      '晚上好！请给我们一张两人桌。第一道我要意面，第二道要鸡肉。请给一瓶水。请结账！',
    ],
    quiz: [
      ['Ho sete 是什么意思？', ['我渴了', '我饿了', '我困了'], 0, 'sete = 渴；avere + sete。'],
      ['avere 的 noi 形式是：', ['abbiamo', 'avete', 'hanno'], 0, 'noi abbiamo；voi avete；loro hanno。'],
      ['想结账应该说：', ['Il conto, per favore.', 'Il menù, per favore.', 'Il pollo, per favore.'], 0, 'il conto = 账单。'],
      ['菜单里的 il secondo 指：', ['第二道菜（肉、鱼）', '第二个人', '第二杯酒'], 0, 'primo / secondo / dolce 是一顿饭的顺序。'],
    ],
  },

  // ───────────────────────── 第 12 天 ─────────────────────────
  {
    n: 12, it: 'Cosa mangi?', zh: '你吃什么？',
    goal: '掌握 -are / -ere / -ire 规则动词的现在时和不规则动词 bere；会谈三餐和饮食习惯；会数 21–100。',
    scene: 'Marco 和你在公园长椅上聊天，他好奇中国人早饭、午饭都吃什么。',
    dlg: `
      Marco: Che cosa mangi di solito a colazione? | 你早餐通常吃什么？
      Li Ming: Mangio il pane e bevo il tè. E tu? | 我吃面包，喝茶。你呢？
      Marco: Io bevo un cappuccino e mangio un cornetto. | 我喝一杯卡布奇诺，吃一个牛角包。
      Li Ming: E a pranzo? | 那午饭呢？
      Marco: A pranzo mangio la pasta. Preferisco la pasta al pomodoro. | 午饭我吃意面。我更喜欢番茄意面。
      Li Ming: Io preferisco il riso. In Cina mangiamo molto riso. | 我更喜欢米饭。在中国我们吃很多米饭。
      Marco: Il riso? Anche in Italia mangiamo il risotto! | 米饭？意大利也吃烩饭！
      Li Ming: Davvero? Che bello! | 真的吗？太好了！
    `,
    key: [0, 4],
    q: [
      ['Marco 早餐吃什么？', ['卡布奇诺和牛角包', '面包和茶', '米饭'], 0, 'bevo un cappuccino e mangio un cornetto。'],
      ['李明午饭更喜欢吃什么？', ['米饭', '意面', '面包'], 0, 'Io preferisco il riso.'],
      ['意大利也有什么米饭料理？', ['烩饭 risotto', '炒饭', '寿司'], 0, 'Anche in Italia mangiamo il risotto!'],
    ],
    vocab: `
      mangiare | 吃 | man-GIA-re
      bere | 喝 | BE-re
      preferire | 更喜欢 | pre-fe-RI-re
      a colazione | 早餐时 | a co-la-ZIO-ne
      a pranzo | 午餐时 | a PRAN-zo
      a cena | 晚餐时 | a CE-na
      di solito | 通常 | di SO-li-to
      il riso | 米饭 | il RI-so
      la pasta | 意面；面食 | la PA-sta
      il tè | 茶 | il TÈ
      davvero? | 真的吗？ | dav-VE-ro
      trenta | 三十 | TREN-ta
      quaranta | 四十 | qua-RAN-ta
      cinquanta | 五十 | cin-QUAN-ta
      sessanta | 六十 | ses-SAN-ta
      settanta | 七十 | set-TAN-ta
      ottanta | 八十 | ot-TAN-ta
      novanta | 九十 | no-VAN-ta
      cento | 一百 | CEN-to
    `,
    pron: {
      t: 'mangiare 里的软 g 与 30–90',
      tips: [
        '**mangiare** /manˈdʒare/：gi 后面的 i 不发音，只起软化作用；mangio /ˈmandʒo/、mangiamo /manˈdʒamo/。但 tu mangi /ˈmandʒi/ 里的 i 是词尾，要读。',
        '30–90 都以 **-anta** 结尾，重音在 -anta 前一个音节：TREN-ta、qua-RAN-ta、cin-QUAN-ta、ses-SAN-ta、set-TAN-ta、ot-TAN-ta、no-VAN-ta。',
      ],
      drill: `
        mangiare | 吃
        mangio | 我吃
        mangiamo | 我们吃
        trenta | 三十
        quaranta | 四十
        cinquanta | 五十
        sessanta | 六十
        settanta | 七十
        ottanta | 八十
        novanta | 九十
        cento | 一百
      `,
    },
    gram: [
      {
        h: '规则动词现在时：三类词尾',
        p: ['去掉不定式词尾 -are / -ere / -ire 得到词干，再加人称词尾。-ire 动词分两类：像 dormire 直接加词尾；像 preferire、capire、finire 在 io / tu / lui / loro 加 **-isc-**。'],
        t: [
          ['人称', '-are mangiare', '-ere prendere', '-ire dormire', '-ire preferire'],
          ['io', 'mangio', 'prendo', 'dormo', 'preferisco'],
          ['tu', 'mangi', 'prendi', 'dormi', 'preferisci'],
          ['lui / lei / Lei', 'mangia', 'prende', 'dorme', 'preferisce'],
          ['noi', 'mangiamo', 'prendiamo', 'dormiamo', 'preferiamo'],
          ['voi', 'mangiate', 'prendete', 'dormite', 'preferite'],
          ['loro', 'mangiano', 'prendono', 'dormono', 'preferiscono'],
        ],
      },
      {
        h: 'bere（喝）：不规则动词',
        t: [['人称', 'bere'], ['io', 'bevo'], ['tu', 'bevi'], ['lui / lei / Lei', 'beve'], ['noi', 'beviamo'], ['voi', 'bevete'], ['loro', 'bevono']],
        eg: ['Bevo un tè. | 我喝茶。', 'Beviamo un caffè? | 我们喝杯咖啡吧？'],
      },
      {
        h: '数字 21–100',
        p: ['十位数 + 个位数连写：ventuno, ventidue, trentatré, quarantotto…。个位是 1 和 8 时，十位词尾的元音省略（ventuno, ventotto, trentuno）；以 -tré 结尾的数字，tre 要写重音符号（ventitré, trentatré）。100 = cento。'],
        eg: ['Ho ventitré anni. | 我二十三岁。', 'Costa quarantotto euro. | 四十八欧元。', 'Cento euro. | 一百欧元。'],
      },
    ],
    culture: '意大利人的一天：**colazione（早餐）**很简单——咖啡配 cornetto 或饼干；**pranzo（午餐）**约 12:30–14:00，传统上是最丰盛的一餐；**cena（晚餐）**常在晚上八点以后。**饭点和中国不同**：很多餐厅 19:00–19:30 才开始营业，太早去会吃闭门羹。',
    speak: `
      Che cosa mangi a colazione? | 问朋友早餐吃什么
      Mangio il pane e bevo il tè. | 说你的早餐
      Preferisco il riso. | 说你更喜欢米饭
      Ho ventitré anni. | 用 21–100 的数字说年龄（换成你的）
    `,
    wr: [
      '写 3–4 句话：你早餐、午餐吃什么，你更喜欢什么。',
      'A colazione mangio il pane e bevo il tè.\nA pranzo mangio il riso.\nPreferisco la cucina cinese.',
      '早餐我吃面包，喝茶。午饭我吃米饭。我更喜欢中国菜。',
    ],
    quiz: [
      ['"我们吃"的 mangiare 变位是：', ['mangiamo', 'mangiate', 'mangiano'], 0, 'noi → -iamo。'],
      ['bere 的 io 形式是：', ['bevo', 'bero', 'bevio'], 0, 'bere 不规则：bevo, bevi, beve…'],
      ['preferire 的 tu 形式是：', ['preferisci', 'preferi', 'preferiri'], 0, '-ire 动词的 -isc- 型：preferisco, preferisci…'],
      ['23 岁写成：', ['ventitré', 'venttré', 'ventetre'], 0, 'tre 在合成数里要带重音符号。'],
      ['28 应该读作：', ['ventotto', 'ventiotto', 'venti otto'], 0, '个位是 8 时，十位词尾元音省略。'],
    ],
  },

  // ───────────────────────── 第 13 天 ─────────────────────────
  {
    n: 13, it: 'Quanto costa?', zh: '多少钱？',
    goal: '会问价格、讲价、说颜色；掌握形容词与名词的性数一致；会听懂和说出 100 以内的价格。',
    scene: '周日上午，你在佛罗伦萨的露天市场看上了一个皮包。摊主是一位热情的女士。',
    dlg: `
      Li Ming: Buongiorno! Quanto costa questa borsa? | 早上好！这个包多少钱？
      Venditrice: Cinquanta euro. È di pelle vera. | 五十欧元。是真皮的。
      Li Ming: È un po' cara. Ha una borsa più piccola? | 有点贵。您有更小一点的包吗？
      Venditrice: Sì, questa nera costa trentacinque euro. | 有，这个黑色的三十五欧元。
      Li Ming: Mi piace! Posso avere uno sconto? | 我喜欢！能打个折吗？
      Venditrice: Per Lei, trenta euro. | 给您，三十欧元。
      Li Ming: Va bene, la prendo. Ecco cinquanta euro. | 好的，我买了。给您五十欧元。
      Venditrice: Ecco il resto: venti euro. Grazie! | 找您二十欧元。谢谢！
    `,
    key: [0, 4],
    q: [
      ['第一个包要多少钱？', ['50 欧元', '35 欧元', '30 欧元'], 0, 'Cinquanta euro.'],
      ['李明最后买的包是什么颜色？', ['黑色', '红色', '白色'], 0, 'questa nera = 这个黑色的。'],
      ['李明付了 50 欧元，最后找回多少？', ['20 欧元', '15 欧元', '30 欧元'], 0, '价格 30，付 50，找 20。'],
    ],
    vocab: `
      quanto costa? | 多少钱？（单数） | QUAN-to CO-sta
      quanto costano? | 多少钱？（复数） | QUAN-to CO-sta-no
      la borsa | 包 | la BOR-sa
      la pelle | 皮革 | la PEL-le
      caro | 贵的 | CA-ro
      economico | 便宜的 | e-co-NO-mi-co
      piccolo | 小的 | PIC-co-lo
      grande | 大的 | GRAN-de
      nero | 黑色的 | NE-ro
      bianco | 白色的 | BIAN-co
      rosso | 红色的 | ROS-so
      blu | 蓝色的 | BLU
      verde | 绿色的 | VER-de
      giallo | 黄色的 | GIAL-lo
      lo sconto | 折扣 | lo SCON-to
      il resto | 找零 | il RE-sto
    `,
    pron: {
      t: '颜色词里的双辅音与 c / g',
      tips: [
        '**bianco** /ˈbjaŋko/：ia 是二合元音，只占一个音节（BIAN-co）；**giallo** 的 gi 是软音，ll 要读长；**rosso** 的 ss 是长清音 s。',
        '**caro / cara** 与 **carro**（货车）仅差 r 的长短；说价格时 caro 的 r 轻颤一次就够。',
      ],
      drill: `
        bianco | 白色的
        nero | 黑色的
        rosso | 红色的
        giallo | 黄色的
        verde | 绿色的
        blu | 蓝色的
        piccolo | 小的
        grande | 大的
        economico | 便宜的
      `,
    },
    gram: [
      {
        h: '形容词与名词的性、数一致',
        p: ['形容词的阴阳性、单复数要和名词一致，通常放在名词**后面**：una borsa nera, due libri rossi。颜色词 **blu、rosa、viola** 不变化。'],
        t: [
          ['类型', '阳单', '阴单', '阳复', '阴复'],
          ['-o 型', 'nero', 'nera', 'neri', 'nere'],
          ['-e 型', 'grande', 'grande', 'grandi', 'grandi'],
          ['不变型', 'blu', 'blu', 'blu', 'blu'],
        ],
      },
      {
        h: '问价：quanto costa / costano',
        p: ['东西是单数用 **costa**，复数用 **costano**。'],
        eg: ['Quanto costa questa borsa? | 这个包多少钱？', 'Quanto costano queste mele? | 这些苹果多少钱？', 'È troppo caro! | 太贵了！'],
      },
      {
        h: '讨价还价',
        eg: ["È un po' caro. | 有点贵。", 'Posso avere uno sconto? | 能打折吗？', 'Va bene, lo prendo. | 好的，我买了。'],
      },
    ],
    culture: '在**露天市场**（mercato）可以讲价，在固定店铺和超市不行。每年一月和七月是全国打折季 **saldi**，橱窗上贴着 SALDI 或 -30% 就是在打折。进店时店员会先说 Buongiorno，你也要回应——这是基本礼貌。',
    speak: `
      Quanto costa questa borsa? | 问一个包的价格
      È un po' cara. Ha una borsa più piccola? | 说有点贵，问有没有更小的
      Posso avere uno sconto? | 请求打折
      Va bene, la prendo. | 决定买下
    `,
    wr: [
      '你在市场看中一件东西：写出问价、说有点贵、请求打折、决定购买。',
      "Quanto costa questa borsa nera?\nÈ un po' cara. Posso avere uno sconto?\nVa bene, la prendo.",
      '这个黑色的包多少钱？有点贵。能打折吗？好的，我买了。',
    ],
    quiz: [
      ['"一个黑色的包"（borsa 是阴性）应该说：', ['una borsa nera', 'una borsa nero', 'un borsa nera'], 0, '形容词与名词性数一致：borsa（阴）→ nera。'],
      ['"这些苹果多少钱？"用：', ['Quanto costano queste mele?', 'Quanto costa queste mele?', 'Quanto costi queste mele?'], 0, '复数用 costano。'],
      ['grande 的复数是：', ['grandi', 'grande', 'grandes'], 0, '-e → -i。'],
      ['blu 的复数是：', ['blu', 'blui', 'bli'], 0, 'blu 不变化。'],
    ],
  },

  // ───────────────────────── 第 14 天 ─────────────────────────
  {
    n: 14, it: 'Che ore sono?', zh: '几点了？',
    goal: '会问和说时间（整点、一刻、半点）；会说星期和月份；会用 oggi / domani / ieri 和 A che ora…? 约时间。',
    scene: 'Marco 和你在街边咖啡座，打算去博物馆，同时约好明天的见面时间。',
    dlg: `
      Marco: Scusa, che ore sono? | 请问，现在几点？
      Li Ming: Sono le tre e mezza. | 三点半。
      Marco: Il museo apre alle quattro. | 博物馆四点开门。
      Li Ming: Allora abbiamo mezz'ora. Che giorno è oggi? | 那我们还有半小时。今天星期几？
      Marco: Oggi è giovedì. Domani è venerdì. | 今天星期四。明天星期五。
      Li Ming: A che ora ci vediamo domani? | 我们明天几点见面？
      Marco: Alle nove e un quarto davanti al bar. | 九点一刻，在咖啡吧前面。
      Li Ming: Perfetto! A domani! | 太好了！明天见！
    `,
    key: [0, 5],
    q: [
      ['现在几点？', ['3:30', '4:00', '3:15'], 0, 'le tre e mezza = 3:30。'],
      ['今天是星期几？', ['星期四', '星期五', '星期三'], 0, 'Oggi è giovedì.'],
      ['明天几点见面？', ['9:15', '9:45', '8:15'], 0, 'Alle nove e un quarto = 9:15。'],
    ],
    vocab: `
      che ore sono? | 现在几点？ | ke O-re SO-no
      a che ora? | 几点？（问时间点） | a ke O-ra
      e mezza | …点半 | e MEZ-za
      e un quarto | …点一刻 | e un QUAR-to
      meno un quarto | 差一刻…点 | ME-no un QUAR-to
      mezzogiorno | 中午；正午 | mez-zo-GIOR-no
      mezzanotte | 午夜 | mez-za-NOT-te
      oggi | 今天 | OG-gi
      domani | 明天 | do-MA-ni
      ieri | 昨天 | IE-ri
      la settimana | 一周 | la set-ti-MA-na
      lunedì | 星期一 | lu-ne-DÌ
      martedì | 星期二 | mar-te-DÌ
      mercoledì | 星期三 | mer-co-le-DÌ
      giovedì | 星期四 | gio-ve-DÌ
      venerdì | 星期五 | ve-ner-DÌ
      sabato | 星期六 | SA-ba-to
      domenica | 星期日 | do-ME-ni-ca
    `,
    pron: {
      t: '星期名称的重音',
      tips: [
        '**lunedì、martedì、mercoledì、giovedì、venerdì** 末尾的 -dì 带重音符号，重音在最后一个音节。',
        '**sabato** 和 **domenica** 是倒数第三音节重音：SA-ba-to、do-ME-ni-ca。',
        '**mezzogiorno、mezzanotte**：zz 读长的 /ddz/，不要读成单个 z。',
      ],
      drill: `
        lunedì | 星期一
        martedì | 星期二
        mercoledì | 星期三
        giovedì | 星期四
        venerdì | 星期五
        sabato | 星期六
        domenica | 星期日
        mezzogiorno | 中午
        mezzanotte | 午夜
      `,
    },
    gram: [
      {
        h: '说时间：Che ore sono?',
        p: ['1 点用单数：**È l\'una**；其他整点用复数：**Sono le due / le tre…**。半点 **e mezza**，一刻 **e un quarto**，差一刻 **meno un quarto**。'],
        t: [
          ['时间', '意大利语'],
          ['1:00', "È l'una."],
          ['3:00', 'Sono le tre.'],
          ['3:15', 'Sono le tre e un quarto.'],
          ['3:30', 'Sono le tre e mezza.'],
          ['3:45', 'Sono le quattro meno un quarto.'],
          ['3:10', 'Sono le tre e dieci.'],
          ['3:50', 'Sono le quattro meno dieci.'],
        ],
      },
      {
        h: 'A che ora…? —— 几点做某事',
        p: ['问"几点"用 **A che ora…?**，回答用 **alle + 点数**；1 点用 **all\'una**，中午用 **a mezzogiorno**。'],
        eg: ['A che ora apre il museo? | 博物馆几点开门？', 'Alle nove e mezza. | 九点半。', "All'una. | 一点。"],
      },
      {
        h: '月份与日期',
        p: ['星期和月份**不大写**。日期用 **il + 数字 + 月份**（il cinque novembre）；每月 1 日用序数 **il primo**（il primo maggio）。'],
        t: [
          ['月份', '意大利语', '月份', '意大利语'],
          ['1', 'gennaio', '7', 'luglio'],
          ['2', 'febbraio', '8', 'agosto'],
          ['3', 'marzo', '9', 'settembre'],
          ['4', 'aprile', '10', 'ottobre'],
          ['5', 'maggio', '11', 'novembre'],
          ['6', 'giugno', '12', 'dicembre'],
        ],
      },
    ],
    culture: '**午休**：很多小店和小城镇的商店在 13:00–16:00 关门休息（riposo），傍晚再营业；**博物馆常在周一闭馆**。规划行程前，一定要查清开放时间（orari di apertura），别白跑一趟。',
    speak: `
      Che ore sono? | 问现在几点
      Sono le tre e mezza. | 回答：三点半
      Che giorno è oggi? | 问今天星期几
      A che ora ci vediamo domani? | 约定明天见面的时间
    `,
    wr: [
      '写出你明天的两个安排：几点、做什么。并写出今天是星期几。',
      "Oggi è lunedì.\nDomani alle nove prendo un caffè con Marco.\nAll'una mangio la pasta.",
      '今天星期一。明天九点我和马可喝咖啡。一点我吃意面。',
    ],
    quiz: [
      ['3:45 的两种说法，哪个正确？', ['Sono le quattro meno un quarto.', 'Sono le quattro e un quarto.', 'Sono le tre e un quarto.'], 0, '差一刻到四点 = meno un quarto；e un quarto 是过一刻。'],
      ['1 点钟应该说：', ["È l'una.", 'Sono le uno.', "Sono l'una."], 0, '1 点用单数 è。'],
      ['星期一 lunedì 的重音在：', ['最后一个音节（-dì）', '第一个音节', '第二个音节'], 0, '带重音符号的末音节。'],
      ['月份在意大利语里：', ['不大写', '总是大写', '只有一月大写'], 0, '星期和月份都不大写。'],
    ],
  },

  // ───────────────────────── 第 15 天 ─────────────────────────
  {
    n: 15, it: 'La mia famiglia', zh: '我的家人',
    goal: '会介绍家庭成员；掌握 mio / tuo / suo 等物主形容词与家人名词的搭配（单数亲属不加冠词）；会问 Hai fratelli o sorelle?',
    scene: '傍晚，你给 Giulia 看手机里的家庭照片，她好奇地问东问西。',
    dlg: `
      Giulia: Chi è questo signore nella foto? | 照片里这位先生是谁？
      Li Ming: È mio padre. Ha cinquant'anni. | 是我父亲。他五十岁。
      Giulia: E questa signora? | 那这位女士呢？
      Li Ming: Questa è mia madre. È insegnante. | 这是我母亲。她是老师。
      Giulia: Hai fratelli o sorelle? | 你有兄弟姐妹吗？
      Li Ming: No, sono figlio unico. E tu? | 没有，我是独生子。你呢？
      Giulia: Io ho un fratello e due sorelle. La mia famiglia è grande! | 我有一个兄弟和两个姐妹。我家人很多！
    `,
    key: [0, 4],
    q: [
      ['照片里的先生是谁？', ['李明的父亲', '李明的哥哥', '李明的朋友'], 0, 'È mio padre.'],
      ['李明的母亲做什么工作？', ['老师', '医生', '工程师'], 0, 'È insegnante.'],
      ['Giulia 有几个姐妹？', ['两个', '一个', '三个'], 0, 'un fratello e due sorelle。'],
    ],
    vocab: `
      il padre | 父亲 | il PA-dre
      la madre | 母亲 | la MA-dre
      i genitori | 父母 | i ge-ni-TO-ri
      il fratello | 兄弟 | il fra-TEL-lo
      la sorella | 姐妹 | la so-REL-la
      il figlio | 儿子 | il FI-glio
      la figlia | 女儿 | la FI-glia
      il nonno | 爷爷；外公 | il NON-no
      la nonna | 奶奶；外婆 | la NON-na
      lo zio | 叔叔；舅舅 | lo ZI-o
      la zia | 阿姨；姑姑 | la ZI-a
      il marito | 丈夫 | il ma-RI-to
      la moglie | 妻子 | la MO-glie
      figlio unico | 独生子 | FI-glio U-ni-co
      la foto | 照片 | la FO-to
    `,
    pron: {
      t: 'gli、gn 与 z 在家人词汇里',
      tips: [
        '**famiglia、figlio、figlia、moglie** 里的 gli /ʎ/：舌面贴硬腭，读得略长。',
        '**zio、zia** 的 z 读 /ts/，重音在 i 上：ZÌ-o、ZÌ-a（i 要读出来）；**nonna、sorella** 的 nn、ll 是长辅音。',
      ],
      drill: `
        famiglia | 家庭
        figlio | 儿子
        figlia | 女儿
        moglie | 妻子
        nonno | 爷爷
        nonna | 奶奶
        zio | 叔叔
        zia | 阿姨
        sorella | 姐妹
        fratello | 兄弟
      `,
    },
    gram: [
      {
        h: '物主形容词：我的、你的、他的……',
        p: [
          '物主形容词要和**被拥有的东西**的性数一致。**单数亲属名词前不加冠词**：mio padre、tua sorella；复数或有修饰语时要加冠词：**i miei genitori**、**la mia sorella maggiore**。',
          '**loro**（他们的）不变化，而且总是要带冠词：la loro casa。',
        ],
        t: [
          ['', '阳单', '阴单', '阳复', '阴复'],
          ['我的', 'mio', 'mia', 'miei', 'mie'],
          ['你的', 'tuo', 'tua', 'tuoi', 'tue'],
          ['他／她／您的', 'suo', 'sua', 'suoi', 'sue'],
          ['我们的', 'nostro', 'nostra', 'nostri', 'nostre'],
          ['你们的', 'vostro', 'vostra', 'vostri', 'vostre'],
          ['他们的', 'loro', 'loro', 'loro', 'loro'],
        ],
      },
      {
        h: '家人与数量',
        eg: ['Ho un fratello e due sorelle. | 我有一个兄弟和两个姐妹。', 'Quanti fratelli hai? | 你有几个兄弟？', "Mia nonna ha settant'anni. | 我奶奶七十岁。"],
        p: ['复数：fratello → fratelli，sorella → sorelle，figlio → figli。'],
      },
    ],
    culture: '**家庭（la famiglia）是意大利生活的核心**。周日常有全家聚在奶奶家的 **pranzo della domenica**（周日午餐），一吃就是两三个小时。不少意大利年轻人较晚才离开父母家。如果被邀请去别人家吃饭，通常是很高的礼遇。',
    speak: `
      Questo è mio padre. | 介绍照片里的父亲
      Questa è mia madre. È insegnante. | 介绍母亲和她的职业
      Hai fratelli o sorelle? | 问对方有没有兄弟姐妹
      Sono figlio unico. | 回答：我是独生子（女生说 figlia unica）
    `,
    wr: [
      '写 3–4 句话介绍你的家人：谁、几岁、做什么工作。（换成你自己的情况）',
      "Mio padre ha cinquant'anni. È ingegnere.\nMia madre è insegnante.\nSono figlio unico.",
      '我父亲五十岁，是工程师。我母亲是老师。我是独生子。',
    ],
    quiz: [
      ['"我的父亲"应该说：', ['mio padre', 'il mio padre', 'mia padre'], 0, '单数亲属名词前不加冠词，且 padre 是阳性。'],
      ['"我的父母"（复数）应该说：', ['i miei genitori', 'mio genitori', 'miei genitori'], 0, '复数亲属名词前要加冠词。'],
      ['sorella 的复数是：', ['sorelle', 'sorelli', 'sorella'], 0, '-a → -e。'],
      ['"他们的家"应该说：', ['la loro casa', 'loro casa', 'la lora casa'], 0, 'loro 前总要带冠词，且不变化。'],
    ],
  },

  // ───────────────────────── 第 16 天 ─────────────────────────
  {
    n: 16, it: 'Mi piace!', zh: '我喜欢！',
    goal: '会用 mi piace / mi piacciono 表达喜好；掌握 fare 的变位和频率副词；会聊爱好与空闲时间。',
    scene: '周末的公园里，你和 Giulia 一边散步一边聊各自的爱好。',
    dlg: `
      Giulia: Che cosa fai nel tempo libero? | 你空闲时间做什么？
      Li Ming: Mi piace leggere e ascoltare la musica. | 我喜欢读书和听音乐。
      Giulia: Ti piace il calcio? | 你喜欢足球吗？
      Li Ming: No, non mi piace molto. Preferisco il nuoto. | 不，不太喜欢。我更喜欢游泳。
      Giulia: Io faccio yoga ogni mattina e spesso cammino nel parco. | 我每天早上做瑜伽，还经常在公园里散步。
      Li Ming: Che bello! Mi piacciono molto i parchi di Roma. | 真好！我很喜欢罗马的公园。
    `,
    key: [1, 2],
    q: [
      ['李明空闲时喜欢做什么？', ['读书和听音乐', '踢足球', '做瑜伽'], 0, 'Mi piace leggere e ascoltare la musica.'],
      ['李明喜欢足球吗？', ['不太喜欢', '非常喜欢', '从不看'], 0, 'non mi piace molto。'],
      ['Giulia 每天早上做什么？', ['做瑜伽', '游泳', '读书'], 0, 'faccio yoga ogni mattina。'],
    ],
    vocab: `
      il tempo libero | 空闲时间 | il TEM-po LI-be-ro
      leggere | 读；阅读 | LEG-ge-re
      ascoltare | 听 | a-scol-TA-re
      la musica | 音乐 | la MU-si-ca
      il calcio | 足球 | il CAL-cio
      il nuoto | 游泳 | il NUO-to
      lo yoga | 瑜伽 | lo YO-ga
      camminare | 走路；散步 | cam-mi-NA-re
      il parco | 公园 | il PAR-co
      viaggiare | 旅行 | viag-GIA-re
      cucinare | 做饭 | cu-ci-NA-re
      sempre | 总是 | SEM-pre
      spesso | 经常 | SPES-so
      a volte | 有时 | a VOL-te
      mai | 从不 | MAI
      ogni giorno | 每天 | O-gni GIOR-no
    `,
    pron: {
      t: 'piace / piacciono 与 leggere',
      tips: [
        '**piace** /ˈpjatʃe/，**piacciono** /ˈpjattʃono/：ci 在 e、o 前是软音 /tʃ/，cc 是长软音。',
        '**leggere** /ˈlɛddʒere/：gg 在 e 前是长的软音 /ddʒ/；**calcio** /ˈkaltʃo/：ci 软音。',
      ],
      drill: `
        piace | 喜欢（单）
        piacciono | 喜欢（复）
        leggere | 读
        calcio | 足球
        parco | 公园
        camminare | 散步
        viaggiare | 旅行
        musica | 音乐
      `,
    },
    gram: [
      {
        h: 'piacere：喜欢（"某物令我喜欢"）',
        p: ['意大利语的"喜欢"结构是反的：**mi piace + 单数名词 / 动词原形**；**mi piacciono + 复数名词**。真正的主语是"被喜欢的东西"。'],
        t: [
          ['想说', '意大利语'],
          ['我喜欢咖啡', 'Mi piace il caffè.'],
          ['我喜欢意面（spaghetti 是复数）', 'Mi piacciono gli spaghetti.'],
          ['我喜欢读书', 'Mi piace leggere.'],
          ['你喜欢吗？', 'Ti piace?'],
          ['我不喜欢', 'Non mi piace.'],
          ['我也喜欢', 'Anche a me.'],
          ['我也不喜欢', 'Neanche a me.'],
        ],
      },
      {
        h: 'fare（做）的变位',
        t: [['人称', 'fare'], ['io', 'faccio'], ['tu', 'fai'], ['lui / lei / Lei', 'fa'], ['noi', 'facciamo'], ['voi', 'fate'], ['loro', 'fanno']],
        eg: ['Che cosa fai? | 你在做什么？', 'Faccio yoga. | 我做瑜伽。', 'Che lavoro fai? | 你做什么工作？'],
      },
      {
        h: '频率副词',
        p: ['**sempre**（总是）> **spesso**（经常）> **a volte**（有时）> **raramente**（很少）> **mai**（从不）。mai 与 non 连用：Non mangio mai il pesce.'],
        eg: ['Faccio sempre colazione. | 我总是吃早餐。', 'Non mangio mai il pesce. | 我从不吃鱼。'],
      },
    ],
    culture: '**calcio** 是意大利的全民运动。甲级联赛叫 **Serie A**，著名球队有 Juventus、Milan、Inter、Roma 等。比赛日的酒吧会挤满 **tifosi**（球迷）。想快速拉近关系，可以问一句 Per quale squadra tifi?（你支持哪个队？）——但要做好长谈的准备。',
    speak: `
      Che cosa fai nel tempo libero? | 问对方空闲时间做什么
      Mi piace leggere e ascoltare la musica. | 说你的爱好（换成你自己的）
      Non mi piace molto il calcio. | 说你不太喜欢足球
      Mi piacciono molto gli spaghetti. | 说你很喜欢意面
    `,
    wr: [
      '写 3–4 句话说说你的爱好：喜欢什么、不喜欢什么、多久做一次。',
      'Mi piace leggere e viaggiare.\nNon mi piace molto il calcio.\nOgni giorno ascolto la musica.',
      '我喜欢读书和旅行。我不太喜欢足球。我每天都听音乐。',
    ],
    quiz: [
      ['"我喜欢意面"（复数）应该说：', ['Mi piacciono gli spaghetti.', 'Mi piace gli spaghetti.', 'Mi piaci gli spaghetti.'], 0, '被喜欢的东西是复数 → piacciono。'],
      ['"我喜欢读书"应该说：', ['Mi piace leggere.', 'Mi piacciono leggere.', 'Io piaccio leggere.'], 0, '动词原形作主语 → piace。'],
      ['fare 的 noi 形式是：', ['facciamo', 'fate', 'fanno'], 0, 'noi facciamo。'],
      ['Non mangio mai il pesce. 的意思是：', ['我从不吃鱼', '我总是吃鱼', '我有时吃鱼'], 0, 'mai = 从不，与 non 连用。'],
    ],
  },

  // ───────────────────────── 第 17 天 ─────────────────────────
  {
    n: 17, it: 'In città', zh: '在城里',
    goal: '会描述城市里有什么、在哪里；掌握 c\'è / ci sono 和位置介词；了解 a / in / di / da 的基本用法。',
    scene: '你刚住进旅馆，向前台 Giulia 打听附近的药店、超市和银行。',
    dlg: `
      Li Ming: Scusa, c'è una farmacia qui vicino? | 请问，附近有药店吗？
      Giulia: Sì, c'è una farmacia vicino alla stazione. | 有，车站附近有一家药店。
      Li Ming: E c'è un supermercato? | 有超市吗？
      Giulia: Sì, ci sono due supermercati in via Garibaldi. | 有，加里波第路上有两家超市。
      Li Ming: C'è anche una banca? | 也有银行吗？
      Giulia: Sì, la banca è davanti al bar, accanto alla posta. | 有，银行在咖啡吧对面，邮局旁边。
      Li Ming: Grazie mille! | 非常感谢！
    `,
    key: [0, 3],
    q: [
      ['药店在哪里？', ['车站附近', '咖啡吧对面', '邮局旁边'], 0, 'vicino alla stazione。'],
      ['超市有几家？', ['两家', '一家', '三家'], 0, 'ci sono due supermercati。'],
      ['银行在哪里？', ['咖啡吧对面、邮局旁边', '车站旁边', '药店后面'], 0, 'davanti al bar, accanto alla posta。'],
    ],
    vocab: `
      la città | 城市 | la cit-TÀ
      il centro | 市中心 | il CEN-tro
      la via | 街；路 | la VI-a
      la piazza | 广场 | la PIAZ-za
      la farmacia | 药店 | la far-ma-CI-a
      il supermercato | 超市 | il su-per-mer-CA-to
      la banca | 银行 | la BAN-ca
      la posta | 邮局 | la PO-sta
      la stazione | 车站 | la sta-ZIO-ne
      c'è | 有（单数） | CÈ
      ci sono | 有（复数） | ci SO-no
      vicino a | 靠近 | vi-CI-no a
      lontano da | 远离 | lon-TA-no da
      davanti a | 在……前面／对面 | da-VAN-ti a
      accanto a | 在……旁边 | ac-CAN-to a
      dietro | 在……后面 | DIE-tro
    `,
    pron: {
      t: '-zione 与 farmacia 的重音',
      tips: [
        '**stazione** /staˈtsjone/：-zione 的重音永远在 zio 上，z 读 /ts/。',
        '**farmacia** /farmaˈtʃia/：这个词的 i 带重音，要读出来：far-ma-CÌ-a——这是 "cia" 里 i 要发音的少数例外（还有 magia、allergia 等）。',
        '**banca** 里的 n 在 c 前读成 /ŋ/（后鼻音）：BAN-ca。',
      ],
      drill: `
        stazione | 车站
        farmacia | 药店
        supermercato | 超市
        banca | 银行
        posta | 邮局
        piazza | 广场
        centro | 市中心
        città | 城市
      `,
    },
    gram: [
      {
        h: "c'è / ci sono —— 有……",
        p: ["**c'è** + 单数名词；**ci sono** + 复数名词。否定：non c'è / non ci sono。"],
        eg: ["C'è una farmacia qui vicino? | 附近有药店吗？", 'Ci sono due supermercati. | 有两家超市。', "Non c'è un bar. | 没有咖啡吧。"],
      },
      {
        h: '位置介词',
        t: [
          ['意大利语', '意思', '例句'],
          ['vicino a', '靠近', 'vicino alla stazione'],
          ['lontano da', '远离', 'lontano dal centro'],
          ['davanti a', '在……前面／对面', 'davanti al bar'],
          ['dietro', '在……后面', 'dietro la banca'],
          ['accanto a', '在……旁边', 'accanto alla posta'],
          ['in centro', '在市中心', 'Abito in centro.'],
        ],
        p: ['介词 a、da、di 后接定冠词时会合并：a + il = **al**，a + la = **alla**，da + il = **dal**（第 34 天系统学习）。现在先整体记住：vicino alla stazione，davanti al bar。'],
      },
      {
        h: 'a / in / di / da 的基本用法',
        t: [
          ['介词', '用法', '例句'],
          ['a', '城市、小地方', 'Abito a Roma.'],
          ['in', '国家、街道、交通工具', 'Vivo in Italia. / in via Roma'],
          ['di', '来自；……的', 'Sono di Milano.'],
          ['da', '从……来', 'Vengo da Shanghai.'],
        ],
      },
    ],
    culture: '意大利的地址里，街名前常有 **via**（街）、**piazza**（广场）、**corso**（大道）、**viale**（林荫道），门牌号写在街名之后（Via Roma 12）。**广场是城市的客厅**——人们在这里喝咖啡、聊天、等人。开车的游客要特别留意 **ZTL**（限行区）标志：误入老城区会被罚款。',
    speak: `
      Scusa, c'è una farmacia qui vicino? | 问附近有没有药店
      Sì, c'è una farmacia vicino alla stazione. | 回答：车站附近有一家
      Ci sono due supermercati in via Garibaldi. | 说：加里波第路上有两家超市
      La banca è davanti al bar. | 说银行在咖啡吧对面
    `,
    wr: [
      '写 3–4 句话描述你住的地方附近有什么、在哪里。（可以想象你在罗马的旅馆）',
      "Il mio albergo è in centro.\nC'è una farmacia vicino alla stazione.\nCi sono due bar davanti all'albergo.",
      '我的旅馆在市中心。车站附近有一家药店。旅馆对面有两家咖啡吧。',
    ],
    quiz: [
      ['"这附近有一家药店"应该说：', ["C'è una farmacia qui vicino.", 'Ci sono una farmacia qui vicino.', "C'è farmacie qui vicino."], 0, '单数用 c\'è。'],
      ['"有三家银行"应该说：', ['Ci sono tre banche.', "C'è tre banche.", 'Ci è tre banca.'], 0, '复数用 ci sono。'],
      ['stazione 的重音在：', ['zio（sta-ZIO-ne）', 'sta（STA-zio-ne）', 'ne（sta-zio-NE）'], 0, '-zione 重音在 zio。'],
      ['我住在罗马，应该说：', ['Abito a Roma.', 'Abito in Roma.', 'Abito da Roma.'], 0, '城市前用 a。'],
    ],
  },

  // ───────────────────────── 第 18 天 ─────────────────────────
  {
    n: 18, it: 'Posso? Voglio? Devo?', zh: '能？想？必须？',
    goal: '掌握情态动词 potere / volere / dovere 的变位和用法；会邀请、接受和婉拒；会说 Mi dispiace, ma devo…',
    scene: 'Marco 邀请你晚上去广场看音乐会，可你要先复习功课。',
    dlg: `
      Marco: Stasera c'è un concerto in piazza. Vuoi venire? | 今晚广场上有音乐会。你想来吗？
      Li Ming: Mi piacerebbe, ma devo studiare. | 我很想去，但我得学习。
      Marco: Peccato! Puoi venire dopo? Il concerto finisce a mezzanotte. | 真可惜！你能晚点来吗？音乐会午夜结束。
      Li Ming: Posso venire alle dieci, dopo lo studio. | 我可以十点来，学完以后。
      Marco: Perfetto! Possiamo mangiare un gelato prima. | 太好了！我们可以先吃个冰淇淋。
      Li Ming: Volentieri! Allora ci vediamo alle dieci. | 乐意！那我们十点见。
    `,
    key: [0, 1],
    q: [
      ['李明一开始为什么不能去？', ['他要学习', '他不喜欢音乐', '他生病了'], 0, 'devo studiare = 我得学习。'],
      ['他们约几点见面？', ['十点', '九点', '午夜'], 0, 'ci vediamo alle dieci。'],
      ['去音乐会前他们打算做什么？', ['吃冰淇淋', '喝咖啡', '吃晚饭'], 0, 'Possiamo mangiare un gelato prima.'],
    ],
    vocab: `
      potere | 能；可以 | po-TE-re
      volere | 想要 | vo-LE-re
      dovere | 必须；应该 | do-VE-re
      venire | 来 | ve-NI-re
      studiare | 学习 | stu-DIA-re
      stasera | 今晚 | sta-SE-ra
      il concerto | 音乐会 | il con-CER-to
      peccato! | 真可惜！ | pec-CA-to
      volentieri | 乐意 | vo-len-TIE-ri
      dopo | 之后 | DO-po
      prima | 之前；先 | PRI-ma
      allora | 那么；于是 | al-LO-ra
      ci vediamo | 回头见；我们见面 | ci ve-DIA-mo
      mi piacerebbe | 我很想（要是能……） | mi pia-ce-REB-be
      ma | 但是 | MA
    `,
    pron: {
      t: 'voglio、possiamo 里的长辅音',
      tips: [
        '**voglio** /ˈvɔʎʎo/、**vogliamo** /voʎˈʎamo/：gl 在这里读 /ʎ/ 且是长音，舌面要贴硬腭停一下。',
        '**posso、possiamo** 的 ss 是长清音；**dobbiamo** 的 bb 是长浊音。',
      ],
      drill: `
        posso | 我能
        possiamo | 我们能
        voglio | 我想要
        vogliamo | 我们想要
        devo | 我必须
        dobbiamo | 我们必须
        volentieri | 乐意
        peccato | 可惜
      `,
    },
    gram: [
      {
        h: '三个情态动词',
        p: ['情态动词后面接**动词原形**：Posso entrare?（我可以进去吗？）Devo andare.（我得走了。）Voglio mangiare.（我想吃。）'],
        t: [
          ['人称', 'potere（能）', 'volere（想）', 'dovere（必须）'],
          ['io', 'posso', 'voglio', 'devo'],
          ['tu', 'puoi', 'vuoi', 'devi'],
          ['lui / lei / Lei', 'può', 'vuole', 'deve'],
          ['noi', 'possiamo', 'vogliamo', 'dobbiamo'],
          ['voi', 'potete', 'volete', 'dovete'],
          ['loro', 'possono', 'vogliono', 'devono'],
        ],
      },
      {
        h: '邀请、接受与婉拒',
        t: [
          ['功能', '说法'],
          ['邀请', 'Vuoi venire? / Ti va di venire?'],
          ['愉快接受', 'Volentieri! / Certo! / Con piacere!'],
          ['婉拒', 'Mi dispiace, ma devo studiare.'],
          ['婉拒', 'Mi piacerebbe, ma non posso.'],
        ],
        eg: ['Vuoi venire? | 你想来吗？', 'Mi dispiace, ma non posso. | 抱歉，但我不能。', 'Volentieri! | 乐意！'],
      },
    ],
    culture: '被邀请时，意大利人常说 **Facciamo un aperitivo?**（去喝个开胃酒吧？）。**aperitivo**（傍晚 18:00–21:00）在米兰、罗马都很流行：点一杯饮品（常见 Spritz），吧台上有附送的小食。拒绝邀请时要给个理由并表达遗憾（Mi dispiace, ma…），直接说"不"会显得生硬。',
    speak: `
      Vuoi venire al concerto? | 邀请朋友去音乐会
      Mi piacerebbe, ma devo studiare. | 婉拒：我想去，但我得学习
      Posso venire alle dieci. | 说你十点可以来
      Volentieri! Ci vediamo alle dieci. | 愉快接受并约定时间
    `,
    wr: [
      '朋友邀请你周六去海边，但你得工作。写 3–4 句话：先表示想去，再说明原因，最后提出别的时间。',
      'Mi piacerebbe, ma sabato devo lavorare.\nPosso venire domenica?\nPeccato!',
      '我很想去，但周六我得工作。我周日可以去吗？真可惜！',
    ],
    quiz: [
      ['"我必须学习"应该说：', ['Devo studiare.', 'Posso studiare.', 'Voglio studiare io.'], 0, 'dovere = 必须。'],
      ['volere 的 tu 形式是：', ['vuoi', 'voli', 'vuole'], 0, 'volere：voglio, vuoi, vuole…'],
      ['情态动词后面的动词用：', ['原形（不定式）', '第一人称变位', '过去分词'], 0, 'Posso entrare. Devo andare.'],
      ['婉拒邀请时，最自然的说法是：', ['Mi dispiace, ma devo studiare.', 'No.', 'Non mi piace.'], 0, '给理由并表示遗憾。'],
    ],
  },

  // ───────────────────────── 第 19 天 ─────────────────────────
  {
    n: 19, it: 'Un giorno a Roma', zh: '罗马的一天',
    goal: '综合运用第二岛学过的内容：读一篇 80 词左右的日记，抓住时间、地点、数字、喜好；用现在时讲述一天的安排。',
    scene: '周六，你和 Giulia 约好一起逛罗马。早上你们先商量一天的安排，晚上你把这一天写进了日记。',
    dlg: `
      Giulia: Allora, che programma abbiamo oggi? | 那么，我们今天有什么安排？
      Li Ming: Alle nove visitiamo il Colosseo. | 九点我们参观斗兽场。
      Giulia: Va bene. Il biglietto costa dodici euro. | 好的。门票十二欧元。
      Li Ming: Poi mangiamo in una trattoria vicino a piazza Navona. | 然后我们在纳沃纳广场附近的小餐馆吃饭。
      Giulia: Ottima idea! Nel pomeriggio possiamo camminare in centro. | 好主意！下午我们可以在市中心散步。
      Li Ming: E la sera? C'è un concerto in piazza! | 晚上呢？广场上有音乐会！
      Giulia: Perfetto! Mi piace molto la musica. | 太好了！我很喜欢音乐。
      Li Ming: Allora, a stasera! | 那么，今晚见！
    `,
    key: [1, 5],
    text: {
      title: 'Il diario di Li Ming',
      body: `
        Oggi è sabato e sono a Roma. | 今天是星期六，我在罗马。
        Alle nove prendo un cappuccino e un cornetto al bar. | 九点，我在咖啡吧喝一杯卡布奇诺，吃一个牛角包。
        Poi visito il Colosseo con Giulia. Il biglietto costa dodici euro. | 然后我和朱莉娅一起参观斗兽场。门票十二欧元。

        A mezzogiorno abbiamo molta fame. Mangiamo gli spaghetti alla carbonara in una trattoria. | 中午我们很饿。我们在一家小餐馆吃卡邦尼意面。
        Mi piace molto la cucina italiana! | 我非常喜欢意大利菜！

        Nel pomeriggio camminiamo in centro e compro una borsa nera per trenta euro. | 下午我们在市中心散步，我花三十欧元买了一个黑色的包。
        La sera telefono ai miei genitori. Sono molto felici! | 晚上我给父母打电话。他们很开心！
      `,
    },
    rq: [
      ['李明早上做了什么？', ['在咖啡吧吃早餐', '参观斗兽场', '买包'], 0, 'Alle nove prendo un cappuccino e un cornetto.'],
      ['斗兽场的门票多少钱？', ['12 欧元', '30 欧元', '9 欧元'], 0, 'dodici euro。'],
      ['他们中午吃了什么？', ['卡邦尼意面', '披萨', '米饭'], 0, 'gli spaghetti alla carbonara。'],
      ['黑色的包多少钱？', ['30 欧元', '12 欧元', '50 欧元'], 0, 'una borsa nera per trenta euro。'],
      ['晚上李明做了什么？', ['给父母打电话', '去音乐会', '学习'], 0, 'telefono ai miei genitori。'],
    ],
    q: [
      ['九点他们去哪里？', ['斗兽场', '纳沃纳广场', '小餐馆'], 0, 'Alle nove visitiamo il Colosseo.'],
      ['午饭他们打算在哪里吃？', ['纳沃纳广场附近的小餐馆', '咖啡吧', '家里'], 0, 'una trattoria vicino a piazza Navona。'],
      ['晚上有什么活动？', ['广场上的音乐会', '看电影', '逛街'], 0, "C'è un concerto in piazza!"],
    ],
    vocab: `
      il programma | 安排；计划 | il pro-GRAM-ma
      visitare | 参观；拜访 | vi-si-TA-re
      il biglietto | 票 | il bi-GLIET-to
      la trattoria | 小餐馆 | la trat-to-RI-a
      comprare | 买 | com-PRA-re
      telefonare | 打电话 | te-le-fo-NA-re
      la mattina | 早上 | la mat-TI-na
      il pomeriggio | 下午 | il po-me-RIG-gio
      la sera | 晚上 | la SE-ra
      poi | 然后 | POI
      con | 和；用 | CON
      felice | 开心的 | fe-LI-ce
      ottima idea | 好主意 | OT-ti-ma i-DE-a
      il Colosseo | 斗兽场 | il Co-los-SE-o
    `,
    pron: {
      t: '读短文时的节奏',
      tips: [
        '读短文要按**意群**停顿，而不是逐词读：Alle nove / prendo un cappuccino / e un cornetto / al bar。',
        '句末下降，列举时每项末尾稍升、最后一项下降。注意双辅音：pomeriggio、biglietto、cappuccino。',
      ],
      drill: `
        biglietto | 票
        pomeriggio | 下午
        trattoria | 小餐馆
        programma | 安排
        Colosseo | 斗兽场
        telefono | 我打电话
        felice | 开心的
        visito | 我参观
      `,
    },
    gram: [
      {
        h: '读短文的三步策略',
        p: [
          '① **先抓"六要素"**：谁、什么时候、在哪里、做什么、多少钱、感受如何。',
          '② **先看时间词**（alle nove, a mezzogiorno, nel pomeriggio, la sera）——它们是文章的骨架。',
          '③ 遇到不认识的词，先跳过，用前后文猜；实在需要再查。',
        ],
      },
      {
        h: '第二岛句型速查',
        t: [
          ['场景', '句型'],
          ['点餐', 'Per primo prendo … / Il conto, per favore.'],
          ['饮食', 'Mangio … / Bevo … / Preferisco …'],
          ['购物', 'Quanto costa? / Posso avere uno sconto?'],
          ['时间', 'Che ore sono? / A che ora …?'],
          ['家人', 'Questo è mio padre. / Ho un fratello.'],
          ['喜好', 'Mi piace … / Mi piacciono …'],
          ['地点', "C'è … ? / Ci sono …"],
          ['邀请', 'Vuoi venire? / Mi dispiace, ma devo …'],
        ],
      },
    ],
    culture: '**斗兽场（Colosseo）**是罗马最热门的景点，旺季排队很长。**提前在官网订票并选定时间段**是最省时的办法；预约通常要出示有效证件。另外，意大利很多景区在每月第一个周日对公众免费开放，但也往往人山人海。',
    speak: `
      Allora, che programma abbiamo oggi? | 问朋友今天的安排
      Alle nove visitiamo il Colosseo. | 说九点参观斗兽场
      Poi mangiamo in una trattoria. | 说然后去小餐馆吃饭
      La sera c'è un concerto in piazza. | 说晚上有音乐会
    `,
    wr: [
      '用现在时写一篇 5–6 句的"我的一天"日记：早上、中午、下午、晚上各做了什么（换成你自己的计划）。',
      'Oggi è domenica. Alle nove prendo un caffè al bar.\nPoi visito il museo con un amico.\nA mezzogiorno mangiamo in una trattoria.\nLa sera telefono ai miei genitori.',
      '今天是星期日。九点我在咖啡吧喝咖啡。然后我和一个朋友参观博物馆。中午我们在小餐馆吃饭。晚上我给父母打电话。',
    ],
    quiz: [
      ['"九点"在意大利语里是：', ['alle nove', 'a nove', 'le nove ore'], 0, '时间点用 alle + 数字。'],
      ['la sera 表示：', ['晚上', '早上', '中午'], 0, 'la sera = 晚上。'],
      ['读短文时最先要抓的是：', ['时间、地点、人物等关键信息', '每个生词', '每个动词变位'], 0, '先抓大意，再抠细节。'],
    ],
  },

  // ───────────────────────── 第 20 天（岛屿关卡）─────────────────────────
  {
    n: 20, test: true, it: "Prova dell'isola 2", zh: '第二岛关卡：综合复习',
    goal: '把第 11–19 天的餐厅、饮食、购物、时间、家人、爱好、城市、邀请整合起来；学会让对话更自然的连接词和口头语；通过 20 题关卡，拿到生活岛徽章。',
    scene: '午后，你和 Giulia 在一家小餐馆吃饭，从点菜聊到家人，最后她邀请你周日去她家。',
    dlg: `
      Giulia: Che ore sono? Abbiamo fame! | 几点了？我们饿了！
      Li Ming: Sono le due. Mangiamo qualcosa? | 两点。我们吃点什么吧？
      Giulia: Sì! Per primo prendo la pasta, e tu? | 好！第一道我吃意面，你呢？
      Li Ming: Preferisco il riso, ma qui non c'è. Prendo gli gnocchi. | 我更喜欢米饭，但这里没有。我要团子。
      Giulia: Quanto costano? | 多少钱？
      Li Ming: Dieci euro. Non sono cari! | 十欧元。不贵！
      Giulia: Mia madre cucina gli gnocchi ogni domenica. | 我妈妈每个星期天都做团子。
      Li Ming: Davvero? Mi piacerebbe provare! | 真的吗？我很想尝尝！
      Giulia: Allora vieni a pranzo da noi domenica! | 那你周日来我们家吃午饭吧！
    `,
    key: [1, 8],
    q: [
      ['现在几点？', ['两点', '三点', '一点'], 0, 'Sono le due.'],
      ['Giulia 的妈妈每个星期天做什么？', ['团子', '意面', '披萨'], 0, 'cucina gli gnocchi ogni domenica。'],
      ['Giulia 邀请李明做什么？', ['周日去她家吃午饭', '周六去看音乐会', '明天一起逛街'], 0, 'vieni a pranzo da noi domenica。'],
    ],
    vocab: `
      quindi | 所以；因此 | QUIN-di
      comunque | 无论如何；反正 | co-MUN-que
      però | 不过；可是 | pe-RÒ
      anche | 也；还 | AN-che
      perché | 为什么；因为 | per-CHÉ
      forse | 也许 | FOR-se
      magari | 也许；要是……就好了 | ma-GA-ri
      dai! | 来吧！加油！ | DAI
      insomma | 总之；唉，还行吧 | in-SOM-ma
      dunque | 那么；因此 | DUN-que
      beh | 嗯；这个嘛 | BE
      proprio | 真的；正是 | PRO-prio
      qualcosa | 某物；点什么 | qual-CO-sa
      esatto! | 没错！ | e-SAT-to
    `,
    pron: {
      t: '口头语的语调',
      tips: [
        '**dai!、magari、insomma、beh、allora** 这类口头语在对话中很常见，语调要生动：Dai! 表示鼓励（"来吧！"），也可以表示不耐烦（"得了吧！"）——全靠语调。',
        '本岛发音自查：长辅音（pollo、bicchiere）、软 g（mangiare、leggere）、-zione 重音、三位数以内的数字重音。',
      ],
      drill: `
        allora | 那么
        magari | 也许
        insomma | 总之
        dunque | 那么
        proprio | 真的
        qualcosa | 某物
        esatto | 没错
        però | 不过
      `,
      twister: 'Sopra la panca la capra campa, sotto la panca la capra crepa. | 长凳上山羊活着，长凳下山羊死去。',
    },
    gram: [
      {
        h: '让对话自然的连接词与口头语',
        t: [
          ['词', '作用', '例句'],
          ['allora', '承接上文、转入新话题', 'Allora, che facciamo?'],
          ['poi', '然后', 'Prima mangiamo, poi camminiamo.'],
          ['però', '不过、转折', 'È bello, però è caro.'],
          ['magari', '也许；要是……就好了', 'Magari domani!'],
          ['dai', '鼓励、催促', 'Dai, andiamo!'],
          ['insomma', '总结；"还行吧"', 'Insomma, va bene.'],
          ['proprio', '真的、正是', 'È proprio buono!'],
        ],
      },
      {
        h: '第二岛复盘：你现在能做什么',
        p: ['订位与点餐、说饮食习惯、问价与讲价、说时间与日期、介绍家人、谈爱好、描述城市里有什么、邀请与婉拒。**如果其中哪一项还说不顺，回到那一天重做一遍"说"和"写"两个步骤。**'],
      },
    ],
    culture: '意大利人聊天时会用很多语气词（allora, dunque, beh, insomma, dai, magari）。**模仿这些口头语**，你的意大利语会立刻"听起来更像本地人"。注意：dai 和 magari 的含义随语气变化，多听、多模仿。',
    speak: `
      Allora, mangiamo qualcosa? | 用 allora 开头提议吃点东西
      Preferisco il riso, però qui non c'è. | 用 però 表示转折
      Dai! Ci vediamo alle dieci! | 用 dai 催促并约时间
      Mia madre cucina ogni domenica. | 说妈妈每周日做饭（换成你的情况）
    `,
    wr: [
      '写一段 6–7 句的小对话：两个人在餐厅点餐、问价、聊家人。要用到 allora、però、anche。',
      "Allora, che cosa prendi?\nPrendo la pasta, e tu?\nIo preferisco il riso, però prendo anche gli gnocchi.\nQuanto costano?\nDieci euro.\nMia madre cucina gli gnocchi ogni domenica.",
      '那么，你吃什么？我吃意面，你呢？我更喜欢米饭，不过我也要团子。多少钱？十欧元。我妈妈每周日都做团子。',
    ],
    quiz: [
      ['想表达"不过……"（转折），用：', ['però', 'poi', 'anche'], 0, 'però = 不过。'],
      ['Allora 常用来：', ['承接上文或引出新话题', '表示再见', '表示价格'], 0, 'allora = 那么。'],
      ['"我也喜欢"是：', ['Anche a me.', 'Anche me piace.', 'Neanche a me.'], 0, 'anche a me = 我也是。'],
      ['Esatto! 的意思是：', ['没错！', '好吃！', '再见！'], 0, 'esatto = 正是如此。'],
    ],
  },
]);
