import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { JobSearchStage } from "@/hooks/useProfile";
import { trackEvent } from "@/lib/trackEvent";
import { trackProfileWizardStarted } from "@/lib/analytics";

interface StageDef {
  id: JobSearchStage;
  emoji: string;
  label: string;
  desc: string;
}

interface ToolDef {
  name: string;
  path: string;
  desc: string;
}

const STAGES: StageDef[] = [
  { id: "starting", emoji: "🔍", label: "Exploring my options", desc: "I'm figuring out my next move and what roles suit me." },
  { id: "applying", emoji: "📋", label: "Actively applying", desc: "I'm updating my resume and sending applications." },
  { id: "interviewing", emoji: "🎙️", label: "Getting interviews, not offers yet", desc: "I have interviews scheduled or I'm actively preparing." },
  { id: "negotiating", emoji: "💰", label: "Negotiating or evaluating an offer", desc: "I've received an offer or I'm expecting one soon." },
];

const STAGE_TOOLS: Record<JobSearchStage, ToolDef[]> = {
  starting: [
    { name: "Resume Builder", path: "/resume", desc: "Build a recruiter-approved resume from scratch." },
  ],
  applying: [
    { name: "Resume Analyzer", path: "/resume-analyzer", desc: "Get a recruiter-level score and specific fixes in 60 seconds." },
    { name: "Job Tracker", path: "/tracker", desc: "Track every application in one place." },
  ],
  interviewing: [
    { name: "Interview Question Bank", path: "/interview-questions", desc: "203 real questions with sample answers." },
  ],
  negotiating: [
    { name: "Salary Compare", path: "/salary/compare", desc: "See market rates for your role and experience." },
    { name: "Offer Calculator", path: "/offer-calculator", desc: "See the 30-year value of negotiating this offer." },
  ],
};

interface Props {
  userId: string;
  onStageSelect: (stage: JobSearchStage) => Promise<void>;
  onSkip: () => Promise<void>;
}

export default function OnboardingRouter({ userId, onStageSelect, onSkip }: Props) {
  const [phase, setPhase] = useState<"select" | "tools">("select");
  const [selected, setSelected] = useState<JobSearchStage | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    trackProfileWizardStarted(userId);
  }, [userId]);

  const handleContinue = async () => {
    if (!selected) return;
    setSubmitting(true);
    await onStageSelect(selected);
    trackEvent("onboarding", "onboarding_stage_selected", { stage: selected, user_id: userId });
    setPhase("tools");
    setSubmitting(false);
  };

  const handleSkip = async () => {
    setSubmitting(true);
    await onSkip();
  };

  const handleToolClick = (toolName: string) => {
    trackEvent("onboarding", "onboarding_tool_clicked", {
      tool_name: toolName,
      from_onboarding: true,
      user_id: userId,
    });
  };

  const tools = selected ? STAGE_TOOLS[selected] : [];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
        style={{ backgroundColor: "rgba(27, 58, 47, 0.6)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-2xl rounded-2xl px-5 py-6 sm:p-8 shadow-2xl overflow-y-auto"
          style={{ backgroundColor: "hsl(var(--paper))", maxHeight: "calc(100vh - 48px)" }}
        >
          {phase === "select" && (
            <>
              <h2
                className="text-2xl sm:text-3xl font-bold text-center mb-2"
                style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--executive-green))" }}
              >
                Where are you in your job search?
              </h2>
              <p className="text-sm sm:text-base text-center mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
                Answer one question and we'll show you exactly where to start.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {STAGES.map((stage) => {
                  const isSelected = selected === stage.id;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => setSelected(stage.id)}
                      className="relative rounded-xl p-5 text-left transition-all duration-200 border-2"
                      style={{
                        borderColor: isSelected ? "hsl(var(--executive-green))" : "hsl(var(--border))",
                        backgroundColor: isSelected ? "rgba(27, 58, 47, 0.06)" : "hsl(var(--card))",
                        boxShadow: isSelected
                          ? "0 4px 16px rgba(27, 58, 47, 0.12)"
                          : "0 2px 8px rgba(0,0,0,0.04)",
                      }}
                    >
                      <span className="text-3xl block mb-3">{stage.emoji}</span>
                      <span className="text-base font-semibold block mb-1" style={{ color: "hsl(var(--executive-green))" }}>
                        {stage.label}
                      </span>
                      <span className="text-sm leading-relaxed block" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {stage.desc}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "hsl(var(--executive-green))" }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7L6 10L11 4" stroke="hsl(var(--paper))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.div>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleContinue}
                disabled={!selected || submitting}
                className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed mb-3"
                style={{ backgroundColor: "hsl(var(--executive-green))", color: "hsl(var(--paper))" }}
              >
                {submitting ? "Saving…" : "Show my starting point"}
              </button>

              <button
                onClick={handleSkip}
                disabled={submitting}
                className="w-full py-2 text-sm transition-colors disabled:opacity-40"
                style={{ color: "hsl(var(--muted-foreground))" }}
              >
                Skip for now
              </button>
            </>
          )}

          {phase === "tools" && selected && (
            <>
              <h2
                className="text-2xl sm:text-3xl font-bold text-center mb-2"
                style={{ fontFamily: "var(--font-heading)", color: "hsl(var(--executive-green))" }}
              >
                Your starting point
              </h2>
              <p className="text-sm sm:text-base text-center mb-8" style={{ color: "hsl(var(--muted-foreground))" }}>
                Based on your stage, here's where to begin.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                {tools.map((tool) => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => handleToolClick(tool.name)}
                    className="group rounded-xl p-5 flex items-center gap-4 transition-all duration-200 border-2 hover:-translate-y-0.5"
                    style={{
                      borderColor: "hsl(var(--gold))",
                      backgroundColor: "hsl(var(--card))",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold mb-1" style={{ color: "hsl(var(--executive-green))" }}>
                        {tool.name}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {tool.desc}
                      </p>
                    </div>
                    <ArrowRight
                      className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1"
                      style={{ color: "hsl(var(--gold))" }}
                    />
                  </Link>
                ))}
              </div>

              <Link
                to="/dashboard"
                className="block w-full py-3 text-center text-sm transition-colors rounded-xl border"
                style={{
                  color: "hsl(var(--muted-foreground))",
                  borderColor: "hsl(var(--border))",
                }}
              >
                Go to full dashboard
              </Link>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
