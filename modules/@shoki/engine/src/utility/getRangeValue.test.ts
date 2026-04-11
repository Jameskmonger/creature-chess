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
					direction,
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
					direction,
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
					direction,
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
					direction,
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
					direction,
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
					direction,
				});

				expect(result).toEqual(100);
			});
		});
	});

	describe("when a curve is supplied", () => {
		test("quadratic pulls a mid-range value toward the low end (direction High)", () => {
			// Linear midpoint would give 100. Quadratic gives floor(0.5^2 * 200) = 50.
			const result = getRangeValue({
				value: 2,
				range: [1, 3],
				direction: ScoringDirection.High,
				curve: { type: "quadratic" },
			});
			expect(result).toBe(50);
		});

		test("curve applies BEFORE direction flip (sigmoid midpoint 0.3 with direction Low)", () => {
			// At health 30 on range [1, 100]: position ≈ 0.293, sigmoid(0.293, 0.3, 12)
			// is just under 0.5 (specifically 1/(1+exp(0.085)) ≈ 0.479). With direction
			// Low the final output is floor((1 - 0.479) * 200) ≈ 104.
			const result = getRangeValue({
				value: 30,
				range: [1, 100],
				direction: ScoringDirection.Low,
				curve: { type: "sigmoid", midpoint: 0.3 },
			});
			expect(result).toBeGreaterThanOrEqual(100);
			expect(result).toBeLessThanOrEqual(110);
		});

		test("sigmoid midpoint 0.3 saturates at low position (panic active)", () => {
			// At health 10 with direction Low: sigmoid maps position 0.09 to ~0.08,
			// flipped gives ~0.92 * 200 ≈ 184 — solidly above linear's 181.
			const result = getRangeValue({
				value: 10,
				range: [1, 100],
				direction: ScoringDirection.Low,
				curve: { type: "sigmoid", midpoint: 0.3 },
			});
			expect(result).toBeGreaterThanOrEqual(180);
		});

		test("out-of-range values below min saturate to the curve's 0 output", () => {
			// value=0, range=[1,3]: raw position is -0.5, clamped to 0, curved = 0^2 = 0.
			// direction High → floor(0 * 200) = 0 → clampToUtilityNumber → 1.
			const result = getRangeValue({
				value: 0,
				range: [1, 3],
				direction: ScoringDirection.High,
				curve: { type: "quadratic" },
			});
			expect(result).toBe(1);
		});

		test("out-of-range values above max saturate to the curve's 1 output", () => {
			// value=5, range=[1,3]: raw position is 2, clamped to 1, curved = 1^2 = 1.
			// direction High → 200.
			const result = getRangeValue({
				value: 5,
				range: [1, 3],
				direction: ScoringDirection.High,
				curve: { type: "quadratic" },
			});
			expect(result).toBe(200);
		});
	});
});
