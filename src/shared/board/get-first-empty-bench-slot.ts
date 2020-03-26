import { GRID_SIZE } from "../models/constants";
import { Piece } from "../models";

export const getFirstEmptyBenchSlot = (bench: Piece[]) => {
    return bench.findIndex(p => p === null);
};
