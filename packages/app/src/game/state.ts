import { Reducer, Action, combineReducers } from "redux";
import { BoardSlice, BoardState } from "@creature-chess/board";
import { PieceModel, PlayerListPlayer } from "@creature-chess/models";
import { RoundInfoState, PlayerInfoState, playerInfoReducer, roundInfoReducer, PlayerState, playerReducers } from "@creature-chess/gamemode";

import { playerListReducer } from "./module";
import { UiState, uiReducer } from "./ui";
import { matchReducer, MatchState } from "./module/match";

export type GameState = PlayerState & {
	ui: UiState;

	roundInfo: RoundInfoState;
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;

	match: MatchState;

	playerInfo: PlayerInfoState;
	playerList: PlayerListPlayer[];
};

type Slices = { boardSlice: BoardSlice<PieceModel>, benchSlice: BoardSlice<PieceModel> };

export const createGameReducer = (
	{ boardSlice, benchSlice }: Slices
): Reducer<GameState, Action> =>
	combineReducers({
		...playerReducers,
		roundInfo: roundInfoReducer,
		board: boardSlice.boardReducer,
		bench: benchSlice.boardReducer,
		match: matchReducer,
		playerList: playerListReducer,
		playerInfo: playerInfoReducer,
		ui: uiReducer
	});
