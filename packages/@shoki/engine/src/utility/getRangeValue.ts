import { clampToUtilityNumber } from "./clamp";
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
 * Apply weighting to value A, based on its position within a range, and value B's position along the range 1-200
 *
 * @param {UtilityInput} input The value and its associated weighting information
 *
 * @returns A weighted output value
 */
export const getRangeValue = ({ value, range: [min, max], direction }: UtilityInput): UtilityNumberValue => {
	const inputValuePosition = getPositionInRange(min, max, value);

	const inputOutput = direction === ScoringDirection.High
		? inputValuePosition * 200
		: 200 - (inputValuePosition * 200);

	return clampToUtilityNumber(
		Math.floor(inputOutput)
	);
};
