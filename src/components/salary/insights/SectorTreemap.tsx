import { useMemo } from "react";
import { salaryData } from "@/data/salaryData";
import { useSalaryContext } from "../SalaryContext";
import { type SalaryLang } from "../salaryI18n";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

export default function SectorTreemap({ lang, sectorFilter }: { lang: SalaryLang; sectorFilter: string }) {
  const { formatSalary } = useSalaryContext();

  const data = useMemo(() => {
    let filtered = salaryData;
    if (sectorFilter) filtered = filtered.filter(d => d.sector === sectorFilter);
    const sectors = [...new Set(filtered.map(d => d.sector))];
    const items = sectors.map(sec => {
      const roles = filtered.filter(d => d.sector === sec);
      const avgMed = roles.reduce((a, b) => a + b.med, 0) / roles.length;
      const topRole = [...roles].sort((a, b) => b.med - a.med)[0];
      return { name: sec, size: roles.length, avgMed, topRole: topRole?.role || "" };
    });
    items.sort((a, b) => b.size - a.size);
    return items;
  }, [sectorFilter]);

  const maxAvg = Math.max(...data.map(d => d.avgMed), 1);
  const minAvg = Math.min(...data.map(d => d.avgMed));

  const getColor = (avgMed: number) => {
    const t = (avgMed - minAvg) / (maxAvg - minAvg || 1);
    const l = 75 - t * 45;
    return `hsl(153, 38%, ${l}%)`;
  };

  const CustomContent = (props: any) => {
    const { x, y, width, height, name, avgMed, size } = props;
    if (width < 40 || height < 30) return null;
    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={getColor(avgMed)} rx={4} stroke="hsl(var(--background))" strokeWidth={2} />
        {width > 60 && height > 40 && (
          <>
            <text x={x + 8} y={y + 18} fill="white" fontSize={11} fontWeight="bold">{name}</text>
            <text x={x + 8} y={y + 32} fill="rgba(255,255,255,0.8)" fontSize={10}>{size} roles</text>
          </>
        )}
      </g>
    );
  };

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          content={<CustomContent />}
          isAnimationActive
          animationDuration={400}
        >
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
                  <p className="font-bold">{d.name}</p>
                  <p>{d.size} {lang === "zh" ? "個職位" : "roles"}</p>
                  <p>{lang === "zh" ? "平均中位數" : "Avg median"}: {formatSalary(Math.round(d.avgMed))}</p>
                  <p className="text-muted-foreground mt-1">{lang === "zh" ? "最高薪" : "Top"}: {d.topRole}</p>
                </div>
              );
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
