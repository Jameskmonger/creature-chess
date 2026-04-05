import { AppState } from "~/store";
import { ClientStartListening } from "~/store/listenerContext";
import {
	clearSelectedPiece,
	openOverlay,
	closeOverlay,
	Overlay,
} from "~/store/game/ui";

import { GameEvents } from "@creature-chess/gamemode";
import { GamePhase } from "@creature-chess/models";

export const setupUiListener = (startListening: ClientStartListening) => {
	startListening({
		actionCreator: GameEvents.gamePhaseStartedEvent,
		effect: async ({ payload: { phase } }, api) => {
			api.cancelActiveListeners();

			if (phase === GamePhase.PREPARING) {
				const isDead = (api.getState() as AppState).game.playerInfo.health === 0;

				if (!isDead) {
					api.dispatch(openOverlay(Overlay.SHOP));
					return;
				}
			}

			if (phase === GamePhase.PREPARING || phase === GamePhase.READY) {
				api.dispatch(closeOverlay());
				api.dispatch(clearSelectedPiece());
			}
		},
	});
};
