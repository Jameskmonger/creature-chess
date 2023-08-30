import { GamePhase } from "./src/game-phase";

type PhaseLengths = {
	[GamePhase.PREPARING]: number;
	[GamePhase.READY]: number;
	[GamePhase.PLAYING]: number;
};

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
		startingMoney: number;
		startingLevel: number;
		maxLevel: number;
		maxHealth: number;
		healthLostPerPiece: number;
		rerollCost: number;
		buyXpCost: number;
		buyXpAmount: number;
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
		startingMoney: 3,
		startingLevel: 1,
		maxLevel: 10,
		maxHealth: 100,
		healthLostPerPiece: 3,
		rerollCost: 2,
		buyXpCost: 5,
		buyXpAmount: 4,
	},

	battle: {
		turnCount: 300,
		turnDuration: 100,
	}
};
