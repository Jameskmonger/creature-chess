import { takeLatest, all } from "redux-saga/effects";
import { select } from "typed-redux-saga";

import { PlayerState, PlayerInfoCommands, PlayerCommands, PlayerStateSelectors } from "@creature-chess/gamemode";
import { ServerToClient } from "@creature-chess/networking";
import { getPacketRegistries } from "../registries";

export const sendPlayerInfoUpdates = function*() {
	const { outgoing: registry } = yield* getPacketRegistries();

	const initialCards = yield* select(PlayerStateSelectors.getPlayerCards);
	registry.emit(ServerToClient.Game.PacketOpcodes.CARDS_UPDATE, initialCards);

	const initialLocked = yield* select(PlayerStateSelectors.isPlayerShopLocked);
	registry.emit(ServerToClient.Game.PacketOpcodes.SHOP_LOCK_UPDATE, initialLocked);

	const initialMoney = yield* select(PlayerStateSelectors.getPlayerMoney);
	registry.emit(ServerToClient.Game.PacketOpcodes.MONEY_UPDATE, initialMoney);

	const initialLevel = yield* select(PlayerStateSelectors.getPlayerLevel);
	const initialXp = yield* select(PlayerStateSelectors.getPlayerXp);
	registry.emit(ServerToClient.Game.PacketOpcodes.LEVEL_UPDATE, { level: initialLevel, xp: initialXp });

	const initialHealth = yield* select(PlayerStateSelectors.getPlayerHealth);
	registry.emit(ServerToClient.Game.PacketOpcodes.HEALTH_UPDATE, initialHealth);

	const initialOpponentId = yield* select(PlayerStateSelectors.getOpponentId);
	registry.emit(ServerToClient.Game.PacketOpcodes.OPPONENT_ID_UPDATE, initialOpponentId);

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
			PlayerCommands.updateCardsCommand.toString(),
			function*() {
				const cards = yield* select(PlayerStateSelectors.getPlayerCards);
				registry.emit(ServerToClient.Game.PacketOpcodes.CARDS_UPDATE, cards);
			}
		),
		takeLatest(
			PlayerCommands.updateShopLockCommand.toString(),
			function*() {
				const locked = yield* select(PlayerStateSelectors.isPlayerShopLocked);
				registry.emit(ServerToClient.Game.PacketOpcodes.SHOP_LOCK_UPDATE, locked);
			}
		),
		takeLatest<PlayerInfoCommands.UpdateMoneyCommand>(
			PlayerInfoCommands.updateMoneyCommand.toString(),
			function*({ payload: money }) {
				registry.emit(ServerToClient.Game.PacketOpcodes.MONEY_UPDATE, money);
			}
		),
		takeLatest<PlayerInfoCommands.UpdateLevelCommand>(
			PlayerInfoCommands.updateLevelCommand.toString(),
			function*({ payload: { level, xp } }) {
				registry.emit(ServerToClient.Game.PacketOpcodes.LEVEL_UPDATE, { level, xp });
			}
		),
		takeLatest<PlayerInfoCommands.UpdateHealthCommand>(
			PlayerInfoCommands.updateHealthCommand.toString(),
			function*({ payload: health }) {
				registry.emit(ServerToClient.Game.PacketOpcodes.HEALTH_UPDATE, health);
			}
		),
		takeLatest<PlayerInfoCommands.UpdateOpponentCommand>(
			PlayerInfoCommands.updateOpponentCommand.toString(),
			function*({ payload: opponentId }) {
				registry.emit(ServerToClient.Game.PacketOpcodes.OPPONENT_ID_UPDATE, opponentId);
			}
		)
	]);
};
