import { BoardSelectors, BoardState, PiecePosition } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";

import { Pathfinder, getNextPiecePosition } from "../../../pathfinding";
import { getStats } from "../../../utils/getStats";
import { findEnemyInAttackRange } from "../../../utils/getTargetAttackPositions";
import { inAttackRange } from "../../../utils/inAttackRange";
import { Stores } from "../../types";
import { AttackState, StateResult } from "./types";

export function doAttack(
	currentTurn: number,
	board: BoardState<PieceModel>,
	state: AttackState,
	piece: PieceModel,
	piecePosition: PiecePosition,
	{ combatStore }: Stores
): StateResult {
	const combat = combatStore.getPiece(piece.id);
	const otherCombat = combatStore.getPiece(state.payload.targetId);

	if (
		combat.canAttackAtTurn > currentTurn ||
		otherCombat.canBeAttackedAtTurn > currentTurn
	) {
		return [state];
	}

	const attackerStats = getStats(piece);

	const target = BoardSelectors.getPiece(board, state.payload.targetId);
	const targetPosition = BoardSelectors.getPiecePosition(
		board,
		state.payload.targetId
	);

	const targetAlive = (target?.currentHealth || 0) > 0;

	// some issue with this target
	if (!target || !targetPosition || !targetAlive) {
		return [{ type: "wandering" }];
	}

	const inRange = inAttackRange(
		piecePosition,
		targetPosition,
		attackerStats.attackType
	);

	if (inRange) {
		return [
			state,
			[{ type: "hit", payload: { targetId: state.payload.targetId } }],
		];
	}

	// if we can't hit our target, is there a target immediately in range?
	const otherEnemyInRange = findEnemyInAttackRange(
		board,
		piece.ownerId,
		piecePosition,
		attackerStats.attackType.range
	);

	if (otherEnemyInRange) {
		return [
			{ type: "attacking", payload: { targetId: otherEnemyInRange.piece.id } },
		];
	}

	const pathfinder = new Pathfinder(board.size);

	const nextPosition = getNextPiecePosition(
		pathfinder,
		piecePosition,
		piece.facingAway,
		attackerStats,
		targetPosition,
		board
	);

	// can't move towards target, wait
	// TODO we should probably break here and find a new target
	if (!nextPosition) {
		return [state];
	}

	return [state, [{ type: "move", payload: nextPosition }]];
}
