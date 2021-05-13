import { put, take } from "redux-saga/effects";
import { PlayerStatus } from "@creature-chess/models";
import { quitGamePlayerAction, QuitGamePlayerAction } from "../playerGameActions";
import { PlayerInfoCommands } from "../playerInfo";

export const setStatusOnQuit = function*() {
	yield take<QuitGamePlayerAction>(quitGamePlayerAction.toString());
	yield put(PlayerInfoCommands.updateStatusCommand({ status: PlayerStatus.QUIT }));
};
