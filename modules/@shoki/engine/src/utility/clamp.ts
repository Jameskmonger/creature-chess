/**
 * Clamp a number to the closed interval `[0, 1]`. Used by the utility pipeline
 * to keep out-of-range positions, personality-multiplied sums, and custom-curve
 * outputs inside the canonical score range.
 */
export const clamp01 = (n: number): number => Math.min(1, Math.max(0, n));
