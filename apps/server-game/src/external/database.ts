import { Logger } from "winston";
import { createDatabaseConnection as baseCreateDatabaseConnection } from "@creature-chess/data";

export const createDatabaseConnection = (logger: Logger) =>
	baseCreateDatabaseConnection(logger, process.env.CREATURE_CHESS_FAUNA_KEY!);
