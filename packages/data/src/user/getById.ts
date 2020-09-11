import { Client as FaunaDBClient, query as q } from "faunadb";

export const getById = (client: FaunaDBClient) => {
    return async (id: string) => {
        try {
            const user = await client.query(
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
