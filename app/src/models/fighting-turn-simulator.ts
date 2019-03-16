import { PokemonPiece, initialCoolDown } from "./pokemon-piece";
import { attack } from "./attack";
import { getAttackableEnemy, getNewPiecePosition } from "./movement";
import { getPokemonStats } from "./get-pokemon-stats";

export const simulateTurn = (pieces: PokemonPiece[]) => {
    const updatedPieces: PokemonPiece[] = pieces.map(p => ({ ...p, attacking: null, hit: null }));

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
        const defenderStats = getPokemonStats(attacker.pokemonId);

        if (!defender) {
            const newPosition = getNewPiecePosition(attacker, updatedPieces.filter(p => p.currentHealth > 0));

            if (newPosition !== null) {
                attacker.position = newPosition;
                attacker.coolDown = initialCoolDown;
            }

            return;
        }

        const updatedFighters = attack(attacker, attackerStats, defender, defenderStats);
        updatedPieces[index] = updatedFighters.attacker;
        updatedPieces[updatedPieces.indexOf(defender)] = updatedFighters.defender;
    });

    return updatedPieces;
};
