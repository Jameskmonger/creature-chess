import { AnyAction, Reducer, ReducersMapObject } from "@reduxjs/toolkit";

import { BoardState } from "@shoki/board";

import { PieceModel, RoundInfoState } from "@creature-chess/models";

import { cardShopReducer, CardShopState } from "./cardShop";
import { playerInfoReducer, PlayerInfoState } from "./playerInfo";
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

export const playerReducers: ReducersMapObject<
	Pick<PlayerState, "spectating" | "cardShop" | "playerInfo">
> = {
	spectating: spectatingReducer,
	cardShop: cardShopReducer,
	playerInfo: playerInfoReducer as Reducer<PlayerInfoState, AnyAction>,
};
