import { Socket } from "socket.io-client";
import { call, takeEvery, all } from "redux-saga/effects";
import { OutgoingPacketRegistry, ClientToServer, emitActionsSaga } from "@creature-chess/networking";
import { BattleEvents } from "@creature-chess/battle";
import { PlayerActionTypesArray } from "@creature-chess/gamemode";

type ClientToServerPacketRegsitry = OutgoingPacketRegistry<ClientToServer.PacketDefinitions, ClientToServer.PacketAcknowledgements>;

const writeActionsToPackets = function*(registry: ClientToServerPacketRegsitry) {
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
	const registry = new OutgoingPacketRegistry<ClientToServer.PacketDefinitions, ClientToServer.PacketAcknowledgements>(
		(opcode, payload, ack) => socket.emit(opcode, payload, ack)
	);

	yield call(writeActionsToPackets, registry);
};
