import { takeLatest, all } from "redux-saga/effects";
import { select } from "typed-redux-saga";

import { PlayerState, PlayerInfoCommands, PlayerCommands } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { getPacketRegistries } from "../registries";

export const sendPlayerInfoUpdates = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();

	yield all([
		// todo strongly type this
		takeLatest(
			PlayerCommands.setSpectatingIdCommand.toString(),
			function*() {
				const spectating = yield* select((state: PlayerState) => state.spectating.id);

				registry.emit(ServerToClient.Game.PacketOpcodes.SPECTATING_PLAYER_UPDATE, spectating);
			}
		),
		takeLatest(
			PlayerCommands.updateCardsCommand,
			function*() {
				const cards = yield* select((state: PlayerState) => state.cardShop.cards);

				registry.emit(ServerToClient.Game.PacketOpcodes.CARDS_UPDATE, cards);
			}
		),
		takeLatest(
			PlayerCommands.updateShopLockCommand,
			function*() {
				const locked = yield* select((state: PlayerState) => state.cardShop.locked);

				registry.emit(ServerToClient.Game.PacketOpcodes.SHOP_LOCK_UPDATE, locked);
			}
		),
		takeLatest<PlayerInfoCommands.UpdateMoneyCommand>(
			PlayerInfoCommands.UPDATE_MONEY_COMMAND,
			function*() {
				const money = yield* select((state: PlayerState) => state.playerInfo.money);

				registry.emit(ServerToClient.Game.PacketOpcodes.MONEY_UPDATE, money);
			}
		),
		takeLatest<PlayerInfoCommands.UpdateLevelCommand>(
			PlayerInfoCommands.UPDATE_LEVEL_COMMAND,
			function*() {
				const level = yield* select((state: PlayerState) => state.playerInfo.level);
				const xp = yield* select((state: PlayerState) => state.playerInfo.xp);

				registry.emit(ServerToClient.Game.PacketOpcodes.LEVEL_UPDATE, { level, xp });
			}
		),
		takeLatest<PlayerInfoCommands.UpdateHealthCommand>(
			PlayerInfoCommands.UPDATE_HEALTH_COMMAND,
			function*() {
				const health = yield* select((state: PlayerState) => state.playerInfo.health);

				registry.emit(ServerToClient.Game.PacketOpcodes.HEALTH_UPDATE, health);
			}
		)
	]);
};
