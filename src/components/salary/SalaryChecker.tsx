import { useState, useMemo, useEffect } from "react";
import { salaryData, ALL_SECTORS, EXP_LEVELS } from "@/data/salaryData";
import { useSalaryT, type SalaryLang } from "./salaryI18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "cmdk";
import { Check, ChevronsUpDown, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import SalaryResultCard from "./SalaryResultCard";
import SimilarRoles from "./SimilarRoles";
import SalaryHowToRead from "./SalaryHowToRead";
import FeaturedResults from "./FeaturedResults";

export default function SalaryChecker({ lang }: { lang: SalaryLang }) {
  const t = useSalaryT(lang);
  const [role, setRole] = useState("");
  const [sector, setSector] = useState("");
  const [exp, setExp] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);

  // Listen for external role selection
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) { setRole(detail); setSector(""); setExp(""); }
    };
    window.addEventListener("salary-select-role", handler);
    return () => window.removeEventListener("salary-select-role", handler);
  }, []);

  const hasAnyFilter = role || sector || exp;

  // Roles filtered by current sector/exp selection
  const uniqueRoles = useMemo(() => {
    let filtered = salaryData;
    if (sector) filtered = filtered.filter(d => d.sector === sector);
    if (exp) filtered = filtered.filter(d => d.exp === exp);
    const set = new Set<string>();
    filtered.forEach(d => set.add(d.role));
    return [...set].sort();
  }, [sector, exp]);

  // Sectors filtered by current role/exp
  const availableSectors = useMemo(() => {
    let filtered = salaryData;
    if (role) filtered = filtered.filter(d => d.role === role);
    if (exp) filtered = filtered.filter(d => d.exp === exp);
    return [...new Set(filtered.map(d => d.sector))].sort();
  }, [role, exp]);

  // Exp filtered by current role/sector
  const availableExp = useMemo(() => {
    let filtered = salaryData;
    if (role) filtered = filtered.filter(d => d.role === role);
    if (sector) filtered = filtered.filter(d => d.sector === sector);
    return [...new Set(filtered.map(d => d.exp))];
  }, [role, sector]);

  // Single best result when role is selected
  const result = useMemo(() => {
    if (!role) return null;
    let filtered = salaryData.filter(d => d.role === role);
    if (sector) filtered = filtered.filter(d => d.sector === sector);
    if (exp) filtered = filtered.filter(d => d.exp === exp);
    if (filtered.length === 0) return null;
    filtered.sort((a, b) => a.tier - b.tier);
    return filtered[0];
  }, [role, sector, exp]);

  // Top results when browsing by sector/exp without a specific role
  const browseResults = useMemo(() => {
    if (role) return [];
    if (!sector && !exp) return [];
    let filtered = salaryData;
    if (sector) filtered = filtered.filter(d => d.sector === sector);
    if (exp) filtered = filtered.filter(d => d.exp === exp);
    // Deduplicate by role, keep highest tier
    const best: Record<string, typeof salaryData[0]> = {};
    filtered.forEach(d => {
      if (!best[d.role] || d.tier < best[d.role].tier) best[d.role] = d;
    });
    return Object.values(best).sort((a, b) => b.med - a.med).slice(0, 8);
  }, [role, sector, exp]);

  const clearAll = () => { setRole(""); setSector(""); setExp(""); };

  const expLabel = (e: string) => {
    const map: Record<string, string> = { Entry: t.entry, Mid: t.mid, Senior: t.senior, All: t.all };
    return map[e] || e;
  };

  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-6 sm:pb-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-2 sm:mb-3">
          {t.heroTitle}
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">{t.heroSub}</p>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-premium p-4 sm:p-6 space-y-3 sm:space-y-4">
        {/* Role combobox */}
        <Popover open={roleOpen} onOpenChange={setRoleOpen}>
          <PopoverTrigger asChild>
            <button
              className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-border bg-background text-left text-sm hover:border-executive/40 transition-colors"
            >
              <span className={role ? "text-foreground truncate" : "text-muted-foreground"}>
                {role || t.selectRole}
              </span>
              <ChevronsUpDown className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
            <Command className="bg-popover">
              <div className="flex items-center border-b px-3">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <CommandInput placeholder={t.selectRole} className="h-10 border-0 focus:ring-0 text-sm" />
              </div>
              <CommandList className="max-h-64 overflow-y-auto">
                <CommandEmpty className="py-4 text-center text-sm text-muted-foreground">{t.noResults}</CommandEmpty>
                <CommandGroup>
                  {uniqueRoles.map(r => (
                    <CommandItem
                      key={r}
                      value={r}
                      onSelect={() => {
                        setRole(r);
                        setRoleOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer data-[selected=true]:bg-muted hover:bg-muted"
                    >
                      <Check className={cn("w-4 h-4 shrink-0", role === r ? "opacity-100" : "opacity-0")} />
                      <span className="truncate">{r}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <Select value={sector} onValueChange={(v) => { setSector(v); }}>
            <SelectTrigger className="h-10 sm:h-11 text-xs sm:text-sm">
              <SelectValue placeholder={t.selectSector} />
            </SelectTrigger>
            <SelectContent>
              {availableSectors.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={exp} onValueChange={(v) => { setExp(v); }}>
            <SelectTrigger className="h-10 sm:h-11 text-xs sm:text-sm">
              <SelectValue placeholder={t.selectExp} />
            </SelectTrigger>
            <SelectContent>
              {availableExp.map(e => (
                <SelectItem key={e} value={e}>{expLabel(e)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasAnyFilter && (
          <button onClick={clearAll} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-3 h-3" />
            {t.clearAll}
          </button>
        )}
      </div>

      {/* How-to-read hint for first-time visitors */}
      {(result || browseResults.length > 0) && (
        <div className="mt-5 sm:mt-6">
          <SalaryHowToRead lang={lang} />
        </div>
      )}

      {/* Single role result */}
      {result && (
        <div className="space-y-5 sm:space-y-6">
          <SalaryResultCard entry={result} lang={lang} showRangeLegend />
          <SimilarRoles currentRole={result.role} currentSector={result.sector} lang={lang} onSelect={(r) => { setRole(r); setSector(""); setExp(""); }} />
        </div>
      )}

      {/* Browse results (no role selected, but sector/exp chosen) */}
      {browseResults.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-heading text-base sm:text-lg font-bold text-foreground">{t.topResults}</h2>
          <div className="space-y-3">
            {browseResults.map((entry, i) => (
              <SalaryResultCard key={entry.role + entry.sector + entry.exp} entry={entry} lang={lang} showRangeLegend={i === 0} />
            ))}
          </div>
        </div>
      )}

      {/* Featured results when nothing is selected */}
      {!hasAnyFilter && <FeaturedResults lang={lang} onSelect={(r) => { setRole(r); setSector(""); setExp(""); }} />}
    </section>
  );
}
