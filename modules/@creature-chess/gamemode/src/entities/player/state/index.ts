import { cardShopReducer, CardShopState } from "./cardShop";
import { playerInfoReducer, PlayerInfoState } from "./playerInfo";
import { spectatingReducer, SpectatingState } from "./spectating";

export * as PlayerCommands from "./commands";

export interface PlayerState {
	cardShop: CardShopState;
	playerInfo: PlayerInfoState;
	spectating: SpectatingState;
}

export const playerReducers = {
	spectating: spectatingReducer,
	cardShop: cardShopReducer,
	playerInfo: playerInfoReducer,
};
