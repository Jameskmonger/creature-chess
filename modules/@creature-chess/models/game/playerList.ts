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
			opponentIsClone: boolean;
	  }
	| {
			status: PlayerBattleStatus.FINISHED;
			opponentId: string;
			opponentIsClone: boolean;
			homeScore: number;
			awayScore: number;
			isHomePlayer: boolean;
	  }
	| null;

export const inProgressBattle = (
	opponentId: string,
	opponentIsClone: boolean
): PlayerBattle => ({
	status: PlayerBattleStatus.IN_PROGRESS,
	opponentId,
	opponentIsClone,
});

export const finishedBattle = (
	opponentId: string,
	opponentIsClone: boolean,
	isHomePlayer: boolean,
	homeScore: number,
	awayScore: number
): PlayerBattle => ({
	status: PlayerBattleStatus.FINISHED,
	opponentId,
	opponentIsClone,
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
