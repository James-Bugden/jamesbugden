import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Compass, Target, TrendingUp, CheckCircle2, ClipboardCheck, ChevronUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Stage data ── */
const stages = [
  {
    id: "getting-started",
    icon: Compass,
    label: "Break Into Top Companies",
    quote: "Don't know where to start? Get a step-by-step plan to land interviews at Google, Amazon, and Microsoft.",
    resource: "Get Your Resume Scored in 60 Seconds",
    description:
      "Our free AI tool reviews your resume the way a recruiter at Google or Amazon does. Get your score and a list of fixes.",
    cta: "Analyze My Resume",
    redirectAfterSubmit: "/resume-analyzer",
  },
  {
    id: "actively-applying",
    icon: Target,
    label: "Turn Interviews Into Offers",
    quote: "Keep reaching the final round but no offer? Learn what turns a 'maybe' into a 'yes.'",
    resource: "Interview Preparation Guide",
    description:
      "The system I built after coaching 100+ candidates through interviews at top companies.",
    cta: "Get the Guide",
    redirectAfterSubmit: "/interview-preparation-guide",
  },
  {
    id: "got-an-offer",
    icon: TrendingUp,
    label: "Maximize Your Package",
    quote: "Got an offer but not sure if it's good? Learn how to check, compare, and ask for more. No awkwardness.",
    resource: "Stop Accepting Offers Out of Pressure",
    description:
      "The framework I give my candidates to evaluate any job offer. You'll never wonder 'what if' again.",
    cta: "Send Me the Free Scorecard",
  },
] as const;

type StageId = (typeof stages)[number]["id"];

function ResourcePanel({
  stage,
  submitted,
  selected,
  email,
  setEmail,
  emailError,
  handleSubmit,
}: {
  stage: (typeof stages)[number];
  submitted: StageId | null;
  selected: StageId | null;
  email: string;
  setEmail: (v: string) => void;
  emailError: string;
  handleSubmit: (e: FormEvent) => void;
}) {
  const isScorecard = stage.id === "got-an-offer";

  return (
    <div className="border border-border rounded-xl p-6" style={{ backgroundColor: '#FDFBF7' }}>
      {submitted === selected ? (
        <p className="font-medium text-base text-center" style={{ color: '#2D3A2E' }}>
          Thanks! Check your inbox. 🎉
        </p>
      ) : (
        <div className={isScorecard ? "md:flex md:items-center md:gap-8" : ""}>
          <div className={isScorecard ? "md:flex-1 text-center md:text-left" : "text-center"}>
            <h3 className="font-heading text-xl md:text-2xl mb-2" style={{ color: '#1A1A1A' }}>
              {stage.resource}
            </h3>
            <p className="text-sm md:text-base mb-6 max-w-lg mx-auto md:mx-0" style={{ color: '#6B6B6B' }}>
              {stage.description}
            </p>
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto md:mx-0 flex flex-col gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-border text-base focus:outline-none focus:ring-2 focus:ring-gold/50"
                style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', padding: '16px' }}
              />
              <input type="hidden" name="stage" value={stage.id} />
              <button
                type="submit"
                className="w-full rounded-lg text-base font-semibold transition-colors duration-200"
                style={{ backgroundColor: '#2D3A2E', color: '#FFFFFF', padding: '16px 32px', borderRadius: '8px', fontSize: '1rem', fontWeight: 600 }}
              >
                {stage.cta}
              </button>
              {stage.id === "got-an-offer" && (
                <p className="text-center mt-2" style={{ color: '#6B6B6B', fontSize: '0.8125rem' }}>
                  Free PDF · Takes 2 minutes to complete · No email sequence
                </p>
              )}
            </form>
            {emailError && (
              <p className="text-destructive text-sm mt-2">{emailError}</p>
            )}
          </div>

          {/* Scorecard illustration */}
          {isScorecard && (
            <div className="hidden md:flex items-center justify-center flex-shrink-0">
              <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Clipboard body */}
                <rect x="16" y="20" width="88" height="110" rx="8" fill="#2D3A2E" opacity="0.08" stroke="#2D3A2E" strokeWidth="2" />
                {/* Clipboard clip */}
                <rect x="40" y="12" width="40" height="16" rx="4" fill="#2D3A2E" opacity="0.15" stroke="#2D3A2E" strokeWidth="1.5" />
                {/* Check rows */}
                <rect x="30" y="46" width="60" height="4" rx="2" fill="#2D3A2E" opacity="0.12" />
                <CheckCircle2 x="30" y="40" width="16" height="16" style={{ color: '#D4930D' }} />
                <circle cx="38" cy="48" r="6" fill="#D4930D" opacity="0.9" />
                <path d="M35 48 L37 50 L41 46" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                <rect x="30" y="68" width="60" height="4" rx="2" fill="#2D3A2E" opacity="0.12" />
                <circle cx="38" cy="70" r="6" fill="#D4930D" opacity="0.9" />
                <path d="M35 70 L37 72 L41 68" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

                <rect x="30" y="90" width="60" height="4" rx="2" fill="#2D3A2E" opacity="0.12" />
                <circle cx="38" cy="92" r="6" fill="#2D3A2E" opacity="0.25" />

                <rect x="30" y="112" width="60" height="4" rx="2" fill="#2D3A2E" opacity="0.12" />
                <circle cx="38" cy="114" r="6" fill="#2D3A2E" opacity="0.25" />
              </svg>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SelfSegmentationExperiment() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<StageId | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState<StageId | null>(null);
  const [emailError, setEmailError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setEmailError("");
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    const stage = stages.find((s) => s.id === selected);
    setSubmitted(selected);
    setEmail("");
    if (stage && "redirectAfterSubmit" in stage && stage.redirectAfterSubmit) {
      setTimeout(() => navigate(stage.redirectAfterSubmit), 1500);
    }
  };

  const handleSelect = (id: StageId) => {
    setSelected(id);
    setSubmitted(null);
    setEmailError("");
  };

  const selectedStage = stages.find((s) => s.id === selected);

  const renderCard = (stage: (typeof stages)[number], i: number) => {
    const isSelected = selected === stage.id;
    const isDimmed = selected !== null && !isSelected;
    const Icon = stage.icon;

    return (
      <button
        key={stage.id}
        type="button"
        onClick={() => handleSelect(stage.id)}
        className={`w-full relative text-left rounded-xl border-2 p-6 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/40 ${
          isSelected
            ? "shadow-lg -translate-y-1"
            : isDimmed
            ? "border-border opacity-60"
            : "border-border hover:-translate-y-1 hover:shadow-md"
        }`}
        style={{
          backgroundColor: isSelected ? '#FDFBF7' : isDimmed ? 'rgba(253,251,247,0.6)' : '#FDFBF7',
          borderColor: isSelected ? '#2D3A2E' : undefined,
        }}
      >
        {/* Large icon above title */}
        <div className="mb-4">
          <Icon className="w-8 h-8" style={{ color: isSelected ? '#2D3A2E' : '#2D3A2E', opacity: isSelected ? 1 : 0.6 }} strokeWidth={1.5} />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: '#6B6B6B' }}>
          Step {i + 1}
        </span>
        <p className="font-semibold text-base mb-2" style={{ color: '#1A1A1A' }}>
          {stage.label}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#6B6B6B' }}>
          {stage.quote}
        </p>
      </button>
    );
  };

  return (
    <section
      id="walkthrough"
      className="py-12 md:py-20 px-5 md:px-6"
      style={{ backgroundColor: '#FDFBF7' }}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="font-heading mb-3" style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}>
            Find Your Path to a $200K+ Offer
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#6B6B6B' }}>
            Your next step depends on where you are today. Pick the path that sounds like you.
          </p>
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-4">
            {stages.map((stage, i) => (
              <div key={stage.id}>
                {renderCard(stage, i)}
                {selected === stage.id && selectedStage && (
                  <div className="mt-4 transition-all duration-500 ease-in-out">
                    <ResourcePanel
                      stage={selectedStage}
                      submitted={submitted}
                      selected={selected}
                      email={email}
                      setEmail={setEmail}
                      emailError={emailError}
                      handleSubmit={handleSubmit}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-4">
              {stages.map((stage, i) => renderCard(stage, i))}
            </div>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                selectedStage ? "max-h-[500px] opacity-100 mt-6" : "max-h-0 opacity-0"
              }`}
            >
              {selectedStage && (
                <ResourcePanel
                  stage={selectedStage}
                  submitted={submitted}
                  selected={selected}
                  email={email}
                  setEmail={setEmail}
                  emailError={emailError}
                  handleSubmit={handleSubmit}
                />
              )}
            </div>
          </>
        )}

        {!selected && (
          <p className="text-center text-sm mt-6 animate-pulse flex items-center justify-center gap-2" style={{ color: '#6B6B6B' }}>
            <ChevronUp className="w-5 h-5 animate-bounce" style={{ color: '#D4930D' }} strokeWidth={2} />
            Tap the path that sounds most like you
          </p>
        )}
      </div>
    </section>
  );
}
