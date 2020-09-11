import { ManagementClient } from "auth0";
import { verifyDecodeJwt } from "./verifyDecodeJwt";
import { UserModel, UserAppMetadata } from "./userModel";
import { DatabaseConnection } from "@creature-chess/data";

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

        if (!user.app_metadata.playerId) {
            // need to create an account

            const dbUser = (await database.user.create(user.user_id)) as any;

            await managementClient.updateAppMetadata({ id: user.user_id }, { playerId: dbUser.ref.id });

            return {
                id: dbUser.ref.id,
                authId: user.user_id,
                stats: dbUser.data.stats
            };
        }

        // todo put proper typing around this
        const player = (await database.user.getById(user.app_metadata.playerId)) as any;

        return {
            id: player.ref.id,
            authId: user.user_id,
            stats: player.data.stats,
            nickname: player.data.nickname ? player.data.nickname.value : null
        };
    } catch (e) {
        throw e;
    }
};
