import { Reducer, Action, combineReducers } from "redux";
import { BoardSlice, BoardState } from "@shoki/board";
import { PieceModel, PlayerListPlayer, RoundInfoState } from "@creature-chess/models";
import { PlayerInfoState, playerInfoReducer, roundInfoReducer, PlayerState, playerReducers } from "@creature-chess/gamemode";

import { playerListReducer, quickChatReducer, QuickChat } from "./module";
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
	quickChat: QuickChat[];
};

type Slices = { boardSlice: BoardSlice<PieceModel>; benchSlice: BoardSlice<PieceModel> };

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
		ui: uiReducer,
		quickChat: quickChatReducer
	});
