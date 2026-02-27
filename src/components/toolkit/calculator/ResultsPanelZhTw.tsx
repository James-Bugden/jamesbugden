import { useState } from "react";
import { Crown, ChevronUp, ChevronDown, TrendingUp } from "lucide-react";
import { OfferDataTw, OfferResultsTw } from "./types-tw";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from "recharts";
import { EmailGateOverlay } from "@/components/EmailGateOverlay";

function formatNTD(value: number): string {
  if (value === 0) return "NT$0";
  return `NT$${Math.round(value).toLocaleString("en-US")}`;
}

interface ResultsPanelZhTwProps {
  offers: OfferDataTw[];
  results: OfferResultsTw[];
  cascadeInsight: { guaranteedExtra: number; bonusExtra: number; laborExtra: number; total: number } | null;
  mobileSelectedIndex: number;
  isUnlocked: boolean;
  onUnlock: (email: string) => void;
}

const OFFER_COLORS = ["hsl(var(--gold))", "hsl(var(--executive-green))", "hsl(153, 30%, 40%)"];

export function ResultsPanelZhTw({ offers, results, cascadeInsight, mobileSelectedIndex, isUnlocked, onUnlock }: ResultsPanelZhTwProps) {
  const [show4Year, setShow4Year] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  if (offers.length === 0) return null;

  const maxYear1 = Math.max(...results.map((r) => r.year1Total));
  const minYear1 = Math.min(...results.map((r) => r.year1Total));
  const bestIndex = results.findIndex((r) => r.year1Total === maxYear1);

  const chartData = [1, 2, 3, 4].map((year) => {
    const row: Record<string, string | number> = { year: `第${year}年` };
    offers.forEach((o, i) => {
      const vals = [results[i].year1Total, results[i].year2Total, results[i].year3Total, results[i].year4Total];
      row[o.name || `Offer ${i + 1}`] = Math.round(vals[year - 1]);
    });
    return row;
  });

  const mobileResult = results[mobileSelectedIndex];
  const mobileOffer = offers[mobileSelectedIndex];

  return (
    <>
      {/* Desktop Results */}
      <div className="hidden md:block sticky bottom-0 z-40 bg-card border-t-2 border-gold shadow-[0_-4px_20px_rgba(0,0,0,0.1)] rounded-t-xl">
        <div className="max-w-[1200px] mx-auto px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-lg text-foreground">比較結果</h3>
            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setShow4Year(false)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${!show4Year ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                第一年
              </button>
              <button
                onClick={() => setShow4Year(true)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${show4Year ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
              >
                四年明細
              </button>
            </div>
          </div>

          {!show4Year ? (
            <>
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
                          <Crown className="w-3 h-3" /> 最佳
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-foreground">{formatNTD(results[i].year1Total)}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">第一年總薪酬</p>
                    <div className="mt-2 pt-2 border-t border-border grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">第二年起</span>
                        <p className="font-semibold text-foreground">{formatNTD(results[i].year2Total)}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">每月等效</span>
                        <p className="font-semibold text-foreground">{formatNTD(results[i].effectiveMonthly)}</p>
                      </div>
                    </div>
                    {offers.length > 1 && maxYear1 > 0 && results[i].year1Total !== minYear1 && (
                      <p className="text-xs text-green-600 font-medium mt-2">
                        +{formatNTD(results[i].year1Total - minYear1)} 高於最低
                      </p>
                    )}
                    {offers.length > 1 && results[i].year1Total === minYear1 && maxYear1 > 0 && maxYear1 !== minYear1 && (
                      <p className="text-xs text-muted-foreground font-medium mt-2">最低</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmailGateOverlay
              isUnlocked={isUnlocked}
              onUnlock={onUnlock}
              headline="解鎖完整分析"
              subtext="查看詳細薪酬分析和四年預估。"
              signInText="登入"
              createAccountText="建立免費帳號"
              orEmailText="或僅使用 Email 繼續"
            >
              <div className="space-y-4">
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barCategoryGap="20%">
                      <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} width={60} />
                      <RechartsTooltip formatter={(value: number) => formatNTD(value)} />
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
                        <th className="text-left py-2 text-muted-foreground font-medium">年度</th>
                        {offers.map((o, i) => (
                          <th key={i} className="text-right py-2 text-muted-foreground font-medium">{o.name || `Offer ${i + 1}`}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((year) => (
                        <tr key={year} className="border-b border-border">
                          <td className="py-2 font-medium">第{year}年</td>
                          {results.map((r, i) => {
                            const vals = [r.year1Total, r.year2Total, r.year3Total, r.year4Total];
                            return <td key={i} className="text-right py-2">{formatNTD(vals[year - 1])}</td>;
                          })}
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gold bg-gold/5">
                        <td className="py-2 font-bold">四年合計</td>
                        {results.map((r, i) => (
                          <td key={i} className="text-right py-2 font-bold">{formatNTD(r.fourYearTotal)}</td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </EmailGateOverlay>
          )}

          {/* Cascade Insight */}
          {cascadeInsight && !show4Year && (
            <div className="mt-4 bg-executive/5 rounded-lg p-4 border-l-4 border-executive">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-executive" />
                <p className="font-semibold text-sm text-executive">如果月薪多 NT$5,000？</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div><span className="text-muted-foreground">保障年薪增加</span><p className="font-semibold">+{formatNTD(cascadeInsight.guaranteedExtra)}</p></div>
                {cascadeInsight.bonusExtra > 0 && (
                  <div><span className="text-muted-foreground">績效獎金增加</span><p className="font-semibold">+{formatNTD(cascadeInsight.bonusExtra)}</p></div>
                )}
                
                <div><span className="text-muted-foreground">年度總影響</span><p className="font-bold text-executive">= +{formatNTD(cascadeInsight.total)}/年</p></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Results */}
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
                        <Crown className="w-3 h-3" /> 最佳
                      </span>
                    )}
                  </div>
                  <p className="text-xl font-bold">{formatNTD(results[i].year1Total)}</p>
                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    <span>第二年起: {formatNTD(results[i].year2Total)}</span>
                    <span>月薪等效: {formatNTD(results[i].effectiveMonthly)}</span>
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
              <p className="text-xs text-muted-foreground">{mobileOffer?.name || "Offer"} — 第一年</p>
              <p className="text-lg font-bold text-foreground">{formatNTD(mobileResult?.year1Total || 0)}</p>
            </div>
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>
    </>
  );
}
