import { applyCurve } from "./curves";

describe("applyCurve", () => {
	describe("linear", () => {
		const curve = { type: "linear" as const };

		test("returns the input unchanged at endpoints", () => {
			expect(applyCurve(0, curve)).toBe(0);
			expect(applyCurve(1, curve)).toBe(1);
		});

		test("returns the input unchanged at midpoint", () => {
			expect(applyCurve(0.5, curve)).toBe(0.5);
		});
	});

	describe("quadratic", () => {
		test("with default exponent (2), input^2", () => {
			const curve = { type: "quadratic" as const };
			expect(applyCurve(0, curve)).toBe(0);
			expect(applyCurve(0.5, curve)).toBe(0.25);
			expect(applyCurve(1, curve)).toBe(1);
		});

		test("with custom exponent", () => {
			const curve = { type: "quadratic" as const, exponent: 3 };
			expect(applyCurve(0.5, curve)).toBeCloseTo(0.125);
			expect(applyCurve(1, curve)).toBe(1);
		});

		test("pulls mid-range values toward zero", () => {
			// The point of the quadratic curve: low/mid values contribute much
			// less than their linear share, high values contribute almost fully.
			const curve = { type: "quadratic" as const };
			expect(applyCurve(0.25, curve)).toBeLessThan(0.25);
			expect(applyCurve(0.75, curve)).toBeLessThan(0.75);
			expect(applyCurve(0.95, curve)).toBeGreaterThan(0.9);
		});
	});

	describe("sigmoid", () => {
		test("default midpoint (0.5) and steepness (12)", () => {
			const curve = { type: "sigmoid" as const };
			// At the midpoint the sigmoid is exactly 0.5.
			expect(applyCurve(0.5, curve)).toBeCloseTo(0.5);
			// Extremes approach but don't quite reach 0 / 1.
			expect(applyCurve(0, curve)).toBeLessThan(0.01);
			expect(applyCurve(1, curve)).toBeGreaterThan(0.99);
		});

		test("midpoint shifts the pivot", () => {
			// Panic-threshold use case: midpoint 0.3 corresponds to ~30% of
			// range. At t = 0.3 the output is exactly 0.5 (pivot).
			const curve = { type: "sigmoid" as const, midpoint: 0.3 };
			expect(applyCurve(0.3, curve)).toBeCloseTo(0.5);
			// Below the pivot: output is small.
			expect(applyCurve(0.1, curve)).toBeLessThan(0.15);
			// Above the pivot: output is close to 1.
			expect(applyCurve(0.5, curve)).toBeGreaterThan(0.9);
		});

		test("steepness controls transition sharpness", () => {
			// A steeper curve transitions faster around the midpoint.
			const soft = { type: "sigmoid" as const, steepness: 2 };
			const sharp = { type: "sigmoid" as const, steepness: 20 };

			// At t = 0.4 (just below midpoint 0.5), the sharp curve is closer
			// to 0, the soft curve is closer to 0.5.
			expect(applyCurve(0.4, sharp)).toBeLessThan(applyCurve(0.4, soft));
		});
	});
});
