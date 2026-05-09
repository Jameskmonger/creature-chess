import { getGameConnectionRef } from "~/networking/connectionRef";
import { ClientStartListening } from "~/store/listenerContext";

import { PlayerActionTypesArray } from "@creature-chess/gamemode";

export const setupForwardPlayerActions = (
	startListening: ClientStartListening
) => {
	startListening({
		predicate: (action) =>
			PlayerActionTypesArray.includes((action as { type: string }).type),
		effect: async (action) => {
			getGameConnectionRef()?.sendPlayerAction(
				action as { type: string; payload?: any }
			);
		},
	});
};
