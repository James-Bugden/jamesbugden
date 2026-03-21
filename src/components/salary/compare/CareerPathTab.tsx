import { useState, useMemo } from "react";
import { salaryData, ALL_SECTORS } from "@/data/salaryData";
import { useSalaryContext } from "../SalaryContext";
import { useSalaryT, type SalaryLang } from "../salaryI18n";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from "recharts";
import { formatAxisValue } from "../formatAxis";

const COLORS = ["hsl(153, 38%, 17%)", "hsl(43, 54%, 59%)", "hsl(153, 30%, 35%)", "hsl(25, 50%, 47%)"];
const EXP_ORDER = ["Entry", "Mid", "Senior"];

/** Pick the best-tier source(s) and average their medians */
function bestMedian(role: string, sector: string, exp: string): number | null {
  const matches = salaryData.filter(d => d.role === role && d.sector === sector && d.exp === exp);
  if (matches.length === 0) return null;
  const bestTier = Math.min(...matches.map(m => m.tier));
  const best = matches.filter(m => m.tier === bestTier);
  return Math.round(best.reduce((s, m) => s + m.med, 0) / best.length);
}

export default function CareerPathTab({ lang }: { lang: SalaryLang }) {
  const t = useSalaryT(lang);
  const { formatSalary } = useSalaryContext();
  const [role, setRole] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);
  const [roleOpen, setRoleOpen] = useState(false);

  // Roles that have at least 2 experience levels in some sector
  const eligibleRoles = useMemo(() => {
    const roleMap: Record<string, Set<string>> = {};
    salaryData.forEach(d => {
      if (d.exp === "All") return;
      if (!roleMap[d.role]) roleMap[d.role] = new Set();
      roleMap[d.role].add(d.exp);
    });
    return Object.keys(roleMap).filter(r => roleMap[r].size >= 2).sort();
  }, []);

  const availableSectors = useMemo(() => {
    if (!role) return [];
    const sectorExpMap: Record<string, Set<string>> = {};
    salaryData.filter(d => d.role === role && d.exp !== "All").forEach(d => {
      if (!sectorExpMap[d.sector]) sectorExpMap[d.sector] = new Set();
      sectorExpMap[d.sector].add(d.exp);
    });
    return Object.keys(sectorExpMap).filter(s => sectorExpMap[s].size >= 2).sort();
  }, [role]);

  const toggleSector = (s: string) => {
    setSectors(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  // Build chart data
  const pathData = useMemo(() => {
    if (!role || sectors.length === 0) return [];
    return EXP_ORDER.map(exp => {
      const point: Record<string, string | number> = { exp: t[exp.toLowerCase() as "entry" | "mid" | "senior"] };
      sectors.forEach(sector => {
        const med = bestMedian(role, sector, exp);
        if (med !== null) point[sector] = med;
      });
      return point;
    }).filter(p => Object.keys(p).length > 1); // at least one sector value
  }, [role, sectors, t]);

  // Progression stats
  const stats = useMemo(() => {
    return sectors.map(sector => {
      const getMedian = (exp: string) => bestMedian(role, sector, exp);
      const entry = getMedian("Entry");
      const mid = getMedian("Mid");
      const senior = getMedian("Senior");

      const entryToMid = entry && mid ? { pct: ((mid - entry) / entry) * 100, abs: mid - entry } : null;
      const midToSenior = mid && senior ? { pct: ((senior - mid) / mid) * 100, abs: senior - mid } : null;
      const entryToSenior = entry && senior ? { pct: ((senior - entry) / entry) * 100, abs: senior - entry } : null;

      return { sector, entryToMid, midToSenior, entryToSenior };
    });
  }, [role, sectors]);

  return (
    <div className="space-y-6">
      {/* Selectors */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <Popover open={roleOpen} onOpenChange={setRoleOpen}>
          <PopoverTrigger asChild>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background text-left text-sm">
              <span className={role ? "text-foreground" : "text-muted-foreground"}>
                {role || (lang === "zh" ? "選擇職位查看薪資成長" : "Choose a role to see salary progression")}
              </span>
              <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
            <Command className="bg-popover">
              <div className="flex items-center border-b px-3">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <CommandInput placeholder={t.selectRole} className="h-10 border-0 focus:ring-0 text-sm" />
              </div>
              <CommandList className="max-h-48 overflow-y-auto">
                <CommandEmpty className="py-3 text-center text-sm text-muted-foreground">{t.noResults}</CommandEmpty>
                <CommandGroup>
                  {eligibleRoles.map(r => (
                    <CommandItem
                      key={r} value={r}
                      onSelect={() => { setRole(r); setSectors([]); setRoleOpen(false); }}
                      className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                    >
                      <Check className={cn("w-3 h-3", role === r ? "opacity-100" : "opacity-0")} />
                      {r}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {role && availableSectors.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">{lang === "zh" ? "選擇產業" : "Select sectors"}</p>
            <div className="flex flex-wrap gap-2">
              {availableSectors.map(s => (
                <label key={s} className="flex items-center gap-1.5 text-sm cursor-pointer px-2 py-1 rounded-lg hover:bg-muted">
                  <Checkbox checked={sectors.includes(s)} onCheckedChange={() => toggleSector(s)} />
                  {s}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {!role && (
        <p className="text-center py-12 text-muted-foreground text-lg">
          {lang === "zh" ? "選擇一個職位來查看薪資隨經驗成長的趨勢" : "Choose a role to see how salary grows with experience"}
        </p>
      )}

      {role && sectors.length > 0 && pathData.length >= 2 && (
        <>
          {/* Line chart */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-heading text-lg font-bold mb-4">
              {role} — {lang === "zh" ? "薪資成長路徑" : "Career Progression"}
            </h3>
            <div className="h-48 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pathData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="exp" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={formatAxisValue} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: number) => formatSalary(value)} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  {sectors.map((s, i) => (
                    <Line
                      key={s}
                      type="monotone"
                      dataKey={s}
                      stroke={COLORS[i % COLORS.length]}
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: COLORS[i % COLORS.length] }}
                      activeDot={{ r: 7 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Progression stats */}
          <div className="space-y-3">
            {stats.map(({ sector, entryToMid, midToSenior, entryToSenior }) => (
              <div key={sector} className="bg-card border border-border rounded-xl p-4">
                <p className="font-heading font-bold text-sm mb-2">{sector}</p>
                <div className="grid grid-cols-3 gap-3">
                  {entryToMid && (
                    <StatCard
                      label={`${t.entry} → ${t.mid}`}
                      pct={entryToMid.pct}
                      abs={entryToMid.abs}
                      formatSalary={formatSalary}
                    />
                  )}
                  {midToSenior && (
                    <StatCard
                      label={`${t.mid} → ${t.senior}`}
                      pct={midToSenior.pct}
                      abs={midToSenior.abs}
                      formatSalary={formatSalary}
                    />
                  )}
                  {entryToSenior && (
                    <StatCard
                      label={`${t.entry} → ${t.senior}`}
                      pct={entryToSenior.pct}
                      abs={entryToSenior.abs}
                      formatSalary={formatSalary}
                      highlight
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {role && sectors.length > 0 && pathData.length < 2 && (
        <p className="text-center py-8 text-muted-foreground">
          {lang === "zh" ? "此職位只有單一經驗等級的數據。請嘗試其他產業。" : "Only one experience level available. Try a different sector."}
        </p>
      )}
    </div>
  );
}

function StatCard({ label, pct, abs, formatSalary, highlight }: {
  label: string; pct: number; abs: number; formatSalary: (v: number) => string; highlight?: boolean;
}) {
  return (
    <div className={cn("rounded-lg p-3 text-center", highlight && pct > 100 ? "bg-emerald-50 border border-emerald-200" : "bg-muted/50")}>
      <p className="text-xs text-muted-foreground font-medium">{label}</p>
      <p className={cn("text-lg font-bold tabular-nums", highlight && pct > 100 ? "text-emerald-700" : "text-foreground")}>
        +{Math.round(pct)}%
      </p>
      <p className="text-xs text-muted-foreground">+{formatSalary(abs)}</p>
    </div>
  );
}
