import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "トップ", path: "/", emoji: "🏠" },
  { label: "診断スタート", path: "/quiz", emoji: "🎯" },
  { label: "控除額比較", path: "/compare", emoji: "📊" },
  { label: "制度一覧", path: "/list", emoji: "📋" },
];

type Props = {
  showBack?: boolean;
  onBackOverride?: () => void;
};

export function Header({ showBack = false, onBackOverride }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        {/* 左：ロゴ or 戻るボタン */}
        <div className="flex items-center gap-2">
          {showBack && (
            <button
              onClick={() => (onBackOverride ? onBackOverride() : navigate(-1))}
              className="text-gray-400 hover:text-gray-600 transition-colors text-xl mr-1"
              aria-label="戻る"
            >
              ←
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">💡</span>
            <span className="font-bold text-emerald-700 text-lg">控除ナビ</span>
          </button>
        </div>

        {/* 右：ハンバーガーボタン */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-xl hover:bg-gray-100 transition-colors"
          aria-label="メニューを開く"
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-5 bg-gray-700 rounded transition-all duration-300 origin-center ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-700 rounded transition-all duration-300 ${
              open ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-gray-700 rounded transition-all duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </header>

      {/* オーバーレイ */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ドロワー */}
      <nav
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ドロワーヘッダー */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-xl">💡</span>
            <span className="font-bold text-emerald-700">控除ナビ</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl transition-colors"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        {/* ナビリンク */}
        <ul className="flex-1 px-4 py-6 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate(item.path);
                  }}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* ドロワーフッター */}
        <div className="px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 leading-relaxed">
            ※ このサイトは税務アドバイスを提供するものではありません。
          </p>
        </div>
      </nav>
    </>
  );
}
