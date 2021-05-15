import { Reducer, Action, combineReducers } from "redux";
import { BoardSlice, BoardState } from "@creature-chess/board";
import { PieceModel, PlayerListPlayer } from "@creature-chess/models";
import { RoundInfoState, PlayerInfoState, playerInfoReducer, roundInfoReducer, PlayerState, playerReducers } from "@creature-chess/gamemode";

import { playerListReducer } from "./module";
import { UiState, uiReducer } from "./ui";

export type GameState = PlayerState & {
	ui: UiState;

	roundInfo: RoundInfoState;
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;

	playerInfo: PlayerInfoState;
	playerList: PlayerListPlayer[];
};

export const createGameReducer = (
	{ boardSlice, benchSlice }: { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> }
): Reducer<GameState, Action> =>
	combineReducers({
		...playerReducers,
		roundInfo: roundInfoReducer,
		board: boardSlice.boardReducer,
		bench: benchSlice.boardReducer,
		playerList: playerListReducer,
		playerInfo: playerInfoReducer,
		ui: uiReducer
	});
