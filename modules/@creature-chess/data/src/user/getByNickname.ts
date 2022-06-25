import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { DatabaseUser } from "./databaseUser";

export const getByNickname =
	(logger: Logger, client: FaunaDBClient) => async (nickname: string) => {
		try {
			const user = await client.query<DatabaseUser>(
				q.Get(
					q.Match(
						q.Index("users_by_nickname_uppercase"),
						nickname.toUpperCase()
					)
				)
			);

			return user;
		} catch (e) {
			logger.error("Error in @cc/data user.getByNickname", e);
			return null;
		}
	};
