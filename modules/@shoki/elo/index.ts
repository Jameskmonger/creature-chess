import { createScores } from "./src/score";

type PlayerElo = {
	elo: number;
	k: number;
};

/**
 * The difference between two players' ratings is capped at 400 for the calculations
 */
const RATING_DIFF_CAP = 400;

/**
 * Get the difference between two players in rankings.
 *
 * Capped at `RATING_DIFF_CAP` (400)
 *
 * @param ratingA The first players rating
 * @param ratingB The second players rating
 *
 * @returns Difference between the ratings
 */
const getRatingDifference = (ratingA: number, ratingB: number) =>
	Math.max(Math.min(ratingA - ratingB, RATING_DIFF_CAP), -RATING_DIFF_CAP);

export function getNewRatings(rankedPlayers: PlayerElo[]) {
	const count = rankedPlayers.length;

	// represents the order that players scored in
	// [0, 1, 2] means that 1st won, 2nd 2nd, 3rd 3rd etc
	// [0, 1, 1] means that 1st won but the others tied
	const resultOrder = [...Array(count).keys()];

	const actualScores = getActualScores(count, resultOrder);
}

function getActualScores(count: number, resultOrder: number[]) {
	const scores = createScores(count);

	const sorted = sortScores(scores, resultOrder);
}
