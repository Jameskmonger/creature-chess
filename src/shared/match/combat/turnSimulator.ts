import { Piece } from "../../models";
import { CreatureStats } from "../../models/creatureDefinition";
import { getAttackableEnemy, getNewPiecePosition } from "./movement";
import { getRelativeDirection } from "../../models/position";
import { INITIAL_COOLDOWN, DAMAGE_RATIO } from "../../models/constants";
import { isATeamDefeated, getTypeAttackBonus } from "@common/utils";
import { DefinitionProvider } from "../../game/definitionProvider";
import { CreatureType } from "../../models/creatureType";
import { BoardState } from "@common/board";

interface PieceCombatInfo {
    piece: Piece;
    stats: CreatureStats;
    type: CreatureType;
}

export class TurnSimulator {
    private definitionProvider: DefinitionProvider;

    constructor(definitionProvider: DefinitionProvider) {
        this.definitionProvider = definitionProvider;
    }

    public simulateTurn(turnCount: number, pieces: { [key: string]: Piece }) {
        const pieceIds = Object.keys(pieces);

        for (const pieceId of pieceIds) {
            // create a new piece object, reset combat properties
            const attacker = {
                ...pieces[pieceId],
                attacking: null,
                hit: null,
                moving: null
            };

            if (attacker.currentHealth === 0) {
                continue;
            }

            const attackerCombatInfo = this.getPieceCombatInfo(attacker);
            if (attacker.coolDown > 0) {
                attacker.coolDown -= attackerCombatInfo.stats.speed;

                pieces[attacker.id] = attacker;

                continue;
            }

            // TODO rework getAttackableEnemy and getNewPiecePosition to take pieces objects
            const updatedPieces = Object.values(pieces);

            const defender = getAttackableEnemy(attacker, updatedPieces);

            if (!defender) {
                attacker.targetPieceId = null;
                const newPosition = getNewPiecePosition(attacker, updatedPieces.filter(p => p.currentHealth > 0));

                if (newPosition !== null) {
                    attacker.moving = { direction: getRelativeDirection(attacker.position, newPosition) };
                    attacker.position = newPosition;
                    attacker.coolDown = INITIAL_COOLDOWN;
                }

                pieces[attacker.id] = attacker;
                continue;
            }

            const defenderCombatInfo = this.getPieceCombatInfo(defender);
            const updatedFighters = this.attack(turnCount, attackerCombatInfo, defenderCombatInfo);
            updatedFighters.attacker.targetPieceId = updatedFighters.defender.id;

            pieces[updatedFighters.attacker.id] = updatedFighters.attacker;
            pieces[updatedFighters.defender.id] = updatedFighters.defender;
        }

        // TODO rework isATeamDefeated to take a pieces object
        if (isATeamDefeated(Object.values(pieces))) {
            for (const pieceId of Object.keys(pieces)) {
                pieces[pieceId].celebrating = true;
            }
        }

        return pieces;
    }

    private getPieceCombatInfo(piece: Piece) {
        const definition = this.definitionProvider.get(piece.definitionId);

        return {
            piece,
            stats: definition.stages[piece.stage],
            type: definition.type
        };
    }

    private attack(turnCount: number, attacker: PieceCombatInfo, defender: PieceCombatInfo) {
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
