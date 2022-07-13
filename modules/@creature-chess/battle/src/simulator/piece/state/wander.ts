import { BoardSelectors, BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { getTargetAttackPositions } from "../../../utils/getTargetAttackPositions";
import { Stores } from "../../types";
import { MoveAction } from "../actions";
import { findBestState } from "./findBestState";
import { StateResult, WanderState } from "./types";

export function doWander(
	currentTurn: number,
	board: BoardState<PieceModel>,
	state: WanderState,
	piece: PieceModel,
	piecePosition: PiecePosition,
	{ combatStore }: Stores
): StateResult {
	// TODO search for a better state here and return early
	const bestState = findBestState(
		currentTurn,
		board,
		state,
		piece,
		piecePosition,
		{ combatStore }
	);

	if (bestState.type !== "wandering") {
		return [bestState];
	}

	const combatState = combatStore.getPiece(piece.id);

	// if the piece can't move yet, don't do anything
	if ((combatState.canMoveAtTurn || 0) > currentTurn) {
		return [state];
	}

	const adjacentPositions = getTargetAttackPositions(board, piecePosition);
	const emptyPositions = adjacentPositions.filter(
		(p) => BoardSelectors.getPieceForPosition(board, p.x, p.y) === null
	);

	// no empty positions, so don't do anything
	if (emptyPositions.length === 0) {
		return [state];
	}

	const moveAction: MoveAction = {
		type: "move",
		payload: {
			x: emptyPositions[0].x,
			y: emptyPositions[0].y,
		},
	};

	return [state, [moveAction]];
}
