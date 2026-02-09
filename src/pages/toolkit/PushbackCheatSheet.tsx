import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Linkedin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import ToolkitNav from "@/components/toolkit/ToolkitNav";

const mainCards = [
  {
    number: 1,
    theySay: "This is the standard offer for this level.",
    theySayChinese: "這是這個職等的標準薪資",
    translation: "Monthly base might be locked to a pay grade — but bonuses, allowances, and review timing usually are not.",
    youSay: "I understand the pay structure. If the monthly base is firm, is there flexibility on the guaranteed year-end bonus or the timing of my first performance review? An earlier review would give me a chance to demonstrate my value sooner.",
  },
  {
    number: 2,
    theySay: "We don't have the budget.",
    theySayChinese: "我們的預算有限",
    translation: "The budget for base salary might be locked — but sign-on bonuses, training budgets, and allowances often come from different budget lines.",
    youSay: "I completely understand budget constraints. I also know that similar roles at comparable companies are offering monthly packages in the NT$[X–Y] range. If the base is firm, is there room to adjust the year-end guarantee or add a sign-on bonus to align the total annual package?",
  },
  {
    number: 3,
    theySay: "This is already a competitive offer.",
    theySayChinese: "這已經是很有競爭力的條件了",
    translation: "They want you to feel like you're asking for too much. \"Competitive\" means \"in the range.\" It doesn't mean \"at the top.\"",
    youSay: "I agree it's a strong offer, and I appreciate it. Based on my experience level and the contributions I'll be making, I was expecting something closer to NT$[X]/month. I'd love to work together to find a package that reflects that.",
  },
  {
    number: 4,
    theySay: "We need to maintain internal equity.",
    theySayChinese: "我們需要維持內部公平性",
    translation: "Internal salary consistency matters. In Taiwan, many companies have rigid pay grade systems — that's exactly why non-salary components are your leverage.",
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
            Pushback Response Cheat Sheet
          </h1>
          <p className="text-lg text-white/70">
            They will push back. Here's what to say.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <ToolkitNav currentTemplate="T5" />

      {/* Main Cards */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl space-y-6">
          {mainCards.map((card) => (
            <div key={card.number} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="grid md:grid-cols-2">
                {/* They Say */}
                <div className="bg-[#F0F0F0] p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-[#1A1A2E] text-white font-bold flex items-center justify-center text-sm">
                      {card.number}
                    </span>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">WHEN THEY SAY:</p>
                  </div>
                  <p className="text-gray-800 italic mb-2">"{card.theySay}"</p>
                  <p className="text-gray-600 text-sm italic">({card.theySayChinese})</p>
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">TRANSLATION:</p>
                    <p className="text-gray-600 text-sm italic">{card.translation}</p>
                  </div>
                </div>
                {/* You Say */}
                <div className="p-6 border-l-4 border-[#E94560]">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">YOU SAY:</p>
                  <p className="text-gray-900">"{card.youSay}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bonus Scripts */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-white text-xl font-heading mb-4">Bonus Scripts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {bonusScripts.map((script) => (
              <div key={script.id} className="bg-[#E8F4FD] rounded-xl overflow-hidden shadow-lg border-l-4 border-[#0F3460]">
                <div className="p-6">
                  <h3 className="font-semibold text-[#0F3460] text-lg mb-2">{script.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">SITUATION:</span> {script.situation}
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">YOU SAY:</p>
                    <p className="text-gray-900 text-sm">"{script.youSay}"</p>
                  </div>
                  {script.followUp && (
                    <p className="text-sm text-gray-600 italic">{script.followUp}</p>
                  )}
                  {script.key && (
                    <p className="text-sm text-[#0F3460] mt-3">
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
          <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-400">
            <h3 className="font-heading text-lg text-amber-800 mb-3">📌 Remember</h3>
            <p className="text-amber-800">
              HR isn't your enemy. They want to close the deal too. Your job is to make it easy for them to justify paying you more — give them data they can take to their manager. In Taiwan, framing your ask as "what's fair for this level in the market" works far better than "what I want."
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={copyAllScripts}
            className="bg-[#E94560] hover:bg-[#d13a54] text-white px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy All"}
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
        <div className="container mx-auto max-w-3xl text-center">
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

export default PushbackCheatSheet;
