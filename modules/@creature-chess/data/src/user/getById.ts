import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { DatabaseUser } from "./databaseUser";

export const getById =
	(logger: Logger, client: FaunaDBClient) => async (id: string) => {
		try {
			const user = await client.query<DatabaseUser>(
				q.Get(q.Ref(q.Collection("users"), id))
			);

			return user;
		} catch (e) {
			logger.error("Error in @cc/data user.getById", e);
			return null;
		}
	};
