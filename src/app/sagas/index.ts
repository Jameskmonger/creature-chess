import io = require("socket.io-client");
import { all, fork, take, call, put } from "@redux-saga/core/effects";
import { joinGameAction, joinCompleteAction } from "../actions/lobbyActions";
import { eventChannel } from "redux-saga";
import { sendPacket } from "../actions/networkActions";

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
        socket.on("joinedGame", () => {
            console.log("received joined game");
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
        const { payload } = yield take(sendPacket);
        socket.emit(payload.opcode, payload.data);
    }
};

const handleIO = function*(socket) {
    yield fork(read, socket);
    yield fork(write, socket);
};

const flow = function*() {
    while (true) {
        const { payload } = yield take(joinGameAction);
        const socket = yield call(getSocket);
        console.log("joining with " + payload.name);
        socket.emit("joinGame", { username: payload.name });

        yield fork(handleIO, socket);
    }
};

export const rootSaga = function*() {
    yield fork(flow);
};
