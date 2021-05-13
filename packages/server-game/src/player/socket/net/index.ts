import { take, delay, all, race, call } from "redux-saga/effects";
import { getContext } from "typed-redux-saga";
import { Socket } from "socket.io";
import { GameEvents, PlayerGameActions, PlayerSagaContext } from "@creature-chess/gamemode";
import { ClientToServer, IncomingPacketRegistry, OutgoingPacketRegistry, ServerToClient } from "@creature-chess/networking";

import { incomingNetworking } from "./incoming";
import { outgoingNetworking } from "./outgoing";
import { IncomingRegistry, OutgoingRegistry, setPacketRegistries } from "./registries";

export const playerNetworking = function*(socket: Socket) {
	const incomingRegistry: IncomingRegistry = new IncomingPacketRegistry<ClientToServer.PacketDefinitions, ClientToServer.PacketAcknowledgements>(
		(opcode, handler) => socket.on(opcode, handler)
	);

	const outgoingRegistry: OutgoingRegistry = new OutgoingPacketRegistry<ServerToClient.Game.PacketDefinitions, ServerToClient.Game.PacketAcknowledgements>(
		(opcode, payload, ack) => socket.emit(opcode, payload, ack)
	);

	yield* setPacketRegistries({
		incoming: incomingRegistry,
		outgoing: outgoingRegistry
	});

	yield race({
		never: all([
			call(incomingNetworking, socket),
			call(outgoingNetworking)
		]),
		quit: take<PlayerGameActions.QuitGamePlayerAction>(PlayerGameActions.quitGamePlayerAction.toString()),
		finish: take<GameEvents.GameFinishEvent>(GameEvents.gameFinishEvent.toString())
	});
	yield delay(100);

	socket!.removeAllListeners();
	socket!.disconnect();
	(incomingRegistry! as unknown as null) = null;
	(outgoingRegistry! as unknown as null) = null;
};
