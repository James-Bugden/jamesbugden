import { useState } from "react";
import { Lightbulb, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "./i18n";

const BRAND = {
  green: "#2b4734",
  greenLight: "#e8f0eb",
  text: "#1A1A1A",
  textSecondary: "#6B6B6B",
  border: "#e5e7eb",
  gold: "#D4930D",
};

const POINTS = [
  { titleKey: "philoOneColTitle", bodyKey: "philoOneColBody" },
  { titleKey: "philoFontTitle", bodyKey: "philoFontBody" },
  { titleKey: "philoHeaderTitle", bodyKey: "philoHeaderBody" },
  { titleKey: "philoHeadingsTitle", bodyKey: "philoHeadingsBody" },
  { titleKey: "philoNoColorTitle", bodyKey: "philoNoColorBody" },
  { titleKey: "philoSectionsTitle", bodyKey: "philoSectionsBody" },
  { titleKey: "philoCanChangeTitle", bodyKey: "philoCanChangeBody" },
] as const;

export function DesignPhilosophy() {
  const t = useT();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border p-4" style={{ borderColor: BRAND.border }}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 min-h-[44px]"
        aria-expanded={expanded}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: BRAND.greenLight }}
        >
          <Lightbulb className="w-4 h-4" style={{ color: BRAND.green }} />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold" style={{ color: BRAND.text }}>
            {t("philoTitle")}
          </p>
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 flex-shrink-0 transition-transform duration-200",
            expanded && "rotate-180"
          )}
          style={{ color: BRAND.textSecondary }}
        />
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 animate-fade-in">
          <p className="text-[13px] leading-relaxed whitespace-pre-line" style={{ color: BRAND.textSecondary }}>
            {t("philoIntro")}
          </p>

          <ol className="space-y-3">
            {POINTS.map((point, i) => (
              <li key={i} className="flex gap-2.5">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold mt-0.5"
                  style={{ backgroundColor: BRAND.greenLight, color: BRAND.green }}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold" style={{ color: BRAND.text }}>
                    {t(point.titleKey as any)}
                  </p>
                  <p className="text-[12px] leading-relaxed mt-0.5 whitespace-pre-line" style={{ color: BRAND.textSecondary }}>
                    {t(point.bodyKey as any)}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <p
            className="text-[13px] leading-relaxed pt-2 border-t whitespace-pre-line"
            style={{ color: BRAND.textSecondary, borderColor: BRAND.border }}
          >
            {t("philoMethod" as any)}
          </p>

          <p
            className="text-[13px] font-semibold italic whitespace-pre-line"
            style={{ color: BRAND.gold }}
          >
            {t("philoClosing")}
          </p>
        </div>
      )}
    </div>
  );
}
