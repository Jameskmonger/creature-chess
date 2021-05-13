import { Client as FaunaDBClient } from "faunadb";
import { setup } from "./setup";
import { userDatabase, UserDatabaseFunctions } from "./user";
import { leaderboardDatabase, LeaderboardDatabaseFunctions } from "./leaderboard";
import { botDatabase, BotDatabaseFunctions } from "./bot";

export type DatabaseConnection = {
	user: UserDatabaseFunctions;
	leaderboard: LeaderboardDatabaseFunctions;
	bot: BotDatabaseFunctions;
};

export const createDatabaseConnection = (faunaSecret: string): DatabaseConnection => {
	const client = new FaunaDBClient({ secret: faunaSecret });

	setup(client);

	return {
		user: userDatabase(client),
		leaderboard: leaderboardDatabase(client),
		bot: botDatabase(client)
	};
};
