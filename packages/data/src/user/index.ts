import { Logger } from "winston";
import { Client as FaunaDBClient } from "faunadb";
import { DatabaseUser } from "./databaseUser";
import { addGamePlayed } from "./addGamePlayed";
import { addWin } from "./addWin";
import { create } from "./create";
import { getById } from "./getById";
import { getByNickname } from "./getByNickname";
import { setProfileInfo } from "./setProfileInfo";

export type UserDatabaseFunctions = {
	create: (authId: string) => Promise<DatabaseUser | null>;

	getById: (id: string) => Promise<DatabaseUser | null>;
	getByNickname: (nickname: string) => Promise<DatabaseUser | null>;

	addWin: (id: string) => Promise<DatabaseUser | null>;
	addGamePlayed: (id: string) => Promise<DatabaseUser | null>;

	setProfileInfo: (id: string, nickname: string | null, picture: number | null) => Promise<DatabaseUser | null>;
};

export const userDatabase = (logger: Logger, client: FaunaDBClient): UserDatabaseFunctions => ({
	create: create(logger, client),
	getById: getById(logger, client),
	getByNickname: getByNickname(logger, client),
	addWin: addWin(logger, client),
	addGamePlayed: addGamePlayed(logger, client),
	setProfileInfo: setProfileInfo(logger, client)
});

export { setupUserDatabase } from "./_setup";
export { DatabaseUser } from "./databaseUser";
