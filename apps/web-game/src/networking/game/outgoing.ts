import { call, takeEvery, all, put, delay } from "redux-saga/effects";
import { Socket } from "socket.io-client";
import { setPing } from "~/store/game/network";

import {
	ActionStream,
	OutgoingRegistry,
	ResponseAction,
} from "@shoki/networking";

import { BattleEvents } from "@creature-chess/battle";
import { PlayerActionTypesArray } from "@creature-chess/gamemode";
import { ClientToServer, pingAction } from "@creature-chess/networking";

const writeActionsToPackets = function* (
	registry: OutgoingRegistry<ClientToServer.PacketSet>
) {
	yield all([
		takeEvery(BattleEvents.battleFinishEvent, function* () {
			registry.send("finishMatch", { empty: true });
		}),
		call(
			ActionStream.outgoingSaga<ClientToServer.PacketSet, "sendPlayerActions">(
				registry,
				"sendPlayerActions",
				PlayerActionTypesArray
			)
		),
		takeEvery("response", function* (action: ResponseAction) {
			yield put(setPing(action.payload.pingMs));
		}),
		call(
			ActionStream.outgoingSaga<ClientToServer.PacketSet, "ping">(
				registry,
				"ping",
				["ping"]
			)
		),
		call(function* () {
			while (true) {
				yield delay(2500);
				yield put(pingAction());
			}
		}),
	]);
};

export const outgoingGameServerToClient = function* (socket: Socket) {
	const registry = ClientToServer.outgoing((opcode, payload, ack) =>
		socket.emit(opcode, payload, ack)
	);

	yield call(writeActionsToPackets, registry);
};
