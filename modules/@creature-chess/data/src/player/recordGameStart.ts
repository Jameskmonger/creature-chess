import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { COLLECTION_NAMES } from "../constants";
import { Player } from "./player";

export const recordGameStart =
	(logger: Logger, client: FaunaDBClient) =>
	async (type: "bot" | "user", id: string) => {
		const collectionName =
			type === "user" ? COLLECTION_NAMES.USERS : COLLECTION_NAMES.BOTS;

		try {
			const update = await client.query<Player>(
				q.Update(q.Ref(q.Collection(collectionName), id), {
					data: {
						stats: {
							gamesPlayed: q.Add(
								q.Select(
									["data", "stats", "gamesPlayed"],
									q.Get(q.Ref(q.Collection(collectionName), id))
								),
								1
							),
						},
						ranking: {
							gamesPlayed: q.Add(
								q.Select(
									["data", "ranking", "gamesPlayed"],
									q.Get(q.Ref(q.Collection(collectionName), id))
								),
								1
							),
						},
					},
				})
			);

			return update;
		} catch (e) {
			logger.error("Error in @cc/data player.recordGameStart", e);
			return null;
		}
	};
