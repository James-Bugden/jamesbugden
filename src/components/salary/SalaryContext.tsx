import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Currency = "NTD" | "USD";
type Period = "annual" | "monthly";

interface SalaryContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  period: Period;
  setPeriod: (p: Period) => void;
  fxRate: number;
  formatSalary: (value: number) => string;
}

const SalaryContext = createContext<SalaryContextType | null>(null);

export function SalaryProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("NTD");
  const [period, setPeriod] = useState<Period>("annual");
  const [fxRate, setFxRate] = useState(32);

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/TWD")
      .then(r => r.json())
      .then(data => {
        if (data?.rates?.USD) setFxRate(Math.round(1 / data.rates.USD * 100) / 100);
      })
      .catch(() => {});
  }, []);

  const formatSalary = useCallback((value: number) => {
    let v = period === "monthly" ? value / 12 : value;
    if (currency === "USD") v = v / fxRate;

    const prefix = currency === "NTD" ? "NT$" : "US$";
    const formatted = Math.round(v).toLocaleString("en-US");
    const suffix = period === "monthly" ? "/mo" : "";
    return `${prefix}${formatted}${suffix}`;
  }, [currency, period, fxRate]);

  return (
    <SalaryContext.Provider value={{ currency, setCurrency, period, setPeriod, fxRate, formatSalary }}>
      {children}
    </SalaryContext.Provider>
  );
}

export function useSalaryContext() {
  const ctx = useContext(SalaryContext);
  if (!ctx) throw new Error("useSalaryContext must be used within SalaryProvider");
  return ctx;
}
