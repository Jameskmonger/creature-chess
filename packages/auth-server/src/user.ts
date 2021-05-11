import { User, UserMetadata } from "auth0";
import { DatabaseUser } from "@creature-chess/data";
import { PlayerProfile } from "@creature-chess/models";

export interface UserAppMetadata {
    playerId: string;
    playerNickname: string;
    playerPicture: number;
}

export interface UserModel {
    id: string;
    authId: string;
    stats: { gamesPlayed: number; wins: number; };
    nickname?: string;
    registered: boolean;
    profile: PlayerProfile | null;
}

export type Auth0User = User<UserAppMetadata, UserMetadata>;

export const convertDatabaseUserToUserModel = (user: DatabaseUser): UserModel => ({
    id: user.ref.id,
    authId: user.data.authId,
    stats: user.data.stats,
    nickname: user.data.nickname ? user.data.nickname.value : null,
    registered: Boolean(user.data.nickname),
    profile: user.data.profile ? user.data.profile : null
});
