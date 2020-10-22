import { Client as FaunaDBClient, query as q } from "faunadb";
import { DatabaseUser } from "./databaseUser";

export const getById = (client: FaunaDBClient) => {
    return async (id: string) => {
        try {
            const user = await client.query<DatabaseUser>(
                q.Get(
                    q.Ref(
                        q.Collection("users"),
                        id
                    )
                )
            );

            return user;
        } catch (e) {
            // todo check the error here - maybe no connection
            return null;
        }
    };
};
