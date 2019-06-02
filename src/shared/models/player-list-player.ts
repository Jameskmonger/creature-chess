import { StreakType } from "./streakType";

export interface PlayerListPlayer {
    id: string;
    name: string;
    health: number;
    ready: boolean;
    streakType: StreakType | null;
    streakAmount: number | null;
}
