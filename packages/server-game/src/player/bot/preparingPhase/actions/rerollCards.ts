import { PlayerActions, PlayerState, PlayerStateSelectors } from "@creature-chess/gamemode";
import { Constants } from "@creature-chess/models";
import { BrainAction, BrainActionValue } from "../../brain";

export const createRerollCardsAction = (state: PlayerState): BrainAction | null => {
	const cards = PlayerStateSelectors.getPlayerCards(state).filter(c => c !== null);
	const money = PlayerStateSelectors.getPlayerMoney(state);

	const canAfford = money > 13 + Constants.REROLL_COST;

	// bots, for now, will only reroll if the shop is completely empty and they have more money than 13 + reroll cost
	if (cards.length !== 0 || !canAfford) {
		return null;
	}

	return {
		name: "reroll cards",
		action: PlayerActions.rerollCardsPlayerAction,
		value: BrainActionValue.EXTREMELY_HIGH_VALUE,
	};
};
