import { eventChannel } from "redux-saga";
import { all, call, put, take } from "typed-redux-saga";
import { createAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { LobbyServerToClient, GameServerToClient } from "@creature-chess/networking";
import { lobbyNetworking } from "../lobby";
import { gameNetworking } from "../game";
import { lobbyConnectedEvent, gameConnectedEvent } from "./events";
import { getSocket } from "./socket";

type ConnectionResult = {
	type: "lobby";
	payload: LobbyServerToClient.LobbyConnectionPacket;
} | {
	type: "game";
	payload: GameServerToClient.GameConnectionPacket;
};

const listenForConnection = function*(socket: Socket) {
	const channel = eventChannel<ConnectionResult>(emit => {
		const onLobbyConnected = (payload: LobbyServerToClient.LobbyConnectionPacket) => {
			emit({ type: "lobby", payload });
		};
		const onGameConnected = (payload: GameServerToClient.GameConnectionPacket) => {
			emit({ type: "game", payload });
		};

		socket.on("connected", onLobbyConnected);
		socket.on("gameConnected", onGameConnected);

		return () => {
			socket.off("connected", onLobbyConnected);
			socket.off("gameConnected", onGameConnected);
		};
	});

	const connection = yield* take(channel);

	channel.close();

	return connection;
};

type OpenConnectionAction = ReturnType<typeof openConnection>;
export const openConnection = createAction<{ idToken: string }>("openConnection");

export const networkingSaga = function*() {
	const { payload: { idToken } } = yield* take<OpenConnectionAction>(openConnection.toString() as any);

	let socket: Socket;

	try {
		socket = yield* call(getSocket, idToken);
	} catch (error) {
		console.error("error getting socket", error);
		return;
	}

	const connection = yield* call(listenForConnection, socket);

	yield* all([
		call(lobbyNetworking, socket),
		call(gameNetworking, socket),
		call(function*() {
			if (connection.type === "lobby") {
				yield put(lobbyConnectedEvent(connection.payload));
			} else if (connection.type === "game") {
				yield put(gameConnectedEvent(connection.payload));
			}
		})
	]);
};
