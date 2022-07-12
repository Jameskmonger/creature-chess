import { Client as FaunaDBClient } from "faunadb";
import { Logger } from "winston";

import { getElo } from "./getElo";
import { recordGameFinish } from "./recordGameFinish";
import { recordGameStart } from "./recordGameStart";

export { Player } from "./player";

export const playerDatabase = (logger: Logger, client: FaunaDBClient) => ({
	getElo: getElo(logger, client),
	recordGameFinish: recordGameFinish(logger, client),
	recordGameStart: recordGameStart(logger, client),
});
