import { all, call } from "redux-saga/effects";
import { put } from "typed-redux-saga";

import { RoundInfoCommands } from "@creature-chess/gamemode";
import { GameServerToClient } from "@creature-chess/networking";

import { clickPieceSaga, clickTileSaga } from "../board";
import { PlayerListCommands, closeShopOnFirstBuySaga } from "../module";
import { handleQuickChat } from "../module/chat/sagas";
import { SettingsCommands } from "../module/settings";
import { clientBattleSaga } from "./battle";
import { goToMenuAfterGame } from "./goToMenuAfterGame";
import { preventAccidentalClose } from "./preventAccidentalClose";
import { roundUpdateSaga } from "./roundUpdate";
import { uiSaga } from "./ui";

export const gameSaga = function* (
	payload: GameServerToClient.GameConnectionPacket
) {
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
			const {
				players,
				game: { phase, phaseStartedAtSeconds },
				settings,
			} = payload;
			yield put(PlayerListCommands.updatePlayerListCommand(players));

			const update = { phase, startedAt: phaseStartedAtSeconds };
			yield put(RoundInfoCommands.setRoundInfoCommand(update));

			yield put(SettingsCommands.setSettingsCommand(settings));
		}),
	]);
};
