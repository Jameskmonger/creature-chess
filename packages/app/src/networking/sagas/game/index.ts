import { Socket } from "socket.io-client";
import { take, put, call, all } from "redux-saga/effects";
import { BoardSlice } from "@shoki/board";
import { incomingGameNetworking } from "./incoming";
import { outgoingGameNetworking } from "./outgoing";

import { updateConnectionStatus } from "../../../game/ui/actions";
import { gameConnectedEvent, GameConnectedEvent } from "../../actions";
import { LobbyEvents } from "../../../lobby";
import { ConnectionStatus } from "../../../game/connection-status";

export const gameNetworking = function*(socket: Socket, slices: { benchSlice: BoardSlice; boardSlice: BoardSlice }) {
	yield take<GameConnectedEvent | LobbyEvents.LobbyGameStartedEvent>([gameConnectedEvent.toString(), LobbyEvents.LOBBY_GAME_STARTED_EVENT]);

	yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

	yield all([
		call(outgoingGameNetworking, socket),
		call(incomingGameNetworking, socket, slices)
	]);
};
