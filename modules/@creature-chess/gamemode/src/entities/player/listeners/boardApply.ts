import { unpackX, unpackY } from "@creature-chess/board";

import { PlayerStartListening } from "../player";
import {
	addBenchPieceCommand,
	addBoardPieceCommand,
	clearBenchCommand,
	clearBoardCommand,
	moveBenchPieceCommand,
	moveBoardPieceCommand,
	removeBenchPieceCommand,
	removeBenchPiecesCommand,
	removeBoardPieceCommand,
	removeBoardPiecesCommand,
	swapBenchPiecesCommand,
	swapBoardPiecesCommand,
} from "../state/board";

/**
 * Sets up listeners that apply board/bench commands to the actual Board instances.
 *
 * Created to support migration away from board state being in Redux store.
 */
export const setupBoardApplyListeners = (
	startListening: PlayerStartListening
) => {
	// Apply board/bench commands to the actual Board instances
	// === board

	startListening({
		actionCreator: addBoardPieceCommand,
		effect: async ({ payload: { pieceId, position } }, api) => {
			api.player.board.setPiece(pieceId, unpackX(position), unpackY(position));
		},
	});

	startListening({
		actionCreator: removeBoardPieceCommand,
		effect: async ({ payload: { pieceId } }, api) => {
			api.player.board.removePiece(pieceId);
		},
	});

	startListening({
		actionCreator: removeBoardPiecesCommand,
		effect: async ({ payload: { pieceIds } }, api) => {
			for (const pieceId of pieceIds) {
				api.player.board.removePiece(pieceId);
			}
		},
	});

	startListening({
		actionCreator: swapBoardPiecesCommand,
		effect: async ({ payload: { pieceIdA, pieceIdB } }, api) => {
			api.player.board.swapPieces(pieceIdA, pieceIdB);
		},
	});

	startListening({
		actionCreator: moveBoardPieceCommand,
		effect: async ({ payload: { pieceId, from, to } }, api) => {
			const board = api.player.board;
			const existingPosition = board.getPiecePosition(pieceId);

			if (
				!existingPosition ||
				existingPosition[0] !== unpackX(from) ||
				existingPosition[1] !== unpackY(from)
			) {
				return;
			}

			board.setPiece(pieceId, unpackX(to), unpackY(to));
		},
	});

	startListening({
		actionCreator: clearBoardCommand,
		effect: async (_action, api) => {
			api.player.board.clear();
		},
	});

	// === bench

	startListening({
		actionCreator: addBenchPieceCommand,
		effect: async ({ payload: { pieceId, position } }, api) => {
			api.player.bench.setPiece(pieceId, position.x, 0);
		},
	});

	startListening({
		actionCreator: removeBenchPieceCommand,
		effect: async ({ payload: { pieceId } }, api) => {
			api.player.bench.removePiece(pieceId);
		},
	});

	startListening({
		actionCreator: removeBenchPiecesCommand,
		effect: async ({ payload: { pieceIds } }, api) => {
			for (const pieceId of pieceIds) {
				api.player.bench.removePiece(pieceId);
			}
		},
	});

	startListening({
		actionCreator: swapBenchPiecesCommand,
		effect: async ({ payload: { pieceIdA, pieceIdB } }, api) => {
			api.player.bench.swapPieces(pieceIdA, pieceIdB);
		},
	});

	startListening({
		actionCreator: moveBenchPieceCommand,
		effect: async ({ payload: { pieceId, from, to } }, api) => {
			const bench = api.player.bench;
			const existingPosition = bench.getPiecePosition(pieceId);

			if (!existingPosition || existingPosition[0] !== from.x) {
				return;
			}

			bench.setPiece(pieceId, to.x, 0);
		},
	});

	startListening({
		actionCreator: clearBenchCommand,
		effect: async (_action, api) => {
			api.player.bench.clear();
		},
	});
};
