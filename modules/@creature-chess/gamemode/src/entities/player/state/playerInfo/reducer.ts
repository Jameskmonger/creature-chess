import { Reducer } from "redux";

import { DEFAULT_GAME_OPTIONS } from "@creature-chess/models/config";
import {
	PlayerStatus,
	PlayerBattle,
} from "@creature-chess/models/game/playerList";
import { StreakType, PlayerStreak } from "@creature-chess/models/player";

import { PlayerEvent } from "../../events";
import { PlayerInfoUpdateCommand } from "../commands";

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
	health: DEFAULT_GAME_OPTIONS.game.maxHealth,
	streak: {
		type: StreakType.WIN,
		amount: 0,
	},
	battle: null,
	matchRewards: null,
	opponentId: null,
	money: 0,
	ready: false,
	level: DEFAULT_GAME_OPTIONS.game.startingLevel,
	xp: 0,
};

// TODO convert to redux toolkit
export const playerInfoReducer: Reducer<
	PlayerInfoState,
	PlayerInfoUpdateCommand | PlayerEvent
> = (state = initialState, command) => {
	switch (command.type) {
		case "playerMatchRewardsEvent":
			return {
				...state,
				matchRewards: command.payload,
			};
		case "updateStatusCommand":
			return {
				...state,
				status: command.payload,
			};
		case "updateReadyCommand":
			return {
				...state,
				ready: command.payload,
			};
		case "updateOpponentCommand":
			return {
				...state,
				opponentId: command.payload,
			};
		case "updateBattleCommand":
			return {
				...state,
				battle: command.payload,
			};
		case "updateHealthCommand":
			return {
				...state,
				health: command.payload,
			};
		case "updateStreakCommand":
			return {
				...state,
				streak: {
					amount: command.payload.amount,
					type: command.payload.type,
				},
			};
		case "updateLevelCommand":
			return {
				...state,
				level: command.payload.level,
				xp: command.payload.xp,
			};
		case "updateMoneyCommand":
			return {
				...state,
				money: command.payload,
			};

		default:
			return state;
	}
};
