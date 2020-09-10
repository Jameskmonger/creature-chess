import { ManagementClient } from "auth0";
import { verifyDecodeJwt } from "./verifyDecodeJwt";
import { UserModel, UserAppMetadata } from "./userModel";

export const authenticate = async (managementClient: ManagementClient<UserAppMetadata>, token: string): Promise<UserModel> => {
    const decoded = await verifyDecodeJwt(token);

    if (decoded === null) {
        throw Error("Unable to decode token");
    }

    const { sub: userId } = decoded;

    try {
        const user = await managementClient.getUser({ id: userId });

        return {
            id: user.app_metadata.uuid,
            authId: user.user_id,
            metadata: user.app_metadata
        };
    } catch (e) {
        throw e;
    }
};
