import { takeLatest } from "redux-saga/effects";

import { GameEvents } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { getPacketRegistries } from "../registries";

export const sendPlayerListUpdates = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield takeLatest<GameEvents.PlayerListChangedEvent>(
		GameEvents.playerListChangedEvent.toString(),
		function*({ payload: { players } }) {
			registry.emit(ServerToClient.Game.PacketOpcodes.PLAYER_LIST_UPDATE, players);
		}
	);
};
