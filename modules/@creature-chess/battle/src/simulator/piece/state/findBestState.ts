import { BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { findTargetId } from "../../../utils/findTargetId";
import { getStats } from "../../../utils/getStats";
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
		const attackerStats = getStats(piece);
		const targetId = findTargetId(piece, board, attackerStats.attackType.range);

		if (targetId) {
			return { type: "attacking", payload: { targetId } };
		}
	}

	return { type: "wandering" };
}
