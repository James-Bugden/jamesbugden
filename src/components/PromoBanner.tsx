import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const copy = {
  en: {
    text: "NEW: How to Use AI to Run Your Entire Job Search →",
    guidePath: "/ai-job-search-guide",
    leadMagnet: "https://subscribepage.io/AI-career-guide",
  },
  zh: {
    text: "全新指南：如何用 AI 管理你的整個求職流程 →",
    guidePath: "/zh-tw/ai-job-search-guide",
    leadMagnet: "https://subscribepage.io/AI-career-guide",
  },
} as const;

// Bump this ID whenever the banner content changes to re-show it
const BANNER_ID = "ai-job-search-guide-v1";

export default function PromoBanner({ lang }: { lang: "en" | "zh" }) {
  const { isLoggedIn } = useAuth();
  const [dismissed, setDismissed] = useState(() => localStorage.getItem("promo_banner_dismissed") === BANNER_ID);

  if (dismissed) return null;

  const { text, guidePath, leadMagnet } = copy[lang];
  const href = isLoggedIn ? guidePath : leadMagnet;
  const isExternal = !isLoggedIn;

  return (
    <div className="w-full bg-executive-green text-cream text-center text-sm py-2.5 px-4 flex items-center justify-center gap-3 relative">
      <a
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="hover:underline font-medium"
      >
        {text}
      </a>
      <button
        onClick={(e) => {
          e.stopPropagation();
          localStorage.setItem("promo_banner_dismissed", BANNER_ID);
          setDismissed(true);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity text-cream/80"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
