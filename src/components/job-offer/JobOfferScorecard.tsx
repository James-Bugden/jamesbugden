import { useState, useMemo } from "react";

interface ScorecardCategory {
  key: string;
  label: string;
  questions: string[];
}

interface ScorecardProps {
  categories: ScorecardCategory[];
  locale?: "en" | "zh-tw";
}

const WEIGHT_OPTIONS = [1, 2, 3];
const SCORE_OPTIONS = [1, 2, 3, 4, 5];

const getScoreBand = (score: number, locale: "en" | "zh-tw") => {
  if (locale === "zh-tw") {
    if (score >= 80) return { label: "強力接受", color: "text-green-400", bg: "bg-green-400/20", desc: "這份工作與你的優先事項高度吻合。充滿信心地往前走。" };
    if (score >= 60) return { label: "謹慎行事", color: "text-gold", bg: "bg-gold/20", desc: "這份工作有優勢，但有明顯的差距。找出哪些類別拉低了分數。" };
    if (score >= 40) return { label: "談判或放棄", color: "text-orange-400", bg: "bg-orange-400/20", desc: "這份工作與你重視的方面有重大不一致。" };
    return { label: "放棄", color: "text-destructive", bg: "bg-destructive/20", desc: "這份工作不符合你的優先事項。" };
  }
  if (score >= 80) return { label: "Strong Accept", color: "text-green-400", bg: "bg-green-400/20", desc: "The offer aligns well with your priorities. Move forward with confidence." };
  if (score >= 60) return { label: "Proceed with Caution", color: "text-gold", bg: "bg-gold/20", desc: "The offer has strengths but meaningful gaps. Identify what's dragging the score down." };
  if (score >= 40) return { label: "Negotiate or Walk Away", color: "text-orange-400", bg: "bg-orange-400/20", desc: "The offer has significant misalignment with what matters to you." };
  return { label: "Walk Away", color: "text-destructive", bg: "bg-destructive/20", desc: "The offer doesn't match your priorities." };
};

export default function JobOfferScorecard({ categories, locale = "en" }: ScorecardProps) {
  const [weights, setWeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(categories.map(c => [c.key, 2]))
  );
  const [scores, setScores] = useState<Record<string, number>>(() =>
    Object.fromEntries(categories.map(c => [c.key, 0]))
  );
  const [showQuestions, setShowQuestions] = useState<string | null>(null);

  const results = useMemo(() => {
    const allScored = categories.every(c => scores[c.key] > 0);
    if (!allScored) return null;
    const totalWeighted = categories.reduce((sum, c) => sum + (weights[c.key] * scores[c.key]), 0);
    const totalWeights = categories.reduce((sum, c) => sum + weights[c.key], 0);
    const finalScore = Math.round((totalWeighted / (totalWeights * 5)) * 100);
    return { totalWeighted, totalWeights, finalScore };
  }, [weights, scores, categories]);

  const band = results ? getScoreBand(results.finalScore, locale) : null;

  const weightLabel = locale === "zh-tw" ? "權重" : "Weight";
  const scoreLabel = locale === "zh-tw" ? "分數" : "Score";
  const weightedLabel = locale === "zh-tw" ? "加權" : "Weighted";
  const helpText = locale === "zh-tw" 
    ? "點擊類別名稱查看評分問題" 
    : "Click a category to see scoring questions";

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="grid grid-cols-[1fr_80px_80px_80px] gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
        <span>{locale === "zh-tw" ? "類別" : "Category"}</span>
        <span className="text-center">{weightLabel}</span>
        <span className="text-center">{scoreLabel}</span>
        <span className="text-center">{weightedLabel}</span>
      </div>

      {/* Category rows */}
      {categories.map((cat) => {
        const w = weights[cat.key];
        const s = scores[cat.key];
        const weighted = s > 0 ? w * s : 0;
        return (
          <div key={cat.key}>
            <div className="grid grid-cols-[1fr_80px_80px_80px] gap-2 items-center bg-card border border-border rounded-xl p-3 md:p-4">
              <button 
                onClick={() => setShowQuestions(showQuestions === cat.key ? null : cat.key)} 
                className="text-left text-foreground font-medium text-sm hover:text-gold transition-colors"
              >
                {cat.label}
                <span className="text-muted-foreground text-xs ml-1">▾</span>
              </button>
              
              {/* Weight selector */}
              <div className="flex gap-1 justify-center">
                {WEIGHT_OPTIONS.map(v => (
                  <button
                    key={v}
                    onClick={() => setWeights(prev => ({ ...prev, [cat.key]: v }))}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      w === v 
                        ? "bg-gold text-executive-green" 
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              {/* Score selector */}
              <div className="flex gap-0.5 justify-center">
                {SCORE_OPTIONS.map(v => (
                  <button
                    key={v}
                    onClick={() => setScores(prev => ({ ...prev, [cat.key]: v }))}
                    className={`w-6 h-7 rounded text-xs font-bold transition-all ${
                      s === v 
                        ? "bg-gold text-executive-green" 
                        : s > 0 && v <= s 
                          ? "bg-gold/30 text-gold" 
                          : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>

              {/* Weighted score */}
              <div className="text-center">
                <span className={`font-bold text-sm ${weighted > 0 ? "text-gold" : "text-muted-foreground"}`}>
                  {weighted > 0 ? weighted : "—"}
                </span>
              </div>
            </div>

            {/* Scoring questions dropdown */}
            {showQuestions === cat.key && (
              <div className="mt-1 ml-2 bg-muted/30 border border-border rounded-lg p-3 md:p-4">
                <ul className="space-y-1.5">
                  {cat.questions.map((q, i) => (
                    <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                      <span className="text-gold mt-0.5">•</span>
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}

      {/* Results */}
      {results && band && (
        <div className={`rounded-xl p-6 ${band.bg} border border-border mt-6`}>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                {locale === "zh-tw" ? "最終分數" : "Final Score"}
              </p>
              <p className={`font-heading text-4xl font-bold ${band.color}`}>
                {results.finalScore}<span className="text-lg text-muted-foreground">/100</span>
              </p>
            </div>
            <div className="flex-1">
              <p className={`font-semibold text-lg ${band.color} mb-1`}>{band.label}</p>
              <p className="text-muted-foreground text-sm">{band.desc}</p>
            </div>
          </div>
          <p className="text-muted-foreground text-xs mt-4">
            ({results.totalWeighted} ÷ ({results.totalWeights} × 5)) × 100 = {results.finalScore}
          </p>
        </div>
      )}

      {!results && (
        <p className="text-center text-muted-foreground text-sm italic py-4">
          {locale === "zh-tw" 
            ? "為所有 6 個類別評分後，你的最終分數會出現在這裡。" 
            : "Rate all 6 categories to see your final score."}
        </p>
      )}

      <p className="text-center text-muted-foreground text-xs">{helpText}</p>
    </div>
  );
}
