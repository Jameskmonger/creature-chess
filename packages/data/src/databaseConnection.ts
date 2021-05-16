import { Logger } from "winston";
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

export const createDatabaseConnection = (logger: Logger, faunaSecret: string): DatabaseConnection => {
	const client = new FaunaDBClient({ secret: faunaSecret });

	try {
		setup(client);
	} catch (e) {
		logger.error("Error in @cc/data setting up database", e);
		throw e;
	}

	return {
		user: userDatabase(logger, client),
		leaderboard: leaderboardDatabase(logger, client),
		bot: botDatabase(logger, client)
	};
};
