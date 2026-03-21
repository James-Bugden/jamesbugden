import { useMemo } from "react";
import { salaryData, NATIONAL_MEDIAN } from "@/data/salaryData";
import { useSalaryContext } from "../SalaryContext";
import { type SalaryLang } from "../salaryI18n";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";

const SECTOR_COLORS: Record<string, string> = {
  Technology: "hsl(153,38%,25%)", Semiconductor: "hsl(153,50%,30%)", Finance: "hsl(43,54%,50%)",
  "Financial Services": "hsl(43,54%,45%)", Healthcare: "hsl(170,40%,35%)", Legal: "hsl(153,30%,40%)",
  Manufacturing: "hsl(153,25%,50%)", Engineering: "hsl(153,35%,35%)", HR: "hsl(25,50%,47%)",
};
const DEFAULT_COLOR = "hsl(153,38%,30%)";

export default function Top20Chart({ lang, sectorFilter }: { lang: SalaryLang; sectorFilter: string }) {
  const { formatSalary } = useSalaryContext();

  const data = useMemo(() => {
    let filtered = [...salaryData];
    if (sectorFilter) filtered = filtered.filter(d => d.sector === sectorFilter);
    filtered.sort((a, b) => b.med - a.med);
    return filtered.slice(0, 20).map(d => ({
      name: d.role.length > 30 ? d.role.slice(0, 28) + "…" : d.role,
      fullName: d.role,
      med: d.med,
      min: d.min,
      max: d.max,
      sector: d.sector,
      exp: d.exp,
      source: d.source,
      fill: SECTOR_COLORS[d.sector] || DEFAULT_COLOR,
    })).reverse();
  }, [sectorFilter]);

  return (
    <div className="h-[600px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 50, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
          <XAxis type="number" tickFormatter={v => `${Math.round(v / 1_000_000)}M`} tick={{ fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="name"
            width={180}
            tick={{ fontSize: 10 }}
          />
          <ReferenceLine
            x={NATIONAL_MEDIAN}
            stroke="hsl(var(--destructive))"
            strokeDasharray="4 4"
            label={{ value: lang === "zh" ? "全國中位數" : "National Median", position: "top", fontSize: 10 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
                  <p className="font-bold">{d.fullName}</p>
                  <p className="text-muted-foreground">{d.sector} · {d.exp}</p>
                  <p className="mt-1">Min: {formatSalary(d.min)}</p>
                  <p>Median: {formatSalary(d.med)}</p>
                  <p>Max: {formatSalary(d.max)}</p>
                  <p className="text-muted-foreground mt-1">{d.source}</p>
                </div>
              );
            }}
          />
          <Bar dataKey="med" radius={[0, 4, 4, 0]} isAnimationActive animationDuration={400}>
            {data.map((d, i) => (
              <rect key={i} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
