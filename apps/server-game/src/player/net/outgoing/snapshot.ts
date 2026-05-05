import { Player, PlayerCommands } from "@creature-chess/gamemode";
import { GameServerToClient } from "@creature-chess/networking";

export const buildSnapshot = (
	player: Player
): Parameters<GameServerToClient.Events["snapshot"]>[0] => [
	PlayerCommands.updateCardsCommand(player.cards),
	PlayerCommands.updateShopLockCommand(player.shopLocked),
	PlayerCommands.playerInfoCommands.updateMoneyCommand(player.money),
	PlayerCommands.playerInfoCommands.updateLevelCommand({
		level: player.level,
		xp: player.xp,
	}),
	PlayerCommands.playerInfoCommands.updateHealthCommand(player.health),
	PlayerCommands.playerInfoCommands.updateOpponentCommand({
		id: player.opponentId,
		isClone: player.opponentIsClone,
	}),
];
