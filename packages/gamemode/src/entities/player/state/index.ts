import { Reducer, ReducersMapObject } from "redux";
import { BoardState } from "@shoki/board";
import { PieceModel } from "@creature-chess/models";

import { PlayerInfoState } from "../../../player/playerInfo";
import { RoundInfoState } from "../../../game/roundInfo";

import { updateCardsCommand, updateShopLockCommand, cardShopReducer, CardShopState } from "./cardShop";
import { setSpectatingIdCommand, spectatingReducer, SpectatingState } from "./spectating";

export interface PlayerState {
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;
	cardShop: CardShopState;
	playerInfo: PlayerInfoState;
	roundInfo: RoundInfoState;
	spectating: SpectatingState;
}

export const playerReducers: ReducersMapObject<Pick<PlayerState, "spectating" | "cardShop">> = {
	spectating: spectatingReducer,
	cardShop: cardShopReducer
};

export const PlayerCommands = {
	setSpectatingIdCommand, updateCardsCommand, updateShopLockCommand
};
