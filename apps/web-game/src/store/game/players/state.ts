import { GameEvents } from "@creature-chess/models";
import { createAction, createReducer } from "@reduxjs/toolkit";

import {
	PlayerBattle,
	PlayerListPlayer,
	PlayerStatus,
	StreakType,
} from "@creature-chess/models";

/**
 * Client-side projection of a Game participant.
 */
export type Player = PlayerListPlayer;

const initialState: Player[] = [];

const updateLocalPlayer = (
	state: Player[],
	id: string,
	patch: (player: Player) => void
) => {
	const player = state.find((p) => p.id === id);
	if (player) {
		patch(player);
	}
};

export const playersActions = {
	setLocalHealth: createAction<{ id: string; health: number }>(
		"players/setLocalHealth"
	),
	setLocalMoney: createAction<{ id: string; money: number }>(
		"players/setLocalMoney"
	),
	setLocalLevel: createAction<{ id: string; level: number }>(
		"players/setLocalLevel"
	),
	setLocalReady: createAction<{ id: string; ready: boolean }>(
		"players/setLocalReady"
	),
	setLocalStreak: createAction<{
		id: string;
		streakType: StreakType | null;
		streakAmount: number | null;
	}>("players/setLocalStreak"),
	setLocalBattle: createAction<{ id: string; battle: PlayerBattle }>(
		"players/setLocalBattle"
	),
	setLocalStatus: createAction<{ id: string; status: PlayerStatus }>(
		"players/setLocalStatus"
	),
};

export const playersReducer = createReducer<Player[]>(
	initialState,
	(builder) => {
		builder
			.addCase(GameEvents.playerListChangedEvent, (_state, action) => [
				...action.payload.players,
			])
			.addCase(playersActions.setLocalHealth, (state, action) => {
				updateLocalPlayer(state, action.payload.id, (p) => {
					p.health = action.payload.health;
				});
			})
			.addCase(playersActions.setLocalMoney, (state, action) => {
				updateLocalPlayer(state, action.payload.id, (p) => {
					p.money = action.payload.money;
				});
			})
			.addCase(playersActions.setLocalLevel, (state, action) => {
				updateLocalPlayer(state, action.payload.id, (p) => {
					p.level = action.payload.level;
				});
			})
			.addCase(playersActions.setLocalReady, (state, action) => {
				updateLocalPlayer(state, action.payload.id, (p) => {
					p.ready = action.payload.ready;
				});
			})
			.addCase(playersActions.setLocalStreak, (state, action) => {
				updateLocalPlayer(state, action.payload.id, (p) => {
					p.streakType = action.payload.streakType;
					p.streakAmount = action.payload.streakAmount;
				});
			})
			.addCase(playersActions.setLocalBattle, (state, action) => {
				updateLocalPlayer(state, action.payload.id, (p) => {
					p.battle = action.payload.battle;
				});
			})
			.addCase(playersActions.setLocalStatus, (state, action) => {
				updateLocalPlayer(state, action.payload.id, (p) => {
					p.status = action.payload.status;
				});
			});
	}
);
