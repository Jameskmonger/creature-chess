import { IndexedPieces } from "@creature-chess/models";

export const getPiecesWithoutIds = (pieces: IndexedPieces, ids: string[]) => {
    const newPieces: IndexedPieces = {
        ...pieces
    };

    for (const pieceId of ids) {
        if (newPieces[pieceId]) {
            delete newPieces[pieceId];
        }
    }

    return newPieces;
};

export const getPiecePositionsWithoutIds = (piecePositions: { [position: string]: string }, ids: string[]) => {
    return Object.entries(piecePositions).reduce<{ [position: string]: string }>(
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
};
