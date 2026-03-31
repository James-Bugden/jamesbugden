import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CareerPhase } from "@/hooks/useProfile";

const i18n = {
  en: {
    heading: "Where are you in your job search?",
    sub: "This helps us show you the most relevant tools and guides first.\nYou can change this anytime.",
    phases: [
      { id: "applying" as CareerPhase, emoji: "📋", label: "Applying", desc: "I'm searching for roles, updating my resume, and reaching out to companies." },
      { id: "interviewing" as CareerPhase, emoji: "🎙️", label: "Interviewing", desc: "I have interviews scheduled or I'm actively preparing for them." },
      { id: "negotiating" as CareerPhase, emoji: "💰", label: "Negotiating", desc: "I've received an offer or I'm expecting one soon." },
    ],
    cta: "Continue",
    saving: "Saving…",
  },
  zh: {
    heading: "你目前在求職的哪個階段？",
    sub: "這會幫助我們優先顯示最相關的工具和指南。\n你隨時可以更改。",
    phases: [
      { id: "applying" as CareerPhase, emoji: "📋", label: "投遞申請", desc: "我正在搜尋職缺、更新履歷、主動聯繫公司。" },
      { id: "interviewing" as CareerPhase, emoji: "🎙️", label: "面試準備", desc: "我已經有面試安排，或正在積極準備中。" },
      { id: "negotiating" as CareerPhase, emoji: "💰", label: "薪資談判", desc: "我已經收到 offer，或預計即將收到。" },
    ],
    cta: "繼續",
    saving: "儲存中…",
  },
};

interface Props {
  lang?: "en" | "zh";
  onSelect: (phase: CareerPhase) => Promise<void>;
}

export default function OnboardingPhaseModal({ lang = "en", onSelect }: Props) {
  const [selected, setSelected] = useState<CareerPhase | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setSubmitting(true);
    await onSelect(selected);
  };

  const t = i18n[lang];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(27, 58, 47, 0.6)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl"
          style={{ backgroundColor: "#FBF7F0" }}
        >
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-2"
            style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}
          >
            {t.heading}
          </h2>
          <p className="text-sm sm:text-base text-center mb-8 whitespace-pre-line" style={{ color: "#6B7280" }}>
            {t.sub}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {t.phases.map((phase) => {
              const isSelected = selected === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setSelected(phase.id)}
                  className="relative rounded-xl p-5 text-left transition-all duration-200 border-2"
                  style={{
                    borderColor: isSelected ? "#1B3A2F" : "#E5E0D8",
                    backgroundColor: isSelected ? "rgba(27, 58, 47, 0.06)" : "#FFFFFF",
                    boxShadow: isSelected
                      ? "0 4px 16px rgba(27, 58, 47, 0.12)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <span className="text-3xl block mb-3">{phase.emoji}</span>
                  <span className="text-base font-semibold block mb-1" style={{ color: "#1B3A2F" }}>
                    {phase.label}
                  </span>
                  <span className="text-sm leading-relaxed block" style={{ color: "#6B7280" }}>
                    {phase.desc}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#1B3A2F" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7L6 10L11 4" stroke="#FBF7F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleContinue}
            disabled={!selected || submitting}
            className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#1B3A2F", color: "#FBF7F0" }}
          >
            {submitting ? t.saving : t.cta}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}