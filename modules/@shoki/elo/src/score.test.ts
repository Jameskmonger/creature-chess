import { sortScores } from "./score";

describe("@shoki/elo", () => {
	describe("sortScores", () => {
		// result of linear scoring for 4 players
		const scores = [1 / 2, 1 / 3, 1 / 6, 0];

		describe("when results are in ascending order", () => {
			const resultOrder = [0, 1, 2, 3];

			it("should return scores in same order", () => {
				const sorted = sortScores(scores, resultOrder);

				expect(sorted).toEqual(scores);
			});
		});

		describe("when results are tied", () => {
			const resultOrder = [0, 1, 1, 2];

			it("should return scores in same order", () => {
				const sorted = sortScores(scores, resultOrder);

				expect(sorted).toEqual(scores);
			});
		});

		describe("when results are inverted", () => {
			const resultOrder = [3, 2, 1, 0];

			it("should invert scores", () => {
				const sorted = sortScores(scores, resultOrder);

				expect(sorted).toEqual([0, 1 / 6, 1 / 3, 1 / 2]);
			});
		});

		describe("when results are inverted and tied", () => {
			const resultOrder = [3, 3, 3, 0];

			it("should award scores based on ties", () => {
				const sorted = sortScores(scores, resultOrder);

				expect(sorted).toEqual([1 / 3, 1 / 6, 0, 1 / 2]);
			});
		});
	});
});
