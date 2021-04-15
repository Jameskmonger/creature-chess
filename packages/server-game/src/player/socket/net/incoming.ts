import { Logger } from "winston";
import { takeLatest, take, fork, takeEvery, put, delay } from "@redux-saga/core/effects";
import { Socket } from "socket.io";
import { eventChannel } from "redux-saga";
import { PlayerEvents, GameEvents, PlayerGameActions } from "@creature-chess/gamemode";
import { ClientToServer, IncomingPacketRegistry } from "@creature-chess/networking";

import {
    NewPlayerSocketEvent, NEW_PLAYER_SOCKET_EVENT, receivePlayerActionsEvent,
    ReceivePlayerActionsEvent
} from "../events";

type IncomingRegistry = IncomingPacketRegistry<ClientToServer.PacketDefinitions, ClientToServer.PacketAcknowledgements>;

export const incomingNetworking = function*(getLogger: () => Logger) {
    let registry: IncomingRegistry;
    let socket: Socket;

    const processIncomingPackets = function*() {
        let expectedPacketIndex = 1;

        const channel = eventChannel<ReceivePlayerActionsEvent>(emit => {
            const onReceiveActions = (
                { index, actions }: ClientToServer.SendPlayerActionsPacket,
                ack: (accepted: boolean, packetIndex?: number) => void
            ) => emit(receivePlayerActionsEvent(index, actions, ack));

            registry.on(ClientToServer.PacketOpcodes.SEND_PLAYER_ACTIONS, onReceiveActions);

            // todo create a registry.off function here
            return () => socket.off(ClientToServer.PacketOpcodes.SEND_PLAYER_ACTIONS, onReceiveActions);
        });

        const actionQueue: PlayerGameActions.PlayerGameAction[] = [];

        while (true) {
            // todo refactor this client+server to make use of the array
            const { payload: { index, actions: [action] } }: ReceivePlayerActionsEvent = yield take(channel);

            const validAction = PlayerGameActions.PlayerGameActionTypesArray.includes(action.type);
            if (!validAction) {
                getLogger().error(`Unhandled PlayerGameAction type: ${action.type}`);

                continue;
            }

            if (index < expectedPacketIndex) {
                getLogger().warn(`Received packet index ${index} before lastReceivedPacketIndex ${expectedPacketIndex}`);
            } else {
                // queue future actions and execute them after the expected one arrives
                actionQueue[index - expectedPacketIndex] = action;

                // if there's an action for the expected index, process it and repeat
                while (actionQueue[0]) {
                    const actionFromQueue = actionQueue.shift();
                    expectedPacketIndex++;
                    yield put(actionFromQueue);
                }
            }
        }
    };

    const processFinishMatch = function*() {
        const channel = eventChannel<PlayerEvents.ClientFinishMatchEvent>(emit => {
            const onFinishMatch = () => emit(PlayerEvents.clientFinishMatchEvent());

            registry.on(ClientToServer.PacketOpcodes.FINISH_MATCH, onFinishMatch);

            // todo create a registry.off function here
            return () => socket.off(ClientToServer.PacketOpcodes.FINISH_MATCH, onFinishMatch);
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
            if (socket) {
                socket.removeAllListeners();
            }

            socket = newSocket;

            registry = new IncomingPacketRegistry<ClientToServer.PacketDefinitions, ClientToServer.PacketAcknowledgements>(
                (opcode, handler) => socket.on(opcode, handler)
            );

            yield fork(processIncomingPackets);
            yield fork(processFinishMatch);
        }
    );

    yield take<PlayerGameActions.QuitGamePlayerAction | GameEvents.GameFinishEvent>([
        PlayerGameActions.quitGamePlayerAction.toString(),
        GameEvents.gameFinishEvent.toString()
    ]);
    yield delay(100);

    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
    registry = null;
};
