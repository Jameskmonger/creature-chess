import { createUtilityValue } from "./createUtilityValue";
import { ScoringDirection, UtilityNumberValue } from "./types";

describe("createUtilityValue", () => {
	const inputs = {
		health: 50,
		money: 5,
	};

	const personality = {
		ambition: 50 as UtilityNumberValue,
		composure: 150 as UtilityNumberValue,
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

		// position-in-range, then directed (Low inverts), then floored — matches getRangeValue
		const healthDirected = Math.floor(200 - ((inputs.health - 1) / 99) * 200);
		const moneyDirected = Math.floor(((inputs.money - 1) / 54) * 200);

		// weighting maps personality [1,200] to multiplier [0.5, 1.5]
		// Low direction:  1.5 - value/200
		// High direction: 0.5 + value/200
		const composureWeight = 1.5 - personality.composure / 200;
		const ambitionWeight = 0.5 + personality.ambition / 200;

		const expected = Math.floor(
			(healthDirected * composureWeight + moneyDirected * ambitionWeight) / 2
		);

		expect(result.value).toEqual(expected);
	});

	test("low personality no longer mutes the input entirely", () => {
		// Pre-fix: a value=1 personality with High direction → multiplier 0.005,
		// effectively zeroing out the input. Post-fix: multiplier ≈ 0.505.
		const result = createUtilityValue([
			{
				value: 100, // mid of range → directed value 100
				range: [1, 200],
				direction: ScoringDirection.High,
				weighting: {
					value: 1 as UtilityNumberValue,
					direction: ScoringDirection.High,
				},
			},
		]);

		// directed = floor(99/199 * 200) = 99, weight = 0.5 + 1/200 = 0.505
		// expected = floor(99 * 0.505) = 49 (well above the pre-fix ~0)
		expect(result.value).toBeGreaterThan(40);
	});

	test("default importance equals the old averaging behaviour", () => {
		// Three inputs, none specifying `importance`, no weighting. Each should
		// get a normalised importance of 1/3 → result is the floor of the mean.
		const result = createUtilityValue([
			{ value: 50, range: [0, 100], direction: ScoringDirection.High },
			{ value: 50, range: [0, 100], direction: ScoringDirection.High },
			{ value: 50, range: [0, 100], direction: ScoringDirection.High },
		]);

		// Each input directs to 100, average = 100, floor = 100.
		expect(result.value).toBe(100);
	});

	test("higher importance makes a sibling dominate", () => {
		// One input pegged high (directed = 200), one pegged low (directed = 0).
		// At equal importance, the mean is 100.
		const equal = createUtilityValue([
			{ value: 100, range: [0, 100], direction: ScoringDirection.High },
			{ value: 0, range: [0, 100], direction: ScoringDirection.High },
		]);
		expect(equal.value).toBe(100);

		// With the high input given importance 9 vs. the low input's 1, the
		// weighted sum is (200 * 0.9) + (0 * 0.1) = 180 — much closer to the
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
		expect(weighted.value).toBe(180);
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

		// totalImportance = 31, 3 * (200 * 10/31) + (0 * 1/31)
		//                 = 6000 / 31 ≈ 193.5 → floor 193
		expect(withHeavyImportance.value).toBe(193);
	});

	test("breakdown sum / totalImportance equals final value", () => {
		// Invariant: the per-input `weighted` values, divided by `totalImportance`
		// and floored, must reproduce `value` exactly — after clamping to [1, 200].
		// This is the contract the debug breakdown relies on: if it ever fails,
		// the engine's internal math and the breakdown have silently diverged.
		const score = createUtilityValue([
			{
				name: "health",
				value: 50,
				range: [1, 100],
				direction: ScoringDirection.Low,
				importance: 3,
				weighting: {
					value: 150 as UtilityNumberValue,
					direction: ScoringDirection.Low,
				},
			},
			{
				name: "money",
				value: 5,
				range: [1, 55],
				direction: ScoringDirection.High,
				weighting: {
					value: 50 as UtilityNumberValue,
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
		const clamp = (n: number) => Math.min(200, Math.max(1, n));
		const reconstructed = clamp(
			Math.floor(weightedSum / score.totalImportance)
		);
		expect(reconstructed).toBe(score.value);

		// And the per-input importance values must sum to totalImportance.
		const importanceSum = score.inputs.reduce((s, i) => s + i.importance, 0);
		expect(importanceSum).toBe(score.totalImportance);
	});

	test("breakdown invariant holds across the clamp boundary", () => {
		// When the unclamped result exceeds 200, `value` is clamped down but
		// the breakdown stores the raw contributions. Consumers verifying the
		// invariant must apply the same clamp.
		const score = createUtilityValue([
			{
				name: "maxed",
				value: 100,
				range: [0, 100],
				direction: ScoringDirection.High,
				// A very high multiplier pushes the weighted sum past 200.
				weighting: {
					value: 200 as UtilityNumberValue,
					direction: ScoringDirection.High,
				},
			},
		]);

		// directed = 200, personalityMultiplier = 1.5, weighted = 300.
		// Raw (unclamped) value = 300, clamped final value = 200.
		const weightedSum = score.inputs.reduce((s, i) => s + i.weighted, 0);
		expect(Math.floor(weightedSum / score.totalImportance)).toBe(300);
		expect(score.value).toBe(200);
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
