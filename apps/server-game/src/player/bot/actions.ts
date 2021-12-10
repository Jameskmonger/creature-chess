import { BoardSelectors } from "@shoki/board";
import { PlayerState } from "@creature-chess/gamemode";
import { BotPersonality } from "@creature-chess/data";
import { BrainAction } from "./brain";
import { BrainActionValue } from "./brain/action";
import { createBuyXpAction, createBuyCardAction, createSellPieceAction, createRerollCardsAction } from "./preparingPhase/actions";

export const getActions = (state: PlayerState, personality: BotPersonality): BrainAction[] => {
	const actions: (BrainAction | null)[] = [
		createBuyXpAction(state, personality),
		createRerollCardsAction(state, personality)
	];

	const {
		bench,
		cardShop: { cards }
	} = state;

	// create an action to buy every card in the shop
	for (let index = 0; index < cards.length; index++) {
		const card = cards[index];
		actions.push(createBuyCardAction(state, personality, index, card));
	}

	// create an action to sell all pieces on the bench
	for (const piece of BoardSelectors.getAllPieces(bench)) {
		actions.push(createSellPieceAction(state, personality, piece));
	}

	const filtered = actions.filter(
		(action): action is BrainAction => action !== null && action.value > BrainActionValue.USELESS
	);

	filtered.sort((a, b) => b.value - a.value);

	return filtered;
};
