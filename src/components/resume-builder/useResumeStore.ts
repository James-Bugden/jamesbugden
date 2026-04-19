import { useState, useCallback } from "react";
import { ResumeData, DEFAULT_RESUME_DATA } from "./types";
import { CustomizeSettings, DEFAULT_CUSTOMIZE } from "./customizeTypes";

// NOTE: this hook is a per-doc mutation buffer. The real source of truth is
// the multi-doc store at `src/lib/documentStore.ts` (key: james_careers_documents).
// ResumeBuilder calls `handleOpenDocument` on mount to populate this buffer
// from the selected doc, and calls `updateDocument(...)` to persist changes.
// Previously this hook also read/wrote `james_careers_resume` +
// `james_careers_customize` (pre-multi-doc keys) which caused a flash of
// stale content when switching between docs — the buffer would initialize
// from doc A's data before the parent overwrote it with doc B. Removed.

export function useResumeStore() {
  const [data, setData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
  const [customize, setCustomize] = useState<CustomizeSettings>(DEFAULT_CUSTOMIZE);

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
