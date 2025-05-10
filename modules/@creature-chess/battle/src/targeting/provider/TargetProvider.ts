import { BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

export interface TargetProvider {
	/**
	 * Finds the most suitable target for the given piece on the board.
	 *
	 * @param piece The attacking piece.
	 * @param board The current state of the board.
	 */
	getTarget(piece: PieceModel, board: BoardState<PieceModel>): string | null;
}
