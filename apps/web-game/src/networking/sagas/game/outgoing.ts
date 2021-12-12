import { Socket } from "socket.io-client";
import { call, takeEvery, all } from "redux-saga/effects";
import { ActionStream, OutgoingRegistry } from "@shoki/networking";
import { ClientToServer } from "@creature-chess/networking";
import { BattleEvents } from "@creature-chess/battle";
import { PlayerActionTypesArray } from "@creature-chess/gamemode";

const writeActionsToPackets = function*(registry: OutgoingRegistry<ClientToServer.PacketSet>) {
	yield all([
		takeEvery(
			BattleEvents.BATTLE_FINISH_EVENT,
			function*() {
				registry.send("finishMatch", { empty: true });
			}
		),
		call(
			ActionStream.outgoingSaga<ClientToServer.PacketSet, "sendPlayerActions">(
				registry,
				"sendPlayerActions",
				PlayerActionTypesArray
			)
		)
	]);
};

export const outgoingGameServerToClient = function*(socket: Socket) {
	const registry = ClientToServer.outgoing(
		(opcode, payload, ack) => socket.emit(opcode, payload, ack)
	);

	yield call(writeActionsToPackets, registry);
};
