import { PokemonPiece } from './pokemon-piece';
import { sample, cloneDeep } from "lodash";
import { attack } from './attack';

export const simulateTurn = (pieces: PokemonPiece[]) => {
    const updatedPieces = cloneDeep(pieces);
    updatedPieces.forEach((attacker, index) => {
        const defender = sample(updatedPieces.filter(p => p.friendly !== attacker.friendly && p.currentHealth > 0));
        if (!defender) {
            return updatedPieces;
        }
        
        const updatedFighters = attack(attacker, defender);
        updatedPieces[index] = updatedFighters.attacker;
        updatedPieces[updatedPieces.indexOf(defender)] = updatedFighters.defender;
    });
    return updatedPieces;
}
