import { take, delay, select, put, race } from "redux-saga/effects";
import { commands as quickChatCommands } from "./state";
import { PlayerEvents } from "@creature-chess/gamemode";


export const handleQuickChat = function*() {
	let action = yield take(PlayerEvents.playerReceiveQuickChatEvent.toString());
	while (true) {

		const { sendingPlayerId, chatValue } = action.payload;
		if (!chatValue) {
			return;
		}
		yield put(quickChatCommands.setPlayerChat({ sendingPlayerId, chatValue }));
		const { newChat, timeout } = yield race({
			newChat: take(PlayerEvents.playerReceiveQuickChatEvent.toString()),
			timeout: delay(3000)
		});
		if (newChat) {
			action = newChat;
			continue;
		}
		yield put(quickChatCommands.clearPlayerChat({ sendingPlayerId }));

		action = yield take(PlayerEvents.playerReceiveQuickChatEvent.toString());
	}
};
