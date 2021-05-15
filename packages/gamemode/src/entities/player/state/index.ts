import { Reducer } from "redux";
import { spectatingReducer, SpectatingState } from "./spectating";
import { BoardState } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

import { PlayerInfoState } from "../../../player/playerInfo";
import { RoundInfoState } from "../../../game/roundInfo";
import { CardShopState } from "../../../player/cardShop";

export interface PlayerState {
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;
	cardShop: CardShopState;
	playerInfo: PlayerInfoState;
	roundInfo: RoundInfoState;
	spectating: SpectatingState;
}

export const playerReducers: { spectating: Reducer<SpectatingState> } = {
	spectating: spectatingReducer
};
