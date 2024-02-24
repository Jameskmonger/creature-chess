/**
 * Gamemode settings. These are visible to both the server and the client.
 */
export type GamemodeSettings = {
	healthLostPerPiece: number;
	startingMoney: number;
	startingLevel: number;
	rerollCost: number;
};

export const GamemodeSettingsPresets: Record<string, GamemodeSettings> = {
	default: {
		healthLostPerPiece: 3,
		startingMoney: 3,
		startingLevel: 1,
		rerollCost: 2,
	},
};
