export type DatabaseBot = {
	ref: { id: string };
	data: {
		nickname: string;
		stats: {
			gamesPlayed: number;
			wins: number;
		};
	};
};
