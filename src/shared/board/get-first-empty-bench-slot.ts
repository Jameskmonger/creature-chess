import { PieceModel } from "../models";

export const getFirstEmptyBenchSlot = (bench: PieceModel[]) => {
    return bench.findIndex(p => p === null);
};
