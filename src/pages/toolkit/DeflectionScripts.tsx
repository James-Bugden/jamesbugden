import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { nativeShare } from "@/lib/share";
import ToolkitHeader from "@/components/toolkit/ToolkitHeader";
import ToolkitFooter from "@/components/toolkit/ToolkitFooter";
import ToolkitNav from "@/components/toolkit/ToolkitNav";
import { SEO } from "@/components/SEO";

const scenarios = [
  {
    number: 1,
    title: "First time they ask",
    theySay: "Can you share your salary expectations?",
    youSay: "Right now, I want to learn more about the role and how I contribute. Pay matters, but I'd love to understand the responsibilities, team, and expectations before we talk numbers.",
  },
  {
    number: 2,
    title: "They push harder",
    theySay: "We just want to make sure we're in the same range so we don't waste your time.",
    youSay: "I'd be happy to talk about pay once we've confirmed I'm the right fit. What is the salary range for this role?",
  },
  {
    number: 3,
    title: "They won't budge",
    theySay: "We really need a number to move forward.",
    youSay: "I'm flexible and open to competitive offers. Pay varies based on experience and impact. What range are you targeting for this position?",
  },
  {
    number: 4,
    title: "You must give a number",
    theySay: null,
    youSay: "Based on my research and industry benchmarks, similar roles at this level typically offer a monthly base of NT$[X] to [Y]. I'm open to discussing the full package, including bonuses and benefits.",
    proTip: "Take the monthly salary you'd be happy with and add 10 to 20% on top. This gives them room to \"negotiate you down\" to the number you wanted all along.",
  },
  {
    number: 5,
    title: "Written application requires a number",
    theySay: null,
    youSay: null,
    whatToWrite: "Write \"negotiable\" or \"per company policy\" whenever possible. If the field only accepts numbers, enter a range based on your market research. Never enter your current salary.",
  },
];

const proTips = [
  {
    icon: "💡",
    title: "Pattern",
    text: "Every script ends with a question back to them. This shifts the conversation. They share information first, not you.",
  },
  {
    icon: "💡",
    title: "Data reframe (for women especially)",
    text: "Instead of \"I want,\" try \"My research shows this role typically pays...\" Citing external data (Glassdoor, LinkedIn Salary, Payscale) puts the focus on the market, not on you.",
  },
  {
    icon: "💡",
    title: "Remember",
    text: "You never have to answer this question directly. Deflecting is not rude. It is professional.",
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
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <Link 
            to="/toolkit" 
            className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            What to Say When They Ask Your Salary
          </h1>
          <p className="text-lg text-cream-90">
            5 copy-paste scripts for every scenario. Save this page to your phone.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8">
        <ToolkitNav currentTemplate="scripts" />
      </div>

      {/* Scenarios */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl space-y-6">
          {scenarios.map((scenario) => (
            <div key={scenario.number} className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
              {/* Scenario Header */}
              <div className="bg-executive px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {scenario.number}
                </div>
                <h2 className="text-cream font-semibold text-lg">{scenario.title}</h2>
              </div>

              {/* They Say */}
              {scenario.theySay && (
                <div className="bg-muted px-6 py-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">THEY SAY:</p>
                  <p className="text-foreground italic">"{scenario.theySay}"</p>
                </div>
              )}

              {/* You Say */}
              {scenario.youSay && (
                <div className="px-6 py-4 border-l-4 border-gold bg-card">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">YOU SAY:</p>
                  <p className="text-foreground">"{scenario.youSay}"</p>
                </div>
              )}

              {/* What To Write (Scenario 5) */}
              {scenario.whatToWrite && (
                <div className="px-6 py-4 border-l-4 border-gold bg-card">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">WHAT TO WRITE:</p>
                  <p className="text-foreground">{scenario.whatToWrite}</p>
                </div>
              )}

              {/* Pro Tip (Scenario 4) */}
              {scenario.proTip && (
                <div className="px-6 py-4 bg-gold/10 border-t border-gold/20">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold text-gold">💡 PRO TIP:</span> {scenario.proTip}
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
          <div className="bg-executive/5 rounded-xl p-6 border-l-4 border-executive">
            <h3 className="font-heading text-xl text-executive mb-4">Pro Tips</h3>
            <div className="space-y-4">
              {proTips.map((tip, index) => (
                <div key={index}>
                  <p className="text-foreground">
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
            className="btn-gold px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy All Scripts"}
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
    </>
  );
};

export default DeflectionScripts;
