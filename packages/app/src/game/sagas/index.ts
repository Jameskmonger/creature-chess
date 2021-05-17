import { take, put } from "@redux-saga/core/effects";

import { RoundInfoCommands } from "@creature-chess/gamemode";
import { BoardSlice } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";

import { gameConnectedEvent, GameConnectedEvent } from "../../networking/actions";

import { PlayerListCommands, clickToDropSaga, closeShopOnFirstBuySaga } from "../module";

import { preventAccidentalClose } from "./actions/preventAccidentalClose";

import { LobbyEvents } from "../../lobby";
import { roundUpdateSaga, clientBattleSaga, uiSaga } from "./events";
import { all, call } from "redux-saga/effects";

export const gameSaga = function*(slices: { boardSlice: BoardSlice<PieceModel>; benchSlice: BoardSlice<PieceModel> }) {
	const action = yield take<GameConnectedEvent | LobbyEvents.LobbyGameStartedEvent>([gameConnectedEvent.toString(), LobbyEvents.LOBBY_GAME_STARTED_EVENT]);

	yield all([
		call(preventAccidentalClose),
		call(closeShopOnFirstBuySaga),
		call(clickToDropSaga),
		call(roundUpdateSaga, slices),
		call(clientBattleSaga, slices),
		call(uiSaga),
		call(function*() {
			if (action && action.payload) {
				const { payload: {
					players,
					game: { phase, phaseStartedAtSeconds },
				} } = action as GameConnectedEvent;
				yield put(PlayerListCommands.updatePlayerListCommand(players));

				const update = { phase, startedAt: phaseStartedAtSeconds };
				yield put(RoundInfoCommands.setRoundInfoCommand(update));
			}
		})
	]);
};
