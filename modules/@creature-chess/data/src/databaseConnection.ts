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
	const {
		CREATURE_CHESS_FAUNA_KEY,
		CREATURE_CHESS_FAUNA_DOMAIN,
		CREATURE_CHESS_FAUNA_SCHEME,
		CREATURE_CHESS_FAUNA_PORT,
	} = process.env;

	if (!CREATURE_CHESS_FAUNA_KEY) {
		throw Error("No CREATURE_CHESS_FAUNA_KEY environment variable found");
	}

	const domain = CREATURE_CHESS_FAUNA_DOMAIN || undefined;
	const port = CREATURE_CHESS_FAUNA_PORT || undefined;
	const scheme =
		(CREATURE_CHESS_FAUNA_SCHEME as "http" | "https" | undefined) || undefined;

	try {
		const client = new FaunaDBClient({
			secret: CREATURE_CHESS_FAUNA_KEY,
			...(domain !== undefined ? { domain } : {}),
			...(port !== undefined ? { port: parseInt(port, 10) } : {}),
			...(scheme !== undefined ? { scheme } : {}),
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
