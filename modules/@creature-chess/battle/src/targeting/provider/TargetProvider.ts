import { Board } from "@creature-chess/board";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { PieceCombatState, PieceInfoStore } from "../../state";

export interface TargetProvider {
	/**
	 * Finds the most suitable target for the given piece on the board.
	 *
	 * @param board The current state of the board.
	 * @param pieceRegistry The registry containing piece models.
	 * @param combatStore The store holding combat state for each piece.
	 * @param attackerId The ID of the attacking piece.
	 */
	getTarget(
		board: Board,
		pieceRegistry: ReadablePieceRegistry,
		combatStore: PieceInfoStore<PieceCombatState>,
		attackerId: string
	): string | null;
}
