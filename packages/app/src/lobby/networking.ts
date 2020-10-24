import { takeEvery, put, fork } from "@redux-saga/core/effects";
import { IncomingPacketRegistry, ServerToClientLobbyPacketAcknowledgements, ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketOpcodes } from "@creature-chess/shared";
import { eventChannel } from "redux-saga";
import { LobbyAction, updateLobbyPlayerAction } from "./store/actions";

type ServerToClientLobbyPacketRegistry = IncomingPacketRegistry<ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketAcknowledgements>;

const readPacketsToActions = function*(registry: ServerToClientLobbyPacketRegistry) {
    const channel = eventChannel<LobbyAction>(emit => {
        registry.on(
            ServerToClientLobbyPacketOpcodes.LOBBY_PLAYER_UPDATE,
            ({ index, player }) => {
                emit(updateLobbyPlayerAction(index, player));
            }
        );

        // tslint:disable-next-line:no-empty
        return () => { };
    });

    yield takeEvery(channel, function*(action) {
        yield put(action);
    });
};

export const lobbyNetworking = function*(socket: SocketIOClient.Socket) {
    console.log("lobby networking started");

    const registry = new IncomingPacketRegistry<ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    yield fork(readPacketsToActions, registry);
};
