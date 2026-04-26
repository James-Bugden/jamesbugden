import { useState } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/SiteHeader";
import { CURRENCY_OPTIONS } from "@/components/offer-compass/types";
import type { Currency } from "@/components/offer-compass/types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useScenarios } from "@/hooks/useScenarios";
import { useDisplayCurrency } from "@/hooks/useDisplayCurrency";
import { useEmailGate } from "@/hooks/useEmailGate";
import { EmailGateOverlay } from "@/components/EmailGateOverlay";
import { calcScenario, formatCurrency, formatPct } from "@/components/offer-compass/types";
import type { Scenario } from "@/components/offer-compass/types";

const COLORS = ["#1B3A2F", "#C9A961", "#3D7A5F", "#B06B3A", "#6B5B95"];

export default function OfferCompassCompare() {
  const { scenarios } = useScenarios();
  const { currency, setCurrency } = useDisplayCurrency();
  const { isUnlocked, unlock } = useEmailGate();

  const [baselineId, setBaselineId] = useState(scenarios[0]?.id ?? "");
  const baseline = scenarios.find((s) => s.id === baselineId);

  if (scenarios.length < 2) {
    return (
      <div className="min-h-screen bg-background">
        <Header currency={currency} setCurrency={setCurrency} />
        <div className="max-w-2xl mx-auto px-5 py-20 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Need at least 2 scenarios</h2>
          <p className="text-muted-foreground mb-6">
            Add at least 2 scenarios to compare. Go to the Calculator page to create more.
          </p>
          <Link to="/offer-calculator">
            <Button className="bg-gold hover:bg-gold/90 text-foreground">Go to Calculator</Button>
          </Link>
        </div>
      </div>
    );
  }

  const metrics = ["Base", "Variable", "Equity Y1", "OTE", "Year 1 Total"] as const;
  const calcs = scenarios.map((s) => ({ scenario: s, calc: calcScenario(s) }));

  const chartData = metrics.map((metric) => {
    const row: Record<string, string | number> = { metric };
    calcs.forEach(({ scenario, calc }) => {
      const val =
        metric === "Base" ? calc.base :
        metric === "Variable" ? calc.variable :
        metric === "Equity Y1" ? calc.equityY1 :
        metric === "OTE" ? calc.ote :
        calc.year1Total;
      row[scenario.name] = Math.round(val);
    });
    return row;
  });

  const tableMetrics = [
    { label: "Base", key: "base" as const },
    { label: "Variable / Bonus", key: "variable" as const },
    { label: "Equity (Year 1)", key: "equityY1" as const },
    { label: "OTE", key: "ote" as const },
    { label: "Sign-on", key: "signon" as const },
    { label: "Year 1 Total", key: "year1Total" as const },
    { label: "Annual Recurring", key: "annualRecurring" as const },
  ];

  const baseCalc = baseline ? calcScenario(baseline) : null;

  const content = (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">Baseline:</span>
        <Select value={baselineId} onValueChange={setBaselineId}>
          <SelectTrigger className="w-48 h-9 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {scenarios.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grouped Bar Chart */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <h3 className="font-heading text-lg font-bold text-foreground mb-4">Scenario Comparison</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
              <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => `${Math.round(v / 1000)}k`} tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value: number) => formatCurrency(value, currency, scenarios[0]?.fx_rate ?? 32)}
                contentStyle={{ backgroundColor: "#fff", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "13px" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              {scenarios.map((s, i) => (
                <Bar key={s.id} dataKey={s.name} fill={COLORS[i % COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8 overflow-x-auto">
        <h3 className="font-heading text-lg font-bold text-foreground mb-4">Detail Comparison</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 pr-4 font-semibold text-foreground">Metric</th>
              {scenarios.map((s) => (
                <th key={s.id} className="text-right py-2 px-3 font-semibold text-foreground">
                  {s.name}
                  {s.id === baselineId && (
                    <span className="ml-2 inline-block px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground">Baseline</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableMetrics.map(({ label, key }) => (
              <tr key={key} className="border-b border-border/50">
                <td className="py-2 pr-4 text-muted-foreground">{label}</td>
                {calcs.map(({ scenario, calc }) => {
                  const val = calc[key] as number;
                  const baseVal = baseCalc ? (baseCalc[key] as number) : 0;
                  const isBaseline = scenario.id === baselineId;
                  const delta = !isBaseline && baseVal > 0 ? (val - baseVal) / baseVal : 0;

                  return (
                    <td key={scenario.id} className="py-2 px-3 text-right">
                      <span className="text-foreground">{formatCurrency(val, currency, scenario.fx_rate)}</span>
                      {!isBaseline && baseVal > 0 && (
                        <span className={`ml-2 text-xs font-semibold ${delta >= 0 ? "text-executive-green" : "text-destructive"}`}>
                          {formatPct(delta)}
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <SEO />

      <div className="min-h-screen bg-background">
        <Header currency={currency} setCurrency={setCurrency} />

        {isUnlocked ? (
          content
        ) : (
          <EmailGateOverlay
            isUnlocked={false}
            onUnlock={unlock}
            headline="Unlock Scenario Comparison"
            subtext="Unlock scenario comparison to see how your offers stack up side by side."
          >
            {content}
          </EmailGateOverlay>
        )}
      </div>
    </>
  );
}

function Header({ currency, setCurrency }: { currency: Currency; setCurrency: (c: Currency) => void }) {
  return (
    <>
      <SEO />
      <SiteHeader
        variant="dark"
        lang="en"
        sticky
        breadcrumb="Compare Scenarios"
        backHref="/offer-calculator"
        backLabel="Back to Calculator"
        hideAuth
        rightSlot={
          <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
            <SelectTrigger className="w-32 h-9 text-sm bg-white/10 border-white/20 text-cream">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card z-50">
              {CURRENCY_OPTIONS.map((c) => (
                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />
    </>
  );
}