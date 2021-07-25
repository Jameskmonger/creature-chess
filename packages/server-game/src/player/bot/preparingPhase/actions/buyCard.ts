import { PlayerState, PlayerStateSelectors, PlayerActions, getAllPieces } from "@creature-chess/gamemode";
import { Card, PieceModel } from "@creature-chess/models";
import { BrainAction, BrainActionValue } from "../../brain";
import { PREFERRED_LOCATIONS } from "../../preferredLocations";

const getAverageCost = (pieces: PieceModel[]): number => (
	pieces.reduce((acc, cur) => acc + cur.definition.cost, 0)
	/ pieces.length
);

const getValue = (state: PlayerState, card: Card): BrainActionValue => {
	const allPieces = getAllPieces(state);
	const alreadyOwnPiece = allPieces.some(p => p.definitionId === card.definitionId);

	if (alreadyOwnPiece) {
		return BrainActionValue.EXTREMELY_HIGH_VALUE;
	}

	const averageCost = getAverageCost(allPieces);
	const improvesAverageCost = card.cost > averageCost;

	if (improvesAverageCost) {
		return BrainActionValue.HIGH_VALUE;
	}

	const hasEmptySlot = allPieces.length < PlayerStateSelectors.getPlayerLevel(state);

	if (hasEmptySlot) {
		return BrainActionValue.MEDIUM_VALUE;
	}

	return BrainActionValue.USELESS;
};

export const createBuyCardAction = (state: PlayerState, index: number, card: Card | null): BrainAction | null => {
	const playerMoney = PlayerStateSelectors.getPlayerMoney(state);

	if (card === null || playerMoney < card.cost) {
		return null;
	}

	return ({
		name: `buy card [${card.name}]`,
		action: () => PlayerActions.buyCardPlayerAction({
			index,
			sortPositions: PREFERRED_LOCATIONS[card.class]
		}),
		value: getValue(state, card)
	});
};
