import { take, delay, select, put } from "redux-saga/effects";
import { commands as quickChatCommands } from "./state";
import { PlayerEvents } from "@creature-chess/gamemode";


export const handleQuickChat = function*() {
	while (true) {
		const action = yield take(PlayerEvents.playerReceiveQuickChatEvent.toString());
		const { sendingPlayerId, receivingPlayerId, chatValue } = action.payload;
		if (!chatValue) {
			return;
		}
		yield put(quickChatCommands.setPlayerChat({ sendingPlayerId, receivingPlayerId, chatValue }));
		let chatToCheck = chatValue;
		while (true) {

			yield delay(3000);
			// stops chat being cleared before 3 seconds if it has changed in that time frame
			// may be able to get rid of below using take latest?

			const currentChat = yield select(state => state.game.quickChat.find(chatObject => chatObject.id === sendingPlayerId));
			const isSameChat = currentChat?.value?.phrase === chatToCheck?.phrase;

			if (!isSameChat) {
				chatToCheck = currentChat?.value;
				continue;
			}
			yield put(quickChatCommands.setPlayerChat({ sendingPlayerId, receivingPlayerId, chatValue: null }));
			break;
		}
	}
};
