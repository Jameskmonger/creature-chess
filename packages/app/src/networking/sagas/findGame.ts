import { race, call, takeEvery, put, take, select, fork } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import {
    IncomingPacketRegistry, ServerToClientMenuPacketAcknowledgements, ServerToClientMenuPacketDefinitions, ServerToClientMenuPacketOpcodes
} from "@creature-chess/shared";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { AppState } from "../../store";
import { isLoggedIn } from "../../menu/auth/store/selectors";
import { lobbyCommands } from "../../lobby";
import { MenuActions } from "../../menu";
import { getSocket } from "../socket";
import {
    gameConnectedEvent, GameConnectedEvent, GAME_CONNECTED_EVENT,
    lobbyConnectedEvent, LobbyConnectedEvent, LOBBY_CONNECTED_EVENT
} from "../actions";
import { networkingSaga } from "./networkingSaga";

export const findGame = function*(
    auth: {
        getAccessTokenSilently: () => Promise<string>,
        loginWithRedirect: () => Promise<void>,
    },
    slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
) {
    const findGameAction: MenuActions.FindGameAction = yield take(MenuActions.FIND_GAME);

    const state: AppState = yield select();

    // this should never happen, but it doesn't hurt to be safe
    if (!isLoggedIn(state)) {
        auth.loginWithRedirect();
        return;
    }

    const idToken = yield call(auth.getAccessTokenSilently);

    let socket: SocketIOClient.Socket = null;

    try {
        socket = yield call(getSocket, findGameAction.payload.serverIP, idToken);
    } catch (error) {
        auth.loginWithRedirect();
        return;
    }

    const registry = new IncomingPacketRegistry<ServerToClientMenuPacketDefinitions, ServerToClientMenuPacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    const channel = eventChannel<LobbyConnectedEvent | GameConnectedEvent>(emit => {
        registry.on(
            ServerToClientMenuPacketOpcodes.LOBBY_CONNECTED,
            ({ playerId, lobbyId, players, startTimestamp }) => {
                emit(lobbyConnectedEvent(
                    playerId,
                    lobbyId,
                    players,
                    startTimestamp
                ));
            }
        );

        registry.on(
            ServerToClientMenuPacketOpcodes.GAME_CONNECTED,
            (payload) => {
                emit(gameConnectedEvent(payload));
            }
        );

        // todo registry.off
        // tslint:disable-next-line:no-empty
        return () => { };
    });

    yield takeEvery(channel, function*(action) {
        yield put(action);
    });

    const { lobby, game }: { lobby: LobbyConnectedEvent, game: GameConnectedEvent } = yield race({
        lobby: take(LOBBY_CONNECTED_EVENT),
        game: take(GAME_CONNECTED_EVENT)
    });

    channel.close();

    yield fork(networkingSaga, socket, slices);

    if (lobby) {
        yield put(lobbyCommands.setLobbyDetailsCommand(lobby.payload));
        yield put(lobby);
    } else if (game) {
        yield put(game);
    }
};
