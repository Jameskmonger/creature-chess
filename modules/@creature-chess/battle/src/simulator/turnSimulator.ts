import { BoardSelectors, BoardSlice, BoardState } from "@shoki/board";

import {
	PieceModel,
	getRelativeDirection,
	TileCoordinates,
	Directions,
	getDistance,
} from "@creature-chess/models";

import { getNextPiecePosition } from "../pathfinding";
import { PieceCombatState, PieceInfoStore } from "../state";
import { findTargetId } from "../utils/findTargetId";
import { getStats } from "../utils/getStats";
import { inAttackRange } from "../utils/inAttackRange";
import { getTypeAttackBonus } from "../utils/typeRelations";
import { simulatePiece } from "./piece/simulate";

const ATTACK_TURN_DURATION = 2;

type Stores = { combatStore: PieceInfoStore<PieceCombatState> };

export const simulateTurn = (
	currentTurn: number,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	stores: Stores
) => {
	const pieceEntries = Object.entries(board.pieces);

	pieceEntries.sort(([, aPiece], [, bPiece]) => {
		const aStats = getStats(aPiece);
		const bStats = getStats(bPiece);

		return bStats.speed - aStats.speed;
	});

	return pieceEntries.reduce(
		(b, [pieceId]) =>
			takePieceTurn(currentTurn, pieceId, b, boardSlice, stores),
		board
	);
};

const takePieceTurn = (
	currentTurn: number,
	pieceId: string,
	board: BoardState<PieceModel>,
	boardSlice: BoardSlice<PieceModel>,
	{ combatStore }: Stores
): BoardState<PieceModel> => {
	const piece = BoardSelectors.getPiece(board, pieceId);

	if (!piece) {
		return board;
	}

	const combatState = combatStore.getPiece(pieceId);

	// create a new piece object, reset combat properties
	const attacker: PieceModel = {
		...piece,
		attacking: null,
		hit: null,
	};

	const attackerPosition = BoardSelectors.getPiecePosition(board, pieceId);

	if (!attackerPosition) {
		return board;
	}

	return simulatePiece(
		currentTurn,
		board,
		boardSlice,
		attacker,
		attackerPosition,
		{ combatStore }
	);

	// const attackerTargetId = attackerCombatState.targetId;
	// const attackerBoardState = attackerCombatState.board;
	// const attackerStats = getStats(attacker);

	// // board management

	// const cooldown = getCooldownForSpeed(attackerStats.speed);

	// if (attackerBoardState.canMoveAtTurn === null) {
	// 	attackerBoardState.canMoveAtTurn = currentTurn + cooldown;
	// }

	// if (attackerBoardState.canAttackAtTurn === null) {
	// 	attackerBoardState.canAttackAtTurn = currentTurn + cooldown;
	// }

	// // combat logic

	// if (!attackerTargetId) {
	// 	const targetId = findTargetId(attacker, board);

	// 	if (targetId) {
	// 		combatStore.updatePiecePartial(pieceId, {
	// 			targetId,
	// 		});
	// 	}

	// 	return boardSlice.boardReducer(
	// 		board,
	// 		boardSlice.commands.updateBoardPiecesCommand([attacker])
	// 	);
	// }

	// const target = BoardSelectors.getPiece(board, attackerTargetId);
	// const targetCombat = combatStore.getPiece(attackerTargetId);

	// if (inRange) {
	// 	// target is in range, so attack
	// 	const damage = getAttackDamage(attacker, target);
	// 	const newDefenderHealth = Math.max(target.currentHealth - damage, 0);

	// 	const attackerDirection = getRelativeDirection(
	// 		attackerPosition,
	// 		targetPosition
	// 	);
	// 	const attackerDistance = getDistance(attackerPosition, targetPosition);
	// 	const attackerFacingAway = getNewAttackerFacingAway(
	// 		attacker.facingAway,
	// 		attackerDirection
	// 	);

	// 	combatStore.updatePiecePartial(pieceId, {
	// 		board: {
	// 			...attackerCombatState.board,

	// 			// attack cooldown
	// 			canAttackAtTurn:
	// 				currentTurn +
	// 				ATTACK_TURN_DURATION +
	// 				getCooldownForSpeed(attackerStats.speed),
	// 		},
	// 	});

	// 	const newAttacker = {
	// 		...attacker,
	// 		attacking: {
	// 			attackType: attackerStats.attackType,
	// 			distance: attackerDistance,
	// 			direction: attackerDirection,
	// 			damage,
	// 		},
	// 		facingAway: attackerFacingAway,
	// 	};

	// 	const defender: PieceModel = {
	// 		...target,
	// 		currentHealth: newDefenderHealth,
	// 		hit: {
	// 			direction: getRelativeDirection(targetPosition, attackerPosition),
	// 			damage,
	// 		},
	// 	};

	// 	return boardSlice.boardReducer(
	// 		board,
	// 		boardSlice.commands.updateBoardPiecesCommand([newAttacker, defender])
	// 	);
	// } else {
	// 	const attackerDirection = getRelativeDirection(
	// 		attackerPosition,
	// 		targetPosition
	// 	);

	// 	attacker.facingAway = getNewAttackerFacingAway(
	// 		attacker.facingAway,
	// 		attackerDirection
	// 	);

	// 	attackerBoardState.canMoveAtTurn =
	// 		currentTurn +
	// 		MOVE_TURN_DURATION +
	// 		getCooldownForSpeed(attackerStats.speed);
	// 	attackerBoardState.canBeAttackedAtTurn =
	// 		currentTurn + MOVE_TURN_DURATION + 2;
	// 	attackerBoardState.canAttackAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
};

const getNewAttackerFacingAway = (
	oldFacingAway: boolean,
	direction: TileCoordinates
) => {
	if (direction === Directions.LEFT || direction === Directions.RIGHT) {
		// if it's left or right we don't need to change it
		return oldFacingAway;
	}

	if (direction === Directions.UP) {
		return true;
	}

	return false;
};

const getAttackDamage = (
	attacker: PieceModel,
	defender: PieceModel
): number => {
	const attackerStats = getStats(attacker);
	const defenderStats = getStats(defender);

	const attackBonus = getTypeAttackBonus(
		attacker.definition.type,
		defender.definition.type
	);
	return (attackerStats.attack / defenderStats.defense) * attackBonus * 8; // todo tweak this
};
