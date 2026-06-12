import { ClientUi, PlayerActions } from "@creature-chess/models";
import { AppState } from "~/store";
import { closeOverlay, Overlay } from "~/store/game/ui";
import { ClientStartListening } from "~/store/listenerContext";

export const setupCloseShopOnFirstBuyListener = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: ClientUi.gameStartedCommand,
		effect: async (_action, api) => {
			api.cancelActiveListeners();

			await api.take((a) => a.type === PlayerActions.buyCardPlayerAction.type);

			const shopIsOpen =
				(api.getState() as AppState).game.ui.currentOverlay === Overlay.SHOP;

			if (shopIsOpen) {
				api.dispatch(closeOverlay());
			}
		},
	});
};
