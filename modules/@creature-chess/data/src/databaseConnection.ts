import { Logger } from "winston";

import { botDatabase, BotDatabaseFunctions } from "./bot";
import { setup } from "./setup";
import { userDatabase, UserDatabaseFunctions } from "./user";
import { PrismaClient } from "@prisma/client";

export type DatabaseConnection = {
	user: UserDatabaseFunctions;
	bot: BotDatabaseFunctions;
};

export const prisma = new PrismaClient();

export const createDatabaseConnection = async (
	logger: Logger
): Promise<DatabaseConnection> => {
	try {
		await setup(logger, prisma);

		return {
			user: userDatabase(logger, prisma),
			bot: botDatabase(logger, prisma),
		};
	} catch (e) {
		logger.error("Error in @cc/data setting up database", e);
		throw e;
	}
};
