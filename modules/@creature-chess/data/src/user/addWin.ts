import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { DatabaseUser } from "./databaseUser";

export const addWin =
	(logger: Logger, client: FaunaDBClient) => async (id: string) => {
		try {
			const user = await client.query<DatabaseUser>(
				q.Update(q.Ref(q.Collection("users"), id), {
					data: {
						stats: {
							wins: q.Add(
								q.Select(
									["data", "stats", "wins"],
									q.Get(q.Ref(q.Collection("users"), id))
								),
								1
							),
						},
					},
				})
			);

			return user;
		} catch (e) {
			logger.error("Error in @cc/data user.addWin", e);
			return null;
		}
	};
