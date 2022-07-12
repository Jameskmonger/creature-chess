export type Player = {
	stats: {
		gamesPlayed: number;
		wins: number;
	};
	ranking?: {
		elo: number;
		gamesPlayed: number;
	};
};
