export type Category =
  | "region"
  | "children"
  | "environment"
  | "welfare"
  | "culture"
  | "social";

export type Deduction = {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  deductionType: string;
  difficulty: 1 | 2 | 3; // 1=簡単 2=普通 3=要確定申告
  categories: Category[];
  returnGift: boolean; // 返礼品あり
  requiresConfirmation: boolean; // 確定申告が必要か
  exampleOrgs: string[];
  maxDeduction: string;
  link: string;
};

export const DEDUCTIONS: Deduction[] = [
  {
    id: "furusato",
    name: "ふるさと納税",
    shortDesc: "応援したい自治体に寄付して返礼品ももらえる",
    description:
      "全国の自治体を「ふるさと」として応援できる制度。寄付金のうち2,000円を超える部分が所得税・住民税から控除されます。ワンストップ特例を使えば確定申告も不要。返礼品として地域の特産品を受け取れます。",
    deductionType: "所得控除 + 税額控除",
    difficulty: 1,
    categories: ["region", "children", "environment", "welfare", "culture", "social"],
    returnGift: true,
    requiresConfirmation: false,
    exampleOrgs: ["北海道上士幌町", "長野県富士見町", "宮崎県都城市"],
    maxDeduction: "年収・家族構成により異なる（目安：年収500万で約6万円）",
    link: "https://www.soumu.go.jp/main_sosiki/jichi_zeisei/czaisei/czaisei_seido/furusato/policy/",
  },
  {
    id: "npo",
    name: "認定NPO法人への寄付",
    shortDesc: "社会課題に取り組むNPOを直接支援できる",
    description:
      "内閣府が認定した認定NPO法人・特例認定NPO法人への寄付は、所得控除と税額控除のどちらかを選べます。税額控除を選ぶと寄付額の40%が税金から直接引かれるため、高い節税効果が得られます。",
    deductionType: "所得控除 または 税額控除（40%）",
    difficulty: 2,
    categories: ["children", "environment", "welfare", "social"],
    returnGift: false,
    requiresConfirmation: true,
    exampleOrgs: ["子ども食堂ネットワーク", "WWFジャパン", "難民支援協会"],
    maxDeduction: "所得の40%まで（所得控除の場合）",
    link: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1263.htm",
  },
  {
    id: "koeki",
    name: "公益社団・財団法人への寄付",
    shortDesc: "教育・文化・研究分野の団体を応援できる",
    description:
      "公益社団法人・公益財団法人に対する寄付は、特定公益増進法人として所得控除の対象になります。芸術・文化・学術・スポーツなど幅広い分野をカバーしています。",
    deductionType: "所得控除",
    difficulty: 2,
    categories: ["culture", "children", "social"],
    returnGift: false,
    requiresConfirmation: true,
    exampleOrgs: ["日本ユニセフ協会", "日本赤十字社", "国立大学の基金"],
    maxDeduction: "所得の40%まで",
    link: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1263.htm",
  },
  {
    id: "school",
    name: "学校・教育機関への寄付",
    shortDesc: "母校や地元の学校を応援できる",
    description:
      "私立学校や国立大学などへの寄付は、特定公益増進法人への寄付として所得控除の対象となります。卒業した大学への寄付や、地域の教育機関の支援に活用できます。",
    deductionType: "所得控除",
    difficulty: 2,
    categories: ["children", "culture"],
    returnGift: false,
    requiresConfirmation: true,
    exampleOrgs: ["国立大学法人の寄付金窓口", "私立学校振興・共済事業団認定校"],
    maxDeduction: "所得の40%まで",
    link: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1263.htm",
  },
  {
    id: "akaijubako",
    name: "共同募金・日本赤十字社への寄付",
    shortDesc: "身近な社会福祉・災害支援に役立てられる",
    description:
      "共同募金（赤い羽根）や日本赤十字社への寄付は、税額控除の対象となります。地域の福祉活動や災害支援に直接役立ちます。手続きが比較的簡単です。",
    deductionType: "税額控除（寄付額 − 2,000円の40%）",
    difficulty: 2,
    categories: ["welfare", "social"],
    returnGift: false,
    requiresConfirmation: true,
    exampleOrgs: ["共同募金会", "日本赤十字社"],
    maxDeduction: "所得の40%まで",
    link: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1263.htm",
  },
  {
    id: "seito",
    name: "政党・政治資金団体への寄付",
    shortDesc: "政治・社会の仕組みを変えることに貢献したい人向け",
    description:
      "政党や政治資金団体への寄付は税額控除の対象となります。寄付額の30%（最大で所得税額の25%相当）が税額から控除されます。政治への積極的な関与を通じて社会に働きかけたい人向けです。",
    deductionType: "税額控除（30%） または 所得控除",
    difficulty: 3,
    categories: ["social"],
    returnGift: false,
    requiresConfirmation: true,
    exampleOrgs: ["各政党の党費・献金窓口"],
    maxDeduction: "年間250万円まで（税額控除の場合）",
    link: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1263.htm",
  },
];

export type Answer = {
  income: string;
  hasConfirmation: boolean | null;
  categories: Category[];
  wantsReturnGift: boolean | null;
};

export function getRecommendations(answer: Answer): Deduction[] {
  const scored = DEDUCTIONS.map((d) => {
    let score = 0;

    // カテゴリ一致
    const matchedCategories = answer.categories.filter((c) =>
      d.categories.includes(c)
    );
    score += matchedCategories.length * 10;

    // 返礼品希望
    if (answer.wantsReturnGift === true && d.returnGift) score += 20;
    if (answer.wantsReturnGift === false && !d.returnGift) score += 10;

    // 確定申告有無
    if (answer.hasConfirmation === false && !d.requiresConfirmation) score += 15;
    if (answer.hasConfirmation === true) score += 5; // 申告できるなら全部OK

    // 年収が高い場合は税額控除系を優遇
    const incomeNum = parseInt(answer.income, 10);
    if (incomeNum >= 500 && d.deductionType.includes("税額控除")) score += 5;

    return { deduction: d, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.deduction);
}
