import { ManagementClient } from "auth0";
import { UserAppMetadata } from "./userModel";
import { modifyUserMetadata } from "./modifyUserMetadata";

export const addUserGamesPlayed = (managementClient: ManagementClient<UserAppMetadata>, authId: string) => (
    modifyUserMetadata(
        managementClient,
        authId,
        (metadata) => ({
            ...metadata,
            stats: {
                ...metadata.stats,
                gamesPlayed: metadata.stats.gamesPlayed + 1
            }
        })
    )
);

export const addUserWin = (managementClient: ManagementClient<UserAppMetadata>, authId: string) => (
    modifyUserMetadata(
        managementClient,
        authId,
        (metadata) => ({
            ...metadata,
            stats: {
                ...metadata.stats,
                wins: metadata.stats.wins + 1
            }
        })
    )
);
