import { useState, useCallback, useMemo } from "react";
import {
  OfferDataTw,
  OfferResultsTw,
  VESTING_SCHEDULES_TW,
  EXAMPLE_DATA_TW,
  createEmptyOfferTw,
} from "./types-tw";

export function useCompCalculatorZhTw() {
  const [offers, setOffers] = useState<OfferDataTw[]>([
    createEmptyOfferTw("Offer A"),
    createEmptyOfferTw("Offer B"),
  ]);
  const [exampleLoaded, setExampleLoaded] = useState(false);

  const updateOffer = useCallback(
    (index: number, updates: Partial<OfferDataTw>) => {
      setOffers((prev) =>
        prev.map((o, i) => (i === index ? { ...o, ...updates } : o))
      );
    },
    []
  );

  const addOffer = useCallback(() => {
    if (offers.length < 3) {
      setOffers((prev) => [...prev, createEmptyOfferTw("目前工作", true)]);
    }
  }, [offers.length]);

  const removeOffer = useCallback(
    (index: number) => {
      if (offers.length > 1) {
        setOffers((prev) => prev.filter((_, i) => i !== index));
      }
    },
    [offers.length]
  );

  const resetAll = useCallback(() => {
    setOffers([createEmptyOfferTw("Offer A"), createEmptyOfferTw("Offer B")]);
    setExampleLoaded(false);
  }, []);

  const loadExample = useCallback(() => {
    setOffers([...EXAMPLE_DATA_TW]);
    setExampleLoaded(true);
  }, []);

  const calculateResults = useCallback((offer: OfferDataTw): OfferResultsTw => {
    const guaranteedAnnual = offer.monthlySalary * offer.guaranteedMonths;

    const bonusValue =
      offer.bonusMode === "percent"
        ? offer.monthlySalary * 12 * (offer.bonusPercent / 100)
        : offer.bonusFixed;

    const vestingPcts =
      offer.vestingSchedule === "自訂"
        ? offer.customVesting
        : VESTING_SCHEDULES_TW[offer.vestingSchedule] || [25, 25, 25, 25];

    const rsuYearValues: [number, number, number, number] = offer.showRSU
      ? [
          offer.rsuGrant * (vestingPcts[0] / 100),
          offer.rsuGrant * (vestingPcts[1] / 100),
          offer.rsuGrant * (vestingPcts[2] / 100),
          offer.rsuGrant * (vestingPcts[3] / 100),
        ]
      : [0, 0, 0, 0];

    const stockOptionAnnualValue = offer.showStockOptions
      ? Math.max(
          0,
          ((offer.optionFMV - offer.optionStrike) * offer.optionShares) /
            (offer.optionVestingYears || 4)
        )
      : 0;

    const esppBenefit = offer.showESPP
      ? offer.esppContribution * (offer.esppDiscount / 100)
      : 0;

    // 勞退雇主提撥 6%
    const laborRetirement = offer.monthlySalary * 0.06 * 12;

    const mealAnnual = offer.mealAllowanceMonthly * 12;
    const transportAnnual = offer.transportAllowanceMonthly * 12;
    const overtimeAnnual = offer.showOvertime ? offer.overtimeMonthly * 12 : 0;
    const ptoValue = offer.ptoDays * (offer.monthlySalary / 30);

    const baseAnnual =
      guaranteedAnnual +
      offer.yearEndBonusExtra +
      bonusValue +
      offer.profitSharingCash +
      offer.profitSharingStock +
      stockOptionAnnualValue +
      esppBenefit +
      offer.extraRetirement +
      offer.insuranceUpgrade +
      mealAnnual +
      transportAnnual +
      overtimeAnnual +
      offer.otherStipends;

    const year1Total =
      baseAnnual +
      (offer.isCurrentJob ? 0 : offer.signOnBonus) +
      (offer.isCurrentJob ? 0 : offer.relocation) +
      rsuYearValues[0];

    const year2Total =
      baseAnnual +
      (offer.showYear2SignOn && !offer.isCurrentJob ? offer.signOnYear2 : 0) +
      rsuYearValues[1];

    const year3Total = baseAnnual + rsuYearValues[2];
    const year4Total = baseAnnual + rsuYearValues[3];

    return {
      guaranteedAnnual,
      year1Total,
      year2Total,
      year3Total,
      year4Total,
      fourYearTotal: year1Total + year2Total + year3Total + year4Total,
      effectiveMonthly: Math.round(year1Total / 12),
      bonusValue,
      rsuYearValues,
      stockOptionAnnualValue,
      esppBenefit,
      laborRetirement,
      ptoValue,
    };
  }, []);

  const results = useMemo(
    () => offers.map(calculateResults),
    [offers, calculateResults]
  );

  const cascadeInsight = useMemo(() => {
    const offer = offers[0];
    if (!offer || offer.guaranteedMonths <= 0) return null;

    const raise = 5000; // NT$5,000/month
    const guaranteedExtra = raise * offer.guaranteedMonths;
    const hasBonusPct = offer.bonusMode === "percent" && offer.bonusPercent > 0;
    const bonusExtra = hasBonusPct ? raise * 12 * (offer.bonusPercent / 100) : 0;
    const laborExtra = raise * 0.06 * 12;
    const total = guaranteedExtra + bonusExtra + laborExtra;

    return { guaranteedExtra, bonusExtra, laborExtra, total };
  }, [offers]);

  return {
    offers,
    results,
    updateOffer,
    addOffer,
    removeOffer,
    resetAll,
    loadExample,
    exampleLoaded,
    cascadeInsight,
  };
}
