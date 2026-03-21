import { useMemo } from "react";
import { salaryData } from "@/data/salaryData";
import { useSalaryContext } from "../SalaryContext";
import { type SalaryLang } from "../salaryI18n";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function ExperiencePremiumChart({ lang, sectorFilter }: { lang: SalaryLang; sectorFilter: string }) {
  const { formatSalary } = useSalaryContext();

  const { data, overallPremium } = useMemo(() => {
    const sectors = [...new Set(salaryData.map(d => d.sector))];
    const premiums: { sector: string; pct: number; entryAvg: number; seniorAvg: number }[] = [];

    sectors.forEach(sec => {
      if (sectorFilter && sec !== sectorFilter) return;
      const entries = salaryData.filter(d => d.sector === sec && d.exp === "Entry");
      const seniors = salaryData.filter(d => d.sector === sec && d.exp === "Senior");
      if (entries.length && seniors.length) {
        const eAvg = entries.reduce((a, b) => a + b.med, 0) / entries.length;
        const sAvg = seniors.reduce((a, b) => a + b.med, 0) / seniors.length;
        if (eAvg > 0) premiums.push({ sector: sec, pct: Math.round(((sAvg - eAvg) / eAvg) * 100), entryAvg: eAvg, seniorAvg: sAvg });
      }
    });
    premiums.sort((a, b) => b.pct - a.pct);

    // overall average
    const allEntries = salaryData.filter(d => d.exp === "Entry");
    const allSeniors = salaryData.filter(d => d.exp === "Senior");
    const eAll = allEntries.reduce((a, b) => a + b.med, 0) / (allEntries.length || 1);
    const sAll = allSeniors.reduce((a, b) => a + b.med, 0) / (allSeniors.length || 1);
    const overall = eAll > 0 ? Math.round(((sAll - eAll) / eAll) * 100) : 0;

    return { data: premiums.slice(0, 10), overallPremium: overall };
  }, [sectorFilter]);

  const maxPct = Math.max(...data.map(d => d.pct), 1);

  return (
    <div className="space-y-4">
      <div className="h-56 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="sector" tick={{ fontSize: 10 }} angle={-20} textAnchor="end" height={60} />
            <YAxis tickFormatter={v => `+${v}%`} tick={{ fontSize: 11 }} />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.[0]) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
                    <p className="font-bold">{d.sector}</p>
                    <p>Entry avg: {formatSalary(Math.round(d.entryAvg))}</p>
                    <p>Senior avg: {formatSalary(Math.round(d.seniorAvg))}</p>
                    <p className="font-bold mt-1">+{d.pct}% premium</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="pct" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={400}>
              {data.map((d, i) => {
                const t = d.pct / maxPct;
                const l = 60 - t * 35;
                return <Cell key={i} fill={`hsl(153, 38%, ${l}%)`} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-muted/50 border border-border rounded-xl p-4 text-center">
        <p className="text-sm text-foreground">
          {lang === "zh"
            ? <>平均而言，台灣資深專業人員薪資比初階高 <strong className="text-executive">{overallPremium}%</strong></>
            : <>On average, senior professionals in Taiwan earn <strong className="text-executive">{overallPremium}%</strong> more than entry-level in the same role</>
          }
        </p>
      </div>
    </div>
  );
}
