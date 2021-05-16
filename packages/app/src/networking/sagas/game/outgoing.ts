import { Socket } from "socket.io-client";
import { call, takeEvery, take, all } from "redux-saga/effects";
import { OutgoingPacketRegistry, ClientToServer } from "@creature-chess/networking";
import { BattleEvents } from "@creature-chess/battle";
import { PlayerAction, PlayerActionTypesArray } from "@creature-chess/gamemode";

type ClientToServerPacketRegsitry = OutgoingPacketRegistry<ClientToServer.PacketDefinitions, ClientToServer.PacketAcknowledgements>;

const sendPlayerActions = function*(registry: ClientToServerPacketRegsitry) {
	let lastSentIndex = 0;

	while (true) {
		const action: PlayerAction = yield take(PlayerActionTypesArray);

		const index = ++lastSentIndex;

		registry.emit(ClientToServer.PacketOpcodes.SEND_PLAYER_ACTIONS, { index, actions: [action] });
	}
};

const writeActionsToPackets = function*(registry: ClientToServerPacketRegsitry) {
	yield all([
		takeEvery(
			BattleEvents.BATTLE_FINISH_EVENT,
			function*() {
				registry.emit(ClientToServer.PacketOpcodes.FINISH_MATCH, { empty: true });
			}
		),
		call(sendPlayerActions, registry)
	]);
};

export const outgoingGameNetworking = function*(socket: Socket) {
	const registry = new OutgoingPacketRegistry<ClientToServer.PacketDefinitions, ClientToServer.PacketAcknowledgements>(
		(opcode, payload, ack) => socket.emit(opcode, payload, ack)
	);

	yield call(writeActionsToPackets, registry);
};
