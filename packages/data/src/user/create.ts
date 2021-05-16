import { Logger } from "winston";
import { Client as FaunaDBClient, query as q } from "faunadb";
import { DatabaseUser } from "./databaseUser";

export const create = (logger: Logger, client: FaunaDBClient) => {
	return async (authId: string) => {
		try {
			const user = await client.query<DatabaseUser>(
				q.Create(
					q.Collection("users"),
					{
						data: {
							authId,
							stats: {
								gamesPlayed: 0,
								wins: 0
							}
						}
					}
				)
			);

			return user;
		} catch (e) {
			logger.error("Error in @cc/data user.create", e);
			return null;
		}
	};
};
