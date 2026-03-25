import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface InlineRatingProps {
  contentId: string;
  locale?: "en" | "zh-tw";
  label?: string;
}

export default function InlineRating({ contentId, locale = "en", label }: InlineRatingProps) {
  const storageKey = `inline_rating_${contentId}`;
  const [rated, setRated] = useState<number | null>(() => {
    const v = localStorage.getItem(storageKey);
    return v ? parseInt(v, 10) : null;
  });

  const handleRate = async (r: 1 | -1) => {
    setRated(r);
    localStorage.setItem(storageKey, String(r));
    try {
      await supabase.from("feedback" as any).insert({
        message: `Inline rating: ${r === 1 ? "👍" : "👎"} for ${contentId}`,
        page: window.location.pathname,
        locale,
        type: "inline_rating",
        rating: r,
        context: contentId,
      } as any);
    } catch {}
  };

  const defaultLabel = locale === "zh-tw" ? "這個分析有幫助嗎？" : "Was this helpful?";

  return (
    <div className="flex items-center gap-3 py-3 print:hidden">
      <span className="text-sm text-muted-foreground">{label || defaultLabel}</span>
      <button
        onClick={() => handleRate(1)}
        disabled={rated !== null}
        className={`p-1.5 rounded-md transition-colors ${
          rated === 1
            ? "text-primary bg-primary/10"
            : rated !== null
            ? "text-muted-foreground/40 cursor-not-allowed"
            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
        }`}
      >
        <ThumbsUp className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleRate(-1)}
        disabled={rated !== null}
        className={`p-1.5 rounded-md transition-colors ${
          rated === -1
            ? "text-destructive bg-destructive/10"
            : rated !== null
            ? "text-muted-foreground/40 cursor-not-allowed"
            : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"
        }`}
      >
        <ThumbsDown className="w-4 h-4" />
      </button>
      {rated !== null && (
        <span className="text-xs text-muted-foreground">
          {locale === "zh-tw" ? "感謝回饋！" : "Thanks!"}
        </span>
      )}
    </div>
  );
}
