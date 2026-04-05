import { createAction } from "@reduxjs/toolkit";
import { AppState } from "~/store";
import { ClientStartListening } from "~/store/listenerContext";
import { clearSelectedPiece } from "~/store/game/ui";
import { getLocationForPiece } from "~/utils/getLocationForPiece";

import { PlayerActions } from "@creature-chess/gamemode";
import { PlayerPieceLocation } from "@creature-chess/models";
import { unpackPosition } from "@creature-chess/board";

export type PlayerClickTileAction = ReturnType<typeof playerClickTileAction>;
export const playerClickTileAction = createAction<{
	tile: PlayerPieceLocation;
}>("playerClickTileAction");

export const setupClickTileListener = (startListening: ClientStartListening) => {
	startListening({
		actionCreator: playerClickTileAction,
		effect: async ({ payload: { tile } }, api) => {
			const slices = api.extra.slices;

			const selectedPieceId = (api.getState() as AppState).game.ui.selectedPieceId;

			console.log("currently selected piece id:", selectedPieceId);

			if (!selectedPieceId) {
				return;
			}

			let tileEmpty = false;

			const [x, y] = unpackPosition(tile.location);

			if (tile.type === "bench") {
				tileEmpty = slices.bench.getPieceIdAtPosition(x, y) === null;
			} else if (tile.type === "board") {
				tileEmpty = slices.board.getPieceIdAtPosition(x, y) === null;
			}

			if (!tileEmpty) {
				return;
			}

			const from = getLocationForPiece(selectedPieceId, slices.board, slices.bench);

			console.log(`from position for piece ${selectedPieceId}:`, from);

			if (!from) {
				return;
			}

			api.dispatch(
				PlayerActions.dropPiecePlayerAction({
					pieceId: selectedPieceId,
					from,
					to: tile,
				})
			);

			api.dispatch(clearSelectedPiece());
		},
	});
};
