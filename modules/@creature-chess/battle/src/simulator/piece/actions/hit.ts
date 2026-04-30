import { Board, getDelta, packPosition } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { getRelativeDirection } from "../../../utils/direction";
import { getCooldownForSpeed } from "../../../utils/getCooldownForSpeed";
import { getHitDamage } from "../../../utils/getHitDamage";
import { getNewAttackerFacingAway } from "../../../utils/getNewAttackerFacingAway";
import { getAttackRange, getStats } from "../../../utils/getStats";
import { inAttackRange } from "../../../utils/inAttackRange";
import { Stores } from "../../types";
import { HitAction } from "./types";

const ATTACK_TURN_DURATION = 2;
const MOVE_TURN_DURATION = 2;

export function doHit(
	currentTurn: number,
	board: Board,
	pieceRegistry: PieceRegistry,
	id: PieceModel["id"],
	action: HitAction,
	{ combatStore, eventLog }: Stores
) {
	const attacker = pieceRegistry.getPieceById(id);
	const attackerPosition = board.getPiecePosition(id);

	if (!attacker || !attackerPosition) {
		return;
	}

	const target = pieceRegistry.getPieceById(action.payload.targetId);
	const targetPosition = board.getPiecePosition(action.payload.targetId);

	if (!target || !targetPosition) {
		return;
	}

	const attackerStats = getStats(attacker);
	const attackRange = getAttackRange(attacker);

	const inRange = inAttackRange(
		packPosition(attackerPosition[0], attackerPosition[1]),
		packPosition(targetPosition[0], targetPosition[1]),
		attackRange
	);

	if (!inRange) {
		return;
	}

	const attackerCombat = combatStore.getPiece(attacker.id);
	const targetCombat = combatStore.getPiece(target.id);

	const damage = getHitDamage(attacker, target);
	const newDefenderHealth = Math.max(targetCombat.currentHealth - damage, 0);

	const attackerDirection = getRelativeDirection(
		packPosition(attackerPosition[0], attackerPosition[1]),
		packPosition(targetPosition[0], targetPosition[1])
	);

	const delta = getDelta(
		packPosition(attackerPosition[0], attackerPosition[1]),
		packPosition(targetPosition[0], targetPosition[1])
	);
	const attackerDistance = delta.x + delta.y;
	const attackerFacingAway = getNewAttackerFacingAway(
		attackerCombat.facingAway,
		attackerDirection
	);

	const canAttackAtTurn =
		currentTurn +
		ATTACK_TURN_DURATION +
		getCooldownForSpeed(attackerStats.speed);
	const canMoveAtTurn =
		currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(attackerStats.speed);

	combatStore.updatePiecePartial(attacker.id, {
		canAttackAtTurn,
		canMoveAtTurn,
		facingAway: attackerFacingAway,
		battleStats: {
			...attackerCombat.battleStats,
			damageDealt: attackerCombat.battleStats.damageDealt + damage,
		},
	});

	const canBeAttackedAtTurn = currentTurn + MOVE_TURN_DURATION + 2;

	combatStore.updatePiecePartial(target.id, {
		canBeAttackedAtTurn,
		currentHealth: newDefenderHealth,
		battleStats: {
			...targetCombat.battleStats,
			damageTaken: targetCombat.battleStats.damageTaken + damage,
		},
	});

	if (eventLog) {
		eventLog.append({
			type: "piece_attack",
			pieceId: attacker.id,
			targetId: target.id,
			ranged: attackRange > 1,
			direction: attackerDirection,
			distance: attackerDistance,
			damage,
		});
		eventLog.append({
			type: "piece_hit",
			pieceId: target.id,
			direction: getRelativeDirection(
				packPosition(targetPosition[0], targetPosition[1]),
				packPosition(attackerPosition[0], attackerPosition[1])
			),
			damage,
		});
	}
}
