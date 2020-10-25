import { race, call, takeEvery, put, take, fork, all, select } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import {
    BenchCommands, BoardCommands, GameEvents, IncomingPacketRegistry, PlayerInfoCommands,
    ServerToClientMenuPacketAcknowledgements, ServerToClientMenuPacketDefinitions, ServerToClientMenuPacketOpcodes
} from "@creature-chess/shared";
import { AuthSelectors, signIn } from "../auth";
import { lobbyNetworking } from "../lobby/networking";
import { gameConnectedEvent, joinLobbyAction, JoinLobbyAction, JOIN_LOBBY, GameConnectedEvent, GAME_CONNECTED } from "../lobby/store/actions";
import { AppState } from "../store";
import { FindGameAction, FIND_GAME } from "../ui/actions";
import { getSocket } from "../ui/socket";
import { gameSaga } from "../game";
import { playerListUpdated } from "../game/features/playerList/playerListActions";

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

    const channel = eventChannel<JoinLobbyAction | GameConnectedEvent>(emit => {
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

        registry.on(
            ServerToClientMenuPacketOpcodes.GAME_CONNECTED,
            (payload) => {
                emit(gameConnectedEvent(payload));
            }
        );

        // todo registry.off
        // tslint:disable-next-line:no-empty
        return () => { console.log("channel closing"); };
    });

    yield takeEvery(channel, function*(action) {
        yield put(action);
    });

    const { lobby, game } = yield race({
        lobby: take(JOIN_LOBBY),
        game: take(GAME_CONNECTED)
    });

    channel.close();

    if (lobby) {
        yield fork(lobbyNetworking, socket);
    } else if (game) {
        const playerId: string = yield select((s: AppState) => s.auth.user.id);

        yield fork(gameSaga, playerId, socket);

        const { payload: {
            board,
            bench,
            players,
            game: { phase, phaseStartedAtSeconds },
            playerInfo: { money, cards, level, xp }
        } } = game as GameConnectedEvent;

        yield put(BoardCommands.initialiseBoard(board.pieces));
        yield put(BenchCommands.initialiseBenchCommand(bench));
        yield put(PlayerInfoCommands.updateMoneyCommand(money));
        yield put(PlayerInfoCommands.updateCardsCommand(cards));
        yield put(PlayerInfoCommands.updateLevelCommand(level, xp));
        yield put(playerListUpdated(players));
        yield put(GameEvents.gamePhaseStartedEvent(phase, phaseStartedAtSeconds));
    }
};
