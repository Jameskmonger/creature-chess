import { User, UserMetadata } from "auth0";

export interface UserAppMetadata {
    uuid: string;
    nickname?: {
        value: string;
        uppercase: string;
    };
    stats: {
        gamesPlayed: number;
        wins: number;
    };
}

export interface UserModel {
    id: string;
    authId: string;
    metadata: UserAppMetadata;
}

export type Auth0User = User<UserAppMetadata, UserMetadata>;
