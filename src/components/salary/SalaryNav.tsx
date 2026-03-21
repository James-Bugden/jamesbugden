import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSalaryContext } from "./SalaryContext";
import { useSalaryT, type SalaryLang } from "./salaryI18n";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Menu, X, Home } from "lucide-react";

export default function SalaryNav({ lang }: { lang: SalaryLang }) {
  const t = useSalaryT(lang);
  const { currency, setCurrency, period, setPeriod, fxRate } = useSalaryContext();
  const loc = useLocation();
  const prefix = lang === "zh" ? "/zh-tw" : "";
  const [open, setOpen] = useState(false);

  const links = [
    { to: `${prefix}/salary`, label: t.salaryChecker },
    { to: `${prefix}/salary/explore`, label: t.explore },
    { to: `${prefix}/salary/compare`, label: t.compare },
    { to: `${prefix}/salary/insights`, label: t.insights },
  ];

  const toggleButtons = (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex rounded-lg border border-border overflow-hidden min-h-[36px]">
            <button
              onClick={() => setCurrency("NTD")}
              className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${currency === "NTD" ? "bg-executive text-white" : "hover:bg-muted text-muted-foreground"}`}
            >
              NT$
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-2.5 py-1.5 text-xs font-semibold transition-colors border-l border-border ${currency === "USD" ? "bg-executive text-white" : "hover:bg-muted text-muted-foreground"}`}
            >
              US$
            </button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{t.rateTooltip.replace("{rate}", String(fxRate))}</p>
        </TooltipContent>
      </Tooltip>
      <div className="inline-flex rounded-lg border border-border overflow-hidden min-h-[36px]">
        <button
          onClick={() => setPeriod("annual")}
          className={`px-2.5 py-1.5 text-xs font-semibold transition-colors ${period === "annual" ? "bg-executive text-white" : "hover:bg-muted text-muted-foreground"}`}
        >
          {t.annual}
        </button>
        <button
          onClick={() => setPeriod("monthly")}
          className={`px-2.5 py-1.5 text-xs font-semibold transition-colors border-l border-border ${period === "monthly" ? "bg-executive text-white" : "hover:bg-muted text-muted-foreground"}`}
        >
          {t.monthly}
        </button>
      </div>
      <Link
        to={lang === "zh" ? "/salary" : "/zh-tw/salary"}
        className="px-2.5 py-1.5 rounded-md text-xs font-semibold border border-border hover:bg-muted transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
      >
        {lang === "zh" ? "EN" : "中"}
      </Link>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Link to={prefix || "/"} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Back to home">
                <Home className="w-4 h-4" />
              </Link>
              <Link to={`${prefix}/salary`} className="font-heading text-xl text-executive font-bold tracking-tight flex items-center gap-1.5">
                {t.salaryTW}
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-executive/10 text-executive leading-none">Beta</span>
              </Link>
              <nav className="hidden sm:flex items-center gap-1" aria-label="Main navigation">
                {links.map(l => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-executive focus-visible:outline-offset-2 ${
                      loc.pathname === l.to
                        ? "bg-executive text-white"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              {toggleButtons}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="sm:hidden p-2 rounded-md hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Trust strip - hidden on mobile */}
        <div className="hidden sm:block border-t border-border bg-muted/30">
          <p className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 text-[11px] text-muted-foreground text-center tracking-wide">
            {t.trustStrip}
          </p>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      {open && (
        <div className="fixed inset-0 z-[60] sm:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
          <nav
            className="absolute right-0 top-0 bottom-0 w-72 bg-background border-l border-border shadow-xl animate-in slide-in-from-right duration-200 p-6 space-y-6"
            onClick={e => e.stopPropagation()}
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-lg text-executive font-bold flex items-center gap-1.5">{t.salaryTW}<span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-executive/10 text-executive leading-none">Beta</span></span>
              <button onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-muted min-h-[44px] min-w-[44px] flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1">
              {links.map(l => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    loc.pathname === l.to
                      ? "bg-executive text-white"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="border-t border-border pt-4 flex items-center gap-2 flex-wrap">
              {toggleButtons}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
