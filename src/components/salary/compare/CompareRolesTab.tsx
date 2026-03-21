import { useState, useMemo, useEffect } from "react";
import { salaryData, ALL_SECTORS, type SalaryEntry } from "@/data/salaryData";
import { useSalaryContext } from "../SalaryContext";
import { useSalaryT, type SalaryLang } from "../salaryI18n";
import SalaryResultCard from "../SalaryResultCard";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronsUpDown, Search, X, Plus, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { formatAxisValue } from "../formatAxis";
import { useIsMobile } from "@/hooks/use-mobile";

interface Slot {
  role: string;
  sector: string;
  exp: string;
}

const EMPTY: Slot = { role: "", sector: "", exp: "" };

export default function CompareRolesTab({ lang }: { lang: SalaryLang }) {
  const t = useSalaryT(lang);
  const { formatSalary } = useSalaryContext();
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();
  const [slots, setSlots] = useState<Slot[]>([{ ...EMPTY }, { ...EMPTY }]);

  // Parse URL params on mount
  useEffect(() => {
    const roles = searchParams.get("roles")?.split(",") || [];
    const sectors = searchParams.get("sectors")?.split(",") || [];
    const exps = searchParams.get("exp")?.split(",") || [];
    if (roles.length >= 2) {
      setSlots(roles.map((r, i) => ({
        role: decodeURIComponent(r),
        sector: sectors[i] ? decodeURIComponent(sectors[i]) : "",
        exp: exps[i] ? decodeURIComponent(exps[i]) : "",
      })));
    }
  }, []);

  const uniqueRoles = useMemo(() => [...new Set(salaryData.map(d => d.role))].sort(), []);

  const updateSlot = (i: number, patch: Partial<Slot>) => {
    setSlots(prev => prev.map((s, j) => j === i ? { ...s, ...patch } : s));
  };

  const addSlot = () => {
    if (slots.length < 4) setSlots([...slots, { ...EMPTY }]);
  };

  const removeSlot = (i: number) => {
    if (slots.length > 2) setSlots(slots.filter((_, j) => j !== i));
  };

  const results = useMemo(() => {
    return slots.map(s => {
      if (!s.role) return null;
      let filtered = salaryData.filter(d => d.role === s.role);
      if (s.sector) filtered = filtered.filter(d => d.sector === s.sector);
      if (s.exp) filtered = filtered.filter(d => d.exp === s.exp);
      if (filtered.length === 0) return null;
      const bestTier = Math.min(...filtered.map(d => d.tier));
      const best = filtered.filter(d => d.tier === bestTier);
      if (best.length === 1) return best[0];
      // Aggregate multiple same-tier entries
      const avg = (key: 'min' | 'med' | 'max') => Math.round(best.reduce((s, d) => s + d[key], 0) / best.length);
      return { ...best[0], min: avg('min'), med: avg('med'), max: avg('max') };
    });
  }, [slots]);

  const filledResults = results.filter(Boolean) as SalaryEntry[];

  const chartData = filledResults.length >= 2
    ? [
      { metric: t.min, ...Object.fromEntries(filledResults.map(r => [r.role.slice(0, 20), r.min])) },
      { metric: t.median, ...Object.fromEntries(filledResults.map(r => [r.role.slice(0, 20), r.med])) },
      { metric: t.max, ...Object.fromEntries(filledResults.map(r => [r.role.slice(0, 20), r.max])) },
    ]
    : [];

  const COLORS = ["hsl(153, 38%, 17%)", "hsl(43, 54%, 59%)", "hsl(153, 30%, 35%)", "hsl(25, 50%, 47%)"];

  const handleShare = () => {
    const filled = slots.filter(s => s.role);
    if (filled.length < 2) return;
    const params = new URLSearchParams();
    params.set("roles", filled.map(s => s.role).join(","));
    params.set("sectors", filled.map(s => s.sector).join(","));
    params.set("exp", filled.map(s => s.exp).join(","));
    params.set("tab", "roles");
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard.writeText(url);
    toast.success(lang === "zh" ? "已複製比較連結" : "Comparison link copied!");
  };

  return (
    <div className="space-y-6">
      {/* Role slots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {slots.map((slot, i) => (
          <RoleSlot
            key={i}
            slot={slot}
            index={i}
            lang={lang}
            roles={uniqueRoles}
            canRemove={slots.length > 2}
            onUpdate={(patch) => updateSlot(i, patch)}
            onRemove={() => removeSlot(i)}
            result={results[i]}
          />
        ))}
        {slots.length < 4 && (
          <button
            onClick={addSlot}
            className="border-2 border-dashed border-border rounded-xl p-6 flex items-center justify-center gap-2 text-muted-foreground hover:border-executive/40 hover:text-foreground transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">{lang === "zh" ? "新增職位" : "Add another"}</span>
          </button>
        )}
      </div>

      {filledResults.length < 2 && (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">{lang === "zh" ? "請選擇至少 2 個職位開始比較" : "Select at least 2 roles above to start comparing"}</p>
        </div>
      )}

      {filledResults.length >= 2 && (
        <>
          {/* Comparison cards with winner badge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filledResults.map((entry, idx) => {
              const isWinner = entry.med === Math.max(...filledResults.map(r => r.med));
              return (
                <div key={entry.role + entry.sector + entry.exp} className="relative">
                  {isWinner && (
                    <span className="absolute -top-2 right-3 z-10 px-2 py-0.5 bg-gold text-executive text-[10px] font-bold rounded-full uppercase tracking-wide shadow-sm">
                      {lang === "zh" ? "最高" : "Highest"}
                    </span>
                  )}
                  <SalaryResultCard entry={entry} lang={lang} />
                </div>
              );
            })}
          </div>

          {/* Pay gap summary */}
          {filledResults.length === 2 && (() => {
            const [a, b] = filledResults.sort((x, y) => y.med - x.med);
            const diff = a.med - b.med;
            const pct = Math.round((diff / b.med) * 100);
            return (
              <div className="bg-muted/50 border border-border rounded-xl p-4 text-center text-sm">
                <span className="font-bold text-foreground">{a.role}</span>
                <span className="text-muted-foreground">
                  {lang === "zh" ? ` 比 ` : ` pays `}
                </span>
                <span className="font-bold text-executive">{formatSalary(diff)}</span>
                <span className="text-muted-foreground">
                  {lang === "zh" ? ` 多於 ` : ` more than `}
                </span>
                <span className="font-bold text-foreground">{b.role}</span>
                <span className="text-emerald-600 font-semibold ml-1">(+{pct}%)</span>
              </div>
            );
          })()}

          {/* Grouped bar chart */}
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-bold">{lang === "zh" ? "薪資比較圖表" : "Salary Comparison"}</h3>
              <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
                <Share2 className="w-3.5 h-3.5" /> {lang === "zh" ? "分享" : "Share"}
              </button>
            </div>
            <div className="h-48 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="metric" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis tickFormatter={formatAxisValue} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: number) => formatSalary(value)} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  {filledResults.map((r, i) => (
                    <Bar key={r.role} dataKey={r.role.slice(0, 20)} fill={COLORS[i % COLORS.length]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function RoleSlot({
  slot, index, lang, roles, canRemove, onUpdate, onRemove, result,
}: {
  slot: Slot; index: number; lang: SalaryLang; roles: string[]; canRemove: boolean;
  onUpdate: (patch: Partial<Slot>) => void; onRemove: () => void; result: SalaryEntry | null;
}) {
  const t = useSalaryT(lang);
  const { formatSalary } = useSalaryContext();
  const [open, setOpen] = useState(false);

  const availableSectors = useMemo(() => {
    if (!slot.role) return ALL_SECTORS;
    return [...new Set(salaryData.filter(d => d.role === slot.role).map(d => d.sector))].sort();
  }, [slot.role]);

  const availableExp = useMemo(() => {
    if (!slot.role) return ["Entry", "Mid", "Senior", "All"];
    let f = salaryData.filter(d => d.role === slot.role);
    if (slot.sector) f = f.filter(d => d.sector === slot.sector);
    return [...new Set(f.map(d => d.exp))];
  }, [slot.role, slot.sector]);

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3 relative">
      {canRemove && (
        <button onClick={onRemove} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg border border-border bg-background text-left text-sm hover:border-executive/40 transition-colors">
            <span className={slot.role ? "text-foreground" : "text-muted-foreground"}>
              {slot.role || t.selectRole}
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
                {roles.map(r => (
                  <CommandItem
                    key={r}
                    value={r}
                    onSelect={() => { onUpdate({ role: r, sector: "", exp: "" }); setOpen(false); }}
                    className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                  >
                    <Check className={cn("w-3 h-3", slot.role === r ? "opacity-100" : "opacity-0")} />
                    {r}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="grid grid-cols-2 gap-2">
        <Select value={slot.sector} onValueChange={v => onUpdate({ sector: v, exp: "" })}>
          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder={t.selectSector} /></SelectTrigger>
          <SelectContent>
            {availableSectors.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={slot.exp} onValueChange={v => onUpdate({ exp: v })}>
          <SelectTrigger className="h-9 text-xs"><SelectValue placeholder={t.selectExp} /></SelectTrigger>
          <SelectContent>
            {availableExp.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {result && (
        <div className="pt-2 border-t border-border/50">
          <p className="text-sm font-medium truncate">{result.role}</p>
          <p className="text-xs text-muted-foreground">{result.sector} · {result.exp}</p>
          <p className="text-lg font-bold text-executive tabular-nums mt-1">{formatSalary(result.med)}</p>
        </div>
      )}
    </div>
  );
}
