import { useState, useEffect } from "react";
import type { Scenario, VestingSchedule, Currency } from "./types";
import { formatTWD } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, Sparkles, Calculator } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface ScenarioInputProps {
  scenario: Scenario;
  onChange: (patch: Partial<Scenario>) => void;
  currency: Currency;
  onLoadExample?: () => void;
}

function SectionAccordion({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full py-2 group">
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 pt-1 pb-2">{children}</CollapsibleContent>
    </Collapsible>
  );
}

export default function ScenarioInput({ scenario, onChange, currency, onLoadExample }: ScenarioInputProps) {
  const s = scenario;
  const [currentExpanded, setCurrentExpanded] = useState(false);
  const [holidayCalcOpen, setHolidayCalcOpen] = useState(false);

  // Sync current comp total when breakdown fields change
  useEffect(() => {
    if (currentExpanded) {
      const sum = s.current_base_twd + s.current_bonus_twd + s.current_equity_twd;
      if (sum > 0 && sum !== s.current_comp_twd) {
        onChange({ current_comp_twd: sum });
      }
    }
  }, [s.current_base_twd, s.current_bonus_twd, s.current_equity_twd, currentExpanded]);

  // Auto-calculate holiday value when leave days change
  useEffect(() => {
    if (holidayCalcOpen && s.annual_leave_days > 0) {
      const totalComp = s.base_twd + s.bonus_twd;
      const dailyRate = totalComp / 365;
      const holidayValue = Math.round(dailyRate * s.annual_leave_days);
      if (holidayValue !== s.holiday_twd) {
        onChange({ holiday_twd: holidayValue });
      }
    }
  }, [s.annual_leave_days, s.base_twd, s.bonus_twd, holidayCalcOpen]);

  const numVal = (n: number) => (n === 0 ? "0" : (n || ""));
  const autoSelect = (e: React.FocusEvent<HTMLInputElement>) => e.target.select();

  const numChange = (field: keyof Scenario) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") {
      onChange({ [field]: 0 });
      return;
    }
    const v = parseFloat(raw);
    if (!isNaN(v)) onChange({ [field]: v });
  };

  const isEmpty = s.base_twd === 0 && s.bonus_twd === 0 && s.equity_4y_twd === 0;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
      {/* Empty state: show Example button */}
      {isEmpty && onLoadExample && (
        <button
          type="button"
          onClick={onLoadExample}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          Load example data to see how it works
        </button>
      )}

      {/* Header */}
      <h3 className="font-heading text-lg font-bold text-foreground">Offer Details</h3>

      {/* Offer Name */}
      <div className="space-y-2">
        <Label>Offer Name</Label>
        <Input value={s.name} onChange={(e) => onChange({ name: e.target.value })} />
      </div>

      {/* Base Salary */}
      <div className="space-y-2">
        <Label>Base Salary (annual, TWD)</Label>
        <Input
          type="number"
          inputMode="numeric"
          value={numVal(s.base_twd)}
          onChange={numChange("base_twd")}
          onFocus={autoSelect}
          placeholder="e.g. 1800000"
        />
      </div>

      {/* Annual Bonus */}
      <div className="space-y-2">
        <Label>Target Bonus (annual, TWD)</Label>
        <Input
          type="number"
          inputMode="numeric"
          value={numVal(s.bonus_twd)}
          onChange={numChange("bonus_twd")}
          onFocus={autoSelect}
          placeholder="e.g. 300000"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Equity */}
      <SectionAccordion title="Equity / Stock" defaultOpen={s.equity_4y_twd > 0}>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Total Equity Grant (4-year, TWD)</span>
          <Input type="number" inputMode="numeric" value={numVal(s.equity_4y_twd)} onChange={numChange("equity_4y_twd")} onFocus={autoSelect} placeholder="e.g. 2560000" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Vesting Period</span>
            <Select value={String(s.vesting_years)} onValueChange={(v) => onChange({ vesting_years: parseInt(v) as 3 | 4 | 5 })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 years</SelectItem>
                <SelectItem value="4">4 years</SelectItem>
                <SelectItem value="5">5 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Vesting Schedule</span>
            <Select value={s.vesting_schedule} onValueChange={(v) => onChange({ vesting_schedule: v as VestingSchedule })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="equal">Equal (25%/yr)</SelectItem>
                <SelectItem value="back_loaded">Back-loaded (10/20/30/40)</SelectItem>
                <SelectItem value="front_loaded">Front-loaded (40/30/20/10)</SelectItem>
                <SelectItem value="cliff_equal">Cliff + Equal (0/33/33/33)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {s.equity_4y_twd > 0 && (
          <p className="text-xs text-muted-foreground">
            Year 1 Equity: ~{formatTWD(s.equity_4y_twd * 0.25)}
          </p>
        )}
      </SectionAccordion>

      {/* Sign-on */}
      <SectionAccordion title="Sign-on Bonus" defaultOpen={s.signon_months > 0}>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Months of base salary</span>
          <Input type="number" inputMode="decimal" value={numVal(s.signon_months)} onChange={numChange("signon_months")} onFocus={autoSelect} placeholder="e.g. 2" min={0} step={0.5} />
        </div>
        {s.signon_months > 0 && s.base_twd > 0 && (
          <p className="text-xs text-muted-foreground">Sign-on: {formatTWD(s.base_twd * (s.signon_months / 12))}</p>
        )}
      </SectionAccordion>

      {/* Benefits */}
      <SectionAccordion title="Benefits" defaultOpen={s.benefits_twd > 0}>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Annual Benefits Value (TWD)</span>
          <Input type="number" inputMode="numeric" value={numVal(s.benefits_twd)} onChange={numChange("benefits_twd")} onFocus={autoSelect} placeholder="e.g. 120000" />
          <p className="text-xs text-muted-foreground">Health insurance, meal allowance, transport subsidy, gym membership, learning budget, etc.</p>
        </div>
      </SectionAccordion>

      {/* Holiday */}
      <SectionAccordion title="Holiday / Leave Value" defaultOpen={s.holiday_twd > 0 || s.annual_leave_days > 0}>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">Annual Holiday Value (TWD)</span>
          <Input
            type="number"
            inputMode="numeric"
            value={numVal(s.holiday_twd)}
            onChange={numChange("holiday_twd")}
            onFocus={autoSelect}
            placeholder="e.g. 50000"
            disabled={holidayCalcOpen}
          />
        </div>
        <button
          type="button"
          onClick={() => setHolidayCalcOpen(!holidayCalcOpen)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Calculator className="w-3 h-3" />
          {holidayCalcOpen ? "Enter manually instead" : "Calculate from leave days"}
        </button>
        {holidayCalcOpen && (
          <div className="space-y-2 pl-3 border-l-2 border-border">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Annual Leave Days</span>
              <Input
                type="number"
                inputMode="numeric"
                value={numVal(s.annual_leave_days)}
                onChange={numChange("annual_leave_days")}
                onFocus={autoSelect}
                placeholder="e.g. 15"
                min={0}
              />
            </div>
            {s.annual_leave_days > 0 && (s.base_twd + s.bonus_twd) > 0 && (
              <p className="text-xs text-muted-foreground">
                ({formatTWD(s.base_twd + s.bonus_twd)} / 365) × {s.annual_leave_days} days = {formatTWD(s.holiday_twd)}
              </p>
            )}
            {s.annual_leave_days > 0 && (s.base_twd + s.bonus_twd) === 0 && (
              <p className="text-xs text-destructive">Enter base salary first to calculate</p>
            )}
          </div>
        )}
      </SectionAccordion>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Current Comp */}
      <div className="space-y-3">
        <Label>Your Current Annual Total Comp (TWD)</Label>
        <Input
          type="number"
          inputMode="numeric"
          value={numVal(s.current_comp_twd)}
          onChange={(e) => {
            const raw = e.target.value;
            onChange({ current_comp_twd: raw === "" ? 0 : (parseFloat(raw) || 0) });
          }}
          onFocus={autoSelect}
          placeholder="Optional"
          disabled={currentExpanded}
        />
        <button
          type="button"
          onClick={() => setCurrentExpanded(!currentExpanded)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {currentExpanded ? "Use single total instead" : "Break down by base, bonus, equity"}
        </button>
        {currentExpanded && (
          <div className="space-y-2 pl-3 border-l-2 border-border">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Current Base</span>
              <Input type="number" inputMode="numeric" value={numVal(s.current_base_twd)} onChange={numChange("current_base_twd")} onFocus={autoSelect} placeholder="0" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Current Bonus</span>
              <Input type="number" inputMode="numeric" value={numVal(s.current_bonus_twd)} onChange={numChange("current_bonus_twd")} onFocus={autoSelect} placeholder="0" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Current Equity (annual)</span>
              <Input type="number" inputMode="numeric" value={numVal(s.current_equity_twd)} onChange={numChange("current_equity_twd")} onFocus={autoSelect} placeholder="0" />
            </div>
            <p className="text-xs text-muted-foreground">
              Total: {formatTWD(s.current_base_twd + s.current_bonus_twd + s.current_equity_twd)}
            </p>
          </div>
        )}
        <p className="text-xs text-muted-foreground">Used to calculate the difference vs your new offer</p>
      </div>
    </div>
  );
}
