import { StreakType } from "./streakType";

export enum PlayerBattleStatus {
    IN_PROGRESS,
    FINISHED
}

export enum PlayerStatus {
    CONNECTED,
    QUIT
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
    title: {
        className: string;
        text: string;
    } | null;
    health: number;
    money: number;
    level: number;
    ready: boolean;
    streakType: StreakType | null;
    streakAmount: number | null;
    battle: PlayerBattle;
    roundDiedAt: number | null;
    status: PlayerStatus;
}
