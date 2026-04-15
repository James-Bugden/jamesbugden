import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePrintUsage } from "@/hooks/usePrintUsage";
import { LimitReachedModal } from "@/components/LimitReachedModal";
import { nativeShare } from "@/lib/share";
import { trackEvent } from "@/lib/trackEvent";
import ToolkitHeader from "@/components/toolkit/ToolkitHeader";
import ToolkitFooter from "@/components/toolkit/ToolkitFooter";
import ToolkitNav from "@/components/toolkit/ToolkitNav";
import { SEO } from "@/components/SEO";

const exampleAchievements = [
  { achievement: "Led migration of legacy system to cloud infrastructure", impact: "Reduced server costs by 35% (NT$2.4M annual savings)" },
  { achievement: "Built automated testing pipeline for mobile team", impact: "Cut release cycle from 3 weeks to 5 days" },
  { achievement: "Mentored 3 junior engineers through onboarding", impact: "All 3 passed probation. One promoted within 8 months" },
  { achievement: "Delivered client-facing analytics dashboard", impact: "Adopted by 12 enterprise clients in first quarter" },
];

const exampleMarketData = {
  currentComp: "NT$78,000/month (annual TC ~NT$1.17M)",
  marketRange: "NT$85,000 to NT$110,000/month",
  source: "Glassdoor, LinkedIn Salary, Payscale",
  gap: "NT$7,000 to 32,000/month below market midpoint",
};

const exampleAsk = {
  primary: "Adjust monthly base to NT$92,000 (market midpoint)",
  alternative: "Promotion to Senior Engineer level (opens higher pay band)",
  fallback: "Guaranteed 3-month year-end bonus + NT$30,000 training budget + 3 additional PTO days",
};

const exampleTalkingPoints = {
  opening: "Over the past year, I led our cloud migration saving NT$2.4M per year, built the automated testing pipeline cutting release cycles by 70%, and mentored 3 junior engineers, all of whom passed probation.",
  data: "Based on Glassdoor and LinkedIn Salary, the market range for Senior Engineers in [city] with my experience is NT$85K to 110K/month. My current base of NT$78K falls below this range.",
  ask: "I'd like to discuss adjusting my pay to NT$92K/month to reflect my contributions and match market rates.",
  ifNo: "I understand. What specific milestones or goals would need to be met for a pay adjustment at the next review cycle? I'd like to make sure we're aligned.",
};

const tips = [
  "Bring a printed copy to the meeting. Do not read from it, but reference it.",
  "Send a follow-up email after the meeting. Summarize what was discussed and agreed.",
  "If your company has a rigid pay grade system, ask for a level/title promotion. This often opens a higher pay band entirely.",
  "Time it right: 1 to 2 months before annual reviews, right after a big win, or when your responsibilities have clearly grown.",
];

const RaiseOnePager = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const { gatedPrint: printPage, printLimitReached, printCount, printLimit } = usePrintUsage();
  const [showPrintLimitModal, setShowPrintLimitModal] = useState(false);

  const handlePrint = async () => {
    const ok = await printPage();
    if (!ok) setShowPrintLimitModal(true);
  };

  const copyTemplate = () => {
    const templateText = `RAISE REQUEST ONE-PAGER

KEY ACHIEVEMENTS (past 12 months)
Achievement | Impact / Metric
_________________________________ | _________________________________
_________________________________ | _________________________________
_________________________________ | _________________________________
_________________________________ | _________________________________

MARKET DATA
- My current pay: NT$________/month (annual TC ~NT$________)
- Market range for this role: NT$________ to NT$________/month
- Source: _________________________________
- Gap: NT$________/month below market

MY ASK
- Primary: ________________________________________________________________
- Alternative: ________________________________________________________________
- Fallback if salary frozen: ________________________________________________________________

TALKING POINTS
- Opening: "Over the past ________, I've ________________________________________________________________"
- Data: "Based on ________, the market range for ________ in ________ with my experience is NT$________ to ________/month."
- Ask: "I'd like to discuss adjusting my pay to NT$________/month to reflect ________________________________________________________________"
- If No: "I understand. What specific milestones would need to be met for a pay adjustment at the next review cycle?"`;

    navigator.clipboard.writeText(templateText);
    trackEvent("copy", "raise_onepager");
    setCopied(true);
    toast({ title: "Template copied!", description: "Paste it into a document and fill it in." });
    setTimeout(() => setCopied(false), 2000);
  };

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
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative print:hidden">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <Link 
            to="/toolkit" 
            className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            Raise Request One-Pager
          </h1>
          <p className="text-lg text-cream-90">
            Build your case on one page. Bring it to the meeting.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8 print:hidden">
        <ToolkitNav currentTemplate="raise" />
      </div>

      {/* Side-by-side Cards */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Example Card */}
            <div className="bg-muted rounded-xl overflow-hidden shadow-premium print:hidden">
              <div className="bg-executive px-6 py-3 flex items-center gap-2">
                <span className="bg-gold text-white text-xs font-bold px-2 py-1 rounded">📋 EXAMPLE</span>
              </div>
              <div className="p-6 space-y-6">
                {/* Achievements */}
                <div>
                  <p className="font-semibold text-foreground mb-3">KEY ACHIEVEMENTS (past 12 months)</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-muted-foreground">Achievement</th>
                        <th className="text-left py-2 text-muted-foreground">Impact / Metric</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exampleAchievements.map((item, index) => (
                        <tr key={index} className="border-b border-border">
                          <td className="py-2 text-foreground">{item.achievement}</td>
                          <td className="py-2 text-foreground">{item.impact}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Market Data */}
                <div>
                  <p className="font-semibold text-foreground mb-3">MARKET DATA</p>
                  <ul className="text-sm space-y-1">
                    <li className="text-foreground">• My current pay: {exampleMarketData.currentComp}</li>
                    <li className="text-foreground">• Market range for this role: {exampleMarketData.marketRange}</li>
                    <li className="text-foreground">• Source: {exampleMarketData.source}</li>
                    <li className="text-foreground">• Gap: {exampleMarketData.gap}</li>
                  </ul>
                </div>

                {/* My Ask */}
                <div>
                  <p className="font-semibold text-foreground mb-3">MY ASK</p>
                  <ul className="text-sm space-y-1">
                    <li className="text-foreground">• Primary: {exampleAsk.primary}</li>
                    <li className="text-foreground">• Alternative: {exampleAsk.alternative}</li>
                    <li className="text-foreground">• Fallback if salary frozen: {exampleAsk.fallback}</li>
                  </ul>
                </div>

                {/* Talking Points */}
                <div>
                  <p className="font-semibold text-foreground mb-3">TALKING POINTS</p>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-muted-foreground font-semibold">Opening:</p>
                      <p className="text-foreground italic">"{exampleTalkingPoints.opening}"</p>
                    </div>
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-muted-foreground font-semibold">Data:</p>
                      <p className="text-foreground italic">"{exampleTalkingPoints.data}"</p>
                    </div>
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-muted-foreground font-semibold">Ask:</p>
                      <p className="text-foreground italic">"{exampleTalkingPoints.ask}"</p>
                    </div>
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-muted-foreground font-semibold">If No:</p>
                      <p className="text-foreground italic">"{exampleTalkingPoints.ifNo}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blank Template Card */}
            <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border print:shadow-none print:border print:border-gray-300">
              <div className="bg-executive px-6 py-3 flex items-center gap-2 print:bg-gray-100 print:border-b print:border-gray-300">
                <span className="bg-card text-foreground text-xs font-bold px-2 py-1 rounded print:bg-gray-200">✏️ YOUR VERSION</span>
              </div>
              <div className="p-6 space-y-6">
                {/* Achievements */}
                <div>
                  <p className="font-semibold text-foreground mb-3">KEY ACHIEVEMENTS (past 12 months)</p>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-muted-foreground">Achievement</th>
                        <th className="text-left py-2 text-muted-foreground">Impact / Metric</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((i) => (
                        <tr key={i} className="border-b border-dashed border-border">
                          <td className="py-3 text-muted-foreground">_________________________________</td>
                          <td className="py-3 text-muted-foreground">_________________________________</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Market Data */}
                <div>
                  <p className="font-semibold text-foreground mb-3">MARKET DATA</p>
                  <ul className="text-sm space-y-2">
                    <li className="text-foreground">• My current pay: NT$<span className="border-b border-dashed border-border px-8">________</span>/month (annual TC ~NT$<span className="border-b border-dashed border-border px-8">________</span>)</li>
                    <li className="text-foreground">• Market range for this role: NT$<span className="border-b border-dashed border-border px-8">________</span> to NT$<span className="border-b border-dashed border-border px-8">________</span>/month</li>
                    <li className="text-foreground">• Source: <span className="border-b border-dashed border-border px-16">_________________________________</span></li>
                    <li className="text-foreground">• Gap: NT$<span className="border-b border-dashed border-border px-8">________</span>/month below market ☐ midpoint ☐ 75th percentile</li>
                  </ul>
                </div>

                {/* My Ask */}
                <div>
                  <p className="font-semibold text-foreground mb-3">MY ASK</p>
                  <ul className="text-sm space-y-2">
                    <li className="text-foreground">• Primary: <span className="border-b border-dashed border-border px-24">________________________________________________________________</span></li>
                    <li className="text-foreground">• Alternative: <span className="border-b border-dashed border-border px-24">________________________________________________________________</span></li>
                    <li className="text-foreground">• Fallback if salary frozen: <span className="border-b border-dashed border-border px-16">________________________________________________________________</span></li>
                  </ul>
                </div>

                {/* Talking Points */}
                <div>
                  <p className="font-semibold text-foreground mb-3">TALKING POINTS</p>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-muted-foreground font-semibold">Opening:</p>
                      <p className="text-muted-foreground italic">"Over the past ________, I've ________________________________________________________________"</p>
                    </div>
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-muted-foreground font-semibold">Data:</p>
                      <p className="text-muted-foreground italic">"Based on ________, the market range for ________ in ________ with my experience is NT$________ to ________/month."</p>
                    </div>
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-muted-foreground font-semibold">Ask:</p>
                      <p className="text-muted-foreground italic">"I'd like to discuss adjusting my pay to NT$________/month to reflect ________________________________________________________________"</p>
                    </div>
                    <div className="border-l-4 border-gold pl-3">
                      <p className="text-muted-foreground font-semibold">If No:</p>
                      <p className="text-muted-foreground italic">"I understand. What specific milestones would need to be met for a pay adjustment at the next review cycle?"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="pb-12 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gold/10 rounded-xl p-6 border-l-4 border-gold">
            <h2 className="font-heading text-lg text-gold mb-4">💡 Tips</h2>
            <ul className="space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <span>•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handlePrint}
            disabled={printLimitReached}
            className="bg-executive hover:bg-executive-light text-cream px-6 py-3 h-auto"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print This
          </Button>
          <Button 
            onClick={copyTemplate}
            className="btn-gold px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Template"}
          </Button>
          <Button 
            onClick={shareUrl}
            variant="outline"
            className="border-executive text-executive hover:bg-executive/10 px-6 py-3 h-auto"
          >
            {shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
            {shared ? "Link Copied!" : "Share"}
          </Button>
        </div>
      </section>

      <ToolkitFooter />
    </div>
  );
};

export default RaiseOnePager;