import { useState } from "react";
import { DEDUCTIONS } from "../data/deductions";
import type { Category } from "../data/deductions";
import { DeductionCard } from "../components/DeductionCard";
import { Header } from "../components/Header";

const CATEGORY_OPTIONS: { label: string; value: Category | "all"; emoji: string }[] = [
  { label: "すべて", value: "all", emoji: "🌐" },
  { label: "地域", value: "region", emoji: "🏘️" },
  { label: "子ども・教育", value: "children", emoji: "📚" },
  { label: "環境・動物", value: "environment", emoji: "🌱" },
  { label: "医療・福祉", value: "welfare", emoji: "🏥" },
  { label: "文化・芸術", value: "culture", emoji: "🎨" },
  { label: "社会課題", value: "social", emoji: "🤝" },
];

export function List() {
  const [filter, setFilter] = useState<Category | "all">("all");

  const filtered =
    filter === "all"
      ? DEDUCTIONS
      : DEDUCTIONS.filter((d) => d.categories.includes(filter));

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col">
      <Header />

      <main className="flex-1 px-6 py-10 max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">控除制度一覧</h1>
          <p className="text-gray-500 text-sm">寄付で税金を控除できる6つの制度</p>
        </div>

        {/* フィルター */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {CATEGORY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === opt.value
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300"
              }`}
            >
              {opt.emoji} {opt.label}
            </button>
          ))}
        </div>

        {/* 一覧 */}
        <div className="space-y-5">
          {filtered.map((d, i) => (
            <DeductionCard key={d.id} deduction={d} rank={i + 1} />
          ))}
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
