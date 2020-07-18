import { ManagementClient } from "auth0";
import { UserModel, UserAppMetadata } from "./userModel";

export const checkNicknameUnique = async (managementClient: ManagementClient<UserAppMetadata>, nickname: string): Promise<boolean> => {
    try {
        const uppercaseNickname = nickname.toUpperCase();

        const users = await managementClient.getUsers({
            search_engine: "v3",
            q: `app_metadata.nickname.uppercase:"${uppercaseNickname}"`,
            per_page: 1,
            page: 0
        });

        return users.length === 0;
    } catch (e) {
        throw e;
    }
};
