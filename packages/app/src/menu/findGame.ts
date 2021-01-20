import { race, call, takeEvery, put, take, fork, all, select } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import {
    BenchCommands, BoardCommands, GameEvents, IncomingPacketRegistry, PlayerInfoCommands,
    ServerToClientMenuPacketAcknowledgements, ServerToClientMenuPacketDefinitions, ServerToClientMenuPacketOpcodes, startBattle
} from "@creature-chess/shared";
import { lobbyNetworking } from "../lobby/networking";
import { gameConnectedEvent, joinLobbyAction, JoinLobbyAction, JOIN_LOBBY, GameConnectedEvent, GAME_CONNECTED } from "../lobby/store/actions";
import { AppState } from "../store";
import { FindGameAction, FIND_GAME } from "../ui/actions";
import { getSocket } from "../ui/socket";
import { gameSaga } from "../game";
import { playerListUpdated } from "../game/features/playerList/playerListActions";
import { isLoggedIn } from "./auth/store/selectors";

export const findGame = function*(getAccessTokenSilently: () => Promise<string>, loginWithRedirect: () => Promise<void>) {
    const findGameAction: FindGameAction = yield take(FIND_GAME);

    const state: AppState = yield select();

    // this should never happen, but it doesn't hurt to be safe
    if (!isLoggedIn(state)) {
        loginWithRedirect();
        return;
    }

    const idToken = yield call(getAccessTokenSilently);

    let socket: SocketIOClient.Socket = null;

    try {
        socket = yield call(getSocket, findGameAction.payload.serverIP, idToken);
    } catch (error) {
        loginWithRedirect();
        return;
    }

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
        return () => { };
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
        const playerId: string = yield select((s: AppState) => s.user.user.id);

        yield fork(gameSaga, playerId, socket);

        const { payload: {
            board,
            bench,
            players,
            battleTurn,
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

        if (battleTurn !== null) {
            yield put(startBattle(battleTurn));
        }
    }
};
