/**
 * Gamemode settings. These are visible to both the server and the client.
 */
export type GamemodeSettings = {
	healthLostPerPiece: number;
	startingMoney: number;
	startingLevel: number;
	rerollCost: number;
	rerollMultiplier: number;
	buyXpCost: number;
	buyXpAmount: number;

	benchSize: number;

	boardWidth: number;
	boardHalfHeight: number;

	/**
	 * The number of turns before a battle ends in a draw.
	 *
	 * Deliberately not exposed to the frontend settings menu.
	 */
	battleTurnCount: number;

	/**
	 * The duration, in milliseconds, of each turn in a battle.
	 */
	battleTurnDuration: number;
};

export const GamemodeSettingsPresets: Record<"default", GamemodeSettings> = {
	default: {
		healthLostPerPiece: 3,
		startingMoney: 3,
		startingLevel: 1,
		rerollCost: 2,
		rerollMultiplier: 100,
		buyXpCost: 5,
		buyXpAmount: 4,
		boardWidth: 7,
		boardHalfHeight: 3,
		benchSize: 9,
		battleTurnCount: 300,
		battleTurnDuration: 100,
	},
};
