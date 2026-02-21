import { useState, useCallback, useEffect, useRef } from "react";
import { Scenario, defaultScenario, exampleScenario } from "@/components/offer-compass/types";

const STORAGE_KEY = "offer-compass-scenarios";
const ACTIVE_KEY = "offer-compass-active";

function loadScenarios(): Scenario[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch { /* ignore */ }
  return [defaultScenario()];
}

function loadActiveId(scenarios: Scenario[]): string {
  try {
    const id = localStorage.getItem(ACTIVE_KEY);
    if (id && scenarios.some((s) => s.id === id)) return id;
  } catch { /* ignore */ }
  return scenarios[0]?.id ?? "";
}

export function useScenarios() {
  const [scenarios, setScenarios] = useState<Scenario[]>(() => loadScenarios());
  const [activeId, setActiveId] = useState<string>(() => loadActiveId(loadScenarios()));
  const isFirstRender = useRef(true);

  // persist on change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
      localStorage.setItem(ACTIVE_KEY, activeId);
    } catch { /* ignore */ }
  }, [scenarios, activeId]);

  const active = scenarios.find((s) => s.id === activeId) ?? scenarios[0];

  const updateActive = useCallback((patch: Partial<Scenario>) => {
    setScenarios((prev) =>
      prev.map((s) => (s.id === activeId ? { ...s, ...patch } : s))
    );
  }, [activeId]);

  const addScenario = useCallback((s?: Scenario) => {
    const newS = s ?? defaultScenario();
    setScenarios((prev) => [...prev, newS]);
    setActiveId(newS.id);
  }, []);

  const duplicateActive = useCallback(() => {
    if (!active) return;
    const dup = { ...active, id: crypto.randomUUID(), name: `${active.name} (Copy)` };
    setScenarios((prev) => [...prev, dup]);
    setActiveId(dup.id);
  }, [active]);

  const loadExample = useCallback((locale?: "en" | "zh-tw") => {
    const ex = exampleScenario(locale);
    // Replace the active scenario instead of adding a new one
    setScenarios((prev) =>
      prev.map((s) => (s.id === activeId ? { ...ex, id: activeId } : s))
    );
  }, [activeId]);

  const clearActive = useCallback(() => {
    if (!active) return;
    const blank = defaultScenario();
    setScenarios((prev) =>
      prev.map((s) => (s.id === activeId ? { ...blank, id: activeId, name: active.name } : s))
    );
  }, [active, activeId]);

  const deleteActive = useCallback(() => {
    if (scenarios.length < 2) return;
    const remaining = scenarios.filter((s) => s.id !== activeId);
    setScenarios(remaining);
    setActiveId(remaining[0].id);
  }, [scenarios, activeId]);

  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(scenarios, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "offer-compass-scenarios.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [scenarios]);

  const importJSON = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (Array.isArray(data) && data.length > 0) {
          setScenarios(data);
          setActiveId(data[0].id);
        }
      } catch {
        alert("Invalid JSON file.");
      }
    };
    reader.readAsText(file);
  }, []);

  return {
    scenarios,
    activeId,
    active,
    setActiveId,
    updateActive,
    addScenario,
    duplicateActive,
    loadExample,
    clearActive,
    deleteActive,
    exportJSON,
    importJSON,
  };
}
