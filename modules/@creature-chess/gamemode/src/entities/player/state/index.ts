import { RoundInfoState } from "@creature-chess/models";

import { cardShopReducer, CardShopState } from "./cardShop";
import { playerInfoReducer, PlayerInfoState } from "./playerInfo";
import { spectatingReducer, SpectatingState } from "./spectating";

export * as PlayerCommands from "./commands";

export interface PlayerState {
	cardShop: CardShopState;
	playerInfo: PlayerInfoState;
	roundInfo: RoundInfoState;
	spectating: SpectatingState;
}

export const playerReducers = {
	spectating: spectatingReducer,
	cardShop: cardShopReducer,
	playerInfo: playerInfoReducer,
};
