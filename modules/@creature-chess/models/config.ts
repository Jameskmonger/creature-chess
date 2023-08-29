export interface GameOptions {
	boardSize: {
		width: number;
		height: number;
	};

	benchSize: number;
}

export const DEFAULT_GAME_OPTIONS: GameOptions = {
	boardSize: {
		width: 7,
		height: 6, // THIS MUST BE AN EVEN NUMBER
	},
	benchSize: 9
};
