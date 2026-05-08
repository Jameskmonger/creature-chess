import { Board } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { Stores } from "../../types";
import { DyingState, StateResult } from "./types";

export function doDying(
	currentTurn: number,
	state: DyingState,
	board: Board,
	pieceRegistry: ReadablePieceRegistry,
	pieceId: PieceModel["id"],
	{ combatStore }: Stores
): StateResult {
	if (state.payload.dieAtTurn <= currentTurn) {
		return [state, [{ type: "delete" }]];
	}

	return [state];
}
