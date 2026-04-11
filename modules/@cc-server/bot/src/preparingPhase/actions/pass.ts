import { createUtilityValue, ScoringDirection } from "@shoki/engine";

import {
	PlayerState,
	PlayerStateSelectors,
} from "@creature-chess/gamemode";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "../../brain";
import { Board } from "@creature-chess/board";

// Sentinel name the loop checks against to terminate the prep phase.
export const PASS_ACTION_NAME = "pass";

// The "do nothing" action. Its utility represents the value of saving the
// turn and collecting interest next round. When this is the highest-scored
// action, the bot stops acting for the phase.
//
// HARD GATE: pass is only legal if the player owns enough pieces (board +
// bench) to fill the board to their level. Without this, a bot would happily
// pass on round 1 with an empty board, every battle would be a 0-0 draw, no
// one would lose HP, and the game would run forever.
//
// `putBenchOnBoard` runs after every bot action, so any owned pieces beyond
// the board count are auto-promoted to the board. Owning at least `level`
// total pieces is sufficient for the board to be populated.
//
// - High vision values econ (more money → more next-turn interest).
// - Low ambition prefers passing (hoarders default to inaction).
// - High health → not desperate, fine to pass; low-composure panickers won't.
export const createPassAction = (
	board: Board,
	bench: Board,
	state: PlayerState,
	personality: BotPersonality
): BrainAction | null => {
	const playerLevel = PlayerStateSelectors.getPlayerLevel(state);
	const totalPieceCount =
		board.getAllPieces().length + bench.getAllPieces().length;

	// Legality: don't pass while the player still has board slots to fill.
	if (totalPieceCount < playerLevel) {
		return null;
	}

	const money = PlayerStateSelectors.getPlayerMoney(state);
	const health = PlayerStateSelectors.getPlayerHealth(state);

	// Next-turn interest = floor(money / 10), capped at 5.
	const expectedInterest = Math.min(Math.floor(money / 10), 5);

	const score = createUtilityValue([
		{
			name: "expectedInterest",
			// Vision driver: pass gets more attractive the more interest
			// you'd earn next turn.
			value: expectedInterest,
			range: [0, 5],
			direction: ScoringDirection.High,
			weighting: {
				value: personality.vision,
				direction: ScoringDirection.High,
			},
		},
		{
			name: "hoarderBias",
			// Ambition driver: low-ambition bots prefer to do nothing
			// (hoarder archetype). Use a constant input weighted by ambition
			// Low so the contribution is large for low-ambition bots.
			value: 200,
			range: [0, 200],
			direction: ScoringDirection.High,
			weighting: {
				value: personality.ambition,
				direction: ScoringDirection.Low,
			},
		},
		{
			name: "health",
			// Composure driver: healthy bots are willing to pass; panicked
			// (low-composure) low-HP bots will not.
			value: health,
			range: [1, 100],
			direction: ScoringDirection.High,
			weighting: {
				value: personality.composure,
				direction: ScoringDirection.High,
			},
		},
	]);

	return {
		name: PASS_ACTION_NAME,
		// No-op dispatch — the loop terminates before this is ever called.
		action: () => ({ type: "@@bot/pass" }),
		value: score.value,
		breakdown: score.inputs,
	};
};
