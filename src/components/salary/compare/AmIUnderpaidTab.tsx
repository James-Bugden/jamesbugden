import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { salaryData, NATIONAL_MEDIAN, ALL_SECTORS } from "@/data/salaryData";
import { useSalaryContext } from "../SalaryContext";
import { useSalaryT, type SalaryLang } from "../salaryI18n";
import type { SalaryLang as SalaryLangType } from "../salaryI18n";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, ChevronsUpDown, Search, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function AmIUnderpaidTab({ lang }: { lang: SalaryLang }) {
  const t = useSalaryT(lang);
  const { formatSalary } = useSalaryContext();
  const [jobTitle, setJobTitle] = useState("");
  const [role, setRole] = useState("");
  const [sector, setSector] = useState("");
  const [exp, setExp] = useState("");
  const [salary, setSalary] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const savedRef = useRef<string | null>(null);

  const uniqueRoles = useMemo(() => [...new Set(salaryData.map(d => d.role))].sort(), []);
  const availableSectors = useMemo(() => {
    if (!role) return ALL_SECTORS;
    return [...new Set(salaryData.filter(d => d.role === role).map(d => d.sector))].sort();
  }, [role]);
  const availableExp = useMemo(() => {
    if (!role) return ["Entry", "Mid", "Senior", "All"];
    let f = salaryData.filter(d => d.role === role);
    if (sector) f = f.filter(d => d.sector === sector);
    return [...new Set(f.map(d => d.exp))];
  }, [role, sector]);

  const result = useMemo(() => {
    if (!role) return null;
    let f = salaryData.filter(d => d.role === role);
    if (sector) f = f.filter(d => d.sector === sector);
    if (exp) f = f.filter(d => d.exp === exp);
    if (f.length === 0) return null;
    f.sort((a, b) => a.tier - b.tier);
    return f[0];
  }, [role, sector, exp]);

  const salaryNum = parseInt(salary.replace(/,/g, "")) || 0;
  const showResult = result && salaryNum > 0;

  // Percentile position
  const getZone = () => {
    if (!result) return null;
    const { min, max, med } = result;
    const p25 = min + (med - min) * 0.5;
    const p75 = med + (max - med) * 0.5;
    if (salaryNum < min) return { zone: "below", color: "text-red-600", bg: "bg-red-50", label: lang === "zh" ? "低於市場範圍" : "Below market range" };
    if (salaryNum < p25) return { zone: "lower", color: "text-amber-600", bg: "bg-amber-50", label: lang === "zh" ? "低於中位數" : "Lower quartile" };
    if (salaryNum <= p75) return { zone: "market", color: "text-emerald-700", bg: "bg-emerald-50", label: lang === "zh" ? "市場行情" : "Market rate" };
    if (salaryNum <= max) return { zone: "above", color: "text-emerald-800", bg: "bg-emerald-50", label: lang === "zh" ? "高於平均" : "Above average" };
    return { zone: "premium", color: "text-gold", bg: "bg-amber-50", label: lang === "zh" ? "頂級水準" : "Premium" };
  };

  const zone = showResult ? getZone() : null;

  // Save to database once per unique check
  useEffect(() => {
    if (!showResult || !zone || !result || !jobTitle.trim()) return;
    const key = `${jobTitle}|${role}|${sector}|${exp}|${salaryNum}`;
    if (savedRef.current === key) return;
    savedRef.current = key;
    supabase.from("salary_checks").insert({
      job_title: jobTitle.trim(),
      role,
      sector: sector || null,
      experience: exp || null,
      salary: salaryNum,
      verdict: zone.zone,
      median: result.med,
      lang: lang === "zh" ? "zh" : "en",
    }).then(({ error }) => {
      if (error && import.meta.env.DEV) {
        console.warn("[salary_checks] insert failed:", error.message);
      }
    });
    // Tool completion event
    import("@/lib/analytics").then(({ trackTool }) => {
      trackTool(
        "salary_check",
        "salary_calculated",
        {
          job_title: jobTitle.trim(),
          role,
          sector: sector || null,
          verdict: zone.zone,
          salary: salaryNum,
          median: result.med,
          delta_pct: result.med > 0 ? Math.round(((salaryNum - result.med) / result.med) * 100) : null,
        },
        { lang: lang === "zh" ? "zh" : "en" },
      );
    });
  }, [showResult, zone, result, jobTitle, role, sector, exp, salaryNum, lang]);

  const verdictText = () => {
    if (!result || !zone || result.med <= 0) return "";
    const diff = ((salaryNum - result.med) / result.med) * 100;
    if (zone.zone === "below") return lang === "zh" ? `你的薪資**低於市場範圍**。` : `Your salary is **below the market range** for this role.`;
    if (zone.zone === "lower") return lang === "zh" ? `你的薪資**低於中位數 ${Math.abs(Math.round(diff))}%**。` : `Your salary is **${Math.abs(Math.round(diff))}% below the median** for this role.`;
    if (zone.zone === "market") return lang === "zh" ? `你的薪資**正好在市場行情**。` : `Your salary is **right at market rate.**`;
    if (zone.zone === "above") return lang === "zh" ? `你的薪資**高於中位數 ${Math.round(diff)}%**。` : `Your salary is **${Math.round(diff)}% above the median** for this role.`;
    return lang === "zh" ? `你的薪資**超出一般範圍**, 你處於頂級水準。` : `Your salary is **above the typical range**, you're in premium territory.`;
  };

  const formatInput = (val: string) => {
    const num = val.replace(/[^0-9]/g, "");
    if (!num) { setSalary(""); return; }
    setSalary(parseInt(num).toLocaleString("en-US"));
  };

  const handleShare = () => {
    if (!result || !zone) return;
    const params = new URLSearchParams({ tab: "underpaid", role, sector, exp, verdict: zone.zone });
    const url = `${window.location.origin}${window.location.pathname}?${params}`;
    navigator.clipboard.writeText(url);
    toast.success(lang === "zh" ? "已複製連結（不含薪資資訊）" : "Link copied (salary excluded for privacy)");
  };

  // Entry level salary for comparison
  const entryMedian = useMemo(() => {
    if (!result || !["Mid", "Senior"].includes(result.exp)) return null;
    const e = salaryData.find(d => d.role === result.role && d.sector === result.sector && d.exp === "Entry");
    return e?.med || null;
  }, [result]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Input form */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-heading text-2xl font-bold">{lang === "zh" ? "來看看吧。" : "Let's find out."}</h3>

        <input
          type="text"
          value={jobTitle}
          onChange={e => setJobTitle(e.target.value)}
          placeholder={lang === "zh" ? "你的職稱（例：資深產品經理）" : "Your job title (e.g. Senior Product Manager)"}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-executive/30"
        />
        <Popover open={roleOpen} onOpenChange={setRoleOpen}>
          <PopoverTrigger asChild>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-border bg-background text-left text-sm">
              <span className={role ? "text-foreground" : "text-muted-foreground"}>{role || t.selectRole}</span>
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
                  {uniqueRoles.map(r => (
                    <CommandItem key={r} value={r}
                      onSelect={() => { setRole(r); setSector(""); setExp(""); setRoleOpen(false); }}
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

        <div className="grid grid-cols-2 gap-3">
          <Select value={sector} onValueChange={v => { setSector(v); setExp(""); }}>
            <SelectTrigger className="h-11"><SelectValue placeholder={t.selectSector} /></SelectTrigger>
            <SelectContent>
              {availableSectors.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={exp} onValueChange={setExp}>
            <SelectTrigger className="h-11"><SelectValue placeholder={t.selectExp} /></SelectTrigger>
            <SelectContent>
              {availableExp.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">NT$</span>
          <input
            type="text"
            value={salary}
            onChange={e => formatInput(e.target.value)}
            placeholder={lang === "zh" ? "你的年薪" : "Your annual salary"}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-sm tabular-nums focus:outline-none focus:ring-2 focus:ring-executive/30"
          />
        </div>
      </div>

      {/* Result */}
      {showResult && zone && result && (
        <div className={cn("border border-border rounded-xl p-6 space-y-5", zone.bg)}>
          {/* Percentile gauge */}
          <PercentileGauge min={result.min} max={result.max} med={result.med} salary={salaryNum} onSalaryChange={(v) => setSalary(v.toLocaleString("en-US"))} lang={lang} />

          {/* Verdict */}
          <p className={cn("text-xl font-bold", zone.color)}>
            {verdictText().split(/\*\*(.*?)\*\*/g).map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>

          {/* Comparison stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <MiniStat
              label={lang === "zh" ? "vs. 職位中位數" : "vs. Role Median"}
              value={`${salaryNum >= result.med ? "+" : ""}${Math.round(((salaryNum - result.med) / result.med) * 100)}%`}
              positive={salaryNum >= result.med}
            />
            <MiniStat
              label={lang === "zh" ? "vs. 全國中位數" : `vs. National (NT$${(NATIONAL_MEDIAN / 1000).toFixed(0)}K)`}
              value={`${salaryNum >= NATIONAL_MEDIAN ? "+" : ""}${Math.round(((salaryNum - NATIONAL_MEDIAN) / NATIONAL_MEDIAN) * 100)}%`}
              positive={salaryNum >= NATIONAL_MEDIAN}
            />
            {entryMedian && (
              <MiniStat
                label={lang === "zh" ? "vs. 初階薪資" : "vs. Entry Level"}
                value={`+${Math.round(((salaryNum - entryMedian) / entryMedian) * 100)}%`}
                positive
              />
            )}
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-2">
            <Link
              to={lang === "zh" ? "/zh-tw/offer-calculator" : "/offer-calculator"}
              className="block bg-executive text-white rounded-xl p-4 hover:bg-executive-light transition-colors"
            >
              <p className="font-heading font-bold">{lang === "zh" ? "想談到更好嗎？" : "Negotiate better?"}</p>
              <p className="text-sm text-white/80 mt-0.5">{t.gotOfferDesc}</p>
            </Link>

            <div className="flex items-center gap-3">
              <button onClick={handleShare} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-sm hover:bg-muted transition-colors">
                <Share2 className="w-3.5 h-3.5" /> {lang === "zh" ? "分享結果" : "Share result"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PercentileGauge({ min, max, med, salary, onSalaryChange, lang }: { min: number; max: number; med: number; salary: number; onSalaryChange: (v: number) => void; lang: SalaryLang }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  // Extend range by 10% on each side for below/above visualization
  const padding = (max - min) * 0.1 || 50000;
  const extMin = min - padding;
  const extMax = max + padding;
  const extRange = extMax - extMin || 1;

  const salaryPct = Math.max(0, Math.min(100, ((salary - extMin) / extRange) * 100));
  const medPct = ((med - extMin) / extRange) * 100;
  const minPct = ((min - extMin) / extRange) * 100;
  const maxPct = ((max - extMin) / extRange) * 100;

  const pctToSalary = useCallback((pct: number) => {
    return Math.round(extMin + (pct / 100) * extRange);
  }, [extMin, extRange]);

  const getPointerPct = useCallback((clientX: number) => {
    if (!barRef.current) return 50;
    const rect = barRef.current.getBoundingClientRect();
    return Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    const pct = getPointerPct(e.clientX);
    onSalaryChange(pctToSalary(pct));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    const pct = getPointerPct(e.clientX);
    onSalaryChange(pctToSalary(pct));
  };

  const handlePointerUp = () => setDragging(false);

  const handleBarClick = (e: React.MouseEvent) => {
    const pct = getPointerPct(e.clientX);
    onSalaryChange(pctToSalary(pct));
  };

  const formattedSalary = `NT$${salary.toLocaleString("en-US")}`;

  return (
    <div className="space-y-1 select-none">
      {/* Floating salary label */}
      <div className="relative h-6">
        <div
          className="absolute -translate-x-1/2 bottom-0 text-[11px] font-semibold tabular-nums text-foreground whitespace-nowrap transition-[left] duration-75"
          style={{ left: `${salaryPct}%` }}
        >
          {formattedSalary}
        </div>
      </div>

      {/* Bar */}
      <div
        ref={barRef}
        className="relative h-7 rounded-full overflow-hidden flex cursor-pointer"
        onClick={handleBarClick}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Background zones mapped to actual min/max positions */}
        <div className="h-full bg-red-200" style={{ width: `${minPct}%` }} />
        <div className="h-full bg-amber-300" style={{ width: `${(medPct - minPct) * 0.5}%` }} />
        <div className="h-full bg-emerald-400" style={{ width: `${medPct - minPct - (medPct - minPct) * 0.5}%` }} />
        <div className="h-full bg-emerald-400" style={{ width: `${(maxPct - medPct) * 0.5}%` }} />
        <div className="h-full bg-emerald-600" style={{ width: `${maxPct - medPct - (maxPct - medPct) * 0.5}%` }} />
        <div className="h-full bg-emerald-800/30" style={{ width: `${100 - maxPct}%` }} />

        {/* Median marker */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-foreground/40" style={{ left: `${medPct}%` }} />

        {/* Draggable thumb */}
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-9 rounded-full bg-foreground shadow-lg border-2 border-background ring-2 ring-foreground/20 transition-shadow",
            dragging ? "cursor-grabbing ring-foreground/40 scale-110" : "cursor-grab hover:ring-foreground/30"
          )}
          style={{ left: `${salaryPct}%` }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[10px] text-muted-foreground px-1">
        <span>{lang === "zh" ? "最低" : "Min"}</span>
        <span>{lang === "zh" ? "中位數" : "Median"}</span>
        <span>{lang === "zh" ? "最高" : "Max"}</span>
      </div>
    </div>
  );
}

function MiniStat({ label, value, positive }: { label: string; value: string; positive: boolean }) {
  return (
    <div className="bg-card border border-border rounded-lg p-3 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("text-lg font-bold tabular-nums", positive ? "text-emerald-700" : "text-red-600")}>{value}</p>
    </div>
  );
}
