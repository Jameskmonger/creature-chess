import { all, call, put } from "redux-saga/effects";
import { take } from "typed-redux-saga";
import { RoundInfoCommands } from "@creature-chess/gamemode";

import { gameConnectedEvent, GameConnectedEvent } from "../../networking/events";
import { PlayerListCommands, clickTileSaga, clickPieceSaga, closeShopOnFirstBuySaga } from "../module";
import { preventAccidentalClose } from "./actions/preventAccidentalClose";
import { handleQuickChat } from "../module/chat/sagas";
import { roundUpdateSaga, clientBattleSaga, uiSaga } from "./events";

export const gameSaga = function*() {
	const action = yield* take<GameConnectedEvent>(gameConnectedEvent.toString());

	yield all([
		call(preventAccidentalClose),
		call(closeShopOnFirstBuySaga),
		call(clickTileSaga),
		call(clickPieceSaga),
		call(roundUpdateSaga),
		call(clientBattleSaga),
		call(uiSaga),
		call(handleQuickChat),
		call(function*() {
			if (action.type === "gameConnectedEvent") {
				const {
					payload: {
						players,
						game: { phase, phaseStartedAtSeconds },
					}
				} = action;
				yield put(PlayerListCommands.updatePlayerListCommand(players));

				const update = { phase, startedAt: phaseStartedAtSeconds };
				yield put(RoundInfoCommands.setRoundInfoCommand(update));
			}
		})
	]);
};
