export type Language = "zh" | "ja" | "en";

export type LocalizedText = Record<Language, string>;

export type Topic = {
  id: string;
  color: string;
  title: LocalizedText;
  summary: LocalizedText;
  bullets: LocalizedText[];
};

export type StudyCard = {
  id: string;
  topicId: string;
  tag: LocalizedText;
  text: LocalizedText;
};

export type QuizItem = {
  id: string;
  topicId: string;
  question: LocalizedText;
  options: Record<Language, string[]>;
  answerIndex: number;
  explanation: LocalizedText;
};

export const TOPICS: Topic[] = [
  {
    id: "law",
    color: "#38bdf8",
    title: {
      zh: "法令与证照",
      ja: "法令と免状",
      en: "Law and Licensing",
    },
    summary: {
      zh: "整理许可、申报、免状与保安讲习的高频考点。",
      ja: "許可、届出、免状、保安講習の頻出論点を整理。",
      en: "Key points on permits, notifications, licenses, and safety training.",
    },
    bullets: [
      {
        zh: "甲种可处理全部类别；乙种仅限免状记载类别；丙种仅限第4类部分品目且不能立会监督。",
        ja: "甲種は全類、乙種は免状記載類、丙種は第4類の一部のみで立会い不可。",
        en: "Class A covers all classes; Class B only the listed class; Class C covers limited Class 4 items and cannot supervise.",
      },
      {
        zh: "免状由都道府县知事交付，姓名或本籍变更、照片满10年时需及时书换。",
        ja: "免状は都道府県知事交付。氏名や本籍変更、写真10年経過時は速やかに書換え。",
        en: "Licenses are issued by prefectural governors; changes to name or domicile and 10-year photo renewal require prompt replacement.",
      },
      {
        zh: "从事危险物作业者必须定期参加保安讲习，一般以首次4月1日起3年内为下次期限。",
        ja: "危険物作業従事者は定期保安講習が必要で、原則は最初の4月1日から3年以内。",
        en: "Workers handling hazardous materials need regular safety training, generally within 3 years from the first April 1 milestone.",
      },
      {
        zh: "转让、交付、废止、选任或解任监督者等多为遅滞なく申报。",
        ja: "譲渡、引渡し、廃止、監督者の選解任などは多くが遅滞なく届出。",
        en: "Transfers, discontinuation, and appointment or dismissal of supervisors are typically reported without delay.",
      },
    ],
  },
  {
    id: "quantity",
    color: "#f59e0b",
    title: {
      zh: "指定数量与分类",
      ja: "指定数量と分類",
      en: "Designated Quantities",
    },
    summary: {
      zh: "把第4类分类、指定数量和倍数计算压缩成速记框架。",
      ja: "第4類の分類、指定数量、倍数計算を速記用に整理。",
      en: "A compact framework for Class 4 grouping, designated quantities, and multiplier calculations.",
    },
    bullets: [
      {
        zh: "特殊引火物50L；第1石油类非水200L、水溶400L；酒精类400L。",
        ja: "特殊引火物50L、第1石油類は非水200L・水溶400L、アルコール類400L。",
        en: "Special flammables 50 L; Type 1 petroleum 200 L non-water-soluble and 400 L water-soluble; alcohols 400 L.",
      },
      {
        zh: "第2石油类1000L/2000L，第3石油类2000L/4000L，第4石油类6000L，动植物油10000L。",
        ja: "第2石油類1000L/2000L、第3石油類2000L/4000L、第4石油類6000L、動植物油類10000L。",
        en: "Type 2 petroleum 1000/2000 L, Type 3 petroleum 2000/4000 L, Type 4 petroleum 6000 L, animal and vegetable oils 10000 L.",
      },
      {
        zh: "倍数计算公式是各危险物储量除以各自指定数量后再求和。",
        ja: "倍数計算は各危険物の貯蔵量を指定数量で割って合算する。",
        en: "The multiplier is the sum of each stored amount divided by its own designated quantity.",
      },
      {
        zh: "倍数达到1以上时，原则上需在制造所等危险物设施中储藏或处理。",
        ja: "倍数が1以上なら原則として製造所等で貯蔵・取扱いする。",
        en: "Once the multiplier reaches 1 or more, storage or handling generally requires an authorized hazardous materials facility.",
      },
    ],
  },
  {
    id: "facility",
    color: "#22c55e",
    title: {
      zh: "设施与手续",
      ja: "施設と手続き",
      en: "Facilities and Procedures",
    },
    summary: {
      zh: "把制造所、储藏所、取扱所与许可流程拆成考试常考清单。",
      ja: "製造所、貯蔵所、取扱所と許可フローを試験向けに一覧化。",
      en: "An exam-focused checklist for facilities, storage sites, handling sites, and permit flow.",
    },
    bullets: [
      {
        zh: "危险物设施分为制造所、贮藏所、取扱所；贮藏所有7种，取扱所有4种。",
        ja: "危険物施設は製造所、貯蔵所、取扱所に分かれ、貯蔵所7種、取扱所4種。",
        en: "Hazardous facilities are manufacturing, storage, and handling sites; storage has 7 types and handling has 4 types.",
      },
      {
        zh: "设置或变更制造所等通常需先向市町村长等申请许可，完工后经完成检查合格方可使用。",
        ja: "設置・変更は原則として市町村長等の許可が先で、完成検査合格後に使用開始。",
        en: "Installation or modification generally needs prior approval from the local authority and successful completion inspection before use.",
      },
      {
        zh: "液体危险物储罐还要做完成检查前检查；罐体被埋设或遮盖前先受检。",
        ja: "液体危険物タンクは完成検査前検査も必要で、埋設や被覆前に検査する。",
        en: "Liquid hazardous-material tanks also need a pre-completion inspection before burial or covering.",
      },
      {
        zh: "临时存放或临时处理是少数例外，须经消防长或消防署长承认，期限10日以内。",
        ja: "仮貯蔵・仮取扱いは例外で、消防長または消防署長の承認と10日以内が条件。",
        en: "Temporary storage or handling is an exception and requires fire-chief approval with a 10-day limit.",
      },
    ],
  },
  {
    id: "chemistry",
    color: "#a78bfa",
    title: {
      zh: "物理与化学基础",
      ja: "物理と化学の基礎",
      en: "Physics and Chemistry",
    },
    summary: {
      zh: "提取状态变化、热、酸碱、氧化还原与有机化合物的必背概念。",
      ja: "状態変化、熱、酸塩基、酸化還元、有機化合物の必須概念を抽出。",
      en: "Core concepts on phase changes, heat, acids and bases, redox, and organic compounds.",
    },
    bullets: [
      {
        zh: "沸点是液体饱和蒸气压等于大气压时的温度；气压越低，沸点越低。",
        ja: "沸点は飽和蒸気圧と大気圧が等しい温度で、気圧が低いほど沸点も低い。",
        en: "Boiling point is the temperature where saturated vapor pressure equals atmospheric pressure; lower pressure means a lower boiling point.",
      },
      {
        zh: "比热越大越不容易升温；热容量=质量×比热。",
        ja: "比熱が大きいほど温まりにくく、熱容量は質量×比熱。",
        en: "Higher specific heat means slower temperature rise; heat capacity equals mass times specific heat.",
      },
      {
        zh: "酸在水中产生氢离子，碱产生氢氧根离子；pH小于7为酸性。",
        ja: "酸は水中で水素イオン、塩基は水酸化物イオンを生じ、pH7未満は酸性。",
        en: "Acids produce hydrogen ions in water, bases produce hydroxide ions, and pH below 7 is acidic.",
      },
      {
        zh: "有机化合物多含碳，通常不易溶于水、熔沸点较低，完全燃烧生成二氧化碳和水。",
        ja: "有機化合物は炭素を含み、水に溶けにくく、融点・沸点が低めで、完全燃焼で二酸化炭素と水を生じる。",
        en: "Organic compounds usually contain carbon, tend to be poorly soluble in water, often have lower melting and boiling points, and burn to carbon dioxide and water.",
      },
    ],
  },
  {
    id: "class4",
    color: "#fb7185",
    title: {
      zh: "第4类性质与储存",
      ja: "第4類の性質と貯蔵",
      en: "Class 4 Properties",
    },
    summary: {
      zh: "围绕闪点、蒸气比重、水溶性、静电与分类特征整理。",
      ja: "引火点、蒸気比重、水溶性、静電気、分類特徴を整理。",
      en: "Organized around flash point, vapor density, water solubility, static electricity, and group characteristics.",
    },
    bullets: [
      {
        zh: "第4类在常温常压下为液体，多数比水轻，但蒸气比重全部大于1，易滞留低处。",
        ja: "第4類は常温常圧で液体。多くは水より軽いが、蒸気比重はすべて1より大きく低所に滞留しやすい。",
        en: "Class 4 materials are liquids at ordinary conditions; many are lighter than water, but all have vapor density above 1 and can settle in low areas.",
      },
      {
        zh: "非水溶性物质多为不良导体，容易积聚静电。",
        ja: "非水溶性のものは不良導体が多く、静電気をためやすい。",
        en: "Many non-water-soluble materials are poor conductors and easily accumulate static electricity.",
      },
      {
        zh: "闪点或沸点越低，起火危险性通常越高；燃烧范围下限越低也越危险。",
        ja: "引火点や沸点が低いほど、また燃焼範囲下限が低いほど危険性が高い。",
        en: "Lower flash point or boiling point generally means higher ignition risk, and a lower lower-flammability limit also increases danger.",
      },
      {
        zh: "储存时要密闭、避光、阴凉并留有气相空间，保持通风并排到室外高处。",
        ja: "貯蔵は密閉・遮光・冷所・空間確保が基本で、換気し高所へ排気する。",
        en: "Storage should be sealed, shaded, cool, and leave vapor space, with ventilation exhausting to a high outdoor point.",
      },
    ],
  },
  {
    id: "fire",
    color: "#f97316",
    title: {
      zh: "燃烧、消火与应急",
      ja: "燃焼・消火・応急措置",
      en: "Combustion and Firefighting",
    },
    summary: {
      zh: "将燃烧三要素、灭火原理、适用灭火剂和事故应对归并到一组。",
      ja: "燃焼三要素、消火原理、適応消火剤、事故対応を一つに整理。",
      en: "Combines combustion essentials, extinguishing methods, suitable agents, and emergency response.",
    },
    bullets: [
      {
        zh: "燃烧三要素是可燃物、助燃物和点火源；灭火四要素则对应移除、窒息、冷却、抑制。",
        ja: "燃焼三要素は可燃物・助燃物・点火源で、消火は除去・窒息・冷却・抑制に対応する。",
        en: "The three combustion elements are fuel, oxidizer, and ignition source; extinguishing works by removal, smothering, cooling, or inhibition.",
      },
      {
        zh: "第4类火灾一般不适合用水和棒状强化液；醇类火灾要用水溶性液体用泡沫。",
        ja: "第4類火災では水と棒状強化液は原則不適で、アルコール火災には水溶性液体用泡沫を使う。",
        en: "Class 4 fires are generally unsuitable for water or jet-type enhanced liquid; alcohol fires need foam for water-soluble liquids.",
      },
      {
        zh: "粉末、二氧化碳、泡沫等是常见适用灭火剂；移动罐储藏所需配备车载灭火器。",
        ja: "粉末、二酸化炭素、泡沫が代表的で、移動タンク貯蔵所は車載消火器を備える。",
        en: "Dry chemical, carbon dioxide, and foam are common suitable agents, and mobile tank storage requires onboard extinguishers.",
      },
      {
        zh: "发生泄漏或事故时要立即采取应急措施，并向消防署、警察等机关通报。",
        ja: "漏えいなどの事故時は直ちに応急措置を講じ、消防署や警察へ通報する。",
        en: "Leaks or accidents require immediate emergency action and prompt reporting to fire and police authorities.",
      },
    ],
  },
];

export const STUDY_CARDS: StudyCard[] = [
  {
    id: "card-1",
    topicId: "quantity",
    tag: { zh: "指定数量", ja: "指定数量", en: "Quantity" },
    text: {
      zh: "特殊引火物的指定数量是50L。",
      ja: "特殊引火物の指定数量は50L。",
      en: "The designated quantity for special flammable materials is 50 L.",
    },
  },
  {
    id: "card-2",
    topicId: "quantity",
    tag: { zh: "指定数量", ja: "指定数量", en: "Quantity" },
    text: {
      zh: "第4石油类的指定数量是6000L。",
      ja: "第4石油類の指定数量は6000L。",
      en: "The designated quantity for Type 4 petroleum is 6000 L.",
    },
  },
  {
    id: "card-3",
    topicId: "quantity",
    tag: { zh: "倍数计算", ja: "倍数計算", en: "Multiplier" },
    text: {
      zh: "指定数量倍数=各危险物储量/各自指定数量的总和。",
      ja: "指定数量の倍数=各危険物の貯蔵量/指定数量の合計。",
      en: "The designated quantity multiplier is the sum of each stored amount divided by its own designated quantity.",
    },
  },
  {
    id: "card-4",
    topicId: "law",
    tag: { zh: "证照", ja: "免状", en: "License" },
    text: {
      zh: "甲种可处理所有类别；乙种仅限证上记载类别。",
      ja: "甲種は全類、乙種は免状記載の類のみ取扱可能。",
      en: "Class A handles all classes; Class B only the class listed on the license.",
    },
  },
  {
    id: "card-5",
    topicId: "law",
    tag: { zh: "讲习", ja: "講習", en: "Training" },
    text: {
      zh: "从事危险物作业者要定期接受保安讲习。",
      ja: "危険物作業従事者は定期的に保安講習を受ける。",
      en: "Workers who handle hazardous materials must take periodic safety training.",
    },
  },
  {
    id: "card-6",
    topicId: "facility",
    tag: { zh: "手续", ja: "手続き", en: "Procedure" },
    text: {
      zh: "制造所等设置或变更后，完成检查合格前不得使用。",
      ja: "製造所等は完成検査合格前に使用できない。",
      en: "A facility cannot be used before passing the completion inspection.",
    },
  },
  {
    id: "card-7",
    topicId: "facility",
    tag: { zh: "例外", ja: "例外", en: "Exception" },
    text: {
      zh: "仮貯蔵・仮取扱い需消防长或消防署长承认，且在10日以内。",
      ja: "仮貯蔵・仮取扱いは消防長または消防署長の承認が必要で10日以内。",
      en: "Temporary storage or handling needs approval from the fire chief and is limited to 10 days.",
    },
  },
  {
    id: "card-8",
    topicId: "chemistry",
    tag: { zh: "物理", ja: "物理", en: "Physics" },
    text: {
      zh: "大气压越低，液体沸点越低。",
      ja: "大気圧が低いほど液体の沸点は低い。",
      en: "The lower the atmospheric pressure, the lower the boiling point of a liquid.",
    },
  },
  {
    id: "card-9",
    topicId: "chemistry",
    tag: { zh: "酸碱", ja: "酸塩基", en: "Acid/Base" },
    text: {
      zh: "酸在水中产生氢离子，碱在水中产生氢氧根离子。",
      ja: "酸は水中で水素イオン、塩基は水酸化物イオンを生じる。",
      en: "Acids produce hydrogen ions in water, while bases produce hydroxide ions.",
    },
  },
  {
    id: "card-10",
    topicId: "class4",
    tag: { zh: "性质", ja: "性質", en: "Property" },
    text: {
      zh: "第4类危险物在常温常压下为液体。",
      ja: "第4類危険物は常温常圧で液体。",
      en: "Class 4 hazardous materials are liquids at normal conditions.",
    },
  },
  {
    id: "card-11",
    topicId: "class4",
    tag: { zh: "蒸气", ja: "蒸気", en: "Vapor" },
    text: {
      zh: "第4类蒸气比重都大于1，容易滞留在低处。",
      ja: "第4類の蒸気比重はすべて1より大きく、低所に滞留しやすい。",
      en: "All Class 4 vapors have density greater than 1 and tend to remain in low places.",
    },
  },
  {
    id: "card-12",
    topicId: "class4",
    tag: { zh: "静电", ja: "静電気", en: "Static" },
    text: {
      zh: "非水溶性第4类多为不良导体，容易积聚静电。",
      ja: "非水溶性の第4類は不良導体が多く、静電気をためやすい。",
      en: "Many non-water-soluble Class 4 materials are poor conductors and easily build static electricity.",
    },
  },
  {
    id: "card-13",
    topicId: "fire",
    tag: { zh: "燃烧", ja: "燃焼", en: "Combustion" },
    text: {
      zh: "燃烧三要素：可燃物、助燃物、点火源。",
      ja: "燃焼の三要素: 可燃物、助燃物、点火源。",
      en: "The three elements of combustion are fuel, oxidizer, and ignition source.",
    },
  },
  {
    id: "card-14",
    topicId: "fire",
    tag: { zh: "灭火", ja: "消火", en: "Extinguishing" },
    text: {
      zh: "第4类火灾一般不适合用水和棒状强化液灭火。",
      ja: "第4類火災では水や棒状強化液は原則として不適。",
      en: "Class 4 fires are generally unsuitable for water or jet-type enhanced liquid.",
    },
  },
  {
    id: "card-15",
    topicId: "fire",
    tag: { zh: "应急", ja: "応急", en: "Emergency" },
    text: {
      zh: "发生泄漏时要立即采取应急措施并通报消防署。",
      ja: "漏えい時は直ちに応急措置を取り、消防署へ通報する。",
      en: "In a leak, take emergency measures immediately and notify the fire department.",
    },
  },
];

export const QUIZ_ITEMS: QuizItem[] = [
  {
    id: "quiz-1",
    topicId: "quantity",
    question: {
      zh: "法令上，以下哪项不属于第4类危险物品名？（问1）",
      ja: "法令上、第4類危険物の品名に該当しないものはどれか。（問1）",
      en: "Which is not classified as a Class 4 hazardous material under the law? (Q1)",
    },
    options: {
      zh: ["特殊引火物", "第1石油类", "酒精类", "烷基铝", "第4石油类"],
      ja: ["特殊引火物", "第1石油類", "アルコール類", "アルキルアルミニウム", "第4石油類"],
      en: ["Special flammables", "Type 1 petroleum", "Alcohols", "Alkyl aluminum", "Type 4 petroleum"],
    },
    answerIndex: 3,
    explanation: {
      zh: "PDF 答案第1题为 4。",
      ja: "PDFの解答で問1は「4」。",
      en: "The PDF answer key marks Q1 as option 4.",
    },
  },
  {
    id: "quiz-2",
    topicId: "law",
    question: {
      zh: "关于“预防规程”的说明，哪项最恰当？（问2）",
      ja: "「予防規程」に関する説明として最も適切なものはどれか。（問2）",
      en: "Which statement best describes the prevention regulations? (Q2)",
    },
    options: {
      zh: [
        "规定保安监督者与取扱者职责",
        "规定点检内容",
        "为预防火灾规定危险物保安必要事项",
        "规定保安统括管理者职责",
        "汇总危险物危险性",
      ],
      ja: [
        "保安監督者・取扱者の責務を定める規程",
        "点検について定める規程",
        "火災予防のため保安上必要事項を定める規程",
        "保安統括管理者の責務を定める規程",
        "危険性をまとめた規程",
      ],
      en: [
        "Defines duties of safety supervisors and handlers",
        "Defines inspection items",
        "Defines necessary safety matters to prevent fires",
        "Defines duties of chief safety manager",
        "Summarizes hazards",
      ],
    },
    answerIndex: 2,
    explanation: {
      zh: "PDF 答案第2题为 3。",
      ja: "PDFの解答で問2は「3」。",
      en: "The PDF answer key marks Q2 as option 3.",
    },
  },
  {
    id: "quiz-3",
    topicId: "quantity",
    question: {
      zh: "A/B/C 三种危险物同地储存时，指定数量倍数的正确计算式是？（问3）",
      ja: "品名の異なる危険物A/B/Cを同一場所で貯蔵する場合の指定数量倍数の式はどれか。（問3）",
      en: "For storing A/B/C hazardous materials together, which multiplier formula is correct? (Q3)",
    },
    options: {
      zh: [
        "(A量+B量+C量)/(A指+B指+C指)",
        "(A量+B量+C量)/(A指×B指×C指)",
        "(A指+B指+C指)/(A量+B量+C量)",
        "A量/A指 + B量/B指 + C量/C指",
        "(A量×B量×C量)/(A指+B指+C指)",
      ],
      ja: [
        "(A貯蔵量+B貯蔵量+C貯蔵量)/(A指定+B指定+C指定)",
        "(A貯蔵量+B貯蔵量+C貯蔵量)/(A指定×B指定×C指定)",
        "(A指定+B指定+C指定)/(A貯蔵量+B貯蔵量+C貯蔵量)",
        "A貯蔵量/A指定 + B貯蔵量/B指定 + C貯蔵量/C指定",
        "(A貯蔵量×B貯蔵量×C貯蔵量)/(A指定+B指定+C指定)",
      ],
      en: [
        "(A+B+C stored)/(A+B+C designated)",
        "(A+B+C stored)/(A×B×C designated)",
        "(A+B+C designated)/(A+B+C stored)",
        "A stored/A designated + B stored/B designated + C stored/C designated",
        "(A×B×C stored)/(A+B+C designated)",
      ],
    },
    answerIndex: 3,
    explanation: {
      zh: "PDF 答案第3题为 4。",
      ja: "PDFの解答で問3は「4」。",
      en: "The PDF answer key marks Q3 as option 4.",
    },
  },
  {
    id: "quiz-4",
    topicId: "facility",
    question: {
      zh: "以下哪组设施必须与学校、医院等保持保安距离？（问4）",
      ja: "学校・病院等から保安距離を保つ規定がある施設の組合せはどれか。（問4）",
      en: "Which pair of facilities must maintain safety distance from schools/hospitals? (Q4)",
    },
    options: {
      zh: [
        "制造所 + 屋外罐贮藏所",
        "屋内罐贮藏所 + 地下罐贮藏所",
        "地下罐贮藏所 + 加油取扱所",
        "移动罐贮藏所 + 第2种贩卖取扱所",
        "制造所 + 第1种贩卖取扱所",
      ],
      ja: [
        "製造所 + 屋外タンク貯蔵所",
        "屋内タンク貯蔵所 + 地下タンク貯蔵所",
        "地下タンク貯蔵所 + 給油取扱所",
        "移動タンク貯蔵所 + 第2種販売取扱所",
        "製造所 + 第1種販売取扱所",
      ],
      en: [
        "Manufacturing + outdoor tank storage",
        "Indoor tank storage + underground tank storage",
        "Underground tank storage + service station",
        "Mobile tank storage + second-type sales handling",
        "Manufacturing + first-type sales handling",
      ],
    },
    answerIndex: 0,
    explanation: {
      zh: "PDF 答案第4题为 1。",
      ja: "PDFの解答で問4は「1」。",
      en: "The PDF answer key marks Q4 as option 1.",
    },
  },
  {
    id: "quiz-5",
    topicId: "fire",
    question: {
      zh: "第5种灭火设备中，哪种可适用于全部类别危险物？（问5）",
      ja: "第5種の消火設備で、すべての類の危険物に適応するのはどれか。（問5）",
      en: "Among Type 5 extinguishing equipment, which applies to all hazard classes? (Q5)",
    },
    options: {
      zh: ["磷酸盐类粉末灭火器", "雾状强化液灭火器", "泡沫灭火器", "膨胀珍珠岩", "哈龙灭火器"],
      ja: ["りん酸塩類粉末消火器", "霧状強化液消火器", "泡消火器", "膨張真珠岩", "ハロゲン化物消火器"],
      en: ["Phosphate dry chemical extinguisher", "Mist enhanced-liquid extinguisher", "Foam extinguisher", "Expanded perlite", "Halon extinguisher"],
    },
    answerIndex: 3,
    explanation: {
      zh: "PDF 答案第5题为 4。",
      ja: "PDFの解答で問5は「4」。",
      en: "The PDF answer key marks Q5 as option 4.",
    },
  },
  {
    id: "quiz-6",
    topicId: "facility",
    question: {
      zh: "关于制造所位置/构造/设备基准，哪项是错误的？（问6）",
      ja: "製造所の位置・構造・設備基準について誤っているものはどれか。（問6）",
      en: "Which statement about manufacturing site standards is incorrect? (Q6)",
    },
    options: {
      zh: [
        "设备应防止危险物泄漏/溢出/飞散",
        "温度变化设备应设温度测定装置",
        "所有加热或干燥设备都必须采用明火加热",
        "有压力上升风险设备应设压力计与安全装置",
        "静电风险设备应设静电去除装置",
      ],
      ja: [
        "漏れ・あふれ・飛散防止構造が必要",
        "温度変化設備には温度測定装置が必要",
        "加熱/乾燥設備はすべて直火加熱でなければならない",
        "圧力上昇のおそれ設備は圧力計・安全装置が必要",
        "静電気発生のおそれ設備は除去装置が必要",
      ],
      en: [
        "Must prevent leakage/spill/scatter",
        "Temperature-changing equipment needs temperature measurement",
        "All heating/drying equipment must use direct flame",
        "Pressure-risk equipment needs gauge and safety device",
        "Static-risk equipment needs removal device",
      ],
    },
    answerIndex: 2,
    explanation: {
      zh: "PDF 答案第6题为 3。",
      ja: "PDFの解答で問6は「3」。",
      en: "The PDF answer key marks Q6 as option 3.",
    },
  },
  {
    id: "quiz-7",
    topicId: "facility",
    question: {
      zh: "关于制造所设立/变更手续，哪项是错误的？（问7）",
      ja: "製造所の設置・変更手続きについて誤っているものはどれか。（問7）",
      en: "Which statement on manufacturing site setup/modification procedures is incorrect? (Q7)",
    },
    options: {
      zh: [
        "保有空地变更需要变更许可",
        "必须先做地下埋设配管的完成检查前检查后，才能做完成检查",
        "结构变更需先获许可再开工",
        "完工并交付完成检查证后可使用",
        "变更许可申请需附图纸等文件",
      ],
      ja: [
        "保有空地変更は変更許可が必要",
        "地下埋設配管の完成検査前検査後でなければ完成検査不可",
        "構造変更は許可後でなければ着工不可",
        "完成検査済証交付後は使用可能",
        "変更許可申請には図面等添付が必要",
      ],
      en: [
        "Changing reserved open space needs permit",
        "Completion inspection is impossible before pre-completion test of buried piping",
        "Structural changes require permit before construction",
        "Use is allowed after completion certificate issuance",
        "Change permit application requires drawings/documents",
      ],
    },
    answerIndex: 1,
    explanation: {
      zh: "PDF 答案第7题为 2。",
      ja: "PDFの解答で問7は「2」。",
      en: "The PDF answer key marks Q7 as option 2.",
    },
  },
  {
    id: "quiz-8",
    topicId: "law",
    question: {
      zh: "关于可被命令停止使用的事由，A-D 中“不属于事由”的组合是？（问8）",
      ja: "使用停止命令の事由について、A-Dで該当しないものの組合せはどれか。（問8）",
      en: "For suspension orders, which combination of A-D does NOT constitute grounds? (Q8)",
    },
    options: {
      zh: ["A,C", "A,C,D", "A,D", "B,C,D", "C,D"],
      ja: ["A,C", "A,C,D", "A,D", "B,C,D", "C,D"],
      en: ["A,C", "A,C,D", "A,D", "B,C,D", "C,D"],
    },
    answerIndex: 1,
    explanation: {
      zh: "PDF 答案第8题为 2。",
      ja: "PDFの解答で問8は「2」。",
      en: "The PDF answer key marks Q8 as option 2.",
    },
  },
  {
    id: "quiz-9",
    topicId: "law",
    question: {
      zh: "定期点检记录中，以下哪项并非规칙规定必须记载？（问9）",
      ja: "定期点検記録で、規則上の記載必須事項ではないものはどれか。（問9）",
      en: "In periodic inspection records, which item is NOT required by regulations? (Q9)",
    },
    options: {
      zh: [
        "实施点检的制造所等名称",
        "点检方法及结果",
        "点检年月日",
        "点检者/立会者姓名",
        "向市町村长等报告该点检日的年月日",
      ],
      ja: [
        "点検した製造所等の名称",
        "点検の方法および結果",
        "点検年月日",
        "点検者または立会者の氏名",
        "点検実施日を市町村長等へ報告した年月日",
      ],
      en: [
        "Name of facility inspected",
        "Method and result of inspection",
        "Inspection date",
        "Inspector/witness name",
        "Date when inspection date was reported to authority",
      ],
    },
    answerIndex: 4,
    explanation: {
      zh: "PDF 答案第9题为 5。",
      ja: "PDFの解答で問9は「5」。",
      en: "The PDF answer key marks Q9 as option 5.",
    },
  },
  {
    id: "quiz-10",
    topicId: "law",
    question: {
      zh: "关于免状书换/再交付申请对象知事，正确组合是？（问10）",
      ja: "免状の書換え・再交付申請先の知事について正しい組合せはどれか。（問10）",
      en: "Which combination of governors is correct for license rewrite/reissue applications? (Q10)",
    },
    options: {
      zh: ["组合1", "组合2", "组合3", "组合4", "组合5"],
      ja: ["組合せ1", "組合せ2", "組合せ3", "組合せ4", "組合せ5"],
      en: ["Combination 1", "Combination 2", "Combination 3", "Combination 4", "Combination 5"],
    },
    answerIndex: 3,
    explanation: {
      zh: "PDF 答案第10题为 4。",
      ja: "PDFの解答で問10は「4」。",
      en: "The PDF answer key marks Q10 as option 4.",
    },
  },
  {
    id: "quiz-11",
    topicId: "law",
    question: {
      zh: "法令上，以下哪项属于必须设置危险物保安监督者的制造所等？（问11）",
      ja: "法令上、危険物保安監督者を定めなければならない製造所等はどれか。（問11）",
      en: "Which facility must appoint a hazardous materials safety supervisor? (Q11)",
    },
    options: {
      zh: [
        "倍数30的屋外贮藏所",
        "倍数>30且进行容器分装的一般取扱所",
        "倍数>30的移动罐贮藏所",
        "倍数>30且仅扱40℃以上第4类的贩卖取扱所",
        "倍数>30且仅贮40℃以上第4类的屋内罐贮藏所",
      ],
      ja: [
        "指定数量倍数30の屋外貯蔵所",
        "倍数30超で危険物を容器詰替えする一般取扱所",
        "倍数30超の移動タンク貯蔵所",
        "倍数30超・引火点40℃以上のみの販売取扱所",
        "倍数30超・引火点40℃以上のみの屋内タンク貯蔵所",
      ],
      en: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
    },
    answerIndex: 1,
    explanation: { zh: "PDF 第11题答案=2。", ja: "PDFの問11は2。", en: "Q11 answer is 2 in PDF." },
  },
  {
    id: "quiz-12",
    topicId: "facility",
    question: {
      zh: "关于移动罐贮藏所的贮藏/取扱/移送，哪项错误？（问12）",
      ja: "移動タンク貯蔵所による貯蔵・取扱い・移送で誤っているものはどれか。（問12）",
      en: "Which statement about mobile tank storage handling/transport is incorrect? (Q12)",
    },
    options: {
      zh: ["完成检查证需备置", "仅移送危険等級I时才需资格者乘车", "移送乘车者需携带免状", "注入低引火点危険物时应停原动机", "消防吏员要求时应出示免状"],
      ja: ["完成検査済証の備付け", "危険等級I移送時のみ危険物取扱者が乗車", "乗車中の取扱者は免状携帯", "注入時は原動機停止", "提示要求時は免状提示"],
      en: ["1", "2", "3", "4", "5"],
    },
    answerIndex: 1,
    explanation: { zh: "PDF 第12题答案=2。", ja: "PDFの問12は2。", en: "Q12 answer is 2." },
  },
  {
    id: "quiz-13",
    topicId: "facility",
    question: {
      zh: "需要接受保安检查的制造所等组合，哪项正确？（问13）",
      ja: "保安に関する検査対象となる製造所等の組合せとして正しいものはどれか。（問13）",
      en: "Which combination is subject to safety inspection? (Q13)",
    },
    options: {
      zh: ["地下罐+给油", "屋外罐+移送取扱", "地下罐+屋外罐", "制造所+给油", "制造所+移送"],
      ja: ["地下タンク+給油", "屋外タンク+移送取扱所", "地下タンク+屋外タンク", "製造所+給油", "製造所+移送"],
      en: ["1", "2", "3", "4", "5"],
    },
    answerIndex: 1,
    explanation: { zh: "PDF 第13题答案=2。", ja: "PDFの問13は2。", en: "Q13 answer is 2." },
  },
  {
    id: "quiz-14",
    topicId: "law",
    question: {
      zh: "运输容器外部标示的注意事项，哪项正确？（问14）",
      ja: "運搬容器外部の注意事項表示として正しいものはどれか。（問14）",
      en: "Which external warning label for transport containers is correct? (Q14)",
    },
    options: {
      zh: ["第2类: 冲击注意", "第3类: 火气/冲击注意", "第4类: 火气厳禁", "第5类: 取扱注意", "第6类: 火气注意"],
      ja: ["第2類: 衝撃注意", "第3類: 火気・衝撃注意", "第4類: 火気厳禁", "第5類: 取扱注意", "第6類: 火気注意"],
      en: ["1", "2", "3", "4", "5"],
    },
    answerIndex: 2,
    explanation: { zh: "PDF 第14题答案=3。", ja: "PDFの問14は3。", en: "Q14 answer is 3." },
  },
  {
    id: "quiz-15",
    topicId: "facility",
    question: {
      zh: "给油取扱所中顾客用固定注油设备（灯油）彩色应为何色？（问15）",
      ja: "給油取扱所で灯油用の顧客用固定注油設備の彩色は何色か。（問15）",
      en: "What color is used for customer kerosene fixed filling equipment? (Q15)",
    },
    options: { zh: ["红", "蓝", "白", "黄", "绿"], ja: ["赤", "青", "白", "黄", "緑"], en: ["Red", "Blue", "White", "Yellow", "Green"] },
    answerIndex: 1,
    explanation: { zh: "PDF 第15题答案=2。", ja: "PDFの問15は2。", en: "Q15 answer is 2." },
  },
  {
    id: "quiz-16",
    topicId: "chemistry",
    question: {
      zh: "以下哪组不会发生燃烧？（问16）",
      ja: "次の組合せで燃焼が起こらないものはどれか。（問16）",
      en: "Which combination does not combust? (Q16)",
    },
    options: {
      zh: ["静电火花-氦-氧", "打火机火焰-氢-空气", "氧化热-炸物残渣-氧", "电火花-一氧化碳-空气", "冲击火花-二硫化碳-氧"],
      ja: ["静電気火花-ヘリウム-酸素", "ライター炎-水素-空気", "酸化熱-揚げかす-酸素", "電気火花-一酸化炭素-空気", "衝撃火花-二硫化炭素-酸素"],
      en: ["1", "2", "3", "4", "5"],
    },
    answerIndex: 0,
    explanation: { zh: "PDF 第16题答案=1。", ja: "PDFの問16は1。", en: "Q16 answer is 1." },
  },
  {
    id: "quiz-17",
    topicId: "chemistry",
    question: { zh: "燃烧叙述中 A/B/C 哪些有误？（问17）", ja: "燃焼の文章で誤っているのはどれか。（問17）", en: "Which underlined parts are incorrect? (Q17)" },
    options: { zh: ["仅B", "仅C", "A与B", "A与C", "A/B/C"], ja: ["B", "C", "A・B", "A・C", "A・B・C"], en: ["B", "C", "A,B", "A,C", "A,B,C"] },
    answerIndex: 0,
    explanation: { zh: "PDF 第17题答案=1。", ja: "PDFの問17は1。", en: "Q17 answer is 1." },
  },
  {
    id: "quiz-18",
    topicId: "chemistry",
    question: { zh: "可燃液体蒸气遇火源可引火的最低温度称为？（问18）", ja: "可燃性液体蒸気が着火源で引火する最低温度を何というか。（問18）", en: "Minimum temperature at which vapor ignites is called? (Q18)" },
    options: { zh: ["燃烧点", "三重点", "发火点", "引火点", "沸点"], ja: ["燃焼点", "三重点", "発火点", "引火点", "沸点"], en: ["Combustion point", "Triple point", "Autoignition point", "Flash point", "Boiling point"] },
    answerIndex: 3,
    explanation: { zh: "PDF 第18题答案=4。", ja: "PDFの問18は4。", en: "Q18 answer is 4." },
  },
  {
    id: "quiz-19",
    topicId: "fire",
    question: { zh: "关于气体灭火剂说明，哪项错误？（问19）", ja: "気体消火剤に関する説明で誤っているものはどれか。（問19）", en: "Which statement about gaseous extinguishing agents is wrong? (Q19)" },
    options: { zh: ["哈龙有抑制燃烧反应效果", "氮气靠降氧灭火", "二氧化碳适用于电气火灾", "不活性气体包含二氧化碳与氮气", "二氧化碳浓度升高对人体无不良影响"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 4,
    explanation: { zh: "PDF 第19题答案=5。", ja: "PDFの問19は5。", en: "Q19 answer is 5." },
  },
  {
    id: "quiz-20",
    topicId: "chemistry",
    question: { zh: "自然发火机理中 A/B/C 词语组合，哪项正确？（问20）", ja: "自然発火の機構でA/B/Cの語句組合せとして正しいものはどれか。（問20）", en: "Which A/B/C combination for spontaneous ignition mechanism is correct? (Q20)" },
    options: { zh: ["吸着/氧化/分解", "分解/氧化/吸着", "氧化/吸着/分解", "吸着/分解/氧化", "分解/吸着/氧化"], ja: ["吸着/酸化/分解", "分解/酸化/吸着", "酸化/吸着/分解", "吸着/分解/酸化", "分解/吸着/酸化"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 4,
    explanation: { zh: "PDF 第20题答案=5。", ja: "PDFの問20は5。", en: "Q20 answer is 5." },
  },
  {
    id: "quiz-21",
    topicId: "chemistry",
    question: { zh: "关于静电，哪项错误？（问21）", ja: "静電気に関する説明で誤っているものはどれか。（問21）", en: "Which statement about static electricity is wrong? (Q21)" },
    options: { zh: ["良导体感应分离电荷", "静止电荷称静电", "可用箔检电器检测", "摩擦时是阳子移动导致带电", "电荷守恒"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 3,
    explanation: { zh: "PDF 第21题答案=4。", ja: "PDFの問21は4。", en: "Q21 answer is 4." },
  },
  {
    id: "quiz-22",
    topicId: "chemistry",
    question: { zh: "已知燃烧热，丙烷生成热正确值是？（问22）", ja: "燃焼熱が与えられたとき、プロパンの生成熱として正しいものはどれか。（問22）", en: "Given heats of combustion, which is propane's heat of formation? (Q22)" },
    options: { zh: ["107 kJ/mol", "215 kJ/mol", "1539 kJ/mol", "2899 kJ/mol", "4545 kJ/mol"], ja: ["107", "215", "1539", "2899", "4545"], en: ["107", "215", "1539", "2899", "4545"] },
    answerIndex: 0,
    explanation: { zh: "PDF 第22题答案=1。", ja: "PDFの問22は1。", en: "Q22 answer is 1." },
  },
  {
    id: "quiz-23",
    topicId: "chemistry",
    question: { zh: "以下哪项是单体？（问23）", ja: "単体であるものはどれか。（問23）", en: "Which is an elemental substance? (Q23)" },
    options: { zh: ["水", "硫黄", "二氧化碳", "灯油", "氯化钠"], ja: ["水", "硫黄", "二酸化炭素", "灯油", "塩化ナトリウム"], en: ["Water", "Sulfur", "Carbon dioxide", "Kerosene", "Sodium chloride"] },
    answerIndex: 1,
    explanation: { zh: "PDF 第23题答案=2。", ja: "PDFの問23は2。", en: "Q23 answer is 2." },
  },
  {
    id: "quiz-24",
    topicId: "chemistry",
    question: { zh: "钢制埋设配管防电化学腐蚀，接续哪组异种金属有效？（问24）", ja: "鋼製埋設配管の電気化学的腐食防止に有効な異種金属の組合せはどれか。（問24）", en: "Which dissimilar metals protect steel buried pipes from electrochemical corrosion? (Q24)" },
    options: { zh: ["A+B", "A+E", "B+C", "C+D", "D+E"], ja: ["AとB", "AとE", "BとC", "CとD", "DとE"], en: ["A+B", "A+E", "B+C", "C+D", "D+E"] },
    answerIndex: 3,
    explanation: { zh: "PDF 第24题答案=4。", ja: "PDFの問24は4。", en: "Q24 answer is 4." },
  },
  {
    id: "quiz-25",
    topicId: "chemistry",
    question: { zh: "关于物质状态变化，哪项错误？（问25）", ja: "物質の状態変化について誤っているものはどれか。（問25）", en: "Which statement about phase changes is wrong? (Q25)" },
    options: { zh: ["水有气/液/固三态", "状态变化伴随热出入", "外压越高沸点越低", "固体直接变气体称升华", "固液互变为融解/凝固"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 2,
    explanation: { zh: "PDF 第25题答案=3。", ja: "PDFの問25は3。", en: "Q25 answer is 3." },
  },
  {
    id: "quiz-26",
    topicId: "class4",
    question: { zh: "按类共通性状，哪项不妥当？（问26）", ja: "危険物の類ごと共通性状として妥当でないものはどれか。（問26）", en: "Which general property by class is not valid? (Q26)" },
    options: { zh: ["第1类多为无色或白色氧化性固体", "第2类有些燃烧产毒气，金属粉遇水/酸可发热发火", "第3类同时具有自然发火与禁水两种危险", "第5类燃速大，受热/冲击/摩擦有发火爆炸危险", "第6类不燃但强氧化、多腐蚀且蒸气有毒"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 2,
    explanation: { zh: "PDF 第26题答案=3。", ja: "PDFの問26は3。", en: "Q26 answer is 3." },
  },
  {
    id: "quiz-27",
    topicId: "class4",
    question: { zh: "第4类贮藏与取扱注意事项中，哪项错误？（问27）", ja: "第4類の貯蔵・取扱い注意事項として誤っているものはどれか。（問27）", en: "Which precaution for Class 4 storage/handling is wrong? (Q27)" },
    options: { zh: ["远离火花和高热", "尽量抑制搅拌/流动产生静电", "蒸气尽量排向屋外低处", "注意液体和蒸气泄漏", "取扱引火性危险物时应去除人体静电"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 2,
    explanation: { zh: "PDF 第27题答案=3。", ja: "PDFの問27は3。", en: "Q27 answer is 3." },
  },
  {
    id: "quiz-28",
    topicId: "fire",
    question: { zh: "第1石油类火灾预防中，哪项错误？（问28）", ja: "第1石油類の火災予防として誤っているものはどれか。（問28）", en: "Which fire-prevention measure for Type 1 petroleum is wrong? (Q28)" },
    options: { zh: ["为减少静电应在流动/过滤时短时间高速操作", "蒸气可能沿地面扩散并积于低处", "作业时不穿绝缘性好的鞋及化纤衣", "贮藏与取扱应充分换气", "仓库电气设备应使用防爆结构"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 0,
    explanation: { zh: "PDF 第28题答案=1。", ja: "PDFの問28は1。", en: "Q28 answer is 1." },
  },
  {
    id: "quiz-29",
    topicId: "class4",
    question: { zh: "第4类危险物贮藏中，哪项错误？（问29）", ja: "第4類危険物の貯蔵で誤っているものはどれか。（問29）", en: "Which statement about Class 4 storage is wrong? (Q29)" },
    options: { zh: ["防引火，不可随意接近火源", "防蒸气发生，容器密栓", "防蒸气滞留，保持通风换气", "为防自然发火，必须把液温保持在引火点以下", "有的危险物可在液面覆盖水层贮藏"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 3,
    explanation: { zh: "PDF 第29题答案=4。", ja: "PDFの問29は4。", en: "Q29 answer is 4." },
  },
  {
    id: "quiz-30",
    topicId: "fire",
    question: { zh: "第4类火灾使用灭火剂，哪项错误？（问30）", ja: "第4類危険物火災での消火剤使用として誤っているものはどれか。（問30）", en: "Which extinguishing-agent use for Class 4 fires is wrong? (Q30)" },
    options: { zh: ["重油火灾用泡沫", "甲苯火灾用二氧化碳", "轻油火灾用卤化物", "苯火灾用磷酸盐粉末", "汽油火灾用棒状水"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 4,
    explanation: { zh: "PDF 第30题答案=5。", ja: "PDFの問30は5。", en: "Q30 answer is 5." },
  },
  {
    id: "quiz-31",
    topicId: "class4",
    question: { zh: "关于汽车汽油性状，哪项错误？（问31）", ja: "自動車ガソリンの性状について誤っているものはどれか。（問31）", en: "Which statement about gasoline properties is wrong? (Q31)" },
    options: { zh: ["引火点≤-40℃", "流动易生静电", "比水轻", "燃烧范围约1~8vol%", "为防与灯油混淆，着淡青色"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 4,
    explanation: { zh: "PDF 第31题答案=5。", ja: "PDFの問31は5。", en: "Q31 answer is 5." },
  },
  {
    id: "quiz-32",
    topicId: "class4",
    question: { zh: "关于二甲苯性状，哪项错误？（问32）", ja: "キシレンの性状について誤っているものはどれか。（問32）", en: "Which statement about xylene is wrong? (Q32)" },
    options: { zh: ["淡黄色液体", "不溶于水", "引火点≤35℃", "沸点高于水", "用作涂料等溶剂"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 0,
    explanation: { zh: "PDF 第32题答案=1。", ja: "PDFの問32は1。", en: "Q32 answer is 1." },
  },
  {
    id: "quiz-33",
    topicId: "class4",
    question: { zh: "关于甘油性状，哪项不妥当？（问33）", ja: "グリセリンの性状について妥当でないものはどれか。（問33）", en: "Which statement about glycerin is not appropriate? (Q33)" },
    options: { zh: ["无色粘稠液体", "有吸湿性", "比重大于1", "具有特有芳香", "溶于水和乙醇"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 3,
    explanation: { zh: "PDF 第33题答案=4。", ja: "PDFの問33は4。", en: "Q33 answer is 4." },
  },
  {
    id: "quiz-34",
    topicId: "class4",
    question: { zh: "关于乙醛性状，哪项错误？（问34）", ja: "アセトアルデヒドの性状について誤っているものはどれか。（問34）", en: "Which statement about acetaldehyde is wrong? (Q34)" },
    options: { zh: ["被氧化会成醋酸", "可与水和乙醇任意比互溶", "强还原性物质", "受热或光分解生成甲烷与二氧化碳", "常温20℃有引火危险"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 3,
    explanation: { zh: "PDF 第34题答案=4。", ja: "PDFの問34は4。", en: "Q34 answer is 4." },
  },
  {
    id: "quiz-35",
    topicId: "class4",
    question: { zh: "关于丙酮性状，哪项错误？（问35）", ja: "アセトンの性状について誤っているものはどれか。（問35）", en: "Which statement about acetone is wrong? (Q35)" },
    options: { zh: ["无色无臭液体", "与水任意比混合", "引火点低于常温20℃", "比水轻", "溶于醇和醚"], ja: ["1", "2", "3", "4", "5"], en: ["1", "2", "3", "4", "5"] },
    answerIndex: 0,
    explanation: { zh: "PDF 第35题答案=1。", ja: "PDFの問35は1。", en: "Q35 answer is 1." },
  },
];
