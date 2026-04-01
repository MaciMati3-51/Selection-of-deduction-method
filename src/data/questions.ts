import type { Category } from "./deductions";

export type QuizState = {
  income: string; // "200" "300" "500" "700" "1000" "1500"
  hasConfirmation: boolean | null;
  categories: Category[];
  wantsReturnGift: boolean | null;
};

export type QuestionId = "income" | "confirmation" | "category" | "returnGift";

export type Question = {
  id: QuestionId;
  step: number;
  title: string;
  subtitle?: string;
  type: "single" | "multi" | "yesno";
  options: { label: string; value: string | boolean; emoji?: string }[];
};

export const QUESTIONS: Question[] = [
  {
    id: "income",
    step: 1,
    title: "おおよその年収を教えてください",
    subtitle: "控除額の目安を計算するために使います",
    type: "single",
    options: [
      { label: "〜200万円", value: "200" },
      { label: "200〜400万円", value: "300" },
      { label: "400〜600万円", value: "500" },
      { label: "600〜800万円", value: "700" },
      { label: "800万〜1,000万円", value: "1000" },
      { label: "1,000万円以上", value: "1500" },
    ],
  },
  {
    id: "confirmation",
    step: 2,
    title: "確定申告はしていますか？",
    subtitle: "手続きの難しさに関係します",
    type: "yesno",
    options: [
      { label: "している（または今後する予定）", value: true, emoji: "✅" },
      { label: "していない（会社員・ワンストップ希望）", value: false, emoji: "🏢" },
    ],
  },
  {
    id: "category",
    step: 3,
    title: "応援したい分野を選んでください",
    subtitle: "複数選択できます",
    type: "multi",
    options: [
      { label: "地域・まちづくり", value: "region", emoji: "🏘️" },
      { label: "子ども・教育", value: "children", emoji: "📚" },
      { label: "環境・動物", value: "environment", emoji: "🌱" },
      { label: "医療・福祉", value: "welfare", emoji: "🏥" },
      { label: "文化・芸術・スポーツ", value: "culture", emoji: "🎨" },
      { label: "社会課題（貧困・難民等）", value: "social", emoji: "🤝" },
    ],
  },
  {
    id: "returnGift",
    step: 4,
    title: "返礼品（特産品など）は欲しいですか？",
    subtitle: "ふるさと納税ならではの特典です",
    type: "yesno",
    options: [
      { label: "欲しい！お得感も大事", value: true, emoji: "🎁" },
      { label: "寄付の社会的意義を重視したい", value: false, emoji: "💚" },
    ],
  },
];
