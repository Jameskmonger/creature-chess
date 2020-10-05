import { UserModel } from "@creature-chess/auth-server";

interface SanitizedUser {
    id: string;
    nickname: string;
    stats: {
        gamesPlayed: number;
        wins: number;
    };
}

export const sanitize = (user: UserModel): SanitizedUser => {
    const {
        id,
        nickname,
        stats
    } = user;

    return {
        id,
        nickname,
        stats
    };
};
