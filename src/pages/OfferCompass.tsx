import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Plus, Copy, Sparkles, Trash2, RotateCcw, ArrowRight, X, Send } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CURRENCY_OPTIONS } from "@/components/offer-compass/types";
import type { Currency } from "@/components/offer-compass/types";
import { useScenarios } from "@/hooks/useScenarios";
import { useDisplayCurrency } from "@/hooks/useDisplayCurrency";
import ScenarioInput from "@/components/offer-compass/ScenarioInput";
import ResultsColumn from "@/components/offer-compass/ResultsColumn";

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

  const { currency, setCurrency } = useDisplayCurrency();
  const [disclaimerVisible, setDisclaimerVisible] = useState(true);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const handleSendFeedback = () => {
    window.location.href = `mailto:james@james.careers?subject=Offer Calculator Feedback&body=${encodeURIComponent(feedbackText)}`;
    setFeedbackOpen(false);
    setFeedbackText("");
  };

  return (
    <>
      <Helmet>
        <title>Offer Calculator — Compensation Calculator | james.careers</title>
        <meta name="description" content="Compare foreign company offers and see your real Year 1-4 total compensation. Free calculator by james.careers." />
      </Helmet>

      <div className="min-h-screen bg-background">

        {/* ── Header Bar ── */}
        <header className="print:hidden" style={{ backgroundColor: "#1B3A2F" }}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="font-heading text-sm font-bold tracking-wide text-white/70 hover:text-white transition-colors">
                JAMES BUGDEN
              </Link>
              <span className="text-white/30">|</span>
              <h1 className="font-heading text-lg font-bold text-white">Offer Calculator</h1>
              <span className="hidden md:inline text-white/50 text-xs">Free tool · Built by a recruiter who's negotiated 750+ foreign company offers in Taiwan</span>
            </div>
            <LanguageToggle variant="nav" />
          </div>
        </header>


        {/* ── Scenario Bar — always visible ── */}
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
            <Button variant="outline" size="sm" onClick={() => loadExample("en")} className="h-9">
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {active && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              <div className="print:hidden">
                <ScenarioInput scenario={active} onChange={updateActive} currency={currency} onLoadExample={() => loadExample("en")} />
              </div>
              <div className="lg:sticky lg:top-6">
                <ResultsColumn scenario={active} currency={currency} scenarios={scenarios} activeId={activeId} />
              </div>
            </div>
          )}
        </div>

        {/* ── Print footer ── */}
        <div className="hidden print:block print:mt-12 print:text-center print:text-xs print:text-muted-foreground print:border-t print:border-border print:pt-4">
          <p>This document is for estimation only. james@james.careers · james.careers</p>
        </div>
      </div>

      {/* ── Feedback Modal ── */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Feedback</DialogTitle>
            <DialogDescription>Messages go to james@james.careers</DialogDescription>
          </DialogHeader>
          <Textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="What's on your mind?"
            rows={5}
          />
          <Button onClick={handleSendFeedback} disabled={!feedbackText.trim()} className="w-full">
            <Send className="w-4 h-4 mr-2" /> Send via Email
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
