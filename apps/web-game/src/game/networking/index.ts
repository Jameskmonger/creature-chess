import { Socket } from "socket.io-client";
import { take, put, call, all, race } from "redux-saga/effects";
import { GameEvents } from "@creature-chess/gamemode";
import { incomingGameServerToClient } from "./incoming";
import { outgoingGameServerToClient } from "./outgoing";

import { setInGameCommand, updateConnectionStatus } from "../ui/actions";
import { gameConnectedEvent, GameConnectedEvent, lobbyConnectedEvent, LobbyConnectedEvent } from "../../networking/events";
import { ConnectionStatus } from "../connection-status";

export const gameNetworking = function*(socket: Socket) {
	yield take<GameConnectedEvent | LobbyConnectedEvent>([gameConnectedEvent.toString(), lobbyConnectedEvent.toString()]);

	yield put(setInGameCommand());
	yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

	yield race([
		all([
			call(outgoingGameServerToClient, socket),
			call(incomingGameServerToClient, socket)
		]),
		call(function*() {
			yield take(GameEvents.gameFinishEvent.toString());
		})
	]);

	socket.close();
};
