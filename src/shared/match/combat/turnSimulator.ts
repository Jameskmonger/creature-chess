import { Piece } from "../../models";
import { getStats, CreatureStats } from "../../models/creatureDefinition";
import { getAttackableEnemy, getNewPiecePosition } from "./movement";
import { getRelativeDirection } from "../../position";
import { INITIAL_COOLDOWN } from "../../constants";
import { isATeamDefeated } from "../../is-a-team-defeated";
import { getTypeAttackBonus } from "./get-type-attack-bonus";

export class TurnSimulator {
    public simulateTurn(pieces: Piece[]) {
        const updatedPieces: Piece[] = pieces.map(p => ({ ...p, attacking: null, hit: null, moving: null }));

        updatedPieces.forEach((attacker, index) => {
            if (attacker.currentHealth === 0) {
                return;
            }

            const attackerStats = getStats(attacker.definitionId);
            if (attacker.coolDown > 0) {
                attacker.coolDown -= attackerStats.speed;

                return;
            }

            const defender = getAttackableEnemy(attacker, updatedPieces);

            if (!defender) {
                const newPosition = getNewPiecePosition(attacker, updatedPieces.filter(p => p.currentHealth > 0));

                if (newPosition !== null) {
                    attacker.moving = { direction: getRelativeDirection(attacker.position, newPosition) };
                    attacker.position = newPosition;
                    attacker.coolDown = INITIAL_COOLDOWN;
                }

                return;
            }

            const defenderStats = getStats(defender.definitionId);
            const updatedFighters = this.attack(attacker, attackerStats, defender, defenderStats);
            updatedPieces[index] = updatedFighters.attacker;
            updatedPieces[updatedPieces.indexOf(defender)] = updatedFighters.defender;
        });

        if (isATeamDefeated(updatedPieces)) {
            updatedPieces.forEach(p => p.celebrating = true);
        }

        return updatedPieces;
    }

    private attack(attacker: Piece, attackerStats: CreatureStats, defender: Piece, defenderStats: CreatureStats) {
        if (attacker.currentHealth === 0) {
            // Dead Pokémon don't attack
            return { attacker, defender };
        }

        const attackBonus = getTypeAttackBonus(attackerStats.type, defenderStats.type);
        const damage = (attackerStats.attack / defenderStats.defense) * attackBonus * 10;
        const newDefenderHealth = Math.max(defender.currentHealth - damage, 0);

        return {
            attacker: { ...attacker, coolDown: INITIAL_COOLDOWN, attacking: { direction: getRelativeDirection(attacker.position, defender.position), damage } },
            defender: { ...defender, currentHealth: newDefenderHealth, hit: { direction: getRelativeDirection(defender.position, attacker.position), damage } }
        };
    }
}
