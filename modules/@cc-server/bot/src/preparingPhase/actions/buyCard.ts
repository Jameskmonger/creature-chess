import { createUtilityValue, ScoringDirection } from "@shoki/engine";

import {
	PlayerState,
	PlayerStateSelectors,
	PlayerActions,
	getAllPieces,
} from "@creature-chess/gamemode";
import { Card, PieceModel } from "@creature-chess/models";

import { BotPersonality } from "@cc-server/data";

import { BrainAction } from "../../brain";
import { PREFERRED_LOCATIONS } from "../../preferredLocations";
import { isStrategicCard } from "./utils/creatureType";

const getAverageCost = (pieces: PieceModel[]): number =>
	pieces.reduce((acc, cur) => acc + cur.definition.cost, 0) / pieces.length;

const getBenchUsageForHealth = (health: number) => {
	if (health <= 30) {
		return 8;
	}

	if (health <= 50) {
		return 6;
	}

	if (health <= 70) {
		return 4;
	}

	return 3;
};

const shouldBuy = (state: PlayerState, card: Card) => {
	const allPieces = getAllPieces(state);
	const alreadyOwnPiece = allPieces.some(
		(p) => p.definitionId === card.definitionId
	);

	if (alreadyOwnPiece) {
		return true;
	}

	// bots will use more of their bench if they are low on health
	const health = PlayerStateSelectors.getPlayerHealth(state);
	const benchUsage = getBenchUsageForHealth(health);

	const hasEmptySlot =
		allPieces.length < PlayerStateSelectors.getPlayerLevel(state) + benchUsage;

	if (!hasEmptySlot) {
		return false;
	}

	const averageCost = getAverageCost(allPieces) || 0;
	const improvesAverageCost = card.cost > averageCost;

	// only buy card if it is strategically sound.
	return improvesAverageCost || isStrategicCard(card, allPieces);
};

export const createBuyCardAction = (
	state: PlayerState,
	personality: BotPersonality,
	index: number,
	card: Card | null
): BrainAction | null => {
	const money = PlayerStateSelectors.getPlayerMoney(state);

	if (card === null || money < card.cost || !shouldBuy(state, card)) {
		return null;
	}

	const health = PlayerStateSelectors.getPlayerHealth(state);

	return {
		name: `buy card [${card.name}]`,
		action: () =>
			PlayerActions.buyCardPlayerAction({
				index,
				sortPositions: PREFERRED_LOCATIONS[card.class],
			}),
		value: createUtilityValue([
			{
				value: health,
				range: [1, 100],

				// utility score should be higher if health is low
				direction: ScoringDirection.Low,

				// more important with low composure
				weighting: {
					value: personality.composure,
					direction: ScoringDirection.Low,
				},
			},
		]),
	};
};
