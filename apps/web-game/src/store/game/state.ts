import { combineReducers } from "@reduxjs/toolkit";

import {
	PlayerInfoState,
	playerInfoReducer,
	PlayerState,
	playerReducers,
	GameEvents,
} from "@creature-chess/gamemode";
import { GamePhase, RoundInfoState } from "@creature-chess/models";
import { PlayerListPlayer } from "@creature-chess/models";
import { GamemodeSettings } from "@creature-chess/models";

import { quickChatReducer, QuickChatState } from "./chat/state";
import { networkReducer, NetworkState } from "./network";
import { playerListReducer } from "./playerList/state";
import { settingsReducer } from "./settings/state";
import { UiState, uiReducer } from "./ui";

const initialRoundInfo: RoundInfoState = {
	round: 1,
	phase: GamePhase.PREPARING,
	phaseStartedAtSeconds: 0,
};

const roundInfoReducer = (
	state: RoundInfoState = initialRoundInfo,
	action: { type: string; payload?: { phase: GamePhase; startedAt: number; round?: number } }
): RoundInfoState => {
	if (action.type !== GameEvents.gamePhaseStartedEvent.type || !action.payload) {
		return state;
	}
	const { phase, startedAt, round } = action.payload;
	return {
		...state,
		phase,
		phaseStartedAtSeconds: Math.floor(startedAt),
		...(round ? { round } : {}),
	};
};

export type GameState = PlayerState & {
	ui: UiState;

	roundInfo: RoundInfoState;

	playerInfo: PlayerInfoState;
	playerList: PlayerListPlayer[];
	quickChat: QuickChatState;

	settings: GamemodeSettings;

	network: NetworkState;
};

export const gameReducer = combineReducers({
	...playerReducers,
	roundInfo: roundInfoReducer,
	playerList: playerListReducer,
	playerInfo: playerInfoReducer,
	ui: uiReducer,
	quickChat: quickChatReducer,
	settings: settingsReducer,
	network: networkReducer,
});
