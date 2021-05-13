import { Client as FaunaDBClient, query as q } from "faunadb";
import { INDEX_NAMES } from "../constants";

export const getLeastPlayedBots = (client: FaunaDBClient) => {
	return async (count: number) => {
		try {
			const bots = await client.query<{ data: [number, string, string][] }>(
				q.Paginate(
					q.Match(q.Index(INDEX_NAMES.BOTS_BY_LOWEST_GAMES_PLAYED)),
					{
						size: count
					}
				)
			);

			return bots.data.map(([gamesPlayed, id, name]) => ({ id, name }));
		} catch (e) {
			// todo check the error here - maybe no connection
			return null;
		}
	};
};
