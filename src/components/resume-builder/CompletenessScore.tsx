import { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, Circle, AlertTriangle } from "lucide-react";
import { ResumeData } from "./types";
import { cn } from "@/lib/utils";
import { useT } from "./i18n";

interface CompletenessScoreProps {
  data: ResumeData;
}

interface CheckItem {
  label: string;
  points: number;
  passed: boolean;
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
    { label: t("scoreCheckSummary"), points: 10, passed: hasSummary },
    { label: t("scoreCheck2Exp"), points: 20, passed: has2Exp },
    { label: t("scoreCheckDescriptions"), points: 15, passed: hasDescriptions },
    { label: t("scoreCheckDates"), points: 10, passed: datesFilled },
    { label: t("scoreCheckContact"), points: 15, passed: contactComplete },
    { label: t("scoreCheckSkills"), points: 10, passed: hasSkills },
    { label: t("scoreCheckQuantified"), points: 20, passed: quantified },
  ];
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
  return warnings;
}

export function CompletenessScore({ data }: CompletenessScoreProps) {
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

          {dateWarnings.length > 0 && (
            <>
              <li className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-600 pt-2 border-t border-gray-100 mt-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                {t("dateWarnings")}
              </li>
              {dateWarnings.map((w, i) => (
                <li key={`warn-${i}`} className="flex items-center gap-2 text-xs">
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
