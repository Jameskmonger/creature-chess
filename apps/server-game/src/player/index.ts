import { take, delay, all, race, call, put } from "redux-saga/effects";
import { cancelled } from "typed-redux-saga";

import {
	GameEvents,
	PlayerActions,
	PlayerCommands,
} from "@creature-chess/gamemode";
import { RoundInfoState } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models/game/playerList";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { GameSocket } from "./socket";

import { playerBoard } from "./board";
import {
	incomingNetworking,
	outgoingNetworking,
	setPlayerSocket,
} from "./net";

type Parameters = {
	getRoundInfo: () => RoundInfoState;
	getPlayers: () => PlayerListPlayer[];
};

export const playerNetworking = function* (
	socket: GameSocket,
	{ getRoundInfo, getPlayers }: Parameters,
	settings: GamemodeSettings
) {
	yield* setPlayerSocket(socket);

	const teardown = function* () {
		socket!.removeAllListeners();
		socket!.disconnect();

		yield* setPlayerSocket(null);
	};

	yield put(PlayerCommands.setSpectatingIdCommand(null));

	yield delay(500);

	socket.emit("gameConnected", {
		game: getRoundInfo(),
		players: getPlayers(),
		settings,
	});

	try {
		yield race({
			never: all([
				call(incomingNetworking),
				call(outgoingNetworking),
				call(playerBoard),
			]),
			quit: take<PlayerActions.QuitGamePlayerAction>(
				PlayerActions.quitGamePlayerAction.toString()
			),
			finish: call(function* () {
				yield take<GameEvents.GameFinishEvent>(
					GameEvents.gameFinishEvent.toString()
				);

				// wait 1 second before closing the networking
				// to allow the game finish event to be sent
				yield delay(1000);
			}),
		});
		yield delay(100);
	} finally {
		if (yield* cancelled()) {
			yield call(teardown);
		}
	}

	yield call(teardown);
};
