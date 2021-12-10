import { PiecesState } from "../types";

export const getPiecesWithoutIds = <TPiece>(pieces: PiecesState<TPiece>, ids: string[]) => {
	const newPieces: PiecesState<TPiece> = {
		...pieces
	};

	for (const pieceId of ids) {
		if (newPieces[pieceId]) {
			delete newPieces[pieceId];
		}
	}

	return newPieces;
};

export const getPiecePositionsWithoutIds = (
	piecePositions: { [position: string]: string },
	ids: string[]
) => Object.entries(piecePositions).reduce<{ [position: string]: string }>(
	(newPiecePositions, [position, pieceId]) => {
		// skip the desired piece
		if (!pieceId || ids.includes(pieceId)) {
			return newPiecePositions;
		}

		newPiecePositions[position] = pieceId;
		return newPiecePositions;
	},
	{}
);
