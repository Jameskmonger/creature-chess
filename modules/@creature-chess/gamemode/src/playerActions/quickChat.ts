import { createAction } from "@reduxjs/toolkit";

import { QuickChatOption } from "@creature-chess/models";

import { PlayerStartListening } from "../entities/player/player";
import { playerReceiveQuickChatEvent } from "../entities/player/events";

export type QuickChatPlayerAction = ReturnType<typeof quickChatPlayerAction>;
export const quickChatPlayerAction = createAction<
	{
		sendingPlayerId: string | null;
		chatValue: QuickChatOption;
	},
	"quickChatAction"
>("quickChatAction");

export const setupQuickChatListener = (startListening: PlayerStartListening) => {
	startListening({
		actionCreator: quickChatPlayerAction,
		effect: async ({ payload: { sendingPlayerId, chatValue } }, api) => {
			api.cancelActiveListeners();

			if (sendingPlayerId === null || chatValue === null) {
				return;
			}

			const game = api.player.gamemode;
			const player = game.getPlayerById(sendingPlayerId);
			const opponentId = api.getState().playerInfo.opponentId;

			if (!opponentId) {
				return;
			}

			const opponent = game.getPlayerById(opponentId);

			if (!opponent || !player) {
				return;
			}

			opponent.put(playerReceiveQuickChatEvent({ sendingPlayerId, chatValue }));
			player.put(playerReceiveQuickChatEvent({ sendingPlayerId, chatValue }));
		},
	});
};
