import { takeLatest, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { getDependency } from "@shoki/engine/lib";
import { PlayerEntityDependencies } from "../entities/player";
import { playerReceiveQuickChatEvent } from "../entities/player/events";
import { QuickChatOption } from "@creature-chess/models";
import { select } from "redux-saga/effects";


export type QuickChatPlayerAction = ReturnType<typeof quickChatPlayerAction>;
export const quickChatPlayerAction = createAction<{
	sendingPlayerId: string | null;
	chatValue: QuickChatOption;
}, "quickChatAction">("quickChatAction");

export const quickChatPlayerActionSaga = function*() {
	yield takeLatest<QuickChatPlayerAction>(
		quickChatPlayerAction.toString(),
		function*({ payload: { sendingPlayerId, chatValue } }) {
			if (sendingPlayerId === null || chatValue === null) {
				return;
			}
			const game = yield* getDependency<PlayerEntityDependencies, "game">("game");
			const player = game.getPlayerById(sendingPlayerId);
			const opponentId: string = yield select(state => state.playerInfo.opponentId);
			const opponent = game.getPlayerById(opponentId);
			if (!opponent || !player) {
				return;
			}
			opponent.put(playerReceiveQuickChatEvent({ sendingPlayerId, chatValue }));
			player.put(playerReceiveQuickChatEvent({ sendingPlayerId, chatValue }));
		}
	);
};
