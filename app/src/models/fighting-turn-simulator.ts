import { PokemonPiece } from "./pokemon-piece";
import { attack } from "./attack";
import { getAttackableEnemy, getNewPiecePosition } from "./movement";

export const simulateTurn = (pieces: PokemonPiece[]) => {
    const updatedPieces: PokemonPiece[] = pieces.map(p => ({ ...p, attacking: false, hit: false }));

    updatedPieces.forEach((attacker, index) => {
        const defender = getAttackableEnemy(attacker, updatedPieces);

        if (!defender) {
            const newPosition = getNewPiecePosition(attacker, updatedPieces);

            if (newPosition !== null) {
                updatedPieces[index].position = newPosition;
            }

            return updatedPieces;
        }

        const updatedFighters = attack(attacker, defender);
        updatedPieces[index] = updatedFighters.attacker;
        updatedPieces[updatedPieces.indexOf(defender)] = updatedFighters.defender;
    });

    return updatedPieces;
};
