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
import { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SEO } from "@/components/SEO";

function InsightsContent() {
  const lang = "zh" as const;
  const [sectorFilter, setSectorFilter] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.hash]);

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
      heatmap: `${topSector.sector}的資深職位平均薪資 NT$${(seniorAvg / 1_000_000).toFixed(1)}M, 全國中位數的 ${multiple} 倍`,
      top20: `台灣最高薪職位？${top.role}，年薪 NT$${(top.med / 1_000_000).toFixed(1)}M`,
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEO />
      <SalaryNav lang={lang} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">薪資洞察</h1>
            <p className="text-muted-foreground mt-1">互動式圖表探索台灣薪資趨勢</p>
          </div>
          <Select value={sectorFilter} onValueChange={v => setSectorFilter(v === "all" ? "" : v)}>
            <SelectTrigger className="w-56 h-9 text-sm">
              <SelectValue placeholder="篩選所有圖表" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">所有產業</SelectItem>
              {ALL_SECTORS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <InsightCards lang={lang} />
        <ChartCard id="heatmap" title="薪資熱力圖" description="各產業 × 經驗等級的平均中位數" insight={insights.heatmap} lang={lang}>
          <SalaryHeatmap lang={lang} />
        </ChartCard>
        <ChartCard id="top20" title="前 20 高薪職位" description="依中位數排序的最高薪職位" insight={insights.top20} lang={lang}>
          <Top20Chart lang={lang} sectorFilter={sectorFilter} />
        </ChartCard>
        <ChartCard id="premium" title="經驗薪資加成" description="初階到資深的薪資成長幅度" lang={lang}>
          <ExperiencePremiumChart lang={lang} sectorFilter={sectorFilter} />
        </ChartCard>
        <ChartCard id="distribution" title="薪資分布" description="台灣各薪資區間的職位數量" lang={lang}>
          <SalaryDistributionChart lang={lang} />
        </ChartCard>
        <ChartCard id="treemap" title="產業全覽" description="面積 = 職位數量，顏色深淺 = 薪資高低" lang={lang}>
          <SectorTreemap lang={lang} sectorFilter={sectorFilter} />
        </ChartCard>
      </main>
      <SalaryFooter lang={lang} />
    </div>
  );
}

export default function SalaryInsightsZhTw() {
  return <SalaryProvider><InsightsContent /></SalaryProvider>;
}