import { PrismaClient } from "@prisma/client";
import { Logger } from "winston";

import { setupBotDatabase } from "./bot";

export const setup = async (logger: Logger, client: PrismaClient) => {
	const botChangesMade = await setupBotDatabase(client);

	if (!botChangesMade) {
		logger.info("Database up to date, no changes required");
	}
};
