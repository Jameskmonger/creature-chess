import { ClientStartListening } from "~/store/listenerContext";

import { PlayerActions } from "@creature-chess/gamemode";

import { gameStartedAction } from "./gameStartedAction";

declare const APP_URL: string;

export const setupPreventAccidentalCloseListener = (startListening: ClientStartListening) => {
	startListening({
		actionCreator: gameStartedAction,
		effect: async (_action, api) => {
			api.cancelActiveListeners();

			// display an "Are you sure you want to leave this page?" dialog
			window.onbeforeunload = () =>
				"Are you sure you want to leave this page? There is currently no way to rejoin a game";

			await api.take((a) => a.type === PlayerActions.quitGamePlayerAction.type);

			// just to allow the packets to send
			setTimeout(() => {
				window.onbeforeunload = null;
				window.location.href = APP_URL;
			}, 100);
		},
	});
};
