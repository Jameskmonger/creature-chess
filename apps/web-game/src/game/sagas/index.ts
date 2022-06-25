import { all, call, put } from "redux-saga/effects";
import { take } from "typed-redux-saga";

import { RoundInfoCommands } from "@creature-chess/gamemode";

import {
	gameConnectedEvent,
	GameConnectedEvent,
} from "../../networking/events";
import { clickPieceSaga, clickTileSaga } from "../board";
import { PlayerListCommands, closeShopOnFirstBuySaga } from "../module";
import { handleQuickChat } from "../module/chat/sagas";
import { clientBattleSaga } from "./battle";
import { goToMenuAfterGame } from "./goToMenuAfterGame";
import { preventAccidentalClose } from "./preventAccidentalClose";
import { roundUpdateSaga } from "./roundUpdate";
import { uiSaga } from "./ui";

export const gameSaga = function* () {
	const action = yield* take<GameConnectedEvent>(gameConnectedEvent.toString());

	yield all([
		call(goToMenuAfterGame),
		call(preventAccidentalClose),
		call(closeShopOnFirstBuySaga),
		call(clickTileSaga),
		call(clickPieceSaga),
		call(roundUpdateSaga),
		call(clientBattleSaga),
		call(uiSaga),
		call(handleQuickChat),
		call(function* () {
			if (action.type === "gameConnectedEvent") {
				const {
					payload: {
						players,
						game: { phase, phaseStartedAtSeconds },
					},
				} = action;
				yield put(PlayerListCommands.updatePlayerListCommand(players));

				if (!phase || !phaseStartedAtSeconds) {
					return;
				}

				const update = { phase, startedAt: phaseStartedAtSeconds };
				yield put(RoundInfoCommands.setRoundInfoCommand(update));
			}
		}),
	]);
};
