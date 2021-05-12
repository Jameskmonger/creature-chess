import { Client as FaunaDBClient, query as q } from "faunadb";
import { getPlayers } from "./getPlayers";

// todo type these properly
export type LeaderboardDatabaseFunctions = {
    getPlayers: () => Promise<{ name: string, wins: number }[] | null>;
};

export const leaderboardDatabase = (client: FaunaDBClient): LeaderboardDatabaseFunctions => {
    return {
        getPlayers: getPlayers(client)
    };
};
