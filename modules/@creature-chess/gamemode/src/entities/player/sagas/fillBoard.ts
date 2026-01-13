import { takeEvery, put } from "redux-saga/effects";
import { getContext, select } from "typed-redux-saga";

import { PlayerPieceLocation } from "@creature-chess/models";

import { dropPiecePlayerAction } from "../../../playerActions";
import { PlayerState } from "../state";
import {
	isPlayerAlive,
	getPlayerBelowPieceLimit,
} from "../state/selectors";
import { getPlayerEntityDependencies } from "../dependencies";
import { Board, getFirstEmptySlot, packPosition } from "@creature-chess/board";
import { PieceRegistry } from "@creature-chess/utils/piece";

const FILL_BOARD_COMMAND = "FILL_BOARD_COMMAND";
type FILL_BOARD_COMMAND = typeof FILL_BOARD_COMMAND;
type FillBoardCommand = { type: FILL_BOARD_COMMAND };

export const fillBoardCommand = (): FillBoardCommand => ({
	type: FILL_BOARD_COMMAND,
});

const getMostExpensiveBenchPiece = (bench: Board, pieces: PieceRegistry) => {
	const benchPieces = bench.getAllPieces()
		.map(({ id }) => pieces.getPieceById(id))
		.filter((piece): piece is NonNullable<typeof piece> => piece !== null);

	if (!benchPieces.length) {
		return null;
	}

	benchPieces.sort((a, b) => b.definition.cost - a.definition.cost);

	return benchPieces[0];
};

export const fillBoard = function*() {
	const playerId = yield* getContext<string>("id");
	const {
		boards: { board, bench },
		gamemode: { pieceRegistry }
	} = yield* getPlayerEntityDependencies();

	yield takeEvery<FillBoardCommand>(FILL_BOARD_COMMAND, function*() {
		const isAlive = yield* select(isPlayerAlive);

		if (!isAlive) {
			return;
		}

		while (true) {
			const state: PlayerState = yield* select();
			const belowPieceLimit = getPlayerBelowPieceLimit(state.playerInfo.level, board);

			if (!belowPieceLimit) {
				return;
			}

			const benchPiece = getMostExpensiveBenchPiece(bench, pieceRegistry);

			if (!benchPiece) {
				return;
			}

			const destination = getFirstEmptySlot(board);

			if (!destination) {
				return;
			}

			const benchPiecePosition = bench.getPiecePosition(benchPiece.id);

			if (!benchPiecePosition) {
				return;
			}

			const fromLocation: PlayerPieceLocation = {
				type: "bench",
				location: packPosition(benchPiecePosition[0], 0),
			};

			const toLocation: PlayerPieceLocation = {
				type: "board",
				location: destination,
			};

			yield put(
				dropPiecePlayerAction({
					pieceId: benchPiece.id,
					from: fromLocation,
					to: toLocation,
				})
			);
		}
	});
};
