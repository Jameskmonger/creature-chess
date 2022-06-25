import { Client as FaunaDBClient } from "faunadb";
import { Logger } from "winston";

import { botDatabase, BotDatabaseFunctions } from "./bot";
import { setup } from "./setup";
import { userDatabase, UserDatabaseFunctions } from "./user";

export type DatabaseConnection = {
	user: UserDatabaseFunctions;
	bot: BotDatabaseFunctions;
};

export const createDatabaseConnection = (
	logger: Logger,
	faunaSecret: string
): DatabaseConnection => {
	const client = new FaunaDBClient({ secret: faunaSecret });

	try {
		setup(client);
	} catch (e) {
		logger.error("Error in @cc/data setting up database", e);
		throw e;
	}

	return {
		user: userDatabase(logger, client),
		bot: botDatabase(logger, client),
	};
};
