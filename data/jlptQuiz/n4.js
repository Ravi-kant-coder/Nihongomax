const n4Questions = [
  // =========================
  // KANJI
  // =========================

  {
    id: "n4-001",
    type: "kanji",
    question: "「会社」は何と読みますか？",
    choices: ["かいしゃ", "かいじゃ", "がいしゃ", "かしゃ"],
    answer: 0,
  },

  {
    id: "n4-002",
    type: "kanji",
    question: "「旅行」は何と読みますか？",
    choices: ["りょこう", "りょうこう", "りょこ", "りゅこう"],
    answer: 0,
  },

  {
    id: "n4-003",
    type: "kanji",
    question: "「料理」は何と読みますか？",
    choices: ["りょり", "りょうり", "りょうじ", "りょい"],
    answer: 1,
  },

  {
    id: "n4-004",
    type: "kanji",
    question: "「病気」の意味はどれですか？",
    choices: ["Weather", "Illness", "Medicine", "Hospital"],
    answer: 1,
  },

  {
    id: "n4-005",
    type: "kanji",
    question: "「住所」は何と読みますか？",
    choices: ["じゅしょう", "じゅうじょ", "じゅじょ", "じょうしょ"],
    answer: 1,
  },

  {
    id: "n4-006",
    type: "kanji",
    question: "「必要」は何と読みますか？",
    choices: ["ひつよう", "ひっよう", "ひつよ", "ひじょう"],
    answer: 0,
  },

  {
    id: "n4-007",
    type: "kanji",
    question: "「最近」は何と読みますか？",
    choices: ["さいきん", "さいこん", "さきん", "さいけん"],
    answer: 0,
  },

  {
    id: "n4-008",
    type: "kanji",
    question: "「有名」の意味はどれですか？",
    choices: ["Difficult", "Famous", "Quiet", "Beautiful"],
    answer: 1,
  },

  {
    id: "n4-009",
    type: "kanji",
    question: "「特別」は何と読みますか？",
    choices: ["とくべつ", "とくへつ", "どくべつ", "とくべち"],
    answer: 0,
  },

  {
    id: "n4-010",
    type: "kanji",
    question: "「運転」は何と読みますか？",
    choices: ["うんてん", "うんでん", "うてん", "うんどう"],
    answer: 0,
  },

  // =========================
  // VOCABULARY
  // =========================

  {
    id: "n4-011",
    type: "vocabulary",
    question: "「約束」の意味はどれですか？",
    choices: ["Promise / Appointment", "Problem", "Plan", "Reason"],
    answer: 0,
  },

  {
    id: "n4-012",
    type: "vocabulary",
    question: "「準備」の意味はどれですか？",
    choices: ["Cleaning", "Preparation", "Travel", "Practice"],
    answer: 1,
  },

  {
    id: "n4-013",
    type: "vocabulary",
    question: "「間に合う」の意味はどれですか？",
    choices: ["To be late", "To arrive on time", "To leave early", "To wait"],
    answer: 1,
  },

  {
    id: "n4-014",
    type: "vocabulary",
    question: "「眠い」の意味はどれですか？",
    choices: ["Hungry", "Sleepy", "Thirsty", "Tired from exercise"],
    answer: 1,
  },

  {
    id: "n4-015",
    type: "vocabulary",
    question: "「残念」の意味に一番近いものはどれですか？",
    choices: [
      "Wonderful",
      "Unfortunate / What a pity",
      "Interesting",
      "Convenient",
    ],
    answer: 1,
  },

  {
    id: "n4-016",
    type: "vocabulary",
    question: "「簡単」の反対はどれですか？",
    choices: ["静か", "複雑", "便利", "安全"],
    answer: 1,
  },

  {
    id: "n4-017",
    type: "vocabulary",
    question: "「便利」の意味はどれですか？",
    choices: ["Convenient", "Expensive", "Dangerous", "Crowded"],
    answer: 0,
  },

  {
    id: "n4-018",
    type: "vocabulary",
    question: "「途中」の意味はどれですか？",
    choices: ["Beginning", "Middle / On the way", "End", "Outside"],
    answer: 1,
  },

  {
    id: "n4-019",
    type: "vocabulary",
    question: "「必要」の反対に近いものはどれですか？",
    choices: ["不要", "便利", "特別", "十分"],
    answer: 0,
  },

  {
    id: "n4-020",
    type: "vocabulary",
    question: "「十分」の意味はどれですか？",
    choices: ["Not enough", "Enough / Sufficient", "Very little", "Almost"],
    answer: 1,
  },

  // =========================
  // GRAMMAR
  // =========================

  {
    id: "n4-021",
    type: "grammar",
    question: "明日、雨が___、出かけません。",
    choices: ["降ったら", "降って", "降ると", "降り"],
    answer: 0,
  },

  {
    id: "n4-022",
    type: "grammar",
    question: "日本へ行く___、日本語をもっと勉強したいです。",
    choices: ["まで", "なら", "ので", "しか"],
    answer: 1,
  },

  {
    id: "n4-023",
    type: "grammar",
    question: "この薬を飲む___、元気になると思います。",
    choices: ["から", "と", "まで", "しか"],
    answer: 1,
  },

  {
    id: "n4-024",
    type: "grammar",
    question: "宿題をして___、テレビを見ます。",
    choices: ["から", "まで", "しか", "ながら"],
    answer: 0,
  },

  {
    id: "n4-025",
    type: "grammar",
    question: "日本語を勉強し___、音楽を聞いています。",
    choices: ["ながら", "から", "まで", "たら"],
    answer: 0,
  },

  {
    id: "n4-026",
    type: "grammar",
    question: "駅へ行く___、この道をまっすぐ行ってください。",
    choices: ["ために", "とき", "ながら", "しか"],
    answer: 0,
  },

  {
    id: "n4-027",
    type: "grammar",
    question: "私は日本料理を作る___があります。",
    choices: ["こと", "もの", "ところ", "ため"],
    answer: 0,
  },

  {
    id: "n4-028",
    type: "grammar",
    question: "来週、日本へ行く___です。",
    choices: ["つもり", "よう", "そう", "ため"],
    answer: 0,
  },

  {
    id: "n4-029",
    type: "grammar",
    question: "私は来年日本へ行きたい___思っています。",
    choices: ["と", "を", "が", "に"],
    answer: 0,
  },

  {
    id: "n4-030",
    type: "grammar",
    question: "田中さんはもう帰った___です。",
    choices: ["そう", "よう", "つもり", "ため"],
    answer: 0,
  },

  // =========================
  // VERB / ADJECTIVE FORMS
  // =========================

  {
    id: "n4-031",
    type: "grammar",
    question: "窓を___ください。",
    choices: ["開けて", "開ける", "開けた", "開けない"],
    answer: 0,
  },

  {
    id: "n4-032",
    type: "grammar",
    question: "ここで写真を___はいけません。",
    choices: ["撮って", "撮る", "撮った", "撮らない"],
    answer: 0,
  },

  {
    id: "n4-033",
    type: "grammar",
    question: "明日は早く___なければなりません。",
    choices: ["起き", "起きて", "起きる", "起きた"],
    answer: 0,
  },

  {
    id: "n4-034",
    type: "grammar",
    question: "この漢字は___ことができます。",
    choices: ["読んで", "読む", "読んだ", "読み"],
    answer: 1,
  },

  {
    id: "n4-035",
    type: "grammar",
    question: "日本へ行ったこと___あります。",
    choices: ["が", "を", "に", "で"],
    answer: 0,
  },

  {
    id: "n4-036",
    type: "grammar",
    question: "私は毎朝ジョギング___するようにしています。",
    choices: ["を", "が", "に", "で"],
    answer: 0,
  },

  {
    id: "n4-037",
    type: "grammar",
    question: "健康のために、毎日野菜を食べる___しています。",
    choices: ["ように", "ために", "ことを", "そうに"],
    answer: 0,
  },

  {
    id: "n4-038",
    type: "grammar",
    question: "この部屋は前より___なりました。",
    choices: ["きれいに", "きれいな", "きれいで", "きれいだ"],
    answer: 0,
  },

  {
    id: "n4-039",
    type: "grammar",
    question: "日本語がだんだん___なりました。",
    choices: ["上手に", "上手な", "上手で", "上手だ"],
    answer: 0,
  },

  {
    id: "n4-040",
    type: "grammar",
    question: "昨日は忙しくて、どこにも___。",
    choices: ["行きませんでした", "行きました", "行きません", "行く"],
    answer: 0,
  },

  // =========================
  // PARTICLES / EXPRESSIONS
  // =========================

  {
    id: "n4-041",
    type: "grammar",
    question: "友達___プレゼントをもらいました。",
    choices: ["に", "を", "から", "で"],
    answer: 2,
  },

  {
    id: "n4-042",
    type: "grammar",
    question: "母___料理を作ってあげました。",
    choices: ["に", "を", "が", "へ"],
    answer: 0,
  },

  {
    id: "n4-043",
    type: "grammar",
    question: "弟___本を読んであげました。",
    choices: ["に", "を", "が", "で"],
    answer: 0,
  },

  {
    id: "n4-044",
    type: "grammar",
    question: "先生___日本語を教えてもらいました。",
    choices: ["を", "に", "が", "で"],
    answer: 1,
  },

  {
    id: "n4-045",
    type: "grammar",
    question: "友達に駅まで送って___。",
    choices: ["くれました", "あげました", "もらいました", "しました"],
    answer: 2,
  },

  {
    id: "n4-046",
    type: "grammar",
    question: "私は妹に本を買って___。",
    choices: ["あげました", "くれました", "もらいました", "なりました"],
    answer: 0,
  },

  {
    id: "n4-047",
    type: "grammar",
    question: "父が私に時計を買って___。",
    choices: ["あげました", "くれました", "もらいました", "しました"],
    answer: 1,
  },

  {
    id: "n4-048",
    type: "grammar",
    question: "この仕事は私___できると思います。",
    choices: ["なら", "まで", "しか", "ほど"],
    answer: 0,
  },

  {
    id: "n4-049",
    type: "grammar",
    question: "この店は駅___近いです。",
    choices: ["を", "が", "に", "で"],
    answer: 2,
  },

  {
    id: "n4-050",
    type: "grammar",
    question: "日本語は英語___難しいです。",
    choices: ["より", "ほど", "しか", "まで"],
    answer: 0,
  },

  // =========================
  // VOCABULARY / CONTEXT
  // =========================

  {
    id: "n4-051",
    type: "vocabulary",
    question: "「急ぐ」の意味はどれですか？",
    choices: ["To hurry", "To stop", "To relax", "To forget"],
    answer: 0,
  },

  {
    id: "n4-052",
    type: "vocabulary",
    question: "「選ぶ」の意味はどれですか？",
    choices: ["To choose", "To explain", "To return", "To remember"],
    answer: 0,
  },

  {
    id: "n4-053",
    type: "vocabulary",
    question: "「調べる」の意味はどれですか？",
    choices: ["To investigate / look up", "To buy", "To sell", "To close"],
    answer: 0,
  },

  {
    id: "n4-054",
    type: "vocabulary",
    question: "「決める」の意味はどれですか？",
    choices: ["To decide", "To change", "To forget", "To borrow"],
    answer: 0,
  },

  {
    id: "n4-055",
    type: "vocabulary",
    question: "「返す」の意味はどれですか？",
    choices: ["To lend", "To return something", "To receive", "To lose"],
    answer: 1,
  },

  {
    id: "n4-056",
    type: "vocabulary",
    question: "「借りる」の意味はどれですか？",
    choices: ["To borrow", "To lend", "To buy", "To sell"],
    answer: 0,
  },

  {
    id: "n4-057",
    type: "vocabulary",
    question: "「貸す」の意味はどれですか？",
    choices: ["To borrow", "To lend", "To return", "To receive"],
    answer: 1,
  },

  {
    id: "n4-058",
    type: "vocabulary",
    question: "「集める」の意味はどれですか？",
    choices: ["To collect", "To separate", "To throw away", "To repair"],
    answer: 0,
  },

  // =========================
  // READING
  // =========================

  {
    id: "n4-059",
    type: "reading",
    question:
      "山田さんは毎朝7時に起きます。朝ごはんを食べてから、8時に家を出ます。会社まで電車で30分かかります。山田さんは何時ごろ会社に着きますか？",
    choices: ["7時半", "8時", "8時半", "9時"],
    answer: 2,
  },

  {
    id: "n4-060",
    type: "reading",
    question:
      "田中さんは土曜日に友達と映画を見るつもりでした。しかし、朝から雨が降っていたので、映画を見るのをやめて、家で本を読みました。田中さんは土曜日に何をしましたか？",
    choices: [
      "友達と映画を見ました",
      "家で本を読みました",
      "友達の家へ行きました",
      "買い物をしました",
    ],
    answer: 1,
  },

  {
    id: "n4-061",
    type: "reading",
    question:
      "私は日本語を勉強するために、毎日30分ニュースを聞いています。最初はよく分かりませんでしたが、最近は少し分かるようになりました。私は何を毎日していますか？",
    choices: [
      "日本語の本を30分読みます",
      "日本語のニュースを30分聞きます",
      "テレビを1時間見ます",
      "日本語の先生と話します",
    ],
    answer: 1,
  },

  {
    id: "n4-062",
    type: "reading",
    question:
      "鈴木さんは来月京都へ旅行する予定です。新幹線のチケットはもう買いましたが、ホテルはまだ予約していません。鈴木さんは何をまだしていませんか？",
    choices: [
      "京都へ行くこと",
      "新幹線のチケットを買うこと",
      "ホテルを予約すること",
      "旅行の日を決めること",
    ],
    answer: 2,
  },

  {
    id: "n4-063",
    type: "reading",
    question:
      "今日は会社の忘年会があります。仕事は6時に終わりますが、忘年会は7時からです。会社からレストランまでは電車で20分かかります。私は仕事が終わってから、駅の近くで少し買い物をするつもりです。忘年会は何時からですか？",
    choices: ["5時", "6時", "7時", "8時"],
    answer: 2,
  },

  {
    id: "n4-064",
    type: "reading",
    question:
      "昨日、私は母とスーパーへ行きました。母は野菜と魚を買いました。私は牛乳とパンを買いました。二人で買い物をしたあと、家へ帰りました。私は何を買いましたか？",
    choices: ["野菜と魚", "魚と牛乳", "牛乳とパン", "パンと野菜"],
    answer: 2,
  },

  {
    id: "n4-065",
    type: "reading",
    question:
      "この町には大きな図書館があります。図書館は月曜日が休みで、火曜日から日曜日までは朝9時から夜8時まで開いています。私は月曜日に本を借りに行きましたが、休みだったので借りることができませんでした。図書館はいつ休みですか？",
    choices: ["月曜日", "火曜日", "土曜日", "日曜日"],
    answer: 0,
  },

  {
    id: "n4-066",
    type: "reading",
    question:
      "佐藤さんは健康のために、最近毎朝30分歩いています。雨の日は歩きませんが、その代わりに家で運動します。昨日は雨だったので、佐藤さんはどうしましたか？",
    choices: [
      "30分歩きました",
      "何もしませんでした",
      "家で運動しました",
      "友達と走りました",
    ],
    answer: 2,
  },

  // =========================
  // MIXED FINAL QUESTIONS
  // =========================

  {
    id: "n4-067",
    type: "grammar",
    question: "電車に乗る前に、切符を___ください。",
    choices: ["買って", "買う", "買った", "買わない"],
    answer: 0,
  },

  {
    id: "n4-068",
    type: "grammar",
    question: "忙しかった___、昨日は友達に会えませんでした。",
    choices: ["ので", "のに", "ながら", "しか"],
    answer: 0,
  },

  {
    id: "n4-069",
    type: "vocabulary",
    question: "「間違える」の意味はどれですか？",
    choices: ["To make a mistake", "To remember", "To explain", "To arrive"],
    answer: 0,
  },

  {
    id: "n4-070",
    type: "kanji",
    question: "「経験」は何と読みますか？",
    choices: ["けいけん", "けいげん", "きょうけん", "けんけい"],
    answer: 0,
  },
];

export default n4Questions;
