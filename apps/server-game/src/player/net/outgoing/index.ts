import { all, call } from "redux-saga/effects";

import { ActionStream } from "@shoki/networking";

import {
	GameEvents,
	PlayerCommands,
	PlayerEvents,
} from "@creature-chess/gamemode";
import { GameServerToClient } from "@creature-chess/networking";

import { getPacketRegistries } from "../registries";
import { sendInitialState } from "./initialState";

export const outgoingNetworking = function* () {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield all([
		call(sendInitialState),

		call(
			ActionStream.outgoingSaga<GameServerToClient.PacketSet, "sendGameEvents">(
				registry,
				"sendGameEvents",
				GameEvents.GameEventActionTypesArray
			)
		),

		call(
			ActionStream.outgoingSaga<
				GameServerToClient.PacketSet,
				"sendLocalPlayerEvents"
			>(
				registry,
				"sendLocalPlayerEvents",
				PlayerEvents.PlayerEventActionTypesArray
			)
		),

		call(
			ActionStream.outgoingSaga<
				GameServerToClient.PacketSet,
				"playerInfoUpdates"
			>(
				registry,
				"playerInfoUpdates",
				PlayerCommands.PlayerInfoUpdateCommandActionTypesArray
			)
		),
	]);
};
