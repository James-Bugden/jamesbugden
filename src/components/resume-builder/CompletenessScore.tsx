import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Circle, AlertTriangle, ChevronRight } from "lucide-react";
import { ResumeData } from "./types";
import { cn } from "@/lib/utils";
import { useT } from "./i18n";

interface CompletenessScoreProps {
  data: ResumeData;
  onNavigate?: (target: string) => void;
}

interface CheckItem {
  label: string;
  points: number;
  passed: boolean;
  target: string; // "personal" | section type like "summary", "experience", "skills"
}

interface DateWarning {
  label: string;
  entryName: string;
}

const MONTHS_INDEX: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

function monthToNum(m: string | undefined): number {
  if (!m) return 0;
  return MONTHS_INDEX[m] ?? 0;
}

function useComputeChecks(data: ResumeData): CheckItem[] {
  const t = useT();
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

  const quantified = expEntries.some((e) => /\d+/.test(e.fields.description || ""));

  return [
    { label: t("scoreCheckSummary"), points: 10, passed: hasSummary, target: "summary" },
    { label: t("scoreCheck2Exp"), points: 20, passed: has2Exp, target: "experience" },
    { label: t("scoreCheckDescriptions"), points: 15, passed: hasDescriptions, target: "experience" },
    { label: t("scoreCheckDates"), points: 10, passed: datesFilled, target: "experience" },
    { label: t("scoreCheckContact"), points: 15, passed: contactComplete, target: "personal" },
    { label: t("scoreCheckSkills"), points: 10, passed: hasSkills, target: "skills" },
    { label: t("scoreCheckQuantified"), points: 20, passed: quantified, target: "experience" },
  ];
}

function toMonthIndex(year: string, month: string | undefined): number {
  return parseInt(year, 10) * 12 + monthToNum(month);
}

function useComputeDateWarnings(data: ResumeData): DateWarning[] {
  const t = useT();
  const warnings: DateWarning[] = [];
  const dateTypes = ["experience", "education", "projects", "organisations"];

  for (const section of data.sections) {
    if (!dateTypes.includes(section.type)) continue;
    for (const entry of section.entries) {
      const { startYear, endYear, startMonth, endMonth, currentlyHere } = entry.fields;
      const name =
        entry.fields.position || entry.fields.degree || entry.fields.name || entry.fields.title || "—";

      // Missing end date
      if (startYear && !endYear && currentlyHere !== "true") {
        warnings.push({ label: t("dateWarnMissing"), entryName: name });
      }

      // Inconsistent: end before start
      if (startYear && endYear) {
        const sy = parseInt(startYear, 10);
        const ey = parseInt(endYear, 10);
        if (!isNaN(sy) && !isNaN(ey)) {
          if (ey < sy || (ey === sy && monthToNum(endMonth) < monthToNum(startMonth))) {
            warnings.push({ label: t("dateWarnInconsistent"), entryName: name });
          }
        }
      }
    }
  }

  // Overlapping date ranges within experience sections
  const expEntries = data.sections
    .filter((s) => s.type === "experience")
    .flatMap((s) => s.entries)
    .filter((e) => e.fields.startYear)
    .map((e) => ({
      name: e.fields.position || e.fields.company || "—",
      start: toMonthIndex(e.fields.startYear, e.fields.startMonth),
      end: e.fields.currentlyHere === "true"
        ? Infinity
        : e.fields.endYear
          ? toMonthIndex(e.fields.endYear, e.fields.endMonth)
          : null,
    }))
    .filter((e) => e.end !== null) as { name: string; start: number; end: number }[];

  for (let i = 0; i < expEntries.length; i++) {
    for (let j = i + 1; j < expEntries.length; j++) {
      const a = expEntries[i];
      const b = expEntries[j];
      // Two ranges overlap if a.start <= b.end AND b.start <= a.end
      if (a.start <= b.end && b.start <= a.end) {
        warnings.push({
          label: t("dateWarnOverlap"),
          entryName: `${a.name} & ${b.name}`,
        });
      }
    }
  }

  return warnings;
}

export function CompletenessScore({ data, onNavigate }: CompletenessScoreProps) {
  const t = useT();
  const [expanded, setExpanded] = useState(false);
  const checks = useComputeChecks(data);
  const dateWarnings = useComputeDateWarnings(data);
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
        className="w-full flex items-center gap-3 min-h-[44px]"
        aria-expanded={expanded}
        aria-label={t("scoreLabel")}
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
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
          <p className="text-sm font-semibold text-gray-700">{t("scoreLabel")}</p>
          <p className="text-xs text-gray-400">
            {checks.filter((c) => c.passed).length}/{checks.length} {t("scoreChecksPassed")}
          </p>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>

      {expanded && (
        <ul className="mt-3 space-y-0.5 border-t border-gray-100 pt-3">
          {checks.map((c) => (
            <li key={c.label}>
              <button
                onClick={() => onNavigate?.(c.target)}
                className={cn(
                  "w-full flex items-center gap-2 text-xs py-1.5 px-1.5 rounded-lg transition-colors",
                  onNavigate ? "cursor-pointer hover:bg-gray-50 active:bg-gray-100" : ""
                )}
              >
                {c.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
                )}
                <span className={cn("flex-1 text-left", c.passed ? "text-gray-500 line-through" : "text-gray-700")}>
                  {c.label}
                </span>
                <span className="text-gray-300 text-[10px]">+{c.points}</span>
                {onNavigate && !c.passed && (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" />
                )}
              </button>
            </li>
          ))}

          {dateWarnings.length > 0 && (
            <>
              <li className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-600 pt-2 border-t border-gray-100 mt-2 px-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                {t("dateWarnings")}
              </li>
              {dateWarnings.map((w, i) => (
                <li key={`warn-${i}`} className="flex items-center gap-2 text-xs px-1.5 py-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span className="text-gray-700">{w.label}</span>
                  <span className="ml-auto text-gray-400 text-[10px] truncate max-w-[120px]" title={w.entryName}>
                    {w.entryName}
                  </span>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
