import { range, sum } from "./util";

/**
 * Generate a linear set of scores for a group of players
 *
 * The difference when jumping from 8th to 7th is the same as from 2nd to 1st.
 *
 * @param n The number of players
 * @returns An array of scores (total 1)
 */
function linearScoreFn(n: number) {
	return range(1, n + 1).map((p) => (n - p) / ((n * (n - 1)) / 2));
}

/**
 * Create scoring weights for a group of players
 *
 * @param count The number of players in the group
 * @param base Base to use
 * @returns An array of scores (total 1)
 */
export function createScores(count: number, base = 1) {
	if (base < 1) {
		throw Error("Base must be greater than 1");
	}

	if (base === 1) {
		return linearScoreFn(count);
	}

	const result = range(1, count + 1).map((p) => base ** (count - p) - 1);
	const total = sum(result);

	return result.map((p) => p / total);
}

export function sortScores(scores: number[], resultOrder: number[]) {}
