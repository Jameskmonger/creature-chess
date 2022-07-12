import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { COLLECTION_NAMES } from "../constants";

export const getElo =
	(logger: Logger, client: FaunaDBClient) =>
	async (type: "bot" | "user", id: string) => {
		try {
			const collectionName =
				type === "user" ? COLLECTION_NAMES.USERS : COLLECTION_NAMES.BOTS;

			const elo = await client.query<number>(
				q.Select(
					["data", "ranking", "elo"],
					q.Get(q.Ref(q.Collection(collectionName), id)),
					1600
				)
			);

			return elo;
		} catch (e) {
			logger.error("Error in @cc/data player.getElo", e);
			return null;
		}
	};
