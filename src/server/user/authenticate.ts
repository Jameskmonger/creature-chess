import { ManagementClient } from "auth0";
import { verifyDecodeJwt } from "./verifyDecodeJwt";

interface User {

}

export const authenticate = async (managementClient: ManagementClient, token: string): Promise<User> => {
    const decoded = await verifyDecodeJwt(token);

    if (decoded === null) {
        throw Error("Unable to decode token");
    }

    const { sub: userId } = decoded;

    try {
        const user = await managementClient.getUser({ id: userId });

        return {
            name: user.nickname
        };
    } catch (e) {
        throw e;
    }
};
