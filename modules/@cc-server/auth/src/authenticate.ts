import { ManagementClient } from "auth0";

import { DatabaseConnection } from "@cc-server/data";

import { AUTH0_ENABLED } from "./auth0";
import { convertDatabaseUserToUserModel, UserModel } from "./user";

/* eslint-disable @typescript-eslint/no-var-requires */
const verifyDecodeJwt = AUTH0_ENABLED
	? require("./verifyDecodeJwt").verifyDecodeJwt
	: null;
/* eslint-enable @typescript-eslint/no-var-requires */

export const authenticate = async (
	managementClient: ManagementClient,
	database: DatabaseConnection,
	token: string
): Promise<UserModel> => {
	if (!verifyDecodeJwt) {
		throw new Error("Attempted to use auth0 when it is not enabled");
	}

	const decoded = await verifyDecodeJwt(token);

	if (decoded === null) {
		throw Error("Unable to decode token");
	}

	const { sub: userId } = decoded;

	try {
		const authUser = await managementClient.getUser({ id: userId });

		if (!authUser || !authUser.user_id) {
			throw Error("Unable to get user from auth0");
		}

		const databaseUser = await database.user.getByAuthId(authUser.user_id);

		if (databaseUser) {
			return convertDatabaseUserToUserModel(databaseUser);
		}

		// otherwise, we need to create a user
		const newUser = await database.user.create(userId);

		if (!newUser) {
			throw Error("Unable to create user");
		}

		return convertDatabaseUserToUserModel(newUser);
	} catch (e) {
		throw e;
	}
};
