import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ToolkitHeader from "@/components/toolkit/ToolkitHeader";
import ToolkitFooter from "@/components/toolkit/ToolkitFooter";
import ToolkitNav from "@/components/toolkit/ToolkitNav";

const mainCards = [
  {
    number: 1,
    theySay: "This is the standard offer for this level.",
    translation: "Monthly base might be locked to a pay grade — but bonuses, allowances, and review timing usually are not.",
    youSay: "I understand the pay structure. If the monthly base is firm, is there flexibility on the guaranteed year-end bonus or the timing of my first performance review? An earlier review would give me a chance to demonstrate my value sooner.",
  },
  {
    number: 2,
    theySay: "We don't have the budget.",
    translation: "The budget for base salary might be locked — but sign-on bonuses, training budgets, and allowances often come from different budget lines.",
    youSay: "I completely understand budget constraints. I also know that similar roles at comparable companies are offering monthly packages in the NT$[X–Y] range. If the base is firm, is there room to adjust the year-end guarantee or add a sign-on bonus to align the total annual package?",
  },
  {
    number: 3,
    theySay: "This is already a competitive offer.",
    translation: "They want you to feel like you're asking for too much. \"Competitive\" means \"in the range.\" It doesn't mean \"at the top.\"",
    youSay: "I agree it's a strong offer, and I appreciate it. Based on my experience level and the contributions I'll be making, I was expecting something closer to NT$[X]/month. I'd love to work together to find a package that reflects that.",
  },
  {
    number: 4,
    theySay: "We need to maintain internal equity.",
    translation: "Internal salary consistency matters. Many companies have rigid pay grade systems — that's exactly why non-salary components are your leverage.",
    youSay: "That makes complete sense. Since internal equity is important, could we look at a guaranteed 3-month year-end bonus or an accelerated review cycle? Those wouldn't affect the salary structure but would help align the total annual compensation.",
  },
];

const bonusScripts = [
  {
    id: "competing",
    title: "Competing Offer",
    situation: "You have a written offer from another company.",
    youSay: "I want to be transparent — I've received another offer with a compelling total annual package. However, [Company] remains my top choice. Is there flexibility to adjust the offer to align more closely?",
    key: "No ultimatum, no threat. You're giving them a reason to move, while making it clear you want to be there.",
  },
  {
    id: "deadline",
    title: "Deadline Extension",
    situation: "They're pressuring you to decide quickly.",
    youSay: "I really appreciate the offer and I'm excited about the opportunity. Making a career decision is important to me — would it be possible to extend the deadline by one week so I can properly evaluate? I want to make sure I'm fully committed when I join.",
    followUp: "Then accelerate other companies: \"I've received an offer with a deadline. Your company remains my top choice — is there any flexibility to expedite the process?\"",
  },
];

const PushbackCheatSheet = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyAllScripts = () => {
    const mainScriptsText = mainCards.map((card, index) => 
      `PUSHBACK ${index + 1}:\nTHEY SAY: "${card.theySay}"\nYOU SAY: "${card.youSay}"`
    ).join("\n\n---\n\n");

    const bonusScriptsText = bonusScripts.map(script => 
      `BONUS SCRIPT: ${script.title}\nSITUATION: ${script.situation}\nYOU SAY: "${script.youSay}"${script.followUp ? `\n${script.followUp}` : ""}`
    ).join("\n\n---\n\n");

    const fullText = `PUSHBACK RESPONSE CHEAT SHEET\n\n${mainScriptsText}\n\n---\n\n${bonusScriptsText}`;

    navigator.clipboard.writeText(fullText);
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
    <div className="min-h-screen bg-background">
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
            Pushback Response Cheat Sheet
          </h1>
          <p className="text-lg text-cream-90">
            They will push back. Here's what to say.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8">
        <ToolkitNav currentTemplate="T5" />
      </div>

      {/* Main Cards */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl space-y-6">
          {mainCards.map((card) => (
            <div key={card.number} className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
              <div className="grid md:grid-cols-2">
                {/* They Say */}
                <div className="bg-muted p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-executive text-cream font-bold flex items-center justify-center text-sm">
                      {card.number}
                    </span>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">WHEN THEY SAY:</p>
                  </div>
                  <p className="text-foreground italic mb-2">"{card.theySay}"</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">TRANSLATION:</p>
                    <p className="text-muted-foreground text-sm italic">{card.translation}</p>
                  </div>
                </div>
                {/* You Say */}
                <div className="p-6 border-l-4 border-gold">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">YOU SAY:</p>
                  <p className="text-foreground">"{card.youSay}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bonus Scripts */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-foreground text-xl font-heading mb-4">Bonus Scripts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {bonusScripts.map((script) => (
              <div key={script.id} className="bg-executive/5 rounded-xl overflow-hidden shadow-premium border-l-4 border-executive">
                <div className="p-6">
                  <h3 className="font-semibold text-executive text-lg mb-2">{script.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    <span className="font-semibold text-foreground">SITUATION:</span> {script.situation}
                  </p>
                  <div className="bg-card rounded-lg p-4 mb-3 border border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">YOU SAY:</p>
                    <p className="text-foreground text-sm">"{script.youSay}"</p>
                  </div>
                  {script.followUp && (
                    <p className="text-sm text-muted-foreground italic">{script.followUp}</p>
                  )}
                  {script.key && (
                    <p className="text-sm text-executive mt-3">
                      <span className="font-semibold">Key:</span> {script.key}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remember Box */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-gold/10 rounded-xl p-6 border-l-4 border-gold">
            <h3 className="font-heading text-lg text-gold mb-3">📌 Remember</h3>
            <p className="text-foreground">
              HR isn't your enemy. They want to close the deal too. Your job is to make it easy for them to justify paying you more — give them data they can take to their manager. Framing your ask as "what's fair for this level in the market" works far better than "what I want."
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={copyAllScripts}
            className="btn-gold px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy All"}
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

export default PushbackCheatSheet;
