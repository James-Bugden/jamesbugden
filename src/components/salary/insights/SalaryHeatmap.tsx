import { useMemo } from "react";
import { salaryData, NATIONAL_MEDIAN } from "@/data/salaryData";
import { useSalaryContext } from "../SalaryContext";
import { type SalaryLang } from "../salaryI18n";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const EXP_COLS = ["Entry", "Mid", "Senior"] as const;

export default function SalaryHeatmap({ lang }: { lang: SalaryLang }) {
  const { formatSalary } = useSalaryContext();

  const { rows, globalMin, globalMax } = useMemo(() => {
    const sectors = [...new Set(salaryData.map(d => d.sector))];
    const grid = sectors.map(sec => {
      const cells: Record<string, { avg: number; count: number } | null> = {};
      let totalMed = 0;
      let totalCount = 0;
      EXP_COLS.forEach(exp => {
        const matches = salaryData.filter(d => d.sector === sec && d.exp === exp);
        if (matches.length) {
          const avg = matches.reduce((a, b) => a + b.med, 0) / matches.length;
          cells[exp] = { avg, count: matches.length };
          totalMed += avg;
          totalCount++;
        } else {
          cells[exp] = null;
        }
      });
      return { sector: sec, cells, sectorAvg: totalCount ? totalMed / totalCount : 0 };
    });
    grid.sort((a, b) => b.sectorAvg - a.sectorAvg);

    let gMin = Infinity, gMax = 0;
    grid.forEach(r => EXP_COLS.forEach(e => {
      const c = r.cells[e];
      if (c) { gMin = Math.min(gMin, c.avg); gMax = Math.max(gMax, c.avg); }
    }));
    return { rows: grid, globalMin: gMin, globalMax: gMax };
  }, []);

  const getCellStyle = (val: number) => {
    if (val < NATIONAL_MEDIAN) {
      const t = Math.max(0, Math.min(1, (NATIONAL_MEDIAN - val) / (NATIONAL_MEDIAN - globalMin)));
      return { backgroundColor: `hsl(0, ${20 + t * 30}%, ${95 - t * 15}%)`, color: "hsl(0, 40%, 30%)" };
    }
    const t = Math.max(0, Math.min(1, (val - NATIONAL_MEDIAN) / (globalMax - NATIONAL_MEDIAN)));
    const l = 90 - t * 60;
    return { backgroundColor: `hsl(153, 38%, ${l}%)`, color: l < 45 ? "white" : "hsl(153, 38%, 17%)" };
  };

  const fmtShort = (v: number) => {
    if (v >= 1_000_000) return `NT$${(v / 1_000_000).toFixed(1)}M`;
    return `NT$${Math.round(v / 1000)}K`;
  };

  const expLabel = (e: string) => {
    if (lang !== "zh") return e;
    return e === "Entry" ? "初階" : e === "Mid" ? "中階" : "資深";
  };

  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <table className="w-full text-sm border-collapse min-w-[500px]">
        <thead>
          <tr>
            <th className="text-left py-2 px-3 font-heading font-bold text-foreground sticky left-0 bg-card z-10">
              {lang === "zh" ? "產業" : "Sector"}
            </th>
            {EXP_COLS.map(e => (
              <th key={e} className="py-2 px-3 text-center font-medium text-muted-foreground text-xs uppercase tracking-wider">
                {expLabel(e)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.sector} className="border-t border-border/50">
              <td className="py-2.5 px-3 font-medium text-foreground sticky left-0 bg-card z-10 whitespace-nowrap text-xs">
                {r.sector}
              </td>
              {EXP_COLS.map(e => {
                const c = r.cells[e];
                if (!c) return <td key={e} className="py-2.5 px-3 text-center text-muted-foreground/50">—</td>;
                return (
                  <td key={e} className="py-2.5 px-3 text-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span
                          className="inline-block px-3 py-1.5 rounded-md text-xs font-bold tabular-nums cursor-default transition-transform hover:scale-105"
                          style={getCellStyle(c.avg)}
                        >
                          {fmtShort(c.avg)}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p className="font-bold">{r.sector} · {expLabel(e)}</p>
                        <p>{lang === "zh" ? "平均中位數" : "Avg Median"}: {formatSalary(Math.round(c.avg))}</p>
                        <p>{lang === "zh" ? "基於" : "Based on"} {c.count} {lang === "zh" ? "筆" : "roles"}</p>
                      </TooltipContent>
                    </Tooltip>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
