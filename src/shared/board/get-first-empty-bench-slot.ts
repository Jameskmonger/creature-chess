import { GRID_SIZE } from "../constants";
import { Piece } from "../models";

export const getFirstEmptyBenchSlot = (bench: Piece[]) => {
    for (let slot = 0; slot < GRID_SIZE; slot++) {
        const piece = bench.some(p => p.position.x === slot);

        if (!piece) {
            return slot;
        }
    }

    return null;
};
