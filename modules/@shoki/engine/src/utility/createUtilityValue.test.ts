import { createUtilityValue } from "./createUtilityValue";
import { ScoringDirection } from "./types";

describe("createUtilityValue", () => {
	const inputs = {
		health: 50,
		money: 5,
	};

	const personality = {
		ambition: 50,
		composure: 150,
	};

	test("should return the correct value", () => {
		const result = createUtilityValue([
			{
				value: inputs.health,
				range: [1, 100],

				// utility score should be higher if health is low
				direction: ScoringDirection.Low,

				// more important with low composure
				weighting: {
					value: personality.composure,
					direction: ScoringDirection.Low,
				},
			},
			{
				value: inputs.money,
				range: [1, 55],

				// utility score should be higher if money is high
				direction: ScoringDirection.High,

				// more important with high ambition
				weighting: {
					value: personality.ambition,
					direction: ScoringDirection.High,
				},
			},
		]);

		// Position-in-range, then directed (Low inverts) — matches getRangeValue.
		// Values are now in [0, 1], no Math.floor.
		const healthDirected = 1 - (inputs.health - 1) / 99;
		const moneyDirected = (inputs.money - 1) / 54;

		// Weighting maps personality [1,200] to multiplier [0.5, 1.5]
		// Low direction:  1.5 - value/200
		// High direction: 0.5 + value/200
		const composureWeight = 1.5 - personality.composure / 200;
		const ambitionWeight = 0.5 + personality.ambition / 200;

		// Weighted average (default importance = 1 on both → divide by 2).
		const expected =
			(healthDirected * composureWeight + moneyDirected * ambitionWeight) / 2;

		expect(result.value).toBeCloseTo(expected, 10);
	});

	test("low personality no longer mutes the input entirely", () => {
		// Pre-fix: a value=1 personality with High direction → multiplier 0.005,
		// effectively zeroing out the input. Post-fix: multiplier ≈ 0.505.
		const result = createUtilityValue([
			{
				value: 100, // mid of range → directed ≈ 0.497
				range: [1, 200],
				direction: ScoringDirection.High,
				weighting: {
					value: 1,
					direction: ScoringDirection.High,
				},
			},
		]);

		// directed ≈ 99/199 ≈ 0.497, multiplier = 0.5 + 1/200 = 0.505
		// expected ≈ 0.497 * 0.505 ≈ 0.25 — well above the pre-fix ~0.
		expect(result.value).toBeGreaterThan(0.2);
	});

	test("default importance equals the old averaging behaviour", () => {
		// Three inputs at range midpoint, no weighting, default importance.
		// Each contributes 0.5; mean is 0.5.
		const result = createUtilityValue([
			{ value: 50, range: [0, 100], direction: ScoringDirection.High },
			{ value: 50, range: [0, 100], direction: ScoringDirection.High },
			{ value: 50, range: [0, 100], direction: ScoringDirection.High },
		]);

		expect(result.value).toBeCloseTo(0.5, 10);
	});

	test("higher importance makes a sibling dominate", () => {
		// One input pegged high (directed = 1), one pegged low (directed = 0).
		// At equal importance, the mean is 0.5.
		const equal = createUtilityValue([
			{ value: 100, range: [0, 100], direction: ScoringDirection.High },
			{ value: 0, range: [0, 100], direction: ScoringDirection.High },
		]);
		expect(equal.value).toBeCloseTo(0.5, 10);

		// With the high input given importance 9 vs. the low input's 1, the
		// weighted average is (1 * 0.9) + (0 * 0.1) = 0.9 — much closer to the
		// high value.
		const weighted = createUtilityValue([
			{
				value: 100,
				range: [0, 100],
				direction: ScoringDirection.High,
				importance: 9,
			},
			{
				value: 0,
				range: [0, 100],
				direction: ScoringDirection.High,
				importance: 1,
			},
		]);
		expect(weighted.value).toBeCloseTo(0.9, 10);
	});

	test("adding a neutral input no longer dilutes existing scores", () => {
		// Old averaging behaviour: adding a mid-range 4th input to three
		// high-range inputs would pull the average down. With intentional
		// importance, a low-importance addition shifts the score only slightly.
		const withHeavyImportance = createUtilityValue([
			{
				value: 100,
				range: [0, 100],
				direction: ScoringDirection.High,
				importance: 10,
			},
			{
				value: 100,
				range: [0, 100],
				direction: ScoringDirection.High,
				importance: 10,
			},
			{
				value: 100,
				range: [0, 100],
				direction: ScoringDirection.High,
				importance: 10,
			},
			{
				// Newly-added neutral input — importance 1 → tiny influence.
				value: 0,
				range: [0, 100],
				direction: ScoringDirection.High,
				importance: 1,
			},
		]);

		// totalImportance = 31, value = (3 * 1 * 10 + 0 * 1) / 31 = 30/31 ≈ 0.968
		expect(withHeavyImportance.value).toBeCloseTo(30 / 31, 10);
	});

	test("breakdown sum / totalImportance equals final value", () => {
		// Invariant: the per-input `weighted` values, divided by `totalImportance`,
		// must reproduce `value` exactly — after clamping to [0, 1]. This is the
		// contract the debug breakdown relies on: if it ever fails, the engine's
		// internal math and the breakdown have silently diverged.
		const score = createUtilityValue([
			{
				name: "health",
				value: 50,
				range: [1, 100],
				direction: ScoringDirection.Low,
				importance: 3,
				weighting: {
					value: 150,
					direction: ScoringDirection.Low,
				},
			},
			{
				name: "money",
				value: 5,
				range: [1, 55],
				direction: ScoringDirection.High,
				weighting: {
					value: 50,
					direction: ScoringDirection.High,
				},
			},
			{
				name: "neutral",
				value: 10,
				range: [0, 20],
				direction: ScoringDirection.High,
			},
		]);

		const weightedSum = score.inputs.reduce((s, i) => s + i.weighted, 0);
		const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
		const reconstructed = clamp01(weightedSum / score.totalImportance);
		expect(reconstructed).toBeCloseTo(score.value, 10);

		// And the per-input importance values must sum to totalImportance.
		const importanceSum = score.inputs.reduce((s, i) => s + i.importance, 0);
		expect(importanceSum).toBe(score.totalImportance);
	});

	test("breakdown invariant holds across the clamp boundary", () => {
		// When the unclamped weighted-average exceeds 1, `value` is clamped down
		// but the breakdown stores the raw contributions. Consumers verifying the
		// invariant must apply the same clamp.
		const score = createUtilityValue([
			{
				name: "maxed",
				value: 100,
				range: [0, 100],
				direction: ScoringDirection.High,
				// A very high multiplier pushes the weighted sum past 1.
				weighting: {
					value: 200,
					direction: ScoringDirection.High,
				},
			},
		]);

		// directed = 1, personalityMultiplier = 1.5, weighted = 1.5.
		// Raw (unclamped) value = 1.5, clamped final value = 1.
		const weightedSum = score.inputs.reduce((s, i) => s + i.weighted, 0);
		expect(weightedSum / score.totalImportance).toBeCloseTo(1.5, 10);
		expect(score.value).toBe(1);
	});

	test("breakdown preserves input names and shapes", () => {
		const score = createUtilityValue([
			{
				name: "named",
				value: 50,
				range: [0, 100],
				direction: ScoringDirection.High,
			},
			{
				// unnamed — should fall back to input[1]
				value: 25,
				range: [0, 100],
				direction: ScoringDirection.High,
			},
		]);

		expect(score.inputs).toHaveLength(2);
		expect(score.inputs[0].name).toBe("named");
		expect(score.inputs[0].raw).toBe(50);
		expect(score.inputs[0].personalityMultiplier).toBe(1);
		expect(score.inputs[0].importance).toBe(1);
		expect(score.inputs[1].name).toBe("input[1]");
		expect(score.inputs[1].raw).toBe(25);
	});
});
