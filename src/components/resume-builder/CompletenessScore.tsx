import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";
import { ResumeData } from "./types";
import { cn } from "@/lib/utils";

interface CompletenessScoreProps {
  data: ResumeData;
}

interface CheckItem {
  label: string;
  points: number;
  passed: boolean;
}

function computeChecks(data: ResumeData): CheckItem[] {
  const { personalDetails: pd, sections } = data;

  const hasSummary = sections.some(
    (s) => s.type === "summary" && s.entries.some((e) => (e.fields.description || "").trim().length > 10)
  );

  const expEntries = sections
    .filter((s) => s.type === "experience")
    .flatMap((s) => s.entries);
  const has2Exp = expEntries.length >= 2;

  const allDescribed = sections
    .filter((s) => ["experience", "education", "projects"].includes(s.type))
    .flatMap((s) => s.entries)
    .every((e) => (e.fields.description || "").trim().length > 15);
  const hasDescriptions = allDescribed && sections.some((s) =>
    ["experience", "education", "projects"].includes(s.type) && s.entries.length > 0
  );

  const datesFilled = expEntries.length > 0 && expEntries.every(
    (e) => e.fields.startYear && (e.fields.endYear || e.fields.currentlyHere === "true")
  );

  const contactComplete = !!(pd.fullName && pd.email && pd.phone);

  const hasSkills = sections.some(
    (s) => s.type === "skills" && s.entries.some((e) => (e.fields.skills || "").trim().length > 0)
  );

  // Check for numbers in experience descriptions (quantified achievements)
  const quantified = expEntries.some((e) => /\d+/.test(e.fields.description || ""));

  return [
    { label: "Professional summary", points: 10, passed: hasSummary },
    { label: "2+ experience entries", points: 20, passed: has2Exp },
    { label: "All entries have descriptions", points: 15, passed: hasDescriptions },
    { label: "Dates filled in", points: 10, passed: datesFilled },
    { label: "Contact info complete", points: 15, passed: contactComplete },
    { label: "Skills section exists", points: 10, passed: hasSkills },
    { label: "Quantified achievements", points: 20, passed: quantified },
  ];
}

export function CompletenessScore({ data }: CompletenessScoreProps) {
  const [expanded, setExpanded] = useState(false);
  const checks = computeChecks(data);
  const earned = checks.filter((c) => c.passed).reduce((s, c) => s + c.points, 0);
  const total = checks.reduce((s, c) => s + c.points, 0);
  const pct = Math.round((earned / total) * 100);

  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const color =
    pct >= 80 ? "text-green-500" : pct >= 50 ? "text-amber-500" : "text-red-400";
  const strokeColor =
    pct >= 80 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#f87171";

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3"
      >
        {/* Circular progress */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="4" />
            <circle
              cx="32" cy="32" r={radius} fill="none"
              stroke={strokeColor} strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-500"
            />
          </svg>
          <span className={cn("absolute inset-0 flex items-center justify-center text-sm font-bold", color)}>
            {pct}%
          </span>
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-gray-700">Resume Score</p>
          <p className="text-xs text-gray-400">
            {checks.filter((c) => c.passed).length}/{checks.length} checks passed
          </p>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {expanded && (
        <ul className="mt-3 space-y-1.5 border-t border-gray-100 pt-3">
          {checks.map((c) => (
            <li key={c.label} className="flex items-center gap-2 text-xs">
              {c.passed ? (
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
              )}
              <span className={cn(c.passed ? "text-gray-500 line-through" : "text-gray-700")}>
                {c.label}
              </span>
              <span className="ml-auto text-gray-300 text-[10px]">+{c.points}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
