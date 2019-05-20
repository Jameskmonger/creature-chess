import { attack } from "./attack";
import { getAttackableEnemy, getNewPiecePosition } from "./movement";
import { getStats } from "./models/creatureDefinition";
import { getRelativeDirection } from "./position";
import { isATeamDefeated } from "./is-a-team-defeated";
import { Piece } from "./models";
import { INITIAL_COOLDOWN } from "./constants";

export const simulateTurn = (pieces: Piece[]) => {
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
        const updatedFighters = attack(attacker, attackerStats, defender, defenderStats);
        updatedPieces[index] = updatedFighters.attacker;
        updatedPieces[updatedPieces.indexOf(defender)] = updatedFighters.defender;
    });

    if (isATeamDefeated(updatedPieces)) {
        updatedPieces.forEach(p => p.celebrating = true);
    }

    return updatedPieces;
};
