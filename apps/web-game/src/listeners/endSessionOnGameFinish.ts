import { GameEvents } from "@creature-chess/models";
import { ClientStartListening } from "~/store/listenerContext";

/**
 * Close the socket once a game has ended, so a backgrounded tab
 * doesn't silently reconnect and matchmake into a new lobby when it wakes.
 */
export const setupEndSessionOnGameFinishListener = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: GameEvents.gameFinishEvent,
		effect: async (_action, api) => {
			api.extra.socketManagerHolder.peek()?.endSession();
		},
	});
};
