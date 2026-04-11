import { QuickChatCommands } from "~/store/game/chat/state";
import { ClientStartListening } from "~/store/listenerContext";

import { PlayerEvents } from "@creature-chess/gamemode";

export const setupQuickChatListener = (
	startListening: ClientStartListening
) => {
	startListening({
		actionCreator: PlayerEvents.playerReceiveQuickChatEvent,
		effect: async ({ payload: { sendingPlayerId, chatValue } }, api) => {
			api.cancelActiveListeners();

			if (!chatValue) {
				return;
			}

			api.dispatch(
				QuickChatCommands.setPlayerChat({ sendingPlayerId, chatValue })
			);

			// Wait 3 seconds then clear. If a new chat arrives, cancelActiveListeners()
			// aborts this delay and the clear never happens.
			await api.delay(3000);

			api.dispatch(QuickChatCommands.clearPlayerChat({ sendingPlayerId }));
		},
	});
};
