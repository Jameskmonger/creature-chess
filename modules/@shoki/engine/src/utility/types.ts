import { Curve } from "./curves";

/**
 * Whether the outputted utility value should be higher for lower, or higher,
 * values of the given input.
 */
export enum ScoringDirection {
	Low = 1,
	High = 2,
}

export type UtilityInput = {
	/**
	 * Human-readable label, surfaced in the debug breakdown (e.g. "card.cost",
	 * "completionProximity"). Optional; falls back to `input[N]` if omitted.
	 */
	name?: string;
	value: number;
	range: [number, number];
	direction: ScoringDirection;
	/**
	 * Optional response curve applied to the normalised position in range
	 * (`t ∈ [0, 1]`) BEFORE the direction flip. Defaults to linear. Use
	 * quadratic for "much more than N× as good" relationships, and sigmoid for
	 * threshold behaviours (e.g. panic mode around 30% HP with
	 * `{ type: "sigmoid", midpoint: 0.3 }`). See `./curves.ts`.
	 */
	curve?: Curve;
	/**
	 * Relative weight vs. sibling inputs in the same `createUtilityValue` call.
	 * Defaults to 1. The engine normalises importances so siblings sum to 1, so
	 * setting all inputs to `1` (or omitting this field entirely) is equivalent
	 * to the old averaging behaviour. Use values > 1 to make a consideration
	 * dominate its siblings, independent of any personality bias.
	 */
	importance?: number;
	weighting?: {
		/**
		 * Personality value. Callers supply the player-facing `[1, 200]`
		 * domain (e.g. `BotPersonalityValue`); the engine normalises to
		 * `[0.005, 1]` internally to derive the `[0.5, 1.5]` multiplier.
		 */
		value: number;
		direction: ScoringDirection;
	};
};

/**
 * Per-input breakdown of a `createUtilityValue` computation. Populated on every
 * call; consumers that don't need it can discard it. Used to answer "why did the
 * bot choose this action?" by inspecting which input contributed most.
 */
export type ScoredInput = {
	/** Input label, or `input[N]` if the input didn't supply a `name`. */
	name: string;
	/** `input.value` before any transformation. */
	raw: number;
	/** After `getRangeValue`: range-normalised, curved, and direction-flipped, in `[0, 1]`. */
	directed: number;
	/** Personality multiplier in `[0.5, 1.5]`, or `1` if no weighting was set. */
	personalityMultiplier: number;
	/** The raw `input.importance` value (defaults to 1). */
	importance: number;
	/**
	 * This row's unnormalised contribution: `directed * personalityMultiplier *
	 * importance`. Divide by `UtilityScore.totalImportance` to get the normalised
	 * contribution to the final value. Unnormalised is stored to keep the
	 * `sum / totalImportance === value` invariant drift-free.
	 */
	weighted: number;
};

export type UtilityScore = {
	/** Final score in `[0, 1]`, clamped. */
	value: number;
	/** Sum of all input importances, used to normalise the per-row `weighted`. */
	totalImportance: number;
	/** Per-input breakdown, one entry per `UtilityInput` in input order. */
	inputs: ScoredInput[];
};
