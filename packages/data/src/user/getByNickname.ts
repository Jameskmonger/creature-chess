import { Client as FaunaDBClient, query as q } from "faunadb";

export const getByNickname = (client: FaunaDBClient) => {
    return async (nickname: string) => {
        try {
            const user = await client.query(
                q.Get(
                    q.Match(
                        q.Index("users_by_nickname_uppercase"),
                        nickname.toUpperCase()
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
