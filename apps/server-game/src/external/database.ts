import { createDatabaseConnection as baseCreateDatabaseConnection } from "@creature-chess/data";
import { logger } from "../log";

export const createDatabaseConnection = () =>
	baseCreateDatabaseConnection(logger, process.env.CREATURE_CHESS_FAUNA_KEY!);
