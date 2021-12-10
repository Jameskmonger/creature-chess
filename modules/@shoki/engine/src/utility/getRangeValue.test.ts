import { getRangeValue } from "./getRangeValue";
import { ScoringDirection } from "./types";

describe("getRangeValue", () => {
	const inputRange: [number, number] = [1, 3];

	describe("when input is maximum", () => {
		const input = 3;

		describe("when direction is High", () => {
			const direction = ScoringDirection.High;

			test("should return maximum", () => {
				const result = getRangeValue({
					value: input,
					range: inputRange,
					direction
				});

				expect(result).toEqual(200);
			});
		});

		describe("when direction is Low", () => {
			const direction = ScoringDirection.Low;

			test("should return minimum", () => {
				const result = getRangeValue({
					value: input,
					range: inputRange,
					direction
				});

				expect(result).toEqual(1);
			});
		});
	});

	describe("when input is minimum", () => {
		const input = 1;

		describe("when direction is High", () => {
			const direction = ScoringDirection.High;

			test("should return minimum", () => {
				const result = getRangeValue({
					value: input,
					range: inputRange,
					direction
				});

				expect(result).toEqual(1);
			});
		});

		describe("when direction is Low", () => {
			const direction = ScoringDirection.Low;

			test("should return maximum", () => {
				const result = getRangeValue({
					value: input,
					range: inputRange,
					direction
				});

				expect(result).toEqual(200);
			});
		});
	});

	describe("when input is midpoint", () => {
		const input = 2;

		describe("when direction is High", () => {
			const direction = ScoringDirection.High;

			test("should return midpoint", () => {
				const result = getRangeValue({
					value: input,
					range: inputRange,
					direction
				});

				expect(result).toEqual(100);
			});
		});

		describe("when direction is Low", () => {
			const direction = ScoringDirection.Low;

			test("should return midpoint", () => {
				const result = getRangeValue({
					value: input,
					range: inputRange,
					direction
				});

				expect(result).toEqual(100);
			});
		});
	});

});
