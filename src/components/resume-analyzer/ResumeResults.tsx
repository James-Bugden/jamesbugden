import { useState } from "react";
import { ChevronDown, CheckCircle, AlertTriangle, XCircle, ExternalLink, Share2, ArrowRight, RotateCcw, Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToPdf } from "@/lib/pdfExport";
import type { AnalysisResult } from "./types";
import { Link, useLocation } from "react-router-dom";

type Language = "en" | "zh-TW";
const t = (lang: Language, en: string, zh: string) => lang === "en" ? en : zh;

function ScoreHero({ score, lang }: { score: number; lang: Language }) {
  const size = 180;
  const radius = (size - 14) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 90 ? "hsl(142 60% 35%)" : score >= 75 ? "hsl(142 50% 45%)" : score >= 65 ? "hsl(45 80% 50%)" : score >= 50 ? "hsl(30 80% 50%)" : "hsl(0 70% 50%)";
  const grade = score >= 90 ? "A+" : score >= 80 ? "A" : score >= 70 ? "B" : score >= 60 ? "C" : score >= 50 ? "D" : "F";

  const verdictText = (s: number) => {
    if (s >= 90) return t(lang, "Excellent! Your resume is polished and ready to impress recruiters.", "優秀！你的履歷已經打磨完善，能夠給招募官留下深刻印象。");
    if (s >= 75) return t(lang, "Your resume is strong — a few targeted improvements will make it highly competitive.", "你的履歷很好——幾項針對性改善就能大幅提升競爭力。");
    if (s >= 65) return t(lang, "Your resume is decent but needs optimization to stand out.", "你的履歷不錯，但需要優化才能脫穎而出。");
    if (s >= 50) return t(lang, "Your resume has potential but has critical issues holding you back.", "你的履歷有潛力，但有關鍵問題需要解決。");
    return t(lang, "Your resume needs significant improvements before it will be competitive.", "你的履歷需要大幅改善才能具有競爭力。");
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Ring + Grade combo */}
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
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

      {/* Score number */}
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-3xl font-bold text-foreground">{score}</span>
        <span className="text-base text-muted-foreground font-medium">/100</span>
      </div>

      <p className="text-sm text-muted-foreground">{t(lang, "Overall Resume Score", "整體履歷分數")}</p>

      <p className="text-base text-foreground mt-2 max-w-lg mx-auto text-center leading-relaxed">
        {verdictText(score)}
      </p>
    </div>
  );
}

function SectionCard({ section, lang, defaultOpen, locked }: { section: AnalysisResult["sections"][0]; lang: Language; defaultOpen?: boolean; locked?: boolean }) {
  const [open, setOpen] = useState(locked ? false : (defaultOpen || false));
  const scoreColor = section.score >= 8 ? "border-l-executive-green" : section.score >= 6 ? "border-l-gold" : section.score >= 4 ? "border-l-yellow-500" : "border-l-destructive";
  const bgTint = section.score >= 8 ? "" : section.score >= 6 ? "" : section.score < 4 ? "bg-destructive/[0.02]" : "";
  const barColor = section.score >= 7 ? "bg-executive-green" : section.score >= 5 ? "bg-yellow-500" : "bg-destructive";
  const barWidth = `${section.score * 10}%`;

  return (
    <div className={`bg-card border border-border border-l-4 ${scoreColor} rounded-xl overflow-hidden ${bgTint}`}>
      <button onClick={() => !locked && setOpen(!open)} className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${locked ? "cursor-default" : "hover:bg-muted/30"}`}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-foreground text-sm">{section.name}</h3>
            <span className={`text-xs font-bold ${section.score >= 7 ? "text-executive-green" : section.score >= 5 ? "text-yellow-600" : "text-destructive"}`}>{section.score}/10</span>
          </div>
          <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${barColor} transition-all duration-500`} style={{ width: barWidth }} />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-1">{section.summary}</p>
        </div>
        {locked ? (
          <Lock className="w-4 h-4 text-muted-foreground/50 shrink-0" />
        ) : (
          <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 space-y-3 border-t border-border pt-4">
          {section.findings.map((f, i) => (
            <div key={i} className="flex gap-2.5">
              {f.type === "strength" ? (
                <CheckCircle className="w-4 h-4 text-executive-green shrink-0 mt-0.5" />
              ) : f.type === "critical" ? (
                <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
              )}
              <div className="text-sm">
                <p className="text-foreground">
                  <strong className="text-foreground">{f.principle}:</strong> {f.text}
                </p>
                {f.evidence && (
                  <p className="text-xs text-muted-foreground mt-1 italic">"{f.evidence}"</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LockedOverlay({ lang, currentPath }: { lang: Language; currentPath: string }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-16 bg-background/60 backdrop-blur-[6px] rounded-xl">
      <div className="bg-card border border-border rounded-2xl shadow-xl p-8 max-w-sm text-center">
        <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-6 h-6 text-gold" />
        </div>
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">
          {t(lang, "Create a Free Account", "建立免費帳號")}
        </h3>
        <p className="text-sm text-muted-foreground mb-5">
          {t(lang,
            "Sign up to unlock your full report — detailed findings, bullet rewrites, and top priorities.",
            "註冊即可解鎖完整報告 — 詳細分析、履歷描述改寫和優先改善建議。"
          )}
        </p>
        <Link
          to="/signup"
          state={{ from: currentPath }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold text-[#1B3A2F] text-sm font-bold hover:bg-gold/90 transition-colors"
        >
          {t(lang, "Sign Up Free", "免費註冊")}
          <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-xs text-muted-foreground mt-3">
          {t(lang, "Already have an account?", "已有帳號？")}{" "}
          <Link to="/login" state={{ from: currentPath }} className="text-gold hover:underline font-medium">
            {t(lang, "Sign in", "登入")}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResumeResults({ analysis, lang, onReset, isUnlocked = true }: { analysis: AnalysisResult; lang: Language; onReset?: () => void; isUnlocked?: boolean }) {
  const location = useLocation();

  return (
    <div className="py-12 md:py-20 px-5" id="analysis-results-container">
      <div className="container mx-auto max-w-3xl space-y-10">

        {/* Action bar */}
        <div className="flex items-center justify-between gap-3">
          {onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              {t(lang, "Scan Another Resume", "掃描另一份履歷")}
            </button>
          )}
          {isUnlocked && (
            <button
              onClick={() => exportToPdf({ elementId: "analysis-results-container", fileName: "Resume-Analysis-Report.pdf", pageFormat: "a4" })}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors ml-auto"
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

        {/* Locked sections wrapper — everything after score */}
        <div className="relative">
          {!isUnlocked && <LockedOverlay lang={lang} currentPath={location.pathname} />}
          <div className={`space-y-10 ${!isUnlocked ? "blur-sm pointer-events-none select-none" : ""}`}>

            {/* Section Breakdown */}
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-4">
                {t(lang, "Section-by-Section Breakdown", "逐項分析")}
              </h2>
              <div className="space-y-3">
                {analysis.sections.map((section, i) => (
                  <SectionCard key={i} section={section} lang={lang} defaultOpen={isUnlocked && (i === 0 || section.score < 6)} locked={!isUnlocked} />
                ))}
              </div>
            </div>

            {/* Bullet Rewrite */}
            <div className="bg-card border-2 border-gold/30 rounded-xl p-6">
              <h2 className="font-heading text-xl text-foreground mb-4">
                {t(lang, "Example: How to Transform Your Resume Bullets", "範例：如何改造你的履歷描述")}
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-destructive uppercase mb-1">{t(lang, "Before", "修改前")}</p>
                  <p className="text-sm text-muted-foreground bg-muted rounded-lg p-3 italic">"{analysis.bullet_rewrite.original}"</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-executive-green uppercase mb-1">{t(lang, "After", "修改後")}</p>
                  <p className="text-sm text-foreground bg-executive-green/10 rounded-lg p-3 font-medium">"{analysis.bullet_rewrite.improved}"</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">{t(lang, "What changed", "改了什麼")}</p>
                  <ul className="space-y-1">
                    {analysis.bullet_rewrite.changes.map((c, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex gap-2">
                        <span className="text-gold">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                {t(lang, "This is just one example. A full resume review transforms every bullet this way.", "這只是一個範例。完整的履歷審查會將每一條描述都這樣改善。")}
              </p>
            </div>

            {/* Top 3 Priorities */}
            <div>
              <h2 className="font-heading text-2xl text-foreground mb-1">
                {t(lang, "Your Top 3 Priorities", "你的前 3 項優先改善")}
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                {t(lang, "Fix these first for maximum impact", "先修正這些以獲得最大效果")}
              </p>
              <div className="space-y-3">
                {analysis.top_priorities.map((p) => (
                  <div key={p.priority} className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-destructive">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">🔴</span>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">{p.principle}: {p.title}</p>
                        <p className="text-sm text-muted-foreground">{p.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coaching CTA */}
            <div className="border-2 border-gold/40 rounded-2xl p-6 md:p-8 text-center" style={{ background: 'radial-gradient(ellipse at center, hsl(153 38% 17%) 0%, hsl(153 42% 13%) 100%)' }}>
              <h2 className="font-heading text-xl md:text-2xl text-cream mb-2">
                {t(lang, "Want a Recruiter to Fix All of This For You?", "想讓招募官幫你全部改好？")}
              </h2>
              <p className="text-sm text-cream/70 mb-5 max-w-md mx-auto leading-relaxed">
                {t(lang,
                  "I personally review and rewrite resumes for a small number of clients each month. See real before-and-after examples.",
                  "我每月為少數客戶親自審閱並改寫履歷。查看真實的修改前後範例。"
                )}
              </p>
              <a
                href={lang === "zh-TW" ? "/zh-tw#coaching" : "/#coaching"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold text-[#1B3A2F] text-sm font-bold hover:bg-gold/90 transition-colors"
              >
                {t(lang, "See If You're a Fit", "查看是否適合你")}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>{/* end blur wrapper */}
        </div>{/* end relative wrapper */}

        {/* Free Templates */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-heading text-xl text-foreground mb-2">
            {t(lang, "Download Free Resume Templates", "下載免費履歷模板")}
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            {t(lang, "Battle-tested formats that pass ATS screening at top companies.", "經過實戰驗證，能通過頂尖企業 ATS 篩選的格式。")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: t(lang, "English Resume Template", "英文履歷模板"), url: "https://docs.google.com/document/d/1BAkVHZ57JsLzL0hk1AUvFBu4bsx8ymMA7tPJKuJROIM/edit?usp=sharing" },
              { label: t(lang, "Chinese Resume Template", "中文履歷模板"), url: "https://docs.google.com/document/d/1U14BS5yISb17ejgVIX5IyeaVZKiww33hpJNOnEy4Wy0/edit?usp=sharing" },
            ].map((tmpl) => (
              <a key={tmpl.label} href={tmpl.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-gold/50 hover:bg-gold/5 transition-all"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{tmpl.label}</p>
                  <p className="text-xs text-muted-foreground">{t(lang, "Google Docs — make a copy to edit", "Google Docs — 建立副本後即可編輯")}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gold shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <h2 className="font-heading text-xl text-foreground mb-2">
            {t(lang, "Keep improving", "繼續提升")}
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            {t(lang, "Resources to strengthen your job search", "幫助你加強求職的資源")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={lang === "zh-TW" ? "/zh-tw/guides" : "/guides"} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B3A2F] text-white text-sm font-semibold hover:bg-[#152E25] transition-colors">
              {t(lang, "Free Career Guides", "免費職涯指南")}
            </a>
            <a href={lang === "zh-TW" ? "/zh-tw/salary-starter-kit" : "/salary-starter-kit"} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              {t(lang, "Salary Negotiation Toolkit", "薪資談判工具包")}
            </a>
          </div>
        </div>

        {/* Share */}
        <div className="bg-[#1B3A2F] rounded-2xl p-8 text-center">
          <Share2 className="w-8 h-8 text-gold mx-auto mb-3" />
          <h2 className="font-heading text-xl text-white mb-2">
            {t(lang, "Know someone who needs resume help?", "認識需要履歷幫助的人？")}
          </h2>
          <p className="text-white/70 text-sm mb-5">
            {t(lang, "Send them this free tool — it takes 30 seconds.", "把這個免費工具分享給他們——只要 30 秒。")}
          </p>
          <button
            onClick={() => {
              const url = window.location.origin + "/resume-analyzer";
              const text = t(lang,
                "I found this free resume analyzer. It scores your resume and shows you exactly what to fix.",
                "我發現了這個免費履歷分析工具。它會幫你的履歷評分，並告訴你該改什麼。"
              );
              if (navigator.share) {
                navigator.share({ title: t(lang, "Free Resume Analyzer", "免費履歷分析工具"), text, url });
              } else {
                navigator.clipboard.writeText(`${text} ${url}`);
                alert(t(lang, "Link copied to clipboard!", "連結已複製！"));
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold text-[#1B3A2F] text-sm font-bold hover:bg-gold/90 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            {t(lang, "Share with a friend", "分享給朋友")}
          </button>
        </div>
      </div>
    </div>
  );
}
