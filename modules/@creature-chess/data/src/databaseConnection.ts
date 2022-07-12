import { Client as FaunaDBClient } from "faunadb";
import { Logger } from "winston";

import { botDatabase } from "./bot";
import { playerDatabase } from "./player";
import { setup } from "./setup";
import { userDatabase } from "./user";

export type DatabaseConnection = {
	user: ReturnType<typeof userDatabase>;
	bot: ReturnType<typeof botDatabase>;
	player: ReturnType<typeof playerDatabase>;
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
		player: playerDatabase(logger, client),
	};
};
