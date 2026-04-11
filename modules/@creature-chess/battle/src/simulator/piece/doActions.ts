import { PieceModel } from "@creature-chess/models";

import { Stores } from "../types";
import { actionFunctions, PieceAction } from "./actions";
import { PieceRegistry } from "@creature-chess/utils";
import { Board } from "@creature-chess/board";

/**
 * Execute a list of actions and return a new board state.
 */
export function doActions(
	currentTurn: number,
	board: Board,
	pieceRegistry: PieceRegistry,
	id: PieceModel["id"],
	actions: PieceAction[],
	stores: Stores
) {
	for (const action of actions) {
		const handler = actionFunctions[action.type];

		handler(
			currentTurn,
			board,
			pieceRegistry,
			id,
			action,
			stores
		);
	}
}
