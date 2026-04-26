import type { Scenario, Currency } from "./types";
import { calcScenario, formatCurrency, formatPct } from "./types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const STACK_COLORS = {
  Base: "#1B3A2F",
  Bonus: "#C9A961",
  Equity: "#3D7A5F",
  "Sign-on": "#B0B0B0",
  Benefits: "#D4C8A0",
};
const CURRENT_COLOR = "#9CA3AF";

interface Props {
  scenarios: Scenario[];
  activeId: string;
  currency: Currency;
  locale?: "en" | "zh-tw";
}

const METRICS_EN = [
  { label: "Base Salary", key: "base" as const },
  { label: "Variable / Bonus", key: "variable" as const },
  { label: "Equity (Year 1)", key: "equityY1" as const },
  { label: "Sign-on Bonus", key: "signon" as const },
  { label: "Benefits", key: "benefits" as const },
  { label: "Year 1 Total", key: "year1Total" as const, bold: true },
  { label: "Annual Recurring", key: "annualRecurring" as const, bold: true },
];

const METRICS_ZH = [
  { label: "底薪", key: "base" as const },
  { label: "獎金 / 變動薪", key: "variable" as const },
  { label: "股票（第一年）", key: "equityY1" as const },
  { label: "簽約獎金", key: "signon" as const },
  { label: "福利", key: "benefits" as const },
  { label: "第一年總計", key: "year1Total" as const, bold: true },
  { label: "年度經常性", key: "annualRecurring" as const, bold: true },
];

const CHART_METRICS_EN = ["Base", "Variable", "Equity Y1", "OTE", "Year 1"] as const;
const CHART_METRICS_ZH = ["底薪", "變動薪", "股票Y1", "OTE", "第一年"] as const;

export default function ScenarioComparison({ scenarios, activeId, currency, locale = "en" }: Props) {
  const isZh = locale === "zh-tw";
  const METRICS = isZh ? METRICS_ZH : METRICS_EN;
  const CHART_LABELS = isZh ? CHART_METRICS_ZH : CHART_METRICS_EN;
  const calcs = scenarios.map((s) => ({ scenario: s, calc: calcScenario(s) }));

  // Use active scenario as baseline
  const baselineCalc = calcs.find((c) => c.scenario.id === activeId)?.calc;

  // Include current comp as a virtual "scenario" if any scenario has it
  const activeCurrent = scenarios.find((s) => s.id === activeId);
  const hasCurrent = activeCurrent && activeCurrent.current_comp_twd > 0;

  const currentLabel = isZh ? "目前" : "Current";
  const baselineLabel = isZh ? "基準" : "Baseline";

  // Stacked bar chart data, one bar per scenario (+ current), stacked by component
  const stackedData: Record<string, string | number>[] = [];

  if (hasCurrent) {
    const cur = activeCurrent!;
    stackedData.push({
      name: currentLabel,
      Base: cur.current_base_twd,
      Bonus: cur.current_bonus_twd,
      Equity: cur.current_equity_twd,
      "Sign-on": 0,
      Benefits: 0,
    });
  }

  calcs.forEach(({ scenario, calc }) => {
    stackedData.push({
      name: scenario.name,
      Base: Math.round(calc.base),
      Bonus: Math.round(calc.variable),
      Equity: Math.round(calc.equityY1),
      "Sign-on": Math.round(calc.signon),
      Benefits: Math.round(calc.benefits),
    });
  });

  const fxRate = scenarios[0]?.fx_rate ?? 32;
  const fmtC = (n: number) => {
    if (!isZh) return formatCurrency(n, currency, fxRate);
    const converted = currency === "TWD" ? n : n / (fxRate || 1);
    const symbol = currency === "TWD" ? "NT$" : currency === "USD" ? "US$" : currency;
    const abs = Math.abs(converted);
    if (abs >= 100_000_000) return `${symbol}${(converted / 100_000_000).toFixed(2)}億`;
    if (abs >= 10_000) return `${symbol}${(converted / 10_000).toFixed(1)}萬`;
    return `${symbol}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Stacked Bar Chart */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">
          {isZh ? "Offer 比較" : "Offer Comparison"}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {isZh ? "各項薪酬組成一覽" : "Side-by-side breakdown of each compensation component"}
        </p>
        <div className="h-[400px] md:h-[480px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stackedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                width={48}
              />
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
              <Legend
                wrapperStyle={{ fontSize: "13px", paddingTop: "12px" }}
                iconType="circle"
                iconSize={10}
              />
              <Bar dataKey="Base" stackId="a" fill={STACK_COLORS.Base} />
              <Bar dataKey="Bonus" stackId="a" fill={STACK_COLORS.Bonus} />
              <Bar dataKey="Equity" stackId="a" fill={STACK_COLORS.Equity} />
              <Bar dataKey="Sign-on" stackId="a" fill={STACK_COLORS["Sign-on"]} />
              <Bar dataKey="Benefits" stackId="a" fill={STACK_COLORS.Benefits} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 overflow-x-auto">
        <h3 className="font-heading text-xl font-bold text-foreground mb-1">
          {isZh ? "詳細比較" : "Detailed Breakdown"}
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          {isZh ? "逐項比較各 offer 的薪酬差異" : "Line-by-line comparison with percentage differences"}
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-3 pr-4 font-semibold text-foreground text-xs uppercase tracking-wider">
                {isZh ? "項目" : "Component"}
              </th>
              {hasCurrent && (
                <th className="text-right py-3 px-4 font-semibold text-foreground text-xs uppercase tracking-wider">
                  {currentLabel}
                  <span className="ml-2 inline-block px-2 py-0.5 text-[10px] rounded-full bg-muted text-muted-foreground font-medium normal-case tracking-normal">
                    {baselineLabel}
                  </span>
                </th>
              )}
              {scenarios.map((s) => (
                <th key={s.id} className="text-right py-3 px-4 font-semibold text-foreground text-xs uppercase tracking-wider">
                  {s.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {METRICS.map(({ label, key, bold }, rowIdx) => {
              // Current comp values
              const currentVal = hasCurrent ? (
                key === "base" ? activeCurrent!.current_base_twd :
                key === "variable" ? activeCurrent!.current_bonus_twd :
                key === "equityY1" ? activeCurrent!.current_equity_twd :
                key === "signon" ? 0 :
                key === "benefits" ? 0 :
                activeCurrent!.current_comp_twd
              ) : 0;

              const isLastRow = rowIdx === METRICS.length - 1;
              const isTotalRow = bold;

              return (
                <tr
                  key={key}
                  className={`
                    ${isTotalRow ? "bg-muted/30" : ""}
                    ${isLastRow ? "" : "border-b border-border/40"}
                    ${isTotalRow ? "border-t-2 border-border" : ""}
                  `}
                >
                  <td className={`py-3.5 pr-4 ${bold ? "font-bold text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </td>
                  {hasCurrent && (
                    <td className="py-3.5 px-4 text-right">
                      <span className={`${bold ? "font-bold text-lg" : ""} text-foreground tabular-nums`}>
                        {fmtC(currentVal)}
                      </span>
                    </td>
                  )}
                  {calcs.map(({ scenario, calc }) => {
                    const val = calc[key] as number;
                    const baseVal = hasCurrent ? currentVal : (baselineCalc ? baselineCalc[key] as number : 0);
                    const isBaseline = !hasCurrent && scenario.id === activeId;
                    const delta = !isBaseline && baseVal > 0 ? (val - baseVal) / baseVal : 0;
                    const showDelta = !isBaseline && baseVal > 0 && Math.abs(delta) > 0.001;

                    return (
                      <td key={scenario.id} className="py-3.5 px-4 text-right">
                        <span className={`${bold ? "font-bold text-lg" : ""} text-foreground tabular-nums`}>
                          {fmtC(val)}
                        </span>
                        {showDelta && (
                          <span className={`ml-2 inline-block px-2 py-0.5 text-xs font-medium rounded-full ${
                            delta >= 0
                              ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
                              : "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
                          }`}>
                            {formatPct(delta)}
                          </span>
                        )}
                        {isBaseline && (
                          <span className="ml-2 inline-block px-2 py-0.5 text-[10px] rounded-full bg-muted text-muted-foreground font-medium">
                            {baselineLabel}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
