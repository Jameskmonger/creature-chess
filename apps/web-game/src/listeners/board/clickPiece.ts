import { createAction } from "@reduxjs/toolkit";
import { AppState } from "~/store";
import { UIActions } from "~/store/game/ui";
import { clearSelectedPiece } from "~/store/game/ui/actions";
import { ClientStartListening } from "~/store/listenerContext";
import { getLocationForPiece } from "~/utils/getLocationForPiece";

import { PlayerActions } from "@creature-chess/gamemode";

export type PlayerClickPieceAction = ReturnType<typeof playerClickPieceAction>;
export const playerClickPieceAction = createAction<{ pieceId: string }>(
	"playerClickPieceAction"
);

export const setupClickPieceListener = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: playerClickPieceAction,
		effect: async ({ payload: { pieceId } }, api) => {
			const slices = api.extra.slices;

			const pieceLocation = getLocationForPiece(
				pieceId,
				slices.board,
				slices.bench
			);

			if (!pieceLocation) {
				return;
			}

			const selectedPieceId = (api.getState() as AppState).game.ui
				.selectedPieceId;

			if (selectedPieceId) {
				const selectedPieceLocation = getLocationForPiece(
					selectedPieceId,
					slices.board,
					slices.bench
				);

				if (!selectedPieceLocation) {
					return;
				}

				api.dispatch(
					PlayerActions.swapPiecePlayerAction({
						pieceAId: selectedPieceId,
						pieceALocation: selectedPieceLocation,
						pieceBId: pieceId,
						pieceBLocation: pieceLocation,
					})
				);

				api.dispatch(clearSelectedPiece());
			} else {
				api.dispatch(UIActions.selectPiece(pieceId));
			}
		},
	});
};
