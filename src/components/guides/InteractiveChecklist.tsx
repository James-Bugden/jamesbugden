import { useState } from "react";
import { useGuideStorage } from "@/hooks/useGuideStorage";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "react-router-dom";
import { X, Check } from "lucide-react";

interface ChecklistItem {
  label: string;
  /** Optional link href for the label */
  href?: string;
}

interface InteractiveChecklistProps {
  /** Unique storage key, e.g. "interview_prep_pre_en" */
  guideKey: string;
  items: ChecklistItem[];
  /** Language for the save banner */
  lang?: "en" | "zh";
  /** Use "dark" when placed on dark backgrounds like bg-executive-green */
  variant?: "light" | "dark";
}

function SaveBanner({ lang, onDismiss }: { lang: "en" | "zh"; onDismiss: () => void }) {
  const location = useLocation();
  const returnUrl = encodeURIComponent(location.pathname);
  return (
    <div className="flex items-center gap-3 bg-gold/10 border border-gold/30 rounded-lg px-4 py-3 mt-3">
      <p className="text-muted-foreground text-xs flex-1">
        {lang === "zh"
          ? "進度已儲存在此裝置。建立免費帳號即可在任何裝置存取。"
          : "Progress saved on this device. Create a free account to sync across devices."}
      </p>
      <a
        href={`/join?returnUrl=${returnUrl}`}
        className="shrink-0 text-xs font-semibold text-gold hover:text-gold/80 underline underline-offset-2"
      >
        {lang === "zh" ? "建立帳號" : "Create Account"}
      </a>
      <button onClick={onDismiss} className="shrink-0 text-muted-foreground hover:text-foreground">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export function InteractiveChecklist({ guideKey, items, lang = "en", variant = "light" }: InteractiveChecklistProps) {
  const isDark = variant === "dark";
  const [checked, setChecked] = useGuideStorage<boolean[]>(guideKey, Array(items.length).fill(false));
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const { isLoggedIn } = useAuth();

  // Ensure array length matches items (handles guide updates)
  const safeChecked = items.map((_, i) => checked[i] ?? false);
  const completedCount = safeChecked.filter(Boolean).length;

  const toggle = (index: number) => {
    setChecked(prev => {
      const next = [...(prev.length >= items.length ? prev : Array(items.length).fill(false))];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            onClick={() => toggle(i)}
            className={`flex items-start gap-3 cursor-pointer group transition-opacity ${
              safeChecked[i] ? "opacity-60" : ""
            }`}
          >
            <span
              className={`mt-0.5 shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                safeChecked[i]
                  ? "bg-gold border-gold text-background"
                  : isDark
                    ? "border-cream/40 group-hover:border-gold/60"
                    : "border-muted-foreground/40 group-hover:border-gold/60"
              }`}
            >
              {safeChecked[i] && <Check className="w-3 h-3" />}
            </span>
            <span className={`text-sm ${
              safeChecked[i]
                ? isDark ? "line-through text-cream/50" : "line-through text-muted-foreground"
                : isDark ? "text-cream" : "text-foreground"
            }`}>
              {item.href ? (
                <a
                  href={item.href}
                  onClick={e => e.stopPropagation()}
                  className={isDark
                    ? "text-gold-light underline underline-offset-2 hover:text-gold transition-colors"
                    : "text-gold underline underline-offset-2 hover:text-gold/80 transition-colors"
                  }
                >
                  {item.label}
                </a>
              ) : (
                item.label
              )}
            </span>
          </li>
        ))}
      </ul>
      {completedCount > 0 && (
        <p className={`text-xs mt-2 ${isDark ? "text-cream/60" : "text-muted-foreground"}`}>
          {lang === "zh"
            ? `${completedCount}/${items.length} 完成`
            : `${completedCount}/${items.length} completed`}
        </p>
      )}
      {completedCount >= 2 && !isLoggedIn && !bannerDismissed && (
        <SaveBanner lang={lang} onDismiss={() => setBannerDismissed(true)} />
      )}
    </div>
  );
}
