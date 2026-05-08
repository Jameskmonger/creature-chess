import { Board } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { Stores } from "../../types";
import { DeleteAction } from "./types";

export function doDelete(
	currentTurn: number,
	board: Board,
	pieceRegistry: ReadablePieceRegistry,
	id: PieceModel["id"],
	action: DeleteAction,
	{ combatStore }: Stores
) {
	if (!board.containsPiece(id)) {
		return;
	}

	board.removePiece(id);
}
