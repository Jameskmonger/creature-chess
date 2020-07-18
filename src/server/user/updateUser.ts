import { ManagementClient } from "auth0";
import { UserAppMetadata, UserModel } from "./userModel";

export const updateUser = async (managementClient: ManagementClient<UserAppMetadata>, authId: string, metadata: UserAppMetadata): Promise<UserModel> => {
    try {
        const user = await managementClient.updateAppMetadata({ id: authId }, metadata);

        return {
            id: user.app_metadata.uuid,
            authId: user.user_id,
            metadata: user.app_metadata
        };
    } catch (e) {
        throw e;
    }
};
