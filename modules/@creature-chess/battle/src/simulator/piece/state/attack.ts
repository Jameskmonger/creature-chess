import { Board, packPosition } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { ReadablePieceRegistry } from "@creature-chess/utils";

import { Pathfinder, getNextPiecePosition } from "../../../pathfinding";
import { findEnemyInAttackRange } from "../../../targeting/utils/getTargetAttackPositions";
import { getAttackRange } from "../../../utils/getStats";
import { inAttackRange } from "../../../utils/inAttackRange";
import { Stores } from "../../types";
import { AttackState, StateResult } from "./types";

export function doAttack(
	currentTurn: number,
	state: AttackState,
	board: Board,
	pieceRegistry: ReadablePieceRegistry,
	pieceId: PieceModel["id"],
	{ combatStore }: Stores
): StateResult {
	const combat = combatStore.getPiece(pieceId);
	const otherCombat = combatStore.getPiece(state.payload.targetId);

	if (
		combat.canAttackAtTurn > currentTurn ||
		otherCombat.canBeAttackedAtTurn > currentTurn
	) {
		return [state];
	}

	const piece = pieceRegistry.getPieceById(pieceId);
	const piecePosition = board.getPiecePosition(pieceId);

	if (!piece || !piecePosition) {
		return [state];
	}

	const attackRange = getAttackRange(piece);

	const target = pieceRegistry.getPieceById(state.payload.targetId);
	const targetPosition = board.getPiecePosition(state.payload.targetId);

	const targetAlive = otherCombat.currentHealth > 0;

	// some issue with this target
	if (!target || !targetPosition || !targetAlive) {
		return [{ type: "wandering" }];
	}

	const inRange = inAttackRange(
		packPosition(piecePosition[0], piecePosition[1]),
		packPosition(targetPosition[0], targetPosition[1]),
		attackRange
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
		pieceRegistry,
		piece.ownerId,
		packPosition(piecePosition[0], piecePosition[1]),
		attackRange
	);

	if (otherEnemyInRange) {
		return [
			{ type: "attacking", payload: { targetId: otherEnemyInRange.piece.id } },
		];
	}

	const pathfinder = new Pathfinder({
		width: board.width,
		height: board.height,
	});

	const nextPosition = getNextPiecePosition(
		pathfinder,
		packPosition(piecePosition[0], piecePosition[1]),
		combat.facingAway,
		attackRange,
		packPosition(targetPosition[0], targetPosition[1]),
		board
	);

	// can't move towards target, wait
	// TODO we should probably break here and find a new target
	if (!nextPosition) {
		return [state];
	}

	return [state, [{ type: "move", payload: nextPosition }]];
}
