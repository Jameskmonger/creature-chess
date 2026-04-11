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
});
