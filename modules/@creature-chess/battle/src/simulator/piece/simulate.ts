import { BoardSlice, BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Stores } from "../types";
import { doActions } from "./doActions";
import { doAttack } from "./state/attack";
import { doDying } from "./state/dying";
import { PieceState, StateFunction } from "./state/types";
import { doWander } from "./state/wander";

const DYING_DURATION = 10;

const stateFunctions = {
	wandering: doWander,
	attacking: doAttack,
	dying: doDying,
};

/**
 * Get the current state of the piece.
 *
 * Overrides the state of the piece if it's dying.
 */
function getPieceState(
	currentTurn: number,
	piece: PieceModel,
	{ combatStore }: Stores
): PieceState {
	const combatState = combatStore.getPiece(piece.id);

	if (piece.currentHealth === 0 && combatState.state.type !== "dying") {
		const removeFromBoardAtTurn = currentTurn + DYING_DURATION;

		return { type: "dying", payload: { dieAtTurn: removeFromBoardAtTurn } };
	}

	return combatState.state;
}

/**
 * Simulate the turn of a single piece on the board, and return the new board state.
 */
export function simulatePiece(
	currentTurn: number,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	piece: PieceModel,
	piecePosition: PiecePosition,
	{ combatStore }: Stores
) {
	const state = getPieceState(currentTurn, piece, { combatStore });

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
