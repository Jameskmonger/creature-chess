import { delay, put, race } from "redux-saga/effects";
import { take } from "typed-redux-saga";

import { PlayerEvents } from "@creature-chess/gamemode";

import { QuickChatCommands } from "../../store/game/chat/state";

const takeQuickChat = () =>
	take<PlayerEvents.PlayerReceiveQuickChatEvent>(
		PlayerEvents.playerReceiveQuickChatEvent.toString()
	);

export const handleQuickChat = function* () {
	let action = yield* takeQuickChat();
	while (true) {
		const { sendingPlayerId, chatValue } = action.payload;

		if (!chatValue) {
			action = yield* takeQuickChat();
			continue;
		}

		yield put(QuickChatCommands.setPlayerChat({ sendingPlayerId, chatValue }));

		const { newChat, timeout } = yield race({
			newChat: takeQuickChat(),
			timeout: delay(3000),
		});

		if (newChat) {
			action = newChat;
			continue;
		}

		yield put(QuickChatCommands.clearPlayerChat({ sendingPlayerId }));

		action = yield* takeQuickChat();
	}
};
