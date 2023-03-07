import { User, UserMetadata } from "auth0";

import { DatabaseUser } from "@creature-chess/data";
import { PlayerProfile } from "@creature-chess/models";

export interface UserAppMetadata {
	playerId: string;
	playerNickname: string | null;
	playerPicture: number | null;
}

export interface UserModel {
	id: number;
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
	const nickname = user.nickname || null;

	const profile = {
		title: user.profile_title || null,
		picture: user.profile_picture || null,
	};

	const stats = {
		gamesPlayed: user.games_played,
		wins: user.wins,
	};

	return {
		id: user.id,
		authId: user.auth_id,
		stats,
		nickname,
		profile,
		registered: Boolean(nickname && profile.picture),
	};
};
