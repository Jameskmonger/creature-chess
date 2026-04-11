import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils";

export interface TargetProvider {
	/**
	 * Finds the most suitable target for the given piece on the board.
	 *
	 * @param board The current state of the board.
	 * @param pieceRegistry The registry containing piece models.
	 * @param attackerId The ID of the attacking piece.
	 */
	getTarget(
		board: Board,
		pieceRegistry: PieceRegistry,
		attackerId: string
	): string | null;
}
