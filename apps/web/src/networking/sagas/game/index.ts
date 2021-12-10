import { Socket } from "socket.io-client";
import { take, put, call, all, race } from "redux-saga/effects";
import { GameEvents } from "@creature-chess/gamemode";
import { incomingGameServerToClient } from "./incoming";
import { outgoingGameServerToClient } from "./outgoing";

import { setInGameCommand, updateConnectionStatus } from "../../../game/ui/actions";
import { gameConnectedEvent, GameConnectedEvent } from "../../actions";
import { LobbyEvents } from "../../../lobby";
import { ConnectionStatus } from "../../../game/connection-status";

export const gameNetworking = function*(socket: Socket) {
	yield take<GameConnectedEvent | LobbyEvents.LobbyGameStartedEvent>([gameConnectedEvent.toString(), LobbyEvents.LOBBY_GAME_STARTED_EVENT]);

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
