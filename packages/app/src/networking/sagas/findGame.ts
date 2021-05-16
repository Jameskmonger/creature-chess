import { Socket } from "socket.io-client";
import { eventChannel } from "redux-saga";
import { race, call, takeEvery, put, take } from "redux-saga/effects";
import { ServerToClient } from "@creature-chess/networking";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { LobbyCommands } from "../../lobby";
import { MenuActions } from "../../menu";
import { getSocket } from "../socket";
import {
	gameConnectedEvent, GameConnectedEvent,
	lobbyConnectedEvent, LobbyConnectedEvent
} from "../actions";
import { networkingSaga } from "./networkingSaga";
import { all } from "redux-saga/effects";

export const findGame = function*(
	auth: {
		getAccessTokenSilently: () => Promise<string>,
		loginWithRedirect: () => Promise<void>,
	},
	slices: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
) {
	const findGameAction: MenuActions.FindGameAction = yield take(MenuActions.FIND_GAME);

	const idToken = yield call(auth.getAccessTokenSilently);

	let socket: Socket = null;

	try {
		socket = yield call(getSocket, findGameAction.payload.serverIP, idToken);
	} catch (error) {
		auth.loginWithRedirect();
		return;
	}

	const channel = eventChannel<LobbyConnectedEvent | GameConnectedEvent>(emit => {
		socket.on(
			ServerToClient.Lobby.PacketOpcodes.LOBBY_CONNECTED,
			(payload: ServerToClient.Lobby.LobbyConnectionPacket) => {
				emit(lobbyConnectedEvent(payload));
			}
		);

		socket.on(
			ServerToClient.Game.PacketOpcodes.GAME_CONNECTED,
			(payload: ServerToClient.Game.GameConnectionPacket) => {
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
		lobby: take(lobbyConnectedEvent.toString()),
		game: take(gameConnectedEvent.toString())
	});

	channel.close();

	yield all([
		call(networkingSaga, socket, slices),
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
