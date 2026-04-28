import type { Section } from "./types";

export function computeTopContributor(
  currentSections: Section[],
  previousSections: Section[]
): string | null {
  let maxDelta = 0;
  let topSection: string | null = null;
  for (const section of currentSections) {
    const prev = previousSections.find((s) => s.name === section.name);
    if (prev === undefined) continue;
    const delta = section.score - prev.score;
    if (delta > maxDelta) {
      maxDelta = delta;
      topSection = section.name;
    }
  }
  return topSection;
}

const MILESTONES = [60, 70, 80, 90, 100] as const;

export function computeNextTarget(score: number): number {
  return MILESTONES.find((m) => m > score) ?? 100;
}
