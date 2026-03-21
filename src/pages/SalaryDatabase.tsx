import { useRef, useCallback } from "react";
import { SalaryProvider } from "@/components/salary/SalaryContext";
import SalaryNav from "@/components/salary/SalaryNav";
import SalaryChecker from "@/components/salary/SalaryChecker";
import PopularSearches from "@/components/salary/PopularSearches";
import TopPayingRoles from "@/components/salary/TopPayingRoles";
import SalaryFooter from "@/components/salary/SalaryFooter";
import { Link } from "react-router-dom";
import { useSalaryT, type SalaryLang } from "@/components/salary/salaryI18n";
import PageSEO from "@/components/PageSEO";

function SalaryDatabaseInner({ lang }: { lang: SalaryLang }) {
  const t = useSalaryT(lang);
  const checkerRef = useRef<{ setRole: (r: string) => void } | null>(null);

  // We use a simple approach: scroll to top and let the URL carry the role
  const handleSelect = useCallback((role: string) => {
    // Dispatch a custom event that SalaryChecker listens to
    window.dispatchEvent(new CustomEvent("salary-select-role", { detail: role }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background font-[Inter,var(--font-body)] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <PageSEO
        title={lang === "zh" ? "台灣薪資資料庫 — James Bugden" : "Taiwan Salary Database — James Bugden"}
        description={lang === "zh"
          ? "搜尋 169 個職位、25 個產業的台灣薪資數據。資料來自 9 個權威來源。"
          : "Search salary data for 169 roles across 25 sectors in Taiwan. Data from 9 authoritative sources."
        }
        path={lang === "zh" ? "/zh-tw/salary" : "/salary"}
      />
      <SalaryNav lang={lang} />
      <SalaryChecker lang={lang} />

      {/* Got an offer CTA */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <Link
          to={lang === "zh" ? "/zh-tw/offer-calculator" : "/offer-calculator"}
          className="block bg-executive text-white rounded-xl p-5 hover:bg-executive-light transition-colors"
        >
          <p className="font-heading text-lg font-bold">{t.gotOffer}</p>
          <p className="text-sm text-white/80 mt-1">{t.gotOfferDesc}</p>
        </Link>
      </section>

      <PopularSearches lang={lang} onSelect={handleSelect} />
      <TopPayingRoles lang={lang} onSelect={handleSelect} />
      <SalaryFooter lang={lang} />
    </div>
  );
}

export default function SalaryDatabase() {
  return (
    <SalaryProvider>
      <SalaryDatabaseInner lang="en" />
    </SalaryProvider>
  );
}
