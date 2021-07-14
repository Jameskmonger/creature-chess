import { Socket } from "socket.io-client";
import { all, call } from "redux-saga/effects";
import { lobbyNetworking } from "./lobby";
import { gameNetworking } from "./game";

export const networkingSaga = function*(
	socket: Socket,
) {
	yield all([
		call(lobbyNetworking, socket),
		call(gameNetworking, socket)
	]);
};
