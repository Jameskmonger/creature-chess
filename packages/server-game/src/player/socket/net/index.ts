import { take, delay, all, race, call } from "redux-saga/effects";
import { cancelled } from "typed-redux-saga";
import { Socket } from "socket.io";
import { GameEvents, PlayerGameActions } from "@creature-chess/gamemode";
import { ClientToServer, IncomingPacketRegistry, OutgoingPacketRegistry, ServerToClient } from "@creature-chess/networking";

import { incomingNetworking } from "./incoming";
import { outgoingNetworking } from "./outgoing";
import { IncomingRegistry, OutgoingRegistry, setPacketRegistries } from "./registries";

const createIncomingRegistry = (socket: Socket): IncomingRegistry => new IncomingPacketRegistry<
	ClientToServer.PacketDefinitions,
	ClientToServer.PacketAcknowledgements
>(
	(opcode, handler) => socket.on(opcode, handler)
);

const createOutgoingRegistry = (socket: Socket): OutgoingRegistry => new OutgoingPacketRegistry<
	ServerToClient.Game.PacketDefinitions,
	ServerToClient.Game.PacketAcknowledgements
>(
	(opcode, payload, ack) => socket.emit(opcode, payload, ack)
);

export const playerNetworking = function*(socket: Socket) {
	yield* setPacketRegistries({
		incoming: createIncomingRegistry(socket),
		outgoing: createOutgoingRegistry(socket)
	});

	const teardown = function*() {
		socket!.removeAllListeners();
		socket!.disconnect();

		yield* setPacketRegistries(null);
	};

	try {
		yield race({
			never: all([
				call(incomingNetworking, socket),
				call(outgoingNetworking)
			]),
			quit: take<PlayerGameActions.QuitGamePlayerAction>(PlayerGameActions.quitGamePlayerAction.toString()),
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
