import { BoardSelectors } from "@shoki/board";

import { PlayerState } from "@creature-chess/gamemode";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "./brain";
import { BrainActionValue } from "./brain/action";
import {
	createBuyXpAction,
	createBuyCardAction,
	createSellPieceAction,
	createRerollCardsAction,
	createSellBoardPieceAction,
} from "./preparingPhase/actions";

export const getActions = (
	state: PlayerState,
	personality: BotPersonality,
	settings: GamemodeSettings
): BrainAction[] => {
	const actions: (BrainAction | null)[] = [
		createBuyXpAction(state, personality, settings),
		createRerollCardsAction(state, personality, settings),
	];

	const {
		board,
		bench,
		cardShop: { cards },
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

	// create an action to sell all pieces on the board
	for (const piece of BoardSelectors.getAllPieces(board)) {
		actions.push(createSellBoardPieceAction(state, personality, piece));
	}

	const filtered = actions.filter(
		(action): action is BrainAction =>
			action !== null && action.value > BrainActionValue.USELESS
	);

	filtered.sort((a, b) => b.value - a.value);

	return filtered;
};
