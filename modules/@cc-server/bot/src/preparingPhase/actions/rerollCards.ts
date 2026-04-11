import { createUtilityValue, ScoringDirection } from "@shoki/engine";

import {
	PlayerActions,
	PlayerState,
	PlayerStateSelectors,
} from "@creature-chess/gamemode";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "../../brain";
import { collectAllPieces, isCardWanted } from "./utils/cardScoring";
import { Board } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

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

	// Count cards in the shop the bot would actually want. Lower count = worse
	// shop = more reason to reroll. High-vision bots care most about this.
	const allPieces = collectAllPieces(board, bench, pieceRegistry);
	const wantedCardCount = cards.filter(
		(c) => c !== null && isCardWanted(allPieces, c)
	).length;

	const moneyRemaining = money - settings.rerollCost;

	return {
		name: "reroll cards",
		action: PlayerActions.rerollCardsPlayerAction,
		value: createUtilityValue([
			{
				// Vision driver: bad shop = high reroll utility. Dominant
				// signal — reroll should be primarily about "is the shop bad?",
				// not secondary econ/panic factors.
				importance: 3,
				value: wantedCardCount,
				range: [0, 5],
				direction: ScoringDirection.Low,
				weighting: {
					value: personality.vision,
					direction: ScoringDirection.High,
				},
			},
			{
				// Composure driver: low health → panickers reroll.
				value: health,
				range: [1, 100],
				direction: ScoringDirection.Low,
				weighting: {
					value: personality.composure,
					direction: ScoringDirection.Low,
				},
			},
			{
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
		]),
	};
};
