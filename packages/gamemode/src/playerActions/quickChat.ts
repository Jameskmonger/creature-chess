import { takeLatest, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { getDependency } from "@shoki/engine/lib";
import { PlayerEntityDependencies } from "../entities/player";
import { playerReceiveQuickChatEvent } from "../entities/player/events";
import { QuickChatValue } from "@creature-chess/models";


export type QuickChatPlayerAction = ReturnType<typeof quickChatPlayerAction>;
export const quickChatPlayerAction = createAction<{
	sendingPlayerId: string | null;
	receivingPlayerId: string | null;
	chatValue: QuickChatValue;
}, "quickChatAction">("quickChatAction");

export const quickChatPlayerActionSaga = function*() {
	yield takeLatest<QuickChatPlayerAction>(
		quickChatPlayerAction.toString(),
		function*({ payload: { sendingPlayerId, receivingPlayerId, chatValue } }) {
			if (sendingPlayerId === null || receivingPlayerId === null || chatValue === null) {
				return;
			}
			const game = yield* getDependency<PlayerEntityDependencies, "game">("game");
			const player = game.getPlayerById(sendingPlayerId);
			const opponent = game.getPlayerById(receivingPlayerId);

			if (!opponent || !player) {
				return;
			}

			opponent.runSaga(function*() {
				yield put(playerReceiveQuickChatEvent({ sendingPlayerId, receivingPlayerId, chatValue }));
			});

			player.runSaga(function*() {
				yield put(playerReceiveQuickChatEvent({ sendingPlayerId, receivingPlayerId, chatValue }));
			});

		}
	);
};
