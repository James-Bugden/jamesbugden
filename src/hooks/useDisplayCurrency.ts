import { useState, useCallback } from "react";
import type { Currency } from "@/components/offer-compass/types";
import { formatCurrency } from "@/components/offer-compass/types";

export function useDisplayCurrency() {
  const [currency, setCurrency] = useState<Currency>("TWD");

  const fmt = useCallback(
    (n: number, fxRate: number) => formatCurrency(n, currency, fxRate),
    [currency]
  );

  return { currency, setCurrency, fmt };
}
