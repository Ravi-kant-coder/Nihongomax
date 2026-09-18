const n5Questions = [
  // =========================
  // EXISTING 10 QUESTIONS
  // =========================

  {
    id: "n5-001",
    type: "kanji",
    question: "「山」は何と読みますか？",
    choices: ["やま", "かわ", "そら", "うみ"],
    answer: 0,
  },

  {
    id: "n5-002",
    type: "vocabulary",
    question: "「水」の意味はどれですか？",
    choices: ["Water", "Fire", "Mountain", "Rain"],
    answer: 0,
  },

  {
    id: "n5-003",
    type: "kanji",
    question: "「学生」は何と読みますか？",
    choices: ["せんせい", "がくせい", "がっこう", "せいと"],
    answer: 1,
  },

  {
    id: "n5-004",
    type: "grammar",
    question: "私は毎日日本語___勉強します。",
    choices: ["を", "が", "に", "で"],
    answer: 0,
  },

  {
    id: "n5-005",
    type: "vocabulary",
    question: "「大きい」の反対はどれですか？",
    choices: ["高い", "長い", "小さい", "新しい"],
    answer: 2,
  },

  {
    id: "n5-006",
    type: "grammar",
    question: "これは私___本です。",
    choices: ["を", "の", "が", "に"],
    answer: 1,
  },

  {
    id: "n5-007",
    type: "kanji",
    question: "「日曜日」の「日」は何と読みますか？",
    choices: ["げつ", "にち", "すい", "きん"],
    answer: 1,
  },

  {
    id: "n5-008",
    type: "vocabulary",
    question: "「先生」は英語で何ですか？",
    choices: ["Student", "Teacher", "Friend", "Doctor"],
    answer: 1,
  },

  {
    id: "n5-009",
    type: "grammar",
    question: "昨日、映画を___。",
    choices: ["見ます", "見ました", "見ません", "見る"],
    answer: 1,
  },

  {
    id: "n5-010",
    type: "reading",
    question:
      "田中さんは毎朝7時に起きます。朝ごはんを食べて、8時に学校へ行きます。田中さんは何時に学校へ行きますか？",
    choices: ["7時", "7時半", "8時", "9時"],
    answer: 2,
  },

  // =========================
  // NEW QUESTIONS 11 - 70
  // =========================

  {
    id: "n5-011",
    type: "kanji",
    question: "「川」は何と読みますか？",
    choices: ["やま", "かわ", "うみ", "そら"],
    answer: 1,
  },

  {
    id: "n5-012",
    type: "kanji",
    question: "「人」は何と読みますか？",
    choices: ["ひと", "いぬ", "ねこ", "こども"],
    answer: 0,
  },

  {
    id: "n5-013",
    type: "kanji",
    question: "「学校」は何と読みますか？",
    choices: ["がくせい", "せんせい", "がっこう", "こうこう"],
    answer: 2,
  },

  {
    id: "n5-014",
    type: "kanji",
    question: "「先生」は何と読みますか？",
    choices: ["せんせい", "せんせ", "せいせん", "せんさい"],
    answer: 0,
  },

  {
    id: "n5-015",
    type: "kanji",
    question: "「車」は何と読みますか？",
    choices: ["くるま", "でんしゃ", "じてんしゃ", "みち"],
    answer: 0,
  },

  {
    id: "n5-016",
    type: "kanji",
    question: "「電車」の意味はどれですか？",
    choices: ["Bus", "Train", "Car", "Bicycle"],
    answer: 1,
  },

  {
    id: "n5-017",
    type: "kanji",
    question: "「本」は何と読みますか？",
    choices: ["ほん", "ぼん", "ほう", "もと"],
    answer: 0,
  },

  {
    id: "n5-018",
    type: "kanji",
    question: "「雨」は何と読みますか？",
    choices: ["あめ", "ゆき", "くも", "かぜ"],
    answer: 0,
  },

  {
    id: "n5-019",
    type: "kanji",
    question: "「食べる」は何と読みますか？",
    choices: ["のべる", "たべる", "くべる", "よべる"],
    answer: 1,
  },

  {
    id: "n5-020",
    type: "kanji",
    question: "「飲む」は何と読みますか？",
    choices: ["よむ", "のむ", "やむ", "こむ"],
    answer: 1,
  },

  {
    id: "n5-021",
    type: "vocabulary",
    question: "「猫」の意味はどれですか？",
    choices: ["Dog", "Cat", "Bird", "Horse"],
    answer: 1,
  },

  {
    id: "n5-022",
    type: "vocabulary",
    question: "「犬」の意味はどれですか？",
    choices: ["Cat", "Dog", "Fish", "Bird"],
    answer: 1,
  },

  {
    id: "n5-023",
    type: "vocabulary",
    question: "「朝」の意味はどれですか？",
    choices: ["Morning", "Afternoon", "Night", "Evening"],
    answer: 0,
  },

  {
    id: "n5-024",
    type: "vocabulary",
    question: "「夜」の意味はどれですか？",
    choices: ["Morning", "Noon", "Night", "Day"],
    answer: 2,
  },

  {
    id: "n5-025",
    type: "vocabulary",
    question: "「学校へ行く」の意味はどれですか？",
    choices: [
      "To come home",
      "To go to school",
      "To study at home",
      "To leave school",
    ],
    answer: 1,
  },

  {
    id: "n5-026",
    type: "vocabulary",
    question: "「休み」の意味はどれですか？",
    choices: ["Holiday / Rest", "Work", "Exam", "Lesson"],
    answer: 0,
  },

  {
    id: "n5-027",
    type: "vocabulary",
    question: "「新しい」の反対はどれですか？",
    choices: ["古い", "大きい", "小さい", "高い"],
    answer: 0,
  },

  {
    id: "n5-028",
    type: "vocabulary",
    question: "「暑い」の意味はどれですか？",
    choices: ["Cold", "Hot", "Cool", "Warm"],
    answer: 1,
  },

  {
    id: "n5-029",
    type: "vocabulary",
    question: "「安い」の反対はどれですか？",
    choices: ["高い", "近い", "早い", "低い"],
    answer: 0,
  },

  {
    id: "n5-030",
    type: "vocabulary",
    question: "「早い」の反対はどれですか？",
    choices: ["新しい", "遅い", "長い", "強い"],
    answer: 1,
  },

  {
    id: "n5-031",
    type: "grammar",
    question: "私は東京___住んでいます。",
    choices: ["に", "を", "で", "へ"],
    answer: 0,
  },

  {
    id: "n5-032",
    type: "grammar",
    question: "毎朝、コーヒー___飲みます。",
    choices: ["が", "を", "に", "へ"],
    answer: 1,
  },

  {
    id: "n5-033",
    type: "grammar",
    question: "学校___日本語を勉強します。",
    choices: ["で", "を", "が", "の"],
    answer: 0,
  },

  {
    id: "n5-034",
    type: "grammar",
    question: "日曜日___友達と映画を見ました。",
    choices: ["を", "に", "で", "が"],
    answer: 1,
  },

  {
    id: "n5-035",
    type: "grammar",
    question: "私は7時___起きます。",
    choices: ["を", "に", "で", "が"],
    answer: 1,
  },

  {
    id: "n5-036",
    type: "grammar",
    question: "これは田中さん___かばんです。",
    choices: ["を", "に", "の", "で"],
    answer: 2,
  },

  {
    id: "n5-037",
    type: "grammar",
    question: "私は毎日学校___行きます。",
    choices: ["を", "へ", "で", "が"],
    answer: 1,
  },

  {
    id: "n5-038",
    type: "grammar",
    question: "りんご___二つあります。",
    choices: ["を", "が", "に", "で"],
    answer: 1,
  },

  {
    id: "n5-039",
    type: "grammar",
    question: "私は日本語___話します。",
    choices: ["を", "で", "に", "が"],
    answer: 1,
  },

  {
    id: "n5-040",
    type: "grammar",
    question: "机の上___本があります。",
    choices: ["に", "を", "で", "へ"],
    answer: 0,
  },

  {
    id: "n5-041",
    type: "grammar",
    question: "昨日は学校へ___。",
    choices: ["行きます", "行きました", "行く", "行って"],
    answer: 1,
  },

  {
    id: "n5-042",
    type: "grammar",
    question: "明日、東京へ___。",
    choices: ["行きました", "行きます", "行きませんでした", "行った"],
    answer: 1,
  },

  {
    id: "n5-043",
    type: "grammar",
    question: "毎晩、本を___。",
    choices: ["読みます", "読みました", "読んで", "読んだ"],
    answer: 0,
  },

  {
    id: "n5-044",
    type: "grammar",
    question: "昨日、宿題を___。",
    choices: ["します", "しました", "する", "しない"],
    answer: 1,
  },

  {
    id: "n5-045",
    type: "grammar",
    question: "このりんごは___です。",
    choices: ["おいしい", "おいしく", "おいし", "おいしな"],
    answer: 0,
  },

  {
    id: "n5-046",
    type: "grammar",
    question: "富士山は___山です。",
    choices: ["きれい", "きれいな", "きれいに", "きれいで"],
    answer: 1,
  },

  {
    id: "n5-047",
    type: "grammar",
    question: "この部屋はあまり___ないです。",
    choices: ["広い", "広く", "広かった", "広いな"],
    answer: 0,
  },

  {
    id: "n5-048",
    type: "grammar",
    question: "日本語は___です。",
    choices: ["おもしろい", "おもしろく", "おもしろいな", "おもしろかったな"],
    answer: 0,
  },

  {
    id: "n5-049",
    type: "vocabulary",
    question: "「いす」は英語で何ですか？",
    choices: ["Table", "Chair", "Door", "Window"],
    answer: 1,
  },

  {
    id: "n5-050",
    type: "vocabulary",
    question: "「つくえ」は英語で何ですか？",
    choices: ["Desk", "Chair", "Bag", "Book"],
    answer: 0,
  },

  {
    id: "n5-051",
    type: "vocabulary",
    question: "「かばん」は英語で何ですか？",
    choices: ["Shoes", "Bag", "Hat", "Umbrella"],
    answer: 1,
  },

  {
    id: "n5-052",
    type: "vocabulary",
    question: "「くつ」は英語で何ですか？",
    choices: ["Socks", "Shoes", "Shirt", "Pants"],
    answer: 1,
  },

  {
    id: "n5-053",
    type: "vocabulary",
    question: "「傘」の意味はどれですか？",
    choices: ["Umbrella", "Hat", "Coat", "Bag"],
    answer: 0,
  },

  {
    id: "n5-054",
    type: "vocabulary",
    question: "「駅」の意味はどれですか？",
    choices: ["School", "Station", "Hospital", "Bank"],
    answer: 1,
  },

  {
    id: "n5-055",
    type: "vocabulary",
    question: "「病院」の意味はどれですか？",
    choices: ["Hospital", "Library", "Restaurant", "Station"],
    answer: 0,
  },

  {
    id: "n5-056",
    type: "vocabulary",
    question: "「銀行」の意味はどれですか？",
    choices: ["Post office", "Bank", "School", "Hospital"],
    answer: 1,
  },

  {
    id: "n5-057",
    type: "reading",
    question:
      "山田さんは毎朝6時に起きます。7時に朝ごはんを食べます。山田さんは何時に朝ごはんを食べますか？",
    choices: ["5時", "6時", "7時", "8時"],
    answer: 2,
  },

  {
    id: "n5-058",
    type: "reading",
    question:
      "田中さんは月曜日から金曜日まで働きます。土曜日と日曜日は休みです。田中さんはいつ休みですか？",
    choices: ["月曜日", "水曜日", "金曜日", "土曜日と日曜日"],
    answer: 3,
  },

  {
    id: "n5-059",
    type: "reading",
    question:
      "私は毎朝パンを食べます。コーヒーも飲みます。私は毎朝何を食べますか？",
    choices: ["ごはん", "パン", "そば", "うどん"],
    answer: 1,
  },

  {
    id: "n5-060",
    type: "reading",
    question:
      "鈴木さんは東京に住んでいます。会社は東京にあります。鈴木さんはどこに住んでいますか？",
    choices: ["大阪", "京都", "東京", "北海道"],
    answer: 2,
  },

  {
    id: "n5-061",
    type: "reading",
    question:
      "今日は雨です。私は傘を持って学校へ行きます。私は何を持って行きますか？",
    choices: ["かばん", "本", "傘", "くつ"],
    answer: 2,
  },

  {
    id: "n5-062",
    type: "reading",
    question:
      "これは私の家です。家には父と母と弟がいます。私の家には何人いますか？",
    choices: ["2人", "3人", "4人", "5人"],
    answer: 2,
  },

  {
    id: "n5-063",
    type: "kanji",
    question: "「月曜日」の「月」は何と読みますか？",
    choices: ["げつ", "にち", "か", "もく"],
    answer: 0,
  },

  {
    id: "n5-064",
    type: "kanji",
    question: "「金曜日」の「金」は何と読みますか？",
    choices: ["きん", "げつ", "すい", "ど"],
    answer: 0,
  },

  {
    id: "n5-065",
    type: "kanji",
    question: "「火曜日」の「火」は何と読みますか？",
    choices: ["き", "か", "すい", "ど"],
    answer: 1,
  },

  {
    id: "n5-066",
    type: "kanji",
    question: "「木曜日」の「木」は何と読みますか？",
    choices: ["もく", "きん", "ど", "か"],
    answer: 0,
  },

  {
    id: "n5-067",
    type: "vocabulary",
    question: "「いちばん」の意味はどれですか？",
    choices: ["First / Most", "Last", "Sometimes", "Together"],
    answer: 0,
  },

  {
    id: "n5-068",
    type: "vocabulary",
    question: "「たくさん」の意味はどれですか？",
    choices: ["A little", "Many / A lot", "Never", "Only"],
    answer: 1,
  },

  {
    id: "n5-069",
    type: "grammar",
    question: "りんごを三___買いました。",
    choices: ["人", "本", "個", "枚"],
    answer: 2,
  },

  {
    id: "n5-070",
    type: "grammar",
    question: "教室に学生が五___います。",
    choices: ["本", "人", "枚", "台"],
    answer: 1,
  },
];

export default n5Questions;
