import type { SalaryEntry } from "@/data/salaryData";
import { NATIONAL_MEDIAN } from "@/data/salaryData";
import { useSalaryContext } from "./SalaryContext";
import { useSalaryT, type SalaryLang } from "./salaryI18n";
import { FreshnessBadge, TierBadge } from "./badges";
import { ArrowUp, ArrowDown } from "lucide-react";
import SalaryRangeBar from "./SalaryRangeBar";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface Props {
  entry: SalaryEntry;
  lang: SalaryLang;
  showRangeLegend?: boolean;
}

export default function SalaryResultCard({ entry, lang, showRangeLegend = false }: Props) {
  const { formatSalary } = useSalaryContext();
  const t = useSalaryT(lang);

  const diff = ((entry.med - NATIONAL_MEDIAN) / NATIONAL_MEDIAN) * 100;
  const isAbove = diff >= 0;
  const nationalFormatted = `NT$${NATIONAL_MEDIAN.toLocaleString("en-US")}`;
  const nationalTip = t.nationalMedianTip.replace("${value}", NATIONAL_MEDIAN.toLocaleString("en-US"));

  return (
    <div className="bg-card border border-border rounded-xl shadow-premium p-4 sm:p-6 space-y-4 sm:space-y-5 animate-fade-in hover:-translate-y-0.5 hover:shadow-lg active:translate-y-px transition-all duration-200">
      <div className="flex items-start justify-between flex-wrap gap-2">
        <div>
          <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground">{entry.role}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">{entry.sector} · {entry.exp}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <FreshnessBadge year={entry.year} lang={lang} />
          <TierBadge tier={entry.tier} lang={lang} />
        </div>
      </div>

      <SalaryRangeBar min={entry.min} max={entry.max} med={entry.med} showLegend={showRangeLegend} lang={lang} />

      {/* Desktop: 3-col grid */}
      <div className="hidden sm:grid grid-cols-3 text-center">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{t.min}</p>
          <p className="text-lg font-semibold tabular-nums">{formatSalary(entry.min)}</p>
        </div>
        <div className="border-x border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{t.median}</p>
          <p className="text-xl font-bold tabular-nums text-executive">{formatSalary(entry.med)}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{t.max}</p>
          <p className="text-lg font-semibold tabular-nums">{formatSalary(entry.max)}</p>
        </div>
      </div>

      {/* Mobile stacked layout */}
      <div className="sm:hidden space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{t.median}</span>
          <span className="text-base font-bold tabular-nums text-executive">{formatSalary(entry.med)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{t.min}</span>
          <span className="text-sm font-semibold tabular-nums">{formatSalary(entry.min)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{t.max}</span>
          <span className="text-sm font-semibold tabular-nums">{formatSalary(entry.max)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-sm">
        <div className={`flex items-center gap-1 font-medium ${isAbove ? "text-emerald-600" : "text-red-600"}`}>
          {isAbove ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span>{Math.abs(Math.round(diff))}% {isAbove ? t.above : t.below}</span>
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-muted-foreground font-normal ml-1 cursor-help border-b border-dotted border-muted-foreground/50">
                  {t.vsNational}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-[250px] text-xs">
                {nationalTip}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-muted-foreground text-xs">{t.source}: {entry.source}</p>
      </div>
    </div>
  );
}
