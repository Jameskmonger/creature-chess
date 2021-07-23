import { take, delay, select, put } from "redux-saga/effects";
import { PlayerActions, PlayerEvents } from "@creature-chess/gamemode";


export const handleQuickChat = function*() {
	while (true) {
		yield take(PlayerEvents.playerReceiveQuickChatEvent.toString());
		const chatValue = yield select(state => state.game.playerInfo.quickChat.value);
		console.log(chatValue);
		if (!chatValue) {
			return;
		}
		yield delay(3000);
		yield put(PlayerEvents.playerReceiveQuickChatEvent({ sendingPlayerId: null, receivingPlayerId: null, chatValue: { phrase: null } }));
	}
};
