import {
	BoardSelectors,
	BoardSlice,
	BoardState,
	PiecePosition,
} from "@shoki/board";

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

const ATTACK_TURN_DURATION = 2;
const MOVE_TURN_DURATION = 2;

export function doHit(
	currentTurn: number,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	attacker: PieceModel,
	attackerPosition: PiecePosition,
	action: HitAction,
	{ combatStore }: Stores
): BoardState<PieceModel> {
	const target = BoardSelectors.getPiece(board, action.payload.targetId);
	const targetPosition = BoardSelectors.getPiecePosition(
		board,
		action.payload.targetId
	);

	if (!target || !targetPosition) {
		return board;
	}

	const attackerStats = getStats(attacker);

	const inRange = inAttackRange(
		attackerPosition,
		targetPosition,
		attackerStats.attackType
	);

	if (!inRange) {
		return board;
	}

	const damage = getHitDamage(attacker, target);
	const newDefenderHealth = Math.max(target.currentHealth - damage, 0);

	const attackerDirection = getRelativeDirection(
		attackerPosition,
		targetPosition
	);
	const attackerDistance = getDistance(attackerPosition, targetPosition);
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

	const newAttacker = {
		...attacker,
		attacking: {
			attackType: attackerStats.attackType,
			distance: attackerDistance,
			direction: attackerDirection,
			damage,
		},
		facingAway: attackerFacingAway,
		lastBattleStats: {
			...attacker.lastBattleStats!,
			damageDealt: attacker.lastBattleStats!.damageDealt + damage,
		},
	};

	const defender: PieceModel = {
		...target,
		currentHealth: newDefenderHealth,
		hit: {
			direction: getRelativeDirection(targetPosition, attackerPosition),
			damage,
		},
		lastBattleStats: {
			...target.lastBattleStats!,
			damageTaken: target.lastBattleStats!.damageTaken + damage,
		},
	};

	return boardSlice.boardReducer(
		board,
		boardSlice.commands.updateBoardPiecesCommand([newAttacker, defender])
	);
}
