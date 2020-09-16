import { Client as FaunaDBClient, query as q } from "faunadb";

export const addGamePlayed = (client: FaunaDBClient) => {
    return async (id: string) => {
        try {
            const user = await client.query(
                q.Update(
                    q.Ref(q.Collection("users"), id),
                    {
                        data: {
                            stats: {
                                gamesPlayed: q.Add(
                                    q.Select(
                                        ["data", "stats", "gamesPlayed"],
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