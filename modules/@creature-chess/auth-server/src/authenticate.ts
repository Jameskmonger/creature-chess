import { ManagementClient } from "auth0";

import { DatabaseConnection } from "@creature-chess/data";

import {
	convertDatabaseUserToUserModel,
	UserAppMetadata,
	UserModel,
} from "./user";
import { verifyDecodeJwt } from "./verifyDecodeJwt";

export const authenticate = async (
	managementClient: ManagementClient<UserAppMetadata>,
	database: DatabaseConnection,
	token: string
): Promise<UserModel> => {
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
