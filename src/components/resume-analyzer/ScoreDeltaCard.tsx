import { TrendingUp, TrendingDown, Minus, Target } from "lucide-react";
import { computeTopContributor, computeNextTarget } from "./scoreDeltaUtils";
import type { Section } from "./types";
import type { SavedAnalysis } from "@/hooks/useResumeAnalyses";

type Language = "en" | "zh-TW";
const t = (lang: Language, en: string, zh: string) =>
  lang === "en" ? en : zh;

interface ScoreDeltaCardProps {
  currentScore: number;
  currentSections: Section[];
  previousAnalysis: SavedAnalysis | null;
  isFirstAnalysis: boolean;
  lang: Language;
}

export function ScoreDeltaCard({
  currentScore,
  currentSections,
  previousAnalysis,
  isFirstAnalysis,
  lang,
}: ScoreDeltaCardProps) {
  if (!isFirstAnalysis && !previousAnalysis) return null;

  // Baseline card — first analysis
  if (isFirstAnalysis) {
    return (
      <div
        className="rounded-2xl p-5 text-center"
        style={{
          backgroundColor: "hsl(var(--card))",
          border: "1px solid rgba(43,71,52,0.1)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div className="text-3xl mb-2">📊</div>
        <p className="font-semibold text-sm mb-1" style={{ color: "hsl(var(--foreground))" }}>
          {t(lang, "This is your baseline", "這是你的基準分數")}
        </p>
        <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
          {t(
            lang,
            "Come back after editing your resume to see your improvement.",
            "編輯履歷後回來，看看你的進步。"
          )}
        </p>
      </div>
    );
  }

  // Delta card — re-analysis
  const prevScore = previousAnalysis!.overall_score ?? 0;
  const delta = currentScore - prevScore;
  const improved = delta > 0;
  const unchanged = delta === 0;

  const prevSections: Section[] =
    (previousAnalysis!.analysis_result as { sections?: Section[] } | null)
      ?.sections ?? [];
  const topContributor = computeTopContributor(currentSections, prevSections);
  const nextTarget = computeNextTarget(currentScore);

  const deltaColor = improved
    ? "hsl(var(--executive-green))"
    : unchanged
    ? "hsl(var(--muted-foreground))"
    : "hsl(var(--destructive))";

  const DeltaIcon = improved ? TrendingUp : unchanged ? Minus : TrendingDown;

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "hsl(var(--card))",
        border: `1px solid ${improved ? "rgba(43,71,52,0.2)" : "rgba(43,71,52,0.1)"}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Score row */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <span
          className="text-2xl font-bold tabular-nums"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {prevScore}
        </span>
        <span className="text-muted-foreground">→</span>
        <span
          className="text-2xl font-bold tabular-nums"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {currentScore}
        </span>
        <span
          className="inline-flex items-center gap-1 text-base font-semibold"
          style={{ color: deltaColor }}
        >
          <DeltaIcon className="w-4 h-4" />
          {improved ? `+${delta}` : delta}
        </span>
      </div>

      {/* Headline */}
      <p
        className="text-sm font-semibold text-center mb-2"
        style={{ color: "hsl(var(--foreground))" }}
      >
        {improved
          ? t(
              lang,
              `Your score improved from ${prevScore} → ${currentScore}`,
              `你的分數從 ${prevScore} 提升至 ${currentScore}`
            )
          : unchanged
          ? t(lang, "Your score is the same as last time", "你的分數與上次相同")
          : t(
              lang,
              `Your score changed from ${prevScore} → ${currentScore}`,
              `你的分數從 ${prevScore} 變為 ${currentScore}`
            )}
      </p>

      {/* Top contributor */}
      {topContributor && (
        <p
          className="text-xs text-center mb-1"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {t(lang, "Top improvement:", "最大進步：")}
          {" "}
          <span
            className="font-semibold"
            style={{ color: "hsl(var(--executive-green))" }}
          >
            {topContributor}
          </span>
        </p>
      )}

      {/* Next target */}
      <div
        className="flex items-center justify-center gap-1.5 mt-2"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <Target className="w-3.5 h-3.5" style={{ color: "hsl(var(--gold))" }} />
        <p className="text-xs">
          {t(lang, `Next target: ${nextTarget}`, `下一個目標：${nextTarget}`)}
        </p>
      </div>
    </div>
  );
}
