// tslint:disable: no-console
import { Client as FaunaDBClient, query as q } from "faunadb";
import { COLLECTION_NAMES, INDEX_NAMES } from "../constants";

const INSTANCE_ALREADY_EXISTS = "instance already exists";

export const setupUserDatabase = async (client: FaunaDBClient) => {
	try {
		await client.query(q.CreateCollection({
			name: COLLECTION_NAMES.USERS
		}));

		console.log(` - Created collection '${COLLECTION_NAMES.USERS}'`);
	} catch (e) {
		if (e.message === INSTANCE_ALREADY_EXISTS) {
			console.log(` - Collection '${COLLECTION_NAMES.USERS}' already exists`);
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

	try {
		await client.query(q.CreateIndex({
			name: INDEX_NAMES.USERS_BY_WINS,
			serialized: true,
			source: {
				collection: q.Collection(COLLECTION_NAMES.USERS),
				fields: {
					wins: q.Query(
						q.Lambda(
							"document",
							q.Select(["data", "stats", "wins"], q.Var("document"))
						)
					)
				}
			},
			values: [
				{
					binding: "wins",
					reverse: true
				},
				{
					field: ["data", "nickname", "value"]
				}
			]
		}));

		console.log(` - Created index '${INDEX_NAMES.USERS_BY_WINS}'`);
	} catch (e) {
		if (e.message === INSTANCE_ALREADY_EXISTS) {
			console.log(` - Index '${INDEX_NAMES.USERS_BY_WINS}' already exists`);
		} else {
			throw e;
		}
	}
};
