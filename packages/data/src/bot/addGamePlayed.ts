import { Client as FaunaDBClient, query as q } from "faunadb";
import { COLLECTION_NAMES } from "../constants";

export const addGamePlayed = (client: FaunaDBClient) => {
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
			// todo check the error here - maybe no connection
			return null;
		}
	};
};
