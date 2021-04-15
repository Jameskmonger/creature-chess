import { take, put, fork } from "@redux-saga/core/effects";
import { BoardSlice } from "@creature-chess/board";
import { incomingGameNetworking } from "./incoming";
import { outgoingGameNetworking } from "./outgoing";

import { updateConnectionStatus } from "../../../ui/actions";
import { GameConnectedEvent, GAME_CONNECTED_EVENT } from "../../actions";
import { LobbyEvents } from "../../../lobby";
import { ConnectionStatus } from "../../../game/connection-status";

export const gameNetworking = function*(socket: SocketIOClient.Socket, slices: { benchSlice: BoardSlice, boardSlice: BoardSlice }) {
    yield take<GameConnectedEvent | LobbyEvents.LobbyGameStartedEvent>([ GAME_CONNECTED_EVENT, LobbyEvents.LOBBY_GAME_STARTED_EVENT ]);

    yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

    yield fork(outgoingGameNetworking, socket);
    yield fork(incomingGameNetworking, socket, slices);
};
