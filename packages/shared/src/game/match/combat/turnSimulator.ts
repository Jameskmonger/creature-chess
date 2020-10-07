import { CreatureType, PieceModel, getRelativeDirection, TileCoordinates, Directions, getDistance } from "@creature-chess/models";
import { BoardState, boardReducer, BoardActions } from "../../../board";
import { getStats } from "../../../utils/piece-utils";
import { isOvercomeBy, isGeneratedBy } from "../../../utils/get-type-attack-bonus";
import { getAttackableEnemyFromCurrentPosition, getNewPiecePosition } from "./movement";

const DYING_DURATION = 10;
const ATTACK_TURN_DURATION = 2;
const MOVE_TURN_DURATION = 2;

// todo tune this
const getCooldownForSpeed = (speed: number) => (180 - speed) / 24;

const STRONG_ATTACK_MODIFIER = 1.7;
const WEAK_ATTACK_MODIFIER = 0.3;

export class TurnSimulator {
    public simulateTurn(currentTurn: number, board: BoardState) {
        const pieceEntries = Object.entries(board.pieces);

        pieceEntries.sort(([, aPiece], [, bPiece]) => {
            const aStats = getStats(aPiece);
            const bStats = getStats(bPiece);

            return bStats.speed - aStats.speed;
        });

        pieceEntries.forEach(([pieceId]) => {
            board = this.takePieceTurn(currentTurn, pieceId, board);
        });

        return board;
    }

    private takePieceTurn(currentTurn: number, pieceId: string, board: BoardState): BoardState {
        // create a new piece object, reset combat properties
        const attacker: PieceModel = {
            ...board.pieces[pieceId],
            attacking: null,
            hit: null,
        };

        const attackerStats = getStats(attacker);

        if (attacker.battleBrain.removeFromBoardAtTurn === currentTurn) {
            return boardReducer(board, BoardActions.removeBoardPiece(pieceId));
        }

        if (attacker.currentHealth === 0) {
            if (attacker.battleBrain.removeFromBoardAtTurn) {
                return board;
            }

            attacker.battleBrain.removeFromBoardAtTurn = currentTurn + DYING_DURATION;
            return boardReducer(board, BoardActions.updateBoardPiece(attacker));
        }

        const cooldown = getCooldownForSpeed(attackerStats.speed);

        if (attacker.battleBrain.canMoveAtTurn === null) {
            attacker.battleBrain.canMoveAtTurn = currentTurn + cooldown;
        }

        if (attacker.battleBrain.canAttackAtTurn === null) {
            attacker.battleBrain.canAttackAtTurn = currentTurn + cooldown;
        }

        // try to find an enemy in attack range
        const attackableEnemy = getAttackableEnemyFromCurrentPosition(attacker, attackerStats.attackType, board);
        if (attackableEnemy) {
            // if there's an enemy in range but we can't attack it yet, just wait for cooldown
            if (attacker.battleBrain.canAttackAtTurn > currentTurn) {
                // todo check if attacker has been changed
                return boardReducer(board, BoardActions.updateBoardPiece(attacker));
            }

            // if the enemy can't be attacked yet, wait
            if (attackableEnemy.battleBrain.canBeAttackedAtTurn > currentTurn) {
                return boardReducer(board, BoardActions.updateBoardPiece(attacker));
            }

            const attackResult = this.attack(attacker, attackableEnemy);

            // if no attack result, no need to update defender
            if (attackResult == null) {
                return boardReducer(board, BoardActions.updateBoardPiece(attacker));
            }

            attackResult.attacker.targetPieceId = attackResult.defender.id;

            attacker.battleBrain.canAttackAtTurn = currentTurn + ATTACK_TURN_DURATION + getCooldownForSpeed(attackerStats.speed);

            return boardReducer(board, BoardActions.updateBoardPieces([attackResult.attacker, attackResult.defender]));
        }

        // clear target if they're no longer in attack range
        attacker.targetPieceId = null;

        if (attacker.battleBrain.canMoveAtTurn > currentTurn) {
            return boardReducer(board, BoardActions.updateBoardPiece(attacker));
        }

        const newPosition = getNewPiecePosition(attacker, board);

        if (newPosition === null || newPosition.nextPosition === null) {
            return boardReducer(board, BoardActions.updateBoardPiece(attacker));
        }

        const { nextPosition, targetPosition } = newPosition;

        const attackerDirection = getRelativeDirection(attacker.position, targetPosition);

        attacker.position = nextPosition;
        attacker.facingAway = this.getNewAttackerFacingAway(attacker.facingAway, attackerDirection);

        attacker.battleBrain.canMoveAtTurn = currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(attackerStats.speed);
        attacker.battleBrain.canBeAttackedAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
        attacker.battleBrain.canAttackAtTurn = currentTurn + MOVE_TURN_DURATION + 2;

        return boardReducer(board, BoardActions.updateBoardPiece(attacker));
    }

    private getNewAttackerFacingAway(oldFacingAway: boolean, direction: TileCoordinates) {
        if (direction === Directions.LEFT || direction === Directions.RIGHT) {
            // if it's left or right we don't need to change it
            return oldFacingAway;
        }

        if (direction === Directions.UP) {
            return true;
        }

        return false;
    }

    private getAttackBonus(attacker: CreatureType, defender: CreatureType) {
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
    }

    private attack(attacker: PieceModel, defender: PieceModel): { attacker: PieceModel, defender: PieceModel } {
        if (attacker.currentHealth === 0) {
            return null;
        }

        const attackerStats = getStats(attacker);
        const defenderStats = getStats(defender);

        const attackBonus = this.getAttackBonus(attacker.definition.type, defender.definition.type);
        const damage = (attackerStats.attack / defenderStats.defense) * attackBonus * 8; // todo tweak this
        const newDefenderHealth = Math.max(defender.currentHealth - damage, 0);

        const attackerDirection = getRelativeDirection(attacker.position, defender.position);

        return {
            attacker: {
                ...attacker,
                attacking: {
                    attackType: attackerStats.attackType,
                    distance: getDistance(attacker.position, defender.position),
                    direction: attackerDirection,
                    damage
                },
                targetPieceId: defender.id,
                facingAway: this.getNewAttackerFacingAway(attacker.facingAway, attackerDirection)
            },
            defender: {
                ...defender,
                currentHealth: newDefenderHealth,
                hit: {
                    direction: getRelativeDirection(defender.position, attacker.position),
                    damage
                }
            }
        };
    }
}
