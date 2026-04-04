import { all, call, takeEvery } from "redux-saga/effects";

import {
	GameEvents,
	PlayerCommands,
	PlayerEvents,
} from "@creature-chess/gamemode";

import { getPlayerSocket } from "../registries";
import { sendInitialState } from "./initialState";

export const outgoingNetworking = function* () {
	const socket = yield* getPlayerSocket();

	yield all([
		call(sendInitialState),

		takeEvery(
			GameEvents.GameEventActionTypesArray,
			function* (action) {
				socket.emit("sendGameEvents", action);
			}
		),

		takeEvery(
			PlayerEvents.PlayerEventActionTypesArray,
			function* (action) {
				socket.emit("sendLocalPlayerEvents", action);
			}
		),

		takeEvery(
			PlayerCommands.PlayerInfoUpdateCommandActionTypesArray,
			function* (action) {
				socket.emit("playerInfoUpdates", action);
			}
		),
	]);
};
