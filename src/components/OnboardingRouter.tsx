import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { JobSearchStage } from "@/hooks/useProfile";
import { trackEvent } from "@/lib/trackEvent";

export const STAGE_ROUTES: Record<JobSearchStage, { en: string; zh: string }> = {
  starting: { en: "/resume", zh: "/zh-tw/resume" },
  applying: { en: "/resume-analyzer", zh: "/zh-tw/resume-analyzer" },
  interviewing: { en: "/interview-questions", zh: "/zh-tw/interview-questions" },
  negotiating: { en: "/toolkit", zh: "/zh-tw/toolkit" },
};

const i18n = {
  en: {
    step1Heading: "Where are you in your job search?",
    options: [
      { id: "starting" as JobSearchStage, label: "Just starting" },
      { id: "applying" as JobSearchStage, label: "Actively applying" },
      { id: "interviewing" as JobSearchStage, label: "Getting interviews" },
      { id: "negotiating" as JobSearchStage, label: "Have an offer" },
    ],
    confirmations: {
      starting: "Resume Builder is your best first stop",
      applying: "Resume Analyzer + Job Tracker will sharpen your edge",
      interviewing: "Interview Question Bank has the top questions with answers",
      negotiating: "Salary Compare + Negotiation Toolkit help you get the best deal",
    } as Record<JobSearchStage, string>,
    cta: "Get started",
    skip: "Skip for now",
    saving: "Saving…",
  },
  zh: {
    step1Heading: "你目前的求職進度是？",
    options: [
      { id: "starting" as JobSearchStage, label: "剛開始探索" },
      { id: "applying" as JobSearchStage, label: "積極投遂中" },
      { id: "interviewing" as JobSearchStage, label: "已進入面試階段" },
      { id: "negotiating" as JobSearchStage, label: "已拿到 Offer" },
    ],
    confirmations: {
      starting: "「履歷生成器」幫你從零建立一份專業履歷，是你的最佳起點",
      applying: "「履歷分析器」提升你的競爭力，搜配「職缺追蹤器」讓申請進度一目瞭然",
      interviewing: "「面試題庫」幫你備齊高頻問題與解答，讓你面試前更有把握",
      negotiating: "「薪資比較」讓你了解市場行情，「薪資談判工具組」幫你爭取最好的條件",
    } as Record<JobSearchStage, string>,
    cta: "開始使用",
    skip: "先跳過",
    saving: "儲存中…",
  },
} as const;

interface Props {
  lang?: "en" | "zh";
  onComplete: (stage: JobSearchStage) => Promise<void>;
  onSkip: () => Promise<void>;
}

export default function OnboardingRouter({ lang = "en", onComplete, onSkip }: Props) {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [selected, setSelected] = useState<JobSearchStage | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const t = i18n[lang];

  const handleContinue = () => {
    if (!selected) return;
    setStep(2);
  };

  const handleGetStarted = async () => {
    if (!selected || submitting) return;
    setSubmitting(true);
    await onComplete(selected);
    trackEvent("onboarding", "router_completed", { job_search_stage: selected });
    navigate(STAGE_ROUTES[selected][lang === "zh" ? "zh" : "en"]);
  };

  const handleSkip = async () => {
    if (submitting) return;
    setSubmitting(true);
    await onSkip();
    trackEvent("onboarding", "router_skipped", {});
    navigate(lang === "zh" ? "/zh-tw/dashboard" : "/dashboard");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
        style={{ backgroundColor: "rgba(27, 58, 47, 0.6)" }}
        data-testid="onboarding-router"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-lg rounded-2xl px-5 py-6 sm:p-8 shadow-2xl overflow-y-auto"
          style={{ backgroundColor: "hsl(var(--paper))", maxHeight: "calc(100vh - 48px)" }}
        >
          {step === 1 && (
            <>
              <h2
                className="text-2xl sm:text-3xl font-bold text-center mb-8"
                style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--executive-green))" }}
              >
                {t.step1Heading}
              </h2>

              <div className="flex flex-col gap-3 mb-8">
                {t.options.map((option) => {
                  const isSelected = selected === option.id;
                  return (
                    <button
                      key={option.id}
                      onClick={() => setSelected(option.id)}
                      aria-pressed={isSelected}
                      className="relative w-full rounded-xl px-5 py-4 text-left transition-all duration-200 border-2 flex items-center gap-3"
                      style={{
                        borderColor: isSelected ? "hsl(var(--executive-green))" : "hsl(var(--border))",
                        backgroundColor: isSelected ? "rgba(27, 58, 47, 0.06)" : "hsl(var(--card))",
                        boxShadow: isSelected
                          ? "0 4px 16px rgba(27, 58, 47, 0.12)"
                          : "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <span
                        className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors"
                        style={{
                          borderColor: isSelected ? "hsl(var(--executive-green))" : "hsl(var(--border))",
                          backgroundColor: isSelected ? "hsl(var(--executive-green))" : "transparent",
                        }}
                      >
                        {isSelected && (
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <circle cx="4" cy="4" r="3" fill="hsl(var(--paper))" />
                          </svg>
                        )}
                      </span>
                      <span
                        className="text-base font-medium"
                        style={{ color: isSelected ? "hsl(var(--executive-green))" : "hsl(var(--foreground))" }}
                      >
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleContinue}
                disabled={!selected}
                className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mb-3"
                style={{ backgroundColor: "hsl(var(--executive-green))", color: "hsl(var(--paper))" }}
              >
                {t.cta}
              </button>

              <button
                onClick={handleSkip}
                disabled={submitting}
                className="w-full py-2 text-sm transition-colors disabled:opacity-40"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {t.skip}
              </button>
            </>
          )}

          {step === 2 && selected && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <h2
                className="text-2xl sm:text-3xl font-bold text-center mb-6"
                style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--executive-green))" }}
              >
                {t.options.find((o) => o.id === selected)?.label}
              </h2>

              <p
                className="text-center text-base leading-relaxed mb-10 px-2"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {t.confirmations[selected]}
              </p>

              <button
                onClick={handleGetStarted}
                disabled={submitting}
                className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mb-3"
                style={{ backgroundColor: "hsl(var(--executive-green))", color: "hsl(var(--paper))" }}
              >
                {submitting ? t.saving : t.cta}
              </button>

              <button
                onClick={handleSkip}
                disabled={submitting}
                className="w-full py-2 text-sm transition-colors disabled:opacity-40"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                {t.skip}
              </button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
