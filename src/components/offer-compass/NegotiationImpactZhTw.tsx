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

export default function NegotiationImpactZhTw({ currentComp, currency, fxRate }: Props) {
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

  const jobChangeYears = data.filter((_, i) => i > 0 && i % jobChangeEvery === 0).map((d) => d.year);

  const fmtWan = (n: number) => {
    const converted = currency === "TWD" ? n : n / (fxRate || 1);
    const symbol = currency === "TWD" ? "NT$" : currency === "USD" ? "US$" : currency;
    if (Math.abs(converted) >= 100_000_000) return `${symbol}${(converted / 100_000_000).toFixed(1)}億`;
    if (Math.abs(converted) >= 10_000) return `${symbol}${(converted / 10_000).toFixed(converted >= 1_000_000 ? 0 : 1)}萬`;
    return `${symbol}${new Intl.NumberFormat("zh-TW").format(Math.round(converted))}`;
  };

  const fmtK = (n: number) => {
    const converted = currency === "TWD" ? n : n / fxRate;
    if (converted >= 100_000_000) return `${(converted / 100_000_000).toFixed(1)}億`;
    if (converted >= 10_000) return `${Math.round(converted / 10_000)}萬`;
    return new Intl.NumberFormat("zh-TW").format(Math.round(converted));
  };

  const dataKey1 = viewMode === "cumulative" ? "acceptCum" : "accept";
  const dataKey2 = viewMode === "cumulative" ? "negotiateCum" : "negotiate";

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 print:hidden">
      <h3 className="font-heading text-lg font-bold text-foreground">你的下一次轉職</h3>
      <p className="text-sm text-muted-foreground mt-1 mb-6">
        談判下一份工作能多賺多少？
      </p>

      <div className="space-y-6 mb-8">
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-1">
            目前年薪 (TWD)
          </p>
          <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-4 py-3">
            <span className="text-sm text-muted-foreground">NT$</span>
            <Input
              type="number"
              value={salary}
              onChange={(e) => setSalary(parseFloat(e.target.value) || 0)}
              onFocus={(e) => e.target.select()}
              className="border-0 bg-transparent text-lg font-bold text-foreground p-0 h-auto focus-visible:ring-0"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">職涯長度</p>
            <span className="text-2xl font-bold text-foreground">{careerYears} <span className="text-sm font-normal text-muted-foreground">年</span></span>
          </div>
          <Slider value={[careerYears]} onValueChange={([v]) => setCareerYears(v)} min={5} max={30} step={1} />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">每隔幾年換工作</p>
            <span className="text-2xl font-bold text-foreground">{jobChangeEvery} <span className="text-sm font-normal text-muted-foreground">年</span></span>
          </div>
          <Slider value={[jobChangeEvery]} onValueChange={([v]) => setJobChangeEvery(v)} min={1} max={7} step={1} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">方案A</p>
          <p className="text-sm font-semibold text-foreground mb-2">接受第一個報價</p>
          <div className="flex items-center gap-2">
            <Input type="number" value={raiseA} onChange={(e) => setRaiseA(parseFloat(e.target.value) || 0)} onFocus={(e) => e.target.select()} className="h-10 text-center text-lg font-bold" />
            <span className="text-lg font-bold text-foreground">%</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">每次轉職加薪幅度</p>
        </div>
        <div className="border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 rounded-xl p-4">
          <p className="text-xs text-green-600 dark:text-green-400 mb-1">方案B</p>
          <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">策略性談判</p>
          <div className="flex items-center gap-2">
            <Input type="number" value={raiseB} onChange={(e) => setRaiseB(parseFloat(e.target.value) || 0)} onFocus={(e) => e.target.select()} className="h-10 text-center text-lg font-bold border-green-300 dark:border-green-700" />
            <span className="text-lg font-bold text-green-700 dark:text-green-400">%</span>
          </div>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2">每次轉職加薪幅度</p>
        </div>
      </div>

      <div className="inline-flex rounded-lg border border-border overflow-hidden mb-4">
        <button onClick={() => setViewMode("cumulative")} className={`px-4 py-2 text-xs font-medium transition-colors ${viewMode === "cumulative" ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:text-foreground"}`}>
          累計收入
        </button>
        <button onClick={() => setViewMode("annual")} className={`px-4 py-2 text-xs font-medium transition-colors ${viewMode === "annual" ? "bg-foreground text-background" : "bg-card text-muted-foreground hover:text-foreground"}`}>
          年薪
        </button>
      </div>

      <div className="h-72 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={fmtK} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(value: number) => fmtWan(value)} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }} />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Line type="monotone" dataKey={dataKey1} name="接受第一個報價" stroke="#B0B0B0" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey={dataKey2} name="策略性談判" stroke="#16a34a" strokeWidth={2.5} dot={false} />
            {jobChangeYears.map((yr) => {
              const row = data.find((d) => d.year === yr);
              if (!row) return null;
              return <ReferenceDot key={`dot-${yr}`} x={yr} y={row[dataKey2]} r={4} fill="#16a34a" stroke="#fff" strokeWidth={2} />;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="border border-border rounded-xl p-4">
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">接受第一個報價</p>
          <p className="text-xl font-bold text-foreground mt-1">{fmtWan(totalA)}</p>
          <p className="text-xs text-muted-foreground mt-1">{careerYears}年總計</p>
        </div>
        <div className="border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 rounded-xl p-4">
          <p className="text-xs font-semibold tracking-wide uppercase text-green-600 dark:text-green-400">策略性談判</p>
          <p className="text-xl font-bold text-green-700 dark:text-green-400 mt-1">{fmtWan(totalB)}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">{careerYears}年總計</p>
        </div>
      </div>

      <div className="border-2 border-green-500/30 bg-green-50/50 dark:bg-green-950/20 rounded-xl p-6 text-center mb-4">
        <p className="text-xs font-semibold tracking-wide uppercase text-green-600 dark:text-green-400 mb-2">總收入差距</p>
        <p className="text-3xl md:text-4xl font-bold text-green-700 dark:text-green-400">+{fmtWan(totalDiff)}</p>
        <p className="text-sm text-green-600/80 dark:text-green-400/70 mt-1">職涯中多賺 +{(diffPct * 100).toFixed(1)}%</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 rounded-xl p-4">
          <p className="text-xs text-muted-foreground">平均每月損失</p>
          <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">{fmtWan(monthlyDiff)}</p>
          <p className="text-xs text-red-500/70 dark:text-red-400/60 mt-1">每月未談判的損失</p>
        </div>
        <div className="bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-800/30 rounded-xl p-4">
          <p className="text-xs text-muted-foreground">{careerYears}年總損失</p>
          <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">{fmtWan(totalDiff)}</p>
          <p className="text-xs text-red-500/70 dark:text-red-400/60 mt-1">白白錯過的薪資</p>
        </div>
      </div>
    </div>
  );
}
