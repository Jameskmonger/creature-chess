import { createUtilityValue, ScoringDirection } from "@shoki/engine";
import { PlayerActions, PlayerState, PlayerStateSelectors } from "@creature-chess/gamemode";
import { Constants } from "@creature-chess/models";
import { BotPersonality } from "@creature-chess/data";
import { BrainAction } from "../../brain";

export const createRerollCardsAction = (state: PlayerState, personality: BotPersonality): BrainAction | null => {
	const cards = PlayerStateSelectors.getPlayerCards(state).filter(c => c !== null);
	const health = PlayerStateSelectors.getPlayerHealth(state);
	const money = PlayerStateSelectors.getPlayerMoney(state);

	const canAfford = money > 13 + Constants.REROLL_COST;

	// bots, for now, will only reroll if the shop is completely empty and they have more money than 13 + reroll cost
	if (cards.length !== 0 || !canAfford) {
		return null;
	}

	return {
		name: "reroll cards",
		action: PlayerActions.rerollCardsPlayerAction,
		value: createUtilityValue([
			{
				value: health,
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
				value: money,
				range: [1, 55],

				// utility score should be higher if money is high
				direction: ScoringDirection.High,

				// more important with high ambition
				weighting: {
					value: personality.ambition,
					direction: ScoringDirection.High
				}
			}
		]),
	};
};
