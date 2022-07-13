import { BoardSlice, BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Stores } from "../types";
import { doActions } from "./doActions";
import { doAttack } from "./state/attack";
import { StateFunction } from "./state/types";
import { doWander } from "./state/wander";

const stateFunctions = {
	wandering: doWander,
	attacking: doAttack,
};

export function simulatePiece(
	currentTurn: number,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	piece: PieceModel,
	piecePosition: PiecePosition,
	{ combatStore }: Stores
) {
	const { state } = combatStore.getPiece(piece.id);

	const fn = stateFunctions[state.type] as StateFunction;

	const [newState, actions] = fn(
		currentTurn,
		board,
		state,
		piece,
		piecePosition,
		{
			combatStore,
		}
	);

	// if there was a new state, set our piece to it
	if (newState !== state) {
		combatStore.updatePiecePartial(piece.id, { state: newState });
	}

	// process any actions
	if (actions) {
		board = doActions(
			currentTurn,
			board,
			boardSlice,
			piece,
			piecePosition,
			actions,
			{
				combatStore,
			}
		);
	}

	return board;
}
