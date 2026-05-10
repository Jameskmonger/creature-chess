import { combineReducers } from "@reduxjs/toolkit";

import {
	type CardShopState,
	type SpectatingState,
	GameEvents,
} from "@creature-chess/gamemode";
import { GamePhase, RoundInfoState } from "@creature-chess/models";

import { quickChatReducer, QuickChatState } from "./chat/state";
import { LocalPlayerState, localPlayerReducer } from "./localPlayer";
import { networkReducer, NetworkState } from "./network";
import { playerReducers } from "./playerReducers";
import { Player, playersReducer } from "./players/state";
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

export type GameState = {
	cardShop: CardShopState;
	spectating: SpectatingState;
	localPlayer: LocalPlayerState;

	ui: UiState;

	roundInfo: RoundInfoState;

	players: Player[];
	quickChat: QuickChatState;

	network: NetworkState;
};

export const gameReducer = combineReducers({
	...playerReducers,
	localPlayer: localPlayerReducer,
	roundInfo: roundInfoReducer,
	players: playersReducer,
	ui: uiReducer,
	quickChat: quickChatReducer,
	network: networkReducer,
});
