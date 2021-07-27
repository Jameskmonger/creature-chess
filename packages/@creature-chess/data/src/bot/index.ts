import { Logger } from "winston";
import { Client as FaunaDBClient } from "faunadb";
import { getLeastPlayedBots } from "./getLeastPlayedBots";
import { addWin } from "./addWin";
import { addGamePlayed } from "./addGamePlayed";
import { DatabaseBot } from "./databaseBot";

export type BotDatabaseFunctions = {
	getLeastPlayedBots: (count: number) => Promise<DatabaseBot[] | null>;

	addWin: (id: string) => Promise<DatabaseBot | null>;
	addGamePlayed: (id: string) => Promise<DatabaseBot | null>;
};

export const botDatabase = (logger: Logger, client: FaunaDBClient): BotDatabaseFunctions => ({
	getLeastPlayedBots: getLeastPlayedBots(logger, client),
	addGamePlayed: addGamePlayed(logger, client),
	addWin: addWin(logger, client)
});

export { setupBotDatabase } from "./_setup";
export { DatabaseBot, BotPersonality, BotPersonalityValue } from "./databaseBot";
