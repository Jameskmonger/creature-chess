import { put, fork, take, select, cancel, cancelled } from "@redux-saga/core/effects";
import { IncomingPacketRegistry, ServerToClientLobbyPacketAcknowledgements, ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketOpcodes } from "@creature-chess/shared";
import { EventChannel, eventChannel } from "redux-saga";
import { lobbyGameStartedEvent, LOBBY_GAME_STARTED_EVENT } from "../../lobby/store/actions";
import { AppState } from "../../store";
import { gameSaga } from "../../game";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { LobbyConnectedEvent, LOBBY_CONNECTED_EVENT } from "../actions";
import { Action } from "redux";
import { lobbyCommands } from "../../lobby";

type ServerToClientLobbyPacketRegistry = IncomingPacketRegistry<ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketAcknowledgements>;

const readPacketsToActions = function*(registry: ServerToClientLobbyPacketRegistry) {
    let channel: EventChannel<Action>;

    try {
        channel = eventChannel(emit => {
            registry.on(
                ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE,
                ({ index, player }) => {
                    emit(lobbyCommands.updateLobbyPlayerCommand({ index, player }));
                }
            );

            registry.on(
                ServerToClientLobbyPacketOpcodes.LOBBY_GAME_STARTED,
                () => {
                    emit(lobbyGameStartedEvent());
                }
            );

            // tslint:disable-next-line:no-empty
            return () => {
                // todo registry.off or registry.close
            };
        });

        while (true) {
            const action = yield take(channel);

            yield put(action);
        }
    } finally {
        if (yield cancelled()) {
            channel.close();
        }
    }
};

export const lobbyNetworking = function*(
    socket: SocketIOClient.Socket
) {
    yield take<LobbyConnectedEvent>(LOBBY_CONNECTED_EVENT);

    const registry = new IncomingPacketRegistry<ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    const readPacketsTask = yield fork(readPacketsToActions, registry);

    yield take(LOBBY_GAME_STARTED_EVENT);

    yield cancel(readPacketsTask);
};
