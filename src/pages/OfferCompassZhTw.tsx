import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Plus, Copy, Sparkles, Trash2, RotateCcw, ArrowRight, Send } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CURRENCY_OPTIONS } from "@/components/offer-compass/types";
import type { Currency } from "@/components/offer-compass/types";
import { useScenarios } from "@/hooks/useScenarios";
import { useDisplayCurrency } from "@/hooks/useDisplayCurrency";
import ScenarioInputZhTw from "@/components/offer-compass/ScenarioInputZhTw";
import ResultsColumnZhTw from "@/components/offer-compass/ResultsColumnZhTw";

export default function OfferCompassZhTw() {
  const {
    scenarios, activeId, active, setActiveId, updateActive,
    addScenario, duplicateActive, loadExample, clearActive, deleteActive,
  } = useScenarios();

  const { currency, setCurrency } = useDisplayCurrency();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");

  const handleSendFeedback = () => {
    window.location.href = `mailto:james@james.careers?subject=Offer Calculator 意見回饋&body=${encodeURIComponent(feedbackText)}`;
    setFeedbackOpen(false);
    setFeedbackText("");
  };

  return (
    <>
      <Helmet>
        <title>Offer 計算機 — 薪酬計算器 | james.careers</title>
        <meta name="description" content="比較外商公司 Offer，看清你的第1-4年總薪酬。james.careers 免費工具。" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <header className="print:hidden" style={{ backgroundColor: "#1B3A2F" }}>
          <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/zh-tw" className="font-heading text-sm font-bold tracking-wide text-white/70 hover:text-white transition-colors">
                JAMES BUGDEN
              </Link>
              <span className="text-white/30">|</span>
              <h1 className="font-heading text-lg font-bold text-white">Offer 計算機</h1>
              <span className="hidden md:inline text-white/50 text-xs">免費工具 · 由在台灣談判過 750+ 外商 Offer 的獵頭打造</span>
            </div>
            <LanguageToggle variant="nav" />
          </div>
        </header>

        <div className="print:hidden border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-wrap items-center gap-2">
            {scenarios.length > 1 && (
              <Select value={activeId} onValueChange={setActiveId}>
                <SelectTrigger className="w-48 h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {scenarios.map((s) => (<SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>))}
                </SelectContent>
              </Select>
            )}

            <Button variant="outline" size="sm" onClick={() => addScenario()} className="h-9">
              <Plus className="w-3.5 h-3.5 mr-1" /> 新增 Offer
            </Button>
            {scenarios.length > 1 && (
              <Button variant="outline" size="sm" onClick={duplicateActive} className="h-9">
                <Copy className="w-3.5 h-3.5 mr-1" /> 複製
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={() => loadExample("zh-tw")} className="h-9">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> 範例
            </Button>

            <Select value={currency} onValueChange={(v) => setCurrency(v as Currency)}>
              <SelectTrigger className="w-32 h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-card z-50">
                {CURRENCY_OPTIONS.map((c) => (<SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>))}
              </SelectContent>
            </Select>

            <div className="flex-1" />

            <Button variant="ghost" size="sm" onClick={clearActive} className="h-9 text-muted-foreground">
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> 清除
            </Button>
            {scenarios.length > 1 && (
              <Button variant="ghost" size="sm" onClick={deleteActive} className="h-9 text-destructive hover:text-destructive">
                <Trash2 className="w-3.5 h-3.5 mr-1" /> 刪除
              </Button>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          {active && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              <div className="print:hidden">
                <ScenarioInputZhTw scenario={active} onChange={updateActive} currency={currency} onLoadExample={() => loadExample("zh-tw")} />
              </div>
              <div className="lg:sticky lg:top-6">
                <ResultsColumnZhTw scenario={active} currency={currency} scenarios={scenarios} activeId={activeId} />
              </div>
            </div>
          )}
        </div>

        <div className="hidden print:block print:mt-12 print:text-center print:text-xs print:text-muted-foreground print:border-t print:border-border print:pt-4">
          <p>本文件僅供估算參考。james@james.careers · james.careers</p>
        </div>
      </div>

      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>意見回饋</DialogTitle>
            <DialogDescription>訊息將發送至 james@james.careers</DialogDescription>
          </DialogHeader>
          <Textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="你有什麼想法？" rows={5} />
          <Button onClick={handleSendFeedback} disabled={!feedbackText.trim()} className="w-full">
            <Send className="w-4 h-4 mr-2" /> 透過 Email 發送
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
