import { Logger } from "winston";
import { Client as FaunaDBClient, query as q } from "faunadb";
import { COLLECTION_NAMES } from "../constants";

export const addGamePlayed = (logger: Logger, client: FaunaDBClient) => {
	return async (id: string) => {
		try {
			const bot = await client.query(
				q.Update(
					q.Ref(q.Collection(COLLECTION_NAMES.BOTS), id),
					{
						data: {
							stats: {
								gamesPlayed: q.Add(
									q.Select(
										["data", "stats", "gamesPlayed"],
										q.Get(q.Ref(q.Collection(COLLECTION_NAMES.BOTS), id))
									),
									1
								)
							}
						}
					}
				)
			);

			return bot;
		} catch (e) {
			logger.error("Error in @cc/data bots.addGamePlayed", e);
			return null;
		}
	};
};
