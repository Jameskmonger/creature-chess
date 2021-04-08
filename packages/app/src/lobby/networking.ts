import { put, fork, take, select, cancel, cancelled } from "@redux-saga/core/effects";
import { IncomingPacketRegistry, ServerToClientLobbyPacketAcknowledgements, ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketOpcodes } from "@creature-chess/shared";
import { EventChannel, eventChannel } from "redux-saga";
import { LobbyAction, updateLobbyPlayerAction, lobbyGameStartedEvent, LOBBY_GAME_STARTED_EVENT } from "./store/actions";
import { AppState } from "../store";
import { gameSaga } from "../game";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

type ServerToClientLobbyPacketRegistry = IncomingPacketRegistry<ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketAcknowledgements>;

const readPacketsToActions = function*(registry: ServerToClientLobbyPacketRegistry) {
    let channel: EventChannel<LobbyAction>;

    try {
        channel = eventChannel<LobbyAction>(emit => {
            registry.on(
                ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE,
                ({ index, player }) => {
                    emit(updateLobbyPlayerAction(index, player));
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
    socket: SocketIOClient.Socket,
    slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
) {
    const registry = new IncomingPacketRegistry<ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    const readPacketsTask = yield fork(readPacketsToActions, registry);

    yield take(LOBBY_GAME_STARTED_EVENT);

    yield cancel(readPacketsTask);

    const playerId: string = yield select((state: AppState) => state.user.user.id);

    yield fork(gameSaga, playerId, socket, slices);
};
