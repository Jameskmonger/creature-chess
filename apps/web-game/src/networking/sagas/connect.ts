import { eventChannel } from "redux-saga";
import { all, call, put, take } from "typed-redux-saga";
import { Socket } from "socket.io-client";
import { LobbyServerToClient, GameServerToClient } from "@creature-chess/networking";
import { lobbyConnectedEvent, gameConnectedEvent } from "../actions";
import { getSocket } from "../socket";
import { networkingSaga } from "./networkingSaga";
import { LobbyCommands } from "../../lobby";
import { createAction } from "@reduxjs/toolkit";

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

type OpenConnectionAction = { idToken: string };
export const openConnection = createAction<OpenConnectionAction>("openConnection");

export const connect = function*() {
	const { idToken } = yield* take<OpenConnectionAction>(openConnection.toString() as any);

	let socket: Socket;

	try {
		console.log("Attempting to connect");
		socket = yield* call(getSocket, idToken);
	} catch (error) {
		console.error("error getting socket", error);
		return;
	}

	const connection = yield* call(listenForConnection, socket);

	yield* all([
		call(networkingSaga, socket),
		call(function*() {
			if (connection.type === "lobby") {
				yield put(lobbyConnectedEvent(connection.payload));
				yield put(LobbyCommands.setLobbyDetailsCommand(connection.payload));
			} else if (connection.type === "game") {
				yield put(gameConnectedEvent(connection.payload));
			}
		})
	]);
};
