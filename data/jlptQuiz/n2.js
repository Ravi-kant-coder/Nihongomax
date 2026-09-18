const n2Questions = [
  // =========================
  // KANJI
  // =========================

  {
    id: "n2-001",
    type: "kanji",
    question: "「責任」は何と読みますか？",
    choices: ["せきにん", "せきじん", "ぜきにん", "せっにん"],
    answer: 0,
  },

  {
    id: "n2-002",
    type: "kanji",
    question: "「判断」は何と読みますか？",
    choices: ["はんだん", "ばんたん", "はんたん", "はんでん"],
    answer: 0,
  },

  {
    id: "n2-003",
    type: "kanji",
    question: "「制度」の意味はどれですか？",
    choices: ["System / Institution", "Situation", "Reason", "Relationship"],
    answer: 0,
  },

  {
    id: "n2-004",
    type: "kanji",
    question: "「政策」は何と読みますか？",
    choices: ["せいさく", "せいざく", "せいせき", "しょうさく"],
    answer: 0,
  },

  {
    id: "n2-005",
    type: "kanji",
    question: "「改善」の意味はどれですか？",
    choices: ["Improvement", "Agreement", "Competition", "Explanation"],
    answer: 0,
  },

  {
    id: "n2-006",
    type: "kanji",
    question: "「維持」は何と読みますか？",
    choices: ["いじ", "いし", "ゆじ", "いち"],
    answer: 0,
  },

  {
    id: "n2-007",
    type: "kanji",
    question: "「傾向」の意味はどれですか？",
    choices: ["Trend / Tendency", "Purpose", "Permission", "Method"],
    answer: 0,
  },

  {
    id: "n2-008",
    type: "kanji",
    question: "「比較」は何と読みますか？",
    choices: ["ひかく", "ひがく", "びかく", "ひこう"],
    answer: 0,
  },

  {
    id: "n2-009",
    type: "kanji",
    question: "「影響」の意味はどれですか？",
    choices: ["Influence / Effect", "Cause", "Condition", "Result"],
    answer: 0,
  },

  {
    id: "n2-010",
    type: "kanji",
    question: "「解決」は何と読みますか？",
    choices: ["かいけつ", "かいげつ", "がいけつ", "かいせつ"],
    answer: 0,
  },

  // =========================
  // VOCABULARY
  // =========================

  {
    id: "n2-011",
    type: "vocabulary",
    question: "「あらかじめ」の意味はどれですか？",
    choices: ["In advance", "Suddenly", "Eventually", "Rarely"],
    answer: 0,
  },

  {
    id: "n2-012",
    type: "vocabulary",
    question: "「おおよそ」の意味はどれですか？",
    choices: ["Approximately", "Exactly", "Completely", "Immediately"],
    answer: 0,
  },

  {
    id: "n2-013",
    type: "vocabulary",
    question: "「一応」の意味に一番近いものはどれですか？",
    choices: [
      "For the time being / Just in case",
      "Definitely",
      "Never",
      "Especially",
    ],
    answer: 0,
  },

  {
    id: "n2-014",
    type: "vocabulary",
    question: "「むしろ」の意味に一番近いものはどれですか？",
    choices: ["Rather / Instead", "Almost", "Together", "Certainly"],
    answer: 0,
  },

  {
    id: "n2-015",
    type: "vocabulary",
    question: "「あまりにも」の意味はどれですか？",
    choices: ["Too / Excessively", "Almost", "Slightly", "Rarely"],
    answer: 0,
  },

  {
    id: "n2-016",
    type: "vocabulary",
    question: "「せっかく」の意味に一番近いものはどれですか？",
    choices: [
      "With effort / Taking the trouble",
      "Suddenly",
      "Without permission",
      "By chance",
    ],
    answer: 0,
  },

  {
    id: "n2-017",
    type: "vocabulary",
    question: "「わざわざ」の意味はどれですか？",
    choices: ["Going out of one's way", "Immediately", "Naturally", "Almost"],
    answer: 0,
  },

  {
    id: "n2-018",
    type: "vocabulary",
    question: "「一方で」の意味はどれですか？",
    choices: ["On the other hand", "For example", "Therefore", "In advance"],
    answer: 0,
  },

  {
    id: "n2-019",
    type: "vocabulary",
    question: "「必ずしも」の意味はどれですか？",
    choices: ["Not necessarily", "Always", "Certainly", "Usually"],
    answer: 0,
  },

  {
    id: "n2-020",
    type: "vocabulary",
    question: "「あえて」の意味に一番近いものはどれですか？",
    choices: [
      "Daringly / Deliberately",
      "Accidentally",
      "Quietly",
      "Completely",
    ],
    answer: 0,
  },

  // =========================
  // GRAMMAR
  // =========================

  {
    id: "n2-021",
    type: "grammar",
    question: "彼は忙しい___、毎日運動しています。",
    choices: ["にもかかわらず", "ばかりに", "ところで", "ことから"],
    answer: 0,
  },

  {
    id: "n2-022",
    type: "grammar",
    question: "この問題については、もう少し考えてみる___だ。",
    choices: ["必要がある", "わけではない", "ことになった", "ばかりだ"],
    answer: 0,
  },

  {
    id: "n2-023",
    type: "grammar",
    question: "彼が来る___、会議を始めることができません。",
    choices: ["まで", "ほど", "ばかり", "だけ"],
    answer: 0,
  },

  {
    id: "n2-024",
    type: "grammar",
    question: "努力した___、試験に合格できなかった。",
    choices: ["にもかかわらず", "おかげで", "ことから", "わけで"],
    answer: 0,
  },

  {
    id: "n2-025",
    type: "grammar",
    question: "この仕事は経験がある人___できます。",
    choices: ["でなければ", "であれば", "だけでは", "ほどでは"],
    answer: 0,
  },

  {
    id: "n2-026",
    type: "grammar",
    question: "健康のために、できる___毎日歩くようにしています。",
    choices: ["だけ", "ほど", "しか", "ばかり"],
    answer: 0,
  },

  {
    id: "n2-027",
    type: "grammar",
    question: "この店は駅から近い___、値段も安い。",
    choices: ["うえに", "わけで", "ばかりに", "ところを"],
    answer: 0,
  },

  {
    id: "n2-028",
    type: "grammar",
    question: "彼は日本に10年住んでいる___、日本語がとても上手だ。",
    choices: ["だけあって", "ばかりか", "ことなく", "わけではなく"],
    answer: 0,
  },

  {
    id: "n2-029",
    type: "grammar",
    question: "試験に合格する___、毎日勉強しています。",
    choices: ["ために", "わけに", "ところに", "ばかりに"],
    answer: 0,
  },

  {
    id: "n2-030",
    type: "grammar",
    question: "雨が降っている___、予定どおり出発した。",
    choices: ["にもかかわらず", "ことから", "ために", "ばかりか"],
    answer: 0,
  },

  // =========================
  // GRAMMAR / EXPRESSIONS
  // =========================

  {
    id: "n2-031",
    type: "grammar",
    question: "この問題は簡単な___、実際にはかなり難しい。",
    choices: ["ように見えて", "わけで", "ことから", "ばかりで"],
    answer: 0,
  },

  {
    id: "n2-032",
    type: "grammar",
    question: "彼は何も言わ___、部屋を出て行った。",
    choices: ["ずに", "ないので", "なくては", "ないながら"],
    answer: 0,
  },

  {
    id: "n2-033",
    type: "grammar",
    question: "健康である___、何より大切です。",
    choices: ["ことが", "ものが", "わけが", "ところが"],
    answer: 0,
  },

  {
    id: "n2-034",
    type: "grammar",
    question: "彼の話は本当___思えません。",
    choices: ["とは", "でも", "ほど", "しか"],
    answer: 0,
  },

  {
    id: "n2-035",
    type: "grammar",
    question: "この仕事は今日中に終わらせる___になっている。",
    choices: ["こと", "もの", "わけ", "ところ"],
    answer: 0,
  },

  {
    id: "n2-036",
    type: "grammar",
    question: "この問題については、先生に相談する___だと思います。",
    choices: ["べき", "はず", "わけ", "ところ"],
    answer: 0,
  },

  {
    id: "n2-037",
    type: "grammar",
    question: "彼は来る___だったが、急に用事ができた。",
    choices: ["はず", "わけ", "ところ", "ばかり"],
    answer: 0,
  },

  {
    id: "n2-038",
    type: "grammar",
    question: "この会社では、社員の意見を聞く___になっています。",
    choices: ["こと", "もの", "ほど", "ばかり"],
    answer: 0,
  },

  {
    id: "n2-039",
    type: "grammar",
    question: "忙しい___、家族との時間も大切にしています。",
    choices: ["ながらも", "ばかりに", "ところを", "ためなら"],
    answer: 0,
  },

  {
    id: "n2-040",
    type: "grammar",
    question: "この本は日本語を勉強する人___書かれています。",
    choices: ["向けに", "として", "に対して", "に関して"],
    answer: 0,
  },

  // =========================
  // VOCABULARY / USAGE
  // =========================

  {
    id: "n2-041",
    type: "vocabulary",
    question: "「取り組む」の意味はどれですか？",
    choices: ["To work on / tackle", "To avoid", "To cancel", "To borrow"],
    answer: 0,
  },

  {
    id: "n2-042",
    type: "vocabulary",
    question: "「求める」の意味はどれですか？",
    choices: ["To seek / request", "To refuse", "To hide", "To decrease"],
    answer: 0,
  },

  {
    id: "n2-043",
    type: "vocabulary",
    question: "「備える」の意味はどれですか？",
    choices: ["To prepare for", "To compare", "To explain", "To remove"],
    answer: 0,
  },

  {
    id: "n2-044",
    type: "vocabulary",
    question: "「防ぐ」の意味はどれですか？",
    choices: ["To prevent", "To increase", "To discover", "To exchange"],
    answer: 0,
  },

  {
    id: "n2-045",
    type: "vocabulary",
    question: "「省く」の意味はどれですか？",
    choices: ["To omit / leave out", "To add", "To continue", "To repair"],
    answer: 0,
  },

  {
    id: "n2-046",
    type: "vocabulary",
    question: "「及ぼす」の意味はどれですか？",
    choices: [
      "To exert / have an effect on",
      "To receive",
      "To refuse",
      "To disappear",
    ],
    answer: 0,
  },

  {
    id: "n2-047",
    type: "vocabulary",
    question: "「達成する」の意味はどれですか？",
    choices: ["To achieve", "To postpone", "To compare", "To interrupt"],
    answer: 0,
  },

  {
    id: "n2-048",
    type: "vocabulary",
    question: "「防止」の意味はどれですか？",
    choices: ["Prevention", "Permission", "Competition", "Explanation"],
    answer: 0,
  },

  {
    id: "n2-049",
    type: "vocabulary",
    question: "「対応する」の意味はどれですか？",
    choices: [
      "To deal with / respond to",
      "To forget",
      "To separate",
      "To purchase",
    ],
    answer: 0,
  },

  {
    id: "n2-050",
    type: "vocabulary",
    question: "「適切」の意味はどれですか？",
    choices: ["Appropriate", "Expensive", "Temporary", "Unusual"],
    answer: 0,
  },

  // =========================
  // READING
  // =========================

  {
    id: "n2-051",
    type: "reading",
    question:
      "最近、多くの会社で在宅勤務が取り入れられている。在宅勤務には通勤時間を減らせるという利点がある一方、仕事と生活の区別が難しくなるという問題もある。この文章で述べられている在宅勤務の問題は何ですか？",
    choices: [
      "通勤時間が長くなること",
      "仕事と生活の区別が難しくなること",
      "会社へ行く機会が増えること",
      "仕事ができなくなること",
    ],
    answer: 1,
  },

  {
    id: "n2-052",
    type: "reading",
    question:
      "ある調査によると、読書をする時間が長い人ほど、文章を理解する力が高い傾向がある。ただし、読書の時間だけで能力が決まるわけではなく、どのような本を読むかも重要だという。この文章によると、文章理解力について何が重要ですか？",
    choices: [
      "本を買う金額だけ",
      "読む時間だけ",
      "読む時間と読む本の内容",
      "読書をしないこと",
    ],
    answer: 2,
  },

  {
    id: "n2-053",
    type: "reading",
    question:
      "この地域では、以前から若者が少なくなっていることが問題になっていた。そこで市は、若い人が働きやすい環境を作るため、新しい会社に補助金を出す制度を始めた。この制度の目的は何ですか？",
    choices: [
      "高齢者を増やすこと",
      "若者が働きやすい環境を作ること",
      "会社を減らすこと",
      "観光客を減らすこと",
    ],
    answer: 1,
  },

  {
    id: "n2-054",
    type: "reading",
    question:
      "私は以前、何かを始めるときに完璧に準備してから行動しようとしていました。しかし、それではなかなか始められませんでした。最近は、まずできることから始め、必要に応じて修正するようにしています。そのほうが効率的だと感じています。筆者は最近、どのように行動していますか？",
    choices: [
      "完璧になるまで何もしない",
      "準備を全くしない",
      "まず行動し、必要に応じて修正する",
      "他人にすべて任せる",
    ],
    answer: 2,
  },

  {
    id: "n2-055",
    type: "reading",
    question:
      "この会社では、社員の健康を考えて、昼休みに15分程度の運動をすることをすすめている。参加は自由だが、参加した社員からは午後の仕事に集中しやすくなったという声が多い。この運動について正しいものはどれですか？",
    choices: [
      "全社員が参加しなければならない",
      "午後の仕事を休むためのものだ",
      "参加した社員からよい感想が多い",
      "毎日1時間行われている",
    ],
    answer: 2,
  },

  {
    id: "n2-056",
    type: "reading",
    question:
      "新しい商品の発売後、売り上げは最初の一か月で大きく伸びた。しかし、その後は少しずつ減少している。会社では、商品の人気がなくなったとは限らないとして、原因を調べている。会社は現在何をしていますか？",
    choices: [
      "商品をすぐに販売中止にしている",
      "売り上げが減った原因を調べている",
      "新商品をすべて無料にしている",
      "商品の価格を必ず上げている",
    ],
    answer: 1,
  },

  {
    id: "n2-057",
    type: "reading",
    question:
      "日本では、昔から季節ごとの行事が大切にされてきた。しかし、生活スタイルの変化によって、以前ほど行事を行わなくなった家庭も増えている。それでも、地域の行事などを通して、伝統を残そうとする動きもある。この文章の内容に合うものはどれですか？",
    choices: [
      "すべての伝統行事がなくなった",
      "伝統行事を残そうとする動きもある",
      "日本では季節の行事が禁止された",
      "生活スタイルは昔から変わっていない",
    ],
    answer: 1,
  },

  {
    id: "n2-058",
    type: "reading",
    question:
      "ある会社では会議の時間が長すぎるという問題があった。そこで、会議の前に資料を配り、参加者があらかじめ内容を確認するようにした。その結果、会議中の説明時間が短くなり、以前より効率よく話し合えるようになった。会議が効率的になった理由は何ですか？",
    choices: [
      "会議を毎日行うようにしたから",
      "参加者が事前に資料を確認するようにしたから",
      "資料を配らなくなったから",
      "会議の参加者を増やしたから",
    ],
    answer: 1,
  },

  // =========================
  // FINAL MIX
  // =========================

  {
    id: "n2-059",
    type: "grammar",
    question: "この結果は、長年の努力の___得られたものです。",
    choices: ["結果として", "おかげで", "せいで", "ところで"],
    answer: 1,
  },

  {
    id: "n2-060",
    type: "grammar",
    question: "彼は仕事が忙しい___、休日には家族と過ごすようにしている。",
    choices: ["一方で", "ばかりに", "ことから", "わけで"],
    answer: 0,
  },

  {
    id: "n2-061",
    type: "grammar",
    question: "この商品は品質が高い___、価格も手ごろだ。",
    choices: ["うえに", "ところを", "ばかりに", "わけで"],
    answer: 0,
  },

  {
    id: "n2-062",
    type: "grammar",
    question: "健康に悪いと分かっている___、夜遅くまで働いてしまう。",
    choices: ["にもかかわらず", "ことから", "おかげで", "ためなら"],
    answer: 0,
  },

  {
    id: "n2-063",
    type: "grammar",
    question: "この計画は変更される___があります。",
    choices: ["可能性", "必要", "原因", "責任"],
    answer: 0,
  },

  {
    id: "n2-064",
    type: "vocabulary",
    question: "「実施する」の意味はどれですか？",
    choices: [
      "To implement / carry out",
      "To postpone",
      "To refuse",
      "To compare",
    ],
    answer: 0,
  },

  {
    id: "n2-065",
    type: "vocabulary",
    question: "「削減する」の意味はどれですか？",
    choices: ["To reduce", "To increase", "To collect", "To maintain"],
    answer: 0,
  },

  {
    id: "n2-066",
    type: "vocabulary",
    question: "「考慮する」の意味はどれですか？",
    choices: [
      "To take into consideration",
      "To forget",
      "To reject",
      "To repeat",
    ],
    answer: 0,
  },

  {
    id: "n2-067",
    type: "reading",
    question:
      "このサービスは利用者の意見をもとに、毎年少しずつ改善されています。すべての意見がそのまま採用されるわけではありませんが、多くの利用者が同じ問題を指摘した場合は、改善の対象になります。このサービスについて正しいものはどれですか？",
    choices: [
      "利用者の意見を全く聞かない",
      "毎年少しずつ改善されている",
      "すべての意見を必ず採用する",
      "改善は一度しか行われない",
    ],
    answer: 1,
  },

  {
    id: "n2-068",
    type: "reading",
    question:
      "私は以前、仕事で失敗すると、その原因をすぐに自分の能力不足だと考えていました。しかし、最近は失敗したときこそ、何が問題だったのかを冷静に考えるようにしています。その結果、同じ失敗を繰り返すことが少なくなりました。筆者は失敗したとき、最近どのようにしていますか？",
    choices: [
      "すぐに仕事をやめる",
      "他人のせいにする",
      "原因を冷静に考える",
      "何も考えない",
    ],
    answer: 2,
  },

  {
    id: "n2-069",
    type: "kanji",
    question: "「貢献」は何と読みますか？",
    choices: ["こうけん", "こうげん", "きょうけん", "こけん"],
    answer: 0,
  },

  {
    id: "n2-070",
    type: "kanji",
    question: "「状況」の意味はどれですか？",
    choices: ["Situation / Circumstances", "Purpose", "Method", "Permission"],
    answer: 0,
  },
];

export default n2Questions;
