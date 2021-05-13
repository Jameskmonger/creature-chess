// tslint:disable: no-console
import { DatabaseConnection } from "@creature-chess/data";
import { Request, Response } from "express";

export const leaderboard = (database: DatabaseConnection) => {
	const createLeaderboardCache = () => {
		const TIME_LIVE = 120 * 1000;
		let cachedValue: { name: string, wins: number }[] | null = null;
		let cacheValidUntil = 0;

		return async () => {
			const currentTime = Date.now();
			if (cachedValue && currentTime < cacheValidUntil) {
				console.log("Retrieved cached leaderboard value");
				return cachedValue;
			}

			console.log("Getting new value from database");

			const users = await database.leaderboard.getPlayers();

			if (users) {
				console.log("Setting new cached value");
				cachedValue = users;
				cacheValidUntil = Date.now() + TIME_LIVE;
				return users;
			}

			console.log("Falling back to cached value");

			return cachedValue;
		};
	};
	const getLeaderboardPlayers = createLeaderboardCache();

	return async (req: Request, res: Response) => {
		const users = await getLeaderboardPlayers();

		res.send(users);
	};
};
