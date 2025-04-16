import { updateCardsCommand, updateShopLockCommand } from "./cardShop";
import { playerInfoCommands } from "./playerInfo/reducer";
import { setSpectatingIdCommand } from "./spectating";

export { updateCardsCommand, updateShopLockCommand } from "./cardShop";
export { setSpectatingIdCommand } from "./spectating";

export { playerInfoCommands };

export type PlayerInfoUpdateCommand = ReturnType<
	(typeof playerInfoCommands)[keyof typeof playerInfoCommands]
>;

export const PlayerInfoUpdateCommandActionTypesArray = [
	setSpectatingIdCommand.toString(),
	updateCardsCommand.toString(),
	updateShopLockCommand.toString(),
	playerInfoCommands.playerMatchRewardsEvent.toString(),
	playerInfoCommands.updateMoneyCommand.toString(),
	playerInfoCommands.updateLevelCommand.toString(),
	playerInfoCommands.updateHealthCommand.toString(),
	playerInfoCommands.updateOpponentCommand.toString(),
	playerInfoCommands.updateReadyCommand.toString(),
];
