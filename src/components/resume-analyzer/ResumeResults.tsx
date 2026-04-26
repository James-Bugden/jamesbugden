import { useState, useEffect } from "react";
import { ChevronDown, CheckCircle, AlertTriangle, XCircle, ExternalLink, ArrowRight, RotateCcw, Download, Lock, ArrowDown, Mail, Briefcase, GraduationCap, Building2, Target, Clock, Share2, Copy, FileEdit, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

import type { AnalysisResult } from "./types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ResumeVisualSummary from "./ResumeVisualSummary";
import { toast } from "@/hooks/use-toast";
import InlineRating from "@/components/feedback/InlineRating";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackShare } from "@/lib/trackShare";
import { usePrintUsage } from "@/hooks/usePrintUsage";

type Language = "en" | "zh-TW";
const t = (lang: Language, en: string, zh: string) => lang === "en" ? en : zh;

const LineIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .348-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .349-.281.631-.63.631h-2.386c-.345 0-.627-.282-.627-.631V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .349-.281.631-.629.631M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
  const color = score >= 80 ? "hsl(var(--executive-green))" : score >= 60 ? "hsl(var(--warning))" : score >= 40 ? "hsl(var(--warning))" : "hsl(var(--destructive))";
  const grade = score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B" : score >= 60 ? "C" : score >= 50 ? "D" : "F";

  const verdictText = (s: number) => {
    if (s >= 90) return t(lang, "Excellent! Your resume is polished and ready to impress recruiters.", "優秀！你的履歷已經打磨完善，能夠給招募官留下深刻印象。");
    if (s >= 75) return t(lang, "Your resume is strong — a few targeted improvements will make it highly competitive.", "你的履歷很好——幾項針對性改善就能大幅提升競爭力。");
    if (s >= 65) return t(lang, "Your resume is decent but needs optimization to stand out.", "你的履歷不錯，但需要優化才能脫穎而出。");
    if (s >= 50) return t(lang, "Your resume has potential but has critical issues holding you back.", "你的履歷有潛力，但有關鍵問題需要解決。");
    return t(lang, "Your resume needs significant improvements before it will be competitive.", "你的履歷需要大幅改善才能具有競爭力。");
  };

  const ringSize = 220;
  const ringRadius = (ringSize - 16) / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (animatedScore / 100) * ringCircumference;

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="rounded-2xl border border-border bg-card px-10 py-8 flex flex-col items-center gap-3 shadow-lg">
        <div className="relative inline-flex items-center justify-center">
          <svg width={ringSize} height={ringSize} className="-rotate-90">
            <circle cx={ringSize / 2} cy={ringSize / 2} r={ringRadius} fill="none" stroke="rgba(43,71,52,0.1)" strokeWidth="14" />
            <circle
              cx={ringSize / 2} cy={ringSize / 2} r={ringRadius} fill="none"
              stroke={color} strokeWidth="14" strokeLinecap="round"
              strokeDasharray={ringCircumference} strokeDashoffset={ringOffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-heading text-5xl md:text-6xl font-bold" style={{ color }}>{grade}</span>
            <span className="font-heading text-3xl font-bold mt-1" style={{ color }}>{animatedScore}<span className="text-lg font-medium text-muted-foreground">/100</span></span>
          </div>
        </div>

        <p className="text-lg font-semibold text-foreground">{t(lang, "Overall Resume Score", "整體履歷分數")}</p>
      </div>

      <p className="text-base mt-1 max-w-lg mx-auto text-center leading-relaxed text-foreground">
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
    <div className="rounded-xl p-5" style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(43,71,52,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 className="font-heading text-base font-semibold mb-3" style={{ color: 'hsl(var(--foreground))' }}>
        {t(lang, "Findings Overview", "分析總覽")}
      </h3>
      <div className="flex gap-4 mb-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4" style={{ color: 'hsl(var(--executive-green))' }} />
          <span className="text-sm font-medium" style={{ color: 'hsl(var(--executive-green))' }}>{strengths} {t(lang, "strengths", "優勢")}</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning" />
          <span className="text-sm font-medium text-warning">{warnings} {t(lang, "warnings", "警告")}</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-destructive" />
          <span className="text-sm font-medium text-destructive">{criticals} {t(lang, "critical", "需修正")}</span>
        </div>
      </div>
      {/* Stacked bar */}
      <div className="w-full h-2.5 rounded-full overflow-hidden flex" style={{ backgroundColor: 'rgba(43,71,52,0.08)' }}>
        {strengths > 0 && <div className="h-full" style={{ width: `${(strengths / total) * 100}%`, backgroundColor: 'hsl(var(--executive-green))' }} />}
        {warnings > 0 && <div className="h-full bg-warning" style={{ width: `${(warnings / total) * 100}%` }} />}
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
    <div className="rounded-xl p-5" style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(43,71,52,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 className="font-heading text-base font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
        {t(lang, "Your Profile", "你的背景")}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg" style={{ backgroundColor: 'hsl(var(--paper))' }}>
            <item.icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'hsl(var(--gold))' }} />
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.label}</p>
              <p className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{item.value}</p>
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
  const scoreColor = section.score >= 8 ? "hsl(var(--executive-green))" : section.score >= 6 ? "hsl(var(--warning))" : section.score >= 4 ? "hsl(var(--warning))" : "hsl(var(--destructive))";
  const barColor = section.score >= 8 ? "hsl(var(--executive-green))" : section.score >= 6 ? "hsl(var(--warning))" : section.score >= 4 ? "hsl(var(--warning))" : "hsl(var(--destructive))";

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid rgba(43,71,52,0.1)',
        borderLeft: `4px solid ${scoreColor}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <button onClick={() => !locked && setOpen(!open)} className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${locked ? "cursor-default" : "hover:bg-[hsl(var(--paper))]"}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-sm" style={{ color: scoreColor }}>{section.name}</h3>
            <span className="text-xs font-bold" style={{ color: scoreColor }}>{section.score}/10</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(43,71,52,0.08)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${section.score * 10}%`, backgroundColor: barColor }} />
          </div>
          <p className="text-xs mt-1.5 line-clamp-1" style={{ color: 'hsl(var(--muted-foreground))' }}>{section.summary}</p>
        </div>
        {locked ? (
          <Lock className="w-4 h-4 shrink-0" style={{ color: 'rgba(107,107,107,0.5)' }} />
        ) : (
          <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} style={{ color: 'hsl(var(--muted-foreground))' }} />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-3 pt-4" style={{ borderTop: '1px solid rgba(43,71,52,0.08)' }}>
          {section.findings.map((f, i) => (
            <div key={i} className="flex gap-2.5">
              {f.type === "strength" ? (
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'hsl(var(--executive-green))' }} />
              ) : f.type === "critical" ? (
                <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              )}
              <div className="text-sm">
                <p style={{ color: 'hsl(var(--foreground))' }}>
                  <strong>{f.principle}:</strong> {f.text}
                </p>
                {f.evidence && (
                  <p className="text-xs mt-1 italic" style={{ color: 'hsl(var(--muted-foreground))' }}>"{f.evidence}"</p>
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
      <div className="rounded-2xl shadow-xl p-8 max-w-sm text-center" style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(43,71,52,0.1)' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(212,147,13,0.1)' }}>
          <Lock className="w-6 h-6" style={{ color: 'hsl(var(--gold))' }} />
        </div>
        <h3 className="font-heading text-lg font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
          {t(lang, "Create a Free Account", "建立免費帳號")}
        </h3>
        <p className="text-sm mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {t(lang,
            "Sign up to unlock your full report — detailed findings, bullet rewrites, and top priorities.",
            "註冊即可解鎖完整報告 — 詳細分析、履歷描述改寫和優先改善建議。"
          )}
        </p>
        <Link
          to="/join"
          state={{ from: currentPath }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-colors text-white"
          style={{ backgroundColor: 'hsl(var(--gold))' }}
        >
          {t(lang, "Sign Up Free", "免費註冊")}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-xs mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {t(lang, "Already have an account?", "已有帳號？")}{" "}
          <Link to="/login" state={{ from: currentPath }} className="font-medium hover:underline" style={{ color: 'hsl(var(--gold))' }}>
            {t(lang, "Sign in", "登入")}
          </Link>
        </p>
      </div>
    </div>
  );
}

/* ──────────────────── Share Section ──────────────────── */
function ShareSection({ lang, score }: { lang: Language; score?: number }) {
  const isZhTw = lang === "zh-TW";
  const analyzerUrl = `${window.location.origin}/resume-analyzer`;
  
  const handleEmailShare = () => {
    trackShare("email", "/resume-analyzer");
    const subject = encodeURIComponent(isZhTw ? "推薦給你的免費履歷分析工具" : "Free resume analyzer I found helpful");
    const body = encodeURIComponent(
      `${isZhTw ? "我發現了這個免費履歷分析工具，分享給你：" : "I found this free resume analyzer and wanted to share it with you:"}\n\n${analyzerUrl}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self");
  };
  const handleMessengerShare = () => {
    const url = encodeURIComponent(analyzerUrl);
    if (isZhTw) {
      trackShare("line", "/resume-analyzer");
      window.location.href = `https://line.me/R/msg/text/?${url}`;
    } else {
      trackShare("whatsapp", "/resume-analyzer");
      window.open(`https://wa.me/?text=${url}`, "_blank");
    }
  };
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(analyzerUrl);
    toast({ title: isZhTw ? "已複製連結" : "Link copied!", description: isZhTw ? "分享給你的朋友吧" : "Share it with your friends" });
  };
  const handleShareScore = async () => {
    const msg = score
      ? (isZhTw ? `我的履歷分數：${score}/100 ✨ 免費試試看 → ${analyzerUrl}` : `My resume score: ${score}/100 ✨ Try it free → ${analyzerUrl}`)
      : analyzerUrl;
    await navigator.clipboard.writeText(msg);
    toast({ title: isZhTw ? "已複製分享訊息" : "Score message copied!" });
  };

  return (
    <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: 'hsl(var(--executive-green))' }}>
      <h2 className="font-heading text-xl text-white mb-2">
        {t(lang, "Know someone who needs resume help?", "認識需要履歷幫助的人？")}
      </h2>
      <p className="text-white/70 text-sm mb-5">
        {t(lang, "Send them this free tool — it takes 30 seconds.", "把這個免費工具分享給他們——只要 30 秒。")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={handleEmailShare} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium">
          <Mail className="w-5 h-5" /> Email
        </button>
        <button onClick={handleMessengerShare} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white transition-colors text-sm font-medium ${isZhTw ? "bg-[#06C755] hover:bg-[#05b34d]" : "bg-[#25D366] hover:bg-[#20bd5a]"}`}>
          {isZhTw ? <LineIcon /> : <WhatsAppIcon />} {isZhTw ? "LINE" : "WhatsApp"}
        </button>
        <button onClick={handleCopyLink} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors text-sm font-medium">
          <Copy className="w-4 h-4" /> {t(lang, "Copy Link", "複製連結")}
        </button>
      </div>
      {score && (
        <button onClick={handleShareScore} className="mt-4 inline-flex items-center gap-2 text-xs text-white/60 hover:text-white/90 transition-colors">
          <Share2 className="w-3.5 h-3.5" />
          {t(lang, "Share your score", "分享你的分數")}
        </button>
      )}
    </div>
  );
}

/* ──────────────────── Shared build handler ──────────────────── */
function useBuildHandler(lang: Language, resumeText?: string, analysis?: AnalysisResult) {
  const navigate = useNavigate();
  return () => {
    if (resumeText) sessionStorage.setItem("analyzer-resume-text", resumeText);
    if (analysis) sessionStorage.setItem("analyzer-analysis-result", JSON.stringify(analysis));
    navigate(lang === "zh-TW" ? "/zh-tw/resume?from=analyzer" : "/resume?from=analyzer");
  };
}

/* ──────────────────── Inline Top CTA (after score) ──────────────────── */
function InlineBuilderCTA({ lang, resumeText, analysis }: { lang: Language; resumeText?: string; analysis?: AnalysisResult }) {
  const handleBuild = useBuildHandler(lang, resumeText, analysis);
  if (!resumeText) return null;
  return (
    <div className="flex flex-col items-center gap-1.5" data-print-hide>
      <button
        onClick={handleBuild}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-colors text-white"
        style={{ backgroundColor: 'hsl(var(--gold))' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'hsl(var(--warning))')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'hsl(var(--gold))')}
      >
        <FileEdit className="w-4 h-4" />
        {t(lang, "Build My Resume", "建立我的履歷")}
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {t(lang, "Import your content into a clean, ATS-friendly template", "將你的內容匯入乾淨的 ATS 友善模板")}
      </p>
    </div>
  );
}

/* ──────────────────── Sticky Mobile Bottom Bar ──────────────────── */
function StickyBuilderBar({ lang, resumeText, analysis }: { lang: Language; resumeText?: string; analysis?: AnalysisResult }) {
  const isMobile = useIsMobile();
  const handleBuild = useBuildHandler(lang, resumeText, analysis);
  if (!isMobile || !resumeText) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 border-t border-border bg-background" data-print-hide>
      <button
        onClick={handleBuild}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold text-white"
        style={{ backgroundColor: 'hsl(var(--gold))' }}
      >
        <FileEdit className="w-4 h-4" />
        {t(lang, "Build My Resume", "建立我的履歷")}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ──────────────────── Build My Resume CTA ──────────────────── */
function BuildResumeCTA({ lang, resumeText, analysis }: { lang: Language; resumeText?: string; analysis?: AnalysisResult }) {
  const handleBuild = useBuildHandler(lang, resumeText, analysis);

  return (
    <div className="rounded-2xl p-6 md:p-8 text-center" style={{ backgroundColor: 'hsl(var(--card))', border: '2px solid rgba(212,147,13,0.4)', boxShadow: '0 4px 24px rgba(212,147,13,0.1)' }}>
      <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(212,147,13,0.1)' }}>
        <FileEdit className="w-7 h-7" style={{ color: 'hsl(var(--gold))' }} />
      </div>
      <h2 className="font-heading text-xl font-bold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
        {t(lang, "Build Your Improved Resume Now", "立即打造你的改善版履歷")}
      </h2>
      <p className="text-sm mb-5 max-w-md mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {t(lang,
          "We'll import your resume content into our builder with a clean, ATS-friendly template — ready to edit and download.",
          "我們會將你的履歷內容匯入建構器，套用乾淨的 ATS 友善模板——隨時可以編輯和下載。"
        )}
      </p>
      <button
        onClick={handleBuild}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-colors text-white"
        style={{ backgroundColor: 'hsl(var(--gold))' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'hsl(var(--warning))')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'hsl(var(--gold))')}
      >
        <FileEdit className="w-4 h-4" />
        {t(lang, "Build My Resume", "建立我的履歷")}
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-xs mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {t(lang, "Free · No signup required · Classic template", "免費 · 無需註冊 · 經典模板")}
      </p>
    </div>
  );
}

/* ──────────────────── Floating Share FAB (mobile) ──────────────────── */
function FloatingShareFAB({ lang, score }: { lang: Language; score?: number }) {
  const isMobile = useIsMobile();
  if (!isMobile) return null;

  const handleShare = async () => {
    const url = `${window.location.origin}/resume-analyzer`;
    const text = score
      ? (lang === "zh-TW" ? `我的履歷拿到了 ${score}/100 分！` : `My resume scored ${score}/100!`)
      : (lang === "zh-TW" ? "免費履歷分析工具" : "Free resume analyzer");
    
    if (navigator.share) {
      try {
        await navigator.share({ title: text, url });
        return;
      } catch {}
    }
    await navigator.clipboard.writeText(url);
    toast({ title: lang === "zh-TW" ? "已複製連結" : "Link copied!" });
  };

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-20 right-4 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white transition-transform hover:scale-110"
      style={{ backgroundColor: 'hsl(var(--gold))' }}
      aria-label="Share"
    >
      <Share2 className="w-5 h-5" />
    </button>
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
    <div className="rounded-xl p-6" style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(43,71,52,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h2 className="font-heading text-xl font-semibold mb-1" style={{ color: 'hsl(var(--foreground))' }}>
        {t(lang, "Your Action Plan", "你的行動計劃")}
      </h2>
      <p className="text-sm mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {t(lang, "Follow these steps in order for maximum impact", "按照順序執行這些步驟，效果最大化")}
      </p>
      <div className="space-y-3">
        {priorities.map((p, i) => (
          <div key={p.priority} className="flex gap-3 items-start">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-bold" style={{ backgroundColor: 'hsl(var(--executive-green))' }}>
              {i + 1}
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>{p.title}</p>
              <p className="text-sm mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Related Guides */}
      <div className="mt-6 pt-5" style={{ borderTop: '1px solid rgba(43,71,52,0.08)' }}>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {t(lang, "Recommended Guides", "推薦指南")}
        </p>
        <div className="flex flex-wrap gap-2">
          {guideLinks.map(g => (
            <a
              key={g.key}
              href={lang === "zh-TW" ? g.zh : g.en}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{ backgroundColor: 'rgba(43,71,52,0.05)', color: 'hsl(var(--executive-green))', border: '1px solid rgba(43,71,52,0.1)' }}
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
  resumeText,
}: {
  analysis: AnalysisResult;
  lang: Language;
  onReset?: () => void;
  isUnlocked?: boolean;
  resumeImageUrl?: string | null;
  resumeText?: string;
}) {
  const isMobile = useIsMobile();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { gatedPrint, printLimitReached } = usePrintUsage();
  const needsWork = analysis.sections.filter(s => s.score < 7).length;

  return (
    <div className={`py-12 md:py-20 px-5 ${isMobile && resumeText ? "pb-24" : ""}`} id="analysis-results-container" style={{ backgroundColor: 'hsl(var(--paper))' }}>
      <div className="container mx-auto max-w-3xl space-y-10">

        {/* Action bar */}
        {isUnlocked && (
           <div className="flex justify-center gap-3" data-print-hide>
            {onReset && (
              <Button
                onClick={onReset}
                size="lg"
                variant="outline"
                className="gap-2 font-bold px-6 py-3 text-base rounded-lg"
              >
                <RotateCcw className="w-4 h-4" />
                {t(lang, "Re-analyze", "重新分析")}
              </Button>
            )}
          </div>
        )}

        {/* Overall Score */}
        <div className="text-center">
          <ScoreHero score={analysis.overall_score} lang={lang} />
        </div>

        {/* Saved report banner for logged-in users */}
        {isLoggedIn && (
          <div className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: 'rgba(43,71,52,0.06)', border: '1px solid rgba(43,71,52,0.12)' }}>
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'hsl(var(--executive-green))' }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
                {t(lang, "Report saved to your dashboard", "報告已儲存至你的儀表板")}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {t(lang,
                  "When you open your resume in the Builder, you'll see AI suggestions to apply.",
                  "當你在建構器中開啟履歷時，會看到 AI 改進建議。"
                )}
              </p>
            </div>
          </div>
        )}

        {/* Top Build CTA — right after score */}
        <InlineBuilderCTA lang={lang} resumeText={resumeText} analysis={analysis} />

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
                <h2 className="font-heading text-2xl" style={{ color: 'hsl(var(--foreground))' }}>
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

            {/* Summary Rewrite */}
            {analysis.summary_rewrite && (
              <div className="rounded-xl p-6" style={{ backgroundColor: 'hsl(var(--card))', border: '2px solid rgba(43,71,52,0.2)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <FileEdit className="w-5 h-5" style={{ color: 'hsl(var(--executive-green))' }} />
                  <h2 className="font-heading text-xl" style={{ color: 'hsl(var(--foreground))' }}>
                    {analysis.summary_rewrite.original
                      ? t(lang, "Professional Summary — Rewritten", "專業摘要 — 改寫版")
                      : t(lang, "Your Resume Is Missing a Summary — Here's One", "你的履歷缺少摘要 — 這是我們幫你寫的")
                    }
                  </h2>
                </div>
                {analysis.summary_rewrite.original ? (
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-destructive uppercase mb-1">{t(lang, "Current", "目前版本")}</p>
                      <p className="text-sm rounded-lg p-3 italic" style={{ backgroundColor: 'hsl(var(--paper))', color: 'hsl(var(--muted-foreground))' }}>"{analysis.summary_rewrite.original}"</p>
                    </div>
                    <div className="flex justify-center py-1">
                      <ArrowDown className="w-5 h-5" style={{ color: 'hsl(var(--gold))' }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase mb-1" style={{ color: 'hsl(var(--executive-green))' }}>{t(lang, "Improved", "改善版")}</p>
                      <p className="text-sm rounded-lg p-3 font-medium" style={{ backgroundColor: 'rgba(43,71,52,0.05)', color: 'hsl(var(--foreground))' }}>"{analysis.summary_rewrite.improved}"</p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-xs font-semibold uppercase mb-1" style={{ color: 'hsl(var(--executive-green))' }}>{t(lang, "Suggested Summary", "建議摘要")}</p>
                    <p className="text-sm rounded-lg p-3 font-medium" style={{ backgroundColor: 'rgba(43,71,52,0.05)', color: 'hsl(var(--foreground))' }}>"{analysis.summary_rewrite.improved}"</p>
                  </div>
                )}
                <p className="text-sm mt-3" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <strong>{t(lang, "Why:", "原因：")}</strong> {analysis.summary_rewrite.explanation}
                </p>
              </div>
            )}

            {/* Bullet Rewrites — All Weak Bullets */}
            {(() => {
              const rewrites = analysis.bullet_rewrites && analysis.bullet_rewrites.length > 0
                ? analysis.bullet_rewrites
                : null;
              const fallback = !rewrites && analysis.bullet_rewrite;

              return (
                <div className="rounded-xl p-6" style={{ backgroundColor: 'hsl(var(--card))', border: '2px solid rgba(212,147,13,0.3)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-heading text-xl" style={{ color: 'hsl(var(--foreground))' }}>
                      {t(lang, "Bullet-by-Bullet Fixes", "逐條修正建議")}
                    </h2>
                    {rewrites && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(212,147,13,0.1)', color: 'hsl(var(--gold))' }}>
                        {rewrites.length} {t(lang, rewrites.length === 1 ? "bullet needs work" : "bullets need work", "條需改善")}
                      </span>
                    )}
                  </div>

                  {rewrites ? (
                    <div className="space-y-5">
                      {rewrites.map((rw, i) => (
                        <div key={i} className="rounded-lg overflow-hidden" style={{ border: '1px solid rgba(43,71,52,0.1)' }}>
                          <div className="p-4 space-y-2">
                            <div className="flex items-start gap-2">
                              <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-destructive uppercase mb-1">{t(lang, "Before", "修改前")}</p>
                                <p className="text-sm italic" style={{ color: 'hsl(var(--muted-foreground))' }}>"{rw.original}"</p>
                              </div>
                            </div>
                            <div className="flex justify-center py-0.5">
                              <ArrowDown className="w-4 h-4" style={{ color: 'hsl(var(--gold))' }} />
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'hsl(var(--executive-green))' }} />
                              <div className="flex-1">
                                <p className="text-xs font-semibold uppercase mb-1" style={{ color: 'hsl(var(--executive-green))' }}>{t(lang, "After", "修改後")}</p>
                                <p className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>"{rw.improved}"</p>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3" style={{ backgroundColor: 'hsl(var(--paper))', borderTop: '1px solid rgba(43,71,52,0.08)' }}>
                            <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                              <strong>{t(lang, "Why:", "原因：")}</strong> {rw.explanation}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : fallback ? (
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-semibold text-destructive uppercase mb-1">{t(lang, "Before", "修改前")}</p>
                        <p className="text-sm rounded-lg p-3 italic" style={{ backgroundColor: 'hsl(var(--paper))', color: 'hsl(var(--muted-foreground))' }}>"{analysis.bullet_rewrite.original}"</p>
                      </div>
                      <div className="flex justify-center py-1">
                        <ArrowDown className="w-5 h-5" style={{ color: 'hsl(var(--gold))' }} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase mb-1" style={{ color: 'hsl(var(--executive-green))' }}>{t(lang, "After", "修改後")}</p>
                        <p className="text-sm rounded-lg p-3 font-medium" style={{ backgroundColor: 'rgba(43,71,52,0.05)', color: 'hsl(var(--foreground))' }}>"{analysis.bullet_rewrite.improved}"</p>
                      </div>
                      <div className="pt-2">
                        <p className="text-xs font-semibold uppercase mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>{t(lang, "What changed", "改了什麼")}</p>
                        <ul className="space-y-1">
                          {analysis.bullet_rewrite.changes.map((c, i) => (
                            <li key={i} className="text-xs flex gap-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                              <span style={{ color: 'hsl(var(--gold))' }}>•</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })()}

            {/* Top 3 Priorities */}
            <div>
              <h2 className="font-heading text-2xl mb-1" style={{ color: 'hsl(var(--foreground))' }}>
                {t(lang, "Your Top 3 Priorities", "你的前 3 項優先改善")}
              </h2>
              <p className="text-sm mb-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {t(lang, "Fix these first for maximum impact", "先修正這些以獲得最大效果")}
              </p>
              <div className="space-y-3">
                {analysis.top_priorities.map((p) => (
                  <div
                    key={p.priority}
                    className="rounded-xl p-5"
                    style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(43,71,52,0.1)', borderLeft: '4px solid hsl(var(--destructive))', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🔴</span>
                      <div>
                        <p className="font-semibold text-sm mb-1" style={{ color: 'hsl(var(--foreground))' }}>{p.principle}: {p.title}</p>
                        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{p.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actionable Next Steps */}
            <ActionableNextSteps priorities={analysis.top_priorities} lang={lang} />

            {/* Build My Resume CTA */}
            {resumeText && <BuildResumeCTA lang={lang} resumeText={resumeText} analysis={analysis} />}

            {/* Save report nudge for non-logged-in users */}
            {!isLoggedIn && (
              <div className="text-center py-2">
                <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {t(lang,
                    "Create a free account to save this report and access it from any device.",
                    "建立免費帳號，儲存報告並從任何裝置查看。"
                  )}{" "}
                  <Link to="/join" state={{ from: location.pathname + location.search }} className="font-semibold hover:underline" style={{ color: 'hsl(var(--gold))' }}>
                    {t(lang, "Sign up free →", "免費註冊 →")}
                  </Link>
                </p>
              </div>
            )}


          </div>{/* end blur wrapper */}
        </div>{/* end relative wrapper */}


        {/* Inline Rating */}
        <div className="flex justify-center">
          <InlineRating
            contentId="resume_analysis_result"
            locale={lang === "zh-TW" ? "zh-tw" : "en"}
            label={lang === "zh-TW" ? "這個分析對你有幫助嗎？" : "Was this analysis helpful?"}
          />
        </div>

        {/* Share */}
        <ShareSection lang={lang} score={analysis.overall_score} />

        {/* Floating Share FAB */}
        <FloatingShareFAB lang={lang} score={analysis.overall_score} />

        {/* Sticky mobile Build CTA */}
        <StickyBuilderBar lang={lang} resumeText={resumeText} analysis={analysis} />
      </div>
    </div>
  );
}
