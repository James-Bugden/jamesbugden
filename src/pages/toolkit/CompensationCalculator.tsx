import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check, ArrowRight, Calculator, TrendingUp, BarChart3, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { nativeShare } from "@/lib/share";
import ToolkitHeader from "@/components/toolkit/ToolkitHeader";
import ToolkitFooter from "@/components/toolkit/ToolkitFooter";
import ToolkitNav from "@/components/toolkit/ToolkitNav";
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { SEO } from "@/components/SEO";

const exampleOffers = [
  {
    name: "Growth Startup",
    base: 165000,
    bonus: 16500,
    signOn: 30000,
    rsuY1: 60000,
    retirement: 3300,
    espp: 0,
    stipends: 2000,
    healthCost: -2160,
    commuteCost: 0,
    year1: 274640,
    year2: 244640,
    highlight: false,
  },
  {
    name: "Public Tech Co",
    base: 155000,
    bonus: 23250,
    signOn: 60000,
    rsuY1: 16000,
    retirement: 9300,
    espp: 1500,
    stipends: 8000,
    healthCost: 0,
    commuteCost: -2400,
    year1: 270650,
    year2: 210650,
    highlight: true,
  },
  {
    name: "Current Job",
    base: 140000,
    bonus: 14000,
    signOn: 0,
    rsuY1: 20000,
    retirement: 2100,
    espp: 0,
    stipends: 0,
    healthCost: -3000,
    commuteCost: -1800,
    year1: 171300,
    year2: 171300,
    highlight: false,
  },
];

const fourYearData = [
  { year: "Year 1", "Growth Startup": 274640, "Public Tech Co": 270650, "Current Job": 171300 },
  { year: "Year 2", "Growth Startup": 244640, "Public Tech Co": 235650, "Current Job": 171300 },
  { year: "Year 3", "Growth Startup": 244640, "Public Tech Co": 299650, "Current Job": 171300 },
  { year: "Year 4", "Growth Startup": 244640, "Public Tech Co": 299650, "Current Job": 171300 },
];

const OFFER_COLORS = ["hsl(var(--gold))", "hsl(var(--executive-green))", "hsl(153, 30%, 40%)"];

function fmt(v: number): string {
  if (v === 0) return "$0";
  const abs = Math.abs(v);
  const sign = v < 0 ? "-" : "";
  if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(abs % 1000 === 0 ? 0 : 1)}K`;
  return `${sign}$${abs.toLocaleString()}`;
}

function fmtFull(v: number): string {
  return `$${Math.round(v).toLocaleString()}`;
}

const breakdownRows = [
  { label: "Base Salary", key: "base" },
  { label: "Performance Bonus", key: "bonus" },
  { label: "Sign-On Bonus", key: "signOn" },
  { label: "RSU (Year 1)", key: "rsuY1" },
  { label: "401(k) Match", key: "retirement" },
  { label: "ESPP Benefit", key: "espp" },
  { label: "Stipends & Perks", key: "stipends" },
  { label: "Health Insurance", key: "healthCost", subtract: true },
  { label: "Commute Cost", key: "commuteCost", subtract: true },
];

const howToUseSteps = [
  "Start with base salary and bonus — these two rows alone show the cash compensation difference.",
  "Expand Equity and Retirement if your offers include RSUs or 401(k) matching.",
  "Fill in Benefits last. Health insurance cost and commute reduce your take-home.",
  "Compare the Year 1 total first. Then check Year 2+ to see ongoing value.",
  "Use Copy Summary to save your comparison or paste it into your counteroffer notes.",
];

const CompensationCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const maxYear1 = Math.max(...exampleOffers.map((o) => o.year1));
  const bestIdx = exampleOffers.findIndex((o) => o.year1 === maxYear1);

  const shareUrl = async () => {
    const didShare = await nativeShare();
    if (!didShare) {
      setShared(true);
      toast({ title: "Link copied!", description: "Share it with anyone who needs it." });
      setTimeout(() => setShared(false), 2000);
    }
  };

  return (
      <div className="min-h-screen bg-background">
      <SEO />
      <ToolkitHeader />

      {/* Hero */}
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <Link to="/toolkit" className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            Total Annual Compensation Calculator
          </h1>
          <p className="text-lg text-cream-90">
            Your offer is more than the monthly number. Here is how to see the full picture.
          </p>
        </div>
      </section>

      <div className="pt-8"><ToolkitNav currentTemplate="calculator" /></div>

      {/* EXAMPLE SECTION — Visual cards */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-6">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Example: How to Calculate</h2>
            <p className="text-muted-foreground text-sm">Three real-world scenarios showing why total comp matters more than base salary.</p>
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
                      <Crown className="w-3 h-3" /> Best
                    </span>
                  )}
                </div>
                <p className="text-3xl font-bold text-foreground mb-1">{fmtFull(offer.year1)}</p>
                <p className="text-xs text-muted-foreground mb-3">Year 1 Total Compensation</p>
                <div className="pt-3 border-t border-border grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Year 2+</span>
                    <p className="font-semibold text-foreground">{fmtFull(offer.year2)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Monthly</span>
                    <p className="font-semibold text-foreground">{fmtFull(Math.round(offer.year1 / 12))}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Insight */}
          <div className="bg-gold/10 border-l-4 border-gold rounded-r-xl p-5 mb-6">
            <p className="text-sm text-foreground">
              <span className="font-semibold text-gold">Key Insight:</span> The Growth Startup's base is $10,000 higher than Public Tech Co, but after sign-on, RSU backloading, full health coverage, and 401(k) match — Public Tech Co wins by Year 3. Base salary alone never tells the full story.
            </p>
          </div>

          {/* 4-Year Chart */}
          <div className="bg-card rounded-xl border border-border p-5 mb-6">
            <h3 className="font-semibold text-foreground text-sm mb-4">4-Year Earnings Projection</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={fourYearData} barCategoryGap="20%">
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} width={55} />
                  <RechartsTooltip formatter={(value: number) => fmtFull(value)} />
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
              <h3 className="font-semibold text-foreground text-sm">Component Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">Component</th>
                    {exampleOffers.map((o, i) => (
                      <th key={i} className="text-right px-4 py-3 text-muted-foreground font-medium">{o.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {breakdownRows.map((row) => (
                    <tr key={row.key} className="border-b border-border">
                      <td className={`px-4 py-2.5 font-medium ${row.subtract ? "text-destructive" : "text-foreground"}`}>
                        {row.subtract && "− "}{row.label}
                      </td>
                      {exampleOffers.map((o, i) => {
                        const val = (o as any)[row.key] as number;
                        return (
                          <td key={i} className={`text-right px-4 py-2.5 ${val < 0 ? "text-destructive" : "text-foreground"}`}>
                            {val === 0 ? "—" : fmtFull(val)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gold bg-gold/5 font-bold">
                    <td className="px-4 py-3">Year 1 Total</td>
                    {exampleOffers.map((o, i) => (
                      <td key={i} className="text-right px-4 py-3">{fmtFull(o.year1)}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to Interactive Calculator (replaces blank template) */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 text-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-shadow duration-200">
            <div className="mx-auto w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
              <Calculator className="w-7 h-7 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
              Ready to calculate your own?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Enter your real numbers and compare up to 3 offers side by side. Every field updates totals in real time.
            </p>
            <div className="space-y-4 text-left max-w-sm mx-auto mb-8">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">See Year 1 total with sign-on, RSUs, benefits, and costs</p>
              </div>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">4-year projection shows which offer wins long term</p>
              </div>
            </div>
            <Link
              to="/toolkit/calculator-interactive"
              className="inline-flex min-h-12 px-8 py-3 items-center justify-center rounded-lg btn-gold text-base font-semibold gap-2"
            >
              Open Interactive Calculator <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-card rounded-xl p-6 shadow-premium border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">How to Use This</h3>
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
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={shareUrl} variant="outline" className="border-executive text-executive hover:bg-executive/10 px-6 py-3 h-auto">
            {shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
            {shared ? "Link Copied!" : "Share"}
          </Button>
        </div>
      </section>

      <ToolkitFooter />
    </div>
    </>
  );
};

export default CompensationCalculator;
