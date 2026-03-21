import { Link } from "react-router-dom";
import { useSalaryT, type SalaryLang } from "./salaryI18n";
import MethodologyModal from "./MethodologyModal";

export default function SalaryFooter({ lang }: { lang: SalaryLang }) {
  const t = useSalaryT(lang);
  const prefix = lang === "zh" ? "/zh-tw" : "";

  const navLinks = [
    { to: `${prefix}/salary`, label: t.salaryChecker },
    { to: `${prefix}/salary/explore`, label: t.explore },
    { to: `${prefix}/salary/compare`, label: t.compare },
    { to: `${prefix}/salary/insights`, label: t.insights },
    { to: `${prefix}/offer-calculator`, label: lang === "zh" ? "Offer 計算器" : "Offer Calculator" },
  ];

  return (
    <footer className="border-t border-border bg-muted/40 mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to={`${prefix}/salary`} className="font-heading text-lg text-executive font-bold tracking-tight">
            {t.salaryTW}
          </Link>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1" aria-label="Footer navigation">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className="text-xs text-muted-foreground hover:text-executive transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to={lang === "zh" ? "/salary" : "/zh-tw/salary"}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            {lang === "zh" ? "EN" : "中文"}
          </Link>
        </div>

        {/* Middle row */}
        <p className="text-[11px] text-muted-foreground text-center tracking-wide">
          {t.trustStrip}
        </p>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] text-muted-foreground text-center">
          <span>{t.footerNote}</span>
          <span className="hidden sm:inline">·</span>
          <span>{lang === "zh" ? "僅供參考。實際薪酬可能有所不同。" : "For informational purposes only. Actual compensation varies."}</span>
          <span className="hidden sm:inline">·</span>
          <MethodologyModal lang={lang}>
            <button className="text-executive underline underline-offset-2 hover:text-executive-light transition-colors">
              {t.methodology}
            </button>
          </MethodologyModal>
        </div>
      </div>
    </footer>
  );
}
