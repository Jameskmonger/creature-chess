import { playerInfoCommands } from "./playerInfo/reducer";

export { updateCardsCommand, updateShopLockCommand } from "./cardShop";
export { setSpectatingIdCommand } from "./spectating";

export { playerInfoCommands };

export type PlayerInfoUpdateCommand = ReturnType<
	(typeof playerInfoCommands)[keyof typeof playerInfoCommands]
>;

export {
	PlayerInfoUpdateCommandActionTypesArray,
	buildPlayerSnapshot,
} from "./wireFields";
