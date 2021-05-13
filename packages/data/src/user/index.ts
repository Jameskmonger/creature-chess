import { Client as FaunaDBClient, query as q } from "faunadb";
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

    setProfileInfo: (id: string, nickname: string, picture: number) => Promise<DatabaseUser> | null;
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
