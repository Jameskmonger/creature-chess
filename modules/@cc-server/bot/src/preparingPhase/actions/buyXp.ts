import { createUtilityValue, ScoringDirection } from "@shoki/engine";

import {
	PlayerActions,
	PlayerState,
	PlayerStateSelectors,
} from "@creature-chess/gamemode";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "../../brain";
import { shouldBuyXp } from "../shouldBuyXp";

// todo make this use values, rather than a flat "shouldBuyXp"
export const createBuyXpAction = (
	state: PlayerState,
	personality: BotPersonality
): BrainAction | null => {
	if (!shouldBuyXp(state)) {
		return null;
	}

	const health = PlayerStateSelectors.getPlayerHealth(state);
	const money = PlayerStateSelectors.getPlayerMoney(state);

	return {
		name: "buy xp",
		action: PlayerActions.buyXpPlayerAction,
		value: createUtilityValue([
			{
				value: money,
				range: [1, 20],

				// utility score should be higher if money is high
				direction: ScoringDirection.High,

				// more important with high ambition
				weighting: {
					value: personality.ambition,
					direction: ScoringDirection.High,
				},
			},
			{
				value: health,
				range: [1, 100],

				// utility score should be higher if health is low
				direction: ScoringDirection.Low,

				// more important with low composure
				weighting: {
					value: personality.composure,
					direction: ScoringDirection.Low,
				},
			},
		]),
	};
};
