import { useState, useCallback, useMemo } from "react";
import {
  OfferData,
  OfferResults,
  VESTING_SCHEDULES,
  EXAMPLE_DATA,
  createEmptyOffer,
} from "./types";

export function useCompCalculator() {
  const [offers, setOffers] = useState<OfferData[]>([
    createEmptyOffer("Offer A"),
    createEmptyOffer("Offer B"),
  ]);
  const [exampleLoaded, setExampleLoaded] = useState(false);

  const updateOffer = useCallback(
    (index: number, updates: Partial<OfferData>) => {
      setOffers((prev) =>
        prev.map((o, i) => (i === index ? { ...o, ...updates } : o))
      );
    },
    []
  );

  const addOffer = useCallback(() => {
    if (offers.length < 3) {
      setOffers((prev) => [...prev, createEmptyOffer("Current Job", true)]);
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
    setOffers([createEmptyOffer("Offer A"), createEmptyOffer("Offer B")]);
    setExampleLoaded(false);
  }, []);

  const loadExample = useCallback(() => {
    setOffers([...EXAMPLE_DATA]);
    setExampleLoaded(true);
  }, []);

  const calculateResults = useCallback((offer: OfferData): OfferResults => {
    const bonusValue =
      offer.bonusMode === "percent"
        ? offer.baseSalary * (offer.bonusPercent / 100)
        : offer.bonusFixed;

    const vestingPcts =
      offer.vestingSchedule === "Custom"
        ? offer.customVesting
        : VESTING_SCHEDULES[offer.vestingSchedule] || [25, 25, 25, 25];

    const rsuYearValues: [number, number, number, number] = [
      offer.rsuGrant * (vestingPcts[0] / 100),
      offer.rsuGrant * (vestingPcts[1] / 100),
      offer.rsuGrant * (vestingPcts[2] / 100),
      offer.rsuGrant * (vestingPcts[3] / 100),
    ];

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

    const retirementMatch =
      offer.baseSalary * (offer.matchCap / 100) * (offer.matchRate / 100);

    const healthAnnual = offer.healthInsuranceMonthly * 12;
    const commuteAnnual = offer.commuteMonthly * 12;
    const ptoValue = offer.ptoDays * (offer.baseSalary / 260);

    const baseAnnual =
      offer.baseSalary +
      bonusValue +
      stockOptionAnnualValue +
      esppBenefit +
      retirementMatch +
      offer.otherStipends -
      healthAnnual -
      commuteAnnual;

    const year1Total =
      baseAnnual +
      (offer.isCurrentJob ? 0 : offer.signOnYear1) +
      (offer.isCurrentJob ? 0 : offer.relocation) +
      rsuYearValues[0];

    const year2Total =
      baseAnnual +
      (offer.showYear2SignOn && !offer.isCurrentJob ? offer.signOnYear2 : 0) +
      rsuYearValues[1];

    const year3Total = baseAnnual + rsuYearValues[2];
    const year4Total = baseAnnual + rsuYearValues[3];

    return {
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
      retirementMatch,
      healthAnnual,
      commuteAnnual,
      ptoValue,
    };
  }, []);

  const results = useMemo(
    () => offers.map(calculateResults),
    [offers, calculateResults]
  );

  const cascadeInsight = useMemo(() => {
    const offer = offers[0];
    if (!offer) return null;
    const hasBonusPct = offer.bonusMode === "percent" && offer.bonusPercent > 0;
    const hasMatch = offer.matchRate > 0 && offer.matchCap > 0;
    const hasESPP = offer.showESPP && offer.esppContribution > 0;
    if (!hasBonusPct && !hasMatch && !hasESPP) return null;

    const raise = 10000;
    const bonusExtra = hasBonusPct ? raise * (offer.bonusPercent / 100) : 0;
    const matchExtra = hasMatch
      ? raise * (offer.matchCap / 100) * (offer.matchRate / 100)
      : 0;
    const esppExtra = 0; // ESPP contribution is independent of salary
    const total = raise + bonusExtra + matchExtra + esppExtra;

    return { bonusExtra, matchExtra, esppExtra, total };
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
