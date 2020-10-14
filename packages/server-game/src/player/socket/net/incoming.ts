import { takeLatest, take, fork, takeEvery, put, delay } from "@redux-saga/core/effects";
import { Socket } from "socket.io";
import { eventChannel } from "redux-saga";
import {
    PlayerActions, PlayerEvents, IncomingPacketRegistry, ClientToServerPacketDefinitions,
    ClientToServerPacketOpcodes, SendPlayerActionsPacket, ClientToServerPacketAcknowledgements, GameEvents
} from "@creature-chess/shared";
import {
    NewPlayerSocketEvent, NEW_PLAYER_SOCKET_EVENT, receivePlayerActionsEvent,
    ReceivePlayerActionsEvent
} from "../events";
import { logger } from "../../../log";

type IncomingRegistry = IncomingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>;

export const incomingNetworking = function*() {
    let lastReceivedPacketIndex = 0;
    let registry: IncomingRegistry;
    let socket: Socket;

    const processIncomingPackets = function*() {
        const channel = eventChannel<ReceivePlayerActionsEvent>(emit => {
            const onReceiveActions = (
                { index, actions }: SendPlayerActionsPacket,
                ack: (accepted: boolean, packetIndex?: number) => void
            ) => emit(receivePlayerActionsEvent(index, actions, ack));

            registry.on(ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS, onReceiveActions);

            // todo create a registry.off function here
            return () => socket.off(ClientToServerPacketOpcodes.SEND_PLAYER_ACTIONS, onReceiveActions);
        });

        while (true) {
            const { payload: { index, actions, ack } }: ReceivePlayerActionsEvent = yield take(channel);

            const expectedPacketIndex = lastReceivedPacketIndex + 1;

            if (expectedPacketIndex !== index) {
                ack(false);
                logger.error(`Incoming packet index mismatch. Expected: ${expectedPacketIndex}, received: ${index}`);

                return;
            }

            for (const action of actions) {
                const validAction = PlayerActions.PlayerActionTypesArray.includes(action.type);

                if (!validAction) {
                    logger.error(`Unhandled player action type: ${action.type}`);

                    continue;
                }

                yield put(action);
            }

            lastReceivedPacketIndex = index;
            ack(true, index);
        }
    };

    const processFinishMatch = function*() {
        const channel = eventChannel<PlayerEvents.ClientFinishMatchEvent>(emit => {
            const onFinishMatch = () => emit(PlayerEvents.clientFinishMatchEvent());

            registry.on(ClientToServerPacketOpcodes.FINISH_MATCH, onFinishMatch);

            // todo create a registry.off function here
            return () => socket.off(ClientToServerPacketOpcodes.FINISH_MATCH, onFinishMatch);
        });

        // take events from channel and put them directly
        yield takeEvery<PlayerEvents.ClientFinishMatchEvent>(
            channel,
            function*(action) {
                yield put(action);
            });
    };

    yield takeLatest<NewPlayerSocketEvent>(
        NEW_PLAYER_SOCKET_EVENT,
        function*({ payload: { socket: newSocket } }) {
            lastReceivedPacketIndex = 0;

            if (socket) {
                socket.removeAllListeners();
            }

            socket = newSocket;

            registry = new IncomingPacketRegistry<ClientToServerPacketDefinitions, ClientToServerPacketAcknowledgements>(
                (opcode, handler) => socket.on(opcode, handler)
            );

            yield fork(processIncomingPackets);
            yield fork(processFinishMatch);
        }
    );

    yield take([PlayerActions.QUIT_GAME_ACTION, GameEvents.GAME_FINISH_EVENT]);
    yield delay(100);

    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    registry = null;
};
