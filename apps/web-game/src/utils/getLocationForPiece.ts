import { PlayerPieceLocation } from "@creature-chess/models";
import { Board, packPosition } from "@creature-chess/board";

export const getLocationForPiece = (
	pieceId: string,
	board: Board,
	bench: Board
): PlayerPieceLocation | null => {
	if (board) {
		const boardPiecePosition = board.getPiecePosition(pieceId);

		if (boardPiecePosition) {
			return {
				type: "board",
				location: packPosition(boardPiecePosition[0], boardPiecePosition[1]),
			};
		}
	}

	if (bench) {
		const benchPiecePosition = bench.getPiecePosition(pieceId);

		if (benchPiecePosition) {
			return {
				type: "bench",
				location: packPosition(benchPiecePosition[0], benchPiecePosition[1]),
			};
		}
	}

	return null;
};
