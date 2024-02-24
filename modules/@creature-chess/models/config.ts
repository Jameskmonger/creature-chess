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

	benchSize: number;

	game: {
		phaseLengths: PhaseLengths;
		maxLevel: number;
		maxHealth: number;
		piecesToEvolve: number;
	};

	battle: {
		turnCount: number;
		turnDuration: number;
	};
}

export const DEFAULT_GAME_OPTIONS: GameOptions = {
	boardSize: {
		width: 7,
		height: 6, // THIS MUST BE AN EVEN NUMBER
	},
	benchSize: 9,

	game: {
		phaseLengths: {
			[GamePhase.PREPARING]: 40,
			[GamePhase.READY]: 3,
			[GamePhase.PLAYING]: 35,
		},
		maxLevel: 10,
		maxHealth: 100,
		piecesToEvolve: 3,
	},

	battle: {
		turnCount: 300,
		turnDuration: 100,
	},
};
