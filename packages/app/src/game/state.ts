import { Reducer, Action, combineReducers } from "redux";
import { BoardSlice, BoardState } from "@creature-chess/board";
import { Card, PieceModel, PlayerListPlayer } from "@creature-chess/models";
import { RoundInfoState, PlayerInfoState, playerInfoReducer, PlayerReducers, roundInfoReducer } from "@creature-chess/gamemode";

import { playerListReducer } from "./module";
import { UiState, uiReducer } from "./ui";

export type GameState = {
	ui: UiState;

	roundInfo: RoundInfoState;
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;

	playerInfo: PlayerInfoState;
	cardShop: {
		cards: (Card | null)[],
		locked: boolean
	};
	playerList: PlayerListPlayer[];
};

export const createGameReducer = (
	{ boardSlice, benchSlice }: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
): Reducer<GameState, Action> =>
	combineReducers({
		roundInfo: roundInfoReducer,
		board: boardSlice.boardReducer,
		bench: benchSlice.boardReducer,
		playerList: playerListReducer,
		playerInfo: playerInfoReducer,
		cardShop: PlayerReducers.cardShopReducer,
		ui: uiReducer
	});
