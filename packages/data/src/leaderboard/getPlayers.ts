import { Client as FaunaDBClient, query as q } from "faunadb";
import { INDEX_NAMES } from "../constants";

export const getPlayers = (client: FaunaDBClient) => {
    return async () => {
        try {
            const users = await client.query(
                q.Paginate(
                    q.Match(q.Index(INDEX_NAMES.USERS_BY_WINS)),
                    {
                        size: 10
                    }
                )
            );

            return users;
        } catch (e) {
            // todo check the error here - maybe no connection
            return null;
        }
    };
};
