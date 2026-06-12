import { ClientUi, PlayerActions } from "@creature-chess/models";
import { ClientStartListening } from "~/store/listenerContext";

export const setupPreventAccidentalCloseListener = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: ClientUi.gameStartedCommand,
		effect: async (_action, api) => {
			api.cancelActiveListeners();

			window.onbeforeunload = () =>
				"Are you sure you want to leave this page? There is currently no way to rejoin a game";

			await api.take((a) => a.type === PlayerActions.quitGamePlayerAction.type);

			// Let the quit packet flush before navigating away.
			setTimeout(() => {
				window.onbeforeunload = null;
				window.location.href = APP_URL;
			}, 100);
		},
	});
};
