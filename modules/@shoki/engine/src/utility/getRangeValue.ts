import { clampToUtilityNumber } from "./clamp";
import { applyCurve } from "./curves";
import { UtilityNumberValue, UtilityInput, ScoringDirection } from "./types";

/**
 * Get the distance of `input` within the range `min`-`max`
 *
 * @param min Lower bound of range
 * @param max Upper bound of range
 * @param input Input value
 *
 * @returns Position within range, i.e. will give 29/99 for (1, 100, 30)
 */
const getPositionInRange = (min: number, max: number, input: number) => {
	const adjustedMax = max - min;
	const adjustedInput = input - min;

	return adjustedInput / adjustedMax;
};

/**
 * Compute the directed, curve-shaped output for a utility input.
 *
 * Pipeline:
 * 1. Normalise the raw value to its position in range (`t ∈ [0, 1]`).
 * 2. Clamp `t` to `[0, 1]` so out-of-range values saturate at the edges
 * (matches the old pre-curve behaviour where values above `max` clamped
 * to 200 / below `min` clamped to 1).
 * 3. Apply the response curve (linear by default).
 * 4. Flip based on `direction`: `High` maps curved → `curved * 200`, `Low`
 * maps to `200 - curved * 200`. Applying the curve BEFORE the flip means a
 * sigmoid centred at `0.3` always pivots around 30% of the range regardless
 * of direction.
 * 5. Floor and clamp the result to `[1, 200]`.
 */
export const getRangeValue = ({
	value,
	range: [min, max],
	direction,
	curve,
}: UtilityInput): UtilityNumberValue => {
	const rawPosition = getPositionInRange(min, max, value);
	const clampedPosition = Math.min(1, Math.max(0, rawPosition));
	const curved = applyCurve(clampedPosition, curve ?? { type: "linear" });

	const inputOutput =
		direction === ScoringDirection.High ? curved * 200 : 200 - curved * 200;

	return clampToUtilityNumber(Math.floor(inputOutput));
};
