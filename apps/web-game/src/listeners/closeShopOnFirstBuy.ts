import { AppState } from "~/store";
import { ClientStartListening } from "~/store/listenerContext";
import { closeOverlay } from "~/store/game/ui/actions";
import { Overlay } from "~/store/game/ui/overlay";

import { PlayerActions } from "@creature-chess/gamemode";

import { gameStartedAction } from "./gameStartedAction";

export const setupCloseShopOnFirstBuyListener = (startListening: ClientStartListening) => {
	startListening({
		actionCreator: gameStartedAction,
		effect: async (_action, api) => {
			api.cancelActiveListeners();

			// Wait for first buy card action
			await api.take((a) => a.type === PlayerActions.buyCardPlayerAction.type);

			const shopIsOpen = (api.getState() as AppState).game.ui.currentOverlay === Overlay.SHOP;

			if (shopIsOpen) {
				api.dispatch(closeOverlay());
			}
		},
	});
};
