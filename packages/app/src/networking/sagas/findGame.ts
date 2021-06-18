import { Socket } from "socket.io-client";
import { eventChannel } from "redux-saga";
import { race, call, takeEvery, put, take } from "redux-saga/effects";
import { GameServerToClient, LobbyServerToClient } from "@creature-chess/networking";
import { LobbyCommands } from "../../lobby";
import { MenuActions } from "../../menu";
import { getSocket } from "../socket";
import {
	gameConnectedEvent, GameConnectedEvent,
	lobbyConnectedEvent, LobbyConnectedEvent
} from "../actions";
import { networkingSaga } from "./networkingSaga";
import { all } from "redux-saga/effects";
import { getAuth } from "../../store/sagaContext";

export const findGame = function*() {
	const { getAccessTokenSilently, loginWithRedirect } = yield* getAuth();

	const findGameAction: MenuActions.FindGameAction = yield take(MenuActions.FIND_GAME);

	const idToken = yield call(getAccessTokenSilently);

	let socket: Socket = null;

	try {
		socket = yield call(getSocket, findGameAction.payload.serverIP, idToken);
	} catch (error) {
		loginWithRedirect();
		return;
	}

	const channel = eventChannel<LobbyConnectedEvent | GameConnectedEvent>(emit => {
		// todo !!! USE REGISTRY HERE

		const lobbyOpcode: keyof LobbyServerToClient.PacketSet = "connected";
		socket.on(
			lobbyOpcode,
			(payload: LobbyServerToClient.LobbyConnectionPacket) => {
				emit(lobbyConnectedEvent(payload));
			}
		);

		const gameOpcode: keyof GameServerToClient.PacketSet = "gameConnected";
		socket.on(
			gameOpcode,
			(payload: GameServerToClient.GameConnectionPacket) => {
				emit(gameConnectedEvent(payload));
			}
		);

		// todo registry.off
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		return () => { };
	});

	yield takeEvery(channel, function*(action) {
		yield put(action);
	});

	const { lobby, game }: { lobby: LobbyConnectedEvent; game: GameConnectedEvent } = yield race({
		lobby: take(lobbyConnectedEvent.toString()),
		game: take(gameConnectedEvent.toString())
	});

	channel.close();

	yield all([
		call(networkingSaga, socket),
		call(function*() {
			if (lobby) {
				yield put(LobbyCommands.setLobbyDetailsCommand(lobby.payload));
				yield put(lobby);
			} else if (game) {
				yield put(game);
			}
		})
	]);
};
