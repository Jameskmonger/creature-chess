import { Socket } from "socket.io-client";
import { call, takeEvery, all } from "redux-saga/effects";
import { emitActionsSaga } from "@shoki/networking";
import { ClientToServer } from "@creature-chess/networking";
import { BattleEvents } from "@creature-chess/battle";
import { PlayerActionTypesArray } from "@creature-chess/gamemode";

const writeActionsToPackets = function*(registry: ClientToServer.OutgoingRegistry) {
	yield all([
		takeEvery(
			BattleEvents.BATTLE_FINISH_EVENT,
			function*() {
				registry.emit(ClientToServer.PacketOpcodes.FINISH_MATCH, { empty: true });
			}
		),
		call(emitActionsSaga, registry, PlayerActionTypesArray)
	]);
};

export const outgoingGameNetworking = function*(socket: Socket) {
	const registry = ClientToServer.createOutgoingRegistry(
		(opcode, payload, ack) => socket.emit(opcode, payload, ack)
	);

	yield call(writeActionsToPackets, registry);
};
