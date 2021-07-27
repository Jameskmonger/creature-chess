# utility (@shoki/engine)

The utility system in Shoki allows you to create utility values from a number of inputs, with those inputs interacting in different ways.

Used in Creature Chess for allowing bots to prioritise actions based on the current world state, with their perception of that world state being altered by the bots individual personality values.

## Usage

```ts
import { createUtilityValue, ScoringDirection } from "@shoki/engine";

createUtilityValue([
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
```

The above example will provide a utility value between 1 and 200, taking into account the inputs and personality values as described.
