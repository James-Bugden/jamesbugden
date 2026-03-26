import { SalaryProvider } from "@/components/salary/SalaryContext";
import SalaryNav from "@/components/salary/SalaryNav";
import SalaryTable from "@/components/salary/SalaryTable";
import SalaryFooter from "@/components/salary/SalaryFooter";
import type { SalaryLang } from "@/components/salary/salaryI18n";
import { SEO } from "@/components/SEO";

function Inner({ lang }: { lang: SalaryLang }) {
  return (
    <div className="min-h-screen bg-background font-[Inter,var(--font-body)] animate-in fade-in slide-in-from-bottom-2 duration-300">
      <SEO />
      <SalaryNav lang={lang} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="sr-only">Explore Salaries</h1>
        <SalaryTable lang={lang} />
      </main>
      <SalaryFooter lang={lang} />
    </div>
  );
}

export default function SalaryExplore() {
  return <SalaryProvider><Inner lang="en" /></SalaryProvider>;
}