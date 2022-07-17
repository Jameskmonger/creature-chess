// tslint:disable: no-console
import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { setupBotDatabase } from "./bot";
import { setupUserDatabase } from "./user";

export const setup = async (logger: Logger, client: FaunaDBClient) => {
	const userChangesMade = await setupUserDatabase(client);
	const botChangesMade = await setupBotDatabase(client);

	if (!userChangesMade && !botChangesMade) {
		logger.info("Database up to date, no changes required");
	}
};
