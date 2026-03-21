import { useState } from "react";
import type { Scenario, Currency } from "./types";
import { calcScenario, formatCurrency, formatPct } from "./types";
import { useEmailGate } from "@/hooks/useEmailGate";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ScenarioComparison from "./ScenarioComparison";
import NegotiationImpact from "./NegotiationImpact";

interface ResultsColumnProps {
  scenario: Scenario;
  currency: Currency;
  scenarios?: Scenario[];
  activeId?: string;
}

const PIE_COLORS = ["#1B3A2F", "#C9A961", "#3D7A5F", "#B0B0B0", "#D4C8A0"];

export default function ResultsColumn({ scenario, currency, scenarios, activeId }: ResultsColumnProps) {
  const calc = calcScenario(scenario);
  const { isUnlocked, unlock } = useEmailGate();
  const fmtC = (n: number) => formatCurrency(n, currency, scenario.fx_rate);
  const [growthOn, setGrowthOn] = useState(false);
  const [growthRate, setGrowthRate] = useState(3);
  

  // Summary rows
  const summaryRows = [
    { label: "Base Salary", value: calc.base },
    { label: "Bonus", value: calc.variable },
    { label: "Equity (Year 1)", value: calc.equityY1 },
    { label: "Primary OTE", value: calc.ote, bold: false },
    { label: "Sign-on", value: calc.signon },
    { label: "Benefits", value: calc.benefits },
    { label: "Holiday", value: calc.holiday },
    { label: "Year 1 Total", value: calc.year1Total, bold: true },
    { label: "Annual Recurring", value: calc.annualRecurring, bold: true },
  ];

  // Pie data
  const pieData = [
    { name: "Base", value: calc.base },
    { name: "Bonus", value: calc.variable },
    { name: "Equity Y1", value: calc.equityY1 },
    { name: "Sign-on", value: calc.signon },
    { name: "Benefits", value: calc.benefits },
    { name: "Holiday", value: calc.holiday },
  ].filter((d) => d.value > 0);

  // Bar chart data
  const barData = calc.years.map((y) => {
    const g = growthOn ? Math.pow(1 + growthRate / 100, y.year - 1) : 1;
    return {
      name: `Year ${y.year}`,
      Base: Math.round(y.base * g),
      Bonus: Math.round(y.variable * g),
      Equity: Math.round(y.equity),
      "Sign-on": Math.round(y.signon),
      Benefits: Math.round(y.benefits),
      Holiday: Math.round(y.holiday),
    };
  });


  return (
    <div className="space-y-6">
      {/* Card 1: Summary Panel — always visible */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 print:border-0 print:p-0">
        <h3 className="font-heading text-lg font-bold text-foreground mb-4">Compensation Summary</h3>
        <div className="space-y-2">
          {summaryRows.map((row) => (
            <div key={row.label} className={`flex justify-between py-1 ${row.bold ? "border-t border-border pt-2 mt-2" : ""}`}>
              <span className={`text-sm ${row.bold ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{row.label}</span>
              <span className={`text-sm ${row.bold ? "font-bold text-foreground" : "text-foreground"}`}>{fmtC(row.value)}</span>
            </div>
          ))}
        </div>

        {/* Delta */}
          <div className="mt-6 pt-5 border-t border-border">
            <div className={`rounded-xl px-5 py-4 text-center ${calc.deltaAbs >= 0 ? "bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/40" : "bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/40"}`}>
              <p className={`text-3xl font-bold font-heading tracking-tight ${calc.deltaAbs >= 0 ? "text-green-700 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                {formatPct(calc.deltaPct)}
              </p>
              <p className={`text-sm font-medium mt-1 ${calc.deltaAbs >= 0 ? "text-green-600/80 dark:text-green-400/70" : "text-red-500/80 dark:text-red-400/70"}`}>
                {fmtC(Math.abs(calc.deltaAbs))} {calc.deltaAbs >= 0 ? "more" : "less"} per year
              </p>
            </div>
          </div>

      </div>

      {/* Card 2: Pie Chart + 4-Year Projection — only shown when unlocked */}
      {isUnlocked && <div className="space-y-6">
          {/* Pie Chart */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Compensation Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    strokeWidth={2}
                    stroke="#FBF7F0"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => fmtC(value)}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "12px", fontSize: "13px", padding: "10px 14px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    wrapperStyle={{ fontSize: "12px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Multi-Year Projection */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-4">Multi-Year Projection</h3>
            <div className="h-[400px] md:h-[480px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={{ stroke: "hsl(var(--border))" }} tickLine={false} />
                  <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={48} />
                  <Tooltip
                    formatter={(value: number) => fmtC(value)}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "12px",
                      fontSize: "13px",
                      padding: "10px 14px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                    cursor={{ fill: "hsl(var(--muted) / 0.3)" }}
                  />
                  <Legend wrapperStyle={{ fontSize: "13px", paddingTop: "12px" }} iconType="circle" iconSize={10} />
                  <Bar dataKey="Base" stackId="a" fill="#1B3A2F" />
                  <Bar dataKey="Bonus" stackId="a" fill="#C9A961" />
                  <Bar dataKey="Equity" stackId="a" fill="#3D7A5F" />
                  <Bar dataKey="Sign-on" stackId="a" fill="#B0B0B0" />
                  <Bar dataKey="Benefits" stackId="a" fill="#D4C8A0" />
                  <Bar dataKey="Holiday" stackId="a" fill="#8B7355" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Year-by-year table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                     <th className="text-left py-2 pr-2 font-semibold text-foreground">Year</th>
                     <th className="text-right py-2 px-2 font-semibold text-foreground">Base</th>
                     <th className="text-right py-2 px-2 font-semibold text-foreground">Bonus</th>
                     <th className="text-right py-2 px-2 font-semibold text-foreground">Equity</th>
                     <th className="text-right py-2 px-2 font-semibold text-foreground">Sign-on</th>
                     <th className="text-right py-2 px-2 font-semibold text-foreground">Total</th>
                     {calc.hasCurrent && <th className="text-right py-2 pl-2 font-semibold text-foreground">vs Current</th>}
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
                           <td className={`py-2 pl-2 text-right font-semibold ${adjVs >= 0 ? "text-green-600" : "text-red-500"}`}>
                             {formatPct(adjVs)}
                           </td>
                         )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Growth toggle */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Switch checked={growthOn} onCheckedChange={setGrowthOn} />
                <Label className="text-xs cursor-pointer">What if comp grows over time?</Label>
              </div>
              {growthOn && (
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">Annual growth:</span>
                  <Slider value={[growthRate]} onValueChange={([v]) => setGrowthRate(v)} min={1} max={10} step={1} className="w-32" />
                  <span className="text-xs font-medium text-foreground">{growthRate}%</span>
                </div>
              )}
            </div>
          </div>

        </div>}

      {/* Scenario Comparison moved to parent for full-width layout */}

      {/* Coaching Upsell moved to parent for full-width layout */}
    </div>
  );
}
