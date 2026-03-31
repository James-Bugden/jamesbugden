import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CareerPhase } from "@/hooks/useProfile";

const PHASES: { id: CareerPhase; emoji: string; label: string; desc: string }[] = [
  {
    id: "applying",
    emoji: "📋",
    label: "Applying",
    desc: "I'm searching for roles, updating my resume, and reaching out to companies.",
  },
  {
    id: "interviewing",
    emoji: "🎙️",
    label: "Interviewing",
    desc: "I have interviews scheduled or I'm actively preparing for them.",
  },
  {
    id: "negotiating",
    emoji: "💰",
    label: "Negotiating",
    desc: "I've received an offer or I'm expecting one soon.",
  },
];

interface Props {
  onSelect: (phase: CareerPhase) => Promise<void>;
}

export default function OnboardingPhaseModal({ onSelect }: Props) {
  const [selected, setSelected] = useState<CareerPhase | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!selected) return;
    setSubmitting(true);
    await onSelect(selected);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: "rgba(27, 58, 47, 0.6)" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-2xl rounded-2xl p-6 sm:p-8 shadow-2xl"
          style={{ backgroundColor: "#FBF7F0" }}
        >
          {/* Heading */}
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-2"
            style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}
          >
            Where are you in your job search?
          </h2>
          <p className="text-sm sm:text-base text-center mb-8" style={{ color: "#6B7280" }}>
            This helps us show you the most relevant tools and guides first.
            <br className="hidden sm:inline" /> You can change this anytime.
          </p>

          {/* Phase cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {PHASES.map((phase) => {
              const isSelected = selected === phase.id;
              return (
                <button
                  key={phase.id}
                  onClick={() => setSelected(phase.id)}
                  className="relative rounded-xl p-5 text-left transition-all duration-200 border-2"
                  style={{
                    borderColor: isSelected ? "#1B3A2F" : "#E5E0D8",
                    backgroundColor: isSelected ? "rgba(27, 58, 47, 0.06)" : "#FFFFFF",
                    boxShadow: isSelected
                      ? "0 4px 16px rgba(27, 58, 47, 0.12)"
                      : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <span className="text-3xl block mb-3">{phase.emoji}</span>
                  <span
                    className="text-base font-semibold block mb-1"
                    style={{ color: "#1B3A2F" }}
                  >
                    {phase.label}
                  </span>
                  <span className="text-sm leading-relaxed block" style={{ color: "#6B7280" }}>
                    {phase.desc}
                  </span>

                  {/* Check indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#1B3A2F" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7L6 10L11 4" stroke="#FBF7F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={!selected || submitting}
            className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: "#1B3A2F",
              color: "#FBF7F0",
            }}
          >
            {submitting ? "Saving…" : "Continue"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
