import { PrismaClient } from "@prisma/client";
import { Logger } from "winston";

import { addGamePlayed } from "./addGamePlayed";
import { addWin } from "./addWin";
import { create } from "./create";
import { DatabaseUser } from "./databaseUser";
import { getByAuthId } from "./getByAuthId";
import { getById } from "./getById";
import { getByNickname } from "./getByNickname";
import { setProfileInfo } from "./setProfileInfo";

export type UserDatabaseFunctions = {
	create: (authId: string) => Promise<DatabaseUser | null>;

	getByAuthId: (authId: string) => Promise<DatabaseUser | null>;

	getById: (id: number) => Promise<DatabaseUser | null>;
	getByNickname: (nickname: string) => Promise<DatabaseUser | null>;

	addWin: (id: number) => Promise<DatabaseUser | null>;
	addGamePlayed: (id: number) => Promise<DatabaseUser | null>;

	setProfileInfo: (
		id: number,
		nickname: string | null,
		picture: number | null
	) => Promise<DatabaseUser | null>;
};

export const userDatabase = (
	logger: Logger,
	client: PrismaClient
): UserDatabaseFunctions => ({
	create: create(logger, client),
	getById: getById(logger, client),
	getByAuthId: getByAuthId(logger, client),
	getByNickname: getByNickname(logger, client),
	addWin: addWin(logger, client),
	addGamePlayed: addGamePlayed(logger, client),
	setProfileInfo: setProfileInfo(logger, client),
});

export { DatabaseUser } from "./databaseUser";
