import { ManagementClient } from "auth0";
import { UserAppMetadata, UserModel } from "./userModel";
import { getUserByUuid } from "./getUserByUuid";

export const modifyUserMetadata = async (
    managementClient: ManagementClient<UserAppMetadata>,
    uuid: string,
    changeMetadata: (metadata: UserAppMetadata) => UserAppMetadata | Promise<UserAppMetadata>
): Promise<UserAppMetadata> => {
    try {
        const { user_id: authId, app_metadata } = await getUserByUuid(managementClient, uuid);

        const updatedMetadata = await changeMetadata(app_metadata);

        const { app_metadata: newMetadata } = await managementClient.updateAppMetadata({ id: authId }, updatedMetadata);

        return newMetadata;
    } catch (e) {
        throw e;
    }
};
