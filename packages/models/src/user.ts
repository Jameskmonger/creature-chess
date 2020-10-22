export interface SanitizedUser {
    id: string;
    nickname: string;
    stats: {
        gamesPlayed: number;
        wins: number;
    };
    registered: boolean;
}
