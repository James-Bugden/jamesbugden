import { SalaryProvider } from "@/components/salary/SalaryContext";
import SalaryNav from "@/components/salary/SalaryNav";
import SalaryTable from "@/components/salary/SalaryTable";
import SalaryFooter from "@/components/salary/SalaryFooter";
import PageSEO from "@/components/PageSEO";
import type { SalaryLang } from "@/components/salary/salaryI18n";

function Inner({ lang }: { lang: SalaryLang }) {
  return (
    <div className="min-h-screen bg-background font-[Inter,var(--font-body)] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <PageSEO
        title={lang === "zh" ? "探索台灣薪資數據 — James Bugden" : "Explore Taiwan Salary Data — James Bugden"}
        description={lang === "zh" ? "篩選、排序、搜尋 304 筆台灣薪資數據。" : "Filter, sort, and search 304 Taiwan salary data points."}
        path={lang === "zh" ? "/zh-tw/salary/explore" : "/salary/explore"}
      />
      <SalaryNav lang={lang} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SalaryTable lang={lang} />
      </main>
      <SalaryFooter lang={lang} />
    </div>
  );
}

export default function SalaryExplore() {
  return <SalaryProvider><Inner lang="en" /></SalaryProvider>;
}
