import { useState } from "react";
import { useEmailGate } from "@/hooks/useEmailGate";
import { EmailGateOverlay } from "@/components/EmailGateOverlay";
import { Link } from "react-router-dom";

import { Plus, Copy, Sparkles, Trash2, RotateCcw, ArrowRight, X } from "lucide-react";
import { trackEvent } from "@/lib/trackEvent";
import LanguageToggle from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FeedbackBox from "@/components/FeedbackBox";
import { CURRENCY_OPTIONS } from "@/components/offer-compass/types";
import type { Currency } from "@/components/offer-compass/types";
import { useScenarios } from "@/hooks/useScenarios";
import { useDisplayCurrency } from "@/hooks/useDisplayCurrency";
import ScenarioInput from "@/components/offer-compass/ScenarioInput";
import ResultsColumn from "@/components/offer-compass/ResultsColumn";
import ScenarioComparison from "@/components/offer-compass/ScenarioComparison";
import NegotiationImpact from "@/components/offer-compass/NegotiationImpact";
import { SEO } from "@/components/SEO";

export default function OfferCompass() {
  const {
    scenarios,
    activeId,
    active,
    setActiveId,
    updateActive,
    addScenario,
    duplicateActive,
    loadExample,
    clearActive,
    deleteActive,
  } = useScenarios();

  const { isUnlocked, unlock } = useEmailGate();

  const { currency, setCurrency } = useDisplayCurrency();
  const [disclaimerVisible, setDisclaimerVisible] = useState(true);

  return (
    <>
      <SEO />

      <div className="min-h-screen bg-background">

        {/* ── Header Bar ── */}
        <header className="print:hidden bg-executive-green">
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="font-heading text-sm font-bold tracking-wide text-white/70 hover:text-white transition-colors">
                hiresign
              </Link>
              <span className="text-white/30">|</span>
              <h1 className="font-heading text-lg font-bold text-white">Offer Calculator</h1>
              <span className="hidden md:inline text-white/50 text-xs">Free tool · Built by a recruiter who's negotiated 750+ offers</span>
            </div>
            <LanguageToggle variant="nav" />
          </div>
        </header>


        {/* ── Scenario Bar, always visible ── */}
        <div className="print:hidden border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-wrap items-center gap-2">
            {scenarios.length > 1 && (
              <Select value={activeId} onValueChange={setActiveId}>
                <SelectTrigger className="w-48 h-9 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Button variant="outline" size="sm" onClick={() => addScenario()} className="h-9">
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Offer
            </Button>
            {scenarios.length > 1 && (
              <Button variant="outline" size="sm" onClick={duplicateActive} className="h-9">
                <Copy className="w-3.5 h-3.5 mr-1" /> Duplicate
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => { loadExample("en"); trackEvent("calculator", "load_example"); }} className="h-9">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Example
            </Button>

            <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
              <SelectTrigger className="w-32 h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card z-50">
                {CURRENCY_OPTIONS.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex-1" />

            <Button variant="ghost" size="sm" onClick={clearActive} className="h-9 text-muted-foreground">
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Clear
            </Button>
            {scenarios.length > 1 && (
              <Button variant="ghost" size="sm" onClick={deleteActive} className="h-9 text-destructive hover:text-destructive">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Delete
              </Button>
            )}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8 space-y-8">
          {active && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
                <div className="print:hidden">
                  <ScenarioInput scenario={active} onChange={updateActive} currency={currency} onLoadExample={() => loadExample("en")} />
                </div>
                <div className="lg:sticky lg:top-6">
                  <ResultsColumn scenario={active} currency={currency} scenarios={scenarios} activeId={activeId} />
                </div>
              </div>

              {/* Single email gate for all detailed sections */}
              <EmailGateOverlay
                isUnlocked={isUnlocked}
                onUnlock={unlock}
                headline="Unlock Full Breakdown"
                subtext="Enter your email to see your compensation breakdown, 4-year projection, and scenario comparison."
              >
                <div className="space-y-8">
                  {/* Pie + Projection are inside ResultsColumn but now ungated there */}
                  
                  {/* Full-width Scenario Comparison */}
                  {(scenarios.length >= 2 || active.current_comp_twd > 0) && (
                    <ScenarioComparison scenarios={scenarios} activeId={activeId} currency={currency} />
                  )}

                  {/* Negotiation Impact */}
                  <div className="max-w-4xl mx-auto">
                    <NegotiationImpact currentComp={active.current_comp_twd || undefined} currency={currency} fxRate={active.fx_rate} />
                  </div>
                </div>
              </EmailGateOverlay>

              {/* Coaching Upsell */}
              <div className="max-w-4xl mx-auto rounded-2xl p-8 print:hidden bg-executive-green">
                <div className="w-10 h-1 rounded-full mb-4 bg-gold" />
                <h2 className="font-heading text-xl font-bold mb-3 text-cream">
                  Most candidates leave 10-20% on the table
                </h2>
                <p className="text-sm mb-6 leading-relaxed text-cream/70">
                  I've helped professionals at Google, Uber, and Meta negotiate better offers. If you are comparing packages, I can tell you what is realistic and what to push back on.
                </p>
                <a
                  href="https://james.careers/#coaching"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 px-6 items-center justify-center rounded-lg font-semibold text-sm transition-transform hover:scale-[1.02] bg-gold text-executive-green hover:bg-gold-dark hover:text-cream"
                  onClick={() => trackEvent("cta_click", "book_call")}
                >
                  Book a Free Strategy Call
                </a>
              </div>

              <FeedbackBox locale="en" />
            </>
          )}
        </div>

        {/* ── Print footer ── */}
        <div className="hidden print:block print:mt-12 print:text-center print:text-xs print:text-muted-foreground print:border-t print:border-border print:pt-4">
          <p>This document is for estimation only. james@jamesbugden.com · james.careers</p>
        </div>
      </div>

    </>
  );
}