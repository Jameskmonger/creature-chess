import { Client as FaunaDBClient, query as q } from "faunadb";
import { Logger } from "winston";

import { COLLECTION_NAMES } from "../constants";
import { Player } from "./player";

type RecordGameFinishData = {
	win: boolean;
	eloChange: number;
};

export const recordGameFinish =
	(logger: Logger, client: FaunaDBClient) =>
	async (type: "bot" | "user", id: string, data: RecordGameFinishData) => {
		const collectionName =
			type === "user" ? COLLECTION_NAMES.USERS : COLLECTION_NAMES.BOTS;

		try {
			const update = await client.query<Player>(
				q.Update(q.Ref(q.Collection(collectionName), id), {
					data: {
						stats: {
							wins: q.Add(
								q.Select(
									["data", "stats", "gamesPlayed"],
									q.Get(q.Ref(q.Collection(collectionName), id))
								),
								data.win ? 1 : 0
							),
						},
						ranking: {
							elo: q.Add(
								q.Select(
									["data", "ranking", "gamesPlayed"],
									q.Get(q.Ref(q.Collection(collectionName), id))
								),
								data.eloChange
							),
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
			logger.error("Error in @cc/data player.recordGameFinish", e);
			return null;
		}
	};
