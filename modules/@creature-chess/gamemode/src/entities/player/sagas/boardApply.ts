import { takeEvery } from "typed-redux-saga";
import { getPlayerEntityDependencies } from "../dependencies";
import { addBenchPieceCommand, addBoardPieceCommand, clearBenchCommand, clearBoardCommand, moveBenchPieceCommand, moveBoardPieceCommand, removeBenchPieceCommand, removeBenchPiecesCommand, removeBoardPieceCommand, removeBoardPiecesCommand, swapBenchPiecesCommand, swapBoardPiecesCommand } from "../state/board";

/**
 * This saga applies the effects of board application commands.
 *
 * Created to support migration away from board state being in Redux store.
 */
export function* boardApplySaga() {
	const {
		logger,
		boardSlices: { boardSlice, benchSlice },
	} = yield* getPlayerEntityDependencies();

	// === board

	yield takeEvery(
		addBoardPieceCommand,
		function*({ payload: { pieceId, position } }) {
			boardSlice.setPiece(pieceId, position.x, position.y);
		}
	);

	yield takeEvery(
		removeBoardPieceCommand,
		function*({ payload: { pieceId } }) {
			boardSlice.removePiece(pieceId);
		}
	);

	yield takeEvery(
		removeBoardPiecesCommand,
		function*({ payload: { pieceIds } }) {
			for (const pieceId of pieceIds) {
				boardSlice.removePiece(pieceId);
			}
		}
	);

	yield takeEvery(
		swapBoardPiecesCommand,
		function*({ payload: { pieceIdA, pieceIdB } }) {
			boardSlice.swapPieces(pieceIdA, pieceIdB);
		}
	);

	yield takeEvery(
		moveBoardPieceCommand,
		function*({ payload: { pieceId, from, to } }) {
			const existingPosition = boardSlice.getPiecePosition(pieceId);

			if (
				!existingPosition ||
				existingPosition[0] !== from.x ||
				existingPosition[1] !== from.y
			) {
				// piece not at expected position
				return;
			}

			boardSlice.setPiece(pieceId, to.x, to.y);
		}
	);

	yield takeEvery(
		clearBoardCommand,
		function*() {
			boardSlice.clear();
		}
	);

	// === bench

	yield takeEvery(
		addBenchPieceCommand,
		function*({ payload: { pieceId, position } }) {
			benchSlice.setPiece(pieceId, position.x, 0);
			logger.info("Added piece to bench", { details: { pieceId, position } });
		}
	);

	yield takeEvery(
		removeBenchPieceCommand,
		function*({ payload: { pieceId } }) {
			benchSlice.removePiece(pieceId);
		}
	);

	yield takeEvery(
		removeBenchPiecesCommand,
		function*({ payload: { pieceIds } }) {
			for (const pieceId of pieceIds) {
				benchSlice.removePiece(pieceId);
			}
		}
	);

	yield takeEvery(
		swapBenchPiecesCommand,
		function*({ payload: { pieceIdA, pieceIdB } }) {
			benchSlice.swapPieces(pieceIdA, pieceIdB);
		}
	);

	yield takeEvery(
		moveBenchPieceCommand,
		function*({ payload: { pieceId, from, to } }) {
			const existingPosition = benchSlice.getPiecePosition(pieceId);

			if (
				!existingPosition ||
				existingPosition[0] !== from.x
			) {
				// piece not at expected position
				return;
			}

			benchSlice.setPiece(pieceId, to.x, 0);
		}
	);

	yield takeEvery(
		clearBenchCommand,
		function*() {
			benchSlice.clear();
		}
	);
}
