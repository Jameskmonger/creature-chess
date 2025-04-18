import { select, delay, put } from "redux-saga/effects";

import { BoardSelectors } from "@shoki/board";
import { getVariable } from "@shoki/engine";

import {
	PlayerActions,
	PlayerState,
	PlayerStateSelectors,
	PlayerVariables,
} from "@creature-chess/gamemode";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";

import { BOT_ACTION_TIME_MS } from "./constants";
import { PREFERRED_LOCATIONS } from "./preferredLocations";

// todo selector
const getFirstBenchPiece = (state: PlayerState): PieceModel | null => {
	for (let x = 0; x < state.bench.size.width; x++) {
		if (state.bench.piecePositions[`${x},0`]) {
			return state.bench.pieces[state.bench.piecePositions[`${x},0`]];
		}
	}

	return null;
};

const getBenchSlotForPiece = (
	state: PlayerState,
	pieceId: string
): number | null => {
	for (let x = 0; x < state.bench.size.width; x++) {
		if (state.bench.piecePositions[`${x},0`] === pieceId) {
			return x;
		}
	}

	return null;
};

export const putBenchOnBoard = function* () {
	const name = yield* getVariable<PlayerVariables, string>((v) => v.name);

	while (true) {
		const state: PlayerState = yield select();
		const firstBenchPiece = getFirstBenchPiece(state);

		if (firstBenchPiece === null) {
			break;
		}

		const hasFreeSlot =
			BoardSelectors.getAllPieces(state.board).length <
			PlayerStateSelectors.getPlayerLevel(state);

		if (!hasFreeSlot) {
			break;
		}

		const firstEmptyPosition = BoardSelectors.getFirstEmptySlot(
			state.board,
			PREFERRED_LOCATIONS[
				firstBenchPiece.traits[1] as "arcane" | "valiant" | "cunning"
			]
		);

		if (firstEmptyPosition === null) {
			break;
		}

		const boardPiecePosition: PlayerPieceLocation = {
			type: "board",
			location: firstEmptyPosition,
		};

		const benchPieceSlot = getBenchSlotForPiece(state, firstBenchPiece.id);

		if (benchPieceSlot === null) {
			break;
		}

		const benchPiecePosition: PlayerPieceLocation = {
			type: "bench",
			location: {
				x: benchPieceSlot,
				y: 0,
			},
		};

		yield put(
			PlayerActions.dropPiecePlayerAction({
				pieceId: firstBenchPiece.id,
				from: benchPiecePosition,
				to: boardPiecePosition,
			})
		);

		yield delay(BOT_ACTION_TIME_MS);
	}
};
