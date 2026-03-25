import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2, Check, ArrowRight, Calculator, TrendingUp, BarChart3, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { nativeShare } from "@/lib/share";
import ToolkitHeaderZhTw from "@/components/toolkit/ToolkitHeaderZhTw";
import ToolkitFooterZhTw from "@/components/toolkit/ToolkitFooterZhTw";
import ToolkitNavZhTw from "@/components/toolkit/ToolkitNavZhTw";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { SEO } from "@/components/SEO";

const exampleOffers = [
  {
    name: "外商科技公司",
    monthlySalary: 85000,
    guaranteedMonths: 14,
    guaranteedAnnual: 1190000,
    yearEndExtra: 170000,
    bonus: 102000,
    signOn: 100000,
    profitSharing: 0,
    rsuY1: 300000,
    insurance: 15000,
    mealAllowance: 28800,
    transport: 0,
    overtime: 0,
    stipends: 12000,
    year1: 1917800,
    year2: 1817800,
  },
  {
    name: "半導體公司",
    monthlySalary: 75000,
    guaranteedMonths: 14,
    guaranteedAnnual: 1050000,
    yearEndExtra: 200000,
    bonus: 0,
    signOn: 0,
    profitSharing: 600000,
    rsuY1: 0,
    insurance: 25000,
    mealAllowance: 28800,
    transport: 36000,
    overtime: 216000,
    stipends: 30000,
    year1: 2235800,
    year2: 2185800,
  },
  {
    name: "目前工作",
    monthlySalary: 65000,
    guaranteedMonths: 13,
    guaranteedAnnual: 845000,
    yearEndExtra: 65000,
    bonus: 0,
    signOn: 0,
    profitSharing: 0,
    rsuY1: 0,
    insurance: 0,
    mealAllowance: 28800,
    transport: 0,
    overtime: 0,
    stipends: 6000,
    year1: 944800,
    year2: 944800,
  },
];

const fourYearData = [
  { year: "第1年", "外商科技公司": 1917800, "半導體公司": 2235800, "目前工作": 944800 },
  { year: "第2年", "外商科技公司": 1817800, "半導體公司": 2185800, "目前工作": 944800 },
  { year: "第3年", "外商科技公司": 1817800, "半導體公司": 2185800, "目前工作": 944800 },
  { year: "第4年", "外商科技公司": 1817800, "半導體公司": 2185800, "目前工作": 944800 },
];

const OFFER_COLORS = ["hsl(var(--gold))", "hsl(var(--executive-green))", "hsl(153, 30%, 40%)"];

function fmtNTD(v: number): string {
  if (v === 0) return "NT$0";
  return `NT$${Math.round(v).toLocaleString("en-US")}`;
}

const breakdownRows = [
  { label: "保障年薪", key: "guaranteedAnnual" },
  { label: "年終獎金（超出保障）", key: "yearEndExtra" },
  { label: "績效獎金", key: "bonus" },
  { label: "簽約獎金", key: "signOn" },
  { label: "員工分紅（現金+股票）", key: "profitSharing" },
  { label: "RSU（第一年）", key: "rsuY1" },
  { label: "團保升級", key: "insurance" },
  { label: "伙食津貼", key: "mealAllowance" },
  { label: "交通津貼", key: "transport" },
  { label: "加班費", key: "overtime" },
  { label: "其他津貼", key: "stipends" },
];

const howToUseSteps = [
  "先填月薪和保障月數 — 光這兩個欄位就能看出保障年薪的差距。",
  "展開「股票與分紅」填入員工分紅。在台灣科技業，分紅往往是薪資差距最大的項目。",
  "如果是製造業或有輪班的職位，記得填加班費。年度加起來可能超過 NT$200,000。",
  "最後填「保險、假期與津貼」。團保升級和津貼是容易被忽略的隱藏價值。",
  "比較「每月等效薪資」— 這是最直觀的數字，適合用在還價信中。",
];

const CompensationCalculatorZhTw = () => {
  const { toast } = useToast();
  const [shared, setShared] = useState(false);

  const maxYear1 = Math.max(...exampleOffers.map((o) => o.year1));
  const bestIdx = exampleOffers.findIndex((o) => o.year1 === maxYear1);

  const shareUrl = async () => {
    const shared = await nativeShare();
    if (!shared) {
      setShared(true);
      toast({ title: "已複製連結！", description: "分享給需要的人。" });
      setTimeout(() => setShared(false), 2000);
    }
    setTimeout(() => setShared(false), 2000);
  };

  return (
      <div className="min-h-screen bg-background">
      <SEO />
      <ToolkitHeaderZhTw />

      {/* Hero */}
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <Link to="/zh-tw/toolkit" className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> 返回工具包
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            年度總薪酬計算表
          </h1>
          <p className="text-lg text-cream-90">
            你的 offer 不只是那個月薪數字。這是看清全貌的方法。
          </p>
        </div>
      </section>

      <div className="pt-8"><ToolkitNavZhTw currentTemplate="calculator" /></div>

      {/* EXAMPLE SECTION — Visual cards */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">範例：如何計算</h2>
            <p className="text-muted-foreground text-sm">三個真實情境，說明為什麼年度總薪酬比月薪重要。</p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {exampleOffers.map((offer, i) => (
              <div
                key={i}
                className={`rounded-xl p-5 border transition-shadow ${i === bestIdx ? "border-gold bg-gold/5 shadow-[0_2px_12px_rgba(201,169,97,0.15)]" : "border-border bg-card"}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-foreground">{offer.name}</span>
                  {i === bestIdx && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-semibold">
                      <Crown className="w-3 h-3" /> 最佳
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{fmtNTD(offer.year1)}</p>
                <p className="text-xs text-muted-foreground mb-3">第一年總薪酬</p>
                <div className="pt-3 border-t border-border grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">第二年起</span>
                    <p className="font-semibold text-foreground">{fmtNTD(offer.year2)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">每月等效</span>
                    <p className="font-semibold text-foreground">{fmtNTD(Math.round(offer.year1 / 12))}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Insight */}
          <div className="bg-gold/10 border-l-4 border-gold rounded-r-xl p-5 mb-6">
            <p className="text-sm text-foreground">
              <span className="font-semibold text-gold">重點：</span> 半導體公司的月薪比外商科技公司低 NT$10,000，但因為員工分紅 NT$600,000、加班費 NT$216,000/年、交通津貼和團保升級，年度總薪酬反而高出許多。千萬不要只看月薪數字做決定。
            </p>
          </div>

          {/* 4-Year Chart */}
          <div className="bg-card rounded-xl border border-border p-5 mb-6">
            <h3 className="font-semibold text-foreground text-sm mb-4">四年收入預估</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fourYearData} barCategoryGap="20%">
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 10000).toFixed(0)}萬`} width={55} />
                  <RechartsTooltip formatter={(value: number) => fmtNTD(value)} />
                  <Legend />
                  {exampleOffers.map((o, i) => (
                    <Bar key={i} dataKey={o.name} fill={OFFER_COLORS[i]} radius={[4, 4, 0, 0]} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Breakdown Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-3 bg-muted border-b border-border">
              <h3 className="font-semibold text-foreground text-sm">各項明細</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">項目</th>
                    {exampleOffers.map((o, i) => (
                      <th key={i} className="text-right px-4 py-3 text-muted-foreground font-medium">{o.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breakdownRows.map((row) => (
                    <tr key={row.key} className="border-b border-border">
                      <td className="px-4 py-2.5 font-medium text-foreground">{row.label}</td>
                      {exampleOffers.map((o, i) => {
                        const val = (o as any)[row.key] as number;
                        return (
                          <td key={i} className="text-right px-4 py-2.5 text-foreground">
                            {val === 0 ? "—" : fmtNTD(val)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gold bg-gold/5 font-bold">
                    <td className="px-4 py-3">第一年總計</td>
                    {exampleOffers.map((o, i) => (
                      <td key={i} className="text-right px-4 py-3">{fmtNTD(o.year1)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to Interactive Calculator */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-shadow duration-200">
            <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
              <Calculator className="w-7 h-7 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
              準備好計算你自己的 Offer 了嗎？
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              輸入你的真實數字，最多比較 3 份 offer。所有欄位即時更新計算結果。
            </p>
            <div className="space-y-4 text-left max-w-sm mx-auto mb-8">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">一眼看清第一年總薪酬，包含簽約金、RSU、福利和扣除項</p>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">四年預估顯示哪個 offer 長期最有價值</p>
              </div>
            </div>
            <Link
              to="/zh-tw/toolkit/calculator-interactive"
              className="inline-flex min-h-12 px-8 py-3 items-center justify-center rounded-lg btn-gold text-base font-semibold gap-2"
            >
              開啟互動計算器 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-card rounded-xl p-6 shadow-premium border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">如何使用</h3>
            <ol className="space-y-3">
              {howToUseSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-executive text-cream text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-foreground text-sm">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl flex justify-center">
          <Button onClick={shareUrl} variant="outline" className="border-executive text-executive hover:bg-executive/10 px-6 py-3 h-auto">
            {shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
            {shared ? "已複製連結！" : "分享"}
          </Button>
        </div>
      </section>

      <ToolkitFooterZhTw />
    </div>
  );
};

export default CompensationCalculatorZhTw;
