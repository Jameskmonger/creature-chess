import { BoardState } from "@creature-chess/board";
import { PieceModel } from "@creature-chess/models";

import { PlayerInfoState } from "./playerInfo";
import { RoundInfoState } from "../game/roundInfo";
import { CardShopState } from "./cardShop";

export interface PlayerState {
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;
	cardShop: CardShopState;
	playerInfo: PlayerInfoState;
	roundInfo: RoundInfoState;
}
