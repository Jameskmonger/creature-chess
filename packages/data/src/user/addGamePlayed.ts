import { Logger } from "winston";
import { Client as FaunaDBClient, query as q } from "faunadb";
import { DatabaseUser } from "./databaseUser";

export const addGamePlayed = (logger: Logger, client: FaunaDBClient) => {
	return async (id: string) => {
		try {
			const user = await client.query<DatabaseUser>(
				q.Update(
					q.Ref(q.Collection("users"), id),
					{
						data: {
							stats: {
								gamesPlayed: q.Add(
									q.Select(
										["data", "stats", "gamesPlayed"],
										q.Get(q.Ref(q.Collection("users"), id))
									),
									1
								)
							}
						}
					}
				)
			);

			return user;
		} catch (e) {
			logger.error("Error in @cc/data user.addGamePlayed", e);
			return null;
		}
	};
};
