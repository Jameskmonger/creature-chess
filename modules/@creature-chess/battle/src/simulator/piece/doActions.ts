import { BoardSlice, BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Stores } from "../types";
import { actionFunctions, PieceAction } from "./actions";

/**
 * Execute a list of actions and return a new board state.
 */
export function doActions(
	currentTurn: number,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	piece: PieceModel,
	piecePosition: PiecePosition,
	actions: PieceAction[],
	{ combatStore }: Stores
) {
	for (const action of actions) {
		const handler = actionFunctions[action.type];

		board = handler(
			currentTurn,
			board,
			boardSlice,
			piece,
			piecePosition,
			action,
			{
				combatStore,
			}
		);
	}

	return board;
}
