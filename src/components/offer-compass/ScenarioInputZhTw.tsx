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

export default function ScenarioInputZhTw({ scenario, onChange, currency, onLoadExample }: ScenarioInputProps) {
  const s = scenario;
  const [currentExpanded, setCurrentExpanded] = useState(false);
  const [holidayCalcOpen, setHolidayCalcOpen] = useState(false);

  useEffect(() => {
    if (currentExpanded) {
      const sum = s.current_base_twd + s.current_bonus_twd + s.current_equity_twd;
      if (sum > 0 && sum !== s.current_comp_twd) onChange({ current_comp_twd: sum });
    }
  }, [s.current_base_twd, s.current_bonus_twd, s.current_equity_twd, currentExpanded]);

  useEffect(() => {
    if (holidayCalcOpen && s.annual_leave_days > 0) {
      const totalComp = s.base_twd + s.bonus_twd;
      const dailyRate = totalComp / 365;
      const holidayValue = Math.round(dailyRate * s.annual_leave_days);
      if (holidayValue !== s.holiday_twd) onChange({ holiday_twd: holidayValue });
    }
  }, [s.annual_leave_days, s.base_twd, s.bonus_twd, holidayCalcOpen]);

  const numVal = (n: number) => (n === 0 ? "0" : (n || ""));
  const autoSelect = (e: React.FocusEvent<HTMLInputElement>) => e.target.select();

  const numChange = (field: keyof Scenario) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === "") { onChange({ [field]: 0 }); return; }
    const v = parseFloat(raw);
    if (!isNaN(v)) onChange({ [field]: v });
  };

  const isEmpty = s.base_twd === 0 && s.bonus_twd === 0 && s.equity_4y_twd === 0;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6">
      {isEmpty && onLoadExample && (
        <button type="button" onClick={onLoadExample} className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-border py-3 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors">
          <Sparkles className="w-4 h-4" />載入範例資料
        </button>
      )}

      <h3 className="font-heading text-lg font-bold text-foreground">Offer 詳情</h3>

      <div className="space-y-2">
        <Label>Offer 名稱</Label>
        <Input value={s.name} onChange={(e) => onChange({ name: e.target.value })} />
      </div>

      <div className="space-y-2">
        <Label>底薪（年薪，台幣）</Label>
        <Input type="number" inputMode="numeric" value={numVal(s.base_twd)} onChange={numChange("base_twd")} onFocus={autoSelect} placeholder="例如 1800000" />
      </div>

      <div className="space-y-2">
        <Label>目標獎金（年度，台幣）</Label>
        <Input type="number" inputMode="numeric" value={numVal(s.bonus_twd)} onChange={numChange("bonus_twd")} onFocus={autoSelect} placeholder="例如 300000" />
      </div>

      <div className="border-t border-border" />

      <SectionAccordion title="股票 / 股權" defaultOpen={s.equity_4y_twd > 0}>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">股票總授予額（4年，台幣）</span>
          <Input type="number" inputMode="numeric" value={numVal(s.equity_4y_twd)} onChange={numChange("equity_4y_twd")} onFocus={autoSelect} placeholder="例如 2560000" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">歸屬期間</span>
            <Select value={String(s.vesting_years)} onValueChange={(v) => onChange({ vesting_years: parseInt(v) as 3 | 4 | 5 })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 年</SelectItem>
                <SelectItem value="4">4 年</SelectItem>
                <SelectItem value="5">5 年</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">歸屬方式</span>
            <Select value={s.vesting_schedule} onValueChange={(v) => onChange({ vesting_schedule: v as VestingSchedule })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="equal">均等 (25%/年)</SelectItem>
                <SelectItem value="back_loaded">後重 (10/20/30/40)</SelectItem>
                <SelectItem value="front_loaded">前重 (40/30/20/10)</SelectItem>
                <SelectItem value="cliff_equal">懸崖+均等 (0/33/33/33)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        {s.equity_4y_twd > 0 && <p className="text-xs text-muted-foreground">第一年股票：~{formatTWD(s.equity_4y_twd * 0.25)}</p>}
      </SectionAccordion>

      <SectionAccordion title="簽約獎金" defaultOpen={s.signon_months > 0}>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">底薪月數</span>
          <Input type="number" inputMode="decimal" value={numVal(s.signon_months)} onChange={numChange("signon_months")} onFocus={autoSelect} placeholder="例如 2" min={0} step={0.5} />
        </div>
        {s.signon_months > 0 && s.base_twd > 0 && <p className="text-xs text-muted-foreground">簽約獎金：{formatTWD(s.base_twd * (s.signon_months / 12))}</p>}
      </SectionAccordion>

      <SectionAccordion title="福利" defaultOpen={s.benefits_twd > 0}>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">年度福利價值（台幣）</span>
          <Input type="number" inputMode="numeric" value={numVal(s.benefits_twd)} onChange={numChange("benefits_twd")} onFocus={autoSelect} placeholder="例如 120000" />
          <p className="text-xs text-muted-foreground">健康保險、餐費補貼、交通補助、健身房會員、學習預算等</p>
        </div>
      </SectionAccordion>

      <SectionAccordion title="假期 / 休假價值" defaultOpen={s.holiday_twd > 0 || s.annual_leave_days > 0}>
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground">年度假期價值（台幣）</span>
          <Input type="number" inputMode="numeric" value={numVal(s.holiday_twd)} onChange={numChange("holiday_twd")} onFocus={autoSelect} placeholder="例如 50000" disabled={holidayCalcOpen} />
        </div>
        <button type="button" onClick={() => setHolidayCalcOpen(!holidayCalcOpen)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
          <Calculator className="w-3 h-3" />
          {holidayCalcOpen ? "改為手動輸入" : "從休假天數計算"}
        </button>
        {holidayCalcOpen && (
          <div className="space-y-2 pl-3 border-l-2 border-border">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">年假天數</span>
              <Input type="number" inputMode="numeric" value={numVal(s.annual_leave_days)} onChange={numChange("annual_leave_days")} onFocus={autoSelect} placeholder="例如 15" min={0} />
            </div>
            {s.annual_leave_days > 0 && (s.base_twd + s.bonus_twd) > 0 && (
              <p className="text-xs text-muted-foreground">({formatTWD(s.base_twd + s.bonus_twd)} / 365) × {s.annual_leave_days} 天 = {formatTWD(s.holiday_twd)}</p>
            )}
            {s.annual_leave_days > 0 && (s.base_twd + s.bonus_twd) === 0 && (
              <p className="text-xs text-destructive">請先輸入底薪以進行計算</p>
            )}
          </div>
        )}
      </SectionAccordion>

      <div className="border-t border-border" />

      <div className="space-y-3">
        <Label>你目前的年度總薪酬（台幣）</Label>
        <Input type="number" inputMode="numeric" value={numVal(s.current_comp_twd)} onChange={(e) => { const raw = e.target.value; onChange({ current_comp_twd: raw === "" ? 0 : (parseFloat(raw) || 0) }); }} onFocus={autoSelect} placeholder="選填" disabled={currentExpanded} />
        <button type="button" onClick={() => setCurrentExpanded(!currentExpanded)} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
          {currentExpanded ? "改用單一總額" : "拆分為底薪、獎金、股票"}
        </button>
        {currentExpanded && (
          <div className="space-y-2 pl-3 border-l-2 border-border">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">目前底薪</span>
              <Input type="number" inputMode="numeric" value={numVal(s.current_base_twd)} onChange={numChange("current_base_twd")} onFocus={autoSelect} placeholder="0" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">目前獎金</span>
              <Input type="number" inputMode="numeric" value={numVal(s.current_bonus_twd)} onChange={numChange("current_bonus_twd")} onFocus={autoSelect} placeholder="0" />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">目前股票（年度）</span>
              <Input type="number" inputMode="numeric" value={numVal(s.current_equity_twd)} onChange={numChange("current_equity_twd")} onFocus={autoSelect} placeholder="0" />
            </div>
            <p className="text-xs text-muted-foreground">合計：{formatTWD(s.current_base_twd + s.current_bonus_twd + s.current_equity_twd)}</p>
          </div>
        )}
        <p className="text-xs text-muted-foreground">用於計算新 Offer 與現有薪酬的差異</p>
      </div>
    </div>
  );
}
