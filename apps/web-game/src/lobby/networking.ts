import { Action } from "redux";
import { EventChannel, eventChannel } from "redux-saga";
import { put, take } from "redux-saga/effects";
import { Socket } from "socket.io-client";
import { IncomingRegistry } from "@shoki/networking";
import { LobbyServerToClient } from "@creature-chess/networking";
import { gameConnectedEvent, lobbyConnectedEvent, LobbyConnectedEvent } from "../networking/events";
import { call, race } from "redux-saga/effects";
import { cancelled } from "typed-redux-saga";
import { LobbyCommands } from "./state";
import { GameConnectionPacket } from "@creature-chess/networking/src/server-to-client/server-to-client-game";

const readPacketsToActions = function*(registry: IncomingRegistry<LobbyServerToClient.PacketSet>) {
	let channel: EventChannel<Action>;

	try {
		channel = eventChannel(emit => {
			registry.on(
				"lobbyUpdate",
				({ players }) => {
					emit(LobbyCommands.updatePlayers({ players }));
				}
			);

			// todo move this
			registry.on(
				"gameConnected" as any,
				(packet: GameConnectionPacket) => {
					emit(gameConnectedEvent(packet));
				}
			);

			// tslint:disable-next-line:no-empty
			return () => {
				// todo registry.off or registry.close
			};
		});

		while (true) {
			const action = yield take(channel);

			yield put(action);
		}
	} finally {
		if (yield* cancelled()) {
			channel.close();
		}
	}
};

export const lobbyNetworking = function*(
	socket: Socket
) {
	const event: LobbyConnectedEvent = yield take<LobbyConnectedEvent>(lobbyConnectedEvent.toString());

	yield put(LobbyCommands.connectToLobby(event.payload));

	// todo fix typing
	const registry = LobbyServerToClient.incoming(
		(opcode, handler) => socket.on(opcode, handler as any),
		(opcode, handler) => socket.off(opcode, handler as any)
	);

	const runForever = call(readPacketsToActions, registry);
	const connectedToGame = take(gameConnectedEvent.toString());

	const result = yield race({
		runForever,
		connectedToGame
	});

	if (result.connectedToGame) {
		yield put(result.connectedToGame);
	}
};
