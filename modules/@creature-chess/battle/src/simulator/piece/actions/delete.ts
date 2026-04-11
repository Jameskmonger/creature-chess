import { PieceModel } from "@creature-chess/models";

import { Stores } from "../../types";
import { DeleteAction } from "./types";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils";

export function doDelete(
	currentTurn: number,
	board: Board,
	pieceRegistry: PieceRegistry,
	id: PieceModel["id"],
	action: DeleteAction,
	{ combatStore }: Stores
) {
	if (!board.containsPiece(id)) {
		return;
	}

	board.removePiece(id);
}
