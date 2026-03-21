/** Smart Y-axis formatter: ≥1M → "X.XM", <1M → "XXXk" */
export function formatAxisValue(v: number): string {
  if (v >= 1_000_000) {
    const m = v / 1_000_000;
    return m % 1 === 0 ? `${m}M` : `${m.toFixed(1)}M`;
  }
  return `${Math.round(v / 1000)}k`;
}
