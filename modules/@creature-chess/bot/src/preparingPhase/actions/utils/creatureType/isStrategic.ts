import { PieceModel, Card } from "@creature-chess/models";

import { getOwnedPieceTypes } from "./getOwnedTypes";
import { getStrategicTypes } from "./getStrategicTypes";

export const isStrategicCard = ({ type }: Card, allPieces: PieceModel[]) =>
	getStrategicTypes(allPieces).includes(type);

export const isStrategicPiece = (
	{ definition: { type } }: PieceModel,
	allPieces: PieceModel[]
) => {
	const strategicTypes = getStrategicTypes(allPieces);
	const pieceTypes = getOwnedPieceTypes(allPieces);

	return pieceTypes[type] === 1 || strategicTypes.includes(type);
};
