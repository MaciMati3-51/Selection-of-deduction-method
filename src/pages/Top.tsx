import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export function Top() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col">
      <Header />

      {/* メインコンテンツ */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-emerald-600 font-medium text-sm tracking-widest mb-4 uppercase">
            Tax Deduction Navigator
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
            税金の使い道、<br />
            <span className="text-emerald-600">自分で決めませんか？</span>
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            ふるさと納税のように、寄付として税金を控除できる仕組みはたくさんあります。<br />
            簡単な診断で、あなたに合った控除方法を見つけましょう。
          </p>
          <p className="text-gray-400 text-sm mb-12">
            所要時間：約1〜2分
          </p>

          <button
            onClick={() => navigate("/quiz")}
            className="inline-flex items-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
          >
            <span>診断スタート</span>
            <span className="text-2xl">→</span>
          </button>
        </div>
      </main>

      {/* 特徴カード */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            { emoji: "🎯", title: "あなたに合った提案", desc: "年収・興味分野から最適な制度をレコメンド" },
            { emoji: "📊", title: "節税額を比較できる", desc: "制度ごとの控除額をグラフで一目比較" },
            { emoji: "📋", title: "手続きもわかる", desc: "難易度に応じた手続き方法をわかりやすく説明" },
          ].map((item) => (
            <div key={item.title} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left">
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t border-gray-100 px-6 py-4 text-center">
        <p className="text-xs text-gray-400">
          ※ このサイトは税務アドバイスを提供するものではありません。実際の控除申請は税理士・税務署にご相談ください。
        </p>
      </footer>
    </div>
  );
}
