import { useState, useMemo, useEffect } from "react";
import { SalaryProvider } from "@/components/salary/SalaryContext";
import SalaryNav from "@/components/salary/SalaryNav";
import SalaryFooter from "@/components/salary/SalaryFooter";
import InsightCards from "@/components/salary/insights/InsightCards";
import ChartCard from "@/components/salary/insights/ChartCard";
import SalaryHeatmap from "@/components/salary/insights/SalaryHeatmap";
import Top20Chart from "@/components/salary/insights/Top20Chart";
import ExperiencePremiumChart from "@/components/salary/insights/ExperiencePremiumChart";
import SalaryDistributionChart from "@/components/salary/insights/SalaryDistributionChart";
import SectorTreemap from "@/components/salary/insights/SectorTreemap";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALL_SECTORS, salaryData, NATIONAL_MEDIAN } from "@/data/salaryData";
import { type SalaryLang } from "@/components/salary/salaryI18n";
import { useLocation } from "react-router-dom";
import { SEO } from "@/components/SEO";

function InsightsContent({ lang }: { lang: SalaryLang }) {
  const [sectorFilter, setSectorFilter] = useState("");
  const location = useLocation();

  // Scroll to hash on mount
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

  // Generate insight texts
  const insights = useMemo(() => {
    const sorted = [...salaryData].sort((a, b) => b.med - a.med);
    const top = sorted[0];

    const sectors = [...new Set(salaryData.map(d => d.sector))];
    const sectorAvgs = sectors.map(s => {
      const roles = salaryData.filter(d => d.sector === s);
      return { sector: s, avg: roles.reduce((a, b) => a + b.med, 0) / roles.length };
    }).sort((a, b) => b.avg - a.avg);
    const topSector = sectorAvgs[0];
    const topSectorSeniors = salaryData.filter(d => d.sector === topSector.sector && d.exp === "Senior");
    const seniorAvg = topSectorSeniors.length
      ? topSectorSeniors.reduce((a, b) => a + b.med, 0) / topSectorSeniors.length
      : topSector.avg;
    const multiple = (seniorAvg / NATIONAL_MEDIAN).toFixed(1);

    return {
      heatmap: lang === "zh"
        ? `${topSector.sector}的資深職位平均薪資 NT$${(seniorAvg / 1_000_000).toFixed(1)}M, 全國中位數的 ${multiple} 倍`
        : `Senior roles in ${topSector.sector} average NT$${(seniorAvg / 1_000_000).toFixed(1)}M, ${multiple}× the national median`,
      top20: lang === "zh"
        ? `台灣最高薪職位？${top.role}，年薪 NT$${(top.med / 1_000_000).toFixed(1)}M`
        : `The highest-paying role in Taiwan? ${top.role} at NT$${(top.med / 1_000_000).toFixed(1)}M/year`,
    };
  }, [lang]);

  return (
    <div className="min-h-screen bg-background font-sans animate-in fade-in slide-in-from-bottom-2 duration-300">
      <SEO />
      <SalaryNav lang={lang} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {lang === "zh" ? "薪資洞察" : "Salary Insights"}
            </h1>
            <p className="text-muted-foreground mt-1">
              {lang === "zh" ? "互動式圖表探索台灣薪資趨勢" : "Interactive charts exploring Taiwan salary trends"}
            </p>
          </div>
          <Select value={sectorFilter} onValueChange={v => setSectorFilter(v === "all" ? "" : v)}>
            <SelectTrigger className="w-56 h-9 text-sm">
              <SelectValue placeholder={lang === "zh" ? "篩選所有圖表" : "Filter all charts"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{lang === "zh" ? "所有產業" : "All Sectors"}</SelectItem>
              {ALL_SECTORS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        {/* Summary cards */}
        <InsightCards lang={lang} />

        {/* Chart 1: Heatmap */}
        <ChartCard
          id="heatmap"
          title={lang === "zh" ? "薪資熱力圖" : "Salary Heatmap"}
          description={lang === "zh" ? "各產業 × 經驗等級的平均中位數" : "Average median by sector × experience level"}
          insight={insights.heatmap}
          lang={lang}
        >
          <SalaryHeatmap lang={lang} />
        </ChartCard>

        {/* Chart 2: Top 20 */}
        <ChartCard
          id="top20"
          title={lang === "zh" ? "前 20 高薪職位" : "Top 20 Highest Paying Roles"}
          description={lang === "zh" ? "依中位數排序的最高薪職位" : "Roles ranked by median salary"}
          insight={insights.top20}
          lang={lang}
        >
          <Top20Chart lang={lang} sectorFilter={sectorFilter} />
        </ChartCard>

        {/* Chart 3: Experience premium */}
        <ChartCard
          id="premium"
          title={lang === "zh" ? "經驗薪資加成" : "Experience Premium"}
          description={lang === "zh" ? "初階到資深的薪資成長幅度" : "Entry → Senior salary growth by sector"}
          lang={lang}
        >
          <ExperiencePremiumChart lang={lang} sectorFilter={sectorFilter} />
        </ChartCard>

        {/* Chart 4: Distribution */}
        <ChartCard
          id="distribution"
          title={lang === "zh" ? "薪資分布" : "Your Salary vs. Taiwan"}
          description={lang === "zh" ? "台灣各薪資區間的職位數量" : "How many roles fall in each salary bracket"}
          lang={lang}
        >
          <SalaryDistributionChart lang={lang} />
        </ChartCard>

        {/* Chart 5: Treemap */}
        <ChartCard
          id="treemap"
          title={lang === "zh" ? "產業全覽" : "Sector Landscape"}
          description={lang === "zh" ? "面積 = 職位數量，顏色深淺 = 薪資高低" : "Size = role count, color intensity = average salary"}
          lang={lang}
        >
          <SectorTreemap lang={lang} sectorFilter={sectorFilter} />
        </ChartCard>
      </main>
      <SalaryFooter lang={lang} />
    </div>
  );
}

export default function SalaryInsights() {
  return <SalaryProvider><InsightsContent lang="en" /></SalaryProvider>;
}