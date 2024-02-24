import { GamePhase } from "./src/game-phase";

type PhaseLengths = {
	[GamePhase.PREPARING]: number;
	[GamePhase.READY]: number;
	[GamePhase.PLAYING]: number;
};

/**
 * DEPRECATED
 *
 * This is the configuration for the game.
 *
 * It should be split into "visible" and "hidden" settings.
 */
export interface GameOptions {
	game: {
		maxLevel: number;
		maxHealth: number;
		piecesToEvolve: number;
	};
}

export const GAME_PHASE_LENGTHS: PhaseLengths = {
	[GamePhase.PREPARING]: 40,
	[GamePhase.READY]: 3,
	[GamePhase.PLAYING]: 35,
};

export const DEFAULT_GAME_OPTIONS: GameOptions = {
	game: {
		maxLevel: 10,
		maxHealth: 100,
		piecesToEvolve: 3,
	},
};
