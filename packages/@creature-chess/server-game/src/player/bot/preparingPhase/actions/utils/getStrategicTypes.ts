import { CreatureType, PieceModel, Card } from "@creature-chess/models";
import { PlayerState, getAllPieces } from "@creature-chess/gamemode";

const getOwnedPieceTypes = (allPieces: PieceModel[]) => {
	const pieceTypes: { [type: string]: number } = {};
	/* eslint-disable guard-for-in */
	for (const ownedPiece in allPieces) {
		const ownedType: CreatureType = allPieces[ownedPiece].definition.type;
		if (pieceTypes[ownedType]) {
			pieceTypes[ownedType] = pieceTypes[ownedType] + 1;
		} else {
			pieceTypes[ownedType] = 1;
		}
	}
	return pieceTypes;
};

const getStrategicTypes = (state: PlayerState) => {
	const allTypes = [
		CreatureType.Earth,
		CreatureType.Fire,
		CreatureType.Metal,
		CreatureType.Water,
		CreatureType.Wood
	];
	const allPieces: PieceModel[] = getAllPieces(state);
	const pieceTypes = getOwnedPieceTypes(allPieces);
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

export const isStrategicTypeCard = (card: Card, state: PlayerState) => {
	const strategicTypes = getStrategicTypes(state);
	const type = card.type;
	return strategicTypes.includes(type);
};

export const isStrategicTypePiece = (piece: PieceModel, state: PlayerState) => {
	const strategicTypes = getStrategicTypes(state);
	const type = piece.definition.type;

	const allPieces = getAllPieces(state);
	const pieceTypes = getOwnedPieceTypes(allPieces);

	if (pieceTypes[type] === 1) {
		return true;
	}
	return strategicTypes.includes(type);
};
