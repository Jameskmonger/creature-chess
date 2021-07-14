import { takeLatest, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { getDependency } from "@shoki/engine/lib";
import { PlayerEntityDependencies } from "../entities/player";
import { playerReceiveQuickChatEvent } from "../game/events";
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
			// this can be expanded to send to all player by using getConnectedPlayers instead of getPlayerById
			// then looping through all players in that array and putting receiveQuickChatEvent for each of them
			opponent.runSaga(function*() {
				yield put(playerReceiveQuickChatEvent({ sendingPlayerId, receivingPlayerId, chatValue }));
			});

			// this is purely for testing purposes to see if actions are being created - cannot access opponent actions:
			player.runSaga(function*() {
				yield put(playerReceiveQuickChatEvent({ sendingPlayerId, receivingPlayerId, chatValue }));
			});

		}
	);
};
