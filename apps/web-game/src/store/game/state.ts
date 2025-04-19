import { Reducer, Action, combineReducers } from "@reduxjs/toolkit";

import { BoardSlice, BoardState } from "@shoki/board";

import {
	PlayerInfoState,
	playerInfoReducer,
	roundInfoReducer,
	PlayerState,
	playerReducers,
} from "@creature-chess/gamemode";
import { PieceModel, RoundInfoState } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models/game/playerList";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { quickChatReducer, QuickChatState } from "./chat/state";
import { matchReducer, MatchState } from "./match/state";
import { playerListReducer } from "./playerList/state";
import { settingsReducer } from "./settings/state";
import { StatsState, statsReducer } from "./stats/state";
import { UiState, uiReducer } from "./ui";

export type GameState = PlayerState & {
	ui: UiState;

	roundInfo: RoundInfoState;
	board: BoardState<PieceModel>;
	bench: BoardState<PieceModel>;

	match: MatchState;

	stats: StatsState;

	playerInfo: PlayerInfoState;
	playerList: PlayerListPlayer[];
	quickChat: QuickChatState;

	settings: GamemodeSettings;
};

type Slices = {
	boardSlice: BoardSlice<PieceModel>;
	benchSlice: BoardSlice<PieceModel>;
};

export const createGameReducer = ({
	boardSlice,
	benchSlice,
}: Slices): Reducer<GameState, Action> =>
	combineReducers({
		...playerReducers,
		roundInfo: roundInfoReducer,
		board: boardSlice.boardReducer,
		bench: benchSlice.boardReducer,
		match: matchReducer,
		stats: statsReducer,
		playerList: playerListReducer,
		playerInfo: playerInfoReducer,
		ui: uiReducer,
		quickChat: quickChatReducer,
		settings: settingsReducer,
	});
