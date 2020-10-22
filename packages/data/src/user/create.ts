import { Client as FaunaDBClient, query as q } from "faunadb";
import { DatabaseUser } from "./databaseUser";

export const create = (client: FaunaDBClient) => {
    return async (authId: string) => {
        try {
            const user = await client.query<DatabaseUser>(
                q.Create(
                    q.Collection("users"),
                    {
                        data: {
                            authId,
                            stats: {
                                gamesPlayed: 0,
                                wins: 0
                            }
                        }
                    }
                )
            );

            return user;
        } catch (e) {
            // todo check the error here - maybe no connection
            return null;
        }
    };
};
