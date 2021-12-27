// tslint:disable: no-console
import { Client as FaunaDBClient, query as q } from "faunadb";
import { COLLECTION_NAMES, INDEX_NAMES } from "../constants";

const INSTANCE_ALREADY_EXISTS = "instance already exists";

export const setupUserDatabase = async (client: FaunaDBClient): Promise<boolean> => {
	let changesMade = false;

	try {
		await client.query(q.CreateCollection({
			name: COLLECTION_NAMES.USERS
		}));

		console.log(` - Created collection '${COLLECTION_NAMES.USERS}'`);
		changesMade = true;
	} catch (e: any) {
		if (e.message !== INSTANCE_ALREADY_EXISTS) {
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
		changesMade = true;
	} catch (e: any) {
		if (e.message !== INSTANCE_ALREADY_EXISTS) {
			throw e;
		}
	}

	return changesMade;
};
