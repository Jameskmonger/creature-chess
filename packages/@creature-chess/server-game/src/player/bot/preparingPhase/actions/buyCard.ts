import { createUtilityValue, ScoringDirection } from "@shoki/engine";
import { PlayerState, PlayerStateSelectors, PlayerActions, getAllPieces } from "@creature-chess/gamemode";
import { Card, PieceModel, CreatureType } from "@creature-chess/models";
import { BotPersonality } from "@creature-chess/data";
import { BrainAction } from "../../brain";
import { PREFERRED_LOCATIONS } from "../../preferredLocations";

const getAverageCost = (pieces: PieceModel[]): number => (
	pieces.reduce((acc, cur) => acc + cur.definition.cost, 0)
	/ pieces.length
);

const getStrategicTypes = (state: PlayerState) => {
	const allTypes = [
		CreatureType.Earth,
		CreatureType.Fire,
		CreatureType.Metal,
		CreatureType.Water,
		CreatureType.Wood
	];
	const allPieces: PieceModel[] = getAllPieces(state);
	const pieceTypes: { [type: string]: number } = {};
	const strategicTypes = [];
	/* eslint-disable guard-for-in */
	for (const piece in allPieces) {
		const type: CreatureType = allPieces[piece].definition.type;
		if (pieceTypes[type]) {
			pieceTypes[type] = pieceTypes[type] + 1;
		} else {
			pieceTypes[type] = 1;
		}
	}
	for (const type in allTypes) {
		if (!pieceTypes[type]) {
			strategicTypes.push(type);
		}
	}
	const averageNumberOfEachType: number = allPieces.length / Object.keys(pieceTypes).length;

	for (const [type, count] of Object.entries(pieceTypes)) {
		if (Number(count) < averageNumberOfEachType) {
			strategicTypes.push(type);
		}
	}
	return strategicTypes;
};

const shouldBuy = (state: PlayerState, card: Card) => {
	const allPieces = getAllPieces(state);
	const alreadyOwnPiece = allPieces.some(p => p.definitionId === card.definitionId);
	const hasEmptySlot = allPieces.length < (PlayerStateSelectors.getPlayerLevel(state) + 3); // board + 3 bench pieces
	const strategicTypes = getStrategicTypes(state);

	if (alreadyOwnPiece && hasEmptySlot) {
		return true;
	}

	const averageCost = getAverageCost(allPieces);
	const improvesAverageCost = card.cost > averageCost;
	const isStrategicType = () => {
		const type = card.type;
		return strategicTypes.includes(type);
	};
	// only buy card if it is strategically sound.
	return improvesAverageCost && isStrategicType() && hasEmptySlot;
};

export const createBuyCardAction = (
	state: PlayerState,
	personality: BotPersonality,
	index: number,
	card: Card | null
): BrainAction | null => {
	const playerMoney = PlayerStateSelectors.getPlayerMoney(state);

	if (
		card === null
		|| playerMoney < card.cost
		|| shouldBuy(state, card)
	) {
		return null;
	}

	const health = PlayerStateSelectors.getPlayerHealth(state);
	const money = PlayerStateSelectors.getPlayerMoney(state);

	return ({
		name: `buy card [${card.name}]`,
		action: () => PlayerActions.buyCardPlayerAction({
			index,
			sortPositions: PREFERRED_LOCATIONS[card.class]
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
					direction: ScoringDirection.Low
				}
			}
		])
	});
};
