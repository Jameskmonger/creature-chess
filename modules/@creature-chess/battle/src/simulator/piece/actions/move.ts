import { BoardSlice, BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { getStats } from "../../../utils/getStats";
import { Stores } from "../../types";
import { MoveAction } from "../actions";

const MOVE_TURN_DURATION = 2;

// todo tune this
const getCooldownForSpeed = (speed: number) => (180 - speed) / 24;

export function doMove(
	currentTurn: number,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	piece: PieceModel,
	piecePosition: PiecePosition,
	action: MoveAction,
	{ combatStore }: Stores
): BoardState<PieceModel> {
	const combatState = combatStore.getPiece(piece.id);

	// if the piece can't move yet, don't do anything
	if ((combatState.board.canMoveAtTurn || 0) > currentTurn) {
		return board;
	}

	const stats = getStats(piece);

	const canMoveAtTurn =
		currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(stats.speed);

	combatStore.updatePiecePartial(piece.id, {
		board: {
			...combatState.board,
			canMoveAtTurn,
		},
	});

	return boardSlice.boardReducer(
		board,
		boardSlice.commands.moveBoardPieceCommand({
			pieceId: piece.id,
			from: piecePosition,
			to: action.payload,
		})
	);
}
