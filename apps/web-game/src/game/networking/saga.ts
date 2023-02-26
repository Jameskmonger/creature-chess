import { take, put, call, all, race } from "redux-saga/effects";
import { Socket } from "socket.io-client";

import { GameEvents } from "@creature-chess/gamemode";

import {
	gameConnectedEvent,
	GameConnectedEvent,
} from "../../networking/events";
import { ConnectionStatus } from "../connection-status";
import { setInGameCommand, updateConnectionStatus } from "../ui/actions";
import { incomingGameServerToClient } from "./incoming";
import { outgoingGameServerToClient } from "./outgoing";

export const gameNetworking = function* (socket: Socket) {
	yield take<GameConnectedEvent>(gameConnectedEvent.toString());

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