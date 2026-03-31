import { memo } from "react";
import { motion } from "framer-motion";
import type { CareerPhase } from "@/hooks/useProfile";

const PHASES: { id: CareerPhase; en: string; zh: string }[] = [
  { id: "applying", en: "Applying", zh: "投遞申請" },
  { id: "interviewing", en: "Interviewing", zh: "面試準備" },
  { id: "negotiating", en: "Negotiating", zh: "薪資談判" },
];

interface Props {
  activePhase: CareerPhase | null;
  completedCount: number;
  totalCount: number;
  onPhaseChange: (phase: CareerPhase) => void;
  lang?: "en" | "zh";
}

function PhaseBarInner({ activePhase, completedCount, totalCount, onPhaseChange, lang = "en" }: Props) {
  return (
    <div className="border-b" style={{ backgroundColor: "#FBF7F0", borderColor: "#E5E0D8" }}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Pills with arrows */}
        <div className="flex items-center justify-between sm:justify-start gap-1 sm:gap-2 w-full sm:w-auto min-w-0">
          {PHASES.map((phase, i) => {
            const isActive = activePhase === phase.id;
            return (
              <div key={phase.id} className="flex items-center gap-1 sm:gap-2">
                {i > 0 && (
                  <span className="text-xs select-none" style={{ color: "#D4A843" }}>→</span>
                )}
                <button
                  onClick={() => onPhaseChange(phase.id)}
                  className="relative px-4 py-1.5 rounded-[20px] text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap"
                  style={{
                    backgroundColor: isActive ? "#234E3E" : "#E8F0EB",
                    color: isActive ? "#E8F0EB" : "#234E3E",
                    padding: "6px 16px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#D4E8DB";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#E8F0EB";
                    }
                  }}
                >
                  {lang === "zh" ? phase.zh : phase.en}
                  {isActive && (
                    <motion.div
                      layoutId="phase-indicator"
                      className="absolute inset-0 rounded-[20px] -z-10"
                      style={{ backgroundColor: "#234E3E" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Progress count — own line on mobile */}
        <span
          className="text-xs font-medium whitespace-nowrap shrink-0 w-full sm:w-auto text-center sm:text-right"
          style={{ color: "#6B7280" }}
        >
          <span style={{ color: "#D4A843", fontWeight: 700 }}>{completedCount}</span>
          /{totalCount} {lang === "zh" ? "已完成" : "complete"}
        </span>
      </div>
    </div>
  );
}

const PhaseBar = memo(PhaseBarInner);
export default PhaseBar;
