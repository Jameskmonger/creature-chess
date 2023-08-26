import { createAction } from "@reduxjs/toolkit";
import { eventChannel } from "redux-saga";
import { Socket } from "socket.io-client";
import { all, call, cancel, fork, take } from "typed-redux-saga";

import {
	LobbyServerToClient,
	GameServerToClient,
} from "@creature-chess/networking";
import { HandshakeRequest } from "@creature-chess/networking/handshake";

import { lobbyNetworking } from "../../lobby";
import { gameNetworking, gameSaga } from "../game";
import { getSocket } from "./socket";

type ConnectionResult =
	| {
			type: "lobby";
			payload: LobbyServerToClient.LobbyConnectionPacket;
	  }
	| {
			type: "game";
			payload: GameServerToClient.GameConnectionPacket;
	  };

const listenForConnection = function* (socket: Socket) {
	const channel = eventChannel<ConnectionResult>((emit) => {
		const onLobbyConnected = (
			payload: LobbyServerToClient.LobbyConnectionPacket
		) => {
			console.log("Lobby connected");
			emit({ type: "lobby", payload });
		};
		const onGameConnected = (
			payload: GameServerToClient.GameConnectionPacket
		) => {
			console.log("Game connected");
			emit({ type: "game", payload });
		};

		socket.on("connected", onLobbyConnected);
		socket.on("gameConnected", onGameConnected);

		return () => {
			console.log("Cleaning up listeners");
			socket.off("connected", onLobbyConnected);
			socket.off("gameConnected", onGameConnected);
		};
	});

	let lobbyTask;

	while (true) {
		const connection = yield* take(channel);
		if (connection.type === "lobby") {
			lobbyTask = yield* fork(lobbyNetworking, socket, connection.payload);
		} else if (connection.type === "game") {
			if (lobbyTask) {
				yield cancel(lobbyTask); // Cancel the lobby networking task
			}
			yield all([
				call(gameNetworking, socket, connection.payload),
				call(gameSaga, connection.payload),
			]);
		}
	}
};

type OpenConnectionAction = ReturnType<typeof openConnection>;
export const openConnection = createAction<HandshakeRequest>("openConnection");

export const networkingSaga = function* () {
	const { payload: request } = yield* take<OpenConnectionAction>(
		openConnection.toString() as any
	);

	let socket: Socket;

	try {
		console.log("Getting socket");
		socket = yield* call(getSocket, request);
	} catch (error) {
		console.error("error getting socket", error);
		return;
	}

	console.log("Listening for connection");
	yield* call(listenForConnection, socket);
};
