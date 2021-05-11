import { Client as FaunaDBClient, query as q } from "faunadb";
import { DatabaseUser } from "./databaseUser";
import { addGamePlayed } from "./addGamePlayed";
import { addWin } from "./addWin";
import { create } from "./create";
import { getById } from "./getById";
import { getByNickname } from "./getByNickname";
import { setProfileInfo } from "./setProfileInfo";

export type UserDatabaseFunctions = {
    create: (authId: string) => Promise<DatabaseUser>;

    getById: (id: string) => Promise<DatabaseUser>;
    getByNickname: (nickname: string) => Promise<DatabaseUser>;

    addWin: (id: string) => Promise<DatabaseUser>;
    addGamePlayed: (id: string) => Promise<DatabaseUser>;

    setProfileInfo: (id: string, nickname: string, picture: number) => Promise<DatabaseUser>;
};

export const userDatabase = (client: FaunaDBClient): UserDatabaseFunctions => {
    return {
        create: create(client),
        getById: getById(client),
        getByNickname: getByNickname(client),
        addWin: addWin(client),
        addGamePlayed: addGamePlayed(client),
        setProfileInfo: setProfileInfo(client)
    };
};

export { setupUserDatabase } from "./_setup";
export { DatabaseUser } from "./databaseUser";
