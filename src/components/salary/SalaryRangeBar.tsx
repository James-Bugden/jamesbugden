import { useState } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useSalaryT, type SalaryLang } from "./salaryI18n";
import { NATIONAL_MEDIAN } from "@/data/salaryData";
import { useSalaryContext } from "./SalaryContext";

interface Props {
  min: number;
  max: number;
  med: number;
  globalMax?: number;
  showLegend?: boolean;
  lang?: SalaryLang;
  interactive?: boolean;
}

export default function SalaryRangeBar({ min, max, med, showLegend = false, lang = "en", interactive = true }: Props) {
  const t = useSalaryT(lang);
  const { formatSalary } = useSalaryContext();
  const [value, setValue] = useState(med);
  const range = max - min;
  const medPct = range > 0 ? ((med - min) / range) * 100 : 50;

  // Static (non-interactive) version for tables / compact cards
  const nmPctStatic = range > 0 ? ((NATIONAL_MEDIAN - min) / range) * 100 : -1;
  const nmVisibleStatic = nmPctStatic >= 0 && nmPctStatic <= 100;

  if (!interactive) {
    return (
      <div className="space-y-0.5">
        <div className="relative h-2 w-full rounded-full bg-muted/50 overflow-hidden">
          <div
            className="absolute h-full rounded-full"
            style={{
              width: `${medPct}%`,
              background: "linear-gradient(90deg, hsl(var(--executive) / 0.6), hsl(var(--executive) / 0.85))",
            }}
          />
          {min !== max && (
            <div
              className="absolute top-1/2 z-10 w-1.5 h-1.5 rounded-full bg-gold border border-background pointer-events-none"
              style={{ left: `${medPct}%`, transform: "translate(-50%, -50%)" }}
            />
          )}
          {nmVisibleStatic && (
            <div
              className="absolute top-0 bottom-0 z-20 w-0.5 bg-foreground/60 pointer-events-none"
              style={{ left: `${nmPctStatic}%` }}
            />
          )}
        </div>
      </div>
    );
  }

  // Interactive slider version
  const step = Math.max(1000, Math.round(range / 100 / 1000) * 1000) || 1000;

  const nmPct = range > 0 ? ((NATIONAL_MEDIAN - min) / range) * 100 : -1;
  const nmVisible = nmPct >= 0 && nmPct <= 100;
  const nmDirection = NATIONAL_MEDIAN < min ? "left" : NATIONAL_MEDIAN > max ? "right" : null;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[9px] tabular-nums text-muted-foreground">
        <span>{formatSalary(min)}</span>
        <span>{formatSalary(max)}</span>
      </div>

      <div className="relative">
        {min !== max && (
          <div
            className="absolute top-1/2 z-10 w-2 h-2 rounded-full bg-gold border border-background shadow pointer-events-none"
            style={{ left: `${medPct}%`, transform: "translate(-50%, -50%)" }}
          />
        )}

        {nmVisible && (
          <div
            className="absolute -top-1 -bottom-1 z-20 w-0.5 bg-foreground/60 pointer-events-none"
            style={{ left: `${nmPct}%` }}
          >
            <span className="absolute -top-4 -translate-x-1/2 text-[10px] font-medium text-muted-foreground whitespace-nowrap">NM</span>
          </div>
        )}

        <SliderPrimitive.Root
          className="relative flex w-full touch-none select-none items-center h-5"
          min={min} max={max} step={step}
          value={[value]}
          onValueChange={([v]) => setValue(v)}
        >
          <SliderPrimitive.Track className="relative h-2.5 w-full grow overflow-hidden rounded-full bg-muted/50">
            <SliderPrimitive.Range
              className="absolute h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(var(--executive) / 0.6), hsl(var(--executive) / 0.85))" }}
            />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb className="relative block h-5 w-5 rounded-full border-2 border-executive bg-background shadow-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-grab active:cursor-grabbing">
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground text-background text-[10px] font-medium tabular-nums px-1.5 py-0.5 shadow pointer-events-none">
              {formatSalary(value)}
            </span>
          </SliderPrimitive.Thumb>
        </SliderPrimitive.Root>
      </div>

      {nmDirection && (
        <p className="flex items-center gap-1 text-[10px] text-muted-foreground" style={{ justifyContent: nmDirection === "left" ? "flex-start" : "flex-end" }}>
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/50" />
          {nmDirection === "left" ? "← " : ""}NM {formatSalary(NATIONAL_MEDIAN)}{nmDirection === "right" ? " →" : ""}
        </p>
      )}

      {showLegend && (
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <span className="inline-block w-3 h-1.5 rounded-sm" style={{ background: "hsl(var(--executive) / 0.7)" }} />
            {t.rangeBarLegend}
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-gold" />
            {t.medianDotLegend}
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-0 border-t border-dashed border-muted-foreground/50" />
            {lang === "zh" ? "全國中位數" : "National median"}
          </span>
        </div>
      )}
    </div>
  );
}
