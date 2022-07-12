import { Client as FaunaDBClient } from "faunadb";
import { Logger } from "winston";

import { create } from "./create";
import { getById } from "./getById";
import { getByNickname } from "./getByNickname";
import { setProfileInfo } from "./setProfileInfo";

export const userDatabase = (logger: Logger, client: FaunaDBClient) => ({
	create: create(logger, client),
	getById: getById(logger, client),
	getByNickname: getByNickname(logger, client),
	setProfileInfo: setProfileInfo(logger, client),
});

export { setupUserDatabase } from "./_setup";
export { DatabaseUser } from "./databaseUser";
