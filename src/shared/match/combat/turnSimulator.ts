import { PieceModel } from "../../models";
import { getAttackableEnemy, getNewPiecePosition } from "./movement";
import { getRelativeDirection } from "../../models/position";
import { getTypeAttackBonus } from "@common/utils";
import { BoardState, boardReducer } from "@common/board";
import { updateBoardPiece, updateBoardPieces, removeBoardPiece } from "@common/board/actions/boardActions";
import { getStats } from "@common/utils/piece-utils";

const DYING_DURATION = 10;
const ATTACK_TURN_DURATION = 2;
const MOVE_TURN_DURATION = 2;

// todo tune this
const getCooldownForSpeed = (speed: number) => (180 - speed) / 24;

export class TurnSimulator {
    public simulateTurn(currentTurn: number, board: BoardState) {
        const pieceIds = Object.keys(board.pieces);

        for (const pieceId of pieceIds) {
            board = this.takePieceTurn(currentTurn, pieceId, board);
        }

        return board;
    }

    private takePieceTurn(currentTurn: number, pieceId: string, board: BoardState): BoardState {
        // create a new piece object, reset combat properties
        const attacker = {
            ...board.pieces[pieceId],
            attacking: null,
            hit: null,
        };

        const attackerStats = getStats(attacker);

        if (attacker.battleBrain.removeFromBoardAtTurn === currentTurn) {
            return boardReducer(board, removeBoardPiece(pieceId));
        }

        if (attacker.currentHealth === 0) {
            if (attacker.battleBrain.removeFromBoardAtTurn) {
                return board;
            }

            attacker.battleBrain.removeFromBoardAtTurn = currentTurn + DYING_DURATION;
            return boardReducer(board, updateBoardPiece(attacker));
        }
;
        const cooldown = getCooldownForSpeed(attackerStats.speed);

        if (attacker.battleBrain.canMoveAtTurn === null) {
            attacker.battleBrain.canMoveAtTurn = currentTurn + cooldown;
        }

        if (attacker.battleBrain.canAttackAtTurn === null) {
            attacker.battleBrain.canAttackAtTurn = currentTurn + cooldown;
        }

        // try to find an enemy in attack range
        const attackableEnemy = getAttackableEnemy(attacker, attackerStats.attackType, board);
        if (attackableEnemy) {
            // if there's an enemy in range but we can't attack it yet, just wait for cooldown
            if (attacker.battleBrain.canAttackAtTurn > currentTurn) {
                // todo check if attacker has been changed
                return boardReducer(board, updateBoardPiece(attacker));
            }

            // if the enemy can't be attacked yet, wait
            if (attackableEnemy.battleBrain.canBeAttackedAtTurn > currentTurn) {
                return boardReducer(board, updateBoardPiece(attacker));
            }

            const attackResult = this.attack(attacker, attackableEnemy);

            // if no attack result, no need to update defender
            if (attackResult == null) {
                return boardReducer(board, updateBoardPiece(attacker));
            }

            attackResult.attacker.targetPieceId = attackResult.defender.id;

            attacker.battleBrain.canAttackAtTurn = currentTurn + ATTACK_TURN_DURATION + getCooldownForSpeed(attackerStats.speed);

            return boardReducer(board, updateBoardPieces([attackResult.attacker, attackResult.defender]));
        }

        // clear target if they're no longer in attack range
        attacker.targetPieceId = null;

        if (attacker.battleBrain.canMoveAtTurn > currentTurn) {
            return boardReducer(board, updateBoardPiece(attacker));
        }

        const newPosition = getNewPiecePosition(attacker, board);

        if (newPosition === null) {
            return boardReducer(board, updateBoardPiece(attacker));
        }

        attacker.position = newPosition;

        attacker.battleBrain.canMoveAtTurn = currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(attackerStats.speed);
        attacker.battleBrain.canBeAttackedAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
        attacker.battleBrain.canAttackAtTurn = currentTurn + MOVE_TURN_DURATION + 2;

        return boardReducer(board, updateBoardPiece(attacker));
    }

    private attack(attacker: PieceModel, defender: PieceModel) {
        if (attacker.currentHealth === 0) {
            return null;
        }

        const attackerStats = getStats(attacker);
        const defenderStats = getStats(defender);

        const attackBonus = getTypeAttackBonus(attacker.definition.type, defender.definition.type);
        const damage = (attackerStats.attack / defenderStats.defense) * attackBonus * 8; // todo tweak this
        const newDefenderHealth = Math.max(defender.currentHealth - damage, 0);

        return {
            attacker: {
                ...attacker,
                attacking: {
                    attackType: attackerStats.attackType,
                    direction: getRelativeDirection(attacker.position, defender.position),
                    damage
                },
                targetPieceId: defender.id
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
