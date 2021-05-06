import { User, UserMetadata } from "auth0";
import { DatabaseUser } from "@creature-chess/data";
import { PlayerTitle } from "@creature-chess/models"

export interface UserAppMetadata {
    playerId: string;
    playerNickname: string;
}

export interface UserModel {
    id: string;
    authId: string;
    stats: { gamesPlayed: number; wins: number; };
    nickname?: string;
    registered: boolean;
    title: PlayerTitle | null;
}

export type Auth0User = User<UserAppMetadata, UserMetadata>;

export const convertDatabaseUserToUserModel = (user: DatabaseUser): UserModel => ({
    id: user.ref.id,
    authId: user.data.authId,
    stats: user.data.stats,
    nickname: user.data.nickname ? user.data.nickname.value : null,
    registered: Boolean(user.data.nickname),
    title: user.data.title
});
