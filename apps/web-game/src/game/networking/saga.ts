import { take, put, call, all, race } from "redux-saga/effects";
import { Socket } from "socket.io-client";

import { GameEvents } from "@creature-chess/gamemode";
import { GameServerToClient } from "@creature-chess/networking";

import { ConnectionStatus } from "../connection-status";
import { setInGameCommand, updateConnectionStatus } from "../ui/actions";
import { incomingGameServerToClient } from "./incoming";
import { outgoingGameServerToClient } from "./outgoing";

export const gameNetworking = function* (
	socket: Socket,
	payload: GameServerToClient.GameConnectionPacket
) {
	yield put(setInGameCommand());
	yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

	yield race([
		all([
			call(outgoingGameServerToClient, socket),
			call(incomingGameServerToClient, socket),
		]),
		call(function* () {
			yield take(GameEvents.gameFinishEvent.toString());
		}),
	]);

	socket.close();
};
