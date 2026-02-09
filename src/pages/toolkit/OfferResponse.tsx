import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDown, Copy, Share2, Linkedin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import ToolkitNav from "@/components/toolkit/ToolkitNav";

const steps = [
  {
    number: 1,
    label: "Echo",
    title: "REPEAT THE NUMBER",
    script: "NT$[X]...",
    instruction: "Say it with a slight tone of thoughtfulness. Not shock — just mild, reflective surprise. Like you're processing it carefully.",
  },
  {
    number: 2,
    label: "Pause",
    title: "GO SILENT",
    script: null,
    instruction: "Don't say anything for 15–30 seconds. Count in your head if you need to. This will feel uncomfortable — that's exactly why it works.",
    note: "What happens during the silence: The recruiter's brain starts working against their own offer.",
    branches: [
      { label: "A", text: "They improve the number before you speak → proceed to Step 3" },
      { label: "B", text: "They wait for you → proceed to Step 3" },
    ],
  },
  {
    number: 3,
    label: "Redirect",
    title: "RESPOND WITH ENTHUSIASM + A QUESTION",
    script: "Thank you — I'm really excited about this opportunity and the team. I'd love to take a day or two to review the full package. Could you send me the complete offer details in writing, including the bonus structure and benefits?",
    instruction: "Why it works: You haven't said yes. You haven't said no. You've expressed enthusiasm while buying time to prepare a real counter.",
  },
];

const outcomes = [
  {
    label: "A",
    title: "Verbal offer only",
    text: "Follow up by email: \"Thank you for the conversation today. I'm very excited about the opportunity. Could you send the full offer details in writing so I can review the complete package?\"",
  },
  {
    label: "B",
    title: "Written offer received",
    text: "You're ready for the counteroffer email (Template T3)",
    link: "/toolkit/counteroffer",
  },
];

const donts = [
  "Say \"That sounds great!\" — you just accepted without negotiating",
  "Blurt out a counter with no preparation — you sound desperate",
  "Compare to your current salary — \"I currently make NT$X\" anchors you to an irrelevant number",
  "Negotiate over phone or LINE if you can avoid it — you lose composure and can't review details",
];

const OfferResponse = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyScript = () => {
    const scriptText = `THE OFFER RESPONSE SCRIPT

STEP 1: REPEAT THE NUMBER (Echo)
Say: "NT$[X]..."
${steps[0].instruction}

STEP 2: GO SILENT (Pause)
${steps[1].instruction}
${steps[1].note}

STEP 3: RESPOND WITH ENTHUSIASM + A QUESTION (Redirect)
Say: "${steps[2].script}"
${steps[2].instruction}

OUTCOME A (Verbal offer only):
${outcomes[0].text}

OUTCOME B (Written offer received):
${outcomes[1].text}`;

    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    toast({ title: "Script copied!", description: "Paste it anywhere you need." });
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
            The Offer Response Script
          </h1>
          <p className="text-lg text-white/70">
            3 steps. 30 seconds. Worth thousands.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <ToolkitNav currentTemplate="T2" />

      {/* Flowchart Steps */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl space-y-4">
          {steps.map((step, index) => (
            <div key={step.number}>
              {/* Step Card */}
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                {/* Step Header */}
                <div className="bg-[#0F3460] px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#E94560] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <p className="text-[#E94560] text-sm font-semibold uppercase">{step.label}</p>
                    <h2 className="text-white font-semibold text-lg">{step.title}</h2>
                  </div>
                </div>

                {/* Script */}
                {step.script && (
                  <div className="px-6 py-4 border-l-4 border-[#E94560] bg-gray-50">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">SAY:</p>
                    <p className="text-gray-900 text-lg italic">"{step.script}"</p>
                  </div>
                )}

                {/* Instruction */}
                <div className="px-6 py-4">
                  <p className="text-gray-700">{step.instruction}</p>
                </div>

                {/* Note (Step 2) */}
                {step.note && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 italic text-sm">{step.note}</p>
                  </div>
                )}

                {/* Branches (Step 2) */}
                {step.branches && (
                  <div className="px-6 pb-4 space-y-2">
                    {step.branches.map((branch) => (
                      <div key={branch.label} className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                        <span className="w-6 h-6 rounded-full bg-[#0F3460] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {branch.label}
                        </span>
                        <p className="text-sm text-gray-700">{branch.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-3">
                  <ArrowDown className="w-8 h-8 text-[#E94560]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="flex justify-center py-3">
            <ArrowDown className="w-8 h-8 text-[#E94560]" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {outcomes.map((outcome) => (
              <div key={outcome.label} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-[#0F3460] text-white font-bold flex items-center justify-center">
                    {outcome.label}
                  </span>
                  <h3 className="font-semibold text-gray-900">{outcome.title}</h3>
                </div>
                <p className="text-gray-700 text-sm">{outcome.text}</p>
                {outcome.link && (
                  <Link to={outcome.link} className="text-[#E94560] text-sm font-medium hover:underline mt-2 inline-block">
                    Go to Counteroffer Template →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DON'T Box */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-red-50 rounded-xl p-6 border-l-4 border-[#E94560]">
            <h3 className="font-heading text-xl text-[#E94560] mb-4 flex items-center gap-2">
              ❌ What NOT to Do
            </h3>
            <ul className="space-y-3">
              {donts.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-700">
                  <span className="text-[#E94560]">❌</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tip Box */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-[#E8F4FD] rounded-xl p-6 border-l-4 border-[#0F3460]">
            <h3 className="font-heading text-lg text-[#0F3460] mb-3">💡 For women</h3>
            <p className="text-[#0F3460]">
              Pair silence with warmth. After the pause, lead with genuine enthusiasm before pivoting to the review request. Research shows this "relentlessly pleasant" combination neutralizes the likeability penalty women sometimes face when negotiating.
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={copyScript}
            className="bg-[#E94560] hover:bg-[#d13a54] text-white px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Script"}
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

export default OfferResponse;
