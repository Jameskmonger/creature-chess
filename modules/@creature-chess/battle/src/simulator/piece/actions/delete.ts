import { BoardSlice, BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Stores } from "../../types";
import { DeleteAction } from "./types";

export function doDelete(
	currentTurn: number,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	piece: PieceModel,
	piecePosition: PiecePosition,
	action: DeleteAction,
	{ combatStore }: Stores
): BoardState<PieceModel> {
	return boardSlice.boardReducer(
		board,
		boardSlice.commands.removeBoardPiecesCommand([piece.id])
	);
}
