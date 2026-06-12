export {
	playerInfoCommands,
	type PlayerMatchRewards,
} from "@creature-chess/models";

import {
	MAX_HEALTH,
	type PlayerBattle,
	type PlayerMatchRewards as PlayerMatchRewardsT,
	PlayerStatus,
	type PlayerStreak,
	StreakType,
} from "@creature-chess/models";

export interface PlayerInfoState {
	status: PlayerStatus;
	health: number;
	streak: PlayerStreak;
	battle: PlayerBattle | null;
	matchRewards: PlayerMatchRewardsT | null;

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
