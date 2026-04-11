import { createUtilityValue, ScoringDirection } from "@shoki/engine";

import { Board } from "@creature-chess/board";
import {
	PlayerActions,
	PlayerState,
	PlayerStateSelectors,
} from "@creature-chess/gamemode";
import { getXpToNextLevel } from "@creature-chess/gamemode";
import { MAX_LEVEL } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "../../brain";

// Highest XP-to-next-level cost in the curve. Used as the upper end of the
// "xp remaining" range so the input normalises sensibly.
// todo move this to GamemodeSettings
const MAX_XP_TO_NEXT_LEVEL = 40;

// Next-turn interest payout. Matches the rule in `matchRewards.ts`.
const getInterest = (money: number) => Math.min(Math.floor(money / 10), 5);

export const createBuyXpAction = (
	bench: Board,
	state: PlayerState,
	personality: BotPersonality,
	settings: GamemodeSettings
): BrainAction | null => {
	const level = PlayerStateSelectors.getPlayerLevel(state);
	const money = PlayerStateSelectors.getPlayerMoney(state);

	// Legality: must be able to afford and not maxed out.
	if (level >= MAX_LEVEL || money < settings.buyXpCost) {
		return null;
	}

	const health = PlayerStateSelectors.getPlayerHealth(state);
	const xp = PlayerStateSelectors.getPlayerXp(state);
	const xpToNextLevel = Math.max(1, getXpToNextLevel(level) - xp);
	const round = state.roundInfo.round;
	const benchPieceCount = bench.getAllPieces().length;

	// Escape hatch: crossing the bracket is fine if this buy closes out a
	// level. Matches the human "dip to 40g for something good" impulse.
	const wouldLevelUp = settings.buyXpAmount >= xpToNextLevel;
	const wouldLoseInterest =
		getInterest(money - settings.buyXpCost) < getInterest(money);
	const interestPreserved = wouldLoseInterest && !wouldLevelUp ? 0 : 1;

	// Vision-scaled importance: noobs (low vision) barely feel the
	// penalty, strategists (high vision) let it flip their decision.
	const interestPreservationImportance = 6 * (personality.vision / 200);

	const score = createUtilityValue([
		{
			name: "money",
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
			name: "interestBracketPreserved",
			// Vision driver: strategists avoid burning an interest tier.
			value: interestPreserved,
			range: [0, 1],
			direction: ScoringDirection.High,
			importance: interestPreservationImportance,
		},
		{
			name: "health",
			// Low health → composure-low (panickers) burn XP for a board slot.
			// Sigmoid midpoint 0.3: panic pivots sharply around 30% HP. The
			// ≈30.7% offset (range [1,100] → 30/99 ≈ 0.293) is intentional.
			curve: { type: "sigmoid", midpoint: 0.3 },
			value: health,
			range: [1, 100],
			direction: ScoringDirection.Low,
			weighting: {
				value: personality.composure,
				direction: ScoringDirection.Low,
			},
		},
		{
			name: "xpToNextLevel",
			// Close to leveling → ambition values the immediate payoff.
			// Lower xpToNextLevel = higher utility, weighted by ambition High.
			// Dominant signal: "is this XP purchase actually about to level me?"
			importance: 3,
			value: xpToNextLevel,
			range: [1, MAX_XP_TO_NEXT_LEVEL],
			direction: ScoringDirection.Low,
			weighting: {
				value: personality.ambition,
				direction: ScoringDirection.High,
			},
		},
		{
			name: "round",
			// High vision → values leveling more in the mid/late game (where
			// the upgraded board slot opens room for synergy comps).
			// Dominant signal: timing in the game arc.
			importance: 3,
			value: round,
			range: [1, 30],
			direction: ScoringDirection.High,
			weighting: {
				value: personality.vision,
				direction: ScoringDirection.High,
			},
		},
		{
			name: "benchPieceCount",
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
	]);

	return {
		name: "buy xp",
		action: PlayerActions.buyXpPlayerAction,
		value: score.value,
		breakdown: score.inputs,
	};
};
