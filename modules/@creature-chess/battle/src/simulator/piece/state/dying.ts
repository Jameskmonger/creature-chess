import { BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Stores } from "../../types";
import { DyingState, StateResult } from "./types";

export function doDying(
	currentTurn: number,
	board: BoardState<PieceModel>,
	state: DyingState,
	piece: PieceModel,
	piecePosition: PiecePosition,
	{ combatStore }: Stores
): StateResult {
	if (state.payload.dieAtTurn <= currentTurn) {
		return [state, [{ type: "delete" }]];
	}

	return [state];
}
