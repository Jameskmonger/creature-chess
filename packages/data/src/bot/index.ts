import { Logger } from "winston";
import { Client as FaunaDBClient } from "faunadb";
import { getLeastPlayedBots } from "./getLeastPlayedBots";
import { addWin } from "./addWin";
import { addGamePlayed } from "./addGamePlayed";

// todo type these properly
export type BotDatabaseFunctions = {
	getLeastPlayedBots: (count: number) => Promise<{ id: string, name: string }[] | null>;

	addWin: (id: string) => Promise<object | null>;
	addGamePlayed: (id: string) => Promise<object | null>;
};

export const botDatabase = (logger: Logger, client: FaunaDBClient): BotDatabaseFunctions => {
	return {
		getLeastPlayedBots: getLeastPlayedBots(logger, client),
		addGamePlayed: addGamePlayed(logger, client),
		addWin: addWin(logger, client)
	};
};

export { setupBotDatabase } from "./_setup";
