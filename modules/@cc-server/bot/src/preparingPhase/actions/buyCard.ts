import {
	createUtilityValue,
	ScoringDirection,
	UtilityInput,
} from "@shoki/engine";

import {
	PlayerState,
	PlayerStateSelectors,
	PlayerActions,
} from "@creature-chess/gamemode";
import { Card } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "../../brain";
import { PREFERRED_LOCATIONS } from "../../preferredLocations";
import {
	collectAllPieces,
	getCompletionProximity,
	getTraitSynergyCount,
} from "./utils/cardScoring";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

export const createBuyCardAction = (
	board: Board,
	bench: Board,
	pieceRegistry: PieceRegistry,
	state: PlayerState,
	personality: BotPersonality,
	settings: GamemodeSettings,
	index: number,
	card: Card | null
): BrainAction | null => {
	if (card === null) {
		return null;
	}

	const money = PlayerStateSelectors.getPlayerMoney(state);
	if (money < card.cost) {
		return null;
	}

	// Hard legality gate: there must be somewhere for the piece to land.
	const allPieces = collectAllPieces(board, bench, pieceRegistry);
	const maxPossiblePieces =
		PlayerStateSelectors.getPlayerLevel(state) + settings.benchSize;
	if (allPieces.length >= maxPossiblePieces) {
		return null;
	}

	const health = PlayerStateSelectors.getPlayerHealth(state);
	const completionProximity = getCompletionProximity(allPieces, card);
	const traitSynergyCount = getTraitSynergyCount(allPieces, card);
	const moneyRemaining = money - card.cost;

	const scoreInputs: UtilityInput[] = [
		{
			name: "card.cost",
			// High-ambition bots prefer expensive cards. Quadratic: a 5-cost
			// card is much more than 5× as attractive as a 1-cost filler.
			curve: { type: "quadratic" },
			value: card.cost,
			range: [1, 5],
			direction: ScoringDirection.High,
			weighting: {
				value: personality.ambition,
				direction: ScoringDirection.High,
			},
		},
		{
			name: "completionProximity",
			// Completing a 3-of-a-kind is the single biggest win a buy can
			// deliver, so it should dominate the rest of the signals.
			// Quadratic: owning 2 is much more than 2× as valuable as owning 1,
			// because the third copy unlocks the stage-1 upgrade.
			curve: { type: "quadratic" },
			importance: 3,
			value: completionProximity,
			range: [0, 2],
			direction: ScoringDirection.High,
			weighting: {
				value: personality.vision,
				direction: ScoringDirection.High,
			},
		},
		{
			name: "traitSynergyCount",
			// Trait synergy is the second-biggest structural win.
			importance: 3,
			value: traitSynergyCount,
			range: [0, 3],
			direction: ScoringDirection.High,
			weighting: {
				value: personality.vision,
				direction: ScoringDirection.High,
			},
		},
		{
			name: "moneyRemaining",
			// Low-ambition bots avoid emptying their wallet.
			value: moneyRemaining,
			range: [0, 30],
			direction: ScoringDirection.High,
			weighting: {
				value: personality.ambition,
				direction: ScoringDirection.Low,
			},
		},
		{
			name: "health",
			// Low-composure bots panic-buy board fillers at low HP. Sigmoid
			// at midpoint 0.3: panic activates sharply around 30% HP. Note:
			// `range: [1, 100]` means `health = 30` normalises to ≈ 0.293, so
			// midpoint 0.3 corresponds to health ≈ 30.7. This is intentional —
			// don't "correct" it to 29/99.
			curve: { type: "sigmoid", midpoint: 0.3 },
			value: health,
			range: [1, 100],
			direction: ScoringDirection.Low,
			weighting: {
				value: personality.composure,
				direction: ScoringDirection.Low,
			},
		},
	];

	// Seed action: when the bot owns nothing, `completionProximity` and
	// `traitSynergyCount` are structurally 0 (nothing to complete, no traits
	// to synergise with), which — combined with their `importance: 3` each —
	// drags every buy card's score to essentially zero. That makes every
	// first-piece buy indistinguishable from a useless action and gets them
	// filtered by the soft-termination threshold, leaving bots in a
	// reroll-and-quit loop that never fills the board.
	//
	// Adding a dominant "get your first piece on the board NOW" input with
	// `importance: 5` makes empty-board buys score ~0.36–0.4 across the
	// whole shop, which is comfortably above any meaningful threshold and
	// comparable to a reroll for most personalities. Once the bot owns at
	// least one piece this input is omitted entirely, so it has zero effect
	// on normal-play scoring (no denominator dilution).
	if (allPieces.length === 0) {
		scoreInputs.push({
			name: "emptyBoardSeedBonus",
			value: 1,
			range: [0, 1],
			direction: ScoringDirection.High,
			importance: 5,
		});
	}

	const score = createUtilityValue(scoreInputs);

	return {
		name: `buy card [${card.name}]`,
		action: () =>
			PlayerActions.buyCardPlayerAction({
				index,
				sortPositions:
					PREFERRED_LOCATIONS[
						card.traits[1] as "valiant" | "arcane" | "cunning"
					],
			}),
		value: score.value,
		breakdown: score.inputs,
	};
};
