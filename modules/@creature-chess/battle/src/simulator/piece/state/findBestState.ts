import { BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { StandardTargetProvider } from "../../../targeting/provider/StandardTargetProvider";
import { TargetProvider } from "../../../targeting/provider/TargetProvider";
import { Stores } from "../../types";
import { WanderState, PieceState } from "./types";

const targetProvider: TargetProvider = new StandardTargetProvider();

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
		const targetId = targetProvider.getTarget(piece, board);

		if (targetId) {
			return { type: "attacking", payload: { targetId } };
		}
	}

	return { type: "wandering" };
}
