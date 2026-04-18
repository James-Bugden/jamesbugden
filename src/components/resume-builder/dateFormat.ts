/**
 * Date formatting helpers for resumes.
 *
 * Month values in the data model are stored as English month names
 * ("January", "February", ...) for backward compatibility with
 * existing user documents. This module converts those storage-form
 * values into the correct display form based on UI language.
 */

import type { Lang } from "./i18n";

const MONTH_STORAGE_TO_DISPLAY_EN = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const MONTH_STORAGE_TO_DISPLAY_ZH = [
  "1 月", "2 月", "3 月", "4 月", "5 月", "6 月",
  "7 月", "8 月", "9 月", "10 月", "11 月", "12 月",
] as const;

/**
 * Convert a stored month name ("January" etc.) into the correct display
 * form for the given language. Falls back to the input if it's not one of
 * the known English month names (handles legacy or weird data).
 */
export function localizeMonth(stored: string | undefined | null, lang: Lang): string {
  if (!stored) return "";
  const idx = MONTH_STORAGE_TO_DISPLAY_EN.indexOf(stored as any);
  if (idx < 0) return stored;
  return lang === "zh-tw" ? MONTH_STORAGE_TO_DISPLAY_ZH[idx] : MONTH_STORAGE_TO_DISPLAY_EN[idx];
}

/**
 * Format a date range like "Jan 2024 – Present" respecting language.
 * Pass `currentlyHere: true` to render the "Present" end date.
 */
export function formatDateRange(args: {
  startMonth?: string;
  startYear?: string;
  endMonth?: string;
  endYear?: string;
  currentlyHere?: boolean;
  lang: Lang;
  presentLabel: string;
  separator?: string;
}): string {
  const { startMonth, startYear, endMonth, endYear, currentlyHere, lang, presentLabel } = args;
  const sep = args.separator ?? " – ";
  const fmt = (m?: string, y?: string) => {
    const mm = localizeMonth(m, lang);
    if (mm && y) return lang === "zh-tw" ? `${y} 年 ${mm}` : `${mm} ${y}`;
    return mm || y || "";
  };
  const start = fmt(startMonth, startYear);
  const end = currentlyHere ? presentLabel : fmt(endMonth, endYear);
  if (!start && !end) return "";
  if (!end) return start;
  if (!start) return end;
  return `${start}${sep}${end}`;
}
