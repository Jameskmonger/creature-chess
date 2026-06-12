import { networkedAction } from "@cc-plugins/api";

import type { PlayerBattle } from "../../game/playerList";
import { PlayerStatus } from "../../game/playerList";
import type { PlayerStreak } from "../../player/streak";

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
	updateHealthCommand: networkedAction<
		number,
		"playerInfo/updateHealthCommand"
	>("playerInfo/updateHealthCommand"),
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

export type PlayerInfoUpdateCommand = ReturnType<
	(typeof playerInfoCommands)[keyof typeof playerInfoCommands]
>;
