import { take, delay, all, race, call } from "redux-saga/effects";
import { cancelled } from "typed-redux-saga";
import { Socket } from "socket.io";
import { GameEvents, PlayerActions } from "@creature-chess/gamemode";
import { ClientToServer, GameServerToClient } from "@creature-chess/networking";

import { incomingNetworking } from "./incoming";
import { outgoingNetworking } from "./outgoing";
import { setPacketRegistries } from "./registries";
import { playerBoard } from "../board";

export const playerNetworking = function*(socket: Socket) {
	yield* setPacketRegistries({
		incoming: ClientToServer.incoming(
			(opcode, handler) => socket.on(opcode, handler as any),
			(opcode, handler) => socket.off(opcode, handler)
		),
		outgoing: GameServerToClient.outgoing(
			(opcode, payload, ack) => socket.emit(opcode, payload, ack)
		)
	});

	const teardown = function*() {
		socket!.removeAllListeners();
		socket!.disconnect();

		yield* setPacketRegistries(null);
	};

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
