import { put, take } from "redux-saga/effects";

import { PlayerStatus } from "@creature-chess/models/game/playerList";

import {
	quitGamePlayerAction,
	QuitGamePlayerAction,
} from "../../../playerActions";
import { playerInfoCommands } from "../state/commands";

export const setStatusOnQuit = function* () {
	yield take<QuitGamePlayerAction>(quitGamePlayerAction.toString());
	yield put(playerInfoCommands.updateStatusCommand(PlayerStatus.QUIT));
};
