import { User, UserMetadata } from "auth0";

export interface UserAppMetadata {
    playerId: string;
}

export interface UserModel {
    id: string;
    authId: string;
    stats: { gamesPlayed: number; wins: number; };
    nickname?: string;
}

export type Auth0User = User<UserAppMetadata, UserMetadata>;
