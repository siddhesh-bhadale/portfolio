/** Format a metric value, keeping one decimal only when the source has one. */
export function formatMetric(value: number): string {
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded)
    ? rounded.toLocaleString('en-IN')
    : rounded.toFixed(1);
}

/** Turn "Dec 2024 — Jun 2026" into a machine-readable-ish short form. */
export function shortPeriod(period: string): string {
  return period.replace(/\s+—\s+/, '–');
}
