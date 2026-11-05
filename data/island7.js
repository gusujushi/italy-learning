/* 第 7 岛 · 记忆岛 Isola dei Ricordi（第 61–70 天） */
Course.add([
  // ───────────────────────── 第 61 天 ─────────────────────────
  {
    n: 61, it: 'Da piccolo…', zh: '小时候……',
    goal: '掌握未完成过去时（imperfetto）的构成与不规则形式（essere, fare, dire, bere）；会用它说过去的习惯、描述和背景。',
    scene: '周末的晚上，你和 Giulia 在阳台上聊起各自的童年：住在哪里、放学后做什么、喜欢什么科目。',
    dlg: `
      Giulia: Com'era la tua vita da bambino? | 你小时候的生活是怎样的？
      Li Ming: Abitavo in un piccolo paese vicino al mare. | 我住在一个靠海的小镇。
      Giulia: E che cosa facevi dopo la scuola? | 放学后你做什么？
      Li Ming: Giocavo a calcio con gli amici e la sera cenavo con i nonni. | 我和朋友们踢足球，晚上和爷爷奶奶一起吃饭。
      Giulia: Ti piaceva studiare? | 你喜欢学习吗？
      Li Ming: Sì, ma non mi piaceva la matematica. Ero più bravo in storia. | 喜欢，但我不喜欢数学。我历史学得更好。
      Giulia: Anch'io ero così! Passavo ore in biblioteca. | 我也是这样！我在图书馆一待就是几个小时。
    `,
    q: [
      ['李明小时候住在哪里？', ['靠海的小镇', '大城市中心', '山里'], 0, 'in un piccolo paese vicino al mare。'],
      ['放学后他常做什么？', ['踢足球', '看电视', '学钢琴'], 0, 'Giocavo a calcio con gli amici。'],
      ['他哪一科更好？', ['历史', '数学', '音乐'], 0, 'Ero più bravo in storia.'],
    ],
    vocab: `
      da bambino | 小时候（男） | da bam-BI-no
      da bambina | 小时候（女） | da bam-BI-na
      l'infanzia | 童年 | l'in-FAN-zia
      il paese | 小镇；国家 | il pa-E-se
      la scuola elementare | 小学 | la SCUO-la e-le-men-TA-re
      il compagno di classe | 同学 | il com-PA-gno di CLAS-se
      la matematica | 数学 | la ma-te-MA-ti-ca
      la storia | 历史；故事 | la STO-ria
      passare | 度过；经过 | pas-SA-re
      una volta | 从前；有一次 | U-na VOL-ta
      quando ero piccolo | 我小时候 | QUAN-do E-ro PIC-co-lo
      ogni estate | 每个夏天 | O-gni e-STA-te
      il cortile | 院子；庭院 | il cor-TI-le
      il gioco | 游戏；玩具 | il GIO-co
    `,
    pron: {
      t: '未完成过去时的重音',
      tips: [
        '第一、二人称和第三人称单数的重音在 **-va-**：gio-**CA**-vo、gio-**CA**-vi、gio-**CA**-va；**复数 -vano 的重音在词干**：gio-**CA**-va-no（倒数第三音节）、fa-**CE**-va-no。',
        '**giocavamo** gio-ca-**VA**-mo，**giocavate** gio-ca-**VA**-te：noi / voi 的重音在 -va- 上。',
      ],
      drill: `
        giocavo | 我那时玩
        giocavamo | 我们那时玩
        giocavano | 他们那时玩
        facevo | 我那时做
        ero | 我那时是
        passavo | 我那时度过
      `,
    },
    gram: [
      {
        h: '未完成过去时（imperfetto）：构成',
        p: ['去掉不定式词尾 -re，加词尾：-are → **-avo**，-ere → **-evo**，-ire → **-ivo**，所有人称的词尾相同（-vo, -vi, -va, -vamo, -vate, -vano）。'],
        t: [
          ['人称', 'parlare', 'prendere', 'dormire'],
          ['io', 'parlavo', 'prendevo', 'dormivo'],
          ['tu', 'parlavi', 'prendevi', 'dormivi'],
          ['lui / lei / Lei', 'parlava', 'prendeva', 'dormiva'],
          ['noi', 'parlavamo', 'prendevamo', 'dormivamo'],
          ['voi', 'parlavate', 'prendevate', 'dormivate'],
          ['loro', 'parlavano', 'prendevano', 'dormivano'],
        ],
      },
      {
        h: '几个不规则动词',
        t: [
          ['动词', 'io', 'tu', 'lui / lei', 'noi', 'voi', 'loro'],
          ['essere', 'ero', 'eri', 'era', 'eravamo', 'eravate', 'erano'],
          ['fare', 'facevo', 'facevi', 'faceva', 'facevamo', 'facevate', 'facevano'],
          ['dire', 'dicevo', 'dicevi', 'diceva', 'dicevamo', 'dicevate', 'dicevano'],
          ['bere', 'bevevo', 'bevevi', 'beveva', 'bevevamo', 'bevevate', 'bevevano'],
        ],
        p: ['**essere** 的不规则最重要：**ero、eri、era**；其余三个只是用旧词干（fac-, dic-, bev-）加规则词尾。'],
      },
      {
        h: '什么时候用 imperfetto？',
        t: [
          ['用法', '例句', '常见时间词'],
          ['过去的习惯', 'Giocavo a calcio ogni giorno.', 'sempre, spesso, ogni giorno, di solito, da piccolo'],
          ['描述（人、物、天气、年龄）', 'Faceva freddo. Ero molto timido.', 'quando ero piccolo'],
          ['过去正在进行的事（背景）', 'Cenavamo con i nonni.', 'mentre, in quel periodo'],
        ],
      },
    ],
    text: {
      title: "L'infanzia di Marco",
      body: `
        Da bambino abitavo in un piccolo paese vicino al mare. | 小时候我住在一个靠海的小镇。
        Ogni estate passavo tutto il giorno in spiaggia con i miei cugini. | 每个夏天，我整天和表兄弟们待在海滩上。

        La mattina andavamo a pescare e il pomeriggio giocavamo a pallone. | 早上我们去钓鱼，下午踢球。
        La sera mia nonna cucinava il pesce e noi mangiavamo tutti insieme. | 晚上奶奶做鱼，我们大家一起吃。
        Era una vita semplice, ma ero molto felice. | 那是简单的生活，但我很幸福。
      `,
    },
    rq: [
      ['夏天他们白天做什么？', ['在海滩玩、钓鱼、踢球', '在家学习', '去城里'], 0, 'in spiaggia… pescare… pallone。'],
      ['谁做晚饭？', ['奶奶', '妈妈', '他自己'], 0, 'mia nonna cucinava il pesce。'],
    ],
    culture: '**童年的夏天**在意大利人的记忆里常常和**海边、祖父母、冰淇淋**连在一起。很多意大利家庭夏天把孩子送去祖父母家，所以 **la nonna** 在意大利人的童年叙述中占有特别的位置。',
    speak: `
      Com'era la tua vita da bambino? | 问朋友小时候的生活
      Da piccolo abitavo in un piccolo paese. | 说你小时候住在小镇
      Giocavo a calcio con gli amici. | 说你小时候和朋友踢球
      Ero più bravo in storia che in matematica. | 说你历史比数学好
    `,
    wr: [
      '写 5 句话讲你的童年：住在哪里、常做什么、喜欢什么、不喜欢什么、那时的你是什么样（用 imperfetto）。',
      "Da bambino abitavo in una grande città.\nDopo la scuola giocavo con gli amici nel cortile.\nMi piaceva molto leggere.\nNon mi piaceva la matematica.\nEro un bambino timido ma felice.",
      '小时候我住在一座大城市。放学后我和朋友们在院子里玩。我非常喜欢读书。我不喜欢数学。我是个害羞但快乐的孩子。',
    ],
    quiz: [
      ['"我那时住在……"（io, abitare）：', ['abitavo', 'abitai', 'abitavi'], 0, 'io 的 imperfetto 词尾是 -vo。'],
      ['essere 的 imperfetto，io 形式：', ['ero', 'sono stato', 'fui'], 0, 'ero。'],
      ['"我们那时常玩"（giocare, noi）：', ['giocavamo', 'giochiamo', 'giocavano'], 0, 'noi → -vamo。'],
      ['描述"那时天很冷"：', ['Faceva freddo.', 'Ha fatto freddo.', 'Farà freddo.'], 0, '描述背景用 imperfetto。'],
    ],
  },

  // ───────────────────────── 第 62 天 ─────────────────────────
  {
    n: 62, it: 'Mentre mangiavo…', zh: '我吃饭时……',
    goal: '分清 imperfetto（背景、正在进行）与 passato prossimo（完成的事件、打断）；会用 mentre / quando 把两种时态组合起来讲发生了什么。',
    scene: 'Marco 很奇怪：昨晚给你打电话你没接。你向他解释当时到底在做什么、发生了什么。',
    dlg: `
      Marco: Perché non hai risposto al telefono ieri sera? | 你昨晚为什么没接电话？
      Li Ming: Mentre cucinavo, il telefono era in un'altra stanza e non l'ho sentito. | 我做饭的时候，手机在另一个房间，我没听到。
      Marco: Ho capito. Quando ti ho chiamato, che cosa facevi? | 明白了。我打给你时，你在做什么？
      Li Ming: Preparavo la cena per Giulia: faceva freddo e volevo fare una zuppa. | 我在给朱莉娅做晚饭：天很冷，我想做汤。
      Marco: E poi che cos'è successo? | 后来发生了什么？
      Li Ming: È arrivata Giulia, mentre mettevo il sale, e abbiamo mangiato insieme. | 朱莉娅来了，当时我正在放盐，然后我们一起吃了饭。
      Marco: Allora tutto è andato bene! | 那么一切都顺利！
    `,
    q: [
      ['李明为什么没接电话？', ['手机在另一个房间', '他在睡觉', '他没带手机'], 0, 'il telefono era in un\'altra stanza。'],
      ['他当时在做什么？', ['做晚饭', '看电影', '学习'], 0, 'Preparavo la cena。'],
      ['后来谁来了？', ['朱莉娅', '马可', '基娅拉'], 0, 'È arrivata Giulia。'],
    ],
    vocab: `
      mentre | 当……时；而 | MEN-tre
      rispondere | 回答；接（电话） | ri-SPON-de-re
      sentire | 听见；感觉 | sen-TI-re
      la stanza | 房间 | la STAN-za
      la zuppa | 汤 | la ZUP-pa
      che cos'è successo? | 发生了什么？ | ke co-SÈ suc-CES-so
      succedere | 发生 | suc-CE-de-re
      all'improvviso | 突然 | all'im-prov-VI-so
      per caso | 偶然 | per CA-so
      in quel momento | 那时 | in quel mo-MEN-to
      il campanello | 门铃 | il cam-pa-NEL-lo
      suonare | 响；演奏 | suo-NA-re
      il rumore | 声音；噪音 | il ru-MO-re
      volevo | 我那时想 | vo-LE-vo
    `,
    gram: [
      {
        h: 'imperfetto 与 passato prossimo：一个是"背景"，一个是"事件"',
        t: [
          ['', 'imperfetto', 'passato prossimo'],
          ['作用', '背景、持续、习惯、描述', '完成的、有开始有结束的事件'],
          ['像……', '画面的底色', '画面里发生的动作'],
          ['例句', 'Cucinavo. / Pioveva. / Era tardi.', "Ho sentito un rumore. / È arrivata Giulia."],
          ['信号词', 'mentre, sempre, di solito, ogni giorno', "ieri, un giorno, all'improvviso, poi, alla fine"],
        ],
      },
      {
        h: '两个时态合用：持续的事被打断',
        p: ['**Mentre** / **Quando** 引出**正在进行的背景**（imperfetto），主句是**打断它的事件**（passato prossimo）：**Mentre mangiavo, è arrivato Marco.**'],
        eg: [
          'Mentre mangiavo, è arrivato Marco. | 我吃饭的时候，马可来了。',
          'Pioveva e sono rimasto a casa. | 当时在下雨，所以我待在家里。',
          'Cenavo quando è suonato il campanello. | 我正在吃晚饭，门铃响了。',
        ],
      },
      {
        h: 'volere / potere / dovere 的 imperfetto',
        p: ['过去的"想要、能、应该"多用 imperfetto：**Volevo** fare una zuppa.（我那时想做汤。）**Potevo** venire.（我那时本可以来。）**Dovevo** studiare.（我那时本应学习。）'],
      },
    ],
    text: {
      title: 'Che cosa è successo?',
      body: `
        Ieri sera pioveva e io ero a casa. | 昨晚下着雨，我在家里。
        Guardavo un film quando è andata via la luce. | 我正在看电影，突然停电了。

        Ho acceso una candela e ho chiamato il vicino. | 我点了根蜡烛，给邻居打了电话。
        Mentre parlavamo, la luce è tornata all'improvviso. | 我们说话的时候，电突然来了。
      `,
    },
    rq: [
      ['停电时他在做什么？', ['看电影', '做饭', '睡觉'], 0, 'Guardavo un film。'],
      ['电是什么时候恢复的？', ['他们打电话时', '第二天', '他睡着后'], 0, 'Mentre parlavamo。'],
    ],
    culture: '意大利老房子里偶尔会**停电（blackout）**，尤其在夏季用电高峰。很多意大利人家里还留着**蜡烛和手电筒**。讲故事时，用 imperfetto 铺陈"当时是什么样"，再用 passato prossimo 讲"突然发生了什么"，是最地道的叙事方式。',
    speak: `
      Che cosa facevi quando ti ho chiamato? | 问对方我打给你时在做什么
      Mentre cucinavo, il telefono era in un'altra stanza. | 说你做饭时手机在另一间屋
      Pioveva e sono rimasto a casa. | 说当时下雨，你留在家里
      Che cos'è successo? | 问：发生了什么
    `,
    wr: [
      '用 imperfetto 和 passato prossimo 写 4–5 句话：当时你正在做什么，突然发生了什么，然后怎么样了。',
      "Ieri sera leggevo un libro quando ha suonato il telefono.\nEra Marco e voleva uscire.\nFaceva freddo, ma sono uscito lo stesso.\nAbbiamo mangiato una pizza insieme.",
      '昨晚我正在读书，电话响了。是马可，他想出去。天很冷，但我还是出去了。我们一起吃了披萨。',
    ],
    quiz: [
      ['"我吃饭的时候马可来了"：', ['Mentre mangiavo, è arrivato Marco.', 'Mentre ho mangiato, arrivava Marco.', 'Mentre mangio, è arrivato Marco.'], 0, '背景用 imperfetto，事件用 passato prossimo。'],
      ['描述当时的天气（背景）：', ['Pioveva.', 'Ha piovuto.', 'Pioverà.'], 0, '背景描述用 imperfetto。'],
      ['"突然，门铃响了"：', ["All'improvviso è suonato il campanello.", "All'improvviso suonava il campanello.", "All'improvviso suonerà il campanello."], 0, '突发事件用 passato prossimo。'],
      ['mentre 后面通常接：', ['正在进行的动作（imperfetto）', '将来的动作', '命令式'], 0, 'mentre + imperfetto。'],
    ],
  },

  // ───────────────────────── 第 63 天 ─────────────────────────
  {
    n: 63, it: 'C’era una volta', zh: '从前……',
    goal: '会听和讲一个简单的故事：用 C\'era una volta… 开场，用 imperfetto 铺陈背景、passato prossimo 推进情节；认识童话里的常用词。',
    scene: '睡前，奶奶给小孙子讲《小红帽》。孩子一边听一边插嘴提问。',
    dlg: `
      Nonna: C'era una volta una bambina che si chiamava Cappuccetto Rosso. | 从前有一个小女孩，名叫小红帽。
      Nipote: Abitava vicino al bosco? | 她住在森林附近吗？
      Nonna: Sì. Un giorno la mamma le ha dato un cestino per la nonna. | 是的。有一天妈妈给了她一个篮子，让她带给奶奶。
      Nipote: E nel bosco ha incontrato il lupo? | 她在森林里遇到狼了吗？
      Nonna: Sì! Il lupo era grande e cattivo, ma la bambina non aveva paura. | 是的！狼又大又坏，但小女孩并不害怕。
      Nipote: Alla fine che cos'è successo? | 最后怎么样了？
      Nonna: Un cacciatore ha salvato la nonna e tutti sono vissuti felici e contenti. | 一个猎人救了奶奶，大家从此幸福地生活在一起。
    `,
    q: [
      ['小女孩叫什么？', ['小红帽', '白雪公主', '灰姑娘'], 0, 'Cappuccetto Rosso。'],
      ['她要把篮子带给谁？', ['奶奶', '猎人', '妈妈'], 0, 'un cestino per la nonna。'],
      ['谁救了奶奶？', ['猎人', '小女孩', '妈妈'], 0, 'Un cacciatore ha salvato la nonna。'],
    ],
    vocab: `
      c'era una volta | 从前有…… | C'E-ra U-na VOL-ta
      il re | 国王 | il RE
      la regina | 王后 | la re-GI-na
      il principe | 王子 | il PRIN-ci-pe
      la principessa | 公主 | la prin-ci-PES-sa
      il bosco | 森林 | il BO-sco
      il lupo | 狼 | il LU-po
      il drago | 龙 | il DRA-go
      la strega | 女巫 | la STRE-ga
      la fata | 仙女 | la FA-ta
      il cacciatore | 猎人 | il cac-cia-TO-re
      cattivo | 坏的 | cat-TI-vo
      salvare | 拯救 | sal-VA-re
      felici e contenti | 幸福快乐 | fe-LI-ci e con-TEN-ti
    `,
    gram: [
      {
        h: '讲故事的结构',
        t: [
          ['部分', '常用说法', '时态'],
          ['开场', "C'era una volta… / Un tempo…", 'imperfetto'],
          ['背景', 'Era… Abitava… Aveva…（人物、地点、天气）', 'imperfetto'],
          ['事件', 'Un giorno… Poi… All\'improvviso… A un certo punto…', 'passato prossimo'],
          ['结局', 'Alla fine… Così… E vissero felici e contenti.', 'passato prossimo（口语）'],
        ],
      },
      {
        h: "c'era / c'erano 与 era / erano",
        eg: [
          "C'era una volta un re. | 从前有一个国王。",
          "C'erano tre fratelli. | 有三个兄弟。",
          'Era un lupo grande e cattivo. | 那是一匹又大又坏的狼。',
        ],
        p: ['**c\'era / c\'erano** 是 **c\'è / ci sono** 的 imperfetto，用于"从前有……"。书面童话里常用**远过去时**（passato remoto）：**disse**（说了）、**andò**（去了）、**vissero**（生活了）——现在先**认识**，不必会用。'],
      },
    ],
    text: {
      title: 'Il drago e il panettiere',
      body: `
        C'era una volta un panettiere che viveva in un piccolo villaggio. | 从前有一位面包师，住在一个小村庄里。
        Ogni mattina preparava il pane più buono della regione. | 每天早上，他做这个地区最好吃的面包。

        Un giorno un drago è arrivato al villaggio e aveva molta fame. | 有一天，一条龙来到村里，它非常饿。
        Tutti avevano paura, ma il panettiere gli ha offerto un panino caldo. | 大家都很害怕，但面包师给了它一个热面包。

        Il drago ha mangiato e ha sorriso: non era cattivo, aveva solo fame! | 龙吃完笑了：它并不坏，只是饿了！
        Da quel giorno il drago ha protetto il villaggio e il panettiere ha fatto il pane per lui ogni mattina. | 从那天起，龙保护着村子，面包师每天早上为它做面包。
      `,
    },
    rq: [
      ['面包师做什么工作？', ['做面包', '做奶酪', '打猎'], 0, 'un panettiere。'],
      ['龙为什么来到村子？', ['它很饿', '它想打架', '它迷路了'], 0, 'aveva molta fame。'],
      ['故事的结局是？', ['龙保护村子，面包师每天为它做面包', '龙飞走了', '龙吃了面包师'], 0, 'il drago ha protetto il villaggio…'],
    ],
    culture: '意大利童话里的**狼（lupo）、女巫（strega）、仙女（fata）**随处可见。你可能知道的意大利经典：**《木偶奇遇记》（Pinocchio）**、**《爱的教育》（Cuore）**，都是 19 世纪的作品。第 85 天我们会读《木偶奇遇记》的开头！',
    speak: `
      C'era una volta un re e una regina. | 用 C'era una volta 开场
      Il lupo era grande e cattivo. | 描述狼
      Un giorno un cacciatore ha salvato la nonna. | 说猎人救了奶奶
      E vissero felici e contenti! | 用童话结尾
    `,
    wr: [
      '写一个 5–6 句的小故事：用 "C\'era una volta…" 开头，写人物和背景（imperfetto），再写发生的事（passato prossimo）和结局。',
      "C'era una volta una principessa che viveva in un castello.\nUn giorno ha incontrato un drago nel bosco.\nIl drago era grande, ma non era cattivo.\nLa principessa gli ha dato del pane.\nDa quel giorno sono diventati amici.",
      '从前有一位公主，住在一座城堡里。有一天她在森林里遇到一条龙。龙很大，但并不坏。公主给了它一些面包。从那天起，它们成了朋友。',
    ],
    quiz: [
      ['故事的开场固定说法是：', ["C'era una volta", 'Ieri sera', 'Una volta dopo'], 0, "c'era una volta = 从前。"],
      ['描述人物背景用：', ['imperfetto', 'passato prossimo', '将来时'], 0, '背景 = imperfetto。'],
      ['"有三个兄弟"（从前）：', ["C'erano tre fratelli.", "C'è tre fratelli.", "Ci sono stati tre fratelli."], 0, "c'erano = ci sono 的 imperfetto。"],
      ['"幸福快乐"在童话里：', ['felici e contenti', 'tristi e soli', 'ricchi e stanchi'], 0, 'felici e contenti。'],
    ],
  },

  // ───────────────────────── 第 64 天 ─────────────────────────
  {
    n: 64, it: 'Mi ricordo', zh: '我记得',
    goal: '会说回忆与情绪（Mi ricordo che…, Ero emozionato…）；掌握 piacere 的近过去时（mi è piaciuto / mi sono piaciuti）；认识常见的情绪形容词。',
    scene: '两个月后，你和 Giulia 一起翻看刚到罗马时拍的照片，回忆那些兴奋、迷路和第一块披萨。',
    dlg: `
      Giulia: Ti ricordi il nostro primo giorno a Roma? | 你还记得我们在罗马的第一天吗？
      Li Ming: Certo che mi ricordo! Ero molto emozionato e un po' nervoso. | 当然记得！我当时非常激动，也有点紧张。
      Giulia: Sì, e ti sei perso tre volte! | 对，你还迷了三次路！
      Li Ming: Hai ragione! Ma mi è piaciuta molto la città, mi sono piaciuti soprattutto i vicoli. | 你说得对！但我非常喜欢这座城市，尤其喜欢那些小巷。
      Giulia: Eri contento anche quando hai mangiato la prima pizza? | 你吃第一块披萨时也很高兴吗？
      Li Ming: Contentissimo! Non dimentico mai quel sapore. | 太高兴了！我永远不会忘记那个味道。
    `,
    q: [
      ['李明第一天心情怎样？', ['激动、有点紧张', '很无聊', '很生气'], 0, 'emozionato e un po\' nervoso。'],
      ['他迷了几次路？', ['三次', '一次', '五次'], 0, 'ti sei perso tre volte。'],
      ['他尤其喜欢什么？', ['小巷', '博物馆', '喷泉'], 0, 'mi sono piaciuti soprattutto i vicoli。'],
    ],
    vocab: `
      ricordare | 记得；使想起 | ri-cor-DA-re
      ricordarsi | 记得 | ri-cor-DAR-si
      dimenticare | 忘记 | di-men-ti-CA-re
      emozionato | 激动的 | e-mo-zio-NA-to
      nervoso | 紧张的 | ner-VO-so
      contento | 高兴的 | con-TEN-to
      triste | 悲伤的 | TRI-ste
      arrabbiato | 生气的 | ar-rab-BIA-to
      preoccupato | 担心的 | pre-oc-cu-PA-to
      annoiato | 无聊的 | an-no-IA-to
      perdersi | 迷路 | PER-der-si
      il vicolo | 小巷 | il VI-co-lo
      il sapore | 味道 | il sa-PO-re
      soprattutto | 尤其 | so-prat-TUT-to
    `,
    gram: [
      {
        h: '回忆：ricordare 与 ricordarsi',
        t: [
          ['结构', '例句'],
          ['ricordare + 宾语', 'Ricordo quel giorno.（我记得那天）'],
          ['ricordarsi di + 名词 / che…', 'Mi ricordo di quel giorno. / Mi ricordo che pioveva.'],
          ['ricordarsi + 宾语（口语）', 'Ti ricordi Marco?（你记得马可吗？）'],
          ['dimenticare / dimenticarsi', 'Non dimentico mai quel sapore. / Mi sono dimenticato le chiavi.'],
        ],
      },
      {
        h: 'piacere 的近过去时：用 essere，分词与"被喜欢的东西"一致',
        t: [
          ['想说', '意大利语'],
          ['我喜欢那部电影', 'Mi è piaciuto il film.'],
          ['我喜欢那座城市', 'Mi è piaciuta la città.'],
          ['我喜欢那些小巷', 'Mi sono piaciuti i vicoli.'],
          ['我不喜欢那些鞋', 'Non mi sono piaciute le scarpe.'],
        ],
        p: ['**piaciuto / piaciuta / piaciuti / piaciute** 要和**被喜欢的东西**的性数一致，助动词永远是 **essere**。'],
      },
      {
        h: '情绪怎么说',
        eg: ['Ero molto emozionato. | 我当时非常激动。', 'Sono contentissimo! | 我太高兴了！', 'Era preoccupata per l\'esame. | 她当时在为考试担心。'],
      },
    ],
    text: {
      title: 'Un ricordo',
      body: `
        Mi ricordo il giorno in cui sono arrivato in Italia. | 我记得我到意大利的那一天。
        Pioveva e avevo una valigia enorme. | 天在下雨，我带着一个巨大的行李箱。

        Ero stanco ma molto emozionato. | 我很累，但非常激动。
        La prima sera ho mangiato una pizza e mi è piaciuta tantissimo. | 第一天晚上我吃了披萨，特别喜欢。
        Non dimenticherò mai quel giorno! | 我永远不会忘记那一天！
      `,
    },
    rq: [
      ['他到意大利那天天气怎样？', ['下雨', '晴天', '下雪'], 0, 'Pioveva。'],
      ['他当时的心情？', ['累但激动', '生气', '无聊'], 0, 'stanco ma molto emozionato。'],
    ],
    culture: '意大利人**非常爱怀旧**：老电影、旧歌、小时候的味道（**il sapore dell\'infanzia**）经常被提起。谈起回忆，**"Ai miei tempi…"**（在我那个年代……）几乎是老一辈人的口头禅。',
    speak: `
      Ti ricordi il primo giorno a Roma? | 问对方还记得第一天吗
      Ero molto emozionato e un po' nervoso. | 说你当时又激动又紧张
      Mi è piaciuta molto la città. | 说你很喜欢那座城市
      Non dimentico mai quel sapore. | 说你忘不了那个味道
    `,
    wr: [
      '写 5 句话讲一个你难忘的回忆：什么时候、在哪里、你的心情、你喜欢什么。',
      "Mi ricordo il mio primo viaggio in Italia.\nEro molto emozionato e un po' nervoso.\nMi è piaciuta molto Firenze.\nMi sono piaciuti soprattutto i musei.\nNon dimenticherò mai quel viaggio.",
      '我记得我第一次去意大利的旅行。我当时非常激动，也有点紧张。我非常喜欢佛罗伦萨。我尤其喜欢那些博物馆。我永远不会忘记那次旅行。',
    ],
    quiz: [
      ['"我喜欢那座城市（la città）"（过去）：', ['Mi è piaciuta la città.', 'Mi è piaciuto la città.', 'Ho piaciuto la città.'], 0, 'essere + piaciuta（与 la città 一致）。'],
      ['"我喜欢那些小巷（i vicoli）"：', ['Mi sono piaciuti i vicoli.', 'Mi è piaciuto i vicoli.', 'Mi sono piaciute i vicoli.'], 0, 'piaciuti（阳复）。'],
      ['"我记得那天"：', ['Mi ricordo di quel giorno.', 'Mi ricordare quel giorno.', 'Ricordo mi quel giorno.'], 0, 'ricordarsi di。'],
      ['arrabbiato 的意思是：', ['生气的', '高兴的', '悲伤的'], 0, 'arrabbiato = 生气。'],
    ],
  },

  // ───────────────────────── 第 65 天 ─────────────────────────
  {
    n: 65, it: 'Il libro che ho letto', zh: '我读过的书',
    goal: '掌握关系代词 che 与 cui（in cui, di cui, a cui, con cui, per cui）；会用 perché / siccome / quindi / anche se 等连接词把短句连成长句。',
    scene: 'Chiara 向你推荐过一本小说。你读完后，两人聊起书、故事发生的城市，还有改编的电影。',
    dlg: `
      Chiara: Hai letto il libro che ti ho consigliato? | 你读了我推荐给你的那本书吗？
      Li Ming: Sì, l'ho finito ieri. È la storia di una famiglia di Napoli, di cui ho sentito molto parlare. | 读了，我昨天读完的。是一个那不勒斯家庭的故事，我听很多人谈到过它。
      Chiara: Anche se è lungo, è bellissimo, vero? | 虽然很长，但很棒，对吧？
      Li Ming: Sì, e mi piace la città in cui è ambientato. | 是的，我也喜欢故事发生的那座城市。
      Chiara: Allora puoi vedere anche il film che hanno tratto dal libro. | 那你也可以看根据这本书改编的电影。
      Li Ming: Ottima idea! Siccome stasera sono libero, lo guardo subito. | 好主意！既然今晚有空，我马上看。
    `,
    q: [
      ['李明读完了什么？', ['Chiara 推荐的书', '一份报纸', '一封信'], 0, 'il libro che ti ho consigliato。'],
      ['故事发生在哪里？', ['那不勒斯', '罗马', '米兰'], 0, 'una famiglia di Napoli。'],
      ['李明今晚打算做什么？', ['看电影', '读书', '做饭'], 0, 'lo guardo subito（il film）。'],
    ],
    vocab: `
      consigliare | 推荐；建议 | con-si-GLIA-re
      finire | 结束；读完 | fi-NI-re
      la storia | 故事；历史 | la STO-ria
      ambientato | 以……为背景的 | am-bien-TA-to
      il film | 电影 | il FILM
      tratto da | 改编自 | TRAT-to da
      che | 关系代词：……的 | KE
      cui | 关系代词（与介词连用） | CUI
      in cui | 在其中（地点 / 时间） | in CUI
      di cui | 关于其（的） | di CUI
      anche se | 即使；虽然 | AN-che SE
      siccome | 既然；因为 | sic-CO-me
      quindi | 所以；因此 | QUIN-di
      lungo | 长的 | LUN-go
    `,
    gram: [
      {
        h: '关系代词 che 与 cui',
        p: ['**che**：不变化，代替**主语**或**直接宾语**（前面没有介词）：Il libro **che** leggo；Il ragazzo **che** parla。**cui**：前面有**介词**时用：in cui、di cui、a cui、con cui、per cui。'],
        t: [
          ['结构', '例句'],
          ['che（主语）', 'Il ragazzo che parla è mio fratello.'],
          ['che（宾语）', 'Il libro che ho letto è bellissimo.'],
          ['in cui', 'La città in cui abito è piccola.'],
          ['di cui', 'Il film di cui parli è famoso.'],
          ['a cui', "L'amico a cui scrivo vive a Roma."],
          ['con cui', 'La persona con cui lavoro è simpatica.'],
          ['per cui', 'Il motivo per cui sono qui è lo studio.'],
        ],
      },
      {
        h: '连接词：让句子更长更自然',
        t: [
          ['功能', '连接词', '例句'],
          ['原因', 'perché, siccome, poiché', 'Siccome piove, resto a casa.'],
          ['结果', 'quindi, perciò, così', 'Sono stanco, quindi vado a letto.'],
          ['转折', 'ma, però, tuttavia', 'È bello, però è caro.'],
          ['让步', 'anche se, benché（+虚拟式）', 'Anche se è lungo, è bellissimo.'],
          ['时间', 'quando, mentre, dopo che', 'Quando arrivo, ti chiamo.'],
        ],
        p: ['**perché** 在句首提问时是"为什么"，在句中是"因为"：Perché studi italiano? — **Perché** mi piace。'],
      },
    ],
    text: {
      title: 'Una recensione',
      body: `
        Ho appena finito il libro che mi ha consigliato Chiara. | 我刚读完基娅拉推荐给我的那本书。
        È la storia di una famiglia di Napoli negli anni Cinquanta. | 讲的是一个五十年代那不勒斯家庭的故事。

        Anche se è lungo, non è mai noioso. | 虽然很长，但一点也不无聊。
        La città in cui è ambientato sembra un personaggio. | 故事发生的那座城市本身就像一个人物。
        Quindi lo consiglio a tutti: leggetelo! | 所以我向大家推荐：去读吧！
      `,
    },
    rq: [
      ['这本书讲什么？', ['一个那不勒斯家庭的故事', '一次旅行', '一个侦探'], 0, 'la storia di una famiglia di Napoli。'],
      ['作者对这本书的评价？', ['虽然长但不无聊', '很无聊', '太难读'], 0, 'Anche se è lungo, non è mai noioso。'],
    ],
    culture: '**那不勒斯**是许多意大利小说和电影的背景。**埃莱娜·费兰特的《我的天才女友》（L\'amica geniale）**讲述的就是两位那不勒斯女孩的友谊，在全世界拥有大量读者。如果你想用意大利语读一本小说，**可以从这类对话较多的现代小说开始**。',
    speak: `
      Hai letto il libro che ti ho consigliato? | 问对方读了没有
      La città in cui abito è piccola. | 用 in cui 造句
      Anche se è lungo, è bellissimo. | 说虽然很长但很棒
      Siccome stasera sono libero, guardo il film. | 说既然今晚有空，我就看电影
    `,
    wr: [
      '写一段 5–6 句的短评：你最近看的一本书或一部电影——什么内容、在哪里发生、你喜不喜欢，要用 che / cui / anche se。',
      "Ho appena visto un film che mi è piaciuto molto.\nÈ la storia di una ragazza che lascia la sua città.\nLa città in cui è ambientato è bellissima.\nAnche se è lungo, non è noioso.\nLo consiglio a tutti!",
      '我刚看了一部我非常喜欢的电影。讲的是一个离开自己城市的女孩。故事发生的那座城市美极了。虽然很长，但一点也不无聊。我向大家推荐！',
    ],
    quiz: [
      ['"我住的那座城市"：', ['la città in cui abito', 'la città che abito in', 'la città dove in abito'], 0, 'in cui = 在其中。'],
      ['"我读过的那本书"：', ['il libro che ho letto', 'il libro cui ho letto', 'il libro quale ho letto'], 0, '直接宾语 → che。'],
      ['"虽然很长"：', ['anche se è lungo', 'perché è lungo', 'quindi è lungo'], 0, 'anche se = 即使 / 虽然。'],
      ['"既然你有空，……"：', ['Siccome sei libero,…', 'Mentre sei libero,…', 'Anche sei libero,…'], 0, 'siccome = 既然 / 因为。'],
    ],
  },

  // ───────────────────────── 第 66 天 ─────────────────────────
  {
    n: 66, it: 'Avevo già…', zh: '我已经……',
    goal: '掌握大过去时（trapassato prossimo：avevo / ero + 过去分词）表示"在另一件过去的事之前已经发生"；会用 prima di + 不定式、dopo + aver / essere + 分词。',
    scene: '你错过了火车。回来后，你向朱莉娅解释：到站时车已经开走了，你本来已经查过时刻表——结果看错了。',
    dlg: `
      Li Ming: Quando sono arrivato alla stazione, il treno era già partito. | 我到车站时，火车已经开走了。
      Giulia: Davvero? Ma non avevi controllato l'orario? | 真的吗？你不是查过时刻表吗？
      Li Ming: Sì, ma avevo letto l'orario sbagliato! | 查了，但我看错了时刻表！
      Giulia: Che sfortuna! E che cosa hai fatto dopo? | 真倒霉！那后来你做了什么？
      Li Ming: Dopo aver parlato con la bigliettaia, ho preso il treno successivo. | 跟售票员谈过之后，我坐了下一班车。
      Giulia: Prima di partire hai almeno avvisato Marco? | 出发前你至少通知马可了吗？
      Li Ming: Sì, gli avevo scritto un messaggio. | 通知了，我给他写过消息。
    `,
    q: [
      ['李明到车站时，火车怎么样了？', ['已经开走了', '还没来', '晚点了'], 0, 'il treno era già partito。'],
      ['为什么错过？', ['他看错了时刻表', '车站关门', '他睡过头了'], 0, "avevo letto l'orario sbagliato。"],
      ['后来他怎么办？', ['坐了下一班车', '回家了', '打车去了'], 0, 'ho preso il treno successivo。'],
    ],
    vocab: `
      controllare | 检查；查看 | con-trol-LA-re
      sbagliato | 错的 | sba-GLIA-to
      la sfortuna | 倒霉；坏运气 | la sfor-TU-na
      la fortuna | 运气 | la for-TU-na
      successivo | 下一个；随后的 | suc-ces-SI-vo
      avvisare | 通知；提醒 | av-vi-SA-re
      almeno | 至少 | al-ME-no
      la bigliettaia | 女售票员
      dopo aver parlato | 在谈过之后 | DO-po a-VER par-LA-to
      prima di partire | 出发之前 | PRI-ma di par-TI-re
      era già partito | 已经出发了 | E-ra già par-TI-to
      che sfortuna! | 真倒霉！ | ke sfor-TU-na
      per fortuna | 幸运的是 | per for-TU-na
      purtroppo | 可惜；遗憾的是 | pur-TROP-po
    `,
    gram: [
      {
        h: '大过去时（trapassato prossimo）：已经发生在"过去的过去"',
        p: ['构成：**avere / essere 的 imperfetto + 过去分词**。助动词的选择规则和 passato prossimo **完全相同**；用 essere 时分词与主语一致。'],
        t: [
          ['人称', 'avere + 分词', 'essere + 分词'],
          ['io', 'avevo mangiato', 'ero andato / andata'],
          ['tu', 'avevi mangiato', 'eri andato / andata'],
          ['lui / lei', 'aveva mangiato', 'era andato / andata'],
          ['noi', 'avevamo mangiato', 'eravamo andati / andate'],
          ['voi', 'avevate mangiato', 'eravate andati / andate'],
          ['loro', 'avevano mangiato', 'erano andati / andate'],
        ],
        eg: ['Quando sono arrivato, il treno era già partito. | 我到的时候，火车已经开走了。', "Avevo già mangiato, quindi non ho preso niente. | 我已经吃过了，所以什么都没点。"],
      },
      {
        h: '先后顺序的几种说法',
        t: [
          ['说法', '例句'],
          ['prima di + 不定式', 'Prima di partire, ho chiamato Marco.'],
          ['dopo + aver / essere + 分词', 'Dopo aver mangiato, sono uscito.'],
          ['dopo + essere + 分词（主语一致）', 'Dopo essere arrivata, ha telefonato.'],
          ['già / non ancora / appena', 'Avevo già finito. / Non era ancora arrivato.'],
        ],
        p: ['**dopo aver parlato**、**dopo essere arrivato** 比 "dopo che ho parlato" 更简洁，写作里很常用。'],
      },
    ],
    text: {
      title: 'Un viaggio sfortunato',
      body: `
        Ieri dovevo andare a Firenze, ma ho perso il treno. | 昨天我该去佛罗伦萨，但我错过了火车。
        Quando sono arrivato in stazione, era già partito da cinque minuti. | 我到车站时，车已经开走五分钟了。

        Avevo letto male l'orario e non avevo controllato di nuovo. | 我看错了时刻表，也没有再核对。
        Dopo aver comprato un altro biglietto, ho aspettato un'ora. | 买了另一张票后，我等了一个小时。
        Per fortuna sono arrivato in tempo all'appuntamento. | 幸运的是，我赶上了约会。
      `,
    },
    rq: [
      ['他为什么错过火车？', ['看错了时刻表', '睡过头', '车站关门'], 0, 'Avevo letto male l\'orario。'],
      ['他等了多久？', ['一个小时', '五分钟', '半天'], 0, "ho aspettato un'ora。"],
    ],
    culture: '意大利火车**晚点是常态**，但**提前发车几乎不会**——所以看错时刻表更值得警惕。出发前用 **Trenitalia / Italo 官方 App** 核对，特别留意**换乘和站台变更（cambio binario）**。',
    speak: `
      Quando sono arrivato, il treno era già partito. | 说我到时火车已经走了
      Avevo letto l'orario sbagliato. | 说你看错了时刻表
      Dopo aver parlato con la bigliettaia, ho preso un altro treno. | 说和售票员谈过后改乘别班
      Per fortuna sono arrivato in tempo. | 说幸运的是及时赶到了
    `,
    wr: [
      '写 4–5 句话讲一次"错过或迟到"的经历：到的时候已经发生了什么（trapassato）、你怎么办、结果如何。',
      "Quando sono arrivato al cinema, il film era già cominciato.\nAvevo sbagliato l'orario.\nDopo aver comprato un altro biglietto, ho aspettato il secondo spettacolo.\nAlla fine mi sono divertito lo stesso.",
      '我到电影院时，电影已经开始了。我弄错了时间。买了另一张票后，我等了第二场。最后我还是玩得很开心。',
    ],
    quiz: [
      ['"我到的时候火车已经走了"：', ['Il treno era già partito.', 'Il treno è già partito.', 'Il treno aveva partito.'], 0, 'trapassato：era + partito。'],
      ['"我已经吃过了"（过去的过去）：', ['Avevo già mangiato.', 'Ho già mangiato.', 'Mangiavo già.'], 0, 'avevo + 分词。'],
      ['"出发前"：', ['prima di partire', 'dopo di partire', 'prima partire'], 0, 'prima di + 不定式。'],
      ['"跟她谈过之后"：', ['dopo aver parlato con lei', 'dopo parlato con lei', 'dopo di parlare con lei'], 0, 'dopo + aver + 分词。'],
    ],
  },

  // ───────────────────────── 第 67 天 ─────────────────────────
  {
    n: 67, it: 'Leggere le notizie', zh: '读通知与新闻',
    goal: '学会略读（抓大意）和查读（找信息）的阅读策略；认识车站、景区、公共场所常见的通知和标识；能读懂一则简短新闻。',
    scene: '你在车站看到显示屏上写着 sciopero，一头雾水，去问工作人员；之后你又读了一则关于罢工的新闻。',
    dlg: `
      Li Ming: Scusi, che cosa significa "sciopero" sul tabellone? | 请问，显示屏上的 "sciopero" 是什么意思？
      Impiegato: Vuol dire che oggi i treni sono sospesi per uno sciopero. | 意思是今天因为罢工，火车暂停运行。
      Li Ming: Fino a che ora dura? | 持续到几点？
      Impiegato: Fino alle diciotto. Sono garantiti solo alcuni treni. | 到十八点。只保证少数几班车。
      Li Ming: E posso cambiare il biglietto? | 那我可以改签吗？
      Impiegato: Certo, il cambio è gratuito a causa dello sciopero. | 当然，因为罢工，改签免费。
      Li Ming: Grazie! Allora parto domani. | 谢谢！那我明天走。
    `,
    q: [
      ['sciopero 是什么意思？', ['罢工', '节日', '晚点'], 0, 'sciopero = 罢工。'],
      ['罢工持续到几点？', ['十八点', '十点', '二十点'], 0, 'Fino alle diciotto。'],
      ['改签要钱吗？', ['免费', '收半价', '全价'], 0, 'il cambio è gratuito。'],
    ],
    vocab: `
      lo sciopero | 罢工 | lo SCIO-pe-ro
      sospeso | 暂停的 | so-SPE-so
      garantito | 有保证的 | ga-ran-TI-to
      il tabellone | 电子显示屏 | il tab-bel-LO-ne
      a causa di | 由于 | a CAU-sa di
      gratuito | 免费的 | gra-TUI-to
      il cambio | 更改；换 | il CAM-bio
      cancellato | 取消的 | can-cel-LA-to
      l'avviso | 通知；公告 | l'av-VI-so
      i lavori | 施工 | i la-VO-ri
      vietato | 禁止的 | vie-TA-to
      riservato | 预留的；保留的 | ri-ser-VA-to
      fuori servizio | 停止服务 | FUO-ri ser-VI-zio
      l'uscita di sicurezza | 安全出口 | l'u-SCI-ta di si-cu-REZ-za
    `,
    gram: [
      {
        h: '阅读策略：略读与查读',
        t: [
          ['策略', '怎么做', '适合'],
          ['略读（skimming）', '先看标题、首句、粗体、数字；抓大意', '新闻、通知、邮件'],
          ['查读（scanning）', '带着问题找时间、地点、数字、名字', '时刻表、广告、说明书'],
          ['猜词', '看词根、前后文；很多词和英语 / 汉语外来词相似', '遇到生词时'],
          ['先别查词典', '一句话里最多只查 1–2 个关键词', '练习流利阅读'],
        ],
      },
      {
        h: '常见通知与标识',
        t: [
          ['意大利语', '意思'],
          ['Chiuso per lavori / per ferie', '因施工 / 休假关闭'],
          ['Vietato l\'ingresso / fumare / fotografare', '禁止入内 / 吸烟 / 拍照'],
          ['Uscita di sicurezza', '安全出口'],
          ['Spingere / Tirare', '推 / 拉'],
          ['Fuori servizio', '停止服务（设备）'],
          ['Riservato ai clienti / al personale', '仅限顾客 / 员工'],
          ['Sciopero / Soppresso / Cancellato', '罢工 / 取消的班次'],
          ['Ingresso libero / Biglietteria', '免费入场 / 售票处'],
        ],
      },
    ],
    text: {
      title: 'Sciopero dei treni',
      body: `
        Domani i treni in tutta Italia si fermeranno per otto ore. | 明天全意大利的火车将停运八小时。
        Lo sciopero comincerà alle 9 e finirà alle 17. | 罢工从九点开始，十七点结束。

        Saranno garantite solo le corse essenziali e i treni ad alta velocità. | 只保证最基本的班次和高速列车。
        Trenitalia consiglia di controllare l'orario sul sito prima di partire. | 意大利国铁建议出发前在网站上核对时刻。
        I passeggeri potranno cambiare il biglietto gratuitamente. | 乘客可以免费改签。
      `,
    },
    rq: [
      ['罢工从几点到几点？', ['9 点到 17 点', '8 点到 16 点', '10 点到 18 点'], 0, 'alle 9… alle 17。'],
      ['出发前应该做什么？', ['在网站上核对时刻', '直接去车站', '取消旅行'], 0, 'controllare l\'orario sul sito。'],
      ['乘客改签要钱吗？', ['免费', '半价', '全价'], 0, 'gratuitamente。'],
    ],
    culture: '意大利的**罢工（sciopero）**很常见，但**大多提前公布**，并规定"保证服务时段（fasce di garanzia）"。出发前一天查一下 **scioperi.mit.gov.it**（交通部罢工信息）或铁路、航空公司的官方通知，可以避免白跑一趟。',
    speak: `
      Che cosa significa "sciopero"? | 问 sciopero 是什么意思
      Fino a che ora dura lo sciopero? | 问罢工持续到几点
      Posso cambiare il biglietto? | 问能否改签
      Il cambio è gratuito? | 问改签是否免费
    `,
    wr: [
      '写 4 句话：你在车站看到罢工通知，向工作人员问清楚时间、能否改签，并决定怎么办。',
      "Scusi, c'è uno sciopero oggi?\nFino a che ora dura?\nPosso cambiare il biglietto gratuitamente?\nAllora parto domani mattina.",
      '劳驾，今天有罢工吗？持续到几点？我可以免费改签吗？那我明天早上走。',
    ],
    quiz: [
      ['Chiuso per lavori 的意思：', ['因施工关闭', '免费入场', '禁止拍照'], 0, 'lavori = 施工。'],
      ['Spingere 与 Tirare：', ['推 / 拉', '拉 / 推', '进 / 出'], 0, 'spingere = 推。'],
      ['为了抓大意，应该先：', ['看标题和首句', '查每一个生词', '从最后一句读起'], 0, '略读先看标题和首句。'],
      ['"由于罢工"：', ['a causa dello sciopero', 'per causare sciopero', 'con causa sciopero'], 0, 'a causa di。'],
    ],
  },

  // ───────────────────────── 第 68 天 ─────────────────────────
  {
    n: 68, it: 'Una mail formale', zh: '正式邮件',
    goal: '会写结构规范的正式邮件：主题、称呼、说明来意、提出请求、致谢、结尾；掌握常用套语和 Lei 的用法。',
    scene: '你退房后发现把充电器忘在了旅馆。朱莉娅帮你一句一句梳理，怎样写一封得体的邮件给旅馆经理。',
    dlg: `
      Li Ming: Devo scrivere una mail all'albergo: ho dimenticato un caricatore in camera. | 我得给旅馆写封邮件：我把充电器忘在房间里了。
      Giulia: Comincia con "Gentile direttore", poi spiega il problema. | 以"尊敬的经理"开头，然后说明问题。
      Li Ming: "Le scrivo perché ho dimenticato il mio caricatore nella camera 22." | “我写信是因为我把充电器忘在了 22 号房间。”
      Giulia: Bene. Poi chiedi se è possibile spedirlo. | 好。然后问能不能寄给你。
      Li Ming: "Vorrei sapere se potete spedirlo al mio indirizzo." | “我想知道你们是否可以把它寄到我的地址。”
      Giulia: Concludi con "La ringrazio" e "Cordiali saluti". | 用"谢谢您"和"此致敬礼"结尾。
    `,
    q: [
      ['李明为什么要写邮件？', ['他把充电器忘在旅馆了', '他想订房', '他要投诉服务'], 0, 'ho dimenticato un caricatore in camera。'],
      ['邮件以什么称呼开头？', ['Gentile direttore', 'Ciao direttore', 'Caro amico'], 0, 'Comincia con "Gentile direttore"。'],
      ['邮件结尾用什么？', ['Cordiali saluti', 'Un abbraccio', 'Baci'], 0, 'Concludi con "La ringrazio" e "Cordiali saluti"。'],
    ],
    vocab: `
      il caricatore | 充电器 | il ca-ri-ca-TO-re
      dimenticare | 忘记 | di-men-ti-CA-re
      spedire | 寄出 | spe-DI-re
      gentile | 尊敬的；亲切的 | gen-TI-le
      il direttore | 经理；主任 | il di-ret-TO-re
      l'oggetto | 主题；事由 | l'og-GET-to
      in allegato | 附件 | in al-le-GA-to
      ringraziare | 感谢 | rin-gra-ZIA-re
      cordiali saluti | 此致敬礼 | cor-DIA-li sa-LU-ti
      distinti saluti | 谨致敬意（更正式） | di-STIN-ti sa-LU-ti
      in attesa di | 期待（回复） | in at-TE-sa di
      la risposta | 回复 | la ri-SPO-sta
      le scrivo per | 我写信给您是为了 | le SCRI-vo per
      vorrei sapere se | 我想知道是否 | vor-REI sa-PE-re se
    `,
    gram: [
      {
        h: '正式邮件的结构',
        t: [
          ['部分', '套语', '例句'],
          ['主题 Oggetto', '简洁说明事由', 'Oggetto: Oggetto dimenticato in camera 22'],
          ['称呼', 'Gentile Signora / Signor + 姓；Egregio Dottore；Spettabile Ditta', 'Gentile Direttore,'],
          ['说明来意', 'Le scrivo per… / Le scrivo perché…', 'Le scrivo perché ho dimenticato il mio caricatore.'],
          ['提出请求', 'Vorrei sapere se… / Potrebbe…? / Sarebbe possibile…?', 'Vorrei sapere se è possibile spedirlo.'],
          ['附件', 'In allegato trova…', 'In allegato trova la prenotazione.'],
          ['致谢与等待', 'La ringrazio per… / Resto in attesa di una Sua risposta.', 'La ringrazio per la cortese attenzione.'],
          ['结尾', 'Cordiali saluti / Distinti saluti', 'Cordiali saluti, Li Ming'],
        ],
      },
      {
        h: '正式书信的语气',
        p: [
          '全程使用 **Lei**（对方）；书面语里常把 **Lei / Le / La / Suo** 大写以示尊敬。',
          '用**条件式**的礼貌句型（vorrei、potrebbe、sarebbe possibile）比直接命令温和得多；不用 **ciao、tvb、缩写和感叹号**。',
        ],
        eg: ['Le scrivo per chiedere un\'informazione. | 我写信是想询问一项信息。', 'La ringrazio per la sua disponibilità. | 感谢您的帮助。', 'Resto in attesa di una Sua risposta. | 期待您的回复。'],
      },
    ],
    text: {
      title: 'Oggetto dimenticato',
      body: `
        Oggetto: Oggetto dimenticato in camera 22 | 主题：在 22 号房间遗忘的物品
        Gentile Direttore, | 尊敬的经理：

        Le scrivo perché ho dimenticato il mio caricatore nella camera 22. | 我写信是因为我把充电器忘在了 22 号房间。
        Sono stato nel Suo albergo dal 10 al 13 giugno. | 我在您的旅馆住了 6 月 10 日到 13 日。
        Vorrei sapere se è possibile spedirlo al mio indirizzo. Pagherò volentieri le spese. | 我想知道能否把它寄到我的地址。我很乐意支付费用。

        La ringrazio per l'attenzione. | 感谢您的关注。
        Cordiali saluti, | 此致敬礼，
        Li Ming | 李明
      `,
    },
    rq: [
      ['邮件的主题是什么？', ['遗忘的物品', '订房', '投诉'], 0, 'Oggetto dimenticato。'],
      ['他愿意付什么？', ['寄送费用', '住宿费', '罚款'], 0, 'Pagherò volentieri le spese。'],
    ],
    culture: '**意大利人看重书信礼仪**：正式邮件里称呼和结尾要对应——**Gentile + Cordiali saluti** 是最稳妥的一对；对职衔要写清楚（**Gentile Dottoressa Rossi**、**Egregio Avvocato Bianchi**）。写给官方机构（comune、questura）的信，常用 **Spettabile + 机构名** 开头。',
    speak: `
      Le scrivo perché ho dimenticato il caricatore. | 用 Le scrivo perché 说明来意
      Vorrei sapere se è possibile spedirlo. | 用 Vorrei sapere se 提出请求
      La ringrazio per l'attenzione. | 致谢
      Resto in attesa di una Sua risposta. | 说期待回复
    `,
    wr: [
      '写一封 6–7 句的正式邮件：比如向某家酒店 / 学校 / 公司询问信息或提出一个请求。要有主题、称呼、来意、请求、致谢、结尾。',
      "Oggetto: Richiesta di informazioni\nGentile Signora Rossi,\nLe scrivo per chiedere informazioni sul corso di italiano.\nVorrei sapere quanto costa e quando comincia.\nLa ringrazio per l'attenzione.\nCordiali saluti,\nLi Ming",
      '主题：咨询。尊敬的罗西女士：我写信是想咨询意大利语课程。我想知道费用和开课时间。感谢您的关注。此致敬礼，李明',
    ],
    quiz: [
      ['写给陌生人的正式邮件，称呼用：', ['Gentile Signora Rossi,', 'Ciao Rossi!', 'Caro Rossi,'], 0, 'Gentile = 尊敬的。'],
      ['正式邮件的结尾：', ['Cordiali saluti', 'Un abbraccio', 'Ciao ciao'], 0, 'cordiali saluti。'],
      ['礼貌地提出请求：', ['Vorrei sapere se è possibile…', 'Dimmi se è possibile…', 'Voglio sapere se…'], 0, 'vorrei + 请求。'],
      ['"期待您的回复"：', ['Resto in attesa di una Sua risposta.', 'Aspetto tua risposta ora.', 'Rispondimi subito.'], 0, 'in attesa di。'],
    ],
  },

  // ───────────────────────── 第 69 天 ─────────────────────────
  {
    n: 69, it: 'Raccontare una storia', zh: '讲一个故事',
    goal: '会完整地讲一个小故事：开场交代背景、推进情节（imperfetto + passato prossimo + trapassato）、给出高潮和结局；会用 all\'improvviso、a un certo punto、per fortuna 等叙事标记词。',
    scene: '聚会上，大家请你讲一件旅途中有趣的事。你讲了在那不勒斯找披萨店，却莫名其妙排上了队的故事。',
    dlg: `
      Chiara: Raccontaci qualcosa di divertente del tuo viaggio! | 给我们讲讲你旅途中有趣的事吧！
      Li Ming: Allora, un giorno ero a Napoli e cercavo una pizzeria famosa. | 那么，有一天我在那不勒斯，在找一家有名的比萨店。
      Chiara: E l'hai trovata? | 你找到了吗？
      Li Ming: Dopo mezz'ora ho visto una fila lunghissima davanti a un locale. | 半小时后，我看到一家店门前排着长长的队。
      Chiara: E poi? | 然后呢？
      Li Ming: All'improvviso un signore mi ha chiesto: "Sei in fila?" Io ho risposto di sì, anche se non avevo capito! | 突然一位先生问我："你在排队吗？"我回答是，虽然我并没有听懂！
      Chiara: Ahah! E hai mangiato la pizza? | 哈哈！那你吃到披萨了吗？
      Li Ming: Sì, e per fortuna era proprio la pizzeria giusta! | 吃到了，幸好正好是那家对的店！
    `,
    q: [
      ['李明在找什么？', ['一家有名的比萨店', '火车站', '博物馆'], 0, 'una pizzeria famosa。'],
      ['有人问他什么？', ['是否在排队', '几点了', '怎么去车站'], 0, 'Sei in fila?'],
      ['最后结果如何？', ['吃到了披萨，店也对', '没吃成', '去错了店'], 0, 'era proprio la pizzeria giusta。'],
    ],
    vocab: `
      raccontare | 讲述 | rac-con-TA-re
      divertente | 有趣的 | di-ver-TEN-te
      famoso | 有名的 | fa-MO-so
      la fila | 队伍 | la FI-la
      fare la fila | 排队 | FA-re la FI-la
      il locale | 店；场所 | il lo-CA-le
      lunghissimo | 非常长的 | lun-GHIS-si-mo
      all'improvviso | 突然 | all'im-prov-VI-so
      a un certo punto | 在某个时刻 | a un CER-to PUN-to
      per fortuna | 幸好 | per for-TU-na
      purtroppo | 可惜 | pur-TROP-po
      proprio | 正好；确实 | PRO-prio
      anche se | 即使 | AN-che SE
      alla fine | 最后 | AL-la FI-ne
    `,
    gram: [
      {
        h: '讲故事的三步',
        t: [
          ['步骤', '做什么', '常用时态与词'],
          ['① 开场', '交代时间、地点、人物、当时的情况', 'imperfetto：Un giorno ero a Napoli e cercavo…'],
          ['② 情节', '发生了什么，按先后顺序', 'passato prossimo：ho visto, ho chiesto…；a un certo punto, all\'improvviso'],
          ['③ 结局', '怎么收场，有什么感受', 'alla fine, per fortuna, purtroppo'],
        ],
        p: ['**之前就已发生的事**用 trapassato：…**anche se non avevo capito**（尽管我之前没听懂）。'],
      },
      {
        h: '叙事标记词',
        t: [
          ['功能', '词语'],
          ['开始', 'un giorno, una volta, tanto tempo fa'],
          ['转折', 'all\'improvviso, a un certo punto, ma poi'],
          ['结果', 'per fortuna, purtroppo, così, alla fine'],
          ['语气', 'proprio（确实）, davvero, incredibile!'],
        ],
        eg: ["All'improvviso un signore mi ha chiesto qualcosa. | 突然一位先生问了我些什么。", 'Per fortuna era la pizzeria giusta! | 幸好正是那家比萨店！'],
      },
    ],
    text: {
      title: 'La fila misteriosa',
      body: `
        Un giorno ero a Napoli e cercavo una pizzeria famosa. | 有一天我在那不勒斯，找一家有名的比萨店。
        Dopo mezz'ora ho visto una fila lunghissima davanti a un locale. | 半小时后，我看到一家店门前排着长长的队。

        Ho pensato: "Deve essere la pizzeria giusta!" e ho fatto la fila. | 我想："这一定是那家！"于是排了队。
        All'improvviso un signore mi ha chiesto qualcosa e io ho risposto di sì. | 突然一位先生问了我些什么，我回答"是"。

        Dopo un'ora sono entrato e ho mangiato la pizza più buona della mia vita! | 一小时后我进去，吃到了我这辈子最好吃的披萨！
      `,
    },
    rq: [
      ['他排了多久的队？', ['一小时', '十分钟', '半天'], 0, "Dopo un'ora sono entrato。"],
      ['结局是？', ['吃到了最好吃的披萨', '没吃成', '迷路了'], 0, 'la pizza più buona della mia vita。'],
    ],
    culture: '意大利人**爱听故事也爱讲故事**。聊天时，会用夸张的语气和手势讲"**Sai cosa mi è successo?**"（你知道我遇到了什么吗？）。讲得好的人在意大利会被称为 **un bravo narratore**。多模仿他们的"节奏感"：该停顿处停顿，该提高声调处提高。',
    speak: `
      Sai cosa mi è successo? | 用来引起话头
      Un giorno ero a Napoli e cercavo una pizzeria. | 用 imperfetto 交代背景
      All'improvviso un signore mi ha chiesto qualcosa. | 用 passato prossimo 推进情节
      Per fortuna era la pizzeria giusta! | 说出结局
    `,
    wr: [
      '写一个 8–9 句的短故事（80–100 词）：一次有趣或难忘的经历。要有背景（imperfetto）、情节（passato prossimo）、结局。',
      "Un giorno ero a Roma e cercavo il Colosseo.\nNon avevo la mappa e il telefono era scarico.\nAll'improvviso ho visto una signora e le ho chiesto la strada.\nLei mi ha accompagnato per dieci minuti.\nPer fortuna il Colosseo non era lontano.\nAlla fine l'ho ringraziata con un gelato!",
      '有一天我在罗马，在找斗兽场。我没有地图，手机也没电了。突然我看到一位女士，向她问路。她陪我走了十分钟。幸好斗兽场不远。最后我请她吃了一个冰淇淋表示感谢！',
    ],
    quiz: [
      ['故事开场交代背景用：', ['imperfetto', '命令式', '将来时'], 0, '背景 = imperfetto。'],
      ['"突然"：', ["all'improvviso", 'sempre', 'di solito'], 0, "all'improvviso = 突然。"],
      ['"幸好"：', ['per fortuna', 'purtroppo', 'anche se'], 0, 'per fortuna。'],
      ['"可惜 / 遗憾的是"：', ['purtroppo', 'proprio', 'infine'], 0, 'purtroppo。'],
    ],
  },

  // ───────────────────────── 第 70 天（岛屿关卡）─────────────────────────
  {
    n: 70, test: true, it: "Prova dell'isola 7", zh: '第七岛关卡：综合复习',
    goal: '把第 61–69 天的 imperfetto、passato prossimo、trapassato、关系代词、连接词、读通知、写邮件和讲故事整合起来；认识让叙事更连贯的时间连接词；通过 20 题关卡，拿到记忆岛徽章。',
    scene: '在一次聚会上，Marco 请你讲一讲你和朱莉娅第一次去海边的故事。你把所有学过的叙事工具都用上了。',
    dlg: `
      Marco: Raccontami di quando siete andati al mare! | 讲讲你们去海边的那一次吧！
      Li Ming: Era luglio e faceva molto caldo. Giulia aveva organizzato tutto. | 那是七月，天气很热。朱莉娅把一切都安排好了。
      Marco: Dove siete andati? | 你们去了哪里？
      Li Ming: A Sperlonga, un paese di cui avevo sentito parlare. | 去了斯佩尔隆加，我听人说起过的一个小镇。
      Marco: E che cosa avete fatto? | 你们做了什么？
      Li Ming: Mentre Giulia nuotava, io ho letto un libro sulla spiaggia. | 朱莉娅游泳的时候，我在沙滩上读了一本书。
      Marco: Poi che cos'è successo? | 后来发生了什么？
      Li Ming: Poco dopo è arrivato un temporale e siamo corsi a ripararci. | 过了不久来了一场雷雨，我们跑去避雨。
      Marco: Che avventura! Vi siete divertiti? | 真是历险！你们玩得开心吗？
      Li Ming: Moltissimo! Non dimenticherò mai quella giornata. | 非常开心！我永远不会忘记那一天。
    `,
    q: [
      ['他们什么时候去的海边？', ['七月', '十二月', '四月'], 0, 'Era luglio。'],
      ['朱莉娅游泳时，李明做什么？', ['读书', '睡觉', '游泳'], 0, 'io ho letto un libro。'],
      ['后来发生了什么？', ['来了一场雷雨', '下雪了', '朱莉娅走丢了'], 0, 'è arrivato un temporale。'],
    ],
    vocab: `
      poco dopo | 不久之后 | PO-co DO-po
      da allora | 从那以后 | da al-LO-ra
      nel frattempo | 与此同时 | nel frat-TEM-po
      subito dopo | 紧接着 | SU-bi-to DO-po
      all'inizio | 起初 | all'i-NI-zio
      in seguito | 随后 | in se-GUI-to
      prima o poi | 迟早 | PRI-ma o POI
      di colpo | 突然 | di COL-po
      il temporale | 雷雨 | il tem-po-RA-le
      ripararsi | 避雨；躲避 | ri-pa-RAR-si
      l'avventura | 冒险 | l'av-ven-TU-ra
      organizzare | 安排；组织 | or-ga-niz-ZA-re
      sperlonga | （地名）斯佩尔隆加 | sper-LON-ga
      incredibile | 难以置信的 | in-cre-DI-bi-le
    `,
    gram: [
      {
        h: '时间连接词：让叙事连贯',
        t: [
          ['功能', '词语', '例句'],
          ['起初', "all'inizio, all'inizio…poi", "All'inizio non capivo, poi ho capito."],
          ['接着', 'poi, dopo, subito dopo, poco dopo, in seguito', 'Poco dopo è arrivato un temporale.'],
          ['同时', 'mentre, nel frattempo, intanto', 'Mentre nuotava, io leggevo.'],
          ['突然', "all'improvviso, di colpo, a un certo punto", "All'improvviso ha cominciato a piovere."],
          ['此后', 'da allora, da quel giorno', 'Da allora vado spesso al mare.'],
          ['最终', 'alla fine, infine, per finire', 'Alla fine siamo tornati a casa.'],
        ],
      },
      {
        h: '第七岛复盘：三个过去时怎么选',
        t: [
          ['时态', '什么时候用', '例句'],
          ['passato prossimo', '完成的事件、按顺序推进情节', 'Ho letto un libro. È arrivato un temporale.'],
          ['imperfetto', '背景、习惯、持续、描述、同时进行', 'Faceva caldo. Giulia nuotava.'],
          ['trapassato prossimo', '在另一件过去事之前已发生', 'Giulia aveva organizzato tutto.'],
        ],
      },
    ],
    text: {
      title: 'Una giornata a Sperlonga',
      body: `
        Era una domenica di luglio e faceva molto caldo. | 那是七月的一个周日，天气很热。
        Giulia aveva organizzato una gita al mare e noi siamo partiti presto. | 朱莉娅安排了一次海边之行，我们很早就出发了。

        A Sperlonga la spiaggia era quasi vuota. | 在斯佩尔隆加，海滩几乎没有人。
        Mentre Giulia nuotava, io leggevo sotto l'ombrellone. | 朱莉娅游泳时，我在遮阳伞下读书。

        All'improvviso il cielo è diventato nero e è arrivato un temporale. | 突然天黑了下来，来了一场雷雨。
        Siamo corsi in un bar e abbiamo bevuto un cappuccino caldo. | 我们跑进一家咖啡吧，喝了一杯热卡布奇诺。
        È stata una giornata bellissima, e non la dimenticherò mai. | 那是美好的一天，我永远不会忘记。
      `,
    },
    rq: [
      ['朱莉娅事先做了什么？', ['安排了这次出行', '买了车', '订了餐厅'], 0, 'aveva organizzato una gita。'],
      ['下雨时他们做了什么？', ['跑进咖啡吧', '回了家', '继续游泳'], 0, 'Siamo corsi in un bar。'],
      ['作者对这一天的评价？', ['美好，难忘', '糟糕', '一般'], 0, 'È stata una giornata bellissima。'],
    ],
    culture: '**斯佩尔隆加（Sperlonga）**是罗马与那不勒斯之间的海边小镇，白色的老城建在悬崖上，沙滩细白，是罗马人周末最爱去的海边之一。第七岛通关，你已经能够**用三个过去时讲出一个完整、连贯的故事**——这是 A2 水平的核心能力。',
    speak: `
      Raccontami di quando siete andati al mare. | 请对方讲海边的经历
      Era luglio e faceva molto caldo. | 交代背景
      Mentre Giulia nuotava, io leggevo. | 描述同时发生的事
      Non dimenticherò mai quella giornata. | 总结感受
    `,
    wr: [
      '写一篇 8–10 句（100 词左右）的叙事短文：一次难忘的出行。要用三种过去时、至少三个时间连接词（poi, all\'improvviso, alla fine…）。',
      "Era agosto e faceva molto caldo. Avevo organizzato una gita in montagna con gli amici.\nAbbiamo preso il treno e poi l'autobus.\nQuando siamo arrivati, il cielo era azzurro e l'aria fresca.\nMentre camminavamo, ho visto un piccolo lago.\nAll'improvviso è arrivata la pioggia e siamo corsi in un rifugio.\nAlla fine abbiamo mangiato una zuppa calda. È stata una giornata bellissima.",
      '那是八月，天气很热。我和朋友们安排了一次去山里的旅行。我们先坐火车，然后换公交。我们到的时候，天空湛蓝，空气清新。走路时，我看到一个小湖。突然下起雨来，我们跑进了一间山间小屋。最后我们喝了一碗热汤。那是美好的一天。',
    ],
    quiz: [
      ['"同时"（叙事连接词）：', ['nel frattempo', 'da allora', 'alla fine'], 0, 'nel frattempo = 与此同时。'],
      ['描述"当时天很热"用：', ['Faceva molto caldo.', 'Ha fatto molto caldo.', 'Farà molto caldo.'], 0, 'imperfetto 描述背景。'],
      ['"朱莉娅事先安排好了一切"：', ['Giulia aveva organizzato tutto.', 'Giulia organizzava tutto.', 'Giulia ha organizzato tutto prima.'], 0, '更早发生的事 = trapassato。'],
      ['"我听人说起过的小镇"：', ['un paese di cui avevo sentito parlare', 'un paese che di avevo sentito parlare', 'un paese cui sentito parlare'], 0, 'di cui + trapassato。'],
    ],
  },
]);
