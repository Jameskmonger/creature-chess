import { createAction } from "@reduxjs/toolkit";
import { AppState } from "~/store";
import { UIActions } from "~/store/game/ui";
import { clearSelectedPiece } from "~/store/game/ui/actions";
import { ClientStartListening } from "~/store/listenerContext";

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
			const selectedPieceId = (api.getState() as AppState).game.ui
				.selectedPieceId;

			if (selectedPieceId) {
				api.dispatch(
					PlayerActions.swapPiecePlayerAction({
						pieceAId: selectedPieceId,
						pieceBId: pieceId,
					})
				);

				api.dispatch(clearSelectedPiece());
			} else {
				api.dispatch(UIActions.selectPiece(pieceId));
			}
		},
	});
};
