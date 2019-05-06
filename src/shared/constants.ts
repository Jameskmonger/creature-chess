import { GamePhase } from "./game-phase";

export const GRID_SIZE = 8;
export const PHASE_LENGTHS = {
    [GamePhase.PREPARING]: 30,
    [GamePhase.READY]: 5,
    [GamePhase.PLAYING]: 20
};
export const REROLL_COST = 2;
