import { STARTING_HEALTH, STARTING_LEVEL, STARTING_MONEY, StreakType, PlayerBattle, PlayerStatus } from "@creature-chess/models";
import { PlayerInfoCommand, UPDATE_STREAK_COMMAND, UPDATE_BATTLE_COMMAND } from "./commands";
import { PlayerEvent, PLAYER_MATCH_REWARDS_EVENT } from "../../entities/player/events";

export interface PlayerStreak {
	type: StreakType;
	amount: number;
}

export type PlayerMatchRewards = {
	damage: number;
	justDied: boolean;
	rewardMoney: {
		total: number,
		base: number,
		winBonus: number,
		streakBonus: number,
		interest: number
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
	health: STARTING_HEALTH,
	streak: {
		type: StreakType.WIN,
		amount: 0
	},
	battle: null,
	matchRewards: null,
	opponentId: null,
	money: STARTING_MONEY,
	ready: false,
	level: STARTING_LEVEL,
	xp: 0
};

export function playerInfoReducer(state: PlayerInfoState = initialState, command: PlayerInfoCommand | PlayerEvent): PlayerInfoState {
	switch (command.type) {
		case PLAYER_MATCH_REWARDS_EVENT:
			return {
				...state,
				matchRewards: command.payload
			};
		case "updateStatusCommand":
			return {
				...state,
				status: command.payload
			};
		case "updateReadyCommand":
			return {
				...state,
				ready: command.payload
			};
		case "updateOpponentCommand":
			return {
				...state,
				opponentId: command.payload
			};
		case UPDATE_BATTLE_COMMAND:
			return {
				...state,
				battle: command.payload.battle
			};
		case "updateHealthCommand":
			return {
				...state,
				health: command.payload
			};
		case UPDATE_STREAK_COMMAND:
			return {
				...state,
				streak: {
					amount: command.payload.amount,
					type: command.payload.type
				}
			};
		case "updateLevelCommand":
			return {
				...state,
				level: command.payload.level,
				xp: command.payload.xp
			};
		case "updateMoneyCommand":
			return {
				...state,
				money: command.payload
			};
		default:
			return state;
	}
}
