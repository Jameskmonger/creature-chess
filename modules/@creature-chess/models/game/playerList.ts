import { PlayerProfile } from "../player/profile";
import { StreakType } from "../player/streak";

export enum PlayerBattleStatus {
	IN_PROGRESS,
	FINISHED,
}

export enum PlayerStatus {
	CONNECTED,
	DEAD,
	QUIT,
}

export type PlayerBattle =
	| {
			status: PlayerBattleStatus.IN_PROGRESS;
			opponentId: string;
	  }
	| {
			status: PlayerBattleStatus.FINISHED;
			opponentId: string;
			homeScore: number;
			awayScore: number;
			isHomePlayer: boolean;
	  }
	| null;

export const inProgressBattle = (opponentId: string): PlayerBattle => ({
	status: PlayerBattleStatus.IN_PROGRESS,
	opponentId,
});

export const finishedBattle = (
	opponentId: string,
	isHomePlayer: boolean,
	homeScore: number,
	awayScore: number
): PlayerBattle => ({
	status: PlayerBattleStatus.FINISHED,
	opponentId,
	isHomePlayer,
	homeScore,
	awayScore,
});

export interface PlayerListPlayer {
	id: string;
	name: string;
	health: number;
	money: number;
	level: number;
	ready: boolean;
	streakType: StreakType | null;
	streakAmount: number | null;
	battle: PlayerBattle;
	status: PlayerStatus;
	profile: PlayerProfile | null;
}
