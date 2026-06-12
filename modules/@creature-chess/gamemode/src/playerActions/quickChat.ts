import {
	playerReceiveQuickChatEvent,
	quickChatPlayerAction,
} from "@creature-chess/models";

import { definePlayerAction } from "./registry";

export const quickChatDef = definePlayerAction({
	creator: quickChatPlayerAction,
	handler: (player, { sendingPlayerId, chatValue }) => {
		if (sendingPlayerId === null) {
			return;
		}

		const game = player.gamemode;
		const sender = game.getPlayerById(sendingPlayerId);
		const opponentId = player.opponentId;
		if (!opponentId) {
			return;
		}

		const opponent = game.getPlayerById(opponentId);
		if (!opponent || !sender) {
			return;
		}

		const event = playerReceiveQuickChatEvent({ sendingPlayerId, chatValue });
		opponent.emitNetworkedEvent(event);
		sender.emitNetworkedEvent(event);
	},
});
