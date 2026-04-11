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
} from "./preparingPhase/actions";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

export const getActions = (
	board: Board,
	bench: Board,
	pieceRegistry: PieceRegistry,
	state: PlayerState,
	personality: BotPersonality,
	settings: GamemodeSettings
): BrainAction[] => {
	const actions: (BrainAction | null)[] = [
		createBuyXpAction(bench, state, personality, settings),
		createRerollCardsAction(state, personality, settings),
	];

	const {
		cardShop: { cards },
	} = state;

	// create an action to buy every card in the shop
	for (let index = 0; index < cards.length; index++) {
		const card = cards[index];
		actions.push(
			createBuyCardAction(board, bench, pieceRegistry, state, personality, settings, index, card)
		);
	}

	// create a sell action for every piece on the board OR bench
	const allPieceIds = [
		...board.getAllPieces().map((p) => p.id),
		...bench.getAllPieces().map((p) => p.id),
	];
	for (const id of allPieceIds) {
		actions.push(
			createSellPieceAction(board, bench, pieceRegistry, state, personality, id)
		);
	}

	const filtered = actions.filter(
		(action): action is BrainAction =>
			action !== null && action.value > BrainActionValue.USELESS
	);

	filtered.sort((a, b) => b.value - a.value);

	return filtered;
};
