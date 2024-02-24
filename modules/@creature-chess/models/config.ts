import { GamePhase } from "./src/game-phase";

type PhaseLengths = {
	[GamePhase.PREPARING]: number;
	[GamePhase.READY]: number;
	[GamePhase.PLAYING]: number;
};

export const GAME_PHASE_LENGTHS: PhaseLengths = {
	[GamePhase.PREPARING]: 40,
	[GamePhase.READY]: 3,
	[GamePhase.PLAYING]: 35,
};

export const MAX_LEVEL = 10;
export const MAX_HEALTH = 100;
export const PIECES_TO_EVOLVE = 3;
