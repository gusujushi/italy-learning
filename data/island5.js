/* 第 5 岛 · 社交岛 Isola degli Amici（第 41–50 天） */
Course.add([
  // ───────────────────────── 第 41 天 ─────────────────────────
  {
    n: 41, it: 'Lo vedo, la prendo', zh: '直接宾语代词',
    goal: '掌握直接宾语代词 mi / ti / lo / la / ci / vi / li / le 及其位置；会在购物时说"我试试它""我买它们"。',
    scene: '你在服装店里想买外套、裤子和鞋。售货员一边拿东西一边问你，回答时用代词会比重复名词自然得多。',
    dlg: `
      Commessa: Ecco la giacca blu. La vuole provare? | 这是蓝色外套。您想试试吗？
      Li Ming: Sì, la provo. Poi vorrei anche quei pantaloni. | 好的，我试试。我还想要那条裤子。
      Commessa: Li vuole in nero o in grigio? | 您要黑色的还是灰色的？
      Li Ming: Li prendo in nero. E le scarpe? Le avete in blu? | 我要黑色的。那鞋子呢？你们有蓝色的吗？
      Commessa: Sì, le abbiamo. Un momento, le porto subito. | 有，我们有。请稍等，我马上给您拿来。
      Li Ming: Grazie! Mi aiuta a trovare la taglia giusta? | 谢谢！您能帮我找到合适的尺码吗？
      Commessa: Certo, La aiuto volentieri. | 当然，我很乐意帮您。
    `,
    q: [
      ['李明想先试什么？', ['蓝色外套', '黑色裤子', '蓝色鞋子'], 0, 'La vuole provare? Sì, la provo。'],
      ['裤子他选什么颜色？', ['黑色', '灰色', '蓝色'], 0, 'Li prendo in nero。'],
      ['售货员要给他拿什么？', ['蓝色的鞋', '黑色的裤子', '灰色的外套'], 0, 'le scarpe in blu。'],
    ],
    vocab: `
      la commessa | 女店员 | la com-MES-sa
      provare | 试；尝试 | pro-VA-re
      i pantaloni | 裤子 | i pan-ta-LO-ni
      le scarpe | 鞋 | le SCAR-pe
      in nero | 黑色的 | in NE-ro
      in grigio | 灰色的 | in GRI-gio
      la taglia | 尺码 | la TA-glia
      giusto | 合适的；正确的 | GIU-sto
      aiutare | 帮助 | a-iu-TA-re
      portare | 带；拿来；穿戴 | por-TA-re
      trovare | 找到；觉得 | tro-VA-re
      avere in blu | 有蓝色的 | a-VE-re in BLU
      lo | 他／它（宾格） | LO
      la | 她／它（宾格） | LA
      li / le | 他们／她们（宾格） | LI / LE
    `,
    pron: {
      t: 'li 与 gli 的区别',
      tips: [
        '**li**（他们，宾格代词）读 /li/，清晰的 l + i；**gli**（冠词 / 间接代词）读 /ʎi/，舌面贴硬腭。两者听起来很近，一定要分清：Li prendo（我拿它们）≠ Gli piace（他喜欢）。',
        '代词和动词连着读：**la provo** 读作 laprovo，**le porto** 读作 leporto——不要在代词后停顿。',
      ],
      drill: `
        la provo | 我试它
        li prendo | 我拿它们
        le porto | 我拿来它们
        gli piace | 他喜欢
        pantaloni | 裤子
        taglia | 尺码
      `,
    },
    gram: [
      {
        h: '直接宾语代词：回答"什么 / 谁"',
        p: ['直接宾语代词替代**不带介词**的宾语（我买**那件外套** → 我买**它**）。位置：放在**变位动词之前**：La prendo. 否定把 non 放在代词前：**Non la prendo**。'],
        t: [
          ['', '单数', '复数'],
          ['我 / 我们', 'mi', 'ci'],
          ['你 / 你们', 'ti', 'vi'],
          ['他 / 它（阳）', 'lo', 'li'],
          ['她 / 它（阴）', 'la', 'le'],
          ['您（正式）', 'La', '—'],
        ],
        eg: ['Compro la giacca. → La compro. | 我买外套。→ 我买它。', 'Vedo Marco. → Lo vedo. | 我看见马可。→ 我看见他。', 'Non li conosco. | 我不认识他们。'],
      },
      {
        h: '和不定式、情态动词连用',
        p: ['宾语代词可以**放在情态动词前**，也可以**接在不定式末尾**（去掉末尾的 e）：**La voglio provare** = **Voglio provarla**。'],
        eg: ['La voglio provare. | 我想试它。', 'Voglio provarla. | 我想试它。', 'Mi può aiutare? | 您能帮我吗？'],
      },
    ],
    culture: '意大利服装店里，店员通常会主动问 **Posso aiutarLa?**（我能帮您吗？）。如果你只想看看，说 **Sto solo guardando, grazie**（我只是看看，谢谢）就好。意大利尺码和中国、欧美都不同（女装常见 38–48），**一定要试穿**。',
    speak: `
      La provo. | 说：我试它（指外套）
      Li prendo in nero. | 说：我要黑色的（指裤子）
      Le avete in blu? | 问有没有蓝色的鞋
      Mi aiuta, per favore? | 请店员帮忙
    `,
    wr: [
      '写 3 句话：你看中了一件东西，说你要试，决定买，并用代词替换名词。',
      'Vorrei provare questa giacca.\nLa provo subito.\nVa bene, la prendo!',
      '我想试这件外套。我马上试它。好的，我买它！',
    ],
    quiz: [
      ['"我买它们"（指裤子 i pantaloni）：', ['Li compro.', 'Le compro.', 'Lo compro.'], 0, 'i pantaloni 是阳性复数 → li。'],
      ['"我看见她"：', ['La vedo.', 'Lo vedo.', 'Le vedo.'], 0, '阴性单数 → la。'],
      ['"我想试它（外套）"，正确的是：', ['La voglio provare.', 'Voglio la provare.', 'Lo voglio provare.'], 0, '代词放在情态动词前或接在原形后。'],
      ['否定"我不买它"：', ['Non la compro.', 'La non compro.', 'Non compro la.'], 0, 'non 放在代词前。'],
    ],
  },

  // ───────────────────────── 第 42 天 ─────────────────────────
  {
    n: 42, it: 'Mi piace, ti piacciono', zh: '喜欢与间接宾语代词',
    goal: '掌握间接宾语代词 mi / ti / gli / le / ci / vi / gli；会说"他喜欢……""她不喜欢……"；会用 A me / A te 强调。',
    scene: '你和朋友们计划周末聚餐，想找一家每个人都有喜欢吃的东西的餐厅，于是打听每个人的口味。',
    dlg: `
      Giulia: Che cosa ti piace mangiare? | 你喜欢吃什么？
      Li Ming: Mi piacciono la pasta e il pesce. A te? | 我喜欢意面和鱼。你呢？
      Giulia: A me piace la carne, ma non mi piacciono i funghi. | 我喜欢肉，但不喜欢蘑菇。
      Li Ming: Neanche a Marco piacciono i funghi. Gli piace solo la pizza! | 马可也不喜欢蘑菇。他只喜欢披萨！
      Giulia: E a Chiara? Le piace il pesce? | 那基娅拉呢？她喜欢鱼吗？
      Li Ming: Sì, le piace molto, ma non le piace il pesce crudo. | 喜欢，很喜欢，不过她不喜欢生鱼。
      Giulia: Allora scegliamo un ristorante con piatti diversi. | 那我们选一家菜式多样的餐厅吧。
    `,
    q: [
      ['Giulia 不喜欢什么？', ['蘑菇', '鱼', '意面'], 0, 'non mi piacciono i funghi。'],
      ['马可只喜欢什么？', ['披萨', '鱼', '肉'], 0, 'Gli piace solo la pizza。'],
      ['基娅拉不喜欢什么？', ['生鱼', '披萨', '意面'], 0, 'non le piace il pesce crudo。'],
    ],
    vocab: `
      la carne | 肉 | la CAR-ne
      il fungo | 蘑菇 | il FUN-go
      crudo | 生的 | CRU-do
      cotto | 熟的 | COT-to
      scegliere | 选择 | SCE-glie-re
      il piatto | 盘子；菜 | il PIAT-to
      a me | 对我（强调） | a ME
      a te | 对你（强调） | a TE
      gli piace | 他喜欢 | GLI PIA-ce
      le piace | 她喜欢；您喜欢 | le PIA-ce
      neanche a me | 我也不 | ne-AN-che a ME
      il ristorante | 餐厅 | il ri-sto-RAN-te
      dire | 说 | DI-re
      scrivere | 写 | SCRI-ve-re
    `,
    pron: {
      t: 'gli piace /ʎi ˈpjatʃe/',
      tips: [
        '**gli** 读 /ʎi/，舌面贴硬腭；**le** 读 /le/。听这两个词的区别：Gli piace（他喜欢）/ Le piace（她喜欢）——区别全在开头那个音。',
        '**scegliere** /ˈʃeʎʎere/：sc 在 e 前读 /ʃ/，gli 读 /ʎ/，两个特殊音挨在一起，要慢读。',
      ],
      drill: `
        gli piace | 他喜欢
        le piace | 她喜欢
        scegliere | 选择
        funghi | 蘑菇
        piatto | 菜
        crudo | 生的
      `,
    },
    gram: [
      {
        h: '间接宾语代词：回答"给谁 / 对谁"',
        p: ['间接宾语代词替代**带 a 的宾语**（对马可、给朱莉娅）。**piacere、dire、dare、scrivere、telefonare、chiedere** 后面的人都用间接代词。位置规则和直接代词相同。'],
        t: [
          ['', '单数', '复数'],
          ['我 / 我们', 'mi', 'ci'],
          ['你 / 你们', 'ti', 'vi'],
          ['他 / 她（对…）', 'gli / le', 'gli（对他们）'],
          ['您（正式）', 'Le', '—'],
        ],
        eg: ['Telefono a Marco. → Gli telefono. | 我给马可打电话。', 'Scrivo a Chiara. → Le scrivo. | 我给基娅拉写信。', 'Mi dici la verità? | 你告诉我实话吗？'],
      },
      {
        h: 'piacere 的完整用法',
        t: [
          ['想说', '意大利语'],
          ['我喜欢意面', 'Mi piace la pasta. / A me piace la pasta.'],
          ['你不喜欢蘑菇', 'Non ti piacciono i funghi.'],
          ['他喜欢披萨', 'Gli piace la pizza. / A Marco piace la pizza.'],
          ['她不喜欢鱼', 'Non le piace il pesce.'],
          ['我们喜欢这里', 'Ci piace qui.'],
          ['我也不（喜欢）', 'Neanche a me. / A me no.'],
        ],
        p: ['**A me / A te / A lui / A lei** 用来强调或对比；**A Marco / A Chiara** 用名字时，动词前仍可加 gli / le，也可以省略。'],
      },
    ],
    text: {
      title: 'Gusti diversi',
      body: `
        Giulia ama la carne, ma non le piacciono i funghi. | 朱莉娅爱吃肉，但不喜欢蘑菇。
        A Marco piace solo la pizza. | 马可只喜欢披萨。

        A Chiara piace il pesce, ma non il pesce crudo. | 基娅拉喜欢鱼，但不喜欢生鱼。
        A me piace tutto, e mi piace anche scegliere il ristorante! | 我什么都喜欢，我也喜欢挑餐厅！
      `,
    },
    rq: [
      ['谁不喜欢蘑菇？', ['朱莉娅', '马可', '基娅拉'], 0, 'non le piacciono i funghi。'],
      ['基娅拉不喜欢哪种鱼？', ['生鱼', '烤鱼', '炸鱼'], 0, 'non il pesce crudo。'],
    ],
    culture: '在意大利请客人吃饭前，主人一般会问 **Hai allergie o cose che non mangi?**（你有过敏或不吃的东西吗？）。**素食（vegetariano）和纯素（vegano）**在大城市的餐厅很常见；注意告诉服务员 **Sono allergico a…**（我对……过敏）。',
    speak: `
      Che cosa ti piace mangiare? | 问朋友喜欢吃什么
      Mi piacciono la pasta e il pesce. | 说你喜欢意面和鱼
      Non mi piacciono i funghi. | 说你不喜欢蘑菇
      A Marco piace la pizza. | 说马可喜欢披萨
    `,
    wr: [
      '写 4 句话：你喜欢吃什么、不喜欢吃什么；你的一位朋友喜欢什么。',
      'Mi piacciono la pasta e il pesce.\nNon mi piacciono i funghi.\nAl mio amico Marco piace solo la pizza.\nA te che cosa piace?',
      '我喜欢意面和鱼。我不喜欢蘑菇。我的朋友马可只喜欢披萨。你喜欢什么？',
    ],
    quiz: [
      ['"我给马可打电话"用代词：', ['Gli telefono.', 'Lo telefono.', 'Le telefono.'], 0, 'telefonare a → 间接代词 gli。'],
      ['"她喜欢这个"：', ['Le piace questo.', 'Gli piace questo.', 'La piace questo.'], 0, '对她 → le。'],
      ['"我也不喜欢"（回应 Non mi piacciono）：', ['Neanche a me.', 'Anche a me.', 'Mi piace.'], 0, 'neanche a me = 我也不。'],
      ['Mi piacciono i funghi 里 piacciono 复数的原因是：', ['被喜欢的东西 i funghi 是复数', '主语是"我"', '因为是第一人称'], 0, 'piacere 与被喜欢的东西一致。'],
    ],
  },

  // ───────────────────────── 第 43 天 ─────────────────────────
  {
    n: 43, it: 'Vestiti e taglie', zh: '衣服与尺码',
    goal: '会说常见衣物和颜色；会问尺码、试穿、说合身不合身；掌握比较级 più / meno … di / che。',
    scene: '周末你想买一件白衬衫，店员帮你选尺码、试穿，并推荐了同款的其他颜色。',
    dlg: `
      Li Ming: Buongiorno! Cerco una camicia bianca, taglia media. | 早上好！我想找一件白衬衫，中号。
      Commessa: Questa è di cotone. Il camerino è là, a destra. | 这件是纯棉的。试衣间在那边，右手边。
      Li Ming: Mi sta stretta. Ha una taglia più grande? | 我穿着有点紧。有大一号的吗？
      Commessa: Ecco la taglia L. Come Le sta? | 这是 L 码。您穿着怎么样？
      Li Ming: Mi sta bene, ma è troppo lunga. | 很合身，但是太长了。
      Commessa: Questa è meno lunga e costa meno: trenta euro. | 这件没那么长，也更便宜：三十欧元。
      Li Ming: Perfetto! Ha lo stesso modello in azzurro? | 太好了！同款有浅蓝色的吗？
      Commessa: Sì, ma quella azzurra è più cara di quella bianca. | 有，不过浅蓝色的比白色的贵。
    `,
    q: [
      ['李明想买什么？', ['白衬衫', '蓝外套', '黑裤子'], 0, 'una camicia bianca。'],
      ['第一件穿着怎么样？', ['有点紧', '太松', '太短'], 0, 'Mi sta stretta。'],
      ['浅蓝色那件和白色的相比？', ['更贵', '更便宜', '一样'], 0, 'più cara di quella bianca。'],
    ],
    vocab: `
      la camicia | 衬衫 | la ca-MI-cia
      la maglietta | T 恤 | la ma-GLIET-ta
      i jeans | 牛仔裤 | i JEANS
      la gonna | 裙子 | la GON-na
      il cappotto | 大衣 | il cap-POT-to
      il vestito | 连衣裙；衣服 | il ve-STI-to
      di cotone | 纯棉的 | di cot-TO-ne
      il camerino | 试衣间 | il ca-me-RI-no
      stretto | 紧的；窄的 | STRET-to
      largo | 宽松的；宽的 | LAR-go
      lungo | 长的 | LUN-go
      corto | 短的 | COR-to
      mi sta bene | 我穿着合适 | mi STA BE-ne
      azzurro | 浅蓝色的 | az-ZUR-ro
      lo stesso | 同一个；同样的 | lo STES-so
    `,
    pron: {
      t: 'maglietta / camicia',
      tips: [
        '**maglietta** ma-GLIET-ta：gli /ʎ/ 后面接 e 构成二合元音 "glie"；**camicia** ca-MI-cia：重音在 MI，cia 里 i 不发音。',
        '**stretto** STRET-to：str 辅音丛 + tt 长；**azzurro** az-ZUR-ro：zz 长 /ddz/，rr 长颤音。',
      ],
      drill: `
        maglietta | T 恤
        camicia | 衬衫
        camerino | 试衣间
        stretto | 紧的
        azzurro | 浅蓝色
        cappotto | 大衣
      `,
    },
    gram: [
      {
        h: '比较级：più / meno … di / che',
        p: [
          '**più**（更）/ **meno**（没那么）+ 形容词。**di** 用于比较两个**名词或人称**；**che** 用于比较两个**形容词、动词或副词**。',
        ],
        eg: [
          'Questa camicia è più cara di quella. | 这件衬衫比那件贵。',
          'È più bella che comoda. | 它漂亮多于舒服。',
          'Marco è meno alto di Luca. | 马可没有卢卡高。',
        ],
      },
      {
        h: '同级比较与"穿着怎么样"',
        t: [
          ['结构', '例句'],
          ['(tanto) … quanto / (così) … come', 'È alto quanto me. / È così bello come il rosso.'],
          ['mi sta bene / male', 'Questa giacca mi sta bene.'],
          ['mi sta stretto / largo', 'Mi sta stretta. / Mi sta largo.'],
          ['È troppo + 形容词', 'È troppo lunga.'],
        ],
        p: ['**stare** 用来说衣服的"合身"：Mi sta bene（我穿着合适）。stretta 与衣服（camicia）阴性一致。'],
      },
    ],
    culture: '意大利以**服装和皮具**闻名。买衣服前注意**尺码换算**：女装常见 38–48，男装 44–56，鞋码 36–46 前后。**打折季（saldi）**在 1 月和 7 月，折扣通常很大。试穿前最好问一句：**Posso provarlo?**（我能试穿吗？）',
    speak: `
      Cerco una camicia bianca, taglia media. | 说你找一件中号白衬衫
      Mi sta stretta. Ha una taglia più grande? | 说太紧，问有没有大一号
      Mi sta bene, ma è troppo lunga. | 说合身但太长
      È più cara di quella bianca. | 说它比白色的贵
    `,
    wr: [
      '写 4 句话比较两件衣服：颜色、价格、长短、哪件更好。',
      'La camicia bianca è più economica di quella azzurra.\nLa gonna rossa è meno lunga di quella nera.\nMi sta bene la taglia media.\nPrendo la camicia bianca.',
      '白衬衫比浅蓝色的便宜。红裙子没有黑裙子长。中号很合身。我买白衬衫。',
    ],
    quiz: [
      ['"这件比那件贵"（比较两个事物）用：', ['più caro di', 'più caro che', 'più caro da'], 0, '比较两个名词用 di。'],
      ['"我穿着有点紧（裙子）"：', ['Mi sta stretta.', 'Mi sta stretto.', 'Ho stretta.'], 0, 'gonna 阴性 → stretta。'],
      ['"他没有卢卡高"：', ['È meno alto di Luca.', 'È meno alto che Luca.', 'È più meno alto Luca.'], 0, 'meno … di。'],
      ['"试衣间"是：', ['il camerino', 'la camera', 'il cappotto'], 0, 'camerino = 试衣间。'],
    ],
  },

  // ───────────────────────── 第 44 天 ─────────────────────────
  {
    n: 44, it: 'Dal medico', zh: '看医生',
    goal: '会向医生描述症状和持续时间；认识常见身体部位；听懂医生的指令（Apra la bocca / Prenda… / Si riposi）。',
    scene: '感冒一直没好，你预约了社区医生。诊室里，医生一边检查一边问你症状。',
    dlg: `
      Medico: Buongiorno, si accomodi. Che cosa Le fa male? | 早上好，请坐。您哪里不舒服？
      Li Ming: Mi fa male la gola e ho la tosse da tre giorni. | 我嗓子疼，咳嗽三天了。
      Medico: Ha la febbre? | 发烧吗？
      Li Ming: Sì, trentotto e due ieri sera. | 有，昨晚三十八度二。
      Medico: Apra la bocca, per favore. La gola è molto rossa. | 请张开嘴。嗓子很红。
      Li Ming: È grave, dottore? | 严重吗，医生？
      Medico: No, è un'infezione. Prenda un antibiotico per sette giorni e beva molto. | 不严重，是感染。服用抗生素七天，多喝水。
      Li Ming: Posso andare al lavoro? | 我可以去上班吗？
      Medico: No, resti a casa e si riposi. | 不行，请待在家里休息。
    `,
    q: [
      ['李明咳嗽多久了？', ['三天', '一周', '一天'], 0, 'da tre giorni。'],
      ['他昨晚多少度？', ['38.2 度', '37.2 度', '39 度'], 0, 'trentotto e due。'],
      ['医生让他怎么做？', ['吃药七天，在家休息', '马上去医院', '照常上班'], 0, 'Prenda un antibiotico… resti a casa。'],
    ],
    vocab: `
      il dottore | 医生；博士 | il dot-TO-re
      la tosse | 咳嗽 | la TOS-se
      il raffreddore | 感冒；鼻塞 | il raf-fred-DO-re
      la bocca | 嘴 | la BOC-ca
      grave | 严重的 | GRA-ve
      l'infezione | 感染 | l'in-fe-ZIO-ne
      l'antibiotico | 抗生素 | l'an-ti-bi-Ò-ti-co
      per sette giorni | 七天 | per SET-te GIOR-ni
      restare a casa | 待在家里 | re-STA-re a CA-sa
      il braccio | 手臂 | il BRAC-cio
      la gamba | 腿 | la GAM-ba
      la schiena | 背 | la SCHIE-na
      lo stomaco | 胃 | lo STO-ma-co
      da tre giorni | 已经三天 | da TRE GIOR-ni
    `,
    pron: {
      t: 'tosse / bocca / schiena',
      tips: [
        '**tosse** TOS-se、**bocca** BOC-ca：ss、cc 都是长辅音；**schiena** SCHIE-na：sch 读 /sk/，h 保持硬音，ie 是二合元音。',
        '**antibiotico** an-ti-bi-Ò-ti-co：重音在 **Ò** 上（倒数第三音节），不要读成 an-ti-BIO-ti-co。',
      ],
      drill: `
        tosse | 咳嗽
        bocca | 嘴
        schiena | 背
        braccio | 手臂
        infezione | 感染
        antibiotico | 抗生素
        raffreddore | 感冒
      `,
    },
    gram: [
      {
        h: '身体部位（常用）',
        t: [
          ['中文', '意大利语', '中文', '意大利语'],
          ['头', 'la testa', '手', 'la mano（复数 le mani）'],
          ['眼睛', "l'occhio（复数 gli occhi）", '腿', 'la gamba'],
          ['耳朵', "l'orecchio", '脚', 'il piede'],
          ['鼻子', 'il naso', '背', 'la schiena'],
          ['嘴', 'la bocca', '肚子', 'la pancia'],
          ['手臂', 'il braccio', '胃', 'lo stomaco'],
        ],
        p: ['说身体部位时，意大利语用**定冠词**而不是物主词：Mi fa male **la** gola（我嗓子疼），不说 la mia gola。'],
      },
      {
        h: '症状 + da + 时间',
        p: ['"已经……多久了"用**现在时 + da + 时间段**（第 29 天）：**Ho la tosse da tre giorni**（我咳嗽三天了）。'],
        eg: ['Ho mal di testa da ieri. | 我从昨天起头疼。', 'Ho la febbre da due giorni. | 我发烧两天了。', 'Che cosa Le fa male? | 您哪里疼？'],
      },
      {
        h: '医生的指令（对"您"）',
        t: [
          ['指令', '意思'],
          ['Si accomodi.', '请坐。'],
          ['Apra la bocca.', '请张开嘴。'],
          ['Prenda questo farmaco.', '请服这个药。'],
          ['Beva molta acqua.', '请多喝水。'],
          ['Resti a casa.', '请待在家里。'],
          ['Si riposi.', '请休息。'],
        ],
      },
    ],
    culture: '意大利有**家庭医生（medico di base）**，晚上和周末有 **guardia medica**（值班医生）。游客急病可去 **pronto soccorso**（急诊）。**体温用摄氏度**：37.5 以上算发烧，说"三十八度二"就读 **trentotto e due**。',
    speak: `
      Mi fa male la gola. | 说嗓子疼
      Ho la tosse da tre giorni. | 说咳嗽三天了
      È grave, dottore? | 问：严重吗，医生？
      Posso andare al lavoro? | 问：我可以去上班吗
    `,
    wr: [
      '写 4 句话向医生描述你的症状：哪里不舒服、多久了、有没有发烧、问能不能上班。',
      'Dottore, mi fa male la gola da due giorni.\nHo anche la tosse e un po\' di febbre.\nÈ grave?\nPosso andare al lavoro?',
      '医生，我嗓子疼两天了。我还咳嗽，有点发烧。严重吗？我可以去上班吗？',
    ],
    quiz: [
      ['"我头疼"最自然的说法：', ['Mi fa male la testa.', 'Mi fa male la mia testa.', 'Ho male la testa.'], 0, '身体部位用定冠词。'],
      ['"我发烧两天了"：', ['Ho la febbre da due giorni.', 'Ho la febbre due giorni fa.', 'Ho avuto la febbre in due giorni.'], 0, '持续用 现在时 + da。'],
      ['医生说 Apra la bocca，是让你：', ['张开嘴', '闭上嘴', '吃药'], 0, 'aprire = 打开。'],
      ['"严重的"是：', ['grave', 'rosso', 'forte'], 0, 'grave = 严重。'],
    ],
  },

  // ───────────────────────── 第 45 天 ─────────────────────────
  {
    n: 45, it: 'Ti va di…?', zh: '邀请与计划',
    goal: '会用 Ti va di…? / Hai voglia di…? / Che ne dici di…? 发出邀请；会接受、婉拒、商量时间；会用现在时谈近期计划。',
    scene: '周四，Marco 在 WhatsApp 上给你发来周六聚会的邀请，你们来回商量时间和带什么。',
    dlg: `
      Marco: Ciao! Sabato sera facciamo una pizza da me. Ti va di venire? | 嗨！周六晚上我们在我家吃披萨。你想来吗？
      Li Ming: Che bella idea! Chi viene? | 好主意！谁来？
      Marco: Vengono Giulia, Chiara e qualche collega. | 朱莉娅、基娅拉和几个同事会来。
      Li Ming: A che ora? Posso portare qualcosa? | 几点？我能带点什么吗？
      Marco: Alle otto. Porta pure una bottiglia di vino, se vuoi. | 八点。如果你愿意，可以带一瓶酒。
      Li Ming: Perfetto. Allora ci vediamo sabato! | 好极了。那周六见！
      Marco: Ah, e se hai voglia, porta anche un dolce! | 啊，如果你有兴致，也带个甜点来！
    `,
    q: [
      ['聚会在什么时候？', ['周六晚上八点', '周日中午', '周五晚上'], 0, 'Sabato sera… alle otto。'],
      ['谁会来？', ['朱莉娅、基娅拉和几个同事', '只有朱莉娅', '全班同学'], 0, 'Giulia, Chiara e qualche collega。'],
      ['李明可以带什么？', ['一瓶酒（还有甜点）', '一束花', '什么都不用带'], 0, 'una bottiglia di vino… un dolce。'],
    ],
    vocab: `
      ti va di…? | 你想……吗？ | ti VA di
      hai voglia di…? | 你有兴致……吗？ | ai VO-glia di
      che ne dici di…? | 你觉得……怎么样？ | ke ne DI-ci di
      perché non…? | 为什么不……呢？ | per-CHÉ non
      che bella idea! | 好主意！ | ke BEL-la i-DE-a
      qualche | 一些；几个（+单数） | QUAL-che
      qualcosa | 某些东西 | qual-CO-sa
      portare | 带来 | por-TA-re
      pure | 尽管；也 | PU-re
      se vuoi | 如果你想 | se VUO-i
      il dolce | 甜点 | il DOL-ce
      organizzare | 组织；安排 | or-ga-niz-ZA-re
      la festa | 派对；节日 | la FE-sta
      confermare | 确认 | con-fer-MA-re
    `,
    pron: {
      t: '邀请的语调',
      tips: [
        '邀请句 **Ti va di venire?** 是是非疑问句，句末**上扬**；回答 **Volentieri! / Certo!** 要语调明亮、带热情。',
        '**qualche** QUAL-che：qu = /kw/，che 里的 h 保持硬音；**qualcosa** qual-CO-sa：重音在 CO。',
      ],
      drill: `
        ti va di venire | 你想来吗
        che bella idea | 好主意
        qualche collega | 几个同事
        qualcosa | 某些东西
        se vuoi | 如果你想
        volentieri | 乐意
      `,
    },
    gram: [
      {
        h: '邀请与回应',
        t: [
          ['功能', '说法'],
          ['发出邀请', 'Ti va di venire? / Hai voglia di venire? / Vieni anche tu?'],
          ['提议', 'Che ne dici di andare al cinema? / Perché non andiamo al mare?'],
          ['热情接受', 'Volentieri! / Che bella idea! / Ci sto!'],
          ['婉拒（给理由）', 'Mi dispiace, ma sono occupato. / Magari un\'altra volta.'],
          ['商量时间', 'A che ora? / Dove ci vediamo?'],
        ],
        p: ['**Ti va di + 动词原形？** 是最口语的邀请；**Ci sto!**（我加入！）是轻松的接受说法。', '注意对话里 Marco 说的 **Porta pure…**（你尽管带……）是对朋友（tu）的命令式：-are 动词的 tu 命令式与 lui / lei 的现在时形式相同（第 56 天系统学习）。'],
      },
      {
        h: '用现在时说近期计划',
        p: ['意大利语常用**现在时**表示"近期要做的事"，并加上将来的时间词：**Sabato facciamo una pizza.**（周六我们做披萨。）**Domani parto.**（我明天出发。）'],
        eg: ['Domani vado a Milano. | 我明天去米兰。', 'Stasera mangiamo fuori. | 今晚我们在外面吃。', 'Sabato vengono tutti. | 周六大家都来。'],
      },
      {
        h: 'qualche / qualcosa',
        p: ['**qualche + 单数名词**表示"一些、几个"（意思是复数，形式是单数）：qualche amico = 几个朋友。**qualcosa** = 某些东西：Vuoi qualcosa da bere?'],
      },
    ],
    text: {
      title: 'Un invito su WhatsApp',
      body: `
        Ciao Li Ming! Domenica faccio un barbecue in giardino. | 嗨李明！周日我在花园里烧烤。
        Vengono alcuni amici e qualche collega. | 会有几个朋友和几位同事来。

        Ti va di venire? Cominciamo verso l'una. | 你想来吗？我们一点左右开始。
        Porta pure il tuo costume, se vuoi fare il bagno in piscina! | 如果你想游泳，把泳衣带来吧！
        Ti aspetto! A presto, Marco | 我等你！回头见，马可
      `,
    },
    rq: [
      ['聚会是什么活动？', ['烧烤', '舞会', '音乐会'], 0, 'un barbecue in giardino。'],
      ['几点开始？', ['一点左右', '八点', '中午十二点'], 0, "verso l'una。"],
      ['为什么让他带泳衣？', ['可以在泳池游泳', '要去海边', '要去爬山'], 0, 'fare il bagno in piscina。'],
    ],
    culture: '意大利人邀请朋友常**很随意**，临近才发消息。回复时给个明确答复是礼貌的（Ci sono! / Mi dispiace, non posso）。**受邀去别人家时，带点小东西**（酒、甜点、花）几乎是默认规矩；准时抵达不是必须，**晚 10–15 分钟很常见**。',
    speak: `
      Ti va di venire sabato? | 邀请朋友周六来
      Che bella idea! Chi viene? | 说好主意，问谁来
      Posso portare qualcosa? | 问能带什么
      Mi dispiace, ma sono occupato. | 婉拒：很抱歉，我有事
    `,
    wr: [
      '给朋友写一条 4–5 句的邀请短信：邀请做什么、什么时候、在哪里、带什么、请他回复。',
      'Ciao! Sabato sera facciamo una cena da me.\nTi va di venire? Alle otto.\nPorta pure una bottiglia di vino.\nTi aspetto!',
      '嗨！周六晚上我们在我家吃晚饭。你想来吗？八点。可以带一瓶酒。我等你！',
    ],
    quiz: [
      ['"你想来吗？"最口语的说法：', ['Ti va di venire?', 'Vuoi tu venire?', 'Hai venire?'], 0, 'ti va di + 原形。'],
      ['qualche amico 的意思：', ['几个朋友', '一个朋友', '没有朋友'], 0, 'qualche + 单数 = 一些。'],
      ['"明天我出发"用现在时：', ['Domani parto.', 'Domani sono partire.', 'Domani partito.'], 0, '用现在时表示近期计划。'],
      ['热情接受邀请：', ['Volentieri!', 'Mi dispiace.', 'Non posso.'], 0, 'volentieri = 乐意。'],
    ],
  },

  // ───────────────────────── 第 46 天 ─────────────────────────
  {
    n: 46, it: 'Il fine settimana', zh: '周末与爱好',
    goal: '会谈运动和爱好（giocare a / suonare / andare in bicicletta）；会说频率（una volta alla settimana, ogni sabato, il martedì）。',
    scene: '周一上午，在办公室的咖啡机旁，你和同事 Chiara 聊起各自周末怎么过。',
    dlg: `
      Chiara: Che cosa fai di solito nel fine settimana? | 你周末通常做什么？
      Li Ming: Il sabato gioco a tennis con un collega. E tu? | 周六我和一个同事打网球。你呢？
      Chiara: Io vado spesso in bicicletta in campagna. | 我经常骑车去乡下。
      Li Ming: Che bello! Quante volte alla settimana ti alleni? | 真好！你每周训练几次？
      Chiara: Due volte, il martedì e il giovedì. | 两次，周二和周四。
      Li Ming: Io invece vado al cinema e cucino per gli amici. | 我则去看电影、给朋友们做饭。
    `,
    q: [
      ['李明周六做什么？', ['打网球', '骑自行车', '看电影'], 0, 'gioco a tennis。'],
      ['Chiara 每周训练几次？', ['两次', '一次', '三次'], 0, 'Due volte。'],
      ['Chiara 骑车去哪里？', ['乡下', '海边', '公园'], 0, 'in campagna。'],
    ],
    vocab: `
      giocare a | 玩；打（球类） | gio-CA-re a
      il tennis | 网球 | il TEN-nis
      la bicicletta | 自行车 | la bi-ci-CLET-ta
      la campagna | 乡下；田野 | la cam-PA-gna
      allenarsi | 训练；锻炼 | al-le-NAR-si
      la partita | 比赛 | la par-TI-ta
      la palestra | 健身房 | la pa-LE-stra
      la pallavolo | 排球 | la pal-la-VOL-lo
      correre | 跑步 | COR-re-re
      fare una passeggiata | 散步 | FA-re U-na pas-seg-GIA-ta
      una volta alla settimana | 每周一次 | U-na VOL-ta AL-la set-ti-MA-na
      due volte al mese | 每月两次 | DUE VOL-te al ME-se
      ogni sabato | 每个周六 | O-gni SA-ba-to
      il sabato | 每逢周六 | il SA-ba-to
    `,
    pron: {
      t: '运动词里的双辅音与重音',
      tips: [
        '**bicicletta** bi-ci-CLET-ta：两个 c 都是软音 /tʃ/，重音在 CLET；**pallavolo** pal-la-VO-lo：重音在 VO。',
        '**tennis** TEN-nis：nn 长；**palestra** pa-LE-stra：重音在 LE。',
      ],
      drill: `
        bicicletta | 自行车
        pallavolo | 排球
        palestra | 健身房
        tennis | 网球
        passeggiata | 散步
        campagna | 乡下
      `,
    },
    gram: [
      {
        h: 'giocare a + 运动 / suonare + 乐器',
        t: [
          ['动词', '搭配', '例句'],
          ['giocare a', '球类、游戏（不带冠词）', 'Gioco a tennis. / a calcio / a carte'],
          ['suonare', '乐器（带冠词）', 'Suono la chitarra. / il pianoforte'],
          ['fare', '一般运动', 'Faccio yoga. / ginnastica / nuoto'],
          ['andare in', '骑行、滑雪', 'Vado in bicicletta. / in montagna'],
        ],
      },
      {
        h: '频率怎么说',
        t: [
          ['说法', '意思', '例句'],
          ['il + 星期名', '每逢某天（习惯）', 'Il sabato gioco a tennis.'],
          ['ogni + 时间', '每……', 'Ogni mattina corro.'],
          ['una / due volte a + 时间', '每……几次', 'Due volte alla settimana.'],
          ['tutti i giorni / tutte le sere', '每天 / 每晚', 'Tutte le sere leggo.'],
        ],
        p: ['**Il sabato** = 每个周六（习惯），而 **sabato** 不加冠词 = 这个周六（一次性的）。'],
      },
    ],
    text: {
      title: 'Lo sport in Italia',
      body: `
        In Italia lo sport più amato è il calcio. | 在意大利最受欢迎的运动是足球。
        Molti italiani giocano a calcio con gli amici il sabato. | 很多意大利人周六和朋友们踢球。

        Ma ci sono anche il tennis, la pallavolo e il ciclismo. | 但也有网球、排球和自行车运动。
        Ogni anno il Giro d'Italia attraversa tutto il Paese in bicicletta. | 每年环意大利自行车赛都骑车穿越整个国家。
      `,
    },
    rq: [
      ['意大利最受欢迎的运动是？', ['足球', '网球', '排球'], 0, 'il calcio。'],
      ['Giro d\'Italia 是什么？', ['环意自行车赛', '足球联赛', '马拉松'], 0, "attraversa tutto il Paese in bicicletta。"],
    ],
    culture: '**Giro d\'Italia**（环意自行车赛）每年五月举行，是世界三大环赛之一，粉色（maglia rosa）领骑衫是荣誉象征。意大利人也热爱山地徒步、滑雪（阿尔卑斯和亚平宁山）和海边游泳——**四季都有好去处**。',
    speak: `
      Che cosa fai nel fine settimana? | 问对方周末做什么
      Il sabato gioco a tennis. | 说你每周六打网球（换成你的）
      Vado in bicicletta due volte alla settimana. | 说你每周骑两次车
      Quante volte alla settimana ti alleni? | 问对方每周训练几次
    `,
    wr: [
      '写 4–5 句话说你周末通常做什么，有哪些运动或爱好，多久一次。',
      'Il sabato mi alleno in palestra.\nLa domenica vado in bicicletta con gli amici.\nUna volta alla settimana gioco a tennis.\nMi piace molto lo sport!',
      '周六我在健身房训练。周日我和朋友们骑自行车。每周我打一次网球。我非常喜欢运动！',
    ],
    quiz: [
      ['"我打网球"：', ['Gioco a tennis.', 'Gioco il tennis.', 'Suono il tennis.'], 0, 'giocare a + 运动，不加冠词。'],
      ['"我弹吉他"：', ['Suono la chitarra.', 'Gioco a chitarra.', 'Faccio la chitarra.'], 0, 'suonare + 乐器（带冠词）。'],
      ['"每逢周六"（习惯）：', ['il sabato', 'sabato', 'in sabato'], 0, 'il + 星期 = 习惯。'],
      ['"每周两次"：', ['due volte alla settimana', 'due volte la settimana ogni', 'due settimana volte'], 0, 'due volte a + 时间。'],
    ],
  },

  // ───────────────────────── 第 47 天 ─────────────────────────
  {
    n: 47, it: 'Servizi in città', zh: '城市服务',
    goal: '会在游客信息处问地图、景点、银行营业时间；掌握代词 ci（"那里"）；会用 fino a / più di 等表达。',
    scene: '到佛罗伦萨的第一天，你来到共和国广场的游客信息处，拿地图并打听要去的地方。',
    dlg: `
      Li Ming: Buongiorno! Vorrei una mappa della città, per favore. | 早上好！请给我一张城市地图。
      Impiegata: Certo. Siamo qui, in piazza della Repubblica. | 当然。我们在这里，共和国广场。
      Li Ming: Come arrivo alla Galleria degli Uffizi? | 我怎么去乌菲齐美术馆？
      Impiegata: Ci può andare a piedi: sono dieci minuti. | 您可以走路去：十分钟。
      Li Ming: E c'è un bancomat qui vicino? | 附近有取款机吗？
      Impiegata: Sì, c'è un bancomat all'angolo. La banca è aperta fino alle quattro. | 有，拐角有一台。银行开到四点。
      Li Ming: Ci sono molti musei in città? | 这座城市有很多博物馆吗？
      Impiegata: Sì, più di settanta! | 有，有七十多个！
    `,
    q: [
      ['他们现在在哪里？', ['共和国广场', '乌菲齐美术馆', '火车站'], 0, 'in piazza della Repubblica。'],
      ['去乌菲齐要走多久？', ['十分钟', '半小时', '一小时'], 0, 'dieci minuti。'],
      ['银行开到几点？', ['四点', '五点', '六点'], 0, 'fino alle quattro。'],
    ],
    vocab: `
      la mappa | 地图 | la MAP-pa
      l'ufficio informazioni | 信息处；问讯处 | l'uf-FI-cio in-for-ma-ZIO-ni
      la galleria | 美术馆；走廊 | la gal-le-RI-a
      il turista | 游客 | il tu-RI-sta
      il quartiere | 街区；社区 | il quar-TIE-re
      il ponte | 桥 | il PON-te
      il comune | 市政厅 | il co-MU-ne
      la biblioteca | 图书馆 | la bi-blio-TE-ca
      aperto fino alle | 开到……点 | a-PER-to FI-no AL-le
      più di | 超过 | piu DI
      ci | 那里（代词） | CI
      ci vado | 我去那里 | ci VA-do
      all'angolo | 在拐角 | all'AN-go-lo
      la traversa | 横街；岔路 | la tra-VER-sa
    `,
    pron: {
      t: 'galleria / quartiere / biblioteca',
      tips: [
        '**galleria** gal-le-RI-a：重音在 RI，-ia 读两个音节；**quartiere** quar-TIE-re：ie 是二合元音。',
        '**biblioteca** bi-blio-TE-ca：重音在 TE；注意 -ca 读硬音 /ka/。',
      ],
      drill: `
        galleria | 美术馆
        quartiere | 街区
        biblioteca | 图书馆
        turista | 游客
        comune | 市政厅
        traversa | 横街
      `,
    },
    gram: [
      {
        h: 'ci：替代"到 / 在那里"',
        p: ['**ci** 作副词代词，替代"**a / in / da + 地点**"，表示"到那里 / 在那里"，位置和宾语代词相同（放在动词前）：**Ci vado a piedi**（我走路去那里）。'],
        eg: ['Vai al cinema? Sì, ci vado domani. | 你去电影院吗？是的，我明天去。', 'Ci vado spesso. | 我经常去那里。', 'Ci vuole mezz\'ora. | 需要半小时。'],
      },
      {
        h: '城市服务一览',
        t: [
          ['意大利语', '意思'],
          ["l'ufficio informazioni (IAT)", '游客信息处'],
          ['la banca / il bancomat', '银行 / 取款机'],
          ["l'ufficio postale", '邮局'],
          ['il comune', '市政厅'],
          ['la questura', '警察局（居留事务）'],
          ['la biblioteca', '图书馆'],
          ['la farmacia', '药店'],
        ],
      },
      {
        h: '时间与数量的表达',
        eg: ["La banca è aperta fino alle quattro. | 银行开到四点。", 'Ci sono più di settanta musei. | 有七十多个博物馆。', 'Aperto dalle nove alle sei. | 九点到六点营业。'],
      },
    ],
    text: {
      title: 'Benvenuti a Firenze',
      body: `
        Firenze è una città piccola, ma ricca di arte. | 佛罗伦萨是座小城，但艺术荣光。
        Il centro storico è vicino alla stazione e ci si può andare a piedi. | 老城区离车站很近，可以步行去。

        Ci sono più di settanta musei e molte chiese bellissime. | 这里有七十多座博物馆和许多美丽的教堂。
        L'ufficio informazioni è in piazza della Repubblica ed è aperto fino alle sei. | 游客信息处在共和国广场，营业到六点。
      `,
    },
    rq: [
      ['佛罗伦萨怎么样？', ['小城，艺术丰富', '大城，工业发达', '海边小镇'], 0, 'piccola, ma ricca di arte。'],
      ['游客信息处开到几点？', ['六点', '四点', '八点'], 0, 'aperto fino alle sei。'],
    ],
    culture: '意大利城市的**游客信息处（IAT / Ufficio Turistico）**通常免费提供地图和活动信息；很多城市还有 **city card**（景点通票）。**政府办事机构（comune、questura）**大多上午营业、需要预约——办事前先查清网站。',
    speak: `
      Vorrei una mappa della città. | 要一张城市地图
      Come arrivo alla Galleria degli Uffizi? | 问怎么去乌菲齐美术馆
      Ci vado a piedi. | 说你走路去那里
      La banca è aperta fino a che ora? | 问银行开到几点
    `,
    wr: [
      '写 4 句话在信息处提问：要地图、问一个景点怎么走、问取款机在哪、问营业时间。',
      'Buongiorno, vorrei una mappa della città.\nCome arrivo al Duomo?\nC\'è un bancomat qui vicino?\nFino a che ora è aperto il museo?',
      '早上好，请给我一张城市地图。我怎么去大教堂？附近有取款机吗？博物馆开到几点？',
    ],
    quiz: [
      ['"我明天去那里（电影院）"：', ['Ci vado domani.', 'Lo vado domani.', 'Vado ci domani.'], 0, 'ci 替代"到那里"。'],
      ['"银行开到四点"：', ['La banca è aperta fino alle quattro.', 'La banca è aperta da alle quattro.', 'La banca apre fino quattro.'], 0, 'fino a + 时间。'],
      ['più di settanta 的意思：', ['七十多个', '不到七十个', '七十个整'], 0, 'più di = 超过。'],
      ['ufficio postale 是：', ['邮局', '警察局', '市政厅'], 0, 'posta = 邮政。'],
    ],
  },

  // ───────────────────────── 第 48 天 ─────────────────────────
  {
    n: 48, it: "Com'è?", zh: '描述人物',
    goal: '会描述人的外貌和性格（alto, magro, biondo, simpatico, timido…）；掌握 essere / avere 在描述中的分工；会用 -issimo 表示"非常"。',
    scene: '你在车站等一位还没见过的朋友，Giulia 陪你等，并问你他长什么样。',
    dlg: `
      Giulia: Com'è il tuo amico Paolo? Non lo conosco. | 你的朋友保罗是什么样的？我不认识他。
      Li Ming: È alto e magro, con i capelli neri e corti. | 他又高又瘦，黑色短发。
      Giulia: Ha gli occhiali? | 他戴眼镜吗？
      Li Ming: Sì, porta sempre gli occhiali rotondi. È molto simpatico e un po' timido. | 是的，他总戴圆框眼镜。他很讨人喜欢，有点害羞。
      Giulia: E quanti anni ha? | 他多大了？
      Li Ming: Ha circa trent'anni, ma sembra più giovane. | 他大约三十岁，不过看起来更年轻。
      Giulia: Eccolo! È quello con la giacca blu? | 他来了！是穿蓝外套的那个吗？
      Li Ming: Sì, è lui! | 对，就是他！
    `,
    q: [
      ['保罗的头发怎么样？', ['黑色短发', '金色长发', '没有头发'], 0, 'capelli neri e corti。'],
      ['保罗的性格？', ['讨人喜欢，有点害羞', '很严肃', '很吵闹'], 0, 'simpatico e un po\' timido。'],
      ['保罗穿什么颜色的外套？', ['蓝色', '黑色', '红色'], 0, 'la giacca blu。'],
    ],
    vocab: `
      alto | 高的 | AL-to
      basso | 矮的 | BAS-so
      magro | 瘦的 | MA-gro
      giovane | 年轻的 | GIO-va-ne
      anziano | 年长的 | an-ZIA-no
      biondo | 金发的 | BION-do
      moro | 黑发的 | MO-ro
      i capelli | 头发 | i ca-PEL-li
      gli occhi | 眼睛 | gli OC-chi
      simpatico | 讨人喜欢的 | sim-PA-ti-co
      antipatico | 讨厌的 | an-ti-PA-ti-co
      timido | 害羞的 | TI-mi-do
      divertente | 有趣的 | di-ver-TEN-te
      serio | 严肃的；认真的 | SE-rio
      sembrare | 看起来 | sem-BRA-re
    `,
    pron: {
      t: 'capelli / occhi 里的 gli 和 cch',
      tips: [
        '**capelli** ca-PEL-li：ll 长；**occhi** OC-chi：cch 读长硬音 /kk/，chi 的 h 不发音。',
        '**simpatico / antipatico** 重音都在倒数第三音节 PA：sim-PA-ti-co、an-ti-PA-ti-co。',
      ],
      drill: `
        capelli | 头发
        occhi | 眼睛
        alto | 高的
        timido | 害羞的
        simpatico | 讨人喜欢
        antipatico | 讨厌的
        sembrare | 看起来
      `,
    },
    gram: [
      {
        h: '描述人：essere 与 avere',
        t: [
          ['用 essere（是）', '用 avere（有）'],
          ['È alto / basso / magro / giovane', 'Ha i capelli neri / biondi / lunghi / corti'],
          ['È simpatico / timido / serio', 'Ha gli occhi azzurri / castani / neri'],
          ['È un ragazzo alto', 'Ha la barba / i baffi / gli occhiali'],
        ],
        p: ['**essere + 形容词**描述整体特征；**avere + 身体部位**描述细节（头发、眼睛）。形容词要和人的性别数一致：una ragazza **alta**、dei ragazzi **alti**。'],
      },
      {
        h: '绝对最高级 -issimo：非常',
        p: ['去掉形容词末尾元音，加 **-issimo / -issima / -issimi / -issime**，表示"非常……"，等于 **molto + 形容词**：bello → **bellissimo**，simpatico → **simpaticissimo**，buono → **buonissimo**，alto → **altissimo**。'],
        eg: ["Il museo è bellissimo! | 这个博物馆美极了！", 'Marco è simpaticissimo. | 马可非常讨人喜欢。', 'Questa pizza è buonissima. | 这个披萨好吃极了。'],
      },
      {
        h: '看起来像：sembrare',
        eg: ['Sembra più giovane. | 他看起来更年轻。', 'Sembri stanco. | 你看起来很累。'],
      },
    ],
    text: {
      title: 'La mia amica Anna',
      body: `
        Anna è la mia migliore amica. | 安娜是我最好的朋友。
        È bassa, bionda e ha gli occhi azzurri. | 她个子不高，是金发，眼睛是蓝色的。

        È simpaticissima e molto divertente. | 她特别讨人喜欢，也非常有趣。
        Ha trentadue anni, ma sembra più giovane. | 她三十二岁，但看起来更年轻。
        Lavora come architetta in una grande azienda. | 她在一家大公司做建筑师。
      `,
    },
    rq: [
      ['安娜的头发和眼睛？', ['金发、蓝眼睛', '黑发、黑眼睛', '棕发、绿眼睛'], 0, 'bionda… occhi azzurri。'],
      ['安娜的职业是什么？', ['建筑师', '老师', '医生'], 0, 'architetta。'],
    ],
    culture: '意大利人**很看重外表和得体**（fare bella figura，给人留下好印象）。夸奖别人的衣服、发型、气质是社交里的自然礼节。但**直接评论体重、年龄**会显得冒昧——描述人时用 magro（瘦）比 grasso（胖）更中性，通常也更不会得罪人。',
    speak: `
      Com'è il tuo amico? | 问朋友长什么样
      È alto e magro, con i capelli neri. | 描述：又高又瘦，黑发
      È simpaticissimo e un po' timido. | 说他特别讨人喜欢，有点害羞
      Sembra più giovane. | 说他看起来更年轻
    `,
    wr: [
      '写 4–5 句话描述你的一位朋友或家人：外貌、性格、年龄、职业。',
      "Mia madre è bassa e ha i capelli neri.\nHa cinquant'anni ma sembra più giovane.\nÈ simpaticissima e molto gentile.\nLavora come insegnante.",
      '我妈妈个子不高，黑发。她五十岁，但看起来更年轻。她特别讨人喜欢，也很友善。她是老师。',
    ],
    quiz: [
      ['"他有黑头发"：', ['Ha i capelli neri.', 'È i capelli neri.', 'Ha capelli il nero.'], 0, '头发用 avere + 定冠词。'],
      ['bello 的绝对最高级（阳单）：', ['bellissimo', 'molto bellissimo', 'bellosimo'], 0, '-issimo。'],
      ['"她看起来很年轻"：', ['Sembra molto giovane.', 'Seme molto giovane.', 'È sembra giovane.'], 0, 'sembrare = 看起来。'],
      ['alto 的阴性复数：', ['alte', 'alti', 'alta'], 0, '阴性复数 -e。'],
    ],
  },

  // ───────────────────────── 第 49 天 ─────────────────────────
  {
    n: 49, it: 'Feste e tradizioni', zh: '节日与习俗',
    goal: '认识意大利主要节日和祝福语；会作为客人受邀参加家庭聚餐，会说客套话、夸赞饭菜、送祝福。',
    scene: '圣诞节，朱莉娅邀请你去她家过节。你带着礼物登门，认识了她的母亲，并品尝了传统菜肴。',
    dlg: `
      Giulia: Buon Natale, Li Ming! Entra, ti presento la mia famiglia. | 圣诞快乐，李明！进来，我给你介绍我的家人。
      Li Ming: Buon Natale! Questo è un piccolo regalo per voi. | 圣诞快乐！这是送你们的小礼物。
      Madre: Che pensiero gentile! Grazie! Accomodati a tavola. | 多么体贴！谢谢！请入座。
      Li Ming: Quante cose buone! A Natale mangiate sempre così? | 好多好吃的！圣诞节你们总是这样吃吗？
      Madre: Sì, abbiamo tanti piatti tradizionali: il cappone, i tortellini, il panettone. | 是的，我们有很多传统菜：阉鸡、小馄饨、潘妮托尼蛋糕。
      Li Ming: Tutto è delizioso! Complimenti alla cuoca! | 都太美味了！祝贺大厨！
      Madre: Grazie! Auguri a tutti e buon anno! | 谢谢！祝大家新年快乐！
    `,
    q: [
      ['李明带了什么来？', ['一份小礼物', '一瓶酒', '一束花'], 0, 'un piccolo regalo。'],
      ['传统菜里有什么甜点？', ['潘妮托尼蛋糕', '提拉米苏', '冰淇淋'], 0, 'il panettone。'],
      ['李明怎么夸奖？', ['祝贺大厨', '批评', '沉默'], 0, 'Complimenti alla cuoca!'],
    ],
    vocab: `
      il Natale | 圣诞节 | il na-TA-le
      il Capodanno | 新年；元旦 | il ca-po-DAN-no
      la Pasqua | 复活节 | la PA-squa
      Ferragosto | 圣母升天节（8月15日） | fer-ra-GO-sto
      gli auguri | 祝福 | gli au-GU-ri
      buon anno | 新年快乐 | buon AN-no
      il panettone | 潘妮托尼（圣诞甜面包） | il pa-net-TO-ne
      il pensiero | 心意；想法 | il pen-SIE-ro
      accomodarsi | 就座；请随意 | ac-co-mo-DAR-si
      ti presento | 我给你介绍 | ti pre-SEN-to
      la festa | 节日；派对 | la FE-sta
      la tradizione | 传统 | la tra-di-ZIO-ne
      tradizionale | 传统的 | tra-di-zio-NA-le
      delizioso | 美味的 | de-li-ZIO-so
      la cuoca | 女厨师 | la CUO-ca
    `,
    pron: {
      t: '节日词的重音',
      tips: [
        '**Natale** na-TA-le，**Pasqua** PA-squa（squa = /skwa/），**Capodanno** ca-po-DAN-no（nn 长）。',
        '**panettone** pa-net-TO-ne：tt 长，重音在 TO；**tradizionale** tra-di-zio-NA-le：-zione 里的 z 读 /ts/。',
      ],
      drill: `
        Natale | 圣诞节
        Pasqua | 复活节
        Capodanno | 新年
        Ferragosto | 圣母升天节
        panettone | 潘妮托尼
        tradizionale | 传统的
        delizioso | 美味的
      `,
    },
    gram: [
      {
        h: '节日祝福语',
        t: [
          ['场合', '祝福语'],
          ['圣诞节', 'Buon Natale!'],
          ['新年', 'Buon anno! / Buon Capodanno!'],
          ['复活节', 'Buona Pasqua!'],
          ['生日', 'Buon compleanno! / Tanti auguri!'],
          ['节日（泛指）', 'Buone feste!'],
          ['恭喜（结婚、毕业等）', 'Congratulazioni! / Complimenti!'],
        ],
        p: ['回答祝福：**Grazie, altrettanto!**（谢谢，你也一样！）或 **Auguri anche a te!**（也祝你！）'],
      },
      {
        h: '意大利主要节假日',
        t: [
          ['日期', '节日', '日期', '节日'],
          ['1/1', 'Capodanno', '1/5', 'Festa dei Lavoratori'],
          ['6/1', 'Epifania（Befana）', '2/6', 'Festa della Repubblica'],
          ['复活节后周一', 'Pasquetta', '15/8', 'Ferragosto'],
          ['25/4', 'Festa della Liberazione', '1/11', 'Ognissanti'],
          ['8/12', 'Immacolata', '25–26/12', 'Natale · Santo Stefano'],
        ],
      },
      {
        h: '做客的客套话',
        eg: ['Permesso? | 我可以进来吗？（进门时）', 'Accomodati! / Si accomodi! | 请坐！请随意！', 'Complimenti alla cuoca! | 向大厨致敬！', 'È tutto buonissimo! | 一切都好吃极了！'],
      },
    ],
    text: {
      title: 'Le feste in Italia',
      body: `
        A Natale gli italiani mangiano tanto con la famiglia. | 圣诞节意大利人和家人一起吃很多东西。
        Il 6 gennaio arriva la Befana, una vecchia signora con i regali per i bambini. | 一月六日，女巫婆贝法娜带着给孩子们的礼物来了。

        A Pasqua si mangia l'agnello e la colomba. | 复活节人们吃羊肉和鸽子形蛋糕。
        A Ferragosto, il 15 agosto, molte città si svuotano e tutti vanno al mare. | 八月十五日圣母升天节，许多城市变空，大家都去海边。
      `,
    },
    rq: [
      ['1 月 6 日谁来给孩子们送礼物？', ['贝法娜', '圣诞老人', '天使'], 0, 'la Befana。'],
      ['复活节吃什么？', ['羊肉和鸽子形蛋糕', '潘妮托尼', '提拉米苏'], 0, "l'agnello e la colomba。"],
      ['Ferragosto 时人们去哪里？', ['海边', '山里', '大城市'], 0, 'vanno al mare。'],
    ],
    culture: '**做客礼仪**：进门说 **Permesso?**，把带来的酒或甜点交给主人（别带菊花——那是丧葬用花）；**主人劝菜时，吃一点再拒绝会更礼貌**；吃完要夸饭菜。意大利的圣诞节在**家庭**中度过，**平安夜（24 日）吃鱼，圣诞节（25 日）吃肉**是许多地区的传统。',
    speak: `
      Buon Natale! Ecco un piccolo regalo per voi. | 送上礼物并祝圣诞快乐
      Che pensiero gentile! Grazie! | 收到礼物时的回应
      Complimenti alla cuoca! | 向主人夸奖饭菜
      Auguri a tutti e buon anno! | 向大家送上新年祝福
    `,
    wr: [
      '写一张 4–5 句的圣诞 / 新年贺卡，祝福你的意大利朋友一家，并说一件让你开心的事。',
      'Caro Marco, buon Natale a te e alla tua famiglia!\nGrazie per la bella cena.\nTutto era buonissimo!\nAuguri e buon anno!',
      '亲爱的马可，祝你和你的家人圣诞快乐！谢谢你们美好的晚餐。一切都好吃极了！祝福你，新年快乐！',
    ],
    quiz: [
      ['祝别人生日快乐：', ['Buon compleanno!', 'Buon Natale!', 'Buona Pasqua!'], 0, 'compleanno = 生日。'],
      ['别人说"Buon Natale"，你可以回答：', ['Grazie, altrettanto!', 'Prego!', 'Scusi!'], 0, 'altrettanto = 你也一样。'],
      ['进别人家时先说：', ['Permesso?', 'Arrivederci!', 'Il conto!'], 0, 'permesso = 我可以进来吗？'],
      ['意大利的圣母升天节是：', ['8 月 15 日', '12 月 25 日', '1 月 6 日'], 0, 'Ferragosto = 8 月 15 日。'],
    ],
  },

  // ───────────────────────── 第 50 天（岛屿关卡）─────────────────────────
  {
    n: 50, test: true, it: "Prova dell'isola 5", zh: '第五岛关卡：综合复习',
    goal: '把第 41–49 天的宾语代词、喜欢、衣服、看病、邀请、爱好、城市、描述人物和节日整合起来；学会表达惊讶、安慰、期待的口头语；通过 20 题关卡，拿到社交岛徽章。',
    scene: '周六晚上，你来到 Marco 的聚会。从送礼物、听说朋友生病，到被拉去跳舞，你要用本岛学到的东西应付各种社交场面。',
    dlg: `
      Marco: Ciao a tutti! Benvenuti alla mia festa! | 大家好！欢迎来参加我的派对！
      Li Ming: Ciao Marco! Questa è per te: una bottiglia di vino. | 嗨马可！这个给你：一瓶酒。
      Marco: Che pensiero! Grazie mille! | 多么贴心！非常感谢！
      Chiara: Che peccato, Giulia non può venire: ha la febbre. | 真可惜，朱莉娅来不了：她发烧了。
      Li Ming: Poverina! Le telefono domani. | 可怜的人！我明天给她打电话。
      Marco: Ti piace la musica? Ti va di ballare? | 你喜欢音乐吗？想跳舞吗？
      Li Ming: Non so ballare, ma ci provo! | 我不会跳舞，不过我试试！
      Chiara: Dai, non vedo l'ora di vederti ballare! | 来吧，我等不及要看你跳舞了！
    `,
    q: [
      ['李明带了什么礼物？', ['一瓶酒', '一束花', '一个蛋糕'], 0, 'una bottiglia di vino。'],
      ['朱莉娅为什么没来？', ['她发烧了', '她很忙', '她不喜欢聚会'], 0, 'ha la febbre。'],
      ['李明会跳舞吗？', ['不会，但愿意试试', '会，很擅长', '不想跳'], 0, 'Non so ballare, ma ci provo!'],
    ],
    vocab: `
      che peccato! | 真可惜！ | ke pec-CA-to
      che sorpresa! | 真是惊喜！ | ke sor-PRE-sa
      meno male! | 幸好！ | ME-no MA-le
      figurati! | 别客气！哪里哪里！ | fi-GU-ra-ti
      tranquillo | 放心的；别担心 | tran-QUIL-lo
      pazienza! | 没办法！算了！ | pa-ZIEN-za
      come mai? | 怎么会？为什么？ | CO-me MAI
      mi raccomando | 千万要；拜托了 | mi rac-co-MAN-do
      non vedo l'ora | 我迫不及待 | non VE-do l'O-ra
      poverino / poverina | 可怜的人 | po-ve-RI-no / po-ve-RI-na
      ci provo | 我试试 | ci PRO-vo
      buona serata | 祝你晚上愉快 | buo-na se-RA-ta
      alla prossima | 下次见 | AL-la PROS-si-ma
      dai! | 来吧！ | DAI
    `,
    pron: {
      t: '口头语的语调',
      tips: [
        '**Che peccato! / Meno male! / Pazienza!** 这类感叹要有**明显的升降语调**，语气才到位：Che pec-CA-to↘（失落）；Me-no MA-le↗（松一口气）。',
        '**non vedo l\'ora** 是"迫不及待"，用在期待某件好事：Non vedo l\'ora di partire!（我等不及要出发了！）',
      ],
      drill: `
        che peccato | 真可惜
        che sorpresa | 真惊喜
        meno male | 幸好
        pazienza | 没办法
        figurati | 别客气
        non vedo l'ora | 迫不及待
      `,
    },
    gram: [
      {
        h: '社交场合的万能感叹',
        t: [
          ['情境', '说法', '大意'],
          ['为别人遗憾', 'Che peccato! / Poverina!', '真可惜 / 可怜'],
          ['惊喜', 'Che sorpresa! / Che bello!', '真惊喜 / 真好'],
          ['松了口气', 'Meno male!', '幸好'],
          ['安慰', 'Tranquillo! / Pazienza! / Non fa niente!', '别担心 / 算了 / 没关系'],
          ['客气回应', 'Figurati! / Ci mancherebbe!', '哪里哪里'],
          ['期待', 'Non vedo l\'ora (di + 原形)!', '迫不及待'],
          ['叮嘱', 'Mi raccomando!', '千万要……（拜托了）'],
        ],
      },
      {
        h: '第五岛复盘：句型速查',
        t: [
          ['场景', '句型'],
          ['宾语代词', 'La compro. / Li vedo. / Gli telefono. / Le scrivo.'],
          ['喜欢', 'Mi piace… / Gli piacciono… / A me piace…'],
          ['衣服', 'Mi sta stretta. / È più cara di… / Ha una taglia più grande?'],
          ['看病', 'Mi fa male la gola. / Ho la tosse da tre giorni.'],
          ['邀请', 'Ti va di venire? / Volentieri! / Mi dispiace, ma…'],
          ['爱好', 'Gioco a tennis. / Il sabato vado in bicicletta.'],
          ['描述', 'È alto e magro. / Ha gli occhi azzurri. / bellissimo'],
        ],
      },
    ],
    text: {
      title: 'Un invito speciale',
      body: `
        Cara Giulia, mi dispiace molto: hai la febbre! | 亲爱的朱莉娅，我很难过：你发烧了！
        Ti telefono domani, ma ti scrivo subito: devi riposarti! | 我明天给你打电话，但先写信告诉你：你得好好休息！

        Quando stai meglio, ti va di cenare insieme? | 等你好些了，我们一起吃晚饭好吗？
        Cucino io: gli spaghetti, il tuo piatto preferito. | 我来做：意面，你最爱吃的菜。
        Un abbraccio, Li Ming | 拥抱你，李明
      `,
    },
    rq: [
      ['李明为什么写信给朱莉娅？', ['她生病了', '她过生日', '她搬家了'], 0, 'hai la febbre = 你发烧了。'],
      ['李明打算做什么菜？', ['意面', '披萨', '鱼'], 0, 'gli spaghetti。'],
    ],
    culture: '意大利人对**情绪表达很直接**：高兴、遗憾、惊讶都会写在脸上、说在嘴上。多用感叹词（Che bello! Che peccato! Meno male!）会让你的对话立刻生动、亲切起来。第五岛通关后，你已经能应付社交场合里的大部分日常场景。',
    speak: `
      Che peccato! Le telefono domani. | 表示遗憾，并说明天打电话
      Non so ballare, ma ci provo! | 说你不会跳舞，但愿意试试
      Non vedo l'ora di partire! | 说你迫不及待要出发
      Mi raccomando, ci vediamo sabato! | 叮嘱对方：千万别忘了周六见
    `,
    wr: [
      '给一位生病的朋友写 5–6 句话的慰问短信：表示遗憾、关心症状、说你会做什么、期待见面。',
      "Caro Marco, mi dispiace molto: stai male?\nHai ancora la febbre? Devi riposarti e bere molta acqua.\nTi telefono domani.\nNon vedo l'ora di rivederti!",
      '亲爱的马可，我很难过：你不舒服吗？你还在发烧吗？你得好好休息，多喝水。我明天给你打电话。我迫不及待想再见到你！',
    ],
    quiz: [
      ['别人说抱歉时，你轻松地回应"没关系"：', ['Figurati!', 'Che peccato!', 'Non vedo l\'ora!'], 0, 'figurati = 别客气。'],
      ['"真可惜！"：', ['Che peccato!', 'Meno male!', 'Che sorpresa!'], 0, 'peccato = 可惜。'],
      ['Non vedo l\'ora di partire 的意思：', ['我迫不及待要出发', '我不想出发', '我看不见时间'], 0, "non vedere l'ora = 迫不及待。"],
      ['"我给她打电话"：', ['Le telefono.', 'La telefono.', 'Gli telefono.'], 0, 'telefonare a lei → le。'],
    ],
  },
]);
