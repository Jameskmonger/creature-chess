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
	boardSize: {
		width: number;
		/**
		 * THIS MUST BE AN EVEN NUMBER
		 */
		height: number;
	};

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
	boardSize: {
		width: 7,
		height: 6, // THIS MUST BE AN EVEN NUMBER
	},

	game: {
		maxLevel: 10,
		maxHealth: 100,
		piecesToEvolve: 3,
	},
};
