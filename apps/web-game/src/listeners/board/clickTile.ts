import { createAction } from "@reduxjs/toolkit";
import { AppState } from "~/store";
import { clearSelectedPiece } from "~/store/game/ui";
import { ClientStartListening } from "~/store/listenerContext";

import { unpackPosition } from "@creature-chess/board";
import { PlayerActions } from "@creature-chess/gamemode";
import { PlayerPieceLocation } from "@creature-chess/models";

export type PlayerClickTileAction = ReturnType<typeof playerClickTileAction>;
export const playerClickTileAction = createAction<{
	tile: PlayerPieceLocation;
}>("playerClickTileAction");

export const setupClickTileListener = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: playerClickTileAction,
		effect: async ({ payload: { tile } }, api) => {
			const slices = api.extra.slices;

			const selectedPieceId = (api.getState() as AppState).game.ui
				.selectedPieceId;

			if (!selectedPieceId) {
				return;
			}

			const [x, y] = unpackPosition(tile.location);
			const tileEmpty =
				tile.type === "bench"
					? slices.bench.getPieceIdAtPosition(x, y) === null
					: slices.board.getPieceIdAtPosition(x, y) === null;

			if (!tileEmpty) {
				return;
			}

			api.dispatch(
				PlayerActions.dropPiecePlayerAction({
					pieceId: selectedPieceId,
					to: tile,
				})
			);

			api.dispatch(clearSelectedPiece());
		},
	});
};
