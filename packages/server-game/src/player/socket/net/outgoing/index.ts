import { all, call } from "redux-saga/effects";
import { emitActionsSaga } from "@shoki/networking";
import { GameEvents } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";

import { sendGamePhaseUpdates } from "./phases";
import { sendPlayerListUpdates } from "./playerList";
import { sendPlayerInfoUpdates } from "./playerInfoUpdates";
import { sendAnnouncements } from "./announcements";
import { sendInitialState } from "./initialState";
import { getPacketRegistries } from "../registries";

export const outgoingNetworking = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield all([
		call(sendGamePhaseUpdates),
		call(sendPlayerListUpdates),
		call(sendAnnouncements),
		call(sendPlayerInfoUpdates),
		call(sendInitialState),

		call(
			emitActionsSaga as any, // todo improve this typing
			ServerToClient.Game.PacketOpcodes.SEND_GAME_EVENTS,
			registry,
			GameEvents.GameEventActionTypesArray
		)
	]);
};
