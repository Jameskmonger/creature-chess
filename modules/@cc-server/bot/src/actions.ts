import { PlayerState } from "@creature-chess/gamemode";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "./brain";
import {
	createBuyXpAction,
	createBuyCardAction,
	createPassAction,
	createSellPieceAction,
	createRerollCardsAction,
} from "./preparingPhase/actions";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

/**
 * Soft termination threshold on the `[0, 1]` utility scale. Actions scoring
 * below this are filtered out; when the filter drops every candidate,
 * `getActions` returns an empty array and the preparing-phase loop exits via
 * the `actions.length === 0` path.
 *
 * This separates "this action is impossible" (legality, still returned as
 * `null` from the action creators) from "this action would be a bad idea right
 * now" (soft score below threshold).
 *
 * The value `0.05` is a meaningful "action isn't worth the budget" floor on
 * the `[0, 1]` scale.
 */
const BOT_ACTION_THRESHOLD = 0.05;

export const getActions = (
	board: Board,
	bench: Board,
	pieceRegistry: PieceRegistry,
	state: PlayerState,
	personality: BotPersonality,
	settings: GamemodeSettings
): BrainAction[] => {
	const actions: (BrainAction | null)[] = [
		createPassAction(board, bench, state, personality),
		createBuyXpAction(bench, state, personality, settings),
		createRerollCardsAction(board, bench, pieceRegistry, state, personality, settings),
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

	// Drop illegal actions (`null`) and actions below the soft-termination
	// threshold. When every candidate falls below the threshold the filtered
	// array is empty, which makes the preparing-phase loop break via its
	// `actions.length === 0` path — the single termination mechanism for
	// "nothing worth doing right now".
	const filtered = actions.filter(
		(action): action is BrainAction =>
			action !== null && action.value >= BOT_ACTION_THRESHOLD
	);

	filtered.sort((a, b) => b.value - a.value);

	return filtered;
};
