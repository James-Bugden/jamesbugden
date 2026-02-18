export interface Scenario {
  id: string;
  name: string;
  base_twd: number;
  bonus_twd: number;
  equity_4y_twd: number;
  vesting_years: 3 | 4 | 5;
  vesting_schedule: VestingSchedule;
  signon_months: number;
  benefits_twd: number;
  holiday_twd: number;
  annual_leave_days: number;
  current_comp_twd: number;
  current_base_twd: number;
  current_bonus_twd: number;
  current_equity_twd: number;
  fx_rate: number;
}

export type VestingSchedule = "equal" | "back_loaded" | "front_loaded" | "cliff_equal";
export type Currency = "TWD" | "USD" | "HKD" | "SGD" | "JPY" | "EUR" | "GBP";

export const CURRENCY_OPTIONS: { value: Currency; label: string }[] = [
  { value: "TWD", label: "TWD (NT$)" },
  { value: "USD", label: "USD (US$)" },
  { value: "HKD", label: "HKD (HK$)" },
  { value: "SGD", label: "SGD (S$)" },
  { value: "JPY", label: "JPY (¥)" },
  { value: "EUR", label: "EUR (€)" },
  { value: "GBP", label: "GBP (£)" },
];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  TWD: "NT$",
  USD: "US$",
  HKD: "HK$",
  SGD: "S$",
  JPY: "¥",
  EUR: "€",
  GBP: "£",
};

export function getVestingPcts(schedule: VestingSchedule, years: 3 | 4 | 5): number[] {
  if (years === 3) return [33.33, 33.33, 33.34];
  if (years === 5) return [20, 20, 20, 20, 20];
  switch (schedule) {
    case "back_loaded": return [10, 20, 30, 40];
    case "front_loaded": return [40, 30, 20, 10];
    case "cliff_equal": return [0, 33.33, 33.33, 33.34];
    default: return [25, 25, 25, 25];
  }
}

export interface YearBreakdown {
  year: number;
  base: number;
  variable: number;
  equity: number;
  signon: number;
  benefits: number;
  holiday: number;
  total: number;
  vsCurrent: number;
}

export interface CalcResult {
  base: number;
  variable: number;
  equityY1: number;
  equityTotalTwd: number;
  ote: number;
  signon: number;
  benefits: number;
  holiday: number;
  year1Total: number;
  annualRecurring: number;
  hasCurrent: boolean;
  deltaPct: number;
  deltaAbs: number;
  years: YearBreakdown[];
  vestPcts: number[];
}

function n(v: number): number { return isNaN(v) || !isFinite(v) ? 0 : v; }

export function calcScenario(s: Scenario): CalcResult {
  const base = n(s.base_twd);
  const variable = n(s.bonus_twd);
  const equityTotalTwd = n(s.equity_4y_twd);
  const vestPcts = getVestingPcts(s.vesting_schedule, s.vesting_years);
  const equityY1 = n(equityTotalTwd * (vestPcts[0] / 100));
  const ote = n(base + variable + equityY1);
  const signon = n(base * (n(s.signon_months) / 12));
  const benefits = n(s.benefits_twd);
  const holiday = n(s.holiday_twd);
  const year1Total = ote + signon + benefits + holiday;
  const annualRecurring = ote + benefits + holiday;

  const hasCurrent = n(s.current_comp_twd) > 0;
  const deltaPct = hasCurrent ? n((year1Total - s.current_comp_twd) / s.current_comp_twd) : 0;
  const deltaAbs = hasCurrent ? n(year1Total - s.current_comp_twd) : 0;

  const years: YearBreakdown[] = [];
  for (let i = 0; i < s.vesting_years; i++) {
    const eqY = n(equityTotalTwd * (vestPcts[i] / 100));
    const signY = i === 0 ? signon : 0;
    const total = n(base + variable + eqY + signY + benefits + holiday);
    years.push({
      year: i + 1,
      base,
      variable,
      equity: eqY,
      signon: signY,
      benefits,
      holiday,
      total,
      vsCurrent: hasCurrent ? n((total - s.current_comp_twd) / s.current_comp_twd) : 0,
    });
  }

  return { base, variable, equityY1, equityTotalTwd, ote, signon, benefits, holiday, year1Total, annualRecurring, hasCurrent, deltaPct, deltaAbs, years, vestPcts };
}

const nf = new Intl.NumberFormat("en-US");

export function formatTWD(v: number): string {
  return `NT$${nf.format(Math.round(isNaN(v) ? 0 : v))}`;
}

export function formatUSD(v: number): string {
  return `US$${nf.format(Math.round(isNaN(v) ? 0 : v))}`;
}

export function formatCurrency(v: number, currency: Currency, fxRate: number): string {
  const safe = isNaN(v) ? 0 : v;
  if (currency === "TWD") return formatTWD(safe);
  const symbol = CURRENCY_SYMBOLS[currency] || currency;
  const converted = safe / (fxRate || 1);
  return `${symbol}${nf.format(Math.round(converted))}`;
}

export function formatPct(v: number): string {
  const safe = isNaN(v) ? 0 : v;
  return `${safe >= 0 ? "+" : ""}${(safe * 100).toFixed(1)}%`;
}

export function defaultScenario(): Scenario {
  return {
    id: crypto.randomUUID(),
    name: "Untitled Scenario",
    base_twd: 0,
    bonus_twd: 0,
    equity_4y_twd: 0,
    vesting_years: 4,
    vesting_schedule: "equal",
    signon_months: 0,
    benefits_twd: 0,
    holiday_twd: 0,
    annual_leave_days: 0,
    current_comp_twd: 0,
    current_base_twd: 0,
    current_bonus_twd: 0,
    current_equity_twd: 0,
    fx_rate: 32,
  };
}

const EXAMPLES: Array<{ en: string; zhTw: string; data: Omit<Scenario, "id" | "name"> }> = [
  {
    en: "Example: Senior Engineer (TW)",
    zhTw: "範例：資深工程師（台灣）",
    data: {
      base_twd: 2190000, bonus_twd: 300000, equity_4y_twd: 2560000,
      vesting_years: 4, vesting_schedule: "equal", signon_months: 2,
      benefits_twd: 120000, holiday_twd: 50000, annual_leave_days: 15,
      current_comp_twd: 2200000, current_base_twd: 1600000,
      current_bonus_twd: 400000, current_equity_twd: 200000, fx_rate: 32,
    },
  },
  {
    en: "Example: Product Manager (TW)",
    zhTw: "範例：產品經理（台灣）",
    data: {
      base_twd: 1800000, bonus_twd: 250000, equity_4y_twd: 1600000,
      vesting_years: 4, vesting_schedule: "equal", signon_months: 1,
      benefits_twd: 100000, holiday_twd: 40000, annual_leave_days: 12,
      current_comp_twd: 1500000, current_base_twd: 1200000,
      current_bonus_twd: 200000, current_equity_twd: 100000, fx_rate: 32,
    },
  },
  {
    en: "Example: Data Scientist (TW)",
    zhTw: "範例：資料科學家（台灣）",
    data: {
      base_twd: 2400000, bonus_twd: 400000, equity_4y_twd: 3200000,
      vesting_years: 4, vesting_schedule: "equal", signon_months: 3,
      benefits_twd: 150000, holiday_twd: 60000, annual_leave_days: 18,
      current_comp_twd: 1800000, current_base_twd: 1400000,
      current_bonus_twd: 300000, current_equity_twd: 100000, fx_rate: 32,
    },
  },
  {
    en: "Example: Marketing Manager (TW)",
    zhTw: "範例：行銷經理（台灣）",
    data: {
      base_twd: 1500000, bonus_twd: 200000, equity_4y_twd: 800000,
      vesting_years: 4, vesting_schedule: "equal", signon_months: 1,
      benefits_twd: 80000, holiday_twd: 30000, annual_leave_days: 10,
      current_comp_twd: 1200000, current_base_twd: 1000000,
      current_bonus_twd: 150000, current_equity_twd: 50000, fx_rate: 32,
    },
  },
];

let exampleIndex = 0;

export function exampleScenario(locale: "en" | "zh-tw" = "en"): Scenario {
  const ex = EXAMPLES[exampleIndex % EXAMPLES.length];
  exampleIndex++;
  return {
    id: crypto.randomUUID(),
    name: locale === "zh-tw" ? ex.zhTw : ex.en,
    ...ex.data,
  };
}
