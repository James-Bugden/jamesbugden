import { useState, useEffect } from "react";
import { ChevronDown, CheckCircle, AlertTriangle, XCircle, ExternalLink, ArrowRight, RotateCcw, Download, Lock, ArrowDown, Mail, Briefcase, GraduationCap, Building2, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

import type { AnalysisResult } from "./types";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ResumeVisualSummary from "./ResumeVisualSummary";

type Language = "en" | "zh-TW";
const t = (lang: Language, en: string, zh: string) => lang === "en" ? en : zh;

const LineIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .348-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .349-.281.631-.63.631h-2.386c-.345 0-.627-.282-.627-.631V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .349-.281.631-.629.631M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

/* ──────────────────── Animated Score Counter ──────────────────── */
function useAnimatedCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return value;
}

/* ──────────────────── Score Hero ──────────────────── */
function ScoreHero({ score, lang }: { score: number; lang: Language }) {
  const animatedScore = useAnimatedCounter(score);
  const size = 180;
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;
  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : score >= 40 ? "#ea580c" : "#dc2626";
  const grade = score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B" : score >= 60 ? "C" : score >= 50 ? "D" : "F";

  const verdictText = (s: number) => {
    if (s >= 90) return t(lang, "Excellent! Your resume is polished and ready to impress recruiters.", "優秀！你的履歷已經打磨完善，能夠給招募官留下深刻印象。");
    if (s >= 75) return t(lang, "Your resume is strong — a few targeted improvements will make it highly competitive.", "你的履歷很好——幾項針對性改善就能大幅提升競爭力。");
    if (s >= 65) return t(lang, "Your resume is decent but needs optimization to stand out.", "你的履歷不錯，但需要優化才能脫穎而出。");
    if (s >= 50) return t(lang, "Your resume has potential but has critical issues holding you back.", "你的履歷有潛力，但有關鍵問題需要解決。");
    return t(lang, "Your resume needs significant improvements before it will be competitive.", "你的履歷需要大幅改善才能具有競爭力。");
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(43,71,52,0.1)" strokeWidth="10" />
          <circle
            cx={size / 2} cy={size / 2} r={radius} fill="none"
            stroke={color} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-5xl md:text-6xl font-bold" style={{ color }}>{grade}</span>
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="font-heading text-3xl font-bold" style={{ color: '#1A1A1A' }}>{animatedScore}</span>
        <span className="text-base font-medium" style={{ color: '#6B6B6B' }}>/100</span>
      </div>

      <p className="text-sm" style={{ color: '#6B6B6B' }}>{t(lang, "Overall Resume Score", "整體履歷分數")}</p>

      <p className="text-base mt-2 max-w-lg mx-auto text-center leading-relaxed" style={{ color: '#1A1A1A' }}>
        {verdictText(score)}
      </p>
    </motion.div>
  );
}

/* ──────────────────── Findings Summary Bar ──────────────────── */
function FindingsSummary({ sections, lang }: { sections: AnalysisResult["sections"]; lang: Language }) {
  let strengths = 0, warnings = 0, criticals = 0;
  sections.forEach(s => s.findings.forEach(f => {
    if (f.type === "strength") strengths++;
    else if (f.type === "warning") warnings++;
    else criticals++;
  }));
  const total = strengths + warnings + criticals;
  if (total === 0) return null;

  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(43,71,52,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 className="font-heading text-base font-semibold mb-3" style={{ color: '#1A1A1A' }}>
        {t(lang, "Findings Overview", "分析總覽")}
      </h3>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" style={{ color: '#2b4734' }} />
          <span className="text-sm font-medium" style={{ color: '#2b4734' }}>{strengths} {t(lang, "strengths", "優勢")}</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-yellow-600">{warnings} {t(lang, "warnings", "警告")}</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">{criticals} {t(lang, "critical", "需修正")}</span>
        </div>
      </div>
      {/* Stacked bar */}
      <div className="w-full h-2.5 rounded-full overflow-hidden flex" style={{ backgroundColor: 'rgba(43,71,52,0.08)' }}>
        {strengths > 0 && <div className="h-full" style={{ width: `${(strengths / total) * 100}%`, backgroundColor: '#2b4734' }} />}
        {warnings > 0 && <div className="h-full bg-yellow-500" style={{ width: `${(warnings / total) * 100}%` }} />}
        {criticals > 0 && <div className="h-full bg-destructive" style={{ width: `${(criticals / total) * 100}%` }} />}
      </div>
    </div>
  );
}

/* ──────────────────── Segmentation Profile ──────────────────── */
function SegmentationProfile({ segmentation, lang }: { segmentation: AnalysisResult["segmentation"]; lang: Language }) {
  if (!segmentation) return null;

  const items = [
    { icon: Clock, label: t(lang, "Experience", "經驗"), value: segmentation.years_experience },
    { icon: Briefcase, label: t(lang, "Seniority", "資歷"), value: segmentation.seniority_level },
    { icon: Building2, label: t(lang, "Industry", "產業"), value: segmentation.industry },
    { icon: GraduationCap, label: t(lang, "Company Type", "公司類型"), value: segmentation.current_company_type },
    { icon: Target, label: t(lang, "Readiness", "準備度"), value: segmentation.target_readiness },
  ].filter(item => item.value);

  if (items.length === 0) return null;

  return (
    <div className="rounded-xl p-5" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(43,71,52,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 className="font-heading text-base font-semibold mb-4" style={{ color: '#1A1A1A' }}>
        {t(lang, "Your Profile", "你的背景")}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg" style={{ backgroundColor: '#FDFBF7' }}>
            <item.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#D4930D' }} />
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#6B6B6B' }}>{item.label}</p>
              <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────── Section Card ──────────────────── */
function SectionCard({ section, lang, defaultOpen, locked }: { section: AnalysisResult["sections"][0]; lang: Language; defaultOpen?: boolean; locked?: boolean }) {
  const [open, setOpen] = useState(locked ? false : (defaultOpen || false));
  const scoreColor = section.score >= 8 ? "#16a34a" : section.score >= 6 ? "#d97706" : section.score >= 4 ? "#ea580c" : "#dc2626";
  const barColor = section.score >= 8 ? "#16a34a" : section.score >= 6 ? "#d97706" : section.score >= 4 ? "#ea580c" : "#dc2626";

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(43,71,52,0.1)',
        borderLeft: `4px solid ${scoreColor}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <button onClick={() => !locked && setOpen(!open)} className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${locked ? "cursor-default" : "hover:bg-[#FDFBF7]"}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-sm" style={{ color: scoreColor }}>{section.name}</h3>
            <span className="text-xs font-bold" style={{ color: scoreColor }}>{section.score}/10</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(43,71,52,0.08)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${section.score * 10}%`, backgroundColor: barColor }} />
          </div>
          <p className="text-xs mt-1.5 line-clamp-1" style={{ color: '#6B6B6B' }}>{section.summary}</p>
        </div>
        {locked ? (
          <Lock className="w-4 h-4 shrink-0" style={{ color: 'rgba(107,107,107,0.5)' }} />
        ) : (
          <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: '#6B6B6B' }} />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-3 pt-4" style={{ borderTop: '1px solid rgba(43,71,52,0.08)' }}>
          {section.findings.map((f, i) => (
            <div key={i} className="flex gap-2.5">
              {f.type === "strength" ? (
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#2b4734' }} />
              ) : f.type === "critical" ? (
                <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
              )}
              <div className="text-sm">
                <p style={{ color: '#1A1A1A' }}>
                  <strong>{f.principle}:</strong> {f.text}
                </p>
                {f.evidence && (
                  <p className="text-xs mt-1 italic" style={{ color: '#6B6B6B' }}>"{f.evidence}"</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ──────────────────── Locked Overlay ──────────────────── */
function LockedOverlay({ lang, currentPath }: { lang: Language; currentPath: string }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-16 rounded-xl" style={{ backgroundColor: 'rgba(253,251,247,0.6)', backdropFilter: 'blur(6px)' }}>
      <div className="rounded-2xl shadow-xl p-8 max-w-sm text-center" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(43,71,52,0.1)' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(212,147,13,0.1)' }}>
          <Lock className="w-6 h-6" style={{ color: '#D4930D' }} />
        </div>
        <h3 className="font-heading text-lg font-bold mb-2" style={{ color: '#1A1A1A' }}>
          {t(lang, "Create a Free Account", "建立免費帳號")}
        </h3>
        <p className="text-sm mb-5" style={{ color: '#6B6B6B' }}>
          {t(lang,
            "Sign up to unlock your full report — detailed findings, bullet rewrites, and top priorities.",
            "註冊即可解鎖完整報告 — 詳細分析、履歷描述改寫和優先改善建議。"
          )}
        </p>
        <Link
          to="/signup"
          state={{ from: currentPath }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-colors text-white"
          style={{ backgroundColor: '#D4930D' }}
        >
          {t(lang, "Sign Up Free", "免費註冊")}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-xs mt-3" style={{ color: '#6B6B6B' }}>
          {t(lang, "Already have an account?", "已有帳號？")}{" "}
          <Link to="/login" state={{ from: currentPath }} className="font-medium hover:underline" style={{ color: '#D4930D' }}>
            {t(lang, "Sign in", "登入")}
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ──────────────────── Share Section ──────────────────── */
function ShareSection({ lang }: { lang: Language }) {
  const isZhTw = lang === "zh-TW";
  const handleEmailShare = () => {
    const subject = encodeURIComponent(isZhTw ? "推薦給你的免費履歷分析工具" : "Free resume analyzer I found helpful");
    const body = encodeURIComponent(
      `${isZhTw ? "我發現了這個免費履歷分析工具，分享給你：" : "I found this free resume analyzer and wanted to share it with you:"}\n\n${window.location.origin}/resume-analyzer`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };
  const handleLineShare = () => {
    const url = `${window.location.origin}/resume-analyzer`;
    window.location.href = `https://line.me/R/share?text=${encodeURIComponent(url)}`;
  };

  return (
    <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: '#2b4734' }}>
      <h2 className="font-heading text-xl text-white mb-2">
        {t(lang, "Know someone who needs resume help?", "認識需要履歷幫助的人？")}
      </h2>
      <p className="text-white/70 text-sm mb-5">
        {t(lang, "Send them this free tool — it takes 30 seconds.", "把這個免費工具分享給他們——只要 30 秒。")}
      </p>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={handleEmailShare}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium"
          aria-label="Share via Email"
        >
          <Mail className="w-5 h-5" />
          Email
        </button>
        <button
          onClick={handleLineShare}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#06C755] text-white hover:bg-[#05b34d] transition-colors text-sm font-medium"
          aria-label="Share via LINE"
        >
          <LineIcon />
          LINE
        </button>
      </div>
    </div>
  );
}

/* ──────────────────── Actionable Next Steps ──────────────────── */
function ActionableNextSteps({ priorities, lang }: { priorities: AnalysisResult["top_priorities"]; lang: Language }) {
  const guideLinks = [
    { key: "resume", label: t(lang, "Resume Writing Guide", "履歷撰寫指南"), en: "/resume-guide", zh: "/zh-tw/resume-guide" },
    { key: "interview", label: t(lang, "Interview Prep Guide", "面試準備指南"), en: "/interview-preparation-guide", zh: "/zh-tw/interview-preparation-guide" },
    { key: "linkedin", label: t(lang, "LinkedIn Branding Guide", "LinkedIn 個人品牌指南"), en: "/linkedin-personal-branding-guide", zh: "/zh-tw/linkedin-personal-branding-guide" },
  ];

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(43,71,52,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h2 className="font-heading text-xl font-semibold mb-1" style={{ color: '#1A1A1A' }}>
        {t(lang, "Your Action Plan", "你的行動計劃")}
      </h2>
      <p className="text-sm mb-5" style={{ color: '#6B6B6B' }}>
        {t(lang, "Follow these steps in order for maximum impact", "按照順序執行這些步驟，效果最大化")}
      </p>
      <div className="space-y-3">
        {priorities.map((p, i) => (
          <div key={p.priority} className="flex gap-3 items-start">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ backgroundColor: '#2b4734' }}>
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{p.title}</p>
              <p className="text-sm mt-0.5" style={{ color: '#6B6B6B' }}>{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Related Guides */}
      <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(43,71,52,0.08)' }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#6B6B6B' }}>
          {t(lang, "Recommended Guides", "推薦指南")}
        </p>
        <div className="flex flex-wrap gap-2">
          {guideLinks.map(g => (
            <a
              key={g.key}
              href={lang === "zh-TW" ? g.zh : g.en}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{ backgroundColor: 'rgba(43,71,52,0.05)', color: '#2b4734', border: '1px solid rgba(43,71,52,0.1)' }}
            >
              {g.label}
              <ArrowRight className="w-3 h-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Main Results Component ──────────────────── */

export default function ResumeResults({
  analysis,
  lang,
  onReset,
  isUnlocked = true,
  resumeImageUrl,
}: {
  analysis: AnalysisResult;
  lang: Language;
  onReset?: () => void;
  isUnlocked?: boolean;
  resumeImageUrl?: string | null;
}) {
  const location = useLocation();
  const needsWork = analysis.sections.filter(s => s.score < 7).length;

  return (
    <div className="py-12 md:py-20 px-5" id="analysis-results-container" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="container mx-auto max-w-3xl space-y-10">

        {/* Action bar */}
        <div className="flex items-center justify-between gap-3" data-print-hide>
          {onReset && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="gap-2"
              style={{ borderColor: 'rgba(43,71,52,0.2)', color: '#2b4734' }}
            >
              <RotateCcw className="w-4 h-4" />
              {t(lang, "Scan Another Resume", "掃描另一份履歷")}
            </Button>
          )}
          {isUnlocked && (
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors ml-auto hover:opacity-70"
              style={{ color: '#6B6B6B' }}
            >
              <Download className="w-4 h-4" />
              {t(lang, "Download PDF", "下載 PDF")}
            </button>
          )}
        </div>

        {/* Overall Score */}
        <div className="text-center">
          <ScoreHero score={analysis.overall_score} lang={lang} />
        </div>

        {/* Segmentation Profile — always visible */}
        <SegmentationProfile segmentation={analysis.segmentation} lang={lang} />

        {/* Findings Summary — always visible */}
        <FindingsSummary sections={analysis.sections} lang={lang} />

        {/* Locked sections wrapper — everything after score */}
        <div className="relative">
          {!isUnlocked && <LockedOverlay lang={lang} currentPath={location.pathname} />}
          <div className={`space-y-10 ${!isUnlocked ? "blur-sm pointer-events-none select-none" : ""}`}>

            {/* Resume Visual Summary */}
            <ResumeVisualSummary
              sections={analysis.sections}
              resumeImageUrl={resumeImageUrl}
              lang={lang}
            />

            {/* Section Breakdown */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-2xl" style={{ color: '#1A1A1A' }}>
                  {t(lang, "Section-by-Section Breakdown", "逐項分析")}
                </h2>
                {needsWork > 0 && (
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-destructive/10 text-destructive">
                    {t(lang, `${needsWork} need${needsWork > 1 ? "" : "s"} work`, `${needsWork} 項需改善`)}
                  </span>
                )}
              </div>
              <div className="space-y-3">
                {analysis.sections.map((section, i) => (
                  <SectionCard
                    key={i}
                    section={section}
                    lang={lang}
                    defaultOpen={isUnlocked ? true : (i === 0 || section.score < 6)}
                    locked={!isUnlocked}
                  />
                ))}
              </div>
            </div>

            {/* Bullet Rewrite */}
            <div className="rounded-xl p-6" style={{ backgroundColor: '#FFFFFF', border: '2px solid rgba(212,147,13,0.3)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <h2 className="font-heading text-xl mb-4" style={{ color: '#1A1A1A' }}>
                {t(lang, "Example: How to Transform Your Resume Bullets", "範例：如何改造你的履歷描述")}
              </h2>
              <div className="space-y-2">
                <div>
                  <p className="text-xs font-semibold text-destructive uppercase mb-1">{t(lang, "Before", "修改前")}</p>
                  <p className="text-sm rounded-lg p-3 italic" style={{ backgroundColor: '#FDFBF7', color: '#6B6B6B' }}>"{analysis.bullet_rewrite.original}"</p>
                </div>
                <div className="flex justify-center py-1">
                  <div className="flex flex-col items-center" style={{ color: '#D4930D' }}>
                    <ArrowDown className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase mb-1" style={{ color: '#2b4734' }}>{t(lang, "After", "修改後")}</p>
                  <p className="text-sm rounded-lg p-3 font-medium" style={{ backgroundColor: 'rgba(43,71,52,0.05)', color: '#1A1A1A' }}>"{analysis.bullet_rewrite.improved}"</p>
                </div>
                <div className="pt-2">
                  <p className="text-xs font-semibold uppercase mb-2" style={{ color: '#6B6B6B' }}>{t(lang, "What changed", "改了什麼")}</p>
                  <ul className="space-y-1">
                    {analysis.bullet_rewrite.changes.map((c, i) => (
                      <li key={i} className="text-xs flex gap-2" style={{ color: '#6B6B6B' }}>
                        <span style={{ color: '#D4930D' }}>•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs mt-4 italic" style={{ color: '#6B6B6B' }}>
                {t(lang, "This is just one example. A full resume review transforms every bullet this way.", "這只是一個範例。完整的履歷審查會將每一條描述都這樣改善。")}
              </p>
            </div>

            {/* Top 3 Priorities */}
            <div>
              <h2 className="font-heading text-2xl mb-1" style={{ color: '#1A1A1A' }}>
                {t(lang, "Your Top 3 Priorities", "你的前 3 項優先改善")}
              </h2>
              <p className="text-sm mb-4" style={{ color: '#6B6B6B' }}>
                {t(lang, "Fix these first for maximum impact", "先修正這些以獲得最大效果")}
              </p>
              <div className="space-y-3">
                {analysis.top_priorities.map((p) => (
                  <div
                    key={p.priority}
                    className="rounded-xl p-5"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(43,71,52,0.1)', borderLeft: '4px solid #b91c1c', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🔴</span>
                      <div>
                        <p className="font-semibold text-sm mb-1" style={{ color: '#1A1A1A' }}>{p.principle}: {p.title}</p>
                        <p className="text-sm" style={{ color: '#6B6B6B' }}>{p.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable Next Steps */}
            <ActionableNextSteps priorities={analysis.top_priorities} lang={lang} />

            {/* Coaching CTA */}
            <div className="rounded-2xl p-6 md:p-8 text-center" style={{ background: 'radial-gradient(ellipse at center, #2b4734 0%, #1f3a28 100%)', border: '2px solid rgba(212,147,13,0.4)' }}>
              <h2 className="font-heading text-xl md:text-2xl text-cream mb-2">
                {t(lang, "Want a Recruiter to Fix All of This For You?", "想讓招募官幫你全部改好？")}
              </h2>
              <p className="text-sm text-cream/70 mb-2 max-w-md mx-auto leading-relaxed">
                {t(lang,
                  "I personally review and rewrite resumes for a small number of clients each month. See real before-and-after examples.",
                  "我每月為少數客戶親自審閱並改寫履歷。查看真實的修改前後範例。"
                )}
              </p>
              <p className="text-xs text-cream/50 mb-5">
                {t(lang, "Join 500+ professionals who improved their resumes", "加入超過 500 位已改善履歷的專業人士")}
              </p>
              <a
                href={lang === "zh-TW" ? "/zh-tw#coaching" : "/#coaching"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-colors"
                style={{ backgroundColor: '#D4930D', color: '#1A1A1A' }}
              >
                {t(lang, "See If You're a Fit", "查看是否適合你")}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>{/* end blur wrapper */}
        </div>{/* end relative wrapper */}

        {/* Free Templates */}
        <div className="rounded-xl p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(43,71,52,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 className="font-heading text-xl mb-2" style={{ color: '#1A1A1A' }}>
            {t(lang, "Download Free Resume Templates", "下載免費履歷模板")}
          </h2>
          <p className="text-sm mb-5" style={{ color: '#6B6B6B' }}>
            {t(lang, "Battle-tested formats that pass ATS screening at top companies.", "經過實戰驗證，能通過頂尖企業 ATS 篩選的格式。")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: t(lang, "English Resume Template", "英文履歷模板"), url: "https://docs.google.com/document/d/1BAkVHZ57JsLzL0hk1AUvFBu4bsx8ymMA7tPJKuJROIM/edit?usp=sharing" },
              { label: t(lang, "Chinese Resume Template", "中文履歷模板"), url: "https://docs.google.com/document/d/1U14BS5yISb17ejgVIX5IyeaVZKiww33hpJNOnEy4Wy0/edit?usp=sharing" },
            ].map((tmpl) => (
              <a key={tmpl.label} href={tmpl.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg transition-all"
                style={{ border: '1px solid rgba(43,71,52,0.1)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(212,147,13,0.5)'; e.currentTarget.style.backgroundColor = 'rgba(212,147,13,0.03)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(43,71,52,0.1)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <div>
                  <p className="text-sm font-semibold" style={{ color: '#1A1A1A' }}>{tmpl.label}</p>
                  <p className="text-xs" style={{ color: '#6B6B6B' }}>{t(lang, "Google Docs — make a copy to edit", "Google Docs — 建立副本後即可編輯")}</p>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0" style={{ color: '#D4930D' }} />
              </a>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="rounded-xl p-6 text-center" style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(43,71,52,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <h2 className="font-heading text-xl mb-2" style={{ color: '#1A1A1A' }}>
            {t(lang, "Keep improving", "繼續提升")}
          </h2>
          <p className="text-sm mb-5" style={{ color: '#6B6B6B' }}>
            {t(lang, "Resources to strengthen your job search", "幫助你加強求職的資源")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={lang === "zh-TW" ? "/zh-tw/guides" : "/guides"}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors"
              style={{ backgroundColor: '#2b4734' }}
            >
              {t(lang, "Free Career Guides", "免費職涯指南")}
            </a>
            <a
              href={lang === "zh-TW" ? "/zh-tw/salary-starter-kit" : "/salary-starter-kit"}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              style={{ border: '1px solid rgba(43,71,52,0.2)', color: '#1A1A1A' }}
            >
              {t(lang, "Salary Negotiation Toolkit", "薪資談判工具包")}
            </a>
          </div>
        </div>

        {/* Share */}
        <ShareSection lang={lang} />
      </div>
    </div>
  );
}
