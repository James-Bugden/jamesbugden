import { SalaryProvider } from "@/components/salary/SalaryContext";
import SalaryNav from "@/components/salary/SalaryNav";
import SalaryChecker from "@/components/salary/SalaryChecker";
import PopularSearches from "@/components/salary/PopularSearches";
import TopPayingRoles from "@/components/salary/TopPayingRoles";
import SalaryFooter from "@/components/salary/SalaryFooter";
import { Link } from "react-router-dom";
import { useSalaryT } from "@/components/salary/salaryI18n";
import { useCallback } from "react";
import { SEO } from "@/components/SEO";

function Inner() {
  const t = useSalaryT("zh");
  const handleSelect = useCallback((role: string) => {
    window.dispatchEvent(new CustomEvent("salary-select-role", { detail: role }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background font-[Inter,var(--font-body)] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <SEO />
      <SalaryNav lang="zh" />
      <SalaryChecker lang="zh" />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-4">
        <Link to="/zh-tw/offer-calculator" className="block bg-executive text-white rounded-xl p-5 hover:bg-executive-light transition-colors">
          <p className="font-heading text-lg font-bold">{t.gotOffer}</p>
          <p className="text-sm text-white/80 mt-1">{t.gotOfferDesc}</p>
        </Link>
      </section>
      <PopularSearches lang="zh" onSelect={handleSelect} />
      <TopPayingRoles lang="zh" onSelect={handleSelect} />
      <SalaryFooter lang="zh" />
    </div>
  );
}

export default function SalaryDatabaseZhTw() {
  return <SalaryProvider><Inner /></SalaryProvider>;
}