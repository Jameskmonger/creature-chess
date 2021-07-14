import { takeLatest, all } from "redux-saga/effects";

import { GameEvents, PlayerEvents } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { getPacketRegistries } from "../registries";


export const sendQuickChat = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield all([
		takeLatest<GameEvents.PlayerReceiveQuickChatEvent>(
			GameEvents.playerReceiveQuickChatEvent.toString(),
			function*({ payload: {
				sendingPlayerId,
				receivingPlayerId,
				chatValue
			} }) {
				registry.emit(ServerToClient.Game.PacketOpcodes.QUICK_CHAT, { sendingPlayerId, receivingPlayerId, chatValue });
			}
		)
	]);
};
