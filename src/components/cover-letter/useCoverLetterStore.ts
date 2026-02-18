import { useState, useEffect, useRef, useCallback } from "react";
import {
  CoverLetterData,
  CoverLetterCustomize,
  DEFAULT_COVER_LETTER_DATA,
  DEFAULT_COVER_LETTER_CUSTOMIZE,
} from "./types";

const DATA_KEY = "james_careers_cover_letter";
const CUSTOMIZE_KEY = "james_careers_cover_letter_customize";

export function useCoverLetterStore() {
  const [data, setData] = useState<CoverLetterData>(() => {
    try {
      const s = localStorage.getItem(DATA_KEY);
      return s ? { ...DEFAULT_COVER_LETTER_DATA, ...JSON.parse(s) } : DEFAULT_COVER_LETTER_DATA;
    } catch {
      return DEFAULT_COVER_LETTER_DATA;
    }
  });

  const [customize, setCustomize] = useState<CoverLetterCustomize>(() => {
    try {
      const s = localStorage.getItem(CUSTOMIZE_KEY);
      return s ? { ...DEFAULT_COVER_LETTER_CUSTOMIZE, ...JSON.parse(s) } : DEFAULT_COVER_LETTER_CUSTOMIZE;
    } catch {
      return DEFAULT_COVER_LETTER_CUSTOMIZE;
    }
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      localStorage.setItem(DATA_KEY, JSON.stringify(data));
      localStorage.setItem(CUSTOMIZE_KEY, JSON.stringify(customize));
    }, 500);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [data, customize]);

  const updateData = useCallback(
    (updates: Partial<CoverLetterData>) => setData((prev) => ({ ...prev, ...updates })),
    []
  );

  const updatePersonalDetails = useCallback(
    (updates: Partial<CoverLetterData["personalDetails"]>) =>
      setData((prev) => ({ ...prev, personalDetails: { ...prev.personalDetails, ...updates } })),
    []
  );

  const updateRecipient = useCallback(
    (updates: Partial<CoverLetterData["recipient"]>) =>
      setData((prev) => ({ ...prev, recipient: { ...prev.recipient, ...updates } })),
    []
  );

  const updateSignature = useCallback(
    (updates: Partial<CoverLetterData["signature"]>) =>
      setData((prev) => ({ ...prev, signature: { ...prev.signature, ...updates } })),
    []
  );

  const updateCustomize = useCallback(
    (updates: Partial<CoverLetterCustomize>) => setCustomize((prev) => ({ ...prev, ...updates })),
    []
  );

  return { data, customize, updateData, updatePersonalDetails, updateRecipient, updateSignature, updateCustomize };
}
