import { createUtilityValue, ScoringDirection } from "@shoki/engine";

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
		value: createUtilityValue([
			{
				// High-ambition bots prefer expensive cards.
				value: card.cost,
				range: [1, 5],
				direction: ScoringDirection.High,
				weighting: {
					value: personality.ambition,
					direction: ScoringDirection.High,
				},
			},
			{
				// High-vision bots heavily prefer 3-of-a-kind completion.
				value: completionProximity,
				range: [0, 2],
				direction: ScoringDirection.High,
				weighting: {
					value: personality.vision,
					direction: ScoringDirection.High,
				},
			},
			{
				// High-vision bots prefer cards that match existing traits.
				value: traitSynergyCount,
				range: [0, 3],
				direction: ScoringDirection.High,
				weighting: {
					value: personality.vision,
					direction: ScoringDirection.High,
				},
			},
			{
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
				// Low-composure bots panic-buy board fillers at low HP.
				value: health,
				range: [1, 100],
				direction: ScoringDirection.Low,
				weighting: {
					value: personality.composure,
					direction: ScoringDirection.Low,
				},
			},
		]),
	};
};
