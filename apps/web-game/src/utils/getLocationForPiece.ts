import { PlayerPieceLocation } from "@creature-chess/models";
import { Board } from "@creature-chess/board";

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
				location: { x: boardPiecePosition[0], y: boardPiecePosition[1] },
			};
		}
	}

	if (bench) {
		const benchPiecePosition = bench.getPiecePosition(pieceId);

		if (benchPiecePosition) {
			return {
				type: "bench",
				location: { x: benchPiecePosition[0], y: benchPiecePosition[1] },
			};
		}
	}

	return null;
};
