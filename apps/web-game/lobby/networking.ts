import { Action } from "redux";
import { EventChannel, eventChannel } from "redux-saga";
import { put } from "redux-saga/effects";
import { call } from "redux-saga/effects";
import { Socket } from "socket.io-client";
import { cancelled, race, take } from "typed-redux-saga";

import { IncomingRegistry } from "@shoki/networking";

import {
	GameServerToClient,
	LobbyServerToClient,
} from "@creature-chess/networking";

import {
	gameConnectedEvent,
	lobbyConnectedEvent,
	LobbyConnectedEvent,
} from "../src/networking/events";
import { LobbyCommands } from "./state";

const readPacketsToActions = function* (
	registry: IncomingRegistry<LobbyServerToClient.PacketSet>
) {
	let channel: EventChannel<Action> | null = null;

	try {
		channel = eventChannel((emit) => {
			registry.on("lobbyUpdate", ({ players }) => {
				emit(LobbyCommands.updatePlayers({ players }));
			});

			// todo move this
			registry.on(
				"gameConnected" as any,
				(packet: GameServerToClient.GameConnectionPacket) => {
					emit(gameConnectedEvent(packet));
				}
			);

			// tslint:disable-next-line:no-empty
			return () => {
				// todo registry.off or registry.close
			};
		});

		while (true) {
			const action = yield* take(channel);

			yield put(action);
		}
	} finally {
		if (yield* cancelled()) {
			channel?.close();
		}
	}
};

export const lobbyNetworking = function* (socket: Socket) {
	const event: LobbyConnectedEvent = yield take<LobbyConnectedEvent>(
		lobbyConnectedEvent.toString()
	);

	yield put(LobbyCommands.connectToLobby(event.payload));

	// todo fix typing
	const registry = LobbyServerToClient.incoming(
		(opcode, handler) => socket.on(opcode, handler as any),
		(opcode, handler) => socket.off(opcode, handler as any)
	);

	const runForever = call(readPacketsToActions, registry);
	const connectedToGame = take(gameConnectedEvent.toString());

	const result = yield* race({
		runForever,
		connectedToGame,
	});

	if (result.connectedToGame) {
		yield put(result.connectedToGame as unknown as Action<any>);
	}
};