import { MONTHS } from "./types";
import { cn } from "@/lib/utils";

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

export function MonthYearPicker({
  monthValue,
  yearValue,
  onMonthChange,
  onYearChange,
  disabled,
  showPresent,
}: MonthYearPickerProps) {
  if (showPresent) {
    return (
      <div className="flex items-center h-10 px-3 rounded-lg bg-[#F5F3EE] text-sm text-gray-500">
        Present
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
          "flex-1 h-10 rounded-lg bg-[#F5F3EE] px-3 text-sm border-0 outline-none focus:ring-2 focus:ring-pink-300 appearance-none cursor-pointer",
          !monthValue && "text-gray-400"
        )}
      >
        <option value="">Month</option>
        {MONTHS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <select
        value={yearValue}
        onChange={(e) => onYearChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-24 h-10 rounded-lg bg-[#F5F3EE] px-3 text-sm border-0 outline-none focus:ring-2 focus:ring-pink-300 appearance-none cursor-pointer",
          !yearValue && "text-gray-400"
        )}
      >
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
