import { Board, unpackX, unpackY } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { getCooldownForSpeed } from "../../../utils/getCooldownForSpeed";
import { getStats } from "../../../utils/getStats";
import { Stores } from "../../types";
import { MoveAction } from "../actions";

const MOVE_TURN_DURATION = 2;

export function doMove(
	currentTurn: number,
	board: Board,
	pieceRegistry: ReadablePieceRegistry,
	id: PieceModel["id"],
	action: MoveAction,
	{ combatStore, creatures }: Stores
) {
	const existingPosition = board.getPiecePosition(id);

	if (!existingPosition) {
		return;
	}

	const combatState = combatStore.getPiece(id);

	// if the piece can't move yet, don't do anything
	if ((combatState.canMoveAtTurn || 0) > currentTurn) {
		return;
	}

	const piece = pieceRegistry.getPieceById(id);

	if (!piece) {
		return;
	}

	const stats = getStats(piece, creatures);

	const canMoveAtTurn =
		currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(stats.speed);

	combatStore.updatePiecePartial(piece.id, {
		canMoveAtTurn,
	});

	board.setPiece(id, unpackX(action.payload), unpackY(action.payload));
}
