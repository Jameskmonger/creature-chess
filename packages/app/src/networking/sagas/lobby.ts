import { Action } from "redux";
import { EventChannel, eventChannel } from "redux-saga";
import { put, take, cancelled } from "redux-saga/effects";
import { Socket } from "socket.io-client";
import { ServerToClient } from "@creature-chess/networking";
import { lobbyConnectedEvent, LobbyConnectedEvent } from "../actions";
import { LobbyCommands, LobbyEvents } from "../../lobby";
import { call, race } from "redux-saga/effects";

const readPacketsToActions = function*(registry: ServerToClient.Lobby.IncomingRegistry) {
	let channel: EventChannel<Action>;

	try {
		channel = eventChannel(emit => {
			registry.on(
				ServerToClient.Lobby.PacketOpcodes.LOBBY_PLAYER_UPDATE,
				({ index, player }) => {
					emit(LobbyCommands.updateLobbyPlayerCommand({ index, player }));
				}
			);

			registry.on(
				ServerToClient.Lobby.PacketOpcodes.LOBBY_GAME_STARTED,
				() => {
					emit(LobbyEvents.lobbyGameStartedEvent());
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
		if (yield cancelled()) {
			channel.close();
		}
	}
};

export const lobbyNetworking = function*(
	socket: Socket
) {
	yield take<LobbyConnectedEvent>(lobbyConnectedEvent.toString());

	// todo fix typing
	const registry = ServerToClient.Lobby.createIncomingRegistry((opcode, handler) => socket.on(opcode, handler as any));

	yield race({
		never: call(readPacketsToActions, registry),
		gameStarted: take(LobbyEvents.LOBBY_GAME_STARTED_EVENT)
	});
};
