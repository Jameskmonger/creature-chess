import { ReducersMapObject } from "redux";
import { BoardState } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";

import { playerInfoReducer, PlayerInfoState } from "./playerInfo";
import { RoundInfoState } from "../../../game/roundInfo";

import { cardShopReducer, CardShopState } from "./cardShop";
import { spectatingReducer, SpectatingState } from "./spectating";

export * as PlayerCommands from "./commands";

export interface PlayerState {
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;
	cardShop: CardShopState;
	playerInfo: PlayerInfoState;
	roundInfo: RoundInfoState;
	spectating: SpectatingState;
}

export const playerReducers: ReducersMapObject<Pick<PlayerState, "spectating" | "cardShop" | "playerInfo">> = {
	spectating: spectatingReducer,
	cardShop: cardShopReducer,
	playerInfo: playerInfoReducer
};
