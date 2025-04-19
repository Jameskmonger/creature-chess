import { all, call } from "redux-saga/effects";
import { put } from "typed-redux-saga";

import { BoardSlice } from "@shoki/board";

import { RoundInfoCommands } from "@creature-chess/gamemode";
import { PieceModel } from "@creature-chess/models";
import { GameServerToClient } from "@creature-chess/networking";

import { ConnectionStatus } from "../networking/connection-status";
import { PlayerListCommands } from "../store/game/playerList/state";
import { SettingsCommands } from "../store/game/settings/state";
import {
	setInGameCommand,
	updateConnectionStatus,
} from "../store/game/ui/actions";
import { clientBattleSaga } from "./battle";
import { clickPieceSaga } from "./board/clickPieceSaga";
import { clickTileSaga } from "./board/clickTileSaga";
import { handleQuickChat } from "./chat/quickChat";
import { closeShopOnFirstBuySaga } from "./closeShopOnFirstBuySaga";
import { goToMenuAfterGame } from "./goToMenuAfterGame";
import { preventAccidentalClose } from "./preventAccidentalClose";
import { roundUpdateSaga } from "./roundUpdate";
import { uiSaga } from "./ui";

export const gameSaga = function* (
	payload: GameServerToClient.GameConnectionPacket,
	slices: {
		boardSlice: BoardSlice<PieceModel>;
		benchSlice: BoardSlice<PieceModel>;
	}
) {
	const {
		players,
		game: { phase, phaseStartedAtSeconds },
		settings,
	} = payload;
	yield put(PlayerListCommands.updatePlayerListCommand(players));

	const update = { phase, startedAt: phaseStartedAtSeconds };
	yield put(RoundInfoCommands.setRoundInfoCommand(update));

	yield put(SettingsCommands.setSettingsCommand(settings));

	yield put(
		slices.benchSlice.commands.setBoardSizeCommand({
			width: settings.benchSize,
			height: 1,
		})
	);

	yield put(
		slices.boardSlice.commands.setBoardSizeCommand({
			width: settings.boardWidth,
			height: settings.boardHalfHeight,
		})
	);

	yield put(setInGameCommand());
	yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

	// everything is initialized, so start the client's "game loop"

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
	]);
};
