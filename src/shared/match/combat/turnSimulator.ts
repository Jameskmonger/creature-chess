import { PieceModel } from "../../models";
import { CreatureStats } from "../../models/creatureDefinition";
import { getAttackableEnemy, getNewPiecePosition } from "./movement";
import { getRelativeDirection } from "../../models/position";
import { getTypeAttackBonus } from "@common/utils";
import { DefinitionProvider } from "../../game/definitionProvider";
import { CreatureType } from "../../models/creatureType";
import { BoardState, boardReducer } from "@common/board";
import { updateBoardPiece, updateBoardPieces, removeBoardPiece } from "@common/board/actions/boardActions";

interface PieceCombatInfo {
    piece: PieceModel;
    stats: CreatureStats;
    type: CreatureType;
}

const DYING_DURATION = 10;
const ATTACK_TURN_DURATION = 2;
const MOVE_TURN_DURATION = 2;

// todo tune this
const getCooldownForSpeed = (speed: number) => (180 - speed) / 24;

export class TurnSimulator {
    private definitionProvider: DefinitionProvider;

    constructor(definitionProvider: DefinitionProvider) {
        this.definitionProvider = definitionProvider;
    }

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

        const attackerCombatInfo = this.getPieceCombatInfo(attacker);
        const cooldown = getCooldownForSpeed(attackerCombatInfo.stats.speed);

        if (attacker.battleBrain.canMoveAtTurn === null) {
            attacker.battleBrain.canMoveAtTurn = currentTurn + cooldown;
        }

        if (attacker.battleBrain.canAttackAtTurn === null) {
            attacker.battleBrain.canAttackAtTurn = currentTurn + cooldown;
        }

        // try to find an enemy in attack range
        const attackableEnemy = getAttackableEnemy(attacker, attackerCombatInfo.stats.attackType, board);
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

            const defenderCombatInfo = this.getPieceCombatInfo(attackableEnemy);

            const updatedFighters = this.attack(attackerCombatInfo, defenderCombatInfo);
            updatedFighters.attacker.targetPieceId = updatedFighters.defender.id;

            attacker.battleBrain.canAttackAtTurn = currentTurn + ATTACK_TURN_DURATION + getCooldownForSpeed(attackerCombatInfo.stats.speed);

            return boardReducer(board, updateBoardPieces([updatedFighters.attacker, updatedFighters.defender]));
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

        attacker.battleBrain.canMoveAtTurn = currentTurn + MOVE_TURN_DURATION + getCooldownForSpeed(attackerCombatInfo.stats.speed);
        attacker.battleBrain.canBeAttackedAtTurn = currentTurn + MOVE_TURN_DURATION + 2;
        attacker.battleBrain.canAttackAtTurn = currentTurn + MOVE_TURN_DURATION + 2;

        return boardReducer(board, updateBoardPiece(attacker));
    }

    private getPieceCombatInfo(piece: PieceModel) {
        const definition = this.definitionProvider.get(piece.definitionId);

        return {
            piece,
            stats: definition.stages[piece.stage],
            type: definition.type
        };
    }

    private attack(attacker: PieceCombatInfo, defender: PieceCombatInfo) {
        if (attacker.piece.currentHealth === 0) {
            return {
                attacker: attacker.piece,
                defender: defender.piece
            };
        }

        const attackBonus = getTypeAttackBonus(attacker.type, defender.type);
        const damage = (attacker.stats.attack / defender.stats.defense) * attackBonus * 8; // todo tweak this
        const newDefenderHealth = Math.max(defender.piece.currentHealth - damage, 0);

        return {
            attacker: {
                ...attacker.piece,
                attacking: {
                    attackType: attacker.stats.attackType,
                    direction: getRelativeDirection(attacker.piece.position, defender.piece.position),
                    damage
                },
                targetPieceId: defender.piece.id
            },
            defender: {
                ...defender.piece,
                currentHealth: newDefenderHealth,
                hit: {
                    direction: getRelativeDirection(defender.piece.position, attacker.piece.position),
                    damage
                }
            }
        };
    }
}
