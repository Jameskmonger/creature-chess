import { select, delay, put } from "redux-saga/effects";

import { getVariable } from "@shoki/engine";

import {
	getPlayerEntityDependencies,
	PlayerActions,
	PlayerState,
	PlayerStateSelectors,
	PlayerVariables,
} from "@creature-chess/gamemode";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";

import { BOT_ACTION_TIME_MS } from "./constants";
import { PREFERRED_LOCATIONS } from "./preferredLocations";
import { Board, getFirstEmptySlot, packPosition } from "@creature-chess/board";

const getFirstBenchPieceId = (bench: Board): PieceModel["id"] | null => {
	for (let x = 0; x < bench.width; x++) {
		const pieceId = bench.getPieceIdAtPosition(x, 0);

		if (pieceId) {
			return pieceId;
		}
	}

	return null;
};

export const putBenchOnBoard = function*() {
	const name = yield* getVariable<PlayerVariables, string>((v) => v.name);
	const {
		boards: { board, bench },
		gamemode: { pieceRegistry }
	} = yield* getPlayerEntityDependencies();

	while (true) {
		const state: PlayerState = yield select();
		const firstBenchPieceId = getFirstBenchPieceId(bench);

		if (firstBenchPieceId === null) {
			break;
		}

		const firstBenchPiece = pieceRegistry.getPieceById(firstBenchPieceId);

		if (!firstBenchPiece) {
			break;
		}

		const hasFreeSlot = board.getAllPieces().length < PlayerStateSelectors.getPlayerLevel(state);

		if (!hasFreeSlot) {
			break;
		}

		const firstEmptyPosition = getFirstEmptySlot(
			board,
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

		const benchPieceSlot = bench.getPiecePosition(firstBenchPiece.id);

		if (benchPieceSlot === null) {
			break;
		}

		const benchPiecePosition: PlayerPieceLocation = {
			type: "bench",
			location: packPosition(benchPieceSlot[0], 0),
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
