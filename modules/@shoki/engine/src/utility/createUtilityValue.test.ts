import { createUtilityValue } from "./createUtilityValue";
import { ScoringDirection, UtilityNumberValue } from "./types";

describe("createUtilityValue", () => {
	const inputs = {
		health: 50,
		money: 5
	};

	const personality = {
		ambition: 50 as UtilityNumberValue,
		composure: 150 as UtilityNumberValue
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
					direction: ScoringDirection.Low
				}
			},
			{
				value: inputs.money,
				range: [1, 55],

				// utility score should be higher if money is high
				direction: ScoringDirection.High,

				// more important with high ambition
				weighting: {
					value: personality.ambition,
					direction: ScoringDirection.High
				}
			}
		]);

		// these calculations are applied due to the provided directions
		const hV = ((inputs.health - 1) / 99);
		const cV = 1 - (personality.composure / 200);

		const mV = ((inputs.money - 1) / 54);
		const aV = personality.ambition / 200;

		const healthValue = (hV * 200) * cV;
		const moneyValue = (mV * 200) * aV;

		/*
			health value = 0.5
			composure value = 0.25

			--

			money value = 0.07
			ambition value = 0.25

			--

			(health * 200) = 100
				* composure = 25

			(money * 200) = 14
				* ambition = 3.5

			(25 + 3.5) / 2 = 14.25
		 */

		// this should be 14 as above
		const expected = Math.floor((healthValue + moneyValue) / 2);
		expect(result).toEqual(expected);
	});
});
