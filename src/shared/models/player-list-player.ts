import { StreakType } from "./streakType";

export enum PlayerBattleStatus {
    IN_PROGRESS,
    FINISHED
}

export type PlayerBattle = {
    status: PlayerBattleStatus.IN_PROGRESS;
    opponentId: string;
} | {
    status: PlayerBattleStatus.FINISHED,
    opponentId: string;
    homeScore: number;
    awayScore: number;
} | null;

export const inProgressBattle = (opponentId: string): PlayerBattle => ({
    status: PlayerBattleStatus.IN_PROGRESS,
    opponentId
});

export const finishedBattle = (opponentId: string, homeScore: number, awayScore: number): PlayerBattle => ({
    status: PlayerBattleStatus.FINISHED,
    opponentId,
    homeScore,
    awayScore
});

export interface PlayerListPlayer {
    id: string;
    name: string;
    health: number;
    ready: boolean;
    streakType: StreakType | null;
    streakAmount: number | null;
    battle: PlayerBattle;
}
