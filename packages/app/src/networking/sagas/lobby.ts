import { Action } from "redux";
import { put, fork, take, cancel, cancelled } from "@redux-saga/core/effects";
import { EventChannel, eventChannel } from "redux-saga";
import { IncomingPacketRegistry, ServerToClient } from "@creature-chess/networking";
import { lobbyConnectedEvent, LobbyConnectedEvent } from "../actions";
import { LobbyCommands, LobbyEvents } from "../../lobby";

type ServerToClientLobbyPacketRegistry = IncomingPacketRegistry<ServerToClient.Lobby.PacketDefinitions, ServerToClient.Lobby.PacketAcknowledgements>;

const readPacketsToActions = function*(registry: ServerToClientLobbyPacketRegistry) {
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
	socket: SocketIOClient.Socket
) {
	yield take<LobbyConnectedEvent>(lobbyConnectedEvent.toString());

	const registry = new IncomingPacketRegistry<ServerToClient.Lobby.PacketDefinitions, ServerToClient.Lobby.PacketAcknowledgements>(
		(opcode, handler) => socket.on(opcode, handler)
	);

	const readPacketsTask = yield fork(readPacketsToActions, registry);

	yield take(LobbyEvents.LOBBY_GAME_STARTED_EVENT);

	yield cancel(readPacketsTask);
};
