import { takeLatest, put } from "@redux-saga/core/effects";
import { createAction } from "@reduxjs/toolkit";
import { select } from "redux-saga/effects";

import { getDependency } from "@shoki/engine";

import { QuickChatOption } from "@creature-chess/models";

import { PlayerEntityDependencies } from "../entities/player";
import { playerReceiveQuickChatEvent } from "../entities/player/events";

export type QuickChatPlayerAction = ReturnType<typeof quickChatPlayerAction>;
export const quickChatPlayerAction = createAction<
	{
		sendingPlayerId: string | null;
		chatValue: QuickChatOption;
	},
	"quickChatAction"
>("quickChatAction");

export const quickChatPlayerActionSaga = function* () {
	yield takeLatest<QuickChatPlayerAction>(
		quickChatPlayerAction.toString(),
		function* ({ payload: { sendingPlayerId, chatValue } }) {
			if (sendingPlayerId === null || chatValue === null) {
				return;
			}
			const game = yield* getDependency<PlayerEntityDependencies, "gamemode">(
				"gamemode"
			);
			const player = game.getPlayerById(sendingPlayerId);
			const opponentId: string = yield select(
				(state) => state.playerInfo.opponentId
			);
			const opponent = game.getPlayerById(opponentId);
			if (!opponent || !player) {
				return;
			}
			opponent.put(playerReceiveQuickChatEvent({ sendingPlayerId, chatValue }));
			player.put(playerReceiveQuickChatEvent({ sendingPlayerId, chatValue }));
		}
	);
};
