import { PieceModel } from "@creature-chess/models";

export const getFirstEmptyBenchSlot = (bench: PieceModel[]) => {
    return bench.findIndex(p => p === null);
};
