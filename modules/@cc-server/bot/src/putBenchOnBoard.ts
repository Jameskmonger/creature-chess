import delay from "delay";

import { Board, getFirstEmptySlot, packPosition } from "@creature-chess/board";
import { PlayerActions, PlayerStateSelectors } from "@creature-chess/gamemode";
import { PlayerListenerApi } from "@creature-chess/gamemode";
import { PieceModel, PlayerPieceLocation } from "@creature-chess/models";

import { PREFERRED_LOCATIONS } from "./preferredLocations";

const getFirstBenchPieceId = (bench: Board): PieceModel["id"] | null => {
	for (let x = 0; x < bench.width; x++) {
		const pieceId = bench.getPieceIdAtPosition(x, 0);

		if (pieceId) {
			return pieceId;
		}
	}

	return null;
};

export const putBenchOnBoard = async (api: PlayerListenerApi) => {
	const {
		board,
		bench,
		settings,
		gamemode: { pieceRegistry },
	} = api.player;

	while (true) {
		const state = api.getState();
		const firstBenchPieceId = getFirstBenchPieceId(bench);

		if (firstBenchPieceId === null) {
			break;
		}

		const firstBenchPiece = pieceRegistry.getPieceById(firstBenchPieceId);

		if (!firstBenchPiece) {
			break;
		}

		const hasFreeSlot =
			board.getAllPieces().length < PlayerStateSelectors.getPlayerLevel(state);

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

		api.dispatch(
			PlayerActions.dropPiecePlayerAction({
				pieceId: firstBenchPiece.id,
				from: benchPiecePosition,
				to: boardPiecePosition,
			})
		);

		if (settings.botActionDelayMs > 0) {
			await delay(settings.botActionDelayMs);
		}
	}
};
