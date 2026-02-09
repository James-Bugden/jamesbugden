export interface OfferData {
  name: string;
  // Cash
  baseSalary: number;
  bonusMode: "percent" | "fixed";
  bonusPercent: number;
  bonusFixed: number;
  signOnYear1: number;
  signOnYear2: number;
  showYear2SignOn: boolean;
  relocation: number;
  isCurrentJob: boolean;
  // Equity
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
  matchRate: number;
  matchCap: number;
  // Benefits
  healthInsuranceMonthly: number;
  ptoDays: number;
  commuteMonthly: number;
  otherStipends: number;
}

export interface OfferResults {
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
  retirementMatch: number;
  healthAnnual: number;
  commuteAnnual: number;
  ptoValue: number;
}

export const VESTING_SCHEDULES: Record<string, [number, number, number, number]> = {
  "4-year even (25/25/25/25)": [25, 25, 25, 25],
  "4-year backloaded (5/15/40/40)": [5, 15, 40, 40],
  "4-year frontloaded (33/33/22/12)": [33, 33, 22, 12],
  "3-year even (33/33/34/0)": [33, 33, 34, 0],
  Custom: [25, 25, 25, 25],
};

export const EXAMPLE_DATA: OfferData[] = [
  {
    name: "Growth Startup",
    baseSalary: 165000,
    bonusMode: "percent",
    bonusPercent: 10,
    bonusFixed: 0,
    signOnYear1: 30000,
    signOnYear2: 0,
    showYear2SignOn: false,
    relocation: 0,
    isCurrentJob: false,
    rsuGrant: 240000,
    vestingSchedule: "4-year even (25/25/25/25)",
    customVesting: [25, 25, 25, 25],
    showStockOptions: false,
    optionShares: 0,
    optionStrike: 0,
    optionFMV: 0,
    optionVestingYears: 4,
    showESPP: false,
    esppContribution: 0,
    esppDiscount: 15,
    matchRate: 50,
    matchCap: 4,
    healthInsuranceMonthly: 180,
    ptoDays: 20,
    commuteMonthly: 0,
    otherStipends: 2000,
  },
  {
    name: "Public Tech Co",
    baseSalary: 155000,
    bonusMode: "percent",
    bonusPercent: 15,
    bonusFixed: 0,
    signOnYear1: 50000,
    signOnYear2: 25000,
    showYear2SignOn: true,
    relocation: 10000,
    isCurrentJob: false,
    rsuGrant: 320000,
    vestingSchedule: "4-year backloaded (5/15/40/40)",
    customVesting: [25, 25, 25, 25],
    showStockOptions: false,
    optionShares: 0,
    optionStrike: 0,
    optionFMV: 0,
    optionVestingYears: 4,
    showESPP: true,
    esppContribution: 10000,
    esppDiscount: 15,
    matchRate: 100,
    matchCap: 6,
    healthInsuranceMonthly: 0,
    ptoDays: 25,
    commuteMonthly: 200,
    otherStipends: 8000,
  },
  {
    name: "Current Job",
    baseSalary: 140000,
    bonusMode: "percent",
    bonusPercent: 10,
    bonusFixed: 0,
    signOnYear1: 0,
    signOnYear2: 0,
    showYear2SignOn: false,
    relocation: 0,
    isCurrentJob: true,
    rsuGrant: 80000,
    vestingSchedule: "4-year even (25/25/25/25)",
    customVesting: [25, 25, 25, 25],
    showStockOptions: false,
    optionShares: 0,
    optionStrike: 0,
    optionFMV: 0,
    optionVestingYears: 4,
    showESPP: false,
    esppContribution: 0,
    esppDiscount: 15,
    matchRate: 50,
    matchCap: 3,
    healthInsuranceMonthly: 250,
    ptoDays: 15,
    commuteMonthly: 150,
    otherStipends: 0,
  },
];

export function createEmptyOffer(name: string, isCurrentJob = false): OfferData {
  return {
    name,
    baseSalary: 0,
    bonusMode: "percent",
    bonusPercent: 0,
    bonusFixed: 0,
    signOnYear1: 0,
    signOnYear2: 0,
    showYear2SignOn: false,
    relocation: 0,
    isCurrentJob,
    rsuGrant: 0,
    vestingSchedule: "4-year even (25/25/25/25)",
    customVesting: [25, 25, 25, 25],
    showStockOptions: false,
    optionShares: 0,
    optionStrike: 0,
    optionFMV: 0,
    optionVestingYears: 4,
    showESPP: false,
    esppContribution: 0,
    esppDiscount: 15,
    matchRate: 0,
    matchCap: 0,
    healthInsuranceMonthly: 0,
    ptoDays: 0,
    commuteMonthly: 0,
    otherStipends: 0,
  };
}
