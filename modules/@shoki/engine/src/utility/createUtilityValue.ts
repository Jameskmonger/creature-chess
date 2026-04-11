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

/**
 * Compute a utility score for a set of inputs.
 *
 * Each input contributes `directed * personalityMultiplier * importance`, and the
 * final score is `sum / totalImportance`. `importance` defaults to 1, so call sites
 * that don't supply it stay equal-weighted — mathematically identical to the
 * previous averaging behaviour (three inputs at 1 each average to `sum/3`; adding
 * a fourth drops everything to `sum/4`). The dilution penalty from adding inputs
 * is fixed by intentional importance assignment at the call site, not by this
 * function alone. The division is deferred to the end so integer-aligned cases
 * don't drift through floating-point accumulation.
 */
export const createUtilityValue = (
	inputs: UtilityInput[]
): UtilityNumberValue => {
	let totalImportance = 0;
	let totalValue = 0;

	for (const input of inputs) {
		const directed = getRangeValue(input);
		const personalityMultiplier = input.weighting
			? getWeightingValue(input.weighting.value, input.weighting.direction)
			: 1;
		const importance = input.importance ?? 1;

		totalValue += directed * personalityMultiplier * importance;
		totalImportance += importance;
	}

	return clampToUtilityNumber(Math.floor(totalValue / totalImportance));
};
