import { clampToUtilityNumber } from "./clamp";
import { getRangeValue } from "./getRangeValue";
import { UtilityInput, UtilityNumberValue, ScoringDirection } from "./types";

/**
 * Map a personality value (1-200) to a multiplier in [0.5, 1.5].
 *
 * The previous mapping ([0, 1]) collapsed low-personality inputs to ~zero, which
 * effectively muted that dimension instead of just biasing it. The new mapping
 * preserves direction (low personality still pulls toward zero, high still
 * pushes toward max) but never multiplies the input below half its raw value.
 *
 * - High direction: 0.5 + value / 200  → [~0.505, 1.5]
 * - Low  direction: 1.5 - value / 200  → [~1.495, 0.505]
 */
const getWeightingValue = (
	value: UtilityNumberValue,
	direction: ScoringDirection
) =>
	direction === ScoringDirection.High
		? 0.5 + value / 200
		: 1.5 - value / 200;

export const createUtilityValue = (
	inputs: UtilityInput[]
): UtilityNumberValue => {
	let totalValue = 0;

	for (const input of inputs) {
		const value = getRangeValue(input);

		const weighting = input.weighting;

		if (!weighting) {
			totalValue += value;
			continue;
		}

		totalValue +=
			value * getWeightingValue(weighting.value, weighting.direction);
	}

	return clampToUtilityNumber(Math.floor(totalValue / inputs.length));
};
