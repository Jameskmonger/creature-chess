import { Action } from "@reduxjs/toolkit";
import { EventChannel, eventChannel } from "redux-saga";
import { put } from "redux-saga/effects";
import { Socket } from "socket.io-client";
import { all, call, cancelled, take, takeEvery } from "typed-redux-saga";

import { IncomingRegistry, OutgoingRegistry } from "@shoki/networking";

import {
	LobbyServerToClient,
	LobbyClientToServer,
} from "@creature-chess/networking";

import {
	lobbyStartNowEvent,
	lobbyUpdateSettingEvent,
} from "../../store/lobby/actions";
import { LobbyCommands } from "../../store/lobby/state";

const readPacketsToActions = function* (
	registry: IncomingRegistry<LobbyServerToClient.PacketSet>
) {
	let channel: EventChannel<Action> | null = null;

	try {
		channel = eventChannel((emit) => {
			registry.on("lobbyUpdate", ({ players }) => {
				emit(LobbyCommands.updatePlayers({ players }));
			});

			registry.on("settingsUpdate", ({ settings }) => {
				emit(LobbyCommands.updateSettings({ settings }));
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

const writeActionsToPackets = function* (
	registry: OutgoingRegistry<LobbyClientToServer.PacketSet>
) {
	yield all([
		takeEvery(lobbyStartNowEvent, function* () {
			registry.send("startNow", { empty: true });
		}),
		takeEvery(lobbyUpdateSettingEvent, function* (action) {
			registry.send("updateSetting", {
				key: action.payload.key,
				value: action.payload.value,
			});
		}),
	]);
};

export const lobbyNetworking = function* (
	socket: Socket,
	payload: LobbyServerToClient.LobbyConnectionPacket
) {
	yield put(LobbyCommands.connectToLobby(payload));

	const incomingRegistry = LobbyServerToClient.incoming(
		(opcode, handler) => socket.on(opcode, handler as any),
		(opcode, handler) => socket.off(opcode, handler as any)
	);
	const outgoingRegistry = LobbyClientToServer.outgoing(
		(opcode, outgoingPayload, ack) => socket.emit(opcode, outgoingPayload, ack)
	);

	yield all([
		call(readPacketsToActions, incomingRegistry),
		call(writeActionsToPackets, outgoingRegistry),
	]);
};
