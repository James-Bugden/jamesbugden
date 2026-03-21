import { SalaryProvider } from "@/components/salary/SalaryContext";
import SalaryNav from "@/components/salary/SalaryNav";
import SalaryFooter from "@/components/salary/SalaryFooter";
import PageSEO from "@/components/PageSEO";
import { useSalaryT } from "@/components/salary/salaryI18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CompareRolesTab from "@/components/salary/compare/CompareRolesTab";
import CompareSectorsTab from "@/components/salary/compare/CompareSectorsTab";
import CareerPathTab from "@/components/salary/compare/CareerPathTab";
import AmIUnderpaidTab from "@/components/salary/compare/AmIUnderpaidTab";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type Tab = "roles" | "sectors" | "career" | "underpaid";

function Inner() {
  const t = useSalaryT("zh");
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<Tab>((searchParams.get("tab") as Tab) || "roles");

  const tabs: { key: Tab; label: string }[] = [
    { key: "roles", label: "比較職位" },
    { key: "sectors", label: "比較產業" },
    { key: "career", label: "職涯路徑" },
    { key: "underpaid", label: "我的薪資合理嗎？" },
  ];

  return (
    <div className="min-h-screen bg-background font-[Inter,var(--font-body)] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <PageSEO title="比較薪資 — James Bugden" description="比較職位、產業薪資，查看職涯成長路徑。" path="/zh-tw/salary/compare" />
      <SalaryNav lang="zh" />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile: select dropdown */}
        <div className="sm:hidden mb-4">
          <Select value={tab} onValueChange={v => setTab(v as Tab)}>
            <SelectTrigger className="h-11 text-sm font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tabs.map(t => (
                <SelectItem key={t.key} value={t.key}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Desktop: tab bar */}
        <div className="hidden sm:flex flex-wrap gap-1 mb-6 border-b border-border pb-px">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors focus-visible:outline-2 focus-visible:outline-executive focus-visible:outline-offset-2 ${
                tab === t.key
                  ? "bg-card border border-b-0 border-border text-foreground -mb-px"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab === "roles" && <CompareRolesTab lang="zh" />}
        {tab === "sectors" && <CompareSectorsTab lang="zh" />}
        {tab === "career" && <CareerPathTab lang="zh" />}
        {tab === "underpaid" && <AmIUnderpaidTab lang="zh" />}
      </main>
      <SalaryFooter lang="zh" />
    </div>
  );
}

export default function SalaryCompareZhTw() {
  return <SalaryProvider><Inner /></SalaryProvider>;
}
