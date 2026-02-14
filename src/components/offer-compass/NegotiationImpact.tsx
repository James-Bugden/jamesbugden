import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import type { Currency } from "./types";
import { formatCurrency } from "./types";
import { Slider } from "@/components/ui/slider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";

interface Props {
  currentComp?: number;
  currency: Currency;
  fxRate: number;
}

export default function NegotiationImpact({ currentComp, currency, fxRate }: Props) {
  const [salary, setSalary] = useState(currentComp || 1100000);
  const [careerYears, setCareerYears] = useState(16);
  const [jobChangeEvery, setJobChangeEvery] = useState(3);
  const [raiseA, setRaiseA] = useState(15);
  const [raiseB, setRaiseB] = useState(30);
  const [viewMode, setViewMode] = useState<"cumulative" | "annual">("annual");

  const data = useMemo(() => {
    const rows: { year: number; accept: number; negotiate: number; acceptCum: number; negotiateCum: number }[] = [];
    let salA = salary;
    let salB = salary;
    let cumA = 0;
    let cumB = 0;

    for (let y = 1; y <= careerYears; y++) {
      if (y > 1 && (y - 1) % jobChangeEvery === 0) {
        salA *= 1 + raiseA / 100;
        salB *= 1 + raiseB / 100;
      }
      cumA += salA;
      cumB += salB;
      rows.push({
        year: y,
        accept: Math.round(salA),
        negotiate: Math.round(salB),
        acceptCum: Math.round(cumA),
        negotiateCum: Math.round(cumB),
      });
    }
    return rows;
  }, [salary, careerYears, jobChangeEvery, raiseA, raiseB]);

  const lastRow = data[data.length - 1];
  const totalA = lastRow?.acceptCum ?? 0;
  const totalB = lastRow?.negotiateCum ?? 0;
  const totalDiff = totalB - totalA;
  const diffPct = totalA > 0 ? totalDiff / totalA : 0;
  const monthlyDiff = totalDiff / (careerYears * 12);

  // Find job change years for reference dots
  const jobChangeYears = data.filter((_, i) => i > 0 && i % jobChangeEvery === 0).map((d) => d.year);

  const fmtCurrency = (n: number) => formatCurrency(n, currency, fxRate);

  const fmtK = (n: number) => {
    const converted = currency === "TWD" ? n : n / fxRate;
    if (converted >= 1_000_000) return `${(converted / 1_000_000).toFixed(1)}M`;
    return `${Math.round(converted / 1_000)}K`;
  };

  const dataKey1 = viewMode === "cumulative" ? "acceptCum" : "accept";
  const dataKey2 = viewMode === "cumulative" ? "negotiateCum" : "negotiate";

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 print:hidden">
      <h3 className="font-heading text-lg font-bold text-foreground">Your Next Job Change</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-6">
        How much more could you earn by negotiating your next offer?
      </p>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        {/* Salary input */}
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">
            Current Annual Salary (TWD)
          </p>
          <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-3">
            <span className="text-sm text-muted-foreground">NT$</span>
            <Input
              type="number"
              value={salary}
              onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
              className="border-0 bg-transparent text-lg font-bold text-foreground p-0 h-auto focus-visible:ring-0"
            />
          </div>
        </div>

        {/* Career length slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Career Length
            </p>
            <span className="text-2xl font-bold text-foreground">{careerYears} <span className="text-sm font-normal text-muted-foreground">years</span></span>
          </div>
          <Slider value={[careerYears]} onValueChange={([v]) => setCareerYears(v)} min={5} max={30} step={1} />
        </div>

        {/* Job change frequency slider */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
              Change Jobs Every
            </p>
            <span className="text-2xl font-bold text-foreground">{jobChangeEvery} <span className="text-sm font-normal text-muted-foreground">years</span></span>
          </div>
          <Slider value={[jobChangeEvery]} onValueChange={([v]) => setJobChangeEvery(v)} min={1} max={7} step={1} />
        </div>
      </div>

      {/* Two scenario cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Scenario A</p>
          <p className="text-sm font-semibold text-foreground mb-2">Accept First Offer</p>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={raiseA}
              onChange={(e) => setRaiseA(parseFloat(e.target.value) || 0)}
              className="h-10 text-center text-lg font-bold"
            />
            <span className="text-lg font-bold text-foreground">%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">raise per job change</p>
        </div>
        <div className="border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 rounded-xl p-4">
          <p className="text-xs text-green-600 dark:text-green-400 mb-1">Scenario B</p>
          <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">Negotiate Strategically</p>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={raiseB}
              onChange={(e) => setRaiseB(parseFloat(e.target.value) || 0)}
              className="h-10 text-center text-lg font-bold border-green-300 dark:border-green-700"
            />
            <span className="text-lg font-bold text-green-700 dark:text-green-400">%</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">raise per job change</p>
        </div>
      </div>

      {/* View toggle */}
      <div className="inline-flex rounded-lg border border-border overflow-hidden mb-4">
        <button
          onClick={() => setViewMode("cumulative")}
          className={`px-4 py-2 text-xs font-medium transition-colors ${viewMode === "cumulative" ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:text-foreground"}`}
        >
          Cumulative Earnings
        </button>
        <button
          onClick={() => setViewMode("annual")}
          className={`px-4 py-2 text-xs font-medium transition-colors ${viewMode === "annual" ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:text-foreground"}`}
        >
          Annual Salary
        </button>
      </div>

      {/* Line chart */}
      <div className="h-72 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={fmtK} tick={{ fontSize: 11 }} />
            <Tooltip
              formatter={(value: number) => fmtCurrency(value)}
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Line
              type="monotone"
              dataKey={dataKey1}
              name="Accept First Offer"
              stroke="#B0B0B0"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey={dataKey2}
              name="Negotiate Strategically"
              stroke="#16a34a"
              strokeWidth={2.5}
              dot={false}
            />
            {jobChangeYears.map((yr) => {
              const row = data.find((d) => d.year === yr);
              if (!row) return null;
              return (
                <ReferenceDot
                  key={`dot-${yr}`}
                  x={yr}
                  y={row[dataKey2]}
                  r={4}
                  fill="#16a34a"
                  stroke="#fff"
                  strokeWidth={2}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="border border-border rounded-xl p-4">
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Accept First Offer</p>
          <p className="text-xl font-bold text-foreground mt-1">{fmtCurrency(totalA)}</p>
          <p className="text-xs text-muted-foreground mt-1">Total over {careerYears} years</p>
        </div>
        <div className="border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 rounded-xl p-4">
          <p className="text-xs font-semibold tracking-wide uppercase text-green-600 dark:text-green-400">Negotiate Strategically</p>
          <p className="text-xl font-bold text-green-700 dark:text-green-400 mt-1">{fmtCurrency(totalB)}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">Total over {careerYears} years</p>
        </div>
      </div>

      {/* Total difference banner */}
      <div className="border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 rounded-xl p-6 text-center mb-4">
        <p className="text-xs font-semibold tracking-wide uppercase text-green-600 dark:text-green-400 mb-2">
          Total Earnings Difference
        </p>
        <p className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400">
          +{fmtCurrency(totalDiff)}
        </p>
        <p className="text-sm text-green-600/80 dark:text-green-400/70 mt-1">
          +{(diffPct * 100).toFixed(1)}% more over your career
        </p>
      </div>

      {/* Monthly / Total lost cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Avg. Monthly Income Lost</p>
          <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">{fmtCurrency(monthlyDiff)}</p>
          <p className="text-xs text-red-500/70 dark:text-red-400/60 mt-1">per month without negotiating</p>
        </div>
        <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 rounded-xl p-4">
          <p className="text-xs text-muted-foreground">Total Lost Over {careerYears} Years</p>
          <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">{fmtCurrency(totalDiff)}</p>
          <p className="text-xs text-red-500/70 dark:text-red-400/60 mt-1">left on the table</p>
        </div>
      </div>
    </div>
  );
}
