import { Board } from "@creature-chess/board";
import { CreatureLookup } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { PieceCombatState, PieceInfoStore } from "../../state";

export interface TargetProvider {
	/**
	 * Finds the most suitable target for the given piece on the board.
	 *
	 * @param board The current state of the board.
	 * @param pieceRegistry The registry containing piece models.
	 * @param combatStore The store holding combat state for each piece.
	 * @param creatures The lookup for creature definitions.
	 * @param attackerId The ID of the attacking piece.
	 */
	getTarget(
		board: Board,
		pieceRegistry: ReadablePieceRegistry,
		combatStore: PieceInfoStore<PieceCombatState>,
		creatures: CreatureLookup,
		attackerId: string
	): string | null;
}
