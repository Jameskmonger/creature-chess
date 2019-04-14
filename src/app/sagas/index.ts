import io = require("socket.io-client");
import { fork, take, call, put } from "@redux-saga/core/effects";
import { joinCompleteAction } from "../actions/lobbyActions";
import { eventChannel } from "redux-saga";
import { ClientToServerPacketOpcodes, ServerToClientPacketOpcodes } from "../../shared/packet-opcodes";
import { SEND_PACKET } from "../actiontypes/networkActionTypes";
import { JOIN_GAME } from "../actiontypes/lobbyActionTypes";

const getSocket = () => {
    const socket = io("http://localhost:3000");

    return new Promise<SocketIOClient.Socket>(resolve => {
        socket.on("connect", () => {
            resolve(socket);
        });
    });
};

const subscribe = (socket: SocketIOClient.Socket) => {
    return eventChannel(emit => {
        socket.on(ServerToClientPacketOpcodes.JOINED_GAME, () => {
            emit(joinCompleteAction());
        });

        // tslint:disable-next-line:no-empty
        return () => { };
    });
};

const read = function*(socket) {
    const channel = yield call(subscribe, socket);
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
};

const write = function*(socket) {
    while (true) {
        const { payload } = yield take(SEND_PACKET);
        socket.emit(payload.opcode, payload.data);
    }
};

const handleIO = function*(socket) {
    yield fork(read, socket);
    yield fork(write, socket);
};

const flow = function*() {
    while (true) {
        const { payload } = yield take(JOIN_GAME);
        const socket = yield call(getSocket);

        socket.emit(ClientToServerPacketOpcodes.JOIN_GAME, payload.name);

        yield fork(handleIO, socket);
    }
};

export const rootSaga = function*() {
    yield fork(flow);
};
