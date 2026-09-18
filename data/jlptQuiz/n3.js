const n3Questions = [
  // =========================
  // KANJI
  // =========================

  {
    id: "n3-001",
    type: "kanji",
    question: "「経験」は何と読みますか？",
    choices: ["けいけん", "けいげん", "きょうけん", "けんけい"],
    answer: 0,
  },

  {
    id: "n3-002",
    type: "kanji",
    question: "「必要」の意味はどれですか？",
    choices: ["Necessary", "Convenient", "Dangerous", "Possible"],
    answer: 0,
  },

  {
    id: "n3-003",
    type: "kanji",
    question: "「影響」は何と読みますか？",
    choices: ["えいきょう", "えいぎょう", "えんきょう", "えきょう"],
    answer: 0,
  },

  {
    id: "n3-004",
    type: "kanji",
    question: "「環境」は何と読みますか？",
    choices: ["かんきょう", "かんぎょう", "がんきょう", "かんけい"],
    answer: 0,
  },

  {
    id: "n3-005",
    type: "kanji",
    question: "「原因」の意味はどれですか？",
    choices: ["Result", "Cause", "Method", "Condition"],
    answer: 1,
  },

  {
    id: "n3-006",
    type: "kanji",
    question: "「結果」は何と読みますか？",
    choices: ["けっか", "けつか", "けっが", "けいか"],
    answer: 0,
  },

  {
    id: "n3-007",
    type: "kanji",
    question: "「関係」の意味はどれですか？",
    choices: [
      "Relationship / Connection",
      "Competition",
      "Experience",
      "Difference",
    ],
    answer: 0,
  },

  {
    id: "n3-008",
    type: "kanji",
    question: "「複雑」は何と読みますか？",
    choices: ["ふくざつ", "ふくさつ", "ふぐざつ", "ふくせつ"],
    answer: 0,
  },

  {
    id: "n3-009",
    type: "kanji",
    question: "「増加」の意味はどれですか？",
    choices: ["Decrease", "Increase", "Change", "Movement"],
    answer: 1,
  },

  {
    id: "n3-010",
    type: "kanji",
    question: "「減少」は何と読みますか？",
    choices: ["げんしょう", "げんじょう", "けんしょう", "げんしょ"],
    answer: 0,
  },

  // =========================
  // VOCABULARY
  // =========================

  {
    id: "n3-011",
    type: "vocabulary",
    question: "「たとえば」の意味はどれですか？",
    choices: ["However", "For example", "Therefore", "Finally"],
    answer: 1,
  },

  {
    id: "n3-012",
    type: "vocabulary",
    question: "「つまり」の意味に一番近いものはどれですか？",
    choices: ["In other words", "At first", "Suddenly", "In advance"],
    answer: 0,
  },

  {
    id: "n3-013",
    type: "vocabulary",
    question: "「確か」の意味はどれですか？",
    choices: ["Certain / Sure", "Difficult", "Rare", "Temporary"],
    answer: 0,
  },

  {
    id: "n3-014",
    type: "vocabulary",
    question: "「実際」の意味はどれですか？",
    choices: ["Actually / In reality", "Usually", "Especially", "Immediately"],
    answer: 0,
  },

  {
    id: "n3-015",
    type: "vocabulary",
    question: "「特に」の意味はどれですか？",
    choices: ["Especially", "Almost", "Together", "Recently"],
    answer: 0,
  },

  {
    id: "n3-016",
    type: "vocabulary",
    question: "「かなり」の意味に一番近いものはどれですか？",
    choices: ["Quite / Fairly", "Never", "Only", "Almost not"],
    answer: 0,
  },

  {
    id: "n3-017",
    type: "vocabulary",
    question: "「ほとんど」の意味はどれですか？",
    choices: ["Almost / Mostly", "Exactly", "Suddenly", "Separately"],
    answer: 0,
  },

  {
    id: "n3-018",
    type: "vocabulary",
    question: "「急に」の意味はどれですか？",
    choices: ["Slowly", "Suddenly", "Carefully", "Regularly"],
    answer: 1,
  },

  {
    id: "n3-019",
    type: "vocabulary",
    question: "「十分に」の意味はどれですか？",
    choices: ["Sufficiently", "Rarely", "Quietly", "Recently"],
    answer: 0,
  },

  {
    id: "n3-020",
    type: "vocabulary",
    question: "「正確」の意味はどれですか？",
    choices: ["Accurate", "Popular", "Simple", "Convenient"],
    answer: 0,
  },

  // =========================
  // GRAMMAR
  // =========================

  {
    id: "n3-021",
    type: "grammar",
    question: "雨が降っている___、試合は予定どおり行われました。",
    choices: ["のに", "ので", "ため", "なら"],
    answer: 0,
  },

  {
    id: "n3-022",
    type: "grammar",
    question: "健康の___、毎朝運動しています。",
    choices: ["ために", "ように", "ところに", "ばかりに"],
    answer: 0,
  },

  {
    id: "n3-023",
    type: "grammar",
    question: "忘れない___、メモしておきました。",
    choices: ["ように", "ために", "そうに", "みたいに"],
    answer: 0,
  },

  {
    id: "n3-024",
    type: "grammar",
    question: "この薬を飲めば、すぐ元気になる___ありません。",
    choices: ["とは限り", "わけでは", "ことでは", "ようでは"],
    answer: 0,
  },

  {
    id: "n3-025",
    type: "grammar",
    question: "日本に住んでいる___、日本語が上手とは限りません。",
    choices: ["からといって", "ために", "ところで", "わけで"],
    answer: 0,
  },

  {
    id: "n3-026",
    type: "grammar",
    question: "彼は学生___、アルバイトもしています。",
    choices: ["である一方", "であるため", "であるところ", "であるばかり"],
    answer: 0,
  },

  {
    id: "n3-027",
    type: "grammar",
    question: "この店は安い___、料理もおいしいです。",
    choices: ["だけでなく", "ばかりか", "しか", "ほど"],
    answer: 0,
  },

  {
    id: "n3-028",
    type: "grammar",
    question: "電車が遅れた___、会社に遅刻しました。",
    choices: ["ため", "のに", "ながら", "ほど"],
    answer: 0,
  },

  {
    id: "n3-029",
    type: "grammar",
    question: "忙しい___、毎日日本語を勉強しています。",
    choices: ["ながらも", "ために", "ばかりに", "ところで"],
    answer: 0,
  },

  {
    id: "n3-030",
    type: "grammar",
    question: "彼は日本へ行く___、日本語を勉強しています。",
    choices: ["ために", "ところを", "わけに", "ばかりを"],
    answer: 0,
  },

  // =========================
  // GRAMMAR / EXPRESSIONS
  // =========================

  {
    id: "n3-031",
    type: "grammar",
    question: "この問題について、先生に聞いてみる___です。",
    choices: ["つもり", "ところ", "わけ", "ばかり"],
    answer: 0,
  },

  {
    id: "n3-032",
    type: "grammar",
    question: "駅に着いた___、電話してください。",
    choices: ["ら", "なら", "ばかり", "ほど"],
    answer: 0,
  },

  {
    id: "n3-033",
    type: "grammar",
    question: "日本語を勉強すればする___、面白くなります。",
    choices: ["ほど", "だけ", "しか", "まで"],
    answer: 0,
  },

  {
    id: "n3-034",
    type: "grammar",
    question: "この問題は思った___難しくありませんでした。",
    choices: ["ほど", "だけ", "しか", "まで"],
    answer: 0,
  },

  {
    id: "n3-035",
    type: "grammar",
    question: "忙しくて、昼ごはんを食べる___ありませんでした。",
    choices: ["暇が", "ことが", "ところが", "わけが"],
    answer: 0,
  },

  {
    id: "n3-036",
    type: "grammar",
    question: "彼は約束を忘れた___です。",
    choices: ["よう", "ため", "そう", "つもり"],
    answer: 0,
  },

  {
    id: "n3-037",
    type: "grammar",
    question: "空が暗いです。もうすぐ雨が降り___です。",
    choices: ["そう", "よう", "らしい", "ため"],
    answer: 0,
  },

  {
    id: "n3-038",
    type: "grammar",
    question: "田中さんは来る___ですが、まだ来ていません。",
    choices: ["はず", "ため", "よう", "ばかり"],
    answer: 0,
  },

  {
    id: "n3-039",
    type: "grammar",
    question: "この電車は東京へ行く___です。",
    choices: ["はず", "そう", "よう", "ため"],
    answer: 0,
  },

  {
    id: "n3-040",
    type: "grammar",
    question: "彼は何も言わ___帰ってしまいました。",
    choices: ["ずに", "ないでの", "なくての", "ないものの"],
    answer: 0,
  },

  // =========================
  // VOCABULARY / USAGE
  // =========================

  {
    id: "n3-041",
    type: "vocabulary",
    question: "「申し込む」の意味はどれですか？",
    choices: ["To apply / sign up", "To cancel", "To explain", "To repair"],
    answer: 0,
  },

  {
    id: "n3-042",
    type: "vocabulary",
    question: "「断る」の意味はどれですか？",
    choices: ["To accept", "To refuse / decline", "To invite", "To continue"],
    answer: 1,
  },

  {
    id: "n3-043",
    type: "vocabulary",
    question: "「認める」の意味はどれですか？",
    choices: ["To recognize / admit", "To forget", "To hide", "To separate"],
    answer: 0,
  },

  {
    id: "n3-044",
    type: "vocabulary",
    question: "「比べる」の意味はどれですか？",
    choices: ["To compare", "To decide", "To prepare", "To explain"],
    answer: 0,
  },

  {
    id: "n3-045",
    type: "vocabulary",
    question: "「続ける」の意味はどれですか？",
    choices: ["To continue", "To stop", "To change", "To return"],
    answer: 0,
  },

  {
    id: "n3-046",
    type: "vocabulary",
    question: "「取り消す」の意味はどれですか？",
    choices: ["To confirm", "To cancel", "To collect", "To choose"],
    answer: 1,
  },

  {
    id: "n3-047",
    type: "vocabulary",
    question: "「間違い」の意味はどれですか？",
    choices: ["Mistake", "Opportunity", "Habit", "Reason"],
    answer: 0,
  },

  {
    id: "n3-048",
    type: "vocabulary",
    question: "「場合」の意味に一番近いものはどれですか？",
    choices: ["Case / Situation", "Place", "Person", "Reason"],
    answer: 0,
  },

  {
    id: "n3-049",
    type: "vocabulary",
    question: "「方法」の意味はどれですか？",
    choices: ["Method / Way", "Result", "Condition", "Cause"],
    answer: 0,
  },

  {
    id: "n3-050",
    type: "vocabulary",
    question: "「目的」の意味はどれですか？",
    choices: ["Purpose", "Problem", "Experience", "Effect"],
    answer: 0,
  },

  // =========================
  // READING
  // =========================

  {
    id: "n3-051",
    type: "reading",
    question:
      "最近、健康のために歩いて会社へ行く人が増えています。電車より時間はかかりますが、運動になるので、健康にいいと考える人が多いようです。この文章によると、歩いて会社へ行く理由は何ですか？",
    choices: [
      "電車がいつも遅れるから",
      "歩くことが運動になるから",
      "会社が駅から遠いから",
      "電車より速いから",
    ],
    answer: 1,
  },

  {
    id: "n3-052",
    type: "reading",
    question:
      "私は去年から日本語を勉強しています。最初は漢字が一番難しいと思っていました。しかし、毎日少しずつ覚えるようにしたら、今では漢字より会話のほうが難しいと感じています。今、筆者が一番難しいと感じているのは何ですか？",
    choices: ["漢字", "文法", "会話", "読み方"],
    answer: 2,
  },

  {
    id: "n3-053",
    type: "reading",
    question:
      "この図書館では、本を借りる前にカードを作る必要があります。カードを作るためには、住所と名前が分かるものを持って来てください。カードは無料で作ることができます。カードを作るために何が必要ですか？",
    choices: ["お金だけ", "本と写真", "住所と名前が分かるもの", "学校の成績表"],
    answer: 2,
  },

  {
    id: "n3-054",
    type: "reading",
    question:
      "田中さんは明日の朝、病院へ行く予定です。しかし、今朝から熱が下がらないため、会社を休むことにしました。病院へ行ったあと、体調がよければ午後から仕事をするつもりです。田中さんは明日どうする予定ですか？",
    choices: [
      "朝から会社へ行きます",
      "病院へ行って、体調がよければ午後から仕事をします",
      "一日中旅行します",
      "午後だけ病院へ行きます",
    ],
    answer: 1,
  },

  {
    id: "n3-055",
    type: "reading",
    question:
      "最近、この町では外国人の住民が増えています。そのため、市では外国人向けの日本語教室を始めました。教室では日本語だけでなく、生活に必要な情報についても説明しています。この教室は誰のために始められましたか？",
    choices: ["日本へ旅行する人", "外国人の住民", "日本語の先生", "子どもたち"],
    answer: 1,
  },

  {
    id: "n3-056",
    type: "reading",
    question:
      "私は以前、毎朝コーヒーを飲んでいました。でも、最近は夜よく眠れないので、朝は水を飲むようにしています。その結果、少しずつよく眠れるようになりました。筆者はなぜ朝に水を飲むようになりましたか？",
    choices: [
      "コーヒーが高くなったから",
      "水が好きだから",
      "夜よく眠れなかったから",
      "朝時間がなかったから",
    ],
    answer: 2,
  },

  {
    id: "n3-057",
    type: "reading",
    question:
      "来週の日曜日に町のスポーツ大会があります。参加する人は土曜日までに申し込んでください。当日は午前9時に公園に集合します。参加費は無料です。スポーツ大会に参加する人はいつまでに申し込む必要がありますか？",
    choices: ["金曜日", "土曜日", "日曜日の朝", "大会のあと"],
    answer: 1,
  },

  {
    id: "n3-058",
    type: "reading",
    question:
      "山田さんは新しい仕事を始めてから、毎日忙しくなりました。それでも、週に三回は家で料理をするようにしています。外食するよりお金がかからず、自分で作ったほうが健康にもいいと思っているからです。山田さんが家で料理をする理由として書かれていないものはどれですか？",
    choices: [
      "お金を節約できるから",
      "健康にいいと思うから",
      "料理が仕事だから",
      "外食より自分で作るほうがいいと思うから",
    ],
    answer: 2,
  },

  // =========================
  // FINAL MIX
  // =========================

  {
    id: "n3-059",
    type: "grammar",
    question: "この仕事は一人ではできないので、みんなで協力する___があります。",
    choices: ["必要", "予定", "場合", "原因"],
    answer: 0,
  },

  {
    id: "n3-060",
    type: "grammar",
    question: "彼は忙しい___、毎日家族に電話しています。",
    choices: ["にもかかわらず", "ために", "ように", "ばかりに"],
    answer: 0,
  },

  {
    id: "n3-061",
    type: "grammar",
    question: "この問題について、もう一度考えてみる___にしました。",
    choices: ["こと", "もの", "ところ", "わけ"],
    answer: 0,
  },

  {
    id: "n3-062",
    type: "grammar",
    question: "この料理は見た目___、味もとてもいいです。",
    choices: ["だけでなく", "しか", "ほど", "ばかりに"],
    answer: 0,
  },

  {
    id: "n3-063",
    type: "grammar",
    question: "電車の中では、大きな声で話さない___してください。",
    choices: ["ように", "ために", "そうに", "ばかりに"],
    answer: 0,
  },

  {
    id: "n3-064",
    type: "vocabulary",
    question: "「解決する」の意味はどれですか？",
    choices: ["To solve", "To increase", "To compare", "To continue"],
    answer: 0,
  },

  {
    id: "n3-065",
    type: "vocabulary",
    question: "「確認する」の意味はどれですか？",
    choices: ["To confirm / check", "To refuse", "To forget", "To cancel"],
    answer: 0,
  },

  {
    id: "n3-066",
    type: "vocabulary",
    question: "「利用する」の意味はどれですか？",
    choices: ["To use", "To repair", "To produce", "To remove"],
    answer: 0,
  },

  {
    id: "n3-067",
    type: "reading",
    question:
      "この店では、毎週月曜日に野菜が安くなります。ただし、祝日の場合は火曜日に変更されます。今週の月曜日は祝日です。野菜が安くなるのはいつですか？",
    choices: ["月曜日", "火曜日", "水曜日", "日曜日"],
    answer: 1,
  },

  {
    id: "n3-068",
    type: "reading",
    question:
      "私は来月から新しい会社で働くことになりました。今の会社より家から遠いので、朝は30分早く家を出なければなりません。その代わり、新しい会社では日本語を使う機会が多いそうです。筆者が新しい会社で期待していることは何ですか？",
    choices: [
      "家から近いこと",
      "仕事が少ないこと",
      "日本語を使う機会が多いこと",
      "朝遅く起きられること",
    ],
    answer: 2,
  },

  {
    id: "n3-069",
    type: "kanji",
    question: "「判断」は何と読みますか？",
    choices: ["はんだん", "ばんたん", "はんたん", "はんでん"],
    answer: 0,
  },

  {
    id: "n3-070",
    type: "kanji",
    question: "「状態」の意味はどれですか？",
    choices: ["Condition / State", "Reason", "Purpose", "Method"],
    answer: 0,
  },
];

export default n3Questions;
