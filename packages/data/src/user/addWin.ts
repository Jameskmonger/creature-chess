import { Client as FaunaDBClient, query as q } from "faunadb";
import { DatabaseUser } from "./databaseUser";

export const addWin = (client: FaunaDBClient) => {
    return async (id: string) => {
        try {
            const user = await client.query<DatabaseUser>(
                q.Update(
                    q.Ref(q.Collection("users"), id),
                    {
                        data: {
                            stats: {
                                wins: q.Add(
                                    q.Select(
                                        ["data", "stats", "wins"],
                                        q.Get(q.Ref(q.Collection("users"), id))
                                    ),
                                    1
                                )
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
