import { useMemo } from "react";
import { salaryData } from "@/data/salaryData";
import { useSalaryContext } from "./SalaryContext";
import { useSalaryT, type SalaryLang } from "./salaryI18n";
import SalaryRangeBar from "./SalaryRangeBar";

interface Props {
  lang: SalaryLang;
  onSelect: (role: string) => void;
}

export default function TopPayingRoles({ lang, onSelect }: Props) {
  const t = useSalaryT(lang);
  const { formatSalary } = useSalaryContext();

  const top = useMemo(() => {
    const best: Record<string, typeof salaryData[0]> = {};
    salaryData.forEach(d => {
      if (!best[d.role] || d.med > best[d.role].med) best[d.role] = d;
    });
    return Object.values(best).sort((a, b) => b.med - a.med).slice(0, 8);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h2 className="font-heading text-lg sm:text-xl font-bold mb-3 sm:mb-4">{t.topPaying}</h2>
      <div className="relative">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory">
          {top.map(entry => (
            <button
              key={entry.role + entry.sector}
              onClick={() => onSelect(entry.role)}
              className="flex-shrink-0 w-52 sm:w-64 bg-card border border-border rounded-xl p-3 sm:p-4 text-left hover:shadow-premium-hover transition-shadow snap-start"
            >
              <p className="font-medium text-xs sm:text-sm truncate">{entry.role}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-3">{entry.sector}</p>
              <SalaryRangeBar min={entry.min} max={entry.max} med={entry.med} interactive={false} />
              <p className="text-base sm:text-lg font-bold text-executive tabular-nums mt-2">{formatSalary(entry.med)}</p>
            </button>
          ))}
        </div>
        {/* Fade indicator on right */}
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none sm:hidden" />
      </div>
    </section>
  );
}
