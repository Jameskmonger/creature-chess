import { BoardSelectors, BoardSlice, BoardState } from "@shoki/board";

import {
	CreatureType,
	PieceModel,
	getRelativeDirection,
	TileCoordinates,
	Directions,
	getDistance,
} from "@creature-chess/models";

import { getNextPiecePosition } from "./pathfinding";
import { PieceCombatState, PieceInfoStore } from "./state";
import { findTargetId } from "./utils/findTargetId";
import { isOvercomeBy, isGeneratedBy } from "./utils/get-type-attack-bonus";
import { inAttackRange } from "./utils/inAttackRange";

const DYING_DURATION = 10;
const ATTACK_TURN_DURATION = 2;
const MOVE_TURN_DURATION = 2;

// todo tune this
const getCooldownForSpeed = (speed: number) => (180 - speed) / 24;

const STRONG_ATTACK_MODIFIER = 1.7;
const WEAK_ATTACK_MODIFIER = 0.3;

const getStats = (piece: PieceModel) => piece.definition.stages[piece.stage];

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
	const originalPiece = BoardSelectors.getPiece(board, pieceId);

	if (!originalPiece) {
		return board;
	}

	const attackerCombatState = combatStore.getPiece(pieceId);
	// create a new piece object, reset combat properties
	const attacker: PieceModel = {
		...originalPiece,
		attacking: null,
		hit: null,
	};

	const attackerPosition = BoardSelectors.getPiecePosition(board, pieceId);

	if (!attackerPosition) {
		return board;
	}

	const attackerTargetId = attackerCombatState.targetId;
	const attackerBoardState = attackerCombatState.board;
	const attackerStats = getStats(attacker);

	// board management

	if (attackerBoardState.removeFromBoardAtTurn === currentTurn) {
		return boardSlice.boardReducer(
			board,
			boardSlice.commands.removeBoardPiecesCommand([pieceId])
		);
	}

	if (attacker.currentHealth === 0) {
		if (attackerBoardState.removeFromBoardAtTurn) {
			return board;
		}

		attackerBoardState.removeFromBoardAtTurn = currentTurn + DYING_DURATION;
		return boardSlice.boardReducer(
			board,
			boardSlice.commands.updateBoardPiecesCommand([attacker])
		);
	}

	const cooldown = getCooldownForSpeed(attackerStats.speed);

	if (attackerBoardState.canMoveAtTurn === null) {
		attackerBoardState.canMoveAtTurn = currentTurn + cooldown;
	}

	if (attackerBoardState.canAttackAtTurn === null) {
		attackerBoardState.canAttackAtTurn = currentTurn + cooldown;
	}

	// combat logic

	if (!attackerTargetId) {
		const targetId = findTargetId(attacker, board);

		if (targetId) {
			combatStore.updatePiecePartial(pieceId, {
				targetId,
			});
		}

		return boardSlice.boardReducer(
			board,
			boardSlice.commands.updateBoardPiecesCommand([attacker])
		);
	}

	const target = BoardSelectors.getPiece(board, attackerTargetId);
	const targetCombat = combatStore.getPiece(attackerTargetId);

	// if we can't attack yet, wait for cooldown
	if (!target || attackerBoardState.canAttackAtTurn > currentTurn) {
		// todo check if attacker has been changed
		return boardSlice.boardReducer(
			board,
			boardSlice.commands.updateBoardPiecesCommand([attacker])
		);
	}

	// if the enemy can't be attacked yet, wait
	// todo consider breaking and choosing different target..
	if (targetCombat.board.canBeAttackedAtTurn > currentTurn) {
		return boardSlice.boardReducer(
			board,
			boardSlice.commands.updateBoardPiecesCommand([attacker])
		);
	}

	const targetPosition = BoardSelectors.getPiecePosition(
		board,
		attackerTargetId
	);
	const targetAlive = target.currentHealth > 0;

	if (!targetAlive || !targetPosition) {
		// target is dead, so clear target
		// todo should we increment canAttackAtTurn here?
		combatStore.updatePiecePartial(pieceId, {
			targetId: null,
		});

		return boardSlice.boardReducer(
			board,
			boardSlice.commands.updateBoardPiecesCommand([attacker])
		);
	}

	const inRange = inAttackRange(
		attackerPosition,
		targetPosition,
		attackerStats.attackType
	);
	if (inRange) {
		// target is in range, so attack
		const damage = getAttackDamage(attacker, target);
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

		combatStore.updatePiecePartial(pieceId, {
			board: {
				...attackerCombatState.board,

				// attack cooldown
				canAttackAtTurn:
					currentTurn +
					ATTACK_TURN_DURATION +
					getCooldownForSpeed(attackerStats.speed),
			},
		});

		const newAttacker = {
			...attacker,
			attacking: {
				attackType: attackerStats.attackType,
				distance: attackerDistance,
				direction: attackerDirection,
				damage,
			},
			facingAway: attackerFacingAway,
		};

		const defender: PieceModel = {
			...target,
			currentHealth: newDefenderHealth,
			hit: {
				direction: getRelativeDirection(targetPosition, attackerPosition),
				damage,
			},
		};

		return boardSlice.boardReducer(
			board,
			boardSlice.commands.updateBoardPiecesCommand([newAttacker, defender])
		);
	} else {
		// target is out of range, so move towards
		if (attackerBoardState.canMoveAtTurn > currentTurn) {
			return boardSlice.boardReducer(
				board,
				boardSlice.commands.updateBoardPiecesCommand([attacker])
			);
		}

		const nextPosition = getNextPiecePosition(
			attackerPosition,
			attackerStats,
			targetPosition,
			board
		);

		if (!nextPosition) {
			return boardSlice.boardReducer(
				board,
				boardSlice.commands.updateBoardPiecesCommand([attacker])
			);
		}

		const attackerDirection = getRelativeDirection(
			attackerPosition,
			targetPosition
		);

		attacker.facingAway = getNewAttackerFacingAway(
			attacker.facingAway,
			attackerDirection
		);

		attackerBoardState.canMoveAtTurn =
			currentTurn +
			MOVE_TURN_DURATION +
			getCooldownForSpeed(attackerStats.speed);
		attackerBoardState.canBeAttackedAtTurn =
			currentTurn + MOVE_TURN_DURATION + 2;
		attackerBoardState.canAttackAtTurn = currentTurn + MOVE_TURN_DURATION + 2;

		return boardSlice.boardReducer(
			boardSlice.boardReducer(
				board,
				boardSlice.commands.moveBoardPieceCommand({
					pieceId,
					from: attackerPosition,
					to: nextPosition,
				})
			),
			boardSlice.commands.updateBoardPiecesCommand([attacker])
		);
	}
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

const getAttackBonus = (attacker: CreatureType, defender: CreatureType) => {
	const isDefenderOvercome = isOvercomeBy(defender, attacker);

	if (isDefenderOvercome) {
		return STRONG_ATTACK_MODIFIER;
	}

	const isDefenderGenerated = isGeneratedBy(defender, attacker);
	const isAttackerOvercome = isOvercomeBy(attacker, defender);

	if (isDefenderGenerated || isAttackerOvercome) {
		return WEAK_ATTACK_MODIFIER;
	}

	return 1;
};

const getAttackDamage = (
	attacker: PieceModel,
	defender: PieceModel
): number => {
	const attackerStats = getStats(attacker);
	const defenderStats = getStats(defender);

	const attackBonus = getAttackBonus(
		attacker.definition.type,
		defender.definition.type
	);
	return (attackerStats.attack / defenderStats.defense) * attackBonus * 8; // todo tweak this
};
