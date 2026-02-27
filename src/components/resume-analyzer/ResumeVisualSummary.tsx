import type { AnalysisResult } from "./types";

type Language = "en" | "zh-TW";
const t = (lang: Language, en: string, zh: string) => lang === "en" ? en : zh;

/** Approximate vertical position (0-1) for common resume sections */
const SECTION_POSITION: Record<string, number> = {
  "Header & Contact Info": 0.05,
  "基本資訊與聯絡方式": 0.05,
  "Professional Summary": 0.18,
  "專業摘要": 0.18,
  "Work Experience": 0.4,
  "工作經歷": 0.4,
  "Skills": 0.7,
  "技能": 0.7,
  "Education": 0.82,
  "學歷": 0.82,
  "Certifications": 0.9,
  "證照": 0.9,
};

function getPosition(name: string, index: number, total: number): number {
  if (SECTION_POSITION[name] != null) return SECTION_POSITION[name];
  // Fallback: spread evenly
  return 0.05 + (index / Math.max(total - 1, 1)) * 0.85;
}

function scoreColor(score: number) {
  if (score >= 8) return { bg: "bg-executive-green/15", text: "text-executive-green", border: "border-executive-green" };
  if (score >= 6) return { bg: "bg-gold/15", text: "text-gold", border: "border-gold" };
  if (score >= 4) return { bg: "bg-yellow-500/15", text: "text-yellow-600", border: "border-yellow-500" };
  return { bg: "bg-destructive/15", text: "text-destructive", border: "border-destructive" };
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
  const needsWork = sections.filter(s => s.score < 7).length;

  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6">
      <h2 className="font-heading text-lg font-semibold text-foreground mb-1">
        {t(lang, "Resume Health Map", "履歷健康圖")}
      </h2>
      <p className="text-xs text-muted-foreground mb-4">
        {needsWork > 0
          ? t(lang, `${needsWork} of ${sections.length} sections need improvement`, `${sections.length} 個區塊中有 ${needsWork} 個需要改善`)
          : t(lang, "All sections look great!", "所有區塊都很好！")}
      </p>

      <div className="flex flex-col md:flex-row gap-5">
        {/* PDF thumbnail with position markers */}
        {resumeImageUrl && (
          <div className="relative shrink-0 w-full md:w-[220px] aspect-[8.5/11] rounded-lg overflow-hidden border border-border bg-muted">
            <img
              src={resumeImageUrl}
              alt={t(lang, "Your resume - page 1", "你的履歷 - 第 1 頁")}
              className="w-full h-full object-cover object-top"
            />
            {/* Overlaid position dots */}
            {sections.map((section, i) => {
              const yPos = getPosition(section.name, i, sections.length);
              const colors = scoreColor(section.score);
              return (
                <div
                  key={i}
                  className={`absolute right-1.5 w-5 h-5 rounded-full ${colors.bg} border-2 ${colors.border} flex items-center justify-center`}
                  style={{ top: `${yPos * 100}%` }}
                  title={`${section.name}: ${section.score}/10`}
                >
                  <span className={`text-[9px] font-bold ${colors.text}`}>{section.score}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Section health list */}
        <div className="flex-1 space-y-2">
          {sections.map((section, i) => {
            const colors = scoreColor(section.score);
            const barWidth = `${section.score * 10}%`;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center shrink-0`}>
                  <span className={`text-xs font-bold ${colors.text}`}>{section.score}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{section.name}</p>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mt-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${section.score >= 7 ? "bg-executive-green" : section.score >= 5 ? "bg-yellow-500" : "bg-destructive"}`}
                      style={{ width: barWidth }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
