import { useState } from "react";
import { Crown, ChevronUp, ChevronDown, TrendingUp } from "lucide-react";
import { OfferData, OfferResults } from "./types";
import { formatCurrency } from "./CurrencyInput";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { EmailGateOverlay } from "@/components/EmailGateOverlay";

interface ResultsPanelProps {
  offers: OfferData[];
  results: OfferResults[];
  cascadeInsight: { bonusExtra: number; matchExtra: number; esppExtra: number; total: number } | null;
  mobileSelectedIndex: number;
  isUnlocked: boolean;
  onUnlock: (email: string) => void;
}

const OFFER_COLORS = ["hsl(var(--gold))", "hsl(var(--executive-green))", "hsl(153, 30%, 40%)"];

export function ResultsPanel({ offers, results, cascadeInsight, mobileSelectedIndex, isUnlocked, onUnlock }: ResultsPanelProps) {
  const [show4Year, setShow4Year] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  if (offers.length === 0) return null;

  const maxYear1 = Math.max(...results.map((r) => r.year1Total));
  const minYear1 = Math.min(...results.map((r) => r.year1Total));
  const bestIndex = results.findIndex((r) => r.year1Total === maxYear1);

  // 4-year chart data
  const chartData = [1, 2, 3, 4].map((year) => {
    const row: Record<string, string | number> = { year: `Year ${year}` };
    offers.forEach((o, i) => {
      const vals = [results[i].year1Total, results[i].year2Total, results[i].year3Total, results[i].year4Total];
      row[o.name || `Offer ${i + 1}`] = Math.round(vals[year - 1]);
    });
    return row;
  });

  // Mobile: collapsed bottom bar
  const mobileResult = results[mobileSelectedIndex];
  const mobileOffer = offers[mobileSelectedIndex];

  const fourYearContent = (
    <div className="space-y-4">
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} barCategoryGap="20%">
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={60} />
            <RechartsTooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            {offers.map((o, i) => (
              <Bar key={i} dataKey={o.name || `Offer ${i + 1}`} fill={OFFER_COLORS[i]} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-muted-foreground font-medium">Year</th>
              {offers.map((o, i) => (
                <th key={i} className="text-right py-2 text-muted-foreground font-medium">{o.name || `Offer ${i + 1}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((year) => (
              <tr key={year} className="border-b border-border">
                <td className="py-2 font-medium">Year {year}</td>
                {results.map((r, i) => {
                  const vals = [r.year1Total, r.year2Total, r.year3Total, r.year4Total];
                  return <td key={i} className="text-right py-2">{formatCurrency(vals[year - 1])}</td>;
                })}
              </tr>
            ))}
            <tr className="border-t-2 border-gold bg-gold/5">
              <td className="py-2 font-bold">4-Year Total</td>
              {results.map((r, i) => (
                <td key={i} className="text-right py-2 font-bold">{formatCurrency(r.fourYearTotal)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Results */}
      <div className="hidden md:block sticky bottom-0 z-40 bg-card border-t-2 border-gold shadow-[0_-4px_20px_rgba(0,0,0,0.1)] rounded-t-xl">
        <div className="max-w-[1200px] mx-auto px-6 py-5">
          {/* Toggle */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg text-foreground">Results</h3>
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setShow4Year(false)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${!show4Year ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                Year 1
              </button>
              <button
                onClick={() => setShow4Year(true)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${show4Year ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                4-Year Breakdown
              </button>
            </div>
          </div>

          {!show4Year ? (
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${offers.length}, 1fr)` }}>
              {offers.map((offer, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 border ${i === bestIndex && maxYear1 > 0 ? "border-gold bg-gold/5" : "border-border bg-muted/30"}`}
                  aria-live="polite"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-sm text-foreground truncate">{offer.name || `Offer ${i + 1}`}</span>
                    {i === bestIndex && maxYear1 > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-semibold">
                        <Crown className="w-3 h-3" /> Best
                      </span>
                    )}
                  </div>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(results[i].year1Total)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Year 1 Total</p>
                  <div className="mt-2 pt-2 border-t border-border grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Year 2+</span>
                      <p className="font-semibold text-foreground">{formatCurrency(results[i].year2Total)}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly</span>
                      <p className="font-semibold text-foreground">{formatCurrency(results[i].effectiveMonthly)}</p>
                    </div>
                  </div>
                  {offers.length > 1 && maxYear1 > 0 && results[i].year1Total !== minYear1 && (
                    <p className="text-xs text-green-600 font-medium mt-2">
                      +{formatCurrency(results[i].year1Total - minYear1)} vs lowest
                    </p>
                  )}
                  {offers.length > 1 && results[i].year1Total === minYear1 && maxYear1 > 0 && maxYear1 !== minYear1 && (
                    <p className="text-xs text-muted-foreground font-medium mt-2">Lowest</p>
                  )}
                  {/* Subtle coaching nudge */}
                  {offers.length > 1 && results[i].year1Total !== minYear1 && maxYear1 > 0 && (
                    <a
                      href="https://james.careers/#coaching"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-gold transition-colors mt-1 inline-block"
                    >
                      Want help negotiating this? →
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmailGateOverlay isUnlocked={isUnlocked} onUnlock={onUnlock}>
              {fourYearContent}
            </EmailGateOverlay>
          )}

          {/* Cascade Insight */}
          {cascadeInsight && !show4Year && (
            <div className="mt-4 bg-executive/5 rounded-lg p-4 border-l-4 border-executive">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-executive" />
                <p className="font-semibold text-sm text-executive">What if your base salary were $10,000 higher?</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div><span className="text-muted-foreground">Extra base</span><p className="font-semibold">+$10,000</p></div>
                {cascadeInsight.bonusExtra > 0 && (
                  <div><span className="text-muted-foreground">Extra bonus</span><p className="font-semibold">+{formatCurrency(cascadeInsight.bonusExtra)}</p></div>
                )}
                {cascadeInsight.matchExtra > 0 && (
                  <div><span className="text-muted-foreground">Extra 401(k)</span><p className="font-semibold">+{formatCurrency(cascadeInsight.matchExtra)}</p></div>
                )}
                <div><span className="text-muted-foreground">Total impact</span><p className="font-bold text-executive">= +{formatCurrency(cascadeInsight.total)}/year</p></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Results - Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        {mobileExpanded ? (
          <div className="bg-card border-t-2 border-gold shadow-[0_-4px_20px_rgba(0,0,0,0.15)] max-h-[80vh] overflow-y-auto rounded-t-xl">
            <button
              onClick={() => setMobileExpanded(false)}
              className="w-full flex items-center justify-center py-3 border-b border-border"
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="px-4 pb-6 space-y-3">
              {offers.map((offer, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-4 border ${i === bestIndex && maxYear1 > 0 ? "border-gold bg-gold/5" : "border-border"}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{offer.name || `Offer ${i + 1}`}</span>
                    {i === bestIndex && maxYear1 > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gold/20 text-gold text-xs font-semibold">
                        <Crown className="w-3 h-3" /> Best
                      </span>
                    )}
                  </div>
                  <p className="text-xl font-bold">{formatCurrency(results[i].year1Total)}</p>
                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    <span>Yr 2+: {formatCurrency(results[i].year2Total)}</span>
                    <span>Monthly: {formatCurrency(results[i].effectiveMonthly)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setMobileExpanded(true)}
            className="w-full bg-card border-t-2 border-gold shadow-[0_-4px_20px_rgba(0,0,0,0.15)] px-4 py-3 flex items-center justify-between"
          >
            <div className="text-left">
              <p className="text-xs text-muted-foreground">{mobileOffer?.name || "Offer"}, Year 1</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(mobileResult?.year1Total || 0)}</p>
            </div>
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>
    </>
  );
}
