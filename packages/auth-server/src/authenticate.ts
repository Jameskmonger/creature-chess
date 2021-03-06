import { ManagementClient } from "auth0";
import { verifyDecodeJwt } from "./verifyDecodeJwt";
import { DatabaseConnection } from "@creature-chess/data";
import { convertDatabaseUserToUserModel, UserAppMetadata, UserModel } from "./user";

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

		// todo lots of ! in this function, improve it

		if (!authUser.app_metadata || !authUser.app_metadata.playerId) {
			// need to create an account
			const newUser = await database.user.create(authUser.user_id!);

			await managementClient.updateAppMetadata({ id: authUser.user_id! }, { playerId: newUser!.ref.id, playerNickname: null, playerPicture: null });

			return convertDatabaseUserToUserModel(newUser!);
		}

		const dbUser = await database.user.getById(authUser.app_metadata.playerId);

		const userModel = convertDatabaseUserToUserModel(dbUser!);

		// todo remove this when DB gets wiped, it's to migrate people who were during the nickname changeover
		if (userModel.nickname && !authUser.app_metadata.playerNickname) {
			await managementClient.updateAppMetadata(
				{ id: authUser.user_id! }, { playerId: dbUser!.ref.id, playerNickname: userModel.nickname, playerPicture: userModel.profile?.picture || null }
			);
		}

		return userModel;
	} catch (e) {
		throw e;
	}
};
