import type { Deduction } from "../data/deductions";

type Props = {
  deduction: Deduction;
  rank: number;
};

const difficultyLabel = ["", "かんたん", "ふつう", "確定申告が必要"];
const difficultyColor = [
  "",
  "bg-emerald-100 text-emerald-700",
  "bg-yellow-100 text-yellow-700",
  "bg-orange-100 text-orange-700",
];

export function DeductionCard({ deduction, rank }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 relative overflow-hidden">
      {/* ランクバッジ */}
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-emerald-500 text-white text-sm font-bold flex items-center justify-center">
        {rank}
      </div>

      {/* タイトル */}
      <h3 className="text-xl font-bold text-gray-800 mb-1 pr-10">{deduction.name}</h3>
      <p className="text-emerald-600 text-sm font-medium mb-3">{deduction.shortDesc}</p>

      {/* タグ */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
          {deduction.deductionType}
        </span>
        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor[deduction.difficulty]}`}>
          手続き：{difficultyLabel[deduction.difficulty]}
        </span>
        {deduction.returnGift && (
          <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700">
            🎁 返礼品あり
          </span>
        )}
      </div>

      {/* 説明 */}
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{deduction.description}</p>

      {/* 寄付先例 */}
      <div className="bg-gray-50 rounded-xl p-3 mb-4">
        <p className="text-xs text-gray-500 font-medium mb-1">寄付先の例</p>
        <ul className="text-sm text-gray-700 space-y-0.5">
          {deduction.exampleOrgs.map((org) => (
            <li key={org} className="flex items-center gap-1">
              <span className="text-emerald-500">•</span>
              {org}
            </li>
          ))}
        </ul>
      </div>

      {/* 控除上限 */}
      <p className="text-xs text-gray-500">
        <span className="font-medium">控除上限の目安：</span>
        {deduction.maxDeduction}
      </p>
    </div>
  );
}
