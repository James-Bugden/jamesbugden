import { SalaryProvider } from "@/components/salary/SalaryContext";
import SalaryNav from "@/components/salary/SalaryNav";
import SalaryTable from "@/components/salary/SalaryTable";
import SalaryFooter from "@/components/salary/SalaryFooter";
import { SEO } from "@/components/SEO";

function Inner() {
  return (
    <div className="min-h-screen bg-background font-[Inter,var(--font-body)]">
      <SEO />
      <SalaryNav lang="zh" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SalaryTable lang="zh" />
      </main>
      <SalaryFooter lang="zh" />
    </div>
  );
}

export default function SalaryExploreZhTw() {
  return <SalaryProvider><Inner /></SalaryProvider>;
}