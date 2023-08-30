export enum StreakType {
	WIN,
	LOSS,
}

export interface PlayerStreak {
	type: StreakType;
	amount: number;
}
