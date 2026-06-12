import { CardShopState, initialCardShopState } from "./cardShop";
import { PlayerInfoState, initialPlayerInfoState } from "./playerInfo";
import { SpectatingState, initialSpectatingState } from "./spectating";

export * as PlayerCommands from "./commands";

export interface PlayerState {
	cardShop: CardShopState;
	playerInfo: PlayerInfoState;
	spectating: SpectatingState;
}

export const initialPlayerState: PlayerState = {
	cardShop: initialCardShopState,
	playerInfo: initialPlayerInfoState,
	spectating: initialSpectatingState,
};
