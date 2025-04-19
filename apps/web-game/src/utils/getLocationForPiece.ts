import { BoardState, BoardSelectors } from "@shoki/board";

import { PlayerPieceLocation } from "@creature-chess/models";

export const getLocationForPiece = (
	pieceId: string,
	board: BoardState,
	bench: BoardState
): PlayerPieceLocation | null => {
	if (board) {
		const boardPiecePosition = BoardSelectors.getPiecePosition(board, pieceId);

		if (boardPiecePosition) {
			return {
				type: "board",
				location: boardPiecePosition,
			};
		}
	}

	if (bench) {
		const benchPiecePosition = BoardSelectors.getPiecePosition(bench, pieceId);

		if (benchPiecePosition) {
			return {
				type: "bench",
				location: benchPiecePosition,
			};
		}
	}

	return null;
};
