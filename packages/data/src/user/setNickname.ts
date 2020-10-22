import { Client as FaunaDBClient, query as q } from "faunadb";
import { DatabaseUser } from "./databaseUser";

export const setNickname = (client: FaunaDBClient) => {
    return async (id: string, nickname: string) => {
        try {
            const user = await client.query<DatabaseUser>(
                q.Update(
                    q.Ref(q.Collection("users"), id),
                    {
                        data: {
                            nickname: {
                                value: nickname,
                                // todo do this in the db?
                                uppercase: nickname.toUpperCase()
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
