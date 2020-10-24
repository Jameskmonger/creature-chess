import { takeEvery, put, fork, take, select } from "@redux-saga/core/effects";
import { IncomingPacketRegistry, ServerToClientLobbyPacketAcknowledgements, ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketOpcodes } from "@creature-chess/shared";
import { eventChannel } from "redux-saga";
import { LobbyAction, updateLobbyPlayerAction, lobbyGameStartedEvent, LOBBY_GAME_STARTED_EVENT } from "./store/actions";
import { AppState } from "../store";
import { gameSaga } from "../game";

type ServerToClientLobbyPacketRegistry = IncomingPacketRegistry<ServerToClientLobbyPacketDefinitions, ServerToClientLobbyPacketAcknowledgements>;

const readPacketsToActions = function*(registry: ServerToClientLobbyPacketRegistry) {
    const channel = eventChannel<LobbyAction>(emit => {
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
            console.log("cancelling lobby readPacketsToActions channel");
        };
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

    yield take(LOBBY_GAME_STARTED_EVENT);

    const playerId: string = yield select((state: AppState) => state.auth.user.id);

    yield fork(gameSaga, playerId, socket);
};
