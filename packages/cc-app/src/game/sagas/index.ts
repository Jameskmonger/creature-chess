import { all, call, take, put } from "redux-saga/effects";
import { RoundInfoCommands } from "@creature-chess/gamemode";

import { gameConnectedEvent, GameConnectedEvent } from "../../networking/actions";
import { PlayerListCommands, clickToDropSaga, closeShopOnFirstBuySaga } from "../module";
import { preventAccidentalClose } from "./actions/preventAccidentalClose";
import { LobbyEvents } from "../../lobby";
import { roundUpdateSaga, clientBattleSaga, uiSaga } from "./events";

export const gameSaga = function*() {
	const action = yield take<GameConnectedEvent | LobbyEvents.LobbyGameStartedEvent>([gameConnectedEvent.toString(), LobbyEvents.LOBBY_GAME_STARTED_EVENT]);

	yield all([
		call(preventAccidentalClose),
		call(closeShopOnFirstBuySaga),
		call(clickToDropSaga),
		call(roundUpdateSaga),
		call(clientBattleSaga),
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
