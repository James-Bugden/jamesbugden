import { useState } from "react";
import { ThumbsUp, ThumbsDown, Sparkles } from "lucide-react";
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

  const defaultLabel = locale === "zh-tw" ? "這篇指南對你有幫助嗎？" : "Did you find this guide helpful?";
  const thanksMsg = locale === "zh-tw" ? "感謝你的回饋！" : "Thanks for your feedback!";

  return (
    <div className="my-10 print:hidden">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm px-6 py-8 text-center">
        {/* Subtle decorative gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none" />

        <div className="relative z-10">
          {rated === null ? (
            <>
              <p className="text-base font-medium text-foreground mb-5">
                {label || defaultLabel}
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handleRate(1)}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:shadow-sm active:scale-95"
                >
                  <ThumbsUp className="w-4 h-4 transition-transform group-hover:-rotate-12" />
                  {locale === "zh-tw" ? "有幫助" : "Yes"}
                </button>
                <button
                  onClick={() => handleRate(-1)}
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-red-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 hover:shadow-sm active:scale-95"
                >
                  <ThumbsDown className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  {locale === "zh-tw" ? "需改進" : "Not really"}
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 animate-in fade-in duration-300">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <p className="text-sm font-medium text-foreground">{thanksMsg}</p>
              <p className="text-xs text-muted-foreground">
                {locale === "zh-tw" ? "你的回饋幫助我們持續改進" : "Your feedback helps us improve our guides"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
