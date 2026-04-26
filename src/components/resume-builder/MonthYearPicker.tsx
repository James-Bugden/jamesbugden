import { MONTHS } from "./types";
import { cn } from "@/lib/utils";
import { useT } from "./i18n";
import { localizeMonth } from "./dateFormat";
import { useResumeBuilderLang } from "./i18n";

interface MonthYearPickerProps {
  monthValue: string;
  yearValue: string;
  onMonthChange: (val: string) => void;
  onYearChange: (val: string) => void;
  disabled?: boolean;
  showPresent?: boolean;
}

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => String(currentYear - i));

// Placeholder labels, translated via useT() below.
const MONTH_LABEL_KEY = "month";
const YEAR_LABEL_KEY = "year";

export function MonthYearPicker({
  monthValue,
  yearValue,
  onMonthChange,
  onYearChange,
  disabled,
  showPresent,
}: MonthYearPickerProps) {
  const t = useT();
  const lang = useResumeBuilderLang();

  if (showPresent) {
    return (
      <div className="flex items-center h-10 px-3 rounded-lg bg-paper-alt text-sm text-gray-500">
        {t("presentDate")}
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <select
        value={monthValue}
        onChange={(e) => onMonthChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "flex-1 h-10 rounded-lg bg-paper-alt px-3 text-sm border-0 outline-none focus:ring-2 focus:ring-pink-300 appearance-none cursor-pointer",
          !monthValue && "text-gray-400"
        )}
      >
        <option value="">{t(MONTH_LABEL_KEY as any) || "Month"}</option>
        {MONTHS.map((m) => (
          // Storage value stays English for backward-compat, display label is localized.
          <option key={m} value={m}>{localizeMonth(m, lang)}</option>
        ))}
      </select>
      <select
        value={yearValue}
        onChange={(e) => onYearChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-24 h-10 rounded-lg bg-paper-alt px-3 text-sm border-0 outline-none focus:ring-2 focus:ring-pink-300 appearance-none cursor-pointer",
          !yearValue && "text-gray-400"
        )}
      >
        <option value="">{t(YEAR_LABEL_KEY as any) || "Year"}</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
