import { put, take } from "redux-saga/effects";
import { PlayerStatus } from "@creature-chess/models";
import { quitGamePlayerAction, QuitGamePlayerAction } from "../../../playerActions";
import { PlayerInfoCommands } from "../../../player";

export const setStatusOnQuit = function*() {
	yield take<QuitGamePlayerAction>(quitGamePlayerAction.toString());
	yield put(PlayerInfoCommands.updateStatusCommand({ status: PlayerStatus.QUIT }));
};
