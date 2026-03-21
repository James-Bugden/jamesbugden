import { useState, useMemo } from "react";
import { salaryData, ALL_SECTORS } from "@/data/salaryData";
import { useSalaryContext } from "../SalaryContext";
import { useSalaryT, type SalaryLang } from "../salaryI18n";
import { Checkbox } from "@/components/ui/checkbox";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { ChevronDown, ChevronUp } from "lucide-react";

const COLORS = ["hsl(153, 38%, 17%)", "hsl(43, 54%, 59%)", "hsl(153, 30%, 35%)", "hsl(25, 50%, 47%)", "hsl(270, 30%, 45%)"];

export default function CompareSectorsTab({ lang }: { lang: SalaryLang }) {
  const t = useSalaryT(lang);
  const { formatSalary } = useSalaryContext();
  const [selected, setSelected] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  const sectorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_SECTORS.forEach(s => {
      counts[s] = new Set(salaryData.filter(d => d.sector === s).map(d => d.role)).size;
    });
    return counts;
  }, []);

  const toggle = (s: string) => {
    setSelected(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : prev.length < 5 ? [...prev, s] : prev
    );
  };

  const sectorAvgs = useMemo(() => {
    return selected.map(sector => {
      const entries = salaryData.filter(d => d.sector === sector);
      // Use best-tier entry per role, then average across roles
      const bestPerRole: Record<string, number[]> = {};
      entries.forEach(d => {
        if (!bestPerRole[d.role]) bestPerRole[d.role] = [d.tier, d.med];
        else if (d.tier < bestPerRole[d.role][0]) bestPerRole[d.role] = [d.tier, d.med];
        else if (d.tier === bestPerRole[d.role][0]) {
          // average same-tier: store running sum and count
        }
      });
      // More precise: group by role, pick best tier, average same-tier
      const roleMedians: number[] = [];
      const roles = [...new Set(entries.map(e => e.role))];
      for (const role of roles) {
        const roleEntries = entries.filter(e => e.role === role);
        const bestTier = Math.min(...roleEntries.map(e => e.tier));
        const best = roleEntries.filter(e => e.tier === bestTier);
        roleMedians.push(Math.round(best.reduce((s, e) => s + e.med, 0) / best.length));
      }
      const avg = roleMedians.length > 0 ? Math.round(roleMedians.reduce((s, v) => s + v, 0) / roleMedians.length) : 0;
      return { sector, avg };
    });
  }, [selected]);

  const chartData = sectorAvgs.map(s => ({ name: s.sector.slice(0, 18), value: s.avg }));

  // DGBAS reference lines
  const dgbasAvgs = useMemo(() => {
    const refs: Record<string, number> = {};
    salaryData.filter(d => d.source.startsWith("DGBAS") && d.role.startsWith("Industry Average"))
      .forEach(d => { refs[d.sector] = d.med; });
    return refs;
  }, []);

  const topRoles = useMemo(() => {
    const result: Record<string, typeof salaryData> = {};
    selected.forEach(sector => {
      const entries = salaryData.filter(d => d.sector === sector);
      // Best-tier aggregation per role
      const bestByRole: Record<string, typeof salaryData[0]> = {};
      const roles = [...new Set(entries.map(e => e.role))];
      for (const role of roles) {
        const roleEntries = entries.filter(e => e.role === role);
        const bestTier = Math.min(...roleEntries.map(e => e.tier));
        const best = roleEntries.filter(e => e.tier === bestTier);
        if (best.length === 1) {
          bestByRole[role] = best[0];
        } else {
          const avg = (k: 'min' | 'med' | 'max') => Math.round(best.reduce((s, e) => s + e[k], 0) / best.length);
          bestByRole[role] = { ...best[0], min: avg('min'), med: avg('med'), max: avg('max') };
        }
      }
      result[sector] = Object.values(bestByRole).sort((a, b) => b.med - a.med).slice(0, 5);
    });
    return result;
  }, [selected]);

  return (
    <div className="space-y-6">
      {/* Sector checkboxes */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-heading text-lg font-bold mb-3">{lang === "zh" ? "選擇產業（最多 5 個）" : "Select sectors (up to 5)"}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {ALL_SECTORS.map(s => (
            <label key={s} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted rounded-lg px-2 py-1.5">
              <Checkbox checked={selected.includes(s)} onCheckedChange={() => toggle(s)} />
              <span className="truncate">{s}</span>
              <span className="text-xs text-muted-foreground ml-auto">({sectorCounts[s]})</span>
            </label>
          ))}
        </div>
      </div>

      {selected.length < 2 && (
        <p className="text-center py-12 text-muted-foreground text-lg">
          {lang === "zh" ? "請選擇至少 2 個產業開始比較" : "Select at least 2 sectors to compare"}
        </p>
      )}

      {selected.length >= 2 && (
        <>
          {/* Bar chart */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-heading text-lg font-bold mb-4">{lang === "zh" ? "產業平均薪資" : "Average Median by Sector"}</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tickFormatter={v => `${Math.round(v / 1000)}k`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: number) => formatSalary(value)} />
                  <Bar dataKey="value" fill="hsl(153, 38%, 17%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top roles per sector */}
          <div className="space-y-3">
            {selected.map(sector => (
              <div key={sector} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === sector ? null : sector)}
                  className="w-full flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold">{sector}</span>
                    <span className="text-xs text-muted-foreground">
                      {lang === "zh" ? "平均" : "Avg"}: {formatSalary(sectorAvgs.find(s => s.sector === sector)?.avg || 0)}
                    </span>
                    {dgbasAvgs[sector] && (
                      <span className="text-xs text-muted-foreground">DGBAS: {formatSalary(dgbasAvgs[sector])}</span>
                    )}
                  </div>
                  {expanded === sector ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expanded === sector && (
                  <div className="px-5 pb-4 space-y-1">
                    {topRoles[sector]?.map(d => (
                      <div key={d.role + d.exp} className="flex items-center justify-between py-1.5 border-t border-border/30">
                        <div>
                          <span className="text-sm font-medium">{d.role}</span>
                          <span className="text-xs text-muted-foreground ml-2">{d.exp}</span>
                        </div>
                        <span className="text-sm font-semibold tabular-nums text-executive">{formatSalary(d.med)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
