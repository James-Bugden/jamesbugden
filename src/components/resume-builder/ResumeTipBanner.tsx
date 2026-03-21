import { useState } from "react";
import { Lightbulb, ChevronDown } from "lucide-react";
import { SECTION_TIPS } from "./resumeTips";
import { cn } from "@/lib/utils";

interface ResumeTipBannerProps {
  sectionType: string;
}

export function ResumeTipBanner({ sectionType }: ResumeTipBannerProps) {
  const tip = SECTION_TIPS[sectionType];
  const [expanded, setExpanded] = useState(false);

  if (!tip) return null;

  return (
    <div className="mb-3">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 w-full text-left group"
      >
        <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 text-primary" />
        <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors flex-1">
          <span className="font-semibold">{tip.title}:</span>{" "}
          {tip.summary}
        </span>
        <ChevronDown
          className={cn(
            "w-3 h-3 text-muted-foreground transition-transform flex-shrink-0",
            expanded && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          expanded ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"
        )}
      >
        <ul className="ml-6 space-y-1">
          {tip.details.map((detail, i) => (
            <li key={i} className="text-xs text-muted-foreground list-disc">
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
