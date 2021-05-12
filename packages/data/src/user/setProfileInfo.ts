import { Client as FaunaDBClient, query as q } from "faunadb";
import { DatabaseUser } from "./databaseUser";

export const setProfileInfo = (client: FaunaDBClient) => {
    return async (id: string, nickname: string, picture: number) => {
        try {
            let userUpdate;
            if (nickname) {
                userUpdate = {
                        nickname : {
                            value: nickname,
                            uppercase: nickname.toUpperCase()
                        }
                }
            }
            if (picture){
                userUpdate = {
                    data: {
                        ...userUpdate,
                        profile:{
                            picture
                        }
                    }
                }
            }
            const user = await client.query<DatabaseUser>(
                q.Update(
                    q.Ref(q.Collection("users"), id),
                    userUpdate
                )
            );
            return user;

        } catch (e) {
            // todo check the error here - maybe no connection
            return null;
        }
    };
};
