import { clamp01 } from "./clamp";
import { applyCurve } from "./curves";
import { UtilityInput, ScoringDirection } from "./types";

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
 * Compute the directed, curve-shaped output for a utility input, in `[0, 1]`.
 *
 * Pipeline:
 * 1. Normalise the raw value to its position in range (`t ∈ [0, 1]`).
 * 2. Clamp `t` to `[0, 1]` so out-of-range values saturate at the edges.
 * 3. Apply the response curve (linear by default).
 * 4. Flip based on `direction`: `High` returns `curved`, `Low` returns
 * `1 - curved`. Applying the curve BEFORE the flip means a sigmoid centred
 * at `0.3` always pivots around 30% of the range regardless of direction.
 * 5. Clamp the result to `[0, 1]` (cheap safety net — standard curves are
 * well-behaved, but custom curves could drift slightly out of range).
 */
export const getRangeValue = ({
	value,
	range: [min, max],
	direction,
	curve,
}: UtilityInput): number => {
	const rawPosition = getPositionInRange(min, max, value);
	const clampedPosition = clamp01(rawPosition);
	const curved = applyCurve(clampedPosition, curve ?? { type: "linear" });

	const directed = direction === ScoringDirection.High ? curved : 1 - curved;

	return clamp01(directed);
};
