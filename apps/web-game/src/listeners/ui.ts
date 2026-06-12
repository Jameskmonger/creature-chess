import { GameEvents } from "@creature-chess/models";
import { AppState } from "~/store";
import {
	clearSelectedPiece,
	openOverlay,
	closeOverlay,
	Overlay,
} from "~/store/game/ui";
import { ClientStartListening } from "~/store/listenerContext";

import { GamePhase } from "@creature-chess/models";

export const setupUiListener = (startListening: ClientStartListening) => {
	startListening({
		actionCreator: GameEvents.gamePhaseStartedEvent,
		effect: async ({ payload: { phase } }, api) => {
			api.cancelActiveListeners();

			if (phase === GamePhase.PREPARING) {
				const accountId = api.extra.accountIdHolder.peek();
				const localPlayer = (api.getState() as AppState).game.players.find(
					(p) => p.id === accountId
				);
				const isDead = localPlayer?.health === 0;

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
