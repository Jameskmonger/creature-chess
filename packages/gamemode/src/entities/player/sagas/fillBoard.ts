import { takeEvery, put } from "redux-saga/effects";
import { getContext, select } from "typed-redux-saga";
import { PlayerState } from "../../../player/store";
import { PlayerPieceLocation } from "@creature-chess/models";
import { BoardSelectors } from "@creature-chess/board";
import { getMostExpensiveBenchPiece, getPlayerBelowPieceLimit, isPlayerAlive } from "../../../player/playerSelectors";
import { dropPiecePlayerAction } from "./playerGameActions";

const FILL_BOARD_COMMAND = "FILL_BOARD_COMMAND";
type FILL_BOARD_COMMAND = typeof FILL_BOARD_COMMAND;
type FillBoardCommand = ({ type: FILL_BOARD_COMMAND });

export const fillBoardCommand = (): FillBoardCommand => ({ type: FILL_BOARD_COMMAND });

export const fillBoard = function*() {
	const playerId = yield* getContext<string>("id");

	yield takeEvery<FillBoardCommand>(
		FILL_BOARD_COMMAND,
		function*() {
			const isAlive = yield* select(isPlayerAlive);

			if (!isAlive) {
				return;
			}

			while (true) {
				const state: PlayerState = yield* select();
				const belowPieceLimit = getPlayerBelowPieceLimit(state, playerId);

				if (!belowPieceLimit) {
					return;
				}

				const benchPiece = getMostExpensiveBenchPiece(state);

				if (!benchPiece) {
					return;
				}

				const destination = BoardSelectors.getFirstEmptySlot(state.board);

				if (!destination) {
					return;
				}

				const benchPiecePosition = BoardSelectors.getPiecePosition(state.bench, benchPiece.id);

				if (!benchPiecePosition) {
					return;
				}

				const fromLocation: PlayerPieceLocation = {
					type: "bench",
					location: benchPiecePosition
				};

				const toLocation: PlayerPieceLocation = {
					type: "board",
					location: {
						x: destination.x,
						y: destination.y
					}
				};

				yield put(dropPiecePlayerAction({
					pieceId: benchPiece.id,
					from: fromLocation,
					to: toLocation
				}));
			}
		}
	);
};
