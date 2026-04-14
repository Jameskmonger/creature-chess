import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils";

import { PieceCombatState } from "./state";
import { PieceInfoStore } from "./store";

const INITIAL_CAN_MOVE_AT_TURN = 15;
const INITIAL_CAN_ATTACK_AT_TURN = 15;

export function seedCombatStore(
	combatStore: PieceInfoStore<PieceCombatState>,
	board: Board,
	pieceRegistry: PieceRegistry
) {
	const halfHeight = board.height / 2;

	for (const { id, y } of board.getAllPieces()) {
		const model = pieceRegistry.getPieceById(id);

		if (!model) {
			continue;
		}

		combatStore.seedPiece(id, {
			state: { type: "wandering" },
			canMoveAtTurn: INITIAL_CAN_MOVE_AT_TURN,
			canBeAttackedAtTurn: 0,
			canAttackAtTurn: INITIAL_CAN_ATTACK_AT_TURN,
			currentHealth: model.maxHealth,
			facingAway: y >= halfHeight,
			battleStats: {
				damageDealt: 0,
				damageTaken: 0,
				turnsSurvived: 0,
			},
		});
	}
}
