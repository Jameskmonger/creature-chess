import { BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Stores } from "../../types";
import { DyingState, StateResult } from "./types";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

export function doDying(
	currentTurn: number,
	state: DyingState,
	board: Board,
	pieceRegistry: PieceRegistry,
	pieceId: PieceModel["id"],
	{ combatStore }: Stores
): StateResult {
	if (state.payload.dieAtTurn <= currentTurn) {
		return [state, [{ type: "delete" }]];
	}

	return [state];
}
