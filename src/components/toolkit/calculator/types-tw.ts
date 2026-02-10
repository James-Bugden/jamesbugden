export interface OfferDataTw {
  name: string;
  // Cash
  monthlySalary: number;
  guaranteedMonths: number;
  yearEndBonusExtra: number;
  bonusMode: "percent" | "fixed";
  bonusPercent: number;
  bonusFixed: number;
  signOnBonus: number;
  showYear2SignOn: boolean;
  signOnYear2: number;
  relocation: number;
  isCurrentJob: boolean;
  // Equity / Profit Sharing
  profitSharingCash: number;
  profitSharingStock: number;
  showRSU: boolean;
  rsuGrant: number;
  vestingSchedule: string;
  customVesting: [number, number, number, number];
  showStockOptions: boolean;
  optionShares: number;
  optionStrike: number;
  optionFMV: number;
  optionVestingYears: number;
  showESPP: boolean;
  esppContribution: number;
  esppDiscount: number;
  // Retirement
  extraRetirement: number;
  // Benefits
  insuranceUpgrade: number;
  mealAllowanceMonthly: number;
  transportAllowanceMonthly: number;
  showOvertime: boolean;
  overtimeMonthly: number;
  ptoDays: number;
  otherStipends: number;
}

export interface OfferResultsTw {
  guaranteedAnnual: number;
  year1Total: number;
  year2Total: number;
  year3Total: number;
  year4Total: number;
  fourYearTotal: number;
  effectiveMonthly: number;
  bonusValue: number;
  rsuYearValues: [number, number, number, number];
  stockOptionAnnualValue: number;
  esppBenefit: number;
  laborRetirement: number;
  ptoValue: number;
}

export const VESTING_SCHEDULES_TW: Record<string, [number, number, number, number]> = {
  "4 年平均 (25/25/25/25)": [25, 25, 25, 25],
  "4 年後重 (5/15/40/40)": [5, 15, 40, 40],
  "4 年前重 (33/33/22/12)": [33, 33, 22, 12],
  "3 年平均 (33/33/34/0)": [33, 33, 34, 0],
  "自訂": [25, 25, 25, 25],
};

export const EXAMPLE_DATA_TW: OfferDataTw[] = [
  {
    name: "外商科技公司",
    monthlySalary: 85000,
    guaranteedMonths: 14,
    yearEndBonusExtra: 170000,
    bonusMode: "percent",
    bonusPercent: 10,
    bonusFixed: 0,
    signOnBonus: 100000,
    showYear2SignOn: false,
    signOnYear2: 0,
    relocation: 0,
    isCurrentJob: false,
    profitSharingCash: 0,
    profitSharingStock: 0,
    showRSU: true,
    rsuGrant: 1200000,
    vestingSchedule: "4 年平均 (25/25/25/25)",
    customVesting: [25, 25, 25, 25],
    showStockOptions: false,
    optionShares: 0,
    optionStrike: 0,
    optionFMV: 0,
    optionVestingYears: 4,
    showESPP: false,
    esppContribution: 0,
    esppDiscount: 15,
    extraRetirement: 0,
    insuranceUpgrade: 15000,
    mealAllowanceMonthly: 2400,
    transportAllowanceMonthly: 0,
    showOvertime: false,
    overtimeMonthly: 0,
    ptoDays: 15,
    otherStipends: 12000,
  },
  {
    name: "半導體公司",
    monthlySalary: 75000,
    guaranteedMonths: 14,
    yearEndBonusExtra: 200000,
    bonusMode: "fixed",
    bonusPercent: 0,
    bonusFixed: 0,
    signOnBonus: 0,
    showYear2SignOn: false,
    signOnYear2: 0,
    relocation: 50000,
    isCurrentJob: false,
    profitSharingCash: 400000,
    profitSharingStock: 200000,
    showRSU: false,
    rsuGrant: 0,
    vestingSchedule: "4 年平均 (25/25/25/25)",
    customVesting: [25, 25, 25, 25],
    showStockOptions: false,
    optionShares: 0,
    optionStrike: 0,
    optionFMV: 0,
    optionVestingYears: 4,
    showESPP: false,
    esppContribution: 0,
    esppDiscount: 15,
    extraRetirement: 0,
    insuranceUpgrade: 25000,
    mealAllowanceMonthly: 2400,
    transportAllowanceMonthly: 3000,
    showOvertime: true,
    overtimeMonthly: 18000,
    ptoDays: 12,
    otherStipends: 30000,
  },
  {
    name: "目前工作",
    monthlySalary: 65000,
    guaranteedMonths: 13,
    yearEndBonusExtra: 65000,
    bonusMode: "fixed",
    bonusPercent: 0,
    bonusFixed: 0,
    signOnBonus: 0,
    showYear2SignOn: false,
    signOnYear2: 0,
    relocation: 0,
    isCurrentJob: true,
    profitSharingCash: 0,
    profitSharingStock: 0,
    showRSU: false,
    rsuGrant: 0,
    vestingSchedule: "4 年平均 (25/25/25/25)",
    customVesting: [25, 25, 25, 25],
    showStockOptions: false,
    optionShares: 0,
    optionStrike: 0,
    optionFMV: 0,
    optionVestingYears: 4,
    showESPP: false,
    esppContribution: 0,
    esppDiscount: 15,
    extraRetirement: 0,
    insuranceUpgrade: 0,
    mealAllowanceMonthly: 2400,
    transportAllowanceMonthly: 0,
    showOvertime: false,
    overtimeMonthly: 0,
    ptoDays: 10,
    otherStipends: 6000,
  },
];

export function createEmptyOfferTw(name: string, isCurrentJob = false): OfferDataTw {
  return {
    name,
    monthlySalary: 0,
    guaranteedMonths: 14,
    yearEndBonusExtra: 0,
    bonusMode: "percent",
    bonusPercent: 0,
    bonusFixed: 0,
    signOnBonus: 0,
    showYear2SignOn: false,
    signOnYear2: 0,
    relocation: 0,
    isCurrentJob,
    profitSharingCash: 0,
    profitSharingStock: 0,
    showRSU: false,
    rsuGrant: 0,
    vestingSchedule: "4 年平均 (25/25/25/25)",
    customVesting: [25, 25, 25, 25],
    showStockOptions: false,
    optionShares: 0,
    optionStrike: 0,
    optionFMV: 0,
    optionVestingYears: 4,
    showESPP: false,
    esppContribution: 0,
    esppDiscount: 15,
    extraRetirement: 0,
    insuranceUpgrade: 0,
    mealAllowanceMonthly: 0,
    transportAllowanceMonthly: 0,
    showOvertime: false,
    overtimeMonthly: 0,
    ptoDays: 0,
    otherStipends: 0,
  };
}
