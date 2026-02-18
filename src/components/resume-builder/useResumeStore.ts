import { useState, useEffect, useRef, useCallback } from "react";
import { ResumeData, DEFAULT_RESUME_DATA } from "./types";
import { CustomizeSettings, DEFAULT_CUSTOMIZE } from "./customizeTypes";

const STORAGE_KEY = "james_careers_resume";
const CUSTOMIZE_KEY = "james_careers_customize";

export function useResumeStore() {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_RESUME_DATA;
    } catch {
      return DEFAULT_RESUME_DATA;
    }
  });

  const [customize, setCustomize] = useState<CustomizeSettings>(() => {
    try {
      const stored = localStorage.getItem(CUSTOMIZE_KEY);
      return stored ? { ...DEFAULT_CUSTOMIZE, ...JSON.parse(stored) } : DEFAULT_CUSTOMIZE;
    } catch {
      return DEFAULT_CUSTOMIZE;
    }
  });

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem(CUSTOMIZE_KEY, JSON.stringify(customize));
    }, 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [data, customize]);

  const updateCustomize = useCallback(
    (updates: Partial<CustomizeSettings>) => {
      setCustomize((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const updatePersonalDetails = useCallback(
    (updates: Partial<ResumeData["personalDetails"]>) => {
      setData((prev) => ({
        ...prev,
        personalDetails: { ...prev.personalDetails, ...updates },
      }));
    },
    []
  );

  const setSections = useCallback(
    (sections: ResumeData["sections"]) => {
      setData((prev) => ({ ...prev, sections }));
    },
    []
  );

  const updateSection = useCallback(
    (id: string, updates: Partial<ResumeData["sections"][number]>) => {
      setData((prev) => ({
        ...prev,
        sections: prev.sections.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      }));
    },
    []
  );

  const removeSection = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        sections: prev.sections.filter((s) => s.id !== id),
      }));
    },
    []
  );

  return { data, setData, customize, updateCustomize, updatePersonalDetails, setSections, updateSection, removeSection };
}
