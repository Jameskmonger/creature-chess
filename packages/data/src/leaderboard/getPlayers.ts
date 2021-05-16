import { Logger } from "winston";
import { Client as FaunaDBClient, query as q } from "faunadb";
import { INDEX_NAMES } from "../constants";

export const getPlayers = (logger: Logger, client: FaunaDBClient) => {
	return async () => {
		try {
			const users = await client.query<{ data: [number, string][] }>(
				q.Paginate(
					q.Match(q.Index(INDEX_NAMES.USERS_BY_WINS)),
					{
						size: 10
					}
				)
			);

			return users.data.map(([wins, name]) => ({ wins, name }));
		} catch (e) {
			logger.error("Error in @cc/data leaderboard.getPlayers", e);
			return null;
		}
	};
};
