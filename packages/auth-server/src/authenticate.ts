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
        const user = await managementClient.getUser({ id: userId });

        if (!user.app_metadata || !user.app_metadata.playerId) {
            // need to create an account
            const dbUser = await database.user.create(user.user_id);

            await managementClient.updateAppMetadata({ id: user.user_id }, { playerId: dbUser.ref.id });

            return convertDatabaseUserToUserModel(dbUser);
        }

        const player = await database.user.getById(user.app_metadata.playerId);

        return convertDatabaseUserToUserModel(player);
    } catch (e) {
        throw e;
    }
};
