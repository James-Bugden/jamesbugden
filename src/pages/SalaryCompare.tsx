import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SalaryProvider } from "@/components/salary/SalaryContext";
import SalaryNav from "@/components/salary/SalaryNav";
import SalaryFooter from "@/components/salary/SalaryFooter";
import PageSEO from "@/components/PageSEO";
import { useSalaryT, type SalaryLang } from "@/components/salary/salaryI18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CompareRolesTab from "@/components/salary/compare/CompareRolesTab";
import CompareSectorsTab from "@/components/salary/compare/CompareSectorsTab";
import CareerPathTab from "@/components/salary/compare/CareerPathTab";
import AmIUnderpaidTab from "@/components/salary/compare/AmIUnderpaidTab";

type Tab = "roles" | "sectors" | "career" | "underpaid";

function Inner({ lang }: { lang: SalaryLang }) {
  const t = useSalaryT(lang);
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState<Tab>((searchParams.get("tab") as Tab) || "roles");

  const tabs: { key: Tab; label: string }[] = [
    { key: "roles", label: lang === "zh" ? "比較職位" : "Compare Roles" },
    { key: "sectors", label: lang === "zh" ? "比較產業" : "Compare Sectors" },
    { key: "career", label: lang === "zh" ? "職涯路徑" : "Career Path" },
    { key: "underpaid", label: lang === "zh" ? "我的薪資合理嗎？" : "Am I Underpaid?" },
  ];

  return (
    <div className="min-h-screen bg-background font-[Inter,var(--font-body)]">
      <PageSEO
        title={lang === "zh" ? "比較薪資 — James Bugden" : "Compare Salaries — James Bugden"}
        description={lang === "zh" ? "比較職位、產業薪資，查看職涯成長路徑。" : "Compare roles, sectors, career paths and check if you're underpaid."}
        path={lang === "zh" ? "/zh-tw/salary/compare" : "/salary/compare"}
      />
      <SalaryNav lang={lang} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Mobile: select dropdown for tabs */}
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

        {tab === "roles" && <CompareRolesTab lang={lang} />}
        {tab === "sectors" && <CompareSectorsTab lang={lang} />}
        {tab === "career" && <CareerPathTab lang={lang} />}
        {tab === "underpaid" && <AmIUnderpaidTab lang={lang} />}
      </main>

      <SalaryFooter lang={lang} />
    </div>
  );
}

export default function SalaryCompare() {
  return <SalaryProvider><Inner lang="en" /></SalaryProvider>;
}
