import { Client as FaunaDBClient } from "faunadb";
import { Logger } from "winston";

import { botDatabase, BotDatabaseFunctions } from "./bot";
import { setup } from "./setup";
import { userDatabase, UserDatabaseFunctions } from "./user";

export type DatabaseConnection = {
	user: UserDatabaseFunctions;
	bot: BotDatabaseFunctions;
};

export const createDatabaseConnection = async (
	logger: Logger
): Promise<DatabaseConnection> => {
	const { CREATURE_CHESS_FAUNA_KEY, CREATURE_CHESS_FAUNA_DOMAIN } = process.env;

	if (!CREATURE_CHESS_FAUNA_KEY) {
		throw Error("No CREATURE_CHESS_FAUNA_KEY environment variable found");
	}

	const domain = CREATURE_CHESS_FAUNA_DOMAIN || undefined;
	const scheme = CREATURE_CHESS_FAUNA_DOMAIN ? "http" : undefined;
	const port = CREATURE_CHESS_FAUNA_DOMAIN ? 8443 : undefined;

	try {
		const client = new FaunaDBClient({
			secret: CREATURE_CHESS_FAUNA_KEY,
			domain,
			scheme,
			port,
		});

		await setup(logger, client);

		return {
			user: userDatabase(logger, client),
			bot: botDatabase(logger, client),
		};
	} catch (e) {
		logger.error("Error in @cc/data setting up database", e);
		throw e;
	}
};
