import { GamePhase } from "./game-phase";

export const GRID_SIZE = 8;
export const PHASE_LENGTHS = {
    [GamePhase.PREPARING]: 30,
    [GamePhase.READY]: 5,
    [GamePhase.PLAYING]: 30
};
export const REROLL_COST = 2;

export const BUY_XP_COST = 5;
export const BUY_XP_AMOUNT = 4;

export const TURN_DURATION_MS = 50;
export const TURNS_IN_BATTLE = Math.floor((PHASE_LENGTHS[GamePhase.PLAYING] * 1000) / TURN_DURATION_MS);

export const INITIAL_COOLDOWN = 1000;
export const CELEBRATION_TIME = 3000;

export const PIECES_TO_EVOLVE = 3;
