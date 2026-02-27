import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import type { AnalysisResult } from "./types";

type Language = "en" | "zh-TW";
const t = (lang: Language, en: string, zh: string) => lang === "en" ? en : zh;

function statusIcon(score: number) {
  if (score >= 8) return <CheckCircle className="w-4 h-4 text-executive-green shrink-0" />;
  if (score >= 5) return <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0" />;
  return <XCircle className="w-4 h-4 text-destructive shrink-0" />;
}

function statusLabel(score: number, lang: Language) {
  if (score >= 8) return <span className="text-xs font-semibold text-executive-green">{t(lang, "Strong", "良好")}</span>;
  if (score >= 5) return <span className="text-xs font-semibold text-yellow-600">{t(lang, "Needs Work", "待改善")}</span>;
  return <span className="text-xs font-semibold text-destructive">{t(lang, "Critical", "需修正")}</span>;
}

export default function ResumeVisualSummary({
  sections,
  resumeImageUrl,
  lang,
}: {
  sections: AnalysisResult["sections"];
  resumeImageUrl?: string | null;
  lang: Language;
}) {
  const strong = sections.filter(s => s.score >= 8).length;
  const needsWork = sections.filter(s => s.score >= 5 && s.score < 8).length;
  const critical = sections.filter(s => s.score < 5).length;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Summary stats bar */}
      <div className="flex items-center justify-center gap-6 px-5 py-3 bg-muted/50 border-b border-border">
        {strong > 0 && (
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-executive-green" />
            <span className="text-xs text-muted-foreground">{strong} {t(lang, "strong", "良好")}</span>
          </div>
        )}
        {needsWork > 0 && (
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />
            <span className="text-xs text-muted-foreground">{needsWork} {t(lang, "needs work", "待改善")}</span>
          </div>
        )}
        {critical > 0 && (
          <div className="flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5 text-destructive" />
            <span className="text-xs text-muted-foreground">{critical} {t(lang, "critical", "需修正")}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Resume image — large and readable */}
        {resumeImageUrl && (
          <div className="md:w-[320px] lg:w-[360px] shrink-0 border-b md:border-b-0 md:border-r border-border bg-muted/30 p-4">
            <img
              src={resumeImageUrl}
              alt={t(lang, "Your resume - page 1", "你的履歷 - 第 1 頁")}
              className="w-full rounded-lg shadow-sm border border-border"
            />
          </div>
        )}

        {/* Section health list */}
        <div className="flex-1 p-5">
          <h3 className="font-heading text-base font-semibold text-foreground mb-4">
            {t(lang, "Section Health Check", "各區塊健康檢查")}
          </h3>
          <div className="space-y-3">
            {sections.map((section, i) => {
              const barColor = section.score >= 8 ? "bg-executive-green" : section.score >= 5 ? "bg-yellow-500" : "bg-destructive";
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      {statusIcon(section.score)}
                      <span className="text-sm font-medium text-foreground truncate">{section.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {statusLabel(section.score, lang)}
                      <span className="text-xs text-muted-foreground w-8 text-right">{section.score}/10</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${barColor} transition-all duration-700`}
                      style={{ width: `${section.score * 10}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
