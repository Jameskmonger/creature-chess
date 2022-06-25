import { put, take } from "redux-saga/effects";

import { PlayerStatus } from "@creature-chess/models";

import {
	quitGamePlayerAction,
	QuitGamePlayerAction,
} from "../../../playerActions";
import { updateStatusCommand } from "../state/commands";

export const setStatusOnQuit = function* () {
	yield take<QuitGamePlayerAction>(quitGamePlayerAction.toString());
	yield put(updateStatusCommand(PlayerStatus.QUIT));
};
