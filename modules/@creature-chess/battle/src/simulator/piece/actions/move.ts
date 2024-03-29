import { BoardSlice, BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { getCooldownForSpeed } from "../../../utils/getCooldownForSpeed";
import { getStats } from "../../../utils/getStats";
import { Stores } from "../../types";
import { MoveAction } from "../actions";

const MOVE_TURN_DURATION = 2;

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
	if ((combatState.canMoveAtTurn || 0) > currentTurn) {
		return board;
	}

	const stats = getStats(piece);

	const canMoveAtTurn =
		currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(stats.speed);

	combatStore.updatePiecePartial(piece.id, {
		canMoveAtTurn,
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
