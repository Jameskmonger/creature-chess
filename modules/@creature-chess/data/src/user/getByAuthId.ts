import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { DatabaseUser } from "./databaseUser";

export const getByAuthId =
	(logger: Logger, client: FaunaDBClient) => async (authId: string) => {
		try {
			const user = await client.query<DatabaseUser>(
				q.Get(q.Match(q.Index("users_by_auth_id"), authId))
			);

			return user;
		} catch (e) {
			logger.error("Error in @cc/data user.getByAuthId", e);
			return null;
		}
	};
