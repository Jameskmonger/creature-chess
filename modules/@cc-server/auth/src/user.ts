import { PlayerProfile } from "@creature-chess/models/player";

import { DatabaseUser } from "@cc-server/data";

export interface UserModel {
	id: string;
	authId: string;
	stats: { gamesPlayed: number; wins: number };
	nickname: string | null;
	registered: boolean;
	profile: PlayerProfile | null;
}

export const convertDatabaseUserToUserModel = (
	user: DatabaseUser
): UserModel => {
	const nickname = user.nickname || null;

	// TODO reimplement Title (load from DB)
	const profile = {
		title: null, // user.profile_title || null,
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
