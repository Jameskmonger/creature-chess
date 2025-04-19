import { createAction } from "@reduxjs/toolkit";
import { eventChannel } from "redux-saga";
import { Socket } from "socket.io-client";
import { all, call, cancel, fork, put, take } from "typed-redux-saga";

import { BoardSlice } from "@shoki/board";

import { PieceModel } from "@creature-chess/models";
import {
	LobbyServerToClient,
	GameServerToClient,
} from "@creature-chess/networking";
import { HandshakeRequest } from "@creature-chess/networking/handshake";

import { gameSaga } from "../sagas";
import { MenuCommands } from "../store/menu/state";
import { getCookieValue } from "../utils/getCookieValue";
import { gameNetworking } from "./game";
import { lobbyNetworking } from "./lobby/networking";
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

type BoardSlices = {
	boardSlice: BoardSlice<PieceModel>;
	benchSlice: BoardSlice<PieceModel>;
};

const listenForConnection = function* (socket: Socket, slices: BoardSlices) {
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
				call(gameSaga, connection.payload, slices),
			]);
		}
	}
};

async function getGuestSession() {
	const response = await fetch(APP_API_URL + "/guest/session", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		return null;
	}

	const { id } = await response.json();

	return id as string;
}

// todo: add auth0 back ?
export const openConnection = createAction("openConnection");

export const networkingSaga = function* (slices: BoardSlices) {
	yield* take(openConnection.toString());

	yield put(MenuCommands.setLoadingMessage("Connecting..."));

	yield put(MenuCommands.setLoadingMessage("Opening guest session..."));

	const session = yield* call(getGuestSession);
	const token = getCookieValue("guest-token");

	if (!session) {
		yield put(MenuCommands.setLoadingMessage("ERROR: Failed to open session!"));
		return;
	}

	if (!token) {
		yield put(MenuCommands.setLoadingMessage("ERROR: No guest token!"));
		return;
	}

	let socket: Socket;

	const request: HandshakeRequest = {
		type: "guest",
		data: {
			accessToken: token,
		},
	};

	try {
		console.log("Getting socket");
		socket = yield* call(getSocket, request);
	} catch (error) {
		console.error("error getting socket", error);
		return;
	}

	console.log("Listening for connection");
	yield* call(listenForConnection, socket, slices);
};
