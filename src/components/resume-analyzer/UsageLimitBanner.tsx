import { Heart, AlertTriangle } from "lucide-react";

interface UsageLimitBannerProps {
  lang: "en" | "zh-TW";
  used: number;
  limit: number;
  limitReached: boolean;
}

const t = (lang: "en" | "zh-TW", en: string, zh: string) => lang === "en" ? en : zh;

export function UsageLimitBanner({ lang, used, limit, limitReached }: UsageLimitBannerProps) {
  const remaining = Math.max(0, limit - used);

  return (
    <div
      className="rounded-xl p-4 md:p-5 space-y-3"
      style={{
        backgroundColor: limitReached ? "rgba(220,38,38,0.04)" : "rgba(212,147,13,0.06)",
        border: `1px solid ${limitReached ? "rgba(220,38,38,0.15)" : "rgba(212,147,13,0.15)"}`,
      }}
    >
      {limitReached ? (
        <>
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(var(--destructive))" }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                {t(lang, "Monthly limit reached", "本月額度已用完")}
              </p>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                {t(lang,
                  `You've used all ${limit} free analyses this month. Your limit resets at the start of next month.`,
                  `你已使用完本月 ${limit} 次免費分析額度。額度將於下月初重置。`
                )}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
            {t(lang,
              `${remaining} of ${limit} free analyses remaining this month`,
              `本月還剩 ${remaining}/${limit} 次免費分析`
            )}
          </span>
        </div>
      )}

      {/* Cost transparency message */}
      <div className="flex items-start gap-2 pt-1" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
        <Heart className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "hsl(var(--gold))" }} />
        <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
          {t(lang,
            "Each analysis runs through a premium AI model, which has real costs per use. These limits let me keep the tool free while covering server and AI expenses. Thank you for understanding! 🙏",
            "每次分析都透過高階 AI 模型運算，產生實際費用。設定額度上限，是為了在負擔伺服器與 AI 成本的同時，繼續免費提供這項工具。感謝你的體諒！🙏"
          )}
        </p>
      </div>
    </div>
  );
}
