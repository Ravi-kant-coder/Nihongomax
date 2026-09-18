const n1Questions = [
  // =========================
  // KANJI
  // =========================

  {
    id: "n1-001",
    type: "kanji",
    question: "「顕著」は何と読みますか？",
    choices: ["けんちょ", "けんじょ", "げんちょ", "けんしょう"],
    answer: 0,
  },

  {
    id: "n1-002",
    type: "kanji",
    question: "「懸念」の意味はどれですか？",
    choices: [
      "Concern / Apprehension",
      "Expectation",
      "Permission",
      "Achievement",
    ],
    answer: 0,
  },

  {
    id: "n1-003",
    type: "kanji",
    question: "「妥当」は何と読みますか？",
    choices: ["だとう", "たとう", "だどう", "たいとう"],
    answer: 0,
  },

  {
    id: "n1-004",
    type: "kanji",
    question: "「著しい」の意味はどれですか？",
    choices: ["Remarkable / Significant", "Temporary", "Uncertain", "Ordinary"],
    answer: 0,
  },

  {
    id: "n1-005",
    type: "kanji",
    question: "「措置」は何と読みますか？",
    choices: ["そち", "そうち", "しょち", "そじ"],
    answer: 0,
  },

  {
    id: "n1-006",
    type: "kanji",
    question: "「遂行」の意味はどれですか？",
    choices: [
      "Execution / Accomplishment",
      "Cancellation",
      "Comparison",
      "Prediction",
    ],
    answer: 0,
  },

  {
    id: "n1-007",
    type: "kanji",
    question: "「概略」は何と読みますか？",
    choices: ["がいりゃく", "がいりょ", "かいりゃく", "がいりゅう"],
    answer: 0,
  },

  {
    id: "n1-008",
    type: "kanji",
    question: "「是正」の意味はどれですか？",
    choices: [
      "Correction / Rectification",
      "Expansion",
      "Prediction",
      "Agreement",
    ],
    answer: 0,
  },

  {
    id: "n1-009",
    type: "kanji",
    question: "「根拠」は何と読みますか？",
    choices: ["こんきょ", "こんご", "ねんきょ", "こんこ"],
    answer: 0,
  },

  {
    id: "n1-010",
    type: "kanji",
    question: "「把握」の意味はどれですか？",
    choices: ["Grasp / Understanding", "Refusal", "Reduction", "Exchange"],
    answer: 0,
  },

  // =========================
  // VOCABULARY
  // =========================

  {
    id: "n1-011",
    type: "vocabulary",
    question: "「あえて」の意味に一番近いものはどれですか？",
    choices: [
      "Deliberately / Daringly",
      "Accidentally",
      "Naturally",
      "Immediately",
    ],
    answer: 0,
  },

  {
    id: "n1-012",
    type: "vocabulary",
    question: "「おのずから」の意味はどれですか？",
    choices: [
      "Naturally / Spontaneously",
      "Suddenly",
      "Artificially",
      "Rarely",
    ],
    answer: 0,
  },

  {
    id: "n1-013",
    type: "vocabulary",
    question: "「ことごとく」の意味はどれですか？",
    choices: ["All / Without exception", "Almost", "Partly", "Eventually"],
    answer: 0,
  },

  {
    id: "n1-014",
    type: "vocabulary",
    question: "「もっぱら」の意味はどれですか？",
    choices: [
      "Exclusively / Mainly",
      "Occasionally",
      "Suddenly",
      "Approximately",
    ],
    answer: 0,
  },

  {
    id: "n1-015",
    type: "vocabulary",
    question: "「ひとえに」の意味に一番近いものはどれですか？",
    choices: ["Entirely / Solely", "Partly", "Rarely", "Gradually"],
    answer: 0,
  },

  {
    id: "n1-016",
    type: "vocabulary",
    question: "「おおむね」の意味はどれですか？",
    choices: ["Generally / On the whole", "Precisely", "Suddenly", "Barely"],
    answer: 0,
  },

  {
    id: "n1-017",
    type: "vocabulary",
    question: "「一概に」の意味はどれですか？",
    choices: [
      "Unconditionally / Generally",
      "Immediately",
      "Exactly",
      "Secretly",
    ],
    answer: 0,
  },

  {
    id: "n1-018",
    type: "vocabulary",
    question: "「あくまで」の意味に一番近いものはどれですか？",
    choices: [
      "To the very end / Strictly",
      "Temporarily",
      "By chance",
      "Almost",
    ],
    answer: 0,
  },

  {
    id: "n1-019",
    type: "vocabulary",
    question: "「ひいては」の意味はどれですか？",
    choices: [
      "And consequently / Eventually affecting",
      "For example",
      "At first",
      "In contrast",
    ],
    answer: 0,
  },

  {
    id: "n1-020",
    type: "vocabulary",
    question: "「かえって」の意味はどれですか？",
    choices: [
      "On the contrary / Rather",
      "In advance",
      "Gradually",
      "Certainly",
    ],
    answer: 0,
  },

  // =========================
  // GRAMMAR
  // =========================

  {
    id: "n1-021",
    type: "grammar",
    question: "彼は長年の経験を___、その問題を的確に判断した。",
    choices: ["踏まえて", "めぐって", "通じて", "問わず"],
    answer: 0,
  },

  {
    id: "n1-022",
    type: "grammar",
    question: "彼の努力___、この成功は実現しなかっただろう。",
    choices: ["なくしては", "に際して", "を皮切りに", "をものともせず"],
    answer: 0,
  },

  {
    id: "n1-023",
    type: "grammar",
    question: "この問題は専門家___、簡単には解決できない。",
    choices: ["をもってしても", "にしては", "を限りに", "にひきかえ"],
    answer: 0,
  },

  {
    id: "n1-024",
    type: "grammar",
    question: "彼は困難___、最後まで計画を続けた。",
    choices: ["をものともせず", "にあって", "をよそに", "にひきかえ"],
    answer: 0,
  },

  {
    id: "n1-025",
    type: "grammar",
    question: "今回の決定は、会社の将来___重要な意味を持つ。",
    choices: ["にかかわる", "を禁じ得ない", "に先立つ", "を限りとする"],
    answer: 0,
  },

  {
    id: "n1-026",
    type: "grammar",
    question: "彼は忙しい___、毎日欠かさず運動している。",
    choices: ["にもまして", "ながらも", "にひきかえ", "にあって"],
    answer: 1,
  },

  {
    id: "n1-027",
    type: "grammar",
    question: "この結果は、これまでの努力の成果___。",
    choices: ["にほかならない", "にあたらない", "を禁じ得ない", "に先立たない"],
    answer: 0,
  },

  {
    id: "n1-028",
    type: "grammar",
    question: "彼の発言は、問題の重大さを示すもの___。",
    choices: [
      "にほかならない",
      "にたえない",
      "をものともしない",
      "にかかわらない",
    ],
    answer: 0,
  },

  {
    id: "n1-029",
    type: "grammar",
    question: "この計画を成功させる___、全員の協力が必要だ。",
    choices: ["には", "に際して", "を皮切りに", "にひきかえ"],
    answer: 0,
  },

  {
    id: "n1-030",
    type: "grammar",
    question: "その会社は経営不振___、事業の縮小を決定した。",
    choices: ["に伴い", "をよそに", "に先立ち", "をものともせず"],
    answer: 0,
  },

  // =========================
  // ADVANCED GRAMMAR
  // =========================

  {
    id: "n1-031",
    type: "grammar",
    question: "彼の説明は分かりにくい___、内容そのものに問題がある。",
    choices: ["というより", "にしては", "にもまして", "をよそに"],
    answer: 0,
  },

  {
    id: "n1-032",
    type: "grammar",
    question: "これほど努力した___、結果が出なかったのは残念だ。",
    choices: ["にもかかわらず", "ばかりか", "にひきかえ", "を皮切りに"],
    answer: 0,
  },

  {
    id: "n1-033",
    type: "grammar",
    question: "彼は何度失敗しよう___、決してあきらめなかった。",
    choices: ["とも", "ものなら", "にもまして", "に際して"],
    answer: 0,
  },

  {
    id: "n1-034",
    type: "grammar",
    question: "この問題は一人の努力___解決できるものではない。",
    choices: ["だけでは", "をもってしても", "にして", "を限りに"],
    answer: 0,
  },

  {
    id: "n1-035",
    type: "grammar",
    question: "彼の態度は、責任を取る___、他人に責任を押しつけている。",
    choices: ["どころか", "に先立って", "にあって", "を踏まえて"],
    answer: 0,
  },

  {
    id: "n1-036",
    type: "grammar",
    question: "今回の事故を___、安全対策を見直す必要がある。",
    choices: ["契機として", "ものともせず", "よそに", "限りに"],
    answer: 0,
  },

  {
    id: "n1-037",
    type: "grammar",
    question: "彼は専門家である___、その分野について詳しい。",
    choices: ["だけあって", "どころか", "ばかりに", "ものなら"],
    answer: 0,
  },

  {
    id: "n1-038",
    type: "grammar",
    question: "この制度は、高齢者___設計されています。",
    choices: ["を対象として", "をめぐって", "を禁じ得ず", "にひきかえ"],
    answer: 0,
  },

  {
    id: "n1-039",
    type: "grammar",
    question: "彼は周囲の反対___、計画を実行した。",
    choices: ["をよそに", "に先立ち", "を踏まえて", "に際して"],
    answer: 0,
  },

  {
    id: "n1-040",
    type: "grammar",
    question: "その発言には、驚き___怒りも感じられた。",
    choices: ["というより", "のみならず", "にあって", "を限りに"],
    answer: 1,
  },

  // =========================
  // VOCABULARY / USAGE
  // =========================

  {
    id: "n1-041",
    type: "vocabulary",
    question: "「促す」の意味はどれですか？",
    choices: ["To urge / encourage", "To prevent", "To conceal", "To postpone"],
    answer: 0,
  },

  {
    id: "n1-042",
    type: "vocabulary",
    question: "「妨げる」の意味はどれですか？",
    choices: [
      "To hinder / obstruct",
      "To improve",
      "To recognize",
      "To maintain",
    ],
    answer: 0,
  },

  {
    id: "n1-043",
    type: "vocabulary",
    question: "「伴う」の意味はどれですか？",
    choices: [
      "To accompany / entail",
      "To reject",
      "To eliminate",
      "To compare",
    ],
    answer: 0,
  },

  {
    id: "n1-044",
    type: "vocabulary",
    question: "「覆す」の意味はどれですか？",
    choices: ["To overturn", "To maintain", "To collect", "To simplify"],
    answer: 0,
  },

  {
    id: "n1-045",
    type: "vocabulary",
    question: "「兼ねる」の意味はどれですか？",
    choices: [
      "To serve two purposes / hold two roles",
      "To refuse",
      "To separate",
      "To reduce",
    ],
    answer: 0,
  },

  {
    id: "n1-046",
    type: "vocabulary",
    question: "「遂げる」の意味はどれですか？",
    choices: [
      "To accomplish / achieve",
      "To postpone",
      "To interrupt",
      "To doubt",
    ],
    answer: 0,
  },

  {
    id: "n1-047",
    type: "vocabulary",
    question: "「見込む」の意味はどれですか？",
    choices: ["To expect / anticipate", "To deny", "To avoid", "To remove"],
    answer: 0,
  },

  {
    id: "n1-048",
    type: "vocabulary",
    question: "「損なう」の意味はどれですか？",
    choices: [
      "To damage / impair",
      "To strengthen",
      "To discover",
      "To protect",
    ],
    answer: 0,
  },

  {
    id: "n1-049",
    type: "vocabulary",
    question: "「踏まえる」の意味はどれですか？",
    choices: [
      "To take into account / base on",
      "To ignore",
      "To cancel",
      "To divide",
    ],
    answer: 0,
  },

  {
    id: "n1-050",
    type: "vocabulary",
    question: "「一貫」の意味はどれですか？",
    choices: [
      "Consistency / Coherence",
      "Difference",
      "Interruption",
      "Reduction",
    ],
    answer: 0,
  },

  // =========================
  // READING
  // =========================

  {
    id: "n1-051",
    type: "reading",
    question:
      "近年、企業における働き方は大きく変化している。以前は、同じ場所で同じ時間に働くことが当然とされていたが、現在では、業務の性質に応じて働く場所や時間を柔軟に選択する企業も増えている。ただし、制度を導入するだけで働き方が改善されるわけではなく、社員同士の情報共有や評価方法についても見直す必要がある。この文章で筆者が述べていることは何ですか？",
    choices: [
      "働く場所と時間は必ず統一すべきだ",
      "制度を導入するだけで働き方は改善する",
      "新しい働き方には制度以外の仕組みの見直しも必要だ",
      "以前の働き方には問題が全くなかった",
    ],
    answer: 2,
  },

  {
    id: "n1-052",
    type: "reading",
    question:
      "ある研究では、情報を大量に集めることが必ずしも適切な判断につながらないことが示されている。情報が多すぎると、重要な情報とそうでない情報を区別することが難しくなり、かえって判断に時間がかかる場合がある。したがって、問題を解決する際には、情報の量だけでなく、その情報が目的にとってどれほど有用かを考える必要がある。この文章によると、問題解決で重要なのは何ですか？",
    choices: [
      "できるだけ多くの情報を集めること",
      "情報を集めないこと",
      "目的にとって情報がどれだけ有用かを考えること",
      "判断に時間をかけること",
    ],
    answer: 2,
  },

  {
    id: "n1-053",
    type: "reading",
    question:
      "技術の発展によって、以前は専門家にしかできなかった作業が、一般の人でも簡単に行えるようになった。一方で、便利な道具に頼りすぎることで、基本的な知識や技能を身につける機会が減る可能性も指摘されている。技術を活用すること自体が問題なのではなく、道具に任せる部分と自分で理解すべき部分を区別することが重要だ。この文章の主張に最も近いものはどれですか？",
    choices: [
      "技術はできるだけ使わないほうがよい",
      "すべての作業を専門家に任せるべきだ",
      "技術を使いながら、自分で理解すべき部分も見極める必要がある",
      "基本的な知識は必要ない",
    ],
    answer: 2,
  },

  {
    id: "n1-054",
    type: "reading",
    question:
      "環境問題について議論するとき、個人の努力だけを強調することには限界がある。もちろん、一人ひとりの行動は重要だが、企業の生産方法や社会全体の制度が変わらなければ、大きな改善は期待しにくい。個人と社会の双方が取り組むことによって、初めて持続的な変化につながるのである。この文章で筆者が重視していることは何ですか？",
    choices: [
      "個人の努力だけで問題を解決すること",
      "企業だけに責任を負わせること",
      "個人と社会の両方が取り組むこと",
      "環境問題を無視すること",
    ],
    answer: 2,
  },

  {
    id: "n1-055",
    type: "reading",
    question:
      "失敗を避けようとするあまり、何も新しいことに挑戦しなければ、大きな失敗はしないかもしれない。しかし、それでは新しい経験を得る機会も失われる。重要なのは、失敗しないことではなく、失敗から何を学び、それを次の行動にどう生かすかである。この文章で筆者が最も言いたいことは何ですか？",
    choices: [
      "失敗は絶対に避けるべきだ",
      "新しいことには挑戦しないほうがよい",
      "失敗から学び、次の行動に生かすことが重要だ",
      "経験より安全を優先すべきだ",
    ],
    answer: 2,
  },

  {
    id: "n1-056",
    type: "reading",
    question:
      "情報が瞬時に広がる現代では、ニュースを受け取った時点で、それを事実だと判断してしまう危険がある。しかし、情報の発信者や根拠を確認しなければ、誤った情報を広めることにもなりかねない。情報が多い時代だからこそ、受け取った情報をそのまま信じるのではなく、確認する姿勢が求められている。この文章で必要だとされている姿勢は何ですか？",
    choices: [
      "すべての情報を疑わないこと",
      "情報をすぐに他人へ伝えること",
      "情報の発信者や根拠を確認すること",
      "ニュースを全く見ないこと",
    ],
    answer: 2,
  },

  {
    id: "n1-057",
    type: "reading",
    question:
      "都市の発展を考える際、経済的な成長だけを目標にすると、住民の生活の質が十分に考慮されない可能性がある。商業施設や交通網を整備することは重要だが、緑地や公共空間、地域コミュニティーの維持も欠かせない。都市に求められるのは、経済活動と住民の生活環境を両立させることである。この文章によると、都市の発展に必要なのは何ですか？",
    choices: [
      "経済成長だけを追求すること",
      "商業施設を増やし続けること",
      "経済活動と生活環境を両立させること",
      "地域コミュニティーをなくすこと",
    ],
    answer: 2,
  },

  {
    id: "n1-058",
    type: "reading",
    question:
      "教育において、知識を覚えることはもちろん重要である。しかし、覚えた知識をどのような場面で使うかを考えたり、異なる情報を組み合わせて自分なりの答えを導いたりする力も必要になる。変化の激しい社会では、単に知識を持っているだけではなく、それを活用する能力がますます重要になると考えられる。この文章で重視されている能力は何ですか？",
    choices: [
      "知識を暗記する能力だけ",
      "知識を活用して考える能力",
      "情報を避ける能力",
      "同じ答えを繰り返す能力",
    ],
    answer: 1,
  },

  // =========================
  // FINAL MIX
  // =========================

  {
    id: "n1-059",
    type: "grammar",
    question: "今回の調査結果は、今後の政策を考える___重要な資料となるだろう。",
    choices: ["うえで", "どころか", "ものなら", "ことなく"],
    answer: 0,
  },

  {
    id: "n1-060",
    type: "grammar",
    question: "この問題を解決するには、関係者全員が協力する___ない。",
    choices: ["ほか", "わけ", "ほど", "もの"],
    answer: 0,
  },

  {
    id: "n1-061",
    type: "grammar",
    question: "彼は専門家___、説明があまり分かりやすくない。",
    choices: ["にしては", "をもってしても", "をよそに", "にひきかえ"],
    answer: 0,
  },

  {
    id: "n1-062",
    type: "grammar",
    question: "どれほど困難な状況___、冷静に判断しなければならない。",
    choices: ["にあっても", "に先立って", "を限りに", "にひきかえ"],
    answer: 0,
  },

  {
    id: "n1-063",
    type: "grammar",
    question: "彼の成功は、本人の努力___、周囲の支援もあって実現した。",
    choices: ["はもとより", "をものともせず", "にあって", "をよそに"],
    answer: 0,
  },

  {
    id: "n1-064",
    type: "vocabulary",
    question: "「顧慮する」の意味はどれですか？",
    choices: [
      "To consider / give consideration to",
      "To reject",
      "To simplify",
      "To postpone",
    ],
    answer: 0,
  },

  {
    id: "n1-065",
    type: "vocabulary",
    question: "「講じる」の意味はどれですか？",
    choices: ["To take measures", "To forget", "To remove", "To compare"],
    answer: 0,
  },

  {
    id: "n1-066",
    type: "vocabulary",
    question: "「鑑みる」の意味はどれですか？",
    choices: [
      "To take into consideration in light of",
      "To deny",
      "To simplify",
      "To postpone",
    ],
    answer: 0,
  },

  {
    id: "n1-067",
    type: "reading",
    question:
      "ある企業では、短期的な利益だけを追求するのではなく、長期的な信頼関係を築くことを重視している。そのため、顧客からの苦情に対しても、単に問題を処理するだけでなく、同じ問題が再発しないよう原因を調べ、サービスの改善につなげている。この企業の対応として正しいものはどれですか？",
    choices: [
      "苦情をできるだけ無視する",
      "問題を一時的に処理するだけにする",
      "原因を調べ、再発防止とサービス改善につなげる",
      "短期的な利益だけを優先する",
    ],
    answer: 2,
  },

  {
    id: "n1-068",
    type: "reading",
    question:
      "新しい制度を導入する際には、制度そのものの内容だけでなく、それを利用する人がどのように受け止めるかも考慮する必要がある。制度上は合理的に見えても、現場で実行できなければ十分な効果は期待できない。そのため、導入前に現場の意見を聞き、必要に応じて内容を調整することが重要である。この文章で重要だとされていることは何ですか？",
    choices: [
      "制度を一度決めたら変更しないこと",
      "制度の内容だけを考えること",
      "現場の意見を聞き、必要に応じて調整すること",
      "利用者の意見を無視すること",
    ],
    answer: 2,
  },

  {
    id: "n1-069",
    type: "kanji",
    question: "「踏襲」は何と読みますか？",
    choices: ["とうしゅう", "とうしょう", "ふしゅう", "とうじゅ"],
    answer: 0,
  },

  {
    id: "n1-070",
    type: "kanji",
    question: "「乖離」の意味はどれですか？",
    choices: ["Gap / Discrepancy", "Agreement", "Improvement", "Continuation"],
    answer: 0,
  },
];

export default n1Questions;
