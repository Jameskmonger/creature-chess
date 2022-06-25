import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { COLLECTION_NAMES } from "../constants";
import { DatabaseBot } from "./databaseBot";

export const addWin =
	(logger: Logger, client: FaunaDBClient) => async (id: string) => {
		try {
			const bot = await client.query<DatabaseBot>(
				q.Update(q.Ref(q.Collection(COLLECTION_NAMES.BOTS), id), {
					data: {
						stats: {
							wins: q.Add(
								q.Select(
									["data", "stats", "wins"],
									q.Get(q.Ref(q.Collection(COLLECTION_NAMES.BOTS), id))
								),
								1
							),
						},
					},
				})
			);

			return bot;
		} catch (e) {
			logger.error("Error in @cc/data bots.addWin", e);
			return null;
		}
	};
