import { PieceModel } from "../../models";
import { CreatureStats } from "../../models/creatureDefinition";
import { getAttackableEnemy, getNewPiecePosition } from "./movement";
import { getRelativeDirection } from "../../models/position";
import { INITIAL_COOLDOWN } from "../../models/constants";
import { isATeamDefeated, getTypeAttackBonus } from "@common/utils";
import { DefinitionProvider } from "../../game/definitionProvider";
import { CreatureType } from "../../models/creatureType";
import { BoardState, boardReducer } from "@common/board";
import { updateBoardPiece, updateBoardPieces } from "@common/board/actions/boardActions";

interface PieceCombatInfo {
    piece: PieceModel;
    stats: CreatureStats;
    type: CreatureType;
}

export class TurnSimulator {
    private definitionProvider: DefinitionProvider;

    constructor(definitionProvider: DefinitionProvider) {
        this.definitionProvider = definitionProvider;
    }

    public simulateTurn(turnCount: number, board: BoardState) {
        const pieceIds = Object.keys(board.pieces);

        for (const pieceId of pieceIds) {
            // create a new piece object, reset combat properties
            const attacker = {
                ...board.pieces[pieceId],
                attacking: null,
                hit: null,
            };

            if (attacker.currentHealth === 0) {
                continue;
            }

            const attackerCombatInfo = this.getPieceCombatInfo(attacker);
            if (attacker.coolDown > 0) {
                attacker.coolDown -= attackerCombatInfo.stats.speed;

                board = boardReducer(board, updateBoardPiece(attacker));

                continue;
            }

            const defender = getAttackableEnemy(attacker, attackerCombatInfo.stats.attackType, board);

            if (!defender) {
                attacker.targetPieceId = null;
                const newPosition = getNewPiecePosition(attacker, board);

                if (newPosition !== null) {
                    attacker.position = newPosition;

                    // todo change this to be a "readyTurn" or something numeric so that we
                    // aren't updating the creature every turn. e.g. is "readyTurn" is 50 we can just skip over this
                    // creature until turn 50 rather than actually doing anything
                    attacker.coolDown = INITIAL_COOLDOWN;

                    board = boardReducer(board, updateBoardPiece(attacker));
                }

                continue;
            }

            const defenderCombatInfo = this.getPieceCombatInfo(defender);

            const updatedFighters = this.attack(attackerCombatInfo, defenderCombatInfo);
            updatedFighters.attacker.targetPieceId = updatedFighters.defender.id;

            board = boardReducer(board, updateBoardPieces([ updatedFighters.attacker, updatedFighters.defender ]));
        }

        if (isATeamDefeated(board)) {
            const newPieces = Object.values(board.pieces).map(piece => ({ ...piece, celebrating: true }));

            board = boardReducer(board, updateBoardPieces(newPieces));
        }

        return board;
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
            // Dead Pokémon don't attack
            return {
                attacker: attacker.piece,
                defender: defender.piece
            };
        }

        const attackBonus = getTypeAttackBonus(attacker.type, defender.type);
        const damage = (attacker.stats.attack / defender.stats.defense) * attackBonus * 10;
        const newDefenderHealth = Math.max(defender.piece.currentHealth - damage, 0);

        return {
            attacker: {
                ...attacker.piece,
                coolDown: INITIAL_COOLDOWN,
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
