export interface SanitizedUser {
	id: string;
	nickname: string | null;
	stats: {
		gamesPlayed: number;
		wins: number;
	};
	registered: boolean;
}
