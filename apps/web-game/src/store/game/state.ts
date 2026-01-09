import { combineReducers } from "@reduxjs/toolkit";

import {
	PlayerInfoState,
	playerInfoReducer,
	roundInfoReducer,
	PlayerState,
	playerReducers,
} from "@creature-chess/gamemode";
import { RoundInfoState } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models/game/playerList";
import { GamemodeSettings } from "@creature-chess/models/settings";

import { quickChatReducer, QuickChatState } from "./chat/state";
import { networkReducer, NetworkState } from "./network";
import { playerListReducer } from "./playerList/state";
import { settingsReducer } from "./settings/state";
import { StatsState, statsReducer } from "./stats/state";
import { UiState, uiReducer } from "./ui";

export type GameState = PlayerState & {
	ui: UiState;

	roundInfo: RoundInfoState;

	stats: StatsState;

	playerInfo: PlayerInfoState;
	playerList: PlayerListPlayer[];
	quickChat: QuickChatState;

	settings: GamemodeSettings;

	network: NetworkState;
};

export const gameReducer = combineReducers({
	...playerReducers,
	roundInfo: roundInfoReducer,
	stats: statsReducer,
	playerList: playerListReducer,
	playerInfo: playerInfoReducer,
	ui: uiReducer,
	quickChat: quickChatReducer,
	settings: settingsReducer,
	network: networkReducer,
});
