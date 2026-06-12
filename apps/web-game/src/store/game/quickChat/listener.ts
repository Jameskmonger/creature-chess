import { playerReceiveQuickChatEvent } from "@creature-chess/models";

import { ClientStartListening } from "~/store/listenerContext";

import { QuickChatCommands } from "./state";

export const setupQuickChatListener = (startListening: ClientStartListening) => {
	const generations = new Map<string, number>();

	startListening({
		actionCreator: playerReceiveQuickChatEvent,
		effect: async ({ payload: { sendingPlayerId, chatValue } }, api) => {
			if (!chatValue) {
				return;
			}

			const generation = (generations.get(sendingPlayerId) ?? 0) + 1;
			generations.set(sendingPlayerId, generation);

			api.dispatch(
				QuickChatCommands.setPlayerChat({ sendingPlayerId, chatValue })
			);

			await api.delay(3000);

			if (generations.get(sendingPlayerId) === generation) {
				api.dispatch(QuickChatCommands.clearPlayerChat({ sendingPlayerId }));
			}
		},
	});
};
