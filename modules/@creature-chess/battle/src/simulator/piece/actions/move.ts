import { PieceModel } from "@creature-chess/models";

import { getCooldownForSpeed } from "../../../utils/getCooldownForSpeed";
import { getStats } from "../../../utils/getStats";
import { Stores } from "../../types";
import { MoveAction } from "../actions";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

const MOVE_TURN_DURATION = 2;

export function doMove(
	currentTurn: number,
	board: Board,
	pieceRegistry: PieceRegistry,
	id: PieceModel["id"],
	action: MoveAction,
	{ combatStore }: Stores
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

	const stats = getStats(piece);

	const canMoveAtTurn =
		currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(stats.speed);

	combatStore.updatePiecePartial(piece.id, {
		canMoveAtTurn,
	});

	board.setPiece(id, action.payload.x, action.payload.y);
}
