import { clampToUtilityNumber } from "./clamp";
import { getRangeValue } from "./getRangeValue";
import { UtilityInput, UtilityNumberValue, ScoringDirection } from "./types";

const getWeightingValue = (value: UtilityNumberValue, direction: ScoringDirection) => (
	direction === ScoringDirection.High
		? value / 200
		: 1 - (value / 200)
);

export const createUtilityValue = (inputs: UtilityInput[]): UtilityNumberValue => {
	let totalValue = 0;

	for (const input of inputs) {
		const value = getRangeValue(input);

		const weighting = input.weighting;

		if (!weighting) {
			totalValue += value;
			continue;
		}

		totalValue += value * getWeightingValue(weighting.value, weighting.direction);
	}

	return clampToUtilityNumber(
		Math.floor(totalValue / inputs.length)
	);
};
