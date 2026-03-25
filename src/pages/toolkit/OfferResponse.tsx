import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDown, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { nativeShare } from "@/lib/share";
import ToolkitHeader from "@/components/toolkit/ToolkitHeader";
import ToolkitFooter from "@/components/toolkit/ToolkitFooter";
import ToolkitNav from "@/components/toolkit/ToolkitNav";
import { SEO } from "@/components/SEO";

const steps = [
  {
    number: 1,
    label: "Echo",
    title: "REPEAT THE NUMBER",
    script: "NT$[X]...",
    instruction: "Say it with a thoughtful tone. Not shock. Like you're processing it carefully.",
  },
  {
    number: 2,
    label: "Pause",
    title: "GO SILENT",
    script: null,
    instruction: "Say nothing for 15 to 30 seconds. Count in your head if needed. It will feel uncomfortable. That is exactly why it works.",
    note: "What happens during the silence: the recruiter's brain starts working against their own offer.",
    branches: [
      { label: "A", text: "They improve the number before you speak. Go to Step 3." },
      { label: "B", text: "They wait for you. Go to Step 3." },
    ],
  },
  {
    number: 3,
    label: "Redirect",
    title: "RESPOND WITH ENTHUSIASM + A QUESTION",
    script: "Thank you. I'm excited about this opportunity and the team. I'd love to take a day or two to review the full package. Could you send me the complete offer details in writing, including the bonus structure and benefits?",
    instruction: "Why it works: you did not say yes. You did not say no. You showed enthusiasm while buying time to prepare a real counter.",
  },
];

const outcomes = [
  {
    label: "A",
    title: "Verbal offer only",
    text: "Follow up by email: \"Thank you for the conversation today. I'm excited about the opportunity. Could you send the full offer details in writing so I can review the complete package?\"",
  },
  {
    label: "B",
    title: "Written offer received",
    text: "You're ready for the counteroffer email (Template T3).",
    link: "/toolkit/counteroffer",
  },
];

const donts = [
  "Say \"That sounds great!\" You accepted without negotiating.",
  "Blurt out a counter with no preparation. You sound desperate.",
  "Compare to your current salary. \"I currently make NT$X\" anchors you to the wrong number.",
  "Negotiate over phone or LINE if you have a choice. You lose composure and miss details.",
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
            The Offer Response Script
          </h1>
          <p className="text-lg text-cream-90">
            3 steps. 30 seconds. Worth thousands.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8">
        <ToolkitNav currentTemplate="offer-response" />
      </div>

      {/* Flowchart Steps */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl space-y-4">
          {steps.map((step, index) => (
            <div key={step.number}>
              {/* Step Card */}
              <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
                {/* Step Header */}
                <div className="bg-executive px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <p className="text-gold text-sm font-semibold uppercase">{step.label}</p>
                    <h2 className="text-cream font-semibold text-lg">{step.title}</h2>
                  </div>
                </div>

                {/* Script */}
                {step.script && (
                  <div className="px-6 py-4 border-l-4 border-gold bg-muted">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">SAY:</p>
                    <p className="text-foreground text-lg italic">"{step.script}"</p>
                  </div>
                )}

                {/* Instruction */}
                <div className="px-6 py-4">
                  <p className="text-foreground">{step.instruction}</p>
                </div>

                {/* Note (Step 2) */}
                {step.note && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground italic text-sm">{step.note}</p>
                  </div>
                )}

                {/* Branches (Step 2) */}
                {step.branches && (
                  <div className="px-6 pb-4 space-y-2">
                    {step.branches.map((branch) => (
                      <div key={branch.label} className="flex items-start gap-3 bg-executive/5 p-3 rounded-lg">
                        <span className="w-6 h-6 rounded-full bg-executive text-cream text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {branch.label}
                        </span>
                        <p className="text-sm text-foreground">{branch.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-3">
                  <ArrowDown className="w-8 h-8 text-gold" />
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
            <ArrowDown className="w-8 h-8 text-gold" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {outcomes.map((outcome) => (
              <div key={outcome.label} className="bg-card rounded-xl p-6 shadow-premium border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-executive text-cream font-bold flex items-center justify-center">
                    {outcome.label}
                  </span>
                  <h3 className="font-semibold text-foreground">{outcome.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{outcome.text}</p>
                {outcome.link && (
                  <Link to={outcome.link} className="text-gold text-sm font-medium hover:underline mt-2 inline-block">
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
          <div className="bg-destructive/10 rounded-xl p-6 border-l-4 border-destructive">
            <h3 className="font-heading text-xl text-destructive mb-4 flex items-center gap-2">
              What NOT to Do
            </h3>
            <ul className="space-y-3">
              {donts.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <span className="text-destructive">✕</span>
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
          <div className="bg-executive/5 rounded-xl p-6 border-l-4 border-executive">
            <h3 className="font-heading text-lg text-executive mb-3">💡 For women</h3>
            <p className="text-foreground">
              Pair silence with warmth. After the pause, lead with genuine enthusiasm before asking for the written offer. Research shows this combination neutralizes the likeability penalty women sometimes face when negotiating.
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={copyScript}
            className="btn-gold px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Script"}
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

export default OfferResponse;
