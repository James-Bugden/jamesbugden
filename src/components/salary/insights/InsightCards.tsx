import { useMemo } from "react";
import { salaryData, NATIONAL_MEDIAN } from "@/data/salaryData";
import { useSalaryContext } from "../SalaryContext";
import { type SalaryLang } from "../salaryI18n";

interface CardData {
  title: string;
  value: string;
  sub: string;
  accent: string;
}

export default function InsightCards({ lang }: { lang: SalaryLang }) {
  const { formatSalary } = useSalaryContext();

  const cards = useMemo<CardData[]>(() => {
    // 1. Highest paying sector
    const sectorMeds: Record<string, number[]> = {};
    salaryData.forEach(d => {
      (sectorMeds[d.sector] ??= []).push(d.med);
    });
    const sectorAvgs = Object.entries(sectorMeds).map(([s, meds]) => ({
      sector: s,
      avg: meds.reduce((a, b) => a + b, 0) / meds.length,
    }));
    sectorAvgs.sort((a, b) => b.avg - a.avg);
    const topSector = sectorAvgs[0];

    // 2. Biggest senior premium
    const sectorPremiums: { sector: string; pct: number }[] = [];
    const sectors = [...new Set(salaryData.map(d => d.sector))];
    sectors.forEach(sec => {
      const entries = salaryData.filter(d => d.sector === sec && d.exp === "Entry");
      const seniors = salaryData.filter(d => d.sector === sec && d.exp === "Senior");
      if (entries.length && seniors.length) {
        const eAvg = entries.reduce((a, b) => a + b.med, 0) / entries.length;
        const sAvg = seniors.reduce((a, b) => a + b.med, 0) / seniors.length;
        if (eAvg > 0) sectorPremiums.push({ sector: sec, pct: ((sAvg - eAvg) / eAvg) * 100 });
      }
    });
    sectorPremiums.sort((a, b) => b.pct - a.pct);
    const topPremium = sectorPremiums[0];

    // 3. Most data-rich sector
    const sectorCounts = Object.entries(sectorMeds).map(([s, m]) => ({ sector: s, count: m.length }));
    sectorCounts.sort((a, b) => b.count - a.count);
    const richestSector = sectorCounts[0];

    return [
      {
        title: lang === "zh" ? "最高薪產業" : "Highest Paying Sector",
        value: topSector.sector,
        sub: `${lang === "zh" ? "平均中位數 " : "Avg median "}${formatSalary(Math.round(topSector.avg))}`,
        accent: "bg-emerald-500",
      },
      {
        title: lang === "zh" ? "最大資深加薪" : "Biggest Senior Premium",
        value: topPremium?.sector || ", ",
        sub: `${lang === "zh" ? "資深比初階多 " : "Seniors earn "}${Math.round(topPremium?.pct || 0)}%${lang === "zh" ? "" : " more"}`,
        accent: "bg-gold",
      },
      {
        title: lang === "zh" ? "最多資料產業" : "Most Data-Rich Sector",
        value: richestSector.sector,
        sub: `${richestSector.count} ${lang === "zh" ? "筆薪資資料" : "roles tracked"}`,
        accent: "bg-executive",
      },
      {
        title: lang === "zh" ? "全國中位數" : "National Median",
        value: formatSalary(NATIONAL_MEDIAN),
        sub: lang === "zh" ? "DGBAS 2024 基準" : "DGBAS 2024 benchmark",
        accent: "bg-executive-light",
      },
    ];
  }, [lang, formatSalary]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div
          key={c.title}
          className="relative bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow overflow-hidden group"
        >
          <div className={`absolute left-0 top-0 bottom-0 w-1 ${c.accent}`} />
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">
            {c.title}
          </p>
          <p className="font-heading text-lg font-bold text-foreground truncate">{c.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
