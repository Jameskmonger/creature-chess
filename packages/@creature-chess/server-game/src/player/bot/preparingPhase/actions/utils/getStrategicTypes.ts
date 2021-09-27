import { CreatureType, PieceModel, Card } from "@creature-chess/models";
import { PlayerState, getAllPieces } from "@creature-chess/gamemode";

const getOwnedPieceTypes = (allPieces: PieceModel[]) => {
	const ownedPieceTypes: { [type: string]: number } = {};
	/* eslint-disable guard-for-in */
	for (const piece in allPieces) {
		const type: CreatureType = allPieces[piece].definition.type;
		if (ownedPieceTypes[type]) {
			ownedPieceTypes[type] = ownedPieceTypes[type] + 1;
		} else {
			ownedPieceTypes[type] = 1;
		}
	}
	return ownedPieceTypes;
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
	const ownedPieceTypes = getOwnedPieceTypes(allPieces);
	const strategicTypes = [];
	const averageNumberOfEachType: number = Math.ceil(allPieces.length / allTypes.length);

	for (const type in allTypes) {
		let owned = false;
		let count = 0;
		for (const [ownedType, countX] of Object.entries(ownedPieceTypes)) {
			console.log(type, ownedType);
			if (type == ownedType) { // eslint-disable-line eqeqeq
				console.log("piece type owned already");
				console.log(`owned type: ${ownedType} - - - type:${type}`);
				count = countX;
				owned = true;
			}
		}
		if (owned === false) {
			console.log("Pusing type " + type + "to list");
			strategicTypes.push(type);
		} else if (count < averageNumberOfEachType) {
			strategicTypes.push(type);
		}
	}
	return strategicTypes;
};

export const isStrategicTypeCard = (card: Card, state: PlayerState) => {
	const strategicTypes = getStrategicTypes(state);
	console.log("cards:", strategicTypes);
	const type = card.type;
	return strategicTypes.includes(type);
};

export const isStrategicTypePiece = (piece: PieceModel, state: PlayerState) => {
	const strategicTypes = getStrategicTypes(state);
	console.log("pieces:", strategicTypes);
	const type = piece.definition.type;

	const allPieces = getAllPieces(state);
	const pieceTypes = getOwnedPieceTypes(allPieces);

	if (pieceTypes[type] === 1) {
		return true;
	}
	return strategicTypes.includes(type);
};
