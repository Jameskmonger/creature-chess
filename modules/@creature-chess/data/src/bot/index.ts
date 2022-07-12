import { Client as FaunaDBClient } from "faunadb";
import { Logger } from "winston";

import { getLeastPlayedBots } from "./getLeastPlayedBots";

export const botDatabase = (logger: Logger, client: FaunaDBClient) => ({
	getLeastPlayedBots: getLeastPlayedBots(logger, client),
});

export { setupBotDatabase } from "./_setup";
export {
	DatabaseBot,
	BotPersonality,
	BotPersonalityValue,
} from "./databaseBot";
