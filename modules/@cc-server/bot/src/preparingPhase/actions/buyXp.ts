import { createUtilityValue, ScoringDirection } from "@shoki/engine";

import {
	PlayerActions,
	PlayerState,
	PlayerStateSelectors,
} from "@creature-chess/gamemode";
import { getXpToNextLevel } from "@creature-chess/gamemode/src/player/xp";
import { MAX_LEVEL } from "@creature-chess/models/config";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "../../brain";
import { Board } from "@creature-chess/board";

// Highest XP-to-next-level cost in the curve. Used as the upper end of the
// "xp remaining" range so the input normalises sensibly.
// todo move this to GamemodeSettings
const MAX_XP_TO_NEXT_LEVEL = 40;

export const createBuyXpAction = (
	bench: Board,
	state: PlayerState,
	personality: BotPersonality,
	settings: GamemodeSettings
): BrainAction | null => {
	const level = PlayerStateSelectors.getPlayerLevel(state);
	const money = PlayerStateSelectors.getPlayerMoney(state);

	// Legality only: must be able to afford and not maxed out.
	if (level >= MAX_LEVEL || money < settings.buyXpCost) {
		return null;
	}

	const health = PlayerStateSelectors.getPlayerHealth(state);
	const xp = PlayerStateSelectors.getPlayerXp(state);
	const xpToNextLevel = Math.max(1, getXpToNextLevel(level) - xp);
	const round = state.roundInfo.round;
	const benchPieceCount = bench.getAllPieces().length;

	return {
		name: "buy xp",
		action: PlayerActions.buyXpPlayerAction,
		value: createUtilityValue([
			{
				// Lots of money → ambition spends.
				value: money,
				range: [1, 50],
				direction: ScoringDirection.High,
				weighting: {
					value: personality.ambition,
					direction: ScoringDirection.High,
				},
			},
			{
				// Low health → composure-low (panickers) burn XP for a board slot.
				value: health,
				range: [1, 100],
				direction: ScoringDirection.Low,
				weighting: {
					value: personality.composure,
					direction: ScoringDirection.Low,
				},
			},
			{
				// Close to leveling → ambition values the immediate payoff.
				// Lower xpToNextLevel = higher utility, weighted by ambition High.
				value: xpToNextLevel,
				range: [1, MAX_XP_TO_NEXT_LEVEL],
				direction: ScoringDirection.Low,
				weighting: {
					value: personality.ambition,
					direction: ScoringDirection.High,
				},
			},
			{
				// High vision → values leveling more in the mid/late game (where
				// the upgraded board slot opens room for synergy comps).
				value: round,
				range: [1, 30],
				direction: ScoringDirection.High,
				weighting: {
					value: personality.vision,
					direction: ScoringDirection.High,
				},
			},
			{
				// High composure → only levels when the bench has upgrades waiting
				// (low-composure bots level recklessly into an empty bench).
				value: benchPieceCount,
				range: [0, 9],
				direction: ScoringDirection.High,
				weighting: {
					value: personality.composure,
					direction: ScoringDirection.High,
				},
			},
		]),
	};
};
