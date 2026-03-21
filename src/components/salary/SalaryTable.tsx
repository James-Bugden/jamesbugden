import { useState, useMemo, useCallback } from "react";
import { salaryData, ALL_SECTORS, type SalaryEntry } from "@/data/salaryData";
import { useSalaryContext } from "./SalaryContext";
import { useSalaryT } from "./salaryI18n";
import { FreshnessBadge, TierBadge } from "./badges";
import SalaryRangeBar from "./SalaryRangeBar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp, Download, X, Search } from "lucide-react";
import { type SalaryLang } from "./salaryI18n";

type SortKey = "role" | "sector" | "exp" | "med";
type QuickFilter = "top20" | "entry" | "semi" | "tech" | "exec" | "nearMil" | "bestEntry" | null;

export default function SalaryTable({ lang = "en" }: { lang?: SalaryLang }) {
  const t = useSalaryT(lang);
  const { formatSalary } = useSalaryContext();

  const [search, setSearch] = useState("");
  const [sectors, setSectors] = useState<string[]>([]);
  const [expFilter, setExpFilter] = useState<string[]>([]);
  const [tierFilter, setTierFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("med");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [quickFilter, setQuickFilter] = useState<QuickFilter>(null);
  const perPage = 25;

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir(key === "med" ? "desc" : "asc"); }
  };

  const quickChips: { key: QuickFilter; label: string }[] = [
    { key: "top20", label: t.top20 },
    { key: "entry", label: t.entryLevel },
    { key: "semi", label: t.semiconductor },
    { key: "tech", label: t.technology },
    { key: "exec", label: t.executive },
    { key: "nearMil", label: t.nearMillion },
    { key: "bestEntry", label: t.bestEntry },
  ];

  const filtered = useMemo(() => {
    let data = [...salaryData];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(d => d.role.toLowerCase().includes(q));
    }
    if (sectors.length > 0) data = data.filter(d => sectors.includes(d.sector));
    if (expFilter.length > 0) data = data.filter(d => expFilter.includes(d.exp));
    if (tierFilter) data = data.filter(d => d.tier === Number(tierFilter));

    if (quickFilter === "top20") data.sort((a, b) => b.med - a.med), data = data.slice(0, 20);
    if (quickFilter === "entry") data = data.filter(d => d.exp === "Entry");
    if (quickFilter === "semi") data = data.filter(d => d.sector === "Semiconductor");
    if (quickFilter === "tech") data = data.filter(d => d.sector === "Technology");
    if (quickFilter === "exec") data = data.filter(d => d.exp === "Senior" && d.med >= 3000000);
    if (quickFilter === "nearMil") data = data.filter(d => d.med >= 800000 && d.med <= 1200000);
    if (quickFilter === "bestEntry") {
      data = data.filter(d => d.exp === "Entry");
      data.sort((a, b) => b.med - a.med);
      data = data.slice(0, 20);
    }

    if (quickFilter !== "top20" && quickFilter !== "bestEntry") {
      data.sort((a, b) => {
        const av = sortKey === "role" ? a.role : sortKey === "sector" ? a.sector : sortKey === "exp" ? a.exp : a.med;
        const bv = sortKey === "role" ? b.role : sortKey === "sector" ? b.sector : sortKey === "exp" ? b.exp : b.med;
        if (typeof av === "string" && typeof bv === "string") return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
        return sortDir === "asc" ? (av as number) - (bv as number) : (bv as number) - (av as number);
      });
    }

    return data;
  }, [search, sectors, expFilter, tierFilter, sortKey, sortDir, quickFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const pageData = filtered.slice(page * perPage, (page + 1) * perPage);

  const exportCSV = useCallback(() => {
    const header = "Role,Sector,Experience,Min,Max,Median,Source,Year,Tier\n";
    const rows = filtered.map(d => `"${d.role}","${d.sector}",${d.exp},${d.min},${d.max},${d.med},"${d.source}",${d.year},${d.tier}`).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "salary_data_taiwan.csv"; a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k) return null;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3 inline ml-0.5" /> : <ChevronDown className="w-3 h-3 inline ml-0.5" />;
  };

  const clearAll = () => {
    setSearch(""); setSectors([]); setExpFilter([]); setTierFilter(""); setQuickFilter(null); setPage(0);
  };

  const expLabel = (e: string) => {
    const map: Record<string, string> = { Entry: t.entry, Mid: t.mid, Senior: t.senior, All: t.all };
    return map[e] || e;
  };

  return (
    <div className="space-y-4">
      {/* Search + Export */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            placeholder={t.search}
            className="pl-9"
          />
        </div>
        <button onClick={exportCSV} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
          <Download className="w-4 h-4" /> {t.exportCsv}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select value={sectors.length === 1 ? sectors[0] : "__all__"} onValueChange={v => { setSectors(v === "__all__" ? [] : [v]); setPage(0); }}>
          <SelectTrigger className="w-48 h-9 text-xs">
            <SelectValue placeholder={t.sector} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">{t.allSectors}</SelectItem>
            {ALL_SECTORS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          {(["Entry", "Mid", "Senior", "All"] as const).map(e => (
            <label key={e} className="flex items-center gap-1 text-xs cursor-pointer">
              <Checkbox
                checked={expFilter.includes(e)}
                onCheckedChange={checked => {
                  setExpFilter(prev => checked ? [...prev, e] : prev.filter(x => x !== e));
                  setPage(0);
                }}
              />
              {expLabel(e)}
            </label>
          ))}
        </div>

        <Select value={tierFilter || "__all__"} onValueChange={v => { setTierFilter(v === "__all__" ? "" : v); setPage(0); }}>
          <SelectTrigger className="w-36 h-9 text-xs">
            <SelectValue placeholder={t.sourceTier} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">{t.all}</SelectItem>
            <SelectItem value="1">{t.tier1}</SelectItem>
            <SelectItem value="2">{t.tier2}</SelectItem>
            <SelectItem value="3">{t.tier3}</SelectItem>
            <SelectItem value="4">{t.tier4}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick filter chips */}
      <div className="flex flex-wrap gap-2">
        {quickChips.map(c => (
          <button
            key={c.key}
            onClick={() => { setQuickFilter(quickFilter === c.key ? null : c.key); setPage(0); }}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              quickFilter === c.key
                ? "bg-executive text-white border-executive"
                : "border-border hover:bg-muted"
            }`}
          >
            {c.label}
          </button>
        ))}
        {(search || sectors.length || expFilter.length || tierFilter || quickFilter) && (
          <button onClick={clearAll} className="px-3 py-1 rounded-full text-xs font-medium text-red-600 border border-red-200 hover:bg-red-50 flex items-center gap-1">
            <X className="w-3 h-3" /> {t.clearAll}
          </button>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">{t.noResults}</p>
          <button onClick={clearAll} className="mt-3 text-sm text-executive underline">{t.clearAll}</button>
        </div>
      ) : (
        <>
          <div className="border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="cursor-pointer select-none" onClick={() => toggleSort("role")}>
                    {t.role} <SortIcon k="role" />
                  </TableHead>
                  <TableHead className="cursor-pointer select-none hidden sm:table-cell" onClick={() => toggleSort("sector")}>
                    {t.sector} <SortIcon k="sector" />
                  </TableHead>
                  <TableHead className="cursor-pointer select-none hidden md:table-cell" onClick={() => toggleSort("exp")}>
                    {t.experience} <SortIcon k="exp" />
                  </TableHead>
                  <TableHead className="hidden sm:table-cell w-40">{t.salaryRange}</TableHead>
                  <TableHead className="cursor-pointer select-none text-right" onClick={() => toggleSort("med")}>
                    {t.median} <SortIcon k="med" />
                  </TableHead>
                  <TableHead className="hidden md:table-cell">{t.source}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageData.map((d, i) => {
                  const key = `${d.role}-${d.sector}-${d.exp}-${d.source}`;
                  const isExpanded = expanded === key;
                  return (
                    <>
                      <TableRow
                        key={key}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setExpanded(isExpanded ? null : key)}
                      >
                        <TableCell className="font-medium text-sm">
                          <span>{d.role}</span>
                          <div className="sm:hidden mt-1"><SalaryRangeBar min={d.min} max={d.max} med={d.med} interactive={false} /></div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground hidden sm:table-cell">{d.sector}</TableCell>
                        <TableCell className="text-sm hidden md:table-cell">{expLabel(d.exp)}</TableCell>
                        <TableCell className="hidden sm:table-cell"><SalaryRangeBar min={d.min} max={d.max} med={d.med} interactive={false} /></TableCell>
                        <TableCell className="text-right font-semibold tabular-nums text-sm text-executive">{formatSalary(d.med)}</TableCell>
                        <TableCell className="text-xs text-muted-foreground hidden md:table-cell">{d.source}</TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow key={key + "-detail"} className="bg-muted/20">
                          <TableCell colSpan={6} className="py-3">
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                              <span><strong>{t.min}:</strong> {formatSalary(d.min)}</span>
                              <span><strong>{t.median}:</strong> {formatSalary(d.med)}</span>
                              <span><strong>{t.max}:</strong> {formatSalary(d.max)}</span>
                              <span className="flex items-center gap-1"><FreshnessBadge year={d.year} lang={lang} /> <TierBadge tier={d.tier} lang={lang} /></span>
                              <span className="text-muted-foreground">{d.source}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {lang === "zh"
                ? `顯示 ${page * perPage + 1}–${Math.min((page + 1) * perPage, filtered.length)}，共 ${filtered.length} 筆`
                : `Showing ${page * perPage + 1}–${Math.min((page + 1) * perPage, filtered.length)} of ${filtered.length}`}
            </span>
            <div className="flex items-center gap-1">
              <button disabled={page === 0} onClick={() => setPage(p => p - 1)} className="px-2.5 py-1 rounded border border-border disabled:opacity-30 hover:bg-muted transition-colors">
                <ChevronUp className="w-3.5 h-3.5 -rotate-90" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i;
                } else if (page < 3) {
                  pageNum = i;
                } else if (page > totalPages - 4) {
                  pageNum = totalPages - 5 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`min-w-[32px] px-2 py-1 rounded text-xs font-medium transition-colors ${
                      page === pageNum ? "bg-executive text-white" : "border border-border hover:bg-muted"
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
              {totalPages > 5 && page < totalPages - 3 && <span className="px-1">…</span>}
              <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="px-2.5 py-1 rounded border border-border disabled:opacity-30 hover:bg-muted transition-colors">
                <ChevronUp className="w-3.5 h-3.5 rotate-90" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
