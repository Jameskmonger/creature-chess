import { take, put, fork } from "@redux-saga/core/effects";
import { ConnectionStatus } from "@creature-chess/shared";
import { BoardSlice } from "@creature-chess/board";
import { incomingGameNetworking } from "./incoming";
import { outgoingGameNetworking } from "./outgoing";

import { updateConnectionStatus} from "../../../ui/actions";
import { GameConnectedEvent, GAME_CONNECTED_EVENT } from "../../actions";
import { LobbyGameStartedEvent, LOBBY_GAME_STARTED_EVENT } from "../../../lobby/store/actions";

export const gameNetworking = function*(socket: SocketIOClient.Socket, slices: { benchSlice: BoardSlice, boardSlice: BoardSlice }) {
    yield take<GameConnectedEvent | LobbyGameStartedEvent>([ GAME_CONNECTED_EVENT, LOBBY_GAME_STARTED_EVENT ]);

    yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

    yield fork(outgoingGameNetworking, socket);
    yield fork(incomingGameNetworking, socket, slices);
};
