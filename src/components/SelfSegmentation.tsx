import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Target, DollarSign } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

/* ── Stage data ── */
const stages = [
  {
    id: "getting-started",
    icon: ClipboardList,
    label: "Getting Started",
    quote: "I want to work at a foreign company but I don't know where to begin",
    resource: "The Recruiter's Resume Checklist",
    description:
      "What I check in the first 6 seconds when a resume lands on my desk at Uber.",
    cta: "Get the Checklist",
  },
  {
    id: "actively-applying",
    icon: Target,
    label: "Interviewing",
    quote: "I'm getting interviews but not converting them into offers",
    resource: "Interview Preparation Guide",
    description:
      "The complete system I built after coaching 100+ candidates through interviews at top companies.",
    cta: "Get the Guide",
    redirectAfterSubmit: "/interview-preparation-guide",
  },
  {
    id: "got-an-offer",
    icon: DollarSign,
    label: "Got an Offer",
    quote:
      "I have an offer but I'm not sure if I should take it or how to negotiate",
    resource: "Offer Decision Scorecard",
    description:
      "The framework I give candidates to objectively evaluate any job offer. Stop accepting out of pressure.",
    cta: "Get the Scorecard",
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
    <div className="bg-card border border-border rounded-xl p-6 text-center">
      {submitted === selected ? (
        <p className="text-executive-green font-medium text-base">
          Thanks! Check your inbox. 🎉
        </p>
      ) : (
        <>
          <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2">
            {stage.resource}
          </h3>
          <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-lg mx-auto">
            {stage.description}
          </p>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 text-base"
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

export default function SelfSegmentation() {
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
            ? "border-gold bg-card shadow-lg -translate-y-1"
            : isDimmed
            ? "border-border bg-card/60 opacity-60"
            : "border-border bg-card hover:-translate-y-1 hover:border-gold/50 hover:shadow-md"
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              isSelected
                ? "bg-gold text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Step {i + 1}
          </span>
        </div>
        <p className="font-semibold text-foreground text-base mb-2">
          {stage.label}
        </p>
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          "{stage.quote}"
        </p>
      </button>
    );
  };

  return (
    <section
      id="walkthrough"
      className="py-14 md:py-20 px-4 sm:px-5 md:px-6 bg-background"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Where Are You Right Now?
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Your next step depends on where you are today. Pick the one that
            sounds like you.
          </p>
        </div>

        {isMobile ? (
          /* Mobile: cards stacked with panel inline after selected card */
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
          /* Desktop: 3-column grid with panel below */
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
          <p className="text-center text-sm text-muted-foreground mt-6 animate-pulse flex items-center justify-center gap-2">
            <span className="inline-block text-gold text-lg animate-bounce">☝</span>
            Tap the stage that sounds most like you
          </p>
        )}
      </div>
    </section>
  );
}
