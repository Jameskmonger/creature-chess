import {
	type CardShopState,
	type SpectatingState,
	GameEvents,
	GamePhase,
	RoundInfoState,
} from "@creature-chess/models";
import { combineReducers } from "@reduxjs/toolkit";
import { buildPluginsReducer } from "~/plugins/redux";
import { pluginRegistry } from "~/plugins/registry";

import { Announcement, announcementsReducer } from "./announcements";
import { LocalPlayerState, localPlayerReducer } from "./localPlayer";
import { networkReducer, NetworkState } from "./network";
import { playerReducers } from "./playerReducers";
import { Player, playersReducer } from "./players/state";
import { quickChatReducer, type QuickChatState } from "./quickChat";
import { UiState, uiReducer } from "./ui";

const initialRoundInfo: RoundInfoState = {
	round: 1,
	phase: GamePhase.PREPARING,
	phaseStartedAtSeconds: 0,
};

const roundInfoReducer = (
	state: RoundInfoState = initialRoundInfo,
	action: {
		type: string;
		payload?: { phase: GamePhase; startedAt: number; round?: number };
	}
): RoundInfoState => {
	if (
		action.type !== GameEvents.gamePhaseStartedEvent.type ||
		!action.payload
	) {
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

	announcements: { items: Announcement[]; nextId: number };

	/** Per-plugin Redux state, mounted by id. */
	plugins: { [sliceName: string]: unknown };

	network: NetworkState;
};

export const createGameReducer = () =>
	combineReducers({
		...playerReducers,
		localPlayer: localPlayerReducer,
		roundInfo: roundInfoReducer,
		players: playersReducer,
		quickChat: quickChatReducer,
		announcements: announcementsReducer,
		ui: uiReducer,
		plugins: buildPluginsReducer(pluginRegistry),
		network: networkReducer,
	});
