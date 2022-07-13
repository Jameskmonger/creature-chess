import { BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { findTargetId } from "../../../utils/findTargetId";
import { Stores } from "../../types";
import { WanderState, PieceState } from "./types";

export function findBestState(
	currentTurn: number,
	board: BoardState<PieceModel>,
	state: WanderState,
	piece: PieceModel,
	piecePosition: PiecePosition,
	{ combatStore }: Stores
): PieceState {
	const combatState = combatStore.getPiece(piece.id);

	if (combatState.canAttackAtTurn <= currentTurn) {
		const targetId = findTargetId(piece, board);

		if (targetId) {
			return { type: "attacking", payload: { targetId } };
		}
	}

	return { type: "wandering" };
}
