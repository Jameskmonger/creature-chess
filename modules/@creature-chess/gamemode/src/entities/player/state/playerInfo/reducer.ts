import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { MAX_HEALTH } from "@creature-chess/models/config";
import {
	PlayerStatus,
	PlayerBattle,
} from "@creature-chess/models/game/playerList";
import { StreakType, PlayerStreak } from "@creature-chess/models/player";

export type PlayerMatchRewards = {
	damage: number;
	justDied: boolean;
	rewardMoney: {
		total: number;
		base: number;
		winBonus: number;
		streakBonus: number;
		interest: number;
	};
};

export interface PlayerInfoState {
	status: PlayerStatus;
	health: number;
	streak: PlayerStreak;
	battle: PlayerBattle | null;
	matchRewards: PlayerMatchRewards | null;

	opponentId: string | null;
	money: number;
	ready: boolean;
	level: number;
	xp: number;
}

const initialState: PlayerInfoState = {
	status: PlayerStatus.CONNECTED,
	health: MAX_HEALTH,
	streak: {
		type: StreakType.WIN,
		amount: 0,
	},
	battle: null,
	matchRewards: null,
	opponentId: null,
	money: 0,
	ready: false,
	level: 0,
	xp: 0,
};

const playerInfoSlice = createSlice({
	name: "playerInfo",
	initialState,
	reducers: {
		playerMatchRewardsEvent: (
			state,
			action: PayloadAction<PlayerMatchRewards | null>
		) => {
			state.matchRewards = action.payload;
		},
		updateStatusCommand: (state, action: PayloadAction<PlayerStatus>) => {
			state.status = action.payload;
		},
		updateReadyCommand: (state, action: PayloadAction<boolean>) => {
			state.ready = action.payload;
		},
		updateOpponentCommand: (state, action: PayloadAction<string | null>) => {
			state.opponentId = action.payload;
		},
		updateBattleCommand: (
			state,
			action: PayloadAction<PlayerBattle | null>
		) => {
			state.battle = action.payload;
		},
		updateHealthCommand: (state, action: PayloadAction<number>) => {
			state.health = action.payload;
		},
		updateStreakCommand: (state, action: PayloadAction<PlayerStreak>) => {
			state.streak = action.payload;
		},
		updateLevelCommand: (
			state,
			action: PayloadAction<{ level: number; xp: number }>
		) => {
			state.level = action.payload.level;
			state.xp = action.payload.xp;
		},
		updateMoneyCommand: (state, action: PayloadAction<number>) => {
			state.money = action.payload;
		},
	},
});

export const playerInfoReducer = playerInfoSlice.reducer;
export const playerInfoCommands = playerInfoSlice.actions;
