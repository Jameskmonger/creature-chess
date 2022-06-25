import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { COLLECTION_NAMES, INDEX_NAMES } from "../constants";
import { DatabaseBot } from "./databaseBot";

export const getLeastPlayedBots =
	(logger: Logger, client: FaunaDBClient) => async (count: number) => {
		try {
			const bots = await client.query<{ data: DatabaseBot[] }>(
				q.Map(
					q.Paginate(
						q.Match(q.Index(INDEX_NAMES.BOTS_BY_LOWEST_GAMES_PLAYED)),
						{
							size: count,
						}
					),
					q.Lambda(
						["gamesPlayed", "id", "name"],
						q.Get(q.Ref(q.Collection(COLLECTION_NAMES.BOTS), q.Var("id")))
					)
				)
			);

			return bots.data;
		} catch (e) {
			logger.error("Error in @cc/data bots.getLeastPlayedBots", e);
			return null;
		}
	};
