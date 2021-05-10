import { PlayerProfile } from "@creature-chess/models";

export type DatabaseUser = {
    ref: { id: string };
    data: {
        authId: string;
        stats: {
            gamesPlayed: number;
            wins: number;
        };
        nickname?: {
            value: string;
            uppercase: string;
        };
        profile: PlayerProfile | null;
    };
};
