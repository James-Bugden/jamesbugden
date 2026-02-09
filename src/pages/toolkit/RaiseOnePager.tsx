import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Linkedin, Check, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import ToolkitNav from "@/components/toolkit/ToolkitNav";

const exampleAchievements = [
  { achievement: "Led migration of legacy system to cloud infrastructure", impact: "Reduced server costs by 35% (NT$2.4M annual savings)" },
  { achievement: "Built automated testing pipeline for mobile team", impact: "Cut release cycle from 3 weeks to 5 days" },
  { achievement: "Mentored 3 junior engineers through onboarding", impact: "All 3 passed probation; one promoted within 8 months" },
  { achievement: "Delivered client-facing analytics dashboard", impact: "Adopted by 12 enterprise clients in first quarter" },
];

const exampleMarketData = {
  currentComp: "NT$78,000/month (annual TC ~NT$1.17M)",
  marketRange: "NT$85,000–NT$110,000/month",
  source: "104人力銀行, Glassdoor, CakeResume",
  gap: "NT$7,000–32,000/month below market midpoint",
};

const exampleAsk = {
  primary: "Adjust monthly base to NT$92,000 (market midpoint)",
  alternative: "Promotion to Senior Engineer level (unlocks higher pay band)",
  fallback: "Guaranteed 3-month year-end bonus + NT$30,000 training budget + 3 additional PTO days",
};

const exampleTalkingPoints = {
  opening: "Over the past year, I've led our cloud migration saving NT$2.4M annually, built the automated testing pipeline that cut release cycles by 70%, and mentored 3 junior engineers — all of whom passed probation.",
  data: "Based on 104人力銀行 and Glassdoor, the market range for Senior Engineers in Taipei with my experience is NT$85K–110K/month. My current base of NT$78K falls below this range.",
  ask: "I'd like to discuss adjusting my compensation to NT$92K/month to reflect my contributions and align with market rates.",
  ifNo: "I understand. What specific milestones or goals would need to be met for a compensation adjustment at the next review cycle? I'd like to make sure we're aligned.",
};

const tips = [
  "Bring a printed copy to the meeting — don't read from it, but reference it",
  "Send a follow-up email after the meeting summarizing what was discussed and agreed",
  "If your company has a rigid pay grade system, consider asking for a level/title promotion — this often unlocks a higher pay band entirely",
  "Time it right: 1–2 months before annual reviews, right after a major win, or when your responsibilities have clearly expanded",
];

const RaiseOnePager = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyTemplate = () => {
    const templateText = `RAISE REQUEST ONE-PAGER

KEY ACHIEVEMENTS (past 12 months)
Achievement | Impact / Metric
_________________________________ | _________________________________
_________________________________ | _________________________________
_________________________________ | _________________________________
_________________________________ | _________________________________

MARKET DATA
- My current compensation: NT$________/month (annual TC ~NT$________)
- Market range for this role: NT$________–NT$________/month
- Source: _________________________________
- Gap: NT$________/month below market

MY ASK
- Primary: ________________________________________________________________
- Alternative: ________________________________________________________________
- Fallback if salary frozen: ________________________________________________________________

TALKING POINTS
- Opening: "Over the past ________, I've ________________________________________________________________"
- Data: "Based on ________, the market range for ________ in ________ with my experience is NT$________–________/month."
- Ask: "I'd like to discuss adjusting my compensation to NT$________/month to reflect ________________________________________________________________"
- If No: "I understand. What specific milestones would need to be met for a compensation adjustment at the next review cycle?"`;

    navigator.clipboard.writeText(templateText);
    setCopied(true);
    toast({ title: "Template copied!", description: "Paste it into a document and fill it in." });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    toast({ title: "Link copied!", description: "Share it with anyone who needs it." });
    setTimeout(() => setShared(false), 2000);
  };

  const printPage = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      {/* Header */}
      <header className="bg-[#1A1A2E] border-b border-white/10 print:hidden">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-white tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <ThreadsIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 md:py-16 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-5xl text-center">
          <Link 
            to="/toolkit" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Raise Request One-Pager
          </h1>
          <p className="text-lg text-white/70">
            Build your case on one page. Bring it to the meeting.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="print:hidden">
        <ToolkitNav currentTemplate="T6" />
      </div>

      {/* Side-by-side Cards */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Example Card */}
            <div className="bg-[#F8F8F8] rounded-xl overflow-hidden shadow-lg print:hidden">
              <div className="bg-[#0F3460] px-6 py-3 flex items-center gap-2">
                <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded">📋 EXAMPLE</span>
              </div>
              <div className="p-6 space-y-6">
                {/* Achievements */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">KEY ACHIEVEMENTS (past 12 months)</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-gray-600">Achievement</th>
                        <th className="text-left py-2 text-gray-600">Impact / Metric</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exampleAchievements.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                          <td className="py-2 text-gray-800">{item.achievement}</td>
                          <td className="py-2 text-gray-800">{item.impact}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Market Data */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">MARKET DATA</h3>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-700">• My current compensation: {exampleMarketData.currentComp}</li>
                    <li className="text-gray-700">• Market range for this role: {exampleMarketData.marketRange}</li>
                    <li className="text-gray-700">• Source: {exampleMarketData.source}</li>
                    <li className="text-gray-700">• Gap: {exampleMarketData.gap}</li>
                  </ul>
                </div>

                {/* My Ask */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">MY ASK</h3>
                  <ul className="text-sm space-y-1">
                    <li className="text-gray-700">• Primary: {exampleAsk.primary}</li>
                    <li className="text-gray-700">• Alternative: {exampleAsk.alternative}</li>
                    <li className="text-gray-700">• Fallback if salary frozen: {exampleAsk.fallback}</li>
                  </ul>
                </div>

                {/* Talking Points */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">TALKING POINTS</h3>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-[#E94560] pl-3">
                      <p className="text-gray-600 font-semibold">Opening:</p>
                      <p className="text-gray-800 italic">"{exampleTalkingPoints.opening}"</p>
                    </div>
                    <div className="border-l-4 border-[#E94560] pl-3">
                      <p className="text-gray-600 font-semibold">Data:</p>
                      <p className="text-gray-800 italic">"{exampleTalkingPoints.data}"</p>
                    </div>
                    <div className="border-l-4 border-[#E94560] pl-3">
                      <p className="text-gray-600 font-semibold">Ask:</p>
                      <p className="text-gray-800 italic">"{exampleTalkingPoints.ask}"</p>
                    </div>
                    <div className="border-l-4 border-[#E94560] pl-3">
                      <p className="text-gray-600 font-semibold">If No:</p>
                      <p className="text-gray-800 italic">"{exampleTalkingPoints.ifNo}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blank Template Card */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg print:shadow-none print:border print:border-gray-300">
              <div className="bg-[#0F3460] px-6 py-3 flex items-center gap-2 print:bg-gray-100 print:border-b print:border-gray-300">
                <span className="bg-white text-gray-700 text-xs font-bold px-2 py-1 rounded print:bg-gray-200">✏️ YOUR VERSION</span>
              </div>
              <div className="p-6 space-y-6">
                {/* Achievements */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">KEY ACHIEVEMENTS (past 12 months)</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 text-gray-600">Achievement</th>
                        <th className="text-left py-2 text-gray-600">Impact / Metric</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 2, 3, 4].map((i) => (
                        <tr key={i} className="border-b border-dashed border-gray-300">
                          <td className="py-3 text-gray-400">_________________________________</td>
                          <td className="py-3 text-gray-400">_________________________________</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Market Data */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">MARKET DATA</h3>
                  <ul className="text-sm space-y-2">
                    <li className="text-gray-700">• My current compensation: NT$<span className="border-b border-dashed border-gray-400 px-8">________</span>/month (annual TC ~NT$<span className="border-b border-dashed border-gray-400 px-8">________</span>)</li>
                    <li className="text-gray-700">• Market range for this role: NT$<span className="border-b border-dashed border-gray-400 px-8">________</span>–NT$<span className="border-b border-dashed border-gray-400 px-8">________</span>/month</li>
                    <li className="text-gray-700">• Source: <span className="border-b border-dashed border-gray-400 px-16">_________________________________</span></li>
                    <li className="text-gray-700">• Gap: NT$<span className="border-b border-dashed border-gray-400 px-8">________</span>/month below market ☐ midpoint ☐ 75th percentile</li>
                  </ul>
                </div>

                {/* My Ask */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">MY ASK</h3>
                  <ul className="text-sm space-y-2">
                    <li className="text-gray-700">• Primary: <span className="border-b border-dashed border-gray-400 px-24">________________________________________________________________</span></li>
                    <li className="text-gray-700">• Alternative: <span className="border-b border-dashed border-gray-400 px-24">________________________________________________________________</span></li>
                    <li className="text-gray-700">• Fallback if salary frozen: <span className="border-b border-dashed border-gray-400 px-16">________________________________________________________________</span></li>
                  </ul>
                </div>

                {/* Talking Points */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">TALKING POINTS</h3>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-[#E94560] pl-3">
                      <p className="text-gray-600 font-semibold">Opening:</p>
                      <p className="text-gray-500 italic">"Over the past ________, I've ________________________________________________________________"</p>
                    </div>
                    <div className="border-l-4 border-[#E94560] pl-3">
                      <p className="text-gray-600 font-semibold">Data:</p>
                      <p className="text-gray-500 italic">"Based on ________, the market range for ________ in ________ with my experience is NT$________–________/month."</p>
                    </div>
                    <div className="border-l-4 border-[#E94560] pl-3">
                      <p className="text-gray-600 font-semibold">Ask:</p>
                      <p className="text-gray-500 italic">"I'd like to discuss adjusting my compensation to NT$________/month to reflect ________________________________________________________________"</p>
                    </div>
                    <div className="border-l-4 border-[#E94560] pl-3">
                      <p className="text-gray-600 font-semibold">If No:</p>
                      <p className="text-gray-500 italic">"I understand. What specific milestones would need to be met for a compensation adjustment at the next review cycle?"</p>
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
          <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-400">
            <h3 className="font-heading text-lg text-amber-800 mb-4">💡 Tips</h3>
            <ul className="space-y-2">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-amber-800">
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
            onClick={printPage}
            className="bg-[#0F3460] hover:bg-[#0a2a4d] text-white px-6 py-3 h-auto"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print This
          </Button>
          <Button 
            onClick={copyTemplate}
            className="bg-[#E94560] hover:bg-[#d13a54] text-white px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Template"}
          </Button>
          <Button 
            onClick={shareUrl}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-6 py-3 h-auto"
          >
            {shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
            {shared ? "Link Copied!" : "Share"}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 md:px-6 border-t border-white/10 print:hidden">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-white/50 text-sm">
            From the Salary Negotiation Toolkit by{" "}
            <Link to="/" className="text-[#E94560] hover:underline">James Bugden</Link>
            . Get the full 5-email series →{" "}
            <Link to="/" className="text-[#E94560] hover:underline">Subscribe</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RaiseOnePager;
