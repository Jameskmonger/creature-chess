import { IncomingPacketRegistry, ServerToClientMenuPacketAcknowledgements, ServerToClientMenuPacketDefinitions, ServerToClientMenuPacketOpcodes } from "@creature-chess/shared";
import { call, takeEvery, put, take, fork, all, select } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import { AuthSelectors, signIn } from "../auth";
import { lobbyNetworking } from "../lobby/networking";
import { joinLobbyAction, JoinLobbyAction, JOIN_LOBBY } from "../lobby/store/actions";
import { AppState } from "../store";
import { FindGameAction, FIND_GAME } from "../ui/actions";
import { getSocket } from "../ui/socket";

export const findGame = function*() {
    const findGameAction: FindGameAction = yield take(FIND_GAME);

    const state: AppState = yield select();

    // this should never happen, but it doesn't hurt to be safe
    if (!AuthSelectors.isLoggedIn(state)) {
        signIn();

        return;
    }

    const idToken = AuthSelectors.getIdToken(state);

    const socket: SocketIOClient.Socket = yield call(getSocket, findGameAction.payload.serverIP, idToken);

    const registry = new IncomingPacketRegistry<ServerToClientMenuPacketDefinitions, ServerToClientMenuPacketAcknowledgements>(
        (opcode, handler) => socket.on(opcode, handler)
    );

    const channel = eventChannel<JoinLobbyAction>(emit => {
        registry.on(
            ServerToClientMenuPacketOpcodes.LOBBY_CONNECTED,
            ({ playerId, lobbyId, players, startTimestamp }) => {
                emit(joinLobbyAction(
                    playerId,
                    lobbyId,
                    players,
                    startTimestamp
                ));
            }
        );

        // todo registry.off
        // tslint:disable-next-line:no-empty
        return () => { console.log("channel closing"); };
    });

    yield takeEvery(channel, function*(action) {
        yield put(action);
    });

    // todo put race (take(JOIN_LOBBY), take(JOIN_GAME)) here
    // and run the correct networking saga

    // wait for a JOIN_LOBBY action
    yield take(JOIN_LOBBY);

    console.log("JOIN_LOBBY received");

    // close the menu channel
    channel.close();

    yield fork(lobbyNetworking, socket);
};
