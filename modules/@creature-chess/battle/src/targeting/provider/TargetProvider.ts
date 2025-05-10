import { BoardState } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

export interface TargetProvider {
	/**
	 * Finds the most suitable target for the given piece on the board.
	 *
	 * @param attackerId The ID of the attacking piece.
	 * @param board The current state of the board.
	 */
	getTarget(attackerId: string, board: BoardState<PieceModel>): string | null;
}
