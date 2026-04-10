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

	/**
	 * Maximum length of the PREPARING phase, in milliseconds.
	 * Phase ends sooner if all players ready up.
	 */
	preparingPhaseLengthMs: number;

	/**
	 * Brief settle delay between PREPARING and READY (matchup calculation), in milliseconds.
	 */
	readyPhaseSettleMs: number;

	/**
	 * Length of the READY phase, in milliseconds.
	 */
	readyPhaseLengthMs: number;

	/**
	 * Maximum length of the PLAYING phase, in milliseconds.
	 * Phase ends sooner if all matches finish.
	 */
	playingPhaseMaxLengthMs: number;

	/**
	 * Post-battle delay before the next phase, in milliseconds.
	 */
	playingPhaseEndDelayMs: number;

	/**
	 * Initial delay before a bot starts taking actions in a phase, in milliseconds.
	 */
	botInitialDelayMs: number;

	/**
	 * Delay between successive bot actions, in milliseconds.
	 */
	botActionDelayMs: number;
};

export const GamemodeSettingsPresets: Record<"default", GamemodeSettings> = {
	default: {
		healthLostPerPiece: 2,
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
		preparingPhaseLengthMs: 60_000,
		readyPhaseSettleMs: 500,
		readyPhaseLengthMs: 6_000,
		playingPhaseMaxLengthMs: 35_000,
		playingPhaseEndDelayMs: 5_000,
		botInitialDelayMs: 1_000,
		botActionDelayMs: 400,
	},
};
