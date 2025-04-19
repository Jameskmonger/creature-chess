import { take, call, all, race } from "redux-saga/effects";
import { Socket } from "socket.io-client";

import { GameEvents } from "@creature-chess/gamemode";
import { GameServerToClient } from "@creature-chess/networking";

import { incomingGameServerToClient } from "./incoming";
import { outgoingGameServerToClient } from "./outgoing";

export const gameNetworking = function* (
	socket: Socket,
	payload: GameServerToClient.GameConnectionPacket
) {
	yield race([
		all([
			call(outgoingGameServerToClient, socket),
			call(incomingGameServerToClient, socket),
		]),
		call(function* () {
			yield take(GameEvents.gameFinishEvent.toString());
		}),
	]);

	socket.close();
};
