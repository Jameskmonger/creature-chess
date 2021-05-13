import { select, delay, put } from "@redux-saga/core/effects";
import { BoardSelectors } from "@creature-chess/board";
import { PlayerGameActions, PlayerState } from "@creature-chess/gamemode";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";
import { PREFERRED_LOCATIONS } from "../preferredLocations";
import { BOT_ACTION_TIME_MS } from "../constants";

// todo selector
const getFirstBenchPiece = (state: PlayerState): PieceModel => {
	for (let x = 0; x < state.bench.size.width; x++) {
		if (state.bench.piecePositions[`${x},0`]) {
			return state.bench.pieces[state.bench.piecePositions[`${x},0`]];
		}
	}

	return null;
};

const getBenchSlotForPiece = (state: PlayerState, pieceId: string): number => {
	for (let x = 0; x < state.bench.size.width; x++) {
		if (state.bench.piecePositions[`${x},0`] === pieceId) {
			return x;
		}
	}

	return null;
};

export const putBenchOnBoard = function*() {
	while (true) {
		const state: PlayerState = yield select();
		const firstBenchPiece = getFirstBenchPiece(state);

		if (firstBenchPiece === null) {
			break;
		}

		const firstEmptyPosition = BoardSelectors.getFirstEmptySlot(state.board, PREFERRED_LOCATIONS[firstBenchPiece.definition.class]);

		if (firstEmptyPosition === null) {
			break;
		}

		const boardPiecePosition: PlayerPieceLocation = {
			type: "board",
			location: firstEmptyPosition
		};

		const benchPieceSlot = getBenchSlotForPiece(state, firstBenchPiece.id);

		const benchPiecePosition: PlayerPieceLocation = {
			type: "bench",
			location: {
				x: benchPieceSlot,
				y: 0
			}
		};

		yield put(PlayerGameActions.dropPiecePlayerAction({
			pieceId: firstBenchPiece.id,
			from: benchPiecePosition,
			to: boardPiecePosition
		}));

		yield delay(BOT_ACTION_TIME_MS);
	}
};
