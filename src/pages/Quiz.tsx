import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTIONS } from "../data/questions";
import type { QuizState } from "../data/questions";
import type { Category } from "../data/deductions";
import { ProgressBar } from "../components/ProgressBar";
import { Header } from "../components/Header";

const INITIAL_STATE: QuizState = {
  income: "",
  hasConfirmation: null,
  categories: [],
  wantsReturnGift: null,
};

export function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<QuizState>(INITIAL_STATE);

  const question = QUESTIONS[step];
  const total = QUESTIONS.length;

  function handleSingle(value: string) {
    const newState = { ...state, income: value };
    setState(newState);
    nextStep(newState);
  }

  function handleYesNo(value: boolean) {
    let newState: QuizState;
    if (question.id === "confirmation") {
      newState = { ...state, hasConfirmation: value };
    } else {
      newState = { ...state, wantsReturnGift: value };
    }
    setState(newState);
    nextStep(newState);
  }

  function handleMultiToggle(value: Category) {
    const current = state.categories;
    const next = current.includes(value)
      ? current.filter((c) => c !== value)
      : [...current, value];
    setState({ ...state, categories: next });
  }

  function handleMultiNext() {
    if (state.categories.length === 0) return;
    nextStep(state);
  }

  function nextStep(currentState: QuizState) {
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      navigate("/result", { state: currentState });
    }
  }

  function goBack() {
    if (step === 0) {
      navigate("/");
    } else {
      setStep(step - 1);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex flex-col">
      <Header showBack onBackOverride={goBack} />

      {/* 診断コンテンツ */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-lg">
          <ProgressBar current={step + 1} total={total} />

          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            {/* 質問テキスト */}
            <div className="mb-6">
              <p className="text-xs text-emerald-600 font-medium mb-2">Q{question.step}</p>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{question.title}</h2>
              {question.subtitle && (
                <p className="text-sm text-gray-500">{question.subtitle}</p>
              )}
            </div>

            {/* 選択肢 */}
            <div className="space-y-3">
              {question.type === "single" &&
                question.options.map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => handleSingle(opt.value as string)}
                    className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-150 font-medium text-gray-700 active:scale-95"
                  >
                    {opt.emoji && <span className="mr-2">{opt.emoji}</span>}
                    {opt.label}
                  </button>
                ))}

              {question.type === "yesno" &&
                question.options.map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => handleYesNo(opt.value as boolean)}
                    className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-150 font-medium text-gray-700 active:scale-95"
                  >
                    {opt.emoji && <span className="mr-2">{opt.emoji}</span>}
                    {opt.label}
                  </button>
                ))}

              {question.type === "multi" && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {question.options.map((opt) => {
                      const isSelected = state.categories.includes(opt.value as Category);
                      return (
                        <button
                          key={String(opt.value)}
                          onClick={() => handleMultiToggle(opt.value as Category)}
                          className={`text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 font-medium active:scale-95 ${
                            isSelected
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                              : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 text-gray-700"
                          }`}
                        >
                          <div className="text-xl mb-1">{opt.emoji}</div>
                          <div className="text-sm">{opt.label}</div>
                        </button>
                      );
                    })}
                  </div>
                  <button
                    onClick={handleMultiNext}
                    disabled={state.categories.length === 0}
                    className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white font-bold py-3 rounded-xl transition-all duration-150 active:scale-95"
                  >
                    次へ →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
