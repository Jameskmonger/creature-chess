import { GamePhase } from "./game-phase";

export const GRID_SIZE = 8;
export const STATE_LENGTHS = {
    [GamePhase.PREPARING]: 30,
    [GamePhase.READY]: 5
};
export const REROLL_COST = 2;
