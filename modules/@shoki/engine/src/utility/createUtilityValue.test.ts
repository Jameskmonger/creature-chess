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

		expect(result).toEqual(expected);
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
		expect(result).toBeGreaterThan(40);
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
		expect(result).toBe(100);
	});

	test("higher importance makes a sibling dominate", () => {
		// One input pegged high (directed = 200), one pegged low (directed = 0).
		// At equal importance, the mean is 100.
		const equal = createUtilityValue([
			{ value: 100, range: [0, 100], direction: ScoringDirection.High },
			{ value: 0, range: [0, 100], direction: ScoringDirection.High },
		]);
		expect(equal).toBe(100);

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
		expect(weighted).toBe(180);
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
		expect(withHeavyImportance).toBe(193);
	});
});
