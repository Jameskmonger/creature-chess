import { MAX_HEALTH } from "@creature-chess/models";
import { PlayerStatus, PlayerBattle } from "@creature-chess/models";
import { StreakType, PlayerStreak } from "@creature-chess/models";

import { networkedAction } from "../../../../events/networkedAction";

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
	opponentIsClone: boolean;
	money: number;
	ready: boolean;
	level: number;
	xp: number;
}

export const initialPlayerInfoState: PlayerInfoState = {
	status: PlayerStatus.CONNECTED,
	health: MAX_HEALTH,
	streak: {
		type: StreakType.WIN,
		amount: 0,
	},
	battle: null,
	matchRewards: null,
	opponentId: null,
	opponentIsClone: false,
	money: 0,
	ready: false,
	level: 0,
	xp: 0,
};

export const playerInfoCommands = {
	playerMatchRewardsEvent: networkedAction<
		PlayerMatchRewards | null,
		"playerInfo/playerMatchRewardsEvent"
	>("playerInfo/playerMatchRewardsEvent"),
	updateStatusCommand: networkedAction<
		PlayerStatus,
		"playerInfo/updateStatusCommand"
	>("playerInfo/updateStatusCommand"),
	updateReadyCommand: networkedAction<boolean, "playerInfo/updateReadyCommand">(
		"playerInfo/updateReadyCommand"
	),
	updateOpponentCommand: networkedAction<
		{ id: string | null; isClone?: boolean },
		"playerInfo/updateOpponentCommand"
	>("playerInfo/updateOpponentCommand"),
	updateBattleCommand: networkedAction<
		PlayerBattle | null,
		"playerInfo/updateBattleCommand"
	>("playerInfo/updateBattleCommand"),
	updateHealthCommand: networkedAction<number, "playerInfo/updateHealthCommand">(
		"playerInfo/updateHealthCommand"
	),
	updateStreakCommand: networkedAction<
		PlayerStreak,
		"playerInfo/updateStreakCommand"
	>("playerInfo/updateStreakCommand"),
	updateLevelCommand: networkedAction<
		{ level: number; xp: number },
		"playerInfo/updateLevelCommand"
	>("playerInfo/updateLevelCommand"),
	updateMoneyCommand: networkedAction<number, "playerInfo/updateMoneyCommand">(
		"playerInfo/updateMoneyCommand"
	),
};
