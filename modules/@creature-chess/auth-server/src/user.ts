import { User, UserMetadata } from "auth0";

import { DatabaseUser } from "@creature-chess/data";
import { PlayerProfile } from "@creature-chess/models";

export interface UserAppMetadata {
	playerId: string;
	playerNickname: string | null;
	playerPicture: number | null;
}

export interface UserModel {
	id: string;
	authId: string;
	stats: { gamesPlayed: number; wins: number };
	nickname: string | null;
	registered: boolean;
	profile: PlayerProfile | null;
}

export type Auth0User = User<UserAppMetadata, UserMetadata>;

export const convertDatabaseUserToUserModel = (
	user: DatabaseUser
): UserModel => {
	const nickname = user.data.nickname ? user.data.nickname.value : null;
	const profile = user.data.profile
		? user.data.profile
		: { title: null, picture: null };

	return {
		id: user.ref.id,
		authId: user.data.authId,
		stats: user.data.stats,
		nickname,
		profile,
		registered: Boolean(nickname && profile.picture),
	};
};
