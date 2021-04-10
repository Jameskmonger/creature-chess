import { takeEvery, take, all, fork } from "@redux-saga/core/effects";
import {
    ClientToServerPacketAcknowledgements, ClientToServerPacketDefinitions, ClientToServerPacketOpcodes, OutgoingPacketRegistry,
    PlayerActions, SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS
} from "@creature-chess/shared";

import { BattleEvents } from "@creature-chess/battle";

type ClientToServerPacketRegsitry = OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>;

const sendPlayerActions = function*(registry: ClientToServerPacketRegsitry) {
    let lastSentIndex = 0;

    while (true) {
        const action: PlayerActions.PlayerAction = yield take(PlayerActions.PlayerActionTypesArray);

        const index = ++lastSentIndex;

        registry.emit(ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS, { index, actions: [ action ] });
    }
};

const writeActionsToPackets = function*(registry: ClientToServerPacketRegsitry) {
    yield all([
        takeEvery(
            BattleEvents.BATTLE_FINISH_EVENT,
            function*() {
                registry.emit(ClientToServerPacketOpcodes.FINISH_MATCH, { empty: true });
            }
        ),
        yield fork(sendPlayerActions, registry)
    ]);
};

export const outgoingGameNetworking = function*(socket: SocketIOClient.Socket) {
    const registry = new OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>(
        (opcode, payload, ack) => socket.emit(opcode, payload, ack)
    );

    yield fork(writeActionsToPackets, registry);
};
