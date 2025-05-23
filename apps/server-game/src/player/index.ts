import { take, delay, all, race, call, put } from "redux-saga/effects";
import { Socket } from "socket.io";
import { cancelled } from "typed-redux-saga";

import {
	GameEvents,
	PlayerActions,
	PlayerCommands,
} from "@creature-chess/gamemode";
import { RoundInfoState } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models/game/playerList";
import { GamemodeSettings } from "@creature-chess/models/settings";
import { ClientToServer, GameServerToClient } from "@creature-chess/networking";

import { playerBoard } from "./board";
import {
	incomingNetworking,
	outgoingNetworking,
	setPacketRegistries,
} from "./net";

type Parameters = {
	getRoundInfo: () => RoundInfoState;
	getPlayers: () => PlayerListPlayer[];
};

export const playerNetworking = function* (
	socket: Socket,
	{ getRoundInfo, getPlayers }: Parameters,
	settings: GamemodeSettings
) {
	const registries = {
		incoming: ClientToServer.incoming(
			(opcode, handler) => socket.on(opcode, handler as any),
			(opcode, handler) => socket.off(opcode, handler)
		),
		outgoing: GameServerToClient.outgoing((opcode, payload, ack) =>
			socket.emit(opcode, payload, ack)
		),
	};

	yield* setPacketRegistries(registries);

	const teardown = function* () {
		socket!.removeAllListeners();
		socket!.disconnect();

		yield* setPacketRegistries(null);
	};

	yield put(PlayerCommands.setSpectatingIdCommand(null));

	yield delay(500);

	registries.outgoing.send("gameConnected", {
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
