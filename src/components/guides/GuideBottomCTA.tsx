import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface GuideBottomCTAProps {
  lang?: "en" | "zh";
}

const i18n = {
  en: {
    heading: "Get full access — for free",
    sub: "Create your free account to unlock every guide, tool, and template on this site.",
    bullets: [
      "10+ career & interview guides",
      "Resume Builder & AI Analyzer",
      "Interview Question Bank & salary tools",
    ],
    cta: "Create Free Account",
    note: "No credit card required",
    joinPath: "/join",
  },
  zh: {
    heading: "免費取得完整資源",
    sub: "建立免費帳號，解鎖本站所有指南、工具與範本。",
    bullets: [
      "10+ 份職涯與面試指南",
      "履歷編輯器與 AI 履歷健檢",
      "面試題庫與薪資工具",
    ],
    cta: "建立免費帳號",
    note: "無需信用卡",
    joinPath: "/zh-tw/join",
  },
} as const;

export default function GuideBottomCTA({ lang = "en" }: GuideBottomCTAProps) {
  const { isLoggedIn, isLoading } = useAuth();
  const t = i18n[lang] ?? i18n.en;

  if (isLoading || isLoggedIn) return null;

  return (
    <section className="py-16 md:py-20 px-5 md:px-6 bg-executive-green">
      <div className="container mx-auto max-w-2xl text-center">
        <h2
          className="font-heading mb-3 text-cream"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
        >
          {t.heading}
        </h2>
        <p className="text-cream/80 mb-8 max-w-lg mx-auto">{t.sub}</p>

        <div className="flex flex-col gap-3 mb-8 text-left max-w-sm mx-auto">
          {t.bullets.map((b) => (
            <div key={b} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-gold" />
              <span className="text-cream">{b}</span>
            </div>
          ))}
        </div>

        <Link
          to={t.joinPath}
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-white bg-gold hover:bg-gold/90 transition-colors text-lg"
        >
          {t.cta}
          <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="mt-3 text-sm text-cream/60">{t.note}</p>
      </div>
    </section>
  );
}
