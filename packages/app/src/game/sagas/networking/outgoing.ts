import { takeEvery, all, fork } from "@redux-saga/core/effects";
import {
    BATTLE_FINISH_EVENT,
    ClientToServerPacketAcknowledgements, ClientToServerPacketDefinitions, ClientToServerPacketOpcodes, OutgoingPacketRegistry,
    PlayerActions, SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS
} from "@creature-chess/shared";

type ClientToServerPacketRegsitry = OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>;

const sendPlayerActions = function*(registry: ClientToServerPacketRegsitry) {
    let transmissionInProgress = false;
    let actionPacketIndex = 0;
    let pendingActions: PlayerActions.PlayerAction[] = [];

    const emitPendingActions = () => {
        // if there's a transmission in progress then wait
        if (transmissionInProgress) {
            return;
        }

        if (pendingActions.length === 0) {
            return;
        }

        transmissionInProgress = true;
        const index = ++actionPacketIndex;
        const actions = [...pendingActions];
        pendingActions = [];

        let timeout: number;

        const sendPacket = () => {
            registry.emit(
                ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS,
                { index, actions },
                (accepted, packetIndex) => {
                    // if packet was not accepted, let's finish here
                    if (!accepted) {
                        return;
                    }

                    // if indices don't match, something weird must have happened.
                    // stop here for safety, but it shouldn't happen
                    if (packetIndex !== index) {
                        return;
                    }

                    // if the action just acknowledged isn't the most recent action, then stop -
                    // we must have already processed this acknowledgement in another flow
                    if (actionPacketIndex !== index) {
                        return;
                    }

                    // close the transmission
                    transmissionInProgress = false;
                    clearTimeout(timeout);

                    // emit any pending actions queued while this was being sent
                    emitPendingActions();
                }
            );

            timeout = setTimeout(sendPacket, SEND_PLAYER_ACTIONS_PACKET_RETRY_TIME_MS) as unknown as number;
        };

        sendPacket();
    };

    const queueAction = (action: PlayerActions.PlayerAction) => {
        pendingActions.push(action);

        emitPendingActions();
    };

    yield takeEvery<PlayerActions.PlayerAction>(
        PlayerActions.PlayerActionTypesArray,
        function*(action) {
            queueAction(action);
        }
    );
};

const writeActionsToPackets = function*(registry: ClientToServerPacketRegsitry) {
    yield all([
        takeEvery(
            BATTLE_FINISH_EVENT,
            function*() {
                registry.emit(ClientToServerPacketOpcodes.FINISH_MATCH, { empty: true });
            }
        ),
        yield fork(sendPlayerActions, registry)
    ]);
};

export const outgoingGameNetworking = function*(socket: SocketIOClient.Socket) {
    console.log("outgoing game net started");

    const registry = new OutgoingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>(
        (opcode, payload, ack) => socket.emit(opcode, payload, ack)
    );

    yield fork(writeActionsToPackets, registry);
};
