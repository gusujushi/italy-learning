/* 第 9 岛 · 毕业岛 Isola del Diploma（第 81–90 天） */
Course.add([
  // ───────────────────────── 第 81 天 ─────────────────────────
  {
    n: 81, it: 'Affittare casa', zh: '租房实战',
    goal: '会和房东沟通合同、杂费和账单；会清楚地说明家里出了什么问题（漏水、没热水、停电）并请人维修；读懂租房合同里的关键条款。',
    scene: '你已经签了租房合同并搬了进去。一周后，厨房水龙头漏水、卫生间没有热水，你给房东 Rossi 太太打电话说明情况，并问清谁来付账单。',
    dlg: `
      Li Ming: Buongiorno, signora Rossi. Sono Li Ming, ho firmato il contratto la settimana scorsa. | 早上好，罗西女士。我是李明，上周签了合同。
      Padrona: Ah, buongiorno! C'è qualche problema? | 啊，早上好！有什么问题吗？
      Li Ming: Sì, il rubinetto della cucina perde e non c'è acqua calda in bagno. | 是的，厨房的水龙头漏水，卫生间没有热水。
      Padrona: Mi dispiace molto. Chiamo subito l'idraulico: potrebbe venire domani mattina? | 非常抱歉。我马上叫水管工：他明天早上能来吗？
      Li Ming: Sì, sono a casa fino a mezzogiorno. Un'altra cosa: chi paga le bollette? | 可以，我中午前都在家。还有一件事：谁交账单？
      Padrona: Le bollette sono a suo carico, ma le spese condominiali sono incluse. | 账单由您承担，但物业费包含在内。
      Li Ming: Va bene. Può mandarmi una copia del contratto? | 好的。您能把合同副本发给我吗？
      Padrona: Certo, gliela invio oggi stesso. | 当然，我今天就发给您。
    `,
    q: [
      ['家里出了什么问题？', ['厨房水龙头漏水，卫生间没热水', '停电', '门锁坏了'], 0, 'il rubinetto perde… non c\'è acqua calda。'],
      ['谁来付账单？', ['租客（李明）', '房东', '物业'], 0, 'a suo carico。'],
      ['物业费怎么样？', ['包含在内', '租客另付', '免费'], 0, 'le spese condominiali sono incluse。'],
    ],
    vocab: `
      il rubinetto | 水龙头 | il ru-bi-NET-to
      perdere | 漏；丢失 | PER-de-re
      l'idraulico | 水管工 | l'i-DRAU-li-co
      l'elettricista | 电工 | l'e-let-tri-CI-sta
      la bolletta | 账单（水电煤） | la bol-LET-ta
      la luce | 电；光 | la LU-ce
      il gas | 煤气 | il GAS
      il riscaldamento | 暖气 | il ri-scal-da-MEN-to
      la cauzione | 押金 | la cau-ZIO-ne
      a suo carico | 由您承担 | a SU-o CA-ri-co
      l'umidità | 潮湿 | l'u-mi-di-TÀ
      una copia | 一份副本 | U-na CO-pia
      si è rotto | 坏了 | si È ROT-to
      è saltata la luce | 跳闸了；停电了 | È sal-TA-ta la LU-ce
    `,
    gram: [
      {
        h: '家里出问题时怎么说',
        t: [
          ['问题', '说法'],
          ['漏水', 'Il rubinetto perde. / C\'è una perdita d\'acqua.'],
          ['没热水 / 没暖气', "Non c'è acqua calda. / Il riscaldamento non funziona."],
          ['坏了', 'Si è rotto il frigorifero. / La lavatrice è rotta.'],
          ['停电', "È saltata la luce. / Non c'è corrente."],
          ['潮湿', "C'è umidità sul muro."],
          ['请人来修', 'Potrebbe mandare qualcuno a controllare?'],
        ],
      },
      {
        h: '租房合同里的关键词',
        t: [
          ['意大利语', '意思'],
          ['il canone di locazione', '租金（合同用语）'],
          ['la cauzione / il deposito', '押金'],
          ['le spese condominiali', '物业杂费'],
          ['le utenze（luce, gas, acqua）', '水电煤'],
          ['la disdetta', '退租通知'],
          ['il preavviso', '提前通知期'],
          ['a carico del conduttore / del locatore', '由租客 / 房东承担'],
        ],
        p: ['常见住宅租约叫 **"4+4"**（4 年，自动续 4 年）；退租需要按合同约定**提前书面通知（disdetta）**。**一定要拍下入住时家里的状态**，退租时才不会有争议。'],
      },
    ],
    text: {
      title: 'Il contratto di affitto',
      body: `
        Il locatore concede in affitto l'appartamento al conduttore per quattro anni. | 房东把公寓出租给租客，租期四年。
        Il canone mensile è di 750 euro, da pagare entro il 5 di ogni mese. | 月租金为 750 欧元，须在每月 5 日前支付。

        Le spese condominiali sono incluse; le utenze sono a carico del conduttore. | 物业杂费已包含；水电煤由租客承担。
        Per lasciare l'appartamento, il conduttore deve dare un preavviso di sei mesi. | 租客退租需提前六个月通知。
      `,
    },
    rq: [
      ['月租多少？', ['750 欧元', '800 欧元', '650 欧元'], 0, '750 euro。'],
      ['水电煤谁承担？', ['租客', '房东', '物业'], 0, 'le utenze sono a carico del conduttore。'],
      ['退租要提前多久通知？', ['六个月', '一个月', '一周'], 0, 'preavviso di sei mesi。'],
    ],
    culture: '在意大利租房，**中介（agenzia）通常要收一笔佣金**；入住前要**登记合同**（房东负责），你则要在规定时间内向市政厅办理**居住登记（residenza）**。**保存好所有书面沟通**（邮件、聊天记录），出了问题时会很有用。',
    speak: `
      Il rubinetto della cucina perde. | 说水龙头漏水
      Non c'è acqua calda in bagno. | 说没有热水
      Potrebbe venire l'idraulico domani mattina? | 请水管工明早来
      Chi paga le bollette? | 问谁付账单
    `,
    wr: [
      '写一封 6–7 句的邮件给房东：说明家里的问题（至少两个）、请求维修、问一个关于合同或账单的问题，语气要礼貌。',
      "Gentile signora Rossi,\nLe scrivo perché il rubinetto della cucina perde e non c'è acqua calda.\nPotrebbe mandare un idraulico questa settimana?\nVorrei anche sapere chi paga le bollette.\nLa ringrazio per l'attenzione.\nCordiali saluti,\nLi Ming",
      '尊敬的罗西女士：我写信是因为厨房水龙头漏水，而且没有热水。您能在本周派一位水管工来吗？我还想知道谁付账单。感谢您的关注。此致敬礼，李明',
    ],
    quiz: [
      ['"水龙头漏水"：', ['Il rubinetto perde.', 'Il rubinetto è perso.', 'Il rubinetto perdere.'], 0, 'perdere = 漏。'],
      ['"账单由租客承担"：', ['Le bollette sono a carico del conduttore.', 'Le bollette sono caricato conduttore.', 'Conduttore carica bollette.'], 0, 'a carico di。'],
      ['"房东"在合同里叫：', ['il locatore', 'il conduttore', 'il condominio'], 0, 'locatore = 出租人。'],
      ['"停电了"：', ['È saltata la luce.', 'È saltato la luce.', 'Salta la luce è.'], 0, 'saltare + la luce（阴性）。'],
    ],
  },

  // ───────────────────────── 第 82 天 ─────────────────────────
  {
    n: 82, it: 'Una cena tra amici', zh: '朋友聚餐',
    goal: '听懂并学会用常见的口头语和话语标记词（boh, magari, dai, figurati, mamma mia, insomma, cioè, praticamente…）；认识几句有趣的习语；了解意大利式手势与幽默。',
    scene: '周六晚上，朱莉娅在家请客。席间大家聊面试、夸饭菜、开玩笑——这一晚你听到的，才是真正的"活的意大利语"。',
    dlg: `
      Chiara: Allora, com'è andata con il colloquio? | 那么，面试怎么样？
      Li Ming: Boh, non so. Praticamente è andato bene, ma non mi hanno detto niente. | 嗯，不知道。基本上还不错，但他们什么都没说。
      Marco: Dai, vedrai che ti chiamano! In bocca al lupo! | 加油，你会看到他们给你打电话的！祝你好运！
      Li Ming: Crepi! Magari! | 去他的狼！但愿如此！
      Giulia: Senti, qualcuno vuole ancora un po' di vino? | 喂，有人还想再来点酒吗？
      Marco: Io sì, grazie. Mamma mia, che buona questa lasagna! | 我要，谢谢。天哪，这千层面太好吃了！
      Giulia: Figurati! L'ho fatta tipo tre ore fa. | 别客气！我大概三小时前做的。
      Chiara: Insomma, siamo tutti d'accordo: Giulia è la regina della cucina! | 总之，我们一致认为：朱莉娅是厨房女王！
    `,
    q: [
      ['李明觉得面试怎么样？', ['不确定，基本还行', '很糟', '完美'], 0, 'Boh, non so… è andato bene。'],
      ['Marco 对千层面的评价？', ['太好吃了', '太咸', '一般'], 0, 'che buona questa lasagna!'],
      ['大家一致认为什么？', ['朱莉娅是厨房女王', '该换餐厅', '该早点结束'], 0, 'la regina della cucina。'],
    ],
    vocab: `
      boh | 不知道（耸肩） | BOH
      mah | 嗯……（怀疑） | MAH
      magari | 但愿如此；也许 | ma-GA-ri
      dai | 来吧；得了吧 | DAI
      figurati | 别客气；怎么会 | fi-GU-ra-ti
      mamma mia | 天哪；我的天 | MAM-ma MI-a
      insomma | 总之；还凑合 | in-SOM-ma
      cioè | 就是说 | cio-È
      praticamente | 基本上；实际上 | pra-ti-ca-MEN-te
      tipo | 大概；比如 | TI-po
      senti | 喂；你听 | SEN-ti
      ecco | 喏；就是这样 | EC-co
      altroché | 当然！可不是嘛 | al-tro-CHÉ
      macché | 才不是呢 | mac-CHÉ
    `,
    pron: {
      t: '口头语的语调',
      tips: [
        '**Boh / Mah / Magari / Dai** 的意思全靠**语调**：**Dai!** 上扬 = 来吧！加油；下降拖长 = 得了吧、别闹了。**Magari!** 句末下降、带向往 = 但愿如此。',
        '**altroché、macché、perché** 末尾的 -ché 重音在最后，读得短促有力：al-tro-CHÉ。',
      ],
      drill: `
        boh | 不知道
        magari | 但愿如此
        dai | 来吧
        figurati | 别客气
        mamma mia | 天哪
        altroché | 当然
        macché | 才不是
      `,
    },
    gram: [
      {
        h: '口头语与话语标记词',
        t: [
          ['词', '意思与用法', '例句'],
          ['boh', '不知道、没主意（常伴耸肩）', 'Che ora è? — Boh!'],
          ['magari', '① 但愿如此 ② 也许', 'Vieni? — Magari! / Magari domani.'],
          ['dai', '鼓励 / 催促 / 劝阻', 'Dai, andiamo! / Dai, non scherzare!'],
          ['figurati / ci mancherebbe', '别客气 / 哪里的话', 'Grazie! — Figurati!'],
          ['mamma mia', '惊叹、抱怨、感慨', 'Mamma mia, che caldo!'],
          ['insomma', '总之 / "还凑合"', 'Come stai? — Insomma.'],
          ['cioè', '也就是说（自我解释）', 'Cioè, volevo dire…'],
          ['praticamente / tipo', '基本上 / 大概（口语）', 'È tipo tre ore fa.'],
          ['senti / guarda', '喂 / 你看（引起注意）', 'Senti, hai un minuto?'],
          ['altroché / macché', '当然！/ 才不是呢！', 'Ti piace? — Altroché!'],
        ],
      },
      {
        h: '几个有趣的习语',
        t: [
          ['习语', '字面', '意思'],
          ['In bocca al lupo! — Crepi!', '进狼的嘴里 — 让狼死', '祝你好运！'],
          ['Piove sul bagnato.', '雨下在湿的地方', '祸不单行 / 福无双至'],
          ['Avere le mani in pasta.', '手在面团里', '参与其中、有人脉'],
          ['Non vedo l\'ora!', '我看不到那一刻', '我迫不及待！'],
          ['Chi va piano va sano e lontano.', '慢走的人安全走得远', '慢工出细活'],
        ],
      },
    ],
    culture: '意大利人**说话时离不开手势**：**"mano a borsa"**（手指聚拢上下晃动）意思是"你到底想说什么？/ 这是什么意思？"；**手背在下巴下向外拨**表示"我才不在乎"。**多看、多模仿**，手势和语调一样是意大利语的一部分。饭桌上的**玩笑、夸张和争论**不必当真，一笑而过。',
    speak: `
      Boh, non so. | 说：嗯，不知道
      Dai, vedrai che ti chiamano! | 鼓励对方：你会看到他们给你打电话的
      Mamma mia, che buona questa lasagna! | 夸饭菜
      Figurati! | 回应谢谢：别客气
    `,
    wr: [
      '写一段 6–7 句的聚餐对话（两人），要自然地用到至少 4 个口头语（boh, magari, dai, figurati, mamma mia, insomma, cioè…）。',
      "A: Allora, ti è piaciuta la cena?\nB: Mamma mia, era buonissima! Grazie mille!\nA: Figurati! Vuoi ancora un po' di vino?\nB: Magari! Ma devo guidare.\nA: Dai, solo un bicchiere!\nB: Insomma, va bene, ma solo uno!",
      '甲：那么，晚饭你喜欢吗？乙：天哪，太好吃了！非常感谢！甲：别客气！你还想再来点酒吗？乙：真想！但我得开车。甲：来嘛，就一杯！乙：好吧，行，但只喝一杯！',
    ],
    quiz: [
      ['被问 "Che ora è?" 但你不知道，可以耸肩说：', ['Boh!', 'Dai!', 'Ecco!'], 0, 'boh = 不知道。'],
      ['"Vieni alla festa?" 你很想去，回答：', ['Magari!', 'Macché!', 'Boh.'], 0, 'magari = 但愿如此（很想）。'],
      ['别人说 Grazie，你随意地回答：', ['Figurati!', 'Che peccato!', 'Insomma.'], 0, 'figurati = 别客气。'],
      ['In bocca al lupo! 的正确回答：', ['Crepi!', 'Grazie!', 'Mamma mia!'], 0, '固定回答 Crepi。'],
    ],
  },

  // ───────────────────────── 第 83 天 ─────────────────────────
  {
    n: 83, it: 'Prenotare e reclamare', zh: '预订与投诉',
    goal: '会在线预订和确认；遇到问题时会礼貌而清晰地投诉：陈述事实、表达不满、提出解决方案（退款 / 打折 / 换房）；会读写简短的书面投诉。',
    scene: '你在网上订了一间带阳台的房间，到店后发现房间没准备好，而且没有阳台。你向前台提出投诉。',
    dlg: `
      Li Ming: Buongiorno, ho prenotato una camera online, ma al mio arrivo la camera non era pronta. | 早上好，我在线订了一间房，但我到的时候房间还没准备好。
      Receptionist: Mi dispiace molto, signor Li. Può aspettare mezz'ora? | 非常抱歉，李先生。您能等半小时吗？
      Li Ming: Ho aspettato già un'ora. Inoltre la camera è diversa da quella nelle foto: non c'è il balcone. | 我已经等了一小时。而且房间和照片上的不一样：没有阳台。
      Receptionist: Capisco. Possiamo offrirle uno sconto o un'altra camera con balcone. | 我明白。我们可以给您打折，或换一间有阳台的房间。
      Li Ming: Preferirei un rimborso parziale e la colazione gratis. | 我更想要部分退款和免费早餐。
      Receptionist: Parlo con il direttore e le faccio sapere subito. | 我和经理谈谈，马上通知您。
      Li Ming: Grazie. Può confermarmi tutto per iscritto? | 谢谢。您能把一切以书面形式确认给我吗？
    `,
    q: [
      ['李明投诉什么？', ['房间没准备好，且没有阳台', '价格太贵', '服务态度差'], 0, 'non era pronta… non c\'è il balcone。'],
      ['酒店提出什么方案？', ['打折或换房', '退全款', '赔偿现金'], 0, 'uno sconto o un\'altra camera。'],
      ['李明要求什么？', ['部分退款和免费早餐', '全额退款', '换酒店'], 0, 'rimborso parziale e la colazione gratis。'],
    ],
    vocab: `
      il reclamo | 投诉 | il re-CLA-mo
      fare un reclamo | 提出投诉 | FA-re un re-CLA-mo
      il rimborso | 退款 | il rim-BOR-so
      parziale | 部分的 | par-ZIA-le
      soddisfatto | 满意的 | sod-di-SFAT-to
      il risarcimento | 赔偿 | il ri-sar-ci-MEN-to
      difettoso | 有缺陷的 | di-fet-TO-so
      annullare | 取消；撤销 | an-nul-LA-re
      la conferma | 确认 | la con-FER-ma
      per iscritto | 以书面形式 | per i-SCRIT-to
      la garanzia | 保修；保证 | la ga-ran-ZI-a
      il servizio clienti | 客服 | il ser-VI-zio clien-TI
      inoltre | 此外 | i-NOL-tre
      pronto | 准备好的 | PRON-to
    `,
    gram: [
      {
        h: '礼貌而有力的投诉：四步',
        t: [
          ['步骤', '做什么', '常用说法'],
          ['① 说明情况', '陈述事实（时间、地点、订单）', 'Ho prenotato… Sono arrivato… La camera non era pronta.'],
          ['② 表达不满', '说出问题，保持克制', 'Non sono soddisfatto di… / Inoltre… / È diversa da quella nelle foto.'],
          ['③ 提出要求', '明确你想要什么', 'Vorrei un rimborso. / Preferirei… / Potrebbe cambiarmi la camera?'],
          ['④ 要求确认', '请对方给出书面回复', 'Può confermarmi per iscritto? / Resto in attesa di una risposta.'],
        ],
        p: ['**投诉时保持礼貌**（Mi dispiace disturbarLa, ma… / Vorrei segnalare un problema），但**要求要具体**：说清你要的是**退款、打折、更换还是道歉**。'],
      },
      {
        h: '预订与确认的句型',
        eg: [
          'Vorrei prenotare una camera doppia per due notti. | 我想订一间双人房，住两晚。',
          'Può confermare la prenotazione per e-mail? | 您能用邮件确认预订吗？',
          'Vorrei annullare la prenotazione. | 我想取消预订。',
          'Il prezzo include la colazione? | 价格包含早餐吗？',
        ],
      },
    ],
    text: {
      title: 'Una lettera di reclamo',
      body: `
        Gentile Direttore, | 尊敬的经理：
        Le scrivo per segnalare un problema durante il mio soggiorno dal 10 al 12 maggio. | 我写信是想反映 5 月 10 日至 12 日住宿期间的一个问题。

        All'arrivo la camera non era pronta e ho aspettato più di un'ora. | 到店时房间还没准备好，我等了一个多小时。
        Inoltre la camera non aveva il balcone, come invece indicato nella prenotazione. | 此外，房间没有预订页面上所说的阳台。

        Vorrei chiedere un rimborso parziale. | 我想申请部分退款。
        Resto in attesa di una Sua risposta. | 期待您的回复。
        Cordiali saluti, Li Ming | 此致敬礼，李明
      `,
    },
    rq: [
      ['他住了几天？', ['从 5 月 10 日到 12 日', '一周', '一个月'], 0, 'dal 10 al 12 maggio。'],
      ['他要求什么？', ['部分退款', '全额退款', '道歉'], 0, 'un rimborso parziale。'],
    ],
    culture: '在意大利，**书面投诉（reclamo scritto）**比口头更有效：用邮件或挂号信（raccomandata）发送，并**保留订单、照片、聊天记录等证据**。**消费者协会**（如 Altroconsumo）和**欧盟消费者中心（ECC-Net）**能帮助处理跨国纠纷。',
    speak: `
      Vorrei fare un reclamo. | 说你想投诉
      La camera è diversa da quella nelle foto. | 说房间和照片不一样
      Preferirei un rimborso parziale. | 说你更想要部分退款
      Può confermarmi tutto per iscritto? | 请对方书面确认
    `,
    wr: [
      '写一封 6–7 句的投诉信：说明订单、问题、你的要求，并要求书面回复。',
      "Gentile Direttore,\nLe scrivo per segnalare un problema con la mia prenotazione del 5 giugno.\nLa camera non era pronta e non aveva il balcone.\nVorrei chiedere un rimborso parziale.\nPotrebbe confermarmi per iscritto?\nResto in attesa di una Sua risposta.\nCordiali saluti, Li Ming",
      '尊敬的经理：我写信是想反映我 6 月 5 日预订的一个问题。房间没准备好，也没有阳台。我想申请部分退款。您能书面确认吗？期待您的回复。此致敬礼，李明',
    ],
    quiz: [
      ['"我想投诉"：', ['Vorrei fare un reclamo.', 'Voglio reclamare te.', 'Vorrei un reclamare.'], 0, 'fare un reclamo。'],
      ['"以书面形式确认"：', ['confermare per iscritto', 'confermare in scritto', 'confermare con scrivere'], 0, 'per iscritto。'],
      ['"我不满意"：', ['Non sono soddisfatto.', 'Non sono soddisfare.', 'Non soddisfatto sono io.'], 0, 'soddisfatto。'],
      ['rimborso 的意思：', ['退款', '折扣', '保修'], 0, 'rimborso = 退款。'],
    ],
  },

  // ───────────────────────── 第 84 天 ─────────────────────────
  {
    n: 84, it: 'Imprevisti', zh: '突发状况',
    goal: '会应对旅途中的突发状况：钱包 / 证件被偷或丢失、行李丢失；会到警察局报案、冻结银行卡、联系使领馆；会清楚说明时间、地点和物品。',
    scene: '早上在公交车上，你的钱包被偷了，里面有现金、信用卡和居留许可。你冷静地去警察局报案。',
    dlg: `
      Li Ming: Buongiorno, vorrei fare una denuncia. Mi hanno rubato il portafoglio. | 早上好，我想报案。我的钱包被偷了。
      Agente: Quando e dove è successo? | 什么时候、在哪里发生的？
      Li Ming: Stamattina, sull'autobus numero 64. C'era molta gente. | 今天早上，在 64 路公交车上。人很多。
      Agente: Che cosa c'era nel portafoglio? | 钱包里有什么？
      Li Ming: Cento euro, la carta di credito e il permesso di soggiorno. | 一百欧元、信用卡和居留许可。
      Agente: Ha già bloccato la carta? | 您已经冻结银行卡了吗？
      Li Ming: Sì, ho chiamato subito la banca. | 是的，我马上打电话给银行了。
      Agente: Bene. Compili questo modulo: poi Le darò una copia della denuncia. | 好的。请填写这份表格：然后我会给您一份报案副本。
    `,
    q: [
      ['李明丢了什么？', ['钱包', '手机', '护照'], 0, 'Mi hanno rubato il portafoglio。'],
      ['事情发生在哪里？', ['64 路公交车上', '地铁里', '商店里'], 0, "sull'autobus numero 64。"],
      ['他已经做了什么？', ['冻结了银行卡', '补办了居留许可', '找到了小偷'], 0, 'ho chiamato subito la banca。'],
    ],
    vocab: `
      la denuncia | 报案 | la de-NUN-cia
      fare una denuncia | 报案 | FA-re U-na de-NUN-cia
      rubare | 偷 | ru-BA-re
      il portafoglio | 钱包 | il por-ta-FO-glio
      il furto | 盗窃 | il FUR-to
      smarrire | 遗失 | smar-RI-re
      lo smarrimento | 遗失 | lo smar-ri-MEN-to
      bloccare la carta | 冻结银行卡 | blo-CCA-re la CAR-ta
      l'ufficio oggetti smarriti | 失物招领处 | l'uf-FI-cio og-GET-ti smar-RI-ti
      il consolato | 领事馆 | il con-so-LA-to
      l'ambasciata | 大使馆 | l'am-ba-SCIA-ta
      la copia | 副本 | la CO-pia
      mi hanno rubato | 我被偷了 | mi AN-no ru-BA-to
      ho perso | 我弄丢了 | o PER-so
    `,
    gram: [
      {
        h: '丢东西与被偷的说法',
        t: [
          ['情况', '说法', '说明'],
          ['弄丢', 'Ho perso il passaporto. / Ho smarrito la valigia.', '主语是你，自己弄丢'],
          ['忘在某处', 'Ho dimenticato la borsa sul treno.', 'dimenticare + 地点'],
          ['被偷', 'Mi hanno rubato il portafoglio.', '"他们偷了我的钱包"：第三人称复数，主语不明'],
          ['被抢', 'Mi hanno scippato la borsa. / Sono stato derubato.', 'scippare = 飞车抢夺'],
        ],
      },
      {
        h: '遇到证件丢失时的步骤',
        t: [
          ['步骤', '做什么'],
          ['1', '立刻冻结银行卡（打银行紧急电话）'],
          ['2', '到警察局（polizia / carabinieri）报案（fare la denuncia），拿报案副本'],
          ['3', '丢护照：联系本国使领馆办理旅行证件 / 补办'],
          ['4', '丢居留许可：向警察局（questura）报案并按规定补办'],
          ['5', '保险：保留所有凭证，向保险公司申请赔付'],
        ],
        p: ['说明事情时要**交代清楚时间、地点、物品**：用 **imperfetto** 描述当时的情况（C\'era molta gente.），用 **passato prossimo** 讲事件（Mi hanno rubato il portafoglio.）。'],
      },
    ],
    text: {
      title: 'Come fare una denuncia',
      body: `
        Se ti rubano qualcosa in Italia, vai subito alla polizia o ai carabinieri. | 如果你在意大利被偷了东西，马上去警察局或宪兵队。
        Racconta quando e dove è successo e descrivi gli oggetti rubati. | 讲述事情发生的时间和地点，并描述被偷的物品。

        L'agente compila un verbale e ti dà una copia della denuncia. | 警官会做一份笔录，并给你一份报案副本。
        Con la copia puoi chiedere un nuovo documento o fare la richiesta all'assicurazione. | 凭这份副本，你可以申请新证件或向保险公司索赔。
      `,
    },
    rq: [
      ['被偷后应该先去哪里？', ['警察局或宪兵队', '银行', '酒店'], 0, 'alla polizia o ai carabinieri。'],
      ['报案副本有什么用？', ['申请新证件或向保险索赔', '打折', '免费乘车'], 0, 'nuovo documento… assicurazione。'],
    ],
    culture: '意大利的**警察**有两支：**Polizia di Stato**（国家警察）和 **Carabinieri**（宪兵，带军事性质），两者都可以报案。**拥挤的地方（公交、地铁、景点）要特别留意扒窃**：背包放在身前，手机和钱包别放后兜。**紧急电话 112 全国通用**。',
    speak: `
      Vorrei fare una denuncia. | 说你想报案
      Mi hanno rubato il portafoglio. | 说钱包被偷了
      Stamattina, sull'autobus numero 64. | 说明时间和地点
      Ho già bloccato la carta. | 说你已冻结银行卡
    `,
    wr: [
      '写 5–6 句话的报案陈述：什么时候、在哪里、什么东西不见了、里面有什么、你已经做了什么。',
      "Stamattina alle nove ero in metropolitana.\nC'era molta gente e qualcuno mi ha rubato il portafoglio.\nNel portafoglio c'erano cento euro e la carta di credito.\nHo già bloccato la carta.\nVorrei fare una denuncia.",
      '今天早上九点我在地铁里。人很多，有人偷了我的钱包。钱包里有一百欧元和信用卡。我已经冻结了银行卡。我想报案。',
    ],
    quiz: [
      ['"我的钱包被偷了"：', ['Mi hanno rubato il portafoglio.', 'Ho rubato il portafoglio.', 'Il portafoglio ha rubato.'], 0, '主语不明用第三人称复数。'],
      ['"我把包忘在火车上了"：', ['Ho dimenticato la borsa sul treno.', 'Ho rubato la borsa sul treno.', 'Dimentico la borsa treno.'], 0, 'dimenticare。'],
      ['丢护照后，应该联系：', ['本国使领馆', '药店', '邮局'], 0, 'consolato / ambasciata。'],
      ['"当时人很多"（背景描述）：', ["C'era molta gente.", "C'è stata molta gente.", "Ci sarà molta gente."], 0, '背景描述用 imperfetto。'],
    ],
  },

  // ───────────────────────── 第 85 天 ─────────────────────────
  {
    n: 85, it: "C'era una volta… Pinocchio", zh: '经典阅读：《木偶奇遇记》',
    goal: '读懂意大利经典《木偶奇遇记》（Collodi, 1883）的开篇；学会读"老一点"的文字：猜词、借助上下文、认识少数文学化的形式；体会意大利式的幽默与叙事口吻。',
    scene: 'Chiara 听说你想读点真正的意大利文学，就带你读《木偶奇遇记》。她说：这本书的开头，几乎每个意大利人都能背出来。',
    dlg: `
      Chiara: Hai mai letto "Pinocchio" di Collodi? | 你读过科洛迪的《木偶奇遇记》吗？
      Li Ming: Ho visto il film, ma non ho mai letto il libro. | 我看过电影，但没读过书。
      Chiara: L'inizio è famosissimo: "C'era una volta... — Un re!" | 开头非常有名：“从前有……——一位国王！”
      Li Ming: Ma poi il narratore dice che no, non era un re. | 但是后来叙述者说，不，不是国王。
      Chiara: Esatto! Era un semplice pezzo di legno. Collodi scherza con i lettori. | 没错！那只是一块普通的木头。科洛迪在和读者开玩笑。
      Li Ming: Che bello! Allora leggiamo insieme il primo capitolo? | 真有趣！那我们一起读第一章好吗？
      Chiara: Volentieri! Ti aiuto con le parole difficili. | 乐意！我来帮你读难词。
    `,
    q: [
      ['这本书的作者是谁？', ['科洛迪', '但丁', '卡尔维诺'], 0, 'Pinocchio di Collodi。'],
      ['开头"一位国王"这个猜测对吗？', ['不对，是一块木头', '对', '是一位王子'], 0, 'non era un re… un pezzo di legno。'],
      ['Chiara 说 Collodi 在做什么？', ['和读者开玩笑', '批评读者', '讲述历史'], 0, 'scherza con i lettori。'],
    ],
    vocab: `
      il pezzo di legno | 一块木头 | il PEZ-zo di LE-gno
      il lettore | 读者 | il let-TO-re
      sbagliare | 弄错；犯错 | sba-GLIA-re
      di lusso | 奢华的；高档的 | di LUS-so
      semplice | 普通的；简单的 | SEM-pli-ce
      la catasta | 柴堆 | la ca-TA-sta
      la stufa | 炉子 | la STU-fa
      il caminetto | 壁炉 | il ca-mi-NET-to
      accendere | 点燃 | ac-CEN-de-re
      il fuoco | 火 | il FUO-co
      riscaldare | 加热；取暖 | ri-scal-DA-re
      la stanza | 房间 | la STAN-za
      scherzare | 开玩笑 | sker-ZA-re
      il capitolo | 章节 | il ca-PI-to-lo
    `,
    gram: [
      {
        h: '读"老一点"的文字：三个小技巧',
        t: [
          ['技巧', '怎么做', '这段里的例子'],
          ['抓结构', '先找主句：谁？做了什么？', 'C\'era una volta un pezzo di legno.'],
          ['认识少数文学形式', '将来时可表示"推测"；si + 复数动词是被动', '"diranno subito"（他们马上会说）；"si mettono nelle stufe"（被放进炉子里）'],
          ['猜词', '看词根、搭配和上下文', 'catasta、stufa、caminetto 都在"取暖"的语境里'],
        ],
      },
      {
        h: '文中几个值得注意的形式',
        t: [
          ['原文', '说明'],
          ['diranno（dire 的将来时）', '"他们会说"：用将来时表示"读者会这样猜"。'],
          ['di quelli che…', '"那种……的"：quelli = 那类木头。'],
          ['si mettono', 'si 被动：被放进……（复数，因为 legni 复数）。'],
          ['per accendere… e per riscaldare…', 'per + 不定式 = 为了……（目的）。'],
        ],
        p: ['科洛迪用**读者会猜错**的口吻开场——故事一开始就让读者参与进来，这是意大利式叙事的魅力。'],
      },
    ],
    text: {
      title: 'Le avventure di Pinocchio — Capitolo I',
      body: `
        C'era una volta... | 从前有……
        — Un re! — diranno subito i miei piccoli lettori. | ——一位国王！——我的小读者们马上会说。
        No, ragazzi, avete sbagliato. C'era una volta un pezzo di legno. | 不，孩子们，你们错了。从前有一块木头。

        Non era un legno di lusso, ma un semplice pezzo da catasta, | 它不是什么高档木头，只是一块普通的柴火，
        di quelli che d'inverno si mettono nelle stufe e nei caminetti | 就是冬天放进炉子和壁炉里的那种，
        per accendere il fuoco e per riscaldare le stanze. | 用来生火、给房间取暖。
      `,
    },
    rq: [
      ['小读者们猜"从前有……"后面是什么？', ['一位国王', '一块木头', '一个木偶'], 0, '— Un re!'],
      ['其实"从前有"的是什么？', ['一块普通的木头', '一位国王', '一个孩子'], 0, 'un pezzo di legno。'],
      ['这块木头平常用来做什么？', ['生火、取暖', '做家具', '做木偶'], 0, 'accendere il fuoco e riscaldare le stanze。'],
    ],
    culture: '《木偶奇遇记》（**Le avventure di Pinocchio**, 1881–1883）是意大利最有名的儿童文学，也是**世界上被翻译次数最多的书之一**。作者 **Carlo Collodi**（本名 Carlo Lorenzini，1826–1890）来自佛罗伦萨，作品已进入**公有领域**。**说谎会让鼻子变长**的情节人人皆知，但**原著比电影更幽默、也更黑暗**。',
    speak: `
      C'era una volta un pezzo di legno. | 朗读第一句
      Non era un legno di lusso, ma un semplice pezzo da catasta. | 朗读第二句
      Collodi scherza con i lettori. | 说科洛迪在和读者开玩笑
      Vorrei leggere tutto il libro! | 说你想读完整本书
    `,
    wr: [
      '模仿科洛迪的口吻，写一个 3–4 句的"C\'era una volta…"开头：先让读者猜一个（错误的）答案，再揭晓真正的主人公。',
      "C'era una volta...\n— Una principessa! — diranno subito i miei piccoli lettori.\nNo, ragazzi, avete sbagliato.\nC'era una volta una piccola tartaruga.",
      '从前有……“一位公主！”我的小读者们马上会说。不，孩子们，你们错了。从前有一只小乌龟。',
    ],
    quiz: [
      ['"C\'era una volta" 的时态是：', ['imperfetto', 'passato prossimo', '将来时'], 0, 'c\'era = c\'è 的 imperfetto。'],
      ['"diranno" 是 dire 的：', ['将来时（他们将说）', '过去时', '命令式'], 0, 'diranno = 将来时第三人称复数。'],
      ['"si mettono nelle stufe" 里的 si 是：', ['被动用法：被放进炉子', '反身：放自己', '疑问'], 0, 'si passivante。'],
      ['《木偶奇遇记》的作者：', ['Carlo Collodi', 'Dante Alighieri', 'Italo Calvino'], 0, 'Collodi。'],
    ],
  },

  // ───────────────────────── 第 86 天 ─────────────────────────
  {
    n: 86, it: 'Scrivere bene', zh: '写作工坊',
    goal: '学会写一篇有结构的短文（引入—展开—结论）：会用连接词组织段落；认识中文母语者最常见的意大利语书写错误（冠词、介词、性数一致、重音符号、双辅音）并会自查自改。',
    scene: '意大利语老师批改了你的第一篇作文，指出了几类反复出现的错误，并教你一套"自己检查"的办法。',
    dlg: `
      Insegnante: Ho letto il tuo tema. Hai scritto bene, ma ci sono alcuni errori ricorrenti. | 我读了你的作文。你写得不错，但有一些反复出现的错误。
      Li Ming: Quali sono? | 是哪些？
      Insegnante: Spesso dimentichi l'articolo: "Ho amico italiano" invece di "Ho un amico italiano". | 你常常忘记冠词：“Ho amico italiano”，应为“Ho un amico italiano”。
      Li Ming: Ah, è vero! Si usa sempre l'articolo? | 啊，是的！总是要用冠词吗？
      Insegnante: Quasi sempre. Poi controlla gli accenti: "e" senza accento significa "and", "è" con l'accento è il verbo essere. | 差不多总要。然后检查重音符号：无重音的 e 是“和”，带重音的 è 是动词 essere。
      Li Ming: E se non sono sicuro di una parola? | 如果我对某个词不确定呢？
      Insegnante: Controllala sul dizionario e rileggi il testo ad alta voce. | 在词典里查一下，并把文章大声再读一遍。
    `,
    q: [
      ['老师指出李明常犯什么错误？', ['忘记冠词', '词序', '数字'], 0, 'dimentichi l\'articolo。'],
      ['无重音的 e 是什么意思？', ['和', '是', '在'], 0, 'e senza accento = and。'],
      ['不确定时老师建议怎么做？', ['查词典并大声重读', '直接删掉', '问同学'], 0, 'Controllala sul dizionario e rileggi ad alta voce。'],
    ],
    vocab: `
      il tema | 作文；主题 | il TE-ma
      l'errore | 错误 | l'er-RO-re
      ricorrente | 反复出现的 | ric-cor-REN-te
      l'articolo | 冠词；文章 | l'ar-TI-co-lo
      l'accento | 重音符号 | l'ac-CEN-to
      controllare | 检查 | con-trol-LA-re
      rileggere | 重读 | ri-LEG-ge-re
      ad alta voce | 大声地 | ad AL-ta VO-ce
      il dizionario | 词典 | il diz-io-NA-rio
      la correzione | 修改；批改 | la cor-rez-ZIO-ne
      in primo luogo | 首先 | in PRI-mo LUO-go
      in secondo luogo | 其次 | in se-CON-do LUO-go
      prima di tutto | 首先 | PRI-ma di TUT-to
      in conclusione | 总之 | in con-clu-SIO-ne
    `,
    gram: [
      {
        h: '一篇短文的结构',
        t: [
          ['部分', '做什么', '常用连接语'],
          ['引入', '交代话题，引出观点', 'Studio l\'italiano da… / Vorrei parlare di…'],
          ['展开', '2–3 个理由，每个配一个例子', 'Prima di tutto… In secondo luogo… Inoltre… Ad esempio…'],
          ['转折（可选）', '承认另一面', "D'altra parte… Tuttavia…"],
          ['结论', '总结观点，给出展望', 'In conclusione… Per questo motivo…'],
        ],
      },
      {
        h: '中文母语者最常见的 8 个书写错误',
        t: [
          ['错误', '正确', '规则'],
          ['Ho amico italiano.', 'Ho un amico italiano.', '名词前几乎总要冠词（不定 / 定冠词）'],
          ['Vado a Italia.', 'Vado in Italia.', '国家用 in，城市用 a'],
          ['Io sono studente. Io abito…', 'Sono studente. Abito…', '主语代词通常省略'],
          ['una bella ragazzo', 'un bel ragazzo', '形容词与名词性数一致'],
          ['e / è, perche / perché', 'è（是）、e（和）、perché', '重音符号：末音节重读必须标出'],
          ['casa / cassa、pala / palla', '双写辅音不能漏', '双辅音改变词义'],
          ["l'amici / un'amico", "gli amici / un amico", '省音与冠词性数要对应'],
          ['molto buono ragazzo', 'un ragazzo molto buono', '形容词放名词后，molto 修饰形容词'],
        ],
      },
      {
        h: '写完之后：自查清单',
        p: ['① 每个名词前有没有冠词？② 性数一致吗？③ 动词变位对不对（人称、时态）？④ 重音符号有没有漏（è, perché, più, già…）？⑤ 双辅音有没有漏？⑥ 介词用对了吗（a / in / di / da）？⑦ **大声读一遍**，不顺口的地方多半有错。'],
      },
    ],
    text: {
      title: "Perché studio l'italiano",
      body: `
        Studio l'italiano da tre mesi e mi piace moltissimo. | 我学意大利语三个月了，非常喜欢。
        Ho cominciato per due motivi. | 我开始学有两个原因。
        Prima di tutto, amo la cultura italiana: la musica, l'arte e la cucina. | 首先，我热爱意大利文化：音乐、艺术和美食。
        In secondo luogo, vorrei lavorare in Italia in futuro. | 其次，我将来想在意大利工作。

        All'inizio la pronuncia era difficile, ma adesso riesco a leggere ad alta voce senza problemi. | 一开始发音很难，但现在我能毫无困难地大声朗读。
        Ogni giorno studio un'ora e parlo con gli amici italiani. | 我每天学习一小时，并和意大利朋友交谈。
        In conclusione, studiare l'italiano mi ha aperto una nuova finestra sul mondo. | 总之，学意大利语为我打开了一扇看世界的新窗。
      `,
    },
    rq: [
      ['作者为什么学意大利语？', ['热爱意大利文化、将来想在意大利工作', '为了考试', '为了旅游'], 0, 'amo la cultura italiana… vorrei lavorare in Italia。'],
      ['他每天学多久？', ['一小时', '两小时', '半小时'], 0, 'studio un\'ora。'],
    ],
    culture: '意大利的学校**很重视写作（il tema）和口头表达（l\'interrogazione）**。想把意大利语写得地道，除了语法，更要多**阅读**：读短篇新闻、简单的小说、杂志里的短文章，积累**固定搭配**（fare una passeggiata, prendere una decisione…）。写完后让母语者帮你读一遍，**最有效的进步来自被指出来的错误**。',
    speak: `
      Prima di tutto, amo la cultura italiana. | 用 prima di tutto 开头
      In secondo luogo, vorrei lavorare in Italia. | 用 in secondo luogo 接续
      Controllo sempre gli accenti e le doppie. | 说你总是检查重音和双辅音
      In conclusione, studiare l'italiano è bellissimo. | 用 in conclusione 收尾
    `,
    wr: [
      '写一篇 8–10 句（100–120 词）的短文《Perché studio l\'italiano》，要有引入、两个理由、一个例子、结论，并用至少 4 个连接语。写完按自查清单检查一遍。',
      "Studio l'italiano da tre mesi.\nPrima di tutto, mi piace molto la cultura italiana.\nIn secondo luogo, vorrei lavorare in Italia.\nAd esempio, ho letto un libro di Collodi.\nAll'inizio la grammatica era difficile, ma adesso capisco meglio.\nInoltre, parlo ogni giorno con un'amica italiana.\nIn conclusione, studiare l'italiano è una bellissima esperienza.",
      '我学意大利语三个月了。首先，我非常喜欢意大利文化。其次，我想在意大利工作。例如，我读了一本科洛迪的书。一开始语法很难，但现在我理解得更好了。此外，我每天和一位意大利朋友交谈。总之，学意大利语是一次美好的经历。',
    ],
    quiz: [
      ['"我去意大利"：', ['Vado in Italia.', 'Vado a Italia.', 'Vado da Italia.'], 0, '国家用 in。'],
      ['"我有一个意大利朋友"：', ['Ho un amico italiano.', 'Ho amico italiano.', 'Ho un amico italiani.'], 0, '要冠词，性数一致。'],
      ['"é" 与 "e" 的区别：', ['è（是）/ e（和）', 'è（和）/ e（是）', '没有区别'], 0, 'è = essere，e = and。'],
      ['一篇作文的结论常用：', ['In conclusione', 'Prima di tutto', "D'altra parte"], 0, 'in conclusione = 总之。'],
    ],
  },

  // ───────────────────────── 第 87 天 ─────────────────────────
  {
    n: 87, it: 'Ascolto autentico', zh: '真实语速听力',
    goal: '适应真实语速的听力：车站广播、超市通知、语音留言、天气预报；学会抓关键词、数字和否定，不被"听不全"吓住；认识连读、省音等口语特征。',
    scene: '你在车站等车，周围是嘈杂的广播。你和一位乘客对照着听，勉强拼出了列车的真实信息。',
    dlg: `
      Altoparlante: Attenzione, prego. Il treno regionale per Bologna delle quindici e dieci è in ritardo di venti minuti. | 请注意。15:10 开往博洛尼亚的区域列车晚点二十分钟。
      Li Ming: Scusi, ho capito bene? Il treno per Bologna parte alle quindici e trenta? | 请问，我听对了吗？开往博洛尼亚的火车 15:30 出发？
      Passeggero: Sì, ha detto che ritarda di venti minuti, quindi parte alle tre e mezza. | 对，说晚点二十分钟，所以三点半出发。
      Altoparlante: I signori passeggeri sono pregati di non lasciare i bagagli incustoditi. | 请旅客们不要让行李无人看管。
      Li Ming: E da quale binario parte? | 从哪个站台出发？
      Passeggero: Dal binario nove. Hanno appena annunciato il cambio. | 九号站台。他们刚刚宣布了变更。
      Li Ming: Grazie mille! Con il rumore non capisco quasi niente. | 非常感谢！吵得我几乎什么都听不清。
    `,
    q: [
      ['火车晚点多久？', ['二十分钟', '十分钟', '一小时'], 0, 'in ritardo di venti minuti。'],
      ['火车实际几点出发？', ['15:30', '15:10', '16:00'], 0, 'alle tre e mezza。'],
      ['从哪个站台出发？', ['九号', '七号', '十号'], 0, 'dal binario nove。'],
    ],
    vocab: `
      l'altoparlante | 扩音器；广播 | l'al-to-par-LAN-te
      in ritardo di | 晚点…… | in ri-TAR-do di
      i signori passeggeri | 各位乘客 | i si-GNO-ri pas-seg-GE-ri
      sono pregati di | 请…… | SO-no pre-GA-ti di
      incustodito | 无人看管的 | in-cu-sto-DI-to
      annunciare | 宣布；广播 | an-nun-CIA-re
      il cambio | 变更；更改 | il CAM-bio
      il rumore | 噪音 | il ru-MO-re
      la previsione | 预报；预测 | la pre-vi-SIO-ne
      il bollettino meteo | 天气预报 | il bol-let-TI-no ME-teo
      la nuvolosità | 多云 | la nu-vo-lo-si-TÀ
      il messaggio vocale | 语音留言 | il mes-SAG-gio vo-CA-le
      la segreteria | 语音信箱；秘书处 | la se-gre-te-RI-a
      quasi niente | 几乎什么都没有 | QUA-si NIEN-te
    `,
    pron: {
      t: '真实语速里的连读与省音',
      tips: [
        '真实语速里**连读、省音很多**：**non lo so** → nonloso；**c\'è un** → cèun；**un po\'** 里的 po 极短；**dov\'è** → dové。听的时候不要逐词，抓**重音和关键词**。',
        '**数字、站台、时间**是广播里最重要的信息，也是最容易听错的：quindici（15）与 cinquanta（50）、tredici（13）与 trenta（30）——重音位置不同：**quinDICI / CINquanta**。',
      ],
      drill: `
        quindici | 十五
        cinquanta | 五十
        tredici | 十三
        trenta | 三十
        in ritardo di venti minuti | 晚点二十分钟
        dal binario nove | 从九号站台
      `,
    },
    gram: [
      {
        h: '真实听力的四个策略',
        t: [
          ['策略', '怎么做'],
          ['① 先预测', '听之前想：在哪里？会听到什么信息（时间、站台、延误）？'],
          ['② 抓关键词', '数字、地名、binario、ritardo、cancellato、sciopero'],
          ['③ 别逐词翻译', '听不懂的词直接跳过，抓住整体意思'],
          ['④ 抓否定与变化', 'non、senza、cambio（变更）、soppresso（取消）'],
          ['⑤ 听第二遍再补细节', '重复内容多的信息（广播常重复两遍）'],
        ],
      },
      {
        h: '广播与通知里的固定句式',
        t: [
          ['意大利语', '意思'],
          ['Si informano i signori passeggeri che…', '各位乘客请注意……'],
          ['Il treno… è in partenza dal binario…', '……次列车即将从……站台出发'],
          ['è in ritardo di… minuti', '晚点……分钟'],
          ['è stato soppresso / cancellato', '已取消'],
          ['sono pregati di + 不定式', '请……'],
          ["si avvisa la gentile clientela che…", '（商场）请顾客注意……'],
        ],
      },
    ],
    text: {
      title: 'Tre messaggi',
      body: `
        1) Messaggio in segreteria: "Buongiorno, sono la dottoressa Bianchi. Ha un appuntamento giovedì alle undici. Può richiamarmi per confermare?" | 1）语音留言：“早上好，我是比安基医生。您周四十一点有预约。您能回电确认吗？”

        2) Annuncio al supermercato: "Si avvisa la gentile clientela che la cassa numero tre è chiusa. Siete pregati di utilizzare le altre casse." | 2）超市广播：“请顾客注意，三号收银台已关闭。请使用其他收银台。”

        3) Previsioni del tempo: "Domani al Nord cielo nuvoloso con piogge sparse; al Centro e al Sud sole e temperature in aumento." | 3）天气预报：“明天北部多云有零星降雨；中部和南部晴，气温上升。”
      `,
    },
    rq: [
      ['留言里预约在什么时候？', ['周四十一点', '周三十点', '周五十二点'], 0, 'giovedì alle undici。'],
      ['超市广播说什么？', ['三号收银台关闭', '商品打折', '超市关门'], 0, 'la cassa numero tre è chiusa。'],
      ['明天南部天气？', ['晴天，气温上升', '下雨', '下雪'], 0, 'sole e temperature in aumento。'],
    ],
    culture: '想提高听力，最有效的是**每天听 15–20 分钟真实的意大利语**：**RaiNews** 的新闻广播语速较标准；**RaiPlay** 有大量带字幕的节目；**天气预报**和**车站广播**用语固定，是极好的入门材料。听的时候**先别开字幕**，再对照字幕复听，进步最快。',
    speak: `
      Scusi, ho capito bene? | 请对方确认你听对了没有
      Il treno parte alle tre e mezza. | 复述时间
      Da quale binario parte? | 问站台
      Con il rumore non capisco quasi niente. | 说太吵听不清
    `,
    wr: [
      '听一段意大利语广播或看一段天气预报，写下你听到的关键信息（5 句话以内）：时间、地点、数字、主要内容。',
      "Il treno per Bologna è in ritardo di venti minuti.\nParte alle tre e mezza dal binario nove.\nI passeggeri non devono lasciare i bagagli incustoditi.",
      '去博洛尼亚的火车晚点二十分钟。三点半从九号站台出发。乘客不得让行李无人看管。',
    ],
    quiz: [
      ['听广播时最该抓的是：', ['时间、站台、数字等关键词', '每个冠词', '每个动词变位'], 0, '抓关键词。'],
      ['"晚点二十分钟"：', ['in ritardo di venti minuti', 'in ritardo da venti minuti', 'ritardato venti minuti in'], 0, 'in ritardo di + 时间。'],
      ['quindici 与 cinquanta 的区别：', ['重音位置不同（quinDIci / CINquanta）', '没有区别', '都读 /kwindiʃi/'], 0, '重音与词形不同。'],
      ['"请旅客们不要……"（广播）：', ['I passeggeri sono pregati di non…', 'I passeggeri pregano non…', 'Passeggeri non devono pregati…'], 0, 'sono pregati di。'],
    ],
  },

  // ───────────────────────── 第 88 天 ─────────────────────────
  {
    n: 88, it: 'Parlare con sicurezza', zh: '口语工坊',
    goal: '学会"说不出来时怎么办"：请对方重复、解释你不会的词、迂回表达、自我纠正；会做 1 分钟的小独白和看图描述；学会用"思考词"争取时间，让对话保持流畅。',
    scene: '口语练习课上，老师给你一张全家人在餐桌旁的照片，请你描述。你不会的词很多，但你用学到的策略一路讲了下来。',
    dlg: `
      Insegnante: Descrivi questa foto: che cosa vedi? | 描述这张照片：你看到了什么？
      Li Ming: Allora, vedo una famiglia a tavola. Credo che siano in vacanza. | 那么，我看到一家人在餐桌旁。我想他们在度假。
      Insegnante: Bene. Come sono vestiti? | 好。他们穿什么？
      Li Ming: Come si dice "straw hat" in italiano? Il cappello di... paglia? | “straw hat”用意大利语怎么说？是 paglia 的帽子？
      Insegnante: Esatto: cappello di paglia. Continua! | 对：cappello di paglia。继续！
      Li Ming: Cioè, intendo dire che fa caldo, perché portano abiti leggeri. | 就是说，我想表达天气很热，因为他们穿着轻薄的衣服。
      Insegnante: Ottimo! Hai usato bene le strategie. | 很好！你把策略用得很好。
    `,
    q: [
      ['照片里是谁？', ['一家人在餐桌旁', '一群学生', '游客'], 0, 'una famiglia a tavola。'],
      ['李明不会说什么词？', ['草帽', '桌子', '家人'], 0, 'straw hat → cappello di paglia。'],
      ['他想表达什么？', ['天气很热', '他们很饿', '他们在吵架'], 0, 'fa caldo, perché portano abiti leggeri。'],
    ],
    vocab: `
      descrivere | 描述 | de-SCRI-ve-re
      sullo sfondo | 在背景里 | SUL-lo SFON-do
      in primo piano | 在前景 | in PRI-mo PIA-no
      probabilmente | 大概；很可能 | pro-ba-bil-MEN-te
      cioè | 就是说 | cio-È
      intendo dire | 我的意思是 | in-TEN-do DI-re
      anzi | 不，应该说；反而 | AN-zi
      volevo dire | 我本想说 | vo-LE-vo DI-re
      il cappello di paglia | 草帽 | il cap-PEL-lo di PA-glia
      leggero | 轻的；轻薄的 | leg-GE-ro
      vediamo | 让我想想 | ve-DIA-mo
      come si dice? | …怎么说？ | CO-me si DI-ce
      che cosa significa? | 这是什么意思？ | ke CO-sa si-GNI-fi-ca
      non so come dirlo | 我不知道怎么说 | non so CO-me DIR-lo
    `,
    gram: [
      {
        h: '说不出来时的"救场"策略',
        t: [
          ['情况', '说法'],
          ['没听懂', 'Non ho capito. / Può ripetere? / Più lentamente, per favore.'],
          ['不会某个词', 'Come si dice "…" in italiano? / Che cosa significa "…"?'],
          ['绕着说（迂回表达）', 'È una cosa che serve per… / È tipo… / È come un… ma più…'],
          ['解释自己的意思', 'Cioè… / Intendo dire che… / Voglio dire che…'],
          ['自我纠正', 'Anzi… / Volevo dire… / Scusa, intendevo…'],
          ['争取思考时间', 'Allora… / Vediamo… / Dunque… / Ecco… / Come dire…'],
        ],
      },
      {
        h: '1 分钟独白与看图描述',
        t: [
          ['步骤', '句型'],
          ['① 总体', 'Nella foto vedo… / Questa foto mostra…'],
          ['② 位置', 'In primo piano… / Sullo sfondo… / A sinistra… / A destra…'],
          ['③ 细节', 'Ci sono… / Una persona sta… / Indossa… / Sembra che…'],
          ['④ 推测', 'Credo che… / Probabilmente… / Forse…'],
          ['⑤ 感受', 'Mi dà l\'idea di… / Mi piace perché…'],
        ],
        p: ['**说错了不要紧**：意大利人更在乎你**能把意思表达出来**。流畅比完美重要——先说，再改。'],
      },
    ],
    culture: '意大利人**很会"补救"**：想不起词时，他们会说 **"Come si chiama… quella cosa…"**（那个东西叫什么来着），然后比划着描述它。**你也可以这样**：说不出来时用手势、用相近的词、用英语单词试一试，意大利人通常会乐于帮你找到正确的词。',
    speak: `
      Come si dice "straw hat" in italiano? | 问某个词怎么说
      Cioè, intendo dire che fa caldo. | 解释你的意思
      Allora, vediamo... Credo che siano in vacanza. | 用思考词和推测
      Volevo dire che sono felici. | 自我纠正
    `,
    wr: [
      '选一张照片（或想象一个场景），写一段 7–8 句的描述：总体、位置（前景 / 背景）、细节、推测、感受。要至少用 3 个"救场"表达（cioè, intendo dire, forse, probabilmente…）。',
      "Nella foto vedo una famiglia a tavola.\nIn primo piano ci sono due bambini che ridono.\nSullo sfondo c'è il mare.\nCredo che siano in vacanza.\nProbabilmente è estate perché portano abiti leggeri.\nCioè, intendo dire che fa molto caldo.\nMi piace questa foto perché sembra molto serena.",
      '照片里我看到一家人在餐桌旁。前景有两个大笑的孩子。背景是大海。我想他们在度假。可能是夏天，因为他们穿着轻薄的衣服。就是说，天气很热。我喜欢这张照片，因为它看起来很安宁。',
    ],
    quiz: [
      ['不会某个词时，可以问：', ['Come si dice "…" in italiano?', 'Dimmi tutto!', 'Chi è "…"?'], 0, 'come si dice…?'],
      ['想解释自己的意思，用：', ['Cioè… / Intendo dire che…', 'Magari…', 'Boh…'], 0, 'cioè / intendo dire。'],
      ['"在背景里"：', ['sullo sfondo', 'in primo piano', 'sotto il fondo'], 0, 'sfondo = 背景。'],
      ['争取思考时间可以说：', ['Allora... vediamo...', 'Arrivederci...', 'Prego...'], 0, 'allora / vediamo。'],
    ],
  },

  // ───────────────────────── 第 89 天 ─────────────────────────
  {
    n: 89, it: 'Ripasso generale', zh: '总复习',
    goal: '梳理 90 天的所有语法与主题；对照"能做"清单找出薄弱项；制定最后两天和课程之后的复习计划；学会用错题和间隔复习把弱项补上。',
    scene: '课程快要结束了。辅导老师和你一起回顾 90 天的学习，找出你还不稳的地方，并为最后的毕业考做准备。',
    dlg: `
      Tutor: Sei quasi alla fine del percorso. Come ti senti? | 你的课程快结束了。你感觉怎么样？
      Li Ming: Mi sento molto meglio: capisco quasi tutto nelle conversazioni lente. | 我感觉好多了：慢速对话我几乎都能听懂。
      Tutor: Quali sono ancora i tuoi punti deboli? | 你还有哪些弱点？
      Li Ming: Sbaglio ancora l'ausiliare con essere e avere, e i pronomi combinati. | 我还会弄错 essere 和 avere 作助动词的用法，还有组合代词。
      Tutor: Allora oggi ripassiamo quegli argomenti. Prima rileggi gli appunti, poi fai gli esercizi. | 那么今天我们复习这些内容。先重读笔记，再做练习。
      Li Ming: E come posso ricordare meglio le parole? | 那我怎样才能更好地记住单词？
      Tutor: Ripassa ogni giorno poche carte e usa le parole in frasi tue. | 每天复习少量卡片，并用这些词造你自己的句子。
    `,
    q: [
      ['李明现在感觉怎么样？', ['好多了，慢速对话基本能听懂', '很糟糕', '没有变化'], 0, 'Mi sento molto meglio。'],
      ['他还有哪些弱点？', ['助动词的选择和组合代词', '数字', '问候语'], 0, "l'ausiliare… i pronomi combinati。"],
      ['老师建议怎样记单词？', ['每天少量复习并造句', '一次性背完', '只看不写'], 0, 'poche carte… frasi tue。'],
    ],
    vocab: `
      il percorso | 路径；过程 | il per-COR-so
      ripassare | 复习 | ri-pas-SA-re
      il ripasso | 复习 | il ri-PAS-so
      gli appunti | 笔记 | gli ap-PUN-ti
      l'ausiliare | 助动词 | l'au-si-LIA-re
      l'argomento | 主题；话题 | l'ar-go-MEN-to
      il punto debole | 弱点 | il PUN-to DE-bo-le
      il progresso | 进步 | il pro-GRES-so
      fare progressi | 取得进步 | FA-re pro-GRES-si
      la frase | 句子 | la FRA-se
      ricordare | 记住；想起 | ri-cor-DA-re
      il livello | 水平；等级 | il li-VEL-lo
      l'obiettivo | 目标 | l'o-biet-TI-vo
      la regola | 规则 | la RE-go-la
    `,
    gram: [
      {
        h: '90 天语法地图',
        t: [
          ['阶段', '语法主题'],
          ['第 1–10 天', '发音体系、问候、essere / avere、冠词与名词、vorrei'],
          ['第 11–20 天', '现在时（-are / -ere / -ire）、avere 成语、形容词一致、物主词、piacere、c\'è / ci sono、情态动词'],
          ['第 21–30 天', '正式命令式（Lei）、方位与交通、数字到 1000、身体不适、天气、si può'],
          ['第 31–40 天', '反身动词、andare / venire / uscire…、sapere vs conoscere、缩合介词、questo / quello / bello、部分冠词'],
          ['第 41–50 天', '直接 / 间接宾语代词、比较级入门、da + 时间、qualche、-issimo'],
          ['第 51–60 天', 'passato prossimo（avere / essere）、不规则分词、将来时、命令式（tu / noi / voi）、比较与最高级、ci / ne'],
          ['第 61–70 天', 'imperfetto、imperfetto vs passato prossimo、trapassato、che / cui、连接词'],
          ['第 71–80 天', '条件式、虚拟式入门、si 非人称 / 被动、组合代词、条件句、建议'],
          ['第 81–90 天', '综合运用：租房、投诉、报案、阅读、写作、听力、口语'],
        ],
      },
      {
        h: 'A2 "我能……"自查清单（打钩）',
        t: [
          ['技能', '我能……'],
          ['听', '听懂慢速的日常对话、车站广播的关键信息、简单的语音留言'],
          ['说', '点餐购物、问路订房、自我介绍、聊爱好和计划、讲述过去的事、礼貌请求、表达简单观点'],
          ['读', '读懂菜单、标识、短信、邮件、租房广告、短新闻、简单的故事'],
          ['写', '写短信、明信片、日记、正式邮件、100 词左右的短文'],
        ],
        p: ['**没打钩的项目**就是你最后两天和课程之后要优先练的。'],
      },
      {
        h: '怎样用 App 补弱项',
        t: [
          ['想补', '做什么'],
          ['忘得快的词句', '到「复习」，做到期卡片；用「错题重练」专门练答错的'],
          ['发音', '「发音室」：听辨、重音、绕口令；每天跟读 5 分钟'],
          ['语法', '回到对应的那一天，只做「学」和「写」两步'],
          ['口语', '每天选 3 天的"说"步骤，大声朗读并录音自评'],
        ],
      },
    ],
    culture: '语言学习不是直线，而是**螺旋**：你会反复回到同一个知识点，每次理解得更深。意大利人有句谚语：**"Chi va piano va sano e va lontano."**（慢慢走的人，走得稳也走得远。）课程只是起点——真正的进步来自**每天一点点、长期坚持**。',
    speak: `
      Mi sento molto meglio rispetto a tre mesi fa. | 说你比三个月前进步很多
      I miei punti deboli sono i pronomi combinati. | 说你的弱点
      Ripasso ogni giorno poche carte. | 说你每天复习少量卡片
      Il mio obiettivo è parlare italiano con sicurezza. | 说你的目标
    `,
    wr: [
      '写 6–7 句话做一次"学习总结"：你学到了什么、哪里进步最大、哪里还弱、接下来怎么学（用近过去时、现在时和将来时）。',
      "In questi novanta giorni ho imparato molto.\nHo migliorato soprattutto la pronuncia e l'ascolto.\nMi sembra che i pronomi combinati siano ancora difficili.\nOgni giorno ripasserò poche carte.\nLeggerò un libro semplice e guarderò programmi in italiano.\nIl mio obiettivo è parlare con sicurezza.",
      '这九十天里我学到了很多。我尤其在发音和听力上进步了。我觉得组合代词还是很难。我每天会复习少量卡片。我会读一本简单的书，看意大利语节目。我的目标是自信地说话。',
    ],
    quiz: [
      ['"我复习笔记"：', ['Ripasso gli appunti.', 'Ripasso i appunti.', 'Ripassare appunti io.'], 0, 'gli appunti。'],
      ['"我取得了进步"：', ['Ho fatto progressi.', 'Sono fatto progressi.', 'Faccio progressi ieri.'], 0, 'fare progressi → ho fatto。'],
      ['弱项最有效的复习方式：', ['回到对应主题，做"学"和"写"', '一次看完所有内容', '只看翻译'], 0, '针对性复习。'],
      ['语言学习更像：', ['螺旋式上升', '一条直线', '一次性完成'], 0, '会反复回到同一知识点。'],
    ],
  },

  // ───────────────────────── 第 90 天（岛屿关卡 + 毕业考）─────────────────────────
  {
    n: 90, test: true, exam: true, it: 'Esame finale e diploma', zh: '毕业考与证书',
    goal: '通过 30 题毕业考，完成 90 天的学习；回顾全程，写一封给一年后自己的信；了解 A2 之后的路线（CELI / CILS / PLIDA）与继续学习的资源；领取你的"意大利语能力岛"毕业证书。',
    scene: '九十天过去了。朋友们为你举办了一个小小的庆祝晚餐：Marco、Giulia 和 Chiara 都在，大家一起回顾你走过的路，也聊起你的下一步。',
    dlg: `
      Marco: Allora, hai finito il corso di novanta giorni! Come ti senti? | 那么，你完成了九十天的课程！你感觉怎么样？
      Li Ming: Stanco ma felicissimo! Novanta giorni fa non sapevo dire neanche "ciao" come si deve. | 累，但幸福极了！九十天前我连"你好"都说不好。
      Giulia: E adesso parli, leggi e scrivi! Che cosa farai ora? | 现在你能说、能读、能写了！你接下来要做什么？
      Li Ming: Continuerò a studiare ogni giorno e vorrei fare l'esame CELI 1. | 我会每天继续学习，并想参加 CELI 1 考试。
      Chiara: Ottima idea! E poi dovresti venire in Italia per un periodo. | 好主意！然后你该来意大利住一段时间。
      Li Ming: Se potessi, partirei domani! | 如果可以，我明天就出发！
      Marco: Allora ti aspettiamo! In bocca al lupo per tutto! | 那我们等你！祝你一切顺利！
      Li Ming: Crepi! E grazie di cuore a tutti. | 去他的狼！衷心感谢大家。
    `,
    q: [
      ['课程持续了多久？', ['九十天', '六十天', '三十天'], 0, 'il corso di novanta giorni。'],
      ['李明接下来想参加什么考试？', ['CELI 1', 'TOEFL', 'HSK'], 0, "l'esame CELI 1。"],
      ['朋友们对他说了什么？', ['祝你好运，我们等你', '再见', '你得回国了'], 0, 'In bocca al lupo… ti aspettiamo。'],
    ],
    vocab: `
      il diploma | 毕业证书 | il di-PLO-ma
      l'esame | 考试 | l'e-SA-me
      superare l'esame | 通过考试 | su-pe-RA-re l'e-SA-me
      il certificato | 证书 | il cer-ti-fi-CA-to
      il livello | 水平；等级 | il li-VEL-lo
      il traguardo | 终点；里程碑 | il tra-GUAR-do
      di cuore | 衷心地 | di CUO-re
      grazie di cuore | 衷心感谢 | GRA-zie di CUO-re
      la prossima tappa | 下一站 | la PROS-si-ma TAP-pa
      l'esperienza | 经历；经验 | l'e-spe-RIEN-za
      continuare | 继续 | con-ti-nu-A-re
      imparare | 学习；学会 | im-pa-RA-re
      orgoglioso | 骄傲的；自豪的 | or-go-GLIO-so
      congratulazioni | 恭喜 | con-gra-tu-la-ZIO-ni
    `,
    pron: {
      t: '毕业朗读：90 天的最后一次发音自查',
      tips: [
        '选一段你喜欢的对话（比如第 30 天或第 60 天的），**录音**朗读一遍，再和第 1 天的朗读对比——你会听到明显的进步。',
        '最后一次自查：元音是否纯净、双辅音够不够长、c / g 软硬、gn / gli、颤音 r、重音位置、疑问句语调。再读一遍绕口令收尾。',
      ],
      drill: `
        diploma | 毕业证书
        congratulazioni | 恭喜
        traguardo | 里程碑
        orgoglioso | 自豪的
        certificato | 证书
        esperienza | 经历
      `,
      twister: 'Trentatré trentini entrarono a Trento, tutti e trentatré trotterellando. | 三十三个特伦托人走进特伦托，三十三个人全都小跑着。',
    },
    gram: [
      {
        h: 'A2 之后：下一步去哪里',
        t: [
          ['等级', '含义', '对应的官方证书'],
          ['A1', '入门', 'CELI Impatto · CILS A1 · PLIDA A1'],
          ['A2', '基础（你现在的水平）', 'CELI 1 · CILS A2 · PLIDA A2'],
          ['B1', '独立运用的起点', 'CELI 2 · CILS B1 · PLIDA B1'],
          ['B2', '独立运用', 'CELI 3 · CILS B2 · PLIDA B2'],
        ],
        p: ['**CELI** 由佩鲁贾外国人大学颁发，**CILS** 由锡耶纳外国人大学颁发，**PLIDA** 由但丁·阿利吉耶里协会（Società Dante Alighieri）颁发。具体报名与考试安排请查各机构**官方网站**。'],
      },
      {
        h: '继续学习的资源与计划',
        t: [
          ['技能', '建议'],
          ['听', 'RaiPlay、RaiNews 的节目与新闻；YouTube 上的 Easy Italian、Learn Italian with Lucrezia 等入门频道'],
          ['读', '简易读物（graded readers）、短新闻、《木偶奇遇记》全书；每天读 1 篇短文'],
          ['说', '找语伴做 tandem（语言交换）；每天大声读 5 分钟；复述今天发生的事'],
          ['写', '每天写 5 句日记；每周写一封给意大利朋友的短信 / 邮件'],
          ['综合', '保持每天 20–30 分钟，坚持比一次学很久更重要'],
        ],
        p: ['**30 天后续计划**：第 1 周巩固 A2 语法；第 2 周大量听读；第 3 周开始 B1 内容（虚拟式、被动、关系代词）；第 4 周做一套 CELI 1 / CILS A2 真题，评估自己。'],
      },
    ],
    text: {
      title: 'Una lettera a me stesso tra un anno',
      body: `
        Caro Li Ming del futuro, | 亲爱的未来的李明：
        oggi finisco il mio corso di novanta giorni e sono molto orgoglioso. | 今天我完成了九十天的课程，我非常自豪。

        Tra un anno parlerò molto meglio e avrò tanti amici italiani. | 一年后，我会说得更好，还会有很多意大利朋友。
        Avrò superato l'esame CELI e forse vivrò già a Firenze. | 我会通过 CELI 考试，也许已经住在佛罗伦萨了。

        Non dimenticare mai perché hai cominciato: ti piaceva l'Italia! | 永远别忘了你为什么开始：因为你喜欢意大利！
        Continua a studiare, a leggere e a parlare ogni giorno. | 继续每天学习、阅读和交谈。
        Un grande abbraccio, | 一个大大的拥抱，
        Li Ming di oggi | 今天的李明
      `,
    },
    rq: [
      ['写信的人今天做了什么？', ['完成了九十天的课程', '开始学意大利语', '找到了工作'], 0, 'finisco il mio corso di novanta giorni。'],
      ['他预计一年后会怎样？', ['说得更好，也许住在佛罗伦萨', '回到中国', '放弃学习'], 0, 'parlerò molto meglio… vivrò già a Firenze。'],
      ['信的结尾提醒自己什么？', ['继续每天学习', '休息一年', '换一门语言'], 0, 'Continua a studiare… ogni giorno。'],
    ],
    culture: '**Bravo! Brava! Congratulazioni!** 你用九十天走完了从"ciao"到写邮件、讲故事、表达观点的路。意大利语不会因为课程结束而结束——它会在你读的每一本书、听的每一首歌、点的每一杯咖啡里**继续生长**。**Buon proseguimento!**（继续前进！）**Arrivederci, e in bocca al lupo!**',
    speak: `
      Ho finito il corso di novanta giorni! | 说：我完成了九十天的课程
      Continuerò a studiare ogni giorno. | 说你会每天继续学习
      Se potessi, partirei domani! | 说：如果可以，我明天就出发
      Grazie di cuore a tutti! | 衷心感谢大家
    `,
    wr: [
      '写一封 8–10 句的信给"一年后的自己"：今天的心情（现在时）、这九十天学到了什么（近过去时）、一年后你会是什么样（将来时）、对自己的建议（命令式 / 条件式）。',
      "Caro me stesso del futuro,\noggi finisco il corso e sono felicissimo.\nIn questi novanta giorni ho imparato a parlare, a leggere e a scrivere.\nTra un anno parlerò molto meglio e avrò amici italiani.\nVivrò forse a Firenze e lavorerò in un'azienda italiana.\nNon dimenticare mai perché hai cominciato.\nContinua a studiare ogni giorno!\nUn abbraccio,\nIl tuo io di oggi",
      '亲爱的未来的我：今天我完成了课程，非常幸福。这九十天里我学会了说、读、写。一年后我会说得更好，并有意大利朋友。我也许住在佛罗伦萨，在一家意大利公司工作。永远别忘了你为什么开始。继续每天学习！拥抱你，今天的你',
    ],
    quiz: [
      ['A2 之后的下一级是：', ['B1', 'A1', 'C2'], 0, 'A1 → A2 → B1 → B2。'],
      ['"我会通过考试"（将来时）：', ['Supererò l\'esame.', 'Superare l\'esame io.', 'Ho superato l\'esame domani.'], 0, 'superare 的将来时：supererò。'],
      ['"衷心感谢"：', ['Grazie di cuore.', 'Grazie con cuore.', 'Cuore grazie.'], 0, 'di cuore = 衷心地。'],
      ['In bocca al lupo! 的正确回答：', ['Crepi!', 'Grazie!', 'Prego!'], 0, 'Crepi!'],
    ],
  },
]);
