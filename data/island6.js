/* 第 6 岛 · 时间岛 Isola del Tempo（第 51–60 天） */
Course.add([
  // ───────────────────────── 第 51 天 ─────────────────────────
  {
    n: 51, it: 'Ieri ho mangiato', zh: '昨天我吃了……',
    goal: '掌握用 avere 构成的近过去时（passato prossimo）：ho + 过去分词（-ato / -uto / -ito）；会说昨天、上周做了什么；会用 non ho… 否定。',
    scene: '周一早上，Chiara 在办公室问你周日过得怎么样。你用刚学的过去时讲了一遍。',
    dlg: `
      Chiara: Ciao Li Ming! Che cosa hai fatto ieri? | 嗨李明！你昨天做了什么？
      Li Ming: Ho dormito fino alle dieci, poi ho preparato il pranzo. | 我睡到十点，然后做了午饭。
      Chiara: Hai cucinato qualcosa di speciale? | 你做了什么特别的吗？
      Li Ming: Ho cucinato gli spaghetti alla carbonara. Ho mangiato con Marco. | 我做了卡邦尼意面。我和马可一起吃的。
      Chiara: E nel pomeriggio? | 下午呢？
      Li Ming: Ho studiato italiano e ho guardato un film. E tu? | 我学了意大利语，看了一部电影。你呢？
      Chiara: Io ho lavorato tutto il giorno. Non ho avuto un minuto libero! | 我工作了一整天。一分钟空闲都没有！
    `,
    q: [
      ['李明睡到几点？', ['十点', '八点', '十二点'], 0, 'fino alle dieci。'],
      ['午饭他做了什么？', ['卡邦尼意面', '披萨', '米饭'], 0, 'gli spaghetti alla carbonara。'],
      ['Chiara 昨天做了什么？', ['工作了一整天', '看电影', '睡觉'], 0, 'ho lavorato tutto il giorno。'],
    ],
    vocab: `
      ieri sera | 昨晚 | ie-ri SE-ra
      stamattina | 今天早上 | sta-mat-TI-na
      l'altro ieri | 前天 | l'AL-tro IE-ri
      la settimana scorsa | 上周 | la set-ti-MA-na SCOR-sa
      un'ora fa | 一小时前 | un'O-ra FA
      due giorni fa | 两天前 | DUE GIOR-ni FA
      tutto il giorno | 一整天 | TUT-to il GIOR-no
      dormire | 睡觉 | dor-MI-re
      preparare | 准备；做（饭） | pre-pa-RA-re
      guardare | 看；注视 | guar-DA-re
      il pranzo | 午饭 | il PRAN-zo
      il film | 电影 | il FILM
      avuto | （avere 的分词）有过 | a-VU-to
      che cosa hai fatto? | 你做了什么？ | ke CO-sa AI FAT-to
    `,
    pron: {
      t: '过去分词词尾：-ato / -uto / -ito',
      tips: [
        '规则过去分词（-ato / -uto / -ito）的重音都在**倒数第二个音节**：man-GIA-to、a-VU-to、dor-MI-to。词尾元音要读清楚。',
        '**ho mangiato** 要连读成 omangiato；h 不发音，不要读成 "hó"。',
      ],
      drill: `
        ho mangiato | 我吃了
        ho dormito | 我睡了
        ho avuto | 我有过
        ho studiato | 我学了
        ho guardato | 我看了
        ho lavorato | 我工作了
      `,
    },
    gram: [
      {
        h: '近过去时（passato prossimo）：ho + 过去分词',
        p: ['最常用的过去时。构成：**avere 的现在时 + 过去分词**。规则分词：-are → **-ato**，-ere → **-uto**，-ire → **-ito**。'],
        t: [
          ['人称', 'avere', '例句'],
          ['io', 'ho', 'Ho mangiato.'],
          ['tu', 'hai', 'Hai dormito?'],
          ['lui / lei / Lei', 'ha', 'Ha lavorato.'],
          ['noi', 'abbiamo', 'Abbiamo studiato.'],
          ['voi', 'avete', 'Avete capito?'],
          ['loro', 'hanno', 'Hanno finito.'],
        ],
        eg: ['Ieri ho cucinato. | 昨天我做了饭。', 'Hai dormito bene? | 你睡得好吗？', 'Non ho avuto tempo. | 我没有时间。'],
      },
      {
        h: '规则分词一览',
        t: [
          ['不定式', '分词', '例句'],
          ['parlare', 'parlato', 'Ho parlato con Marco.'],
          ['mangiare', 'mangiato', 'Ho mangiato la pasta.'],
          ['prendere', 'preso（不规则）', 'Ho preso il treno.'],
          ['avere', 'avuto', 'Ho avuto fame.'],
          ['dormire', 'dormito', 'Ho dormito poco.'],
          ['capire', 'capito', 'Ho capito tutto.'],
        ],
        p: ['**不规则分词**第 53 天专门学；这里先记住 **fare → fatto**，因为 Che cosa hai fatto?（你做了什么？）是最常用的问句。'],
      },
      {
        h: '过去的时间词',
        t: [
          ['时间词', '意思'],
          ['ieri / ieri sera', '昨天 / 昨晚'],
          ['stamattina', '今天早上'],
          ['la settimana scorsa', '上周'],
          ['due giorni fa', '两天前'],
          ['tutto il giorno', '一整天'],
        ],
        p: ['否定把 **non** 放在 avere 前：**Non ho mangiato**。'],
      },
    ],
    text: {
      title: 'La giornata di Anna',
      body: `
        Ieri Anna ha lavorato tutto il giorno in ufficio. | 昨天安娜在办公室工作了一整天。
        Ha mangiato un panino a pranzo e ha bevuto due caffè. | 午饭她吃了一个三明治，喝了两杯咖啡。

        La sera ha preparato la cena e ha telefonato a sua madre. | 晚上她做了晚饭，给妈妈打了电话。
        Poi ha guardato un film e ha dormito bene. | 然后她看了一部电影，睡得很好。
      `,
    },
    rq: [
      ['安娜午饭吃了什么？', ['一个三明治', '意面', '披萨'], 0, 'un panino。'],
      ['晚上她给谁打了电话？', ['妈妈', '朋友', '同事'], 0, 'a sua madre。'],
    ],
    culture: '意大利语里，**近过去时是日常口语最重要的过去时**（北方几乎只用它）。学会它，你就能开始"讲故事"——这是从"点咖啡"走向"聊天"的关键一步。',
    speak: `
      Che cosa hai fatto ieri? | 问朋友昨天做了什么
      Ho dormito fino alle dieci. | 说你睡到十点
      Ho studiato italiano e ho guardato un film. | 说你学了意大利语、看了电影
      Non ho avuto tempo. | 说：我没有时间
    `,
    wr: [
      '写 4–5 句话，用近过去时讲讲你昨天做了什么（早上、中午、晚上）。',
      'Ieri ho dormito fino alle otto.\nHo mangiato il pane e ho bevuto un caffè.\nHo lavorato tutto il giorno.\nLa sera ho guardato un film.',
      '昨天我睡到八点。我吃了面包，喝了咖啡。我工作了一整天。晚上我看了一部电影。',
    ],
    quiz: [
      ['"我吃了意面"：', ['Ho mangiato la pasta.', 'Sono mangiato la pasta.', 'Ho mangiare la pasta.'], 0, 'avere + 过去分词。'],
      ['mangiare 的过去分词是：', ['mangiato', 'mangiuto', 'mangito'], 0, '-are → -ato。'],
      ['dormire 的过去分词是：', ['dormito', 'dormato', 'dormuto'], 0, '-ire → -ito。'],
      ['"我没有时间"：', ['Non ho avuto tempo.', 'Ho non avuto tempo.', 'Non avuto ho tempo.'], 0, 'non 放在 avere 前。'],
    ],
  },

  // ───────────────────────── 第 52 天 ─────────────────────────
  {
    n: 52, it: 'Sono andato / andata', zh: '我去了……',
    goal: '掌握用 essere 构成的近过去时：移动、状态变化与反身动词；会让过去分词和主语性数一致（andato / andata / andati / andate）。',
    scene: '周一，Marco 问你周末在佛罗伦萨过得怎么样。你们谈起去了哪里、和谁去、玩得开不开心。',
    dlg: `
      Marco: Com'è andato il weekend a Firenze? | 周末佛罗伦萨之行怎么样？
      Li Ming: Benissimo! Sono partito sabato mattina e sono arrivato a mezzogiorno. | 太棒了！我周六早上出发，中午到达。
      Marco: Sei andato da solo? | 你一个人去的吗？
      Li Ming: No, sono andato con Giulia. Lei è arrivata in treno un'ora dopo. | 不，我和朱莉娅一起去的。她乘火车晚一小时到。
      Marco: E dove siete stati? | 你们去了哪里？
      Li Ming: Siamo stati agli Uffizi e siamo usciti la sera per cena. | 我们去了乌菲齐美术馆，晚上出去吃了晚饭。
      Marco: Vi siete divertiti? | 你们玩得开心吗？
      Li Ming: Moltissimo! Mi sono divertito tanto. | 非常开心！我玩得特别开心。
    `,
    q: [
      ['李明什么时候到佛罗伦萨？', ['周六中午', '周日早上', '周五晚上'], 0, 'sono arrivato a mezzogiorno。'],
      ['朱莉娅怎么去的？', ['乘火车，晚一小时到', '开车，同时到', '飞机'], 0, 'è arrivata in treno un\'ora dopo。'],
      ['他们晚上做了什么？', ['出去吃晚饭', '回家睡觉', '看电影'], 0, 'siamo usciti la sera per cena。'],
    ],
    vocab: `
      partito | （partire）出发了 | par-TI-to
      arrivato | （arrivare）到了 | ar-ri-VA-to
      andato | （andare）去了 | an-DA-to
      stato | （essere / stare）曾是；曾在 | STA-to
      uscito | （uscire）出去了 | u-SCI-to
      venuto | （venire）来了 | ve-NU-to
      tornato | （tornare）回来了 | tor-NA-to
      nato | （nascere）出生了 | NA-to
      da solo | 独自 | da SO-lo
      un'ora dopo | 一小时后 | un'O-ra DO-po
      benissimo | 非常好 | be-NIS-si-mo
      moltissimo | 非常多；极其 | mol-TIS-si-mo
      divertirsi | 玩得开心 | di-ver-TIR-si
      com'è andato? | 怎么样？（过得如何） | co-MÈ an-DA-to
    `,
    pron: {
      t: 'siamo stati / siete stati',
      tips: [
        '**stato** STA-to 是 essere 和 stare 共用的分词；**siamo stati** 读 sia-mo STA-ti，**siete stati** 读 sie-te STA-ti。',
        '**benissimo、moltissimo**：-issimo 的重音在 **IS**：be-NIS-si-mo、mol-TIS-si-mo。',
      ],
      drill: `
        sono andato | 我去了
        sono arrivata | 我到了（女）
        siamo stati | 我们去了／待过
        siete usciti | 你们出去了
        mi sono divertito | 我玩得开心
        benissimo | 非常好
      `,
    },
    gram: [
      {
        h: '用 essere 的近过去时：分词要和主语一致',
        p: [
          '**移动、状态变化**和所有**反身动词**用 **essere** 构成近过去时，过去分词的词尾要与**主语的性、数**一致（-o / -a / -i / -e）。',
        ],
        t: [
          ['主语', 'andare 的近过去时（男）', '（女）'],
          ['io', 'sono andato', 'sono andata'],
          ['tu', 'sei andato', 'sei andata'],
          ['lui / lei', 'è andato', 'è andata'],
          ['noi', 'siamo andati', 'siamo andate'],
          ['voi', 'siete andati', 'siete andate'],
          ['loro', 'sono andati', 'sono andate'],
        ],
      },
      {
        h: '哪些动词用 essere？',
        t: [
          ['类型', '动词'],
          ['移动', 'andare, venire, partire, arrivare, uscire, entrare, tornare, salire, scendere'],
          ['状态', 'essere (stato), stare (stato), restare, rimanere, diventare'],
          ['生死', 'nascere (nato), morire (morto)'],
          ['反身动词（全部）', 'mi sono svegliato/a, ti sei alzato/a, si è divertito/a'],
        ],
        p: ['**其他大多数动词（尤其是后面跟直接宾语的）用 avere**：Ho mangiato la pasta；Ho visto un film。'],
      },
      {
        h: '反身动词的过去时',
        eg: ['Mi sono svegliato alle sette. | 我七点醒了。', 'Ti sei divertita? | 你玩得开心吗？（对女生）', 'Ci siamo alzati presto. | 我们起得很早。'],
      },
    ],
    text: {
      title: 'Un weekend a Firenze',
      body: `
        Sabato mattina sono partito da Roma in treno. | 周六早上我坐火车从罗马出发。
        Sono arrivato a Firenze a mezzogiorno e sono andato subito in albergo. | 我中午到达佛罗伦萨，马上去了旅馆。

        Nel pomeriggio sono stato agli Uffizi con Giulia. | 下午我和朱莉娅去了乌菲齐美术馆。
        La sera siamo usciti e ci siamo divertiti molto. | 晚上我们出去了，玩得很开心。
        Domenica sono tornato a Roma stanco ma felice. | 周日我回到罗马，又累又开心。
      `,
    },
    rq: [
      ['他怎么去的佛罗伦萨？', ['坐火车', '开车', '飞机'], 0, 'in treno。'],
      ['下午他去了哪里？', ['乌菲齐美术馆', '大教堂', '市场'], 0, 'agli Uffizi。'],
    ],
    culture: '**佛罗伦萨**是文艺复兴的摇篮，**乌菲齐美术馆（Galleria degli Uffizi）**收藏波提切利《维纳斯的诞生》等名作，旺季要**提前订票**。从罗马乘高速列车约一个半小时，非常适合周末游。',
    speak: `
      Com'è andato il weekend? | 问对方周末怎么样
      Sono partito sabato mattina. | 说你周六早上出发
      Siamo stati agli Uffizi. | 说你们去了乌菲齐
      Mi sono divertito moltissimo! | 说你玩得特别开心
    `,
    wr: [
      '写 5 句话讲讲你上次旅行：什么时候出发、怎么去的、去了哪里、做了什么、回来时的感受。',
      'Sono partito sabato mattina in treno.\nSono arrivato a Napoli a mezzogiorno.\nSono stato al museo e ho mangiato la pizza.\nMi sono divertito molto.\nDomenica sono tornato a casa.',
      '我周六早上坐火车出发。我中午到那不勒斯。我去了博物馆，吃了披萨。我玩得很开心。周日我回了家。',
    ],
    quiz: [
      ['"我（女）去了罗马"：', ['Sono andata a Roma.', 'Sono andato a Roma.', 'Ho andata a Roma.'], 0, '主语是女性 → andata。'],
      ['"我们（男）到了"：', ['Siamo arrivati.', 'Siamo arrivato.', 'Abbiamo arrivati.'], 0, 'essere + 与主语一致的分词。'],
      ['反身动词的近过去时用：', ['essere', 'avere', '都可以'], 0, '所有反身动词都用 essere。'],
      ['"我起床了（男）"：', ['Mi sono alzato.', 'Mi ho alzato.', 'Ho alzato mi.'], 0, 'mi sono alzato。'],
    ],
  },

  // ───────────────────────── 第 53 天 ─────────────────────────
  {
    n: 53, it: 'Fatto, detto, visto', zh: '不规则过去分词',
    goal: '记住最常用的不规则过去分词（fatto, detto, visto, letto, scritto, preso, messo, aperto, chiuso, bevuto, stato…）；会用 già / non ancora / mai / appena 说"已经、还没、从未、刚刚"。',
    scene: '你计划去那不勒斯。Chiara 去过，她问你吃过正宗披萨没有，并告诉你她上次做了什么。',
    dlg: `
      Chiara: Sei già stato a Napoli? | 你已经去过那不勒斯了吗？
      Li Ming: No, non ci sono ancora stato. Ma ho visto molte foto. | 没有，我还没去过那里。不过我看过很多照片。
      Chiara: Hai mai mangiato la vera pizza napoletana? | 你吃过正宗的那不勒斯披萨吗？
      Li Ming: No, mai. Ho letto che è molto famosa! | 没有，从来没有。我读到说它非常有名！
      Chiara: Allora devi provarla! Ho scritto un indirizzo: ecco il foglio. | 那你得试试！我写了一个地址：这是纸条。
      Li Ming: Grazie! Che cosa hai fatto tu l'ultima volta? | 谢谢！你上次做了什么？
      Chiara: Ho preso il treno, ho visto il Vesuvio e ho mangiato tre pizze! | 我坐火车，看了维苏威火山，吃了三块披萨！
    `,
    q: [
      ['李明去过那不勒斯吗？', ['还没有', '去过', '住过'], 0, 'non ci sono ancora stato。'],
      ['Chiara 给了李明什么？', ['一个地址', '一张照片', '一张车票'], 0, 'Ho scritto un indirizzo。'],
      ['Chiara 上次吃了几块披萨？', ['三块', '一块', '两块'], 0, 'tre pizze。'],
    ],
    vocab: `
      fatto | （fare）做了 | FAT-to
      detto | （dire）说了 | DET-to
      visto | （vedere）看见了 | VI-sto
      letto | （leggere）读了 | LET-to
      scritto | （scrivere）写了 | SCRIT-to
      preso | （prendere）拿了；乘了 | PRE-so
      messo | （mettere）放了 | MES-so
      aperto | （aprire）打开了 | a-PER-to
      chiuso | （chiudere）关上了 | CHIU-so
      bevuto | （bere）喝了 | be-VU-to
      già | 已经 | GIÀ
      non ancora | 还没 | non an-CO-ra
      mai | 曾经；从未 | MAI
      appena | 刚刚 | ap-PE-na
      l'ultima volta | 上一次 | l'UL-ti-ma VOL-ta
    `,
    pron: {
      t: '不规则分词的双辅音',
      tips: [
        '**fatto、detto、letto、scritto、messo** 都带双辅音（tt、ss）：要憋住再放，别读成 fa-to。',
        '**visto** VI-sto：重音在 VI；**aperto** a-PER-to：重音在 PER。',
      ],
      drill: `
        fatto | 做了
        detto | 说了
        visto | 看见了
        letto | 读了
        scritto | 写了
        preso | 拿了
        messo | 放了
        aperto | 打开了
      `,
    },
    gram: [
      {
        h: '最常用的不规则过去分词',
        t: [
          ['不定式', '分词', '不定式', '分词'],
          ['fare', 'fatto', 'leggere', 'letto'],
          ['dire', 'detto', 'scrivere', 'scritto'],
          ['vedere', 'visto', 'prendere', 'preso'],
          ['mettere', 'messo', 'aprire', 'aperto'],
          ['chiudere', 'chiuso', 'bere', 'bevuto'],
          ['essere / stare', 'stato', 'venire', 'venuto'],
          ['perdere', 'perso', 'spendere', 'speso'],
          ['scegliere', 'scelto', 'rimanere', 'rimasto'],
          ['chiedere', 'chiesto', 'rispondere', 'risposto'],
        ],
        p: ['这些词出现频率极高，建议**整体背诵**。注意 venire、rimanere、stare、essere 的近过去时用 **essere**，分词需和主语一致。'],
      },
      {
        h: '副词的位置：già / non… ancora / mai / appena',
        t: [
          ['副词', '位置', '例句'],
          ['già（已经）', '放在助动词与分词之间', 'Ho già mangiato.'],
          ['non… ancora（还没）', 'non 在助动词前，ancora 在分词前', 'Non ho ancora mangiato.'],
          ['mai（曾经 / 从未）', '问句中=曾经；否定 non… mai=从未', 'Hai mai visto Roma? / Non ho mai visto Roma.'],
          ['appena（刚刚）', '放在助动词与分词之间', 'Sono appena arrivato.'],
        ],
      },
    ],
    text: {
      title: 'Il diario del viaggio a Napoli',
      body: `
        Sono appena tornato da Napoli e ho già scritto cento cartoline! | 我刚从那不勒斯回来，已经写了一百张明信片！
        Ho visto il Vesuvio, ho mangiato la vera pizza e ho bevuto un ottimo caffè. | 我看了维苏威火山，吃了正宗披萨，喝了一杯极棒的咖啡。

        Non ho ancora visitato Pompei, ma ho già preso i biglietti. | 我还没参观庞贝，但已经买好了票。
        Non ho mai mangiato una pizza così buona! | 我从来没吃过这么好吃的披萨！
      `,
    },
    rq: [
      ['他刚做了什么？', ['从那不勒斯回来', '去了庞贝', '买了机票'], 0, 'sono appena tornato。'],
      ['他还没做什么？', ['参观庞贝', '吃披萨', '喝咖啡'], 0, 'Non ho ancora visitato Pompei。'],
    ],
    culture: '**那不勒斯是披萨的故乡**，正宗的那不勒斯披萨（**pizza napoletana**）有联合国教科文组织认定的非物质文化遗产技艺。经典款式只有两种：**Margherita**（番茄、马苏里拉、罗勒）和 **Marinara**（番茄、大蒜、牛至）。',
    speak: `
      Sei già stato a Napoli? | 问对方去没去过那不勒斯
      No, non ci sono ancora stato. | 回答：我还没去过
      Hai mai mangiato la pizza napoletana? | 问对方吃没吃过那不勒斯披萨
      Ho letto un libro e ho scritto una lettera. | 说你读了一本书、写了一封信
    `,
    wr: [
      '写 4–5 句话：你已经做过什么、还没做过什么、从来没做过什么（用 già / non ancora / mai）。',
      'Ho già visto Roma e Firenze.\nNon ho ancora visto Venezia.\nNon ho mai mangiato la pizza a Napoli.\nHo appena letto un libro sull\'Italia.',
      '我已经看过罗马和佛罗伦萨。我还没看过威尼斯。我从来没在那不勒斯吃过披萨。我刚读了一本关于意大利的书。',
    ],
    quiz: [
      ['fare 的过去分词是：', ['fatto', 'fato', 'fatuto'], 0, 'fare → fatto（不规则）。'],
      ['"我还没吃"：', ['Non ho ancora mangiato.', 'Ho non ancora mangiato.', 'Non ancora ho mangiato.'], 0, 'non… ancora。'],
      ['"我从来没去过罗马"：', ['Non sono mai stato a Roma.', 'Sono non mai stato a Roma.', 'Mai non sono stato a Roma.'], 0, 'non… mai。'],
      ['leggere 的分词是：', ['letto', 'leggiuto', 'leggato'], 0, 'leggere → letto。'],
    ],
  },

  // ───────────────────────── 第 54 天 ─────────────────────────
  {
    n: 54, it: 'Il mio weekend', zh: '我的周末',
    goal: '会用 prima / poi / dopo / infine 等连接词把过去的事按顺序讲清楚；会写一篇简单的日记（Caro diario…）。',
    scene: '周一午休，朱莉娅问你周末怎么过的。你按时间顺序讲给她听，并决定晚上把它写进日记。',
    dlg: `
      Giulia: Allora, com'è stato il tuo weekend? | 那么，你的周末怎么样？
      Li Ming: Prima sono andato al mercato, poi ho preparato il pranzo per gli amici. | 我先去了市场，然后给朋友们做了午饭。
      Giulia: E dopo pranzo? | 午饭后呢？
      Li Ming: Dopo pranzo abbiamo giocato a carte e abbiamo fatto una passeggiata. | 午饭后我们打牌，还散了步。
      Giulia: Che bello! E la domenica? | 真好！那周日呢？
      Li Ming: La domenica mi sono svegliato tardi, poi ho scritto a casa e ho guardato un film. Infine ho cucinato la cena. | 周日我醒得晚，然后给家里写了信，看了一部电影。最后做了晚饭。
      Giulia: Un weekend perfetto! | 完美的周末！
    `,
    q: [
      ['周六李明先去了哪里？', ['市场', '电影院', '公园'], 0, 'Prima sono andato al mercato。'],
      ['午饭后他们做了什么？', ['打牌、散步', '看电影', '睡觉'], 0, 'giocato a carte… passeggiata。'],
      ['周日最后他做了什么？', ['做晚饭', '写信', '看电影'], 0, 'Infine ho cucinato la cena。'],
    ],
    vocab: `
      raccontare | 讲述 | rac-con-TA-re
      prima | 首先；之前 | PRI-ma
      poi | 然后 | POI
      dopo | 之后 | DO-po
      infine | 最后 | in-FI-ne
      intanto | 同时；这期间 | in-TAN-to
      alla fine | 最后 | AL-la FI-ne
      a carte | 打牌 | a CAR-te
      scrivere a casa | 给家里写信 | SCRI-ve-re a CA-sa
      il diario | 日记 | il DIA-rio
      caro diario | 亲爱的日记 | CA-ro DIA-rio
      sabato scorso | 上个周六 | SA-ba-to SCOR-so
      il mese scorso | 上个月 | il ME-se SCOR-so
      due anni fa | 两年前 | DUE AN-ni FA
    `,
    pron: {
      t: '讲故事时的节奏',
      tips: [
        '讲故事时要用**连接词**切分意群：**Prima**… / **poi**… / **dopo**… / **infine**…，每个连接词后稍停，让听者跟上。',
        '**infine** in-FI-ne：重音在 FI；**intanto** in-TAN-to：重音在 TAN。语速不要太快，保持元音清晰。',
      ],
      drill: `
        prima | 首先
        poi | 然后
        dopo | 之后
        infine | 最后
        intanto | 同时
        alla fine | 最后
      `,
    },
    gram: [
      {
        h: '叙事连接词：把事情按顺序讲清楚',
        t: [
          ['功能', '连接词', '例句'],
          ['开头', 'prima, per prima cosa', 'Prima sono andato al mercato.'],
          ['承接', 'poi, dopo, dopo di che, e poi', 'Poi ho preparato il pranzo.'],
          ['同时', 'intanto, nel frattempo', 'Intanto lui ha cucinato.'],
          ['结尾', 'infine, alla fine, per finire', 'Infine ho guardato un film.'],
        ],
      },
      {
        h: '过去的时间框架',
        t: [
          ['时间', '说法'],
          ['昨天 / 前天', 'ieri / l\'altro ieri'],
          ['周六 / 上周六', 'sabato / sabato scorso'],
          ['上周 / 上月 / 去年', 'la settimana / il mese / l\'anno scorso'],
          ['……前', 'due giorni fa / un anno fa'],
        ],
      },
      {
        h: '日记的写法',
        p: ['日记常以 **Caro diario,** 开头；按时间顺序，用 **近过去时** 叙述，最后加上自己的感受：**Sono stato molto felice.**'],
        eg: ['Caro diario, oggi è stata una bella giornata. | 亲爱的日记，今天是美好的一天。', 'Sono stato molto felice. | 我非常开心。'],
      },
    ],
    text: {
      title: 'Caro diario',
      body: `
        Caro diario, | 亲爱的日记，
        oggi è stata una giornata bellissima. | 今天是美好的一天。

        Prima sono andato al mercato e ho comprato la frutta. | 我先去了市场买水果。
        Poi ho cucinato per gli amici: abbiamo mangiato e giocato a carte. | 然后我给朋友们做饭：我们吃了饭，打了牌。
        Infine abbiamo fatto una passeggiata sul fiume. | 最后我们沿河散了步。

        Sono molto stanco, ma sono felice! | 我很累，但很开心！
      `,
    },
    rq: [
      ['他买了什么？', ['水果', '面包', '鱼'], 0, 'la frutta。'],
      ['最后他们做了什么？', ['沿河散步', '看电影', '去餐馆'], 0, 'una passeggiata sul fiume。'],
    ],
    culture: '意大利学生从小学开始就写 **diario**（日记 / 记事本），**写日记是练习意大利语最有效的方式之一**：每天花 5 分钟，用 5 句话记下今天做了什么。',
    speak: `
      Com'è stato il tuo weekend? | 问对方周末怎么样
      Prima sono andato al mercato, poi ho preparato il pranzo. | 按顺序说你的周末
      Dopo pranzo abbiamo fatto una passeggiata. | 说午饭后散步
      Infine ho cucinato la cena. | 说最后做了晚饭
    `,
    wr: [
      '写一篇 6–7 句的日记（Caro diario…）：按时间顺序讲你上个周末，最后写感受。',
      "Caro diario,\nsabato sono andato al mercato e ho comprato la frutta.\nPoi ho cucinato per gli amici.\nDopo pranzo abbiamo giocato a carte.\nLa sera ho guardato un film.\nSono stato molto felice!",
      '亲爱的日记，周六我去了市场，买了水果。然后我给朋友们做饭。午饭后我们打牌。晚上我看了一部电影。我非常开心！',
    ],
    quiz: [
      ['"最后"（叙事结尾）可以说：', ['infine', 'prima', 'intanto'], 0, 'infine / alla fine = 最后。'],
      ['"两年前"：', ['due anni fa', 'fa due anni dopo', 'due anni scorsi'], 0, '……fa = ……前。'],
      ['日记通常用哪种时态叙述？', ['近过去时', '现在时', '将来时'], 0, '叙述已发生的事。'],
      ['"上个周六"：', ['sabato scorso', 'sabato passato prossimo', 'il sabato prossimo'], 0, 'scorso = 上一个。'],
    ],
  },

  // ───────────────────────── 第 55 天 ─────────────────────────
  {
    n: 55, it: 'Domani farò', zh: '明天我会……',
    goal: '掌握简单将来时（futuro semplice）的构成与不规则形式；会说计划和预测；会用 quando / appena + 将来时，以及 tra / fra + 时间。',
    scene: '周五，Marco 和你聊明年夏天的计划：你们打算去西西里旅行。',
    dlg: `
      Marco: Che cosa farai l'estate prossima? | 明年夏天你打算做什么？
      Li Ming: Andrò in Sicilia con Giulia. Partiremo ad agosto. | 我会和朱莉娅去西西里。我们八月出发。
      Marco: Fantastico! Quanto tempo resterete? | 太棒了！你们会待多久？
      Li Ming: Staremo due settimane. Visiteremo Palermo e Taormina. | 我们会待两周。我们会参观巴勒莫和陶尔米纳。
      Marco: E quando tornerai a Roma? | 你什么时候回罗马？
      Li Ming: Tornerò a settembre, appena finirà la vacanza. | 九月回去，假期一结束就回。
      Marco: Allora ti chiamerò quando sarai a casa! | 那你到家我就给你打电话！
    `,
    q: [
      ['李明夏天去哪里？', ['西西里', '撒丁岛', '威尼斯'], 0, 'Andrò in Sicilia。'],
      ['他们待多久？', ['两周', '一周', '一个月'], 0, 'Staremo due settimane。'],
      ['他什么时候回罗马？', ['九月', '八月', '十月'], 0, 'Tornerò a settembre。'],
    ],
    vocab: `
      l'estate prossima | 明年夏天 | l'e-STA-te PROS-si-ma
      l'anno prossimo | 明年 | l'AN-no PROS-si-mo
      tra / fra due settimane | 两周后 | tra DUE set-ti-MA-ne
      ad agosto | 在八月 | ad a-GO-sto
      a settembre | 在九月 | a set-TEM-bre
      la Sicilia | 西西里 | la Si-CI-lia
      fantastico | 太棒的 | fan-TA-sti-co
      quando | 当……时 | QUAN-do
      appena | 一……就 | ap-PE-na
      il progetto | 计划；项目 | il pro-GET-to
      il sogno | 梦想 | il SO-gno
      sperare | 希望 | spe-RA-re
      la vacanza | 假期 | la va-CAN-za
      chissà | 谁知道；也许 | chis-SÀ
    `,
    pron: {
      t: '将来时的重音',
      tips: [
        '将来时的第一、三人称**重音落在词尾**，且带重音符号：**parlerò** par-le-RÒ、**parlerà** par-le-RÀ；其他人称重音在 -E- 上：parlerai par-le-RAI。',
        '**andrò** an-DRÒ、**farà** fa-RÀ、**sarà** sa-RÀ：最后一个音节有重音符号，要读得干脆。',
      ],
      drill: `
        parlerò | 我将说
        parlerà | 他将说
        andrò | 我将去
        farò | 我将做
        sarà | 他将是
        staremo | 我们将待
        visiteremo | 我们将参观
      `,
    },
    gram: [
      {
        h: '简单将来时：规则变位',
        p: ['去掉不定式末尾的 -e，-are 动词的 a 变 e：**parlare → parler-**，**prendere → prender-**，**partire → partir-**，再加词尾 **-ò, -ai, -à, -emo, -ete, -anno**（所有人称、所有动词相同）。'],
        t: [
          ['人称', 'parlare', 'prendere', 'partire'],
          ['io', 'parlerò', 'prenderò', 'partirò'],
          ['tu', 'parlerai', 'prenderai', 'partirai'],
          ['lui / lei / Lei', 'parlerà', 'prenderà', 'partirà'],
          ['noi', 'parleremo', 'prenderemo', 'partiremo'],
          ['voi', 'parlerete', 'prenderete', 'partirete'],
          ['loro', 'parleranno', 'prenderanno', 'partiranno'],
        ],
        eg: ['Domani parlerò con Marco. | 明天我会和马可谈。', 'Partiremo ad agosto. | 我们八月出发。', 'Quando arriverai? | 你什么时候到？'],
      },
      {
        h: '拼写变化与不规则形式',
        t: [
          ['类型', '例子'],
          ['-care / -gare 加 h', 'cercare → cercherò；pagare → pagherò'],
          ['-ciare / -giare 去 i', 'cominciare → comincerò；mangiare → mangerò'],
          ['essere', 'sarò, sarai, sarà, saremo, sarete, saranno'],
          ['avere / andare / vedere / potere / dovere / sapere', 'avrò / andrò / vedrò / potrò / dovrò / saprò'],
          ['fare / stare / dare', 'farò / starò / darò'],
          ['venire / volere / bere', 'verrò / vorrò / berrò'],
        ],
      },
      {
        h: '将来时的用法',
        p: [
          '① **计划与预测**：Domani pioverà. ② **quando / appena + 将来时**（汉语常用现在时）：Quando **sarò** a casa, ti **chiamerò**. ③ **tra / fra + 时间** = "……之后"：Parto **tra** due giorni.',
          '口语里，**近期、确定的事**常直接用现在时（第 45 天）；将来时更多用于较远或不确定的将来。',
        ],
      },
    ],
    text: {
      title: 'I miei progetti',
      body: `
        L'anno prossimo andrò in Sicilia in estate. | 明年夏天我会去西西里。
        Visiterò Palermo, Taormina e l'Etna. | 我会参观巴勒莫、陶尔米纳和埃特纳火山。

        Mangerò i cannoli e berrò il caffè con la granita. | 我会吃卡诺里卷，喝配刨冰的咖啡。
        Quando tornerò a casa, racconterò tutto ai miei genitori. | 回到家后，我会把一切讲给父母听。
      `,
    },
    rq: [
      ['他打算什么时候去西西里？', ['明年夏天', '今年冬天', '下个月'], 0, "l'anno prossimo… in estate。"],
      ['他会参观哪些地方？', ['巴勒莫、陶尔米纳、埃特纳火山', '罗马、佛罗伦萨', '威尼斯'], 0, 'Palermo, Taormina e l\'Etna。'],
    ],
    culture: '**西西里**是地中海最大的岛屿，拥有古希腊神庙、巴洛克小镇和美食：**cannolo**（奶酪卷）、**arancino**（炸饭团）、**granita**（刨冰，常配 brioche 当早餐）。**埃特纳（Etna）**是欧洲最活跃的火山之一。',
    speak: `
      Che cosa farai l'estate prossima? | 问对方明年夏天做什么
      Andrò in Sicilia con Giulia. | 说你会和朱莉娅去西西里
      Partiremo ad agosto e resteremo due settimane. | 说八月出发，待两周
      Quando sarò a casa, ti chiamerò. | 说：我到家就给你打电话
    `,
    wr: [
      '写 5 句话说你明年的计划：去哪里、什么时候、做什么、和谁。',
      "L'anno prossimo andrò in Italia con un'amica.\nPartiremo ad agosto.\nVisiteremo Roma e Firenze.\nMangeremo molta pasta.\nQuando torneremo, avremo tante foto!",
      '明年我会和一位朋友去意大利。我们八月出发。我们会参观罗马和佛罗伦萨。我们会吃很多意面。回来时我们会有很多照片！',
    ],
    quiz: [
      ['"我明天将说"（parlare）：', ['parlerò', 'parlaro', 'parlarò'], 0, '-are → -erò。'],
      ['andare 的将来时 io 形式：', ['andrò', 'anderò', 'andaro'], 0, 'andare 不规则：andrò。'],
      ['essere 的将来时 noi 形式：', ['saremo', 'serimo', 'essaremo'], 0, 'saremo。'],
      ['"我回到家就给你打电话"：', ['Quando sarò a casa, ti chiamerò.', 'Quando sono a casa, ti chiamerò.', 'Quando sarò a casa, ti chiamo.'], 0, 'quando 后接将来时。'],
    ],
  },

  // ───────────────────────── 第 56 天 ─────────────────────────
  {
    n: 56, it: 'Dimmi! Prenda!', zh: '命令式',
    goal: '掌握对 tu / noi / voi / Lei 的命令式，包括不规则形式和否定命令式（non + 不定式）；会把代词接在命令式后面（dimmi, dammi, aggiungili）；会读懂简单食谱。',
    scene: '周六下午，朱莉娅在厨房教你做番茄意面。她一步步给你下指令。',
    dlg: `
      Giulia: Allora, facciamo la pasta al pomodoro. Prendi una pentola e riempila d'acqua. | 好，我们做番茄意面。拿一只锅，装满水。
      Li Ming: Fatto. Cosa faccio adesso? | 好了。我现在做什么？
      Giulia: Metti un po' di sale e aspetta: l'acqua deve bollire. | 放点盐，等一等：水要烧开。
      Li Ming: Intanto taglio la cipolla? | 我先把洋葱切了？
      Giulia: Sì, ma non piangere! Taglia la cipolla e mettila nella padella con l'olio. | 对，不过别哭！切洋葱，把它放进有油的平底锅。
      Li Ming: Ecco. Poi aggiungo i pomodori? | 好了。然后加番茄吗？
      Giulia: Sì, aggiungili e mescola piano. Dopo dieci minuti, scola la pasta. | 对，把它们加进去，轻轻搅拌。十分钟后，把意面捞出来。
    `,
    q: [
      ['第一步要做什么？', ['拿锅装水', '切洋葱', '放盐'], 0, 'Prendi una pentola e riempila d\'acqua。'],
      ['Giulia 为什么说"别哭"？', ['切洋葱会流泪', '菜太辣', '太难做'], 0, 'non piangere（切洋葱）。'],
      ['十分钟后要做什么？', ['捞出意面', '关火', '加盐'], 0, 'scola la pasta。'],
    ],
    vocab: `
      la pentola | 锅 | la PEN-to-la
      la padella | 平底锅 | la pa-DEL-la
      riempire | 装满 | riem-PI-re
      aggiungere | 加；添加 | ag-GIUN-ge-re
      mescolare | 搅拌 | me-sco-LA-re
      scolare | 沥干；捞出 | sco-LA-re
      tagliare | 切 | ta-GLIA-re
      mettere | 放；放入 | MET-te-re
      l'olio | 油 | l'O-lio
      il sale | 盐 | il SA-le
      la cipolla | 洋葱 | la ci-POL-la
      bollire | 沸腾；煮开 | bol-LI-re
      piano | 轻轻地；慢慢地 | PIA-no
      fatto! | 好了！做完了！ | FAT-to
    `,
    pron: {
      t: '命令式的语气',
      tips: [
        '命令式的**语气要柔和**：加上 **per favore**、**pure** 或语调上扬会显得友好。直接说 **Taglia!** 只在亲近的人之间使用。',
        '代词接在命令式后面时**重音不变**：**dimmi** DIM-mi，**aggiungili** ag-GIUN-gi-li，**riempila** riem-PI-la（重音随词形变化，要多听）。',
      ],
      drill: `
        prendi | 拿
        metti | 放
        aspetta | 等
        taglia | 切
        riempila | 把它装满
        aggiungili | 把它们加进去
        dimmi | 告诉我
        dammi | 给我
      `,
    },
    gram: [
      {
        h: '命令式：四种人称',
        p: [
          '**tu** 命令式：-are 动词与 lui / lei 的现在时同形（parla!），-ere / -ire 动词与 tu 现在时同形（prendi!，dormi!）。',
          '**Lei**（您）和 **noi**、**voi** 的命令式见下表。**-isc- 型动词**的 tu / Lei 形式也要加 -isc-：finisci! / finisca。',
        ],
        t: [
          ['动词', 'tu', 'Lei（您）', 'noi', 'voi'],
          ['parlare', 'parla', 'parli', 'parliamo', 'parlate'],
          ['prendere', 'prendi', 'prenda', 'prendiamo', 'prendete'],
          ['dormire', 'dormi', 'dorma', 'dormiamo', 'dormite'],
          ['finire', 'finisci', 'finisca', 'finiamo', 'finite'],
        ],
        eg: ['Parla più lentamente! | 说慢一点！', 'Prenda questa strada. | 请走这条路。', 'Andiamo! | 我们走吧！'],
      },
      {
        h: '不规则的 tu 命令式与否定',
        t: [
          ['动词', 'tu', 'Lei', '否定（tu）'],
          ['andare', 'vai / va\'', 'vada', 'non andare'],
          ['fare', 'fai / fa\'', 'faccia', 'non fare'],
          ['dire', 'di\'', 'dica', 'non dire'],
          ['dare', 'dai / da\'', 'dia', 'non dare'],
          ['stare', 'stai / sta\'', 'stia', 'non stare'],
          ['essere', 'sii', 'sia', 'non essere'],
          ['avere', 'abbi', 'abbia', 'non avere'],
        ],
        p: ['**对 tu 的否定命令式** = **non + 不定式**：Non piangere! Non andare! 对 noi / voi / Lei，否定直接在肯定式前加 non。'],
      },
      {
        h: '代词接在命令式后面',
        p: ['tu / noi / voi 命令式：**代词接在动词末尾**连写，必要时双写辅音：di\' + mi → **dimmi**，da\' + mi → **dammi**，fa\' + mi → **fammi**。对 Lei 则放在动词**前面**：**Lo prenda**。'],
        eg: ['Dimmi la verità! | 告诉我实话！', 'Dammi il sale, per favore. | 请把盐给我。', 'Aggiungili e mescola. | 把它们加进去，搅拌。', 'Mi dica! | 您请说！（店员招呼）'],
      },
    ],
    text: {
      title: 'Spaghetti al pomodoro',
      body: `
        Ingredienti: spaghetti, pomodori, aglio, olio, sale, basilico. | 原料：意面、番茄、大蒜、油、盐、罗勒。

        Metti l'acqua in una pentola e aggiungi il sale. | 把水放进锅里，加盐。
        Scalda l'olio con l'aglio in una padella. | 在平底锅里用油加热大蒜。
        Aggiungi i pomodori e cuoci per dieci minuti. | 加入番茄，煮十分钟。

        Scola la pasta e mescola con la salsa. | 捞出意面，和酱汁一起拌匀。
        Aggiungi il basilico e... buon appetito! | 加上罗勒，然后……祝好胃口！
      `,
    },
    rq: [
      ['食谱里一开始要做什么？', ['烧水加盐', '切洋葱', '拌面'], 0, "Metti l'acqua… aggiungi il sale。"],
      ['番茄要煮多久？', ['十分钟', '五分钟', '半小时'], 0, 'cuoci per dieci minuti。'],
    ],
    culture: '意大利食谱和路牌、说明书里大量使用**命令式**：Mescolare（搅拌）、Tirare（拉）、Spingere（推）、Attenzione（注意）。**意大利人对意面很讲究**：**不要把意面折断**、**煮到 al dente**（有嚼劲）、**不要在煮面水里加油**、**面条和酱汁在锅里拌一下再上桌**。',
    speak: `
      Dimmi che cosa devo fare. | 请对方告诉你该怎么做
      Prendi una pentola e riempila d'acqua. | 下指令：拿锅装满水
      Non piangere! Taglia la cipolla. | 说：别哭！切洋葱
      Mi dica! | 店员招呼用语：您请说
    `,
    wr: [
      '写 5 句食谱式的指令（用命令式），教别人做一个你拿手的简单菜或饮料。',
      "Prendi due uova e mettile in una ciotola.\nAggiungi un po' di sale.\nMescola bene.\nScalda la padella con l'olio.\nCuoci le uova per due minuti.",
      '拿两个鸡蛋放在碗里。加一点盐。搅拌均匀。用油把平底锅加热。把鸡蛋煎两分钟。',
    ],
    quiz: [
      ['parlare 的 tu 命令式：', ['parla', 'parli', 'parlare'], 0, '-are 动词的 tu 命令式 = lui / lei 现在时形式。'],
      ['对朋友的否定命令式"别哭"：', ['Non piangere!', 'Non piangi!', 'Non pianga!'], 0, 'tu 否定 = non + 不定式。'],
      ['"告诉我"（dire + mi）：', ['dimmi', 'dirmi', 'dici mi'], 0, "di' + mi → dimmi。"],
      ['对"您"说：请走这条路（prendere）：', ['Prenda questa strada.', 'Prendi questa strada.', 'Prende questa strada.'], 0, 'Lei 命令式 = prenda。'],
    ],
  },

  // ───────────────────────── 第 57 天 ─────────────────────────
  {
    n: 57, it: 'Più, meno, il più', zh: '比较与最高级',
    goal: '掌握比较级与最高级：più / meno … di / che、tanto … quanto、il più …、不规则形式（migliore, peggiore, meglio, peggio）；会比较城市、价格、口味。',
    scene: '你在犹豫下个周末去哪个城市。Chiara 给你分析各个城市的特点。',
    dlg: `
      Li Ming: Quale città è più bella: Roma o Firenze? | 哪座城市更美：罗马还是佛罗伦萨？
      Chiara: Dipende. Roma è più grande e più caotica, Firenze è più tranquilla. | 看情况。罗马更大更乱，佛罗伦萨更安静。
      Li Ming: E dove si mangia meglio? | 哪里吃得更好？
      Chiara: A Bologna! Secondo me, in Italia si mangia meglio lì. | 在博洛尼亚！依我看，意大利吃得最好的就在那里。
      Li Ming: Ma i prezzi sono più alti che a Roma? | 但那里的价格比罗马高吗？
      Chiara: No, sono quasi uguali. A Roma la vita è cara come a Milano. | 不，差不多。罗马的生活和米兰一样贵。
      Li Ming: Allora scelgo Bologna: il miglior posto per un buongustaio! | 那我选博洛尼亚：美食家的最佳去处！
    `,
    q: [
      ['Chiara 觉得罗马怎么样？', ['更大更乱', '更小更安静', '更便宜'], 0, 'più grande e più caotica。'],
      ['哪里吃得更好？', ['博洛尼亚', '罗马', '米兰'], 0, 'A Bologna!'],
      ['罗马和米兰的生活成本？', ['一样贵', '罗马更便宜', '米兰更便宜'], 0, 'cara come a Milano。'],
    ],
    vocab: `
      dipende | 看情况 | di-PEN-de
      la vita | 生活；生命 | la VI-ta
      i prezzi | 价格 | i PREZ-zi
      migliore | 更好的 | mi-GLIO-re
      peggiore | 更差的 | pej-JO-re
      meglio | 更好地 | MEL-glio
      peggio | 更差地 | PEJ-jo
      tranquillo | 安静的；平静的 | tran-QUIL-lo
      caotico | 混乱的 | ca-O-ti-co
      quasi | 几乎 | QUA-si
      il buongustaio | 美食家 | il buon-gu-STA-io
      secondo me | 依我看 | se-CON-do ME
      il più | 最…… | il PIÙ
      il meno | 最不…… | il ME-no
    `,
    pron: {
      t: 'migliore / meglio 里的 gli',
      tips: [
        '**migliore** mi-GLIO-re 和 **meglio** MEL-glio 都有 **gli /ʎ/**：舌面贴硬腭；**peggiore / peggio** 里的 gg 是长软音 /ddʒ/。',
        '最高级的 **il più** 要连读：**il più bello** 读作 il-piu-BEL-lo。',
      ],
      drill: `
        migliore | 更好的
        meglio | 更好地
        peggiore | 更差的
        peggio | 更差地
        il più bello | 最美的
        il meno caro | 最便宜的
      `,
    },
    gram: [
      {
        h: '比较级与最高级回顾',
        t: [
          ['结构', '例句'],
          ['più / meno + 形容词 + di（比较两个名词）', 'Roma è più grande di Firenze.'],
          ['più / meno + 形容词 + che（比较两个性质 / 地点）', 'È più bella che comoda. / Più alti a Roma che a Bologna.'],
          ['(tanto) … quanto / (così) … come（同级）', 'La vita è cara come a Milano.'],
          ['il / la più + 形容词 + di / in（相对最高级）', 'La città più bella d\'Italia.'],
          ['-issimo（绝对最高级）', 'È bellissima. = È molto bella.'],
        ],
      },
      {
        h: '不规则比较级',
        t: [
          ['原级', '比较级', '最高级', '副词'],
          ['buono', 'migliore', 'il migliore / ottimo', 'bene → meglio'],
          ['cattivo', 'peggiore', 'il peggiore / pessimo', 'male → peggio'],
          ['grande', 'maggiore', 'il maggiore / massimo', '—'],
          ['piccolo', 'minore', 'il minore / minimo', '—'],
          ['—', '—', '—', 'molto → più；poco → meno'],
        ],
        p: ['**形容词**用 migliore / peggiore，**副词**用 meglio / peggio：Questa pizza è **migliore**；Qui si mangia **meglio**。'],
        eg: ['La pasta è meglio qui che a casa. | 这里的面比家里的好。', 'È il miglior ristorante della città. | 这是城里最好的餐厅。', 'Oggi sto meglio. | 今天我感觉好些了。'],
      },
    ],
    text: {
      title: 'Roma o Bologna?',
      body: `
        Roma è la città più grande d'Italia e ha il centro più ricco di storia. | 罗马是意大利最大的城市，历史气息最浓。
        Ma è anche più cara e più caotica di Bologna. | 但它也比博洛尼亚更贵、更乱。

        A Bologna la vita è più tranquilla e si mangia meglio. | 在博洛尼亚生活更安静，也吃得更好。
        Per me, Bologna è la città migliore per studiare e mangiare! | 对我来说，博洛尼亚是读书和吃饭最好的地方！
      `,
    },
    rq: [
      ['哪座城市更大？', ['罗马', '博洛尼亚', '一样大'], 0, 'Roma è la città più grande。'],
      ['作者为什么喜欢博洛尼亚？', ['安静、吃得好', '更便宜', '更古老'], 0, 'più tranquilla e si mangia meglio。'],
    ],
    culture: '**博洛尼亚**被称为 **"La Grassa"**（肥沃的、美食之城）、**"La Dotta"**（博学之城，有世界最古老的大学）、**"La Rossa"**（红色之城，赤陶色的屋顶与拱廊）。**Tagliatelle al ragù**（肉酱宽面）就是这里的招牌，**不要点"spaghetti bolognese"**——在本地没有这个说法。',
    speak: `
      Quale città è più bella: Roma o Firenze? | 比较两座城市
      Roma è più grande di Firenze. | 说罗马比佛罗伦萨大
      Qui si mangia meglio che a casa. | 说这里比家里吃得好
      Questa pizza è la migliore che ho mangiato. | 说这是吃过最好的披萨
    `,
    wr: [
      '比较你熟悉的两座城市（或两家店）：大小、价格、生活、美食，各用一个比较句，最后给出你的选择。',
      'Shanghai è più grande di Firenze.\nFirenze è meno cara di Roma.\nA Bologna si mangia meglio che a Milano.\nPer me, la città migliore è Bologna.',
      '上海比佛罗伦萨大。佛罗伦萨比罗马便宜。在博洛尼亚比在米兰吃得更好。对我来说，最好的城市是博洛尼亚。',
    ],
    quiz: [
      ['"他比我高"：', ['È più alto di me.', 'È più alto che me.', 'È più alto da me.'], 0, '比较人称用 di。'],
      ['副词"更好地"：', ['meglio', 'migliore', 'più bene'], 0, 'bene → meglio。'],
      ['"这是最好的餐厅"：', ['È il miglior ristorante.', 'È il più bene ristorante.', 'È migliore ristorante.'], 0, 'il migliore → il miglior（名词前）。'],
      ['"和米兰一样贵"：', ['cara come a Milano', 'più cara a Milano', 'caro di Milano'], 0, 'così / tanto … come / quanto。'],
    ],
  },

  // ───────────────────────── 第 58 天 ─────────────────────────
  {
    n: 58, it: 'Ci e ne', zh: 'ci 与 ne，及代词在过去时中',
    goal: '掌握 ne（"其中的、关于它"）的数量用法；巩固 ci；掌握直接宾语代词与近过去时的搭配（l\'ho visto / li ho comprati）及分词一致规则。',
    scene: '周六下午，你和朱莉娅在厨房清点从市场买来的东西，一边核对一边用代词省去重复的名词。',
    dlg: `
      Giulia: Sei andato al mercato stamattina? | 你今早去市场了吗？
      Li Ming: Sì, ci sono andato presto. | 去了，我去得很早。
      Giulia: Hai comprato i pomodori? | 你买番茄了吗？
      Li Ming: Sì, li ho comprati a due euro al chilo. | 买了，每公斤两欧元。
      Giulia: Quanti ne hai presi? | 你拿了多少？
      Li Ming: Ne ho presi due chili. | 我拿了两公斤。
      Giulia: E il basilico? Ne hai preso un po'? | 罗勒呢？你拿了一点吗？
      Li Ming: Sì, ne ho preso un mazzetto. Ho visto anche le ciliegie, ma non ne ho comprate. | 拿了，我拿了一小束。我还看到了樱桃，但没买。
      Giulia: Perché? Sono troppo care? | 为什么？太贵了吗？
      Li Ming: Sì, costano otto euro al chilo! | 是的，每公斤八欧元！
    `,
    q: [
      ['李明买了多少番茄？', ['两公斤', '一公斤', '半公斤'], 0, 'ne ho presi due chili。'],
      ['他为什么没买樱桃？', ['太贵', '不新鲜', '没看到'], 0, 'Sono troppo care?—costano otto euro al chilo。'],
      ['罗勒他买了多少？', ['一小束', '一大把', '没买'], 0, 'un mazzetto。'],
    ],
    vocab: `
      ne | 其中的；关于它 | NE
      ci | 那里 | CI
      l'ho visto | 我看见它了 | l'o VI-sto
      li ho comprati | 我买了它们 | li o com-PRA-ti
      ne ho preso | 我拿了一些 | ne o PRE-so
      non ne ho | 我没有（这个） | non ne O
      quanti ne…? | 你……多少？ | QUAN-ti ne
      il mazzetto | 小束 | il maz-ZET-to
      la ciliegia | 樱桃 | la ci-LIE-gia
      la fragola | 草莓 | la FRA-go-la
      la pesca | 桃子 | la PE-sca
      la pera | 梨 | la PE-ra
      l'arancia | 橙子 | l'a-RAN-cia
      al chilo | 每公斤 | al CHI-lo
    `,
    pron: {
      t: '代词连读与 ciliegia',
      tips: [
        '**l\'ho visto** 读作 lovìsto（l\' + ho 连读）；**li ho comprati** 读作 liocomprati。**ne ho presi** 读作 neoprèsi。',
        '**ciliegia** ci-LIE-gia：重音在 LIE，gia 中 i 不发音；**fragola** FRA-go-la（倒数第三音节重音）。',
      ],
      drill: `
        l'ho visto | 我看见它了
        li ho comprati | 我买了它们
        ne ho presi due | 我拿了两个
        non ne ho comprate | 我没买（这些）
        ciliegia | 樱桃
        fragola | 草莓
      `,
    },
    gram: [
      {
        h: '直接宾语代词 + 近过去时：分词要与代词一致',
        p: ['**lo / la / li / le** 放在助动词前，过去分词要与代词的**性、数一致**：**lo** → -o，**la** → -a，**li** → -i，**le** → -e。lo / la 遇到 ho / hai / ha 时**省音**成 **l\'**。'],
        t: [
          ['原句', '用代词', '分词'],
          ['Ho visto il film.', "L'ho visto.", 'visto（阳单）'],
          ['Ho mangiato la mela.', "L'ho mangiata.", 'mangiata（阴单）'],
          ['Ho comprato i pomodori.', 'Li ho comprati.', 'comprati（阳复）'],
          ['Ho provato le scarpe.', 'Le ho provate.', 'provate（阴复）'],
        ],
        p: ['**mi / ti / ci / vi** 与分词的一致是可选的；**ne** 与表示数量的名词一致（见下）。'],
      },
      {
        h: 'ne：替代"……的一部分 / 关于……"',
        p: ['**ne** 替代由 **di + 名词**引出的内容，常用于**数量**：**Quanti pomodori hai? Ne ho due.**（我有两个。）**Ne ho presi due chili**：ne 指"番茄"，分词 **presi** 与它（阳复）一致。'],
        t: [
          ['问答', '例句'],
          ['Quanti ne vuoi?', 'Ne voglio due.'],
          ['Hai preso il basilico?', 'Sì, ne ho preso un mazzetto.'],
          ['Hai comprato le ciliegie?', 'No, non ne ho comprate.'],
          ['Parli di Marco?', 'Sì, ne parlo spesso.（关于他）'],
        ],
      },
      {
        h: 'ci（回顾）',
        p: ['ci = "到 / 在那里"：**Ci sono andato.**（我去了那里。）近过去时用 essere，分词与**主语**一致：Ci siamo stati. Ci sono stata.'],
      },
    ],
    text: {
      title: 'Al mercato',
      body: `
        Questa mattina ho fatto la spesa al mercato. | 今天早上我在市场买了菜。
        Ho comprato i pomodori: li ho presi a due euro al chilo. | 我买了番茄：每公斤两欧元。

        Ho visto anche le fragole e ne ho comprato un cestino. | 我还看到了草莓，买了一小篮。
        Le ciliegie costano troppo e non le ho prese. | 樱桃太贵了，我没买。
        Al mercato ci vado sempre il sabato mattina! | 我每周六早上都去市场！
      `,
    },
    rq: [
      ['番茄一公斤多少钱？', ['两欧元', '四欧元', '八欧元'], 0, 'a due euro al chilo。'],
      ['他买了草莓吗？', ['买了一小篮', '没买', '买了两公斤'], 0, 'ne ho comprato un cestino。'],
    ],
    culture: '意大利人**对时令食材（stagionale）很讲究**：樱桃、草莓、桃子都有季节。去市场买东西最好**少说"我要"，多说数量**：**Ne vorrei due chili**（我要两公斤）——这里的 ne 是意大利人最爱用的小词之一。',
    speak: `
      Ci sono andato presto. | 说你很早就去了（那里）
      Li ho comprati. | 说你买了它们（指番茄）
      Ne ho preso due chili. | 说你拿了两公斤
      Non ne ho comprate. | 说你没买（这些，指樱桃）
    `,
    wr: [
      '写 4 句话，用代词（lo / la / li / le / ne / ci）替换名词，回答下面的问题：Hai comprato il pane? Hai visto le mele? Quanti euro hai speso? Sei andato al mercato?',
      "Sì, l'ho comprato.\nSì, le ho viste.\nNe ho spesi dieci.\nSì, ci sono andato stamattina.",
      '是的，我买了它。是的，我看到了它们。我花了十欧元。是的，我今早去了那里。',
    ],
    quiz: [
      ['"我买了它们（i pomodori）"：', ['Li ho comprati.', 'Li ho comprato.', 'Le ho comprati.'], 0, '代词 li（阳复）→ 分词 comprati。'],
      ['"我看见了它（la casa）"：', ["L'ho vista.", "L'ho visto.", 'Lo ho vista.'], 0, '阴性单数 → vista。'],
      ['"我有两个"（回答 Quanti pomodori hai?）：', ['Ne ho due.', 'Li ho due.', 'Ci ho due.'], 0, 'ne + 数量。'],
      ['"我去了那里（女）"：', ['Ci sono andata.', 'Ci ho andata.', 'Sono andata ci.'], 0, 'ci 替代地点，分词与主语一致。'],
    ],
  },

  // ───────────────────────── 第 59 天 ─────────────────────────
  {
    n: 59, it: 'Un messaggio', zh: '写短信与明信片',
    goal: '会写非正式的短信、明信片和短信函：开头与结尾的套语、日期与地址格式；认识常见缩写（cmq, xké, tvb）；会写简单的邀请和感谢。',
    scene: '你到西西里旅行，Marco 在聊天软件里问你到了没有。你一边回消息，一边准备写明信片。',
    dlg: `
      Marco: Ciao! Sei arrivato? | 嗨！你到了吗？
      Li Ming: Sì, appena arrivato! Il viaggio è stato lungo, ma bello. | 是的，刚到！旅途很长，但很棒。
      Marco: Perfetto! Mandami una foto del mare! | 太好了！给我发一张海的照片！
      Li Ming: Subito! Comunque fa molto caldo, trentacinque gradi. | 马上！不过天气很热，三十五度。
      Marco: Bevi molta acqua e metti la crema solare! | 多喝水，涂防晒霜！
      Li Ming: Sì, mamma! Ti scrivo una cartolina da Taormina. | 好的，妈妈！我从陶尔米纳给你寄一张明信片。
      Marco: Grazie! Un abbraccio! | 谢谢！抱抱你！
    `,
    q: [
      ['李明到了哪里？', ['西西里', '罗马', '米兰'], 0, 'da Taormina。'],
      ['那里天气怎么样？', ['很热', '下雨', '很冷'], 0, 'fa molto caldo, trentacinque gradi。'],
      ['Marco 提醒他做什么？', ['多喝水、涂防晒', '早点睡', '少吃点'], 0, 'Bevi molta acqua e metti la crema solare。'],
    ],
    vocab: `
      il messaggio | 信息；短信 | il mes-SAG-gio
      mandare | 寄；发送 | man-DA-re
      la cartolina | 明信片 | la car-to-LI-na
      la crema solare | 防晒霜 | la CRE-ma so-LA-re
      un abbraccio | 一个拥抱（结尾语） | un ab-BRAC-cio
      baci | 吻（结尾语） | BA-ci
      a presto | 回头见 | a PRE-sto
      ti voglio bene | 我爱你（亲友间） | ti VO-glio BE-ne
      mi manchi | 我想你 | mi MAN-chi
      ti penso | 我想着你 | ti PEN-so
      caro / cara | 亲爱的（称呼） | CA-ro / CA-ra
      cordiali saluti | 此致敬礼（正式） | cor-DIA-li sa-LU-ti
      l'indirizzo | 地址 | l'in-di-RIZ-zo
      comunque | 不过；总之 | co-MUN-que
    `,
    pron: {
      t: '短信里的语感',
      tips: [
        '短信和明信片用的是**口语化的书面语**：句子短、感叹多。读出来时要像在说话：**Ti scrivo da Taormina!**',
        '**abbraccio** ab-BRAC-cio：bb、cc 都是长辅音；**cordiali saluti** cor-DIA-li sa-LU-ti。',
      ],
      drill: `
        un abbraccio | 拥抱
        baci | 吻
        a presto | 回头见
        mi manchi | 我想你
        ti voglio bene | 我爱你
        cordiali saluti | 此致敬礼
      `,
    },
    gram: [
      {
        h: '信件与短信：开头与结尾',
        t: [
          ['场合', '开头', '结尾'],
          ['亲友（非正式）', 'Caro Marco, / Cara Giulia, / Ciao!', 'Un abbraccio! / Baci / A presto! / Ti voglio bene'],
          ['熟人、同事（半正式）', 'Ciao Anna, / Caro Luca,', 'Un saluto / A presto / Cordiali saluti'],
          ['正式（客户、机构）', 'Gentile Signora Rossi, / Egregio Dottore,', 'Cordiali saluti / Distinti saluti'],
        ],
        p: ['**日期和地点**写在右上角：**Roma, 12 giugno 2026**。**回信**常用 **Grazie per…**（谢谢你……）：Grazie per la tua lettera!'],
      },
      {
        h: '聊天软件里的缩写',
        t: [
          ['缩写', '原词', '意思'],
          ['cmq', 'comunque', '不过；总之'],
          ['xké / xché', 'perché', '为什么；因为'],
          ['tvb / tvtb', 'ti voglio bene / ti voglio tanto bene', '爱你'],
          ['nn', 'non', '不'],
          ['qlc / qlcs', 'qualcuno / qualcosa', '某人 / 某物'],
          ['x', 'per', '为了；给'],
          ['grz / gz', 'grazie', '谢谢'],
        ],
        p: ['这些缩写只用于朋友之间的短信，**正式邮件、作业、考试里一律不能用**。'],
      },
      {
        h: '明信片的写法',
        p: ['明信片通常很短：地点 + 天气 + 做了什么 + 感受 + 结尾语。'],
        eg: ['Saluti da Taormina! | 来自陶尔米纳的问候！', 'Fa caldo e il mare è splendido. | 天气很热，海非常美。', 'Mi manchi! Un abbraccio. | 想你！拥抱你。'],
      },
    ],
    text: {
      title: 'Una cartolina da Taormina',
      body: `
        Taormina, 15 agosto | 陶尔米纳，8 月 15 日
        Caro Marco, | 亲爱的马可，

        saluti dalla Sicilia! Fa molto caldo, ma il mare è bellissimo. | 来自西西里的问候！天气很热，但海美极了。
        Ieri ho mangiato un cannolo buonissimo e ho visto l'Etna al tramonto. | 昨天我吃了一个特别好吃的卡诺里卷，还在日落时看到了埃特纳火山。

        Mi manchi! Un abbraccio, | 想你！拥抱你，
        Li Ming | 李明
      `,
    },
    rq: [
      ['明信片寄给谁？', ['马可', '朱莉娅', '父母'], 0, 'Caro Marco。'],
      ['他昨天吃了什么？', ['卡诺里卷', '披萨', '冰淇淋'], 0, 'un cannolo。'],
      ['结尾语是？', ['Un abbraccio', 'Cordiali saluti', 'Arrivederci'], 0, 'Un abbraccio。'],
    ],
    culture: '**意大利邮政**效率常被调侃，一张明信片寄到中国可能要**两三周**，所以**寄出后别指望马上到**。邮票可以在 **tabaccheria（烟草店，门口有大写 T 标志）**买，不用专门去邮局。在节日里（圣诞、新年）寄明信片或发短信问候是很受欢迎的习惯。',
    speak: `
      Sei arrivato? | 问对方到了没有
      Mandami una foto del mare! | 请对方发一张海的照片
      Ti scrivo una cartolina. | 说你会寄一张明信片
      Un abbraccio e a presto! | 用结尾语告别
    `,
    wr: [
      '写一张 5–6 句话的明信片（寄给你的意大利朋友）：地点和日期、天气、做了什么、感受、结尾语。',
      "Roma, 20 ottobre\nCaro Marco,\nsaluti da Roma! Oggi fa bello e ho visitato il Colosseo.\nHo mangiato un'ottima pizza.\nMi manchi! Un abbraccio,\nLi Ming",
      '罗马，10 月 20 日。亲爱的马可，来自罗马的问候！今天天气很好，我参观了斗兽场。我吃了一块特别棒的披萨。想你！拥抱你，李明',
    ],
    quiz: [
      ['给好友写信，结尾可以用：', ['Un abbraccio!', 'Distinti saluti', 'Egregio signore'], 0, 'un abbraccio = 拥抱。'],
      ['给不认识的客户写信，开头用：', ['Gentile Signora Rossi,', 'Ciao Rossi,', 'Cara Rossi,'], 0, 'Gentile / Egregio = 正式。'],
      ['短信缩写 "tvb" 是：', ['ti voglio bene', 'tra vento e bora', 'tutto va bene'], 0, 'ti voglio bene。'],
      ['在哪里买邮票？', ['tabaccheria 或邮局', '只在银行', '超市收银台'], 0, '烟草店也卖邮票。'],
    ],
  },

  // ───────────────────────── 第 60 天（岛屿关卡 + 阶段二毕业考）─────────────────────────
  {
    n: 60, test: true, exam: true, it: 'Prova finale 2', zh: '阶段二毕业：两个月回顾',
    goal: '检验第二阶段的全部成果：作息与不规则动词、缩合介词、代词、过去时与将来时、命令式、比较级；通过 30 题毕业考，取得"成长期"证书（A1 完整）。',
    scene: '两个月过去了。Marco 请你喝咖啡，让你总结学到了什么，并聊聊将来的计划。',
    dlg: `
      Marco: Allora, Li Ming, sono passati due mesi. Che cosa hai imparato? | 那么，李明，两个月过去了。你学到了什么？
      Li Ming: Molto! Ho imparato a parlare con le persone e ho visitato tante città. | 很多！我学会了和人交谈，也参观了许多城市。
      Marco: Qual è stata la città più bella? | 哪座城市最美？
      Li Ming: Firenze, secondo me. È più piccola di Roma, ma è bellissima. | 依我看是佛罗伦萨。它比罗马小，但美极了。
      Marco: E in futuro che cosa farai? | 那将来你要做什么？
      Li Ming: Continuerò a studiare e andrò in Sicilia in estate. | 我会继续学习，夏天去西西里。
      Marco: Un consiglio: parla sempre italiano e non avere paura di sbagliare! | 一个建议：永远说意大利语，别怕犯错！
      Li Ming: Hai ragione! Mi metto subito al lavoro. | 你说得对！我马上开始努力。
      Marco: Bravo! Sei già molto migliorato! | 好样的！你已经进步很多了！
    `,
    q: [
      ['已经过去多久了？', ['两个月', '两周', '两年'], 0, 'sono passati due mesi。'],
      ['李明觉得哪座城市最美？', ['佛罗伦萨', '罗马', '那不勒斯'], 0, 'Firenze, secondo me。'],
      ['Marco 给了什么建议？', ['多说意大利语，别怕犯错', '多读语法书', '少说话'], 0, 'parla sempre italiano…'],
    ],
    vocab: `
      imparare | 学会；学习 | im-pa-RA-re
      il consiglio | 建议 | il con-SI-glio
      avere paura di | 害怕…… | a-VE-re PAU-ra di
      sbagliare | 犯错 | sba-GLIA-re
      avere ragione | 你说得对 | a-VE-re ra-GIO-ne
      avere torto | 你错了 | a-VE-re TOR-to
      migliorare | 进步；改善 | mi-glio-RA-re
      continuare | 继续 | con-ti-nu-A-re
      il futuro | 将来 | il fu-TU-ro
      finora | 到目前为止 | fi-NO-ra
      ormai | 如今；已经（事已至此） | or-MAI
      mettersi al lavoro | 开始努力 | MET-ter-si al la-VO-ro
      secondo me | 依我看 | se-CON-do ME
      passare | 过去；经过 | pas-SA-re
    `,
    pron: {
      t: '第二阶段发音自查',
      tips: [
        '这一阶段容易读错的词：**sbagliare**（gli）、**migliorare**（gli）、**sveglio / svegliarsi**、**consiglio**（gli）、**ragione**（gi 软音）、**continuare**。',
        '读一遍，同时录下来，听听 **gli、gn、双辅音、重音** 是否都对。再读一遍绕口令：**Sopra la panca la capra campa, sotto la panca la capra crepa.**',
      ],
      drill: `
        sbagliare | 犯错
        migliorare | 进步
        consiglio | 建议
        ragione | 道理
        paura | 害怕
        finora | 到目前为止
        continuare | 继续
      `,
      twister: 'Sopra la panca la capra campa, sotto la panca la capra crepa. | 长凳上山羊活着，长凳下山羊死去。',
    },
    gram: [
      {
        h: '第二阶段毕业清单：你现在能做到什么',
        t: [
          ['能力', '你现在能…'],
          ['语法', '现在时（规则与常用不规则）、反身动词、缩合介词、物主词、直接 / 间接宾语代词、ci / ne、比较级与最高级'],
          ['时态', '近过去时（avere / essere、不规则分词）、简单将来时、命令式（tu / Lei / noi / voi）'],
          ['听', '听懂较自然语速的日常对话（约 A1 完整）'],
          ['说', '讲述昨天和周末、谈计划、下指令、打电话、预约、邀请'],
          ['读', '读懂短文、租房广告、食谱、明信片和短信'],
          ['写', '写日记、短信、邀请、明信片（50–80 词）'],
        ],
      },
      {
        h: '第三阶段预告（第 61–90 天）',
        p: ['你将学到：**未完成过去时**和**过去时的搭配**（讲故事）、关系代词、**条件式**（礼貌）、**虚拟式入门**（表达观点）、si 非人称、组合代词、条件句、求职与办事、阅读新闻通知、正式邮件，以及**真实场景实战**。目标：**A2 水平**。'],
      },
    ],
    culture: '恭喜你完成两个月的学习，已经达到 **CEFR A1** 的整体水平。A1 对应的官方考试有 **CELI Impatto**、**CILS A1** 和 **PLIDA A1**；A2 对应 **CELI 1 / CILS A2 / PLIDA A2**。以后想在意大利留学、工作，这些证书会用得上。**Bravo! Sei sulla buona strada!**（太棒了，你走在正确的路上！）',
    speak: `
      Ho imparato a parlare con le persone. | 说你学会了和人交谈
      Firenze è più piccola di Roma, ma è bellissima. | 用比较级说佛罗伦萨
      Continuerò a studiare e andrò in Sicilia in estate. | 用将来时说你的计划
      Non avere paura di sbagliare! | 用否定命令式鼓励别人
    `,
    wr: [
      '写一篇 7–8 句的短文：这两个月你学了什么、去过哪里（过去时）、喜欢什么（比较级）、将来想做什么（将来时）。',
      "In questi due mesi ho imparato molto.\nHo visitato Roma, Firenze e Napoli.\nFirenze è più piccola di Roma, ma è bellissima.\nHo mangiato la pizza e ho bevuto molti caffè.\nL'anno prossimo andrò in Sicilia.\nContinuerò a studiare italiano ogni giorno.",
      '这两个月我学到了很多。我参观了罗马、佛罗伦萨和那不勒斯。佛罗伦萨比罗马小，但美极了。我吃了披萨，喝了很多咖啡。明年我会去西西里。我会每天继续学习意大利语。',
    ],
    quiz: [
      ['"我学会了说意大利语"（近过去时）：', ['Ho imparato a parlare italiano.', 'Sono imparato a parlare italiano.', 'Imparo a parlare italiano ieri.'], 0, 'imparare 用 avere。'],
      ['"别怕犯错！"（对朋友）：', ['Non avere paura di sbagliare!', 'Non hai paura di sbagliare!', 'Non abbia paura di sbagliare!'], 0, 'tu 的否定命令式 = non + 不定式。'],
      ['"你说得对"：', ['Hai ragione.', 'Sei ragione.', 'Hai giusto.'], 0, 'avere ragione。'],
      ['"我夏天会去西西里"：', ['Andrò in Sicilia in estate.', 'Vado in Sicilia in estate prossima.', 'Andai in Sicilia in estate.'], 0, '将来时 andrò。'],
    ],
  },
]);
