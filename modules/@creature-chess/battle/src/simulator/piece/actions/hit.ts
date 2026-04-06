import {
	getDistance,
	getRelativeDirection,
	PieceModel,
} from "@creature-chess/models";

import { getCooldownForSpeed } from "../../../utils/getCooldownForSpeed";
import { getHitDamage } from "../../../utils/getHitDamage";
import { getNewAttackerFacingAway } from "../../../utils/getNewAttackerFacingAway";
import { getStats } from "../../../utils/getStats";
import { inAttackRange } from "../../../utils/inAttackRange";
import { Stores } from "../../types";
import { HitAction } from "./types";
import { PieceRegistry } from "@creature-chess/utils/piece";
import { Board } from "@creature-chess/board";

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

	const inRange = inAttackRange(
		{ x: attackerPosition[0], y: attackerPosition[1] },
		{ x: targetPosition[0], y: targetPosition[1] },
		attackerStats.attackType
	);

	if (!inRange) {
		return;
	}

	const damage = getHitDamage(attacker, target);
	const newDefenderHealth = Math.max(target.currentHealth - damage, 0);

	const attackerDirection = getRelativeDirection(
		{ x: attackerPosition[0], y: attackerPosition[1] },
		{ x: targetPosition[0], y: targetPosition[1] }
	);
	const attackerDistance = getDistance(
		{ x: attackerPosition[0], y: attackerPosition[1] },
		{ x: targetPosition[0], y: targetPosition[1] }
	);
	const attackerFacingAway = getNewAttackerFacingAway(
		attacker.facingAway,
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
	});

	const canBeAttackedAtTurn = currentTurn + MOVE_TURN_DURATION + 2;

	combatStore.updatePiecePartial(target.id, { canBeAttackedAtTurn });

	const newAttacker: PieceModel = {
		...attacker,
		facingAway: attackerFacingAway,
		lastBattleStats: {
			...attacker.lastBattleStats!,
			damageDealt: attacker.lastBattleStats!.damageDealt + damage,
		},
	};

	const defender: PieceModel = {
		...target,
		currentHealth: newDefenderHealth,
		lastBattleStats: {
			...target.lastBattleStats!,
			damageTaken: target.lastBattleStats!.damageTaken + damage,
		},
	};

	pieceRegistry.registerPiece(newAttacker);
	pieceRegistry.registerPiece(defender);

	if (eventLog) {
		eventLog.append({
			type: "piece_attack",
			pieceId: attacker.id,
			targetId: target.id,
			attackTypeName: attackerStats.attackType.name,
			direction: attackerDirection,
			distance: attackerDistance,
			damage,
		});
		eventLog.append({
			type: "piece_hit",
			pieceId: target.id,
			direction: getRelativeDirection(
				{ x: targetPosition[0], y: targetPosition[1] },
				{ x: attackerPosition[0], y: attackerPosition[1] }
			),
			damage,
		});
	}
}
