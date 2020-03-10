import { Piece } from "../../models";
import { CreatureStats } from "../../models/creatureDefinition";
import { getAttackableEnemy, getNewPiecePosition } from "./movement";
import { getRelativeDirection } from "../../position";
import { INITIAL_COOLDOWN, DAMAGE_RATIO } from "../../constants";
import { isATeamDefeated, getTypeAttackBonus } from "@common/utils";
import { DefinitionProvider } from "../../game/definitionProvider";
import { CreatureType } from "../../models/creatureType";

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

    public simulateTurn(turnCount: number, pieces: Piece[]) {
        const updatedPieces: Piece[] = pieces.map(p => ({ ...p, attacking: null, hit: null, moving: null }));

        updatedPieces.forEach((attacker, index) => {
            if (attacker.currentHealth === 0) {
                return;
            }

            const attackerCombatInfo = this.getPieceCombatInfo(attacker);
            if (attacker.coolDown > 0) {
                attacker.coolDown -= attackerCombatInfo.stats.speed;

                return;
            }

            const defender = getAttackableEnemy(attacker, updatedPieces);

            if (!defender) {
                attacker.targetPieceId = null;
                const newPosition = getNewPiecePosition(attacker, updatedPieces.filter(p => p.currentHealth > 0));

                if (newPosition !== null) {
                    attacker.moving = { direction: getRelativeDirection(attacker.position, newPosition) };
                    attacker.position = newPosition;
                    attacker.coolDown = INITIAL_COOLDOWN;
                }

                return;
            }

            const defenderCombatInfo = this.getPieceCombatInfo(defender);
            const updatedFighters = this.attack(turnCount, attackerCombatInfo, defenderCombatInfo);
            updatedFighters.attacker.targetPieceId = updatedFighters.defender.id;
            updatedPieces[index] = updatedFighters.attacker;
            updatedPieces[updatedPieces.indexOf(defender)] = updatedFighters.defender;
        });

        if (isATeamDefeated(updatedPieces)) {
            updatedPieces.forEach(p => p.celebrating = true);
        }

        return updatedPieces;
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

        const totalDamage = attacker.piece.damagePerTurn * turnCount;

        return {
            attacker: {
                ...attacker.piece,
                coolDown: INITIAL_COOLDOWN,
                attacking: {
                    direction: getRelativeDirection(attacker.piece.position, defender.piece.position),
                    damage
                },
                damagePerTurn: (totalDamage + (damage * DAMAGE_RATIO)) / turnCount,
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
