import { GameState } from "./game-state";

export const GRID_SIZE = 8;
export const MAX_PLAYER_COUNT = 2;
export const STATE_LENGTHS = {
    [GameState.PREPARING]: 10,
    [GameState.READY]: 3
};
