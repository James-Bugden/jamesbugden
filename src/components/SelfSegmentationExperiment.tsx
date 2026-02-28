import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Target, DollarSign } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Stage data ── */
const stages = [
  {
    id: "getting-started",
    icon: ClipboardList,
    label: "Break Into Top Companies",
    quote: "Even if you don't know where to begin — get the roadmap to land interviews at companies like Google, Amazon, and Microsoft.",
    resource: "The Recruiter's Resume Checklist",
    description:
      "What I check in the first 6 seconds when a resume lands on my desk at Uber.",
    cta: "Get the Checklist",
  },
  {
    id: "actively-applying",
    icon: Target,
    label: "Turn Interviews Into Offers",
    quote: "Stop getting ghosted after final rounds. Learn the exact strategies that convert interviews into signed offers.",
    resource: "Interview Preparation Guide",
    description:
      "The complete system I built after coaching 100+ candidates through interviews at top companies.",
    cta: "Get the Guide",
    redirectAfterSubmit: "/interview-preparation-guide",
  },
  {
    id: "got-an-offer",
    icon: DollarSign,
    label: "Maximize Your Package",
    quote:
      "Make sure you're not leaving money on the table. Learn how to evaluate, compare, and negotiate your total compensation.",
    resource: "Stop Accepting Offers Out of Pressure",
    description:
      "Get the exact framework I give my candidates to objectively evaluate any job offer — so you never wonder 'what if' again.",
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
  return (
    <div className="border border-border rounded-xl p-6 text-center" style={{ backgroundColor: '#FDFBF7' }}>
      {submitted === selected ? (
        <p className="font-medium text-base" style={{ color: '#2D3A2E' }}>
          Thanks! Check your inbox. 🎉
        </p>
      ) : (
        <>
          <h3 className="font-heading text-xl md:text-2xl mb-2" style={{ color: '#1A1A1A' }}>
            {stage.resource}
          </h3>
          <p className="text-sm md:text-base mb-6 max-w-lg mx-auto" style={{ color: '#6B6B6B' }}>
            {stage.description}
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg border border-border text-base focus:outline-none focus:ring-2 focus:ring-gold/50"
              style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A' }}
            />
            <input type="hidden" name="stage" value={stage.id} />
            <button
              type="submit"
              className="h-12 px-6 rounded-lg btn-gold text-base font-semibold whitespace-nowrap"
            >
              {stage.cta}
            </button>
          </form>
          {emailError && (
            <p className="text-destructive text-sm mt-2">{emailError}</p>
          )}
        </>
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
            ? "border-gold shadow-lg -translate-y-1"
            : isDimmed
            ? "border-border opacity-60"
            : "border-border hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
        }`}
        style={{ backgroundColor: isSelected ? '#FDFBF7' : isDimmed ? 'rgba(253,251,247,0.6)' : '#FDFBF7' }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300"
            style={{ backgroundColor: isSelected ? '#2D3A2E' : '#E8E4DE', color: isSelected ? '#FFFFFF' : '#6B6B6B' }}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6B6B6B' }}>
            Step {i + 1}
          </span>
        </div>
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
      className="py-14 md:py-20 px-5 md:px-6"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
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
            <span className="inline-block text-lg animate-bounce" style={{ color: '#D4930D' }}>☝</span>
            Tap the path that sounds most like you
          </p>
        )}
      </div>
    </section>
  );
}
