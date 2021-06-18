import { Logger } from "winston";
import { Client as FaunaDBClient } from "faunadb";
import { getPlayers } from "./getPlayers";

// todo type these properly
export type LeaderboardDatabaseFunctions = {
	getPlayers: () => Promise<{ name: string; wins: number }[] | null>;
};

export const leaderboardDatabase = (logger: Logger, client: FaunaDBClient): LeaderboardDatabaseFunctions => ({
	getPlayers: getPlayers(logger, client)
});
