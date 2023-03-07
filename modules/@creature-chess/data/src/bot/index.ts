import { PrismaClient } from "@prisma/client";
import { Logger } from "winston";

import { addGamePlayed } from "./addGamePlayed";
import { addWin } from "./addWin";
import { DatabaseBot } from "./databaseBot";
import { getLeastPlayedBots } from "./getLeastPlayedBots";

export type BotDatabaseFunctions = {
	getLeastPlayedBots: (count: number) => Promise<DatabaseBot[] | null>;

	addWin: (id: number) => Promise<DatabaseBot | null>;
	addGamePlayed: (id: number) => Promise<DatabaseBot | null>;
};

export const botDatabase = (
	logger: Logger,
	client: PrismaClient
): BotDatabaseFunctions => ({
	getLeastPlayedBots: getLeastPlayedBots(logger, client),
	addGamePlayed: addGamePlayed(logger, client),
	addWin: addWin(logger, client),
});

export { setupBotDatabase } from "./_setup";
export {
	DatabaseBot,
	BotPersonality,
	BotPersonalityValue,
} from "./databaseBot";
