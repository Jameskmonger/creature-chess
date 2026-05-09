import { ClientStartListening } from "~/store/listenerContext";

import { PlayerActionTypesArray } from "@creature-chess/gamemode";

export const setupForwardPlayerActions = (
	startListening: ClientStartListening
) => {
	startListening({
		predicate: (action) =>
			PlayerActionTypesArray.includes((action as { type: string }).type),
		effect: async (action, api) => {
			api.extra.gameConnectionHolder
				.peek()
				?.sendPlayerAction(action as { type: string; payload?: any });
		},
	});
};
