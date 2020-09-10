import { ManagementClient } from "auth0";
import { UserAppMetadata, Auth0User } from "./userModel";

export const getUserByUuid = async (managementClient: ManagementClient<UserAppMetadata>, id: string): Promise<Auth0User> => {
    try {
        const users = await managementClient.getUsers({
            search_engine: "v3",
            q: `app_metadata.uuid:"${id}"`,
            per_page: 1,
            page: 0
        });

        return users[0] || null;
    } catch (e) {
        throw e;
    }
};
