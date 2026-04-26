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
    <section className="py-14 md:py-20 px-5 md:px-6 bg-paper-alt">
      <div className="container mx-auto max-w-2xl">
        {/* Hairline card matching site language */}
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center shadow-sm">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold font-bold mb-4">
            {lang === "zh" ? "免費" : "Free"}
          </p>
          <h2
            className="font-heading text-foreground font-bold tracking-tight mb-3"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)" }}
          >
            {t.heading}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto leading-relaxed">
            {t.sub}
          </p>

          <ul className="flex flex-col gap-2.5 mb-8 text-left max-w-sm mx-auto">
            {t.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-soft border border-gold/30 flex-shrink-0"
                  aria-hidden
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
                </span>
                <span className="text-foreground">{b}</span>
              </li>
            ))}
          </ul>

          <Link
            to={t.joinPath}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-bold bg-gold text-executive-green hover:bg-gold-dark hover:text-cream transition-colors text-base shadow-sm"
          >
            {t.cta}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-muted-foreground mt-3">{t.note}</p>
        </div>
      </div>
    </section>
  );
}
