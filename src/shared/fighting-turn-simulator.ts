import { BoardPokemonPiece, initialCoolDown } from "./pokemon-piece";
import { attack } from "./attack";
import { getAttackableEnemy, getNewPiecePosition } from "./movement";
import { getPokemonStats } from "./pokemon-details";
import { getRelativeDirection } from "./position";

export const simulateTurn = (pieces: BoardPokemonPiece[]) => {
    const updatedPieces: BoardPokemonPiece[] = pieces.map(p => ({ ...p, attacking: null, hit: null, moving: null }));

    updatedPieces.forEach((attacker, index) => {
        if (attacker.currentHealth === 0) {
            return;
        }

        const attackerStats = getPokemonStats(attacker.pokemonId);
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
                attacker.coolDown = initialCoolDown;
            }

            return;
        }

        const defenderStats = getPokemonStats(defender.pokemonId);
        const updatedFighters = attack(attacker, attackerStats, defender, defenderStats);
        updatedPieces[index] = updatedFighters.attacker;
        updatedPieces[updatedPieces.indexOf(defender)] = updatedFighters.defender;
    });

    return updatedPieces;
};
