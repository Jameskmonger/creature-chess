import { put, fork } from "@redux-saga/core/effects";
import { ConnectionStatus, BoardSlice } from "@creature-chess/shared";
import { updateConnectionStatus} from "../../../ui/actions";
import { incomingGameNetworking } from "./incoming";
import { outgoingGameNetworking } from "./outgoing";

export const gameNetworking = function*(socket: SocketIOClient.Socket, slices: { benchSlice: BoardSlice, boardSlice: BoardSlice }) {
    yield put(updateConnectionStatus(ConnectionStatus.CONNECTED));

    yield fork(outgoingGameNetworking, socket);
    yield fork(incomingGameNetworking, socket, slices);
};
