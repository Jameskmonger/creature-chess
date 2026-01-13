import { all, takeEvery } from "typed-redux-saga";
import { getPlayerEntityDependencies } from "../dependencies";
import { addBenchPieceCommand, addBoardPieceCommand, clearBenchCommand, clearBoardCommand, moveBenchPieceCommand, moveBoardPieceCommand, removeBenchPieceCommand, removeBenchPiecesCommand, removeBoardPieceCommand, removeBoardPiecesCommand, swapBenchPiecesCommand, swapBoardPiecesCommand } from "../state/board";
import { unpackX, unpackY } from "@creature-chess/board";

/**
 * This saga applies the effects of board application commands.
 *
 * Created to support migration away from board state being in Redux store.
 */
export function* boardApplySaga() {
	const {
		logger,
		boards: { board, bench },
	} = yield* getPlayerEntityDependencies();


	yield all([
		// === board
		takeEvery(
			addBoardPieceCommand,
			function*({ payload: { pieceId, position } }) {
				board.setPiece(pieceId, unpackX(position), unpackY(position));
			}
		),

		takeEvery(
			removeBoardPieceCommand,
			function*({ payload: { pieceId } }) {
				board.removePiece(pieceId);
			}
		),

		takeEvery(
			removeBoardPiecesCommand,
			function*({ payload: { pieceIds } }) {
				for (const pieceId of pieceIds) {
					board.removePiece(pieceId);
				}
			}
		),

		takeEvery(
			swapBoardPiecesCommand,
			function*({ payload: { pieceIdA, pieceIdB } }) {
				board.swapPieces(pieceIdA, pieceIdB);
			}
		),

		takeEvery(
			moveBoardPieceCommand,
			function*({ payload: { pieceId, from, to } }) {
				const existingPosition = board.getPiecePosition(pieceId);

				if (
					!existingPosition ||
					existingPosition[0] !== unpackX(from) ||
					existingPosition[1] !== unpackY(from)
				) {
					// piece not at expected position
					return;
				}

				board.setPiece(pieceId, unpackX(to), unpackY(to));
			}
		),

		takeEvery(
			clearBoardCommand,
			function*() {
				board.clear();
			}
		),

		// === bench

		takeEvery(
			addBenchPieceCommand,
			function*({ payload: { pieceId, position } }) {
				bench.setPiece(pieceId, position.x, 0);
			}
		),

		takeEvery(
			removeBenchPieceCommand,
			function*({ payload: { pieceId } }) {
				bench.removePiece(pieceId);
			}
		),

		takeEvery(
			removeBenchPiecesCommand,
			function*({ payload: { pieceIds } }) {
				for (const pieceId of pieceIds) {
					bench.removePiece(pieceId);
				}
			}
		),

		takeEvery(
			swapBenchPiecesCommand,
			function*({ payload: { pieceIdA, pieceIdB } }) {
				bench.swapPieces(pieceIdA, pieceIdB);
			}
		),

		takeEvery(
			moveBenchPieceCommand,
			function*({ payload: { pieceId, from, to } }) {
				const existingPosition = bench.getPiecePosition(pieceId);

				if (
					!existingPosition ||
					existingPosition[0] !== from.x
				) {
					// piece not at expected position
					return;
				}

				bench.setPiece(pieceId, to.x, 0);
			}
		),

		takeEvery(
			clearBenchCommand,
			function*() {
				bench.clear();
			}
		),
	]);
}
