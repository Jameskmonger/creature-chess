import { Client as FaunaDBClient, query as q } from "faunadb";
import { COLLECTION_NAMES, INDEX_NAMES } from "./constants";

const INSTANCE_ALREADY_EXISTS = "instance already exists";

export const setup = async (client: FaunaDBClient) => {
    console.log("Setting up database...");

    try {
        await client.query(q.CreateCollection({
            name: COLLECTION_NAMES.USERS
        }));

        console.log(` - Created collection '${COLLECTION_NAMES.USERS}'`);
    } catch (e) {
        if (e.message === INSTANCE_ALREADY_EXISTS) {
            console.log(` - Colletion '${COLLECTION_NAMES.USERS}' already exists`);
        } else {
            throw e;
        }
    }

    try {
        await client.query(q.CreateIndex({
            name: INDEX_NAMES.USERS_BY_NICKNAME_UPPERCASE,
            serialized: true,
            unique: true,
            source: q.Collection(COLLECTION_NAMES.USERS),
            terms: [
                {
                    // todo type safety around this - is it even possible?
                    field: ["data", "nickname", "uppercase"]
                }
            ]
        }));

        console.log(` - Created index '${INDEX_NAMES.USERS_BY_NICKNAME_UPPERCASE}'`);
    } catch (e) {
        if (e.message === INSTANCE_ALREADY_EXISTS) {
            console.log(` - Index '${INDEX_NAMES.USERS_BY_NICKNAME_UPPERCASE}' already exists`);
        } else {
            throw e;
        }
    }
};
