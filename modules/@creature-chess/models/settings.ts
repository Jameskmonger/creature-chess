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
	 * Time to wait after a battle finishes before emitting the battle outcome and moving
	 * on to the next phase, in milliseconds.
	 *
	 * This is mainly to give the frontend time to play out any final animations.
	 */
	postBattleSettleMs: number;

	/**
	 * Time to wait after a match finished before moving to the next round.
	 *
	 * Some battles go right up to the end, so it's nice to have a
	 * delay rather than jumping straight into the next phase.
	 */
	postMatchSettleMs: number;

	/**
	 * Initial delay before a bot starts taking actions in a phase, in milliseconds.
	 */
	botInitialDelayMs: number;

	/**
	 * Delay between successive bot actions, in milliseconds.
	 */
	botActionDelayMs: number;

	/**
	 * Initial settle delay at the very start of a game, before the game loop
	 * begins. Gives the registered socket observers time to attach before
	 * any dispatches.
	 */
	gameStartSettleMs: number;

	/**
	 * Softmax (Boltzmann) temperature for bot action selection, on the `[0, 1]`
	 * utility scale.
	 *
	 * - `0` -> deterministic top-1 (always pick the highest-scored legal
	 * action; ties break by insertion order, same as pre-Stage-6 behaviour).
	 * - Small positive (e.g. `0.025`–`0.05`) -> weighted-random pick where the
	 * top-scored action is most likely but close-runner-ups occasionally win.
	 * Breaks ties properly and stops identically-personalitied bots from
	 * making identical decisions across games.
	 * - Larger values wash the personality signal out of the correlation
	 * analysis and are rarely what you want in a game.
	 */
	botSelectionTemperature: number;
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
		postBattleSettleMs: 1_000,
		postMatchSettleMs: 500,
		botInitialDelayMs: 1_000,
		botActionDelayMs: 400,
		gameStartSettleMs: 100,
		botSelectionTemperature: 0.025,
	},
};
