import { GameState } from "./game-state";

export const GRID_SIZE = 8;
export const STATE_LENGTHS = {
    [GameState.PREPARING]: 30,
    [GameState.READY]: 5
};
export const REROLL_COST = 2;
