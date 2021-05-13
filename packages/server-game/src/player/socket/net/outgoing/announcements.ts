import { takeLatest, all } from "redux-saga/effects";

import { GameEvents, PlayerEvents } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { getPacketRegistries } from "../registries";

export const sendAnnouncements = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield all([
		takeLatest<PlayerEvents.PlayerDeathEvent>(
			PlayerEvents.playerDeathEvent.toString(),
			function*() {
				registry.emit(ServerToClient.Game.PacketOpcodes.PLAYER_DEAD, { empty: true });
			}
		),
		takeLatest<PlayerEvents.PlayerMatchRewardsEvent>(
			PlayerEvents.PLAYER_MATCH_REWARDS_EVENT,
			function*({ payload }: PlayerEvents.PlayerMatchRewardsEvent) {
				registry.emit(ServerToClient.Game.PacketOpcodes.MATCH_REWARDS, payload);
			}
		),
		takeLatest<GameEvents.GameFinishEvent>(
			GameEvents.gameFinishEvent.toString(),
			function*({ payload: { winnerId } }) {
				registry.emit(ServerToClient.Game.PacketOpcodes.FINISH_GAME, { winnerId });
			}
		)
	]);
};
