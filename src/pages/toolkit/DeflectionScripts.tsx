import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Linkedin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import ToolkitNav from "@/components/toolkit/ToolkitNav";

const scenarios = [
  {
    number: 1,
    title: "First time they ask",
    theySay: "Can you share your salary expectations?",
    youSay: "Right now, I'm focused on learning more about the role and how I can contribute. Compensation is important, but I'd love to understand more about the responsibilities, team, and expectations before discussing specific numbers.",
  },
  {
    number: 2,
    title: "They push harder",
    theySay: "We just want to make sure we're in the same range so we don't waste your time.",
    youSay: "I'd be happy to discuss compensation once we've determined I'm the right fit. Could you share the salary range for this role?",
  },
  {
    number: 3,
    title: "They won't budge",
    theySay: "We really need a number to move forward.",
    youSay: "I'm flexible and open to competitive offers. I know compensation varies based on experience and impact. What range are you targeting for this position?",
  },
  {
    number: 4,
    title: "You absolutely must give a number",
    theySay: null,
    youSay: "Based on my research and industry benchmarks, similar roles at this level typically offer a monthly base of NT$[X]–[Y], but I'm open to discussing the full compensation package including bonuses and benefits.",
    proTip: "Take the monthly salary you'd actually be happy with and add 10–20% on top. That gives them room to \"negotiate you down\" to the number you wanted all along.",
  },
  {
    number: 5,
    title: "Written application requires a number",
    theySay: null,
    youSay: null,
    whatToWrite: "Write \"面議\" (to be discussed) or \"依公司規定\" (per company standards) whenever possible. If the field only accepts numbers, enter a range based on your market research — not your current salary.",
  },
];

const proTips = [
  {
    icon: "💡",
    title: "Pattern",
    text: "Every script ends with a question back to them. This shifts the power dynamic — they reveal information, you don't.",
  },
  {
    icon: "💡",
    title: "Data reframe (especially for women)",
    text: "Instead of \"I want,\" try \"My research shows that this role typically pays...\" Citing external data (104人力銀行, Glassdoor) takes the focus off you and onto the market.",
  },
  {
    icon: "💡",
    title: "Remember",
    text: "You never have to answer this question directly. Deflecting is not rude — it's professional.",
  },
];

const DeflectionScripts = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyAllScripts = () => {
    const scriptsText = scenarios
      .filter((s) => s.youSay || s.whatToWrite)
      .map((s) => {
        if (s.whatToWrite) {
          return `SCENARIO ${s.number}: ${s.title}\nWHAT TO WRITE:\n${s.whatToWrite}`;
        }
        return `SCENARIO ${s.number}: ${s.title}\nYOU SAY:\n"${s.youSay}"`;
      })
      .join("\n\n---\n\n");

    navigator.clipboard.writeText(scriptsText);
    setCopied(true);
    toast({ title: "All scripts copied!", description: "Paste them anywhere you need." });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    toast({ title: "Link copied!", description: "Share it with anyone who needs it." });
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      {/* Header */}
      <header className="bg-[#1A1A2E] border-b border-white/10">
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
      <section className="py-12 md:py-16 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <Link 
            to="/toolkit" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            What to Say When They Ask Your Salary
          </h1>
          <p className="text-lg text-white/70">
            5 copy-paste scripts for every scenario. Save this page to your phone.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <ToolkitNav currentTemplate="T1" />

      {/* Scenarios */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl space-y-6">
          {scenarios.map((scenario) => (
            <div key={scenario.number} className="bg-white rounded-xl overflow-hidden shadow-lg">
              {/* Scenario Header */}
              <div className="bg-[#1A1A2E] px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E94560] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {scenario.number}
                </div>
                <h2 className="text-white font-semibold text-lg">{scenario.title}</h2>
              </div>

              {/* They Say */}
              {scenario.theySay && (
                <div className="bg-[#F0F0F0] px-6 py-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">THEY SAY:</p>
                  <p className="text-gray-700 italic">"{scenario.theySay}"</p>
                </div>
              )}

              {/* You Say */}
              {scenario.youSay && (
                <div className="px-6 py-4 border-l-4 border-[#E94560] bg-white">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">YOU SAY:</p>
                  <p className="text-gray-900">"{scenario.youSay}"</p>
                </div>
              )}

              {/* What To Write (Scenario 5) */}
              {scenario.whatToWrite && (
                <div className="px-6 py-4 border-l-4 border-[#E94560] bg-white">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">WHAT TO WRITE:</p>
                  <p className="text-gray-900">{scenario.whatToWrite}</p>
                </div>
              )}

              {/* Pro Tip (Scenario 4) */}
              {scenario.proTip && (
                <div className="px-6 py-4 bg-amber-50 border-t border-amber-100">
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold">💡 PRO TIP:</span> {scenario.proTip}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tips Box */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-[#E8F4FD] rounded-xl p-6 border-l-4 border-[#0F3460]">
            <h3 className="font-heading text-xl text-[#0F3460] mb-4">Pro Tips</h3>
            <div className="space-y-4">
              {proTips.map((tip, index) => (
                <div key={index}>
                  <p className="text-[#0F3460]">
                    <span className="font-semibold">{tip.icon} {tip.title}:</span> {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={copyAllScripts}
            className="bg-[#E94560] hover:bg-[#d13a54] text-white px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy All Scripts"}
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
      <footer className="py-8 px-5 md:px-6 border-t border-white/10">
        <div className="container mx-auto max-w-2xl text-center">
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

export default DeflectionScripts;
