// tslint:disable: no-console
import { Client as FaunaDBClient, query as q } from "faunadb";

import { setupBotDatabase } from "./bot";
import { setupUserDatabase } from "./user";

export const setup = async (client: FaunaDBClient) => {
	const userChangesMade = await setupUserDatabase(client);
	const botChangesMade = await setupBotDatabase(client);

	if (!userChangesMade && !botChangesMade) {
		console.log("Database up to date, no changes required");
	}
};
