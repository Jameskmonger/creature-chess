import { Client as FaunaDBClient, query as q } from "faunadb";
import { DatabaseUser } from "./databaseUser";

export const setProfileInfo = (client: FaunaDBClient) => {
    return async (id: string, nickname: string, picture: number) => {
        try {
            let user;
            if (nickname === null) {
                user = await client.query<DatabaseUser>(
                    q.Update(
                        q.Ref(q.Collection("users"), id),
                        {
                            data: {
                                profile: {
                                    picture
                                }
                            }
                        }
                    )
                );
                return user;
            }
            user = await client.query<DatabaseUser>(
                q.Update(
                    q.Ref(q.Collection("users"), id),
                    {
                        data: {
                            nickname: {
                                value: nickname,
                                // todo do this in the db?
                                uppercase: nickname.toUpperCase()
                            },
                            profile: {
                                picture
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
