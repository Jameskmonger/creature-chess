import { race, call, takeEvery, put, take, select, fork } from "@redux-saga/core/effects";
import { eventChannel } from "redux-saga";
import { IncomingPacketRegistry, ServerToClient } from "@creature-chess/networking";
import { BoardSlice } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";
import { LobbyCommands } from "../../lobby";
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

	const idToken = yield call(auth.getAccessTokenSilently);

	let socket: SocketIOClient.Socket = null;

	try {
		socket = yield call(getSocket, findGameAction.payload.serverIP, idToken);
	} catch (error) {
		auth.loginWithRedirect();
		return;
	}

	const registry = new IncomingPacketRegistry<ServerToClient.Menu.PacketDefinitions, ServerToClient.Menu.PacketAcknowledgements>(
		(opcode, handler) => socket.on(opcode, handler)
	);

	const channel = eventChannel<LobbyConnectedEvent | GameConnectedEvent>(emit => {
		registry.on(
			ServerToClient.Menu.PacketOpcodes.LOBBY_CONNECTED,
			({ lobbyId, players, startTimestamp }) => {
				emit(lobbyConnectedEvent(
					lobbyId,
					players,
					startTimestamp
				));
			}
		);

		registry.on(
			ServerToClient.Menu.PacketOpcodes.GAME_CONNECTED,
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
		yield put(LobbyCommands.setLobbyDetailsCommand(lobby.payload));
		yield put(lobby);
	} else if (game) {
		yield put(game);
	}
};
