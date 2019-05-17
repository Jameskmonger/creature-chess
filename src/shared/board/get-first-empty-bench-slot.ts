import { PokemonPiece } from "../pokemon-piece";
import { GRID_SIZE } from "../constants";

export const getFirstEmptyBenchSlot = (bench: PokemonPiece[]) => {
    for (let slot = 0; slot < GRID_SIZE; slot++) {
        const piece = bench.some(p => p.position.x === slot);

        if (!piece) {
            return slot;
        }
    }

    return null;
};
