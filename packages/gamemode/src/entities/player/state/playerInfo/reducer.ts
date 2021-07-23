import { STARTING_HEALTH, STARTING_LEVEL, STARTING_MONEY, StreakType, PlayerBattle, PlayerStatus, PlayerStreak, QuickChatOption } from "@creature-chess/models";
import { Reducer } from "redux";
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
	quickChat: {
		value: QuickChatOption | null;
		receivedAt: number | null;
	};
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
	xp: 0,
	quickChat: {
		value: null,
		receivedAt: null
	}
};

export const playerInfoReducer: Reducer<PlayerInfoState, PlayerInfoUpdateCommand | PlayerEvent> =
	(state = initialState, command) => {
		switch (command.type) {
			case "playerMatchRewardsEvent":
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
			case "updateBattleCommand":
				return {
					...state,
					battle: command.payload
				};
			case "updateHealthCommand":
				return {
					...state,
					health: command.payload
				};
			case "updateStreakCommand":
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
			case "playerReceiveQuickChatEvent":
				return {
					...state,
					quickChat: {
						value: command.payload.chatValue.phrase,
						receivedAt: Date.now()
					}
				};
			default:
				return state;
		}
	};
