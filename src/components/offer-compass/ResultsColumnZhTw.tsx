import { useState } from "react";
import type { Scenario, Currency } from "./types";
import { calcScenario, formatCurrency, formatPct } from "./types";
import { useEmailGate } from "@/hooks/useEmailGate";
import { EmailGateOverlay } from "@/components/EmailGateOverlay";
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ScenarioComparison from "./ScenarioComparison";
import NegotiationImpactZhTw from "./NegotiationImpactZhTw";

interface ResultsColumnProps {
  scenario: Scenario;
  currency: Currency;
  scenarios?: Scenario[];
  activeId?: string;
}

const PIE_COLORS = ["#1B3A2F", "#C9A961", "#3D7A5F", "#B0B0B0", "#D4C8A0"];

export default function ResultsColumnZhTw({ scenario, currency, scenarios, activeId }: ResultsColumnProps) {
  const calc = calcScenario(scenario);
  const { isUnlocked, unlock } = useEmailGate();
  const fmtC = (n: number) => formatCurrency(n, currency, scenario.fx_rate);
  const [growthOn, setGrowthOn] = useState(false);
  const [growthRate, setGrowthRate] = useState(3);

  const summaryRows = [
    { label: "底薪", value: calc.base },
    { label: "獎金", value: calc.variable },
    { label: "股票（第一年）", value: calc.equityY1 },
    { label: "主要 OTE", value: calc.ote, bold: false },
    { label: "簽約獎金", value: calc.signon },
    { label: "福利", value: calc.benefits },
    { label: "假期", value: calc.holiday },
    { label: "第一年總計", value: calc.year1Total, bold: true },
    { label: "年度經常性", value: calc.annualRecurring, bold: true },
  ];

  const pieData = [
    { name: "底薪", value: calc.base },
    { name: "獎金", value: calc.variable },
    { name: "股票 Y1", value: calc.equityY1 },
    { name: "簽約獎金", value: calc.signon },
    { name: "福利", value: calc.benefits },
    { name: "假期", value: calc.holiday },
  ].filter((d) => d.value > 0);

  const barData = calc.years.map((y) => {
    const g = growthOn ? Math.pow(1 + growthRate / 100, y.year - 1) : 1;
    return {
      name: `第${y.year}年`,
      底薪: Math.round(y.base * g),
      獎金: Math.round(y.variable * g),
      股票: Math.round(y.equity),
      簽約: Math.round(y.signon),
      福利: Math.round(y.benefits),
      假期: Math.round(y.holiday),
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 print:border-0 print:p-0">
        <h3 className="font-heading text-lg font-bold text-foreground mb-4">薪酬摘要</h3>
        <div className="space-y-2">
          {summaryRows.map((row) => (
            <div key={row.label} className={`flex justify-between py-1 ${row.bold ? "border-t border-border pt-2 mt-2" : ""}`}>
              <span className={`text-sm ${row.bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{row.label}</span>
              <span className={`text-sm ${row.bold ? "font-bold text-foreground" : "text-foreground"}`}>{fmtC(row.value)}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-border">
          <div className={`rounded-xl px-5 py-4 text-center ${calc.deltaAbs >= 0 ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/40" : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40"}`}>
            <p className={`text-3xl font-bold font-heading tracking-tight ${calc.deltaAbs >= 0 ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
              {formatPct(calc.deltaPct)}
            </p>
            <p className={`text-sm font-medium mt-1 ${calc.deltaAbs >= 0 ? "text-green-600/80 dark:text-green-400/70" : "text-red-500/80 dark:text-red-400/70"}`}>
              每年{calc.deltaAbs >= 0 ? "多" : "少"} {fmtC(Math.abs(calc.deltaAbs))}
            </p>
          </div>
        </div>

        <a href="https://james.careers/#coaching" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors">
          需要談判協助？ <span className="text-gold">→</span>
        </a>
      </div>

      <EmailGateOverlay isUnlocked={isUnlocked} onUnlock={unlock} headline="解鎖完整分析" subtext="輸入你的 Email 查看薪酬明細、4年預測和情境比較。">
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">薪酬組成</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} strokeWidth={2} stroke="#FBF7F0">
                    {pieData.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />))}
                  </Pie>
                  <Tooltip formatter={(value: number) => fmtC(value)} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "13px" }} />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">多年預測</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} tick={{ fontSize: 11 }} />
                  <Tooltip formatter={(value: number) => fmtC(value)} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "13px" }} />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Bar dataKey="底薪" stackId="a" fill="#1B3A2F" />
                  <Bar dataKey="獎金" stackId="a" fill="#C9A961" />
                  <Bar dataKey="股票" stackId="a" fill="#3D7A5F" />
                  <Bar dataKey="簽約" stackId="a" fill="#B0B0B0" />
                  <Bar dataKey="福利" stackId="a" fill="#D4C8A0" />
                  <Bar dataKey="假期" stackId="a" fill="#8B7355" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-2 font-semibold text-foreground">年</th>
                    <th className="text-right py-2 px-2 font-semibold text-foreground">底薪</th>
                    <th className="text-right py-2 px-2 font-semibold text-foreground">獎金</th>
                    <th className="text-right py-2 px-2 font-semibold text-foreground">股票</th>
                    <th className="text-right py-2 px-2 font-semibold text-foreground">簽約</th>
                    <th className="text-right py-2 px-2 font-semibold text-foreground">合計</th>
                    {calc.hasCurrent && <th className="text-right py-2 pl-2 font-semibold text-foreground">vs 現職</th>}
                  </tr>
                </thead>
                <tbody>
                  {calc.years.map((y) => {
                    const g = growthOn ? Math.pow(1 + growthRate / 100, y.year - 1) : 1;
                    const adjTotal = (y.base * g) + (y.variable * g) + y.equity + y.signon + y.benefits + y.holiday;
                    const adjVs = calc.hasCurrent ? (adjTotal - scenario.current_comp_twd) / scenario.current_comp_twd : 0;
                    return (
                      <tr key={y.year} className="border-b border-border/50">
                        <td className="py-2 pr-2 text-foreground font-medium">Y{y.year}</td>
                        <td className="py-2 px-2 text-right text-muted-foreground">{fmtC(y.base * g)}</td>
                        <td className="py-2 px-2 text-right text-muted-foreground">{fmtC(y.variable * g)}</td>
                        <td className="py-2 px-2 text-right text-muted-foreground">{fmtC(y.equity)}</td>
                        <td className="py-2 px-2 text-right text-muted-foreground">{fmtC(y.signon)}</td>
                        <td className="py-2 px-2 text-right font-semibold text-foreground">{fmtC(adjTotal)}</td>
                        {calc.hasCurrent && (
                          <td className={`py-2 pl-2 text-right font-semibold ${adjVs >= 0 ? "text-green-600" : "text-red-500"}`}>{formatPct(adjVs)}</td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Switch checked={growthOn} onCheckedChange={setGrowthOn} />
                <Label className="text-xs cursor-pointer">如果薪酬隨時間增長？</Label>
              </div>
              {growthOn && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">年增長率：</span>
                  <Slider value={[growthRate]} onValueChange={([v]) => setGrowthRate(v)} min={1} max={10} step={1} className="w-32" />
                  <span className="text-xs font-medium text-foreground">{growthRate}%</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </EmailGateOverlay>

      {scenarios && activeId && scenarios.length >= 2 && (
        <ScenarioComparison scenarios={scenarios} activeId={activeId} currency={currency} locale="zh-tw" />
      )}

      <NegotiationImpactZhTw currentComp={scenario.current_comp_twd || undefined} currency={currency} fxRate={scenario.fx_rate} />

      <div className="rounded-2xl p-8 print:hidden" style={{ backgroundColor: "#1A1A1A" }}>
        <div className="w-10 h-1 rounded-full mb-4" style={{ backgroundColor: "#C9A961" }} />
        <h3 className="font-heading text-xl font-bold mb-3" style={{ color: "#FBF7F0" }}>
          大多數候選人在談判中少拿 10-20%。
        </h3>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: "#A0A0A0" }}>
          我曾協助 Google、Uber 和 Meta 的專業人士談判更好的 Offer。如果你正在比較方案，我可以告訴你什麼是合理的，什麼可以爭取。
        </p>
        <a href="https://james.careers/#coaching" target="_blank" rel="noopener noreferrer" className="inline-flex h-11 px-6 items-center justify-center rounded-lg font-semibold text-sm transition-transform hover:scale-[1.02]" style={{ backgroundColor: "#C9A961", color: "#1B3A2F" }}>
          預約免費策略諮詢
        </a>
      </div>
    </div>
  );
}
