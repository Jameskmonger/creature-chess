import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { DatabaseUser } from "./databaseUser";

export const create =
	(logger: Logger, client: FaunaDBClient) => async (authId: string) => {
		try {
			const data: DatabaseUser["data"] = {
				authId,
				stats: {
					gamesPlayed: 0,
					wins: 0,
				},
				ranking: {
					elo: 1600,
					gamesPlayed: 0,
				},
			};

			const user = await client.query<DatabaseUser>(
				q.Create(q.Collection("users"), {
					data,
				})
			);

			return user;
		} catch (e) {
			logger.error("Error in @cc/data user.create", e);
			return null;
		}
	};
