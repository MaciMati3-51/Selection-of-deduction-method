import { useLocation, useNavigate } from "react-router-dom";
import { getRecommendations, DEDUCTIONS } from "../data/deductions";
import type { QuizState } from "../data/questions";
import { DeductionCard } from "../components/DeductionCard";
import { Header } from "../components/Header";
import { useState } from "react";

const FURUSATO_LIMIT: Record<string, number> = {
  "200": 15000,
  "300": 28000,
  "500": 61000,
  "700": 108000,
  "1000": 176000,
  "1500": 324000,
};

export function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as QuizState | null;
  const [donationAmount, setDonationAmount] = useState(30000);

  if (!state) {
    navigate("/");
    return null;
  }

  const recommendations = getRecommendations(state);
  const allIfEmpty = recommendations.length === 0 ? DEDUCTIONS.slice(0, 3) : recommendations;

  const incomeNum = parseInt(state.income, 10);
  const furusatoLimit = FURUSATO_LIMIT[state.income] ?? 0;
  const estimatedDeductionAmount = Math.max(0, donationAmount - 2000);
  const taxRate = incomeNum >= 1000 ? 0.33 : incomeNum >= 700 ? 0.23 : incomeNum >= 500 ? 0.2 : 0.1;
  const estimatedTaxSaving = Math.round(estimatedDeductionAmount * taxRate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        {/* 結果タイトル */}
        <div className="text-center mb-8">
          <p className="text-emerald-600 font-medium text-sm mb-2">診断結果</p>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            あなたにおすすめの<br />控除方法はこちら
          </h1>
          <p className="text-gray-500 text-sm">
            回答内容をもとに優先度の高い順に並べています
          </p>
        </div>

        {/* シミュレーター */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-4">📊 節税シミュレーター（簡易）</h2>
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">
              年間の寄付予定額：<span className="font-bold text-emerald-700">{donationAmount.toLocaleString()}円</span>
            </label>
            <input
              type="range"
              min={5000}
              max={500000}
              step={5000}
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>5,000円</span>
              <span>500,000円</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">推定節税額（目安）</p>
              <p className="text-2xl font-bold text-emerald-700">
                約{estimatedTaxSaving.toLocaleString()}円
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-500 mb-1">ふるさと納税の上限目安</p>
              <p className="text-2xl font-bold text-blue-700">
                {furusatoLimit > 0 ? `約${furusatoLimit.toLocaleString()}円` : "計算中"}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            ※ 家族構成・その他控除により実際の金額は異なります。あくまで参考値です。
          </p>
        </div>

        {/* レコメンドカード */}
        <div className="space-y-5 mb-8">
          {allIfEmpty.map((d, i) => (
            <DeductionCard key={d.id} deduction={d} rank={i + 1} />
          ))}
        </div>

        {/* アクション */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate("/quiz")}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95"
          >
            もう一度診断する
          </button>
          <button
            onClick={() => navigate("/compare")}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-xl border-2 border-gray-200 transition-all active:scale-95"
          >
            📊 控除額を比較する
          </button>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-6 py-4 text-center">
        <p className="text-xs text-gray-400">
          ※ このサイトは税務アドバイスを提供するものではありません。実際の控除申請は税理士・税務署にご相談ください。
        </p>
      </footer>
    </div>
  );
}
