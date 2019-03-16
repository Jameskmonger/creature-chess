import { PokemonPiece } from "./pokemon-piece";
import { attack } from "./attack";
import { getAttackableEnemy } from "./movement";

export const simulateTurn = (pieces: PokemonPiece[]) => {
    const updatedPieces: PokemonPiece[] = pieces.map(p => ({ ...p, attacking: null, hit: null }));
    updatedPieces.forEach((attacker, index) => {
        const defender = getAttackableEnemy(attacker, updatedPieces);

        if (!defender) {
            return updatedPieces;
        }

        const updatedFighters = attack(attacker, defender);
        updatedPieces[index] = updatedFighters.attacker;
        updatedPieces[updatedPieces.indexOf(defender)] = updatedFighters.defender;
    });
    return updatedPieces;
};
