import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEDUCTIONS } from "../data/deductions";
import { Header } from "../components/Header";

// 年収別の所得税率（簡易）
const TAX_RATES: Record<string, { income: number; rate: number; localRate: number }> = {
  "200": { income: 2000000, rate: 0.05, localRate: 0.1 },
  "300": { income: 3000000, rate: 0.1, localRate: 0.1 },
  "500": { income: 5000000, rate: 0.2, localRate: 0.1 },
  "700": { income: 7000000, rate: 0.23, localRate: 0.1 },
  "1000": { income: 10000000, rate: 0.33, localRate: 0.1 },
  "1500": { income: 15000000, rate: 0.4, localRate: 0.1 },
};

const INCOME_OPTIONS = [
  { label: "〜200万円", value: "200" },
  { label: "300万円", value: "300" },
  { label: "500万円", value: "500" },
  { label: "700万円", value: "700" },
  { label: "1,000万円", value: "1000" },
  { label: "1,500万円+", value: "1500" },
];

// 各控除の節税額を計算（簡易）
function calcSaving(
  deductionId: string,
  donation: number,
  incomeKey: string
): { saving: number; detail: string } {
  const { rate, localRate } = TAX_RATES[incomeKey];
  const combined = rate + localRate;

  if (deductionId === "furusato") {
    // 所得控除 + 住民税控除（ワンストップ）
    const effective = Math.max(0, donation - 2000);
    const saving = Math.round(effective * combined);
    return { saving, detail: `(寄付額 − 2,000円) × ${Math.round(combined * 100)}%` };
  }

  if (deductionId === "npo") {
    // 税額控除 40%
    const saving = Math.round(Math.max(0, donation - 2000) * 0.4);
    return { saving, detail: "(寄付額 − 2,000円) × 40%" };
  }

  if (deductionId === "seito") {
    // 税額控除 30%
    const saving = Math.round(Math.max(0, donation - 2000) * 0.3);
    return { saving, detail: "(寄付額 − 2,000円) × 30%" };
  }

  if (deductionId === "akaijubako") {
    // 税額控除 40%
    const saving = Math.round(Math.max(0, donation - 2000) * 0.4);
    return { saving, detail: "(寄付額 − 2,000円) × 40%" };
  }

  // 所得控除系（koeki, school）
  const saving = Math.round(donation * combined);
  return { saving, detail: `寄付額 × ${Math.round(combined * 100)}%（所得控除）` };
}

const difficultyLabel = ["", "かんたん", "ふつう", "要確定申告"];
const difficultyColor = [
  "",
  "text-emerald-600 bg-emerald-50",
  "text-yellow-600 bg-yellow-50",
  "text-orange-600 bg-orange-50",
];

export function Compare() {
  const navigate = useNavigate();
  const [incomeKey, setIncomeKey] = useState("500");
  const [donation, setDonation] = useState(50000);

  const results = DEDUCTIONS.map((d) => ({
    ...d,
    ...calcSaving(d.id, donation, incomeKey),
  })).sort((a, b) => b.saving - a.saving);

  const maxSaving = Math.max(...results.map((r) => r.saving));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-10 max-w-3xl mx-auto w-full">
        {/* タイトル */}
        <div className="text-center mb-8">
          <p className="text-emerald-600 font-medium text-sm mb-2">Comparison</p>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">控除額を比較する</h1>
          <p className="text-gray-500 text-sm">
            年収と寄付額を変えて、各制度の節税効果を比較できます
          </p>
        </div>

        {/* 入力パネル */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
          {/* 年収 */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">年収</p>
            <div className="flex flex-wrap gap-2">
              {INCOME_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setIncomeKey(opt.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    incomeKey === opt.value
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* 寄付額スライダー */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-gray-700">寄付額</p>
              <span className="text-lg font-bold text-emerald-700">
                {donation.toLocaleString()}円
              </span>
            </div>
            <input
              type="range"
              min={5000}
              max={500000}
              step={5000}
              value={donation}
              onChange={(e) => setDonation(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>5,000円</span>
              <span>500,000円</span>
            </div>
          </div>
        </div>

        {/* バーチャート比較 */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-5 text-lg">節税額の比較</h2>
          <div className="space-y-4">
            {results.map((r, i) => (
              <div key={r.id}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {i === 0 && <span className="text-base">🥇</span>}
                    {i === 1 && <span className="text-base">🥈</span>}
                    {i === 2 && <span className="text-base">🥉</span>}
                    {i > 2 && <span className="w-5" />}
                    <span className="text-sm font-medium text-gray-800">{r.name}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[r.difficulty]}`}
                    >
                      {difficultyLabel[r.difficulty]}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-emerald-700">
                    約{r.saving.toLocaleString()}円
                  </span>
                </div>
                {/* バー */}
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${maxSaving > 0 ? (r.saving / maxSaving) * 100 : 0}%`,
                      backgroundColor: i === 0 ? "#10b981" : i === 1 ? "#34d399" : i === 2 ? "#6ee7b7" : "#d1fae5",
                    }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 詳細テーブル */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800 text-lg">制度の詳細比較</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">制度名</th>
                  <th className="text-center px-3 py-3 font-medium">控除タイプ</th>
                  <th className="text-center px-3 py-3 font-medium">手続き</th>
                  <th className="text-center px-3 py-3 font-medium">返礼品</th>
                  <th className="text-right px-4 py-3 font-medium">節税額目安</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {results.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                    <td className="px-3 py-3 text-center">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                        {r.deductionType.length > 12
                          ? r.deductionType.split(" ")[0]
                          : r.deductionType}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[r.difficulty]}`}
                      >
                        {difficultyLabel[r.difficulty]}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-center">
                      {r.returnGift ? (
                        <span className="text-pink-500">🎁 あり</span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700">
                      約{r.saving.toLocaleString()}円
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              ※ 家族構成・医療費控除等の他の控除により実際の金額は異なります。参考値としてご活用ください。
            </p>
          </div>
        </div>

        {/* 診断へ誘導 */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-4">
            どの制度が自分に合っているか迷ったら
          </p>
          <button
            onClick={() => navigate("/quiz")}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl transition-all active:scale-95"
          >
            <span>🎯</span>
            <span>診断で探す</span>
          </button>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-6 py-4 text-center mt-6">
        <p className="text-xs text-gray-400">
          ※ このサイトは税務アドバイスを提供するものではありません。実際の控除申請は税理士・税務署にご相談ください。
        </p>
      </footer>
    </div>
  );
}
