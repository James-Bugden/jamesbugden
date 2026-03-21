import { useMemo } from "react";
import { salaryData } from "@/data/salaryData";
import { useSalaryContext } from "./SalaryContext";
import { useSalaryT, type SalaryLang } from "./salaryI18n";
import SalaryRangeBar from "./SalaryRangeBar";
import { TrendingUp } from "lucide-react";

const FEATURED_ROLES = ["Software Engineer", "IC Design Engineer", "Marketing Manager"];

interface Props {
  lang: SalaryLang;
  onSelect: (role: string) => void;
}

export default function FeaturedResults({ lang, onSelect }: Props) {
  const t = useSalaryT(lang);
  const { formatSalary } = useSalaryContext();

  const featured = useMemo(() => {
    return FEATURED_ROLES.map(role => {
      const entries = salaryData.filter(d => d.role === role);
      if (entries.length === 0) return null;
      entries.sort((a, b) => a.tier - b.tier);
      return entries[0];
    }).filter(Boolean) as typeof salaryData;
  }, []);

  if (featured.length === 0) return null;

  return (
    <div className="mt-6 sm:mt-8 space-y-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <TrendingUp className="w-4 h-4" />
        <p className="text-xs font-medium uppercase tracking-wider">
          {lang === "zh" ? "熱門職位預覽" : "Popular roles at a glance"}
        </p>
      </div>
      <div className="grid gap-3">
        {featured.map(entry => (
          <button
            key={entry.role}
            onClick={() => onSelect(entry.role)}
            className="text-left bg-card border border-border rounded-xl p-4 hover:border-executive/40 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="font-heading font-bold text-foreground group-hover:text-executive transition-colors truncate">
                  {entry.role}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{entry.sector} · {entry.exp}</p>
                <div className="mt-2">
                  <SalaryRangeBar min={entry.min} max={entry.max} med={entry.med} />
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-lg font-bold tabular-nums text-executive">{formatSalary(entry.med)}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{t.median}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
