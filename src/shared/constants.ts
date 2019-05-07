import { GamePhase } from "./game-phase";

export const GRID_SIZE = 8;
export const PHASE_LENGTHS = {
    [GamePhase.PREPARING]: 30,
    [GamePhase.READY]: 5,
    [GamePhase.PLAYING]: 30
};
export const REROLL_COST = 2;

export const TURN_DURATION_MS = 50;
export const TURNS_IN_BATTLE = Math.floor((PHASE_LENGTHS[GamePhase.PLAYING] * 1000) / TURN_DURATION_MS);
