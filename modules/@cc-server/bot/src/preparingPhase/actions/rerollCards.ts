import { createUtilityValue, ScoringDirection } from "@shoki/engine";

import { Board } from "@creature-chess/board";
import {
	PlayerActions,
	PlayerState,
	PlayerStateSelectors,
} from "@creature-chess/gamemode";
import { GamemodeSettings } from "@creature-chess/models";
import { PieceRegistry } from "@creature-chess/utils";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "../../brain";
import { collectAllPieces, isCardWanted } from "./utils/cardScoring";

export const createRerollCardsAction = (
	board: Board,
	bench: Board,
	pieceRegistry: PieceRegistry,
	state: PlayerState,
	personality: BotPersonality,
	settings: GamemodeSettings
): BrainAction | null => {
	const money = PlayerStateSelectors.getPlayerMoney(state);

	// Legality only.
	if (money < settings.rerollCost) {
		return null;
	}

	const health = PlayerStateSelectors.getPlayerHealth(state);
	const cards = PlayerStateSelectors.getPlayerCards(state);

	// Does the shop have ANY card the bot wants? Reroll should only win when
	// the answer is no. Previously this was `wantedCardCount` with a linear
	// Low-direction mapping over [0, 5], which meant 1-2 wanted cards still
	// scored the reroll at ~0.8 — dominating a 0.37 buy-card and sending bots
	// into reroll loops. Reroll when there's nothing worth buying, not when
	// there are *few* things worth buying.
	const allPieces = collectAllPieces(board, bench, pieceRegistry);
	const hasAnyWantedCard = cards.some(
		(c) => c !== null && isCardWanted(allPieces, c)
	);

	const moneyRemaining = money - settings.rerollCost;

	const score = createUtilityValue([
		{
			name: "shopHasNothingWanted",
			// Vision driver: dominant binary "is the shop worth keeping?" signal.
			// `1` only when NO card in the shop is wanted; otherwise `0`. With
			// a linear Low-direction mapping over [0, 1], that's exactly what
			// we want — reroll fires only when there's nothing worth buying.
			importance: 3,
			value: hasAnyWantedCard ? 1 : 0,
			range: [0, 1],
			direction: ScoringDirection.Low,
			weighting: {
				value: personality.vision,
				direction: ScoringDirection.High,
			},
		},
		{
			name: "health",
			// Composure driver: low health → panickers reroll. Sigmoid
			// midpoint 0.3: panic pivots sharply around 30% HP. The ≈30.7%
			// offset (range [1,100] → 30/99 ≈ 0.293) is intentional.
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
			name: "moneyRemaining",
			// Ambition driver: more spare gold → burner rerolls aggressively.
			value: moneyRemaining,
			range: [0, 50],
			direction: ScoringDirection.High,
			weighting: {
				value: personality.ambition,
				direction: ScoringDirection.High,
			},
		},
		{
			name: "money",
			// Soft anti-reroll: low-ambition bots care about preserving gold;
			// when they have lots, the dampening pulls reroll utility down.
			value: money,
			range: [1, 50],
			direction: ScoringDirection.Low,
			weighting: {
				value: personality.ambition,
				direction: ScoringDirection.Low,
			},
		},
	]);

	return {
		name: "reroll cards",
		action: PlayerActions.rerollCardsPlayerAction,
		value: score.value,
		breakdown: score.inputs,
	};
};
