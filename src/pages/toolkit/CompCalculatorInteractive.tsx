import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check, RotateCcw, Plus, X, Info, Minus, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ToolkitHeader from "@/components/toolkit/ToolkitHeader";
import ToolkitFooter from "@/components/toolkit/ToolkitFooter";
import ToolkitNav from "@/components/toolkit/ToolkitNav";
import { CalculatorSection } from "@/components/toolkit/calculator/CalculatorSection";
import { CurrencyInput, PercentInput, formatCurrency } from "@/components/toolkit/calculator/CurrencyInput";
import { ResultsPanel } from "@/components/toolkit/calculator/ResultsPanel";
import { useCompCalculator } from "@/components/toolkit/calculator/useCompCalculator";
import { VESTING_SCHEDULES, OfferData } from "@/components/toolkit/calculator/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useEmailGate } from "@/hooks/useEmailGate";
import { EmailGateOverlay } from "@/components/EmailGateOverlay";
import { SEO } from "@/components/SEO";

function TipIcon({ text }: { text: string }) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <button type="button" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="More info">
          <HelpCircle className="w-4 h-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs">{text}</TooltipContent>
    </Tooltip>
  );
}

function RowLabel({ children, tip, isSubtracted }: { children: React.ReactNode; tip?: string; isSubtracted?: boolean }) {
  return (
      <div className="flex items-center gap-2 mb-2">
      {isSubtracted && <Minus className="w-3.5 h-3.5 text-destructive flex-shrink-0" />}
      <label className="text-sm font-medium text-foreground">{children}</label>
      {tip && <TipIcon text={tip} />}
    </div>
  );
}

/** Returns the visible offers and their real indices based on mobile/desktop */
function useVisibleOffers(offers: OfferData[], isMobile: boolean, mobileTab: number) {
  if (isMobile) {
    const idx = Math.min(mobileTab, offers.length - 1);
    return { visible: [offers[idx]], indices: [idx] };
  }
  return { visible: offers, indices: offers.map((_, i) => i) };
}

const hrQuestions = [
  "What is the target bonus percentage for this role?",
  "What was the average actual bonus payout last year?",
  "What is the total RSU grant value and vesting schedule?",
  "Does the company offer an ESPP? What is the discount?",
  "What is the 401(k) match structure?",
  "What is the employee cost for health insurance premiums?",
  "Is there a sign-on or relocation bonus?",
  "How many PTO days does this role receive?",
];

const howToUseSteps = [
  "Start with base salary and bonus. These two rows alone show the cash compensation difference.",
  "Expand Equity and Retirement if your offers include RSUs or 401(k) matching. These sections can change the winner.",
  "Fill in Benefits last. Health insurance cost and commute are real expenses that reduce your take-home.",
  "Compare the Year 1 total first. Then check Year 2+ to see the ongoing value after one-time payments disappear.",
  "Use the Copy Summary button to save your comparison or paste it into your counteroffer notes.",
];

const CompCalculatorInteractive = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { isUnlocked, unlock } = useEmailGate();
  const {
    offers,
    results,
    updateOffer,
    addOffer,
    removeOffer,
    resetAll,
    loadExample,
    exampleLoaded,
    cascadeInsight,
  } = useCompCalculator();

  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [mobileTab, setMobileTab] = useState(0);

  const { visible, indices } = useVisibleOffers(offers, isMobile, mobileTab);
  const colCount = visible.length;
  const gridCols = `repeat(${colCount}, 1fr)`;

  const copySummary = useCallback(() => {
    const lines = offers.map((o, i) => {
      const r = results[i];
      return `${o.name || `Offer ${i + 1}`}: Year 1 = ${formatCurrency(r.year1Total)} | Year 2+ = ${formatCurrency(r.year2Total)}`;
    });
    if (offers.length > 1) {
      const best = results.reduce((bi, r, i) => (r.year1Total > results[bi].year1Total ? i : bi), 0);
      const worst = results.reduce((bi, r, i) => (r.year1Total < results[bi].year1Total ? i : bi), 0);
      if (best !== worst) {
        const diff = results[best].year1Total - results[worst].year1Total;
        lines.push(`Difference: ${offers[best].name} pays ${formatCurrency(diff)} more in Year 1`);
      }
    }
    navigator.clipboard.writeText(`Total Compensation Comparison\n\n${lines.join("\n")}`);
    setCopied(true);
    toast({ title: "Copied!", description: "Summary copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  }, [offers, results, toast]);

  const shareUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    toast({ title: "Link copied!", description: "Share it with anyone." });
    setTimeout(() => setShared(false), 2000);
  }, [toast]);

  const activeOfferIndex = Math.min(mobileTab, offers.length - 1);

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      <SEO />
      <ToolkitHeader />

      {/* Hero */}
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-[1200px] text-center relative z-10">
          <Link to="/toolkit" className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-3">Offer Calculator</h1>
          <p className="text-lg text-cream-90 max-w-2xl mx-auto mb-2">Your offer is more than the base salary. See the full picture, compare offers, and find the real winner.</p>
          <p className="text-sm text-cream-70">Compare up to 3 offers. Every field updates totals in real time.</p>
        </div>
      </section>


      <div className="pt-8"><ToolkitNav currentTemplate="calculator" /></div>

      {/* Calculator */}
      <section className="px-5 md:px-6 pb-8">
        <div className="mx-auto max-w-[1200px]">
          {/* Action bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex gap-2">
              {!exampleLoaded && (
                <button onClick={loadExample} className="text-sm text-gold hover:underline">Load example data</button>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={copySummary} variant="outline" size="sm" className="h-9">
                {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                {copied ? "Copied!" : "Copy Summary"}
              </Button>
              <Button onClick={shareUrl} variant="outline" size="sm" className="h-9">
                {shared ? <Check className="w-4 h-4 mr-1" /> : <Share2 className="w-4 h-4 mr-1" />}
                Share
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 text-destructive border-destructive/30 hover:bg-destructive/10">
                    <RotateCcw className="w-4 h-4 mr-1" /> Reset
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset all inputs?</AlertDialogTitle>
                    <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={resetAll}>Reset All</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Example callout */}
          {exampleLoaded && (
            <div className="mb-6 bg-gold/10 border-l-4 border-gold rounded-r-xl p-4">
              <p className="text-sm text-foreground">
                <span className="font-semibold text-gold">Notice:</span> Offer B's base is $10,000 lower than Offer A, but Offer B wins in total compensation because of the sign-on, RSU backloading, full health coverage, and 401(k) match. Base salary alone never tells the full story.
              </p>
            </div>
          )}

          {/* Mobile tab bar */}
          {isMobile && (
            <div className="flex gap-1 bg-muted rounded-lg p-1 mb-6 overflow-x-auto">
              {offers.map((o, i) => (
                <button
                  key={i}
                  onClick={() => setMobileTab(i)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors min-w-0 truncate ${mobileTab === i ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
                >
                  {o.name || `Offer ${i + 1}`}
                </button>
              ))}
              {offers.length < 3 && (
                <button onClick={addOffer} className="px-3 py-2 text-sm text-gold font-medium rounded-md hover:bg-gold/10 transition-colors flex-shrink-0">
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Column headers (desktop) */}
          {!isMobile && (
            <div className="grid gap-3 mb-4" style={{ gridTemplateColumns: `200px ${gridCols}${offers.length < 3 ? " auto" : ""}` }}>
              <div />
              {offers.map((offer, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    value={offer.name}
                    onChange={(e) => updateOffer(i, { name: e.target.value })}
                    className="font-semibold text-sm bg-transparent border-b border-dashed border-border focus:border-gold focus:outline-none px-1 py-1 w-full"
                    placeholder={`Offer ${String.fromCharCode(65 + i)}`}
                  />
                  {offers.length > 1 && (
                    <button onClick={() => removeOffer(i)} className="text-muted-foreground hover:text-destructive transition-colors" aria-label="Remove offer">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              {offers.length < 3 && (
                <button onClick={addOffer} className="flex items-center gap-1 px-3 py-1 text-sm text-gold hover:bg-gold/10 rounded-lg transition-colors">
                  <Plus className="w-4 h-4" /> Add Offer
                </button>
              )}
            </div>
          )}

          {/* Sections */}
          <div className="space-y-4">
            {/* SECTION 1: CASH COMPENSATION */}
            <CalculatorSection title="Cash Compensation" description="Base salary, bonuses, and one-time payments" defaultOpen>
              {/* Base Salary */}
              <div>
                <RowLabel tip="Your fixed annual pay before taxes. This is the foundation. Bonuses, 401(k) match, and ESPP contributions are calculated from this number.">Annual Base Salary</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.baseSalary} onChange={(v) => updateOffer(indices[vi], { baseSalary: v })} placeholder="e.g. 150,000" isLarge ariaLabel={`Base salary for ${offer.name}`} />
                  ))}
                </div>
              </div>

              {/* Performance Bonus */}
              <div>
                <RowLabel tip="Annual target bonus. Usually 10-30% of base at large companies. Enter the target, not the maximum.">Performance Bonus</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    return (
                      <div key={i}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs ${offer.bonusMode === "percent" ? "text-foreground font-medium" : "text-muted-foreground"}`}>%</span>
                          <Switch checked={offer.bonusMode === "fixed"} onCheckedChange={(checked) => updateOffer(i, { bonusMode: checked ? "fixed" : "percent" })} />
                          <span className={`text-xs ${offer.bonusMode === "fixed" ? "text-foreground font-medium" : "text-muted-foreground"}`}>Fixed</span>
                        </div>
                        {offer.bonusMode === "percent" ? (
                          <div className="flex items-center gap-2">
                            <div className="w-24 flex-shrink-0">
                              <PercentInput value={offer.bonusPercent} onChange={(v) => updateOffer(i, { bonusPercent: v })} placeholder="15" max={200} ariaLabel={`Bonus % for ${offer.name}`} />
                            </div>
                            {offer.baseSalary > 0 && offer.bonusPercent > 0 && (
                              <span className="text-xs text-muted-foreground whitespace-nowrap">= {formatCurrency(offer.baseSalary * offer.bonusPercent / 100)}</span>
                            )}
                          </div>
                        ) : (
                          <CurrencyInput value={offer.bonusFixed} onChange={(v) => updateOffer(i, { bonusFixed: v })} placeholder="e.g. 25,000" ariaLabel={`Bonus for ${offer.name}`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sign-On Bonus */}
              <div>
                <RowLabel tip="One-time payment for joining. If paid across 2 years, enter Year 1 amount here.">Sign-On Bonus</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    return (
                      <div key={i}>
                        <CurrencyInput value={offer.signOnYear1} onChange={(v) => updateOffer(i, { signOnYear1: v })} placeholder="e.g. 30,000" disabled={offer.isCurrentJob} disabledPlaceholder="N/A" ariaLabel={`Sign-on for ${offer.name}`} />
                        {!offer.isCurrentJob && (
                          <>
                            {!offer.showYear2SignOn ? (
                              <button onClick={() => updateOffer(i, { showYear2SignOn: true })} className="text-xs text-gold hover:underline mt-1">+ Add Year 2 sign-on</button>
                            ) : (
                              <div className="mt-2">
                                <label className="text-xs text-muted-foreground">Year 2</label>
                                <CurrencyInput value={offer.signOnYear2} onChange={(v) => updateOffer(i, { signOnYear2: v })} placeholder="e.g. 15,000" ariaLabel={`Year 2 sign-on for ${offer.name}`} />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Relocation */}
              <div>
                <RowLabel tip="One-time payment to cover moving costs. Enter $0 if not relocating.">Relocation Bonus</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.relocation} onChange={(v) => updateOffer(indices[vi], { relocation: v })} placeholder="e.g. 10,000" disabled={offer.isCurrentJob} disabledPlaceholder="N/A" ariaLabel={`Relocation for ${offer.name}`} />
                  ))}
                </div>
              </div>
            </CalculatorSection>

            {/* SECTION 2: EQUITY */}
            <CalculatorSection title="Equity" description="RSUs, stock options, and employee stock purchase plans">
              {/* RSUs */}
              <div>
                <RowLabel tip="The total dollar value of your RSU grant. If given in shares, multiply shares × current stock price.">RSUs (Restricted Stock Units)</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    const vestPcts = offer.vestingSchedule === "Custom" ? offer.customVesting : VESTING_SCHEDULES[offer.vestingSchedule] || [25, 25, 25, 25];
                    return (
                      <div key={i} className="space-y-3">
                        {isMobile && <p className="text-xs text-muted-foreground font-medium">{offer.name}</p>}
                        <CurrencyInput value={offer.rsuGrant} onChange={(v) => updateOffer(i, { rsuGrant: v })} placeholder="e.g. 200,000" ariaLabel={`RSU grant for ${offer.name}`} />
                        <div>
                          <label className="text-xs text-muted-foreground">Vesting Schedule</label>
                          <select value={offer.vestingSchedule} onChange={(e) => updateOffer(i, { vestingSchedule: e.target.value })} className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                            {Object.keys(VESTING_SCHEDULES).map((key) => <option key={key} value={key}>{key}</option>)}
                          </select>
                        </div>
                        {offer.vestingSchedule === "Custom" && (
                          <div className="grid grid-cols-4 gap-2">
                            {[0, 1, 2, 3].map((yi) => (
                              <div key={yi}>
                                <label className="text-xs text-muted-foreground">Yr {yi + 1}</label>
                                <PercentInput value={offer.customVesting[yi]} onChange={(v) => { const next = [...offer.customVesting] as [number, number, number, number]; next[yi] = v; updateOffer(i, { customVesting: next }); }} placeholder="25" />
                              </div>
                            ))}
                          </div>
                        )}
                        {offer.rsuGrant > 0 && (
                          <p className="text-xs text-muted-foreground">{vestPcts.map((p, yi) => `Yr${yi + 1}: ${formatCurrency(offer.rsuGrant * p / 100)}`).join(" | ")}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Stock Options */}
              <div>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    if (!offer.showStockOptions) {
                      return (
                        <button key={i} onClick={() => updateOffer(i, { showStockOptions: true })} className="text-sm text-gold hover:underline text-left">
                          + Add Stock Options{colCount > 1 ? ` (${offer.name})` : ""}
                        </button>
                      );
                    }
                    const annualVal = Math.max(0, ((offer.optionFMV - offer.optionStrike) * offer.optionShares) / (offer.optionVestingYears || 4));
                    const underwater = offer.optionStrike >= offer.optionFMV && offer.optionShares > 0;
                    return (
                      <div key={i} className="bg-muted/30 rounded-lg p-4 border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-medium">Stock Options{colCount > 1 ? ` (${offer.name})` : ""}</p>
                          <button onClick={() => updateOffer(i, { showStockOptions: false, optionShares: 0 })} className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><label className="text-xs text-muted-foreground">Shares</label><CurrencyInput value={offer.optionShares} onChange={(v) => updateOffer(i, { optionShares: v })} prefix="" placeholder="e.g. 10,000" /></div>
                          <div><label className="text-xs text-muted-foreground">Strike ($)</label><CurrencyInput value={offer.optionStrike} onChange={(v) => updateOffer(i, { optionStrike: v })} placeholder="e.g. 10" /></div>
                          <div><label className="text-xs text-muted-foreground">FMV ($)</label><CurrencyInput value={offer.optionFMV} onChange={(v) => updateOffer(i, { optionFMV: v })} placeholder="e.g. 25" /></div>
                          <div>
                            <label className="text-xs text-muted-foreground">Vesting</label>
                            <select value={offer.optionVestingYears} onChange={(e) => updateOffer(i, { optionVestingYears: Number(e.target.value) })} className="w-full h-12 rounded-lg border border-input bg-background px-3 text-sm"><option value={3}>3 years</option><option value={4}>4 years</option><option value={5}>5 years</option></select>
                          </div>
                        </div>
                        {underwater ? <p className="text-xs text-muted-foreground mt-2">Currently underwater ($0 value)</p> : annualVal > 0 ? <p className="text-xs text-gold mt-2">Annual value: {formatCurrency(annualVal)}</p> : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ESPP */}
              <div>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    if (!offer.showESPP) {
                      return <button key={i} onClick={() => updateOffer(i, { showESPP: true })} className="text-sm text-gold hover:underline text-left">+ Add ESPP{colCount > 1 ? ` (${offer.name})` : ""}</button>;
                    }
                    const benefit = offer.esppContribution * (offer.esppDiscount / 100);
                    return (
                      <div key={i} className="bg-muted/30 rounded-lg p-4 border border-border">
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-sm font-medium">ESPP{colCount > 1 ? ` (${offer.name})` : ""}</p>
                          <button onClick={() => updateOffer(i, { showESPP: false, esppContribution: 0 })} className="text-xs text-muted-foreground hover:text-destructive">Remove</button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div><label className="text-xs text-muted-foreground">Annual Contribution</label><CurrencyInput value={offer.esppContribution} onChange={(v) => updateOffer(i, { esppContribution: v })} placeholder="e.g. 10,000" /></div>
                          <div><label className="text-xs text-muted-foreground">Discount %</label><PercentInput value={offer.esppDiscount} onChange={(v) => updateOffer(i, { esppDiscount: v })} placeholder="15" max={25} /></div>
                        </div>
                        {benefit > 0 && <p className="text-xs text-gold mt-2">Annual ESPP benefit: {formatCurrency(benefit)}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CalculatorSection>

            {/* SECTION 3: RETIREMENT */}
            <CalculatorSection title="Retirement" description="Employer retirement contributions">
              <div>
                <RowLabel tip="What percentage of your contribution does the employer match? Common: 50% or 100%. Match Cap: employer matches up to this % of your salary (common: 3-6%).">401(k) / Retirement Employer Match</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    const annual = offer.baseSalary * (offer.matchCap / 100) * (offer.matchRate / 100);
                    return (
                      <div key={i}>
                        {isMobile && <p className="text-xs text-muted-foreground font-medium mb-1">{offer.name}</p>}
                        <div className="grid grid-cols-2 gap-2">
                          <div><label className="text-xs text-muted-foreground">Match Rate %</label><PercentInput value={offer.matchRate} onChange={(v) => updateOffer(i, { matchRate: v })} placeholder="50" /></div>
                          <div><label className="text-xs text-muted-foreground">Cap % of salary</label><PercentInput value={offer.matchCap} onChange={(v) => updateOffer(i, { matchCap: v })} placeholder="6" /></div>
                        </div>
                        {annual > 0 && <p className="text-xs text-muted-foreground mt-1">Employer contribution: {formatCurrency(annual)}/yr</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CalculatorSection>

            {/* SECTION 4: BENEFITS AND PERKS */}
            <CalculatorSection title="Benefits and Perks" description="Insurance, time off, commute, and other perks that affect your real take-home value">
              {/* Health Insurance */}
              <div>
                <RowLabel isSubtracted tip="Enter $0 if fully covered by employer. This amount is SUBTRACTED from your total since it is a cost to you.">Health Insurance (Monthly Cost)</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    return (
                      <div key={i}>
                        <CurrencyInput value={offer.healthInsuranceMonthly} onChange={(v) => updateOffer(i, { healthInsuranceMonthly: v })} placeholder="e.g. 200" ariaLabel={`Health cost for ${offer.name}`} />
                        {offer.healthInsuranceMonthly > 0 && <p className="text-xs text-destructive mt-1">Annual: -{formatCurrency(offer.healthInsuranceMonthly * 12)}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* PTO */}
              <div>
                <RowLabel tip="Total paid time off days per year. Does not include company holidays or sick leave.">PTO / Vacation Days</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    const ptoVal = offer.ptoDays * (offer.baseSalary / 260);
                    return (
                      <div key={i}>
                        <CurrencyInput value={offer.ptoDays} onChange={(v) => updateOffer(i, { ptoDays: v })} placeholder="e.g. 20" prefix="" ariaLabel={`PTO for ${offer.name}`} />
                        {offer.ptoDays > 0 && offer.baseSalary > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            <Info className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                            <p className="text-xs text-muted-foreground">Value: {formatCurrency(ptoVal)} (in base, not added)</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Commute */}
              <div>
                <RowLabel isSubtracted tip="Gas, transit, parking, tolls. Enter $0 if fully remote. SUBTRACTED from total.">Monthly Commute Cost</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => {
                    const i = indices[vi];
                    return (
                      <div key={i}>
                        <CurrencyInput value={offer.commuteMonthly} onChange={(v) => updateOffer(i, { commuteMonthly: v })} placeholder="e.g. 150" ariaLabel={`Commute for ${offer.name}`} />
                        {offer.commuteMonthly > 0 && <p className="text-xs text-destructive mt-1">Annual: -{formatCurrency(offer.commuteMonthly * 12)}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Other Stipends */}
              <div>
                <RowLabel tip="Combine all annual perks: wellness, learning, childcare, home office, gym, phone, etc.">Other Annual Stipends</RowLabel>
                <div className="grid gap-3" style={{ gridTemplateColumns: gridCols }}>
                  {visible.map((offer, vi) => (
                    <CurrencyInput key={indices[vi]} value={offer.otherStipends} onChange={(v) => updateOffer(indices[vi], { otherStipends: v })} placeholder="e.g. 5,000" ariaLabel={`Stipends for ${offer.name}`} />
                  ))}
                </div>
                <Collapsible>
                  <CollapsibleTrigger className="text-xs text-gold hover:underline mt-2 flex items-center gap-1">
                    Common stipends to include <ChevronDown className="w-3 h-3" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                    Wellness ($1-3K), Learning/training ($2-5K), Childcare ($3-10K), Home office ($500-2K), Phone/internet ($600-1.2K)
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CalculatorSection>
          </div>
        </div>
      </section>

      {/* Results Panel */}
      <ResultsPanel offers={offers} results={results} cascadeInsight={cascadeInsight} mobileSelectedIndex={activeOfferIndex} isUnlocked={isUnlocked} onUnlock={unlock} />

      {/* Coaching CTA */}
      <section className="px-5 md:px-6 py-8 print:hidden">
        <div className="mx-auto max-w-[1200px]">
          <div className="bg-foreground rounded-xl p-8 md:p-10">
            <div className="w-10 h-1 rounded-full bg-gold mb-5" />
            <h3 className="font-heading text-xl md:text-2xl font-bold text-background mb-3">
              Most candidates leave 10–20% on the table.
            </h3>
            <p className="text-muted mb-6 text-sm md:text-base max-w-xl">
              I've helped professionals at Google, Uber, and Meta negotiate better offers. If you're comparing packages, I can tell you what's realistic — and what to push back on.
            </p>
            <a
              href="https://james.careers/#coaching"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 px-6 items-center justify-center rounded-lg font-semibold text-sm transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: "#C9A961", color: "#1B3A2F" }}
            >
              Book a Free Strategy Call
            </a>
            <p className="mt-3">
              <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-gold transition-colors">
                Or explore → james.careers
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Reference Sections */}
      <section className="px-5 md:px-6 py-8">
        <div className="mx-auto max-w-[1200px] space-y-4">
          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between bg-card rounded-xl px-6 py-4 border border-border hover:bg-muted/50 transition-colors">
              <span className="font-semibold text-foreground">What to Ask HR</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-card rounded-b-xl border border-t-0 border-border px-6 py-4">
              <ol className="space-y-2">
                {hrQuestions.map((q, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    "{q}"
                  </li>
                ))}
              </ol>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between bg-card rounded-xl px-6 py-4 border border-border hover:bg-muted/50 transition-colors">
              <span className="font-semibold text-foreground">How to Use This</span>
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-card rounded-b-xl border border-t-0 border-border px-6 py-4">
              <ol className="space-y-2">
                {howToUseSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full bg-executive/20 text-executive text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </section>

      <ToolkitFooter />
    </div>
  );
};

export default CompCalculatorInteractive;