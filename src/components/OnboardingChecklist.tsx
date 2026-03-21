import { memo, useMemo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, X, ArrowRight } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRecentlyUsed } from "@/hooks/useRecentlyUsed";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

function OnboardingChecklistInner({ lang = "en" }: { lang?: "en" | "zh" }) {
  const [dismissed, setDismissed] = useLocalStorage("onboarding_dismissed_v1", false);
  const { recentItems } = useRecentlyUsed();
  const { isComplete } = useReadingProgress();
  const { user } = useAuth();

  // Cloud-synced completion flags
  const [cloudHasAnalysis, setCloudHasAnalysis] = useState(false);
  const [cloudHasGuide, setCloudHasGuide] = useState(false);

  useEffect(() => {
    if (!user) return;
    // Check resume_analyses
    supabase
      .from("resume_analyses")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .limit(1)
      .then(({ count }: { count: number | null }) => {
        if (count && count > 0) setCloudHasAnalysis(true);
      });
    // Check guide_progress
    supabase
      .from("guide_progress")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .limit(1)
      .then(({ count }) => {
        if (count && count > 0) setCloudHasGuide(true);
      });
  }, [user]);

  const steps = useMemo(() => [
    {
      id: "analyze",
      title: { en: "Analyze your resume", zh: "分析你的履歷" },
      desc: { en: "Get a recruiter-level score in 60 seconds", zh: "60 秒拿到 Recruiter 視角評分" },
      path: lang === "zh" ? "/zh-tw/resume-analyzer" : "/resume-analyzer",
      checkFn: () => {
        if (cloudHasAnalysis) return true;
        try { return !!localStorage.getItem("resume_analysis_result"); } catch { return false; }
      },
    },
    {
      id: "build",
      title: { en: "Create or edit a resume", zh: "建立或編輯履歷" },
      desc: { en: "Use proven templates to build your resume", zh: "用實戰驗證的模板打造履歷" },
      path: lang === "zh" ? "/zh-tw/resume" : "/resume",
      checkFn: () => {
        if (recentItems.some(r => r.id === "resume-builder")) return true;
        try { return !!localStorage.getItem("james_careers_resume"); } catch { return false; }
      },
    },
    {
      id: "guide",
      title: { en: "Read a guide", zh: "閱讀一篇指南" },
      desc: { en: "Pick the guide that fits your stage", zh: "選一篇適合你的指南" },
      path: lang === "zh" ? "/zh-tw/guides" : "/guides",
      checkFn: () => {
        if (cloudHasGuide) return true;
        return recentItems.some(r => r.type === "guide") ||
          ["pivot-guide", "resume-guide", "interview-prep", "linkedin-guide"].some(id => isComplete(id));
      },
    },
  ], [lang, recentItems, isComplete, cloudHasAnalysis, cloudHasGuide]);

  const completed = steps.filter(s => s.checkFn());
  const progress = Math.round((completed.length / steps.length) * 100);

  if (dismissed || progress === 100) return null;

  const t = lang === "zh"
    ? { heading: "開始你的求職旅程", progressLabel: `${completed.length}/${steps.length} 完成` }
    : { heading: "Start your job search journey", progressLabel: `${completed.length}/${steps.length} complete` };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 md:p-6 relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 p-1 rounded-full hover:bg-muted transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5 text-muted-foreground" />
      </button>

      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-sm font-bold text-foreground">{t.heading}</h3>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold/15 text-gold">
          {t.progressLabel}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full mb-4 bg-muted">
        <div
          className="h-full rounded-full transition-all duration-500 bg-gold"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-2">
        {steps.map((step) => {
          const done = step.checkFn();
          return (
            <Link
              key={step.id}
              to={step.path}
              className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted/50"
            >
              {done ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 text-gold" />
              ) : (
                <Circle className="w-5 h-5 shrink-0 text-muted-foreground/40" />
              )}
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-medium ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                  {step.title[lang]}
                </p>
                <p className="text-xs text-muted-foreground">{step.desc[lang]}</p>
              </div>
              {!done && <ArrowRight className="w-4 h-4 shrink-0 text-gold" />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

const OnboardingChecklist = memo(OnboardingChecklistInner);
export default OnboardingChecklist;
