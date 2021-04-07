import { CreatureType, PieceModel, getRelativeDirection, TileCoordinates, Directions, getDistance } from "@creature-chess/models";
import { BoardState, boardReducer, BoardCommands } from "../../../board";
import { getStats } from "../../../utils/piece-utils";
import { isOvercomeBy, isGeneratedBy } from "../../../utils/get-type-attack-bonus";
import { inAttackRange } from "./utils/inAttackRange";
import { findTargetId } from "./utils/findTargetId";
import { getNextPiecePosition } from "./pathfinding";

const DYING_DURATION = 10;
const ATTACK_TURN_DURATION = 2;
const MOVE_TURN_DURATION = 2;

// todo tune this
const getCooldownForSpeed = (speed: number) => (180 - speed) / 24;

const STRONG_ATTACK_MODIFIER = 1.7;
const WEAK_ATTACK_MODIFIER = 0.3;

export const simulateTurn = (currentTurn: number, board: BoardState) => {
    const pieceEntries = Object.entries(board.pieces);

    pieceEntries.sort(([, aPiece], [, bPiece]) => {
        const aStats = getStats(aPiece);
        const bStats = getStats(bPiece);

        return bStats.speed - aStats.speed;
    });

    return pieceEntries.reduce<BoardState>(
        (b, [pieceId]) => takePieceTurn(currentTurn, pieceId, b),
        board
    );
};

const takePieceTurn = (currentTurn: number, pieceId: string, board: BoardState): BoardState => {
    // create a new piece object, reset combat properties
    const attacker: PieceModel = {
        ...board.pieces[pieceId],
        attacking: null,
        hit: null,
        combat: {
            ...board.pieces[pieceId].combat,
            board: {
                ...board.pieces[pieceId].combat.board
            }
        }
    };

    const attackerTargetId = attacker.combat.targetId;
    const attackerBoardState = attacker.combat.board;
    const attackerStats = getStats(attacker);

    // board management

    if (attackerBoardState.removeFromBoardAtTurn === currentTurn) {
        return boardReducer(board, BoardCommands.removeBoardPiecesCommand([pieceId]));
    }

    if (attacker.currentHealth === 0) {
        if (attackerBoardState.removeFromBoardAtTurn) {
            return board;
        }

        attackerBoardState.removeFromBoardAtTurn = currentTurn + DYING_DURATION;
        return boardReducer(board, BoardCommands.updateBoardPiecesCommand([attacker]));
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
        attacker.combat.targetId = findTargetId(attacker, board);

        return boardReducer(board, BoardCommands.updateBoardPiecesCommand([attacker]));
    }

    const target = board.pieces[attackerTargetId];

    // if we can't attack yet, wait for cooldown
    if (attackerBoardState.canAttackAtTurn > currentTurn) {
        // todo check if attacker has been changed
        return boardReducer(board, BoardCommands.updateBoardPiecesCommand([attacker]));
    }

    // if the enemy can't be attacked yet, wait
    // todo consider breaking and choosing different target..
    if (target.combat.board.canBeAttackedAtTurn > currentTurn) {
        return boardReducer(board, BoardCommands.updateBoardPiecesCommand([attacker]));
    }

    const inRange = inAttackRange(attacker, target, attackerStats.attackType);
    const targetAlive = target.currentHealth > 0;

    if (!targetAlive) {
        // target is dead, so clear target
        // todo should we increment canAttackAtTurn here?
        attacker.combat.targetId = null;

        return boardReducer(board, BoardCommands.updateBoardPiecesCommand([attacker]));
    } else if (inRange) {
        // target is in range, so attack
        const damage = getAttackDamage(attacker, target);
        const newDefenderHealth = Math.max(target.currentHealth - damage, 0);

        const attackerDirection = getRelativeDirection(attacker.position, target.position);
        const attackerDistance = getDistance(attacker.position, target.position);
        const attackerFacingAway = getNewAttackerFacingAway(attacker.facingAway, attackerDirection);

        const newAttacker = {
            ...attacker,
            combat: {
                ...attacker.combat,
                board: {
                    ...attacker.combat.board,

                    // attack cooldown
                    canAttackAtTurn: currentTurn + ATTACK_TURN_DURATION + getCooldownForSpeed(attackerStats.speed)
                }
            },
            attacking: {
                attackType: attackerStats.attackType,
                distance: attackerDistance,
                direction: attackerDirection,
                damage
            },
            facingAway: attackerFacingAway
        };

        const defender: PieceModel = {
            ...target,
            currentHealth: newDefenderHealth,
            hit: {
                direction: getRelativeDirection(target.position, attacker.position),
                damage
            }
        }

        return boardReducer(board, BoardCommands.updateBoardPiecesCommand([newAttacker, defender]));
    } else {
        // target is out of range, so move towards
        if (attackerBoardState.canMoveAtTurn > currentTurn) {
            return boardReducer(board, BoardCommands.updateBoardPiecesCommand([attacker]));
        }

        // todo make getNextPiecePosition take range into account
        const nextPosition = getNextPiecePosition(attacker, attackerStats, target, board);

        if (!nextPosition) {
            return boardReducer(board, BoardCommands.updateBoardPiecesCommand([attacker]));
        }

        const attackerDirection = getRelativeDirection(attacker.position, target.position);

        attacker.position = nextPosition;
        attacker.facingAway = getNewAttackerFacingAway(attacker.facingAway, attackerDirection);

        attackerBoardState.canMoveAtTurn = currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(attackerStats.speed);
        attackerBoardState.canBeAttackedAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
        attackerBoardState.canAttackAtTurn = currentTurn + MOVE_TURN_DURATION + 2;

        return boardReducer(board, BoardCommands.updateBoardPiecesCommand([attacker]));
    }
};

const getNewAttackerFacingAway = (oldFacingAway: boolean, direction: TileCoordinates) => {
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

const getAttackDamage = (attacker: PieceModel, defender: PieceModel): number => {
    const attackerStats = getStats(attacker);
    const defenderStats = getStats(defender);

    const attackBonus = getAttackBonus(attacker.definition.type, defender.definition.type);
    return (attackerStats.attack / defenderStats.defense) * attackBonus * 8; // todo tweak this
};
