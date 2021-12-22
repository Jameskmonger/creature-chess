import { take, delay, all, race, call, put } from "redux-saga/effects";
import { cancelled } from "typed-redux-saga";
import { Socket } from "socket.io";
import { GameEvents, PlayerActions, PlayerCommands } from "@creature-chess/gamemode";
import { ClientToServer, GameServerToClient } from "@creature-chess/networking";

import { incomingNetworking, outgoingNetworking, setPacketRegistries } from "./net";
import { playerBoard } from "./board";
import { PlayerListPlayer, RoundInfoState } from "@creature-chess/models";
import { logger } from "../log";

type Parameters = {
	getRoundInfo: () => RoundInfoState;
	getPlayers: () => PlayerListPlayer[];
};

export const playerNetworking = function*(socket: Socket, { getRoundInfo, getPlayers }: Parameters) {
	const registries = {
		incoming: ClientToServer.incoming(
			(opcode, handler) => socket.on(opcode, handler as any),
			(opcode, handler) => socket.off(opcode, handler)
		),
		outgoing: GameServerToClient.outgoing(
			(opcode, payload, ack) => socket.emit(opcode, payload, ack)
		)
	};

	yield* setPacketRegistries(registries);

	const teardown = function*() {
		socket!.removeAllListeners();
		socket!.disconnect();

		yield* setPacketRegistries(null);
	};

	yield put(PlayerCommands.setSpectatingIdCommand(null));

	registries.outgoing.send(
		"gameConnected",
		{
			game: getRoundInfo(),
			players: getPlayers()
		}
	);

	try {
		yield race({
			never: all([
				call(incomingNetworking),
				call(outgoingNetworking),
				call(playerBoard)
			]),
			quit: take<PlayerActions.QuitGamePlayerAction>(PlayerActions.quitGamePlayerAction.toString()),
			finish: take<GameEvents.GameFinishEvent>(GameEvents.gameFinishEvent.toString())
		});
		yield delay(100);
	} finally {
		if (yield* cancelled()) {
			yield call(teardown);
		}
	}

	yield call(teardown);
};
