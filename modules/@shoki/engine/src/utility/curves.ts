/**
 * Response curves applied to the normalised input position (`t ∈ [0, 1]`) before
 * the directional flip in `getRangeValue`. Curves take `[0, 1]` and return
 * `[0, 1]`, so they compose cleanly with the rest of the utility pipeline.
 *
 * Applied BEFORE the directional flip: callers supply the curve in terms of the
 * raw range position, and the engine handles `direction: Low` inversion
 * afterwards. This means a `sigmoid` centred at `0.3` always pivots around 30%
 * of the range regardless of direction.
 */
export type Curve =
	| { type: "linear" }
	/**
	 * `t^exponent`. Default `exponent = 2` (quadratic). Good for "much more than
	 * N× as good" relationships — e.g. a 5-cost card is much more than 5× as
	 * valuable as a 1-cost card.
	 */
	| { type: "quadratic"; exponent?: number }
	/**
	 * Logistic: `1 / (1 + exp(-steepness * (t - midpoint)))`. Default `midpoint
	 * 0.5`, `steepness 12`. Good for threshold behaviours — e.g. "panic mode
	 * activates around 30% HP" via `{ midpoint: 0.3 }`.
	 */
	| { type: "sigmoid"; midpoint?: number; steepness?: number };

/**
 * Evaluate a curve at `t ∈ [0, 1]`, returning a value in `[0, 1]` (for the
 * standard curves — sigmoid at extreme parameters can drift slightly outside
 * and is left to the caller to clamp if needed).
 */
export const applyCurve = (t: number, curve: Curve): number => {
	switch (curve.type) {
		case "linear":
			return t;
		case "quadratic":
			return Math.pow(t, curve.exponent ?? 2);
		case "sigmoid": {
			const midpoint = curve.midpoint ?? 0.5;
			const steepness = curve.steepness ?? 12;
			return 1 / (1 + Math.exp(-steepness * (t - midpoint)));
		}
		default: {
			// Exhaustiveness check — if `Curve` gains a new variant, TypeScript
			// will error here until the switch is updated.
			const exhaustive: never = curve;
			return exhaustive;
		}
	}
};
