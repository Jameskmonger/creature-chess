import { Action } from "redux";
import { EventChannel, eventChannel } from "redux-saga";
import { put } from "redux-saga/effects";
import { Socket } from "socket.io-client";
import { cancelled, fork, take } from "typed-redux-saga";

import { IncomingRegistry } from "@shoki/networking";

import { LobbyServerToClient } from "@creature-chess/networking";

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

export const lobbyNetworking = function* (
	socket: Socket,
	payload: LobbyServerToClient.LobbyConnectionPacket
) {
	yield put(LobbyCommands.connectToLobby(payload));

	// todo fix typing
	const registry = LobbyServerToClient.incoming(
		(opcode, handler) => socket.on(opcode, handler as any),
		(opcode, handler) => socket.off(opcode, handler as any)
	);

	yield fork(readPacketsToActions, registry);
};
